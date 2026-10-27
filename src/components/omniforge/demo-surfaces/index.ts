/* ════════════════════════════════════════════════════════════════════
   Demo registry (build plan v3 · P3) — maps archetypes to their
   surface, loads kit-content demo data per offer (code-split), and
   provides an authored per-archetype fallback for non-hero examples
   so every Try-it tab is real, never "coming soon".
   ════════════════════════════════════════════════════════════════════ */

import type { ComponentType } from "react";
import type { DemoContent, OfferV2 } from "../catalog/schema";
import type { DemoKind, DemoSurfaceProps } from "./types";

export { demoKindFor } from "./types";
export type { DemoSurfaceProps, DemoKind } from "./types";
export type {
  QuizDemoContent,
  ToolDemoContent,
  TemplateReaderDemoContent,
  NotionTourDemoContent,
  SiteFlythroughDemoContent,
} from "../catalog/schema";

/* ── Lazy surface loaders (each ≤ ~35 KB gzipped chunk) ───────────── */

const SURFACES: Record<DemoKind, () => Promise<{ [k: string]: ComponentType<DemoSurfaceProps> }>> = {
  quiz: () => import("./QuizDemo").then((m) => ({ default: m.QuizDemo })),
  tool: () => import("./ToolDemo").then((m) => ({ default: m.ToolDemo })),
  templates: () => import("./TemplateReaderDemo").then((m) => ({ default: m.TemplateReaderDemo })),
  notion: () => import("./NotionTourDemo").then((m) => ({ default: m.NotionTourDemo })),
  site: () => import("./SiteFlythrough").then((m) => ({ default: m.SiteFlythrough })),
};

export function loadDemoSurface(kind: DemoKind) {
  return SURFACES[kind]();
}

/* ── Kit-content demo lookup (heroes) + fallback bank (non-heroes) ── */

export async function loadDemoContent(offer: OfferV2): Promise<DemoContent> {
  if (offer.authored) {
    try {
      const mod = await import(`../kit-content/${offer.offerId}/content.ts`);
      if (mod?.demo) return mod.demo as DemoContent;
    } catch {
      /* fall through to the authored fallback below */
    }
  }
  return FALLBACK_DEMOS[offer.archetype] ?? FALLBACK_DEMOS.default;
}

/* ── Fallback demo bank — real content, one per archetype ─────────── */

import type {
  QuizDemoContent,
  TemplateReaderDemoContent,
  ToolDemoContent,
  NotionTourDemoContent,
  SiteFlythroughDemoContent,
} from "../catalog/schema";

const QUIZ_FALLBACK: QuizDemoContent = {
  kind: "quiz",
  intro:
    "A taste of the assessment engine: weighted options, four bands, sealed result. The full kit ships 25 authored questions and the offline HTML engine.",
  questions: [
    { q: "When you start a new project, you first…", options: [{ label: "Sketch the whole plan end-to-end", weight: 3 }, { label: "Build the riskiest piece first", weight: 4 }, { label: "Research until it feels safe", weight: 2 }, { label: "Wait for the brief to firm up", weight: 1 }] },
    { q: "Your workload is 20% over capacity this week. You…", options: [{ label: "Renegotiate the two least-committed deadlines", weight: 4 }, { label: "Work the weekend", weight: 2 }, { label: "Do everything, slightly worse", weight: 1 }, { label: "Drop the smallest client task silently", weight: 3 }] },
    { q: "A stakeholder disagrees with your call. Your first move…", options: [{ label: "Ask what they're optimizing for", weight: 4 }, { label: "Defend the reasoning", weight: 3 }, { label: "Concede to keep momentum", weight: 1 }, { label: "Escalate to the decision-maker", weight: 2 }] },
    { q: "You learn best by…", options: [{ label: "Rebuilding a small version myself", weight: 4 }, { label: "Reading the primary source", weight: 3 }, { label: "Watching an expert work", weight: 2 }, { label: "Waiting until it's urgent", weight: 1 }] },
  ],
  bands: [
    { name: "Platinum", min: 85, blurb: "Instincts first: you de-risk and clarify before you execute." },
    { name: "Gold", min: 70, blurb: "Strong practitioner — the report maps your specific gaps." },
    { name: "Silver", min: 50, blurb: "Foundations there; decision instincts are the compounding next step." },
    { name: "Bronze", min: 0, blurb: "Early days — the explanations matter more than the score." },
  ],
};

const TOOL_FALLBACK: ToolDemoContent = {
  kind: "tool",
  tool: "headline",
  intro:
    "A working instrument from the toolkit, live in this tab — the same formula documented in the kit's cheatsheet. The download ships it as a standalone offline HTML tool.",
  presets: [
    { label: "Numbered + negative", payload: { headline: "7 mistakes that quietly kill your landing page" } },
    { label: "Too long", payload: { headline: "The ultimate, complete, everything-you-could-possibly-need guide to marketing in 2026" } },
    { label: "Flat", payload: { headline: "Some thoughts on productivity" } },
  ],
};

