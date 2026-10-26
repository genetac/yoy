"use client";

import { useMemo, useState } from "react";
import {
  Zap, ArrowRight, ArrowUpRight, Eye, Check, Layers, ChevronDown, Tag,
  LayoutGrid, Boxes, Flame, type LucideIcon,
} from "lucide-react";
import type { MockupConfig } from "@/data/businessTypes";
import {
  productTierCategories, subscriptionSection, type ProductType, type ProductExample,
} from "@/data/exampleProducts";
import { tierOrder, tierDisplay, getPackage } from "@/data/servicePackages";
import { familyTokens, getFamilyForProductType, type DesignFamilyId } from "@/data/designFamilies";
import { deriveOffer, heroCount, type OfferV2 } from "@/data/product-catalog";
import { ProductPlate } from "@/components/plate/ProductPlate";
import { PresentationStudio } from "@/components/studio/PresentationStudio";
import { MotionMedia, posterFrom } from "@/components/MotionMedia";

/* ─── Family metadata (prestige: shared finish, family identity) ── */

const familyMeta: Record<DesignFamilyId, {
  label: string; short: string; recipe: string; blurb: string;
  chip: string; text: string; border: string; bg: string; icon: LucideIcon;
}> = {
  micro: {
    label: "Micro Products", short: "Micro", recipe: "Pentagram + Raycast",
    blurb: "Small, focused digital products — landing templates, calculators, resume kits, checklists. Bold typographic heroes, numbered feature lists, instant-buy CTAs.",
    chip: "text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800",
    text: "text-zinc-700 dark:text-zinc-300", border: "border-zinc-300 dark:border-zinc-700",
    bg: "bg-zinc-50 dark:bg-zinc-900", icon: Zap,
  },
  "industry-warm": {
    label: "Industry & Hospitality", short: "Industry", recipe: "Aesop + Stripe Press",
    blurb: "Website kits for dental clinics, gyms, law firms, restaurants. Serif body copy, editorial layouts, full-bleed photography, small-caps section labels.",
    chip: "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-700 dark:text-amber-400", border: "border-amber-300 dark:border-amber-800",
    bg: "bg-amber-50 dark:bg-amber-950/30", icon: LayoutGrid,
  },
  "data-dense": {
    label: "Data Dashboards", short: "Data", recipe: "Bloomberg Terminal",
    blurb: "Dashboards, design systems, inventory tools, monitoring platforms. Monospaced type, tabular data, hairline panels, ticker strips, zero radius.",
    chip: "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-400", border: "border-emerald-300 dark:border-emerald-800",
    bg: "bg-emerald-50 dark:bg-emerald-950/30", icon: Boxes,
  },
  "saas-product": {
    label: "SaaS Products", short: "SaaS", recipe: "Linear",
    blurb: "Appointment systems, client portals, CRMs, booking platforms, SaaS tools. Hairline borders, gradient-mesh heroes, feature grids, keyboard-chip UI.",
    chip: "text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40",
    text: "text-sky-700 dark:text-sky-400", border: "border-sky-300 dark:border-sky-800",
    bg: "bg-sky-50 dark:bg-sky-950/30", icon: Layers,
  },
  "enterprise-platform": {
    label: "Enterprise Platforms", short: "Enterprise", recipe: "Bloomberg + Linear",
    blurb: "Custom SaaS, marketplaces, multi-tenant apps, enterprise systems. Dashboard interfaces with sidebar rails, KPI panels, activity feeds, and request-demo funnels.",
    chip: "text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40",
    text: "text-violet-700 dark:text-violet-400", border: "border-violet-300 dark:border-violet-800",
    bg: "bg-violet-50 dark:bg-violet-950/30", icon: Eye,
  },
};

const familyOrder: DesignFamilyId[] = ["micro", "industry-warm", "data-dense", "saas-product", "enterprise-platform"];

