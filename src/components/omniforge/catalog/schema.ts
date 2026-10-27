/* ════════════════════════════════════════════════════════════════════
   OMNIFORGE catalog schema v2 (build plan v3 · P0)

   Hard split between what a buyer RECEIVES (deliverables, root files),
   what they are PROMISED contractually (policies) and what PROVES value
   (proof). A file never lies: its flag says whether the bytes in the
   ZIP are authored (real), trimmed-authored (sample) or an honest
   "in production" stub (extended).
   ════════════════════════════════════════════════════════════════════ */

export type ContentFlag = "real" | "sample" | "extended";

/** Product archetypes that own a playable demo surface (P3). */
export type DemoArchetype =
  | "template-pack"
  | "toolkit"
  | "notion-system"
  | "assessment-tool"
  | "website-kit";

/** Every product archetype in the catalog (superset of DemoArchetype). */
export type Archetype =
  | DemoArchetype
  | "landing-template"
  | "calculator"
  | "resume-kit"
  | "checklist"
  | "dashboard"
  | "design-system"
  | "training-product"
  | "appointment-system"
  | "client-portal"
  | "inventory-dashboard"
  | "crm-package"
  | "saas-tool"
  | "monitoring-dashboard"
  | "booking-system"
  | "research-platform"
  | "custom-saas"
  | "marketplace"
  | "multi-tenant-app"
  | "enterprise-system";

/* ── Files ─────────────────────────────────────────────────────────── */

export interface BundleFile {
  /** Full path inside the bundle, e.g. '01-welcome-series/day-0-welcome.md' */
  path: string;
  /** Extension for iconography: 'md' | 'docx' | 'csv' | ... */
  ext: string;
  /** Bytes as displayed (measured for real files via sync script, ranged for extended/twins) */
  bytes: number;
  /**
   * real     = authored content ships in the ZIP
   * sample   = trimmed authored content ships in the ZIP
   * extended = honest "in production" stub ships in the ZIP
   */
  flag: ContentFlag;
  /** Key into kit-content/<offerId> — required (and must resolve) when flag !== 'extended' */
  source?: string;
  /** For extended stubs: what the finished file will contain (ships inside the stub) */
  note?: string;
}

export interface BundleFolder {
  /** '01' */
  id: string;
  /** Must describe every child file ("Welcome series" ✓, "5 pages" ✗) */
  title: string;
  /** The manifest line this folder fulfils */
  promise: string;
  files: BundleFile[];
}

/* ── Policies — never files, always chips ──────────────────────────── */

export type PolicyId =
  | "updates"
  | "guarantee-30d"
  | "license-commercial"
  | "license-team"
  | "support";

export interface Policy {
  id: PolicyId;
  label: string;
}

/* ── Proof ─────────────────────────────────────────────────────────── */

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface ProofV2 {
  rating: number;
  ratingCount: number;
  soldCount: number;
  soldLabel: string;
  version: string;
  updated: string;
  /** Deterministically picked from the per-archetype persona bank */
  testimonial: Testimonial;
  /** Proof values are illustrative until the backend exists — always tagged */
  demo: true;
}

/* ── The offer ─────────────────────────────────────────────────────── */

export interface OfferV2 {
  /** Stable catalog id, e.g. 'B-TP-1' (heroes) or 'B:template-pack:emailpack' */
  offerId: string;
  /** Registry id used by the purchase flow (unchanged from v1 for session compat) */
  id: string;
  /** Example name, e.g. 'EmailPack' */
  title: string;
  /** One-line promise under the title */
  promise: string;
  archetype: Archetype;
  tierLetter: string;
  price: { amount: number | null; compareAt: number | null; period?: "/mo" };
  /** Only things you receive */
  deliverables: BundleFolder[];
  /** README, LICENSE, CHANGELOG, QUICK-START */
  root: BundleFile[];
  /** Contractual chips: Updates · 30-day guarantee · Commercial license */
  policies: Policy[];
  formats: string[];
  proof: ProofV2;
  /** true = hand-authored hero kit; false = bank-derived tree */
  authored: boolean;
  /** 'Edition 2026' — no fake scarcity caps */
  edition: string;
  /** 'No. 048' — stable plate number across the whole catalog */
  plateNo: string;
  /** Share of files with flag 'real' (0–1). < 0.6 hides the word "Complete". */
  realShare: number;
}

/* ── Derived bundle stats (receipts, listing footers) ──────────────── */

export interface BundleStats {
  fileCount: number;
  folderCount: number;
  rootCount: number;
  totalBytes: number;
}

export function bundleStats(offer: Pick<OfferV2, "deliverables" | "root">): BundleStats {
  const deliverableFiles = offer.deliverables.reduce((n, f) => n + f.files.length, 0);
  const totalBytes =
    offer.deliverables.reduce(
      (n, f) => n + f.files.reduce((m, file) => m + file.bytes, 0),
      0
    ) + offer.root.reduce((m, file) => m + file.bytes, 0);
  return {
    fileCount: deliverableFiles + offer.root.length,
    folderCount: offer.deliverables.length,
    rootCount: offer.root.length,
    totalBytes,
  };
}

export function fmtBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} B`;
}

/* ── Demo content (P3 "Try it" tab) — loaded from kit-content ──────── */

export interface QuizQuestion {
  q: string;
  options: { label: string; weight: number }[];
}

export interface QuizDemoContent {
  kind: "quiz";
  intro: string;
  questions: QuizQuestion[];
  /** Bands sorted by threshold desc — Platinum ≥ 85 etc. */
  bands: { name: string; min: number; blurb: string }[];
}

export interface ToolDemoContent {
  kind: "tool";
  tool: "seo" | "contrast" | "regex" | "headline";
  intro: string;
  presets: { label: string; payload: Record<string, string> }[];
}

export interface TemplateDoc {
  id: string;
  folder: string;
  title: string;
  subject: string;
  mergeFields: { key: string; sample: string }[];
  body: string;
}

export interface TemplateReaderDemoContent {
  kind: "templates";
  intro: string;
  templates: TemplateDoc[];
}

export interface NotionRow {
  id: string;
  task: string;
  owner: string;
  status: "Backlog" | "In progress" | "Review" | "Done";
  due: string; // ISO date
  priority: "Low" | "Med" | "High";
  effort: number; // points
}

export interface NotionTourDemoContent {
  kind: "notion";
  intro: string;
  workspaceName: string;
  rows: NotionRow[];
}

export interface SitePageSection {
  kind: "hero" | "services" | "proof" | "team" | "booking" | "hours" | "gallery";
  heading: string;
  copy: string;
}

export interface SiteFlythroughDemoContent {
  kind: "site";
  intro: string;
  siteName: string;
  vertical: "dental" | "gym" | "law" | "restaurant";
  pages: { id: string; title: string; sections: SitePageSection[] }[];
  bookingFields: { key: string; label: string; type: "text" | "tel" | "select"; options?: string[] }[];
}

export type DemoContent =
  | QuizDemoContent
  | ToolDemoContent
  | TemplateReaderDemoContent
  | NotionTourDemoContent
  | SiteFlythroughDemoContent;
