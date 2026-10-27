/* Extract exact derived offers for the plan — runs the REAL catalog engine */
import { productTierCategories } from "../src/data/exampleProducts";
import { deriveOffer } from "../src/components/omniforge/product-catalog";

type Row = {
  id: string;
  block: string;
  example: string;
  price: number | null;
  compareAt: number | null;
  rating: number;
  reviews: number;
  sold: string;
  version: string;
  updated: string;
  files: number;
  folders: number;
  size: string;
  manifest: string[];
  tree: { folder: string; files: string[] }[];
  root: string[];
  testimonial: string;
};

const out: Row[] = [];
for (const section of productTierCategories) {
  if (section.letter !== "B" && section.letter !== "C") continue;
  for (const product of section.products) {
    if (section.letter === "C" && product.id !== "website-kit") continue;
    for (const ex of product.examples) {
      const o = deriveOffer({
        tierLetter: section.letter,
        productTypeId: product.id,
        exampleName: ex.exampleName,
        features: ex.features,
      });
      out.push({
        id: `${section.letter}:${product.id}:${ex.exampleName}`,
        block: `${section.letter} · ${product.name}`,
        example: ex.exampleName,
        price: o.price,
        compareAt: o.compareAt,
        rating: o.rating,
        reviews: o.social.ratingCount,
        sold: o.social.soldLabel,
        version: o.social.version,
        updated: o.social.updated,
        files: o.bundle.stats.fileCount,
        folders: o.bundle.stats.folderCount,
        size: o.bundle.stats.totalSize,
        manifest: o.manifest,
        tree: o.bundle.folders.map((f) => ({ folder: f.folder, files: f.files.map((x) => `${x.name}.${x.ext} (${x.size})`) })),
        root: o.bundle.rootFiles.map((f) => `${f.name}.${f.ext}`),
        testimonial: `${o.testimonial.name} (${o.testimonial.role}): ${o.testimonial.quote}`,
      });
    }
  }
}
console.log(JSON.stringify(out, null, 1));
