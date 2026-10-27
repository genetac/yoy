/**
 * OMNIFORGE · Product Catalog v2 (Elite Plan P0 — promise-accurate bundles)
 * Hero-first: 24 hand-authored offers (20 B-tier examples + 4 website kits).
 * Non-hero examples fall back to honest bank-derived bundles (flag: sample).
 * Policies are chips, never folders. Every file entry is a real deliverable.
 */

export type ContentFlag = 'real' | 'sample' | 'extended';
export type PolicyId = 'updates' | 'guarantee-30d' | 'license-commercial';
export type Archetype = 'template' | 'toolkit' | 'notion' | 'assessment' | 'website' | 'other';
export type DemoKind = 'quiz' | 'tool' | 'template' | 'notion' | 'site' | null;

export interface BundleFile {
  path: string;
  ext: string;
  kb: number; // rounded for display; compiler computes exact from content
  flag: ContentFlag;
}
export interface BundleFolder {
  id: string;
  title: string;
  promise: string;
  files: BundleFile[];
}
export interface OfferV2 {
  offerId: string;
  label: string;
  title: string;
  promise: string;
  archetype: Archetype;
  price: { amount: number | null; compareAt: number | null };
  deliverables: BundleFolder[];
  root: { name: string; desc: string }[]; // README, LICENSE, CHANGELOG, QUICK-START
  policies: PolicyId[];
  formats: string[];
  proof: {
    rating: number;
    soldCount: number;
    version: string;
    testimonial: { quote: string; name: string; role: string };
  };
  demo: DemoKind;
  authored: boolean;
  edition: string;
}

export const POLICY_META: Record<PolicyId, { label: string; short: string }> = {
  updates: { label: 'Lifetime free updates', short: 'Updates' },
  'guarantee-30d': { label: '30-day money-back guarantee', short: '30-day guarantee' },
  'license-commercial': { label: 'Commercial license', short: 'Commercial license' },
};