const TEMPLATES_FALLBACK: TemplateReaderDemoContent = {
  kind: "templates",
  intro:
    "Open a flagship template, fill a merge field, copy the result. The full kit ships every template as .md + .docx with a merge-field map.",
  templates: [
    {
      id: "welcome",
      folder: "01-welcome-series",
      title: "Day 0 — Welcome + quick win",
      subject: "Welcome — here's the thing I promised you",
      mergeFields: [
        { key: "first_name", sample: "Maya" },
        { key: "company_name", sample: "Forge Labs" },
        { key: "quick_win_screen", sample: "the Alerts tab" },
      ],
      body: `{{first_name}},

Thanks for joining — I'm glad you're here.

Before anything else, here's the quick win I promised: open
{{product_name}} and go straight to {{quick_win_screen}}. Change one
setting, and watch what happens the next time you publish.

Five minutes, one meaningful result. Everything else I send builds
on that single change.

Reply and tell me how it worked out — I read every reply.

— {{sender_name}}
{{company_name}}`,
    },
    {
      id: "nudge",
      folder: "03-follow-up",
      title: "Day 3 — The gentle nudge",
      subject: "Re: the original thread",
      mergeFields: [
        { key: "first_name", sample: "Daniel" },
        { key: "later_window", sample: "six weeks" },
      ],
      body: `{{first_name}},

Floating this back up — I know weeks like this.

One thing that might help the decision: the one-page breakdown I
mentioned. Happy to share it regardless of what you decide.

If the timing is simply wrong, a one-word "later" works and I'll
circle back in {{later_window}}.

— {{sender_name}}`,
    },
  ],
};

const NOTION_FALLBACK: NotionTourDemoContent = {
  kind: "notion",
  workspaceName: "Workspace tour",
  intro:
    "Switch the four views over the same rows — board, table, calendar and timeline are one database, exactly like the duplicate-ready workspace. The owner filter works across every view.",
  rows: [
    { id: "R-1", task: "Draft the Q4 narrative", owner: "Maya", status: "In progress", due: "2026-10-14", priority: "High", effort: 5 },
    { id: "R-2", task: "Accessibility audit", owner: "Alina", status: "Review", due: "2026-10-15", priority: "High", effort: 8 },
    { id: "R-3", task: "Instrument billing funnels", owner: "Jonas", status: "Backlog", due: "2026-10-21", priority: "Med", effort: 5 },
    { id: "R-4", task: "Empty-states copy pass", owner: "Alina", status: "Backlog", due: "2026-10-24", priority: "Low", effort: 3 },
    { id: "R-5", task: "Customer interviews", owner: "Priya", status: "In progress", due: "2026-10-19", priority: "Med", effort: 3 },
    { id: "R-6", task: "Security review", owner: "Jonas", status: "Done", due: "2026-10-13", priority: "High", effort: 3 },
    { id: "R-7", task: "Dark-mode token sweep", owner: "Maya", status: "Backlog", due: "2026-10-26", priority: "Low", effort: 3 },
    { id: "R-8", task: "Pricing FAQ rewrite", owner: "Priya", status: "Review", due: "2026-10-17", priority: "Med", effort: 2 },
  ],
};

const SITE_FALLBACK: SiteFlythroughDemoContent = {
  kind: "site",
  siteName: "Your Practice",
  vertical: "dental",
  intro:
    "A 25-second tour of the page structure, then the booking form. The full kit ships five authored pages as MDX plus this working flow.",
  pages: [
    {
      id: "home",
      title: "Home",
      sections: [
        { kind: "hero", heading: "Care that respects your time", copy: "Same-week appointments. Transparent pricing before we start. A team that explains everything — including what not to spend on." },
        { kind: "services", heading: "What we do", copy: "Check-ups & hygiene, treatment consultations, and emergency slots held daily — every service page lists a from-price and what changes it." },
        { kind: "proof", heading: "4.9 stars across 800+ reviews", copy: "\"They told me what I didn't need before what I did. I've sent four friends.\"" },
      ],
    },
    {
      id: "contact",
      title: "Book",
      sections: [
        { kind: "booking", heading: "Book a visit", copy: "The form takes 60 seconds — we confirm by text within one business hour." },
        { kind: "hours", heading: "Hours & location", copy: "Mon–Thu 7:30–18:00 · Fri 8:00–15:00 · Sat 9:00–13:00. Step-free access, same-block parking." },
      ],
    },
  ],
  bookingFields: [
    { key: "name", label: "Your name", type: "text" },
    { key: "phone", label: "Phone", type: "tel" },
    { key: "reason", label: "Reason", type: "select", options: ["Check-up & cleaning", "Consultation", "Emergency — I'm in pain"] },
    { key: "time", label: "Preferred time", type: "select", options: ["Morning", "Afternoon", "First available"] },
  ],
};

const FALLBACK_DEMOS: Record<string, DemoContent> = {
  "assessment-tool": QUIZ_FALLBACK,
  toolkit: TOOL_FALLBACK,
  "template-pack": TEMPLATES_FALLBACK,
  "notion-system": NOTION_FALLBACK,
  "website-kit": SITE_FALLBACK,
  default: TEMPLATES_FALLBACK,
};
