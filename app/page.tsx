"use client";

import { useMemo, useState } from "react";
import {
  Zap,
  ArrowRight,
  ArrowUpRight,
  Eye,
  Check,
  Layers,
  ChevronDown,
  Tag,
  FileText,
  LayoutGrid,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import type { MockupConfig } from "@/data/businessTypes";
import { BrowserFrame } from "@/components/BrowserFrame";
import {
  productTierCategories,
  subscriptionSection,
  type ProductType,
  type ProductExample,
} from "@/data/exampleProducts";
import { tierOrder, tierDisplay, getPackage } from "@/data/servicePackages";
import { familyTokens, getFamilyForProductType, type DesignFamilyId } from "@/data/designFamilies";

// ─── Family metadata ──────────────────────────────────────────────

const familyMeta: Record<DesignFamilyId, {
  label: string;
  short: string;
  recipe: string;
  blurb: string;
  chip: string;
  text: string;
  border: string;
  bg: string;
  icon: LucideIcon;
}> = {
  micro: {
    label: "Micro Products",
    short: "Micro",
    recipe: "Pentagram + Raycast",
    blurb: "Small, focused digital products — landing templates, calculators, resume kits, checklists, template packs. Bold typographic heroes, numbered feature lists, instant-buy CTAs.",
    chip: "text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800",
    text: "text-zinc-700 dark:text-zinc-300",
    border: "border-zinc-300 dark:border-zinc-700",
    bg: "bg-zinc-50 dark:bg-zinc-900",
    icon: Zap,
  },
  "industry-warm": {
    label: "Industry & Hospitality",
    short: "Industry",
    recipe: "Aesop + Stripe Press",
    blurb: "Website kits for dental clinics, gyms, law firms, restaurants. Serif body copy, editorial layouts, full-bleed photography, small-caps section labels.",
    chip: "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-300 dark:border-amber-800",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    icon: LayoutGrid,
  },
  "data-dense": {
    label: "Data Dashboards",
    short: "Data",
    recipe: "Bloomberg Terminal",
    blurb: "Dashboards, design systems, inventory tools, monitoring platforms. Monospaced type, tabular data, hairline panels, ticker strips, zero radius.",
    chip: "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-300 dark:border-emerald-800",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    icon: Boxes,
  },
  "saas-product": {
    label: "SaaS Products",
    short: "SaaS",
    recipe: "Linear",
    blurb: "Appointment systems, client portals, CRMs, booking platforms, SaaS tools. Hairline borders, gradient-mesh heroes, feature grids, keyboard-chip UI.",
    chip: "text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40",
    text: "text-sky-700 dark:text-sky-400",
    border: "border-sky-300 dark:border-sky-800",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    icon: Layers,
  },
  "enterprise-platform": {
    label: "Enterprise Platforms",
    short: "Enterprise",
    recipe: "Bloomberg + Linear",
    blurb: "Custom SaaS, marketplaces, multi-tenant apps, enterprise systems. Dashboard interfaces with sidebar rails, KPI panels, activity feeds, and request-demo funnels.",
    chip: "text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40",
    text: "text-violet-700 dark:text-violet-400",
    border: "border-violet-300 dark:border-violet-800",
    bg: "bg-violet-50 dark:bg-violet-950/30",
    icon: Eye,
  },
};

const familyOrder: DesignFamilyId[] = ["micro", "industry-warm", "data-dense", "saas-product", "enterprise-platform"];

const tierColorMap: Record<string, { text: string; chip: string; badge: string; dot: string }> = {
  amber: { text: "text-amber-600 dark:text-amber-400", chip: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40", badge: "bg-amber-500", dot: "bg-amber-400" },
  sky: { text: "text-sky-600 dark:text-sky-400", chip: "text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40", badge: "bg-sky-500", dot: "bg-sky-400" },
  emerald: { text: "text-emerald-600 dark:text-emerald-400", chip: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40", badge: "bg-emerald-500", dot: "bg-emerald-400" },
  violet: { text: "text-violet-600 dark:text-violet-400", chip: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40", badge: "bg-violet-600", dot: "bg-violet-400" },
};

// ─── Aggregate data: products grouped by family, with tier info ──

type FamilyProduct = {
  product: ProductType;
  tierLetter: string;
  tierName: string;
  tierColor: string;
  priceRange: string;
};

const allTierSections = [
  ...productTierCategories.map((c) => ({ letter: c.letter, name: c.name, priceRange: c.priceRange, color: c.color, products: c.products })),
  { letter: "S", name: subscriptionSection.name, priceRange: subscriptionSection.priceRange, color: "emerald", products: subscriptionSection.products },
];

const familyProductMap: Record<DesignFamilyId, FamilyProduct[]> = {
  micro: [],
  "industry-warm": [],
  "data-dense": [],
  "saas-product": [],
  "enterprise-platform": [],
};
for (const section of allTierSections) {
  for (const product of section.products) {
    const fid = getFamilyForProductType(product.id);
    familyProductMap[fid].push({
      product,
      tierLetter: section.letter,
      tierName: section.name,
      tierColor: section.color,
      priceRange: section.priceRange,
    });
  }
}

const totalProducts = familyOrder.reduce((n, f) => n + familyProductMap[f].length, 0);
const totalExamples = familyOrder.reduce(
  (n, f) => n + familyProductMap[f].reduce((m, fp) => m + fp.product.examples.length, 0),
  0
);

// ─── Label → productId lookup for ExampleCard family badges ──────

const labelToProductId: Record<string, string> = {};
for (const section of allTierSections) {
  for (const product of section.products) {
    for (const ex of product.examples) labelToProductId[ex.label] = product.id;
  }
}
function guessProductId(example: ProductExample): string {
  return labelToProductId[example.label] ?? "landing-template";
}

// ─── MiniPreview (unchanged) ──────────────────────────────────────

function MiniPreview({ config }: { config: MockupConfig }) {
  const t = config.theme;
  const isElevated = config.layout === "premium" || config.layout === "standard";
  const isPremium = config.layout === "premium";
  const [imgFailed, setImgFailed] = useState(false);
  const showImg = config.heroImage && !imgFailed;
  return (
    <div style={{ fontFamily: t.font }} className="w-full h-full overflow-hidden flex flex-col pointer-events-none select-none">
      <div
        className="flex items-center justify-between px-2 py-1.5 shrink-0"
        style={{
          background: showImg ? "rgba(0,0,0,0.25)" : t.nav,
          borderBottom: showImg ? "none" : `1px solid ${t.border}`,
          position: showImg ? "absolute" : "relative",
          top: 0, left: 0, right: 0, zIndex: 10,
        }}
      >
        <div className="flex items-center gap-1">
          <div className="w-2 h-2" style={{ background: t.accent, borderRadius: isElevated ? 3 : 999 }} />
          <span className="text-[7px] font-bold" style={{ color: showImg ? "#fff" : t.text }}>{config.label}</span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="w-2.5 h-0.5 rounded-full" style={{ background: showImg ? "rgba(255,255,255,0.4)" : t.muted, opacity: 0.5 }} />
          ))}
        </div>
      </div>
      <div className="relative flex-1 min-h-0" style={{ backgroundColor: t.bg, marginTop: isElevated ? 0 : undefined }}>
        {showImg ? (
          <img src={config.heroImage} alt="" onError={() => setImgFailed(true)} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.surface})` }} />
        )}
        {showImg && (
          <div className="absolute inset-0" style={{ background: isPremium ? "linear-gradient(135deg, rgba(0,0,0,0.65), rgba(0,0,0,0.25))" : "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.55))" }} />
        )}
        <div className={`relative p-2.5 h-full flex flex-col justify-center ${isPremium ? "" : "items-center text-center"}`}>
          <div className="text-[6px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mb-1 inline-block w-fit" style={{ background: t.accent, color: "#fff" }}>
            {tierDisplay[config.tier].label}
          </div>
          <div className="text-[9px] font-bold leading-tight max-w-[92%]" style={{ color: showImg ? "#fff" : t.text, textShadow: showImg ? "0 1px 6px rgba(0,0,0,0.5)" : "none" }}>
            {config.tagline.length > 36 ? config.tagline.slice(0, 36) + "…" : config.tagline}
          </div>
          {showImg && (
            <div className="mt-1.5 inline-block text-[6px] font-semibold px-1.5 py-0.5 rounded w-fit" style={{ background: t.accent, color: "#fff" }}>
              {config.tier === "enterprise" ? "Request Demo" : "Get Started"}
            </div>
          )}
        </div>
      </div>
      <div className="px-2 py-1.5 space-y-1 shrink-0" style={{ background: t.bg }}>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 h-3.5 rounded" style={{ background: t.surface, border: `1px solid ${t.border}` }} />
          ))}
        </div>
        <div className="h-1.5 rounded" style={{ background: t.accentSoft, opacity: 0.4 }} />
      </div>
    </div>
  );
}

// ─── View type & preview fn ───────────────────────────────────────

type View =
  | { kind: "home" }
  | { kind: "family"; familyId: DesignFamilyId }
  | { kind: "pricing" };

type PreviewFn = (config: MockupConfig, name: string, example?: ProductExample) => void;

// ─── TopNav: design families are the primary axis ─────────────────

function TopNav({ view, onSelect }: { view: View; onSelect: (v: View) => void }) {
  return (
    <div className="sticky top-14 z-20 bg-zinc-50/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => onSelect({ kind: "home" })}
            className={`group flex items-center gap-2 py-2 px-2.5 rounded-lg border transition-all duration-150 shrink-0 ${
              view.kind === "home"
                ? "bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100"
                : "bg-white dark:bg-zinc-900 border-zinc-200/70 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
            }`}
          >
            <Zap className={`w-4 h-4 ${view.kind === "home" ? "text-white dark:text-zinc-900" : "text-zinc-400 dark:text-zinc-500"}`} />
            <div className="text-left min-w-0 hidden sm:block">
              <div className={`text-[11px] font-semibold leading-tight truncate ${view.kind === "home" ? "text-white dark:text-zinc-900" : "text-zinc-600 dark:text-zinc-400"}`}>
                Home
              </div>
              <div className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 mt-0.5">All families</div>
            </div>
          </button>
          <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 shrink-0 mx-0.5" />
          {familyOrder.map((fid) => {
            const fm = familyMeta[fid];
            const isActive = view.kind === "family" && view.familyId === fid;
            const count = familyProductMap[fid].length;
            return (
              <button
                key={fid}
                onClick={() => onSelect({ kind: "family", familyId: fid })}
                className={`group flex items-center gap-2 py-2 px-2.5 rounded-lg border transition-all duration-150 shrink-0 ${
                  isActive
                    ? `${fm.bg} ${fm.border}`
                    : "bg-white dark:bg-zinc-900 border-zinc-200/70 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <fm.icon className={`w-4 h-4 ${isActive ? fm.text : "text-zinc-400 dark:text-zinc-500"}`} />
                <div className="text-left min-w-0 hidden sm:block">
                  <div className={`text-[11px] font-semibold leading-tight truncate ${isActive ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-600 dark:text-zinc-400"}`}>
                    {fm.short}
                  </div>
                  <div className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 mt-0.5">{count} products</div>
                </div>
              </button>
            );
          })}
          <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800 shrink-0 mx-0.5" />
          <button
            onClick={() => onSelect({ kind: "pricing" })}
            className={`group flex items-center gap-2 py-2 px-2.5 rounded-lg border transition-all duration-150 shrink-0 ${
              view.kind === "pricing"
                ? "bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100"
                : "bg-white dark:bg-zinc-900 border-zinc-200/70 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
            }`}
          >
            <Tag className={`w-4 h-4 ${view.kind === "pricing" ? "text-white dark:text-zinc-900" : "text-zinc-400 dark:text-zinc-500"}`} />
            <div className="text-left min-w-0 hidden sm:block">
              <div className={`text-[11px] font-semibold leading-tight truncate ${view.kind === "pricing" ? "text-white dark:text-zinc-900" : "text-zinc-600 dark:text-zinc-400"}`}>
                Pricing
              </div>
              <div className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 mt-0.5">4 plans</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PricingView (unchanged) ──────────────────────────────────────

