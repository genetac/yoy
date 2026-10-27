'use client';

import { useRef } from 'react';
import {
  FRAME_COUNT,
  FRAME_PATHS,
  useFramePreload,
  useScrollProgress,
} from '../_lib/scroll-scrub';

/**
 * Drives the cinematic "walk into the restaurant" effect.
 *
 * The outer <section> is 700vh tall, which gives the user ~6 screens of scroll
 * to play through the frame sequence. The inner <div> is position: sticky, so
 * it stays pinned to the viewport while the user scrolls through the section.
 *
 * All 12 frames are stacked absolutely; each one's opacity is computed from
 * the current scroll progress so consecutive frames crossfade smoothly. This
 * is the same technique Apple uses on the AirPods Pro page — it scrubs far
 * more smoothly than manipulating <video>.currentTime.
 *
 * Overlay content (title, narrative beats, CTA) is broken into "chapters"
 * keyed on progress ranges and faded in/out independently of the frames.
 */

// Total scroll length, in viewport heights. 6 screens of scroll to play
// through ~12 frames feels neither rushed nor tedious.
const SCROLL_SECTIONS = 7;

// Each chapter defines a progress range and the content shown during it.
// Chapter A fades in at 0.00, out at 0.10. B at 0.08–0.22. The slight overlap
// means text crossfades rather than popping in/out.
type Chapter = {
  id: string;
  start: number;
  end: number;
  align: 'left' | 'center' | 'right';
  kicker?: string;
  title: string;
  body?: string;
};

const CHAPTERS: Chapter[] = [
  {
    id: 'arrival',
    start: 0.0,
    end: 0.14,
    align: 'center',
    kicker: 'La Bella Cucina · Est. 1962',
    title: 'An evening\nbegins here',
    body: 'Tucked down a cobblestone lane in the heart of the city, a single lantern marks the door.',
  },
  {
    id: 'approach',
    start: 0.14,
    end: 0.3,
    align: 'left',
    kicker: 'The Approach',
    title: 'Closer,\nevery step',
    body: 'The hum of the street fades. A warm glow spills across the cobblestones, drawing you in.',
  },
  {
    id: 'threshold',
    start: 0.3,
    end: 0.46,
    align: 'right',
    kicker: 'The Threshold',
    title: 'Push\nthe door',
    body: 'A brass handle, worn smooth by sixty years of guests. The hinge gives a familiar creak.',
  },
  {
    id: 'inside',
    start: 0.46,
    end: 0.66,
    align: 'left',
    kicker: 'Welcome Inside',
    title: 'Where every\ntable has a story',
    body: 'Candlelight. Edison bulbs. The low murmur of conversation and the clink of crystal.',
  },
  {
    id: 'feast',
    start: 0.66,
    end: 0.86,
    align: 'right',
    kicker: 'At The Table',
    title: 'Slow food,\nmade by hand',
    body: 'Tagliatelle rolled at dawn. Sauce that has simmered six hours. Wine chosen with care.',
  },
  {
    id: 'linger',
    start: 0.86,
    end: 1.01,
    align: 'center',
    kicker: 'Stay Awhile',
    title: 'Reserve\nyour table',
    body: 'Open Tuesday to Sunday, from 6 pm. We hold a few tables each night for walk-ins.',
  },
];

function chapterOpacity(p: number, c: Chapter): number {
  // Smooth fade in over the first 6% of the chapter and out over the last 6%.
  // This produces a soft crossfade between consecutive chapters.
  const span = c.end - c.start;
  const fade = Math.min(0.06, span * 0.4);
  if (p < c.start || p > c.end) return 0;
  if (p < c.start + fade) return (p - c.start) / fade;
  if (p > c.end - fade) return (c.end - p) / fade;
  return 1;
}

