'use client';

import { useEffect, useRef, useState } from 'react';

export const FRAME_COUNT = 12;
export const FRAME_PATHS = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/frames/frame_${String(i + 1).padStart(3, '0')}.jpg`,
);

/**
 * Tracks scroll progress (0..1) of a tall section, where 0 = section top hits
 * viewport top, and 1 = section bottom hits viewport bottom (i.e. the sticky
 * inner element is about to leave the screen). Used to drive the frame-scrub
 * effect.
 */
export function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      rafRef.current = null;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // scrollable distance = section height - viewport height
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      // distance the section top has moved above the viewport top
      const scrolled = Math.min(scrollable, Math.max(0, -rect.top));
      setProgress(scrolled / scrollable);
    };

    const onScroll = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [ref]);

  return progress;
}

/**
 * Preloads all frame images, returning the number loaded so far. Useful for
 * showing a loading state until the entire sequence is cached.
 */
export function useFramePreload(paths: string[]) {
  const [loaded, setLoaded] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let count = 0;
    // Defer the reset so we don't synchronously call setState inside the
    // effect body (which the React lint rule forbids).
    Promise.resolve().then(() => {
      if (cancelled) return;
      count = 0;
      setLoaded(0);
      setDone(false);

      paths.forEach((src) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          if (cancelled) return;
          count += 1;
          setLoaded(count);
          if (count === paths.length) setDone(true);
        };
        img.src = src;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [paths]);

  return { loaded, total: paths.length, done };
}
