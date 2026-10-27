"use client";

/* ════════════════════════════════════════════════════════════════════
   useTilt (build plan v3 · P4/T1) — pointer parallax for Website Kit
   plates. Writes CSS variables via a ref (no React state per frame),
   rAF-throttled, max 6°, resets 150ms after leave. Disabled on touch
   and reduced motion.
   ════════════════════════════════════════════════════════════════════ */

import { useEffect, useRef } from "react";

export function useTilt(maxDeg = 6) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return; /* touch */

    let raf = 0;
    let pending: { x: number; y: number } | null = null;
    let resetTimer: ReturnType<typeof setTimeout> | null = null;

    const apply = () => {
      raf = 0;
      if (!pending) return;
      const rect = el.getBoundingClientRect();
      const px = (pending.x - rect.left) / rect.width - 0.5;
      const py = (pending.y - rect.top) / rect.height - 0.5;
      const clampedX = Math.max(-0.5, Math.min(0.5, px));
      const clampedY = Math.max(-0.5, Math.min(0.5, py));
      el.style.setProperty("--tilt-y", `${(clampedX * 2 * maxDeg).toFixed(2)}deg`);
      el.style.setProperty("--tilt-x", `${(-clampedY * 2 * maxDeg).toFixed(2)}deg`);
      pending = null;
    };

    const onMove = (e: PointerEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (resetTimer) { clearTimeout(resetTimer); resetTimer = null; }
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      resetTimer = setTimeout(() => {
        el.style.setProperty("--tilt-x", "0deg");
        el.style.setProperty("--tilt-y", "0deg");
      }, 150);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [maxDeg]);

  return ref;
}
