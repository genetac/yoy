/**
 * OMNIFORGE · Genome catalog — the Template DNA layer
 *
 * The eight flagship product templates, ported from the OmniForge Template
 * OS catalogue (Orbit, Quartermaster, Maison Vey, Snapcart, Telemetry,
 * Pocket, Terroir, Atlas). Every one of the forge's 96 examples maps onto
 * exactly one flagship archetype and receives its own DNA card — a
 * deterministic creative identity (direction, voice, material,
 * composition, atmosphere seed, detail) derived from its slug, so all 96
 * read as distinct worlds rather than one template with 96 colour swaps.
 */
import { getFamilyForProductType } from '@/data/designFamilies';
import type { SiteIndexEntry } from '@/lib/site-preview';
import { hashSlug, type SiteTokens } from './tokens';
import type { TemplateDNA } from './switches';

/* ── the eight flagships (from the Template OS catalogue) ───────── */

export type ArchetypeId =
  | 'saas-orbit'
  | 'cg-wholesale'
  | 'cg-maison'
  | 'cg-cart'
  | 'dash-telemetry'
  | 'micro-pocket'
  | 'hosp-terroir'
  | 'ent-atlas';

export interface FlagshipMeta {
  slug: ArchetypeId;
  name: string;
  variant: string;
  family: string; // OS family key
  familyLabel: string;
  tier: string;
  edition: { no: number; of: number };
  blurb: string;
  bestFor: string;
  modules: string[];
  sections: string[];
  metaphor: string;
  imageTreatment: string;
  doNotDo: string[];
}

