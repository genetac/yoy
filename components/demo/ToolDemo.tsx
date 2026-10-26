"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  AlertTriangle, Check, Contrast, Gauge, Gem, Regex as RegexIcon, RotateCcw, Search, Type, X,
} from "lucide-react";
import type { DemoOffer, DemoProps } from "./types";

type Report = (payload: Record<string, unknown>) => void;

/* ── shared kit ── */
function useDebounced<T>(value: T, delay = 120): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = window.setTimeout(() => setV(value), delay);
    return () => window.clearTimeout(t);
  }, [value, delay]);
  return v;
}

const INPUT =
  "w-full rounded-lg border border-zinc-300/80 bg-white/70 px-3 py-2 text-[13px] outline-none transition-colors duration-150 placeholder:text-zinc-400 focus:border-amber-600/60 focus:ring-2 focus:ring-amber-600/20 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-100";

type ChipState = "pass" | "warn" | "fail";
const CHIP_STYLE: Record<ChipState, string> = {
  pass: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  warn: "border-amber-500/45 bg-amber-500/10 text-amber-800 dark:text-amber-300",
  fail: "border-red-500/40 bg-red-500/10 text-red-700 dark:text-red-300",
};

function StateChip({ state, children }: { state: ChipState; children: ReactNode }) {
  const Icon = state === "pass" ? Check : state === "warn" ? AlertTriangle : X;
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${CHIP_STYLE[state]}`}>
      <Icon className="h-3 w-3" /> {children}
    </span>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 flex items-baseline justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">{label}</span>
        {hint && <span className="truncate font-mono text-[10px] text-zinc-400">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function Metric({ label, value, children }: { label: string; value: string; children?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg bg-zinc-900/[.035] px-3 py-2 dark:bg-white/[.05]">
      <div className="min-w-0">
        <p className="truncate text-[10px] font-bold uppercase tracking-[0.08em] text-zinc-500">{label}</p>
        <p className="font-mono text-[13px] font-semibold text-zinc-800 dark:text-zinc-100">{value}</p>
      </div>
      {children}
    </div>
  );
}

function Dial({ on, value, label }: { on: boolean; value: number; label: string }) {
  const r = 52, c = 2 * Math.PI * r;
  const stroke = value >= 70 ? "stroke-emerald-500" : value >= 45 ? "stroke-amber-500" : "stroke-red-500";
  return (
    <div className="relative shrink-0" role="img" aria-label={`${label} ${value} of 100`}>
      <svg viewBox="0 0 128 128" className="h-28 w-28">
        <circle cx="64" cy="64" r={r} fill="none" strokeWidth="10" className="stroke-zinc-200/90 dark:stroke-zinc-700" />
        <circle cx="64" cy="64" r={r} fill="none" strokeWidth="10" strokeLinecap="round" className={stroke} strokeDasharray={c}
          strokeDashoffset={on ? c * (1 - value / 100) : c} transform="rotate(-90 64 64)" style={{ transition: "stroke-dashoffset 600ms ease-out" }} />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="of-engrave font-mono text-[24px] font-bold leading-none">{value}</span>
        <span className="mt-0.5 font-mono text-[9px] text-zinc-500">/ 100</span>
      </div>
    </div>
  );
}

/* ── SEO ── */
const TITLE_PPC = 9.7, META_PPC = 5.75, TITLE_LIMIT = 580, META_LIMIT = 920;
const escRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const pxOf = (text: string, per: number) => Math.round([...text].length * per);

function keywordDensity(text: string, keyword: string): number | null {
  const kw = keyword.trim();
  if (!kw || !text.trim()) return null;
  const total = text.trim().split(/\s+/).length;
  const hits = (text.match(new RegExp(`\\b${escRe(kw)}\\b`, "gi")) ?? []).length;
  return (hits * kw.split(/\s+/).length * 100) / total;
}
const limitState = (px: number, limit: number): ChipState => (px <= limit ? "pass" : px <= limit * 1.15 ? "warn" : "fail");
const densityState = (d: number | null): ChipState | null =>
  d == null ? null : d >= 0.5 && d <= 2.5 ? "pass" : d <= 4 ? "warn" : "fail";

function SeoPanel({ report }: { report: Report }) {
  const [title, setTitle] = useState("Handcrafted Bronze Door Hardware — Artisan Forged Hinges & Handles");
  const [meta, setMeta] = useState("Solid bronze door hardware, hand-forged by master artisans. Living finish, CAD-ready specs, and a lifetime structural warranty on every hinge and handle.");
  const [keyword, setKeyword] = useState("bronze door hardware");
  const dTitle = useDebounced(title), dMeta = useDebounced(meta), dKeyword = useDebounced(keyword);

  const titlePx = pxOf(dTitle, TITLE_PPC), metaPx = pxOf(dMeta, META_PPC);
  const tChars = [...dTitle].length, mChars = [...dMeta].length;
  const tKw = keywordDensity(dTitle, dKeyword), mKw = keywordDensity(dMeta, dKeyword);
  const WORD: Record<ChipState, string> = { pass: "fits", warn: "tight", fail: "over" };
  const KW: Record<ChipState, string> = { pass: "ideal", warn: "watch", fail: "stuffed" };
  const tState = limitState(titlePx, TITLE_LIMIT), mState = limitState(metaPx, META_LIMIT);
  const tKwState = densityState(tKw), mKwState = densityState(mKw);
  const metrics = [
    { label: "Title budget · 580px", value: `${titlePx} / ${TITLE_LIMIT} px`, state: tState as ChipState | null, word: WORD[tState] },
    { label: "Meta budget · 920px", value: `${metaPx} / ${META_LIMIT} px`, state: mState as ChipState | null, word: WORD[mState] },
    { label: "Keyword in title", value: tKw == null ? "—" : `${tKw.toFixed(1)}% density`, state: tKwState, word: tKwState ? KW[tKwState] : "" },
    { label: "Keyword in meta", value: mKw == null ? "—" : `${mKw.toFixed(1)}% density`, state: mKwState, word: mKwState ? KW[mKwState] : "" },
  ];

  useEffect(() => {
    report({ tool: "seo", titlePx, titleChars: tChars, metaPx, metaChars: mChars, titleKeywordDensity: tKw, metaKeywordDensity: mKw });
  }, [titlePx, tChars, metaPx, mChars, tKw, mKw, report]);

  return (
    <div className="flex flex-col gap-3.5">
      <Field label="Title tag" hint={`${titlePx}px · ${tChars} chars`}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className={INPUT} />
      </Field>
      <Field label="Meta description" hint={`${metaPx}px · ${mChars} chars`}>
        <input value={meta} onChange={(e) => setMeta(e.target.value)} className={INPUT} />
      </Field>
      <Field label="Focus keyword" hint="word-boundary matching">
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} className={INPUT} spellCheck={false} />
      </Field>
      <div className="grid gap-2 sm:grid-cols-2">
        {metrics.map((m) => (
          <Metric key={m.label} label={m.label} value={m.value}>
            {m.state ? <StateChip state={m.state}>{m.word}</StateChip> : <span className="of-chip">no keyword</span>}
          </Metric>
        ))}
      </div>
      <p className="text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-400">
        Pixel widths estimate Google desktop truncation (580px title, 920px description). Keyword density target 0.5–2.5% — above 4% reads as stuffing.
      </p>
    </div>
  );
}

/* ── Contrast ── */
type Rgb = [number, number, number];
function hexToRgb(hex: string): Rgb | null {
  const m = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(hex.trim());
  if (!m) return null;
  const h = m[1].length === 3 ? [...m[1]].map((c) => c + c).join("") : m[1];
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
const toHex = ([r, g, b]: Rgb) => "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
function luminance([r, g, b]: Rgb) {
  const f = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
function contrastRatio(a: Rgb, b: Rgb) {
  const l1 = Math.max(luminance(a), luminance(b)), l2 = Math.min(luminance(a), luminance(b));
  return (l1 + 0.05) / (l2 + 0.05);
}

function ColorField({ label, value, onChange, fallback }: { label: string; value: string; onChange: (v: string) => void; fallback: string }) {
  const rgb = hexToRgb(value);
  return (
    <Field label={label} hint={rgb ? toHex(rgb) : "invalid hex"}>
      <span className="flex items-center gap-2 rounded-lg border border-zinc-300/80 bg-white/70 px-2 py-1.5 dark:border-zinc-700 dark:bg-zinc-900/60">
        <input type="color" aria-label={`${label} color picker`} value={rgb ? toHex(rgb) : fallback} onChange={(e) => onChange(e.target.value)}
          className="h-7 w-9 shrink-0 cursor-pointer rounded border border-zinc-300/70 bg-transparent p-0 dark:border-zinc-600" />
        <input value={value} onChange={(e) => onChange(e.target.value)} aria-label={`${label} hex value`} spellCheck={false}
          className="w-full min-w-0 bg-transparent font-mono text-[13px] uppercase outline-none dark:text-zinc-100" />
      </span>
    </Field>
  );
}

function ContrastPanel({ report }: { report: Report }) {
  const [fg, setFg] = useState("#E9DFC8");
  const [bg, setBg] = useState("#17130D");
  const dFg = useDebounced(fg), dBg = useDebounced(bg);
  const rgbFg = hexToRgb(dFg), rgbBg = hexToRgb(dBg);
  const ratio = rgbFg && rgbBg ? contrastRatio(rgbFg, rgbBg) : null;

  useEffect(() => {
    if (ratio != null) report({ tool: "contrast", ratio: Number(ratio.toFixed(2)) });
  }, [ratio, report]);

  const checks = ratio == null ? null : [
    { label: "AA · normal", pass: ratio >= 4.5 },
    { label: "AAA · normal", pass: ratio >= 7 },
    { label: "AA · large", pass: ratio >= 3 },
    { label: "AAA · large", pass: ratio >= 4.5 },
  ];

  return (
    <div className="flex flex-col gap-3.5">
      <div className="grid grid-cols-2 gap-3">
        <ColorField label="Foreground" value={fg} onChange={setFg} fallback="#E9DFC8" />
        <ColorField label="Background" value={bg} onChange={setBg} fallback="#17130D" />
      </div>
      <div className="of-hairline grid place-items-center rounded-xl p-6" style={{ backgroundColor: rgbBg ? toHex(rgbBg) : "#17130D" }}>
        <div style={{ color: rgbFg ? toHex(rgbFg) : "#E9DFC8" }} className="text-center">
          <p className="text-[22px] font-semibold tracking-tight">Handcrafted in the forge</p>
          <p className="mt-1 text-[13px]">Brass fittings, obsidian finish — est. 1897.</p>
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
        <p className="of-engrave font-mono text-3xl font-bold tracking-tight">{ratio == null ? "—" : ratio.toFixed(2)}</p>
        <span className="pb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500">WCAG 2.2 contrast ratio</span>
        <div className="ml-auto grid grid-cols-2 gap-1.5">
          {checks?.map((c) => (
            <span key={c.label} className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold ${c.pass ? CHIP_STYLE.pass : CHIP_STYLE.fail}`}>
              {c.pass ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />} {c.label}
            </span>
          ))}
        </div>
      </div>
      <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
        L = 0.2126R + 0.7152G + 0.0722B on linearised sRGB · ratio = (L₁+0.05)/(L₂+0.05) · AA normal ≥ 4.5, AAA ≥ 7.
      </p>
    </div>
  );
}

