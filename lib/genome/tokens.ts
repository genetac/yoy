/**
 * OMNIFORGE · Genome token engine (the backbone)
 *
 * Ported from the OmniForge Template OS token engine and extended for the
 * design genome: every template site in the system is rendered from a
 * resolved token set. Nothing about a site's colour, type, geometry,
 * rhythm or motion is hard-coded in its JSX.
 *
 * Three layers (per the genome backbone):
 *   1. Template DNA layer  — per-example identity (lib/genome/catalog.ts)
 *   2. Switch layer         — 7 personalization dimensions (switches.ts)
 *   3. Component layer      — the 8 flagship templates (components/site/*)
 */

/* ── typographic voices (semantic roles, not just fonts) ────────── */

export interface FontVoice {
  id: string;
  label: string;
  head: string;
  body: string;
  mono: string;
  /** dashboard font vars, applied via html[data-voice] for site-wide font changing */
  dashDisplay: string;
  dashSans: string;
  dashMono: string;
}

export const VOICES: FontVoice[] = [
  {
    id: 'serif',
    label: 'Editorial serif',
    head: "'Cormorant Garamond', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
    dashDisplay: "'Cormorant Garamond', Georgia, serif",
    dashSans: "'Inter', system-ui, sans-serif",
    dashMono: "'JetBrains Mono', monospace",
  },
  {
    id: 'grotesk',
    label: 'Modern grotesque',
    head: "'Inter', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
    dashDisplay: "'Inter', system-ui, sans-serif",
    dashSans: "'Inter', system-ui, sans-serif",
    dashMono: "'JetBrains Mono', monospace",
  },
  {
    id: 'contrast',
    label: 'High-contrast display',
    head: "'Playfair Display', Georgia, serif",
    body: "'Manrope', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
    dashDisplay: "'Playfair Display', Georgia, serif",
    dashSans: "'Manrope', system-ui, sans-serif",
    dashMono: "'JetBrains Mono', monospace",
  },
  {
    id: 'technical',
    label: 'Technical mono',
    head: "'Space Grotesk', system-ui, sans-serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
    dashDisplay: "'Space Grotesk', system-ui, sans-serif",
    dashSans: "'Inter', system-ui, sans-serif",
    dashMono: "'JetBrains Mono', monospace",
  },
  {
    id: 'humanist',
    label: 'Humanist warm',
    head: "'Fraunces', Georgia, serif",
    body: "'Manrope', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
    dashDisplay: "'Fraunces', Georgia, serif",
    dashSans: "'Manrope', system-ui, sans-serif",
    dashMono: "'JetBrains Mono', monospace",
  },
  {
    id: 'condensed',
    label: 'Luxury condensed',
    head: "'Syne', system-ui, sans-serif",
    body: "'Manrope', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
    dashDisplay: "'Syne', system-ui, sans-serif",
    dashSans: "'Manrope', system-ui, sans-serif",
    dashMono: "'JetBrains Mono', monospace",
  },
];

export const voiceOf = (id: string): FontVoice => VOICES.find((v) => v.id === id) ?? VOICES[1];

/* ── motion scale ───────────────────────────────────────────────── */

export const MOTION: Record<number, { label: string; dur: number; lift: number }> = {
  0: { label: 'Still', dur: 0, lift: 0 },
  1: { label: 'Subtle', dur: 180, lift: 1 },
  2: { label: 'Measured', dur: 320, lift: 1.6 },
  3: { label: 'Expressive', dur: 520, lift: 2.2 },
};

/* ── the resolved site token set ────────────────────────────────── */

export interface SiteTokens {
  bg: string;
  ink: string;
  surface: string;
  muted: string;
  primary: string;
  onPrimary: string;
  accent: string;
  onAccent: string;
  radius: number;
  space: number;
  motion: number;
  font: string;
  images?: Record<string, string>;
}

export const COLOR_KEYS: [keyof SiteTokens, string][] = [
  ['bg', 'Background'],
  ['surface', 'Surface'],
  ['ink', 'Ink'],
  ['muted', 'Muted text'],
  ['primary', 'Primary'],
  ['onPrimary', 'Label on primary'],
  ['accent', 'Accent'],
  ['onAccent', 'Label on accent'],
];

/* ── colour maths ───────────────────────────────────────────────── */

const clamp255 = (n: number) => Math.max(0, Math.min(255, Math.round(n)));

