'use client';
/**
 * OMNIFORGE · GenomeConsole v2 — the layer navigator.
 *
 * The backbone's control surface, refactored for wayfinding: seven
 * background-coloured LAYER TABS (each room keeps its own colour), a
 * large panel for the selected layer with visual option cards, a clear
 * "what changes in {model}" effect list per value, an applied-changes
 * tray with per-switch reset, and the folded Text / DNA / prestige
 * rooms. Fully responsive: tabs scroll on small screens, cards stack.
 */
import { useState } from 'react';
import { Dna, RotateCcw, Sparkles, Type, Gauge, Eye, EyeOff, Layers3, X, Check } from 'lucide-react';
import {
  GENOME_SWITCHES,
  GENOME_PRESETS,
  ATMOSPHERES,
  type SwitchId,
  type GenomeSelection,
} from '@/lib/genome/switches';
import { EFFECTS, MODEL_ANSWERS } from '@/lib/genome/layout';
import { VOICES } from '@/lib/genome/tokens';
import { useGenome, setText, applySelection, resetGenome, setSwitch, setInspect, useInspect } from '@/lib/genome/store';
import { useMode, useModeChoice, setMode, clearMode } from '@/lib/style-registry';
import { dnaForEntry, dnaCardFor } from '@/lib/genome/catalog';
import { prestigeScore } from '@/lib/genome/tokens';
import { allSiteEntries, type SiteIndexEntry } from '@/lib/site-preview';
import { useSiteWorld } from '@/components/site/SiteTemplate';

const DEFAULT_ENTRY: SiteIndexEntry = allSiteEntries()[3] ?? (allSiteEntries()[0] as SiteIndexEntry);

/* ── mini-visuals — each switch value shows what it IS ──────────── */