/* ── Regex ── */
type Match = { start: number; end: number; text: string };

function RegexPanel({ report }: { report: Report }) {
  const [pattern, setPattern] = useState("[\\w.]+@[\\w.]+\\.[a-z]{2,}");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState(
    "Reach out to ana@forge.studio or Ben.Reyes92@example.com before Friday.\nInvoice INV-2031 was paid; INV-2044 is due 2026-03-14.\nPrefer the priority line? ops@forge.studio answers within the hour."
  );
  const dPattern = useDebounced(pattern), dFlags = useDebounced(flags), dText = useDebounced(text);

  const { error, matches } = useMemo(() => {
    if (!dPattern.trim()) return { error: null as string | null, matches: [] as Match[] };
    try {
      const re = new RegExp(dPattern, dFlags.replace(/[^gimsuy]/g, ""));
      const ms: Match[] = [];
      if (re.global) {
        for (const m of dText.matchAll(re)) {
          if (m[0].length > 0 && m.index != null) ms.push({ start: m.index, end: m.index + m[0].length, text: m[0] });
        }
      } else {
        const m = re.exec(dText);
        if (m && m[0].length > 0) ms.push({ start: m.index, end: m.index + m[0].length, text: m[0] });
      }
      return { error: null, matches: ms };
    } catch (e) {
      return { error: e instanceof Error ? e.message : "Invalid pattern", matches: [] as Match[] };
    }
  }, [dPattern, dFlags, dText]);

  useEffect(() => {
    report({ tool: "regex", valid: error == null, matchCount: matches.length, pattern: dPattern });
  }, [error, matches.length, dPattern, report]);

  const highlighted = useMemo(() => {
    const parts: ReactNode[] = [];
    let cursor = 0;
    matches.forEach((m, i) => {
      if (m.start < cursor) return;
      if (m.start > cursor) parts.push(<span key={`t${i}`}>{dText.slice(cursor, m.start)}</span>);
      parts.push(<mark key={`m${i}`} className="rounded-[3px] bg-amber-300/80 px-0.5 text-zinc-900 dark:bg-amber-400/30 dark:text-amber-100">{m.text}</mark>);
      cursor = m.end;
    });
    if (cursor < dText.length) parts.push(<span key="tail">{dText.slice(cursor)}</span>);
    return parts;
  }, [matches, dText]);

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex gap-2">
        <div className="min-w-0 flex-1">
          <Field label="Pattern">
            <input value={pattern} onChange={(e) => setPattern(e.target.value)} spellCheck={false} className={`${INPUT} font-mono`} />
          </Field>
        </div>
        <div className="w-20 shrink-0">
          <Field label="Flags">
            <input value={flags} onChange={(e) => setFlags(e.target.value)} spellCheck={false} className={`${INPUT} text-center font-mono`} />
          </Field>
        </div>
      </div>
      {error ? (
        <p role="alert" className="flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] leading-snug text-red-700 dark:text-red-300">
          <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {error}
        </p>
      ) : (
        <div className="flex items-center gap-2">
          {dPattern.trim() ? (
            <StateChip state={matches.length ? "pass" : "warn"}>{matches.length} match{matches.length === 1 ? "" : "es"}</StateChip>
          ) : (
            <span className="of-chip">enter a pattern</span>
          )}
          {matches.length > 24 && <span className="font-mono text-[10px] text-zinc-400">showing first 24</span>}
        </div>
      )}
      <Field label="Test string">
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className={`${INPUT} resize-y font-mono text-[12px] leading-relaxed`} />
      </Field>
      <div className="of-hairline whitespace-pre-wrap rounded-xl bg-white/60 p-3 font-mono text-[12px] leading-relaxed dark:bg-zinc-900/50" aria-label="Highlighted matches">
        {highlighted}
      </div>
      {matches.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {matches.slice(0, 24).map((m, i) => (
            <span key={i} className="rounded-md bg-amber-100/80 px-1.5 py-0.5 font-mono text-[10px] text-amber-900 dark:bg-amber-500/15 dark:text-amber-200">
              #{i + 1} {m.text.length > 26 ? `${m.text.slice(0, 25)}…` : m.text}
            </span>
          ))}
          {matches.length > 24 && <span className="of-chip">+{matches.length - 24} more</span>}
        </div>
      )}
    </div>
  );
}

