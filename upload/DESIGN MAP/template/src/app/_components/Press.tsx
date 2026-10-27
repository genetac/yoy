'use client';

import { useRevealOnScroll } from '../_lib/interactions';

/**
 * Press — a trophy-case strip of awards and press mentions.
 *
 * Mirrors Mantis's "FWA OF THE YEAR / CSSDA SITE OF THE DAY" band.
 * NOCTURNE gets: Michelin stars, World's 50 Best, James Beard semifinalist,
 * and pull-quotes from NYT / Eater / Bon Appétit.
 */
const AWARDS = [
  { source: 'MICHELIN GUIDE', honor: '★★ Two Stars', year: '2024' },
  { source: "WORLD'S 50 BEST", honor: 'No. 41 · Discovery', year: '2024' },
  { source: 'JAMES BEARD', honor: 'Best Chef Northeast · Semifinalist', year: '2023' },
  { source: 'GAMBERO ROSSO', honor: 'International Award', year: '2023' },
];

const QUOTES = [
  {
    text: 'A 12-seat temple to wood smoke. Mara Vance is cooking the most exciting food in New York right now.',
    source: 'The New York Times',
    rating: '★★★★',
  },
  {
    text: 'NOCTURNE doesn\'t feel like a restaurant. It feels like the inside of someone\'s mind — patient, exact, alive.',
    source: 'Eater NY',
    rating: 'Critics Pick',
  },
  {
    text: 'A meal here is not eaten so much as witnessed. Every bite arrives with a small story of where the fire has been.',
    source: 'Bon Appétit',
    rating: 'Featured',
  },
];

export default function Press() {
  useRevealOnScroll();

  return (
    <section
      id="press"
      className="scroll-mt-28 bg-[var(--bg-dark)] px-[var(--gutter)] py-[var(--section-y)] text-[var(--ink-on-dark)]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16">
          <p
            data-reveal
            className="mb-3 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--amber-bright)]"
          >
            Recognition
          </p>
          <h2
            data-reveal
            data-reveal-delay={80}
            className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em]"
          >
            The industry
            <br />
            <span className="text-[var(--amber-bright)]">has taken note.</span>
          </h2>
        </div>

        {/* Awards grid */}
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-[var(--ink-on-dark)]/15 bg-[var(--ink-on-dark)]/15 lg:grid-cols-4">
          {AWARDS.map((a) => (
            <div
              key={a.source}
              data-reveal
              className="flex flex-col gap-3 bg-[var(--bg-dark)] p-8"
            >
              <p className="font-display text-4xl font-extrabold text-[var(--amber-bright)] sm:text-5xl">
                {a.year}
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--ink-on-dark)]/60">
                {a.source}
              </p>
              <p className="font-mono text-xs leading-relaxed text-[var(--ink-on-dark)]/90">
                {a.honor}
              </p>
            </div>
          ))}
        </div>

        {/* Pull quotes */}
        <div className="mt-16 grid gap-px overflow-hidden border border-[var(--ink-on-dark)]/15 bg-[var(--ink-on-dark)]/15 md:grid-cols-3">
          {QUOTES.map((q) => (
            <figure
              key={q.source}
              data-reveal
              className="flex flex-col gap-5 bg-[var(--bg-dark)] p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--amber-bright)]">
                {q.rating}
              </p>
              <blockquote className="font-serif text-lg font-light italic leading-snug text-[var(--ink-on-dark)]/95 sm:text-xl">
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <figcaption className="mt-auto text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--ink-on-dark)]/60">
                — {q.source}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
