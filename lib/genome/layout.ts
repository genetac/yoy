/**
 * OMNIFORGE · Genome layout contract (v3 refactor)
 *
 * The missing piece between the switches and the component layer: a single
 * source of truth for WHAT each switch value structurally changes, so
 *
 *   1. every template model implements the switch as a real layout
 *      rearrangement (not a colour filter), each in its own way, and
 *   2. the console + the in-template layer inspector can say, in clear
 *      text, exactly what the current layer does to the model on screen.
 *
 * Templates read `world.hero` (an arrangement kind) and `world.picks`;
 * the console reads EFFECTS; the inspector labels sections live.
 */

/* ── hero arrangement kinds ─────────────────────────────────────── */

export type HeroKind = 'split' | 'center' | 'offset' | 'ledger' | 'cinema' | 'mosaic' | 'diagonal';

export const HERO_KINDS: HeroKind[] = ['split', 'center', 'offset', 'ledger', 'cinema', 'mosaic', 'diagonal'];

/** Composition option → hero arrangement kind used by every model. */
export const COMPOSITION_HERO: Record<string, HeroKind> = {
  native: 'split',
  centered: 'center',
  asymmetric: 'offset',
  grid: 'ledger',
  fullbleed: 'cinema',
  modular: 'mosaic',
  diagonal: 'diagonal',
};

export function heroKindOf(composition: string): HeroKind {
  return COMPOSITION_HERO[composition] ?? 'split';
}

/* ── per-layer effect texts — the "clear texts UI" source ────────── */

export interface LayerEffects {
  /** what the layer governs (panel subtitle) */
  governs: string;
  /** per-value: what visibly changes in a rendered model */
  values: Record<string, string[]>;
}

export const EFFECTS: Record<string, LayerEffects> = {
  direction: {
    governs: 'Type scale, margins, caption style, image crops and mood — together',
    values: {
      editorial: ['Display type grows and tightens; sections gain running numbers', 'Margins widen; captions set as small mono index lines'],
      architectural: ['Everything squares to the grid — radius drops to 0, rules sharpen', 'Technical captions, tracked-out mono labels, harder image crops'],
      gallery: ['Whitespace doubles; type thins to a light weight', 'Images float on plain ground with tiny neutral captions'],
      atelier: ['Surfaces gain warm depth shadows; crops soften', 'Serif details return; buttons and cards feel hand-finished'],
      futurist: ['Display type snaps to uppercase with a luminous accent glow', 'Cards get an inner top-light; motion quickens'],
      heritage: ['Headings set in small caps with engraved double rules', 'Crops square off; motion slows to archival pace'],
    },
  },
  voice: {
    governs: 'The semantic type roles — display, headline, body, caption and data',
    values: {
      serif: ['Display & headlines set in an editorial serif (Cormorant Garamond)', 'Dashboard chrome re-voices itself to the same pairing'],
      grotesk: ['One neutral grotesque (Inter) carries every role — engineered calm', 'Numbers and captions tighten into a data-first rhythm'],
      contrast: ['High-contrast display serif (Playfair) against a quiet geometric body (Manrope)', 'Fashion-editorial tension between big type and small text'],
      technical: ['Space Grotesk headlines with JetBrains Mono data — instrument-panel voice', 'Labels uppercase, numerals tabular, everything aligned to columns'],
      humanist: ['Warm Fraunces display over rounded humanist body text', 'Softer caps and friendlier captions — hospitality warmth'],
      condensed: ['Syne display, tight and luxurious, with Manrope body', 'Poster-like headlines, compact line lengths'],
    },
  },
  material: {
    governs: 'Backgrounds, cards, dividers, buttons and image frames — the tactile layer',
    values: {
      paper: ['Cards turn warm off-white with a subtle grain and soft shadow', 'Frames gain a fine printed edge; buttons press like card stock'],
      marble: ['Surfaces pick up a veined diagonal sheen; images sharpen', 'Frames sculpt crops harder — gallery plinths, not boxes'],
      metal: ['Cool gradient panels with precise hairline edges', 'Buttons and frames read machined: 1px bevels, no blur'],
      silk: ['Soft radial sheen washes cards; corners round to 18px', 'Buttons gain a long diffuse glow shadow'],
      glass: ['Cards turn translucent with a 14px backdrop blur', 'Rules lighten; depth stacks behind frosted panels'],
      ink: ['Deep matte black panels, print-like, gloss removed', 'Images desaturate slightly; shadows flatten'],
    },
  },
  composition: {
    governs: 'Hierarchy and visual rhythm — how every model arranges its hero and sections',
    values: {
      centered: ['Hero stacks into a ceremonial centered column; buttons align under it', 'Section headings and calls centre; the page reads as a monument'],
      asymmetric: ['Hero splits offset — copy pulls left, media lifts and overlaps', 'Headlines hang outside the column; whitespace turns dynamic'],
      grid: ['Every section becomes a numbered ledger row with visible rules', 'Cards inset hairline borders; alignment rules the page'],
      fullbleed: ['Hero runs edge-to-edge as a full-bleed cinema frame with overlay text', 'UI thins out; crops square; type scales up'],
      modular: ['Content re-tiles into a mosaic of surface cards with even gaps', 'Sections compact; every module sits on its own tile'],
      diagonal: ['Hero crops to a diagonal edge; cards tilt fractionally', 'The marquee and media lean into directional movement'],
    },
  },
  atmosphere: {
    governs: 'The emotional temperature — semantic surfaces, never a raw hex picker',
    values: {
      ivory: ['Warm archive paper with oxblood-brown accents and aged gold', 'Reads museum-quiet in light, lamp-lit in dark'],
      charcoal: ['Neutral gallery grey with an ink primary and a steel accent', 'Confident, modern, zero decoration'],
      botanical: ['Deep greenhouse greens with antique gold accents', 'Organic and expensive — salon calm'],
      oxblood: ['Private-club reds over parchment, brass details', 'Rich, traditional, powerful'],
      champagne: ['Soft celebratory cream with champagne gold and copper', 'Refined, warm, a little festive'],
      midnight: ['Near-black instrument navy with luminous blue and amber', 'Technical, futuristic, precise'],
    },
  },
  detail: {
    governs: 'One or two crafted motifs repeated quietly at the joins',
    values: {
      hairlines: ['1px rules appear at precise section boundaries and card insets'],
      emboss: ['Headings and buttons gain letterpress depth (dual highlight/shadow)'],
      monogram: ['The house cipher stamps a fixed corner seal on the page'],
      foil: ['Key headings and rules pick up a metallic foil gradient'],
      archival: ['Sections count themselves "ED. 01 / 96" in fine archival print'],
      icons: ['A signature diamond glyph marks every heading join'],
    },
  },
  mode: {
    governs: 'Every world exists in both lights — persisted site-wide',
    values: {
      native: ['Follows the active forge engine default and your global mode'],
      light: ['Forces the daylight rendering of every world on every surface'],
      dark: ['Forces the evening rendering of every world on every surface'],
    },
  },
};