function OptionVisual({ sw, option, mode }: { sw: SwitchId; option: string; mode: 'light' | 'dark' }) {
  if (sw === 'atmosphere') {
    const a = ATMOSPHERES[option];
    const p = a ? a[mode] : null;
    if (!p) return <span className="block h-7 rounded-md border border-current/15 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(128,128,128,0.14)_4px,rgba(128,128,128,0.14)_8px)]" />;
    return (
      <span className="flex h-7 overflow-hidden rounded-md border border-current/15">
        {[p.bg, p.surface, p.primary, p.accent, p.ink].map((c) => (
          <span key={c} className="flex-1" style={{ background: c }} />
        ))}
      </span>
    );
  }
  if (sw === 'voice') {
    const v = VOICES.find((x) => x.id === option);
    return (
      <span
        className="grid h-7 place-items-center rounded-md border border-current/15 text-[15px] font-semibold"
        style={{ fontFamily: v?.head ?? undefined }}
      >
        Ag
      </span>
    );
  }
  if (sw === 'composition') {
    const bars: Record<string, string[]> = {
      native: ['w-3/5', 'w-4/5', 'w-2/5'],
      centered: ['w-2/3 mx-auto', 'w-1/2 mx-auto', 'w-1/3 mx-auto'],
      asymmetric: ['w-2/5 ml-0', 'w-3/5 ml-auto -mt-1.5', 'w-1/3 ml-0'],
      grid: ['w-full border-b border-current/25 pb-0.5', 'w-full border-b border-current/25 pb-0.5', 'w-full border-b border-current/25 pb-0.5'],
      fullbleed: ['w-full h-3 rounded-sm', 'w-3/5', 'w-2/5'],
      modular: ['w-1/2', 'w-1/3', 'w-2/5'],
      diagonal: ['w-3/5 -rotate-3', 'w-4/5 rotate-2', 'w-2/5 -rotate-2'],
    };
    return (
      <span className="flex h-7 flex-col justify-center gap-1 rounded-md border border-current/15 px-1.5">
        {(bars[option] ?? bars.native).map((w, i) => (
          <span key={i} className={`h-1 rounded-full bg-current ${w}`} style={{ opacity: 0.5 - i * 0.12 }} />
        ))}
      </span>
    );
  }
  if (sw === 'material') {
    const fills: Record<string, string> = {
      native: 'transparent',
      paper: 'repeating-linear-gradient(0deg,rgba(128,128,128,0.08) 0 1px,transparent 1px 3px)',
      marble: 'linear-gradient(115deg,transparent 30%,rgba(128,128,128,0.3) 45%,transparent 60%)',
      metal: 'linear-gradient(180deg,rgba(128,128,128,0.4),transparent 30%,transparent 70%,rgba(128,128,128,0.25))',
      silk: 'radial-gradient(120% 140% at 20% 0%,rgba(128,128,128,0.3),transparent 60%)',
      glass: 'linear-gradient(180deg,rgba(160,180,220,0.25),rgba(255,255,255,0.1))',
      ink: '#111',
    };
    return <span className="block h-7 rounded-md border border-current/15" style={{ background: fills[option] ?? 'transparent' }} />;
  }
  if (sw === 'detail') {
    const glyphs: Record<string, string> = {
      native: '·',
      hairlines: '─',
      emboss: 'A̷',
      monogram: '◉',
      foil: '✦',
      archival: 'ED.',
      icons: '◆',
    };
    return (
      <span className="grid h-7 place-items-center rounded-md border border-current/15 font-mono text-[13px]">
        {glyphs[option] ?? '·'}
      </span>
    );
  }
  if (sw === 'direction') {
    const scales: Record<string, string> = {
      native: '0.85rem', editorial: '1.05rem', architectural: '0.8rem',
      gallery: '0.95rem', atelier: '0.9rem', futurist: '0.88rem', heritage: '0.82rem',
    };
    const caps: Record<string, string> = { futurist: 'uppercase', heritage: 'small-caps' };
    return (
      <span className="grid h-7 place-items-center rounded-md border border-current/15 font-semibold leading-none" style={{ fontSize: scales[option] ?? '0.85rem', textTransform: caps[option] ?? 'none', fontVariant: option === 'heritage' ? 'small-caps' : 'normal' }}>
        Aa
      </span>
    );
  }
  /* mode */
  return (
    <span className="flex h-7 gap-1 rounded-md border border-current/15 p-1">
      <span className="flex-1 rounded-sm" style={{ background: '#f5f2ea' }} />
      <span className="flex-1 rounded-sm" style={{ background: '#14120e' }} />
    </span>
  );
}