export const FLAGSHIPS: FlagshipMeta[] = [
  {
    slug: 'saas-orbit',
    name: 'Orbit',
    variant: 'Trial-first SaaS',
    family: 'saas',
    familyLabel: 'SaaS Products',
    tier: 'growth',
    edition: { no: 4, of: 500 },
    blurb: 'A trial-first product site: live release fragments, capability grid, a pricing toggle that argues for the yearly plan.',
    bestFor: 'Self-serve software with a free tier and a changelog worth reading.',
    modules: ['hero-split', 'release-bars', 'capability-grid', 'pricing-toggle', 'logo-marquee'],
    sections: ['Nav + trial CTA', 'Hero with product fragments', 'Customer marquee', 'Capabilities grid', 'Pricing with billing toggle', 'Closing CTA'],
    metaphor: 'A control room that ships in public',
    imageTreatment: 'Soft glow washes over interface fragments',
    doNotDo: ['no stock-photo handshakes', 'no gradient-everything', 'no fake enterprise logos'],
  },
  {
    slug: 'cg-wholesale',
    name: 'Quartermaster',
    variant: 'B2B wholesale',
    family: 'consumer',
    familyLabel: 'Commerce & Trade',
    tier: 'professional',
    edition: { no: 61, of: 500 },
    blurb: 'A trade account built for buyers: a bulk order matrix whose price breaks apply live, freight maths and net-30 submission.',
    bestFor: 'Wholesale catalogues, distributors and trade-first businesses.',
    modules: ['order-matrix', 'stat-trio', 'category-rail', 'feature-trio'],
    sections: ['Trade bar', 'Nav with search + PO draft', 'Hero + warehouse', 'Category rail', 'Order matrix', 'Programme trio'],
    metaphor: 'The buyer\u2019s ledger desk',
    imageTreatment: 'Documentary warehouse photography, honest light',
    doNotDo: ['no inflated savings math', 'no dark-pattern urgency', 'no decorative type over data'],
  },
  {
    slug: 'cg-maison',
    name: 'Maison Vey',
    variant: 'Luxury',
    family: 'consumer',
    familyLabel: 'Commerce & Trade',
    tier: 'professional',
    edition: { no: 12, of: 250 },
    blurb: 'One flacon, held in a full-bleed hero, then a numbered edition list that swaps the piece image as you move down it.',
    bestFor: 'Maisons, ateliers and anything sold by numbered edition.',
    modules: ['editorial-hero', 'piece-selector', 'pullquote', 'image-duo'],
    sections: ['Overlay nav', 'Ken Burns hero', 'Numbered edition list', 'Founder pull-quote', 'Footer with editions'],
    metaphor: 'A private gallery in candlelight',
    imageTreatment: 'Full-bleed Ken Burns stills, museum crops',
    doNotDo: ['no badges shouting sale', 'no carousels', 'no price anchoring'],
  },
  {
    slug: 'cg-cart',
    name: 'Snapcart',
    variant: 'Mass-market',
    family: 'consumer',
    familyLabel: 'Commerce & Trade',
    tier: 'growth',
    edition: { no: 230, of: 1000 },
    blurb: 'Volume retail: a discount marquee, a live drop countdown, a dense product grid and a sticky basket that tracks the free-delivery threshold.',
    bestFor: 'High-SKU shops, drops and everyday-essentials stores.',
    modules: ['drop-countdown', 'category-pills', 'product-grid', 'sticky-cart'],
    sections: ['Discount marquee', 'Sticky nav + basket', 'Drop hero with countdown', 'Offer cells', 'Category pills', 'Product grid', 'Sticky basket bar'],
    metaphor: 'A market street on drop night',
    imageTreatment: 'Bright pack shots, colour-blocked panels',
    doNotDo: ['no fake countdown resets', 'no hidden fees at checkout', 'no clutter past six cells'],
  },
  {
    slug: 'dash-telemetry',
    name: 'Telemetry',
    variant: 'Operations',
    family: 'dashboards',
    familyLabel: 'Data Dashboards',
    tier: 'professional',
    edition: { no: 9, of: 500 },
    blurb: 'An operations console that streams: throughput area chart, region bars, an alert stream and node health. Photo-free by design.',
    bestFor: 'Internal operations, infra and monitoring surfaces.',
    modules: ['kpi-row', 'live-throughput', 'alert-stream', 'node-grid'],
    sections: ['Console rail', 'KPI row', 'Live throughput chart', 'Region load', 'Alert stream', 'Node grid'],
    metaphor: 'The instrument panel of a working plant',
    imageTreatment: 'None — data is the imagery',
    doNotDo: ['no decorative photography', 'no rounded-everything', 'no rainbow statuses'],
  },
  {
    slug: 'micro-pocket',
    name: 'Pocket',
    variant: 'Single-product',
    family: 'micro',
    familyLabel: 'Micro Products',
    tier: 'starter',
    edition: { no: 118, of: 500 },
    blurb: 'One product, one page, brutalist confidence: glaze picker, spec strip, review card and a marquee band.',
    bestFor: 'A single hero product or a very small catalogue.',
    modules: ['brutal-hero', 'glaze-picker', 'faq-accordion', 'marquee-band'],
    sections: ['Nav with batch count', 'Product hero with rotate', 'Price + buy', 'Glaze picker', 'Review card', 'FAQ accordion', 'Marquee band'],
    metaphor: 'A market stall with one perfect thing',
    imageTreatment: 'Colour-blocked panels, hard shadows',
    doNotDo: ['no second product', 'no newsletter modal', 'no apologetic copy'],
  },
  {
    slug: 'hosp-terroir',
    name: 'Terroir',
    variant: 'Restaurant',
    family: 'hospitality',
    familyLabel: 'Industry & Hospitality',
    tier: 'growth',
    edition: { no: 33, of: 500 },
    blurb: 'A dining room in a page: panoramic room shot, a dotted-leader menu and a real booking widget with guests, evenings and times.',
    bestFor: 'Restaurants, tasting rooms and small venues taking reservations.',
    modules: ['gallery-panorama', 'menu-list', 'booking-widget', 'larder-split'],
    sections: ['Nav + reserve', 'Room panorama', 'Statement + provenance', 'Menu with prices', 'Booking widget', 'Larder split'],
    metaphor: 'The dining room itself, online',
    imageTreatment: 'Natural-light room photography, generous crops',
    doNotDo: ['no stock food gloom', 'no PDF menu', 'no booking-wall phone number only'],
  },
  {
    slug: 'ent-atlas',
    name: 'Atlas',
    variant: 'Platform authority',
    family: 'enterprise',
    familyLabel: 'Enterprise Platforms',
    tier: 'enterprise',
    edition: { no: 2, of: 100 },
    blurb: 'Regulated-scale authority: a hairline grid, contracted numbers, a compliance ledger and a sales form that answers.',
    bestFor: 'Enterprise platforms, security pages and regulated buyers.',
    modules: ['nav-masthead', 'metric-row', 'plane-list', 'compliance-ledger', 'contact-form'],
    sections: ['Grid masthead', 'Hero + architecture review', 'Contracted metrics', 'Four planes', 'Compliance ledger', 'Quote + contact form'],
    metaphor: 'The institution\u2019s own briefing room',
    imageTreatment: 'Restrained, near-photo-free, plan-like',
    doNotDo: ['no exclamation marks', 'no stock skylines', 'no vague claims without numbers'],
  },
];

