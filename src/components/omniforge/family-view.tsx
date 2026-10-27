"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  Eye,
  ArrowRight,
  FileText,
  UnfoldVertical,
  FoldVertical,
  MonitorPlay,
  BadgeCheck,
  Zap,
} from "lucide-react";
import type { MockupConfig } from "@/data/businessTypes";
import {
  productTierCategories,
  subscriptionSection,
  type ProductExample,
  type ProductType,
} from "@/data/exampleProducts";
import { familyTokens } from "@/data/designFamilies";
import { riseIn, staggerParent } from "@/lib/motion";
import { familyMeta } from "./family-visuals";
import { deriveOffer, formatPrice, deliveryLabel } from "./product-catalog";
import { PurchaseButton, useIsOwned } from "./purchase-flow";
import {
  ManifestExplorer,
  ProofRow,
  PolicyChips,
  CompletionSeal,
} from "./listing-extras";
import { MotionMedia } from "./motion-media";
import { resolveMedia } from "./media-registry";
import { useTilt } from "./tilt";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════════
   Family browsing view — products grouped by tier, example cards.
   Every product block starts MINIMIZED; expanding it reveals full
   end-product listings: numbered "What's included" manifests, formats,
   license, price, instant demo checkout and downloads.
   ════════════════════════════════════════════════════════════════════ */

export type FamilyProduct = {
  product: ProductType;
  tierLetter: string;
  tierName: string;
  tierColor: string;
  priceRange: string;
};

/** Context threaded to the PresentationStudio so it can render the offer */
export type OfferContext = {
  tierLetter: string;
  productTypeId: string;
};

