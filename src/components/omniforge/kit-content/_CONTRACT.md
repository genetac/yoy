# kit-content authoring contract (read before writing anything)

Every kit is a single TypeScript module:
`src/components/omniforge/kit-content/<offerId>/content.ts`

```ts
import type { DemoContent } from "../../catalog/schema";

export const kitId = "<offerId>";           // e.g. "B-TK-2"
export const files: Record<string, string> = {
  "<bundle/path.ext>": `…the file's full, real content…`,
  // … one entry per file in the hero definition
};
export const demo: DemoContent = { … };      // Try-it tab content (schema type!)
```

## Hard rules

1. **Keys must exactly match the paths** in the hero definition
   (`src/components/omniforge/catalog/hero/<block>.ts`). Read that file
   first and copy paths verbatim. A missing or misspelled key fails the
   catalog audit. Include `EXTENDED-PACK/<name>.md` keys with the stub
   format shown in the reference kit.
2. **Every file is REAL, finished content.** No "coming soon", no
   "lorem", no placeholders like "add your content here" — except
   legitimate `{{merge_fields}}` (template kits) or clearly-labelled
   example rows (CSV kits). An expert buyer must be able to use the
   file the minute they open it.
3. **Volume:** each real file is 20–150 lines of genuinely useful
   content. CSV banks have a header row + the promised row count
   (e.g. "25 authored rows" = 25 data rows). Single-file HTML tools are
   complete, working instruments (~150–350 lines) — inline CSS + JS, no
   CDN dependencies, no network calls, keyboard accessible.
4. **TypeScript safety:** file contents are TS template literals —
   escape every backtick as \` and every `${` as \${ inside content.
   Only `{{curly}}` merge fields are safe unescaped.
5. **Demo content** must match the `DemoContent` union member for the
   archetype (see `catalog/schema.ts`) and reuse the same copy/data as
   the kit files — the demo previews the real product:
   - template-pack → `kind: "templates"` (3 flagship templates, full copy, merge fields)
   - toolkit → `kind: "tool"` (tool id: seo | contrast | regex | headline, 3 presets)
   - notion-system → `kind: "notion"` (12 rows sampled from the CSVs)
   - assessment-tool → `kind: "quiz"` (25 questions with 4 weighted options each, 4 bands)
   - website-kit → `kind: "site"` (all pages, sections, booking fields)
6. **Voice:** concrete over abstract, numbers over adjectives, honest
   over hype. Read `B-TP-1/content.ts` first — it sets the bar.
7. **Never** invent prices, testimonials or "as seen in" claims inside
   file contents. Support email is support@omniforge.example.
8. **Do not modify anything** outside your three kit-content module
   files. No other file. Exceptions: none.