export const flagshipBySlug = (slug: string): FlagshipMeta | undefined =>
  FLAGSHIPS.find((f) => f.slug === slug);

export const editionLabel = (slug: string): string => {
  const f = flagshipBySlug(slug);
  return f ? `No. ${String(f.edition.no).padStart(3, '0')} / ${f.edition.of}` : 'Edition —';
};

/** OS module notes (the 34-module library, informational). */
export const OS_MODULES: { id: string; name: string; group: string; slug: string; note: string }[] = [
  { id: 'hero-split', name: 'Split hero', group: 'Marketing', slug: 'saas-orbit', note: 'Headline left, live product fragments floating right.' },
  { id: 'release-bars', name: 'Release bars', group: 'Marketing', slug: 'saas-orbit', note: 'A bar series that reads as shipped work, one bar highlighted.' },
  { id: 'capability-grid', name: 'Capability grid', group: 'Marketing', slug: 'saas-orbit', note: 'Four hairline cards on a 12-column grid, uneven spans.' },
  { id: 'pricing-toggle', name: 'Pricing with toggle', group: 'Commerce', slug: 'saas-orbit', note: 'Monthly / yearly switch with the saving stated inline.' },
  { id: 'logo-marquee', name: 'Customer marquee', group: 'Marketing', slug: 'saas-orbit', note: 'An endless band of names between two rules.' },
  { id: 'order-matrix', name: 'Order matrix', group: 'Commerce', slug: 'cg-wholesale', note: 'Sell-price breaks per case with a live line total.' },
  { id: 'stat-trio', name: 'Stat trio', group: 'Data', slug: 'cg-wholesale', note: 'Three contracted numbers in a divided strip.' },
  { id: 'category-rail', name: 'Category rail', group: 'Commerce', slug: 'cg-wholesale', note: 'A scrolling row of category filters.' },
  { id: 'feature-trio', name: 'Programme trio', group: 'Marketing', slug: 'cg-wholesale', note: 'Three image cards for trade programmes.' },
  { id: 'editorial-hero', name: 'Editorial hero', group: 'Marketing', slug: 'cg-maison', note: 'Full-bleed image with a slow Ken Burns drift.' },
  { id: 'piece-selector', name: 'Piece selector', group: 'Commerce', slug: 'cg-maison', note: 'A numbered list that swaps the image beside it.' },
  { id: 'pullquote', name: 'Founder pull-quote', group: 'Marketing', slug: 'cg-maison', note: 'Display-size quote next to a portrait crop.' },
  { id: 'image-duo', name: 'Image duo', group: 'Marketing', slug: 'cg-maison', note: 'Two tall images in a split section.' },
  { id: 'drop-countdown', name: 'Drop countdown', group: 'Commerce', slug: 'cg-cart', note: 'A ticking clock inside the hero offer.' },
  { id: 'category-pills', name: 'Category pills', group: 'Commerce', slug: 'cg-cart', note: 'Rounded filters, the active one inked.' },
  { id: 'product-grid', name: 'Product grid', group: 'Commerce', slug: 'cg-cart', note: 'Discount badges, ratings and add-to-basket.' },
  { id: 'sticky-cart', name: 'Sticky basket', group: 'Commerce', slug: 'cg-cart', note: 'Running total and delivery threshold while you browse.' },
  { id: 'kpi-row', name: 'KPI row', group: 'Data', slug: 'dash-telemetry', note: 'Four counters with delta against the last hour.' },
  { id: 'live-throughput', name: 'Live throughput', group: 'Data', slug: 'dash-telemetry', note: 'A streaming area chart that appends a point per second.' },
  { id: 'alert-stream', name: 'Alert stream', group: 'Data', slug: 'dash-telemetry', note: 'Severity-coded lines with timestamps.' },
  { id: 'node-grid', name: 'Node grid', group: 'Data', slug: 'dash-telemetry', note: 'Health per node, degraded one flagged.' },
  { id: 'brutal-hero', name: 'Brutal hero', group: 'Marketing', slug: 'micro-pocket', note: 'Heavy border, hard shadow, colour-blocked panel.' },
  { id: 'glaze-picker', name: 'Option picker', group: 'Commerce', slug: 'micro-pocket', note: 'Swatch row that recolours the hero.' },
  { id: 'faq-accordion', name: 'FAQ accordion', group: 'Marketing', slug: 'micro-pocket', note: 'Inline disclosure, no page jump.' },
  { id: 'marquee-band', name: 'Marquee band', group: 'Marketing', slug: 'micro-pocket', note: 'Inked band scrolling proof points.' },
  { id: 'gallery-panorama', name: 'Room panorama', group: 'Hospitality', slug: 'hosp-terroir', note: 'A wide, inset photograph of the room.' },
  { id: 'menu-list', name: 'Menu list', group: 'Hospitality', slug: 'hosp-terroir', note: 'Dotted leaders from dish to price.' },
  { id: 'booking-widget', name: 'Booking widget', group: 'Hospitality', slug: 'hosp-terroir', note: 'Guests, evening and time, with a held-table state.' },
  { id: 'larder-split', name: 'Larder split', group: 'Hospitality', slug: 'hosp-terroir', note: 'Image and statement, evenly divided.' },
  { id: 'nav-masthead', name: 'Grid masthead', group: 'Enterprise', slug: 'ent-atlas', note: 'A nav drawn as grid cells with a sales cell.' },
  { id: 'metric-row', name: 'Contracted metrics', group: 'Data', slug: 'ent-atlas', note: 'Uptime, customers, regions, breaches.' },
  { id: 'plane-list', name: 'Plane list', group: 'Enterprise', slug: 'ent-atlas', note: 'Numbered architecture rows that tint on hover.' },
  { id: 'compliance-ledger', name: 'Compliance ledger', group: 'Enterprise', slug: 'ent-atlas', note: 'Framework, status and last audit in a table.' },
  { id: 'contact-form', name: 'Sales form', group: 'Enterprise', slug: 'ent-atlas', note: 'Underlined fields with a received state.' },
];

