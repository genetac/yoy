/**
 * OMNIFORGE · Genome copy — the text layer of the backbone
 *
 * Every example's site is authored from its OWN data (offer, features,
 * proof) plus its category siblings — so a front page is never empty and
 * always carries the right category's examples (a bootcamp front page
 * shows cohorts, a restaurant shows its menu, a shop shows its shelf).
 * The console's Text panel overrides brand/headline/subhead/cta live.
 */
import { offerStats, POLICY_META } from '@/data/product-catalog';
import { hashSlug } from './tokens';
import { archetypeFor } from './catalog';
import type { SiteIndexEntry } from '@/lib/site-preview';
import { siteBlueprintFor } from '@/lib/site-preview';

export interface SiblingItem {
  slug: string;
  name: string;
  blurb: string;
  image: string;
  price: number;
  rating: number;
}

export interface SiteCopy {
  brand: string;
  edition: string;
  familyLabel: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  sub: string;
  cta: string;
  ctaGhost: string;
  heroImage: string;
  navLinks: string[];
  stats: { label: string; value: string }[];
  features: { id: string; title: string; promise: string; files: string[] }[];
  siblings: SiblingItem[];
  review: { quote: string; name: string; role: string; rating: number; sold: string; version: string };
  price: { amount: number | null; compareAt: number | null };
  policies: string[];
  faq: { q: string; a: string }[];
  plateNo: string;
  offerId: string;
  footerLine: string;
}

/* ── deterministic sibling shop data ────────────────────────────── */

function siblingItem(e: SiteIndexEntry): SiblingItem {
  const h = hashSlug(e.slug);
  const p = e.offer.price.amount;
  return {
    slug: e.slug,
    name: e.example.label,
    blurb: e.example.tagline,
    image: e.example.heroImage ?? '',
    price: p !== null ? Math.max(8, Math.round(p)) : 9 + (h % 38),
    rating: Math.round((4.2 + (h % 8) / 10) * 10) / 10,
  };
}

/** Category examples for the front page: same product first, then same tier. */
export function siblingsFor(entry: SiteIndexEntry, all: SiteIndexEntry[], max = 8): SiblingItem[] {
  const seen = new Set<string>([entry.slug]);
  const out: SiblingItem[] = [];
  const push = (e: SiteIndexEntry) => {
    if (out.length >= max || seen.has(e.slug) || !e.example.heroImage) return;
    seen.add(e.slug);
    out.push(siblingItem(e));
  };
  all.filter((e) => e.productId === entry.productId).forEach(push);
  all.filter((e) => e.tierLetter === entry.tierLetter).forEach(push);
  all.filter((e) => e.offer.offerId !== entry.offer.offerId).slice(0, max).forEach(push);
  return out;
}

/* ── the copy generator ─────────────────────────────────────────── */

const ARCHETYPE_CTAS: Record<string, [string, string, string[]]> = {
  'saas-orbit': ['Start 14-day trial', 'Watch 90s demo', ['Product', 'Changelog', 'Pricing', 'Docs']],
  'cg-wholesale': ['Submit PO on net-30', 'Repeat last order', ['Catalogue', 'Programmes', 'Freight', 'Account']],
  'cg-maison': ['Reserve a flacon', 'The making of', ['Parfums', 'Maroquinerie', 'Atelier', 'Rendez-vous']],
  'cg-cart': ['Shop the drop', 'Free delivery over $25', ['Deals', 'New in', 'Categories', 'Help']],
  'dash-telemetry': ['Open the console', 'Route alerts to Slack', ['Overview', 'Regions', 'Alerts', 'Nodes']],
  'micro-pocket': ['Buy one', 'See the batch', ['The thing', 'Specs', 'Reviews', 'FAQ']],
  'hosp-terroir': ['Reserve a table', 'Read the menu', ['Menu', 'The room', 'Private dining', 'Visit']],
  'ent-atlas': ['Request briefing', 'Read the audit', ['Platform', 'Security', 'Customers', 'Contact']],
};

export function siteCopyFor(entry: SiteIndexEntry, all: SiteIndexEntry[], archetypeOverride?: string): SiteCopy {
  const bp = siteBlueprintFor(entry);
  const stats = offerStats(entry.offer);
  const arch = archetypeOverride ?? archetypeFor(entry.productId, entry.productName, entry.example.label);
  const [cta, ctaGhost, navLinks] = ARCHETYPE_CTAS[arch] ?? ARCHETYPE_CTAS['saas-orbit'];
  const words = entry.offer.title.split(' ');
  return {
    brand: entry.example.label,
    edition: entry.offer.edition,
    familyLabel: bp.familyLabel,
    eyebrow: `${entry.tierName} edition · ${entry.offer.edition}`,
    headline: words.length > 1 ? words.slice(0, -1).join(' ') : bp.brand,
    headlineAccent: words.length > 1 ? words[words.length - 1] : entry.offer.title,
    sub: entry.example.exampleDescription || entry.offer.promise,
    cta,
    ctaGhost,
    heroImage: entry.example.heroImage ?? '',
    navLinks,
    stats: [
      { label: 'buyer rating', value: entry.offer.proof.rating.toFixed(1) },
      { label: 'kits sold', value: String(entry.offer.proof.soldCount) },
      { label: 'files in the kit', value: String(stats.files) },
      { label: 'real content', value: `${stats.realPct}%` },
    ],
    features: entry.offer.deliverables.map((d) => ({
      id: d.id,
      title: d.title,
      promise: d.promise,
      files: d.files.slice(0, 4).map((f) => f.path.split('/').pop() ?? f.path),
    })),
    siblings: siblingsFor(entry, all),
    review: {
      quote: bp.review.quote,
      name: bp.review.name,
      role: bp.review.role,
      rating: bp.review.rating,
      sold: bp.review.sold,
      version: bp.review.version,
    },
    price: { amount: entry.offer.price.amount, compareAt: entry.offer.price.compareAt },
    policies: entry.offer.policies.map((p) => POLICY_META[p].label),
    faq: bp.faq,
    plateNo: entry.plateNo,
    offerId: entry.offer.offerId,
    footerLine: bp.footerLine,
  };
}
