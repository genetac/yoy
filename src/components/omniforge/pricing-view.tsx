"use client";

import { motion } from "motion/react";
import { Tag, Check, ShieldCheck, Zap } from "lucide-react";
import { tierOrder, tierDisplay, getPackage } from "@/data/servicePackages";
import { riseIn, staggerParent } from "@/lib/motion";
import { CountUp } from "./animated-primitives";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════════
   Pricing view — same craft floor at every tier, scope differs
   ════════════════════════════════════════════════════════════════════ */

const tierColorMap: Record<string, { text: string; chip: string; badge: string; dot: string }> = {
  amber: {
    text: "text-amber-600 dark:text-amber-400",
    chip: "text-amber-700 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-950/40",
    badge: "bg-amber-500",
    dot: "bg-amber-400",
  },
  sky: {
    text: "text-sky-600 dark:text-sky-400",
    chip: "text-sky-700 dark:text-sky-400 bg-sky-100/70 dark:bg-sky-950/40",
    badge: "bg-sky-500",
    dot: "bg-sky-400",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    chip: "text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/40",
    badge: "bg-emerald-500",
    dot: "bg-emerald-400",
  },
  violet: {
    text: "text-violet-600 dark:text-violet-400",
    chip: "text-violet-700 dark:text-violet-400 bg-violet-100/70 dark:bg-violet-950/40",
    badge: "bg-violet-600",
    dot: "bg-violet-400",
  },
};

/** The craft floor — identical promises on every tier (GUIDE §8). */
const craftFloor = [
  "Responsive at every breakpoint",
  "Keyboard + touch operable",
  "Coherent design tokens",
  "Honest demo data labelling",
  "No fabricated claims",
  "Visible focus states",
];

export function PricingView() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerParent(0.06)}
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={riseIn}>
          <div className="mb-3 flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Tag className="size-4" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                Pricing Plans
              </h2>
              <p className="text-xs text-muted-foreground">
                Four service tiers from a single-page Starter to a full Enterprise platform
              </p>
            </div>
          </div>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Price changes scope, depth, capacity, and service level — never the minimum standard for
            visual craft, accessibility, or trust. Every product example maps to one of these tiers.
          </p>
        </motion.div>

        {/* Craft floor banner */}
        <motion.div
          variants={riseIn}
          className="overflow-hidden rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06]"
        >
          <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-bold text-foreground">The craft floor — included in every tier</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Design quality is never gated by budget. Scope grows; care stays constant.
                </p>
              </div>
            </div>
            <ul className="grid shrink-0 grid-cols-2 gap-x-4 gap-y-1 sm:max-w-sm">
              {craftFloor.slice(0, 6).map((c) => (
                <li key={c} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <Check className="size-3 shrink-0 text-emerald-500" strokeWidth={3} aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tierOrder.map((tier, i) => {
            const pkg = getPackage(tier);
            const td = tierDisplay[tier];
            const tc = tierColorMap[td.color];
            const isPopular = tier === "high";
            return (
              <motion.article
                key={tier}
                variants={riseIn}
                className={cn(
                  "forge-card relative flex flex-col rounded-xl p-4 transition-shadow hover:shadow-lg",
                  isPopular && "ring-2 ring-[rgb(var(--forge-glow))] ring-offset-2 ring-offset-background"
                )}
              >
                {isPopular && (
                  <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 rounded-full bg-[rgb(var(--forge-glow))] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black shadow">
                    <Zap className="size-2.5" aria-hidden="true" />
                    Most picked
                  </span>
                )}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn("size-1.5 rounded-full", tc.dot)} aria-hidden="true" />
                    <span className={cn("text-xs font-bold", tc.text)}>{td.label}</span>
                  </div>
                  <span className="font-mono-forge text-[9px] uppercase tracking-wider text-muted-foreground">
                    {td.short}
                  </span>
                </div>
                <div className="font-mono-forge text-base font-bold text-foreground">{pkg.priceRange}</div>
                <div className="mb-3 mt-0.5 text-[11px] text-muted-foreground">{pkg.deliveryWeeks}</div>
                <ul className="mb-3 flex-1 space-y-1.5">
                  {pkg.features.slice(0, 4).map((f, j) => (
                    <li key={j} className="flex items-start gap-1.5">
                      <Check className={cn("mt-0.5 size-3 shrink-0", tc.text)} strokeWidth={3} aria-hidden="true" />
                      <span className="text-[10px] leading-tight text-muted-foreground">{f}</span>
                    </li>
                  ))}
                  <li className="pt-0.5 text-[10px] text-muted-foreground/70">
                    +{pkg.features.length - 4} more
                  </li>
                </ul>
                {/* Module meter */}
                <div className="border-t border-border pt-2.5">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="font-mono-forge text-[9px] uppercase tracking-wider text-muted-foreground">
                      Modules
                    </span>
                    <span className={cn("font-mono-forge text-[10px] font-bold", tc.text)}>
                      <CountUp value={pkg.modules.length} /> / 22
                    </span>
                  </div>
                  <div
                    className="h-1.5 overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-valuenow={pkg.modules.length}
                    aria-valuemin={0}
                    aria-valuemax={22}
                    aria-label={`${td.label} modules`}
                  >
                    <motion.div
                      className={cn("h-full rounded-full", tc.badge)}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(pkg.modules.length / 22) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.08 }}
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </main>
  );
}
