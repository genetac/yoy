'use client';

import { useEffect, useRef, useState } from 'react';
import { useRevealOnScroll } from '../_lib/interactions';

/**
 * Footer — the sign-off.
 *
 * Mirrors Mantis's footer pattern:
 *   • A big playful sign-off ("SEE YOU TONIGHT" — adapted from "WE COULD JUST
 *     EAT YOU UP")
 *   • A looping "reel" card showing dish-prep stills. Mantis uses a real
 *     <video>; we use a 4-frame image sequence cycled via CSS so it works
 *     without an external video file. Each frame fades to the next on a
 *     3-second loop, producing a stop-motion "flipbook" effect.
 *   • Bottom row: copyright, year, contact links.
 */

const REEL_FRAMES = [
  '/nocturne/reel_1.jpg',
  '/nocturne/reel_2.jpg',
  '/nocturne/reel_3.jpg',
  '/nocturne/reel_4.jpg',
];

const REEL_DURATION_MS = 12000; // total loop length (3s per frame)

function Reel() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((i) => (i + 1) % REEL_FRAMES.length);
    }, REEL_DURATION_MS / REEL_FRAMES.length);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-[var(--ink-on-dark)]/20 bg-black">
      {REEL_FRAMES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: i === activeIdx ? 1 : 0 }}
          loading="lazy"
        />
      ))}
      {/* Reel meta overlay — mimics Mantis's video timecode + title */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 text-[var(--ink-on-dark)]">
        <div className="flex items-start justify-between text-[10px] font-medium uppercase tracking-[0.2em]">
          <span>NOCTURNE · KITCHEN REEL</span>
          <span className="font-mono tabular-nums">
            00:0{activeIdx + 1} / 00:04
          </span>
        </div>
        <div className="flex items-end justify-between">
          <span className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
            Twelve courses,
            <br />
            one fire.
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--ink-on-dark)]/40">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="currentColor"
              aria-hidden
            >
              <path d="M3 2l9 5-9 5V2z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  useRevealOnScroll();

  return (
    <footer className="bg-[var(--bg-dark-deep)] px-[var(--gutter)] py-[var(--section-y)] text-[var(--ink-on-dark)]">
      <div className="mx-auto max-w-7xl">
        {/* === Sign-off — big display text + reel side by side === */}
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <p
              data-reveal
              className="mb-3 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--amber-bright)]"
            >
              Until Tonight
            </p>
            <h2
              data-reveal
              data-reveal-delay={80}
              className="font-display text-[clamp(3rem,9vw,8rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]"
            >
              See you
              <br />
              <span className="text-[var(--amber-bright)]">tonight.</span>
            </h2>
            <p
              data-reveal
              data-reveal-delay={160}
              className="mt-8 max-w-md text-sm font-light leading-relaxed text-[var(--ink-on-dark)]/70"
            >
              Reservations open nightly at 18:00 EST. Walk-ins welcome at
              the counter. The fire starts at 17:30 — you&apos;re welcome
              to come early and watch.
            </p>
            <a
              href="#reserve"
              data-reveal
              data-reveal-delay={240}
              className="mt-8 inline-flex w-fit items-center gap-3 border border-[var(--amber-bright)] bg-[var(--amber-bright)]/10 px-6 py-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--amber-bright)] transition hover:bg-[var(--amber-bright)] hover:text-[var(--bg-dark-deep)]"
            >
              Reserve a Table
              <span aria-hidden>→</span>
            </a>
          </div>

          {/* Reel card */}
          <div data-reveal data-reveal-delay={120}>
            <Reel />
          </div>
        </div>

        {/* === Bottom utility row === */}
        <div className="mt-24 grid gap-10 border-t border-[var(--ink-on-dark)]/15 pt-12 md:grid-cols-4">
          <div>
            <p className="font-display text-xl font-extrabold uppercase tracking-[0.18em]">
              NOCTURNE
            </p>
            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--amber-bright)]">
              A Fire-Forward Counter
            </p>
            <p className="mt-4 max-w-xs text-xs font-light leading-relaxed text-[var(--ink-on-dark)]/60">
              Twelve seats. One fire. A twelve-course tasting menu cooked
              over wood, served across an open counter.
            </p>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--ink-on-dark)]/40">
              Explore
            </p>
            <ul className="flex flex-col gap-3 text-xs font-light text-[var(--ink-on-dark)]/80">
              <li><a href="#menu" className="transition hover:text-[var(--amber-bright)]">Menu</a></li>
              <li><a href="#chef" className="transition hover:text-[var(--amber-bright)]">Chef</a></li>
              <li><a href="#press" className="transition hover:text-[var(--amber-bright)]">Press</a></li>
              <li><a href="#visit" className="transition hover:text-[var(--amber-bright)]">Visit</a></li>
              <li><a href="#reserve" className="transition hover:text-[var(--amber-bright)]">Reserve</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--ink-on-dark)]/40">
              Contact
            </p>
            <ul className="flex flex-col gap-3 text-xs font-light text-[var(--ink-on-dark)]/80">
              <li>184 Orchard St</li>
              <li>New York, NY 10002</li>
              <li>+1 (212) 555-0119</li>
              <li>hello@nocturne.nyc</li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--ink-on-dark)]/40">
              Follow
            </p>
            <ul className="flex flex-col gap-3 text-xs font-light text-[var(--ink-on-dark)]/80">
              <li className="transition hover:text-[var(--amber-bright)]">Instagram</li>
              <li className="transition hover:text-[var(--amber-bright)]">Newsletter</li>
              <li className="transition hover:text-[var(--amber-bright)]">Press Inquiries</li>
              <li className="transition hover:text-[var(--amber-bright)]">Private Events</li>
            </ul>
          </div>
        </div>

        {/* === Copyright row === */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[var(--ink-on-dark)]/15 pt-8 text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--ink-on-dark)]/40 sm:flex-row">
          <p>© {new Date().getFullYear()} NOCTURNE NYC · All rights reserved</p>
          <p>Cooked over wood · Lower East Side</p>
        </div>
      </div>
    </footer>
  );
}
