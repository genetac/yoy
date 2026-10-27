'use client';
/**
 * Terroir — restaurant flagship (ported from the Template OS).
 * v3: the dining room recomposes per genome switch — centered statement,
 * lifted panorama overlap, numbered service ledger, edge-to-edge room
 * frame, hospitality mosaic, sheared larder flow — the material recipe
 * dresses the menu and booking surfaces, layers annotated in clear text.
 */
import { useState } from 'react';
import { Reveal, Label, Photo, IMG, HeroLayers, VoiceTag, MaterialTag, SealLayers } from '../kit';
import type { TemplateProps } from './types';

const TIMES = ['18:00', '18:30', '19:15', '20:00', '20:45', '21:30'];

function Booking({ copy, picksRec }: { copy: TemplateProps['world']['copy']; picksRec: Record<string, string> }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });
  const [size, setSize] = useState(2);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState('19:15');
  const [done, setDone] = useState(false);
  const chip = (on: boolean) => `px-4 py-3 border t-line t-r t-lift ${on ? 't-bg-primary' : ''}`;
  return (
    <div className="t-card t-pad border t-line t-r relative" data-testid="terroir-booking">
      <MaterialTag world={{ picks: picksRec }} />
      <Label className="t-accent">Reserve</Label>
      {done ? (
        <div className="g-rise g-shown py-10" data-testid="terroir-booking-confirm">
          <p className="t-h2 italic">Your table is held.</p>
          <p className="t-muted mt-3">{size} guests · {days[day].toDateString()} · {time}. We&rsquo;ll confirm by email within the hour.</p>
          <button className="t-btn t-btn-ghost mt-6" onClick={() => setDone(false)}>Change booking</button>
        </div>
      ) : (
        <div className="space-y-6 mt-6">
          <div>
            <div className="text-sm t-muted mb-2">Guests</div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <button key={n} data-testid={`terroir-size-${n}`} className={chip(size === n)} onClick={() => setSize(n)}>{n}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm t-muted mb-2">Evening</div>
            <div className="flex flex-wrap gap-2">
              {days.map((d, i) => (
                <button key={i} data-testid={`terroir-day-${i}`} className={chip(day === i)} onClick={() => setDay(i)}>
                  <span className="t-mono text-xs">{d.toLocaleDateString('en', { weekday: 'short' })}</span> {d.getDate()}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm t-muted mb-2">Time</div>
            <div className="flex flex-wrap gap-2">
              {TIMES.map((tt) => (
                <button key={tt} data-testid={`terroir-time-${tt}`} className={chip(time === tt)} onClick={() => setTime(tt)}>{tt}</button>
              ))}
            </div>
          </div>
          <button className="t-btn w-full justify-center" data-testid="terroir-book-submit" onClick={() => setDone(true)}>Request table for {size}</button>
        </div>
      )}
    </div>
  );
}

export default function TerroirSite({ world }: TemplateProps) {
  const { copy, tokens: t, picks, hero, archetype } = world;
  const menu = [
    {
      h: 'To begin',
      items: copy.features.slice(0, 3).map((f, i) => [f.title, 12 + i * 2] as [string, number]),
    },
    {
      h: 'From the fire',
      items: (copy.siblings.length ? copy.siblings : []).slice(0, 3).map((s, i) => [s.name, 22 + i * 6] as [string, number]),
    },
  ];
  const picksRec = picks as unknown as Record<string, string>;
  const heroLayers = <HeroLayers world={{ archetype, picks: picksRec }} />;
  const roomPanorama = (className = '') => (
    <Photo src={copy.heroImage || IMG.restaurant} alt="The room" className={`h-full w-full object-cover t-kenburns ${className}`} />
  );

  const statement = (
    <Reveal>
      <h1 className="t-display font-light">
        {copy.headline} <em className="t-accent">{copy.headlineAccent}</em>.
      </h1>
    </Reveal>
  );
  const sub = (
    <Reveal delay={0.2}>
      <p className="t-muted text-lg leading-relaxed">{copy.sub}</p>
      <Label className="t-accent block mt-6">{copy.eyebrow} · Open Wed–Sun</Label>
    </Reveal>
  );

  return (
    <div className="t-bg" data-testid="tpl-terroir">
      <nav className="flex items-center justify-between t-sec !py-8">
        <span className="t-head text-3xl italic">{copy.brand}</span>
        <div className="hidden md:flex gap-10 text-sm t-muted">
          {copy.navLinks.map((l) => <span key={l}>{l}</span>)}
        </div>
        <button className="t-btn text-sm">{copy.cta}</button>
      </nav>

      {/* ══ THE ROOM — four arrangements ═════════════════════════════ */}
      {hero === 'cinema' ? (
        <div className="relative h-[92vh] min-h-[560px] flex items-end" data-testid="terroir-hero-cinema">
          {roomPanorama()}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--t-bg) 92%, transparent), transparent 62%)' }} />
          <div className="relative w-full t-sec">
            {heroLayers}
            {statement}
            <div className="max-w-xl mt-4">{sub}</div>
          </div>
        </div>
      ) : hero === 'center' ? (
        <>
          <div className="h-[68vh] min-h-[440px] overflow-hidden mx-auto w-full max-w-5xl t-frame" data-testid="terroir-hero-center">{roomPanorama()}</div>
          <section className="t-sec text-center max-w-3xl mx-auto">
            {heroLayers}
            {statement}
            <div className="mt-4">{sub}</div>
          </section>
        </>
      ) : hero === 'mosaic' ? (
        <section className="t-sec grid md:grid-cols-2 t-gap-lg" data-testid="terroir-hero-mosaic">
          <div className="md:row-span-2">{heroLayers}{statement}<div className="mt-4">{sub}</div></div>
          <div className="t-frame overflow-hidden min-h-[300px]">{roomPanorama()}</div>
          <div className="t-card t-pad border t-line t-r flex flex-col justify-center">
            <Label className="t-accent">Tonight</Label>
            <div className="t-head text-2xl mt-2">{copy.stats[0].value} buyer rating · {copy.stats[1].value} tables hosted</div>
          </div>
        </section>
      ) : (
        <div className={`relative h-[78vh] min-h-[480px] overflow-hidden mx-[calc(var(--t-space)*2.5rem)] t-frame ${hero === 'diagonal' ? 'g-crop-diagonal' : ''}`} data-testid={`terroir-hero-${hero}`}>
          {heroLayers}
          {roomPanorama()}
        </div>
      )}

      {hero !== 'cinema' && hero !== 'center' && hero !== 'mosaic' && (
        <section className="t-sec grid lg:grid-cols-12 t-gap-lg">
          <Reveal className={hero === 'ledger' ? 'lg:col-span-7' : 'lg:col-span-8'}>
            {statement}
          </Reveal>
          <div className={`${hero === 'ledger' ? 'lg:col-span-5' : 'lg:col-span-4'} self-end`}>{sub}</div>
        </section>
      )}

      {/* ── menu + booking — ledger numbers the service, material dresses ── */}
      <section className={`t-sec border-t t-line grid lg:grid-cols-12 t-gap-lg ${hero === 'mosaic' ? 'lg:!grid-cols-6' : ''}`}>
        <div className={`${hero === 'mosaic' ? 'lg:col-span-3' : 'lg:col-span-6'} space-y-14`}>
          <div className="flex items-center gap-3">
            <Label className="t-accent">{copy.familyLabel} · plate No. {copy.plateNo}</Label>
            <VoiceTag world={{ picks: picksRec }} />
          </div>
          {menu.map((course) => (
            <div key={course.h}>
              <h3 className="t-head text-3xl italic mb-6">{course.h}</h3>
              {course.items.map(([n, p]) => (
                <div key={n} className="flex items-baseline gap-3 py-3">
                  <span className="text-lg">{n}</span>
                  <span className="flex-1 border-b border-dotted" style={{ borderColor: 'var(--t-muted)' }} />
                  <span className="t-mono">{p}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={hero === 'mosaic' ? 'lg:col-span-3' : 'lg:col-span-6'}>
          <Booking copy={copy} picksRec={picksRec} />
        </div>
      </section>

      {/* ── larder — shears on the diagonal flow ───────────────────── */}
      <section className="t-sec grid md:grid-cols-2 t-gap-lg items-center border-t t-line relative">
        <div className={`t-zoom aspect-[4/3] t-frame ${hero === 'diagonal' ? 'g-crop-diagonal' : ''}`}><Photo src={IMG.pantry} alt="The larder" className="h-full w-full object-cover" /></div>
        <Reveal>
          <Label className="t-accent">The larder</Label>
          <p className="t-h2 leading-tight mt-4">&ldquo;{copy.review.quote}&rdquo;</p>
          <Label className="t-muted block mt-6">— {copy.review.name} · {copy.review.role}</Label>
        </Reveal>
      </section>

      <footer className="t-sec border-t t-line relative flex flex-wrap items-end justify-between gap-4">
        <SealLayers world={{ picks: picksRec, tokens: { bg: t.bg, ink: t.ink } }} />
        <Label className="t-muted">{copy.footerLine}</Label>
      </footer>
    </div>
  );
}
