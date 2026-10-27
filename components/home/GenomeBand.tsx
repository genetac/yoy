'use client';
/**
 * OMNIFORGE · GenomeBand — the backbone, exposed.
 *
 * 96 identities × 7 switches: the design genome is the system's backbone.
 * This band carries the explainer, the curated presets (always visible)
 * and the full console behind an expand — consistent with the forge's
 * collapsed-sections rule.
 */
import { useState } from 'react';
import { ChevronDown, Dna } from 'lucide-react';
import { GENOME_PRESETS } from '@/lib/genome/switches';
import { applySelection, useGenome } from '@/lib/genome/store';
import { GenomeConsole } from '@/components/genome/GenomeConsole';
import { allSiteEntries } from '@/lib/site-preview';

export function GenomeBand() {
  const [open, setOpen] = useState(false);
  const genome = useGenome();
  const activePresets = GENOME_PRESETS.filter((p) =>
    Object.entries(p.sel).every(([k, v]) => genome.sel[k as keyof typeof genome.sel] === v),
  );
  const overrides = (Object.keys(genome.sel) as (keyof typeof genome.sel)[]).filter(
    (k) => k !== 'mode' && genome.sel[k] !== 'native',
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6" data-testid="genome-band">
      <div className="mb-6">
        <div className="flex items-center gap-2 font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-brass-600 dark:text-brass-300">
          <Dna className="h-3.5 w-3.5" /> the backbone
        </div>
        <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight">
          The design genome — a layer navigator for 96 identities
        </h2>
        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400">
          Every template is a complete visual world with its own mood, layout logic, typography voice and signature
          details. Seven background-coloured layers — creative direction, typographic voice, material &amp; finish,
          composition, colour atmosphere, detail signature and light &amp; dark — are navigated one room at a time:
          pick a layer, choose a named value, and every template model answers with its own structural response —
          not a colour filter. Turn on the layer inspector to see each layer labelled in clear text inside the
          templates themselves.
        </p>
      </div>

      {/* presets always visible — one press, whole curation */}
      <div className="of-plate mb-4 flex flex-wrap items-center gap-1.5 p-4">
        <span className="mr-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-400">curated</span>
        {GENOME_PRESETS.map((p) => {
          const on = activePresets.some((a) => a.name === p.name);
          return (
            <button
              key={p.name}
              onClick={() => applySelection(p.sel)}
              title={p.note}
              data-testid={`band-preset-${p.name.slice(0, 6)}`}
              className={`of-chip !text-[10.5px] ${on ? '!border-brass-400 !text-brass-600 dark:!text-brass-300' : ''}`}
            >
              {p.name}
            </button>
          );
        })}
        <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-400">
          {overrides.length
            ? `${overrides.length} switch${overrides.length > 1 ? 'es' : ''} overriding the DNA`
            : 'every world as drawn'}
        </span>
      </div>

      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        data-testid="genome-band-toggle"
        className="of-plate flex w-full items-center justify-between gap-3 p-4 text-left transition-colors hover:border-brass-300/60"
      >
        <span className="flex items-center gap-2.5">
          <Dna className="h-4 w-4 text-brass-500" />
          <span>
            <span className="block font-display text-[15px] font-semibold">
              Open the genome console — 7 layer rooms, option cards, live effect notes, text layer, DNA card, prestige gate
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-400">
              persisted · applies to every world · includes dashboard font changing
            </span>
          </span>
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="of-slide-up mt-3">
          <GenomeConsole />
        </div>
      )}
      <p className="mt-3 font-mono text-[9px] leading-relaxed text-zinc-400">
        {allSiteEntries().length} worlds drawn from {Object.keys(genome.sel).length} switches — a private design studio,
        not a template picker. Named choices only (&ldquo;Milan Atelier&rdquo;, &ldquo;Ivory Archive&rdquo;), never raw
        font-size sliders.
      </p>
    </section>
  );
}
