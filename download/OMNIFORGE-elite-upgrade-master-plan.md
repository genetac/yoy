# OMNIFORGE — Elite Upgrade Master Plan (v2)
### System documentation + per-block evidence + prestige / 3D / real-media / true-demo integration plan
*Prepared for template-level review. Reply with corrections by ID (see Part E).*

---

## PART A — THE SYSTEM WE HAVE TODAY (verified in code, not assumed)

### A1. Architecture (files and data flow)

```
src/app/page.tsx                    Composition root: view state (home | family | pricing),
                                    studio modal state, featured rail (1 example per family)
 ├─ app-shell.tsx                   Sidebar (5 families + counts), ForgeMark, ⌘K palette, theme
 ├─ home-sections.tsx               HomeHero (stats + goal chips) · ActivityTicker · FamilyGrid · FeaturedRail
 ├─ family-theater.tsx              Auto-cycling 5.2s theater (5 animated panels = "GIF layer" #1)
 ├─ family-visuals.tsx              familyMeta (labels, recipes, accents) + 5 live miniatures ("GIF layer" #2)
 ├─ family-view.tsx                 FamilyView → tier groups → ProductSection blocks → ProductListingCard
 ├─ product-catalog.ts              deriveOffer() — THE offer engine (prices, manifests, bundles, proof)
 ├─ listing-extras.tsx              StarRating · SocialProofRow · ManifestExplorer · TestimonialQuote
 ├─ purchase-flow.tsx               Session-persistent owned registry + PurchaseButton + toasts
 ├─ PresentationStudio.tsx          Full-screen studio modal (3 tabs, 3 devices, TemplateBrief, offer strip)
 └─ FamilyPreview.tsx → renderers/  5 family renderers + shared content/interledger sections
Data:
 exampleProducts.ts    6 sections (A,B,C,D,E,S) × 4 product types × 4 examples = 24 types / 96 examples
 designFamilies.ts     5 family token sets (fonts, radius, spacing, shadows, sectionStyle) + type→family map
 servicePackages.ts    Tier packages (getPackage, tierDisplay)
```

### A2. The six surfaces and what each shows

