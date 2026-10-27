# Template OS — Unified Refactor & Implementation Guide

**Repository:** genetac/yoy  
**Execution branch:** refactor/template-os-foundation  
**Purpose:** An agent-ready implementation specification for turning the existing showcase and design-genome into a single Template Operating System. This is a plan and acceptance contract, not a claim that the implementation is already complete.

## 0. Mission and definition of done

Build one data-driven system that composes **Brand + Content + Commerce + Product Requirements + Family Grammar + Tier Entitlements + Theme Kit + Presentation Layers** into validated, distinct website, app, catalogue and product-demo experiences.

Do not interpret “unified” as one giant renderer, one universal layout, or a large set of CSS overrides. Unity means one source of truth for selection, one resolver, one page blueprint, one module registry, one content/provenance model and a small set of clearly separated rendering responsibilities.

A combination such as Consumer Goods + skincare + Growth + proof-led + Botanical House + seasonal editorial + ambient media must differ structurally, semantically and behaviorally from Micro Product + direct response + Starter + Signal Lime. A name, chip, token or headline change alone is not a complete implementation.

### Non-negotiable acceptance criteria

1. Six structurally distinct design families. Each controls section order, information architecture, navigation, density, typography roles, image/media use, module presentation and CTA hierarchy.
2. Four tiers control actual scope, module limits, integration allowance, workflow depth, analytics, permissions and support—not merely animation.
3. Narrative selection changes copy structure, length, vocabulary, section logic, proof positioning and CTA strategy without mutating verified product, legal, price or shipping facts.
4. Each theme kit is a complete semantic token pack with light and dark modes, not one accent color.
5. Campaign/advertising presentation is a distinct page-level promotional layer. It changes campaign hierarchy, campaign modules and CTA route but does not insert third-party ad-network code or invent discounts, urgency, ratings or results.
6. Prestige, real-motion, 3D depth and true-demo are separable presentation layers with tier-aware availability, explicit fallbacks and reduced-motion behavior.
7. Consumer Goods includes separate retail and wholesale journeys and all six mandatory modules: product listing, product detail, cart, checkout, wholesale quote and tracking.
8. Illustrative content is clearly labeled. No fictional KPI, testimonial, stock count, delivery promise, customer logo, rating or conversion claim can silently become production truth.
9. Existing routes, example slugs, the full example catalogue and working preview/kit flows remain functional unless a deliberate migration documents a change.
10. Mobile-first behavior, WCAG 2.2 AA as the target, consistent product/price/shipping state, empty/loading/error/out-of-stock/failed-payment states, keyboard operation and visual regression are baseline requirements.
11. The application builds and relevant unit, E2E, accessibility and visual checks have been run. A plan, typecheck or screenshot by itself does not prove completion.

## 1. Repository audit: current assets and their intended role

The primary app is a Next.js App Router + React + TypeScript project. The root package manifest declares Next.js 16, React 19, Tailwind CSS 4 and pnpm as package manager. Verify exact versions and scripts on the checked-out branch before changing dependencies.

