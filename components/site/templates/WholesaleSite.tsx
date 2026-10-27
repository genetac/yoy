'use client';
/**
 * Quartermaster — B2B wholesale flagship (ported from the Template OS).
 * v3: composition rearranges the trade hero structurally (centered
 * monument / offset editorial / numbered ledger / full-bleed warehouse /
 * mosaic tiles / diagonal flow), the matrix reads the material recipe
 * and every governing layer is annotated in clear text.
 */
import { useState } from 'react';
import { Search, ShoppingCart, Truck, Minus, Plus, RotateCcw, BadgeCheck } from 'lucide-react';
import { Reveal, Label, Photo, IMG, HeroLayers, VoiceTag, MaterialTag, SealLayers } from '../kit';
import type { TemplateProps } from './types';

const BREAKS = ['1–9 cases', '10–49', '50+'];
const tierIdx = (q: number) => (q >= 50 ? 2 : q >= 10 ? 1 : 0);

export default function WholesaleSite({ world }: TemplateProps) {
  const { copy, tokens: t, picks, hero, archetype } = world;
  const rows = (copy.siblings.length ? copy.siblings : [
    { name: 'Cold-pressed olive oil 500ml', price: 96, slug: 'qm-1', image: '', blurb: '', rating: 4.8 },
    { name: 'Stoneground mustard 250g', price: 84, slug: 'qm-2', image: '', blurb: '', rating: 4.6 },
    { name: 'Sea salt flakes 125g tin', price: 118, slug: 'qm-3', image: '', blurb: '', rating: 4.7 },
    { name: 'Aged balsamic 250ml', price: 72, slug: 'qm-4', image: '', blurb: '', rating: 4.9 },
    { name: 'Chili crisp jar 180g', price: 99, slug: 'qm-5', image: '', blurb: '', rating: 4.5 },
  ]).slice(0, 5).map((s, i) => ({
    sku: `OF-${1000 + i * 137 + (s.slug.length * 71) % 800}`,
    name: s.name,
    pack: [12, 24, 36, 6, 18][i % 5],
    p: [s.price, Math.round(s.price * 0.92), Math.round(s.price * 0.84)],
  }));
  const [qty, setQty] = useState<Record<string, number>>({ [rows[0].sku]: 12 });
  const [drafted, setDrafted] = useState(false);
  const set = (sku: string, v: number) => setQty((q) => ({ ...q, [sku]: Math.max(0, v) }));
  const total = rows.reduce((s, r) => s + (qty[r.sku] || 0) * r.p[tierIdx(qty[r.sku] || 0)], 0);
  const cases = Object.values(qty).reduce((a, b) => a + b, 0);

  const spanText =
    hero === 'offset' ? 'lg:col-span-7' : hero === 'ledger' ? 'lg:col-span-5' : 'lg:col-span-7';
  const spanMedia =
    hero === 'offset' ? 'lg:col-span-5 lg:-mt-10 lg:translate-y-5' : hero === 'ledger' ? 'lg:col-span-7' : 'lg:col-span-5';

  const statStrip = (center = false) => (
    <div className={`grid grid-cols-3 border t-line t-r mt-10 divide-x ${center ? 'mx-auto max-w-xl' : ''}`} style={{ borderColor: 'var(--t-line)' }}>
      {[[copy.stats[2].value, 'Files in the kit'], ['48h', 'Dispatch'], ['−18%', 'At 50+ cases']].map(([v, k]) => (
        <div key={k} className="t-pad-sm" style={{ borderColor: 'var(--t-line)' }}>
          <div className="t-head text-3xl font-bold">{v}</div>
          <Label className="t-muted">{k}</Label>
        </div>
      ))}
    </div>
  );

  const headline = (
    <h1 className="t-display mt-5">
      {copy.headline}<br />{copy.headlineAccent}.
    </h1>
  );

  const heroLayers = (
    <HeroLayers world={{ archetype, picks: picks as unknown as Record<string, string> }} />
  );

  return (
    <div className="t-bg" data-testid="tpl-wholesale">
      <div className="t-bg-primary px-8 py-2 flex justify-between text-xs t-mono">
        <span>TRADE ACCOUNT · NET-30 TERMS</span>
        <span>FREE FREIGHT OVER $1,500 · DISPATCH 48H</span>
      </div>
      <nav className="flex items-center gap-6 px-8 py-4 border-b t-line t-surface">
        <div className="t-head text-2xl font-extrabold tracking-tight">{copy.brand}<span className="t-accent">.</span></div>
        <div className="flex-1 flex items-center gap-2 border t-line t-r px-3 py-2 max-w-xl">
          <Search className="h-4 w-4 t-muted" />
          <span className="t-muted text-sm">Search {copy.stats[2].value} files, kits or SKUs…</span>
        </div>
        <Label className="t-muted hidden md:inline">{copy.offerId} · Tier {copy.edition}</Label>
        <button className="t-btn text-sm"><ShoppingCart className="h-4 w-4" />PO draft</button>
      </nav>

      {/* ══ HERO — warehouse, four arrangements ══════════════════════ */}
      {hero === 'cinema' ? (
        <section className="relative min-h-[86vh] flex items-end" data-testid="wholesale-hero-cinema">
          <Photo src={copy.heroImage || IMG.warehouse} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--t-bg) 92%, transparent), color-mix(in srgb, var(--t-bg) 25%, transparent) 60%, transparent)' }} />
          <div className="relative w-full t-sec">
            {heroLayers}
            <Reveal><Label className="t-primary">{copy.eyebrow}</Label></Reveal>
            {headline}
            <p className="t-muted text-lg mt-6 max-w-xl">{copy.sub}</p>
            <div className="mt-8 max-w-xl">{statStrip()}</div>
          </div>
        </section>
      ) : hero === 'center' ? (
        <section className="t-sec flex flex-col items-center text-center border-b t-line" data-testid="wholesale-hero-center">
          {heroLayers}
          <Reveal><Label className="t-primary">{copy.eyebrow}</Label></Reveal>
          {headline}
          <p className="t-muted text-lg mt-6 max-w-xl">{copy.sub}</p>
          {statStrip(true)}
          <Reveal delay={0.25} className="relative w-full max-w-3xl mt-10 h-[300px] t-zoom t-frame overflow-hidden">
            <Photo src={copy.heroImage || IMG.warehouse} alt="" className="h-full w-full object-cover" />
            <div className="absolute bottom-4 left-4 t-surface t-r t-pad-sm flex items-center gap-3">
              <Truck className="h-5 w-5 t-primary" />
              <div className="text-sm text-left">
                <b>Next pallet cut-off</b>
                <div className="t-muted text-xs">Today 16:00 · {copy.brand} DC</div>
              </div>
            </div>
          </Reveal>
        </section>
      ) : hero === 'mosaic' ? (
        <section className="t-sec grid md:grid-cols-2 t-gap-lg border-b t-line" data-testid="wholesale-hero-mosaic">
          <div className="md:row-span-2">
            {heroLayers}
            <Reveal><Label className="t-primary">{copy.eyebrow}</Label></Reveal>
            {headline}
            <p className="t-muted text-lg mt-6 max-w-md">{copy.sub}</p>
          </div>
          <Reveal delay={0.15} className="t-frame overflow-hidden min-h-[220px]">
            <Photo src={copy.heroImage || IMG.warehouse} alt="" className="h-full w-full object-cover" />
          </Reveal>
          {[[copy.stats[2].value, 'Files in the kit'], ['48h', 'Dispatch'], ['−18%', 'At 50+ cases']].map(([v, k], i) => (
            <Reveal key={k} delay={0.2 + i * 0.06} className="t-card t-pad flex items-end justify-between min-h-[110px]">
              <div>
                <div className="t-head text-3xl font-bold">{v}</div>
                <Label className="t-muted">{k}</Label>
              </div>
              <Truck className="h-5 w-5 t-primary opacity-50" />
            </Reveal>
          ))}
        </section>
      ) : (
        <section className="grid lg:grid-cols-12 border-b t-line" data-testid="wholesale-hero-split">
          <div className={`${spanText} t-sec`}>
            {heroLayers}
            <Reveal><Label className="t-primary">{copy.eyebrow}</Label></Reveal>
            {headline}
            <p className="t-muted text-lg mt-6 max-w-lg">{copy.sub}</p>
            {statStrip()}
          </div>
          <div className={`${spanMedia} relative min-h-[380px] t-zoom`}>
            <Photo src={copy.heroImage || IMG.warehouse} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute bottom-6 left-6 t-surface t-r t-pad-sm flex items-center gap-3">
              <Truck className="h-5 w-5 t-primary" />
              <div className="text-sm">
                <b>Next pallet cut-off</b>
                <div className="t-muted text-xs">Today 16:00 · {copy.brand} DC</div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="flex gap-2 px-8 py-5 overflow-x-auto g-no-scrollbar border-b t-line">
        {['All categories', ...copy.siblings.slice(0, 4).map((s) => s.name), 'Private label'].map((c, i) => (
          <span key={c + i} className={`px-4 py-2 t-r text-sm whitespace-nowrap border t-line t-lift ${i === 0 ? 't-bg-ink' : ''}`}>{c}</span>
        ))}
      </div>

      {/* ── order matrix — the buyer's ledger, dressed by material ─── */}
      <section className="t-sec border-t t-line">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <Label className="t-primary">Bulk order matrix</Label>
              <VoiceTag world={{ picks: picks as unknown as Record<string, string> }} />
            </div>
            <h2 className="t-h2 mt-3">Build the order. Pricing breaks apply live.</h2>
          </div>
          <button className="t-btn t-btn-ghost text-sm"><RotateCcw className="h-4 w-4" />Repeat order #8812</button>
        </div>
        <div className="relative mt-10 border t-line t-r overflow-x-auto t-surface t-card" data-testid="wholesale-matrix">
          <MaterialTag world={{ picks: picks as unknown as Record<string, string> }} />
          <table className="w-full text-sm min-w-[820px]">
            <thead>
              <tr className="border-b t-line text-left t-muted">
                <th className="t-pad-sm font-normal"><Label>SKU</Label></th>
                <th className="t-pad-sm font-normal"><Label>Kit</Label></th>
                <th className="t-pad-sm font-normal"><Label>Case</Label></th>
                {BREAKS.map((b) => <th key={b} className="t-pad-sm font-normal text-right"><Label>{b}</Label></th>)}
                <th className="t-pad-sm font-normal text-center"><Label>Cases</Label></th>
                <th className="t-pad-sm font-normal text-right"><Label>Line</Label></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const q = qty[r.sku] || 0;
                const ti = tierIdx(q);
                return (
                  <tr key={r.sku} className="border-b t-line last:border-0" data-testid={`wholesale-row-${r.sku}`}>
                    <td className="t-pad-sm t-mono t-muted">{r.sku}</td>
                    <td className="t-pad-sm font-medium">{r.name}</td>
                    <td className="t-pad-sm t-muted">×{r.pack}</td>
                    {r.p.map((p, i) => (
                      <td key={i} className={`t-pad-sm text-right t-mono ${q && i === ti ? 't-primary font-bold' : 't-muted'}`}>${p}</td>
                    ))}
                    <td className="t-pad-sm">
                      <div className="flex items-center justify-center border t-line t-r-sm w-fit mx-auto">
                        <button data-testid={`wholesale-dec-${r.sku}`} className="p-2" onClick={() => set(r.sku, q - 1)}><Minus className="h-3 w-3" /></button>
                        <input
                          data-testid={`wholesale-qty-${r.sku}`}
                          value={q}
                          onChange={(e) => set(r.sku, parseInt(e.target.value || '0', 10) || 0)}
                          className="w-12 text-center bg-transparent t-mono outline-none"
                          aria-label={`cases of ${r.name}`}
                        />
                        <button data-testid={`wholesale-inc-${r.sku}`} className="p-2" onClick={() => set(r.sku, q + 1)}><Plus className="h-3 w-3" /></button>
                      </div>
                    </td>
                    <td className="t-pad-sm text-right t-mono font-bold">${(q * r.p[ti]).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 t-bg-ink t-r t-pad">
          <div className="flex gap-10">
            <div><Label className="opacity-60">Cases</Label><div className="t-head text-3xl font-bold" data-testid="wholesale-cases">{cases}</div></div>
            <div><Label className="opacity-60">Order total (ex. VAT)</Label><div className="t-head text-3xl font-bold" data-testid="wholesale-total">${total.toLocaleString()}</div></div>
            <div><Label className="opacity-60">Freight</Label><div className="t-head text-3xl font-bold">{total >= 1500 ? 'Free' : `$${(1500 - total).toLocaleString()} to free`}</div></div>
          </div>
          <button className="t-btn" data-testid="wholesale-submit" onClick={() => setDrafted(true)}>
            {drafted ? `PO drafted · ${cases} cases on net-30 ✓` : 'Submit PO on net-30'}
          </button>
        </div>
      </section>

      {/* ── programme trio — mosaic re-tiles, cards read material ──── */}
      <section className={`t-sec border-t t-line grid t-gap ${hero === 'mosaic' ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
        {[
          [IMG.boxes, 'Mixed-case builder', 'Combine kits to hit pallet pricing.'],
          [IMG.crates, 'Private label programme', 'Your brand, our producers. MOQ 600.'],
          [IMG.condiments, 'Seasonal pre-book', 'Lock Q4 prices before 30 June.'],
        ].map(([src, tt, d], i) => (
          <Reveal key={tt} className={`t-card border t-line t-r overflow-hidden t-lift ${hero === 'mosaic' && i === 0 ? 'md:row-span-2' : ''}`}>
            <div className="t-zoom h-48"><Photo src={src} alt={tt} className="h-full w-full object-cover" /></div>
            <div className="t-pad">
              <BadgeCheck className="h-5 w-5 t-primary" />
              <h3 className="t-head text-xl font-bold mt-3">{tt}</h3>
              <p className="t-muted text-sm mt-1">{d}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ── closing — seal layers ──────────────────────────────────── */}
      <footer className="t-sec border-t t-line relative flex flex-wrap items-end justify-between gap-6">
        <SealLayers world={{ picks: picks as unknown as Record<string, string>, tokens: { bg: t.bg, ink: t.ink } }} />
        <div className="t-head text-4xl font-extrabold tracking-tight">{copy.brand}<span className="t-accent">.</span></div>
        <Label className="t-muted">{copy.footerLine}</Label>
      </footer>
    </div>
  );
}
