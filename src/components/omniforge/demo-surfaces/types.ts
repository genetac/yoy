"use client";

/* ════════════════════════════════════════════════════════════════════
   Demo surface contracts (build plan v3 · P3). Every surface is
   keyboard-complete, network-free, sample-ribboned, resettable, and
   ends with a "Get the full kit" card. Content comes from
   kit-content/<offerId>/demo.ts; archetypes without an authored demo
   fall back to a per-archetype default in ./index.ts.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent, OfferV2 } from "../catalog/schema";

export type { DemoContent } from "../catalog/schema";
export type {
  QuizDemoContent,
  ToolDemoContent,
  TemplateReaderDemoContent,
  NotionTourDemoContent,
  SiteFlythroughDemoContent,
} from "../catalog/schema";

export interface DemoSurfaceProps {
  offer: OfferV2;
  content: DemoContent;
  /** Fires when the buyer finishes the demo (analytics + CTA nudge). */
  onComplete?: (result: unknown) => void;
}

export type DemoKind = "quiz" | "tool" | "templates" | "notion" | "site";

/** Maps an OfferV2 archetype to its playable demo kind. */
export function demoKindFor(archetype: string): DemoKind | null {
  switch (archetype) {
    case "assessment-tool": return "quiz";
    case "toolkit": return "tool";
    case "template-pack": return "templates";
    case "notion-system": return "notion";
    case "website-kit": return "site";
    default: return null;
  }
}
