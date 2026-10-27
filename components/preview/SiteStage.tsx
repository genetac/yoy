'use client';
/**
 * OMNIFORGE · SiteStage (Genome backbone edition)
 *
 * The full-website preview: the engine's showcase room stages the wordmark,
 * then the example opens as its REAL flagship product site — rendered from
 * the design genome (DNA + the 7 switches + engine bias + mode), never a
 * generic dashboard. The floating PreviewBar flips engines, modes and the
 * genome switches live on the real site.
 */
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Dna, ShieldCheck, X, Star, Layers3 } from 'lucide-react';
import { DESIGN_STYLES, STYLE_ORDER, setStyle, useStyle } from '@/lib/style-registry';
import { EngineSignature, KineticBand, ModeToggle, MH_AMBIENT_PHOTOS } from '@/components/style/EngineSignature';
import { ShowcaseRoom } from '@/components/style/ShowcaseRoom';
import { SiteTemplate, useSiteWorld } from '@/components/site/SiteTemplate';
import { GenomeConsole } from '@/components/genome/GenomeConsole';
import { useGenome, setInspect, useInspect } from '@/lib/genome/store';
import { switchReadoutLine } from '@/lib/genome/switches';
import { dnaForEntry } from '@/lib/genome/catalog';
import { SYSTEM_TICKER } from '@/data/system-contract';
import { siteBlueprintFor, type SiteIndexEntry } from '@/lib/site-preview';
import { flagshipBySlug } from '@/lib/genome/catalog';

