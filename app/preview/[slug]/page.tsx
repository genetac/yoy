import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SiteStage } from '@/components/preview/SiteStage';
import { findSiteEntryBySlug, siteBlueprintFor } from '@/lib/site-preview';
import { archetypeFor, flagshipBySlug } from '@/lib/genome/catalog';

/**
 * OMNIFORGE · /preview/[slug] — the full-website preview route.
 *
 * Every example in the catalog opens here as a REAL, full-size, scrollable
 * product site — its own flagship design (Orbit, Quartermaster, Maison,
 * Snapcart, Telemetry, Pocket, Terroir or Atlas), drawn live from the
 * design genome. The engine's showcase room stages the wordmark; the
 * PreviewBar flips engines, modes and genome switches live. The atelier
 * can also stage an example in a forced flagship design via ?as=<slug>.
 */
export async function generateMetadata(
  { params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | string[] | undefined>> },
): Promise<Metadata> {
  const { slug } = await params;
  const { as } = await searchParams;
  const entry = findSiteEntryBySlug(slug);
  if (!entry) return { title: 'Preview not found — OMNIFORGE' };
  const bp = siteBlueprintFor(entry);
  const forced = typeof as === 'string' ? as : undefined;
  const flagship = flagshipBySlug(forced ?? archetypeFor(entry.productId, entry.productName, entry.example.label));
  return {
    title: `${bp.brand} · ${bp.title} — ${flagship?.name ?? 'live'} site preview`,
    description: bp.heroSub,
  };
}

export default async function PreviewPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const entry = findSiteEntryBySlug(slug);
  if (!entry) notFound();
  return <SiteStage entry={entry} />;
}
