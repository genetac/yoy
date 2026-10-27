'use client';

import Link from 'next/link';
import { FAMILIES } from './_omniforge/types';
import { getOffersByFamily } from './_omniforge/product-catalog';

export default function Home() {
  return (
    <main>
      {/* === HERO === */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[var(--obsidian)] px-[var(--gutter)] py-20">
        {/* Grain on dark */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ background: 'var(--grain)', mixBlendMode: 'screen' }}
        />
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(184,145,63,.12), transparent 60%)' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--brass-line)]">
            OMNIFORGE · A marketplace of finished digital products
          </p>
          <h1 className="mt-6 font-display text-[clamp(3rem,9vw,9rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-[var(--plate-bg)]">
            Truth first.
            <br />
            <span className="foil">Finish second.</span>
            <br />
            Motion third.
          </h1>
          <p className="mt-8 max-w-2xl font-mono text-sm leading-relaxed text-[var(--plate-bg)]/70">
            Every bundle is promise-accurate — the folder title describes
            every file inside. Every demo is playable — real formulas, not
            screenshots. Every download is real — the ZIP opens and the
            files work.
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="#families"
              className="border border-[var(--brass-line)] bg-[var(--brass-line)] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--obsidian-deep)] transition hover:bg-transparent hover:text-[var(--brass-line)]"
            >
              Browse the catalog
            </Link>
            <Link
              href="/studio/B-TP-1"
              className="border border-[var(--plate-bg)]/30 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--plate-bg)] transition hover:border-[var(--plate-bg)]"
            >
              See a studio →
            </Link>
          </div>
        </div>

        {/* Bottom stats strip */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-[var(--plate-bg)]/10 px-[var(--gutter)] py-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--plate-bg)]/50">
            <span>20 hero kits · 5 archetypes</span>
            <span>288 real files authored</span>
            <span>3 playable demos</span>
            <span className="text-[var(--brass-line)]">Every download is real</span>
          </div>
        </div>
      </section>

      {/* === FAMILY THEATERS === */}
      <section id="families" className="px-[var(--gutter)] py-24">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--ink-dim)]">
            Five families
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-[var(--ink)]">
            One finish system.
            <br />
            Five voices.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--ink-soft)]">
            Each family keeps its own font and radius but shares the same
            material vocabulary — obsidian plates, brass foil, engraved
            chips. Hover a family to see its signature 3D motion.
          </p>

          {/* Family grid */}
          <div className="mt-12 grid gap-px border border-[var(--plate-edge)] bg-[var(--plate-edge)] md:grid-cols-2 lg:grid-cols-3">
            {FAMILIES.map((family, i) => {
              const offers = getOffersByFamily(family.id);
              const firstOffer = offers[0];
              return (
                <Link
                  key={family.id}
                  href={`/family/${family.id}`}
                  className="group relative block bg-[var(--plate-bg)] p-8 transition hover:bg-[var(--plate-bg-deep)]"
                  style={Object.fromEntries(Object.entries(family.tokens)) as React.CSSProperties}
                >
                  {/* Plate number */}
                  <div className="flex items-center justify-between">
                    <span className="plate-number">No. {String(i + 1).padStart(2, '0')}</span>
                    <span className="plate-number">{offers.length} kits</span>
                  </div>

                  {/* Hover glyph */}
                  <div className="my-8 flex h-32 items-center justify-center">
                    <FamilyGlyph recipe={family.hoverRecipe} />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display text-2xl font-bold uppercase tracking-tight text-[var(--ink)]"
                    style={{ fontFamily: family.tokens['--family-font'] }}
                  >
                    {family.label}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">{family.tagline}</p>

                  {/* From price */}
                  <div className="mt-6 flex items-baseline justify-between border-t border-[var(--plate-edge)] pt-4">
                    <div>
                      <span className="plate-number">From</span>
                      <p className="foil font-display text-2xl font-bold">
                        ${Math.min(...offers.map((o) => o.price.amount ?? Infinity))}
                      </p>
                    </div>
                    <span className="border border-[var(--ink)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--ink)] transition group-hover:bg-[var(--ink)] group-hover:text-[var(--plate-bg)]">
                      Enter →
                    </span>
                  </div>
                </Link>
              );
            })}

            {/* Sixth cell — the studio CTA */}
            <Link
              href="/studio/B-TP-1"
              className="group relative block bg-[var(--obsidian)] p-8 text-[var(--plate-bg)] transition hover:bg-[var(--obsidian-deep)]"
            >
              <div className="flex items-center justify-between">
                <span className="plate-number text-[var(--plate-bg)]/40">No. 06</span>
                <span className="plate-number text-[var(--plate-bg)]/40">Try it</span>
              </div>
              <div className="my-8 flex h-32 items-center justify-center">
                <div className="wax-seal h-16 w-16 text-2xl">▶</div>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
                Presentation Studio
              </h3>
              <p className="mt-1 text-sm text-[var(--plate-bg)]/60">
                Overview, contents, playable demo, live preview, real download.
              </p>
              <div className="mt-6 flex items-baseline justify-between border-t border-[var(--plate-bg)]/10 pt-4">
                <span className="plate-number text-[var(--plate-bg)]/40">See one in action</span>
                <span className="border border-[var(--brass-line)] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--brass-line)]">
                  Open →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* === HONESTY STRIP === */}
      <section className="border-y border-[var(--plate-edge)] bg-[var(--plate-bg-deep)] px-[var(--gutter)] py-16">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-5xl font-extrabold text-[var(--brass-line)]">01</p>
            <h3 className="mt-2 font-display text-lg font-bold uppercase text-[var(--ink)]">Promise-accurate</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
              Every folder title describes every file inside. Policies
              (updates, guarantee, license) are chips, never folders. The
              keyword bank uses word-boundary matching with a deny-list.
            </p>
          </div>
          <div>
            <p className="font-display text-5xl font-extrabold text-[var(--brass-line)]">02</p>
            <h3 className="mt-2 font-display text-lg font-bold uppercase text-[var(--ink)]">Playable demos</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
              The Studio's Try-it tab runs real formulas: WCAG luminance,
              weighted quiz scoring, 4-view Notion sync. No screenshots,
              no "coming soon" placeholders.
            </p>
          </div>
          <div>
            <p className="font-display text-5xl font-extrabold text-[var(--brass-line)]">03</p>
            <h3 className="mt-2 font-display text-lg font-bold uppercase text-[var(--ink)]">Real downloads</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
              After purchase, the browser assembles a real ZIP. Every file
              is either genuinely authored or openly labeled "in production."
              The README flag table matches the archive exactly.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

