# OMNIFORGE — Elite Upgrade Build Plan (v3)

Oct 26, 2026 · @MANVYDAS · Expands the v2 Master Plan into build-ready specs

## Executive summary

Ship truth first, then finish, then motion, then play, then depth, then real delivery: six phases, roughly 7–9 build weeks solo, each one shippable on its own. v2 said *what* to build; v3 adds the schemas, component APIs, file paths, shot lists, content quotas and pass/fail tests needed to start coding P0 tomorrow.

**Thesis.** OMNIFORGE feels "prompted" because the offer engine invents what a buyer would verify. Every upgrade below replaces an invented thing with a real one: real bundle contents, real material finish, real footage, real working demos, real downloadable files.

**What v3 adds over v2**

- A typed `OfferV2` and `BundleNode` schema with a hard split between deliverables, policies and proof.
- A root-cause fix for the keyword-bank leak (word-boundary matching plus a deny-list), with a unit test per folder.
- Exact prestige tokens (values, not adjectives) and a 7-part plate anatomy.
- A `MediaRegistry` schema, a `<MotionMedia>` prop contract, a 4-shot list per vertical and an ffmpeg encoding recipe.
- Five demo-surface specs with state machines and real formulas.
- A KitCompiler pipeline with a content-flag model (`real` / `sample` / `extended`) so no file ever lies.
- An authoring matrix that sizes the content work: about 290 real files for the 24 hero examples.
- Measurable gates per phase and a risk register.

**Recommended decisions (defaults used in this plan)**

| ID | Decision | Default | Why |
| --- | --- | --- | --- |
| D1 | Prestige palette | Obsidian + brass | Works in both themes; brass reads luxury without gold-leaf kitsch |
| D2 | 3D depth | CSS-3D + R3F device stage | One flagship 3D moment; home objects only if P4 budget holds |
| D3 | Media sourcing | Free stock loops now | Unblocks P2; registry swaps sources later with no UI change |
| D4 | Real-kit scope | 24 hero examples | \~290 files is achievable; 96 would be \~1,150 |
| D5 | Prices | Visible, labeled demo | Keeps the sales feel; honesty banner stays |
| D6 | Build order | P0 → P5 | P0 is the credibility leak; every later layer amplifies whatever P0 leaves |

## Target architecture

The upgrade adds four new engines and rebuilds one, all behind the existing surfaces; the backend later swaps the data layer without touching any UI.

&#91;embedded content: Target architecture · surfaces, engines, data, backend later\]

New paths: `omniforge/media-registry.ts`, `omniforge/motion-media.tsx`, `omniforge/demo-surfaces/`, `omniforge/device-stage-3d.tsx`, `omniforge/kit-compiler.ts`, `omniforge/catalog/hero/`, `omniforge/kit-content/`. Everything else is an edit to an existing file listed in v2 Part A1.

## Roadmap

Six phases in sequence, about 8 build weeks solo, with content authoring running alongside P1–P4. Each phase ships to production on its own once its gate passes.

&#91;embedded content: Roadmap · 6 phases, one gate each, authoring in parallel\]

P2 depends on P3 for archetype footage (screen captures of the demos); vertical footage for Website Kits can start in week 2. If time is short, drop T3 hero objects from P4 first, then defer the Gym/Law/Restaurant kits.

## P0 · Truth fix — promise-accurate bundles

Every folder must contain only files its title promises; policies leave the file tree entirely. Scope: `product-catalog.ts` plus a new `catalog/hero/` data folder. Effort: 4–5 days.

### Root cause (from the A4 audit)

1. **Substring matching.** Bank keys like `time` match inside "Life**time**", so "Lifetime free updates" pulls the dashboard/timeline bank.
2. **Policies modelled as deliverables.** Archetype extras ("Lifetime free updates", "Quick-start guide") are appended to the manifest and then expanded like products.
3. **Literal titles miss every bank.** "5 pages" or "Insurance info" match nothing, fall to the archetype fallback, and inherit generic dev files (`next-js-starter.sh`, `figma-source.fig`).

