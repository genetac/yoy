'use client';

import { useRevealOnScroll } from '../_lib/interactions';

/**
 * Chef — line-by-line reveal of a personal narrative.
 *
 * Mirrors Mantis's body-copy motion: each sentence rises in independently.
 * On the right, a portrait panel with the chef's monogram + a quote.
 */
export default function Chef() {
  useRevealOnScroll();

  const narrative = [
    'Mara Vance learned to cook the way most kids learn a language —',
    'by being around it. Her grandfather ran a smokehouse in eastern',
    'Tennessee; her mother, a noodle bar in Kyoto. She spent her',
    'childhood between the two, inhaling hickory one summer and',
    'dashi the next.',
    'She left at eighteen to stage at Arzak in San Sebastián,',
    'then Quince in San Francisco, then Narisawa in Tokyo. Each',
    'kitchen took something from her and gave her something back.',
    'She opened NOCTURNE in 2019 with six seats and a single',
    'fireplace. The dining room has grown to twelve. The fireplace',
    'has not changed.',
  ];

  return (
    <section
      id="chef"
      className="scroll-mt-28 bg-[var(--bg)] px-[var(--gutter)] py-[var(--section-y)]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.3fr_1fr]">
        {/* Left: narrative */}
        <div>
          <p
            data-reveal
            className="mb-3 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--oxblood)]"
          >
            The Chef
          </p>
          <h2
            data-reveal
            data-reveal-delay={80}
            className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-[var(--ink)]"
          >
            Mara Vance
          </h2>
          <p
            data-reveal
            data-reveal-delay={160}
            className="mb-10 mt-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--ink-soft)]"
          >
            Executive Chef & Founder · NOCTURNE, NYC
          </p>

          {/* Line-by-line reveal: each line is its own <p data-reveal> */}
          <div className="flex flex-col gap-2">
            {narrative.map((line, i) => (
              <p
                key={i}
                data-reveal
                data-reveal-delay={Math.min(i * 60, 600)}
                className="font-serif text-lg font-light italic leading-snug text-[var(--ink-soft)] sm:text-xl"
              >
                {line}
              </p>
            ))}
          </div>

          {/* Stats */}
          <div
            data-reveal
            className="mt-12 grid grid-cols-3 gap-6 border-t border-[var(--ink)]/15 pt-8"
          >
            {[
              { k: '2019', v: 'Opened NOCTURNE' },
              { k: '2 ★', v: 'Michelin, 2024' },
              { k: 'No. 41', v: "World's 50 Best" },
            ].map((s) => (
              <div key={s.k}>
                <p className="font-display text-3xl font-extrabold text-[var(--oxblood)] sm:text-4xl">
                  {s.k}
                </p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--ink-soft)]">
                  {s.v}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: portrait panel */}
        <div
          data-reveal
          className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--ink)]/15"
          style={{
            background:
              'linear-gradient(160deg, var(--bg-deep) 0%, var(--bg) 50%, var(--bg-deep) 100%)',
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 35% 30%, rgba(184, 115, 42, 0.4), transparent 50%), radial-gradient(circle at 70% 75%, rgba(107, 29, 29, 0.3), transparent 55%)',
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-between p-10 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-soft)]">
              Portrait · 2024
            </p>
            <div className="font-display text-[clamp(5rem,18vw,12rem)] font-extrabold leading-none tracking-[-0.04em] text-[var(--oxblood)]">
              MV
            </div>
            <p className="max-w-xs font-serif text-base font-light italic leading-snug text-[var(--ink)]">
              &ldquo;I cook the way my grandfather did — slow, close to the
              fire, and with my hands. Everything else is decoration.&rdquo;
            </p>
          </div>
          {/* Corner ornaments */}
          <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-[var(--ink)]/40" />
          <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-[var(--ink)]/40" />
          <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-[var(--ink)]/40" />
          <div className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-[var(--ink)]/40" />
        </div>
      </div>
    </section>
  );
}
