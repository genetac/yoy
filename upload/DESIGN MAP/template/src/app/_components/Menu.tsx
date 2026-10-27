'use client';

import { Fragment, useState } from 'react';
import { useRevealOnScroll } from '../_lib/interactions';

/**
 * Menu — adapted directly from Mantis's expandable services list.
 *
 * Each of the four menu sections (SNACKS, COLD, FIRE, SWEET) is a
 * horizontally striped row. Clicking expands it to reveal:
 *   • A larger panel with a dish image on one side and a list of dishes
 *     (with prices in mono caps) on the other.
 *
 * The interaction mirrors Mantis's `/services` section where each category
 * (Experiential, Digital, Brand) expands to reveal "RELATED SERVICES".
 */
type Dish = {
  name: string;
  description: string;
  price: string;
};
type Section = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  image: string;
  description: string;
  dishes: Dish[];
};

const SECTIONS: Section[] = [
  {
    id: 'snacks',
    number: '01',
    title: 'Snacks',
    subtitle: 'To open · 4 bites',
    image: '/nocturne/dish_snacks.jpg',
    description:
      'The first four bites arrive together on the counter — raw, smoked, cured, and briny. They are designed to wake the palate and set the tone for the fire to come.',
    dishes: [
      {
        name: 'Kumamoto Oyster',
        description: 'Wood-smoked mignonette, charred leek ash',
        price: '—',
      },
      {
        name: 'Beef Tartare',
        description: 'Hand-cut, smoked yolk, rye cracker, sumac',
        price: '—',
      },
      {
        name: 'Cured Trout',
        description: 'Beet emulsion, horseradish, dill oil',
        price: '—',
      },
      {
        name: 'Sourdough Crisp',
        description: 'Whipped bone marrow, charred onion jam',
        price: '—',
      },
    ],
  },
  {
    id: 'cold',
    number: '02',
    title: 'Cold',
    subtitle: 'The pause · 3 courses',
    image: '/nocturne/dish_cold.jpg',
    description:
      'Three cold courses break the heat. Raw fish, a single vegetable in its season, and a clear broth. A breath before the fire courses begin.',
    dishes: [
      {
        name: 'Hamachi',
        description: 'Finger lime, yuzu kosho, smoked olive oil',
        price: '—',
      },
      {
        name: 'Tomato, Peach',
        description: 'Basil ice, aged sherry, Maldon',
        price: '—',
      },
      {
        name: 'Clam Consommé',
        description: 'Charred leek, fennel, sea lettuce',
        price: '—',
      },
    ],
  },
  {
    id: 'fire',
    number: '03',
    title: 'Fire',
    subtitle: 'The main act · 4 courses',
    image: '/nocturne/dish_fire.jpg',
    description:
      'Four courses cooked directly over the embers. Each one lands on the counter still smoking, still sizzling, still alive with the fire it came from.',
    dishes: [
      {
        name: 'Ember-Roasted Onion',
        description: 'Blackened, peeled at the counter, smoked crème fraîche',
        price: '—',
      },
      {
        name: 'Charred Maitake',
        description: 'Brown butter, soy, shaved bonito',
        price: '—',
      },
      {
        name: 'Dry-Aged Duck',
        description: '42 days, whole-grilled, black garlic, fig leaf oil',
        price: '—',
      },
      {
        name: 'Wood-Fired Branzino',
        description: 'Charred lemon, salsa verde, sea grape',
        price: '—',
      },
    ],
  },
  {
    id: 'sweet',
    number: '04',
    title: 'Sweet',
    subtitle: 'To close · 2 courses',
    image: '/nocturne/dish_sweet.jpg',
    description:
      'Two small endings. Both carry a whisper of smoke — the dessert course is part of the meal, not an apology for it.',
    dishes: [
      {
        name: 'Smoked Honey Tuile',
        description: 'Brown butter ice cream, charred fig, dark caramel',
        price: '—',
      },
      {
        name: 'Chocolate, Olive',
        description: '70% single origin, salt-cured olive, cocoa nib',
        price: '—',
      },
    ],
  },
];