### Schema v2

```typescript
type ContentFlag = 'real' | 'sample' | 'extended';

interface BundleFile {
  path: string;            // '01-welcome-series/day-0-welcome.md'
  ext: string;
  bytes: number;           // measured for real files, ranged for extended
  flag: ContentFlag;       // real = authored, sample = trimmed real, extended = honest stub
  source?: string;         // key into kit-content/, required when flag !== 'extended'
}

interface BundleFolder {
  id: string;              // '01'
  title: string;           // must describe every child
  promise: string;         // the manifest line it fulfils
  files: BundleFile[];
}

interface OfferV2 {
  offerId: string;         // 'B-TP-1'
  price: { amount: number | null; compareAt: number | null; period?: 'mo' };
  deliverables: BundleFolder[];   // only things you receive
  root: BundleFile[];             // README, LICENSE, CHANGELOG
  policies: Policy[];             // 'updates' | 'guarantee-30d' | 'license-commercial' -> chips
  formats: string[];
  proof: ProofV2;                 // see below
  authored: boolean;              // true = hand-authored hero, false = bank fallback
}
```

### Engine changes

- **Hero first, banks second.** `deriveOffer()` looks up `catalog/hero/<offerId>.ts`; only non-hero examples (72 of 96) use banks.
- **Word-boundary matching.** Replace `text.includes(key)` with `/\b(key)s?\b/i`, and add a deny-list (`lifetime`, `free`, `updates`, `guarantee`, `support`) that never routes to a file bank.
- **Policy extraction.** Any manifest line matching the policy dictionary becomes a `Policy` chip, never a folder.
- **Quick-start becomes real.** It moves into `root/` as `QUICK-START.md` (real, written per archetype), not a folder of borrowed files.
- **Dedupe.** A file path may appear once per bundle; later collisions are dropped, not renamed.
- **Proof v2.** Ratings stay deterministic but each of the 5 archetypes gets its own 8-persona testimonial bank written in that buyer's vocabulary (40 total, up from 12), and every proof block shows a small `Demo data` tag until the backend exists.

### Tests (Vitest, `product-catalog.test.ts`)

- For all 96 examples: no folder title contains a policy word; no file path repeats.
- For all 24 heroes: every file has `flag` and every non-extended file has a `source` that resolves.
- Snapshot of TP-1 and WK-1 trees, reviewed by hand once, then locked.
- Regression: "Lifetime free updates" produces zero files.

**Gate:** 0 leaks across 96 examples, 24/24 heroes authored, snapshots approved.

## P1 · Prestige layer — finished-object materiality

One finish system sits on top of the five family token sets; families keep their fonts and radii and gain the same material vocabulary. Files: `globals.css`, `family-view.tsx`, `listing-extras.tsx`, `PresentationStudio.tsx`, `purchase-flow.tsx`. Effort: 6–7 days.

### Token spec (D1 = obsidian + brass)

```css
:root {
  --plate-bg: #F7F4EE;            --plate-bg-dark: #0E0E10;
  --plate-edge: rgba(20,18,14,.10); --plate-edge-dark: rgba(255,240,210,.08);
  --plate-inner-light: inset 0 1px 0 rgba(255,255,255,.65);
  --shadow-contact: 0 1px 2px rgba(10,8,4,.10);
  --shadow-ambient: 0 18px 40px -18px rgba(10,8,4,.28);
  --foil: linear-gradient(135deg,#8A6A2F 0%,#E7C982 38%,#B8913F 62%,#F3DFA6 100%);
  --brass-line: #B8913F;
  --engrave: 0 1px 0 rgba(255,255,255,.55), 0 -1px 0 rgba(0,0,0,.18);
  --grain: url("data:image/svg+xml;utf8,<svg ...feTurbulence baseFrequency='.9'...>"); /* opacity .035 */
  --ease-prestige: cubic-bezier(.2,.7,.1,1);
}
```