/* ── archetype base tokens (the OS curated defaults) ────────────── */

export const ARCHETYPE_TOKENS: Record<ArchetypeId, SiteTokens> = {
  'saas-orbit': { bg: '#FFFFFF', ink: '#0B1220', surface: '#F4F6FA', muted: '#667085', primary: '#4F46E5', onPrimary: '#FFFFFF', accent: '#22C1DC', onAccent: '#06212A', radius: 14, space: 1, motion: 2, font: 'grotesk' },
  'cg-wholesale': { bg: '#FFFFFF', ink: '#12211B', surface: '#F3F5F2', muted: '#63706A', primary: '#1F5F43', onPrimary: '#F6FFF9', accent: '#B08C2A', onAccent: '#12211B', radius: 6, space: 1, motion: 1, font: 'grotesk' },
  'cg-maison': { bg: '#0E0C0A', ink: '#F3EBDD', surface: '#171412', muted: '#A69C8C', primary: '#C9A227', onPrimary: '#171310', accent: '#B08968', onAccent: '#171310', radius: 0, space: 1.2, motion: 3, font: 'serif' },
  'cg-cart': { bg: '#FFFFFF', ink: '#15110E', surface: '#F4F1EB', muted: '#6E665B', primary: '#FF5A1F', onPrimary: '#FFFFFF', accent: '#FFD23F', onAccent: '#15110E', radius: 18, space: 1, motion: 2, font: 'condensed' },
  'dash-telemetry': { bg: '#0B0F14', ink: '#E6EDF3', surface: '#121A22', muted: '#7D8B99', primary: '#31D0AA', onPrimary: '#04140F', accent: '#F0B429', onAccent: '#141005', radius: 8, space: 0.85, motion: 1, font: 'technical' },
  'micro-pocket': { bg: '#FFF8ED', ink: '#1B1B1B', surface: '#FFFFFF', muted: '#6B6259', primary: '#2B4BFF', onPrimary: '#FFFFFF', accent: '#FF6B35', onAccent: '#1B1B1B', radius: 20, space: 1.15, motion: 3, font: 'condensed' },
  'hosp-terroir': { bg: '#FBF7F0', ink: '#241F1A', surface: '#F2EBDF', muted: '#7A6E5F', primary: '#4C6B3C', onPrimary: '#FDFBF4', accent: '#B4551F', onAccent: '#FFF8F1', radius: 2, space: 1.2, motion: 2, font: 'serif' },
  'ent-atlas': { bg: '#FFFFFF', ink: '#0A0A0A', surface: '#F3F4F6', muted: '#5B6270', primary: '#0B3FA8', onPrimary: '#FFFFFF', accent: '#0A0A0A', onAccent: '#FFFFFF', radius: 0, space: 1.05, motion: 0, font: 'grotesk' },
};

