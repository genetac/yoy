/* Verify archetype coverage: how many of the 96 examples map to each of the 8 flagships? */
const fs = require('fs');
const src = fs.readFileSync('data/exampleProducts.ts', 'utf8');
const src2 = fs.readFileSync('data/designFamilies.ts', 'utf8');

// family mapping: productId -> family id (parse getFamilyForProductType's data or the products list)
// designFamilies exports familyTokens + getFamilyForProductType; replicate the mapping from the file:
const famMap = {};
const famRe = /"([a-z-]+)":\s*\[([^\]]+)\]/g; // rough
// Simpler: parse products with their section context is hard; instead read the explicit mapping if present.
const m = src2.match(/PRODUCT_FAMILY\s*[:=]\s*{([^}]+)}/s) || src2.match(/const[^\n]+\{\s*$/m);
console.log('has explicit map block:', !!m);
// Fallback: run the real logic via a quick transpile — use the family assignment by scanning designFamilies.ts for member lists.
const families = [...src2.matchAll(/([a-z-]+)':\s*\[([^\]]*?)\]/g)].map(([, fid, list]) => ({
  fid,
  products: [...list.matchAll(/"([a-z-]+)"/g)].map((x) => x[1]),
}));
families.forEach((f) => f.products.forEach((p) => (famMap[p] = f.fid)));
console.log('families parsed:', families.map((f) => `${f.fid}:${f.products.length}`).join(' '));

const RE_LUXURY = /luxury|perfume|jewel|atelier|maison|gallery|fashion|boutique|watch|bridal/i;
const RE_TRADE = /wholesale|distributor|supplier|trade|b2b|vendor|market/i;
const RE_RETAIL = /shop|store|cafe|menu|bakery|retail|ecommerce|grocery|florist|gift|cart|drop/i;

function archetypeFor(productId, productName) {
  const fam = famMap[productId] || 'micro';
  const hay = `${productId} ${productName}`;
  if (fam === 'data-dense') return 'dash-telemetry';
  if (fam === 'saas-product') return 'saas-orbit';
  if (fam === 'enterprise-platform') return 'ent-atlas';
  if (fam === 'industry-warm') {
    if (RE_LUXURY.test(hay)) return 'cg-maison';
    if (RE_TRADE.test(hay)) return 'cg-wholesale';
    if (RE_RETAIL.test(hay)) return 'cg-cart';
    return 'hosp-terroir';
  }
  return 'micro-pocket';
}

let product = null;
const counts = {};
const examples = [];
const re = /id: "([a-z-]+)"|name: "([^"]+)"|mkExample\("([a-z]+)", "([^"]+)"/g;
let mch;
while ((mch = re.exec(src))) {
  if (mch[1]) product = { id: mch[1], name: '' };
  else if (mch[2] && product && !product.name) product.name = mch[2];
  else if (mch[4] && product) {
    const a = archetypeFor(product.id, product.name);
    counts[a] = (counts[a] || 0) + 1;
    examples.push(`${product.id}(${product.name}) -> ${a}`);
  }
}
console.log('archetype coverage:', counts);
const missing = ['saas-orbit','cg-wholesale','cg-maison','cg-cart','dash-telemetry','micro-pocket','hosp-terroir','ent-atlas'].filter(a => !counts[a]);
console.log('MISSING archetypes:', missing.length ? missing : 'none — all 8 used');
