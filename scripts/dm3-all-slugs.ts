/** Print every preview slug (one per line) for the 200/500 sweep. */
import { findSiteEntryBySlug } from '../lib/site-preview';
// reconstruct the full index by walking every known entry slug via the registry
import { SITE_SHOWCASE_SLUGS } from '../lib/site-preview';

// The index is private; re-derive it the same way site-preview does:
import { productTierCategories, subscriptionSection } from '../data/exampleProducts';
import { deriveOffer } from '../data/product-catalog';

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'example';
}
const sections = [
  ...productTierCategories.map((c) => ({ products: c.products })),
  { products: subscriptionSection.products },
];
const slugs: string[] = [];
for (const section of sections) {
  for (const product of section.products) {
    for (const ex of product.examples) {
      slugs.push(`${product.id}-${slugify(ex.label)}`);
    }
  }
}
console.log('TOTAL', slugs.length);
console.log(slugs.join('\n'));