/* ── Headline ── */
const POWER_WORDS = ["free", "proven", "instantly", "secret", "ultimate", "essential", "effortless", "exclusive", "guaranteed", "powerful", "smart", "instant", "new", "now", "boost", "transform", "unlock", "reliable", "trusted", "complete", "simple", "fast", "easy", "critical", "effective", "best", "winning", "master", "insider", "limited", "breakthrough", "remarkable", "practical", "honest", "vital", "brilliant", "foolproof", "perfect", "genius", "limitless"];
const POSITIVE_WORDS = ["save", "gain", "win", "love", "happy", "success", "grow", "improve", "benefit", "thrive", "achieve", "delight", "reward", "profit", "value", "results", "celebrate", "freedom"];

function headlineScore(h: string) {
  const len = [...h.trim()].length;
  const lower = h.toLowerCase();
  const lengthFactor = len === 0 ? 0 : len < 40 ? len / 40 : len <= 70 ? 1 : Math.max(0, 1 - (len - 70) / 60);
  const has = (list: string[]) => list.filter((w) => new RegExp(`\\b${w}\\b`, "i").test(lower));
  const powerHits = has(POWER_WORDS), sentHits = has(POSITIVE_WORDS);
  const factors = [
    { label: "Length", value: Math.round(lengthFactor * 40), max: 40 },
    { label: "Power words", value: powerHits.length ? 25 : 0, max: 25 },
    { label: "Number", value: /\d/.test(h) ? 20 : 0, max: 20 },
    { label: "Sentiment", value: sentHits.length ? 15 : 0, max: 15 },
  ];
  return { len, factors, powerHits, sentHits, total: Math.min(100, factors.reduce((s, f) => s + f.value, 0)) };
}

