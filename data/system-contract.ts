/**
 * OMNIFORGE · System Contract (Design Matrix v2)
 *
 * Integrated from the uploaded OmniForge OS source listing: the design
 * contract expressed once and reused everywhere — family visual rules
 * (the "personality"), the module library (the bricks every template
 * is assembled from), the quality bar and the system ticker.
 *
 * These are INFORMATIONAL surfaces: same data for every engine, re-skinned
 * by the active style. Reviews keep their existing structure (proof data
 * in the catalog) — untouched here.
 */
import type { DesignFamilyId } from '@/data/designFamilies';

/* ── Family grammar — who each family is for, and how it speaks ──── */
export interface FamilyGrammar {
  fid: DesignFamilyId;
  index: string;
  buyerNeed: string;
  grammar: string;
  bestFor: string;
  signature: string;
  motion: string;
  density: string;
  modules: string[];
  blurb: string;
}

export const FAMILY_GRAMMAR: Record<DesignFamilyId, FamilyGrammar> = {
  micro: {
    fid: 'micro',
    index: '01',
    buyerNeed: 'Buy or download in seconds',
    grammar: 'Poster-scale type, three short sections, one decisive action',
    bestFor: 'Templates, tools, kits, mini-products',
    signature: 'Single-fold decision · no scroll tax',
    motion: 'decisive',
    density: 'balanced',
    modules: ['Hero', 'Call to action', 'Cards', 'Checkout', 'Empty state'],
    blurb:
      'When the visitor already knows what they want, every extra scroll costs the sale. This family gets out of the way: big type, a price, one button.',
  },
  'industry-warm': {
    fid: 'industry-warm',
    index: '02',
    buyerNeed: 'Trust the room before booking it',
    grammar: 'Editorial grid, serif support type, photography-led sections',
    bestFor: 'Restaurants, clinics, gyms, studios, services',
    signature: 'Generous spacing · restrained editorial motion',
    motion: 'cinematic',
    density: 'airy',
    modules: ['Hero', 'Cards', 'Booking flow', 'Reviews', 'Enquiry form'],
    blurb:
      'Atmosphere does the selling. Warm spacing, real photography and a booking path that never fights the mood — the room is the argument.',
  },
  'data-dense': {
    fid: 'data-dense',
    index: '03',
    buyerNeed: 'Monitor, then decide',
    grammar: 'Dense panels, monospaced figures, tables, status colour',
    bestFor: 'Analytics, inventory, operations, internal tools',
    signature: 'Zero radius · high density · minimal motion',
    motion: 'minimal',
    density: 'dense',
    modules: ['Dashboard panels', 'Tables', 'Charts', 'KPI tiles', 'Status indicators'],
    blurb:
      'Built for the tenth hour of the workday: everything on one screen, nothing decorative, every number aligned. Density is the courtesy here.',
  },
  'saas-product': {
    fid: 'saas-product',
    index: '04',
    buyerNeed: 'Understand it, then trial it',
    grammar: 'Product UI as proof, clear hierarchy, feature evidence',
    bestFor: 'SaaS marketing, portals, booking tools',
    signature: 'Product screenshot as hero · trial path first',
    motion: 'standard',
    density: 'balanced',
    modules: ['Hero', 'Pricing', 'Comparison matrix', 'Authentication', 'Settings'],
    blurb:
      'Show the product, not a promise. The interface is the argument, and the trial is always one click away from any section.',
  },
  'enterprise-platform': {
    fid: 'enterprise-platform',
    index: '05',
    buyerNeed: 'Evaluate capability and risk',
    grammar: 'Structured navigation, evidence blocks, permissions, KPIs',
    bestFor: 'B2B platforms, marketplaces, multi-tenant applications',
    signature: 'Evidence over adjectives · role-aware routes',
    motion: 'minimal',
    density: 'dense',
    modules: ['Navigation', 'Tables', 'Comparison matrix', 'Authentication', 'Status indicators'],
    blurb:
      'Procurement reads in columns. Capability matrices, permission models and audit trails, laid out in the exact order they are checked.',
  },
};

/* ── Module library — the bricks every template is arranged from ─── */
export interface ContractModule {
  name: string;
  note: string;
  tier: 'starter' | 'growth' | 'professional' | 'enterprise';
}

export interface ModuleCategory {
  key: string;
  name: string;
  modules: ContractModule[];
}

