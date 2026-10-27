'use client';
/**
 * OMNIFORGE · Design Matrix — style registry (v2)
 *
 * Six design engines, one structure. Every engine redefines the same
 * token vocabulary (--of-*, --font-*, --color-brass-*) under
 * html[data-style="…"][data-mode="…"], so a single attribute swap
 * re-skins the whole dashboard — identical copy, identical flow,
 * different material.
 *
 * v2 adds:
 *   · MODE — every engine ships a light AND a dark surface. The mode is
 *     a first-class persisted choice (of-mode) with per-engine native
 *     defaults; obsidian follows the system until the user chooses.
 *   · SIGNATURES — each engine declares its signature treatment, the
 *     thing that makes it unmistakable at first sight:
 *       obsidian   engraved plates, foil prices, wax seals
 *       nocturne   3D candlelit title that assembles as the page opens
 *       midhigh    real-world photography drifting behind the page
 *       agencyos   blueprint grid underfoot + kinetic 3D type
 *       templateos warm catalog glow, lime markers
 *       studioos   rule grid, film band, scan + marquee choreography
 *     (studioos integrates the uploaded OmniForge OS source listing)
 */
import { useSyncExternalStore } from 'react';

export type StyleId = 'obsidian' | 'nocturne' | 'midhigh' | 'agencyos' | 'templateos' | 'studioos';
export type StyleMode = 'light' | 'dark';

export interface DesignStyleSpec {
  id: StyleId;
  label: string;
  short: string; // 2-letter chip code
  tagline: string;
  reference: string; // design lineage, shown on cards
  fonts: string; // human-readable type stack
  nativeMode: StyleMode | 'system'; // what the engine feels at home in
  swatch: { bg: string; ink: string; accent: string }; // native (usually dark)
  lightSwatch: { bg: string; ink: string; accent: string };
  signature: string; // one-line signature treatment description
  signatureWord: string; // hero marker / kinetic word
}

export const DESIGN_STYLES: Record<StyleId, DesignStyleSpec> = {
  obsidian: {
    id: 'obsidian',
    label: 'Obsidian & Brass',
    short: 'OB',
    tagline: 'Engraved plates, foil prices, wax seals — the prestige atelier.',
    reference: 'In-house · Elite Plan P1',
    fonts: 'Fraunces · Inter · IBM Plex Mono',
    nativeMode: 'system',
    swatch: { bg: '#f7f4ee', ink: '#23201c', accent: '#b8913f' },
    lightSwatch: { bg: '#f7f4ee', ink: '#23201c', accent: '#b8913f' },
    signature: 'Engraved plates, brass foil, wax-seal receipts.',
    signatureWord: 'FORGE',
  },
  nocturne: {
    id: 'nocturne',
    label: 'Nocturne',
    short: 'NC',
    tagline: 'Twelve seats, one fire — candlelit serif with slow reveals.',
    reference: 'DESIGN MAP · Mantis pattern',
    fonts: 'Cormorant Garamond · IBM Plex Sans · Plex Mono',
    nativeMode: 'dark',
    swatch: { bg: '#100b08', ink: '#f2e7d8', accent: '#d98e4a' },
    lightSwatch: { bg: '#f6efe3', ink: '#241a10', accent: '#a05a26' },
    signature: 'A 3D candlelit title assembles itself as the page opens.',
    signatureWord: 'NOCTURNE',
  },
  midhigh: {
    id: 'midhigh',
    label: 'Mid-to-High Dining',
    short: 'MH',
    tagline: 'Gallery-black, terracotta accents, zero radius precision.',
    reference: 'DESIGN MAP · Restaurants engine',
    fonts: 'Cormorant Garamond · Inter · JetBrains Mono',
    nativeMode: 'dark',
    swatch: { bg: '#0a0a0a', ink: '#e5e5e5', accent: '#b35b3b' },
    lightSwatch: { bg: '#f4f2ef', ink: '#141414', accent: '#a34a2c' },
    signature: 'Real-world photography drifts behind the page, always.',
    signatureWord: 'DINING',
  },
  agencyos: {
    id: 'agencyos',
    label: 'Agency OS',
    short: 'AO',
    tagline: 'Swiss grid, eyebrow dashes, ember CTAs — production OS chrome.',
    reference: 'DESIGN MAP · agency-os hub',
    fonts: 'Space Grotesk · DM Sans · JetBrains Mono',
    nativeMode: 'dark',
    swatch: { bg: '#0a0a0c', ink: '#f5f5f0', accent: '#ff5722' },
    lightSwatch: { bg: '#fafafa', ink: '#0a0a0c', accent: '#d94518' },
    signature: 'Blueprint grid underfoot and kinetic 3D type in motion.',
    signatureWord: 'SYSTEM',
  },
  templateos: {
    id: 'templateos',
    label: 'Template OS',
    short: 'TO',
    tagline: 'Warm dark, lime primary, terracotta secondary — catalog chrome.',
    reference: 'DESIGN MAP · template-os source',
    fonts: 'Syne · Manrope · JetBrains Mono',
    nativeMode: 'dark',
    swatch: { bg: '#262320', ink: '#f0ede6', accent: '#a3e635' },
    lightSwatch: { bg: '#faf6ee', ink: '#26231e', accent: '#55801f' },
    signature: 'Warm catalog glow with lime marker sweeps.',
    signatureWord: 'CATALOG',
  },
  studioos: {
    id: 'studioos',
    label: 'Studio OS',
    short: 'SO',
    tagline: 'The template operating system — rule grid, film band, brass foil.',
    reference: 'OmniForge OS · uploaded source',
    fonts: 'Fraunces · Inter · JetBrains Mono',
    nativeMode: 'dark',
    swatch: { bg: '#0b0908', ink: '#f6f1e4', accent: '#dcab59' },
    lightSwatch: { bg: '#f4f0e8', ink: '#26211a', accent: '#a8842f' },
    signature: 'Rule-grid plates, marquee tickers, scan lines and pulse rings.',
    signatureWord: 'STUDIO',
  },
};

