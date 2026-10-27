'use client';

import { useMemo, useState } from 'react';

/**
 * ToolDemo (P3) — Toolkit archetype
 *
 * Real WCAG 2.2 contrast checker using the actual relative-luminance formula.
 * L = 0.2126R + 0.7152G + 0.0722B (linearised sRGB)
 * contrast = (L1 + 0.05) / (L2 + 0.05)
 */

function hexToRgb(hex: string): [number, number, number] | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function linearizeChannel(c: number): number {
  const cs = c / 255;
  return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  return 0.2126 * linearizeChannel(r) + 0.7152 * linearizeChannel(g) + 0.0722 * linearizeChannel(b);
}

function contrastRatio(fg: string, bg: string): { ratio: number; aa: boolean; aaLarge: boolean; aaa: boolean; aaaLarge: boolean } {
  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);
  if (!fgRgb || !bgRgb) return { ratio: 0, aa: false, aaLarge: false, aaa: false, aaaLarge: false };
  const l1 = relativeLuminance(fgRgb);
  const l2 = relativeLuminance(bgRgb);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return {
    ratio: Math.round(ratio * 100) / 100,
    aa: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaa: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  };
}

const PRESETS = [
  { name: 'Cream on Obsidian', fg: '#F7F4EE', bg: '#0E0E10' },
  { name: 'Brass on Cream', fg: '#B8913F', bg: '#F7F4EE' },
  { name: 'Ink on Cream', fg: '#1A1814', bg: '#F7F4EE' },
  { name: 'Red on White', fg: '#FF0000', bg: '#FFFFFF' },
  { name: 'Grey on Grey', fg: '#999999', bg: '#666666' },
];

export default function ToolDemo() {
  const [fg, setFg] = useState('#F7F4EE');
  const [bg, setBg] = useState('#0E0E10');
  const result = useMemo(() => contrastRatio(fg, bg), [fg, bg]);

  return (
    <div className="relative">
      <span className="ribbon-sample">Sample</span>
      <div className="p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-dim)]">
          WCAG 2.2 Contrast Checker · Real luminance formula
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold text-[var(--ink)]">
          Check your colour pair
        </h3>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Uses the actual relative-luminance formula from the WCAG 2.2 spec.
          The full toolkit has 3 tools: this, a spacing ruler, and a type-scale generator.
        </p>

        {/* Preview swatch */}
        <div
          className="mt-6 flex h-32 items-center justify-center rounded border border-[var(--plate-edge)]"
          style={{ backgroundColor: bg, color: fg }}
        >
          <div className="text-center">
            <p className="font-display text-2xl font-bold">The quick brown fox</p>
            <p className="mt-1 font-mono text-xs">jumps over the lazy dog · 0123456789</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink-dim)]">Foreground</span>
            <div className="flex items-center gap-2">
              <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="h-8 w-12 border-0 p-0" />
              <input
                type="text"
                value={fg}
                onChange={(e) => setFg(e.target.value)}
                className="w-full border border-[var(--plate-edge)] bg-[var(--plate-bg)] px-2 py-1 font-mono text-xs text-[var(--ink)]"
              />
            </div>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink-dim)]">Background</span>
            <div className="flex items-center gap-2">
              <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="h-8 w-12 border-0 p-0" />
              <input
                type="text"
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                className="w-full border border-[var(--plate-edge)] bg-[var(--plate-bg)] px-2 py-1 font-mono text-xs text-[var(--ink)]"
              />
            </div>
          </label>
        </div>

        {/* Result */}
        <div className="mt-5 border border-[var(--plate-edge)] bg-[var(--plate-bg-deep)] p-4">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-dim)]">Contrast ratio</span>
            <span className="foil font-display text-4xl font-extrabold">{result.ratio.toFixed(2)}:1</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Badge label="AA" pass={result.aa} sub="≥ 4.5" />
            <Badge label="AA Large" pass={result.aaLarge} sub="≥ 3.0" />
            <Badge label="AAA" pass={result.aaa} sub="≥ 7.0" />
            <Badge label="AAA Large" pass={result.aaaLarge} sub="≥ 4.5" />
          </div>
        </div>

        {/* Formula */}
        <details className="mt-4">
          <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--brass-line)]">
            View the formula
          </summary>
          <div className="mt-2 border-l-2 border-[var(--brass-soft)] p-3 font-mono text-[10px] leading-relaxed text-[var(--ink-soft)]">
            <p>L = 0.2126·R + 0.7152·G + 0.0722·B  (linearised sRGB)</p>
            <p>contrast = (L₁ + 0.05) / (L₂ + 0.05)</p>
            <p className="mt-1 text-[var(--ink-dim)]">
              L(fg) = {relativeLuminance(hexToRgb(fg) || [0, 0, 0]).toFixed(4)} · L(bg) = {relativeLuminance(hexToRgb(bg) || [0, 0, 0]).toFixed(4)}
            </p>
          </div>
        </details>

        {/* Presets */}
        <div className="mt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--ink-dim)]">Try a preset</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => { setFg(p.fg); setBg(p.bg); }}
                className="border border-[var(--plate-edge)] px-2 py-1 font-mono text-[10px] text-[var(--ink-soft)] hover:border-[var(--brass-line)]"
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <a href="#buy" className="border border-[var(--ink)] bg-[var(--ink)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--plate-bg)]">
            Get the full toolkit →
          </a>
        </div>
      </div>
    </div>
  );
}

function Badge({ label, pass, sub }: { label: string; pass: boolean; sub: string }) {
  return (
    <div className={`border p-2 text-center ${pass ? 'border-[var(--brass-line)] bg-[var(--plate-bg)]' : 'border-[var(--plate-edge)] bg-[var(--plate-bg-deep)] opacity-50'}`}>
      <p className={`font-display text-sm font-bold ${pass ? 'text-[var(--brass-line)]' : 'text-[var(--ink-dim)]'}`}>{label}</p>
      <p className="font-mono text-[8px] text-[var(--ink-dim)]">{sub}</p>
      <p className="font-mono text-[8px] mt-0.5" style={{ color: pass ? 'var(--brass-line)' : 'var(--ink-dim)' }}>{pass ? 'PASS' : 'FAIL'}</p>
    </div>
  );
}