export const TIER_NAMES: Record<ContractModule['tier'], string> = {
  starter: 'Starter',
  growth: 'Growth',
  professional: 'Professional',
  enterprise: 'Enterprise',
};

export const MODULE_CATEGORIES: ModuleCategory[] = [
  {
    key: 'structure',
    name: 'Structure',
    modules: [
      { name: 'Navigation', note: 'Primary routes, mobile drawer, breadcrumbs', tier: 'starter' },
      { name: 'Hero', note: 'First impression, one primary action', tier: 'starter' },
      { name: 'Call to action', note: 'Inline, sticky and end-of-page variants', tier: 'starter' },
      { name: 'Cards', note: 'Content, service, product and article cards', tier: 'starter' },
      { name: 'Pricing', note: 'Plan ladder, toggle and comparison notes', tier: 'growth' },
    ],
  },
  {
    key: 'commerce',
    name: 'Commerce',
    modules: [
      { name: 'Product grid', note: 'Filtering, sorting, availability states', tier: 'growth' },
      { name: 'Product detail', note: 'Gallery, variants, price hierarchy, stock', tier: 'growth' },
      { name: 'Cart', note: 'Line items, totals, empty and error states', tier: 'growth' },
      { name: 'Checkout', note: 'Address, delivery, payment hand-off', tier: 'professional' },
      { name: 'Order tracking', note: 'Status timeline from confirmation to delivery', tier: 'growth' },
      { name: 'Reviews', note: 'Verified, moderated, with rating summary', tier: 'growth' },
    ],
  },
  {
    key: 'leads',
    name: 'Booking & leads',
    modules: [
      { name: 'Booking flow', note: 'Availability, slot selection, confirmation', tier: 'professional' },
      { name: 'Enquiry form', note: 'Validated capture with server-side delivery', tier: 'starter' },
    ],
  },
  {
    key: 'data',
    name: 'Data',
    modules: [
      { name: 'Dashboard panels', note: 'Composable widgets on a dense grid', tier: 'professional' },
      { name: 'Tables', note: 'Sortable, paginated, sticky headers', tier: 'professional' },
      { name: 'Charts', note: 'Trend, comparison and distribution views', tier: 'professional' },
      { name: 'KPI tiles', note: 'One number, one delta, one direction', tier: 'growth' },
      { name: 'Status indicators', note: 'State colour with accessible labels', tier: 'growth' },
    ],
  },
  {
    key: 'system',
    name: 'System',
    modules: [
      { name: 'Authentication', note: 'Sign in, sign up, recovery, verification', tier: 'growth' },
      { name: 'Settings', note: 'Profile, preferences, danger zone', tier: 'professional' },
      { name: 'Empty state', note: 'Explains what goes here and how to start', tier: 'starter' },
      { name: 'Error state', note: 'What failed, what survived, what to do next', tier: 'starter' },
      { name: 'Loading state', note: 'Skeletons that match the real layout', tier: 'starter' },
    ],
  },
];

export const MODULE_COUNT = MODULE_CATEGORIES.reduce((n, c) => n + c.modules.length, 0);

/* ── Quality bar — the floor every tier stands on ────────────────── */
export const QUALITY_BAR: { title: string; note: string }[] = [
  { title: 'WCAG 2.2 AA', note: 'Contrast, keyboard paths, focus order, text alternatives — verified, not assumed.' },
  { title: 'Reduced motion', note: 'Every cinematic moment has a still, complete alternative.' },
  { title: 'Mobile first', note: 'Designed at the narrow width, then widened — never the other way round.' },
  { title: 'State coverage', note: 'Empty, loading, error, out-of-stock and failed-payment states are designed, not improvised.' },
  { title: 'Evidence pack', note: 'Preview link, module list, integrations, performance result and real limitations ship with every release.' },
  { title: 'One data truth', note: 'Availability, price and delivery promise are identical across catalog, cart, checkout and structured data.' },
];

/* ── System ticker — the marquee under the AO/SO heroes ──────────── */
export const SYSTEM_TICKER = [
  'Same files · same price · six engines',
  'WCAG 2.2 AA gate',
  'Reduced-motion path',
  'Empty, error and loading states',
  'Manifest matches archive 1:1',
  'Every file carries its honest flag',
  'Tier-gated modules',
  'Real ZIPs, compiled in the browser',
];