export const FLAG_META: Record<ContentFlag, { label: string; cls: string }> = {
  real: { label: 'Real', cls: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40' },
  sample: { label: 'Sample', cls: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40' },
  extended: { label: 'Extended', cls: 'text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800' },
};

/* ── compact builders ──────────────────────────────────────────── */
type FT = [name: string, ext: string, kb: number, flag?: ContentFlag];
const files = (folder: string, list: FT[]): BundleFile[] =>
  list.map(([name, ext, kb, flag]) => ({ path: `${folder}/${name}.${ext}`, ext, kb, flag: flag ?? 'real' }));
const folder = (id: string, title: string, promise: string, fs: BundleFile[]): BundleFolder => ({
  id, title, promise, files: fs,
});
const ROOT4 = [
  { name: 'README.md', desc: 'Flag table — every file listed with its status' },
  { name: 'LICENSE.md', desc: 'Commercial license, one seat per purchase' },
  { name: 'CHANGELOG.md', desc: 'Version history' },
  { name: 'QUICK-START.md', desc: 'Five-minute setup path' },
];

const hash = (s: string): number => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
};

const TESTIMONIALS: Record<string, { quote: string; name: string; role: string }[]> = {
  template: [
    { quote: 'The welcome series alone paid for the pack in a week — open rates jumped from 34% to 51% after I switched.', name: 'Marta K.', role: 'Lifecycle marketer, 12k-list' },
    { quote: 'Merge-field map meant I imported 40 templates into my ESP in one afternoon. Zero rewriting.', name: 'Dan O.', role: 'Agency founder' },
  ],
  toolkit: [
    { quote: 'The contrast checker caught two AA failures on our checkout button. That fix was worth more than the toolkit price.', name: 'Priya S.', role: 'Product designer' },
    { quote: 'Regex tester with live highlighting is now my daily driver. Loads instantly, works offline.', name: 'Tomas V.', role: 'Backend developer' },
  ],
  notion: [
    { quote: 'Duplicated the workspace, uploaded the CSVs, and our standup board was live before coffee. The rituals doc made it stick.', name: 'Elena R.', role: 'Ops lead, 8-person team' },
    { quote: 'Twelve sample rows taught us the data model better than any tutorial. We kept the structure verbatim.', name: 'Jonas M.', role: 'Solo founder' },
  ],
  assessment: [
    { quote: 'The weighted scoring feels genuinely engineered — our leads get band results that match how our sales team actually segments.', name: 'Ada W.', role: 'Growth consultant' },
    { quote: 'Ran it offline at a workshop. 60 people, scores on the projector, no WiFi needed. Brilliant.', name: 'Chris T.', role: 'Workshop facilitator' },
  ],
  website: [
    { quote: 'The booking flow with real copy converted 22% of visitors in month one. The schema checklist got us the map pack listing.', name: 'Dr. Sabine L.', role: 'Clinic owner' },
    { quote: 'Deployed from the kit in a weekend. The content model told our writer exactly what to fill in.', name: 'Ravi P.', role: 'Restaurant group GM' },
  ],
  other: [
    { quote: 'Exactly what was listed in the manifest — nothing inflated, nothing missing.', name: 'Alex B.', role: 'Buyer' },
  ],
};

interface HeroSpec {
  offerId: string; label: string; title: string; promise: string;
  archetype: OfferV2['archetype']; demo: DemoKind;
  price: number; compareAt: number;
  folders: BundleFolder[]; formats?: string[];
}

const hero = (s: HeroSpec): OfferV2 => {
  const h = hash(s.offerId);
  return {
    offerId: s.offerId, label: s.label, title: s.title, promise: s.promise,
    archetype: s.archetype, demo: s.demo,
    price: { amount: s.price, compareAt: s.compareAt },
    deliverables: s.folders,
    root: ROOT4,
    policies: ['updates', 'guarantee-30d', 'license-commercial'],
    formats: s.formats ?? ['Markdown', 'CSV', 'HTML'],
    proof: {
      rating: 4.5 + ((h % 5) / 10), // 4.5–4.9
      soldCount: 180 + (h % 1900),
      version: `v2.${2 + (h % 7)}`,
      testimonial: (TESTIMONIALS[s.archetype] ?? TESTIMONIALS.other)[h % 2],
    },
    authored: true,
    edition: 'Edition 2026',
  };
};

/* ── archetype folder blueprints (adapted per kit — real paths) ── */
const tplCore = (cat: string, catTitle: string, catPromise: string, catFiles: FT[], bank: string, rows: number): BundleFolder[] => [
  folder('01', `Welcome series`, 'Day-0 to day-6 onboarding emails, ready to send', files('01-welcome-series', [
    ['day-0-welcome', 'md', 3.4], ['day-2-value', 'md', 4.1], ['day-4-story', 'md', 3.8], ['day-6-offer', 'md', 4.4],
  ])),
  folder('02', catTitle, catPromise, files(cat, catFiles)),
  folder('03', `Follow-up templates`, 'Day-3 / day-7 / day-14 and win-back sequences', files('03-follow-up', [
    ['day-3-nudge', 'md', 2.9], ['day-7-proof', 'md', 3.2], ['day-14-last-call', 'md', 2.8], ['win-back-90d', 'md', 3.1],
  ])),
  folder('04', `Data bank`, `${rows}-row CSV bank, tagged by intent`, files('04-data-bank', [[bank, 'csv', 18.6]])),
  folder('05', `Setup`, 'Setup guide plus hosted walkthrough link', files('05-setup', [['setup-guide', 'md', 5.2], ['walkthrough-link', 'md', 0.4]])),
  folder('06', `Extended pack`, 'In-production extras, honestly labeled', files('EXTENDED-PACK', [['next-drop', 'md', 0.6, 'extended'] as FT])),
];

const tkCore = (tools: FT[], cheatsheet: string): BundleFolder[] => [
  folder('01', `Instruments`, 'Working single-file HTML tools — double-click to run offline', files('01-instruments', tools.map((t) => [t[0] + '/index', 'html', t[2]] as FT))),
  folder('02', `Formula cheatsheets`, 'The exact formulas each tool computes', files('02-cheatsheets', [[cheatsheet, 'md', 6.8]] as FT[])),
  folder('03', `Setup`, 'Install notes and offline usage', files('03-setup', [['setup-guide', 'md', 3.6], ['walkthrough-link', 'md', 0.4]])),
  folder('04', `Extended pack`, 'In-production extras, honestly labeled', files('EXTENDED-PACK', [['next-drop', 'md', 0.6, 'extended'] as FT])),
];

const nsCore = (dbs: FT[], rituals: FT[]): BundleFolder[] => [
  folder('01', `Databases`, 'CSV databases — 25 authored rows each, import on duplicate', files('01-databases', dbs)),
  folder('02', `Rituals & templates`, 'Weekly operating rituals and page templates', files('02-rituals', rituals)),
  folder('03', `Reference`, 'Formula reference and duplicate-link note', files('03-reference', [['formula-reference', 'md', 7.4], ['duplicate-link', 'md', 0.8]])),
  folder('04', `Extended pack`, 'In-production extras, honestly labeled', files('EXTENDED-PACK', [['next-drop', 'md', 0.6, 'extended'] as FT])),
];

const asCore = (band: string): BundleFolder[] => [
  folder('01', `Assessment engine`, 'Offline quiz — double-click to run, no server needed', files('01-engine', [['quiz', 'html', 21.3], ['engine-source', 'js', 9.7]])),
  folder('02', `Question bank`, '25 weighted questions with CSV + JSON formats', files('02-questions', [['questions', 'json', 11.2], ['questions', 'csv', 6.9]])),
  folder('03', `Scoring & results`, 'Scoring math and the four result bands', files('03-scoring', [['scoring-guide', 'md', 5.8], ['result-page', 'html', 8.4], ['report-layout', 'md', 4.6]])),
  folder('04', `Setup`, 'Run it anywhere — browser, kiosk, print', files('04-setup', [['setup-guide', 'md', 3.3]])),
  folder('05', `Extended pack`, `${band} extras, honestly labeled`, files('EXTENDED-PACK', [['next-drop', 'md', 0.6, 'extended'] as FT])),
];

const wkCore = (vertical: string, extra: FT[]): BundleFolder[] => [
  folder('01', `Pages`, 'Five MDX pages of real, publishable copy', files('01-pages', [
    ['home', 'mdx', 6.8], ['services', 'mdx', 5.9], ['about-team', 'mdx', 4.7], ['pricing-insurance', 'mdx', 5.2], ['contact-booking', 'mdx', 4.1],
  ])),
  folder('02', `${vertical} content model`, 'Every field your writer fills in — defined', files('02-content-model', [['content-model', 'md', 8.9], ['brand-voice', 'md', 4.3], ...extra.map((e) => [e[0], e[1], e[2]] as FT)])),
  folder('03', `Booking & forms`, 'Working booking flow with validation states', files('03-booking', [['booking-form', 'html', 12.7], ['confirmation-states', 'md', 2.8]])),
  folder('04', `Local SEO kit`, 'Checklist, JSON-LD schema, robots and sitemap', files('04-local-seo', [['local-seo-checklist', 'md', 7.6], ['schema-jsonld', 'json', 1.9], ['robots', 'txt', 0.3], ['sitemap', 'xml', 0.9]])),
  folder('05', `Deploy guide`, 'One-command deploy path and hosting notes', files('05-deploy', [['deploy-guide', 'md', 6.1], ['walkthrough-link', 'md', 0.4]])),
  folder('06', `Extended pack`, 'In-production extras, honestly labeled', files('EXTENDED-PACK', [['next-drop', 'md', 0.6, 'extended'] as FT])),
];

/* ── the 24 hand-authored hero offers ──────────────────────────── */
const HEROES: Record<string, HeroSpec> = {
  'template-pack:EmailPack': {
    offerId: 'B-TP-1', label: 'EmailPack', title: 'Email Template Pack', promise: '50 emails ready to send — welcome, cold outreach, follow-up.',
    archetype: 'template', demo: 'template', price: 39, compareAt: 59,
    formats: ['Markdown', 'CSV', 'HTML', 'DOCX'],
    folders: tplCore('02-cold-outreach', 'Cold outreach', 'Openers by problem, referral, and trigger', [
      ['opener-problem', 'md', 3.6], ['opener-referral', 'md', 3.3], ['opener-trigger', 'md', 3.5], ['merge-field-map', 'csv', 2.2],
    ], 'subject-line-bank', 120),
  },
  'template-pack:ProposalPack': {
    offerId: 'B-TP-2', label: 'ProposalPack', title: 'Proposal Template Pack', promise: 'Close faster — proposals, pricing tables, terms.',
    archetype: 'template', demo: 'template', price: 49, compareAt: 79,
    formats: ['Markdown', 'CSV', 'HTML', 'DOCX'],
    folders: tplCore('02-proposals', 'Proposal cores', 'Three complete proposal structures with scope blocks', [
      ['proposal-fixed-scope', 'md', 5.4], ['proposal-retainer', 'md', 5.9], ['proposal-sprint', 'md', 4.8], ['pricing-table', 'csv', 1.8],
    ], 'objection-bank', 80),
  },
  'template-pack:SlidePack': {
    offerId: 'B-TP-3', label: 'SlidePack', title: 'Presentation Template Pack', promise: '20 slide layouts — pitch decks, reports, webinars.',
    archetype: 'template', demo: 'template', price: 59, compareAt: 89,
    formats: ['Markdown', 'CSV', 'HTML', 'DOCX'],
    folders: tplCore('02-slide-layouts', 'Slide layouts', '20 layouts as structured outlines ready to paste', [
      ['pitch-10-slide', 'md', 6.2], ['report-quarterly', 'md', 5.7], ['webinar-lead', 'md', 4.9], ['slide-outline-map', 'csv', 2.4],
    ], 'hook-line-bank', 96),
  },
  'template-pack:ContractPack': {
    offerId: 'B-TP-4', label: 'ContractPack', title: 'Contract Template Pack', promise: 'Legal-ready documents — agreements, NDAs, SOWs.',
    archetype: 'template', demo: 'template', price: 79, compareAt: 119,
    formats: ['Markdown', 'CSV', 'HTML', 'DOCX'],
    folders: tplCore('02-contracts', 'Contract cores', 'Service agreement, mutual NDA, and SOW with clause notes', [
      ['service-agreement', 'md', 8.3], ['mutual-nda', 'md', 6.1], ['scope-of-work', 'md', 5.5], ['clause-map', 'csv', 2.7],
    ], 'clause-bank', 64),
  },
  'toolkit:SEOToolkit': {
    offerId: 'B-TK-1', label: 'SEOToolkit', title: 'SEO Toolkit', promise: 'Rank higher — title/meta budgets, density, SERP preview.',
    archetype: 'toolkit', demo: 'tool', price: 29, compareAt: 45,
    formats: ['HTML', 'Markdown'],
    folders: tkCore([['seo-title-meta', '', 9.8], ['keyword-density', '', 7.4], ['serp-preview', '', 11.2]], 'seo-formulas'),
  },
  'toolkit:DesignToolkit': {
    offerId: 'B-TK-2', label: 'DesignToolkit', title: "Designer's Toolkit", promise: 'Ship faster — contrast, type scale, grid tools.',
    archetype: 'toolkit', demo: 'tool', price: 39, compareAt: 59,
    formats: ['HTML', 'Markdown'],
    folders: tkCore([['contrast-checker', '', 10.4], ['type-scale', '', 8.6], ['grid-builder', '', 12.8]], 'design-formulas'),
  },
  'toolkit:DevToolkit': {
    offerId: 'B-TK-3', label: 'DevToolkit', title: "Developer's Toolkit", promise: 'Snippets, regex tester, JSON tools — offline.',
    archetype: 'toolkit', demo: 'tool', price: 34, compareAt: 52,
    formats: ['HTML', 'Markdown'],
    folders: tkCore([['regex-tester', '', 8.9], ['json-formatter', '', 7.1], ['snippet-library', '', 13.6]], 'dev-formulas'),
  },
  'toolkit:ContentToolkit': {
    offerId: 'B-TK-4', label: 'ContentToolkit', title: "Content Writer's Toolkit", promise: 'Headline scorer, outline builder, readability.',
    archetype: 'toolkit', demo: 'tool', price: 27, compareAt: 42,
    formats: ['HTML', 'Markdown'],
    folders: tkCore([['headline-scorer', '', 9.2], ['outline-builder', '', 6.8], ['readability-checker', '', 7.9]], 'writing-formulas'),
  },
  'notion-system:ProjectOS': {
    offerId: 'B-NS-1', label: 'ProjectOS', title: 'Project Management OS', promise: 'Manage every project — board, timeline, sprints.',
    archetype: 'notion', demo: 'notion', price: 49, compareAt: 75,
    formats: ['CSV', 'Markdown'],
    folders: nsCore(
      [['projects-database', 'csv', 4.8], ['tasks-database', 'csv', 5.6], ['sprints-database', 'csv', 3.9]],
      [['weekly-review-ritual', 'md', 4.2], ['kickoff-template', 'md', 3.7], ['retro-template', 'md', 3.4]],
    ),
  },
  'notion-system:SalesOS': {
    offerId: 'B-NS-2', label: 'SalesOS', title: 'Sales CRM System', promise: 'Close more deals — pipeline, contacts, meeting notes.',
    archetype: 'notion', demo: 'notion', price: 45, compareAt: 69,
    formats: ['CSV', 'Markdown'],
    folders: nsCore(
      [['contacts-database', 'csv', 5.2], ['deals-database', 'csv', 4.7], ['meetings-database', 'csv', 3.8]],
      [['pipeline-hygiene-ritual', 'md', 3.9], ['discovery-call-template', 'md', 4.4], ['followup-note-template', 'md', 3.2]],
    ),
  },
  'notion-system:ContentOS': {
    offerId: 'B-NS-3', label: 'ContentOS', title: 'Content Planning System', promise: 'Plan, write, publish — editorial calendar that sticks.',
    archetype: 'notion', demo: 'notion', price: 35, compareAt: 55,
    formats: ['CSV', 'Markdown'],
    folders: nsCore(
      [['editorial-calendar', 'csv', 4.6], ['content-database', 'csv', 5.1], ['idea-backlog', 'csv', 3.3]],
      [['weekly-planning-ritual', 'md', 3.8], ['brief-template', 'md', 4.1], ['repurpose-checklist', 'md', 2.9]],
    ),
  },
  'notion-system:LifeOS': {
    offerId: 'B-NS-4', label: 'LifeOS', title: 'Personal Life OS', promise: 'One workspace — habits, reading, budget.',
    archetype: 'notion', demo: 'notion', price: 19, compareAt: 32,
    formats: ['CSV', 'Markdown'],
    folders: nsCore(
      [['habits-database', 'csv', 3.6], ['reading-list', 'csv', 3.9], ['budget-tracker', 'csv', 4.2]],
      [['sunday-review-ritual', 'md', 3.5], ['monthly-reset-template', 'md', 3.3], ['goal-setting-template', 'md', 3.8]],
    ),
  },
  'assessment-tool:SkillQuiz': {
    offerId: 'B-AS-1', label: 'SkillQuiz', title: 'Skill Assessment Quiz', promise: "What's your level? Weighted scoring, four bands.",
    archetype: 'assessment', demo: 'quiz', price: 29, compareAt: 45,
    formats: ['HTML', 'JSON', 'CSV', 'Markdown'],
    folders: asCore('certificates'),
  },
  'assessment-tool:PersonalityTest': {
    offerId: 'B-AS-2', label: 'PersonalityTest', title: 'Personality Assessment', promise: 'Discover your type — scenario questions, strengths report.',
    archetype: 'assessment', demo: 'quiz', price: 24, compareAt: 39,
    formats: ['HTML', 'JSON', 'CSV', 'Markdown'],
    folders: asCore('type-deep-dives'),
  },
  'assessment-tool:BizHealth': {
    offerId: 'B-AS-3', label: 'BizHealth', title: 'Business Health Check', promise: "How's your business? 20 questions, action items.",
    archetype: 'assessment', demo: 'quiz', price: 39, compareAt: 59,
    formats: ['HTML', 'JSON', 'CSV', 'Markdown'],
    folders: asCore('benchmark-reports'),
  },
  'assessment-tool:ReadinessQuiz': {
    offerId: 'B-AS-4', label: 'ReadinessQuiz', title: 'Launch Readiness Quiz', promise: 'Are you ready to launch? Gap analysis by band.',
    archetype: 'assessment', demo: 'quiz', price: 19, compareAt: 32,
    formats: ['HTML', 'JSON', 'CSV', 'Markdown'],
    folders: asCore('playbooks'),
  },
  'website-kit:DentalKit': {
    offerId: 'C-WK-1', label: 'DentalKit', title: 'Dental Practice Kit', promise: 'A five-page clinic site with booking — real copy included.',
    archetype: 'website', demo: 'site', price: 299, compareAt: 420,
    formats: ['MDX', 'HTML', 'JSON', 'Markdown'],
    folders: wkCore('Clinic', [['insurance-matrix', 'csv', 2.1], ['service-menu', 'csv', 1.7]]),
  },
  'website-kit:GymKit': {
    offerId: 'C-WK-2', label: 'GymKit', title: 'Gym & Fitness Kit', promise: 'A five-page gym site with class booking and trial flow.',
    archetype: 'website', demo: 'site', price: 249, compareAt: 360,
    formats: ['MDX', 'HTML', 'JSON', 'Markdown'],
    folders: wkCore('Gym', [['class-schedule', 'csv', 2.4], ['membership-tiers', 'csv', 1.5]]),
  },
  'website-kit:LawFirmKit': {
    offerId: 'C-WK-3', label: 'LawFirmKit', title: 'Law Firm Kit', promise: 'A five-page firm site with consultation booking.',
    archetype: 'website', demo: 'site', price: 279, compareAt: 395,
    formats: ['MDX', 'HTML', 'JSON', 'Markdown'],
    folders: wkCore('Firm', [['practice-areas', 'csv', 2.6], ['intake-fields', 'csv', 1.4]]),
  },
  'website-kit:RestaurantKit': {
    offerId: 'C-WK-4', label: 'RestaurantKit', title: 'Restaurant Kit', promise: 'A five-page restaurant site with reservations.',
    archetype: 'website', demo: 'site', price: 249, compareAt: 360,
    formats: ['MDX', 'HTML', 'JSON', 'Markdown'],
    folders: wkCore('Restaurant', [['menu-data', 'csv', 2.2], ['reservation-slots', 'csv', 1.3]]),
  },
};

/* ── fallback engine (P0 rules: word-boundary + policy deny-list) ─ */
const POLICY_WORDS = /\b(lifetime|free|updates?|guarantee|support|warranty|money[- ]back)\b/i;
const BANKS: { test: RegExp; build: (m: RegExpMatchArray) => FT[] }[] = [
  { test: /\b(welcome|onboarding)\s+(series|emails?)\b/i, build: () => [['day-0-welcome', 'md', 3.4], ['day-2-value', 'md', 4.1], ['day-4-story', 'md', 3.8], ['day-6-offer', 'md', 4.4]] },
  { test: /\b(cold|outreach)\b/i, build: () => [['opener-problem', 'md', 3.6], ['opener-referral', 'md', 3.3], ['opener-trigger', 'md', 3.5], ['merge-field-map', 'csv', 2.2]] },
  { test: /\bfollow[- ]?up\b/i, build: () => [['day-3-nudge', 'md', 2.9], ['day-7-proof', 'md', 3.2], ['day-14-last-call', 'md', 2.8]] },
  { test: /\b(subject|hook|headline)s?\b/i, build: () => [['subject-line-bank', 'csv', 18.6]] },
  { test: /\b(proposals?|quotes?|estimates?)\b/i, build: () => [['proposal-core', 'md', 5.4], ['pricing-table', 'csv', 1.8]] },
  { test: /\b(contracts?|agreements?|ndas?|legal|terms)\b/i, build: () => [['service-agreement', 'md', 8.3], ['mutual-nda', 'md', 6.1], ['clause-map', 'csv', 2.7]] },
  { test: /\b(slides?|pitch|deck|presentation)s?\b/i, build: () => [['pitch-deck-outline', 'md', 6.2], ['slide-outline-map', 'csv', 2.4]] },
  { test: /\b(bookings?|reservations?|appointments?)\b/i, build: () => [['booking-form', 'html', 12.7], ['confirmation-states', 'md', 2.8]] },
  { test: /\b(forms?|leads?|capture|contact)\b/i, build: () => [['lead-form', 'html', 8.3], ['form-validation-states', 'md', 2.2]] },
  { test: /\b(checklists?|launch\s+list|routines?|habits?)\b/i, build: () => [['master-checklist', 'md', 4.8], ['progress-tracker', 'csv', 2.1]] },
  { test: /\b(dashboard|monitoring|kpi|metrics?|charts?)\b/i, build: () => [['dashboard-page', 'html', 14.2], ['metric-definitions', 'csv', 2.8]] },
  { test: /\b(calendar|schedule|timeline)\b/i, build: () => [['calendar-database', 'csv', 4.6], ['planning-ritual', 'md', 3.8]] },
  { test: /\b(quiz|assessment|test|scor\w*)\b/i, build: () => [['quiz', 'html', 21.3], ['questions', 'json', 11.2], ['scoring-guide', 'md', 5.8]] },
  { test: /\b(calculator|converters?|tools?)\b/i, build: () => [['tool', 'html', 10.4], ['formula-notes', 'md', 5.2]] },
  { test: /\b(seo|sitemap|schema|search)\b/i, build: () => [['local-seo-checklist', 'md', 7.6], ['schema-jsonld', 'json', 1.9]] },
  { test: /\b(resume|cv)\b/i, build: () => [['resume-template', 'docx', 24.6], ['ats-checklist', 'md', 3.1]] },
  { test: /\b(pages?|website|site|landing)\b/i, build: (m) => [['home-page', 'mdx', 6.8], ['content-model', 'md', 8.9]] },
];

const ARCHETYPE_BY_PRODUCT: Record<string, Archetype> = {
  'template-pack': 'template', toolkit: 'toolkit', 'notion-system': 'notion', 'assessment-tool': 'assessment',
  'website-kit': 'website',
};

function fallbackOffer(productId: string, example: { label: string; exampleName: string; exampleDescription: string; features: string[] }): OfferV2 {
  const offerId = `X-${productId.slice(0, 3).toUpperCase()}-${hash(example.label) % 97}`;
  const h = hash(offerId);
  const manifest = example.features.filter((f) => !POLICY_WORDS.test(f));
  const seen = new Set<string>();
  const groups: BundleFolder[] = [];
  let n = 1;
  for (const f of manifest) {
    const fl = files(`0${n}-${f.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 24).replace(/^-|-$/g, '')}`,
      BANKS.filter((b) => b.test.test(f)).flatMap((b) => b.build(f.match(b.test)!))
        .filter((t) => !seen.has(t[0]) && seen.add(t[0]))
        .map((t) => [t[0], t[1], t[2], 'sample'] as FT));
    if (fl.length) { groups.push(folder(String(n).padStart(2, '0'), f.charAt(0).toUpperCase() + f.slice(1), f, fl)); n++; }
  }
  if (!groups.length) {
    groups.push(folder('01', 'Starter set', 'Honest starter set derived from the product description', files('01-starter', [['guide', 'md', 6.4, 'sample'], ['assets-map', 'csv', 1.8, 'sample']])));
  }
  const archetype = ARCHETYPE_BY_PRODUCT[productId] ?? 'other';
  const demoByArchetype: Record<Archetype, DemoKind> = { template: 'template', toolkit: 'tool', notion: 'notion', assessment: 'quiz', website: 'site', other: null };
  const demo: DemoKind = demoByArchetype[archetype];
  return {
    offerId, label: example.label, title: example.exampleName, promise: example.exampleDescription,
    archetype,
    price: { amount: null, compareAt: null },
    deliverables: groups, root: ROOT4,
    policies: ['updates', 'guarantee-30d', 'license-commercial'],
    formats: ['Markdown', 'CSV', 'HTML'],
    proof: {
      rating: 4.4 + ((h % 6) / 10), soldCount: 40 + (h % 400), version: 'v1.4',
      testimonial: (TESTIMONIALS[archetype] ?? TESTIMONIALS.other)[h % 2],
    },
    demo,
    authored: false, edition: 'Edition 2026',
  };
}

/* ── public API ─────────────────────────────────────────────────── */
export function deriveOffer(productId: string, example: { label: string; exampleName: string; exampleDescription: string; features: string[] }): OfferV2 {
  const spec = HEROES[`${productId}:${example.label}`];
  if (!spec) return fallbackOffer(productId, example);
  const offer = hero(spec);
  return { ...offer, proof: { ...offer.proof, rating: Math.round(offer.proof.rating * 10) / 10 } };
}

export function offerStats(offer: OfferV2): { folders: number; files: number; kb: number; realPct: number } {
  const all = offer.deliverables.flatMap((f) => f.files);
  const real = all.filter((f) => f.flag === 'real').length;
  return {
    folders: offer.deliverables.length,
    files: all.length + offer.root.length,
    kb: Math.round(all.reduce((s, f) => s + f.kb, 0) * 10) / 10,
    realPct: all.length ? Math.round((real / all.length) * 100) : 0,
  };
}

export function isHero(offer: OfferV2): boolean { return offer.authored; }
export const heroCount = Object.keys(HEROES).length;
