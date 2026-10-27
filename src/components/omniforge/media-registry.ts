/* ════════════════════════════════════════════════════════════════════
   MediaRegistry (build plan v3 · P2) — every vertical and archetype
   maps to a poster plus up to two loops. One registry, one player.

   SOURCING NOTE (D3): this edition ships with real poster photography
   (Pexels stills) + DOM living-imagery (cinemagraph pan / live screen
   loops of the actual demos). `sources` slots stay empty-but-typed:
   drop real encoded loops in later with ZERO UI change. Credits are
   required the moment a video source is added (build fails without).
   ════════════════════════════════════════════════════════════════════ */

export type Vertical = "dental" | "gym" | "law" | "restaurant";
export type ArchetypeId =
  | "template-pack" | "toolkit" | "notion-system" | "assessment-tool" | "website-kit";

export interface MediaAsset {
  id: string;
  /** AVIF/WebP still, loads first, always present */
  poster: string;
  /** Empty in this edition → the player renders the DOM loop instead */
  sources?: { src: string; type: "video/webm; codecs=av01" | "video/mp4" }[];
  durationS?: number;
  /** object-position for crops */
  focal?: [number, number];
  /** 0–0.4 dark overlay for text legibility */
  veil?: number;
  /** Required the moment sources are non-empty */
  credit?: { author: string; source: "pexels" | "coverr" | "own"; url: string };
  kind: "cinemagraph" | "mini" | "screen";
  /** DOM loop rendered when sources are absent */
  dom?: DomLoopId;
}

export type DomLoopId = "typer" | "gauge" | "board" | "toolbar" | "site" | "pan";

export type MediaKey =
  | `hero:${string}`   // per offerId
  | `arch:${ArchetypeId}`
  | `vert:${Vertical}`;

const P = (id: number, w = 1000) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&h=626&w=${w}`;

/** Registry — look up by offerId first, then archetype, then vertical. */
export const MEDIA: Record<string, MediaAsset> = {
  /* ── Verticals (Website Kit heroes) — real-life photography ────── */
  "vert:dental": { id: "dental.reception", poster: P(6627651), focal: [0.5, 0.45], veil: 0.18, kind: "cinemagraph", dom: "site" },
  "vert:gym": { id: "gym.floor", poster: P(3888405), focal: [0.5, 0.4], veil: 0.15, kind: "cinemagraph", dom: "site" },
  "vert:law": { id: "law.office", poster: P(6077091), focal: [0.55, 0.4], veil: 0.2, kind: "cinemagraph", dom: "site" },
  "vert:restaurant": { id: "restaurant.room", poster: P(67468), focal: [0.5, 0.45], veil: 0.15, kind: "cinemagraph", dom: "site" },

  /* ── Archetypes — screen loops of the real demos ────────────────── */
  "arch:template-pack": { id: "tp.typer", poster: P(374074, 800), kind: "screen", dom: "typer" },
  "arch:toolkit": { id: "tk.toolbar", poster: P(256502, 800), kind: "screen", dom: "toolbar" },
  "arch:notion-system": { id: "ns.board", poster: P(10567169, 800), kind: "screen", dom: "board" },
  "arch:assessment-tool": { id: "as.gauge", poster: P(6684209, 800), kind: "screen", dom: "gauge" },
  "arch:website-kit": { id: "wk.site", poster: P(6627651, 800), kind: "screen", dom: "site" },

  /* ── Hero examples (offerId-keyed; posters are the catalog stills) ── */
  "hero:B-TP-1": { id: "tp1", poster: P(374074, 800), kind: "screen", dom: "typer" },
  "hero:B-TP-2": { id: "tp2", poster: P(4939604, 800), kind: "screen", dom: "typer" },
  "hero:B-TP-3": { id: "tp3", poster: P(4068294, 800), kind: "screen", dom: "typer" },
  "hero:B-TP-4": { id: "tp4", poster: P(4174742, 800), kind: "screen", dom: "typer" },
  "hero:B-TK-1": { id: "tk1", poster: P(256502, 800), kind: "screen", dom: "toolbar" },
  "hero:B-TK-2": { id: "tk2", poster: P(3987066, 800), kind: "screen", dom: "toolbar" },
  "hero:B-TK-3": { id: "tk3", poster: P(6424583, 800), kind: "screen", dom: "toolbar" },
  "hero:B-TK-4": { id: "tk4", poster: P(34803986, 800), kind: "screen", dom: "toolbar" },
  "hero:B-NS-1": { id: "ns1", poster: P(10567169, 800), kind: "screen", dom: "board" },
  "hero:B-NS-2": { id: "ns2", poster: P(6177596, 800), kind: "screen", dom: "board" },
  "hero:B-NS-3": { id: "ns3", poster: P(7504756, 800), kind: "screen", dom: "board" },
  "hero:B-NS-4": { id: "ns4", poster: P(8472561, 800), kind: "screen", dom: "board" },
  "hero:B-AS-1": { id: "as1", poster: P(6684209, 800), kind: "screen", dom: "gauge" },
  "hero:B-AS-2": { id: "as2", poster: P(31115182, 800), kind: "screen", dom: "gauge" },
  "hero:B-AS-3": { id: "as3", poster: P(6683673, 800), kind: "screen", dom: "gauge" },
  "hero:B-AS-4": { id: "as4", poster: P(6683441, 800), kind: "screen", dom: "gauge" },
  "hero:C-WK-1": { id: "wk1", poster: P(6627651), focal: [0.5, 0.45], veil: 0.15, kind: "cinemagraph", dom: "site" },
  "hero:C-WK-2": { id: "wk2", poster: P(3888405), focal: [0.5, 0.4], veil: 0.12, kind: "cinemagraph", dom: "site" },
  "hero:C-WK-3": { id: "wk3", poster: P(6077091), focal: [0.55, 0.4], veil: 0.18, kind: "cinemagraph", dom: "site" },
  "hero:C-WK-4": { id: "wk4", poster: P(67468), focal: [0.5, 0.45], veil: 0.12, kind: "cinemagraph", dom: "site" },
};

export function resolveMedia(opts: {
  offerId?: string;
  archetype?: string;
  vertical?: Vertical;
}): MediaAsset | null {
  if (opts.offerId && MEDIA[`hero:${opts.offerId}`]) return MEDIA[`hero:${opts.offerId}`];
  if (opts.vertical && MEDIA[`vert:${opts.vertical}`]) return MEDIA[`vert:${opts.vertical}`];
  if (opts.archetype && MEDIA[`arch:${opts.archetype}`]) return MEDIA[`arch:${opts.archetype}`];
  return null;
}

/** Studio footer renders these (stock licence compliance). */
export function mediaCredits(assets: MediaAsset[]): string[] {
  return assets
    .filter((a) => a.credit)
    .map((a) => `${a.id}: ${a.credit!.author} — ${a.credit!.source} (${a.credit!.url})`);
}
