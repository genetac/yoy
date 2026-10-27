/**
 * OMNIFORGE · Site Preview index (Design Matrix v2)
 *
 * The full-website preview registry: every example in the catalog gets
 * a real, full-size website at /preview/{slug} — rendered as an actual
 * page (real nav, hero, sections, footer), never a shrunk mockup, and
 * fully re-skinned by the active engine + mode.
 *
 * Server-safe: pure data derivations, no window access.
 */
import { productTierCategories, subscriptionSection, type ProductExample, type ProductType } from '@/data/exampleProducts';
import { getFamilyForProductType } from '@/data/designFamilies';
import { deriveOffer, offerStats, POLICY_META, type OfferV2 } from '@/data/product-catalog';
import { FAMILY_GRAMMAR } from '@/data/system-contract';

/* ── the full example index (mirrors the dashboard's plate numbering) ── */

export interface SiteIndexEntry {
  slug: string;
  productId: string;
  productName: string;
  tierLetter: string;
  tierName: string;
  example: ProductExample;
  offer: OfferV2;
  plateNo: string;
}

const allSections = [
  ...productTierCategories.map((c) => ({ letter: c.letter, name: c.name, products: c.products })),
  { letter: 'S', name: subscriptionSection.name, products: subscriptionSection.products },
];

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'example';
}

const ENTRIES: SiteIndexEntry[] = [];
const plateNoOf: Record<string, string> = {};
let counter = 0;
for (const section of allSections) {
  for (const product of section.products) {
    for (const ex of product.examples) {
      counter += 1;
      const plateNo = String(counter).padStart(3, '0');
      plateNoOf[ex.label] = plateNo;
      ENTRIES.push({
        slug: `${product.id}-${slugify(ex.label)}`,
        productId: product.id,
        productName: product.name,
        tierLetter: section.letter,
        tierName: section.name,
        example: ex,
        offer: deriveOffer(product.id, ex),
        plateNo,
      });
    }
  }
}

export const SITE_EXAMPLES_COUNT = ENTRIES.length;

/** The full 96-example index (for genome sibling context). */
export function allSiteEntries(): readonly SiteIndexEntry[] {
  return ENTRIES;
}

/** Deterministic "step inside a room" picks — one flagship example per engine. */
export const SITE_SHOWCASE_SLUGS: string[] = Array.from(
  { length: 6 },
  (_, i) => ENTRIES[(3 + i * 15) % ENTRIES.length].slug,
);

export function findSiteEntryBySlug(slug: string): SiteIndexEntry | null {
  return ENTRIES.find((e) => e.slug === slug) ?? null;
}

export function siteSlugFor(productId: string, label: string): string {
  return `${productId}-${slugify(label)}`;
}

/** Slug for an example by its label (used by plates & studio links). */
export function siteSlugForLabel(label: string): string {
  const e = ENTRIES.find((x) => x.example.label === label);
  return e ? e.slug : '';
}

/** Deep link helper: open the studio for ?offer=<offerId>. */
export function findExampleByOfferId(offerId: string): { example: ProductExample; productName: string; productId: string } | null {
  const e = ENTRIES.find((x) => x.offer.offerId === offerId);
  return e ? { example: e.example, productName: e.productName, productId: e.productId } : null;
}

/** Client helper: open a studio offer straight from ?offer=<offerId>. */
export function findProductByExampleLabel(label: string): { product: ProductType; tierName: string } | null {
  for (const section of allSections) {
    for (const product of section.products) {
      if (product.examples.some((ex) => ex.label === label)) {
        return { product, tierName: section.name };
      }
    }
  }
  return null;
}

/* ── the website blueprint — real copy, informational, honest ────── */

export interface SiteBlueprint {
  slug: string;
  offerId: string;
  plateNo: string;
  brand: string;
  familyLabel: string;
  familyIndex: string;
  familyBlurb: string;
  tierName: string;
  title: string;
  edition: string;
  heroEyebrow: string;
  heroTitle: string;
  heroAccent: string;
  heroSub: string;
  heroImage: string;
  galleryImages: string[];
  stats: { label: string; value: string }[];
  features: { id: string; title: string; promise: string; files: string[] }[];
  includesLine: string;
  review: { quote: string; name: string; role: string; rating: number; sold: string; version: string };
  price: { amount: number | null; compareAt: number | null };
  policies: string[];
  faq: { q: string; a: string }[];
  footerLine: string;
}