| # | Surface | Structure currently shown |
|---|---------|---------------------------|
| S1 | Home | Hero (2 stats + 6 goal chips) → activity ticker (demo) → Family Theater (auto-cycle 5.2 s, 5 animated panels) → family grid (5 cards w/ animated miniatures) → featured rail (5 ExampleCards, rating rows) |
| S2 | Family view | Header (label, recipe, radius, section style, Expand/Collapse-all) → tier groups (letter + name + range) → **ProductSection blocks — ALL minimized by default** |
| S3 | Collapsed block | Tier chip (B) · product name · description · scent line (first 3 example names) · "4 products · buy instantly" chip · chevron |
| S4 | Expanded block | Grid of ProductListingCards (2-col on xl) + demo disclaimer footer |
| S5 | Listing card | ① MiniPreview thumb (family chip + tier badge + real photo) ② name ③ SocialProofRow (★4.5–4.9 · (reviews) · N sold · vX.Y · Updated) ④ description ⑤ ManifestExplorer (numbered 01–0N folders → real file names + ext icons + sizes, Browse-all, Bundle root, stats footer) ⑥ format chips + license ⑦ TestimonialQuote ⑧ price + compare-at strikethrough ⑨ delivery/updates/30-day-guarantee row ⑩ Live presentation button ⑪ PurchaseButton (idle → Processing… → owned "Download · N files") |
| S6 | Studio | Chrome bar (traffic lights, fake https URL, tier badge) → info bar (name, price, compact buy) → tabs (Live Preview / What's Included / Compare Tiers) → device bar (desktop/tablet/mobile, Alt+←/→) → honesty banner → TemplateBrief (dark: feature chips + "Why this design": audience/hierarchy/intent/recipe) → offer strip (dark ManifestExplorer + sticky buy card w/ proof + guarantee) → device viewport with the real family-rendered preview |

### A3. How every element is scoped (the offer engine)

`deriveOffer({tierLetter, productTypeId, exampleName, features})` deterministically derives:
- **Price**: tier ladder slot by hash — A $3–29, B $19–99, C $79–379, D $299–1899, E null (custom quote), S $9–249/mo. Compare-at = ladder top.
- **Manifest** = example's own features (hand-authored) **+ 2 archetype extras** (e.g. "Quick-start guide (PDF)", "Lifetime free updates").
- **Bundle tree**: each manifest item becomes folder `01-…/`; sub-files come from ~26 keyword banks matched on the item text, else archetype fallback sets (rotated, deduped); extensions by keyword rules; sizes by ext ranges; root = README/LICENSE/CHANGELOG/quick-start (+ notion duplicate-link).
- **Proof**: rating 4.5–4.9, review count per tier range, sold = f(reviews), version, updated month.
- **Testimonial**: 12-persona bank, hash-picked.
- **Formats** per archetype (template-pack: DOCX/PDF/EML; toolkit: Web app/ZIP/Guide PDF; notion: Notion/PDF; assessment: HTML quiz/PDF report).

### A4. Block-by-block evidence — the 5 pasted families (Tier B, 20 examples)

Prices/proof/files below are **actual derived values** from the running engine.

**B-1 Template Packs** (formats DOCX·PDF·EML)

| ID | Example | Price/compare | Proof | Bundle | Promise-accuracy audit |
|----|---------|--------------|-------|--------|------------------------|
| TP-1 | Email Template Pack | $34 / $49 | 4.5★ · 65 rev · 562 sold · v2.3 | 23 files / 5 folders / 2.7 MB | 01 Welcome ✓ (day-0/2/4/6) · 02 Cold ✓ (3 openers, merge fields, objection-crusher, break-up) · 03 Follow-up ✓ (day-3/7/14, win-back) · **04 Quick-start ✗ contains "light-dark-variants.docx, copy-paste-prompts.docx, bonus-mini-pack.docx"** · **05 Lifetime free updates ✗ contains "dashboard-view-preset.json, sample-data-csv.csv…" ("Lifetime" matched the /time/ catch-all)** |
| TP-2 | Proposal Template Pack | $34 / $49 | 4.6★ · 167 rev · 576 sold | 23 files / 2.6 MB | Proposal/pricing/terms banks ✓; extras folders ✗ same class of mismatch |
| TP-3 | Presentation Template Pack | $79 / $99 | 4.7★ · 25 rev · 418 sold · v2.2 | 21 files / 3.7 MB | Slide bank ✓ (20 layouts, chart slides, themes, speaker notes); extras ✗ |
| TP-4 | Contract Template Pack | $49 / $69 | 4.8★ · 195 rev · 1.1k sold · v3.2 | 22 files / 2.3 MB | Legal bank ✓ (plain-English, fill-in brackets, 2 layouts, jurisdiction notes); extras ✗ |

**B-2 Toolkits** (formats Web app·ZIP·Guide PDF)

| ID | Example | Price/compare | Proof | Bundle | Audit |
|----|---------|--------------|-------|--------|-------|
| TK-1 | SEO Toolkit | $34 / $49 | 4.6★ · 153 rev · 918 sold | 21 files / 5.2 MB | Keyword/meta/sitemap banks ✓ |
| TK-2 | Designer's Toolkit | $49 / $69 | 4.7★ · 27 rev · 172 sold · v1.0 | 20 files / 4.4 MB | Color/font/grid bank ✓ (token export, contrast pairings, grid sheet) |
| TK-3 | Developer's Toolkit | $34 / $49 | 4.5★ · 32 rev · 451 sold · v3.4 | 21 files / 3.9 MB | Snippet bank ✓ (×40 snippets, fixtures, cheat-sheet, changelog) |
| TK-4 | Content Writer's Toolkit | $34 / $49 | 4.5★ · 82 rev · 579 sold | 20 files / 5.1 MB | Headline/readability banks ✓ |

**B-3 Notion Systems** (formats Notion·PDF guide; sizes ~36 MB via mp4 walkthrough)

| ID | Example | Price/compare | Proof | Bundle | Audit |
|----|---------|--------------|-------|--------|-------|
| NS-1 | Project Management OS | $34 / $49 | 4.5★ · 91 rev · 578 sold · v3.1 | 22 files / 36.8 MB | Task/sprint/timeline banks ✓ |
| NS-2 | Sales CRM System | $79 / $99 | 4.6★ · 52 rev · 409 sold · v3.3 | 23 files / 36.6 MB | CRM/pipeline/meeting banks ✓ |
| NS-3 | Content Planning System | $79 / $99 | 4.7★ · 28 rev · 397 sold · v3.1 | 22 files / 37.2 MB | Calendar/editorial/idea banks ✓ |
| NS-4 | Personal Life OS | $79 / $99 | 4.6★ · 105 rev · 534 sold · v2.4 | 23 files / 36.3 MB | Habit/reading/budget banks ✓ |

**B-4 Assessment Tools** (formats HTML quiz·PDF report)

| ID | Example | Price/compare | Proof | Bundle | Audit |
|----|---------|--------------|-------|--------|-------|
| AS-1 | Skill Assessment Quiz | $64 / $89 | 4.6★ · 61 rev · 337 sold · v1.2 | 20 files / 2.3 MB | Question/quiz/score banks ✓ |
| AS-2 | Personality Assessment | $64 / $89 | 4.5★ · 191 rev · 514 sold · v1.1 | 21 files / 4.7 MB | Scenario/type/strength banks ✓ |
| AS-3 | Business Health Check | $19 / $29 | 4.5★ · 121 rev · 451 sold · v1.1 | 20 files / 2.3 MB | Question bank ✓ |
| AS-4 | Launch Readiness Quiz | $49 / $69 | 4.7★ · 47 rev · 438 sold · v3.2 | 20 files / 2.3 MB | Pre-launch checklist bank ✓ |

**C-pilot (vertical media): Website Kits** — Dental Practice Kit $244/$299 · 4.6★ · 269 rev · 768 sold · v3.4 · 25 files / 6 folders / 10 MB. Audit: **"01 5 pages" ✗ contains next-js-starter.sh + mdx-content-model.tsx + figma-source.fig (no pages!)** · "02 Appointment form" ✓ · **"03 Service pages" ✗** (blog-docs-layouts.pdf, dark-mode-tokens.json, vercel-one-click.sh) · **"04 Insurance info" ✗** (deploy-checklist, seo-pre-wired.tsx, image-pipeline.json).

### A5. Diagnosis — where the "simply prompting" feel comes from (evidence)

1. **Promise-inaccurate bundles.** Auto-appended extras and literal titles ("5 pages", "Quick-start guide") pull unrelated fallback sets. The folder name promises one thing; the files deliver another. This is the #1 credibility leak.
2. **Policies posing as deliverables.** "Lifetime free updates" is a policy chip rendered as a folder of fake files. Manifests mix deliverables with policies.
3. **Generic proof.** One 12-persona testimonial bank + formulaic ratings across all 96 examples → reads as generated.
4. **Static imagery only.** heroImage is a single Pexels photo. No motion anywhere in listings; motion lives only on home theater/miniatures.
5. **Flat 2-D everything.** No depth, no materiality, no tactile detail — cards are clean but weightless.
6. **Simulated downloads.** "Download" is a toast listing file names — nothing is actually delivered, so the end-product feel stops at the checkout button.

---

## PART B — THE UPGRADE: FOUR LAYERS

### L1 · PRESTIGE LAYER — "finished object" materiality
Applies a consistent luxury-grade finish system on top of the existing token base (no re-skin of families — each family keeps its identity, gains materiality):

- **Prestige tokens v2** (globals.css): obsidian/ivory surface plates, 1px hairlines + inner light edge, layered shadows (contact + ambient), foil/brass gradient accent (`--foil`), engraved label style (letterpress text-shadow), paper-grain noise (CSS, no asset), plate numbering style `No. 048`.
- **Listing plates**: each ProductListingCard becomes a "plate" — engraved 01–05 numbering, hairline frame, foil price, edition line ("Edition 2026 · No. 048 of 500"), seal badge when owned (wax-seal stamp animation on purchase).
- **Studio theater chrome**: curtain-lift open (600 ms, reduced-motion = fade), brass hairlines on chrome bar, ticket-style info bar, gallery-label typography for TemplateBrief.
- **Receipt-grade purchase**: confirmation becomes a designed receipt (dashed tear line, serial number, line items = bundle stats) instead of a bare toast.
- **Trust furniture**: guarantee/license/updates as engraved chips; changelog shown as "service record".

### L2 · REAL-MOTION LAYER — real-life GIFs / mini-videos (dental pilot)
A **MediaRegistry** replaces static photos with living imagery, per vertical & archetype:

- **Formats**: ① cinemagraph-style loops (0.5–2 MB WebM/AV1 + GIF fallback) ② 6–10 s silent mini-videos (MP4/WebM, muted, loop, playsInline, poster) ③ screen-capture demo loops for tools (6–8 s).
- **Placements**: MiniPreview thumbs (listing + rail), Family Theater panel backdrops (video behind the animated panel, 12% dark veil), studio hero band, family-grid cards.
- **Sourcing now (frontend-only)**: Pexels/Coverr free stock video per vertical + self-recorded screen captures. Later: backend media library (user uploads, per-product custom clips) — registry is data-driven so the source swaps without UI changes.
- **Dental pilot spec (WK-1)**: 4 loops — reception pan (soft light), chair-side reveal, consultation smile, exterior golden-hour. Gym/law/restaurant follow the same 4-shot pattern.
- **Performance rules**: lazy + IntersectionObserver (play only in viewport), max 1 playing video per section, ≤ 2 MB per loop, poster-first paint, `prefers-reduced-motion` → poster only. Videos are ambience — never autoplay audio, never gate content.

### L3 · 3D LAYER — depth without gimmick
Three depth tiers, adopted progressively:

- **T1 · CSS-3D (everywhere, zero deps)**: perspective tilt/parallax on listing thumbs and family cards (max 6°, 150 ms), 3-D flip for owned/seal state, fanned-deck hover for Template Packs, isometric stack for Notion cards.
- **T2 · R3F device stage (studio flagship)**: `@react-three/fiber` + drei, lazy-loaded module — the **live preview rendered as a canvas texture on a floating 3-D laptop + phone** you can drag-rotate; soft studio lighting, drift idle animation. Fallback: current 2-D viewport (also the reduced-motion path). This is the single biggest "way better" moment: your product demo ON hardware, in a gallery.
- **T3 · Hero objects (home only, sparingly)**: one abstract prestige object per family theater panel (glass prism = SaaS, layered ledgers = data, marble monolith = enterprise, paper stack = industry, precision cube = micro), 150–300 KB budget, dynamic import.
- **Guardrails**: 60 fps budget (dpr clamp, no per-frame setState), pointer-only rotation (no gyro), disable under reduced-motion/low-end (navigator.hardwareConcurrency < 4), never animate reading surfaces.

### L4 · TRUE-DEMO LAYER — playable products + REAL download kits
The end of "simulated": 

- **"Try it" studio tab** — per-archetype playable demos:
  - Assessment → **take the actual 3-question quiz**, real scoring, real result band + shareable result page (labeled sample).
  - Calculator/Toolkit → embedded working micro-tool (real formulas, real WCAG contrast math, real regex execution) in a sandbox panel.
  - Template Pack → Live Sample Reader: open 3 flagship templates (real copy), inline-edit, copy, print view.
  - Notion → clickable workspace walkthrough: 4 views over the same 12 sample rows, filters work.
  - Website Kit (dental) → auto-scroll fly-through of the 5 pages + real booking form trial.
- **KitCompiler (JSZip, client-side)**: purchase → Delivery Room (unboxing: folders assemble, wax seal) → **Download now produces a REAL ZIP with genuinely working artifacts**:
  - single-file HTML quiz that actually runs offline (vanilla JS, 25 authored questions);
  - single-file working calculators/tools;
  - MD templates with real written copy (12 flagship per product);
  - MDX pages with real dental copy; real README/CHANGELOG/LICENSE; real sample CSVs.
  - Files not yet authored are honestly labeled `EXTENDED-PACK/` stubs with a "in production" note — no fake content.
- This converts the demo checkout from a simulation into **real instant delivery** — frontend-only today, and it becomes the backend's contract tomorrow (`/api/download/:id` serves the same manifest).

---

## PART C — PER-BLOCK REDESIGN PROPOSALS (the correction sheet)

### B-1 Template Packs — concept: **"The Atelier"** (letterpress studio)
- Prestige: letterpress plates, paper grain, edition numbering, foil price, wax seal on owned.
- 3D: fanned 5-card deck on hover (CSS-3D); studio: deck shuffles → one card enlarges into the live template.
- Media: 6 s over-shoulder loop — cursor editing a template live (typing, toggling dark variant).
- Demo: Live Sample Reader (3 real templates, editable, copyable, printable).
- Corrected manifest (TP-1 Email): `01 Welcome series (4 emails · .md + .docx)` · `02 Cold outreach (3 openers + merge-field map)` · `03 Follow-up cadence (Day 3/7/14 + win-back)` · `04 Subject-line bank (120 · .csv)` · `05 Quick-start guide + 4-min setup video (.pdf + .mp4)` — **policies (free updates) move to chips, not folders**.
- Real files: 8 flagship emails fully written, 120-row subject CSV generated, real README.
- Same pattern for TP-2 (proposal: real scope blocks + 3-tier pricing table + e-sign fields), TP-3 (20 real slide layouts incl. 4 fully designed), TP-4 (2 full contracts + fill-in system + plain-English summary).

### B-2 Toolkits — concept: **"The Instrument"** (precision machined)
- Prestige: machined-metal headers, knurled dividers, spec plates (Range/Precision/Duty), calibration stamp when owned.
- 3D: exploded view on hover (layers separate, CSS); optional R3F floating instrument.
- Media: 6–8 s screen capture — SEO checker scanning a URL live, scores ticking up.
- Demo: embedded working micro-tool per kit (keyword scorer w/ real formula; contrast checker computing real WCAG ratios; regex tester executing real regex; headline analyzer with real scoring rules).
- Corrected manifest (TK-1 SEO): `01 Keyword checker (single-file HTML, runs offline)` · `02 Meta generator` · `03 Sitemap builder` · `04 Formula cheatsheet (.pdf)` · `05 Setup guide + docs`.
- Real files: 3 genuinely working single-file HTML tools + real install README.

### B-3 Notion Systems — concept: **"The Workspace"** (blueprint/archival)
- Prestige: grid-paper blueprint cover, stamped "DUPLICATE-READY", plan-drawing schema sheets.
- 3D: isometric layered stack (databases/views as layers, hover lifts one).
- Media: 8 s captured navigation loop (board → calendar → timeline → dashboard).
- Demo: clickable workspace walkthrough (4 views, same 12 rows, live filter).
- Corrected manifest (NS-1 Project OS): `01 Task database (25 sample rows · .csv)` · `02 Sprint board (view preset)` · `03 Timeline view (view preset)` · `04 Weekly review ritual (.md template)` · `05 Setup video (6-min .mp4) + duplicate link`.
- Real files: 3 CSVs with real authored sample data, real .md templates, real formula reference.

### B-4 Assessment Tools — concept: **"The Examination"** (exam-board)
- Prestige: certificate aesthetic, foil seal on result, score bands (Platinum/Gold/Silver/Bronze), stamped "VERIFIED SAMPLE RESULT".
- 3D: result medal 3-D flip (CSS) or score dial sweep (R3F option).
- Media: 6 s POV — question → answer → score sweep.
- Demo: **take the real 3-question quiz in the studio** → real score → result card.
- Corrected manifest (AS-1 Skill Quiz): `01 Question bank (25 scored · .csv + .json)` · `02 Scoring logic (thresholds · .md)` · `03 Result page template (.html)` · `04 Report layout (.pdf)` · `05 Retake + variant sets`.
- Real files: the HTML quiz genuinely runs offline (vanilla JS), 25 authored questions, real thresholds.

### C-pilot — Dental Practice Kit — concept: **"The Practice"** (editorial luxury)
- Media: the 4 real-life loops (reception/chair-side/consultation/exterior) — the exact "real-life GIF" pilot you asked for.
- Prestige: cream paper + engraved hairlines + appointment-card CTA metaphor (Cormorant already in family tokens).
- 3D: R3F device stage — the dental site running on a floating 3-D laptop, drag-rotate.
- Demo: 5-page fly-through + real booking form trial.
- Corrected manifest: `01 Five pages (home · hygiene · whitening · implants · contact — .mdx each)` · `02 Appointment request flow` · `03 Insurance & fees guide` · `04 Reviews + local-SEO pack (GMB checklist, schema)` · `05 Content model (.mdx)` · `06 Deploy guide`.
- Real files: 5 MDX pages with real dental copy, robots + sitemap, local-SEO checklist.

*(Gym / Law / Restaurant kits follow the identical 6-point pattern with their own 4-shot media sets.)*

---

## PART D — FULL INTEGRATION PLAN

### D1. New modules

| Module | Path | Role |
|--------|------|------|
| MediaRegistry + `<MotionMedia>` | `omniforge/media-registry.ts` | vertical/archetype → {poster, video, loop}; component handles IO-play, veiling, reduced-motion, sizes |
| DemoSurfaces | `omniforge/demo-surfaces/*.tsx` | QuizDemo · ToolDemo · TemplateReaderDemo · NotionTourDemo · SiteFlythrough + studio "Try it" tab |
| KitCompiler | `omniforge/kit-compiler.ts` (+ jszip) | manifest → real client-side ZIP; real-content flags; Delivery Room unboxing |
| Prestige tokens v2 | `globals.css` | plates, hairlines, foil, engrave, paper-grain, seal utilities |
| DeviceStage3D | `omniforge/device-stage-3d.tsx` (R3F, dynamic) | live preview as canvas texture on 3-D laptop/phone |
| product-catalog v2 | `product-catalog.ts` | hand-authored promise-accurate bundles for hero examples (banks stay as fallback); deliverables vs policies split; realContent flag per file |

### D2. Phases (each independently shippable)

- **P0 · Truth fix (small, high leverage)**: catalog v2 for the 24 hero examples (incl. all 20 B-tier) — promise-accurate trees, policies→chips, dedupe banks. Files: product-catalog.ts. Gate: every folder's files match its title; zero catch-all leaks ("Lifetime"→/time/ class of bug).
- **P1 · Prestige pass**: tokens v2 + listing plates + studio chrome + receipt purchase. Files: globals.css, family-view.tsx, listing-extras.tsx, PresentationStudio.tsx, purchase-flow.tsx. Gate: light+dark 9/10, no contrast regressions, reduced-motion safe.
- **P2 · Real motion**: MotionMedia + registry + dental pilot + theater video backdrops. Files: media-registry.ts (new), family-visuals.tsx, family-theater.tsx, MockupRenderer paths. Gate: ≤ 2 MB/loop, max 1 playing/section, poster-first, reduced-motion = poster.
- **P3 · Playable demos**: 5 DemoSurfaces + "Try it" tab. Files: demo-surfaces/ (new), PresentationStudio.tsx. Gate: quiz/tool genuinely compute; keyboard accessible; sandboxed.
- **P4 · 3D stage**: CSS-3D micro-tilts everywhere safe → R3F device stage in studio → home hero objects. Files: device-stage-3d.tsx (new), home-sections.tsx, family-view.tsx. Gate: 60 fps on mid hardware, lazy, full 2-D fallback.
- **P5 · Real delivery**: KitCompiler + Delivery Room + library view stub. Files: kit-compiler.ts (new), purchase-flow.tsx, PresentationStudio.tsx. Gate: purchased ZIP opens and runs (quiz/tool work offline); honest EXTENDED-PACK labeling.

### D3. Frontend-now vs backend-later contract (you build the backend later)

| Now (frontend) | Later (your backend) |
|----------------|----------------------|
| Deterministic demo prices & proof (labeled demo) | `/api/checkout` — real prices, tax, receipts |
| Session-persistent owned registry | `/api/library` — account-linked purchases |
| Client-side generated real ZIPs | `/api/download/:offerId` — serve authored bundles |
| MediaRegistry with stock/Coverr sources | media library API + per-product custom clips |
| KitCompiler realContent flags | CMS for template content, versions, licenses |

### D4. Guardrails (GUIDE-compliant)
Reduced-motion: full poster/2-D fallbacks everywhere (L2/L3/L4). No fake claims: real generated kits actually *improve* honesty — every real file is real, every stub is labeled. Performance: video ≤ 2 MB/loop, 3D lazy + dpr-clamped, 60 fps target. Accessibility: all new interactions keyboard-operable, contrast-checked plates, aria-labels on media.

---

## PART E — HOW TO SEND CORRECTIONS

Reply per ID, any format: `KEEP` · `CHANGE: …` · `DROP` · `ADD: …`
- Blocks: **B-1, B-2, B-3, B-4, C-WK** · Examples: **TP-1…4, TK-1…4, NS-1…4, AS-1…4, WK-1**
- Concepts to approve/redirect: Atelier · Instrument · Workspace · Examination · Practice
- Decision points:
  - **D1 Prestige palette**: (a) Obsidian + brass *(recommended)* · (b) Ivory + gold leaf · (c) Graphite + copper
  - **D2 3D depth**: (a) CSS-3D only · (b) + R3F device stage in studio *(recommended)* · (c) + home hero objects too
  - **D3 Media sourcing**: (a) free stock loops now, custom later *(recommended)* · (b) wait for custom-shot
  - **D4 Real-kit scope**: (a) 24 hero examples authored *(recommended)* · (b) all 96
  - **D5 Prices**: (a) keep visible demo prices *(recommended)* · (b) hide until backend
  - **D6 Build order**: P0→P5 as written *(recommended)*, or reprioritize
