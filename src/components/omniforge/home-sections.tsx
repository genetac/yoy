"use client";

import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  LayoutGrid,
  Tag,
  Sparkles,
  Command,
  Wand2,
  Gauge,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CountUp, PulseDot } from "./animated-primitives";
import { ForgeMark } from "./ForgeMark";
import { FamilyVisual, familyMeta } from "./family-visuals";
import { riseIn, staggerParent } from "@/lib/motion";
import { tierOrder, tierDisplay } from "@/data/servicePackages";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════════
   Home view sections — the first-screen command center
   ════════════════════════════════════════════════════════════════════ */

/* Goal → family routing for the quick-start chips (GUIDE §4.1) */
const GOALS: Array<{ label: string; familyId: string }> = [
  { label: "Launch a landing page", familyId: "micro" },
  { label: "Book clients", familyId: "industry-warm" },
  { label: "Sell digital products", familyId: "micro" },
  { label: "Run a client portal", familyId: "saas-product" },
  { label: "Monitor operations", familyId: "data-dense" },
  { label: "Enterprise platform", familyId: "enterprise-platform" },
];

export function HomeHero({
  totalProducts,
  totalExamples,
  onPricing,
  onGoal,
}: {
  totalProducts: number;
  totalExamples: number;
  onPricing: () => void;
  onGoal: (familyId: string) => void;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border" aria-label="OMNIFORGE overview">
      {/* Aurora + grid field */}
      <div className="forge-aurora" aria-hidden="true" />
      <div className="absolute inset-0 forge-grid" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerParent(0.08)}
          className="flex flex-col gap-6"
        >
          {/* Eyebrow */}
          <motion.div variants={riseIn} className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1 font-mono-forge text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground backdrop-blur">
              <Sparkles className="size-3 text-[rgb(var(--forge-glow))]" aria-hidden="true" />
              Design Family Engine
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono-forge text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-400">
              <PulseDot label="Live previews" />
              Previewable now
            </span>
          </motion.div>

          {/* Headline + mark */}
          <motion.div variants={riseIn} className="flex flex-col gap-5 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Pick a design family.
                <br />
                <span className="forge-gradient-text">See every product</span> we
                can build in it.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {totalProducts} product types across {totalExamples} live examples. Every design family
                carries its own visual language — typography, color, layout, and interaction patterns.
                Start with a family, then drill into its products and preview real examples.
              </p>
            </div>
            <div className="hidden shrink-0 lg:block">
              <ForgeMark size={132} />
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={riseIn} className="flex flex-wrap items-center gap-3">
            <a
              href="#families"
              className="group inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 active:translate-y-px"
            >
              <Wand2 className="size-4" aria-hidden="true" />
              Explore families
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <button
              onClick={onPricing}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-background/70 px-5 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-muted active:translate-y-px"
            >
              <Tag className="size-4" aria-hidden="true" />
              Compare plans
            </button>
            <span className="hidden items-center gap-1.5 font-mono-forge text-[11px] text-muted-foreground sm:flex">
              <Command className="size-3.5" aria-hidden="true" />
              K to search everything
            </span>
          </motion.div>

          {/* Start-from-a-goal quick chips */}
          <motion.div variants={riseIn} className="flex flex-wrap items-center gap-2">
            <span className="font-mono-forge text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
              Start from a goal
            </span>
            {GOALS.map((g) => {
              const fm = familyMeta[g.familyId];
              return (
                <button
                  key={g.label}
                  onClick={() => onGoal(g.familyId)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur transition-all hover:-translate-y-px hover:border-foreground/25 hover:text-foreground hover:shadow-sm active:translate-y-0"
                  aria-label={`Browse ${fm.label} for: ${g.label}`}
                >
                  <span
                    className="size-1.5 rounded-full"
                    style={{ background: fm.accent }}
                    aria-hidden="true"
                  />
                  {g.label}
                </button>
              );
            })}
          </motion.div>

          {/* Stat strip */}
          <motion.dl
            variants={staggerParent(0.07, 0.15)}
            className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {[
              { label: "Design families", value: 5, sub: "Distinct visual languages", suffix: "" },
              { label: "Product types", value: totalProducts, sub: "Across all tiers", suffix: "" },
              { label: "Live examples", value: totalExamples, sub: "Previewable now", suffix: "" },
              { label: "Pricing tiers", value: 4, sub: "Starter → Enterprise", suffix: "" },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={riseIn}
                className="forge-card rounded-xl p-4 backdrop-blur"
              >
                <dt className="font-mono-forge text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="mt-1.5 font-display text-2xl font-bold leading-none text-foreground">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
                <dd className="mt-1.5 text-[11px] text-muted-foreground">{s.sub}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Live activity ticker ─────────────────────────────────────────── */

export type TickerEntry = {
  familyId: string;
  text: string;
  meta: string;
};

export function ActivityTicker({ entries }: { entries: TickerEntry[] }) {
  const doubled = [...entries, ...entries];
  return (
    <div
      className="relative overflow-hidden border-b border-border bg-background/60 py-2"
      role="marquee"
      aria-label="Sample workspace activity"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" aria-hidden="true" />
      <div className="forge-ticker gap-8 pl-8">
        {doubled.map((e, i) => {
          const fm = familyMeta[e.familyId] ?? familyMeta.micro;
          return (
            <span
              key={`${e.text}-${i}`}
              className="flex shrink-0 items-center gap-2 font-mono-forge text-[11px] text-muted-foreground"
              aria-hidden={i >= entries.length}
            >
              <span className="size-1.5 rounded-full" style={{ background: fm.accent }} />
              <span className="font-semibold text-foreground">{e.text}</span>
              <span className="text-muted-foreground/80">{e.meta}</span>
              <span className="text-muted-foreground/40">·</span>
              <span className="uppercase tracking-wider" style={{ color: fm.accent }}>
                {fm.short}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ── Family card grid ─────────────────────────────────────────────── */

export function FamilyGrid({
  counts,
  exampleCounts,
  tierLettersByFamily,
  onSelect,
  onPricing,
}: {
  counts: Record<string, number>;
  exampleCounts: Record<string, number>;
  tierLettersByFamily: Record<string, string[]>;
  onSelect: (familyId: string) => void;
  onPricing: () => void;
}) {
  const families = Object.keys(familyMeta);
  return (
    <section id="families" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-label="Design families">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <LayoutGrid className="size-4 text-foreground" aria-hidden="true" />
        <h2 className="font-display text-lg font-bold text-foreground">Design families</h2>
        <span className="font-mono-forge text-[11px] text-muted-foreground">
          live previews · click to browse products
        </span>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerParent(0.06)}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {families.map((fid) => {
          const fm = familyMeta[fid];
          const tierLetters = tierLettersByFamily[fid] ?? [];
          return (
            <motion.button
              key={fid}
              variants={riseIn}
              onClick={() => onSelect(fid)}
              className={cn(
                "group relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
                fm.border,
                fm.bg,
                "bg-card/90 backdrop-blur"
              )}
              style={{ ["--family-glow" as string]: fm.glow }}
              aria-label={`Open ${fm.label} family — ${counts[fid]} products`}
            >
              {/* hover glow */}
              <span
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 60px ${fm.glow}, 0 8px 32px ${fm.glow}` }}
                aria-hidden="true"
              />
              <span className="relative flex h-full flex-1 flex-col gap-3">
                <span className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <fm.icon className={cn("size-4", fm.text)} aria-hidden="true" />
                    <span className={cn("font-mono-forge text-[9px] font-bold uppercase tracking-[0.14em]", fm.text)}>
                      Family
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 text-muted-foreground/60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </span>

                <FamilyVisual familyId={fid} />

                <span className="flex flex-1 flex-col gap-1">
                  <span className="font-display text-base font-bold text-foreground">{fm.label}</span>
                  <span className="text-xs leading-relaxed text-muted-foreground line-clamp-2">{fm.blurb}</span>
                </span>

                <span className="flex items-center gap-1.5">
                  {tierLetters.map((l) => (
                    <span
                      key={l}
                      className={cn("rounded px-1.5 py-0.5 font-mono-forge text-[8px] font-bold", fm.chip)}
                    >
                      {l}
                    </span>
                  ))}
                </span>

                <span className="flex items-center justify-between border-t border-border/70 pt-2.5">
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {counts[fid]} products · {exampleCounts[fid]} examples
                  </span>
                  <span className="font-mono-forge text-[9px] text-muted-foreground/70">{fm.recipe}</span>
                </span>
              </span>
            </motion.button>
          );
        })}

        {/* Pricing CTA card */}
        <motion.button
          variants={riseIn}
          onClick={onPricing}
          className="group relative flex h-full min-h-[290px] flex-col overflow-hidden rounded-xl border border-foreground/20 bg-foreground p-4 text-left text-background transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0 dark:bg-background dark:text-foreground"
          aria-label="Open pricing plans"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(120% 100% at 100% 0%, rgba(251,191,36,0.18), transparent 55%)",
            }}
            aria-hidden="true"
          />
          <div className="relative flex h-full flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="size-4 opacity-70" aria-hidden="true" />
                <span className="font-mono-forge text-[9px] font-bold uppercase tracking-[0.14em] opacity-70">
                  Plans
                </span>
              </div>
              <ArrowUpRight
                className="size-4 opacity-50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <div className="font-display text-lg font-bold">Pricing Plans</div>
              <p className="mt-1 text-xs leading-relaxed opacity-70">
                Starter, Growth, Professional, Enterprise — compare modules, deliverables, and support.
                Same craft floor at every tier.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {tierOrder.map((t) => (
                <span
                  key={t}
                  className="rounded bg-background/10 px-1.5 py-0.5 font-mono-forge text-[8px] font-bold opacity-75 dark:bg-foreground/10"
                >
                  {tierDisplay[t].short}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-background/15 pt-2.5 dark:border-foreground/15">
              <span className="text-[11px] font-medium opacity-80">Compare all plans</span>
              <ArrowRight
                className="size-3 opacity-60 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </div>
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
}

/* ── Featured examples rail ───────────────────────────────────────── */

export function FeaturedRail({
  title,
  subtitle,
  icon: Icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8" aria-label={title}>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Icon className="size-4 text-foreground" aria-hidden="true" />
        <h2 className="font-display text-lg font-bold text-foreground">{title}</h2>
        <span className="font-mono-forge text-[11px] text-muted-foreground">{subtitle}</span>
        <span className="ml-auto hidden items-center gap-1.5 font-mono-forge text-[10px] text-muted-foreground/70 sm:flex">
          <Gauge className="size-3" aria-hidden="true" />
          Click any card for the full presentation studio
        </span>
      </div>
      {children}
    </section>
  );
}

export { Eye };