/* ── example → archetype mapping ────────────────────────────────── */

const RE_LUXURY = /luxury|perfume|jewel|atelier|maison|gallery|fashion|boutique|watch|bridal/i;
const RE_TRADE = /wholesale|distributor|supplier|trade|b2b|vendor|market/i;
const RE_RETAIL = /shop|store|cafe|menu|bakery|retail|ecommerce|grocery|florist|gift|cart|drop/i;
const RE_ADVISORY = /law|legal|attorney|notary|audit/i;

export function archetypeFor(productId: string, productName = '', exampleLabel = ''): ArchetypeId {
  const fam = getFamilyForProductType(productId);
  const hay = `${productId} ${productName} ${exampleLabel}`;
  if (fam === 'data-dense') return 'dash-telemetry';
  if (fam === 'saas-product') return 'saas-orbit';
  if (fam === 'enterprise-platform') {
    if (RE_TRADE.test(`${productId} ${exampleLabel}`)) return 'cg-wholesale'; // trade platforms
    return 'ent-atlas';
  }
  if (fam === 'industry-warm') {
    if (RE_ADVISORY.test(hay)) return 'ent-atlas'; // advisory authority
    if (RE_LUXURY.test(hay)) return 'cg-maison';
    if (RE_TRADE.test(hay)) return 'cg-wholesale';
    if (RE_RETAIL.test(hay)) return 'cg-cart';
    return 'hosp-terroir';
  }
  return 'micro-pocket';
}

/* ── per-example DNA derivation — 96 distinct identities ────────── */

/** Curated dimension pools per archetype (identity stays coherent). */
const DIMENSIONS: Record<ArchetypeId, { direction: string[]; material: string[]; composition: string[]; detail: string[] }> = {
  'saas-orbit': { direction: ['editorial', 'futurist', 'gallery'], material: ['glass', 'paper', 'metal'], composition: ['asymmetric', 'modular', 'grid'], detail: ['hairlines', 'foil', 'archival'] },
  'cg-wholesale': { direction: ['architectural', 'editorial'], material: ['paper', 'metal'], composition: ['grid', 'modular'], detail: ['hairlines', 'archival'] },
  'cg-maison': { direction: ['atelier', 'heritage', 'gallery'], material: ['silk', 'marble', 'paper'], composition: ['fullbleed', 'centered', 'asymmetric'], detail: ['monogram', 'foil', 'emboss'] },
  'cg-cart': { direction: ['futurist', 'editorial'], material: ['paper', 'glass'], composition: ['modular', 'diagonal', 'grid'], detail: ['icons', 'hairlines'] },
  'dash-telemetry': { direction: ['futurist', 'architectural'], material: ['glass', 'metal', 'ink'], composition: ['grid', 'modular'], detail: ['hairlines', 'archival'] },
  'micro-pocket': { direction: ['futurist', 'gallery', 'atelier'], material: ['paper', 'ink', 'silk'], composition: ['centered', 'diagonal', 'asymmetric'], detail: ['icons', 'emboss', 'archival'] },
  'hosp-terroir': { direction: ['heritage', 'editorial', 'atelier'], material: ['paper', 'marble', 'silk'], composition: ['asymmetric', 'centered', 'fullbleed'], detail: ['emboss', 'hairlines', 'icons'] },
  'ent-atlas': { direction: ['architectural', 'heritage', 'gallery'], material: ['paper', 'marble', 'metal'], composition: ['grid', 'centered'], detail: ['hairlines', 'emboss', 'archival'] },
};