Rules: foil only on price, seal and plate number (never body text); brass hairlines at 1px; grain at ≤ 4% opacity; every foil element has a solid-colour fallback that passes WCAG AA at 4.5:1.

### Plate anatomy (ProductListingCard v2)

1. **Plate number** — engraved `No. 048`, tabular figures, top-left.
2. **Media window** — MiniPreview becomes a `<MotionMedia>` slot (P2) with a 1px brass inset frame.
3. **Title block** — name + one-line promise; family chip moves into the frame corner.
4. **Proof line** — rating, sold count, version, with the `Demo data` tag from P0.
5. **Contents drawer** — ManifestExplorer, collapsed to 3 folder rows with "+N more".
6. **Policy chips** — engraved pills: Updates · 30-day guarantee · Commercial license.
7. **Ledger foot** — foil price, struck compare-at, edition line (`Edition 2026 · No. 048 of 500`), primary action.

The testimonial moves out of the card into the studio; cards currently carry 11 elements and should carry 7.

### Motion choreography

| Moment | Duration | Easing | Reduced motion |
| --- | --- | --- | --- |
| Plate hover lift | 180 ms, translateY −2px + ambient shadow ×1.3 | ease-prestige | shadow only |
| Studio open (curtain lift) | 600 ms, clip-path inset 100%→0 + 8px rise | ease-prestige | 150 ms fade |
| Purchase → wax seal | 420 ms scale 1.4→1 + 6° rotate settle, then 200 ms sheen | spring (stiffness 320, damping 22) | seal appears static |
| Receipt reveal | 360 ms, tear line draws left→right | linear | instant |

### Receipt-grade purchase

The toast is replaced by a receipt panel: serial (`OF-2026-B-TP1-000482`), timestamp, line items equal to bundle stats (folders, files, size), policies as engraved lines, a dashed tear line, and the primary action `Open Delivery Room` (P5). Until P5 ships, the action reads `View contents`.

**Gate:** both themes reviewed against 3 reference sites, zero AA regressions (axe run), Lighthouse performance unchanged ±3.

## P2 · Real motion — living imagery

One registry maps every vertical and archetype to a poster plus up to two loops; one component plays them safely. Files: `media-registry.ts` (new), `motion-media.tsx` (new), `family-visuals.tsx`, `family-theater.tsx`, MockupRenderer. Effort: 5 days build + 2 days sourcing and encoding.

### Registry schema

```typescript
interface MediaAsset {
  id: string;                    // 'dental.reception'
  poster: string;                // AVIF, 1280w, <= 90 KB
  sources: { src: string; type: 'video/webm; codecs=av01' | 'video/mp4' }[];
  durationS: number;             // 6-10
  focal: [number, number];       // object-position for crops, e.g. [0.5, 0.4]
  veil?: number;                 // 0-0.4 dark overlay for text legibility
  credit: { author: string; source: 'pexels' | 'coverr' | 'own'; url: string };
  kind: 'cinemagraph' | 'mini' | 'screen';
}

type MediaKey = `${Vertical | Archetype}.${'hero' | 'thumb' | 'theater'}`;
export const MEDIA: Partial<Record<MediaKey, MediaAsset[]>>;
```

Credits render in the studio footer, which also keeps you compliant with stock licences that request attribution.

### `<MotionMedia>` contract

```tsx
<MotionMedia asset="dental.reception" slot="thumb" priority={false} />
```

- Renders the poster `<img>` first; mounts `<video muted loop playsInline preload="none">` only when 25% visible (IntersectionObserver).
- A shared `PlaybackBudget` context allows 1 playing video per section and 3 per viewport; others pause on their current frame.
- `prefers-reduced-motion`, `navigator.connection.saveData` or `hardwareConcurrency < 4` → poster only.
- Pauses on `visibilitychange` and when the studio modal covers it.

### Shot lists (4 shots × 6–8 s each)

