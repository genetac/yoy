"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  X,
  Eye,
  Package,
  GitCompare,
  Check,
  Clock,
  DollarSign,
  Layers,
  FileText,
  Monitor,
  Tablet,
  Smartphone,
  Lock,
  Info,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Gauge,
  Keyboard,
  ShieldCheck,
  Box,
} from "lucide-react";
import type { MockupConfig } from "@/data/businessTypes";
import type { ProductExample } from "@/data/exampleProducts";
import dynamic from "next/dynamic";
import { FamilyPreview } from "./FamilyPreview";
import { deriveOffer, formatPrice, deliveryLabel, type OfferV2 } from "./product-catalog";
import { bundleStats, fmtBytes } from "./catalog/schema";
import { PurchaseButton } from "./purchase-flow";
import {
  ManifestExplorer,
  ProofRow,
  PolicyChips,
  CompletionSeal,
  TestimonialQuote,
} from "./listing-extras";
import { demoKindFor, loadDemoContent, loadDemoSurface } from "./demo-surfaces";
import type { DemoSurfaceProps } from "./demo-surfaces";
import {
  getPackage,
  lowTierPackage,
  midTierPackage,
  highTierPackage,
  enterpriseTierPackage,
  tierDisplay,
  type Tier,
} from "@/data/servicePackages";
import { familyTokens, getFamilyForProductType, type DesignFamilyId } from "@/data/designFamilies";
import { overlayIn, panelIn } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Props = {
  config: MockupConfig;
  businessName: string;
  onClose: () => void;
  example?: ProductExample;
  /** Catalog context for the end-product offer panel */
  offerContext?: {
    tierLetter: string;
    productTypeId: string;
    productName: string;
  };
};

type Tab = "try" | "preview" | "services" | "comparison";
type Device = "desktop" | "tablet" | "mobile";

/* P4/T2 — the 3-D device stage loads only here, desktop-only, lazily */
const DeviceStage3D = dynamic(
  () => import("./device-stage-3d").then((m) => ({ default: m.DeviceStage3D })),
  { ssr: false }
);

/** Client-only capability gate (mirrors deviceStageSupported()).
 *  Safe as a lazy initializer: the studio renders only after user
 *  interaction, so no SSR/hydration path can reach it. */
function useDeviceStageEnabled(): boolean {
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (window.matchMedia("(pointer: coarse)").matches) return false;
    if ((navigator.hardwareConcurrency ?? 8) < 4) return false;
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl2") ?? c.getContext("webgl"));
    } catch {
      return false;
    }
  });
  return enabled;
}

const tierAccent: Record<Tier, { text: string; bg: string; border: string }> = {
  low: { text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-800" },
  mid: { text: "text-sky-600 dark:text-sky-400", bg: "bg-sky-50 dark:bg-sky-950/30", border: "border-sky-200 dark:border-sky-800" },
  high: { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800" },
  enterprise: { text: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950/30", border: "border-violet-200 dark:border-violet-800" },
};

const devices: { id: Device; label: string; icon: typeof Monitor; width: number | null }[] = [
  { id: "desktop", label: "Desktop", icon: Monitor, width: null },
  { id: "tablet", label: "Tablet", icon: Tablet, width: 768 },
  { id: "mobile", label: "Mobile", icon: Smartphone, width: 390 },
];

/* ── Focus trap utilities ─────────────────────────────────────────── */

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function useFocusTrap(active: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;
    returnFocusRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    const first = ref.current?.querySelector<HTMLElement>(FOCUSABLE);
    requestAnimationFrame(() => first?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !ref.current) return;
      const nodes = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (n) => n.offsetParent !== null
      );
      if (nodes.length === 0) return;
      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstNode) {
        e.preventDefault();
        lastNode.focus();
      } else if (!e.shiftKey && document.activeElement === lastNode) {
        e.preventDefault();
        firstNode.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      returnFocusRef.current?.focus?.();
    };
  }, [active, onClose]);

  return ref;
}

/* ── Why this design (design brief summary) ──────────────────────── */