/** The DNA card displayed in the console + used as native dimensions. */
export interface DnaCard {
  name: string;
  positioning: string;
  metaphor: string;
  layoutLogic: string;
  typography: string;
  colorLogic: string;
  imageTreatment: string;
  signature: string;
  motion: string;
  doNotDo: string[];
}

const ATMOSPHERE_SEEDS = ['ivory', 'charcoal', 'botanical', 'oxblood', 'champagne', 'midnight'] as const;

export function dnaForEntry(entry: SiteIndexEntry, forced?: ArchetypeId): TemplateDNA {
  const archetype = forced ?? archetypeFor(entry.productId, entry.productName, entry.example.label);
  const base = ARCHETYPE_TOKENS[archetype];
  const h = hashSlug(entry.slug);
  const pools = DIMENSIONS[archetype];
  const pick = <T,>(arr: readonly T[], salt: number): T => arr[(h >> salt) % arr.length];

  return {
    slug: entry.slug,
    archetype,
    direction: pick(pools.direction, 2),
    voice: base.font,
    material: pick(pools.material, 5),
    composition: pick(pools.composition, 8),
    atmosphere: 'native', // the DNA keeps its own curated palette (the archetype base)
    detail: pick(pools.detail, 11),
    tokens: { ...base },
  };
}

export function dnaCardFor(dna: TemplateDNA, entry: SiteIndexEntry): DnaCard {
  const f = flagshipBySlug(dna.archetype)!;
  const flag = FLAGSHIPS.find((x) => x.slug === dna.archetype)!;
  return {
    name: entry.example.label,
    positioning: entry.example.exampleDescription || entry.offer.promise,
    metaphor: f.metaphor,
    layoutLogic: f.sections[0] ?? 'Editorial spread',
    typography: dna.voice,
    colorLogic: `Archetype palette — ${flag.name} house colours; forbidden: ${f.doNotDo[0]}`,
    imageTreatment: f.imageTreatment,
    signature: dna.detail,
    motion: `Motion ${baseMotionLabel(dna.tokens.motion)}`,
    doNotDo: f.doNotDo,
  };
}

function baseMotionLabel(m: number): string {
  return m === 0 ? 'Still' : m === 1 ? 'Subtle' : m === 2 ? 'Measured' : 'Expressive';
}

/** A representative example slug per flagship (for the atelier cards). */
const REPRESENTATIVE_FAMILY_PREFERENCE: Partial<Record<ArchetypeId, string[]>> = {
  'cg-maison': ['industry-warm'], // dining/hospitality content photographs like a maison
  'cg-cart': ['micro', 'industry-warm'], // single products shelve well
  'cg-wholesale': ['enterprise-platform'], // B2B trade content
};

export function representativeSlugFor(
  archetype: ArchetypeId,
  entries: { slug: string; productId: string; productName: string; example?: { label?: string } }[],
): string {
  const exact = entries.find((e) => archetypeFor(e.productId, e.productName, e.example?.label ?? '') === archetype);
  if (exact) return exact.slug;
  const prefs = REPRESENTATIVE_FAMILY_PREFERENCE[archetype] ?? [];
  for (const fam of prefs) {
    const byFamily = entries.find((e) => getFamilyForProductType(e.productId) === fam && e.example?.label);
    if (byFamily) return byFamily.slug;
  }
  return entries[0]?.slug ?? '';
}