export default function Menu() {
  useRevealOnScroll();
  const [openId, setOpenId] = useState<string | null>('fire');

  return (
    <section id="menu" className="scroll-mt-32 bg-[var(--bg-deep)] px-[var(--gutter)] py-[var(--section-y)]">
      <div className="mx-auto max-w-7xl">
        {/* Header row */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              data-reveal
              className="mb-3 text-[10px] font-medium uppercase tracking-[0.4em] text-[var(--oxblood)]"
            >
              Tonight&apos;s Tasting
            </p>
            <h2
              data-reveal
              data-reveal-delay={80}
              className="font-display text-[clamp(2rem,5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-[var(--ink)]"
            >
              A Carta
            </h2>
          </div>
          <p
            data-reveal
            data-reveal-delay={160}
            className="max-w-sm text-sm font-light leading-relaxed text-[var(--ink-soft)]"
          >
            The full menu is twelve courses across four acts, served in
            sequence. Courses shift nightly with what the fire and the
            market give us. Click a section to open it.
          </p>
        </div>

        {/* Expandable section rows.
            All buttons + panels are DIRECT CHILDREN of this container
            (no per-section wrapper divs). This is critical for the
            sticky positioning to work: each button's sticky parent is
            this tall container, not a tiny per-section wrapper.
            When a button scrolls to y=91px (navbar bottom), it sticks
            there until the next button pushes it away — preventing the
            large section labels from ever entering the navbar zone and
            visually merging with NOCTURNE. */}
        <div className="border-t border-[var(--ink)]/15">
          {SECTIONS.map((s) => {
            const isOpen = openId === s.id;
            return (
              <Fragment key={s.id}>
                {/* Sticky section label button */}
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : s.id)}
                  className="group sticky top-[102px] z-10 grid w-full grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-[var(--ink)]/15 bg-[var(--bg-deep)] py-4 text-left transition hover:bg-[var(--ink)]/[0.05] sm:grid-cols-[auto_1fr_auto_auto]"
                  aria-expanded={isOpen}
                >
                  <span className="font-mono text-xs font-medium tracking-[0.2em] text-[var(--ink-soft)]">
                    {s.number}
                  </span>
                  <span className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-[var(--ink)] transition group-hover:text-[var(--oxblood)]">
                    {s.title}
                  </span>
                  <span className="hidden text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--ink-soft)] sm:inline">
                    {s.subtitle}
                  </span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center text-lg transition ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>

                {/* Expandable body — height animates via grid-rows trick */}
                <div
                  className="grid border-b border-[var(--ink)]/15 transition-all duration-500 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-8 pb-12 pt-2 md:grid-cols-[1fr_1.3fr] md:gap-12">
                      {/* Left: dish image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--ink)]/10">
                        <img
                          src={s.image}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      {/* Right: section description + dish list */}
                      <div className="flex flex-col gap-6">
                        <p className="font-serif text-lg font-light italic leading-relaxed text-[var(--ink-soft)]">
                          {s.description}
                        </p>
                        <ul className="flex flex-col divide-y divide-[var(--ink)]/10 border-y border-[var(--ink)]/10">
                          {s.dishes.map((d) => (
                            <li
                              key={d.name}
                              className="flex items-baseline justify-between gap-4 py-3"
                            >
                              <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium uppercase tracking-[0.05em] text-[var(--ink)]">
                                  {d.name}
                                </span>
                                <span className="text-xs font-light leading-relaxed text-[var(--ink-soft)]">
                                  {d.description}
                                </span>
                              </div>
                              <span className="font-mono text-xs tracking-[0.15em] text-[var(--amber)]">
                                {d.price}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>

        {/* Pricing footer */}
        <div
          data-reveal
          className="mt-12 grid gap-6 border-t border-[var(--ink)]/15 pt-8 text-sm font-light text-[var(--ink-soft)] sm:grid-cols-3"
        >
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--ink)]">
              Tasting Menu
            </p>
            <p className="mt-1 font-mono text-base text-[var(--ink)]">$285 / guest</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--ink)]">
              Wine Pairing
            </p>
            <p className="mt-1 font-mono text-base text-[var(--ink)]">+ $180 / guest</p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[var(--ink)]">
              Counter Walk-Ins
            </p>
            <p className="mt-1 font-mono text-base text-[var(--ink)]">From 18:00 nightly</p>
          </div>
        </div>
      </div>
    </section>
  );
}