export function SiteStage({ entry }: { entry: SiteIndexEntry }) {
  const style = useStyle();
  const engine = DESIGN_STYLES[style];
  const bp = useMemo(() => siteBlueprintFor(entry), [entry]);
  /* the atelier can stage this example in a forced flagship design (?as=) */
  const asParam = useSearchParams().get('as') ?? undefined;
  const world = useSiteWorld(entry, { archetype: asParam });
  const [genomeOpen, setGenomeOpen] = useState(false);
  const genome = useGenome();
  const inspect = useInspect();
  const dna = dnaForEntry(entry, asParam as never);
  const flagship = flagshipBySlug(world.archetype);
  const priceLabel = bp.price.amount !== null ? `$${bp.price.amount}` : 'From quote';

  return (
    <div className="min-h-screen" id="top">
      <EngineSignature />

      {/* ── the engine's room stages the wordmark ─────────────────── */}
      <ShowcaseRoom
        engine={style}
        variant="full"
        eyebrow={`${engine.short} · ${engine.label} — ${bp.heroEyebrow}`}
        title={bp.heroTitle}
        accent={bp.heroAccent}
        sub={`${bp.heroSub} · staged as ${flagship?.name ?? 'a flagship'} — ${flagship?.variant ?? 'a real product design'}`}
        photos={bp.heroImage ? [bp.heroImage, ...MH_AMBIENT_PHOTOS] : MH_AMBIENT_PHOTOS}
        actions={
          <>
            <a href="#site" className="of-btn !px-6 !py-3 text-[13px]" data-testid="stage-enter-site">
              Enter the live site <ArrowRight className="h-4 w-4" />
            </a>
            <Link href={`/?offer=${bp.offerId}`} className="of-btn-ghost !px-6 !py-3 text-[13px]">
              Buy in the forge · {priceLabel}
            </Link>
          </>
        }
      />

      {(style === 'agencyos' || style === 'studioos') && <KineticBand items={SYSTEM_TICKER} />}

      {/* ── THE REAL PRODUCT SITE — genome-resolved flagship ──────── */}
      <div id="site" className="scroll-mt-2">
        <SiteTemplate world={world} />
      </div>

      {/* ── honest forge buy plate ────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="of-plate relative overflow-hidden p-7 sm:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: 'radial-gradient(90% 130% at 12% 0%, var(--of-brass-soft), transparent 60%)' }} />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-xl">
              <div className="of-plate-num">{bp.offerId} · {bp.edition} · plate No. {bp.plateNo}</div>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Take the whole kit home.</h2>
              <p className="mt-3 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                This is the {flagship?.name} product design, drawn live from the design genome. The kit itself —
                {' '}{bp.includesLine} — compiles to a ZIP in the forge.
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {bp.policies.map((p) => <span key={p} className="of-chip">{p}</span>)}
                <span className="of-chip">Instant ZIP delivery</span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-3 lg:items-end">
              {bp.price.amount !== null ? (
                <div className="flex items-baseline gap-2">
                  <span className="of-foil-text font-display text-5xl font-bold tracking-tight">${bp.price.amount}</span>
                  {bp.price.compareAt !== null && <span className="font-mono text-[12px] text-zinc-400 line-through">${bp.price.compareAt}</span>}
                </div>
              ) : (
                <span className="of-foil-text font-display text-4xl font-bold tracking-tight">From quote</span>
              )}
              <Link href={`/?offer=${bp.offerId}`} className="of-btn !px-6 !py-3 text-[13px]" data-testid="stage-buy">
                Buy in the forge <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-zinc-400">price labeled demo data</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── footer ────────────────────────────────────────────────── */}
      <footer className="of-hairline-t mt-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6">
          <div>
            <div className="of-engrave font-display text-sm font-bold">{bp.brand}</div>
            <div className="font-mono text-[10px] text-zinc-400">{bp.familyLabel} · plate No. {bp.plateNo} · {flagship?.name} design</div>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-zinc-400">
            <Star className="h-3 w-3 text-brass-500" /> {bp.review.rating.toFixed(1)} · {bp.review.sold} sold · demo data
          </div>
          <p className="max-w-lg text-right font-mono text-[9.5px] leading-relaxed text-zinc-400">{bp.footerLine}</p>
        </div>
      </footer>

      {/* ── PreviewBar — engines, modes & the genome, live ────────── */}
      <div className="fixed inset-x-0 bottom-3 z-50 flex justify-center px-3">
        <div className="of-plate flex max-w-full items-center gap-2 overflow-x-auto rounded-full !border px-3 py-2 shadow-lg" role="group" aria-label="Live re-skin">
          <span className="hidden shrink-0 font-mono text-[8.5px] font-bold uppercase tracking-[0.14em] text-zinc-400 sm:block">live re-skin</span>
          <div className="flex shrink-0 items-center gap-1" role="radiogroup" aria-label="Engine">
            {STYLE_ORDER.map((id) => {
              const s = DESIGN_STYLES[id];
              const on = id === style;
              return (
                <button
                  key={id}
                  role="radio"
                  aria-checked={on}
                  onClick={() => setStyle(id)}
                  title={`${s.label} — ${s.signature}`}
                  className={`h-5 w-5 shrink-0 rounded-full border transition-transform ${on ? 'scale-110 border-brass-500 ring-1 ring-brass-500/60' : 'border-white/25 hover:scale-105'}`}
                  style={{ background: `linear-gradient(135deg, ${s.swatch.bg} 0 55%, ${s.swatch.accent} 100%)` }}
                />
              );
            })}
          </div>
          <span className="hidden font-mono text-[9px] font-bold text-brass-600 dark:text-brass-300 md:block">{engine.short}</span>
          <span className="h-4 w-px shrink-0 bg-zinc-500/20" />
          <ModeToggle />
          <span className="h-4 w-px shrink-0 bg-zinc-500/20" />
          <button
            onClick={() => setInspect(!inspect)}
            data-testid="stage-layers-toggle"
            aria-pressed={inspect}
            title="Stamp clear layer annotations inside the template"
            className={`of-btn-ghost shrink-0 !rounded-full !px-3 !py-1.5 text-[10.5px] ${inspect ? '!border-brass-400 !text-brass-600 dark:!text-brass-300' : ''}`}
          >
            <Layers3 className="h-3 w-3" /> Layers
          </button>
          <span className="h-4 w-px shrink-0 bg-zinc-500/20" />
          <button
            onClick={() => setGenomeOpen((v) => !v)}
            data-testid="stage-genome-toggle"
            aria-expanded={genomeOpen}
            className={`of-btn-ghost shrink-0 !rounded-full !px-3 !py-1.5 text-[10.5px] ${genomeOpen ? '!border-brass-400 !text-brass-600 dark:!text-brass-300' : ''}`}
          >
            <Dna className="h-3 w-3" /> Genome
          </button>
          <span className="h-4 w-px shrink-0 bg-zinc-500/20" />
          <Link href="/" className="of-btn-ghost shrink-0 !rounded-full !px-3 !py-1.5 text-[10.5px]">
            <ShieldCheck className="h-3 w-3" /> Forge
          </Link>
        </div>
      </div>
      <div className="h-16" aria-hidden />

      {/* ── the genome drawer — restyle THIS site live ────────────── */}
      {genomeOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-label="Design genome console" data-testid="genome-drawer">
          <button className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" aria-label="Close genome console" onClick={() => setGenomeOpen(false)} />
          <aside className="relative h-full w-[min(460px,96vw)] overflow-y-auto border-l border-[var(--of-plate-edge)] bg-[var(--of-plate-bg)] p-4 shadow-2xl g-no-scrollbar" style={{ animation: 'of-slide-in-right 260ms cubic-bezier(0.2,0.8,0.2,1) both' }}>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-brass-600 dark:text-brass-300">the backbone</div>
                <h2 className="font-display text-xl font-semibold">Design genome console</h2>
                <p className="mt-0.5 font-mono text-[9.5px] text-zinc-400">7 switches · re-dressing {world.copy.brand} live</p>
                <p className="mt-1 max-w-[300px] font-mono text-[8px] leading-relaxed tracking-[0.08em] text-zinc-400" data-testid="stage-readout">
                  {switchReadoutLine(genome.sel, dna)}
                </p>
              </div>
              <button onClick={() => setGenomeOpen(false)} className="rounded-full p-1.5 text-zinc-400 transition-colors hover:bg-zinc-500/10 hover:text-[var(--of-text)]" data-testid="genome-drawer-close" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <GenomeConsole entry={entry} compact />
          </aside>
        </div>
      )}
    </div>
  );
}