export function hexToRgb(hex: string) {
  const h = String(hex || '').trim().replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full || '000000', 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export const isHex = (v: unknown): v is string =>
  typeof v === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v.trim());

export function rgba(hex: string, a = 1) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

export function mix(a: string, b: string, t = 0.5): string {
  const x = hexToRgb(a);
  const y = hexToRgb(b);
  const c = (k: 'r' | 'g' | 'b') => clamp255(x[k] * (1 - t) + y[k] * t).toString(16).padStart(2, '0');
  return `#${c('r')}${c('g')}${c('b')}`;
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const chan = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * chan(r) + 0.7152 * chan(g) + 0.0722 * chan(b);
}

export function contrast(a: string, b: string): number {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const hi = Math.max(l1, l2);
  const lo = Math.min(l1, l2);
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}

/** Re-derive readable ink from a background rather than trusting a stored one. */
export function readableOn(bg: string): string {
  return contrast('#0B0B0A', bg) >= contrast('#F7F4EC', bg) ? '#0B0B0A' : '#F7F4EC';
}

export const isDarkBg = (bg: string) => luminance(bg) < 0.32;

/* ── CSS variables — the component layer reads these, nothing else ── */

export function toCssVars(t: SiteTokens): Record<string, string> {
  const f = voiceOf(t.font);
  return {
    '--t-bg': t.bg,
    '--t-ink': t.ink,
    '--t-surface': t.surface,
    '--t-muted': t.muted,
    '--t-primary': t.primary,
    '--t-on-primary': t.onPrimary,
    '--t-accent': t.accent,
    '--t-on-accent': t.onAccent,
    '--t-line': rgba(t.ink, 0.16),
    '--t-radius': `${Number(t.radius) || 0}px`,
    '--t-space': String(t.space ?? 1),
    '--t-head': f.head,
    '--t-body': f.body,
    '--t-mono': f.mono,
    '--t-motion': `${MOTION[t.motion]?.dur ?? 0}ms`,
  };
}

/* ── prestige score — the quality gate, shown in the console ────── */

export function prestigeScore(t: SiteTokens) {
  const checks = [
    { label: 'Body ink on background', ratio: contrast(t.ink, t.bg), target: 7 },
    { label: 'Muted text on background', ratio: contrast(t.muted, t.bg), target: 4.5 },
    { label: 'Accent on background', ratio: contrast(t.accent, t.bg), target: 3 },
    { label: 'Label on primary', ratio: contrast(t.onPrimary, t.primary), target: 4.5 },
    { label: 'Surface separation', ratio: contrast(t.surface, t.bg), target: 1.05 },
  ].map((c) => ({ ...c, pass: c.ratio >= c.target }));
  const score = Math.round(
    (checks.reduce((s, c) => s + Math.min(1, c.ratio / c.target), 0) / checks.length) * 100,
  );
  const grade = score >= 97 ? 'A+' : score >= 92 ? 'A' : score >= 85 ? 'B' : score >= 76 ? 'C' : 'D';
  return { score, grade, checks, gate: 85 };
}

/** Normalize any partial palette into a complete, readable token set. */
export function sanitizeTokens(raw: Partial<SiteTokens>, base: SiteTokens): SiteTokens {
  const bg = isHex(raw.bg) ? raw.bg : base.bg;
  const primary = isHex(raw.primary) ? raw.primary : base.primary;
  const accent = isHex(raw.accent) ? raw.accent : base.accent;
  const ink = isHex(raw.ink) ? raw.ink : readableOn(bg);
  return {
    ...base,
    bg,
    primary,
    accent,
    ink,
    surface: isHex(raw.surface) ? raw.surface : mix(ink, bg, 0.94),
    muted: isHex(raw.muted) ? raw.muted : mix(ink, bg, 0.45),
    onPrimary: readableOn(primary),
    onAccent: readableOn(accent),
    radius: typeof raw.radius === 'number' ? raw.radius : base.radius,
    space: typeof raw.space === 'number' ? raw.space : base.space,
    motion: typeof raw.motion === 'number' ? raw.motion : base.motion,
    font: VOICES.some((v) => v.id === raw.font) ? (raw.font as string) : base.font,
  };
}

/** Deterministic 32-bit hash → stable per-slug identity choices. */
export function hashSlug(slug: string): number {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}