/* ── per-model nuance — how each flagship ANSWERS a composition ──── */

export const MODEL_ANSWERS: Record<string, Record<string, string>> = {
  'saas-orbit': {
    centered: 'Hero fragments drop below a centered trial call; pricing centres',
    offset: 'Release window overlaps the headline; capabilities stagger 7/5',
    ledger: 'Sections number 01–03; capability cards inset hairline rules',
    cinema: 'Product window goes full-bleed behind the trial call',
    mosaic: 'Capabilities re-tile as a mosaic; pricing cards tile evenly',
    diagonal: 'Hero window and marquee lean into the launch angle',
  },
  'cg-wholesale': {
    centered: 'Trade bar centres over the warehouse promise; matrix centres',
    offset: 'Warehouse photo lifts over the buyer promise column',
    ledger: 'Order matrix and programmes rule into numbered ledger rows',
    cinema: 'Warehouse runs edge-to-edge with the net-30 call overlaid',
    mosaic: 'Programme trio tiles as cards; categories compact to pills',
    diagonal: 'Freight strip angles; crates crop on the diagonal',
  },
  'cg-maison': {
    centered: 'Flacon centres on plinth black; edition list centres beneath',
    offset: 'Numbered editions pull left of a tall drifting flacon',
    ledger: 'Edition list rules into a numbered index; quotes inset',
    cinema: 'Flacon fills the frame — hero becomes the gallery wall',
    mosaic: 'Editions tile as object cards with even gallery gaps',
    diagonal: 'Edition numerals lean; the flacon crops on a diagonal',
  },
  'cg-cart': {
    centered: 'Countdown centres above the drop; basket bar centres',
    offset: 'Drop hero offsets against the product shelf overlap',
    ledger: 'Offer cells rule into a price ledger; grid numbers itself',
    cinema: 'Drop art runs edge-to-edge; basket floats over the frame',
    mosaic: 'Shelf re-tiles as a dense product mosaic',
    diagonal: 'Discount marquee skews; badges tilt with the drop energy',
  },
  'dash-telemetry': {
    centered: 'KPI row centres; console narrows to an instrument column',
    offset: 'Throughput chart offsets against a narrow alert stream',
    ledger: 'KPIs and nodes rule into numbered rows; grid hardens',
    cinema: 'Console darkens to a full-bleed instrument panel',
    mosaic: 'Nodes and KPIs re-tile as monitoring tiles',
    diagonal: 'Alert stream shears; status bars angle with flow',
  },
  'micro-pocket': {
    centered: 'The one thing centres on plinth colour; buy row centres',
    offset: 'Glaze panel overlaps the brutal hero frame',
    ledger: 'Specs and FAQ rule into numbered strips',
    cinema: 'Product colour floods edge-to-edge behind the buy call',
    mosaic: 'Reviews and specs tile as chunky cards',
    diagonal: 'Marquee and hero badge tilt with market energy',
  },
  'hosp-terroir': {
    centered: 'Room statement centres; menu centres to a single column',
    offset: 'Panorama lifts over the provenance column',
    ledger: 'Menu rules into a numbered service ledger',
    cinema: 'Room panorama runs edge-to-edge under the reserve call',
    mosaic: 'Larder and menu tile as hospitality cards',
    diagonal: 'Larder split shears; menu dots lean into flow',
  },
  'ent-atlas': {
    centered: 'Briefing call centres; metrics centre beneath the masthead',
    offset: 'Metric row offsets against the architecture planes',
    ledger: 'Compliance ledger and planes number into grid rows',
    cinema: 'Masthead drops to a full-bleed authority frame',
    mosaic: 'Planes and compliance tile as controlled cards',
    diagonal: 'Plane rows shear on the briefing diagonal',
  },
};