function HeadlinePanel({ report }: { report: Report }) {
  const [headline, setHeadline] = useState("10 Proven Ways to Instantly Unlock Your Best Sales Year");
  const dHeadline = useDebounced(headline);
  const result = useMemo(() => headlineScore(dHeadline), [dHeadline]);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(r);
  }, []);
  useEffect(() => {
    report({ tool: "headline", score: result.total, chars: result.len });
  }, [result.total, result.len, report]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex shrink-0 flex-col items-center gap-2 self-center">
        <Dial on={on} value={result.total} label="Headline score" />
        <span className="of-chip">{result.len} chars</span>
      </div>
      <div className="min-w-0 flex-1 space-y-2.5">
        <Field label="Headline" hint="40–70 chars is the sweet spot">
          <input value={headline} onChange={(e) => setHeadline(e.target.value)} className={INPUT} />
        </Field>
        {result.factors.map((f) => (
          <div key={f.label} className="flex items-center gap-2.5">
            <span className="w-20 shrink-0 text-[10px] font-bold uppercase tracking-[0.08em] text-zinc-500">{f.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-zinc-700/70">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-700 to-amber-400 transition-[width] duration-200 ease-out" style={{ width: `${(f.value / f.max) * 100}%` }} />
            </div>
            <span className="w-14 shrink-0 text-right font-mono text-[10px] text-zinc-500">{f.value}/{f.max}</span>
          </div>
        ))}
        <p className="text-[10px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          Power words: {result.powerHits.length ? result.powerHits.join(", ") : "none"} · Sentiment: {result.sentHits.length ? result.sentHits.join(", ") : "none"} · Number: {/\d/.test(dHeadline) ? "present" : "missing"}
        </p>
      </div>
    </div>
  );
}

