'use client';
/**
 * Maison Vey — luxury flagship (ported from the Template OS).
 * v3: the maison answers every composition as a different gallery —
 * centered plinth, offset editorial, numbered index ledger, full-bleed
 * cinema (its native state), object mosaic, diagonal crop — with the
 * direction scaling the display type and layers annotated in clear text.
 */
import { useState } from 'react';
import { Reveal, Label, Photo, IMG, HeroLayers, VoiceTag, MaterialTag, SealLayers } from '../kit';
import type { TemplateProps } from './types';

export default function MaisonSite({ world }: TemplateProps) {
  const { copy, tokens: t, picks, hero, archetype } = world;
  const pieces = (copy.siblings.length ? copy.siblings : []).slice(0, 3).map((s, i) => ({
    no: String(12 + i * 15).padStart(3, '0'),
    name: s.name,
    note: s.blurb,
    price: `€ ${s.price}`,
    img: s.image,
  }));
  const [active, setActive] = useState(0);
  const p = pieces[active];

  const heroLayers = (
    <HeroLayers world={{ archetype, picks: picks as unknown as Record<string, string> }} />
  );

  /* gallery-wall hero: full-bleed for cinema/center/diagonal-drawn states */
  const wallHero = (kind: 'cinema' | 'center') => (
    <section
      className={`relative ${kind === 'center' ? 'h-[92vh] min-h-[620px] grid place-items-center text-center' : 'h-[96vh] min-h-[660px]'}`}
      data-testid={`maison-hero-${kind}`}
    >
      <Photo src={copy.heroImage || IMG.perfumeDark} alt="" className="absolute inset-0 h-full w-full object-cover t-kenburns" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3))' }} />
      <div className="absolute top-28 right-10 text-right"><Label className="t-primary">Edition {copy.edition}</Label></div>
      <div className={kind === 'center' ? 'relative px-10 text-[#F3EBDD] max-w-4xl mx-auto' : 'absolute bottom-16 left-10 right-10 text-[#F3EBDD]'}>
        {heroLayers}
        <Reveal><Label className="opacity-80">{copy.eyebrow}</Label></Reveal>
        <Reveal delay={0.15}>
          <h1 className={`t-display mt-4 italic ${kind === 'center' ? 'mx-auto' : ''}`}>
            {copy.headline}{kind === 'center' ? <br /> : <br />}{copy.headlineAccent}
          </h1>
        </Reveal>
        <Reveal delay={0.3} className={`flex items-center gap-8 mt-10 ${kind === 'center' ? 'justify-center' : ''}`}>
          <button className="t-btn" data-testid="maison-hero-cta">{copy.cta}</button>
          <span className="text-sm opacity-80 border-b border-current pb-1">{copy.ctaGhost}, in eleven minutes</span>
        </Reveal>
      </div>
    </section>
  );

  /* editorial-split hero: image aside, text column — for offset/ledger/split */
  const splitHero = (kind: 'split' | 'offset' | 'ledger' | 'diagonal') => (
    <section className="grid lg:grid-cols-12 border-b t-line" data-testid={`maison-hero-${kind}`}>
      <div className={`${kind === 'ledger' ? 'lg:col-span-5' : 'lg:col-span-7'} t-sec relative z-10`}>
        {heroLayers}
        <Reveal><Label className="t-primary">{copy.eyebrow}</Label></Reveal>
        <Reveal delay={0.15}>
          <h1 className="t-display mt-5 italic">
            {copy.headline}<br />{copy.headlineAccent}
          </h1>
        </Reveal>
        {kind === 'ledger' && (
          <div className="mt-10 border-t t-line">
            {pieces.map((x, i) => (
              <div key={x.no} className="flex items-baseline gap-6 py-4 border-b t-line">
                <span className="t-mono text-xs t-muted">No. {x.no}</span>
                <span className="t-head text-2xl tracking-tight flex-1">{x.name}</span>
                <span className="t-mono text-sm t-muted">{x.price}</span>
              </div>
            ))}
          </div>
        )}
        <Reveal delay={0.3} className={`flex items-center gap-8 mt-10 ${kind === 'diagonal' ? '-rotate-2' : ''}`}>
          <button className="t-btn" data-testid="maison-hero-cta">{copy.cta}</button>
          <span className="text-sm opacity-80 border-b border-current pb-1">{copy.ctaGhost}, in eleven minutes</span>
        </Reveal>
      </div>
      <div className={`${kind === 'ledger' ? 'lg:col-span-7' : 'lg:col-span-5'} relative min-h-[520px] t-zoom ${kind === 'offset' ? 'lg:-mt-14' : ''}`}>
        <Photo src={copy.heroImage || IMG.perfumeDark} alt="" className="absolute inset-0 h-full w-full object-cover t-kenburns" />
        <div className="absolute top-8 right-8 text-right"><span className="t-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: '#F3EBDD' }}>Edition {copy.edition}</span></div>
      </div>
    </section>
  );

  return (
    <div className="relative t-bg" data-testid="tpl-maison">
      <nav className="absolute z-20 top-0 left-0 right-0 flex items-center justify-between px-10 py-7" style={{ color: hero.startsWith('split') || hero === 'ledger' || hero === 'offset' ? 'var(--t-ink)' : '#F3EBDD' }}>
        <span className="t-mono text-xs tracking-[0.5em]">{copy.brand.toUpperCase()}</span>
        <div className="hidden md:flex gap-10 text-sm">
          {copy.navLinks.map((l) => <span key={l}>{l}</span>)}
        </div>
      </nav>

      {/* ══ HERO — the maison stages the flacon four ways ════════════ */}
      {hero === 'cinema' || hero === 'center'
        ? wallHero(hero as 'cinema' | 'center')
        : splitHero(hero as 'split' | 'offset' | 'ledger' | 'diagonal')}

      {hero === 'mosaic' ? (
        /* object mosaic — every edition a plinth card */
        pieces.length > 0 && (
          <section className="t-sec" data-testid="maison-mosaic">
            <div className="flex items-center gap-3">
              <Label className="t-primary">The current edition</Label>
              <VoiceTag world={{ picks: picks as unknown as Record<string, string> }} />
            </div>
            <div className="mt-10 grid md:grid-cols-3 t-gap-lg">
              {pieces.map((x, i) => (
                <Reveal key={x.no} delay={i * 0.08} className="t-card border t-line overflow-hidden t-lift">
                  <div className="t-zoom aspect-[4/5]"><Photo src={x.img} alt={x.name} className="h-full w-full object-cover" /></div>
                  <div className="t-pad">
                    <Label className="t-primary">No. {x.no} / 250</Label>
                    <div className="t-head text-3xl mt-2 italic">{x.name}</div>
                    <p className="t-muted text-sm mt-2">{x.note}</p>
                    <button className="t-btn mt-5 text-sm w-full justify-center" data-testid={`maison-reserve-${x.no}`}>Reserve — {x.price}</button>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )
      ) : pieces.length > 0 && (
        <section className="t-sec grid lg:grid-cols-12 t-gap-lg items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-10">
            <div className="flex items-center gap-3">
              <Label className="t-primary">The current edition</Label>
              <VoiceTag world={{ picks: picks as unknown as Record<string, string> }} />
            </div>
            <div className="mt-8 border-t t-line">
              {pieces.map((x, i) => (
                <button
                  key={x.no}
                  data-testid={`maison-piece-${x.no}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`w-full text-left flex items-baseline gap-6 py-6 border-b t-line t-lift ${i === active ? 't-ink' : 't-muted'}`}
                >
                  <span className="t-mono text-xs">No. {x.no}</span>
                  <span className="t-head text-4xl tracking-tight flex-1">{x.name}</span>
                  <span className="t-mono text-sm">{x.price}</span>
                </button>
              ))}
            </div>
            <p className="t-muted mt-8 max-w-sm leading-relaxed">
              {p?.note}. Hand-numbered, wax-sealed, delivered by our own couriers.
            </p>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="t-zoom aspect-[4/5] t-frame" key={p?.no}>
              <Photo src={p?.img} alt={p?.name} className="h-full w-full object-cover g-rise g-shown" />
            </div>
            {p && (
              <div className="t-card t-pad border t-line absolute -bottom-8 -left-8 max-w-xs relative">
                <MaterialTag world={{ picks: picks as unknown as Record<string, string> }} />
                <Label className="t-primary">No. {p.no} / 250</Label>
                <div className="t-head text-3xl mt-2 italic">{p.name}</div>
                <button className="t-btn mt-5 text-sm" data-testid="maison-reserve">Reserve — {p.price}</button>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="t-sec border-t t-line grid md:grid-cols-12 t-gap-lg items-center">
        <div className={`md:col-span-4 t-zoom aspect-[3/4] t-frame ${hero === 'diagonal' ? '-rotate-1' : ''}`}><Photo src={IMG.bagYellow} alt="Atelier bag" className="h-full w-full object-cover" /></div>
        <Reveal className="md:col-span-8">
          <p className="t-h2 italic leading-[1.05]">
            &ldquo;{copy.review.quote}&rdquo;
          </p>
          <Label className="t-muted block mt-8">— {copy.review.name} · {copy.review.role}</Label>
        </Reveal>
      </section>

      <footer className="t-sec border-t t-line relative flex flex-wrap justify-between gap-6 items-end">
        <SealLayers world={{ picks: picks as unknown as Record<string, string>, tokens: { bg: t.bg, ink: t.ink } }} />
        <div className="t-head text-5xl italic">{copy.brand}</div>
        <Label className="t-muted">Private appointments · plate No. {copy.plateNo} · {copy.edition}</Label>
      </footer>
    </div>
  );
}
