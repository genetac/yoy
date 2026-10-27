/* ════════════════════════════════════════════════════════════════════
   OMNIFORGE product catalog — OfferV2 truth engine (build plan v3 · P0)

   Every offer is promise-accurate:
   • Hero kits (the 20 authored examples) are looked up FIRST — real
     file trees whose contents ship from kit-content/.
   • Non-hero examples use the keyword banks, fixed: word-boundary
     matching, a policy deny-list, dedupe, and honest 'extended' flags
     until their content is authored.
   • Policies ("Lifetime free updates", guarantees, licenses) NEVER
     produce files — they render as chips.
   • Root files (README/LICENSE/CHANGELOG/QUICK-START) are real for
     every offer, generated from shared archetype sources.

   All proof values are demo data — labelled at render time.
   ════════════════════════════════════════════════════════════════════ */

import { productTierCategories, subscriptionSection } from "@/data/exampleProducts";
import {
  bundleStats,
  type Archetype,
  type BundleFile,
  type BundleFolder,
  type OfferV2,
  type Policy,
  type PolicyId,
  type ProofV2,
  type Testimonial,
} from "./catalog/schema";
import { HEROES } from "./catalog/hero";
import { KIT_BYTES } from "./catalog/kit-bytes";

export type { ContentFlag } from "./catalog/schema";
export { bundleStats, fmtBytes } from "./catalog/schema";
export type { OfferV2 } from "./catalog/schema";
export type {
  OfferV2 as ListingOffer,
  BundleFile,
  BundleFolder,
  ProofV2,
  Testimonial,
  Policy,
  PolicyId,
} from "./catalog/schema";

/* ── Deterministic hash — stable values across renders / sessions ─── */

function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function fmtSold(n: number): string {
  if (n >= 1000) {
    const v = (n / 1000).toFixed(1).replace(/\.0$/, "");
    return `${v}k`;
  }
  return `${n}`;
}