/* ── shell ── */
const TOOLS = [
  { id: "seo", label: "SEO", icon: Search },
  { id: "contrast", label: "Contrast", icon: Contrast },
  { id: "regex", label: "Regex", icon: RegexIcon },
  { id: "headline", label: "Headline", icon: Type },
] as const;
type ToolId = (typeof TOOLS)[number]["id"];

export function ToolDemo({ offer, onComplete }: DemoProps) {
  const [active, setActive] = useState<ToolId>("seo");
  const [resetKey, setResetKey] = useState(0);
  const cbRef = useRef(onComplete);
  useEffect(() => {
    cbRef.current = onComplete;
  });
  const emit = useCallback((payload: Record<string, unknown>) => cbRef.current?.({ demo: "toolkit", ...payload }), []);
  const report = useCallback((p: Record<string, unknown>) => emit(p), [emit]);

  return (
    <div className="of-plate flex max-h-[620px] w-full flex-col overflow-hidden text-zinc-800 dark:text-zinc-200">
      <span aria-hidden="true" className="absolute right-0 top-0 z-20 border-b border-l border-[#a37a2e]/40 bg-gradient-to-b from-[#f8f1dd] to-[#ecdfc0] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-amber-800 dark:border-amber-500/30 dark:from-zinc-800 dark:to-zinc-900 dark:text-amber-300">
        Sample
      </span>
      <header className="flex items-center gap-3 px-5 py-3 pr-24">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-zinc-900 text-amber-200 dark:bg-amber-100 dark:text-zinc-900">
          <Gauge className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <h3 className="of-engrave text-sm font-semibold tracking-tight">The Toolkit — four live instruments</h3>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">Every result computed in-browser, nothing leaves this panel</p>
        </div>
        <button onClick={() => setResetKey((k) => k + 1)} className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-semibold text-zinc-500 transition-colors duration-150 hover:bg-zinc-900/5 hover:text-zinc-800 focus-visible:outline-2 focus-visible:outline-amber-600 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </header>

      <nav className="flex gap-1 border-b border-zinc-200/70 px-4 pt-2 dark:border-zinc-700/60" role="tablist" aria-label="Toolkit instruments">
        {TOOLS.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} role="tab" aria-selected={active === t.id} onClick={() => { setActive(t.id); emit({ action: "open-tool", tool: t.id }); }}
              className={`inline-flex items-center gap-1.5 border-b-2 px-3 py-2 text-[11px] font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-amber-600 ${
                active === t.id
                  ? "border-amber-600 text-zinc-900 dark:border-amber-400 dark:text-amber-300"
                  : "border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}>
              <Icon className="h-3.5 w-3.5" /> {t.label}
            </button>
          );
        })}
      </nav>

      <div key={resetKey} className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <div role="tabpanel" hidden={active !== "seo"}><SeoPanel report={report} /></div>
        <div role="tabpanel" hidden={active !== "contrast"}><ContrastPanel report={report} /></div>
        <div role="tabpanel" hidden={active !== "regex"}><RegexPanel report={report} /></div>
        <div role="tabpanel" hidden={active !== "headline"}><HeadlinePanel report={report} /></div>
      </div>

      <footer className="border-t border-zinc-200/70 px-4 py-3 dark:border-zinc-700/60">
        <div className="of-hairline flex items-center gap-3.5 rounded-xl bg-gradient-to-b from-amber-50/90 to-[#efe6cf] p-3 dark:from-zinc-900 dark:to-zinc-950">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-zinc-900 text-amber-200 dark:bg-amber-100 dark:text-zinc-900">
            <Gem className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-amber-800/80 dark:text-amber-500/80">This is one instrument of twelve</p>
            <p className="of-engrave truncate text-[13px] font-semibold">{offer.title}</p>
          </div>
          <div className="text-right">
            {offer.price != null ? (
              <p className="of-foil-text font-mono text-base font-bold leading-tight">${offer.price.toLocaleString("en-US")}</p>
            ) : (
              <p className="of-foil-text font-mono text-sm font-bold leading-tight">Request demo</p>
            )}
            <p className="text-[9px] text-zinc-500 dark:text-zinc-400">full kit · one-time</p>
          </div>
          <button onClick={() => emit({ action: "get-full-kit", offerId: offer.offerId })}
            className="shrink-0 rounded-lg bg-zinc-900 px-3.5 py-2 text-[11px] font-semibold text-amber-50 transition-colors duration-200 hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 dark:bg-amber-100 dark:text-zinc-900 dark:hover:bg-amber-50">
            Get the full kit
          </button>
        </div>
      </footer>
    </div>
  );
}
