/** Debug: list SITE_SHOWCASE_SLUGS + the failing entry's blueprint fields. */
import { SITE_SHOWCASE_SLUGS, findSiteBlueprintBySlug } from '../lib/site-preview';

console.log('SHOWCASE SLUGS:');
SITE_SHOWCASE_SLUGS.forEach((s) => console.log(' -', s));

const failing = process.argv[2];
if (failing) {
  const bp = findSiteBlueprintBySlug(failing);
  if (!bp) {
    console.log('NO BLUEPRINT for', failing);
  } else {
    console.log('\nBLUEPRINT for', failing);
    console.log('brand:', JSON.stringify(bp.brand));
    console.log('heroEyebrow:', JSON.stringify(bp.heroEyebrow));
    console.log('heroTitle:', JSON.stringify(bp.heroTitle));
    console.log('heroAccent:', JSON.stringify(bp.heroAccent));
    console.log('heroSub:', JSON.stringify(bp.heroSub));
    console.log('heroImage:', JSON.stringify(bp.heroImage));
    console.log('stats:', JSON.stringify(bp.stats));
    console.log('features:', bp.features.length, 'gallery:', bp.galleryImages.length, 'faq:', bp.faq.length);
    console.log('price:', JSON.stringify(bp.price));
  }
}