export function formatPrice(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

/* ── Price ladders — every pick stays inside the tier's range ─────── */

const PRICE_LADDERS: Record<string, Array<[number, number]>> = {
  A: [[3, 5], [7, 12], [11, 17], [15, 24], [19, 29]],
  B: [[19, 29], [34, 49], [49, 69], [64, 89], [79, 99]],
  C: [[79, 109], [134, 179], [189, 239], [244, 299], [299, 379]],
  D: [[299, 399], [549, 699], [899, 1099], [1199, 1499], [1499, 1899]],
  E: [], // custom quote
  S: [[9, 14], [29, 39], [59, 79], [99, 129], [199, 249]],
};

export const POLICY_LABELS: Record<PolicyId, string> = {
  updates: "Lifetime free updates",
  "guarantee-30d": "30-day money-back guarantee",
  "license-commercial": "Commercial license",
  "license-team": "Team license",
  support: "SLA-backed support",
};

const POLICIES_BY_TIER: Record<string, PolicyId[]> = {
  A: ["updates", "guarantee-30d", "license-commercial"],
  B: ["updates", "guarantee-30d", "license-commercial"],
  C: ["updates", "guarantee-30d", "license-team"],
  D: ["updates", "guarantee-30d", "license-team"],
  E: ["support", "guarantee-30d", "license-team"],
  S: ["updates", "guarantee-30d", "license-team"],
};

export function deliveryLabel(tierLetter: string): string {
  switch (tierLetter) {
    case "D": return "Instant download + onboarding call";
    case "E": return "Scoped delivery plan";
    case "S": return "Instant access";
    default: return "Instant download";
  }
}

export function policyChipLabel(id: PolicyId, tierLetter: string): string {
  if (id === "updates" && tierLetter === "S") return "Updates while subscribed";
  if (id === "updates" && (tierLetter === "C" || tierLetter === "D")) return "12 months of updates";
  if (id === "license-team" && tierLetter === "D") return "Business license · unlimited seats";
  if (id === "license-team" && tierLetter === "C") return "Team license · up to 10 seats";
  if (id === "license-team" && tierLetter === "E") return "Enterprise license + SLA";
  if (id === "license-team" && tierLetter === "S") return "Team subscription license";
  return POLICY_LABELS[id];
}

/* ── Formats per product archetype ─────────────────────────────────── */

const FORMATS: Record<string, string[]> = {
  "template-pack": ["DOCX", "PDF", "EML"],
  toolkit: ["Web app", "ZIP bundle", "Guide PDF"],
  "notion-system": ["Notion", "PDF guide"],
  "assessment-tool": ["HTML quiz", "PDF report"],
  "landing-template": ["HTML/CSS", "Figma"],
  calculator: ["HTML/JS", "Embed snippet"],
  "resume-kit": ["DOCX", "PDF", "ATS"],
  checklist: ["PDF", "Notion", "XLSX"],
  "website-kit": ["MDX", "Next.js", "JSON-LD"],
  dashboard: ["React", "Figma", "CSV"],
  "design-system": ["Figma", "Tokens", "Docs"],
  "training-product": ["Video", "Slides", "Workbook"],
  "appointment-system": ["Next.js", "Supabase", "Guide"],
  "client-portal": ["Next.js", "Supabase"],
  "inventory-dashboard": ["React", "CSV", "Guide"],
  "crm-package": ["Notion", "GSheets", "Guide"],
  "custom-saas": ["Source", "Docs"],
  marketplace: ["Source", "Docs"],
  "multi-tenant-app": ["Source", "Docs"],
  "enterprise-system": ["Source", "Docs"],
  "saas-tool": ["Source", "Docs"],
  "monitoring-dashboard": ["Source", "Docs"],
  "booking-system": ["Source", "Docs"],
  "research-platform": ["Source", "Docs"],
};

/* ── Bundle extras layered on top of each example's features ──────── */

const EXTRAS: Record<string, string[]> = {
  "template-pack": ["Quick-start guide (PDF)", "Lifetime free updates"],
  toolkit: ["Setup guide + docs", "Free minor updates"],
  "notion-system": ["Setup video walkthrough", "Free duplicate link"],
  "assessment-tool": ["Scoring logic included", "Result page template"],
  "landing-template": ["SEO meta pre-wired", "Deploy checklist"],
  calculator: ["Formula logic included", "Embed-anywhere snippet"],
  "resume-kit": ["ATS keyword guide", "Cover letter bonus"],
  checklist: ["Print-ready layouts", "Progress tracking sheet"],
  "website-kit": ["Content model (MDX)", "Deploy checklist"],
  dashboard: ["Sample dataset (CSV)", "Component reference"],
  "design-system": ["Token JSON export", "Usage docs site"],
  "training-product": ["Facilitator notes", "Certificate template"],
  "appointment-system": ["Email reminder templates", "Deploy guide"],
  "client-portal": ["Role-based auth pre-built", "Deploy guide"],
  "inventory-dashboard": ["CSV import starter", "KPI reference"],
  "crm-package": ["Pipeline playbook", "Import sheet"],
  "custom-saas": ["Architecture decision record"],
  marketplace: ["Architecture decision record"],
  "multi-tenant-app": ["Architecture decision record"],
  "enterprise-system": ["Architecture decision record"],
  "saas-tool": ["Architecture decision record"],
  "monitoring-dashboard": ["Alert playbook"],
  "booking-system": ["Policy templates"],
  "research-platform": ["Research playbook"],
};

/* ════════════════════════════════════════════════════════════════════
   P0 TRUTH FIX — policy dictionary + deny-list + word-boundary banks
   ════════════════════════════════════════════════════════════════════ */

/** Manifest lines matching these become Policy chips — never folders. */
const POLICY_PATTERNS: { id: PolicyId; re: RegExp }[] = [
  { id: "updates", re: /\b(lifetime\s+free\s+updates?|free\s+(minor\s+)?updates?|updates?\s+while\s+subscribed|12\s+months(\s+of)?\s+updates?|free\s+updates?)\b/i },
  { id: "guarantee-30d", re: /\b(30[-\s]day\s+(money[-\s]back\s+)?guarantee|money[-\s]back\s+guarantee)\b/i },
  { id: "license-commercial", re: /\b(commercial\s+license|personal\s*\+\s*commercial)\b/i },
  { id: "support", re: /\b(sla[-\s]backed\s+support|handover\s+session|post[-\s]launch\s+support)\b/i },
];

/**
 * Lines matching the deny-list NEVER route to a file bank. They are
 * either policies (above), root files (quick-start, walkthrough links)
 * or promises the archetype root already covers.
 */
const DENY_LIST =
  /\b(lifetime|free|updates?|guarantee|guarantees|support|license|licences|quick[-\s]start|walkthrough|duplicate\s+link|deploy\s+checklist|setup\s+guide|docs?\b|onboarding\s+call)\b/i;

/* Keyword banks — word-boundary matching only (fixes the /time/ leak) */

const wb = (pattern: string): RegExp => new RegExp(`\\b(${pattern})s?\\b`, "i");

const KEYWORD_BANKS: { re: RegExp; set: string[] }[] = [
  {
    re: wb("resume|ats"),
    set: ["ATS-safe master layout", "Keyword bank (×200)", "Cover letter twin", "Recruiter-tested format"],
  },
  {
    re: wb("calc|roi|mortgage|calorie|cost|return|payment|tax|interest|macro|food|quantity"),
    set: ["Formula logic (commented)", "Slider + input presets", "Result card layout", "Print stylesheet"],
  },
  {
    re: wb("question|quiz|score|type|strength|assess|scenario|breakdown"),
    set: ["Scored question bank", "Result mapping logic", "Shareable result page", "PDF report layout"],
  },
  {
    re: wb("welcome|onboarding"),
    set: ["Day 0 — welcome + quick win", "Day 2 — founder story", "Day 4 — customer proof", "Day 6 — soft pitch"],
  },
  {
    re: wb("hr form|team intro|provision|packing|pre-trip|pre-launch|documents check|checklist"),
    set: ["Phased checklists", "Owner + due-date columns", "Progress tracker", "Sign-off row"],
  },
  {
    re: wb("cold|outreach|intro"),
    set: ["3 opening variants (A/B/C)", "Personalization merge fields", "Objection-crusher reply", "Break-up send"],
  },
  { re: wb("follow"), set: ["Day 3 gentle nudge", "Day 7 value add", "Day 14 last call", "Quarterly win-back"] },
  {
    re: wb("proposal|sow|scope"),
    set: ["Scope + timeline blocks", "3-tier pricing table", "E-signature fields", "Case-study insert"],
  },
  {
    re: wb("terms|agreement|nda|contract|legal|policy|disclaimer"),
    set: ["Plain-English summary", "Fill-in bracket system", "2 layouts (letter + legal)", "Jurisdiction variant notes"],
  },
  {
    re: wb("pricing|tiers|price table|membership"),
    set: ["3-tier price table", "Value stack builder", "FAQ + objection handling", "Comparison sheet"],
  },
  {
    re: wb("slide|deck|report|pitch|certificate"),
    set: ["20 master layouts", "Chart + data slides", "Dark + light themes", "Speaker notes"],
  },
  {
    re: wb("keyword|seo|meta|sitemap|readability|headline|outline|serp|json-ld"),
    set: ["Scoring sheet + formulas", "Generator with presets", "Copy-and-go checklist", "Worked examples ×5"],
  },
  {
    re: wb("color|font|grid|token|contrast|pair"),
    set: ["Token export (JSON)", "Contrast-checked pairings ×12", "Grid + spacing sheet", "Usage examples"],
  },
  {
    re: wb("snippet|regex|json|formatter|dev|code"),
    set: ["Ready-to-paste snippets ×40", "Test fixtures included", "Cheat-sheet (PDF)", "Changelog + semver"],
  },
  {
    re: wb("task|sprint|board|timeline|project"),
    set: ["Task database schema", "Sprint board template", "Timeline view", "Weekly review ritual"],
  },
  {
    re: wb("crm|pipeline|deal|sales"),
    set: ["Pipeline stages (5)", "Contact + company tables", "Deal review dashboard", "Follow-up reminders"],
  },
  { re: wb("meeting"), set: ["Agenda template", "Decision log", "Action items table", "Rollup dashboard"] },
  {
    re: wb("calendar|content|editorial|idea"),
    set: ["12-month calendar view", "Content database", "Idea backlog board", "Publishing checklist"],
  },
  {
    re: wb("habit|streak"),
    set: ["Streak dashboard", "Weekly review template", "Monthly rollup view", "Reminders preset"],
  },
  {
    re: wb("reading"),
    set: ["Reading queue database", "Notes + highlights template", "Progress dashboard", "Yearly recap view"],
  },
  {
    re: wb("budget|finance|cash|p&l"),
    set: ["Monthly budget dashboard", "Category presets", "Savings goal tracker", "Yearly rollup view"],
  },
  {
    re: wb("form|rsvp|capture|newsletter|signup|contact|intake|booking|appointment|reservation"),
    set: ["Form block + validation", "Thank-you page", "Anti-spam honeypot", "Integration guide"],
  },
  {
    re: wb("countdown|event|map|gallery|layout|responsive|button|bullets|details"),
    set: ["Hero variant set (×3)", "CTA block library", "Mobile-first layout", "Deploy checklist"],
  },
  {
    re: wb("chart|progress|database|tracker|dashboard|view|reminder|list|matrix|highlights|section|serif|leadership|column|accent|skill bar|morning|evening|gmail|github|export|selector|horizon"),
    set: ["Dashboard view preset", "Sample data (CSV)", "Progress formulas", "Mobile layout preset"],
  },
  {
    re: wb("page|menu|class|trainer|attorney|practice|service|insurance|service pages"),
    set: ["Authored page set (MDX)", "Page templates ×3", "Copy blocks library", "Print stylesheet"],
  },
  {
    re: wb("monitor|uptime|error|alert|ops|workload"),
    set: ["Monitor config presets", "Alert rule library", "Ops dashboard layout", "Runbook templates"],
  },
  {
    re: wb("auth|role|portal|tenant|multi-tenant|admin|panel|saas|marketplace|research|platform|architecture|decision record|source"),
    set: ["Architecture decision record", "Auth + role matrix", "Environment templates", "Seed data + fixtures"],
  },
  {
    re: wb("email|reminder|drip|eml|subject"),
    set: ["Email template set", "Subject-line bank", "Merge-field map", "Send cadence guide"],
  },
];

const ARCHETYPE_SETS: Record<string, string[][]> = {
  "landing-template": [
    ["Responsive HTML page", "Figma source", "SEO meta pre-wired"],
    ["Hero variant set (×3)", "CTA block library", "Deploy checklist"],
    ["Dark + light themes", "Mobile-first layout", "Analytics events pre-wired"],
  ],
  "template-pack": [
    ["Editable master files", "Subject + copy bank", "Quick-start PDF"],
    ["Light + dark variants", "Copy-paste prompts", "Bonus mini-pack"],
    ["Modular sections", "Brand-token slots", "Usage license guide"],
  ],
  toolkit: [
    ["Cross-platform scripts", "Config presets ×3", "Setup docs"],
    ["One-command install", "Sample fixtures", "Changelog + semver"],
    ["Dry-run mode", "Output templates", "Troubleshooting guide"],
  ],
  "notion-system": [
    ["Duplicate-ready workspace", "Dashboard views ×4", "Formula reference"],
    ["Relation-linked databases", "Board + calendar views", "6-min setup video"],
    ["Progress rollups", "Template buttons", "Mobile layout preset"],
  ],
  "assessment-tool": [
    ["Scored question bank", "Result mapping logic", "Shareable result page"],
    ["PDF report layout", "Lead capture wiring", "Retake flow"],
    ["Weighted scoring", "Outcome badges", "Analytics events"],
  ],
  calculator: [
    ["Commented formula logic", "Slider + input presets", "Print stylesheet"],
    ["Embed snippet", "Currency + locale presets", "Result card layout"],
    ["Validation + error states", "Dark mode", "Export to CSV"],
  ],
  "resume-kit": [
    ["ATS-safe master (DOCX)", "PDF export preset", "Keyword bank ×200"],
    ["Cover letter twin", "Recruiter-tested format", "Two layout variants"],
    ["Skills matrix sheet", "GitHub section preset", "Interview prep notes"],
  ],
  checklist: [
    ["Print-ready PDF", "Interactive Notion twin", "Progress sheet (XLSX)"],
    ["Owner + due columns", "Phase dividers", "Sign-off row"],
    ["Auto-progress bars", "Weekly review ritual", "Export presets"],
  ],
  "website-kit": [
    ["Authored page set (MDX)", "Content model", "Local-SEO pack"],
    ["Deploy checklist", "JSON-LD schema", "Image pipeline configured"],
    ["Blog + docs layouts", "Dark mode tokens", "Vercel one-click"],
  ],
  dashboard: [
    ["React component set", "Sample dataset (CSV)", "Chart presets"],
    ["KPI cards + tables", "Filter logic wired", "Responsive grids"],
    ["Empty + loading states", "Dark theme", "Component reference"],
  ],
  "design-system": [
    ["Figma library", "Token JSON export", "Usage docs"],
    ["Light + dark themes", "Component API table", "Accessibility notes"],
    ["Grid + spacing sheet", "Icon set", "Contribution guide"],
  ],
  "training-product": [
    ["HD lesson videos", "Slide deck (PPTX)", "Workbook (PDF)"],
    ["Facilitator notes", "Certificate template", "Discussion prompts"],
    ["Action plan sheet", "Quiz + answers", "Email nurture drip"],
  ],
  "appointment-system": [
    ["Booking flow (Next.js)", "Reminder email set", "Supabase schema"],
    ["Calendar sync guide", "Timezone logic", "No-show policy templates"],
    ["SMS hookups", "Admin panel", "Deploy guide"],
  ],
  "client-portal": [
    ["Portal app (Next.js)", "Role-based auth", "Supabase schema + RLS"],
    ["File-sharing zones", "Invoice module", "Branding tokens"],
    ["Onboarding flow", "Notification emails", "Deploy guide"],
  ],
  "inventory-dashboard": [
    ["Dashboard app (React)", "CSV import starter", "KPI reference"],
    ["Alert rules preset", "Supplier table", "Reorder logic"],
    ["Barcode field support", "Audit log view", "Dark mode"],
  ],
  "crm-package": [
    ["Notion CRM workspace", "GSheets pipeline twin", "Import sheet (CSV)"],
    ["Pipeline playbook", "Deal stage automation", "Weekly review ritual"],
    ["Contact enrichment fields", "Follow-up reminders", "Forecast dashboard"],
  ],
  default: [
    ["Architecture decision record", "Runbook + docs", "Environment templates"],
    ["CI/CD pipeline config", "Seed data + fixtures", "Security checklist"],
    ["Handover deck", "Post-launch support plan", "Access matrix"],
  ],
};

/* ── File extensions + ranged sizes for bank-predicted files ──────── */

const EXT_RULES: [RegExp, string][] = [
  [/video|lesson|walkthrough/i, "mp4"],
  [/slide|deck|certificate|pptx/i, "pptx"],
  [/sheet|xlsx|spreadsheet/i, "xlsx"],
  [/dataset|csv|import sheet|fixtures|sample data|bank/i, "csv"],
  [/figma/i, "fig"],
  [/email|subject|drip|eml/i, "eml"],
  [/token|json|config|preset|schema|json-ld/i, "json"],
  [/script|cli|command|install/i, "sh"],
  [/source code|starter|component|react|next\.js|app \(|booking flow|admin panel|portal app|page set|pages?/i, "tsx"],
  [/report|workbook|decision record|cheat|guide|runbook|playbook/i, "pdf"],
  [/docs|notes|checklist|manual|readme|reference|ritual|policy|faq|summary|examples/i, "pdf"],
  [/template|master|layout|resume|letter|proposal|agreement|plan|variants|formulas|pairings|mdx|copy blocks/i, "docx"],
  [/dashboard|view|board|calendar|database|workspace|tracker|queue|log|table|cadence|map/i, "md"],
];

const ARCHETYPE_EXT: Record<string, string> = {
  "template-pack": "docx",
  toolkit: "sh",
  "notion-system": "md",
  "assessment-tool": "html",
  "landing-template": "html",
  calculator: "js",
  "resume-kit": "docx",
  checklist: "pdf",
  "website-kit": "mdx",
  dashboard: "tsx",
  "design-system": "fig",
  "training-product": "mp4",
  "appointment-system": "tsx",
  "client-portal": "tsx",
  "inventory-dashboard": "tsx",
  "crm-package": "md",
};

const SIZE_RANGE: Record<string, [number, number]> = {
  mp4: [8000, 42000],
  fig: [2000, 8000],
  pptx: [400, 1800],
  zip: [400, 2600],
  pdf: [120, 900],
  docx: [28, 220],
  xlsx: [20, 160],
  csv: [4, 40],
  html: [6, 30],
  tsx: [4, 26],
  mdx: [4, 26],
  js: [3, 16],
  json: [2, 18],
  eml: [3, 14],
  sh: [2, 12],
  md: [2, 10],
  txt: [1, 4],
};

/* ── Proof v2 — per-archetype persona banks (8 × 5 = 40) ──────────── */

const PERSONA_BANKS: Record<string, Testimonial[]> = {
  "template-pack": [
    { name: "Maya Reyes", role: "Freelance consultant", quote: "I sent the Day-0 welcome email Tuesday morning. By Friday it had a 61% open rate — my old sequence never broke 38%.", rating: 5 },
    { name: "Daniel Kovač", role: "Agency founder", quote: "We reskinned the proposal pack in an afternoon. Our close rate on fixed-scope work went from 1 in 4 to 1 in 3.", rating: 5 },
    { name: "Priya Sharma", role: "Lifecycle marketer", quote: "The merge-field map alone saved me a day of fiddling. Every placeholder resolves, nothing ships with brackets.", rating: 4.5 },
    { name: "Tom Beaulieu", role: "Brand designer", quote: "The structure is the product. I've bought template packs that were 90% filler — this one has zero.", rating: 5 },
    { name: "Sofia Marchetti", role: "Ops manager", quote: "Our new hires draft client-ready emails by week two now. The pack is basically our tone-of-voice training.", rating: 4.5 },
    { name: "Jonas Weber", role: "Sales consultant", quote: "The negotiation bank paid for the pack in one deal. I lifted the 'next steps' email almost verbatim.", rating: 5 },
    { name: "Alina Petrova", role: "Business coach", quote: "Clients think I hired a copywriter. I just fill in the brackets and the emails sound like me on a good day.", rating: 5 },
    { name: "Marcus Chen", role: "Product lead", quote: "The pitch deck outline finally made our story linear. Investor meetings stopped drifting after slide five.", rating: 4.5 },
  ],
  toolkit: [
    { name: "Renée Laurent", role: "SEO consultant", quote: "The density scorer matches what my $99/mo subscription did. I cancelled the subscription the same week.", rating: 5 },
    { name: "Ibrahim Diallo", role: "Frontend developer", quote: "The regex tester runs offline on a locked-down work laptop. That alone makes it worth keeping in the kit.", rating: 5 },
    { name: "Hanna Lindqvist", role: "Brand designer", quote: "The contrast checker shows its math. I can finally show clients *why* a pairing fails, not just that it does.", rating: 4.5 },
    { name: "Diego Fuentes", role: "Content lead", quote: "Headline scores are transparent — length, power words, numbers. No black-box magic, just a formula you can argue with.", rating: 5 },
    { name: "Amara Osei", role: "Web developer", quote: "Snippet fixtures included. I wired the JSON formatter into my build script in ten minutes.", rating: 4.5 },
    { name: "Viktor Novak", role: "Indie hacker", quote: "Single-file HTML, no install, no telemetry. It's the toolkit equivalent of a Swiss army knife.", rating: 5 },
    { name: "Grace Kim", role: "UX designer", quote: "The colour pairer only suggests AA-passing combinations. My accessibility audit findings dropped by half.", rating: 5 },
    { name: "Elias Brandt", role: "Technical writer", quote: "Readability scores with the formula printed beside them. My editors trust the number because they can check it.", rating: 4.5 },
  ],
  "notion-system": [
    { name: "Lucia Ferreira", role: "Operations manager", quote: "Imported all three CSVs in ten minutes. The board, calendar and timeline just appeared, fully linked.", rating: 5 },
    { name: "Ben Whitaker", role: "Startup founder", quote: "The rituals changed how the team runs sprints. We stopped firefighting because Friday review is now non-negotiable.", rating: 5 },
    { name: "Anika Roy", role: "Content manager", quote: "25 seeded rows meant I could see how the system behaves full — before typing a single task myself.", rating: 4.5 },
    { name: "Tomas Berger", role: "Sales lead", quote: "The deal review ritual is the reason our pipeline forecast stopped being a work of fiction.", rating: 5 },
    { name: "Clara Nunes", role: "Solo founder", quote: "Life OS is the first personal dashboard I've kept past week three. The monthly rollup is genuinely motivating.", rating: 4.5 },
    { name: "Owen Fletcher", role: "Project manager", quote: "The formula reference taught my team Notion formulas faster than any tutorial we'd tried.", rating: 5 },
    { name: "Yuki Tanaka", role: "Team lead", quote: "Duplicate link worked first try, no broken relations. That never happens with shared templates.", rating: 5 },
    { name: "Sofia Almeida", role: "Consultant", quote: "I spin up a client workspace from this in twenty minutes. It looks like a week of setup work.", rating: 4.5 },
  ],
  "assessment-tool": [
    { name: "Dr. Elena Marsh", role: "Leadership coach", quote: "The band thresholds and weighted scoring match platforms I've paid 10× for. It runs from one HTML file.", rating: 5 },
    { name: "Ravi Patel", role: "HR business partner", quote: "We run the readiness quiz before every internal launch. The gap report became our go/no-go artifact.", rating: 4.5 },
    { name: "Nadia Haq", role: "Course creator", quote: "Placement went from a gut call to a scored decision. Students start in the right module now.", rating: 5 },
    { name: "James O'Connor", role: "Bootcamp director", quote: "25 questions, four bands, one offline file. It replaced a subscription we were barely using.", rating: 4.5 },
    { name: "Freja Lund", role: "Career coach", quote: "The strengths report gives people language for their profile. Clients share their result pages unprompted.", rating: 5 },
    { name: "Mateo Ruiz", role: "Startup advisor", quote: "The action-item map turns a score into homework. That's the difference between a quiz and a diagnostic.", rating: 5 },
    { name: "Chloe Bennett", role: "Program manager", quote: "Keyboard-only, screen-reader friendly. Our accessibility reviewer passed it without a single finding.", rating: 4.5 },
    { name: "Stefan Weber", role: "Educational lead", quote: "Runs on the school's offline laptops by double-clicking the file. That constraint is the feature.", rating: 5 },
  ],
  "website-kit": [
    { name: "Dr. Michael Osei", role: "Practice owner", quote: "Launched our dental site in a weekend. The booking flow and confirmation emails were already written.", rating: 5 },
    { name: "Rachel Kim", role: "Studio manager", quote: "Class schedule updates take minutes now. The content model tells me exactly which file to edit.", rating: 4.5 },
    { name: "Alexandra Reed", role: "Managing partner", quote: "The intake form is confidential by design, and the disclaimer set saved us a legal review round.", rating: 5 },
    { name: "Marco Bianchi", role: "Restaurant owner", quote: "Reservations doubled in six weeks. The confirmation email alone cut our no-shows.", rating: 5 },
    { name: "Dr. Sofia Hanson", role: "Dental office manager", quote: "Followed the local-SEO checklist item by item — we're now the top map result for our suburb.", rating: 4.5 },
    { name: "Tyler Brooks", role: "Gym owner", quote: "Membership tiers finally read clearly. Sign-ups stopped emailing us 'so what's the difference?'", rating: 4.5 },
    { name: "Hannah Lee", role: "Attorney", quote: "Practice-area pages are actually written for clients, not for other lawyers. Rare.", rating: 5 },
    { name: "Georges Martin", role: "Bistro owner", quote: "Our menu showed up in search with prices and all — the schema files did that. Unreal for a template.", rating: 5 },
  ],
  default: [
    { name: "Maya Reyes", role: "Freelance designer", quote: "Saved me a full weekend. I edited it Monday morning and shipped by Tuesday lunch.", rating: 5 },
    { name: "Daniel Kovač", role: "Agency owner", quote: "The structure alone was worth the price — it felt like borrowing a senior operator's brain.", rating: 5 },
    { name: "Priya Sharma", role: "Marketing lead", quote: "We plugged it in on Friday and our Monday campaign looked like we'd hired an agency.", rating: 4.5 },
    { name: "Tom Beaulieu", role: "Startup founder", quote: "Absurdly complete. Every file I opened had a reason to exist — zero filler.", rating: 5 },
    { name: "Sofia Marchetti", role: "Ops manager", quote: "Our team adopted it in one afternoon. The docs are better than tools we pay 10× for.", rating: 4.5 },
    { name: "Jonas Weber", role: "Consultant", quote: "I've bought a dozen of these over the years. This is the first one I didn't have to fix before using.", rating: 5 },
    { name: "Alina Petrova", role: "Business coach", quote: "Clients noticed the upgrade immediately. It made my small operation look established.", rating: 5 },
    { name: "Marcus Chen", role: "Product manager", quote: "Genuinely production-grade. We shipped it to customers with only brand changes.", rating: 4.5 },
  ],
};

const UPDATED_POOL = ["Oct 2025", "Sep 2025", "Aug 2025", "Jul 2025", "Jun 2025", "May 2025"];

const RATING_COUNT_RANGE: Record<string, [number, number]> = {
  A: [8, 90],
  B: [24, 260],
  C: [40, 420],
  D: [18, 160],
  E: [6, 40],
  S: [30, 300],
};

/* ── Plate numbers — stable across the whole catalog ───────────────── */

const CATALOG_ORDER: { tierLetter: string; productTypeId: string; exampleName: string }[] = [];
for (const section of [...productTierCategories, {
  letter: "S",
  products: subscriptionSection.products,
}]) {
  for (const product of section.products) {
    for (const ex of product.examples) {
      CATALOG_ORDER.push({
        tierLetter: section.letter,
        productTypeId: product.id,
        exampleName: ex.exampleName,
      });
    }
  }
}

const PLATE_INDEX: Record<string, number> = {};
CATALOG_ORDER.forEach((e, i) => {
  PLATE_INDEX[`${e.tierLetter}:${e.productTypeId}:${slug(e.exampleName)}`] = i + 1;
});

function plateNoFor(tierLetter: string, productTypeId: string, exampleName: string): string {
  const n = PLATE_INDEX[`${tierLetter}:${productTypeId}:${slug(exampleName)}`] ?? 1;
  return `No. ${String(n).padStart(3, "0")}`;
}

/* ── Hero lookup ──────────────────────────────────────────────────── */

const HERO_BY_KEY: Record<string, (typeof HEROES)[number]> = {};
for (const hero of HEROES) {
  HERO_BY_KEY[`${hero.tierLetter}:${hero.archetype}:${slug(hero.example)}`] = hero;
}

/* ── Bytes resolution ─────────────────────────────────────────────── */

function estBytes(ext: string, seed: string): number {
  const [lo, hi] = SIZE_RANGE[ext] ?? [4, 40];
  return (lo + (hashString(seed) % Math.max(1, hi - lo))) * 1024;
}

function twinBytes(kind: string, srcBytes: number): number {
  if (kind === "docx") return Math.max(11_000, Math.round(srcBytes * 2.2));
  return 4_200 + Math.round(srcBytes * 1.05); // pdf
}

function measuredBytes(offerId: string, path: string, ext: string, seed: string): number {
  const measured = KIT_BYTES[offerId]?.[path];
  if (typeof measured === "number" && measured > 0) return measured;
  return estBytes(ext, seed);
}

/* ── Root files — real for every offer (shared archetype sources) ── */

function rootFilesFor(
  offerId: string,
  archetype: string,
  quoteTier: boolean
): BundleFile[] {
  if (quoteTier) {
    return [
      { path: "README.md", ext: "md", bytes: 2_800, flag: "real", source: "_shared/root/README.md" },
      { path: "statement-of-work.pdf", ext: "pdf", bytes: 418_000, flag: "extended" },
      { path: "solution-brief.pdf", ext: "pdf", bytes: 352_000, flag: "extended" },
      { path: "delivery-plan.pdf", ext: "pdf", bytes: 284_000, flag: "extended" },
    ];
  }
  const root: BundleFile[] = [
    { path: "README.md", ext: "md", bytes: 2_600, flag: "real", source: "_shared/root/README.md" },
    { path: "LICENSE.md", ext: "md", bytes: 1_800, flag: "real", source: "_shared/root/LICENSE.md" },
    { path: "CHANGELOG.md", ext: "md", bytes: 1_400, flag: "real", source: "_shared/root/CHANGELOG.md" },
    { path: "QUICK-START.md", ext: "md", bytes: 2_200, flag: "real", source: "_shared/root/QUICK-START.md" },
  ];
  if (archetype === "notion-system") {
    root.push({ path: "duplicate-link.md", ext: "md", bytes: 900, flag: "real", source: "_shared/root/duplicate-link.md" });
  }
  return root.map((r) => ({ ...r, bytes: measuredBytes(offerId, r.path, r.ext, r.path) }));
}

/* ── Proof derivation ─────────────────────────────────────────────── */

function deriveProof(seed: string, tierLetter: string, archetype: string): ProofV2 {
  const h = hashString(`${seed}:social`);
  const h2 = hashString(`${seed}:sold`);
  const range = RATING_COUNT_RANGE[tierLetter] ?? RATING_COUNT_RANGE.B;
  const ratingCount = range[0] + (h % (range[1] - range[0]));
  const soldCount = ratingCount * (2 + (h % 3)) + 40 + (h2 % 300);
  const bank = PERSONA_BANKS[archetype] ?? PERSONA_BANKS.default;
  return {
    rating: 4.5 + (h % 5) * 0.1,
    ratingCount,
    soldCount,
    soldLabel: fmtSold(soldCount),
    version: `v${1 + ((h >> 2) % 3)}.${(h >> 1) % 5}`,
    updated: UPDATED_POOL[h2 % UPDATED_POOL.length],
    testimonial: bank[hashString(`${seed}:voice`) % bank.length],
    demo: true,
  };
}

/* ── Bank sub-item resolution (word-boundary + dedupe) ────────────── */

function nextArchetypeSet(archetype: string, h: number, i: number, used: Set<string[]>): string[] {
  const sets = ARCHETYPE_SETS[archetype] ?? ARCHETYPE_SETS.default;
  for (let k = 0; k < sets.length; k++) {
    const s = sets[(h + i + k) % sets.length];
    if (!used.has(s)) return s;
  }
  return sets[(h + i) % sets.length];
}

function subItemsFor(item: string, archetype: string, h: number, i: number, used: Set<string[]>): string[] {
  const bank = KEYWORD_BANKS.find((b) => b.re.test(item) && !used.has(b.set));
  const set = bank ? bank.set : nextArchetypeSet(archetype, h, i, used);
  used.add(set);
  return set;
}

function extFor(subItem: string, archetype: string): string {
  for (const [re, ext] of EXT_RULES) {
    if (re.test(subItem)) return ext;
  }
  return ARCHETYPE_EXT[archetype] ?? "zip";
}

/* ════════════════════════════════════════════════════════════════════
   deriveOffer — hero first, banks second. Promise-accurate.
   ════════════════════════════════════════════════════════════════════ */

export function deriveOffer(opts: {
  tierLetter: string;
  productTypeId: string;
  exampleName: string;
  features: string[];
  exampleDescription?: string;
}): OfferV2 {
  const { tierLetter, productTypeId, exampleName, features } = opts;
  const archetype = productTypeId as Archetype;
  const base = slug(exampleName);
  const registryId = `${tierLetter}:${productTypeId}:${base}`;
  const quoteTier = tierLetter === "E";
  const h = hashString(`${productTypeId}:${exampleName}`);

  /* 1 · Hero lookup — real, authored, promise-accurate */
  const hero = HERO_BY_KEY[`${tierLetter}:${archetype}:${base}`];
  if (hero) {
    const deliverables: BundleFolder[] = hero.folders.map((folder) => ({
      id: folder.id,
      title: folder.title,
      promise: folder.promise,
      files: folder.files.map((spec) => {
        const ext = spec.path.split(".").pop() ?? "md";
        if (spec.flag === "extended") {
          return { path: spec.path, ext, bytes: spec.bytes ?? 6_000, flag: "extended" as const };
        }
        if (spec.generated) {
          const srcExt = spec.generated.split(".").pop() ?? "md";
          const src = measuredBytes(hero.offerId, spec.generated, srcExt, spec.path);
          return {
            path: spec.path,
            ext,
            bytes: twinBytes(ext, src),
            flag: "real" as const,
            source: spec.generated,
          };
        }
        return {
          path: spec.path,
          ext,
          bytes: measuredBytes(hero.offerId, spec.path, ext, spec.path),
          flag: (spec.flag ?? "real") as "real" | "sample",
          source: spec.path,
        };
      }),
    }));

    const rootSpec = rootFilesFor(hero.offerId, archetype, false);
    const extraRoot = (hero.extraRoot ?? []).map((spec) => {
      const ext = spec.path.split(".").pop() ?? "md";
      return {
        path: spec.path,
        ext,
        bytes: measuredBytes(hero.offerId, spec.path, ext, spec.path),
        flag: "real" as const,
        source: spec.path,
      };
    });
    const root = [...rootSpec, ...extraRoot];

    if (hero.extended?.length) {
      deliverables.push({
        id: "99",
        title: "Extended pack — in production",
        promise: "Bonus content currently in production, included free with this edition",
        files: hero.extended.map((e) => ({
          path: `EXTENDED-PACK/${e.path}`,
          ext: e.path.split(".").pop() ?? "md",
          bytes: e.bytes,
          flag: "extended" as const,
          note: e.what,
        })),
      });
    }

    const all = [...deliverables.flatMap((d) => d.files), ...root];
    const realCount = all.filter((f) => f.flag !== "extended").length;

    return {
      offerId: hero.offerId,
      id: registryId,
      title: hero.title,
      promise: hero.promise,
      archetype,
      tierLetter,
      price: { amount: hero.price[0], compareAt: hero.price[1] },
      deliverables,
      root,
      policies: hero.policies.map((id) => ({ id, label: POLICY_LABELS[id] })),
      formats: hero.formats,
      proof: deriveProof(`${productTypeId}:${exampleName}`, tierLetter, archetype),
      authored: true,
      edition: "Edition 2026",
      plateNo: plateNoFor(tierLetter, productTypeId, exampleName),
      realShare: all.length > 0 ? realCount / all.length : 0,
    };
  }

  /* 2 · Bank derivation for non-hero examples — honest extended flags */

  const ladder = PRICE_LADDERS[tierLetter] ?? PRICE_LADDERS.B;
  const [price, compareAt] = ladder.length > 0 ? ladder[h % ladder.length] : [null, null];
  const formats = FORMATS[productTypeId] ?? ["ZIP", "PDF"];
  const extras = EXTRAS[productTypeId] ?? ["Quick-start guide", "Free updates"];
  const rawManifest = [...features, ...extras];

  /* Policy extraction — policies leave the file tree entirely */
  const policies: Policy[] = [];
  const policyIds = new Set<PolicyId>();
  const manifestLines: string[] = [];
  for (const line of rawManifest) {
    const hit = POLICY_PATTERNS.find((p) => p.re.test(line));
    if (hit && !policyIds.has(hit.id)) {
      policyIds.add(hit.id);
      policies.push({ id: hit.id, label: POLICY_LABELS[hit.id] });
      continue;
    }
    if (hit) continue; // duplicate policy line — consumed once
    manifestLines.push(line);
  }
  for (const id of POLICIES_BY_TIER[tierLetter] ?? POLICIES_BY_TIER.B) {
    if (!policyIds.has(id)) {
      policyIds.add(id);
      policies.push({ id, label: POLICY_LABELS[id] });
    }
  }

  /* Deny-list — root/policy/setup lines never route to a file bank */
  const deliverableLines = manifestLines.filter((line) => !DENY_LIST.test(line));

  const usedSets = new Set<string[]>();
  const usedPaths = new Set<string>();
  const folders: BundleFolder[] = [];
  deliverableLines.forEach((item, i) => {
    const subs = subItemsFor(item, productTypeId, h, i, usedSets);
    const files: BundleFile[] = [];
    for (const sub of subs) {
      const ext = extFor(sub, productTypeId);
      const name = slug(sub).slice(0, 42) || "file";
      const path = `${String(folders.length + 1).padStart(2, "0")}-${slug(item).slice(0, 26) || "chapter"}/${name}.${ext}`;
      if (usedPaths.has(path)) continue; // dedupe — drop, never rename
      usedPaths.add(path);
      files.push({ path, ext, bytes: estBytes(ext, `${sub}:${productTypeId}`), flag: "extended" });
    }
    if (files.length > 0) {
      folders.push({
        id: String(folders.length + 1).padStart(2, "0"),
        title: item,
        promise: item,
        files,
      });
    }
  });

  const root = rootFilesFor(registryId, productTypeId, quoteTier);
  const all = [...folders.flatMap((d) => d.files), ...root];
  const realCount = all.filter((f) => f.flag !== "extended").length;

  return {
    offerId: registryId,
    id: registryId,
    title: exampleName,
    promise: opts.exampleDescription ?? formats.join(" · "),
    archetype,
    tierLetter,
    price: { amount: price, compareAt, period: tierLetter === "S" ? "/mo" : undefined },
    deliverables: folders,
    root,
    policies,
    formats,
    proof: deriveProof(`${productTypeId}:${exampleName}`, tierLetter, archetype),
    authored: false,
    edition: "Edition 2026",
    plateNo: plateNoFor(tierLetter, productTypeId, exampleName),
    realShare: all.length > 0 ? realCount / all.length : 0,
  };
}

/* ── Helpers used by the UI ────────────────────────────────────────── */

/** Flat list of every file path in the bundle (downloads, receipts). */
export function offerFiles(offer: OfferV2): string[] {
  return [
    ...offer.deliverables.flatMap((f) => f.files.map((file) => file.path)),
    ...offer.root.map((file) => file.path),
  ];
}

/** Manifest line for a folder — promise text, numbered by folder id. */
export function manifestLines(offer: OfferV2): string[] {
  return offer.deliverables.map((f) => f.promise);
}
