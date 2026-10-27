'use client';
/**
 * Atlas — enterprise platform authority flagship (ported from the
 * Template OS). v3: the briefing room recomposes per genome switch —
 * centered authority, offset metrics, numbered grid rows, full-bleed
 * masthead frame, controlled compliance mosaic, sheared briefing flow —
 * the material recipe dresses the ledger surfaces, layers annotated.
 */
import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal, Label, HeroLayers, VoiceTag, MaterialTag, SealLayers } from '../kit';
import type { TemplateProps } from './types';

export default function AtlasSite({ world }: TemplateProps) {
  const { copy, tokens: t, picks, hero, archetype } = world;
  const [sent, setSent] = useState(false);
  const ledger = copy.policies.map((p, i) => [
    p,
    i === copy.policies.length - 1 ? 'In process' : 'Certified',
    i === copy.policies.length - 1 ? 'Q4 2026' : `Mar 202${6 - (i % 3)}`,
  ] as [string, string, string]);
  const layers = copy.features.slice(0, 4).map((f, i) => [`0${i + 1}`, f.title, f.promise] as const);
  const metrics: [string, string][] = [
    [copy.stats[0].value + '/5', 'Contracted buyer rating'],
    [copy.stats[1].value, 'Kits sold'],
    [copy.stats[2].value, 'Files per kit'],
    ['0', 'Material breaches'],
  ];

  const picksRec = picks as unknown as Record<string, string>;
  const heroLayers = <HeroLayers world={{ archetype, picks: picksRec }} />;

  const headline = (
    <Reveal>
      <h1 className="t-display mt-6">
        {copy.headline}<br />{copy.headlineAccent}<span className="t-primary">.</span>
      </h1>
    </Reveal>
  );
  const subCta = (
    <>
      <p className="t-muted">{copy.sub}</p>
      <button className="t-btn justify-between" data-testid="atlas-hero-cta">
        {copy.cta} <ArrowRight className="h-4 w-4" />
      </button>
    </>
  );

  return (
    <div className={`t-bg ${hero === 'diagonal' ? 'g-shear' : ''}`} data-testid="tpl-atlas">
      {/* grid masthead */}
      <nav className="grid grid-cols-12 border-b t-line">
        <div className="col-span-6 md:col-span-3 t-pad-sm border-r t-line t-head text-xl font-extrabold">{copy.brand.toUpperCase()}</div>
        <div className="hidden md:flex col-span-6 t-pad-sm gap-8 text-sm items-center">
          {copy.navLinks.map((l) => <span key={l}>{l}</span>)}
        </div>
        <button className="col-span-6 md:col-span-3 t-bg-primary t-pad-sm text-sm font-semibold flex items-center justify-between">
          Talk to sales <ArrowRight className="h-4 w-4" />
        </button>
      </nav>

      {/* ══ BRIEFING HERO — four arrangements ════════════════════════ */}
      {hero === 'cinema' ? (
        <section className="relative border-b t-line" data-testid="atlas-hero-cinema">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(120% 90% at 80% 0%, color-mix(in srgb, var(--t-primary) 10%, transparent), transparent 60%)' }} />
          <div className="relative t-sec">
            {heroLayers}
            <Label className="t-muted">{copy.familyLabel} / 2026</Label>
            {headline}
            <div className="max-w-xl mt-8">{subCta}</div>
          </div>
        </section>
      ) : hero === 'center' ? (
        <section className="border-b t-line t-sec text-center" data-testid="atlas-hero-center">
          {heroLayers}
          <Label className="t-muted">{copy.familyLabel} / 2026</Label>
          <div className="max-w-4xl mx-auto">{headline}</div>
          <div className="max-w-xl mx-auto mt-8 flex flex-col gap-6 items-center">{subCta}</div>
        </section>
      ) : hero === 'mosaic' ? (
        <section className="grid md:grid-cols-3 border-b t-line" data-testid="atlas-hero-mosaic">
          <div className="md:col-span-2 md:row-span-2 t-sec border-r t-line">
            {heroLayers}
            <Label className="t-muted">{copy.familyLabel} / 2026</Label>
            {headline}
            <p className="t-muted max-w-md mt-6">{copy.sub}</p>
          </div>
          {metrics.map(([v, k]) => (
            <div key={k} className="t-card t-pad border-b t-line last:border-0 flex flex-col justify-center min-h-[120px]">
              <div className="t-head text-3xl font-extrabold tracking-tight">{v}</div>
              <Label className="t-muted">{k}</Label>
            </div>
          ))}
          <div className="t-pad border-r t-line flex items-end">{null}</div>
          <div className="t-pad">{subCta}</div>
        </section>
      ) : (
        <section className="grid grid-cols-12 border-b t-line" data-testid={`atlas-hero-${hero}`}>
          <div className={`col-span-12 ${hero === 'ledger' ? 'lg:col-span-8' : 'lg:col-span-9'} t-sec border-r t-line relative`}>
            {heroLayers}
            <Label className="t-muted">{copy.familyLabel} / 2026</Label>
            {headline}
          </div>
          <div className={`col-span-12 ${hero === 'ledger' ? 'lg:col-span-4' : 'lg:col-span-3'} t-sec flex flex-col justify-end gap-6 ${hero === 'offset' ? 'lg:translate-y-4' : ''}`}>
            {subCta}
          </div>
        </section>
      )}

      {/* contracted metrics — grid keeps the divided strip */}
      {hero !== 'mosaic' && hero !== 'center' && (
        <section className="grid grid-cols-2 lg:grid-cols-4 border-b t-line">
          {metrics.map(([v, k], i) => (
            <div key={k} className={`t-sec !py-10 ${i < 3 ? 'border-r' : ''} t-line`}>
              <div className="t-head text-5xl font-extrabold tracking-tight">{v}</div>
              <Label className="t-muted">{k}</Label>
            </div>
          ))}
        </section>
      )}

      {/* planes — ledger numbers every row; mosaic tiles them */}
      <section className="grid grid-cols-12 border-b t-line">
        <div className={`col-span-12 ${hero === 'mosaic' ? 'lg:col-span-12' : 'lg:col-span-4'} t-sec border-r t-line`}>
          <div className="flex items-center gap-3">
            <Label className="t-primary">§ 02 What ships</Label>
            <VoiceTag world={{ picks: picksRec }} />
          </div>
          <h2 className="t-h2 mt-4">{copy.stats[2].value} files. One audit trail.</h2>
        </div>
        <div className={`col-span-12 ${hero === 'mosaic' ? 'lg:col-span-12 grid md:grid-cols-2' : 'lg:col-span-8'}`}>
          {layers.map(([n, tt, d]) => (
            <div key={n} className={`grid grid-cols-12 border-b t-line last:border-0 t-lift hover:t-surface ${hero === 'mosaic' ? 'md:last:border-b' : ''}`}>
              <span className="col-span-2 t-pad t-mono t-muted">{n}</span>
              <span className="col-span-4 t-pad font-bold text-xl">{tt}</span>
              <span className="col-span-6 t-pad t-muted">{d}</span>
            </div>
          ))}
        </div>
      </section>

      {/* compliance ledger — dressed by the material recipe */}
      <section className="t-sec border-b t-line relative">
        <div className="flex items-center gap-3">
          <Label className="t-primary">§ 03 The license ledger</Label>
          <MaterialTag world={{ picks: picksRec }} />
        </div>
        <div className="mt-8 t-card border t-line" data-testid="atlas-ledger">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 t-border-ink">
                <th className="py-3 t-pad-sm"><Label>Policy</Label></th>
                <th className="t-pad-sm"><Label>Status</Label></th>
                <th className="t-pad-sm"><Label>Last review</Label></th>
              </tr>
            </thead>
            <tbody>
              {ledger.map(([f, s, d]) => (
                <tr key={f} className="border-b t-line last:border-0">
                  <td className="py-4 t-pad-sm font-semibold">{f}</td>
                  <td className="flex items-center gap-2 py-4 t-pad-sm">
                    {s === 'In process' ? <span className="h-2 w-2 t-bg-primary" /> : <Check className="h-4 w-4" />}
                    {s}
                  </td>
                  <td className="t-mono t-muted t-pad-sm">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* quote + sales form */}
      <section className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-7 t-sec border-r t-line">
          <p className="t-h2 font-bold tracking-tight leading-tight">&ldquo;{copy.review.quote}&rdquo;</p>
          <Label className="t-muted block mt-6">{copy.review.name} · {copy.review.role}</Label>
        </div>
        <form
          className="col-span-12 lg:col-span-5 t-sec space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <Label>Contact sales</Label>
          {['Work email', 'Company', 'Project scale'].map((p) => (
            <input
              key={p}
              required
              placeholder={p}
              className="w-full bg-transparent border-b t-line py-3 outline-none focus:border-current"
              data-testid={`atlas-input-${p.split(' ')[0].toLowerCase()}`}
            />
          ))}
          <button className="t-btn w-full justify-between" data-testid="atlas-contact-submit">
            {sent ? 'Received — we reply within 1 business day' : copy.cta} <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </section>

      <footer className="t-sec border-t t-line relative">
        <SealLayers world={{ picks: picksRec, tokens: { bg: t.bg, ink: t.ink } }} />
        <Label className="t-muted">{copy.offerId} · plate No. {copy.plateNo} · {copy.footerLine}</Label>
      </footer>
    </div>
  );
}
