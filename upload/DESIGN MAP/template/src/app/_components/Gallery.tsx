'use client';

import { useRevealOnScroll } from '../_lib/interactions';

/**
 * Gallery — a four-up asymmetric grid of dish stills.
 *
 * The grid mirrors Mantis's use of `grid-cols-3` and `grid-rows-3` to
 * compose a hero-led collage. Each tile carries a small mono caption so
 * it reads as editorial photography rather than a stock-photo gallery.
 */
const IMAGES = [
  {
    src: '/nocturne/dish_fire.jpg',
    alt: 'Wood-fired dry-aged duck breast with black garlic puree and ember-roasted fig',
    caption: 'COURSE 07',
    label: 'Dry-Aged Duck',
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    src: '/nocturne/dish_snacks.jpg',
    alt: 'Raw oyster with smoked mignonette and charred leek ash',
    caption: 'COURSE 01',
    label: 'Kumamoto Oyster',
    span: '',
  },
  {
    src: '/nocturne/dish_cold.jpg',
    alt: 'Sliced raw hamachi with finger lime caviar and herb oil',
    caption: 'COURSE 05',
    label: 'Hamachi',
    span: '',
  },
  {
    src: '/nocturne/dish_sweet.jpg',
    alt: 'Smoked honey tuile with brown butter ice cream and charred fig',
    caption: 'COURSE 11',
    label: 'Smoked Honey Tuile',
    span: 'lg:col-span-2',
  },
];

export default function Gallery() {
  useRevealOnScroll();

  return (
    <section className="bg-[var(--bg)] px-[var(--gutter)] py-[var(--section-y)]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              data-reveal
              className="mb-3 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--oxblood)]"
            >
              From The Counter
            </p>
            <h2
              data-reveal
              data-reveal-delay={80}
              className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-[var(--ink)]"
            >
              Twelve courses,
              <br />
              <span className="text-[var(--oxblood)]">twelve witnesses.</span>
            </h2>
          </div>
        </div>

        <div className="grid auto-rows-[200px] grid-cols-1 gap-3 sm:grid-cols-2 sm:auto-rows-[260px] lg:grid-cols-4 lg:auto-rows-[300px]">
          {IMAGES.map((img, i) => (
            <figure
              key={i}
              data-reveal
              data-reveal-delay={i * 100}
              className={`group relative overflow-hidden bg-[var(--ink)]/10 ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-[var(--ink-on-dark)]" style={{ background: 'linear-gradient(to top, rgba(13,7,5,0.85), transparent)' }}>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                  {img.caption}
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-tight">
                  {img.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
