'use client';
/**
 * OMNIFORGE · TemplateAtelier — the merged Template OS library.
 *
 * The eight flagship product designs, each shown as a LIVE scaled render
 * of a real example site (the exact same component the full-size review
 * serves — never a different mockup), with family filters, tier, edition
 * seal, module list and a direct "open the live site" link.
 */
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import { FLAGSHIPS, OS_MODULES, representativeSlugFor, dnaForEntry, type ArchetypeId } from '@/lib/genome/catalog';
import { switchReadoutLine } from '@/lib/genome/switches';
import { allSiteEntries, findSiteEntryBySlug, type SiteIndexEntry } from '@/lib/site-preview';
import { SiteFrame } from '@/components/site/SiteFrame';
import { useGenome } from '@/lib/genome/store';

const FAMILY_FILTERS: [string, string][] = [
  ['all', 'All families'],
  ['saas', 'SaaS Products'],
  ['consumer', 'Commerce & Trade'],
  ['dashboards', 'Data Dashboards'],
  ['micro', 'Micro Products'],
  ['hospitality', 'Industry & Hospitality'],
  ['enterprise', 'Enterprise Platforms'],
];

export function TemplateAtelier() {
  const [family, setFamily] = useState('all');
  const entries = useMemo(() => [...allSiteEntries()], []);
  const genome = useGenome();
  const list = FLAGSHIPS.filter((f) => family === 'all' || f.family === family);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6" data-testid="template-atelier">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-brass-600 dark:text-brass-300">
            the template os, merged
          </div>
          <h2 className="mt-1 font-display text-3xl font-semibold tracking-tight">The atelier — eight flagships, 96 worlds</h2>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            Every example in the forge renders as one of eight real product designs — a trial-first SaaS site, a trade
            order matrix, a numbered maison, a drop-shop, an operations console, a one-thing page, a dining room, an
            authority platform. Each card below is the live site itself, scaled — exactly what the full-size review shows.
          </p>
        </div>
        <div className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-zinc-400">
          {OS_MODULES.length} modules · {allSiteEntries().length} examples
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-1.5" role="group" aria-label="Filter flagships by family">
        {FAMILY_FILTERS.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setFamily(id)}
            data-testid={`atelier-filter-${id}`}
            aria-pressed={family === id}
            className={`of-chip !text-[10.5px] ${family === id ? '!border-brass-400 !text-brass-600 dark:!text-brass-300' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((f) => {
          const slug = representativeSlugFor(f.slug as ArchetypeId, entries);
          const mods = OS_MODULES.filter((m) => m.slug === f.slug);
          const entry = findSiteEntryBySlug(slug) as SiteIndexEntry | null;
          const dna = entry ? dnaForEntry(entry, f.slug as ArchetypeId) : null;
          return (
            <article key={f.slug} className="of-plate overflow-hidden" data-testid={`atelier-${f.slug}`}>
              <div className="relative border-b border-[var(--of-plate-edge)]">
                {/* the card shows the flagship's OWN design, staged with a real
                    example's content — the exact component the full review serves */}
                <SiteFrame slug={slug} archetype={f.slug} crop={760} ariaLabel={`${f.name} — live example site`} />
                <Link
                  href={`/preview/${slug}?as=${f.slug}`}
                  className="of-btn absolute bottom-3 right-3 !px-3.5 !py-2 text-[11px]"
                  data-testid={`atelier-open-${f.slug}`}
                >
                  Open the live site <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl font-semibold tracking-tight">{f.name}</h3>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-400">
                    No. {String(f.edition.no).padStart(3, '0')} / {f.edition.of} · {f.tier}
                  </span>
                </div>
                <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-brass-600 dark:text-brass-300">
                  {f.variant} · {f.familyLabel}
                </p>
                {dna && (
                  <p className="mt-1.5 font-mono text-[8px] leading-relaxed tracking-[0.09em] text-zinc-400" data-testid={`atelier-dna-${f.slug}`}>
                    {switchReadoutLine(genome.sel, dna)}
                  </p>
                )}
                <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-500 dark:text-zinc-400">{f.blurb}</p>
                <p className="mt-2 text-[11px] italic text-zinc-400">Best for: {f.bestFor}</p>
                <div className="of-hairline-t mt-3 flex flex-wrap items-center gap-1.5 pt-3">
                  <Layers className="h-3 w-3 text-brass-500" />
                  {mods.map((m) => (
                    <span key={m.id} title={m.note} className="of-chip !px-1.5 !py-0.5 !text-[8.5px]">{m.name}</span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
