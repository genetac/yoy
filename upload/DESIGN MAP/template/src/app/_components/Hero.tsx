'use client';

import { useRevealOnScroll } from '../_lib/interactions';

/**
 * Hero — the cinematic opener.
 *
 * Layout budget on a 900px-tall viewport:
 *   • Top strip     (~96px)  — meta chips (left + right)
 *   • Middle        (~580px) — kicker + 3-line display headline + bottom meta row
 *   • Bottom gutter (~80px)  — breathing room
 *
 * The headline is sized with clamp(2.5rem, 6vw, 5rem) so it never exceeds
 * ~80px per line — three lines = ~240px, leaving the rest of the viewport
 * for the meta chips above and the pricing row below. All four corner
 * elements (top-left chip, top-right stat, headline block, bottom row)
 * remain visible without scrolling.
 */
export default function Hero() {
  useRevealOnScroll();

  // Three lines instead of five — punchier and leaves room for the meta
  // elements. Each line fades in independently (Mantis signature motion).
  const lines = [
    { text: 'Twelve seats.', delay: 0 },
    { text: 'One fire.', delay: 140 },
    { text: 'Twelve courses.', delay: 280 },
  ];

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden bg-[var(--bg-dark)]"
    >
      {/* === Background image === */}
      <img
        src="/nocturne/hero.jpg"
        alt="A 12-seat dark walnut chef counter at night, a single open wood-fire grill glowing at the far end"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        style={{ filter: 'brightness(0.55) saturate(1.1)' }}
      />

      {/* Dark gradient overlay so all text reads on top of the photo.
          Top + bottom both darkened so the meta chips at the top AND the
          headline + pricing row at the bottom are legible. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(13,7,5,0.85) 0%, rgba(13,7,5,0.35) 30%, rgba(13,7,5,0.45) 60%, rgba(13,7,5,0.92) 100%)',
        }}
      />

      {/* === TOP-LEFT meta chip — Mantis pattern (location / coords) === */}
      <div className="relative z-10 flex flex-row flex-wrap items-start justify-between gap-6 px-[var(--gutter)] pt-24 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--ink-on-dark)]/70 sm:pt-28">
        <div className="flex flex-col gap-1.5">
          <span className="text-[var(--ink-on-dark)]/90">NEW YORK · LOWER EAST SIDE</span>
          <span>EST. MMXIX (2019)</span>
          <span className="tabular-nums">40.7156° N · 73.9890° W</span>
        </div>

        {/* === TOP-RIGHT "12" stat block — Mantis "100%" pattern === */}
        <div className="flex flex-col items-end gap-1 text-right">
          <span className="font-display text-3xl font-extrabold tracking-tight text-[var(--ink-on-dark)] sm:text-4xl">
            12
          </span>
          <span className="text-[var(--ink-on-dark)]/90">SEATS · 12 COURSES</span>
          <span>TUE — SUN · 18:00 — 23:00</span>
        </div>
      </div>

      {/* === Middle: kicker + 3-line display headline ===
          Uses flex-grow + justify-center so the headline sits in the
          vertical middle of the available space, leaving the top strip
          and bottom row visible at all times. */}
      <div className="relative z-10 flex flex-grow flex-col justify-center px-[var(--gutter)] py-8">
        <p
          data-reveal
          className="mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--amber-bright)] sm:mb-6"
        >
          A Fire-Forward Tasting Counter
        </p>
        <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-[var(--ink-on-dark)]">
          {lines.map((l, i) => (
            <span
              key={i}
              data-reveal
              data-reveal-delay={l.delay}
              className="block"
            >
              {l.text}
            </span>
          ))}
        </h1>
      </div>

      {/* === Bottom meta row — pricing + manifesto + CTA === */}
      <div
        data-reveal
        data-reveal-delay={500}
        className="relative z-10 flex flex-col gap-3 border-t border-[var(--ink-on-dark)]/15 px-[var(--gutter)] py-6 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--ink-on-dark)]/70 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pb-10"
      >
        <span>
          Tasting menu · $285 / guest · wine pairing +$180
        </span>
        <span className="hidden sm:inline text-[var(--ink-on-dark)]/30">·</span>
        <span className="hidden md:inline">
          Walk-ins welcome · cash & card
        </span>
        <a
          href="#menu"
          className="inline-flex items-center gap-2 text-[var(--amber-bright)] transition hover:text-[var(--ink-on-dark)]"
        >
          VIEW THE MENU
          <span aria-hidden>↓</span>
        </a>
      </div>
    </section>
  );
}
