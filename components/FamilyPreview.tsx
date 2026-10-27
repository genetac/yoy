'use client';
/**
 * OMNIFORGE · FamilyPreview (Genome backbone edition)
 *
 * The studio's template design preview now renders the REAL product site —
 * the identical flagship component the full-size review serves, at a true
 * 1280px viewport, scaled to the studio pane and fully interactive. The
 * genome (DNA + 7 switches + engine bias + mode) dresses it live; the old
 * 390px family mockups remain only inside the family grammar miniatures.
 */
import { SiteFrame } from '@/components/site/SiteFrame';
import { siteSlugForLabel } from '@/lib/site-preview';
import type { ProductExample } from '@/data/exampleProducts';

export function FamilyPreview({ example }: { example: ProductExample }) {
  const slug = siteSlugForLabel(example.label);
  return (
    <div className="w-full">
      <SiteFrame
        slug={slug}
        mode="full"
        interactive
        ariaLabel={`${example.label} — the real site, exactly as the full-size review`}
      />
    </div>
  );
}