/** Family glyph — the CSS-3D hover preview (P4 T1) */
function FamilyGlyph({ recipe }: { recipe: string }) {
  if (recipe === 'fan-deck') {
    return (
      <div className="hover-fan-deck relative h-full w-full">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="fan-card absolute left-1/2 top-1/2 h-[70%] w-[30%] -translate-x-1/2 -translate-y-1/2 border border-[var(--brass-soft)] bg-[var(--plate-bg)] shadow-[var(--shadow-contact)]"
            style={{ transform: `rotateZ(${(i - 3) * 4}deg)`, zIndex: i }}
          >
            <div className="p-2">
              <div className="h-1 w-3/4 bg-[var(--ink-dim)]/30" />
              <div className="mt-1 h-1 w-1/2 bg-[var(--ink-dim)]/20" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (recipe === 'exploded') {
    return (
      <div className="hover-exploded relative h-full w-full">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="explode-layer absolute left-1/2 top-1/2 h-[50%] w-[50%] -translate-x-1/2 -translate-y-1/2 border border-[var(--brass-soft)] bg-[var(--plate-bg)] shadow-[var(--shadow-contact)]"
            style={{ zIndex: i }}
          >
            <div className="flex h-full items-center justify-center">
              <span className="font-mono text-[8px] text-[var(--ink-dim)]">tool-{i}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (recipe === 'isometric-stack') {
    return (
      <div className="hover-isometric relative h-full w-full">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="iso-layer absolute left-1/2 top-1/2 h-[40%] w-[45%] -translate-x-1/2 -translate-y-1/2 border border-[var(--brass-soft)] bg-[var(--plate-bg)] shadow-[var(--shadow-contact)]"
            style={{ zIndex: i }}
          >
            <div className="p-1.5">
              <div className="h-0.5 w-3/4 bg-[var(--ink-dim)]/30" />
              <div className="mt-1 h-0.5 w-1/2 bg-[var(--ink-dim)]/20" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (recipe === 'medal-flip') {
    return (
      <div className="hover-medal-flip relative flex h-full items-center justify-center">
        <div className="medal-3d relative h-20 w-20">
          <div className="medal-face wax-seal h-20 w-20 text-2xl">★</div>
          <div className="medal-back medal-face wax-seal h-20 w-20 text-2xl" style={{ background: 'var(--ink)', color: 'var(--foil)' }}>✓</div>
        </div>
      </div>
    );
  }
  // pointer-tilt
  return (
    <div className="hover-pointer-tilt relative h-full w-full">
      <div className="absolute left-1/2 top-1/2 h-[65%] w-[55%] -translate-x-1/2 -translate-y-1/2 border border-[var(--brass-soft)] bg-[var(--plate-bg)] shadow-[var(--shadow-contact)]">
        <div className="p-2">
          <div className="h-1 w-1/3 bg-[var(--brass-line)]" />
          <div className="mt-1.5 h-0.5 w-2/3 bg-[var(--ink-dim)]/30" />
          <div className="mt-1 h-0.5 w-1/2 bg-[var(--ink-dim)]/20" />
        </div>
      </div>
    </div>
  );
}
