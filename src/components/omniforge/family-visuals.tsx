"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Zap, LayoutGrid, Boxes, Layers, Eye, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LiveBars, LiveSparkline, CountUp, PulseDot } from "./animated-primitives";

/* ════════════════════════════════════════════════════════════════════
   Family metadata + animated visual identity
   Each family gets a live, GIF-like miniature that demonstrates its
   visual language: motion explains the family, not decorates it.
   ════════════════════════════════════════════════════════════════════ */

export type FamilyMeta = {
  label: string;
  short: string;
  recipe: string;
  blurb: string;
  accent: string;          // hex used by the animated visual
  accentSoft: string;
  chip: string;            // tailwind classes
  text: string;
  border: string;
  bg: string;
  glow: string;            // rgba for hover shadow
  icon: LucideIcon;
};

export const familyMeta: Record<string, FamilyMeta> = {
  micro: {
    label: "Micro Products",
    short: "Micro",
    recipe: "Pentagram × Raycast",
    blurb:
      "Small, focused digital products — landing templates, calculators, resume kits, checklists, template packs. Bold typographic heroes, numbered feature lists, instant-buy CTAs.",
    accent: "#f59e0b",
    accentSoft: "#fef3c7",
    chip: "text-amber-700 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-950/40",
    text: "text-amber-600 dark:text-amber-400",
    border: "border-amber-300/60 dark:border-amber-800/60",
    bg: "bg-amber-50/60 dark:bg-amber-950/20",
    glow: "rgba(245, 158, 11, 0.14)",
    icon: Zap,
  },
  "industry-warm": {
    label: "Industry & Hospitality",
    short: "Industry",
    recipe: "Aesop × Stripe Press",
    blurb:
      "Website kits for dental clinics, gyms, law firms, restaurants. Serif body copy, editorial layouts, full-bleed photography, small-caps section labels.",
    accent: "#d97706",
    accentSoft: "#fef7ed",
    chip: "text-orange-800 dark:text-orange-300 bg-orange-100/70 dark:bg-orange-950/40",
    text: "text-orange-700 dark:text-orange-400",
    border: "border-orange-300/60 dark:border-orange-800/60",
    bg: "bg-orange-50/60 dark:bg-orange-950/20",
    glow: "rgba(217, 119, 6, 0.14)",
    icon: LayoutGrid,
  },
  "data-dense": {
    label: "Data Dashboards",
    short: "Data",
    recipe: "Terminal density",
    blurb:
      "Dashboards, design systems, inventory tools, monitoring platforms. Monospaced type, tabular data, hairline panels, ticker strips, zero radius.",
    accent: "#10b981",
    accentSoft: "#d1fae5",
    chip: "text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/40",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-300/60 dark:border-emerald-800/60",
    bg: "bg-emerald-50/60 dark:bg-emerald-950/20",
    glow: "rgba(16, 185, 129, 0.14)",
    icon: Boxes,
  },
  "saas-product": {
    label: "SaaS Products",
    short: "SaaS",
    recipe: "Modern product UI",
    blurb:
      "Appointment systems, client portals, CRMs, booking platforms, SaaS tools. Hairline borders, gradient-mesh heroes, feature grids, keyboard-chip UI.",
    accent: "#0ea5e9",
    accentSoft: "#e0f2fe",
    chip: "text-sky-700 dark:text-sky-400 bg-sky-100/70 dark:bg-sky-950/40",
    text: "text-sky-600 dark:text-sky-400",
    border: "border-sky-300/60 dark:border-sky-800/60",
    bg: "bg-sky-50/60 dark:bg-sky-950/20",
    glow: "rgba(14, 165, 233, 0.14)",
    icon: Layers,
  },
  "enterprise-platform": {
    label: "Enterprise Platforms",
    short: "Enterprise",
    recipe: "Control-room craft",
    blurb:
      "Custom SaaS, marketplaces, multi-tenant apps, enterprise systems. Dashboard interfaces with sidebar rails, KPI panels, activity feeds, and request-demo funnels.",
    accent: "#8b5cf6",
    accentSoft: "#ede9fe",
    chip: "text-violet-700 dark:text-violet-400 bg-violet-100/70 dark:bg-violet-950/40",
    text: "text-violet-600 dark:text-violet-400",
    border: "border-violet-300/60 dark:border-violet-800/60",
    bg: "bg-violet-50/60 dark:bg-violet-950/20",
    glow: "rgba(139, 92, 246, 0.16)",
    icon: Eye,
  },
};

export const familyOrder = [
  "micro",
  "industry-warm",
  "data-dense",
  "saas-product",
  "enterprise-platform",
] as const;

/* ── Live animated miniatures (the "GIF" layer) ──────────────────── */

/** Micro: instant-buy product card with live bars + pulsing sold-counter. */
function MicroVisual({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col justify-between p-3">
      <div className="flex items-center justify-between">
        <span className="font-mono-forge text-[9px] font-bold uppercase tracking-[0.14em]" style={{ color: accent }}>
          INSTANT DOWNLOAD
        </span>
        <PulseDot className="text-emerald-500" label="Selling now" />
      </div>
      <div>
        <div className="font-display text-lg font-bold leading-tight text-foreground">
          Notion OS
          <br />
          Template Pack
        </div>
        <div className="mt-1.5 flex items-end justify-between">
          <span className="font-display text-xl font-bold" style={{ color: accent }}>
            $19
          </span>
          <LiveBars color={accent} bars={9} className="h-6" seed={11} />
        </div>
      </div>
    </div>
  );
}

