'use client';
/**
 * OMNIFORGE · SiteFrame — the smaller-frame preview.
 *
 * Renders the IDENTICAL real product site (SiteTemplate, same genome
 * resolution, same engine + mode) at a true 1280px desktop viewport and
 * scales it to fit any container. What you see in a card is exactly what
 * the full-size review shows — pixel-for-pixel, never a different mockup.
 *
 * mode="crop"  — shows the first `crop` site-pixels (cards, atelier)
 * mode="full"  — measures and shows the whole page (studio preview)
 * archetype    — force a flagship design (the atelier stages any example
 *                in any of the eight worlds)
 */
import { useEffect, useRef, useState } from 'react';
import { findSiteEntryBySlug, type SiteIndexEntry } from '@/lib/site-preview';
import { SiteTemplate, useSiteWorld } from './SiteTemplate';

const VIEWPORT_W = 1280;

export function SiteFrame({
  entry,
  slug,
  archetype,
  crop = 900,
  mode = 'crop',
  className = '',
  interactive = false,
  ariaLabel,
}: {
  entry?: SiteIndexEntry | null;
  slug?: string;
  /** force a flagship design — the atelier stages any example in any world */
  archetype?: string;
  crop?: number;
  mode?: 'crop' | 'full';
  className?: string;
  interactive?: boolean;
  ariaLabel?: string;
}) {
  const resolved = entry ?? (slug ? findSiteEntryBySlug(slug) : null);
  const world = useSiteWorld(resolved as SiteIndexEntry, { archetype });
  const holder = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  const [innerH, setInnerH] = useState(0);

  useEffect(() => {
    const el = holder.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(el);
    setW(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (mode !== 'full' || !inner.current) return;
    const el = inner.current;
    const measure = () => setInnerH(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const imgs = el.querySelectorAll('img');
    const onImg = () => measure();
    imgs.forEach((img) => {
      if (img.complete) onImg();
      else img.addEventListener('load', onImg);
    });
    return () => {
      ro.disconnect();
      imgs.forEach((img) => img.removeEventListener('load', onImg));
    };
  }, [mode, world]);

  if (!resolved) return <div className={`t-surface ${className}`} aria-hidden />;

  const scale = w ? w / VIEWPORT_W : 0;
  const boxH = mode === 'full' ? innerH * scale : crop * scale;
  return (
    <div
      ref={holder}
      className={`relative overflow-hidden ${interactive ? '' : 'pointer-events-none select-none'} ${className}`}
      style={{ height: boxH || undefined }}
      role="img"
      aria-label={ariaLabel ?? `${world.copy.brand} — live product site preview`}
      data-testid="site-frame"
    >
      {scale > 0 && (
        <div
          ref={inner}
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: VIEWPORT_W, transform: `scale(${scale})` }}
        >
          <SiteTemplate world={world} />
        </div>
      )}
      {mode === 'crop' && (
        /* soft bottom fade so the crop reads as "continues below" */
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14"
          style={{ background: 'linear-gradient(to top, var(--t-bg, transparent), transparent)' }}
        />
      )}
    </div>
  );
}
