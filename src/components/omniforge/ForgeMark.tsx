"use client";

import { useEffect, useRef } from "react";
import { animate, createScope, stagger, type Scope } from "animejs";
import { useReducedMotion } from "motion/react";

/**
 * ForgeMark — the one intentional Anime.js showcase (GUIDE §6.2/§6.7).
 * A scoped SVG draw-in sequence for the OMNIFORGE brand mark.
 * - Selectors scoped to this component root only
 * - scope.revert() on unmount (Strict-Mode safe)
 * - Reduced motion: renders final state, no choreography
 */
export function ForgeMark({ size = 44, className }: { size?: number; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<Scope | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !rootRef.current) return;
    const root = rootRef.current;
    // animejs v4 Scope exposes no query helpers — select from the scoped
    // root element directly; scope still owns revert() cleanup.
    const q = (sel: string) => Array.from(root.querySelectorAll(sel));

    const scope = createScope({ root }).add(() => {
      animate(q(".forge-mark-stroke"), {
        strokeDashoffset: [varLen(), 0],
        opacity: [0.35, 1],
        duration: 1400,
        ease: "inOutQuad",
        delay: stagger(180),
      });
      animate(q(".forge-mark-node"), {
        scale: [0, 1],
        duration: 620,
        ease: "outQuad",
        delay: stagger(90, { start: 900 }),
      });
      animate(q(".forge-mark-core"), {
        scale: [0.4, 1],
        opacity: [0, 1],
        duration: 900,
        ease: "outBack",
        delay: 1150,
      });
    });
    scopeRef.current = scope;

    return () => {
      scope.revert();
      scopeRef.current = null;
    };
     
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className={className}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" width={size} height={size} fill="none">
        {/* Hex forge frame */}
        <path
          className="forge-mark-stroke"
          d="M24 3.5 L41.6 13.75 L41.6 34.25 L24 44.5 L6.4 34.25 L6.4 13.75 Z"
          stroke="rgb(var(--forge-glow))"
          strokeWidth="2.4"
          strokeLinejoin="round"
          style={{ strokeDasharray: 150 }}
        />
        {/* Anvil silhouette */}
        <path
          className="forge-mark-stroke"
          d="M14 20 H26 C30 20 33 17.5 34 15.5 L34 19 C34 22 30.5 24 26 24 H22 L21.5 28 H27 V31 H17 V28 H18.5 L18 24 H14 Z"
          stroke="rgb(var(--forge-glow))"
          strokeWidth="1.8"
          strokeLinejoin="round"
          style={{ strokeDasharray: 150 }}
          fill="rgb(var(--forge-glow) / 0.12)"
        />
        {/* Nodes */}
        <circle className="forge-mark-node" cx="14" cy="20" r="1.8" fill="rgb(var(--forge-glow))" style={{ transformOrigin: "14px 20px" }} />
        <circle className="forge-mark-node" cx="34" cy="15.5" r="1.8" fill="rgb(var(--forge-glow))" style={{ transformOrigin: "34px 15.5px" }} />
        <circle className="forge-mark-node" cx="22" cy="29.5" r="1.8" fill="rgb(var(--forge-glow))" style={{ transformOrigin: "22px 29.5px" }} />
        {/* Spark core */}
        <circle
          className="forge-mark-core"
          cx="24"
          cy="38.5"
          r="2.6"
          fill="rgb(var(--forge-glow))"
          style={{ transformOrigin: "24px 38.5px" }}
        />
      </svg>
    </div>
  );
}

/* Anime.js v4 reads dasharray from CSS; use a generous constant so the
   draw-in always completes regardless of exact path length. */
function varLen() {
  return 160;
}
