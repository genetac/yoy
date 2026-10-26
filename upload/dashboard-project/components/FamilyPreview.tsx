import { useEffect, useRef, useState } from "react";
import type { ProductExample } from "@/data/exampleProducts";
import { getFamilyForProductType, familyTokens, type DesignFamilyId } from "@/data/designFamilies";
import { MicroRenderer } from "./renderers/MicroRenderer";
import { IndustryWarmRenderer } from "./renderers/IndustryWarmRenderer";
import { SaaSProductRenderer } from "./renderers/SaaSProductRenderer";
import { DataDenseRenderer } from "./renderers/DataDenseRenderer";
import { EnterprisePlatformRenderer } from "./renderers/EnterprisePlatformRenderer";
import { productTierCategories, subscriptionSection } from "@/data/exampleProducts";

// Map of example label -> productTypeId, built from the catalog.
const labelToProductType: Record<string, string> = {};
for (const cat of productTierCategories) {
  for (const product of cat.products) {
    for (const ex of product.examples) {
      labelToProductType[ex.label] = product.id;
    }
  }
}
for (const product of subscriptionSection.products) {
  for (const ex of product.examples) {
    labelToProductType[ex.label] = product.id;
  }
}

function extractProductTypeId(example: ProductExample): string {
  const byLabel = labelToProductType[example.label];
  if (byLabel) return byLabel;
  if (example.layout === "premium") return example.tier === "enterprise" ? "custom-saas" : "saas-tool";
  if (example.layout === "standard") return "website-kit";
  return "landing-template";
}

type RendererProps = { example: ProductExample; tokens: typeof familyTokens[DesignFamilyId] };

function getRenderer(familyId: DesignFamilyId): React.ComponentType<RendererProps> {
  switch (familyId) {
    case "micro":
      return MicroRenderer as never;
    case "industry-warm":
      return IndustryWarmRenderer as never;
    case "saas-product":
      return SaaSProductRenderer as never;
    case "data-dense":
      return DataDenseRenderer as never;
    case "enterprise-platform":
      return EnterprisePlatformRenderer as never;
    default:
      return MicroRenderer as never;
  }
}

// The renderers are authored at a native width of ~390px (mobile-ish).
// In the full modal they need to scale up to fill the available width.
const NATIVE_WIDTH = 390;

function ScaledPreview({ example }: { example: ProductExample }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);

  const familyId = getFamilyForProductType(extractProductTypeId(example));
  const tokens = familyTokens[familyId];
  const Renderer = getRenderer(familyId);

  useEffect(() => {
    const el = containerRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const compute = () => {
      const available = el.clientWidth;
      const nextScale = Math.max(1, available / NATIVE_WIDTH);
      setScale(nextScale);
      // Measure natural height after a tick, then set the outer height so
      // the scaled content doesn't leave a gap or get clipped.
      requestAnimationFrame(() => {
        if (innerRef.current) {
          setContentHeight(innerRef.current.scrollHeight);
        }
      });
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    // Also re-measure when images load (changes scrollHeight).
    const imgs = inner.querySelectorAll("img");
    const onImg = () => compute();
    imgs.forEach((img) => {
      if (img.complete) onImg();
      else img.addEventListener("load", onImg);
    });
    return () => {
      ro.disconnect();
      imgs.forEach((img) => img.removeEventListener("load", onImg));
    };
  }, [example]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", overflow: "hidden" }}
    >
      <div
        style={{
          width: NATIVE_WIDTH,
          height: contentHeight ? contentHeight * scale : undefined,
          position: "relative",
        }}
      >
        <div
          ref={innerRef}
          style={{
            width: NATIVE_WIDTH,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <Renderer example={example} tokens={tokens} />
        </div>
      </div>
    </div>
  );
}

export function FamilyPreview({ example }: { example: ProductExample }) {
  return <ScaledPreview example={example} />;
}
