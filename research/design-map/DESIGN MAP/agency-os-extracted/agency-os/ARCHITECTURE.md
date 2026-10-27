# OMNIFORGE OS — System Architecture

## 1. Overview

One unified production system. Six design families as visual expressions of the same pipeline. Four tiers gated by real capability (scope, ownership, proof, integration, QA) — never by "more animation."

```
Brand data + Content data + Commerce data
        ↓
  Template schema
        ↓
  Reusable modules library (25)
        ↓
  Family visual rules + tier limits
        ↓
  Website / app / catalog / experience
```

## 2. Layers

| Layer | Path | Purpose |
|---|---|---|
| **Tokens** | `tokens/theme.ts` | Theme contract (color, typography, spacing, radius, motion, density). CSS-variable injection. One Theme per family. |
| **Database** | `db/*.sql` | Supabase/Postgres schema. The OS documents itself — every family, tier, module, template, project, tool, QA check is a row. |
| **Modules** | `commerce/`, `ui/`, `data/`, `booking/`, `states/` | 25 theme-aware, tier-gated building blocks. Each has a prop contract + full state set. |
| **Patterns** | `patterns/3d-*.tsx` | Five Three.js modules: ProductShowcase3D, FabricScene3D, BarberPoleShader, DeviceStage3D, ParticleField. Each has a reduced-motion 2-D fallback. |
| **Flagships** | `flagships/*/` | One excellent reference template per family. Shipped, live, linked from the hub. |
| **Hub** | `hub/index.html` | The preview profile / presentation site. Families, tiers, modules, flagships, configurator, stack, QA. |

## 3. Family grammar matrix

| Family | Density | Motion | Radius | Type | Signature |
|---|---|---|---|---|---|
| Micro Products | balanced | standard | small | Anton / DM Sans | Decisive CTA |
| Industry & Hospitality | airy | minimal | none | Anton / Playfair / DM Sans | Photography + booking |
| Data Dashboards | dense | minimal | none | Space Grotesk / Inter / JetBrains Mono | Status colors + tables |
| SaaS Products | balanced | standard | medium | Space Grotesk / Inter | Feature proof + trial |
| Enterprise Platforms | dense | minimal | small | Inter / JetBrains Mono | Permissions + KPIs |
| Consumer Goods | airy | standard | medium | Fraunces / DM Sans | Price hierarchy + tracking |

## 4. Tier gates

| Tier | Modules | Integrations | Custom flow |
|---|---|---|---|
| Starter | 7 core | none | no |
| Growth | 12 | CMS + 1-2 (Stripe, Plausible) | no |
| Professional | 17 | commerce/booking + analytics + motion direction | limited |
| Enterprise | all 25 | ERP, supplier portal, multi-region, audit trails | bespoke |

The configurator queries `modules` with `min_tier <= selected_tier_position` and renders included vs locked.

## 5. Three.js module blueprints

| Module | What it does | Uniform hooks | Fallback |
|---|---|---|---|
| ProductShowcase3D | Rotating product, scroll-driven, material swap | uColor, uRoughness | Ken Burns carousel |
| FabricScene3D | PlaneGeometry + layered sin/cos vertex waves | uColor, uColor2 | Static gradient |
| BarberPoleShader | CylinderGeometry + spiral fragment shader | uRed, uCream, uBrass | SVG stripes |
| DeviceStage3D | Laptop + phone with live canvas texture | — | Static screenshot |
| ParticleField | 700-1500 Points, mouse parallax | color, size, opacity | CSS dots |

## 6. Quality bar (non-negotiable, even for Starter)

- WCAG 2.2 AA (contrast, keyboard, focus, text alternatives, reduced-motion path)
- Product availability / price / shipping consistent across product page, cart, checkout, structured data
- Empty / error / loading / out-of-stock / failed-payment states documented and styled
- Mobile-first, slow-network tolerant, visual regression baselines
- Playwright e2e for purchase + booking flows

## 7. Cold-call reveal workflow

1. Prospect says what they do
2. Query: `SELECT * FROM templates WHERE family_id = ? AND tier_min <= ?`
3. Pick a flagship, `INSERT INTO projects` with content overrides
4. Send live preview URL during the call
5. Prospect interacts with a near-production experience — not a screenshot

## 8. Build sequence (remaining)

- [x] Freeze system contract (6 families, 4 tiers, 25 modules)
- [x] Foundations (tokens, schemas, theme.ts)
- [x] Consumer Goods flagship ×2 (VANTA + MERIDIAN ROAST)
- [x] Industry & Hospitality flagship (OAK & IRON)
- [x] Hub / preview profile
- [ ] Micro Products flagship
- [ ] Data Dashboards flagship
- [ ] SaaS Products flagship
- [ ] Enterprise Platforms flagship
- [ ] Wire configurator to Supabase `projects`
- [ ] Staff sign-in area
- [ ] Playwright visual baselines per flagship
