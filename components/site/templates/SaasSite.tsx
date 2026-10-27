'use client';
/**
 * Orbit — trial-first SaaS flagship (ported from the Template OS).
 * v3: every genome composition is a REAL structural response — the hero
 * rearranges per arrangement kind (split / offset / ledger / diagonal
 * parameterised; center and cinema and mosaic re-render), display type
 * reads the direction's scale, cards read the material recipe, and the
 * layer inspector annotates every governing layer in clear text.
 */
import { useState } from 'react';
import { ArrowRight, Check, GitBranch, Zap, Shield, Activity } from 'lucide-react';
import { Reveal, Label, Photo, HeroLayers, VoiceTag, MaterialTag, SealLayers } from '../kit';
import type { TemplateProps } from './types';

export default function SaasSite({ world }: TemplateProps) {
  const { copy, tokens: t, picks, hero, archetype } = world;
  const base = copy.price.amount ?? 39;
  const plans = [
    { name: 'Launch', m: 0, y: 0, pts: ['3 projects', 'Release notes', 'Community support'] },
    { name: 'Scale', m: base, y: Math.round(base * 0.8), pts: [...copy.features.slice(0, 3).map((f) => f.title), 'Slack + Linear sync'], hot: true },
    { name: 'Fleet', m: base * 3, y: Math.round(base * 2.4), pts: ['SSO + SCIM', 'Audit trail', 'Dedicated success'] },
  ];
  const [yearly, setYearly] = useState(true);
  const marquee = copy.siblings.length ? copy.siblings.map((s) => s.name.toUpperCase()) : ['LINEARIZE', 'NORTHWIND', 'HELIX/CO', 'QUANTA'];

  /* ── hero spans respond to the arrangement kind ────────────────── */
  const spanText =
    hero === 'offset' ? 'lg:col-span-7' : hero === 'ledger' ? 'lg:col-span-5' : 'lg:col-span-6';
  const spanMedia =
    hero === 'offset' ? 'lg:col-span-5 lg:-mt-12 lg:translate-y-6' : hero === 'ledger' ? 'lg:col-span-7' : 'lg:col-span-6';

  const windowBlock = (
    <div className="t-card t-float relative right-0 top-4 w-[88%] t-pad backdrop-blur-xl" data-testid="saas-hero-window">
      <div className="flex items-center gap-2 pb-4 border-b t-line">
        {[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--t-line)' }} />)}
        <Label className="ml-3 t-muted">{copy.brand.toLowerCase().replace(/\s+/g, '')}.app / releases</Label>
      </div>
      <div className="flex items-end gap-2 h-40 pt-6">
        {[40, 62, 35, 80, 55, 92, 70, 98, 66, 84].map((h, i) => (
          <div key={i} className="flex-1 t-r-sm" style={{ height: `${h}%`, background: i === 7 ? 'var(--t-primary)' : 'var(--t-line)' }} />
        ))}
      </div>
      <div className="grid grid-cols-3 t-gap pt-6">
        {copy.stats.slice(2).map((s) => (
          <div key={s.label}>
            <Label className="t-muted">{s.label}</Label>
            <div className="t-head text-2xl font-semibold mt-1">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const headline = (
    <h1 className="t-display mt-6">
      {copy.headline} <span className="t-primary">{copy.headlineAccent}.</span>
    </h1>
  );
  const ctas = (center = false) => (
    <Reveal delay={0.3} className={`flex flex-wrap gap-3 mt-10 ${center ? 'justify-center' : ''}`}>
      <button className="t-btn" data-testid="saas-hero-cta">{copy.cta} <ArrowRight className="h-4 w-4" /></button>
      <button className="t-btn t-btn-ghost">{copy.ctaGhost}</button>
    </Reveal>
  );
  const heroLayers = (
    <HeroLayers world={{ archetype, picks: picks as unknown as Record<string, string> }} />
  );

  return (
    <div className="relative overflow-hidden t-bg" data-testid="tpl-saas">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-[-10%] h-[620px] w-[620px] rounded-full opacity-25 blur-[120px]" style={{ background: 'var(--t-primary)' }} />
        <div className="absolute top-40 left-[-15%] h-[420px] w-[420px] rounded-full opacity-20 blur-[120px]" style={{ background: 'var(--t-accent)' }} />
      </div>
      <nav className="sticky top-0 z-20 flex items-center justify-between px-8 py-4 border-b t-line backdrop-blur-xl" style={{ background: 'color-mix(in srgb, var(--t-bg) 72%, transparent)' }}>
        <div className="t-head text-xl font-bold flex items-center gap-2">
          <span className="h-3 w-3 rounded-full t-bg-primary" />
          {copy.brand}
        </div>
        <div className="hidden md:flex gap-8 text-sm t-muted">
          {copy.navLinks.map((l) => <span key={l}>{l}</span>)}
        </div>
        <button className="t-btn text-sm" data-testid="saas-nav-cta">{copy.cta}</button>
      </nav>

      {/* ══ HERO — four structural arrangements ══════════════════════ */}
      {hero === 'cinema' ? (
        <section className="t-sec relative min-h-[86vh] flex items-end" data-testid="saas-hero-cinema">
          {copy.heroImage && (
            <>
              <Photo src={copy.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--t-bg) 88%, transparent), color-mix(in srgb, var(--t-bg) 30%, transparent) 55%, transparent)' }} />
            </>
          )}
          <div className="relative w-full">
            {heroLayers}
            <Reveal><Label className="t-primary">01 — {copy.eyebrow}</Label></Reveal>
            {headline}
            <Reveal delay={0.2}><p className="t-muted text-lg mt-6 max-w-xl">{copy.sub}</p></Reveal>
            {ctas()}
            <div className="t-card t-float absolute right-0 bottom-0 hidden xl:block w-[340px] t-pad" aria-hidden>
              <Label className="t-muted">{copy.brand.toLowerCase().replace(/\s+/g, '')}.app / releases</Label>
              <div className="flex items-end gap-1.5 h-24 pt-4">
                {[40, 62, 35, 80, 55, 92, 70, 98].map((h, i) => (
                  <div key={i} className="flex-1 t-r-sm" style={{ height: `${h}%`, background: i === 7 ? 'var(--t-primary)' : 'var(--t-line)' }} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : hero === 'center' ? (
        <section className="t-sec relative flex flex-col items-center text-center" data-testid="saas-hero-center">
          {heroLayers}
          <Reveal><Label className="t-primary">01 — {copy.eyebrow}</Label></Reveal>
          <Reveal delay={0.1}>{headline}</Reveal>
          <Reveal delay={0.2}><p className="t-muted text-lg mt-6 max-w-xl mx-auto">{copy.sub}</p></Reveal>
          {ctas(true)}
          <Reveal delay={0.4} className="relative w-full max-w-2xl mt-16" style={{ perspective: '1200px' }}>
            <div className="t-float relative">{windowBlock}</div>
            <div className="t-float-2 absolute -right-6 -top-8 t-bg-primary t-r t-pad-sm shadow-2xl flex items-center gap-3 text-left">
              <Check className="h-5 w-5" />
              <div>
                <div className="text-sm font-semibold">Deploy #4821 shipped</div>
                <div className="text-xs opacity-70">Notes sent to 3,204 users</div>
              </div>
            </div>
          </Reveal>
          <Label className="t-muted block mt-10">No card · {copy.policies[0]} · {copy.stats[1].value} kits sold</Label>
        </section>
      ) : hero === 'mosaic' ? (
        <section className="t-sec relative grid md:grid-cols-2 t-gap-lg" data-testid="saas-hero-mosaic">
          <div className="md:row-span-2 relative">
            {heroLayers}
            <Reveal><Label className="t-primary">01 — {copy.eyebrow}</Label></Reveal>
            {headline}
            <Reveal delay={0.2}><p className="t-muted text-lg mt-6 max-w-md">{copy.sub}</p></Reveal>
            {ctas()}
          </div>
          <Reveal delay={0.15} className="relative" style={{ perspective: '1200px' }}>{windowBlock}</Reveal>
          {copy.stats.slice(0, 2).map((s, i) => (
            <Reveal key={s.label} delay={0.25 + i * 0.08} className="t-card t-pad flex items-end justify-between min-h-[120px]">
              <div>
                <Label className="t-muted">{s.label}</Label>
                <div className="t-head text-4xl font-semibold mt-1">{s.value}</div>
              </div>
              <span className="h-2 w-2 rounded-full t-pulse" style={{ background: 'var(--t-accent)' }} />
            </Reveal>
          ))}
        </section>
      ) : (
        <section className="t-sec relative grid lg:grid-cols-12 t-gap-lg items-center" data-testid="saas-hero-split">
          {heroLayers}
          {copy.heroImage && <Photo src={copy.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 pointer-events-none" />}
          <div className={`${spanText} relative`}>
            <Reveal><Label className="t-primary">01 — {copy.eyebrow}</Label></Reveal>
            {headline}
            <Reveal delay={0.2}><p className="t-muted text-lg mt-6 max-w-lg">{copy.sub}</p></Reveal>
            {ctas()}
            <Label className="t-muted block mt-8">No card · {copy.policies[0]} · {copy.stats[1].value} kits sold</Label>
          </div>
          <div className={`${spanMedia} relative`} style={{ perspective: '1200px' }}>
            {windowBlock}
            <div className="t-float-2 absolute left-0 bottom-10 w-64 t-bg-primary t-r t-pad-sm shadow-2xl flex items-center gap-3">
              <Check className="h-5 w-5" />
              <div>
                <div className="text-sm font-semibold">Deploy #4821 shipped</div>
                <div className="text-xs opacity-70">Notes sent to 3,204 users</div>
              </div>
            </div>
            <div className="t-float absolute left-16 top-0 t-surface border t-line t-r t-pad-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full t-pulse" style={{ background: 'var(--t-accent)' }} />
              <Label>Live · 214 reading</Label>
            </div>
          </div>
        </section>
      )}

      <div className="border-y t-line overflow-hidden py-6">
        <div className="t-marquee t-mono text-sm t-muted">
          {[...Array(2)].flatMap((_, k) => marquee.map((n) => <span key={n + k} className="px-8">{n}</span>))}
        </div>
      </div>

      {/* ── capabilities — mosaic re-tiles the grid, cards read material ── */}
      <section className="t-sec relative">
        <Reveal>
          <div className="flex items-center gap-3">
            <Label className="t-primary">02 — Capabilities</Label>
            <VoiceTag world={{ picks: picks as unknown as Record<string, string> }} />
          </div>
          <h2 className="t-h2 mt-4 max-w-2xl">Everything between merge and &ldquo;wow, they shipped that?&rdquo;</h2>
        </Reveal>
        <div className={`grid grid-cols-1 md:grid-cols-12 t-gap mt-12 ${hero === 'mosaic' ? 'md:!grid-cols-6' : ''}`}>
          {([
            [GitBranch, copy.features[0]],
            [Zap, copy.features[1] ?? copy.features[0]],
            [Shield, copy.features[2] ?? copy.features[0]],
            [Activity, copy.features[3] ?? copy.features[0]],
          ] as const).map(([Icon, f], i) => (
            <Reveal
              key={f.id + i}
              delay={i * 0.08}
              className={
                hero === 'mosaic'
                  ? i % 4 === 0 ? 'md:col-span-4' : i % 4 === 1 ? 'md:col-span-2' : i % 4 === 2 ? 'md:col-span-2' : 'md:col-span-4'
                  : i % 4 === 0 || i % 4 === 3 ? 'md:col-span-7' : 'md:col-span-5'
              }
            >
              <div className="t-card t-pad h-full min-h-[220px] flex flex-col justify-between t-lift relative" data-testid={`saas-feature-${i}`}>
                {i === 0 && <MaterialTag world={{ picks: picks as unknown as Record<string, string> }} />}
                <Icon className="h-6 w-6 t-primary" />
                <div>
                  <h3 className="t-head text-2xl font-semibold">{f.title}</h3>
                  <p className="t-muted mt-2 max-w-md">{f.promise}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── pricing — centred under the monument composition ───────── */}
      <section className={`t-sec border-t t-line ${hero === 'center' ? 'text-center' : 'flex flex-wrap items-end justify-between gap-6'}`}>
        <div className={hero === 'center' ? 'mx-auto' : ''}>
          <Label className="t-primary">03 — Pricing</Label>
          <h2 className="t-h2 mt-4">Start free. Scale when it sticks.</h2>
        </div>
        <button data-testid="saas-billing-toggle" onClick={() => setYearly(!yearly)} className={`t-surface border t-line t-r flex p-1 text-sm ${hero === 'center' ? 'mx-auto mt-6' : ''}`}>
          {['Monthly', 'Yearly −20%'].map((l, i) => (
            <span key={l} className={`px-4 py-2 t-r-sm t-lift ${yearly === !!i ? 't-bg-primary' : 't-muted'}`}>{l}</span>
          ))}
        </button>
        <div className="grid md:grid-cols-3 t-gap mt-12 w-full">
          {plans.map((p) => (
            <div key={p.name} className={`t-card t-pad border t-lift ${p.hot ? '' : ''}`} data-testid={`saas-plan-${p.name.toLowerCase()}`}>
              <div className="flex justify-between">
                <h3 className="t-head text-xl font-semibold">{p.name}</h3>
                {p.hot && <Label className="t-primary">Most picked</Label>}
              </div>
              <div className="t-head text-5xl font-semibold mt-6 tracking-tight" data-testid={`saas-price-${p.name.toLowerCase()}`}>
                ${yearly ? p.y : p.m}
                <span className="text-base t-muted font-normal">/mo</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-left">
                {p.pts.map((x) => <li key={x} className="flex gap-2"><Check className="h-4 w-4 t-primary" />{x}</li>)}
              </ul>
              <button className={`t-btn w-full justify-center mt-8 ${p.hot ? '' : 't-btn-ghost'}`}>{p.m ? 'Start 14-day trial' : 'Start free'}</button>
            </div>
          ))}
        </div>
      </section>

      {/* ── closing — the seal layers annotate atmosphere + detail ─── */}
      <section className="t-sec border-t t-line relative flex flex-wrap items-end justify-between gap-8">
        <SealLayers world={{ picks: picks as unknown as Record<string, string>, tokens: { bg: t.bg, ink: t.ink } }} />
        <h2 className="t-h2 max-w-3xl">Your next launch deserves an audience.</h2>
        <button className="t-btn">Create workspace <ArrowRight className="h-4 w-4" /></button>
      </section>
    </div>
  );
}