export function siteBlueprintFor(entry: SiteIndexEntry): SiteBlueprint {
  const { offer, example, productName } = entry;
  const stats = offerStats(offer);
  const fid = getFamilyForProductType(entry.productId);
  const grammar = FAMILY_GRAMMAR[fid];
  const titleWords = offer.title.split(' ');
  const accentWord = titleWords.length > 1 ? titleWords[titleWords.length - 1] : offer.title;
  const heroTitle = titleWords.length > 1 ? titleWords.slice(0, -1).join(' ') : 'The';

  return {
    slug: entry.slug,
    offerId: offer.offerId,
    plateNo: entry.plateNo,
    brand: productName,
    familyLabel: grammar ? `${grammar.index} · ${fid === 'industry-warm' ? 'Industry & Hospitality' : fid === 'data-dense' ? 'Data Dashboards' : fid === 'saas-product' ? 'SaaS Products' : fid === 'enterprise-platform' ? 'Enterprise Platforms' : 'Micro Products'}` : 'OMNIFORGE',
    familyIndex: grammar?.index ?? '00',
    familyBlurb: grammar?.blurb ?? '',
    tierName: entry.tierName,
    title: offer.title,
    edition: offer.edition,
    heroEyebrow: `${entry.tierName} edition · ${offer.edition}`,
    heroTitle,
    heroAccent: accentWord,
    heroSub: example.exampleDescription || offer.promise,
    heroImage: example.heroImage || '',
    galleryImages: [example.heroImage, ...(ENTRY_GALLERY.get(entry.productId) ?? [])]
      .filter((x): x is string => Boolean(x))
      .slice(0, 4),
    stats: [
      { label: 'buyer rating', value: offer.proof.rating.toFixed(1) },
      { label: 'kits sold', value: String(offer.proof.soldCount) },
      { label: 'files in the kit', value: String(stats.files) },
      { label: 'real content', value: `${stats.realPct}%` },
    ],
    features: offer.deliverables.map((d) => ({
      id: d.id,
      title: d.title,
      promise: d.promise,
      files: d.files.slice(0, 4).map((f) => f.path.split('/').pop() ?? f.path),
    })),
    includesLine: `${stats.folders} folders · ${stats.files} files · ${stats.kb} KB — every file carries its honest flag`,
    review: {
      quote:
        offer.proof.testimonial?.quote ??
        'The manifest matched the archive file-for-file — that never happens. Everything I was promised was in the ZIP.',
      name: offer.proof.testimonial?.name ?? 'A buyer from the wall',
      role: offer.proof.testimonial?.role ?? 'demo testimonial — labeled as such',
      rating: offer.proof.rating,
      sold: String(offer.proof.soldCount),
      version: offer.proof.version,
    },
    price: { amount: offer.price.amount, compareAt: offer.price.compareAt },
    policies: offer.policies.map((p) => POLICY_META[p].label),
    faq: [
      {
        q: 'What exactly do I get when I buy?',
        a: `${stats.folders} folders and ${stats.files} files — the same manifest you can read in the forge's "What's Included" explorer, compiled into a ZIP right in your browser. Every file is labeled Real, Sample or Extended; nothing in the archive is a surprise.`,
      },
      {
        q: 'What is the license, and what about updates?',
        a: `${offer.policies.map((p) => POLICY_META[p].label).join(', ')}. One seat per purchase — use it on one commercial project, keep every future version at no extra cost.`,
      },
      {
        q: 'Are the ratings and sold counts real?',
        a: 'No — and the site says so wherever they appear. Ratings, sold counts and testimonials are labeled demo data. What IS real: the files, the manifest, the working demo you just used, and the ZIP the forge compiles for you.',
      },
    ],
    footerLine: 'Ratings, sold counts and prices are labeled demo data. Manifests match archives 1:1 — every file carries its honest flag.',
  };
}

/* gallery pool: each product's own examples, keyed by product id */
const ENTRY_GALLERY = new Map<string, string[]>();
for (const section of allSections) {
  for (const product of section.products) {
    const imgs = product.examples.map((e) => e.heroImage).filter((x): x is string => Boolean(x));
    if (imgs.length) ENTRY_GALLERY.set(product.id, imgs);
  }
}

export function findSiteBlueprintBySlug(slug: string): SiteBlueprint | null {
  const entry = findSiteEntryBySlug(slug);
  return entry ? siteBlueprintFor(entry) : null;
}