/** Industry warm: editorial serif pull-quote with slow shimmer + rating. */
function IndustryWarmVisual({ accent }: { accent: string }) {
  const quotes = [
    "A room that breathes with the season.",
    "Slow mornings, honest ingredients.",
    "Craft you can taste in the details.",
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % quotes.length), 3800);
    return () => window.clearInterval(id);
     
  }, []);
  return (
    <div className="flex h-full flex-col justify-between p-3">
      <div className="flex items-center justify-between">
        <span className="font-mono-forge text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Est. 2012 · Portland
        </span>
        <span className="font-mono-forge text-[9px]" style={{ color: accent }}>
          ★ 4.9
        </span>
      </div>
      <blockquote className="font-serif-editorial text-[17px] italic leading-snug text-foreground">
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          “{quotes[i]}”
        </motion.span>
      </blockquote>
      <div className="flex items-center gap-2">
        <span
          className="inline-flex items-center gap-1 px-2 py-1 font-mono-forge text-[8px] font-bold uppercase tracking-[0.14em] text-white"
          style={{ background: accent }}
        >
          Book a table
        </span>
        <span className="h-px flex-1" style={{ background: `${accent}55` }} />
      </div>
    </div>
  );
}

/** Data-dense: terminal sparkline + streaming mono readout. */
function DataDenseVisual({ accent }: { accent: string }) {
  const [price, setPrice] = useState(41207);
  useEffect(() => {
    const id = window.setInterval(() => {
      setPrice((p) => Math.max(38000, Math.min(44000, p + Math.round((Math.random() - 0.47) * 260))));
    }, 1600);
    return () => window.clearInterval(id);
  }, []);
  return (
    <div className="flex h-full flex-col justify-between p-3 font-mono-forge">
      <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
        <span>OMX · LIVE</span>
        <PulseDot label="Streaming" />
      </div>
      <div className="flex items-end gap-2">
        <motion.span
          key={price}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          className="text-xl font-bold tracking-tight"
          style={{ color: accent }}
        >
          {price.toLocaleString()}
        </motion.span>
        <span className="pb-0.5 text-[9px] text-emerald-500">▲ 2.41%</span>
      </div>
      <LiveSparkline color={accent} width={210} height={30} seed={21} strokeWidth={1.6} />
    </div>
  );
}

/** SaaS: gradient-mesh hero with animated bars + trial CTA. */
function SaasVisual({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden p-3">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(120% 90% at 85% -10%, ${accent}33, transparent 60%), radial-gradient(90% 80% at 0% 110%, ${accent}22, transparent 55%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-between">
        <span className="rounded-md border border-border bg-background/80 px-1.5 py-0.5 font-mono-forge text-[8px] font-semibold text-muted-foreground">
          ⌘K commands
        </span>
        <span className="font-mono-forge text-[9px] font-semibold" style={{ color: accent }}>
          Free trial
        </span>
      </div>
      <div className="relative">
        <div className="font-display text-base font-bold leading-tight text-foreground">
          Ship your product
          <br />
          twice as fast
        </div>
        <div className="mt-2 flex items-end justify-between">
          <span
            className="rounded-md px-2.5 py-1 text-[9px] font-bold text-white shadow-sm"
            style={{ background: accent }}
          >
            Start free
          </span>
          <LiveBars color={accent} bars={12} className="h-7" seed={31} intervalMs={1500} />
        </div>
      </div>
    </div>
  );
}

/** Enterprise: KPI grid with count-ups + compliance rail. */
function EnterpriseVisual({ accent }: { accent: string }) {
  return (
    <div className="flex h-full flex-col justify-between p-3">
      <div className="flex items-center justify-between">
        <span className="font-mono-forge text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Workspace · Q4
        </span>
        <PulseDot label="Syncing" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { v: 24, s: "", l: "Units" },
          { v: 96, s: "%", l: "Uptime*" },
          { v: 7, s: "", l: "Risks" },
        ].map((k) => (
          <div key={k.l} className="rounded-md border border-border/70 bg-background/60 px-2 py-1.5">
            <div className="font-display text-sm font-bold" style={{ color: accent }}>
              <CountUp value={k.v} suffix={k.s} />
            </div>
            <div className="font-mono-forge text-[7px] uppercase tracking-wider text-muted-foreground">
              {k.l}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between font-mono-forge text-[8px] text-muted-foreground">
        <span>SSO · SOC 2 · GDPR</span>
        <span style={{ color: accent }}>Request demo →</span>
      </div>
    </div>
  );
}

const visuals: Record<string, React.ComponentType<{ accent: string }>> = {
  micro: MicroVisual,
  "industry-warm": IndustryWarmVisual,
  "data-dense": DataDenseVisual,
  "saas-product": SaasVisual,
  "enterprise-platform": EnterpriseVisual,
};

/** Renders the family-specific animated miniature. */
export function FamilyVisual({ familyId }: { familyId: string }) {
  const Visual = visuals[familyId] ?? MicroVisual;
  const fm = familyMeta[familyId] ?? familyMeta.micro;
  return (
    <div
      className="relative h-28 overflow-hidden rounded-lg border border-border bg-card"
      aria-hidden="true"
    >
      {/* scan line texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(to bottom, transparent 50%, ${fm.accent}08 50%)`,
          backgroundSize: "100% 6px",
        }}
      />
      <Visual accent={fm.accent} />
    </div>
  );
}

export { ArrowUpRight };