| Vertical / archetype | Shot 1 | Shot 2 | Shot 3 | Shot 4 |
| --- | --- | --- | --- | --- |
| Dental (WK-1) | Reception pan, soft window light | Chair-side light swing | Consultation smile, shallow focus | Exterior at golden hour |
| Gym | Chalk hands on a bar | Rower in slow motion | Class wide shot | Front desk check-in |
| Law | Pen on contract, macro | Library shelf rack focus | Handshake across desk | Office window at dusk |
| Restaurant | Pan sizzle, top-down | Plating with tweezers | Pour into glass | Room at evening service |
| Template Pack | Cursor editing a template | Dark-variant toggle | Export to PDF | — |
| Toolkit | URL typed, score ticks up | Contrast pair turns pass | Regex highlights matches | — |
| Notion System | Board → calendar → timeline → dashboard (one 8 s loop) | — | — | — |
| Assessment | Question → answer → score dial sweep (one 6 s loop) | — | — | — |

Vertical footage comes from Pexels/Coverr; archetype loops are screen captures of the P3 demos, so they show the real product.

### Encoding recipe

```bash
# 8 s, 1280w, no audio, AV1 primary (~0.8-1.4 MB)
ffmpeg -i in.mov -t 8 -an -vf "scale=1280:-2,fps=24" -c:v libaom-av1 -crf 38 -b:v 0 -cpu-used 6 out.webm
# MP4 fallback for Safari < 17 (~1.5-2 MB)
ffmpeg -i in.mov -t 8 -an -vf "scale=1280:-2,fps=24" -c:v libx264 -preset veryfast -crf 28 -movflags +faststart out.mp4
# poster from frame 1
ffmpeg -i out.mp4 -frames:v 1 -vf scale=1280:-2 poster.png && npx @squoosh/cli --avif '{}' poster.png
```

Thumbs get a 640w variant. Loops are trimmed so the last frame matches the first (cross-fade 12 frames if needed).

**Gate:** every loop ≤ 2 MB, poster LCP ≤ 2.5 s on throttled 4G, max 1 playing per section verified, reduced-motion shows zero video requests in the network log.

## P3 · Playable demos — the "Try it" tab

The studio gains a fourth tab, **Try it**, placed first for archetypes that have a demo; every demo computes something real and can be completed in under 60 seconds. Files: `demo-surfaces/*.tsx` (new), `PresentationStudio.tsx`. Effort: 8–9 days.

### Shared contract

```typescript
interface DemoSurfaceProps {
  offer: OfferV2;
  content: DemoContent;           // loaded from kit-content/<offerId>/demo.json
  onComplete?: (result: unknown) => void;  // fires 'demo_completed' analytics + CTA nudge
}
```

Every surface: keyboard-complete, focus trapped inside the tab, a `Sample` ribbon, a reset button, and an end card with "Get the full kit" (price + buy). Demos never call a network.

### Per-archetype specs

| Demo | What the buyer does | What is real | State machine |
| --- | --- | --- | --- |
| **QuizDemo** (Assessment) | Answers 3 of the 25 authored questions | Weighted scoring, 4 bands (Platinum ≥ 85, Gold 70–84, Silver 50–69, Bronze < 50), result card with sealed medal | intro → q1 → q2 → q3 → scoring (600 ms) → result |
| **ToolDemo** (Toolkit) | Uses one working instrument | SEO: title/meta length + keyword-density scorer · Design: WCAG 2.2 contrast ratio from relative luminance · Dev: live regex with match highlighting · Writer: headline score (length, power words, numbers, sentiment) | idle → input → computed (live, debounced 120 ms) |
| **TemplateReaderDemo** (Template Pack) | Opens 3 flagship templates, edits a merge field, copies or prints | Full real copy, `{{first_name}}` fields filled live, print stylesheet | list → reading → editing → copied |
| **NotionTourDemo** (Notion System) | Switches 4 views over 12 sample rows and filters | Board, table, calendar, timeline all derived from one row array; filter by owner/status works across views | board ⇄ table ⇄ calendar ⇄ timeline |
| **SiteFlythrough** (Website Kit) | Watches a 5-page auto-scroll, then submits the booking form | Real dental copy, form validation, a confirmation state (no send) | tour (auto, 25 s, pausable) → form → confirmed |