const familyWhy: Record<DesignFamilyId, { audience: string; hierarchy: string; intent: string }> = {
  micro: {
    audience: "Solo buyers evaluating a small, focused product in seconds",
    hierarchy: "One bold typographic hero, numbered feature list, single instant-buy CTA",
    intent: "Instant comprehension → immediate purchase with near-zero friction",
  },
  "industry-warm": {
    audience: "Local-service visitors who choose businesses on trust and warmth",
    hierarchy: "Editorial serif copy, full-bleed photography, small-caps section labels",
    intent: "Build emotional trust, then drive contact / booking actions",
  },
  "data-dense": {
    audience: "Operators and analysts who need dense, ordered information",
    hierarchy: "Monospaced type, tabular data, hairline panels, status semantics",
    intent: "Fast scanning and confident operational decisions",
  },
  "saas-product": {
    audience: "B2B evaluators comparing tools on clarity and craft",
    hierarchy: "Crisp product UI, gradient-mesh hero, feature grid, keyboard-chip UI",
    intent: "Communicate product polish, then convert to trial or demo",
  },
  "enterprise-platform": {
    audience: "Procurement teams assessing complex platforms",
    hierarchy: "Multi-level navigation, KPI panels, activity feeds, request-demo funnels",
    intent: "Demonstrate operational depth, then route to a sales conversation",
  },
};

/* ════════════════════════════════════════════════════════════════════
   PresentationStudio — the upgraded BrowserFrame
   ════════════════════════════════════════════════════════════════════ */

