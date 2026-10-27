/* ════════════════════════════════════════════════════════════════════
   Hero kit authoring DSL — the 20 hand-authored kits (build plan v3,
   authoring matrix). Every hero's file tree is authored here; contents
   live in kit-content/<offerId>/content.ts keyed by path.
   ════════════════════════════════════════════════════════════════════ */

import type { Archetype, PolicyId } from "../schema";

/** A file in a hero kit. */
export interface FileSpec {
  /** Path inside the bundle, e.g. '01-welcome-series/day-0-welcome.md' */
  path: string;
  /** real by default */
  flag?: "real" | "sample" | "extended";
  /** For generated twins (.docx/.pdf rendered from a .md source at compile time) */
  generated?: string;
  /** Ranged bytes — only for extended stubs (flag: 'extended') */
  bytes?: number;
}

/** real file whose source key equals its path. */
export const f = (path: string): FileSpec => ({ path });

/** real .docx / .pdf generated from a markdown source at compile time. */
export const gen = (path: string, from: string): FileSpec => ({ path, generated: from });

/** honest "in production" stub — ships as EXTENDED-PACK/<path>.md. */
export const stub = (path: string, bytes: number): FileSpec => ({
  path,
  flag: "extended",
  bytes,
});

export interface FolderSpec {
  /** '01' */
  id: string;
  /** Describes EVERY child file */
  title: string;
  /** The manifest line it fulfils */
  promise: string;
  files: FileSpec[];
}

export interface ExtendedSpec {
  /** e.g. 'dark-mode-html-variants.md' — becomes EXTENDED-PACK/<path> */
  path: string;
  /** What the finished file will contain (ships inside the stub) */
  what: string;
  bytes: number;
}

export interface HeroDef {
  /** 'B-TP-1' */
  offerId: string;
  /** Matches exampleProducts exampleName, e.g. 'EmailPack' */
  example: string;
  archetype: Archetype;
  tierLetter: string;
  /** Listing title, e.g. 'Email Template Pack' */
  title: string;
  promise: string;
  /** [price, compareAt] */
  price: [number, number];
  formats: string[];
  policies: PolicyId[];
  folders: FolderSpec[];
  /** Bonus content honestly labelled "in production" */
  extended?: ExtendedSpec[];
  /** Extra root file beyond the archetype root 4 (e.g. duplicate-link for Notion) */
  extraRoot?: FileSpec[];
}

/* ── Shared folder recipes (each block keeps its own shape) ────────── */

/** Setup folder every kit carries: setup guide (PDF) + hosted walkthrough link. */
export function setupFolder(
  files: FileSpec[] = []
): FolderSpec {
  return {
    id: "05",
    title: "Setup guide",
    promise: "Get running in under an hour",
    files: [gen("05-setup/setup-guide.pdf", "05-setup/setup-guide.md"), f("05-setup/walkthrough-link.md"), ...files],
  };
}