function PricingView() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div className="animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
          <Tag className="w-5 h-5 text-zinc-900 dark:text-zinc-50" />
          <h2 className="font-display text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">Pricing Plans</h2>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Four service tiers from a single-page Starter to a full Enterprise platform. Every product example maps to one of these tiers.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {tierOrder.map((tier, i) => {
          const pkg = getPackage(tier);
          const td = tierDisplay[tier];
          const tc = tierColorMap[td.color];
          return (
            <div
              key={tier}
              className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200/80 dark:border-zinc-800 p-4 animate-slide-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${tc.dot}`} />
                  <span className={`text-xs font-bold ${tc.text}`}>{td.label}</span>
                </div>
                <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{td.short}</span>
              </div>
              <div className="font-mono text-base font-bold text-zinc-900 dark:text-zinc-50 mb-0.5">{pkg.priceRange}</div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-3">{pkg.deliveryWeeks}</div>
              <div className="space-y-1.5 mb-3">
                {pkg.features.slice(0, 4).map((f, j) => (
                  <div key={j} className="flex items-start gap-1.5">
                    <Check className={`w-3 h-3 ${tc.text} shrink-0 mt-0.5`} strokeWidth={3} />
                    <span className="text-[10px] text-zinc-600 dark:text-zinc-400 leading-tight">{f}</span>
                  </div>
                ))}
                <div className="text-[10px] text-zinc-400 dark:text-zinc-500 pt-0.5">+{pkg.features.length - 4} more</div>
              </div>
              <div className="pt-2.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Modules</span>
                <span className={`font-mono text-[10px] font-bold ${tc.text}`}>{pkg.modules.length}/22</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────

function extractPageCount(features: string[]): number | null {
  for (const f of features) {
    const m = f.match(/(\d+)\s*pages?/i);
    if (m) return parseInt(m[1], 10);
  }
  for (const f of features) {
    if (/one-page|single-page|1-page/i.test(f)) return 1;
  }
  return null;
}

// ─── ExampleCard ──────────────────────────────────────────────────

function ExampleCard({ example, onPreview, index }: { example: ProductExample; onPreview: () => void; index: number }) {
  const td = tierDisplay[example.tier];
  const tc = tierColorMap[td.color];
  const pages = extractPageCount(example.features);
  const familyId = getFamilyForProductType(guessProductId(example));
  const fm = familyMeta[familyId];
  return (
    <button
      onClick={onPreview}
      className="group text-left bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200/80 dark:border-zinc-800 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all duration-150 hover:-translate-y-0.5 animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <MiniPreview config={example} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 rounded-md px-2.5 py-1 text-[11px] font-semibold shadow-md flex items-center gap-1.5">
            <Eye className="w-3 h-3" /> Preview <ArrowRight className="w-3 h-3" />
          </div>
        </div>
        <div className="absolute top-1.5 right-1.5 z-20 flex items-center gap-1">
          {pages !== null && (
            <span className="font-mono px-1.5 py-0.5 rounded text-[8px] font-bold text-zinc-600 dark:text-zinc-300 bg-white/90 dark:bg-zinc-800/90 shadow-sm flex items-center gap-0.5">
              <FileText className="w-2.5 h-2.5" />
              {pages === 1 ? "1 pg" : `${pages} pgs`}
            </span>
          )}
          <span className={`font-mono px-1.5 py-0.5 rounded text-[8px] font-bold text-white shadow-sm ${tc.badge}`}>
            {td.short}
          </span>
        </div>
        <div className="absolute bottom-1.5 left-1.5 z-20">
          <span className={`font-mono px-1.5 py-0.5 rounded text-[7px] font-semibold ${fm.chip}`}>
            {fm.short}
          </span>
        </div>
      </div>
      <div className="p-2.5">
        <div className="text-[11px] font-bold text-zinc-900 dark:text-zinc-50 truncate mb-0.5">{example.exampleName}</div>
        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-snug">{example.exampleDescription}</p>
        <div className="mt-1.5 flex items-center justify-between">
          <span className="font-mono text-[8px] text-zinc-400 dark:text-zinc-500">{fm.recipe}</span>
          {pages !== null && (
            <div className="flex items-center gap-1 text-[9px] text-zinc-400 dark:text-zinc-500">
              <FileText className="w-2.5 h-2.5" />
              <span className="font-mono">{pages === 1 ? "Single page" : `${pages} pages`}</span>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}

// ─── ProductSection: expandable, shows tier badge ─────────────────

function ProductSection({
  fp,
  onPreview,
  index,
}: {
  fp: FamilyProduct;
  onPreview: PreviewFn;
  index: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const tc = tierColorMap[fp.tierColor] ?? tierColorMap.amber;
  return (
    <div
      className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200/80 dark:border-zinc-800 overflow-hidden animate-slide-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3.5 sm:p-4 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`flex items-center justify-center w-6 h-6 rounded font-mono text-[10px] font-bold shrink-0 ${tc.chip}`}>
            {fp.tierLetter}
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{fp.product.name}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">{fp.product.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="font-mono text-[9px] font-semibold text-zinc-400 dark:text-zinc-500 hidden sm:inline">{fp.product.examples.length} examples</span>
          <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        </div>
      </button>
      {expanded && (
        <div className="px-3.5 sm:px-4 pb-4 pt-1 border-t border-zinc-100 dark:border-zinc-800 animate-expand">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-3">
            {fp.product.examples.map((ex, i) => (
              <ExampleCard
                key={i}
                example={ex}
                index={i}
                onPreview={() => onPreview(ex, fp.product.name, ex)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── FamilyView: all products in a family, grouped by tier ────────

function FamilyView({ familyId, onPreview }: { familyId: DesignFamilyId; onPreview: PreviewFn }) {
  const fm = familyMeta[familyId];
  const tokens = familyTokens[familyId];
  const items = familyProductMap[familyId];
  const exampleCount = items.reduce((n, fp) => n + fp.product.examples.length, 0);

  // Group by tier letter for sub-sections
  const byTier = useMemo(() => {
    const groups: Record<string, FamilyProduct[]> = {};
    for (const fp of items) {
      const key = fp.tierLetter;
      if (!groups[key]) groups[key] = [];
      groups[key].push(fp);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [items]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Family header */}
      <div className={`rounded-lg ${fm.bg} border ${fm.border} p-4 sm:p-5 animate-slide-up`}>
        <div className="flex items-start justify-between flex-wrap gap-3 mb-2">
          <div className="flex items-center gap-3">
            <fm.icon className={`w-5 h-5 ${fm.text}`} />
            <h2 className="font-display text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">{fm.label}</h2>
          </div>
          <span className={`font-mono text-[10px] font-semibold px-2 py-1 rounded ${fm.chip}`}>
            {items.length} products · {exampleCount} examples
          </span>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mb-3">{fm.blurb}</p>
        <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-500 dark:text-zinc-400">
          <span>Recipe: {fm.recipe}</span>
          <span>·</span>
          <span>{tokens.radius.md}px radius</span>
          <span>·</span>
          <span>{tokens.sectionStyle}</span>
        </div>
      </div>

      {/* Products grouped by tier */}
      {byTier.map(([tierLetter, tierProducts]) => {
        const tc = tierColorMap[tierProducts[0].tierColor] ?? tierColorMap.amber;
        const tierName = tierProducts[0].tierName;
        const priceRange = tierProducts[0].priceRange;
        return (
          <div key={tierLetter} className="space-y-2.5">
            <div className="flex items-center gap-2 mb-1">
              <span className={`flex items-center justify-center w-6 h-6 rounded font-mono text-[10px] font-bold ${tc.chip}`}>
                {tierLetter}
              </span>
              <h3 className="font-display text-base font-bold text-zinc-900 dark:text-zinc-50">{tierName}</h3>
              <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">{priceRange}</span>
              <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">· {tierProducts.length} products</span>
            </div>
            <div className="space-y-2.5">
              {tierProducts.map((fp, i) => (
                <ProductSection key={fp.product.id} fp={fp} onPreview={onPreview} index={i} />
              ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}

// ─── HomeView: family picker + featured examples ──────────────────

function HomeView({ onSelect, onPreview }: { onSelect: (v: View) => void; onPreview: PreviewFn }) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="pt-8 pb-6 animate-slide-up">
        <div className="font-mono text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-3">
          <span className="text-zinc-400 dark:text-zinc-600">/</span> Product tier engine
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-50 leading-[1.08] max-w-3xl">
          Pick a design family. See every product we can build in it.
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mb-4">
          {totalProducts} product types across {totalExamples} live examples. Each design family has its own visual language — typography, color, layout, and interaction patterns. Start with a family, then drill into its products and preview real examples.
        </p>

        {/* Stat strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
          {[
            { label: "Design families", value: "5", sub: "Distinct visual languages" },
            { label: "Product types", value: String(totalProducts), sub: "Across all tiers" },
            { label: "Live examples", value: String(totalExamples), sub: "Previewable now" },
            { label: "Pricing tiers", value: "4", sub: "Starter → Enterprise" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200/80 dark:border-zinc-800 p-3 animate-slide-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">{s.label}</div>
              <div className="font-display text-xl font-bold text-zinc-900 dark:text-zinc-50 leading-none mb-1">{s.value}</div>
              <div className="text-[10px] text-zinc-500 dark:text-zinc-400">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Family picker — the primary entry point */}
      <section className="pb-6">
        <div className="flex items-center gap-2 mb-4">
          <LayoutGrid className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
          <h2 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-50">Design families</h2>
          <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">click to browse products</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {familyOrder.map((fid, i) => {
            const fm = familyMeta[fid];
            const items = familyProductMap[fid];
            const exampleCount = items.reduce((n, fp) => n + fp.product.examples.length, 0);
            // Collect tier letters present in this family
            const tierLetters = [...new Set(items.map((fp) => fp.tierLetter))].sort();
            return (
              <button
                key={fid}
                onClick={() => onSelect({ kind: "family", familyId: fid })}
                className={`group text-left p-4 rounded-lg border ${fm.border} ${fm.bg} hover:shadow-md transition-all duration-150 animate-slide-up`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <fm.icon className={`w-4 h-4 ${fm.text}`} />
                    <span className={`font-mono text-[9px] font-semibold ${fm.text}`}>FAMILY</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                </div>
                <h3 className="font-display text-base font-bold text-zinc-900 dark:text-zinc-50 mb-1">{fm.label}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3 line-clamp-2">{fm.blurb}</p>
                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  {tierLetters.map((l) => {
                    const fp = items.find((fp) => fp.tierLetter === l)!;
                    const tc = tierColorMap[fp.tierColor] ?? tierColorMap.amber;
                    return (
                      <span key={l} className={`font-mono text-[8px] font-bold px-1.5 py-0.5 rounded ${tc.chip}`}>{l}</span>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between pt-2.5 border-t border-zinc-200/60 dark:border-zinc-800">
                  <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">{items.length} products · {exampleCount} examples</span>
                  <span className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500">{fm.recipe}</span>
                </div>
              </button>
            );
          })}
          {/* Pricing card */}
          <button
            onClick={() => onSelect({ kind: "pricing" })}
            className="group text-left p-4 rounded-lg border border-zinc-900 dark:border-zinc-100 bg-zinc-900 dark:bg-zinc-100 hover:shadow-md transition-all duration-150 animate-slide-up"
            style={{ animationDelay: `${familyOrder.length * 50}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-white dark:text-zinc-900" />
                <span className="font-mono text-[9px] font-semibold text-white dark:text-zinc-900">PLANS</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 dark:text-zinc-500 group-hover:text-white dark:group-hover:text-zinc-900 transition-colors" />
            </div>
            <h3 className="font-display text-base font-bold text-white dark:text-zinc-900 mb-1">Pricing Plans</h3>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed mb-3 line-clamp-2">Starter, Growth, Professional, Enterprise — compare modules, deliverables, and support.</p>
            <div className="flex items-center gap-1.5 mb-3">
              {tierOrder.map((t) => (
                <span key={t} className="font-mono text-[8px] font-bold px-1.5 py-0.5 rounded text-white/70 dark:text-zinc-900/70 bg-white/10 dark:bg-zinc-900/10">
                  {tierDisplay[t].short}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-2.5 border-t border-white/10 dark:border-zinc-900/10">
              <span className="text-[11px] font-medium text-zinc-300 dark:text-zinc-600">Compare all plans</span>
              <ArrowRight className="w-3 h-3 text-zinc-400 dark:text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </section>

      {/* Featured examples — one from each family */}
      <section className="pb-12">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
          <h2 className="font-display text-lg font-bold text-zinc-900 dark:text-zinc-50">Featured examples</h2>
          <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">one from each family — click to preview</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5">
          {familyOrder.map((fid, i) => {
            const items = familyProductMap[fid];
            if (items.length === 0) return null;
            const product = items[0].product;
            const example = product.examples[0];
            return (
              <ExampleCard
                key={fid}
                example={example}
                index={i}
                onPreview={() => onPreview(example, product.name, example)}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}

// ─── App ──────────────────────────────────────────────────────────

function App() {
  const [view, setView] = useState<View>({ kind: "home" });
  const [selectedConfig, setSelectedConfig] = useState<{ config: MockupConfig; businessName: string; example?: ProductExample } | null>(null);

  const activeFamily = view.kind === "family" ? view.familyId : null;

  const handlePreview: PreviewFn = (config, businessName, example) =>
    setSelectedConfig({ config, businessName, example });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-lg border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white dark:text-zinc-900" />
              </div>
              <div>
                <div className="font-display text-sm font-bold leading-tight tracking-tight">OMNIFORGE</div>
                <div className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight">Design Family Engine</div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
              <Layers className="w-3.5 h-3.5" />
              <span>5 families · {totalProducts} products · {totalExamples} examples</span>
            </div>
          </div>
        </div>
      </header>

      {/* Top Navigation — design families are primary */}
      <TopNav view={view} onSelect={setView} />

      {/* Home */}
      {view.kind === "home" && (
        <HomeView onSelect={setView} onPreview={handlePreview} />
      )}

      {/* Family View */}
      {activeFamily && (
        <FamilyView familyId={activeFamily} onPreview={handlePreview} />
      )}

      {/* Pricing View */}
      {view.kind === "pricing" && <PricingView />}

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 dark:border-zinc-800 py-7 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-zinc-400" />
              <span className="font-display text-sm font-bold text-zinc-600 dark:text-zinc-400">OMNIFORGE</span>
            </div>
            <p className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
              {totalProducts} products · {totalExamples} examples · 5 design families · 4 plans · 22 modules
            </p>
          </div>
          <p className="font-mono text-[10px] text-zinc-300 dark:text-zinc-600 mt-3">
            Prices are illustrative starting hypotheses, not verified market rates.
          </p>
        </div>
      </footer>

      {/* Preview modal */}
      {selectedConfig && (
        <BrowserFrame
          config={selectedConfig.config}
          businessName={selectedConfig.businessName}
          onClose={() => setSelectedConfig(null)}
          example={selectedConfig.example}
        />
      )}
    </div>
  );
}

export default App;
