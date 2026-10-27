/**
 * OMNIFORGE · The genome switches (the backbone's personalization layer)
 *
 * SEVEN user-facing switches — six creative dimensions + mode. Each switch
 * changes the EXPERIENCE, not merely surface styling: layout philosophy,
 * typographic voice, tactile material, composition, colour atmosphere and
 * crafted detail. Options are named and curated ("Milan Atelier", "Ivory
 * Archive") — never raw controls like "font size" or "border radius".
 *
 * Every switch defaults to "As drawn" (native): the per-example DNA keeps
 * its own identity — 96 distinct worlds. Flipping a switch overrides that
 * dimension across the WHOLE system (families, full-site reviews, partials
 * and the dashboard's own fonts): one change cascades consistently.
 *
 * Each switch panel carries its own background colour so the console reads
 * as seven distinct rooms (per the backbone brief).
 */
import { type SiteTokens, sanitizeTokens, toCssVars, VOICES } from './tokens';
import { heroKindOf, type HeroKind } from './layout';

/* ── switch ids & selection ─────────────────────────────────────── */

export type SwitchId = 'direction' | 'voice' | 'material' | 'composition' | 'atmosphere' | 'detail' | 'mode';
export type GenomeSelection = Record<SwitchId, string>;

export const NATIVE_SELECTION: GenomeSelection = {
  direction: 'native',
  voice: 'native',
  material: 'native',
  composition: 'native',
  atmosphere: 'native',
  detail: 'native',
  mode: 'native',
};

export interface SwitchOption {
  id: string;
  label: string;
  hint: string;
  /** token deltas layered onto the DNA */
  delta?: Partial<SiteTokens>;
  /** class applied to the .tpl-scope wrapper */
  cls?: string;
}

export interface GenomeSwitch {
  id: SwitchId;
  no: string;
  label: string;
  line: string;
  /** the panel's own background colour (dark rooms) */
  panelBg: string;
  panelEdge: string;
  dot: string;
  options: SwitchOption[];
}

/* ── colour atmospheres — named palettes with light + dark variants ── */

export interface Palette {
  bg: string; surface: string; ink: string; muted: string;
  primary: string; onPrimary: string; accent: string; onAccent: string;
}

export const ATMOSPHERES: Record<string, { label: string; feeling: string; light: Palette; dark: Palette }> = {
  ivory: {
    label: 'Ivory Archive',
    feeling: 'Quiet, museum-like, timeless',
    light: { bg: '#F7F2E8', surface: '#EFE7D9', ink: '#1C1815', muted: '#7A6F60', primary: '#8C6A1F', onPrimary: '#FFFDF7', accent: '#A0522D', onAccent: '#FFF8F1' },
    dark: { bg: '#14110C', surface: '#1D1913', ink: '#F2E9DA', muted: '#A2937F', primary: '#C9A227', onPrimary: '#14100C', accent: '#B4551F', onAccent: '#FFF8F1' },
  },
  charcoal: {
    label: 'Charcoal Studio',
    feeling: 'Confident, modern, premium',
    light: { bg: '#F4F4F2', surface: '#E9E9E6', ink: '#141414', muted: '#6B6B68', primary: '#111111', onPrimary: '#FFFFFF', accent: '#5B6E8F', onAccent: '#FFFFFF' },
    dark: { bg: '#101113', surface: '#17181B', ink: '#EDEFF2', muted: '#8A929C', primary: '#EDEFF2', onPrimary: '#0B0C0E', accent: '#5B8DEF', onAccent: '#05122B' },
  },
  botanical: {
    label: 'Deep Botanical',
    feeling: 'Organic, expensive, calm',
    light: { bg: '#F3F6F0', surface: '#E7EDE4', ink: '#14231A', muted: '#5F7264', primary: '#1F5F43', onPrimary: '#F7FFF9', accent: '#B08C2A', onAccent: '#12211B' },
    dark: { bg: '#0B1410', surface: '#13201A', ink: '#EFE9DC', muted: '#9CAFA4', primary: '#3E7A5A', onPrimary: '#EFE9DC', accent: '#C9A227', onAccent: '#14100C' },
  },
  oxblood: {
    label: 'Oxblood Private Club',
    feeling: 'Rich, traditional, powerful',
    light: { bg: '#F7F1EC', surface: '#EFE4DC', ink: '#241417', muted: '#7A5F63', primary: '#6E1423', onPrimary: '#FFF5F4', accent: '#8C6A1F', onAccent: '#1B1B1B' },
    dark: { bg: '#160D0F', surface: '#1F1417', ink: '#F2E4E0', muted: '#A98F92', primary: '#9E2B3C', onPrimary: '#FFF0EC', accent: '#C9A227', onAccent: '#160D0F' },
  },
  champagne: {
    label: 'Champagne Gallery',
    feeling: 'Soft, refined, celebratory',
    light: { bg: '#FAF5EA', surface: '#F1E9D8', ink: '#241F15', muted: '#7B7260', primary: '#8C6A1F', onPrimary: '#FFFDF7', accent: '#B4551F', onAccent: '#FFF8F1' },
    dark: { bg: '#171310', surface: '#201A14', ink: '#F3EBDD', muted: '#A69C8C', primary: '#D4AF37', onPrimary: '#171310', accent: '#B08968', onAccent: '#171310' },
  },
  midnight: {
    label: 'Midnight Instrument',
    feeling: 'Technical, futuristic, precise',
    light: { bg: '#F5F7FB', surface: '#E8EDF6', ink: '#0D1B34', muted: '#4C5A72', primary: '#123C8C', onPrimary: '#FFFFFF', accent: '#B4551F', onAccent: '#FFF8F1' },
    dark: { bg: '#080B14', surface: '#111726', ink: '#EAF0FF', muted: '#9AA8C7', primary: '#7DA2FF', onPrimary: '#06101F', accent: '#F0B429', onAccent: '#141005' },
  },
};

