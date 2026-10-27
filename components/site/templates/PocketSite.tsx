'use client';
/**
 * Pocket — single-product flagship (ported from the Template OS).
 * v3: the market stall recomposes per genome switch — centered plinth,
 * offset glaze overlap, numbered spec ledger, colour-flooded cinema
 * frame, chunky mosaic tiles, tilted market energy — with material
 * dressing the panels and layers annotated in clear text.
 */
import { useState } from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import { Reveal, Label, Photo, HeroLayers, VoiceTag, MaterialTag, SealLayers } from '../kit';
import type { TemplateProps } from './types';

export default function PocketSite({ world }: TemplateProps) {
  const { copy, tokens: t, picks, hero, archetype } = world;
  const covers = ['var(--t-primary)', 'var(--t-accent)', 'var(--t-surface)'];
  const [cover, setCover] = useState(0);
  const [open, setOpen] = useState(0);
  const [bought, setBought] = useState(false);
  const price = copy.price.amount ?? 18;
  const siblings = copy.siblings.slice(0, 3);
  const glazes = siblings.length ? [...siblings.map((s) => s.image), copy.heroImage].filter(Boolean) : [copy.heroImage];
  const [glaze, setGlaze] = useState(glazes.length - 1 >= 0 ? glazes.length - 1 : 0);

  const picksRec = picks as unknown as Record<string, string>;
  const heroLayers = <HeroLayers world={{ archetype, picks: picksRec }} />;

  const glazePicker = (
    <div className="g-brut t-surface t-card t-r t-pad relative">
      <Label>Pick a finish</Label>
      <div className="flex gap-3 mt-4">
        {glazes.map((g, i) => (
          <button
            key={i}
            data-testid={`pocket-glaze-${i}`}
            onClick={() => {
              setGlaze(i);
              setCover(i % covers.length);
            }}
            className={`h-12 w-12 g-brut g-brut-hover t-r overflow-hidden ${glaze === i ? 'ring-4 ring-offset-2' : ''}`}
            style={{ '--tw-ring-color': 'var(--t-ink)' } as React.CSSProperties}
            aria-label={`finish ${i + 1}`}
          >
            {g ? <img src={g} alt="" className="h-full w-full object-cover" loading="lazy" /> : <span className="block h-full w-full" style={{ background: covers[i % covers.length] }} />}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 mt-6 border-t-[3px] t-border-ink pt-4 text-sm font-semibold">
        {copy.features.slice(0, 3).map((f) => (
          <div key={f.id}>
            <Label>{f.id}</Label>
            <div className="truncate" title={f.title}>{f.title.split(' ').slice(0, 2).join(' ')}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const buyCard = (
    <div className="g-brut t-surface t-card t-r t-pad flex flex-col justify-between relative">
      <div className="flex justify-between items-start">
        <Label>Price</Label>
        <span className="g-brut t-bg-accent px-2 py-1 text-xs font-bold rotate-3">−20% launch</span>
      </div>
      <div className="t-head text-7xl font-extrabold tracking-tighter">${price}</div>
      <button data-testid="pocket-buy-button" onClick={() => setBought(true)} className="g-brut g-brut-hover t-bg-primary t-r py-4 text-xl font-extrabold flex items-center justify-center gap-2">
        {bought ? 'Added. Nice choice.' : `${copy.cta} — $${price}`} <ArrowUpRight className="h-6 w-6" />
      </button>
    </div>
  );

  const reviewCard = (
    <div className="g-brut t-bg-ink t-card t-r t-pad rotate-[-1.5deg]">
      <div className="flex gap-1 t-accent">{[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}</div>
      <p className="t-head text-2xl font-bold mt-3">&ldquo;{copy.review.quote.slice(0, 90)}&rdquo;</p>
      <Label className="opacity-60 block mt-4">— {copy.review.name}, {copy.review.role}</Label>
    </div>
  );

  const faqCard = (
    <div className="g-brut t-surface t-card t-r">
      {copy.faq.map((f, i) => (
        <button key={f.q} data-testid={`pocket-faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)} className="w-full text-left t-pad-sm border-b-[3px] t-border-ink last:border-0">
          <div className="flex justify-between font-bold text-lg">
            <span>{f.q}</span>
            <span className="t-mono">{open === i ? '−' : '+'}</span>
          </div>
          {open === i && <p className="mt-2 g-rise g-shown">{f.a}</p>}
        </button>
      ))}
    </div>
  );

  const heroPanel = (className = '', style: React.CSSProperties = {}) => (
    <Reveal className={`g-brut t-r t-pad relative overflow-hidden min-h-[520px] ${className}`} style={{ background: covers[cover], ...style }}>
      {heroLayers}
      <Label>The one thing</Label>
      <h1 className="t-display mt-4">
        {copy.headline}<br />{copy.headlineAccent}.
      </h1>
      <p className="mt-4 max-w-xs font-medium">{copy.sub}</p>
      <Photo src={glazes[glaze] || copy.heroImage} alt="" className="absolute right-6 bottom-6 w-[52%] aspect-square object-cover g-brut t-r t-float" />
    </Reveal>
  );

  return (
    <div className="t-bg" style={{ padding: 'calc(var(--t-space) * 1.5rem)' }} data-testid="tpl-pocket">
      <nav className={`flex items-center justify-between g-brut t-bg px-5 py-3 t-r ${hero === 'center' ? 'max-w-3xl mx-auto' : ''}`}>
        <span className="t-head text-2xl font-extrabold">{copy.brand.toUpperCase()}</span>
        <Label>Batch {copy.plateNo} · {copy.stats[1].value} sold</Label>
      </nav>

      {/* ══ THE ONE THING — four arrangements ════════════════════════ */}
      {hero === 'cinema' ? (
        <div className="g-brut t-r relative overflow-hidden mt-6 min-h-[640px] flex items-end" style={{ background: covers[cover] }} data-testid="pocket-hero-cinema">
          {glazes[glaze] && <Photo src={glazes[glaze]} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--t-bg) 92%, transparent), transparent 60%)' }} />
          <div className="relative w-full t-pad">
            <div className="max-w-2xl">{heroLayers}</div>
            <Label>The one thing</Label>
            <h1 className="t-display mt-3">
              {copy.headline}<br />{copy.headlineAccent}.
            </h1>
            <div className="flex flex-wrap items-center gap-5 mt-6">
              <button data-testid="pocket-buy-button-cinema" onClick={() => setBought(true)} className="g-brut g-brut-hover t-bg-primary t-r px-6 py-3 text-lg font-extrabold">
                {bought ? 'Added. Nice choice.' : `${copy.cta} — $${price}`}
              </button>
              <span className="font-bold">{copy.stats[0].value} / 5 rated</span>
            </div>
          </div>
        </div>
      ) : hero === 'center' ? (
        <div className="mt-6 max-w-3xl mx-auto grid t-gap" style={{ gap: 'calc(var(--t-space) * 1.25rem)' }} data-testid="pocket-hero-center">
          {heroPanel('text-center')}
          {buyCard}
          {glazePicker}
        </div>
      ) : hero === 'mosaic' ? (
        <div className="grid grid-cols-1 md:grid-cols-6 mt-6" style={{ gap: 'calc(var(--t-space) * 1.25rem)' }} data-testid="pocket-hero-mosaic">
          <div className="md:col-span-3 md:row-span-2">{heroPanel('h-full')}</div>
          <div className="md:col-span-3">{buyCard}</div>
          <div className="md:col-span-3">{glazePicker}</div>
          <div className="md:col-span-2">{reviewCard}</div>
          <div className="md:col-span-4">{faqCard}</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 mt-6" style={{ gap: 'calc(var(--t-space) * 1.25rem)' }} data-testid={`pocket-hero-${hero}`}>
          <div className={`md:col-span-7 md:row-span-2 ${hero === 'offset' ? 'md:-translate-y-3' : ''}`}>{heroPanel('h-full')}</div>
          <div className="md:col-span-5">{buyCard}</div>
          <div className="md:col-span-5">{glazePicker}</div>
          <div className="md:col-span-4">{reviewCard}</div>
          <div className="md:col-span-8">{faqCard}</div>
        </div>
      )}

      <div className={`g-brut t-bg-accent t-r mt-6 overflow-hidden py-3 ${hero === 'diagonal' ? '-rotate-1' : ''}`}>
        <div className="t-marquee gap-10 t-head text-2xl font-extrabold">
          {[...Array(3)].flatMap((_, k) =>
            [...copy.features.slice(0, 3).map((f) => f.title.toUpperCase()), `${copy.stats[0].value} / 5 RATED`, 'MADE WITH INTENT'].map((txt) => (
              <span key={txt + k} className="px-6">{txt}</span>
            )),
          )}
        </div>
      </div>

      <p className="relative t-mono text-[10px] t-muted mt-4 flex flex-wrap items-center gap-4" style={{ color: t.muted }}>
        <SealLayers world={{ picks: picksRec, tokens: { bg: t.bg, ink: t.ink } }} />
        <VoiceTag world={{ picks: picksRec }} />
        {copy.footerLine}
      </p>
    </div>
  );
}
