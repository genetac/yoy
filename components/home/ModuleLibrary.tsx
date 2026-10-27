'use client';
/**
 * OMNIFORGE · ModuleLibrary (Design Matrix v2)
 *
 * The module library section, integrated from the uploaded OmniForge OS
 * source: every template is an arrangement of the same bricks. Category
 * filter + tier-gated cards with informational notes — one more
 * information-dense surface that re-skins with the active engine.
 */
import { useState } from 'react';
import { Blocks, type LucideIcon } from 'lucide-react';
import { MODULE_CATEGORIES, MODULE_COUNT, TIER_NAMES } from '@/data/system-contract';

export function ModuleLibrary() {
  const [active, setActive] = useState(MODULE_CATEGORIES[0].key);
  const category = MODULE_CATEGORIES.find((c) => c.key === active) ?? MODULE_CATEGORIES[0];

  return (
    <section className="pb-8">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Blocks className="h-4 w-4 text-brass-600 dark:text-brass-400" />
        <h2 className="font-display text-lg font-semibold tracking-tight">The module library</h2>
        <span className="font-mono text-[11px] text-zinc-400">
          {MODULE_COUNT} bricks — every template in the forge is an arrangement of them
        </span>
      </div>
      <p className="mb-4 max-w-3xl text-[12.5px] leading-relaxed text-zinc-600 dark:text-zinc-400">
        Each module ships with its own states, its own accessibility behaviour and a minimum tier.
        Nothing is built twice, and nothing is sold that the system cannot deliver — pick a category
        to see what every kit draws from.
      </p>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {MODULE_CATEGORIES.map((c) => {
          const on = c.key === active;
          return (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              aria-pressed={on}
              className={`rounded-lg border px-3 py-1.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] transition-colors ${
                on
                  ? 'border-brass-500/60 bg-brass-500/15 text-brass-700 dark:text-brass-300'
                  : 'border-zinc-500/20 bg-transparent text-zinc-500 hover:border-brass-500/40 dark:text-zinc-400'
              }`}
            >
              {c.name} · {c.modules.length}
            </button>
          );
        })}
      </div>

      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
        {category.modules.map((m, i) => (
          <article
            key={m.name}
            className="of-plate of-slide-up flex h-full items-start justify-between gap-3 p-4"
            style={{ animationDelay: `${i * 35}ms` }}
          >
            <div className="min-w-0">
              <h3 className="text-[13px] font-semibold leading-tight">{m.name}</h3>
              <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">{m.note}</p>
            </div>
            <span className="of-chip mt-0.5 shrink-0">{TIER_NAMES[m.tier]}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