const atmoPalette = (id: string, mode: 'light' | 'dark'): Palette =>
  (ATMOSPHERES[id] ?? ATMOSPHERES.ivory)[mode];

/* ── the seven switches ─────────────────────────────────────────── */

export const GENOME_SWITCHES: GenomeSwitch[] = [
  {
    id: 'direction',
    no: '01',
    label: 'Creative direction',
    line: 'Changes the design philosophy — layout, pacing, captions and mood together.',
    panelBg: 'rgba(217,119,6,0.10)',
    panelEdge: 'rgba(217,119,6,0.34)',
    dot: '#d97706',
    options: [
      { id: 'native', label: 'As drawn', hint: 'Each template keeps its own direction' },
      { id: 'editorial', label: 'Editorial', hint: 'Large headlines, generous margins, numbered sections', cls: 'g-dir-editorial' },
      { id: 'architectural', label: 'Architectural', hint: 'Strict grid, thin rules, technical captions', cls: 'g-dir-architectural', delta: { radius: 0, space: 1.05 } },
      { id: 'gallery', label: 'Gallery', hint: 'Massive whitespace, artwork first, tiny captions', cls: 'g-dir-gallery', delta: { space: 1.5, motion: 1 } },
      { id: 'atelier', label: 'Atelier', hint: 'Handcrafted warmth, tactile textures, refined serif details', cls: 'g-dir-atelier', delta: { radius: 14, space: 1.2 } },
      { id: 'futurist', label: 'Futurist', hint: 'High contrast geometry, luminous accents, dark surfaces', cls: 'g-dir-futurist', delta: { motion: 3, radius: 8 } },
      { id: 'heritage', label: 'Heritage', hint: 'Engraved details, classic proportions, archival restraint', cls: 'g-dir-heritage', delta: { radius: 0, motion: 1 } },
    ],
  },
  {
    id: 'voice',
    no: '02',
    label: 'Typographic voice',
    line: 'Semantic type roles — display, headline, body, caption and data — not just fonts. Also re-voices the dashboard chrome.',
    panelBg: 'rgba(139,92,246,0.12)',
    panelEdge: 'rgba(139,92,246,0.36)',
    dot: '#8b5cf6',
    options: [
      { id: 'native', label: 'As drawn', hint: 'Each template keeps its own pairing' },
      ...VOICES.map((v) => ({ id: v.id, label: v.label, hint: v.head.split(',')[0].replace(/'/g, ''), delta: { font: v.id } })),
    ],
  },
  {
    id: 'material',
    no: '03',
    label: 'Material & finish',
    line: 'A tactile material layer across backgrounds, cards, dividers, buttons and image frames.',
    panelBg: 'rgba(120,113,108,0.20)',
    panelEdge: 'rgba(168,162,158,0.34)',
    dot: '#a8a29e',
    options: [
      { id: 'native', label: 'As drawn', hint: 'Each template keeps its own finish' },
      { id: 'paper', label: 'Paper', hint: 'Warm off-white, subtle grain, soft shadows', cls: 'g-mat-paper' },
      { id: 'marble', label: 'Marble', hint: 'Veined contrast, sculptural crops', cls: 'g-mat-marble' },
      { id: 'metal', label: 'Brushed metal', hint: 'Fine gradient, precise hairlines, cool neutrals', cls: 'g-mat-metal' },
      { id: 'silk', label: 'Silk', hint: 'Soft gradients, low contrast, elegant curves', cls: 'g-mat-silk', delta: { radius: 18 } },
      { id: 'glass', label: 'Glass', hint: 'Translucent panels, blurred depth, refined borders', cls: 'g-mat-glass' },
      { id: 'ink', label: 'Matte ink', hint: 'Deep matte black, print-like texture, minimal gloss', cls: 'g-mat-ink' },
    ],
  },
  {
    id: 'composition',
    no: '04',
    label: 'Composition mode',
    line: 'The most underrated switch — changes hierarchy and visual rhythm, not just colours.',
    panelBg: 'rgba(59,130,246,0.12)',
    panelEdge: 'rgba(59,130,246,0.36)',
    dot: '#3b82f6',
    options: [
      { id: 'native', label: 'As drawn', hint: 'Each template keeps its own rhythm' },
      { id: 'centered', label: 'Centered monument', hint: 'Symmetry, ceremonial pacing', cls: 'g-comp-centered' },
      { id: 'asymmetric', label: 'Asymmetric editorial', hint: 'Offset headline, overlapping image, dynamic whitespace', cls: 'g-comp-asymmetric' },
      { id: 'grid', label: 'Grid ledger', hint: 'Visible structure, numbered modules, precise alignment', cls: 'g-comp-grid' },
      { id: 'fullbleed', label: 'Full-bleed cinema', hint: 'Image-led, minimal UI, dramatic type', cls: 'g-comp-fullbleed' },
      { id: 'modular', label: 'Modular mosaic', hint: 'Card-based, content-dense, flexible', cls: 'g-comp-modular' },
      { id: 'diagonal', label: 'Diagonal flow', hint: 'Directional movement, angled crops, energetic', cls: 'g-comp-diagonal' },
    ],
  },
  {
    id: 'atmosphere',
    no: '05',
    label: 'Colour atmosphere',
    line: 'Emotional temperature with brand logic intact — semantic surfaces (surface / ink / accent), never "pick a hex".',
    panelBg: 'rgba(16,185,129,0.12)',
    panelEdge: 'rgba(16,185,129,0.34)',
    dot: '#10b981',
    options: [
      { id: 'native', label: 'As drawn', hint: 'Each template keeps its own palette' },
      ...Object.entries(ATMOSPHERES).map(([id, a]) => ({
        id,
        label: a.label,
        hint: a.feeling,
      })),
    ],
  },
  {
    id: 'detail',
    no: '06',
    label: 'Detail signature',
    line: 'The crafted finishing touch — one or two subtle recurring motifs per world.',
    panelBg: 'rgba(244,63,94,0.12)',
    panelEdge: 'rgba(244,63,94,0.34)',
    dot: '#f43f5e',
    options: [
      { id: 'native', label: 'As drawn', hint: 'Each template keeps its own signature' },
      { id: 'hairlines', label: 'Hairline rules', hint: 'Intentional 1px structure at precise spacing', cls: 'g-det-hairlines' },
      { id: 'emboss', label: 'Embossed marks', hint: 'Letterpress depth on headings and seals', cls: 'g-det-emboss' },
      { id: 'monogram', label: 'Monogram seal', hint: 'The house cipher, stamped in the corner', cls: 'g-det-monogram' },
      { id: 'foil', label: 'Foil-like accents', hint: 'Metallic sheen on key type and rules', cls: 'g-det-foil' },
      { id: 'archival', label: 'Archival numbering', hint: 'Edition numbers and fine-print captions', cls: 'g-det-archival' },
      { id: 'icons', label: 'Custom iconography', hint: 'A signature icon language at the joins', cls: 'g-det-icons' },
    ],
  },
  {
    id: 'mode',
    no: '07',
    label: 'Light & dark',
    line: 'Every world exists in both lights — persisted site-wide, exactly like the forge.',
    panelBg: 'rgba(148,163,184,0.14)',
    panelEdge: 'rgba(148,163,184,0.36)',
    dot: '#94a3b8',
    options: [
      { id: 'native', label: 'Follow the forge', hint: 'Engine default + your global mode' },
      { id: 'light', label: 'Daylight edition', hint: 'Force the light rendering of every world' },
      { id: 'dark', label: 'Evening edition', hint: 'Force the dark rendering of every world' },
    ],
  },
];

export const SWITCH_BY_ID: Record<SwitchId, GenomeSwitch> = Object.fromEntries(
  GENOME_SWITCHES.map((s) => [s.id, s]),
) as Record<SwitchId, GenomeSwitch>;

/* ── premium presets — one press, whole curation ───────────────── */

export interface GenomePreset {
  name: string;
  note: string;
  sel: Partial<GenomeSelection>;
}

export const GENOME_PRESETS: GenomePreset[] = [
  {
    name: 'No. 01 — Ivory Archive',
    note: 'Heritage / Serif / Paper / Ivory / Archival',
    sel: { direction: 'heritage', voice: 'serif', material: 'paper', composition: 'centered', atmosphere: 'ivory', detail: 'archival' },
  },
  {
    name: 'Milan Atelier',
    note: 'Atelier / High-contrast / Silk / Champagne / Monogram',
    sel: { direction: 'atelier', voice: 'contrast', material: 'silk', composition: 'asymmetric', atmosphere: 'champagne', detail: 'monogram' },
  },
  {
    name: 'Nordic Gallery',
    note: 'Gallery / Grotesque / Paper / Charcoal / Hairlines',
    sel: { direction: 'gallery', voice: 'grotesk', material: 'paper', composition: 'grid', atmosphere: 'charcoal', detail: 'hairlines' },
  },
  {
    name: 'Midnight Meridian',
    note: 'Futurist / Technical / Glass / Midnight / Foil',
    sel: { direction: 'futurist', voice: 'technical', material: 'glass', composition: 'fullbleed', atmosphere: 'midnight', detail: 'foil' },
  },
  {
    name: 'Black Tie Editorial',
    note: 'Editorial / Serif / Matte ink / Charcoal / Emboss',
    sel: { direction: 'editorial', voice: 'serif', material: 'ink', composition: 'centered', atmosphere: 'charcoal', detail: 'emboss' },
  },
  {
    name: 'Botanic Salon',
    note: 'Atelier / Humanist / Marble / Botanical / Icons',
    sel: { direction: 'atelier', voice: 'humanist', material: 'marble', composition: 'modular', atmosphere: 'botanical', detail: 'icons' },
  },
];

/* ── engine bias — the forge's engines still dress the sites ────── */
/* (applied only while the atmosphere switch is "As drawn")          */

export const ENGINE_BIAS: Record<string, Partial<Palette>> = {
  obsidian: {},
  nocturne: { bg: '#100B08', surface: '#1A130D', ink: '#F2E9DA', muted: '#A2937F', primary: '#C9A227', accent: '#B4551F' },
  midhigh: { bg: '#0D0D0D', surface: '#161616', ink: '#F5F1EA', muted: '#9C9488', primary: '#B35B3B', accent: '#E4B93B' },
  agencyos: { bg: '#0A0A0C', surface: '#121317', ink: '#EDEFF2', muted: '#8A929C', primary: '#FF5722', accent: '#5B8DEF' },
  templateos: { bg: '#121109', surface: '#1A1812', ink: '#F1EFE6', muted: '#A5A08E', primary: '#A3E635', accent: '#B35B3B' },
  studioos: { bg: '#0B0B0A', surface: '#141310', ink: '#F2EFE6', muted: '#8D897F', primary: '#D4AF37', accent: '#B08C2A' },
};

/* ── the resolver: DNA + switches (+ engine bias) → world ───────── */

export interface TemplateDNA {
  slug: string;
  archetype: string;
  direction: string;
  voice: string;
  material: string;
  composition: string;
  atmosphere: string;
  detail: string;
  tokens: SiteTokens;
}

export interface ResolvedWorld {
  tokens: SiteTokens;
  classes: string[];
  vars: Record<string, string>;
  /** the six effective picks (switch override > DNA value) */
  picks: { direction: string; voice: string; material: string; composition: string; atmosphere: string; detail: string };
  /** switches currently overriding the DNA (the "applied changes" tray) */
  overridden: SwitchId[];
  /** structural hero arrangement — every model implements every kind */
  hero: HeroKind;
}

export function resolveGenome(
  dna: TemplateDNA,
  sel: GenomeSelection,
  opts: { engine?: string; mode?: 'light' | 'dark' } = {},
): ResolvedWorld {
  const { engine = 'obsidian', mode } = opts;
  const classes: string[] = [];
  let tokens: SiteTokens = { ...dna.tokens };
  const overridden: SwitchId[] = [];

  const apply = (sw: SwitchId, dnaValue: string) => {
    const s = SWITCH_BY_ID[sw];
    const isOverride = !!sel[sw] && sel[sw] !== 'native';
    const chosen = isOverride ? sel[sw] : dnaValue;
    if (isOverride && sw !== 'mode') overridden.push(sw);
    const opt = s.options.find((o) => o.id === chosen);
    if (opt?.delta) tokens = { ...tokens, ...opt.delta };
    if (opt?.cls) classes.push(opt.cls);
    return chosen;
  };

  const dir = apply('direction', dna.direction);
  const voice = apply('voice', dna.voice);
  const mat = apply('material', dna.material);
  const comp = apply('composition', dna.composition);
  const atmo = apply('atmosphere', dna.atmosphere);

  /* atmosphere: explicit switch > engine bias > the DNA's own palette */
  if (sel.atmosphere && sel.atmosphere !== 'native') {
    const p = atmoPalette(sel.atmosphere, mode ?? 'light');
    tokens = sanitizeTokens(p, tokens);
  } else if (sel.atmosphere === 'native' && atmo === 'native') {
    const bias = ENGINE_BIAS[engine];
    if (bias && Object.keys(bias).length) tokens = sanitizeTokens(bias, tokens);
  } else if (atmo !== 'native') {
    /* DNA-pinned atmosphere still honours the mode */
    const p = atmoPalette(atmo, mode ?? 'light');
    tokens = sanitizeTokens(p, tokens);
  }

  const det = apply('detail', dna.detail);

  /* ── structural vars — the component layer reads these, per model ──
     direction: display/headline scale + measure · material: card/frame
     recipes · so a switch rearranges the model, not just its colour.   */
  const vars = toCssVars(tokens);
  vars['--t-hero'] = heroKindOf(comp);
  vars['--t-pick-direction'] = dir;
  vars['--t-pick-voice'] = voice;
  vars['--t-pick-material'] = mat;
  vars['--t-pick-composition'] = comp;
  vars['--t-pick-detail'] = det;

  if (tokens.motion === 0) classes.push('tpl-still');
  return {
    tokens,
    classes,
    vars,
    picks: { direction: dir, voice, material: mat, composition: comp, atmosphere: atmo, detail: det },
    overridden,
    hero: heroKindOf(comp),
  };
}

/** Label for the current curated state of one switch (for readouts). */
export function switchReadout(sel: GenomeSelection, dna: TemplateDNA): string[] {
  return GENOME_SWITCHES.filter((s) => s.id !== 'mode').map((s) => {
    const chosen = sel[s.id] !== 'native' ? sel[s.id] : dna[s.id as 'direction'];
    const opt = s.options.find((o) => o.id === chosen);
    return `${s.no} ${opt?.label ?? 'As drawn'}`;
  });
}

/** Short single-line readout — "01 EDITORIAL · 02 SERIF · 03 SILK …" */
export function switchReadoutLine(sel: GenomeSelection, dna: TemplateDNA): string {
  return switchReadout(sel, dna).join(' · ').toUpperCase();
}

/** Human label of one switch's effective value (override > DNA). */
export function effectiveLabel(id: SwitchId, sel: GenomeSelection, dna: TemplateDNA): string {
  if (id === 'mode') return sel.mode && sel.mode !== 'native' ? sel.mode : 'as drawn';
  const chosen = sel[id] !== 'native' ? sel[id] : dna[id as 'direction'];
  const opt = SWITCH_BY_ID[id].options.find((o) => o.id === chosen);
  return (opt?.label ?? 'As drawn').toLowerCase();
}
