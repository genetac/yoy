'use client';

import { useRevealOnScroll } from '../_lib/interactions';

export default function Story() {
  useRevealOnScroll();
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-[#0c0a08] px-[6vw] py-[16vh] sm:px-[10vw]"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Left: image-like decorative panel */}
        <div
          data-reveal
          className="reveal relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-white/10"
          style={{
            background:
              'linear-gradient(135deg, #2a1f15 0%, #1a1410 40%, #0c0a08 100%)',
          }}
        >
          {/* Subtle texture */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 30% 20%, rgba(252, 211, 77, 0.18), transparent 40%), radial-gradient(circle at 70% 80%, rgba(180, 80, 40, 0.18), transparent 45%)',
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <p className="font-serif text-[12vw] font-light leading-none text-amber-200/30 lg:text-[10rem]">
              1962
            </p>
            <p className="mt-4 text-[11px] uppercase tracking-[0.4em] text-white/60">
              Roma · Milano · Bologna
            </p>
          </div>
          {/* Corner ornaments */}
          <div className="absolute left-4 top-4 h-8 w-8 border-l border-t border-amber-200/30" />
          <div className="absolute right-4 top-4 h-8 w-8 border-r border-t border-amber-200/30" />
          <div className="absolute bottom-4 left-4 h-8 w-8 border-b border-l border-amber-200/30" />
          <div className="absolute bottom-4 right-4 h-8 w-8 border-b border-r border-amber-200/30" />
        </div>

        {/* Right: copy */}
        <div data-reveal className="reveal flex flex-col gap-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-amber-200/60">
            Our Story
          </p>
          <h2 className="font-serif text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl">
            Three generations,
            <br />
            one kitchen.
          </h2>
          <div className="flex flex-col gap-5 text-sm font-light leading-relaxed text-white/70 sm:text-base">
            <p>
              In 1962, Enzo Marino swung open the door of a narrow townhouse on
              Via dei Coronari and hung a single lantern above it. He had
              recently arrived from Bologna with a wooden rolling pin, his
              mother&rsquo;s ragù recipe, and a stubborn belief that a meal
              should feel like coming home.
            </p>
            <p>
              Six decades later, the lantern still swings. His granddaughter
              Sofia now runs the kitchen, having learned to roll tagliatelle
              on the same marble counter Enzo installed the year the doors
              opened. The recipe box has grown, but the rule has not changed:
              everything is made by hand, every day.
            </p>
            <p>
              We have no microwave. We have no freezer. We have a butcher who
              has delivered every morning for thirty-one years, a baker who
              brings bread at 5 am, and a winemaker in Tuscany who sends a
              vintage only when he thinks it&rsquo;s ready. We&rsquo;d rather
              run out than compromise.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-6">
            <div className="font-serif text-3xl italic text-amber-200">
              &ldquo;
            </div>
            <p className="font-serif text-lg italic leading-relaxed text-white/80">
              La cucina è la casa.
              <span className="block mt-1 text-xs not-italic uppercase tracking-[0.25em] text-white/40">
                The kitchen is the home. — Enzo Marino, 1962
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