export const tierColorMap: Record<string, { text: string; chip: string; badge: string; dot: string }> = {
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

export const allTierSections = [
  ...productTierCategories.map((c) => ({
    letter: c.letter,
    name: c.name,
    priceRange: c.priceRange,
    color: c.color,
    products: c.products,
  })),
  {
    letter: "S",
    name: subscriptionSection.name,
    priceRange: subscriptionSection.priceRange,
    color: "emerald",
    products: subscriptionSection.products,
  },
];

/* ── MiniPreview — polished static miniature for example cards ────── */

function MiniPreview({ config }: { config: MockupConfig }) {
  const t = config.theme;
  const isElevated = config.layout === "premium" || config.layout === "standard";
  const isPremium = config.layout === "premium";
  const [imgFailed, setImgFailed] = useState(false);
  const showImg = config.heroImage && !imgFailed;
  return (
    <div
      style={{ fontFamily: t.font }}
      className="pointer-events-none flex h-full w-full select-none flex-col overflow-hidden"
    >
      <div
        className="relative z-10 flex shrink-0 items-center justify-between px-2 py-1.5"
        style={{
          background: showImg ? "rgba(0,0,0,0.25)" : t.nav,
          borderBottom: showImg ? "none" : `1px solid ${t.border}`,
        }}
      >
        <div className="flex items-center gap-1">
          <div
            className="size-2"
            style={{ background: t.accent, borderRadius: isElevated ? 3 : 999 }}
          />
          <span className="text-[7px] font-bold" style={{ color: showImg ? "#fff" : t.text }}>
            {config.label}
          </span>
        </div>
        <div className="flex gap-1" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-0.5 w-2.5 rounded-full"
              style={{ background: showImg ? "rgba(255,255,255,0.4)" : t.muted, opacity: 0.5 }}
            />
          ))}
        </div>
      </div>
      <div className="relative min-h-0 flex-1" style={{ backgroundColor: t.bg }}>
        {showImg ? (
          <img
            src={config.heroImage}
            alt=""
            onError={() => setImgFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(135deg, ${t.accent}, ${t.surface})` }}
          />
        )}
        {showImg && (
          <div
            className="absolute inset-0"
            style={{
              background: isPremium
                ? "linear-gradient(135deg, rgba(0,0,0,0.65), rgba(0,0,0,0.25))"
                : "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.55))",
            }}
          />
        )}
        <div
          className={cn(
            "relative flex h-full flex-col justify-center p-2.5",
            !isPremium && "items-center text-center"
          )}
        >
          <div
            className="mb-1 inline-block w-fit rounded px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-wider"
            style={{ background: t.accent, color: "#fff" }}
          >
            {config.tier === "enterprise" ? "Platform" : "Template"}
          </div>
          <div
            className="max-w-[92%] text-[9px] font-bold leading-tight"
            style={{
              color: showImg ? "#fff" : t.text,
              textShadow: showImg ? "0 1px 6px rgba(0,0,0,0.5)" : "none",
            }}
          >
            {config.tagline.length > 36 ? `${config.tagline.slice(0, 36)}…` : config.tagline}
          </div>
          {showImg && (
            <div
              className="mt-1.5 inline-block w-fit rounded px-1.5 py-0.5 text-[6px] font-semibold"
              style={{ background: t.accent, color: "#fff" }}
            >
              {config.tier === "enterprise" ? "Request Demo" : "Get Started"}
            </div>
          )}
        </div>
      </div>
      {/* Mini content: reads like a real page — heading, two copy lines, CTA */}
      <div className="shrink-0 space-y-1.5 px-2.5 py-2" style={{ background: t.bg }} aria-hidden="true">
        <div className="h-1.5 w-3/5 rounded-full" style={{ background: t.text, opacity: 0.75 }} />
        <div className="h-1 w-4/5 rounded-full" style={{ background: t.muted, opacity: 0.55 }} />
        <div className="flex items-center gap-1.5 pt-0.5">
          <div
            className="h-2.5 w-9 rounded-sm"
            style={{ background: t.accent, borderRadius: isElevated ? 4 : 999 }}
          />
          <div className="h-1 flex-1 rounded-full" style={{ background: t.muted, opacity: 0.35 }} />
          <div className="size-2 rounded-full" style={{ background: t.accentSoft, border: `1px solid ${t.border}` }} />
        </div>
      </div>
    </div>
  );
}

/* ── Helpers ──────────────────────────────────────────────────────── */

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

export type PreviewFn = (
  config: MockupConfig,
  name: string,
  example?: ProductExample,
  ctx?: OfferContext
) => void;

/* ── ExampleCard — compact card for the home featured rail ────────── */

export function ExampleCard({
  example,
  onPreview,
  index,
  familyShort,
  familyChip,
  offerContext,
}: {
  example: ProductExample;
  onPreview: () => void;
  index: number;
  familyShort?: string;
  familyChip?: string;
  offerContext?: { tierLetter: string; productTypeId: string };
}) {
  const td = example.tier;
  const tierInfo = td === "low"
    ? { short: "STR", badge: "bg-amber-500" }
    : td === "mid"
      ? { short: "GRO", badge: "bg-sky-500" }
      : td === "high"
        ? { short: "PRO", badge: "bg-emerald-500" }
        : { short: "ENT", badge: "bg-violet-600" };
  const pages = extractPageCount(example.features);
  const social = useMemo(
    () =>
      offerContext
        ? deriveOffer({
            tierLetter: offerContext.tierLetter,
            productTypeId: offerContext.productTypeId,
            exampleName: example.exampleName,
            features: example.features,
          }).proof
        : null,
    [offerContext, example.exampleName, example.features]
  );

  return (
    <motion.button
      variants={riseIn}
      onClick={onPreview}
      className="group overflow-hidden rounded-xl border border-border bg-card text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
      aria-label={`Preview ${example.exampleName}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <MiniPreview config={example} />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20 group-focus-visible:bg-black/20">
          <span className="flex scale-95 items-center gap-1.5 rounded-md bg-background px-2.5 py-1 text-[11px] font-semibold text-foreground opacity-0 shadow-md transition-all duration-150 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
            <Eye className="size-3" aria-hidden="true" />
            Preview
            <ArrowRight className="size-3" aria-hidden="true" />
          </span>
        </div>
        <span className="absolute right-1.5 top-1.5 z-20 flex items-center gap-1">
          {pages !== null && (
            <span className="flex items-center gap-0.5 rounded bg-background/90 px-1.5 py-0.5 font-mono-forge text-[8px] font-bold text-foreground shadow-sm">
              <FileText className="size-2.5" aria-hidden="true" />
              {pages === 1 ? "1 pg" : `${pages} pgs`}
            </span>
          )}
          <span
            className={cn(
              "rounded px-1.5 py-0.5 font-mono-forge text-[8px] font-bold text-white shadow-sm",
              tierInfo.badge
            )}
          >
            {tierInfo.short}
          </span>
        </span>
        {familyShort && (
          <span
            className={cn(
              "absolute bottom-1.5 left-1.5 z-20 rounded px-1.5 py-0.5 font-mono-forge text-[7px] font-semibold",
              familyChip
            )}
          >
            {familyShort}
          </span>
        )}
      </div>
      <div className="p-2.5">
        <div className="mb-0.5 truncate text-[11px] font-bold text-foreground">
          {example.exampleName}
        </div>
        {social && (
          <div className="mb-1">
            <ProofRow proof={social} showVersion={false} />
          </div>
        )}
        <p className="line-clamp-2 text-[10px] leading-snug text-muted-foreground">
          {example.exampleDescription}
        </p>
      </div>
    </motion.button>
  );
}

/* ── ProductListingCard v2 — the plate (build plan v3 · P1) ──────── */
/* Seven elements, like a finished object: plate number, media      */
/* window, title block, proof line, contents drawer, policy chips,  */
/* ledger foot. Per-archetype CSS-3D hover recipes (P4/T1).          */

type HoverRecipe = "fan" | "explode" | "iso" | "medal" | "tilt" | null;

const HOVER_RECIPE: Record<string, HoverRecipe> = {
  "template-pack": "fan",
  toolkit: "explode",
  "notion-system": "iso",
  "assessment-tool": "medal",
  "website-kit": "tilt",
};

function ProductListingCard({
  example,
  fp,
  onPreview,
  index,
  familyShort,
  familyChip,
}: {
  example: ProductExample;
  fp: FamilyProduct;
  onPreview: PreviewFn;
  index: number;
  familyShort: string;
  familyChip: string;
}) {
  const offer = useMemo(
    () =>
      deriveOffer({
        tierLetter: fp.tierLetter,
        productTypeId: fp.product.id,
        exampleName: example.exampleName,
        features: example.features,
        exampleDescription: example.exampleDescription,
      }),
    [fp.tierLetter, fp.product.id, example.exampleName, example.features, example.exampleDescription]
  );

  const isOwned = useIsOwned(offer.id);
  const tiltRef = useTilt(6);
  const recipe = HOVER_RECIPE[fp.product.id] ?? null;
  const media = resolveMedia({
    offerId: offer.authored ? offer.offerId : undefined,
    archetype: fp.product.id,
  });
  const td = example.tier;
  const tierInfo =
    td === "low"
      ? { short: "STR", badge: "bg-amber-500" }
      : td === "mid"
        ? { short: "GRO", badge: "bg-sky-500" }
        : td === "high"
          ? { short: "PRO", badge: "bg-emerald-500" }
          : { short: "ENT", badge: "bg-violet-600" };

  const openPresentation = () =>
    onPreview(example, fp.product.name, example, {
      tierLetter: fp.tierLetter,
      productTypeId: fp.product.id,
    });

  return (
    <motion.article
      variants={riseIn}
      className="plate grain-overlay group flex flex-col overflow-hidden rounded-xl sm:flex-row"
      aria-label={`${example.exampleName} — end-product plate`}
    >
      {/* 2 · Media window — living imagery + brass inset + hover recipe */}
      <button
        onClick={openPresentation}
        className={cn(
          "plate-3d relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary sm:aspect-auto sm:w-56",
          recipe === "fan" && "fan-deck",
          recipe === "explode" && "explode-layers"
        )}
        aria-label={`Open ${example.exampleName} live presentation`}
      >
        {recipe === "tilt" ? (
          <div ref={tiltRef} className="tilt-pane h-full w-full">
            {media && <MotionMedia asset={media} slot="thumb" section={`plate-${fp.product.id}`} className="h-full w-full" alt={`${example.exampleName} preview`} />}
            {!media && <MiniPreview config={example} />}
          </div>
        ) : (
          <>
            {media && <MotionMedia asset={media} slot="thumb" section={`plate-${fp.product.id}`} className="h-full w-full" alt={`${example.exampleName} preview`} />}
            {!media && <MiniPreview config={example} />}
            {recipe === "fan" && (
              <>
                <span className="fan-ghost" aria-hidden="true" />
                <span className="fan-ghost" aria-hidden="true" />
              </>
            )}
            {recipe === "explode" && (
              <>
                <span className="explode-layer absolute inset-x-4 bottom-3 top-6 rounded-lg border border-[var(--brass-line)]/30 bg-background/40" aria-hidden="true" />
                <span className="explode-layer absolute inset-x-6 bottom-5 top-8 rounded-lg border border-[var(--brass-line)]/50 bg-background/60" aria-hidden="true" />
              </>
            )}
            {recipe === "iso" && (
              <span className="iso-stack absolute bottom-2 right-2 size-10" aria-hidden="true">
                <span className="iso-layer absolute inset-0 rounded border border-[var(--brass-line)]/40 bg-background/60" />
                <span className="iso-layer absolute inset-0 translate-x-1 translate-y-1 rounded border border-[var(--brass-line)]/55 bg-background/80" />
                <span className="iso-layer is-top absolute inset-0 translate-x-2 translate-y-2 rounded border border-[var(--brass-line)]/80 bg-background" />
              </span>
            )}
          </>
        )}

        {/* Assessment medal — flips on owned (P4/T1) */}
        {recipe === "medal" && (
          <span className={cn("medal-flip absolute bottom-2 right-2", isOwned && "owned")} aria-hidden="true">
            <span className="medal-flip-inner relative block size-8">
              <span className="medal-face absolute inset-0 flex items-center justify-center rounded-full border border-[var(--brass-line)]/70 bg-background/85 font-mono-forge text-[8px] font-black text-[var(--brass-ink)]">
                AS
              </span>
              <span className="medal-face medal-back absolute inset-0 flex items-center justify-center rounded-full bg-emerald-600 font-mono-forge text-[7px] font-black text-white">
                OWNED
              </span>
            </span>
          </span>
        )}

        <span className="pointer-events-none absolute inset-0 brass-inset-frame rounded-none" aria-hidden="true" />
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/25 group-focus-visible:bg-black/25">
          <span className="flex translate-y-1 scale-95 items-center gap-1.5 rounded-lg bg-background/95 px-3 py-1.5 text-[11px] font-semibold text-foreground opacity-0 shadow-lg backdrop-blur transition-all duration-150 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <MonitorPlay className="size-3.5" aria-hidden="true" />
            Live presentation
          </span>
        </span>
        <span
          className={cn(
            "absolute left-1.5 top-1.5 z-20 rounded px-1.5 py-0.5 font-mono-forge text-[7px] font-semibold",
            familyChip
          )}
        >
          {familyShort}
        </span>
        <span
          className={cn(
            "absolute right-1.5 top-1.5 z-20 rounded px-1.5 py-0.5 font-mono-forge text-[8px] font-bold text-white shadow-sm",
            tierInfo.badge
          )}
        >
          {tierInfo.short}
        </span>
      </button>

      {/* Offer body — parts 3–7 */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-3.5 sm:p-4">
        {/* 3 · Title block */}
        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="truncate text-sm font-bold text-foreground">{offer.title}</h4>
            {/* 1 · Plate number — engraved, top-right of the title block */}
            <span className="engraved foil-text shrink-0 font-mono-forge text-[10px] font-bold tracking-[0.08em]">
              {offer.plateNo}
            </span>
          </div>
          <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {offer.promise}
          </p>
        </div>

        {/* 4 · Proof line */}
        <ProofRow proof={offer.proof} />

        {/* 5 · Contents drawer — 3 folder rows + "+N more" */}
        <ManifestExplorer offer={offer} drawer collapsedRows={3} defaultFirstOpen={false} />

        {/* 6 · Policy chips */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <PolicyChips offer={offer} />
          <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
            <Zap className="size-3 text-amber-500" aria-hidden="true" />
            {deliveryLabel(offer.tierLetter)}
          </span>
        </div>

        {/* 7 · Ledger foot */}
        <div className="mt-auto flex flex-col gap-3 border-t border-[var(--plate-edge)] pt-3 min-[480px]:flex-row min-[480px]:flex-wrap min-[480px]:items-end min-[480px]:justify-between">
          <div className="min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className="foil-text font-display text-xl font-extrabold leading-none">
                {offer.price.amount === null ? "Custom quote" : formatPrice(offer.price.amount)}
              </span>
              {offer.price.amount !== null && offer.price.period && (
                <span className="text-xs font-semibold text-muted-foreground">{offer.price.period}</span>
              )}
              {offer.price.compareAt !== null && (
                <s className="text-xs font-medium text-muted-foreground/70">
                  {formatPrice(offer.price.compareAt)}
                </s>
              )}
            </div>
            <span className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] text-muted-foreground">
              <span className="engraved font-mono-forge tracking-[0.06em]">
                {offer.edition} · {offer.plateNo}
              </span>
              <CompletionSeal offer={offer} />
            </span>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <button
              onClick={openPresentation}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted active:translate-y-px"
            >
              <Eye className="size-3.5" aria-hidden="true" />
              Live presentation
            </button>
            <PurchaseButton offer={offer} exampleName={example.exampleName} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ── ProductSection — accordion block, minimized by default ───────── */

export function ProductSection({
  fp,
  onPreview,
  expanded,
  onToggle,
  index,
  familyShort,
  familyChip,
}: {
  fp: FamilyProduct;
  onPreview: PreviewFn;
  expanded: boolean;
  onToggle: () => void;
  index: number;
  familyShort: string;
  familyChip: string;
}) {
  const tc = tierColorMap[fp.tierColor] ?? tierColorMap.amber;
  const exampleNames = fp.product.examples.map((e) => e.exampleName);
  return (
    <motion.div
      variants={riseIn}
      className={cn(
        "overflow-hidden rounded-xl border bg-card transition-colors",
        expanded ? "border-border" : "border-border/70 hover:border-border"
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 p-3.5 text-left transition-colors hover:bg-muted/40 sm:p-4"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span
            className={cn(
              "flex size-6 shrink-0 items-center justify-center rounded font-mono-forge text-[10px] font-bold",
              tc.chip
            )}
          >
            {fp.tierLetter}
          </span>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-foreground">{fp.product.name}</h3>
            <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
              {fp.product.description}
            </p>
            {/* Scent of the minimized contents — example names */}
            {!expanded && (
              <p className="mt-1 truncate font-mono-forge text-[9px] uppercase tracking-[0.1em] text-muted-foreground/60">
                {exampleNames.slice(0, 3).join(" · ")}
                {exampleNames.length > 3 ? ` · +${exampleNames.length - 3}` : ""}
              </p>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="hidden items-center gap-1 rounded-full border border-border/80 bg-background/60 px-2 py-0.5 font-mono-forge text-[9px] font-semibold text-muted-foreground sm:inline-flex">
            {fp.product.examples.length} products
            <span className="text-muted-foreground/50">
              · {fp.tierLetter === "E" ? "scoped quotes" : "buy instantly"}
            </span>
          </span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex size-6 items-center justify-center rounded-md border border-border/70 bg-background text-muted-foreground"
          >
            <ChevronDown className="size-3.5" aria-hidden="true" />
          </motion.span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/60 px-3.5 pb-4 pt-3 sm:px-4">
              <motion.div
                initial="hidden"
                animate="show"
                variants={staggerParent(0.04)}
                className="mt-1 grid grid-cols-1 gap-3 xl:grid-cols-2"
              >
                {fp.product.examples.map((ex, i) => (
                  <ProductListingCard
                    key={i}
                    example={ex}
                    fp={fp}
                    onPreview={onPreview}
                    index={i}
                    familyShort={familyShort}
                    familyChip={familyChip}
                  />
                ))}
              </motion.div>
              <p className="mt-3 flex items-center gap-1.5 font-mono-forge text-[9px] uppercase tracking-[0.12em] text-muted-foreground/60">
                <BadgeCheck className="size-3" aria-hidden="true" />
                Sample catalog · demo checkout — purchases and downloads are simulated
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── FamilyView ───────────────────────────────────────────────────── */

export function FamilyView({
  familyId,
  items,
  onPreview,
}: {
  familyId: string;
  items: FamilyProduct[];
  onPreview: PreviewFn;
}) {
  const fm = familyMeta[familyId] ?? familyMeta.micro;
  const tokens = familyTokens[familyId as keyof typeof familyTokens] ?? familyTokens.micro;
  const exampleCount = items.reduce((n, fp) => n + fp.product.examples.length, 0);

  /* Every product block starts minimized */
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set());
  const allOpen = items.length > 0 && items.every((fp) => openIds.has(fp.product.id));
  const someOpen = items.some((fp) => openIds.has(fp.product.id));

  const toggleSection = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleAll = () =>
    setOpenIds(allOpen ? new Set() : new Set(items.map((fp) => fp.product.id)));

  const byTier = useMemo(() => {
    const groups: Record<string, FamilyProduct[]> = {};
    for (const fp of items) {
      (groups[fp.tierLetter] ||= []).push(fp);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [items]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerParent(0.06)}
        className="space-y-6"
      >
        {/* Header */}
        <motion.div
          variants={riseIn}
          className={cn("relative overflow-hidden rounded-xl border p-4 sm:p-5", fm.border, fm.bg)}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{ background: `radial-gradient(90% 120% at 100% 0%, ${fm.glow}, transparent 60%)` }}
            aria-hidden="true"
          />
          <div className="relative flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <fm.icon className={cn("size-5", fm.text)} aria-hidden="true" />
              <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                {fm.label}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={cn("rounded px-2 py-1 font-mono-forge text-[10px] font-semibold", fm.chip)}>
                {items.length} products · {exampleCount} examples
              </span>
              <button
                onClick={toggleAll}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background/80 px-3 text-[11px] font-semibold text-foreground backdrop-blur transition-colors hover:bg-muted active:translate-y-px"
                aria-label={allOpen ? "Collapse all product blocks" : "Expand all product blocks"}
              >
                {allOpen ? (
                  <FoldVertical className="size-3.5" aria-hidden="true" />
                ) : (
                  <UnfoldVertical className="size-3.5" aria-hidden="true" />
                )}
                {allOpen ? "Collapse all" : "Expand all"}
              </button>
            </div>
          </div>
          <p className="relative mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {fm.blurb}
          </p>
          <div className="relative mt-3 flex flex-wrap items-center gap-3 font-mono-forge text-[10px] text-muted-foreground">
            <span>Recipe: {fm.recipe}</span>
            <span aria-hidden="true">·</span>
            <span>{tokens.radius.md}px radius</span>
            <span aria-hidden="true">·</span>
            <span>{tokens.sectionStyle} sections</span>
            <span aria-hidden="true">·</span>
            <span className="text-muted-foreground/70">
              blocks start minimized {someOpen ? "· some expanded" : ""}
            </span>
          </div>
        </motion.div>

        {/* Tier groups */}
        {byTier.map(([tierLetter, tierProducts]) => {
          const tc = tierColorMap[tierProducts[0].tierColor] ?? tierColorMap.amber;
          return (
            <section key={tierLetter} aria-label={tierProducts[0].tierName} className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded font-mono-forge text-[10px] font-bold",
                    tc.chip
                  )}
                >
                  {tierLetter}
                </span>
                <h3 className="font-display text-base font-bold text-foreground">
                  {tierProducts[0].tierName}
                </h3>
                <span className="font-mono-forge text-[11px] text-muted-foreground">
                  {tierProducts[0].priceRange}
                </span>
                <span className="font-mono-forge text-[10px] text-muted-foreground">
                  · {tierProducts.length} products
                </span>
              </div>
              <motion.div
                initial="hidden"
                animate="show"
                variants={staggerParent(0.05)}
                className="space-y-2.5"
              >
                {tierProducts.map((fp, i) => (
                  <ProductSection
                    key={fp.product.id}
                    fp={fp}
                    onPreview={onPreview}
                    expanded={openIds.has(fp.product.id)}
                    onToggle={() => toggleSection(fp.product.id)}
                    index={i}
                    familyShort={fm.short}
                    familyChip={fm.chip}
                  />
                ))}
              </motion.div>
            </section>
          );
        })}
      </motion.div>
    </main>
  );
}
