'use client';
/**
 * OMNIFORGE · The Showcase Rooms (home band, Design Matrix v2.1)
 *
 * Six engines, six ROOMS — the answer to "the engine wordmark looks
 * almost the same in every preview". Each engine stages its signature
 * word inside a completely different environment:
 *
 *   OB  The Obsidian Vault      — marble gallery, light cones, engraved slab
 *   NC  The Candlelit Manor     — banquet table, real flames, assembling serif
 *   MH  The Dining Atelier      — floating framed real-world photography
 *   AO  The Blueprint Stage     — perspective grid, extruded isometric type
 *   TO  The Catalog Warehouse   — shelves, conveyor, lime letter blocks
 *   SO  The Film Studio         — rig, beams, film strips, brass foil
 *
 * Every room is live: press "Wear it" to re-skin the whole forge in that
 * engine, or "Step inside" to open a REAL full-size site staged in it.
 * The band is purely additive — no existing view structure changes.
 */
import Link from 'next/link';
import { DoorOpen } from 'lucide-react';
import { DESIGN_STYLES, STYLE_ORDER, setStyle, useStyle } from '@/lib/style-registry';
import { ShowcaseRoom } from '@/components/style/ShowcaseRoom';
import { SITE_SHOWCASE_SLUGS } from '@/lib/site-preview';

export function ShowcaseRooms() {
  const active = useStyle();

  return (
    <section className="pb-6">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <DoorOpen className="h-4 w-4 text-brass-600 dark:text-brass-400" />
        <h2 className="font-display text-lg font-semibold tracking-tight">The showcase rooms</h2>
        <span className="font-mono text-[11px] text-zinc-400">
          six engines, six stages — the same catalog wearing six architectures
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {STYLE_ORDER.map((id, i) => {
          const s = DESIGN_STYLES[id];
          const on = id === active;
          const stepIn = SITE_SHOWCASE_SLUGS[i % SITE_SHOWCASE_SLUGS.length];
          return (
            <article
              key={id}
              className={`of-plate of-lift of-slide-up overflow-hidden text-left ${on ? '!border-brass-500/70 ring-1 ring-brass-500/50' : ''}`}
              style={{ animationDelay: `${i * 55}ms` }}
            >
              <ShowcaseRoom
                engine={id}
                variant="card"
                eyebrow={`Engine 0${i + 1} · ${s.reference}`}
                title={s.signatureWord}
              />
              <div className="flex items-center gap-3 border-t border-zinc-500/10 p-3.5">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="shrink-0 font-mono text-[9px] font-bold tracking-[0.12em] text-brass-600 dark:text-brass-400">{s.short}</span>
                    <span className="truncate text-[13.5px] font-semibold leading-tight">{s.label}</span>
                    {on && (
                      <span className="shrink-0 rounded bg-brass-500/15 px-1.5 py-0.5 font-mono text-[8px] font-bold text-brass-600 dark:text-brass-300">
                        WEARING
                      </span>
                    )}
                  </div>
                  <p className="mt-1 truncate font-mono text-[9px] leading-snug text-zinc-400">{s.tagline}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    onClick={() => setStyle(id)}
                    aria-pressed={on}
                    className="of-btn-ghost !px-3 !py-1.5 text-[10.5px]"
                  >
                    {on ? 'Wearing' : 'Wear it'}
                  </button>
                  <Link
                    href={`/preview/${stepIn}`}
                    onClick={() => setStyle(id)}
                    className="of-btn !px-3 !py-1.5 text-[10.5px]"
                  >
                    Step inside
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <p className="mt-2.5 text-center font-mono text-[10px] text-zinc-400">
        every room is the same 96-example catalog in a different architecture — open any example full-size and the
        whole site is staged inside the engine's room
      </p>
    </section>
  );
}