export const STYLE_ORDER: StyleId[] = ['obsidian', 'nocturne', 'midhigh', 'agencyos', 'templateos', 'studioos'];
export const DEFAULT_STYLE: StyleId = 'obsidian';

const STORAGE_KEY = 'of-style';
const MODE_KEY = 'of-mode';

/* ── tiny external store (useSyncExternalStore-friendly) ─────────── */

let current: StyleId = DEFAULT_STYLE;
let mode: StyleMode | null = null; // null = follow engine native default
let listeners = new Set<() => void>();

function isStyleId(v: unknown): v is StyleId {
  return typeof v === 'string' && Object.prototype.hasOwnProperty.call(DESIGN_STYLES, v);
}
function isMode(v: unknown): v is StyleMode {
  return v === 'light' || v === 'dark';
}
function prefersDark(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
/** The mode an engine calls home, resolved for this machine. */
export function nativeModeOf(id: StyleId): StyleMode {
  const native = DESIGN_STYLES[id].nativeMode;
  if (native === 'system') return prefersDark() ? 'dark' : 'light';
  return native;
}
/** The mode that actually renders right now. */
export function resolvedMode(): StyleMode {
  return mode ?? nativeModeOf(current);
}

/** Push style + mode onto the <html> element: data-style + data-mode + of-dark. */
export function applyStyleToDom(id: StyleId): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.dataset.style = id;
  const m = resolvedMode();
  root.dataset.mode = m;
  root.classList.toggle('of-dark', m === 'dark');
}

export function getStyle(): StyleId {
  return current;
}
export function getMode(): StyleMode | null {
  return mode;
}

function emit(): void {
  listeners.forEach((l) => l());
  listeners = new Set(listeners);
}

export function setStyle(id: StyleId): void {
  if (!isStyleId(id) || id === current) return;
  current = id;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* private mode — session-only choice is fine */
  }
  applyStyleToDom(id);
  emit();
}

/** Explicitly choose light or dark (persists across engines). */
export function setMode(m: StyleMode): void {
  if (m === mode) return;
  mode = m;
  try {
    localStorage.setItem(MODE_KEY, m);
  } catch {
    /* session-only is fine */
  }
  applyStyleToDom(current);
  emit();
}

/** Drop the explicit choice — each engine returns to its native mode. */
export function clearMode(): void {
  if (mode === null) return;
  mode = null;
  try {
    localStorage.removeItem(MODE_KEY);
  } catch {
    /* ignore */
  }
  applyStyleToDom(current);
  emit();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Hydrate the store from the DOM (the anti-FOUC bootstrap script in
 * layout.tsx has already set data-style + data-mode before first paint).
 */
export function initStyle(): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  const fromDom = root.dataset.style;
  if (isStyleId(fromDom)) current = fromDom;
  const modeDom = root.dataset.mode;
  if (isMode(modeDom) && root.dataset.modeChosen === '1') mode = modeDom;
  else if (isMode(modeDom) && current !== 'obsidian' && modeDom !== nativeModeOf(current)) mode = modeDom;
  applyStyleToDom(current);
  // obsidian tracks the system theme live unless the user chose a mode;
  // other engines re-resolve their native mode if the system flips.
  if (typeof window !== 'undefined' && window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (mode === null) applyStyleToDom(current);
    });
  }
}

export function readStoredStyle(): StyleId {
  if (typeof window === 'undefined') return DEFAULT_STYLE;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return isStyleId(v) ? v : DEFAULT_STYLE;
  } catch {
    return DEFAULT_STYLE;
  }
}

/** Inline bootstrap snippet for layout.tsx <head> — runs before first paint. */
export const STYLE_BOOTSTRAP = `(function(){try{
var k=localStorage.getItem('${STORAGE_KEY}');
var s=['obsidian','nocturne','midhigh','agencyos','templateos','studioos'];
if(s.indexOf(k)<0)k='${DEFAULT_STYLE}';
var nativeDark=(k!=='obsidian');
var sysDark=false;try{sysDark=window.matchMedia('(prefers-color-scheme: dark)').matches}catch(e){}
var m=localStorage.getItem('${MODE_KEY}');
var chosen=(m==='light'||m==='dark');
if(!chosen)m=nativeDark?'dark':(sysDark?'dark':'light');
var r=document.documentElement;
r.setAttribute('data-style',k);
r.setAttribute('data-mode',m);
if(chosen)r.setAttribute('data-mode-chosen','1');
r.classList.toggle('of-dark',m==='dark');
}catch(e){}})();`;

/* ── React binding ───────────────────────────────────────────────── */

/** Subscribe the active style id. Call once per dashboard tree root. */
export function useStyle(): StyleId {
  return useSyncExternalStore(subscribe, getStyle, () => DEFAULT_STYLE);
}

/** Subscribe the resolved (rendering) mode — light or dark. */
export function useMode(): StyleMode {
  return useSyncExternalStore(subscribe, resolvedMode, () => 'light');
}

/** Subscribe the explicit mode choice (null = native). */
export function useModeChoice(): StyleMode | null {
  return useSyncExternalStore(subscribe, getMode, () => null);
}

/** Server-safe init: re-reads what the bootstrap script already applied. */
export function initStyleClient(): void {
  if (typeof window === 'undefined') return;
  initStyle();
}
