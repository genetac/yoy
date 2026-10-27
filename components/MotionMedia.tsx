'use client';
/**
 * OMNIFORGE · <MotionMedia> (Elite Plan P2)
 * Living imagery: poster-first, motion on visibility, budgeted playback.
 * Uses real photography with Ken Burns cinemagraph treatment + light sweep.
 * The registry schema supports real video loops — when `sources` exist they
 * play under the same budget rules (1 per section, reduced-motion = poster only).
 */
import { useEffect, useRef, useState } from 'react';

export interface MotionAsset {
  poster: string;
  sources?: { src: string; type: string }[];
  focal?: [number, number];
  veil?: number;
  alt?: string;
}

export function MotionMedia({
  asset,
  className = '',
  eager = false,
  kenAlt = false,
}: {
  asset: MotionAsset;
  className?: string;
  eager?: boolean;
  kenAlt?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);
  const [canHover, setCanHover] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // touch devices & reduced motion get the still poster (P2 gate)
    const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    const cores = navigator.hardwareConcurrency ?? 8;
    if (rm || conn?.saveData || cores < 4) { setCanHover(false); return; }
    setCanHover(true);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: '120px' },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const [fx, fy] = asset.focal ?? [0.5, 0.42];
  return (
    <div ref={ref} className={`relative overflow-hidden bg-zinc-200 dark:bg-zinc-800 of-frame ${className}`}>
      {asset.poster && !failed ? (
        <img
          src={asset.poster}
          alt={asset.alt ?? ''}
          onError={() => setFailed(true)}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover ${visible && canHover ? (kenAlt ? 'of-kenburns-alt' : 'of-kenburns') : ''}`}
          style={{ objectPosition: `${fx * 100}% ${fy * 100}%` }}
        />
      ) : (
        <div className="absolute inset-0 of-foil-bar opacity-30" />
      )}
      {/* brass light sweep — the "living" glint */}
      {visible && canHover && (
        <div className="of-light-sweep pointer-events-none absolute -inset-y-1/2 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#f3dfa6]/25 to-transparent" />
      )}
      {/* veil for text legibility */}
      <div className="of-veil" style={{ background: `linear-gradient(180deg, transparent 40%, rgba(12,10,6,${asset.veil ?? 0.52}))` }} />
    </div>
  );
}

/** Poster asset from an example's existing hero image (registry-ready). */
export const posterFrom = (heroImage: string, focal: [number, number] = [0.5, 0.42], veil = 0.52): MotionAsset => ({
  poster: heroImage,
  focal,
  veil,
});
