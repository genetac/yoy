"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Eye } from "lucide-react";
import type { MockupConfig } from "@/data/businessTypes";
import type { ProductExample } from "@/data/exampleProducts";
import { getFamilyForProductType, type DesignFamilyId } from "@/data/designFamilies";
import { AppShell, type View, type SidebarMeta } from "@/components/omniforge/app-shell";
import {
  HomeHero,
  ActivityTicker,
  FamilyGrid,
  FeaturedRail,
  type TickerEntry,
} from "@/components/omniforge/home-sections";
import { FamilyTheater, type TheaterPanel } from "@/components/omniforge/family-theater";
import {
  FamilyView,
  ExampleCard,
  allTierSections,
  type FamilyProduct,
  type OfferContext,
  type PreviewFn,
} from "@/components/omniforge/family-view";
import { PricingView } from "@/components/omniforge/pricing-view";
import { PresentationStudio } from "@/components/omniforge/PresentationStudio";
import { ReceiptStack } from "@/components/omniforge/purchase-flow";
import { DeliveryRoom } from "@/components/omniforge/delivery-room";
import { familyMeta, familyOrder } from "@/components/omniforge/family-visuals";
import { viewSwap } from "@/lib/motion";

/* ════════════════════════════════════════════════════════════════════
   OMNIFORGE — Design Family Engine (workspace entry)
   Composition root: view state + data aggregation + presentation modal
   ════════════════════════════════════════════════════════════════════ */

const familyIds: DesignFamilyId[] = [...familyOrder];

/* ── Aggregate products per family with tier info ─────────────────── */

const familyProductMap: Record<string, FamilyProduct[]> = {};
for (const fid of familyIds) familyProductMap[fid] = [];

for (const section of allTierSections) {
  for (const product of section.products) {
    const fid = getFamilyForProductType(product.id);
    familyProductMap[fid]?.push({
      product,
      tierLetter: section.letter,
      tierName: section.name,
      tierColor: section.color,
      priceRange: section.priceRange,
    });
  }
}

const totalProducts = familyIds.reduce((n, f) => n + (familyProductMap[f]?.length ?? 0), 0);
const totalExamples = familyIds.reduce(
  (n, f) => n + (familyProductMap[f] ?? []).reduce((m, fp) => m + fp.product.examples.length, 0),
  0
);

const counts: Record<string, number> = {};
const exampleCounts: Record<string, number> = {};
const tierLettersByFamily: Record<string, string[]> = {};
for (const fid of familyIds) {
  const items = familyProductMap[fid] ?? [];
  counts[fid] = items.length;
  exampleCounts[fid] = items.reduce((m, fp) => m + fp.product.examples.length, 0);
  tierLettersByFamily[fid] = [...new Set(items.map((fp) => fp.tierLetter))].sort();
}

/* Sidebar meta derived from family data */
const sidebarFamilies: SidebarMeta[] = familyIds.map((fid) => ({
  id: fid,
  label: familyMeta[fid].label,
  short: familyMeta[fid].short,
  count: counts[fid] ?? 0,
  icon: familyMeta[fid].icon,
}));

/* Family Theater panels — one per family, with sample product names */
const theaterPanels: TheaterPanel[] = familyIds.map((fid) => ({
  familyId: fid,
  productCount: counts[fid] ?? 0,
  exampleCount: exampleCounts[fid] ?? 0,
  sampleProducts: (familyProductMap[fid] ?? []).slice(0, 3).map((fp) => fp.product.name),
}));

/* Sample ticker content — labelled as demo, uses catalog names */
function buildTicker(): TickerEntry[] {
  const entries: TickerEntry[] = [];
  for (const fid of familyIds) {
    const items = familyProductMap[fid] ?? [];
    if (items.length === 0) continue;
    const fp = items[0];
    const ex = fp.product.examples[0];
    if (!ex) continue;
    entries.push({
      familyId: fid,
      text: `${ex.exampleName} preview opened`,
      meta: "sample workspace activity",
    });
  }
  // A few extra realistic-but-illustrative entries
  entries.push(
    { familyId: "data-dense", text: "Design brief generated", meta: "module A · sample" },
    { familyId: "saas-product", text: "Tier comparison viewed", meta: "module set: 18/22" },
    { familyId: "micro", text: "Template exported", meta: "demo data stripped" },
    { familyId: "enterprise-platform", text: "Quality report ready", meta: "0 blocking findings" }
  );
  return entries;
}

