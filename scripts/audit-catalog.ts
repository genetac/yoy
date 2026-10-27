/* P0 truth audit — the leak suite from build plan v3.
   Run: bun scripts/audit-catalog.ts */
import { productTierCategories, subscriptionSection } from "../src/data/exampleProducts";
import { deriveOffer } from "../src/components/omniforge/product-catalog";
import { HEROES } from "../src/components/omniforge/catalog/hero";

let failures = 0;
const fail = (msg: string) => { failures++; console.error("  ✗ " + msg); };
const ok = (msg: string) => console.log("  ✓ " + msg);

const POLICY_WORDS = /\b(lifetime|free|updates?|guarantee|support|license)\b/i;

async function main() {
  /* Enumerate every example in the catalog */
  const examples: { tier: string; product: string; name: string; features: string[] }[] = [];
  for (const section of [...productTierCategories, { letter: "S", products: subscriptionSection.products }]) {
    for (const product of section.products) {
      for (const ex of product.examples) {
        examples.push({ tier: section.letter, product: product.id, name: ex.exampleName, features: ex.features });
      }
    }
  }
  console.log(`\nCatalog: ${examples.length} examples, ${HEROES.length} hero kits\n`);

  /* 1 · Policy words never appear in folder titles */
  let policyLeaks = 0;
  for (const ex of examples) {
    const offer = deriveOffer({ tierLetter: ex.tier, productTypeId: ex.product, exampleName: ex.name, features: ex.features });
    for (const folder of offer.deliverables) {
      if (POLICY_WORDS.test(folder.title)) { policyLeaks++; fail(`${offer.offerId}: folder title contains policy word → "${folder.title}"`); }
    }
  }
  if (policyLeaks === 0) ok(`0 policy-word folder titles across ${examples.length} examples`);

  /* 2 · No duplicate file paths within a bundle */
  let dupes = 0;
  for (const ex of examples) {
    const offer = deriveOffer({ tierLetter: ex.tier, productTypeId: ex.product, exampleName: ex.name, features: ex.features });
    const seen = new Set<string>();
    for (const f of [...offer.deliverables.flatMap((d) => d.files), ...offer.root]) {
      if (seen.has(f.path)) { dupes++; fail(`${offer.offerId}: duplicate path ${f.path}`); }
      seen.add(f.path);
    }
  }
  if (dupes === 0) ok(`0 duplicate file paths across ${examples.length} examples`);

  /* 3 · Heroes: authored, flags present, sources resolve into kit-content */
  const kitIds = new Set(["_shared", ...HEROES.map((h) => h.offerId)]);
  const banks = new Map<string, Record<string, string>>();
  for (const id of kitIds) {
    try {
      const mod = await import(`../src/components/omniforge/kit-content/${id}/content.ts`);
      banks.set(id, mod.files as Record<string, string>);
    } catch { /* missing module → caught per-file below */ }
  }
  let heroIssues = 0;
  const heroOffers = new Map<string, ReturnType<typeof deriveOffer>>();
  for (const hero of HEROES) {
    const ex = examples.find((e) => e.tier === hero.tierLetter && e.product === hero.archetype && e.name.toLowerCase() === hero.example.toLowerCase());
    if (!ex) { heroIssues++; fail(`hero ${hero.offerId}: example "${hero.example}" not found in catalog`); continue; }
    const offer = deriveOffer({ tierLetter: ex.tier, productTypeId: ex.product, exampleName: ex.name, features: ex.features });
    heroOffers.set(hero.offerId, offer);
    if (!offer.authored) { heroIssues++; fail(`${hero.offerId}: deriveOffer did not resolve hero (authored=false)`); }
    if (offer.offerId !== hero.offerId) { heroIssues++; fail(`${hero.offerId}: offerId mismatch → ${offer.offerId}`); }
    for (const f of [...offer.deliverables.flatMap((d) => d.files), ...offer.root]) {
      if (f.flag === "extended") continue;
      if (!f.source) { heroIssues++; fail(`${hero.offerId}: ${f.path} has flag ${f.flag} but no source`); continue; }
      const ownerId = f.source.startsWith("_shared/") ? "_shared" : hero.offerId;
      const key = f.source.startsWith("_shared/") ? f.source.slice(8) : f.source;
      if (!banks.get(ownerId)?.[key]) { heroIssues++; fail(`${hero.offerId}: source does not resolve → ${f.source}`); }
    }
    if (offer.realShare < 0.6) { heroIssues++; fail(`${hero.offerId}: realShare ${(offer.realShare * 100).toFixed(0)}% < 60% — "Complete" not allowed`); }
  }
  if (heroIssues === 0) ok(`all ${HEROES.length} heroes resolve with every non-extended source backed by content`);

  /* 4 · Regression: "Lifetime free updates" produces zero files */
  const regression = deriveOffer({ tierLetter: "B", productTypeId: "template-pack", exampleName: "RegressionProbe", features: ["Lifetime free updates"] });
  const filesFromPolicy = regression.deliverables.reduce((n, d) => n + d.files.length, 0);
  if (filesFromPolicy === 0 && regression.policies.some((p) => p.id === "updates")) ok(`regression: "Lifetime free updates" → 0 files, 1 policy chip`);
  else fail(`regression: policy line produced ${filesFromPolicy} files`);

  /* 5 · Snapshot review: TP-1 and WK-1 trees */
  for (const id of ["B-TP-1", "C-WK-1"]) {
    const offer = heroOffers.get(id);
    if (!offer) { fail(`${id}: no offer for snapshot`); continue; }
    console.log(`\n  ── snapshot ${id} · ${offer.title} · ${offer.plateNo} ──`);
    for (const folder of offer.deliverables) {
      console.log(`  ${folder.id}-${folder.title} (${folder.files.length} files)`);
      for (const f of folder.files.slice(0, 3)) console.log(`      ${f.path}  [${f.flag}] ${Math.round(f.bytes / 1024)} KB`);
      if (folder.files.length > 3) console.log(`      … +${folder.files.length - 3} more`);
    }
    console.log(`  root: ${offer.root.map((r) => r.path).join(", ")}`);
    const real = [...offer.deliverables.flatMap((d) => d.files), ...offer.root].filter((f) => f.flag !== "extended").length;
    console.log(`  realShare: ${(offer.realShare * 100).toFixed(0)}% (${real} real files)`);
  }

  console.log(failures === 0 ? "\nAUDIT PASS — 0 leaks\n" : `\nAUDIT FAIL — ${failures} issue(s)\n`);
  process.exit(failures === 0 ? 0 : 1);
}

main();