| Existing source | Current role / evidence | Target action |
|---|---|---|
| app/page.tsx | Main catalogue/showcase; large client component; owns browsing, family metadata and view selection | Keep public browsing and data compatibility. Extract focused components gradually; do not replace wholesale without parity tests. |
| app/globals.css and app/layout.tsx | Global styling, metadata, font loading and pre-paint bootstraps | Audit legacy CSS and multiple token sources. Keep one intentional global foundation. Correct product metadata; delete styles only after checking usages. |
| lib/style-registry.ts | Six engines: Obsidian, Nocturne, Mid-to-High Dining, Agency OS, Template OS and Studio OS. Comment describes them as different tokens under one shared structure. | Retain signature ideas as preset aliases or recipes. Prevent this registry from remaining a second layout/theme authority. |
| lib/genome/store.ts | Persisted genome choices under a localStorage key, text overrides and inspection flag | Add a one-time compatibility adapter to the canonical Template OS state; avoid two stores governing the same UI. |
| lib/genome/switches.ts | Seven switches and token/palette/material choices; resolver currently resolves a world and hero arrangement | Reuse valuable vocabulary and tokens. Move independent axes to typed canonical fields and deterministic resolution. |
| lib/genome/layout.ts | Hero arrangement mapping and per-layer explanatory copy; some per-flagship composition responses | Retain useful descriptions, but add full-page family composition, module capabilities and conformance tests. A hero change is not a whole-page change. |
| lib/genome/catalog.ts | Eight flagships plus deterministic per-example DNA: Orbit, Quartermaster, Maison Vey, Snapcart, Telemetry, Pocket, Terroir and Atlas | Preserve them as archetype/creative starting blueprints. Do not let product type permanently dictate visual family. |
| lib/genome/copy.ts | Archetype-specific CTA/nav/copy composition, siblings and content assembled for previews | Move toward typed content facts plus narrative profiles and provenance; preserve verified information. |
| lib/site-preview.ts | Stable 96-example registry, slugs and preview blueprint helpers | Retain slug generation and public example compatibility. Add normalized configuration and page blueprint derivation. |
| components/site/SiteTemplate.tsx | Resolves the world and dispatches to eight site templates | Refactor to resolver → validator → content compiler → semantic page blueprint → family renderer/module adapters. |
| components/site/SiteFrame.tsx | Scales the same site source for card/full preview | Keep the same-source preview principle. Test measured height, resize and interactions across families. |
| components/site/templates/*.tsx | Eight flagship site implementations and their working/presentation patterns | Extract domain behavior and valuable signatures into modules, then support the renderer contract. Do not blindly rewrite or discard these files. |
| components/genome/GenomeConsole.tsx | Existing UI for seven layers, presets, copy edits and “what changes” explanations | Evolve into, or wrap with, the canonical configurator. Keep clear effects explanations; derive them from actual output behavior. |
| components/home/FamilyGrammar.tsx and data/designFamilies.ts | Family metadata and content for the showcase | Migrate to the canonical family registry; retain a compatibility facade while imports are moved. |
| upload/dashboard-project/components/renderers/ | Five reference renderers: Micro, Industry/Warm, Data/Dense, SaaS/Product and Enterprise/Platform | Use as source material for genuinely different grammars. Audit and port useful concepts; do not run this nested app as a second canonical product. |
| upload/dashboard-project/data/ | Reference product examples, family tokens and business-type data | Compare field-by-field with root data. Reuse proven examples and facts, not duplicate registries. |
| upload/dashboard-project/GUIDE.txt | Detailed product design and motion implementation plan | Use its project audit and quality requirements as input to this guide. This document is the consolidated execution contract. |
| upload/OMNIFORGE — Elite Upgrade Build Plan (v3).md | P0 truth, P1 materiality, P2 media, P3 demos, P4 depth, P5 delivery ideas | Align and reuse these phases where appropriate; the present guide adds orthogonal family/content/tier composition. |
| upload/DESIGN MAP.7z | Archive of design references | Extract it in an agent workspace if the archive bytes are available. Build a file inventory and provenance note. The GitHub browsing connector cannot inspect this archive’s binary contents as ordinary text. |
| upload/Pasted Content_*.txt, upload/dashboard-design-improvements.zip, upload/dashboard-project/reference-project.zip | Other reference/source material | Compare against canonical files, deduplicate, and mark stale/superseded references. Do not merge blindly. |
| src/components/omniforge/catalog/schema.ts and product-catalog.ts | Offer/deliverable truth model | Preserve the separation of deliverables, policies and proof, plus real/sample/extended content flags. Do not allow the template configurator to promise nonexistent files or integrations. |
| src/components/omniforge/kit-compiler.ts and kit-content/ | Client-side bundle compilation and authored content | Preserve and test actual artifact creation. Manifests and delivered files must agree. |
| package.json and root lockfiles | Build tooling; multiple lockfiles exist | Use the declared package manager and avoid switching managers or regenerating all lockfiles as part of design work. Add tests intentionally. |

### Root cause of the sameness

The current style registry applies tokens and signatures over a shared structure. Genome has stronger structural intent, but it resolves only part of the full experience: palette/type/material and a hero arrangement do not independently determine content narrative, page structure, required workflows, tier entitlements, commerce journeys or campaign treatment.

The nested dashboard project has family-specific renderers, while the root app separately has eight flagship renderers and genome controls. Without a common contract, one view can offer a selection that another rendering path ignores. The root app must have one canonical source of truth, with uploaded projects used as reference inputs rather than parallel runtime systems.

### Safety rules for the repository

- Work on the refactor branch. Do not edit main directly or force-push.
- Before deleting/moving a file, search all imports, routes, tests and build scripts; record the migration choice.
- Do not merge nested reference project package settings or app entry points into the root application.
- Never copy tracked secrets into documentation, tests, fixtures, demos or commits. Audit environment files carefully.
- If the archive is unavailable to the agent, state that it was not inspected and continue with accessible source. Never claim to have reviewed the contents of a binary archive without extracting it.
- Preserve existing public slugs, current product/offer identifiers and the kit compiler truth contract unless an intentional, tested migration is approved.
- Keep the app runnable throughout; a risky all-at-once rewrite is explicitly out of scope.

## 2. The selection model: genuinely independent dimensions

Never conflate what a product does, whom it serves, how it communicates, what is included and what its visual finish is.

### A. Product archetype — what must work

Examples: marketing site, booking/reservation flow, retail store, wholesale portal, analytics dashboard, SaaS, CRM, calculator, client portal, inventory tool, enterprise workspace.

Archetype determines domain data, entities, routes, required interactions, form schemas, state machines, integration points and mandatory modules.

### B. Vertical — whose world this is

Examples: hospitality, restaurant, professional services, healthcare, education, ecommerce, consumer goods, B2B SaaS, finance, nonprofit, creator business.

Vertical determines domain vocabulary, factual requirements, local/SEO needs, privacy prompts, evidence/trust expectations and useful module defaults. It must not be treated as a palette.

### C. Design family — how the interface communicates

1. **Micro Products:** bold oversized typography, short sections, one concrete promise, benefits first, compact proof/offer and decisive CTA.
2. **Industry & Hospitality:** editorial grid, expressive serif support, image-led pacing, service/people/place details, hours/location/access and booking/inquiry where needed.
3. **Data Dashboards:** dense but legible panels, mono labels, tabular numerals, data tables, filters, time windows, units, status semantics and alerts.
4. **SaaS Products:** product UI as evidence, workflow-first content, capability progression, integrations, pricing and trial/demo path.
5. **Enterprise Platforms:** workspace information architecture, structured navigation, roles/permissions, auditability, security/integration evidence, operational KPIs and governed inquiry flow.
6. **Consumer Goods Catalog:** product-first photography, category discovery, variants, concise benefits, price/stock/delivery/returns/material/review/payment/tracking trust, and separate retail and wholesale routes.

A family must affect section order, layout, navigation, typography roles, density, media placement, module composition, footer and CTA hierarchy. Changing only color and headline is a failed implementation.

### D. Narrative / copy strategy — how the offer is explained

- **Direct response:** concise, benefit-first, one dominant action.
- **Editorial story:** context, craft, people, place and descriptive pacing.
- **Technical briefing:** precise terms, specifications, states, constraints and operations.
- **Proof-led:** verifiable evidence, working product demo, concrete deliverables and examples before broad claims.
- **Campaign narrative:** launch/announcement message, central idea, offer context and campaign-specific action.
- **Trade:** buyer terms, quantity breaks, fulfilment, delivery constraints, quote and account flow, separate from retail.

Narrative controls vocabulary, headline and paragraph length budgets, section order, proof placement, CTA verbs, FAQ style and required content fields. It never changes factual product, price, legal, shipping or integration facts.

### E. Tier — what is in scope and supported

Canonical IDs are starter, growth, professional and enterprise. Some existing source uses low/mid/high/enterprise. Map legacy identifiers through an explicit compatibility adapter; do not silently change stored identifiers or offer URLs.

| Capability | Starter | Growth | Professional | Enterprise |
|---|---|---|---|---|
| Layout | One proven layout | Chosen family template | Custom module composition | Bespoke strategy and original components |
| Modules | 4–6 | 6–10 | Selected/custom composition | Governed as required |
| Theme | One | Custom kit | Brand-directed system | Full brand direction |
| CMS | Not required | Managed | Advanced | Governed multi-workspace |
| Custom flow | No bespoke flow | Predefined conversion interactions | Tailored user flow | Advanced workflows/roles |
| Integrations | Slots only / none by default | 1–2 | Multiple scoped and tested | Advanced, security-reviewed |
| Analytics | Basic SEO/launch checks | Conversion basics | Analytics and experiments | Governed dashboards/observability |
| Custom components | None | Limited | Selected | Bespoke |
| Support | Self-serve | Guided | Priority | Ongoing/contracted |
| Commercial shape | Fixed scope | Configurable | Tailored | Quote-led |

The quality floor does not change by tier. Responsiveness, accessibility, coherent content, basic SEO, error states and truthful status are never premium-only. Tier entitlements must be enforced by validation/resolution and tested—not merely hidden from the chooser.

### F. Theme kits — complete semantic token packs

A theme is a named kit with light and dark variants. Define a contract equivalent to:

~~~ts
type Theme = {
  color: Record<string, string>;
  typography: Record<string, string>;
  spacing: Record<string, string>;
  radius: "none" | "small" | "medium" | "large";
  motion: "minimal" | "standard" | "cinematic";
  density: "airy" | "balanced" | "dense";
};
~~~

Initial kits: Obsidian & Brass, Cobalt Workshop, Botanical House, Oxblood Club, Signal Lime and Terracotta Editorial. Keep them original; use broad design principles rather than copying another company's exact branding.

Each kit defines canvas, surface, elevated surface, ink, muted ink, primary/on-primary, accent/on-accent, border, focus ring, success, warning, danger, chart palette, typography roles, weights, tracking, line heights, measure, spacing scale, radius, elevation and motion tokens.

Family grammar wins over a theme's preferred aesthetic. A dashboard with Botanical House remains data-dense; Consumer Goods with Signal Lime retains the retail product journey. Theme refines the material and tone but cannot remove semantic meaning or status color meaning.

### G. Campaign / advertisement treatment — how the page markets an offer

This is a marketing composition choice, not a request to inject advertising networks. Options: none, launch, seasonal, editorial/brand story, trade window, announcement.

Campaign affects announcement band, hero framing, offer/promo module, campaign copy slots, CTA route and relation between campaign and core content. A discount/deadline can be used only when it exists in verified source data. Never invent scarcity, countdown urgency, customer count or an offer. Missing, expired or future campaign state must be handled explicitly.

### H. Four presentation layers

| Layer | Starter baseline | Growth | Professional | Enterprise |
|---|---|---|---|---|
| Prestige | Clean, complete finish | Hairlines/material detail | Edition/foil/receipt treatments | Bespoke brand plates/seals |
| Real-motion | Quality still + poster | Muted short loop where appropriate | Directed sequence/cutdowns | Managed media library/variants |
| 3D depth | CSS depth/tilt, optional | Lightweight optional viewer | Selected Three.js/R3F stage if justified | Configurator/explode/parametric depth by scope |
| True-demo | Honest preview and working controls | Interactive “Try it” tool | Working artifact/integration trial | Governed demo/workspace and real artifact delivery |

The layers stack on the same family/module system. They must not erase family grammar. Every layer requires explicit fallback behavior: reduced-motion -> poster/static; no WebGL -> 2D; no configured service -> labelled integration slot; unavailable tier -> explanation, not fake activation.

## 3. Target architecture

Keep modular TypeScript in the current Next.js app first. Do not migrate to a monorepo purely for naming symmetry. Package extraction is a future optimization only if real dependency/build boundaries justify it.

### Canonical pipeline

~~~text
Brand facts ─┐
Content facts ├──> Project / Tenant input schema
Commerce facts┘                  |
                                  v
                     Archetype + Vertical resolver
                                  |
                                  v
                  Normalized Template OS Selection
             (family / tier / narrative / theme / campaign / layers)
                                  |
                                  v
                  Capability & combination validation
                                  |
                      +-----------+-----------+
                      v                       v
               Content compiler          Module planner
          (copy strategy + facts)    (required/optional modules)
                      +-----------+-----------+
                                  v
                            Page Blueprint
                                  |
                   Family renderer + module library
                                  |
                    Theme tokens + layer composition
                                  |
                                  v
                Website / product / app / live preview
                                  |
                                  v
          Accessibility + consistency + E2E + visual QA
~~~

### Suggested source tree

~~~text
lib/template-os/
  schema.ts                  # canonical IDs and contracts
  store.ts                   # persisted selection state
  resolve.ts                 # defaults + overrides -> effective config
  validate.ts                # compatibility, tier gates, required modules
  migration.ts               # old style/genome -> canonical state
  families.ts                # six family grammars and defaults
  tiers.ts                   # entitlement policies
  narratives.ts              # copy profiles and content budgets
  theme-kits.ts              # semantic token packs
  campaigns.ts               # campaign rules and fields
  presentation-layers.ts     # prestige / media / 3D / demo gates
  page-blueprint.ts          # typed semantic sections/modules
  compose.ts                 # compose validated blueprint
  registry.ts                # stable archetype/family/vertical aliases
  fixtures.ts                # explicitly labelled demo data

components/template-os/
  Configurator.tsx
  SelectionSummary.tsx
  CapabilityGate.tsx
  PreviewCanvas.tsx
  ComparisonStage.tsx
  LayerStatus.tsx

components/site/families/
  MicroProductFamily.tsx
  IndustryHospitalityFamily.tsx
  DataDashboardFamily.tsx
  SaaSProductFamily.tsx
  EnterprisePlatformFamily.tsx
  ConsumerGoodsFamily.tsx

components/site/modules/      # semantic module contracts and family adapters
components/commerce/           # product listing/detail/cart/checkout/quote/tracking

tests/template-os/
  schema.test.ts
  resolve.test.ts
  validate.test.ts
  compose.test.ts
  family-conformance.test.ts
  tier-entitlements.test.ts
  content-truth.test.ts
tests/e2e/
  configurator.spec.ts
  family-preview.spec.ts
  commerce-states.spec.ts
  accessibility.spec.ts
tests/visual/baselines/
docs/template-os/
  UNIFIED-IMPLEMENTATION-GUIDE.md
  ARCHITECTURE-DECISIONS.md
  MIGRATION-MAP.md
  REFERENCE-INVENTORY.md
~~~

Do not create empty folders only to match the tree. Create directories as the first useful file is added.

### Canonical selection contract

The canonical selection needs stable typed IDs for these dimensions:

~~~ts
interface TemplateOSSelection {
  archetype: string | "native";
  vertical: string | "native";
  family: TemplateFamilyId | "native";
  tier: TemplateTierId | "native";
  narrative: NarrativeId | "native";
  themeKit: ThemeKitId | "native";
  campaign: CampaignId;
  prestige: PrestigeLayer | "native";
  realMotion: MotionLayer | "native";
  depth3d: DepthLayer | "native";
  trueDemo: DemoLayer | "native";
  mode: "light" | "dark" | "native";
}
~~~

Here, **native** means “inherit the curated value for this example”, not “use generic defaults”. **none** is an intentional opt-out and is not an alias for native. Resolution should expose the effective value and source for every field: example, family default, user override, tier fallback or validation fallback. That source metadata powers explanations, reset and debugging.

The complete schemas also need:
- Brand facts: name, descriptor, locale, logo, approved colors/type, tone, approved claims/assets.
- Content facts: supplied copy, products/services, FAQs, legal content, sources/provenance and last verified time.
- Commerce facts: product/variant, currency, price, stock, tax/shipping, returns, delivery state, payment and order lifecycle.
- Product requirements: entities, routes, modules, forms, integrations, permissions, events and states.
- Page blueprint: typed semantic sections, module payloads, source references, order, required routes, responsive behavior and CTA destinations.
- Resolution output: effective configuration, inherited/overridden source, suppressed options, warnings and missing inputs.
- QA profile: accessibility, breakpoints, contrast, motion, state coverage, consistency rules and visual baseline ID.

Use strict types for schema-facing contracts. Validate imported, archived and user-provided data at boundaries. Invalid stored state must safely fall back; it must not crash, silently grant enterprise capabilities or corrupt offer data.

## 4. Module system: semantic behavior, different family presentation

A module has one stable semantic identity, while the family adapter determines how it appears. For example, “proof” may be a photo-led craft story in Hospitality, an authored artifact in Micro Products, a timestamped table in Data Dashboards, a working feature proof in SaaS, an evidence ledger in Enterprise and verified materials/reviews in Consumer Goods.

Each module definition specifies:
- Stable ID and semantic purpose.
- Supported archetypes/families.
- Required/optional input fields and what it is allowed to claim.
- Tier entitlement and module-budget cost.
- Dependencies and incompatible variants.
- Responsive layout behavior.
- Loading, empty, validation, error, disabled, success and unavailable states where applicable.
- Accessibility/interaction requirements.
- Event hooks only for genuine user actions.
- Demo-data/provenance policy.
- Family presentation adapter.

Keep domain logic out of decorative components and family-specific markup out of the business data schema.

### First module inventory

Common modules: navigation, hero, value proposition, feature proof, trust/proof, FAQ, pricing/offer, CTA, contact/newsletter and footer.

Hospitality: service/menu, people/craft story, gallery, location/hours/access, reservation/inquiry.

Data: KPI overview, trend chart, filter controls, sortable table, status/alert feed, record detail.

SaaS: product UI stage, workflow proof, capability grid, integration proof, plan comparison, trial/onboarding.

Enterprise: workspace navigation, role matrix, audit feed, evidence/security panel, integration map, operational KPI and request briefing.

Consumer Goods: product listing, product detail, variants, cart, checkout, wholesale quote, fulfillment/delivery estimate, returns, material details, reviews, payment trust and order tracking.

No Consumer Goods family template is valid until the page blueprint or validator maps all six mandatory commerce modules/routes. A quote is not a checkout; a product grid is not a product detail page.

## 5. Renderer contract: archetype functionality + family composition

The archetype decides what needs to work. The family decides how the experience communicates. A booking system remains a booking system when its visual family changes; the booking data and states remain but page composition and copy strategy change.

Introduce a normalized PageBlueprint containing semantic content and module slots, not fixed DOM layout. The six family renderers use that blueprint to compose different layouts. They must not be a universal markup template with different family classes.

### Example blueprint contract

~~~ts
interface PageBlueprint {
  id: string;
  title: string;
  archetype: string;
  vertical: string;
  effectiveFamily: TemplateFamilyId;
  effectiveTier: TemplateTierId;
  narrative: NarrativeId;
  sections: PageSection[];
  requiredRoutes: string[];
  commerce?: CommerceBlueprint;
  evidence: EvidenceReference[];
  warnings: string[];
  demoMode: boolean;
}
~~~

### Family structural signatures

| Family | Required structural evidence |
|---|---|
| Micro Products | Focused nav; oversized promise; short benefit sequence; compact proof/offer; dominant CTA. |
| Industry & Hospitality | Editorial masthead; image-led entry; service/place/people narrative; whitespace; service/location/booking sequence. |
| Data Dashboards | Workspace header; compact status bar; KPI/data panel; filter/table/alert composition; mono/tabular data. |
| SaaS Products | Product UI stage; workflow/capability proof; integrations; pricing/trial sequence and product CTA. |
| Enterprise Platforms | Hierarchical workspace shell; roles/permissions; audit/evidence and governed inquiry path. |
| Consumer Goods | Category/search/product discovery; detail/variant/trust; cart and checkout; separate wholesale quote and tracking routes. |

Tests must fail when every family has the same section/landmark order and DOM signature, with only colors and headings changed.

### Flagship mapping

| Existing flagship | Domain / role | Preserve | New family responsibility |
|---|---|---|---|
| Pocket / micro-pocket | Micro product | Minimal one-product page, decisive purchase pattern | Micro family controls short-page composition |
| Terroir / hosp-terroir | Hospitality/service | Editorial dining/service, place and reservation cues | Hospitality family owns editorial pacing and service details |
| Telemetry / dash-telemetry | Data dashboard | Dense panels/status/chart patterns | Data family owns tool/workspace and table composition |
| Orbit / saas-orbit | SaaS | Product UI, capability/trial/pricing | SaaS family owns product-led proof and trial route |
| Atlas / ent-atlas | Enterprise | Authority, compliance, metrics | Enterprise family owns workspace roles/evidence |
| Snapcart / cg-cart | Retail | Product grid and cart pattern | Consumer Goods owns product browse/detail/cart/checkout |
| Maison Vey / cg-maison | Luxury/editorial commerce | Gallery-like product story and editions | Consumer Goods can use a luxury sub-recipe without losing purchase functionality |
| Quartermaster / cg-wholesale | Wholesale | Bulk order/trade ideas | Consumer Goods owns wholesale path; Enterprise may be an alternate workspace composition |

Existing mappings like getFamilyForProductType() and archetypeFor() should become recommendation defaults, not irrevocable laws. Family is independently selectable, then validated for compatibility.

## 6. Content compiler: narrative selection must change copy strategy

Store content as structured data and source facts, not hardcoded strings inside family JSX.

### Initial content fields

- Identity: brand, descriptor, audience, locale and tone.
- Promise: target outcome, mechanism and audience.
- Hero: eyebrow, headline, accent phrase, support copy, main CTA.
- Sections: title, summary, body blocks, highlights, optional proof reference and CTA.
- Proof: evidence type/value/source, permitted phrasing, verified date and demo/verified status.
- Commerce: product name/value proposition/specifications/material/care/price/currency/availability/delivery/returns.
- FAQ: question, source-grounded answer and last verified time.
- Campaign: message, status, active dates if real, eligible products, verified offer facts and destination.
- Legal/trust: contact, terms, privacy, returns, consent and disclaimers.
- Provenance: supplied by user, imported, calculated from approved source, generated suggestion or illustrative demo.

### Testable copy budgets

These are starter quotas, not rigid editorial laws. Make them configurable and localizable.

| Field | Direct | Editorial | Technical | Proof-led | Campaign | Trade |
|---|---|---|---|---|---|---|
| Hero headline | 3–9 words | 4–12 words | 3–10 words | 4–10 words | 3–9 words | 3–10 words |
| Support copy | 1 short sentence | 2–4 sentences | 1–3 precise sentences | Outcome + evidence context | Message + actual offer constraint | Buyer outcome + terms/context |
| Page logic | 3–5 short sections | 4–7 story sections | 4–7 labelled sections | Proof near each claim | Campaign band → message → details → action | Catalogue/terms/fulfillment/quote |
| CTA style | Verb + outcome | Visit/experience/learn | Specific operation | Inspect/try/compare evidence | Join/explore/claim only if real | Request quote/reorder/trade account |

Changing narrative should change length and structure but not the value of verified facts. Test the same facts under each narrative. Keep user language/localization in mind; do not ship English-only assumptions into a multilingual product.

### Truth/provenance policy

- Verified facts are separate from generated suggestions.
- Never invent reviews, customers, ratings, rankings, conversions, uptime, inventory or delivery certainty.
- Illustrative fixture values must be labeled at their point of use.
- Empty fields create an honest empty state or ask for information; they do not produce fake facts.
- SEO metadata and structured data use verified page/brand fields, not invisible keyword stuffing or invented local facts.
- A simulated integration is never shown as connected. A generated claim is not proof.

## 7. Tokens and presentation layers

### Semantic tokens

Use CSS variables with semantic names; do not scatter hex values around renderer components. Define at minimum: canvas, surface, elevated surface, ink, muted ink, primary/on-primary, accent/on-accent, border, focus, success, warning, danger, chart colors; display/heading/body/label/caption/data fonts; weights/tracking/line heights/measure; page gutter/section/card/inline spacing; radii, divider and elevation; motion duration/easing/distance; media crop/aspect/overlay/poster; layout widths/grid/breakpoint rules.

A contrast tool must test actual semantic pairs. Warn or reject an inaccessible combination instead of papering over it with decorative colors or an unrelated foreground.

### Prestige

A finish layer composed from tokens and recipes: surface texture, frame edge, edition marker, price/receipt treatment and restrained signatures. No unreadable foil, deceptive badge or keyboard-inaccessible interaction. It should extend the same component, not create a second component library.

### Real-motion media

Use a media registry with source, poster, format, duration, size, aspect ratio, alt/decorative status, rights/source, placement allowlist and fallback. Video is muted, poster-first, only active in/near the viewport, limited to one loop per region, and replaced with poster/static content under reduced motion. Measure actual network and rendering costs before claiming performance budgets pass.

### 3D

Begin with CSS tilt/parallax and a robust 2D fallback. Add Three.js/R3F only for a module where depth provides useful product evidence and after the 2D design is good. Lazy-load, clamp pixel ratio, dispose geometry/materials/textures, respect reduced motion and avoid making 3D mandatory for understanding or buying. Do not add a large dependency to the initial bundle for a future possibility.

### True-demo

Create a small registry of useful demo archetypes: editable template reader, quiz, contrast checker, keyword scorer, regex tester, product material configurator, booking-form trial, site fly-through or client-side kit compiler. A “Try it” action must actually work. For downloads, generate genuine artifacts and verify every file against the manifest. Keep real/sample/extended labels truthful.

### Campaign behavior

Test no campaign data, future/expired campaign, missing CTA destination, narrow viewport and keyboard/screen reader behavior. Campaign copy cannot override product price, availability, legal text or checkout rules.

## 8. Configurator UX and state

One canonical selection model must drive every visible selector. A panel may be reused across pages, but no hidden legacy state should also change the preview.

### Recommended flow

1. Goal/archetype with “help me choose”.
2. Vertical and audience.
3. Family, explained with a live thumbnail and design grammar.
4. Tier with actual included/excluded capabilities.
5. Narrative/copy strategy.
6. Theme kit and mode.
7. Campaign and editable campaign details.
8. Prestige, motion, 3D and demo layers with entitlement status.
9. Review effective selection, inherited defaults, modules/routes, required facts, integrations, limitations, performance/accessibility effects and demo-only claims.
10. Preview, compare or return without losing work.

Power users may open any layer directly; new users should see progressive disclosure rather than a giant technical form.

Every control must have an accessible name, visible selected state, concise explanation, keyboard operation and per-field reset. Explain unavailable options. Changes should update the preview deterministically. A preview comparison must use identical content facts. Show a reason when validation changes or suppresses a choice. If persistence is only browser localStorage, describe it as a local preview preference, not account/project persistence. Add a validated shareable URL or explicit config export only after the schema is stable; never put secrets/private customer data in URLs.

## 9. File-by-file migration map

| Path | Action | Responsibility |
|---|---|---|
| lib/template-os/schema.ts | Create | Stable IDs/types for family, tier, narrative, theme, campaign, layers, page blueprint, modules, facts/provenance. |
| lib/template-os/store.ts | Create | One persisted configuration source, SSR-safe defaults, validation on hydration, reset and cross-tab sync. |
| lib/template-os/resolve.ts | Create | Merge native archetype DNA, family defaults, tier rules, theme and overrides; emit effective choices + source/reason. No React or DOM dependencies. |
| lib/template-os/validate.ts | Create | Compatibility, tier gates, mandatory modules, integration and fallback checks; return typed warnings/errors. |
| lib/template-os/migration.ts | Create | Migrate old style/mode/genome settings and low/mid/high tiers. Preserve valid user choices. |
| lib/template-os/families.ts | Create | Six family grammars, defaults, content rules, required/optional modules. |
| lib/template-os/tiers.ts | Create | Four entitlement policies and legacy tier mapping. |
| lib/template-os/narratives.ts | Create | Copy profiles, budgets, section/proof/CTA rules. |
| lib/template-os/theme-kits.ts | Create | Six light/dark token kits and semantic validation metadata. |
| lib/template-os/campaigns.ts | Create | Campaign modes, required fields, activation/expiry rules. |
| lib/template-os/presentation-layers.ts | Create | Prestige/media/3D/demo availability, fallbacks and performance policy. |
| lib/template-os/page-blueprint.ts | Create | Typed semantic page sections/modules and evidence references. |
| lib/template-os/compose.ts | Create | Convert facts + effective selection into a validated blueprint. |
| lib/template-os/registry.ts | Create | Stable archetype, vertical, family IDs and legacy aliases. |
| lib/genome/catalog.ts | Adapt | Retain eight flagship DNAs, separate archetype from family. |
| lib/genome/switches.ts | Adapt | Reuse palette/voice/material options; delegate effective selection to new resolver after parity tests. |
| lib/genome/layout.ts | Adapt | Keep helpful effect descriptions; supplement with per-family structural capabilities. |
| lib/genome/copy.ts | Adapt | Compose content from narratives and verified facts; keep compatibility until migrated. |
| lib/genome/store.ts | Adapt | Migration adapter/temporary bridge, then thin compatibility layer or retire in a separate cleanup. |
| lib/style-registry.ts | Adapt | Map engines/mode to theme-kit aliases and prestige/media recipes. No second layout resolver. |
| lib/site-preview.ts | Adapt | Keep stable 96-example index and slugs; derive normalized config/blueprint and explicit demo metadata. |
| components/site/SiteTemplate.tsx | Refactor | Resolver → validator → content compiler → blueprint → family renderer. Keep archetype functionality. |
| components/site/templates/*.tsx | Migrate | Extract useful behaviors/modules, preserve stable test IDs where helpful, remove duplicated logic only after tests. |
| components/site/SiteFrame.tsx | Preserve/test | Same source for scaled and full previews; check ResizeObserver/height/media/interactive mode. |
| components/genome/GenomeConsole.tsx | Refactor | Keep helpful option previews/explanations but wire one canonical state. |
| components/template-os/* | Create | Configurator, summary, capability gate, preview and comparison. |
| components/site/families/* | Create | Six structural renderers. Explicitly implement Consumer Goods, which is absent from the reference project's five renderer files. |
| components/site/modules/* | Create/extract | Semantic modules and per-family adapters. |
| data/designFamilies.ts | Migrate | Facade over canonical family data until imports are gone. |
| data/servicePackages.ts | Migrate | Map current packages to the new entitlement registry; preserve offer content. |
| data/exampleProducts.ts and data/businessTypes.ts | Audit/retain | Deduplicate only after comparing source fields and consumer imports. |
| app/page.tsx | Refactor gradually | Replace scattered selection state with configurator hooks; keep catalogue behavior and stable links. |
| app/preview/[slug]/page.tsx | Adapt | Validated preview config and metadata; preserve slug and current forced-archetype behavior. |
| app/layout.tsx | Audit | Correct metadata/fonts/bootstrap; remove old bootstrap only after migration tests. |
| app/globals.css | Refactor carefully | Semantic tokens, family scopes, layer rules, reduced motion. Remove old selectors only after a search and screenshot review. |
| src/components/omniforge/catalog/schema.ts and product-catalog.ts | Preserve/align | Keep deliverables/policies/proof separate and real/sample/extended status honest. |
| src/components/omniforge/kit-compiler.ts and kit-content/* | Preserve/test | Verify generated artifacts against manifest; retain truthful content flags. |
| upload/dashboard-project/* | Reference-only | Compare, inventory and port; do not import at runtime. |
| upload/DESIGN MAP.7z | Inspect | Extract when available; record file, pattern, provenance and decision in REFERENCE-INVENTORY.md. |
| package.json / lockfiles | Minimal change | Add a compatible test runner/scripts intentionally; avoid manager/lockfile churn. |
| tests/template-os/*, tests/e2e/* | Create | Resolver, tier, family, content truth, commerce, accessibility and preview conformance. |

## 10. Ordered implementation phases and gates

Do not attempt one huge replacement commit. Each phase must leave the app runnable and end with evidence.

### Phase 0 — inventory, baseline, rollback

1. Record branch and exact base commit.
2. Install with the declared package manager; record Node/package-manager versions.
3. Run the current build/typecheck/lint/tests that exist and record baseline failures separately.
4. Inventory upload files by path/type/size. Extract DESIGN MAP.7z to a temporary workspace if available, not into application runtime.
5. Read the reference GUIDE.txt, nested app and its reference archive if accessible. Create REFERENCE-INVENTORY.md with purpose/provenance and retain/port/adapt/archive/ignore decisions.
6. Search imports/callers before moving or removing renderer/style/data files.
7. Audit tracked secrets and ensure none flow into fixtures or docs.
8. Capture baseline screenshots for main browse, family preview, genome console and all eight full previews at mobile and desktop.

**Gate 0:** inventory, baseline test report, reference-inspection status, known failures and rollback notes are committed; no destructive migration.

### Phase 1 — schemas, resolver and validation

1. Create canonical typed IDs and contracts.
2. Add six family definitions, four tiers, narratives, theme kits, campaigns and layer availability.
3. Write pure resolver and validator; expose effective values and source/reason.
4. Test unknown IDs, corrupt saved values, native defaults, overrides, reset semantics, capability limits and legacy aliases.
5. Write migration tests for current style/mode/genome and tier values.
6. Keep React, DOM and localStorage out of the pure resolver.

**Gate 1:** deterministic resolver and validator tests pass for each family/tier; no UI migration yet; legacy values have explicit mappings.

### Phase 2 — blueprint and content compiler

1. Define semantic PageBlueprint and module schema.
2. Extract content from current flagships, copy functions and reference examples.
3. Add narrative profiles and copy validation budgets.
4. Separate verified facts, generated suggestions and demo values.
5. Add safe campaign fields for absent, future and expired offers.
6. Compose at least one representative blueprint for each family, including distinct retail and wholesale flows.
7. Preserve current slugs and example indexing.

**Gate 2:** six valid representative blueprints; narratives differ meaningfully; verified prices/legal/product facts remain invariant; mandatory commerce modules appear; illustrative data is clearly marked.

### Phase 3 — six family renderers

1. Build six family renderers driven by the same semantic blueprint.
2. Port useful ideas from the five reference renderers without copying the nested app as a runtime.
3. Build Consumer Goods explicitly with retail + wholesale and all mandatory modules/routes.
4. Extract flagship behavior into reusable semantic modules.
5. Keep the same real design source for preview cards and full page.
6. Add structural conformance tests based on section order, semantic landmarks, module composition and responsive rules.

**Gate 3:** six family renderers have distinct structure; none is color-only; all eight existing flagship slugs render; card/full preview use the same source.

### Phase 4 — configurator and state migration

1. Build one authoritative Configurator and SelectionSummary.
2. Show native/inherited values, tier limits, reset-one/reset-all, required inputs and reasons for unavailable choices.
3. Migrate GenomeConsole controls to the normalized store and preserve useful “what changes” explanations.
4. Map old style/genome choices through a compatibility adapter.
5. Remove duplicate state only after parity tests.
6. Prove family, theme, narrative and campaign are independently selectable.
7. Add same-content side-by-side comparison.
8. Do not silently coerce incompatible combinations; show a reason and safe fallback.

**Gate 4:** every selector changes its intended rendered result; state persists safely; reset is correct; no second store secretly changes the page.

### Phase 5 — campaign, prestige, media, 3D and demo

1. Add campaign composition/content rules and tests for missing/expired data.
2. Implement prestige as reusable tokens/recipes.
3. Add poster-first media registry and reduced-motion fallback.
4. Implement CSS depth first; measure before adding Three.js/R3F.
5. Ship one valuable, working true-demo surface.
6. Make KitCompiler delivery truthful and manifest-verified.
7. Explain layer entitlements and fallbacks.
8. Never label an unconfigured integration as live.

**Gate 5:** each layer can be independently enabled/tested; reduced motion works; unsupported media/service falls back; performance is measured; demo labels are truthful.

### Phase 6 — commerce and delivery consistency

1. Define product, variant, price, inventory, cart, order, delivery, returns, payment and wholesale quote contracts.
2. Keep product/price/shipping data consistent across listing/detail/cart/checkout/quote/tracking.
3. Implement loading, empty, validation, out-of-stock, network error, failed payment, cancellation and success states.
4. Without configured backend/credentials, label checkout as prototype/local simulation. Do not claim real payment/order processing.
5. For real payment, use provider-controlled checkout and verified server/webhook state; client-side UI is not proof of payment.
6. Ensure family module routes are represented even if a tier differentiates demo integration from production integration.
7. Test kit manifest parity.

**Gate 6:** all six consumer-goods module paths exist; state consistency is tested; no simulated payment/order is described as real.

### Phase 7 — quality hardening and PR

1. Run typecheck, production build, unit tests, E2E, visual regression and accessibility checks.
2. Audit every demo value, metric, rating, testimonial and integration status.
3. Test keyboard-only, focus, reduced motion, forms, status announcements, contrast and important WCAG 2.2 AA behaviors.
4. Test mobile and low-performance media paths.
5. Check metadata, canonical URLs and any sitemap/schema output. Remove stale Ledgerly/accounting metadata if still present.
6. Measure performance and optional dependency cost.
7. Remove unused CSS/registries only after a complete import search and visual review.
8. Document architecture decisions, limitations and rollback.
9. Open a reviewable PR with screenshots, test output and unresolved issues.

**Gate 7:** all gates have evidence; no new known failures are hidden; PR scope and rollback are clear. Never claim tests passed if they were not run in the current checkout.

## 11. Required test inventory

### Unit tests

- Schema rejects/handles unknown family, tier, theme and layer identifiers.
- Resolver is deterministic.
- Native inheritance, explicit overrides and source/reason metadata are correct.
- Resetting one dimension preserves all other selections.
- A tier-forbidden capability cannot be re-enabled with a direct config payload.
- Mandatory module requirements are enforced.
- Consumer Goods exposes listing, detail, cart, checkout, wholesale quote and tracking.
- Theme selection does not alter prices, inventory, product identity or delivery rules.
- Narrative changes content structure but not verified product/price/legal facts.
- Campaign with no active offer does not create a discount or urgency.
- Demo proof/KPI stays visibly labeled.
- Invalid saved state safely falls back to native.
- real/sample/extended kit files are checked against actual source and manifest.
- No duplicate manifest paths, policy-as-deliverable leaks or promise/content mismatch.

### Playwright journeys

1. Open home, select every family, open preview and return.
2. Open every existing flagship slug.
3. Choose family+narrative+theme+tier+campaign, refresh and verify persistence.
4. Reset only theme and verify other selections survive.
5. Compare two families using exactly the same content.
6. Try a disallowed capability and verify explanation/fallback.
7. Consumer Goods retail: listing → detail → cart → checkout state.
8. Consumer Goods wholesale quote as a separate route; tracking as a distinct route.
9. Keyboard-only configurator, navigation, modal and key form.
10. Reduced-motion mode and poster/static fallback.
11. Broken images/videos/network and helpful fallback.
12. Export/download kit and compare archive entries against the manifest.

### Visual/performance gates

- Use fixed fixtures so screenshot changes reflect design, not variable data.
- Capture mobile (for example 390 CSS px), tablet and desktop (for example 1440 CSS px) in a pinned browser/version.
- Set a screenshot tolerance; manually review changed baselines, never auto-approve every diff.
- Inspect focus, heading order, labels, validation, status announcements, contrast and touch targets.
- Measure hero rendering, layout stability, video/image transfer and JS cost.
- Automation supports WCAG 2.2 AA review but does not replace keyboard/screen-reader inspection.

The current root package manifest shows minimal test infrastructure. Choose a compatible test runner for the actual dependency setup, document it and add scripts intentionally; do not assume a framework is present if it is not declared.

## 12. Coding-agent operating protocol

1. Read this guide first; inspect branch, worktree, scripts and current source before editing.
2. Inspect/extract the reference archive if available. Record what was actually inspected and what was unavailable.
3. Produce/update a dependency and ownership map before moving or deleting components.
4. Implement phases in order, with focused logical commits and a runnable app at each gate.
5. Add/update tests with each implementation, not after all phases.
6. Never fabricate test output, KPIs, customers, delivery promises, stock, discounts or live integration status.
7. Extract general layout principles from external inspiration; create original design work rather than copying proprietary marks/assets.
8. Never make each family the same hero/grid/card system with different colors.
9. Missing facts generate required-input/empty states, not AI-invented facts.
10. A selector is incomplete until its effective selection changes rendered output or produces an explicit unavailable reason.
11. Preserve routes and use backward-compatible adapters when intent is uncertain. Document decisions rather than blocking on minor ambiguity.
12. An unfinished layer gets a typed contract and honest fallback—not a fake working appearance.
13. After each phase report changed files, decisions, commands, actual results, unresolved errors, screenshot evidence and next gate.
14. Update MIGRATION-MAP.md and ARCHITECTURE-DECISIONS.md as responsibility/public behavior changes.
15. Do not merge to main automatically; open a PR when scope and gates are ready.

## 13. Recommended default product decisions

Use these defaults unless repository inspection reveals a concrete reason to adjust them:

- **Consumer Goods flagship:** dual-path retail + wholesale. Stage a premium/editorial option and a fast retail option, but keep wholesale a genuinely separate flow.
- **Commerce depth:** interactive prototype if backend/payment credentials are absent. Real provider checkout only with configured secrets, server-side verification and tested order state. Never fake a successful payment.
- **Agency access:** public showcase/configurator first. Staff sign-in requires a real project/client backend and permission model and should not be bolted on by default.
- **Prestige:** Obsidian & Brass is a reference kit, not a universal override. Every kit must be usable in every family.
- **3D:** CSS depth first, one optional product/device stage only after performance tests. Parametric configurators are Professional/Enterprise scope.
- **Motion media:** poster-first and reduced-motion-safe pilot; video never carries unique information needed to buy/use the product.
- **Backend:** preserve current showcase architecture for the first refactor. Do not add a DB/CMS/payment dependency just to make the demo look more complete.
- **Source of truth:** root app is canonical; archives/nested project are references, not runtime registries.

## 14. Required final deliverables

1. Current/target architecture and migration map.
2. Canonical schemas, resolver, validator and compatibility adapter.
3. Six family renderers and shared semantic module registry.
4. Four validated tier entitlement profiles.
5. Narrative/content compiler with truth/provenance rules.
6. Six light/dark theme kits and contrast tests.
7. Campaign layer plus prestige/media/3D/demo behavior or honest fallbacks.
8. Consumer Goods dual path and six required commerce module routes/states.
9. One configurator and one canonical persisted state source.
10. Test suite and actual output for tests/build commands.
11. Visual baselines and manual QA checklist.
12. Migration/rollback notes, limitations and a reviewable PR.

## 15. Handoff prompt for the implementation agent

~~~text
You are lead architect and implementation engineer for genetac/yoy.
Read docs/template-os/UNIFIED-IMPLEMENTATION-GUIDE.md completely before editing.
This is a structural Template Operating System refactor, not a reskin.

First inspect the current branch/worktree, package manager, scripts and baseline
build/tests. Inspect upload/dashboard-project/GUIDE.txt, upload/OMNIFORGE —
Elite Upgrade Build Plan (v3).md, nested reference project and upload/DESIGN
MAP.7z when its binary contents are available locally. Be honest about anything
you cannot inspect.

Keep the root Next.js application canonical. Preserve the eight flagship
archetypes, stable public example slugs, existing offer/kit truth contract and
working behaviors. Do not run the nested reference application as a second
runtime. Do not delete assets before tracing callers and recording disposition.

Implement the guide's phases in order, in separate logical commits. Start with
typed schemas, deterministic pure resolver, compatibility validation and tests.
Then build PageBlueprint/content narrative composition. Then build six
structurally distinct family renderers and migrate all selection controls to
one authoritative persisted store. Then build campaign/prestige/media/3D/demo
layers with honest fallbacks. Finally complete commerce state consistency,
accessibility, E2E and visual QA.

Family, tier, narrative, theme kit, campaign and four presentation layers are
independent dimensions under explicit validation. The same content rendered
in different families must have distinct layout grammar, section composition
and user journey—not only different colors or headings. Copy strategy may
change content structure and CTA/proof order, never verified price/product/
legal facts. Consumer Goods must include product listing, detail, cart,
checkout, wholesale quote and tracking, with retail and wholesale separate.

Every actual selector must change the preview or explain why it is unavailable.
Label illustrative metrics and simulated integrations. Do not invent claims,
test results, customer proof, stock, discounts or delivery promises. Respect
reduced motion, semantic accessibility and mobile behavior.

After each phase, run relevant checks, record exact commands and actual results,
update MIGRATION-MAP.md and ARCHITECTURE-DECISIONS.md, list changes/blockers and
keep the app runnable. Do not merge to main; open a reviewable PR only after
the acceptance gates have real evidence.
~~~

## 16. Final architecture rule

The system has one selection source, one resolver, one semantic page blueprint, one module registry and one canonical fact/provenance model. Family controls composition; narrative controls communication; tier controls capability; theme controls tokens; campaign controls marketing treatment; prestige/media/3D/demo add presentation capability. If a user can select something but the system cannot prove what output it changes, that option is not implemented.