export default function ScrollScrubRestaurant() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useScrollProgress(sectionRef);
  const { loaded, total, done } = useFramePreload(FRAME_PATHS);

  // Map progress 0..1 → frame index 0..(FRAME_COUNT - 1) with a fractional
  // part used to crossfade between consecutive frames.
  const framePos = progress * (FRAME_COUNT - 1);
  const baseIdx = Math.floor(framePos);
  const frac = framePos - baseIdx;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black"
      style={{ height: `${SCROLL_SECTIONS * 100}vh` }}
      aria-label="Walk into La Bella Cucina"
    >
      {/* Sticky inner viewport — this is what stays pinned during the scrub. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* === Frame stack === */}
        {/* We render every frame as an absolutely positioned <img>. Each one's
            opacity is computed from the scroll progress so that consecutive
            frames crossfade smoothly. */}
        {FRAME_PATHS.map((src, i) => {
          let opacity = 0;
          if (i === baseIdx) opacity = 1 - frac;
          else if (i === baseIdx + 1) opacity = frac;
          // Always show the very first frame before preload completes, so the
          // section is never white.
          if (!done && i === 0) opacity = Math.max(opacity, 1);

          return (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              loading="eager"
              decoding="async"
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
              style={{
                opacity,
                transform: 'translateZ(0)',
                willChange: 'opacity',
              }}
            />
          );
        })}

        {/* Subtle vignette + bottom gradient so white text always reads. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%), linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7) 100%)',
          }}
        />

        {/* === Chapter overlays === */}
        {/* Each chapter fades in/out independently based on the current scroll
            progress. They share the same anchor grid so text doesn't jump. */}
        {CHAPTERS.map((c) => {
          const op = chapterOpacity(progress, c);
          if (op <= 0.001) return null;

          const alignClasses =
            c.align === 'left'
              ? 'items-start text-left'
              : c.align === 'right'
                ? 'items-end text-right'
                : 'items-center text-center';

          return (
            <div
              key={c.id}
              className="pointer-events-none absolute inset-0 flex flex-col justify-end px-[8vw] pb-[10vh] sm:px-[10vw]"
              style={{ opacity: op, transition: 'opacity 0.12s linear' }}
            >
              <div className={`flex flex-col ${alignClasses} gap-4`}>
                {c.kicker && (
                  <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-amber-200/80 sm:text-xs">
                    {c.kicker}
                  </p>
                )}
                <h2 className="whitespace-pre-line font-serif text-4xl font-light leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-8xl">
                  {c.title}
                </h2>
                {c.body && (
                  <p className="max-w-md text-sm font-light leading-relaxed text-white/80 sm:text-base md:text-lg">
                    {c.body}
                  </p>
                )}
                {c.id === 'linger' && (
                  <a
                    href="#reserve"
                    className="pointer-events-auto mt-2 inline-flex items-center justify-center rounded-full border border-amber-200/40 bg-amber-200/10 px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-amber-100 backdrop-blur-sm transition hover:bg-amber-200/20 hover:border-amber-200/70 sm:text-sm"
                  >
                    Book a Table
                  </a>
                )}
              </div>
            </div>
          );
        })}

        {/* === Top brand bar === */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-[6vw] py-6 sm:px-[8vw]">
          <p className="font-serif text-sm italic tracking-wide text-white/90 sm:text-base">
            La Bella Cucina
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/60 sm:text-xs">
            Trattoria · Est. 1962
          </p>
        </div>

        {/* === Scroll hint — only visible at the very start === */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-[6vh] flex flex-col items-center gap-2 text-white/70"
          style={{ opacity: Math.max(0, 1 - progress * 8) }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em]">Scroll to enter</p>
          <svg
            width="20"
            height="32"
            viewBox="0 0 20 32"
            fill="none"
            className="animate-bounce"
          >
            <rect x="0.5" y="0.5" width="19" height="31" rx="9.5" stroke="currentColor" />
            <rect x="9" y="6" width="2" height="6" rx="1" fill="currentColor" />
          </svg>
        </div>

        {/* === Progress rail (right edge) === */}
        <div className="pointer-events-none absolute right-[3vw] top-1/2 hidden -translate-y-1/2 flex-col gap-1.5 md:flex">
          {CHAPTERS.map((c, i) => {
            const active = progress >= c.start && progress < c.end;
            const passed = progress >= c.end;
            return (
              <div
                key={c.id}
                className="h-8 w-[2px] rounded-full transition-all duration-300"
                style={{
                  background: active
                    ? 'rgba(252, 211, 77, 0.95)'
                    : passed
                      ? 'rgba(255, 255, 255, 0.45)'
                      : 'rgba(255, 255, 255, 0.18)',
                  height: active ? 32 : 14,
                }}
                title={c.kicker || c.id}
                aria-label={`Chapter ${i + 1}`}
              />
            );
          })}
        </div>

        {/* === Preload indicator (only visible while frames are loading) === */}
        {!done && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 text-white/80">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-white/20 border-t-amber-200" />
              </div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
                Preparing your table · {loaded}/{total}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
