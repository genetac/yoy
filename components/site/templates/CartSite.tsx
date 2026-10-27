'use client';
/**
 * Snapcart — mass-market retail flagship (ported from the Template OS).
 * v3: the drop rearranges per composition — centered monument, offset
 * shelf overlap, price ledger, full-bleed drop frame, dense mosaic,
 * skewed market energy — with the material recipe dressing every shelf
 * card and the layer inspector annotating each governing layer.
 */
import { useEffect, useState } from 'react';
import { Search, ShoppingBasket, Star, Plus, Zap } from 'lucide-react';
import { Reveal, Photo, HeroLayers, VoiceTag, MaterialTag, SealLayers, Label } from '../kit';
import type { TemplateProps } from './types';

function Countdown() {
  const [s, setS] = useState(5 * 3600 + 42 * 60 + 17);
  useEffect(() => {
    const t = setInterval(() => setS((x) => (x > 0 ? x - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const f = (n: number) => String(n).padStart(2, '0');
  return (
    <div className="flex gap-2 t-mono" data-testid="cart-countdown">
      {[Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((v, i) => (
        <span key={i} className="t-bg-ink t-r-sm px-3 py-2 text-2xl font-bold">{f(v)}</span>
      ))}
    </div>
  );
}

export default function CartSite({ world }: TemplateProps) {
  const { copy, tokens: t, picks, hero, archetype } = world;
  const products = copy.siblings.slice(0, 8).map((s, i) => ({
    name: s.name,
    price: s.price,
    was: Math.round(s.price * 1.35),
    rating: s.rating,
    img: s.image,
    key: s.slug + i,
  }));
  const [basket, setBasket] = useState<string[]>([]);
  const [bump, setBump] = useState(0);
  const add = (name: string) => {
    setBasket((b) => [...b, name]);
    setBump((n) => n + 1);
  };
  const total = basket.reduce((s, name) => s + (products.find((p) => p.name === name)?.price ?? 0), 0);

  const heroLayers = (
    <HeroLayers world={{ archetype, picks: picks as unknown as Record<string, string> }} />
  );
  const headline = (
    <h1 className="t-display">
      {copy.headline}<br />{copy.headlineAccent}.
    </h1>
  );
  const dropMeta = (
    <div className="flex flex-wrap items-center gap-6">
      <Countdown />
      <button className="t-btn" style={{ background: 'var(--t-ink)', color: 'var(--t-bg)' }}>{copy.cta}</button>
    </div>
  );

  return (
    <div className="relative pb-28 t-bg" data-testid="tpl-cart">
      <div className="t-bg-accent overflow-hidden py-2 text-sm font-semibold">
        <div className="t-marquee gap-12">
          {[...Array(4)].flatMap((_, k) =>
            [`${copy.ctaGhost}`, '2-hour slots near you', `Weekend mega drop −40%`, 'Easy 30-day returns'].map((tt) => (
              <span key={tt + k} className="px-6">{tt}</span>
            )),
          )}
        </div>
      </div>
      <nav className="sticky top-0 z-20 t-bg flex items-center gap-4 px-6 py-4 border-b t-line">
        <div className="t-head text-3xl font-extrabold tracking-tighter t-primary">{copy.brand.toLowerCase()}</div>
        <div className="hidden sm:flex flex-1 items-center gap-2 t-surface t-r px-4 py-3 min-w-0">
          <Search className="h-5 w-5 t-muted shrink-0" />
          <span className="t-muted truncate">Search {copy.familyLabel.toLowerCase()}…</span>
        </div>
        <Search className="sm:hidden ml-auto h-6 w-6" />
        <button data-testid="cart-basket-button" className="t-btn relative">
          <ShoppingBasket className="h-5 w-5" /><span className="hidden sm:inline">Basket</span>
          <span key={bump} className="g-rise g-shown absolute -top-2 -right-2 h-6 min-w-6 px-1 rounded-full t-bg-accent text-xs font-bold grid place-items-center" data-testid="cart-count">{basket.length}</span>
        </button>
      </nav>

      {/* ══ DROP HERO — four arrangements ════════════════════════════ */}
      {hero === 'cinema' ? (
        <section className="relative min-h-[80vh] flex items-end p-6" data-testid="cart-hero-cinema">
          {copy.heroImage && (
            <>
              <Photo src={copy.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--t-bg) 90%, transparent), transparent 65%)' }} />
            </>
          )}
          <div className="relative w-full max-w-3xl">
            {heroLayers}
            <div className="flex items-center gap-2 font-semibold"><Zap className="h-5 w-5" />{copy.eyebrow}</div>
            {headline}
            <p className="t-muted max-w-md mt-4">{copy.sub}</p>
            <div className="mt-6">{dropMeta}</div>
          </div>
        </section>
      ) : hero === 'center' ? (
        <section className="t-sec flex flex-col items-center text-center" data-testid="cart-hero-center">
          {heroLayers}
          <div className="flex items-center gap-2 font-semibold"><Zap className="h-5 w-5" />{copy.eyebrow}</div>
          <div className="max-w-3xl mx-auto mt-4">{headline}</div>
          <p className="t-muted max-w-md mt-4">{copy.sub}</p>
          <div className="mt-8 flex justify-center">{dropMeta}</div>
          <div className="grid grid-cols-2 gap-4 mt-10 w-full max-w-xl">
            <div className="t-card t-pad">
              <div className="t-head text-3xl font-extrabold">${Math.max(5, Math.round((copy.price.amount ?? 25) / 5))} off</div>
              <p className="t-muted text-sm">first order · code {copy.brand.slice(0, 4).toUpperCase()}{copy.plateNo}</p>
            </div>
            <div className="t-bg-accent t-r t-pad">
              <div className="t-head text-3xl font-extrabold">2-hour</div>
              <p className="text-sm">delivery slots in 40 cities</p>
            </div>
          </div>
        </section>
      ) : hero === 'mosaic' ? (
        <section className="relative grid md:grid-cols-3 t-gap p-6" data-testid="cart-hero-mosaic">
          <Reveal className="md:col-span-2 md:row-span-2 t-bg-primary t-r t-pad relative overflow-hidden min-h-[360px] flex flex-col justify-between">
            <div>
              {heroLayers}
              <div className="flex items-center gap-2 font-semibold"><Zap className="h-5 w-5" />{copy.eyebrow}</div>
              <h1 className="t-display mt-4">{headline}</h1>
            </div>
            <p className="t-muted max-w-md">{copy.sub}</p>
            {dropMeta}
          </Reveal>
          <div className="t-card t-pad">
            <div className="t-head text-3xl font-extrabold">${Math.max(5, Math.round((copy.price.amount ?? 25) / 5))} off</div>
            <p className="t-muted text-sm">first order · code {copy.brand.slice(0, 4).toUpperCase()}{copy.plateNo}</p>
          </div>
          <div className="t-bg-accent t-r t-pad">
            <div className="t-head text-3xl font-extrabold">2-hour</div>
            <p className="text-sm">delivery slots in 40 cities</p>
          </div>
          <div className="t-card t-pad md:col-span-1 flex items-end">
            <Label className="t-muted">Free delivery over $25 · 30-day returns</Label>
          </div>
        </section>
      ) : (
        <section className="grid lg:grid-cols-3 t-gap p-6" data-testid="cart-hero-split">
          <Reveal className={`lg:col-span-2 t-bg-primary t-r t-pad relative overflow-hidden min-h-[320px] flex flex-col justify-between ${hero === 'offset' ? 'lg:-translate-y-2' : ''}`}>
            {heroLayers}
            <div className="flex items-center gap-2 font-semibold"><Zap className="h-5 w-5" />{copy.eyebrow}</div>
            {headline}
            <p className="t-muted max-w-md">{copy.sub}</p>
            {dropMeta}
          </Reveal>
          <div className="grid t-gap">
            <div className="t-card t-pad">
              <div className="t-head text-3xl font-extrabold">${Math.max(5, Math.round((copy.price.amount ?? 25) / 5))} off</div>
              <p className="t-muted text-sm">your first order with code {copy.brand.slice(0, 4).toUpperCase()}{copy.plateNo}</p>
            </div>
            <div className="t-bg-accent t-r t-pad">
              <div className="t-head text-3xl font-extrabold">2-hour</div>
              <p className="text-sm">delivery slots in 40 cities</p>
            </div>
          </div>
        </section>
      )}

      <div className="flex gap-3 px-6 overflow-x-auto g-no-scrollbar">
        {[copy.ctaGhost.replace(/^free /i, 'Deals · '), ...copy.siblings.slice(0, 4).map((s) => s.name), 'New in'].map((c, i) => (
          <span key={c + i} className={`px-5 py-2 rounded-full whitespace-nowrap font-semibold text-sm t-lift ${i === 0 ? 't-bg-ink' : 't-surface'}`}>{c}</span>
        ))}
      </div>

      {/* ── shelf — every card dressed by the material layer ───────── */}
      <section className={`grid t-gap p-6 ${hero === 'ledger' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
        {products.map((p, i) => (
          <Reveal key={p.key} delay={i * 0.04} className="group relative">
            {i === 0 && <MaterialTag world={{ picks: picks as unknown as Record<string, string> }} />}
            <div className="t-card overflow-hidden t-zoom relative aspect-square">
              <Photo src={p.img} alt={p.name} className="h-full w-full object-cover" />
              <span className="absolute top-3 left-3 t-bg-primary rounded-full px-2 py-1 text-xs font-bold">−{Math.round((1 - p.price / p.was) * 100)}%</span>
              <button data-testid={`cart-add-${i}`} onClick={() => add(p.name)} className="absolute bottom-3 right-3 t-btn !p-3 rounded-full" aria-label={`add ${p.name}`}><Plus className="h-5 w-5" /></button>
            </div>
            <div className="mt-3 font-semibold">{p.name}</div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-lg">${p.price.toFixed(2)}</span>
              <span className="t-muted line-through">${p.was.toFixed(2)}</span>
              <span className="ml-auto flex items-center gap-1 t-muted"><Star className="h-3 w-3 fill-current" />{p.rating}</span>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ── closing — seal layers ──────────────────────────────────── */}
      <section className="px-6 relative flex flex-wrap items-end justify-between gap-4 pb-6">
        <SealLayers world={{ picks: picks as unknown as Record<string, string>, tokens: { bg: t.bg, ink: t.ink } }} />
        <div className="flex items-center gap-3">
          <VoiceTag world={{ picks: picks as unknown as Record<string, string> }} />
          <Label className="t-muted">{copy.footerLine}</Label>
        </div>
      </section>

      {basket.length > 0 && (
        <div className="sticky bottom-4 mx-6 t-bg-ink t-r t-pad-sm flex items-center justify-between g-rise g-shown" data-testid="cart-sticky-bar">
          <span className="font-semibold">
            {basket.length} item{basket.length > 1 ? 's' : ''} · <b data-testid="cart-total">${total.toFixed(2)}</b>
            {total < 25 && <span className="opacity-60"> · ${(25 - total).toFixed(2)} to free delivery</span>}
          </span>
          <button className="t-btn">Checkout</button>
        </div>
      )}
    </div>
  );
}