export function GenomeConsole({
  entry,
  compact = false,
  className = '',
}: {
  entry?: SiteIndexEntry | null;
  compact?: boolean;
  className?: string;
}) {
  const genome = useGenome();
  const mode = useMode();
  const modeChoice = useModeChoice();
  const inspect = useInspect();
  const [tab, setTab] = useState<SwitchId>('direction');
  const target = entry ?? DEFAULT_ENTRY;
  const world = useSiteWorld(target);
  const prestige = prestigeScore(world.tokens);
  const dna = dnaForEntry(target);
  const card = dnaCardFor(dna, target);
  const modelAnswer = MODEL_ANSWERS[world.archetype] ?? {};

  const overridden = (Object.keys(genome.sel) as SwitchId[]).filter((k) => k !== 'mode' && genome.sel[k] !== 'native');
  const activeSwitch = GENOME_SWITCHES.find((s) => s.id === tab)!;
  const activeModeValue = tab === 'mode' ? (modeChoice ?? 'native') : genome.sel[tab];
  const effects = EFFECTS[tab];
  const dnaValueForTab = (() => {
    if (tab === 'mode') return null;
    const chosen = genome.sel[tab] !== 'native' ? genome.sel[tab] : dna[tab as 'direction'];
    return activeSwitch.options.find((o) => o.id === chosen)?.label ?? 'As drawn';
  })();

  const choose = (id: SwitchId, option: string) => {
    if (id === 'mode') {
      if (option === 'native') clearMode();
      else setMode(option as 'light' | 'dark');
    } else {
      setSwitch(id, option);
    }
  };

  return (
    <div className={`g-console space-y-3 ${className}`} data-testid="genome-console">
      {/* ── command bar: presets · applied tray · inspector ───────── */}
      <div className="of-plate p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-brass-500" />
            <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              curated presets — one press, whole curation
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setInspect(!inspect)}
              data-testid="genome-inspect-toggle"
              aria-pressed={inspect}
              className={`flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] transition-colors ${
                inspect ? 'text-brass-600 dark:text-brass-300' : 'text-zinc-400 hover:text-[var(--of-text)]'
              }`}
              title="Show clear-text layer annotations inside every template"
            >
              {inspect ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />} layer inspector
            </button>
            <button
              onClick={resetGenome}
              data-testid="genome-reset"
              className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-zinc-400 transition-colors hover:text-brass-600 dark:hover:text-brass-300"
            >
              <RotateCcw className="h-3 w-3" /> reset all
            </button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {GENOME_PRESETS.map((p) => {
            const on = Object.entries(p.sel).every(([k, v]) => genome.sel[k as keyof GenomeSelection] === v);
            return (
              <button
                key={p.name}
                onClick={() => applySelection(p.sel)}
                data-testid={`genome-preset-${p.name.slice(0, 6)}`}
                className={`of-chip !text-[10.5px] hover:!border-brass-400 ${on ? '!border-brass-400 !text-brass-600 dark:!text-brass-300' : ''}`}
                title={p.note}
              >
                {p.name}
              </button>
            );
          })}
        </div>
        {overridden.length > 0 && (
          <div className="of-hairline-t mt-3 flex flex-wrap items-center gap-1.5 pt-3" data-testid="genome-applied-tray">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-zinc-400">applied — overriding the DNA:</span>
            {overridden.map((k) => {
              const sw = GENOME_SWITCHES.find((s) => s.id === k)!;
              const label = sw.options.find((o) => o.id === genome.sel[k])?.label ?? genome.sel[k];
              return (
                <span key={k} className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9.5px]" style={{ borderColor: sw.panelEdge, background: sw.panelBg }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: sw.dot }} />
                  {sw.no} {label}
                  <button
                    onClick={() => setSwitch(k, 'native')}
                    aria-label={`reset ${sw.label} to as drawn`}
                    className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-black/10 dark:hover:bg-white/10"
                    data-testid={`genome-tray-reset-${k}`}
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </span>
              );
            })}
            <button onClick={resetGenome} className="font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-400 underline-offset-2 hover:underline">
              clear all
            </button>
          </div>
        )}
      </div>

      {/* ── seven layer tabs — each room keeps its own colour ─────── */}
      <div className="g-console-tabs" role="tablist" aria-label="Genome layers" data-testid="genome-tabs">
        {GENOME_SWITCHES.map((sw) => {
          const active = sw.id === tab;
          const isOver = sw.id !== 'mode' && genome.sel[sw.id] !== 'native';
          return (
            <button
              key={sw.id}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(sw.id)}
              data-testid={`genome-tab-${sw.id}`}
              className="g-console-tab"
              style={{
                background: active ? sw.panelBg : 'transparent',
                borderColor: active ? sw.panelEdge : 'transparent',
                color: active ? 'var(--of-text)' : undefined,
              }}
            >
              <span className="g-console-tab-no" style={{ background: sw.dot }}>
                {sw.no}
              </span>
              <span className="g-console-tab-label">{sw.label}</span>
              {isOver && <span className="g-console-tab-dot" style={{ background: sw.dot }} aria-label="overriding DNA" />}
            </button>
          );
        })}
      </div>

      {/* ── the selected layer's room ─────────────────────────────── */}
      <section
        className="rounded-xl border p-4 sm:p-5"
        style={{ background: activeSwitch.panelBg, borderColor: activeSwitch.panelEdge }}
        data-testid={`genome-switch-${activeSwitch.id}`}
        aria-label={activeSwitch.label}
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: activeSwitch.dot }} />
            <h3 className="font-display text-lg font-semibold leading-tight">{activeSwitch.label}</h3>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-500 dark:text-zinc-400">
            switch {activeSwitch.no} / 07 {tab !== 'mode' && <>· dna keeps &ldquo;{dnaValueForTab}&rdquo;</>}
          </span>
        </div>
        <p className="mt-1.5 max-w-3xl text-[11.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          {activeSwitch.line}
          {effects && <> <b className="font-semibold">Governs:</b> {effects.governs}.</>}
        </p>

        {/* option cards — visual + name + what it does to THIS model */}
        <div className={`mt-4 grid gap-2 sm:grid-cols-2 ${compact ? '' : 'xl:grid-cols-4'}`}>
          {activeSwitch.options.map((o) => {
            const on = o.id === activeModeValue;
            const isNative = o.id === 'native';
            const val = isNative
              ? null
              : effects?.values[o.id] ?? null;
            const modelLine = tab === 'composition' ? modelAnswer[o.id] : null;
            return (
              <button
                key={o.id}
                aria-pressed={on}
                onClick={() => choose(activeSwitch.id, o.id)}
                data-testid={`genome-opt-${activeSwitch.id}-${o.id}`}
                className={`g-opt-card ${on ? 'g-opt-on' : ''}`}
                style={on ? { borderColor: activeSwitch.dot, boxShadow: `0 0 0 1px ${activeSwitch.dot} inset` } : undefined}
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="min-w-0">
                    <span className="block truncate text-[12.5px] font-semibold">{o.label}</span>
                    {isNative && tab !== 'mode' && (
                      <span className="mt-0.5 block font-mono text-[8.5px] uppercase tracking-[0.12em] text-zinc-400">
                        dna: {dnaValueForTab}
                      </span>
                    )}
                  </span>
                  {on && (
                    <span className="g-opt-check" style={{ background: activeSwitch.dot }}>
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </span>
                <OptionVisual sw={activeSwitch.id} option={o.id} mode={mode} />
                <span className="block text-[10px] leading-snug text-zinc-500 dark:text-zinc-400">{o.hint}</span>
                {on && val && (
                  <span className="g-opt-effects" data-testid={`genome-effects-${activeSwitch.id}`}>
                    {val.map((line, i) => (
                      <span key={i} className="block">— {line}</span>
                    ))}
                    {modelLine && (
                      <span className="mt-1 block font-semibold" style={{ color: activeSwitch.dot }}>
                        → in {world.copy.brand}: {modelLine}
                      </span>
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {!compact && effects && activeModeValue !== 'native' && (
          <p className="of-hairline-t mt-3 pt-2.5 font-mono text-[9px] leading-relaxed text-zinc-400">
            every template model implements &ldquo;{activeSwitch.options.find((o) => o.id === activeModeValue)?.label}&rdquo; as its own
            structural response — flip through the atelier to compare models under the same layer.
          </p>
        )}
      </section>

      {/* ── folded rooms: text · dna · prestige (responsive details) ── */}
      <div className="grid gap-3 lg:grid-cols-2">
        <details className="of-plate group p-0" open={!compact}>
          <summary className="flex cursor-pointer items-center gap-2 p-4 font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            <Type className="h-3.5 w-3.5 text-brass-500" />
            text layer — reword any world, live
            <span className="ml-auto font-mono text-[8.5px] normal-case tracking-normal text-zinc-400 group-open:hidden">open</span>
          </summary>
          <div className="px-4 pb-4">
            <div className="grid gap-2 sm:grid-cols-2">
              {([
                ['brand', 'Site name', genome.text.brand, 'e.g. Villa Serena'],
                ['headline', 'Headline', genome.text.headline, 'overrides the drawn headline'],
                ['subhead', 'Subheadline', genome.text.subhead, 'one clear sentence'],
                ['cta', 'Call to action', genome.text.cta, '2–4 words'],
              ] as const).map(([k, label, val, ph]) => (
                <label key={k} className="block">
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-zinc-400">{label}</span>
                  <input
                    value={val}
                    placeholder={ph}
                    onChange={(e) => setText({ [k]: e.target.value })}
                    data-testid={`genome-text-${k}`}
                    className="mt-1 w-full rounded-md border border-zinc-300/60 bg-transparent px-2.5 py-1.5 text-[12px] outline-none transition-colors placeholder:text-zinc-400/70 focus:border-brass-400 dark:border-white/10"
                  />
                </label>
              ))}
            </div>
            <p className="mt-2 font-mono text-[9px] leading-relaxed text-zinc-400">
              applies to every site — full reviews, partials and family listings · leave empty to keep each world&rsquo;s own copy
            </p>
          </div>
        </details>

        <details className="of-plate group p-0" open={!compact}>
          <summary className="flex cursor-pointer items-center gap-2 p-4 font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            <Dna className="h-3.5 w-3.5 text-brass-500" />
            design dna — {card.name}
            <span className="ml-auto font-mono text-[8.5px] normal-case tracking-normal text-zinc-400 group-open:hidden">open</span>
          </summary>
          <div className="px-4 pb-4">
            <dl className="space-y-1.5 text-[11px] leading-relaxed">
              {([
                ['Positioning', card.positioning],
                ['Metaphor', card.metaphor],
                ['Layout logic', card.layoutLogic],
                ['Typography', card.typography],
                ['Colour logic', card.colorLogic],
                ['Image treatment', card.imageTreatment],
                ['Signature', card.signature],
                ['Motion', card.motion],
              ] as const).map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <dt className="w-24 shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-400">{k}</dt>
                  <dd className="min-w-0 flex-1 text-zinc-600 dark:text-zinc-300">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 font-mono text-[9px] text-zinc-400">do not: {card.doNotDo.join(' · ')}</p>
          </div>
        </details>

        <details className="of-plate group p-0 lg:col-span-2" data-testid="genome-prestige" open={!compact}>
          <summary className="flex cursor-pointer items-center gap-2 p-4 font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
            <Gauge className="h-3.5 w-3.5 text-brass-500" />
            prestige gate — {world.copy.brand}
            <span className="ml-auto font-mono text-[8.5px] normal-case tracking-normal text-zinc-400 group-open:hidden">open</span>
          </summary>
          <div className="px-4 pb-4">
            <div className="flex items-baseline justify-between">
              <span className="of-foil-text font-display text-4xl font-bold">
                {prestige.score}
                <span className="text-sm text-zinc-400"> · {prestige.grade}</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-400">
                {mode} edition · gate {prestige.gate}
              </span>
            </div>
            <div className="mt-2 h-[3px] rounded bg-zinc-500/15">
              <div
                className="h-full rounded transition-[width] duration-500"
                style={{
                  width: `${prestige.score}%`,
                  background: prestige.score >= prestige.gate ? 'var(--of-foil)' : '#e11d48',
                }}
              />
            </div>
            <ul className="mt-3 grid gap-1 sm:grid-cols-2 lg:grid-cols-5">
              {prestige.checks.map((c) => (
                <li key={c.label} className="flex justify-between gap-2 text-[10.5px]">
                  <span className={c.pass ? 'text-zinc-600 dark:text-zinc-300' : 'text-rose-500'}>
                    {c.pass ? '✓' : '!'} {c.label}
                  </span>
                  <span className="font-mono text-zinc-400">{c.ratio.toFixed(1)}:1</span>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>

      {/* wayfinding foot note */}
      <p className="flex items-center gap-2 font-mono text-[9px] leading-relaxed text-zinc-400">
        <Layers3 className="h-3 w-3 shrink-0 text-brass-500" />
        seven layers, one model at a time — pick a tab, choose a named value, and watch every template answer structurally.
        the layer inspector stamps clear annotations inside the templates themselves.
      </p>
    </div>
  );
}
