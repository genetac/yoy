"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView, animate } from "motion/react";

/* ════════════════════════════════════════════════════════════════════
   OMNIFORGE animated primitives
   Live, GIF-like motion that stays meaningful: count-up stats, drawn
   sparklines, ticker strips, pulse dots. All reduced-motion aware.
   ════════════════════════════════════════════════════════════════════ */

/** Count-up number — animates once when scrolled into view. */
export function CountUp({
  value,
  duration = 1.1,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduced]);

  /* Derived render value — reduced motion or pre-reveal renders the
     final number directly, without a synchronous setState in the effect. */
  const shown = reduced || !inView ? value : display;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown.toLocaleString()}
      {suffix}
    </span>
  );
}

/** Deterministic pseudo-random so SSR and client agree. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function buildPath(points: number[], w: number, h: number, pad = 2) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = (w - pad * 2) / (points.length - 1);
  return points
    .map((p, i) => {
      const x = pad + i * step;
      const y = h - pad - ((p - min) / range) * (h - pad * 2);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

/**
 * LiveSparkline — a self-drawing line chart that periodically streams a
 * new point in, so it behaves like a live GIF of a metric. Pure SVG,
 * no layout thrash, honors reduced motion (static final state).
 */
export function LiveSparkline({
  seed = 7,
  color = "currentColor",
  width = 120,
  height = 36,
  points: initialPoints,
  intervalMs = 2200,
  className,
  strokeWidth = 2,
}: {
  seed?: number;
  color?: string;
  width?: number;
  height?: number;
  points?: number[];
  intervalMs?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const reduced = useReducedMotion();
  const [points, setPoints] = useState<number[]>(() => {
    if (initialPoints) return initialPoints;
    const rnd = seeded(seed);
    return Array.from({ length: 14 }, (_, i) => 40 + Math.sin(i / 2.4) * 22 + rnd() * 26);
  });

  useEffect(() => {
    if (reduced) return;
    const rnd = seeded(seed + 99);
    const id = window.setInterval(() => {
      setPoints((prev) => {
        const next = prev.slice(1);
        const last = prev[prev.length - 1];
        next.push(Math.min(92, Math.max(12, last + (rnd() - 0.48) * 30)));
        return next;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduced, seed, intervalMs]);

  const d = buildPath(points, width, height);
  const len = points.length * 12;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={reduced ? undefined : "forge-spark"}
        style={{ ["--spark-len" as string]: `${len}` }}
        opacity={0.9}
      />
      <circle
        cx={width - 2}
        cy={height / 2}
        r={0.1}
        fill="transparent"
      />
    </svg>
  );
}

/** Status dot with pulse ring — communicates "live". */
export function PulseDot({
  className = "text-emerald-500",
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span className="relative inline-flex items-center justify-center" role="status" aria-label={label}>
      <span className={`forge-pulse w-2 h-2 rounded-full bg-current ${className}`} aria-hidden="true" />
      <span className="sr-only">{label ?? "Live"}</span>
    </span>
  );
}

/** Mini bar chart with a periodic "stream" animation — GIF-like. */
export function LiveBars({
  seed = 3,
  color = "currentColor",
  bars = 12,
  className,
  intervalMs = 1800,
}: {
  seed?: number;
  color?: string;
  bars?: number;
  className?: string;
  intervalMs?: number;
}) {
  const reduced = useReducedMotion();
  const [heights, setHeights] = useState<number[]>(() => {
    const rnd = seeded(seed);
    return Array.from({ length: bars }, (_, i) => 30 + Math.abs(Math.sin(i / 1.7)) * 50 + rnd() * 20);
  });

  useEffect(() => {
    if (reduced) return;
    const rnd = seeded(seed + 5);
    const id = window.setInterval(() => {
      setHeights((prev) => {
        const next = prev.slice(1);
        const last = prev[prev.length - 1];
        next.push(Math.min(100, Math.max(22, last + (rnd() - 0.5) * 44)));
        return next;
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [reduced, seed, intervalMs]);

  return (
    <div className={`flex items-end gap-[3px] h-10 ${className ?? ""}`} aria-hidden="true">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="w-[5px] rounded-sm"
          style={{ background: color, opacity: 0.35 + (i / heights.length) * 0.65 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  );
}