/* ─── App ────────────────────────────────────────────────────────── */

export default function App() {
  const [view, setView] = useState<View>({ kind: "home" });
  const [selected, setSelected] = useState<{
    config: MockupConfig;
    businessName: string;
    example?: ProductExample;
    offerContext?: OfferContext & { productName: string };
  } | null>(null);

  const handlePreview: PreviewFn = (config, businessName, example, ctx) =>
    setSelected({
      config,
      businessName,
      example,
      offerContext: ctx ? { ...ctx, productName: businessName } : undefined,
    });

  /* One featured example per family for the home rail */
  const featured = useMemo(
    () =>
      familyIds.map((fid) => {
        const items = familyProductMap[fid] ?? [];
        const fp = items[0];
        const product = fp?.product;
        const example = product?.examples[0];
        return { fid, fp, product, example };
      }),
    []
  );

  return (
    <AppShell
      view={view}
      onSelect={setView}
      families={sidebarFamilies}
      productCount={totalProducts}
      exampleCount={totalExamples}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={view.kind === "family" ? `family-${view.familyId}` : view.kind}
          variants={viewSwap}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {/* ── Home ── */}
          {view.kind === "home" && (
            <div>
              <HomeHero
                totalProducts={totalProducts}
                totalExamples={totalExamples}
                onPricing={() => setView({ kind: "pricing" })}
                onGoal={(fid) => setView({ kind: "family", familyId: fid })}
              />
              <ActivityTicker entries={buildTicker()} />
              <FamilyTheater
                panels={theaterPanels}
                onSelect={(fid) => setView({ kind: "family", familyId: fid })}
              />
              <FamilyGrid
                counts={counts}
                exampleCounts={exampleCounts}
                tierLettersByFamily={tierLettersByFamily}
                onSelect={(fid) => setView({ kind: "family", familyId: fid })}
                onPricing={() => setView({ kind: "pricing" })}
              />
              <FeaturedRail
                title="Featured examples"
                subtitle="one from each family — click to preview"
                icon={Eye}
              >
                <motion.div
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  className="grid grid-cols-2 gap-2.5 lg:grid-cols-5"
                >
                  {featured.map(
                    ({ fid, fp, product, example }, i) =>
                      example &&
                      product && (
                        <ExampleCard
                          key={fid}
                          example={example}
                          index={i}
                          familyShort={familyMeta[fid].short}
                          familyChip={familyMeta[fid].chip}
                          offerContext={fp ? { tierLetter: fp.tierLetter, productTypeId: fp.product.id } : undefined}
                          onPreview={() =>
                            handlePreview(example, product.name, example, fp
                              ? { tierLetter: fp.tierLetter, productTypeId: fp.product.id }
                              : undefined)
                          }
                        />
                      )
                  )}
                </motion.div>
              </FeaturedRail>
            </div>
          )}

          {/* ── Family ── */}
          {view.kind === "family" && (
            <FamilyView
              familyId={view.familyId}
              items={familyProductMap[view.familyId] ?? []}
              onPreview={handlePreview}
            />
          )}

          {/* ── Pricing ── */}
          {view.kind === "pricing" && <PricingView />}
        </motion.div>
      </AnimatePresence>

      {/* Presentation studio */}
      <AnimatePresence>
        {selected && (
          <PresentationStudio
            config={selected.config}
            businessName={selected.businessName}
            example={selected.example}
            offerContext={selected.offerContext}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      {/* P1 receipts + P5 Delivery Room — global surfaces */}
      <ReceiptStack />
      <DeliveryRoom />
    </AppShell>
  );
}