### Formula references (so the demos can be audited)

```latex
\text{contrast} = \frac{L_1 + 0.05}{L_2 + 0.05}, \quad L = 0.2126R + 0.7152G + 0.0722B \; (\text{linearised sRGB})
```

Quiz score = sum of chosen option weights ÷ maximum possible × 100, rounded; bands as in the table. Headline score = 40 length + 25 power words + 20 number present + 15 sentiment, each capped.

### Loops feed P2

Once each demo works, record a 6–8 s screen capture of it; those captures become the archetype loops in the P2 registry. One build produces both the demo and its marketing footage.

**Gate:** every demo completed by keyboard only; calculations match a hand-checked fixture (10 cases per tool); no network requests during a demo; Try-it tab adds ≤ 35 KB gzipped per surface (lazy-loaded).

## P4 · 3D — depth without gimmick

CSS-3D everywhere costs nothing and ships first; the R3F device stage is the single flagship 3D moment; home hero objects ship only if the stage holds 60 fps. Files: `device-stage-3d.tsx` (new), `tilt.ts` (new hook), `home-sections.tsx`, `family-view.tsx`. Effort: 3 days CSS-3D + 5 days R3F + 3 days hero objects (optional).

### T1 · CSS-3D recipes (per family)

| Family | Hover recipe | Values |
| --- | --- | --- |
| Template Packs | Fanned deck: 5 ghost cards rotate out behind the thumb | rotateZ −8°, −4°, 0, 4°, 8°; translateY 0→−6px; 220 ms |
| Toolkits | Exploded view: 3 layers separate along Z | translateZ 0/18/36px inside `perspective: 900px`; 240 ms |
| Notion Systems | Isometric stack, hovered layer lifts | rotateX 55° rotateZ −45°; lift 12px |
| Assessments | Medal flip on owned | rotateY 0→180°, backface hidden; 500 ms |
| Website Kits | Pointer parallax tilt | max 6°, `useTilt` with rAF, reset 150 ms on leave |

`useTilt` writes CSS variables via a ref (no React state per frame) and is disabled on touch and reduced motion.

### T2 · R3F device stage (studio flagship)

- **Stack:** `@react-three/fiber` + `@react-three/drei`, dynamic import with `ssr: false`, loaded only when the Live Preview tab opens on desktop.
- **Scene:** low-poly laptop (≤ 6k tris, GLB ≤ 180 KB with Draco) and phone (≤ 3k tris); `Environment preset="studio"`; contact shadows; 1 key + 1 rim light.
- **Screen texture:** the live preview renders into an offscreen DOM node; `html-to-image` snapshots it to a canvas at 1280×800 on mount and on device-tab change, then `CanvasTexture.needsUpdate`. Live scrolling uses drei `<Html transform occlude>` on the laptop screen instead, which keeps the preview interactive — prototype both on day 1 and keep the one that holds 60 fps.
- **Controls:** drag-rotate limited to ±25° yaw, ±10° pitch, damping 0.08; idle drift of ±3° over 8 s; double-click resets.
- **Fallback:** current 2-D viewport for mobile, reduced motion, `hardwareConcurrency < 4`, WebGL missing, or a frame-time monitor reporting more than 20 ms average for 2 s.

### T3 · Hero objects (home, optional)

One abstract object per theater panel: glass prism (SaaS), layered ledgers (data), marble monolith (enterprise), paper stack (industry), precision cube (micro). Budget: 150–300 KB each, one canvas shared across panels with objects swapped, never 5 canvases.

### Performance rules

`dpr={[1, 1.75]}`, `frameloop="demand"` when idle, no per-frame `setState`, textures ≤ 2048², dispose on unmount, and the 3D chunk never blocks first paint.

**Gate:** 60 fps on a 2020 MacBook Air and a mid Windows laptop (Chrome performance panel, 10 s drag), studio Time-to-Interactive regresses ≤ 300 ms, full 2-D fallback verified in each listed condition.

