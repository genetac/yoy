/**
 * OMNIFORGE — OfferV2 schema (P0)
 *
 * Hard split between deliverables (what you receive), policies (chips), and
 * proof (testimonials + ratings). Every file carries a content flag so the
 * KitCompiler (P5) can never lie about what's inside the ZIP.
 */

export type ContentFlag = 'real' | 'sample' | 'extended';

export type Archetype =
  | 'template-pack'
  | 'toolkit'
  | 'notion-system'
  | 'assessment'
  | 'website-kit';

export type FamilyId =
  | 'template-packs'
  | 'toolkits'
  | 'notion-systems'
  | 'assessments'
  | 'website-kits';

export interface BundleFile {
  /** '01-welcome-series/day-0-welcome.md' */
  path: string;
  ext: string;
  /** measured for real files, ranged for extended */
  bytes: number;
  /** real = authored, sample = trimmed real, extended = honest stub */
  flag: ContentFlag;
  /** key into kit-content/, required when flag !== 'extended' */
  source?: string;
}

export interface BundleFolder {
  id: string;
  /** must describe every child */
  title: string;
  /** the manifest line it fulfils */
  promise: string;
  files: BundleFile[];
}

export type PolicyKind =
  | 'updates'
  | 'guarantee-30d'
  | 'license-commercial'
  | 'support';

export interface Policy {
  kind: PolicyKind;
  label: string;
}

export interface Testimonial {
  persona: string;
  role: string;
  quote: string;
  /** 1-5 */
  rating: number;
}

export interface ProofV2 {
  rating: number;
  reviewCount: number;
  soldCount: number;
  version: string;
  testimonials: Testimonial[];
  /** shown as a small tag until the backend exists */
  demoData: true;
}

export interface OfferV2 {
  offerId: string;
  title: string;
  archetype: Archetype;
  family: FamilyId;
  tagline: string;
  promise: string;
  price: { amount: number | null; compareAt: number | null; period?: 'mo' };
  deliverables: BundleFolder[];
  root: BundleFile[];
  policies: Policy[];
  formats: string[];
  proof: ProofV2;
  /** true = hand-authored hero, false = bank fallback */
  authored: boolean;
  /** edition number shown on the plate foot */
  edition: { number: number; of: number; year: number };
  /** vertical for media registry lookup */
  vertical?: string;
}

/**
 * Word-boundary keyword matching with deny-list (P0 root-cause fix).
 * Bank keys like `time` no longer match inside "Lifetime".
 */
const POLICY_DENY = new Set([
  'lifetime',
  'free',
  'updates',
  'guarantee',
  'support',
  'quick',
  'start',
  'guide',
]);

/** Matches `key` or `keys` at a word boundary, case-insensitive. */
export function matchesKeyword(text: string, key: string): boolean {
  if (POLICY_DENY.has(key.toLowerCase())) return false;
  const re = new RegExp(`\\b${escapeRegex(key)}s?\\b`, 'i');
  return re.test(text);
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Detects policy phrases in a manifest line. Returns the policy kind or null.
 * Policies never become folders — they become chips.
 */
export function detectPolicy(line: string): PolicyKind | null {
  const lower = line.toLowerCase();
  if (/\b(lifetime\s+free\s+updates?|free\s+updates?|updates?\s+for\s+life)\b/.test(lower))
    return 'updates';
  if (/\b(30[-\s]day\s+(money[-\s]back\s+)?guarantee|guarantee)\b/.test(lower))
    return 'guarantee-30d';
  if (/\b(commercial\s+license|commercial\s+use)\b/.test(lower))
    return 'license-commercial';
  if (/\b(support|help\s+desk|priority\s+support)\b/.test(lower))
    return 'support';
  return null;
}

/** The 5 families with their token sets and display metadata. */
export interface FamilyToken {
  id: FamilyId;
  label: string;
  archetype: Archetype;
  tagline: string;
  /** CSS custom properties applied to plates in this family */
  tokens: Record<string, string>;
  /** hover recipe key for CSS-3D (P4 T1) */
  hoverRecipe: 'fan-deck' | 'exploded' | 'isometric-stack' | 'medal-flip' | 'pointer-tilt';
}

export const FAMILIES: FamilyToken[] = [
  {
    id: 'template-packs',
    label: 'Template Packs',
    archetype: 'template-pack',
    tagline: 'Written copy you can ship today',
    hoverRecipe: 'fan-deck',
    tokens: {
      '--family-font': 'var(--font-display)',
      '--family-radius': '2px',
      '--family-accent': '#8A6A2F',
    },
  },
  {
    id: 'toolkits',
    label: 'Toolkits',
    archetype: 'toolkit',
    tagline: 'Working instruments, not screenshots',
    hoverRecipe: 'exploded',
    tokens: {
      '--family-font': 'var(--font-mono)',
      '--family-radius': '4px',
      '--family-accent': '#5B7C5B',
    },
  },
  {
    id: 'notion-systems',
    label: 'Notion Systems',
    archetype: 'notion-system',
    tagline: 'Databases that run a team',
    hoverRecipe: 'isometric-stack',
    tokens: {
      '--family-font': 'var(--font-sans)',
      '--family-radius': '8px',
      '--family-accent': '#3D5A80',
    },
  },
  {
    id: 'assessments',
    label: 'Assessments',
    archetype: 'assessment',
    tagline: 'Scored quizzes that close deals',
    hoverRecipe: 'medal-flip',
    tokens: {
      '--family-font': 'var(--font-serif)',
      '--family-radius': '50%',
      '--family-accent': '#9C6B3F',
    },
  },
  {
    id: 'website-kits',
    label: 'Website Kits',
    archetype: 'website-kit',
    tagline: 'Five-page sites with real copy',
    hoverRecipe: 'pointer-tilt',
    tokens: {
      '--family-font': 'var(--font-display)',
      '--family-radius': '0px',
      '--family-accent': '#6B1D1D',
    },
  },
];

export function getFamily(id: FamilyId): FamilyToken | undefined {
  return FAMILIES.find((f) => f.id === id);
}