export function PresentationStudio({ config, businessName, onClose, example, offerContext }: Props) {
  const demoKind = offerContext && example ? demoKindFor(offerContext.productTypeId) : null;
  const [tab, setTab] = useState<Tab>(demoKind ? "try" : "preview");
  const [device, setDevice] = useState<Device>("desktop");
  const [useStage, setUseStage] = useState(false);
  const stageEnabled = useDeviceStageEnabled();
  const dialogRef = useFocusTrap(true, onClose);
  const pkg = getPackage(config.tier);
  const td = tierDisplay[config.tier];
  const url = `${config.label.toLowerCase().replace(/[^a-z]/g, "")}.com`;
  const familyId = getFamilyForProductType(
    example ? guessProductTypeId(example) : config.layout === "premium" ? "saas-tool" : "landing-template"
  );
  const why = familyWhy[familyId];
  const tokens = familyTokens[familyId];

  /* End-product offer derived from the catalog (demo-labeled) */
  const offer = useMemo<OfferV2 | null>(() => {
    if (!example || !offerContext) return null;
    return deriveOffer({
      tierLetter: offerContext.tierLetter,
      productTypeId: offerContext.productTypeId,
      exampleName: example.exampleName,
      features: example.features,
      exampleDescription: example.exampleDescription,
    });
  }, [example, offerContext]);

  const stats = useMemo(() => (offer ? bundleStats(offer) : null), [offer]);

  const cycleDevice = useCallback((dir: 1 | -1) => {
    setDevice((d) => {
      const idx = devices.findIndex((x) => x.id === d);
      return devices[(idx + dir + devices.length) % devices.length].id;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (tab !== "preview") return;
      if (e.key === "ArrowRight" && e.altKey) cycleDevice(1);
      if (e.key === "ArrowLeft" && e.altKey) cycleDevice(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [tab, cycleDevice]);

  const tabs: { id: Tab; label: string; icon: typeof Eye }[] = demoKind
    ? [
        { id: "try", label: "Try it", icon: Sparkles },
        { id: "preview", label: "Live Preview", icon: Eye },
        { id: "services", label: "What's Included", icon: Package },
        { id: "comparison", label: "Compare Tiers", icon: GitCompare },
      ]
    : [
        { id: "preview", label: "Live Preview", icon: Eye },
        { id: "services", label: "What's Included", icon: Package },
        { id: "comparison", label: "Compare Tiers", icon: GitCompare },
      ];

  const activeDevice = devices.find((d) => d.id === device)!;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 backdrop-blur-md sm:p-4"
        initial="hidden"
        animate="show"
        exit="exit"
        variants={overlayIn}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Preview of ${businessName} — ${config.label}`}
      >
        <motion.div
          className="curtain-lift flex max-h-[96vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          variants={panelIn}
        >
          {/* Chrome bar */}
          <div className="flex shrink-0 items-center gap-2 border-b border-border bg-muted/50 px-3 py-2.5 sm:px-4">
            <div className="flex shrink-0 gap-1.5" aria-hidden="true">
              <div className="size-3 rounded-full bg-red-400/90" />
              <div className="size-3 rounded-full bg-amber-400/90" />
              <div className="size-3 rounded-full bg-green-400/90" />
            </div>
            <div className="mx-2 min-w-0 flex-1 sm:mx-3">
              <div className="flex items-center gap-2 truncate rounded-md bg-background px-3 py-1.5 text-xs text-muted-foreground">
                <Lock className="size-3 shrink-0 text-emerald-500" aria-hidden="true" />
                <span className="truncate font-mono-forge">https://{url}</span>
              </div>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold text-white",
                pkg.badgeColor
              )}
            >
              {td.short}
            </span>
            <button
              onClick={onClose}
              className="ml-1 shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close preview (Escape)"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          </div>

          {/* Info bar */}
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border bg-background px-4 py-2.5 sm:px-5">
            <div className="min-w-0">
              <span className="text-sm font-semibold text-foreground">{businessName}</span>
              <span className="mx-2 text-muted-foreground/40" aria-hidden="true">|</span>
              <span className="text-sm font-medium text-muted-foreground">{config.label}</span>
            </div>
            <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <DollarSign className="size-3.5" aria-hidden="true" />
                {offer ? (
                  <>
                    <span className="font-semibold text-foreground">
                      {offer.price.amount === null ? "Custom" : `${formatPrice(offer.price.amount)}${offer.price.period ?? ""}`}
                    </span>
                    <span className="mx-1 text-muted-foreground/30" aria-hidden="true">|</span>
                  </>
                ) : null}
                {pkg.priceRange}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden="true" />
                {pkg.deliveryWeeks}
              </span>
              {offer && (
                <PurchaseButton
                  offer={offer}
                  exampleName={example?.exampleName ?? ""}
                  size="sm"
                  compact
                  className="[&_button]:h-7 [&_button]:px-3 [&_button]:text-[10px]"
                />
              )}
            </div>
          </div>

          {/* Tab bar + device toolbar */}
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-border bg-background px-4 py-2 sm:px-5">
            <div className="flex gap-1" role="tablist" aria-label="Preview sections">
              {tabs.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm",
                      active ? "text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="forge-tab-pill"
                        className="absolute inset-0 rounded-lg bg-primary"
                        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      />
                    )}
                    <Icon className="relative z-10 size-3.5" aria-hidden="true" />
                    <span className="relative z-10">{t.label}</span>
                  </button>
                );
              })}
            </div>

            {tab === "preview" && (
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center rounded-lg border border-border bg-muted/40 p-0.5"
                  role="radiogroup"
                  aria-label="Preview device"
                >
                  {devices.map((d) => {
                    const Icon = d.icon;
                    const active = device === d.id;
                    return (
                      <button
                        key={d.id}
                        role="radio"
                        aria-checked={active}
                        onClick={() => setDevice(d.id)}
                        className={cn(
                          "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors",
                          active
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <Icon className="size-3.5" aria-hidden="true" />
                        <span className="hidden sm:inline">{d.label}</span>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => cycleDevice(-1)}
                  className="hidden rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground md:block"
                  aria-label="Previous device (Alt+←)"
                >
                  <ChevronLeft className="size-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => cycleDevice(1)}
                  className="hidden rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground md:block"
                  aria-label="Next device (Alt+→)"
                >
                  <ChevronRight className="size-4" aria-hidden="true" />
                </button>
                {stageEnabled && (
                  <button
                    onClick={() => setUseStage((s) => !s)}
                    aria-pressed={useStage}
                    title="3-D device stage — drag to rotate"
                    className={cn(
                      "ml-1 inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-[11px] font-semibold transition-colors",
                      useStage
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Box className="size-3.5" aria-hidden="true" />
                    3D
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-muted/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                {tab === "preview" && (
                  <div className="bg-background">
                    {/* Demo-data honesty banner */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-amber-500/10 px-4 py-2 sm:px-6">
                      <p className="flex items-center gap-2 text-[11px] font-medium text-amber-700 dark:text-amber-300">
                        <Info className="size-3.5 shrink-0" aria-hidden="true" />
                        Illustrative demo data — sample content, not real metrics or customers.
                      </p>
                      <p className="hidden items-center gap-1.5 font-mono-forge text-[10px] text-muted-foreground sm:flex">
                        <Keyboard className="size-3" aria-hidden="true" />
                        Alt + ←/→ switch device · Esc closes
                      </p>
                    </div>

                    {example ? (
                      <>
                        <TemplateBrief
                          example={example}
                          businessName={businessName}
                          why={why}
                          tokens={tokens}
                          offer={offer}
                          offerProductName={offerContext?.productName}
                        />
                        {/* Device viewport — 3-D stage (flagship) or 2-D fallback */}
                        <div className="flex justify-center bg-muted/40 p-4 sm:p-6">
                          {useStage && stageEnabled ? (
                            <div className="w-full">
                              <DeviceStage3D height={460}>
                                <div className="h-[800px] w-[1280px] origin-top-left bg-white">
                                  <FamilyPreview example={example} />
                                </div>
                              </DeviceStage3D>
                            </div>
                          ) : (
                          <div
                            className={cn(
                              "relative w-full overflow-hidden rounded-xl border bg-white shadow-xl transition-[max-width] duration-300",
                              device === "mobile" && "max-w-[390px]",
                              device === "tablet" && "max-w-[768px]",
                              device === "desktop" && "max-w-none"
                            )}
                          >
                            <div className="flex items-center gap-1.5 border-b border-zinc-200 bg-zinc-100 px-3 py-1.5" aria-hidden="true">
                              <div className="size-2 rounded-full bg-zinc-300" />
                              <div className="size-2 rounded-full bg-zinc-300" />
                              <div className="size-2 rounded-full bg-zinc-300" />
                              <span className="ml-2 font-mono-forge text-[9px] uppercase tracking-wider text-zinc-400">
                                {activeDevice.label} viewport · {activeDevice.width ?? "fluid"}px
                              </span>
                            </div>
                            <FamilyPreview example={example} />
                          </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="p-8 text-center text-sm text-muted-foreground">
                        Preview unavailable for this configuration.
                      </div>
                    )}
                  </div>
                )}

                {tab === "try" && offer && demoKind && (
                  <TryItTab offer={offer} demoKind={demoKind} />
                )}

                {tab === "services" && <ServicesTab config={config} />}
                {tab === "comparison" && <ComparisonTab currentTier={config.tier} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────── */

function guessProductTypeId(example: ProductExample): string {
  // Mirrors the label→product map in FamilyPreview without importing cycles
  if (example.layout === "premium") return example.tier === "enterprise" ? "custom-saas" : "saas-tool";
  if (example.layout === "standard") return "website-kit";
  return "landing-template";
}

function TemplateBrief({
  example,
  businessName,
  why,
  tokens,
  offer,
  offerProductName,
}: {
  example: ProductExample;
  businessName: string;
  why: { audience: string; hierarchy: string; intent: string };
  tokens: (typeof familyTokens)[DesignFamilyId];
  offer: OfferV2 | null;
  offerProductName?: string;
}) {
  const stats = offer ? bundleStats(offer) : null;
  return (
    <section
      className="border-b border-border bg-zinc-950 px-5 py-6 text-white sm:px-8"
      aria-label="Template overview"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 max-w-2xl flex-1">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            <span className="rounded-full bg-white/10 px-2 py-1">
              {tierDisplay[example.tier].label} template
            </span>
            <span className="text-zinc-600" aria-hidden="true">/</span>
            <span>{businessName}</span>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {example.exampleName}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-300">
            {example.exampleDescription}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {example.features.slice(0, 4).map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-zinc-200"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
        {/* Why this design */}
        <div className="w-full min-w-0 max-w-sm shrink-0 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Why this design
          </div>
          <dl className="space-y-2.5 break-words text-xs leading-relaxed">
            <div>
              <dt className="font-semibold text-zinc-100">Audience fit</dt>
              <dd className="text-zinc-400">{why.audience}</dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-100">Visual hierarchy</dt>
              <dd className="text-zinc-400">{why.hierarchy}</dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-100">Conversion intent</dt>
              <dd className="text-zinc-400">{why.intent}</dd>
            </div>
            <div className="border-t border-white/10 pt-2.5">
              <dt className="font-semibold text-zinc-100">Family recipe</dt>
              <dd className="mt-0.5 font-mono-forge text-[10px] text-zinc-500">
                {tokens.fontDisplay.split(",")[0].replace(/'/g, "")} · {tokens.radius.md}px radius ·{" "}
                {tokens.sectionStyle}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Get this product — end-product offer strip */}
      {offer && (
        <div className="mx-auto mt-6 max-w-6xl">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              {/* Manifest — interactive bundle explorer */}
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300">
                  <Package className="size-3.5" aria-hidden="true" />
                  Get this product — what&apos;s included
                </div>
                <ManifestExplorer offer={offer} variant="dark" defaultFirstOpen={false} />
                <div id="get-offer" className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Layers className="size-3.5 text-zinc-500" aria-hidden="true" />
                    {offer.formats.join(" · ")}
                  </span>
                  <PolicyChips offer={offer} dark />
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5 text-sky-400" aria-hidden="true" />
                    {deliveryLabel(offer.tierLetter)}
                  </span>
                </div>
                {stats && (
                  <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono-forge text-[10px] uppercase tracking-[0.1em] text-zinc-500">
                    <span>{stats.folderCount} folders · {stats.fileCount} files · {fmtBytes(stats.totalBytes)}</span>
                    <CompletionSeal offer={offer} dark />
                    <span className="text-zinc-600">{offer.edition} · {offer.plateNo}</span>
                  </p>
                )}
                <div className="mt-4 max-w-lg">
                  <TestimonialQuote testimonial={offer.proof.testimonial} variant="dark" />
                </div>
              </div>
              {/* Price + buy — stays visible while you inspect the manifest */}
              <div className="w-full shrink-0 rounded-lg border border-white/10 bg-zinc-900/60 p-4 lg:sticky lg:top-2 lg:self-start lg:w-64">
                <ProofRow proof={offer.proof} variant="dark" className="mb-2" />
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">
                    {offer.price.amount === null ? "Custom" : formatPrice(offer.price.amount)}
                  </span>
                  {offer.price.amount !== null && offer.price.period && (
                    <span className="text-xs font-medium text-zinc-400">{offer.price.period}</span>
                  )}
                  {offer.price.compareAt !== null && (
                    <s className="text-xs text-zinc-500">{formatPrice(offer.price.compareAt)}</s>
                  )}
                </div>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  {offerProductName ? `${offerProductName} · ` : ""}{offer.proof.version} · {stats ? `${stats.fileCount} files` : ""}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[11px] text-zinc-400">
                  <ShieldCheck className="size-3.5 text-emerald-400" aria-hidden="true" />
                  30-day money-back guarantee
                </p>
                <div className="mt-3">
                  <PurchaseButton offer={offer} exampleName={example.exampleName} className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ServicesTab({ config }: { config: MockupConfig }) {
  const pkg = getPackage(config.tier);
  const a = tierAccent[config.tier];

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-5 sm:p-8">
      <div className={cn("rounded-2xl border p-5 sm:p-6", a.border, a.bg)}>
        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className={cn("mb-1 text-xs font-bold uppercase tracking-wider", a.text)}>
              {pkg.level} Package
            </div>
            <h3 className="text-xl font-bold text-foreground">{pkg.tagline}</h3>
          </div>
          <div className="text-right">
            <div className={cn("text-2xl font-bold", a.text)}>{pkg.priceRange}</div>
            <div className="text-xs text-muted-foreground">Delivery: {pkg.deliveryWeeks}</div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
          <Check className={cn("size-4", a.text)} aria-hidden="true" />
          What You Get
        </h4>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {pkg.features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 rounded-lg border border-border bg-background p-3"
            >
              <div
                className={cn(
                  "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                  pkg.badgeColor
                )}
              >
                <Check className="size-2.5 text-white" strokeWidth={3} aria-hidden="true" />
              </div>
              <span className="text-sm text-foreground/90">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
          <FileText className={cn("size-4", a.text)} aria-hidden="true" />
          Project Deliverables
        </h4>
        <div className="space-y-2.5">
          {pkg.deliverables.map((del, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-border bg-background p-4"
            >
              <div
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                  a.bg,
                  a.text
                )}
              >
                {i + 1}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground">{del.name}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{del.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="mb-4 flex items-center gap-2 text-sm font-bold text-foreground">
          <Layers className={cn("size-4", a.text)} aria-hidden="true" />
          OMNIFORGE Modules Activated ({pkg.modules.length} of 22)
        </h4>
        <div className="flex flex-wrap gap-2">
          {pkg.modules.map((mod) => (
            <div
              key={mod.id}
              className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2"
            >
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded text-[10px] font-bold",
                  a.bg,
                  a.text
                )}
              >
                {mod.id}
              </span>
              <div>
                <div className="text-xs font-medium text-foreground">{mod.name}</div>
                <div className="text-[10px] text-muted-foreground">{mod.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const comparisonRows: { label: string; values: Record<Tier, string> }[] = [
  { label: "Price Range", values: { low: lowTierPackage.priceRange, mid: midTierPackage.priceRange, high: highTierPackage.priceRange, enterprise: enterpriseTierPackage.priceRange } },
  { label: "Delivery Time", values: { low: lowTierPackage.deliveryWeeks, mid: midTierPackage.deliveryWeeks, high: highTierPackage.deliveryWeeks, enterprise: enterpriseTierPackage.deliveryWeeks } },
  { label: "Pages", values: { low: "Single page", mid: "3–7 pages", high: "Multi-page + routing", enterprise: "Full platform" } },
  { label: "Design System", values: { low: "Coherent tokens", mid: "Custom tokens", high: "Full token system + components", enterprise: "Versioned library + Storybook" } },
  { label: "Backend & Database", values: { low: "None", mid: "Basic backend", high: "API + schema + RLS", enterprise: "Microservices / modular monolith" } },
  { label: "Authentication", values: { low: "None", mid: "Email/password", high: "Auth + role permissions", enterprise: "SSO + multi-tenant auth" } },
  { label: "Payment Integration", values: { low: "None", mid: "None", high: "Stripe checkout + subscriptions", enterprise: "Custom billing + marketplace" } },
  { label: "Admin Dashboard", values: { low: "None", mid: "Content editing", high: "Full CRUD panel", enterprise: "Multi-tenant admin suite" } },
  { label: "AI & Automation", values: { low: "None", mid: "None", high: "None", enterprise: "LLM agents + workflows" } },
  { label: "SEO Setup", values: { low: "Basic meta tags", mid: "Sitemap + structured data", high: "Full SEO suite", enterprise: "Full SEO + internationalization" } },
  { label: "Accessibility", values: { low: "Same craft floor", mid: "Keyboard + contrast", high: "WCAG 2.2 AA audit", enterprise: "WCAG 2.2 AA + ongoing" } },
  { label: "Performance", values: { low: "No regressions", mid: "Image optimization", high: "Budgets + code splitting", enterprise: "Edge caching + CDN + budgets" } },
  { label: "Revisions", values: { low: "1 round", mid: "2 rounds", high: "3 rounds", enterprise: "Weekly reviews" } },
  { label: "Post-launch Support", values: { low: "None", mid: "14 days", high: "30 days", enterprise: "90-day SLA" } },
  { label: "Modules Activated", values: { low: `${lowTierPackage.modules.length} of 22`, mid: `${midTierPackage.modules.length} of 22`, high: `${highTierPackage.modules.length} of 22`, enterprise: `${enterpriseTierPackage.modules.length} of 22` } },
];

function ComparisonTab({ currentTier }: { currentTier: Tier }) {
  const tiers: Tier[] = ["low", "mid", "high", "enterprise"];
  return (
    <div className="mx-auto max-w-5xl p-5 sm:p-8">
      <h3 className="mb-1 flex items-center gap-2 text-lg font-bold text-foreground">
        <Gauge className="size-4 text-muted-foreground" aria-hidden="true" />
        Tier Comparison
      </h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Scope changes between tiers — the craft floor (responsive, accessible, coherent design) never does.
      </p>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tiers.map((t) => {
          const td = tierDisplay[t];
          const a = tierAccent[t];
          const pkg = getPackage(t);
          const isCurrent = t === currentTier;
          return (
            <div
              key={t}
              className={cn(
                "relative rounded-xl border p-4",
                a.border,
                a.bg,
                isCurrent && "ring-2 ring-[rgb(var(--forge-glow))] ring-offset-2 ring-offset-background"
              )}
            >
              {isCurrent && (
                <span className="absolute -top-2.5 right-3 rounded-full bg-[rgb(var(--forge-glow))] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black">
                  Current
                </span>
              )}
              <div className={cn("mb-1 text-xs font-bold uppercase tracking-wider", a.text)}>{td.label}</div>
              <div className="text-lg font-bold text-foreground">{pkg.priceRange}</div>
              <div className="mt-1 text-[11px] leading-tight text-muted-foreground">{pkg.tagline}</div>
            </div>
          );
        })}
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-background">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Feature
              </th>
              {tiers.map((t) => (
                <th
                  scope="col"
                  key={t}
                  className={cn(
                    "px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider",
                    tierAccent[t].text
                  )}
                >
                  {tierDisplay[t].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr
                key={row.label}
                className={cn("border-b border-border/60", i % 2 === 0 ? "bg-muted/20" : "bg-transparent")}
              >
                <th scope="row" className="whitespace-nowrap px-3 py-2.5 text-left text-xs font-medium text-foreground sm:text-sm">
                  {row.label}
                </th>
                {tiers.map((t) => (
                  <td
                    key={t}
                    className={cn(
                      "px-2 py-2.5 text-center text-[11px] text-muted-foreground sm:text-xs",
                      t === currentTier && "font-semibold text-foreground"
                    )}
                  >
                    {row.values[t]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Prices are illustrative starting points, not verified market rates. Final cost depends on scope,
          integrations, content volume, and customization. The Enterprise tier scales from a focused internal
          tool to a full multi-tenant SaaS platform — the module set expands accordingly.
        </p>
      </div>
    </div>
  );
}

/* ── Try it tab (build plan v3 · P3) — the playable demo surface ──── */

import type { ComponentType } from "react";
import type { DemoContent } from "./catalog/schema";
import type { DemoKind } from "./demo-surfaces";

function TryItTab({ offer, demoKind }: { offer: OfferV2; demoKind: DemoKind }) {
  const [Surface, setSurface] = useState<ComponentType<DemoSurfaceProps> | null>(null);
  const [content, setContent] = useState<DemoContent | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [mod, demo] = await Promise.all([
          loadDemoSurface(demoKind),
          loadDemoContent(offer),
        ]);
        if (cancelled) return;
        setSurface(() => mod.default);
        setContent(demo);
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => { cancelled = true; };
  }, [demoKind, offer]);

  return (
    <div className="bg-background">
      {/* Sample ribbon + contract */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-emerald-500/[0.07] px-4 py-2 sm:px-6">
        <p className="flex items-center gap-2 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
          <span className="rounded bg-emerald-600 px-1.5 py-0.5 font-mono-forge text-[9px] font-bold uppercase tracking-[0.1em] text-white">
            Sample
          </span>
          Playable demo — runs entirely in this tab, nothing is sent.
        </p>
        <p className="hidden font-mono-forge text-[10px] text-muted-foreground sm:flex">
          {offer.authored ? `${offer.offerId} demo content` : "archetype demo"} · completes in under 60s
        </p>
      </div>

      <div className="p-4 sm:p-6">
        {error ? (
          <p className="py-12 text-center text-sm text-muted-foreground">
            The demo failed to load — close and reopen the studio to retry.
          </p>
        ) : !Surface || !content ? (
          <div className="flex min-h-[380px] items-center justify-center">
            <div className="flex gap-1.5" aria-label="Loading demo">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2 animate-pulse rounded-full bg-primary" style={{ animationDelay: `${i * 140}ms` }} />
              ))}
            </div>
          </div>
        ) : (
          <Surface offer={offer} content={content} />
        )}
      </div>
    </div>
  );
}