## P5 · Real delivery — KitCompiler and Delivery Room

After purchase, the browser assembles and downloads a real ZIP whose files are either genuinely authored or openly labeled as coming soon. Files: `kit-compiler.ts` (new), `kit-content/` (new data folder), `purchase-flow.tsx`, `PresentationStudio.tsx`. Effort: 4 days build (content authoring is tracked separately below).

&#91;embedded content: KitCompiler pipeline · 6 steps, backend takes over step 5 later\]

The manifest that drives the ZIP is the same `OfferV2` from P0, so the backend later only replaces step 5 with a server download.

### KitCompiler API

```typescript
export async function compileKit(offer: OfferV2, opts?: { onProgress?: (p: number, file: string) => void }): Promise<Blob>;
// 1. walk offer.root + offer.deliverables
// 2. flag 'real' | 'sample' -> dynamic import(`../kit-content/${offerId}/${source}`) (code-split per offer)
// 3. flag 'extended' -> EXTENDED-PACK/<path>.md with: what it will contain, status 'in production', no filler
// 4. JSZip.generateAsync({ type: 'blob', compression: 'DEFLATE', streamFiles: true }, onUpdate)
// 5. filename: omniforge-<offerId>-v<version>.zip
```

Binary deliverables that cannot be authored in-browser (`.docx`, `.pdf`) are generated client-side: DOCX via the `docx` package from the same Markdown source, PDF via `pdf-lib` for guides. Videos are never bundled; the README links to the hosted walkthrough.

### Delivery Room (unboxing)

1. Receipt card slides up (P1).
2. Folders assemble one by one as `onProgress` fires (real progress, not a timer).
3. Wax seal stamps when the Blob is ready.
4. `Download ZIP` button plus a file list where each `real` file can be previewed inline.
5. A `Library` stub lists owned kits for the session (sessionStorage, try/catch wrapped).

### Honesty rules

- The ZIP root `README.md` lists every file with its flag in a table.
- The studio's What's Included tab shows the same flags as small badges.
- An offer with less than 60% real files by count cannot show the word "Complete" anywhere.

**Gate:** for 5 sampled heroes (one per archetype), the ZIP opens on Windows and macOS, the HTML quiz and tools run offline by double-click, DOCX opens in Word and Google Docs, and the README flag table matches the archive exactly.

## Content authoring — the 24 hero kits

About 288 real files across 24 kits, roughly 10–12 working days of drafting and editing; this is the largest single workload in the plan and runs in parallel with P1–P4. The 24 heroes are the 20 B-tier examples plus four Website Kits (Dental, Gym, Law, Restaurant).

| Block | Kits | Real files / kit | Total | What "real" means here | Est. days |
| --- | --- | --- | --- | --- | --- |
| B-1 Template Packs | TP-1…4 | 16 | 64 | 8–12 fully written templates (.md source → .docx generated), 1 data file (subject lines, pricing table, slide outline), root 4 | 3 |
| B-2 Toolkits | TK-1…4 | 12 | 48 | 3 working single-file HTML tools, formula cheatsheet, setup guide, root 4 | 2.5 |
| B-3 Notion Systems | NS-1…4 | 12 | 48 | 3 CSVs with 25 authored rows each, 3 .md rituals/templates, formula reference, duplicate-link note, root 4 | 2 |
| B-4 Assessments | AS-1…4 | 12 | 48 | Offline HTML quiz, 25 questions (.json + .csv), scoring .md, result-page .html, report layout, root 4 | 2 |
| C Website Kits | WK-1…4 | 20 | 80 | 5 MDX pages of real copy, booking or contact flow, local-SEO checklist, JSON-LD schema, robots + sitemap, content model, deploy guide, root 4 | 3 |
| **Total** | **24** | — | **288** |  | **12.5** |

Root 4 = README (with flag table), LICENSE, CHANGELOG, QUICK-START, written once per archetype and specialised per kit.

### Reference kit — TP-1 Email Template Pack (the pattern every kit copies)

