'use client';

import { useRevealOnScroll } from '../_lib/interactions';

/**
 * Philosophy — three "sensory pivots" adapted from Mantis's
 * "activate nerves / stimulate memory / excite neurons" sequence.
 *
 * For NOCTURNE (a fire-forward tasting menu), the three pivots are
 * the physical phases of cooking over wood:
 *   1. STRIKE — the moment the fire starts
 *   2. TEND — the long watching-and-turning
 *   3. TASTE — the bite that lands
 *
 * Each pivot is its own full-height band with the pivot word blown up
 * to display size, then a paragraph of explanation that line-by-line
 * reveals as you scroll into it.
 */
const PIVOTS = [
  {
    kicker: '01 · IGNITION',
    word: 'strike.',
    body: [
      'A kitchen over wood is a kitchen at the mercy of the wood.',
      'Every night starts the same way: split oak, a single match,',
      'and the long wait for embers. The menu is decided here —',
      'not on paper, but in the way the fire breathes.',
    ],
  },
  {
    kicker: '02 · ATTENTION',
    word: 'tend.',
    body: [
      'Twelve seats means twelve witnesses.',
      'There is no pass, no expo, no hiding behind a wall.',
      'The chef turns the fish in front of you, salts the duck',
      'with their hands, plates the bite on the counter where you sit.',
    ],
  },
  {
    kicker: '03 · ARRIVAL',
    word: 'taste.',
    body: [
      'A course is not a dish. It is a moment that is gone',
      'in three bites, sometimes one. We don\'t ask you to remember it.',
      'We ask you to be here for it — fully — and then to let it pass.',
      'The next one is already on the fire.',
    ],
  },
];

export default function Philosophy() {
  useRevealOnScroll();

  return (
    <section
      id="philosophy"
      className="scroll-mt-28 bg-[var(--bg)] px-[var(--gutter)] py-[var(--section-y)]"
    >
      {/* Intro line */}
      <div className="mx-auto max-w-6xl">
        <p
          data-reveal
          className="mb-3 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--oxblood)]"
        >
          A Philosophy of Fire
        </p>
        <h2
          data-reveal
          data-reveal-delay={80}
          className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-[var(--ink)]"
        >
          A meal cooked
          <br />
          <span className="text-[var(--oxblood)]">in front of you</span>
          <br />
          is a different meal.
        </h2>
      </div>

      {/* Three pivots */}
      <div className="mx-auto mt-24 max-w-6xl divide-y divide-[var(--ink)]/10 border-y border-[var(--ink)]/10">
        {PIVOTS.map((p, idx) => (
          <div
            key={p.kicker}
            className="grid gap-8 py-16 md:grid-cols-[1fr_2fr] md:gap-16"
          >
            {/* Left: kicker + big pivot word */}
            <div className="flex flex-col gap-4">
              <span
                data-reveal
                className="text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--ink-soft)]"
              >
                {p.kicker}
              </span>
              <span
                data-reveal
                data-reveal-delay={120}
                className="font-display text-[clamp(4rem,12vw,9rem)] font-extrabold lowercase leading-[0.85] tracking-[-0.04em] text-[var(--oxblood)]"
              >
                {p.word}
              </span>
            </div>

            {/* Right: line-by-line body */}
            <div className="flex flex-col justify-end gap-3 text-base font-light leading-relaxed text-[var(--ink)] sm:text-lg">
              {p.body.map((line, i) => (
                <p
                  key={i}
                  data-reveal
                  data-reveal-delay={200 + i * 100}
                  className="font-serif text-xl font-light italic leading-snug text-[var(--ink-soft)] sm:text-2xl"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