const tierColorMap: Record<string, { text: string; chip: string; badge: string; dot: string }> = {
  amber: { text: "text-amber-600 dark:text-amber-400", chip: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40", badge: "bg-amber-500", dot: "bg-amber-400" },
  sky: { text: "text-sky-600 dark:text-sky-400", chip: "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40", badge: "bg-sky-500", dot: "bg-sky-400" },
  emerald: { text: "text-emerald-600 dark:text-emerald-400", chip: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40", badge: "bg-emerald-500", dot: "bg-emerald-400" },
  violet: { text: "text-violet-600 dark:text-violet-400", chip: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40", badge: "bg-violet-600", dot: "bg-violet-400" },
};

/* ─── Aggregate: products by family with tier info + plate numbers ── */

type FamilyProduct = {
  product: ProductType; tierLetter: string; tierName: string; tierColor: string; priceRange: string;
};

const allTierSections = [
  ...productTierCategories.map((c) => ({ letter: c.letter, name: c.name, priceRange: c.priceRange, color: c.color, products: c.products })),
  { letter: "S", name: subscriptionSection.name, priceRange: subscriptionSection.priceRange, color: "emerald", products: subscriptionSection.products },
];

const familyProductMap: Record<DesignFamilyId, FamilyProduct[]> = {
  micro: [], "industry-warm": [], "data-dense": [], "saas-product": [], "enterprise-platform": [],
};
for (const section of allTierSections) {
  for (const product of section.products) {
    familyProductMap[getFamilyForProductType(product.id)].push({
      product, tierLetter: section.letter, tierName: section.name, tierColor: section.color, priceRange: section.priceRange,
    });
  }
}

const totalProducts = familyOrder.reduce((n, f) => n + familyProductMap[f].length, 0);
const totalExamples = familyOrder.reduce((n, f) => n + familyProductMap[f].reduce((m, fp) => m + fp.product.examples.length, 0), 0);

/* label → productId + engraved plate numbers (deterministic) */
const labelToProductId: Record<string, string> = {};
const plateNumbers: Record<string, string> = {};
let plateCounter = 0;
for (const section of allTierSections) {
  for (const product of section.products) {
    for (const ex of product.examples) {
      labelToProductId[ex.label] = product.id;
      plateCounter += 1;
      plateNumbers[ex.label] = String(plateCounter).padStart(3, "0");
    }
  }
}
function productIdFor(example: ProductExample): string {
  return labelToProductId[example.label] ?? "landing-template";
}

/* ─── Studio state ─────────────────────────────────────────────── */

type View = { kind: "home" } | { kind: "family"; familyId: DesignFamilyId } | { kind: "pricing" };
type StudioState = { offer: OfferV2; config: MockupConfig; businessName: string; example?: ProductExample } | null;

/* ─── TopNav: design families are the primary axis ─────────────── */

function TopNav({ view, onSelect }: { view: View; onSelect: (v: View) => void }) {
  return (
    <div className="of-hairline-b sticky top-14 z-20 bg-[var(--of-plate-bg)]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => onSelect({ kind: "home" })}
            className={`group flex shrink-0 items-center gap-2 rounded-lg border px-2.5 py-2 transition-all duration-150 ${
              view.kind === "home"
                ? "border-brass-500/60 bg-brass-500/15"
                : "border-zinc-200/70 bg-[var(--of-plate-bg-2)] hover:border-brass-500/40 dark:border-zinc-800"
            }`}
          >
            <Zap className={`h-4 w-4 ${view.kind === "home" ? "text-brass-600 dark:text-brass-400" : "text-zinc-400"}`} />
            <div className="hidden min-w-0 text-left sm:block">
              <div className="text-[11px] font-semibold leading-tight">Home</div>
              <div className="mt-0.5 font-mono text-[9px] text-zinc-400">All families</div>
            </div>
          </button>
          <div className="of-hairline-b h-8 w-px shrink-0 !border-0 border-l border-brass-500/25" />
          {familyOrder.map((fid) => {
            const fm = familyMeta[fid];
            const isActive = view.kind === "family" && view.familyId === fid;
            const count = familyProductMap[fid].length;
            return (
              <button
                key={fid}
                onClick={() => onSelect({ kind: "family", familyId: fid })}
                className={`group flex shrink-0 items-center gap-2 rounded-lg border px-2.5 py-2 transition-all duration-150 ${
                  isActive ? `${fm.bg} ${fm.border}` : "border-zinc-200/70 bg-[var(--of-plate-bg-2)] hover:border-brass-500/40 dark:border-zinc-800"
                }`}
              >
                <fm.icon className={`h-4 w-4 ${isActive ? fm.text : "text-zinc-400"}`} />
                <div className="hidden min-w-0 text-left sm:block">
                  <div className="text-[11px] font-semibold leading-tight">{fm.short}</div>
                  <div className="mt-0.5 font-mono text-[9px] text-zinc-400">{count} products</div>
                </div>
              </button>
            );
          })}
          <div className="h-8 w-px shrink-0 border-l border-brass-500/25" />
          <button
            onClick={() => onSelect({ kind: "pricing" })}
            className={`group flex shrink-0 items-center gap-2 rounded-lg border px-2.5 py-2 transition-all duration-150 ${
              view.kind === "pricing"
                ? "border-brass-500/60 bg-brass-500/15"
                : "border-zinc-200/70 bg-[var(--of-plate-bg-2)] hover:border-brass-500/40 dark:border-zinc-800"
            }`}
          >
            <Tag className={`h-4 w-4 ${view.kind === "pricing" ? "text-brass-600 dark:text-brass-400" : "text-zinc-400"}`} />
            <div className="hidden min-w-0 text-left sm:block">
              <div className="text-[11px] font-semibold leading-tight">Pricing</div>
              <div className="mt-0.5 font-mono text-[9px] text-zinc-400">4 plans</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── ProductSection: COLLAPSED BY DEFAULT (user rule) ─────────── */

function ProductSection({
  fp, familyShort, onOpen, index,
}: {
  fp: FamilyProduct;
  familyShort: string;
  onOpen: (example: ProductExample, productName: string) => void;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false); // ← minimized until clicked
  const tc = tierColorMap[fp.tierColor] ?? tierColorMap.amber;
  const offer = deriveOffer(fp.product.id, fp.product.examples[0]);
  return (
    <div className="of-plate of-slide-up overflow-hidden" style={{ animationDelay: `${index * 60}ms` }}>
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 p-3.5 text-left transition-colors hover:bg-brass-500/5 sm:p-4"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded font-mono text-[10px] font-bold ${tc.chip}`}>
            {fp.tierLetter}
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{fp.product.name}</h3>
            <p className="mt-0.5 line-clamp-1 text-[11.5px] text-zinc-500 dark:text-zinc-400">{fp.product.description}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="hidden font-mono text-[9px] text-zinc-400 sm:inline">{fp.product.examples.length} examples · {offer.price.amount !== null ? `from $${Math.min(...fp.product.examples.map((e) => deriveOffer(fp.product.id, e).price.amount ?? 999))}` : "quote"}</span>
          <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        </div>
      </button>
      {expanded && (
        <div className="of-expand border-t border-brass-500/15 px-3.5 pb-4 pt-3 sm:px-4">
          <div className="mt-1 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {fp.product.examples.map((ex, i) => (
              <ProductPlate
                key={ex.label}
                offer={deriveOffer(fp.product.id, ex)}
                example={ex}
                familyShort={familyShort}
                plateNo={plateNumbers[ex.label] ?? "001"}
                index={i}
                onOpen={() => onOpen(ex, fp.product.name)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── FamilyView: all products in a family, grouped by tier ────── */

function FamilyView({ familyId, onOpen }: { familyId: DesignFamilyId; onOpen: (example: ProductExample, productName: string) => void }) {
  const fm = familyMeta[familyId];
  const tokens = familyTokens[familyId];
  const items = familyProductMap[familyId];
  const exampleCount = items.reduce((n, fp) => n + fp.product.examples.length, 0);

  const byTier = useMemo(() => {
    const groups: Record<string, FamilyProduct[]> = {};
    for (const fp of items) {
      (groups[fp.tierLetter] ??= []).push(fp);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [items]);

  return (
    <main className="mx-auto max-w-7xl space-y-5 px-4 py-6 sm:px-6 lg:px-8">
      {/* family header — prestige plate */}
      <div className={`of-plate of-slide-up ${fm.bg} ${fm.border} p-4 sm:p-5`}>
        <div className="mb-2 flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <fm.icon className={`h-5 w-5 ${fm.text}`} />
            <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">{fm.label}</h2>
          </div>
          <span className={`rounded font-mono text-[10px] font-semibold px-2 py-1 ${fm.chip}`}>
            {items.length} products · {exampleCount} examples
          </span>
        </div>
        <p className="mb-3 max-w-2xl text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">{fm.blurb}</p>
        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
          <span>Recipe: {fm.recipe}</span><span>·</span>
          <span>{tokens.radius.md}px radius</span><span>·</span>
          <span>{tokens.sectionStyle}</span><span>·</span>
          <span className="of-engrave">Obsidian + brass finish</span>
        </div>
      </div>

      {byTier.map(([tierLetter, tierProducts]) => {
        const tc = tierColorMap[tierProducts[0].tierColor] ?? tierColorMap.amber;
        return (
          <div key={tierLetter} className="space-y-2.5">
            <div className="mb-1 flex items-center gap-2">
              <span className={`flex h-6 w-6 items-center justify-center rounded font-mono text-[10px] font-bold ${tc.chip}`}>{tierLetter}</span>
              <h3 className="font-display text-base font-semibold tracking-tight">{tierProducts[0].tierName}</h3>
              <span className="font-mono text-[11px] text-zinc-400">{tierProducts[0].priceRange}</span>
              <span className="font-mono text-[10px] text-zinc-400">· {tierProducts.length} products</span>
            </div>
            <div className="space-y-2.5">
              {tierProducts.map((fp, i) => (
                <ProductSection key={fp.product.id} fp={fp} familyShort={fm.short} onOpen={onOpen} index={i} />
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}

/* ─── PricingView (prestige) ───────────────────────────────────── */

function PricingView() {
  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="of-slide-up">
        <div className="mb-4 flex items-center gap-3">
          <Tag className="h-5 w-5 text-brass-600 dark:text-brass-400" />
          <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">Pricing Plans</h2>
        </div>
        <p className="max-w-2xl text-[13px] text-zinc-600 dark:text-zinc-400">
          Four service tiers from a single-page Starter to a full Enterprise platform. Every product example maps to one of these tiers — and every tier gets the same craft floor.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {tierOrder.map((tier, i) => {
          const pkg = getPackage(tier);
          const td = tierDisplay[tier];
          const tc = tierColorMap[td.color];
          return (
            <div key={tier} className="of-plate of-lift of-slide-up p-4" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${tc.dot}`} />
                  <span className={`text-xs font-bold ${tc.text}`}>{td.label}</span>
                </div>
                <span className="of-plate-num">{td.short}</span>
              </div>
              <div className="of-foil-text mb-0.5 font-display text-lg font-bold">{pkg.priceRange}</div>
              <div className="mb-3 text-[11px] text-zinc-500 dark:text-zinc-400">{pkg.deliveryWeeks}</div>
              <div className="mb-3 space-y-1.5">
                {pkg.features.slice(0, 4).map((f, j) => (
                  <div key={j} className="flex items-start gap-1.5">
                    <Check className={`mt-0.5 h-3 w-3 shrink-0 ${tc.text}`} strokeWidth={3} />
                    <span className="text-[10.5px] leading-tight text-zinc-600 dark:text-zinc-400">{f}</span>
                  </div>
                ))}
                <div className="pt-0.5 text-[10px] text-zinc-400">+{pkg.features.length - 4} more</div>
              </div>
              <div className="of-hairline-t flex items-center justify-between pt-2.5">
                <span className="of-plate-num">Modules</span>
                <span className={`font-mono text-[10px] font-bold ${tc.text}`}>{pkg.modules.length}/22</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

/* ─── HomeView: prestige hero + family picker + living showcase ─── */

function HomeView({ onSelect, onOpen }: { onSelect: (v: View) => void; onOpen: (example: ProductExample, productName: string) => void }) {
  const featured = useMemo(() => {
    return familyOrder
      .map((fid) => {
        const items = familyProductMap[fid];
        if (!items.length) return null;
        // pick the example that has a hero offer (authored) — else the first
        for (const fp of items) {
          const heroEx = fp.product.examples.find((ex) => deriveOffer(fp.product.id, ex).authored);
          if (heroEx) return { fid, fp, example: heroEx };
        }
        const fp0 = items[0];
        return { fid, fp: fp0, example: fp0.product.examples[0] };
      })
      .filter(Boolean) as { fid: DesignFamilyId; fp: FamilyProduct; example: ProductExample }[];
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="pb-8 pt-8 of-slide-up">
        <div className="of-plate relative overflow-hidden p-6 sm:p-10">
          <MotionMedia
            asset={posterFrom(featured[0]?.example.heroImage ?? "", [0.62, 0.5], 0.82)}
            eager
            className="absolute inset-0 !rounded-none"
          />
          <div className="relative max-w-3xl">
            <div className="of-plate-num mb-3 !text-[#f3dfa6]/90">/ The forge · Edition 2026</div>
            <h1 className="font-display text-3xl font-semibold leading-[1.06] tracking-tight text-white drop-shadow-sm sm:text-5xl">
              Every template,{" "}
              <span className="of-foil-text of-sheen inline-block rounded">finished</span>
              <br className="hidden sm:block" /> before you buy it.
            </h1>
            <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-white/85 sm:text-[15px]">
              {totalProducts} product types · {totalExamples} live examples · {heroCount} hand-authored kits. Open any plate: play the working demo,
              read the real files, buy, and download the ZIP — in one sitting, from this page.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              <button onClick={() => onSelect({ kind: "family", familyId: "industry-warm" })} className="of-btn">
                <Flame className="h-4 w-4" /> Browse the showcase kits
              </button>
              <button onClick={() => onSelect({ kind: "pricing" })} className="of-btn-ghost !border-white/30 !text-white">
                Compare plans <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* stat plates */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            { label: "Design families", value: "5", sub: "Distinct visual languages" },
            { label: "Product types", value: String(totalProducts), sub: "Across all tiers" },
            { label: "Live examples", value: String(totalExamples), sub: "Previewable now" },
            { label: "Authored kits", value: String(heroCount), sub: "Real files, real ZIPs" },
          ].map((s, i) => (
            <div key={s.label} className="of-plate of-slide-up p-3" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="of-plate-num mb-1">{s.label}</div>
              <div className="of-foil-text font-display text-xl font-bold leading-none">{s.value}</div>
              <div className="mt-1 text-[10px] text-zinc-500 dark:text-zinc-400">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Family picker ───────────────────────────────────────── */}
      <section className="pb-6">
        <div className="mb-4 flex items-center gap-2">
          <LayoutGrid className="h-4 w-4 text-brass-600 dark:text-brass-400" />
          <h2 className="font-display text-lg font-semibold tracking-tight">Design families</h2>
          <span className="font-mono text-[11px] text-zinc-400">click to browse — sections open collapsed, by design</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {familyOrder.map((fid, i) => {
            const fm = familyMeta[fid];
            const items = familyProductMap[fid];
            const exampleCount = items.reduce((n, fp) => n + fp.product.examples.length, 0);
            const tierLetters = [...new Set(items.map((fp) => fp.tierLetter))].sort();
            return (
              <button
                key={fid}
                onClick={() => onSelect({ kind: "family", familyId: fid })}
                className={`of-plate of-lift group of-slide-up p-4 text-left ${fm.border}`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <fm.icon className={`h-4 w-4 ${fm.text}`} />
                    <span className={`font-mono text-[9px] font-semibold ${fm.text}`}>FAMILY</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-colors group-hover:text-brass-600 dark:group-hover:text-brass-400" />
                </div>
                <h3 className="mb-1 font-display text-base font-semibold tracking-tight">{fm.label}</h3>
                <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{fm.blurb}</p>
                <div className="mb-3 flex flex-wrap items-center gap-1.5">
                  {tierLetters.map((l) => {
                    const fp = items.find((fp) => fp.tierLetter === l)!;
                    const tc = tierColorMap[fp.tierColor] ?? tierColorMap.amber;
                    return <span key={l} className={`rounded font-mono text-[8px] font-bold px-1.5 py-0.5 ${tc.chip}`}>{l}</span>;
                  })}
                </div>
                <div className="of-hairline-t flex items-center justify-between pt-2.5">
                  <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">{items.length} products · {exampleCount} examples</span>
                  <span className="of-plate-num">{fm.recipe}</span>
                </div>
              </button>
            );
          })}
          {/* pricing card */}
          <button
            onClick={() => onSelect({ kind: "pricing" })}
            className="of-plate of-lift group of-slide-up border-0 bg-gradient-to-br from-[#2b2721] to-[#17140f] p-4 text-left"
            style={{ animationDelay: `${familyOrder.length * 50}ms` }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-brass-400" />
                <span className="font-mono text-[9px] font-semibold text-brass-400">PLANS</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-[#f3dfa6]" />
            </div>
            <h3 className="mb-1 font-display text-base font-semibold tracking-tight text-white">Pricing Plans</h3>
            <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-zinc-400">
              Starter, Growth, Professional, Enterprise — compare modules, deliverables, and support.
            </p>
            <div className="mb-3 flex flex-wrap items-center gap-1.5">
              {tierOrder.map((t) => (
                <span key={t} className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[8px] font-bold text-white/70">
                  {tierDisplay[t].short}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-white/10 pt-2.5">
              <span className="text-[11px] font-medium text-zinc-300">Compare all plans</span>
              <ArrowRight className="h-3 w-3 text-zinc-400 transition-transform group-hover:translate-x-0.5" />
            </div>
          </button>
        </div>
      </section>

      {/* ── Featured showcase — one authored kit per family ─────── */}
      <section className="pb-12">
        <div className="mb-4 flex items-center gap-2">
          <Eye className="h-4 w-4 text-brass-600 dark:text-brass-400" />
          <h2 className="font-display text-lg font-semibold tracking-tight">The showcase wall</h2>
          <span className="font-mono text-[11px] text-zinc-400">hand-authored kits — try, read, buy, download</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {featured.map(({ fid, fp, example }, i) => {
            const offer = deriveOffer(fp.product.id, example);
            return (
              <ProductPlate
                key={fid}
                offer={offer}
                example={example}
                familyShort={familyMeta[fid].short}
                plateNo={plateNumbers[example.label] ?? "001"}
                index={i}
                onOpen={() => onOpen(example, fp.product.name)}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

/* ─── App ────────────────────────────────────────────────────────── */

function App() {
  const [view, setView] = useState<View>({ kind: "home" });
  const [studio, setStudio] = useState<StudioState>(null);

  const handleOpen = (example: ProductExample, productName: string) => {
    const productId = productIdFor(example);
    setStudio({ offer: deriveOffer(productId, example), config: example, businessName: productName, example });
  };

  const activeFamily = view.kind === "family" ? view.familyId : null;

  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-50">
      {/* Header — engraved brand, brass hairline */}
      <header className="of-hairline-b sticky top-0 z-30 bg-[var(--of-plate-bg)]/90 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="of-foil-bar of-sheen grid h-8 w-8 place-items-center rounded-lg shadow-inner">
                <Zap className="h-4 w-4 text-[#17140f]" />
              </div>
              <div>
                <div className="of-engrave font-display text-sm font-bold leading-tight tracking-tight">OMNIFORGE</div>
                <div className="font-mono text-[10px] leading-tight text-zinc-400">Design Family Engine · Elite Edition</div>
              </div>
            </div>
            <div className="hidden items-center gap-1.5 font-mono text-[11px] text-zinc-400 sm:flex">
              <Layers className="h-3.5 w-3.5" />
              <span>5 families · {totalProducts} products · {heroCount} authored kits</span>
            </div>
          </div>
        </div>
      </header>

      <TopNav view={view} onSelect={setView} />

      {view.kind === "home" && <HomeView onSelect={setView} onOpen={handleOpen} />}
      {activeFamily && <FamilyView familyId={activeFamily} onOpen={handleOpen} />}
      {view.kind === "pricing" && <PricingView />}

      {/* Footer */}
      <footer className="of-hairline-t mt-auto py-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-brass-500" />
              <span className="of-engrave font-display text-sm font-bold text-zinc-600 dark:text-zinc-400">OMNIFORGE</span>
            </div>
            <p className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
              {totalProducts} products · {totalExamples} examples · 5 families · 4 plans · 22 modules
            </p>
          </div>
          <p className="mt-3 font-mono text-[10px] text-zinc-400/80 dark:text-zinc-600">
            Ratings, sold counts and prices are labeled demo data. Manifests match archives 1:1 — every file carries its honest flag.
          </p>
        </div>
      </footer>

      {/* The studio — live presentation + instant delivery */}
      {studio && (
        <PresentationStudio
          offer={studio.offer}
          config={studio.config}
          businessName={studio.businessName}
          example={studio.example}
          onClose={() => setStudio(null)}
        />
      )}
    </div>
  );
}

export default App;