```
omniforge-B-TP-1-v2.3/
  README.md · LICENSE.md · CHANGELOG.md · QUICK-START.md          real
  01-welcome-series/  day-0-welcome · day-2-value · day-4-story · day-6-offer   (.md + .docx)  real
  02-cold-outreach/   opener-problem · opener-referral · opener-trigger · merge-field-map.csv  real
  03-follow-up/       day-3 · day-7 · day-14 · win-back                          (.md + .docx)  real
  04-subject-lines/   subject-line-bank.csv  (120 rows, tagged by intent)          real
  05-setup/           setup-guide.pdf  real · walkthrough-link.md  real (video hosted, not bundled)
  EXTENDED-PACK/      dark-mode-html-variants.md   extended ("in production")
```

### Authoring workflow

1. Write a one-page brief per kit: buyer, job-to-be-done, voice, 3 must-have outcomes.
2. Draft with Claude from the brief; one file per prompt, never a whole kit at once.
3. Edit pass by hand: remove filler, check every merge field and formula, read aloud one email per pack.
4. Run the P0 test suite and the P5 flag-table check; commit to `kit-content/<offerId>/`.
5. Record the P2 loop for that archetype once its first kit is done.

Order: one full kit per block first (TP-1, TK-1, NS-1, AS-1, WK-1) so every pipeline is proven end to end, then the remaining 19.

## QA gates, risks and open decisions

A phase is done only when its gate passes; no phase starts its successor's visual work before then.

### Release checklist (run at every phase end)

- [ ] `vitest` green, including the P0 leak suite across all 96 examples
- [ ] axe: zero serious or critical issues on Home, Family view, Studio (both themes)
- [ ] Keyboard-only run: open a family, expand a block, open the studio, complete a demo, buy, download
- [ ] Reduced motion on: no video requests, no 3D canvas, all content reachable
- [ ] Lighthouse mobile: performance ≥ 85, LCP ≤ 2.5 s, CLS ≤ 0.05
- [ ] Bundle: initial JS grows ≤ 25 KB gzipped per phase; R3F, JSZip and demos are lazy chunks
- [ ] Honesty scan: every proof block shows `Demo data`, every ZIP README flag table matches its archive
- [ ] Visual review: 5 plates and the studio screenshotted in light and dark, compared with the previous phase

### Risk register

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Content authoring overruns (288 files) | High | Delays P5 value | Ship P5 with the 5 reference kits first; others flagged `extended` until done |
| R3F stage misses 60 fps with a live DOM screen | Medium | Flagship moment feels cheap | Day-1 spike of both texture strategies; fall back to static snapshot texture |
| Stock footage looks generic | Medium | Prestige undermined | Strict shot list, colour-grade all loops with one LUT, reject anything with faces looking at camera |
| Prestige finish fights family identity | Medium | Families blur together | Foil only on 3 elements; family fonts and radii untouched; side-by-side review per family |
| Fake proof read as deceptive | Medium | Trust and legal exposure | `Demo data` tag stays until the backend supplies real numbers; never show sold counts on real checkout |
| Bundle bloat from DOCX/PDF libraries | Low | Slower studio | Load `docx` and `pdf-lib` only inside the Delivery Room chunk |
| Stock licence attribution missed | Low | Licence breach | `credit` is a required field in the registry type; build fails without it |

### Decisions still open for you

1. **Edition numbering** — is "No. 048 of 500" a real cap you will honour once the backend exists? If not, use "Edition 2026" only.
2. **Testimonials** — keep authored demo testimonials with a tag, or hide them until real ones arrive?
3. **Website Kit 2–4 verticals** — confirm Gym, Law, Restaurant, or swap one for a vertical you already sell to.
4. **Hero objects (T3)** — build in P4, or defer until after launch?
5. **Analytics** — which events matter at launch (suggested: `studio_open`, `demo_completed`, `purchase`, `zip_downloaded`)?

Reply per ID as in v2 (KEEP · CHANGE · DROP · ADD), or comment directly on any line of this doc.
