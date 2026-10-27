'use client';
/**
 * OMNIFORGE · Genome store — the backbone's persisted state
 *
 * One selection of 7 switches + per-field text overrides, shared by the
 * whole system (home, families, plates, studio, full-site reviews and
 * partials). Persisted in localStorage under 'of-genome'; the dashboard's
 * own fonts follow the voice switch via html[data-voice] (set pre-paint by
 * GENOME_BOOTSTRAP to avoid a font flash).
 */
import { useEffect, useSyncExternalStore } from 'react';
import { NATIVE_SELECTION, type GenomeSelection, type SwitchId } from './switches';
import { VOICES } from './tokens';

export interface GenomeText {
  brand: string;
  headline: string;
  subhead: string;
  cta: string;
}

export interface GenomeState {
  sel: GenomeSelection;
  text: GenomeText;
  /** layer inspector — clear-text annotations over every rendered model */
  inspect: boolean;
}

const EMPTY_TEXT: GenomeText = { brand: '', headline: '', subhead: '', cta: '' };
const DEFAULT_STATE: GenomeState = { sel: { ...NATIVE_SELECTION }, text: { ...EMPTY_TEXT }, inspect: false };

const KEY = 'of-genome';

type Listener = () => void;
const listeners = new Set<Listener>();

let state: GenomeState = DEFAULT_STATE;
let hydrated = false;

function parse(raw: string | null): GenomeState {
  if (!raw) return DEFAULT_STATE;
  try {
    const j = JSON.parse(raw) as Partial<GenomeState>;
    return {
      sel: { ...NATIVE_SELECTION, ...(j.sel ?? {}) },
      text: { ...EMPTY_TEXT, ...(j.text ?? {}) },
      inspect: !!j.inspect,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* private mode — selection lives for the session only */
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function hydrate() {
  if (hydrated || typeof window === 'undefined') return;
  state = parse(localStorage.getItem(KEY));
  hydrated = true;
}

function subscribe(l: Listener) {
  listeners.add(l);
  hydrate();
  /* re-read in case another tab changed the backbone */
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      state = parse(e.newValue);
      applyVoiceAttr();
      emit();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener('storage', onStorage);
  };
}

const snapshot = () => state;
const serverSnap = () => DEFAULT_STATE;

/* ── html[data-voice] — dashboard font changing ─────────────────── */

function applyVoiceAttr() {
  if (typeof document === 'undefined') return;
  const v = state.sel.voice;
  if (v && v !== 'native' && VOICES.some((x) => x.id === v)) {
    document.documentElement.setAttribute('data-voice', v);
  } else {
    document.documentElement.removeAttribute('data-voice');
  }
}

/* ── public actions ─────────────────────────────────────────────── */

export function setSwitch(id: SwitchId, option: string) {
  hydrate();
  state = { ...state, sel: { ...state.sel, [id]: option } };
  applyVoiceAttr();
  persist();
  emit();
}

export function applySelection(sel: Partial<GenomeSelection>) {
  hydrate();
  state = { ...state, sel: { ...state.sel, ...sel } };
  applyVoiceAttr();
  persist();
  emit();
}

export function setText(patch: Partial<GenomeText>) {
  hydrate();
  state = { ...state, text: { ...state.text, ...patch } };
  persist();
  emit();
}

export function resetGenome() {
  hydrate();
  state = DEFAULT_STATE;
  applyVoiceAttr();
  persist();
  emit();
}

/** Toggle the in-template layer inspector (clear-text layer annotations). */
export function setInspect(on: boolean) {
  hydrate();
  state = { ...state, inspect: on };
  persist();
  emit();
}

/** Mode switch shares the forge's persisted mode (style-registry) — see ModeToggle. */

/* ── hooks ──────────────────────────────────────────────────────── */

export function useGenome(): GenomeState {
  return useSyncExternalStore(subscribe, snapshot, serverSnap);
}

/** Layer-inspector flag only (avoids re-rendering tagged subtrees on text edits). */
export function useInspect(): boolean {
  return useSyncExternalStore(subscribe, () => state.inspect, () => false);
}

/** Client init for the root layout/app mount. */
export function initGenomeClient() {
  hydrate();
  applyVoiceAttr();
}

/**
 * Pre-paint bootstrap (inline in <head>): restores the voice switch before
 * first paint so the dashboard's fonts never flash.
 */
export const GENOME_BOOTSTRAP = `(() => {
  try {
    const g = JSON.parse(localStorage.getItem('${KEY}') || '{}');
    const v = g && g.sel && g.sel.voice;
    if (v && v !== 'native') document.documentElement.setAttribute('data-voice', v);
  } catch (e) {}
})();`;

/** SSR-safe read for server components (defaults only). */
export function genomeFromCookie(): GenomeState {
  return DEFAULT_STATE;
}
