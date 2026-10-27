# OMNIFORGE OS — Template Operating System

Proof-of-concept package for an agency that sells structured design + AI-implementation packages (Starter → Enterprise). One production system, six design families, four tiers, 25 modules, three shipped flagships.

## Quick start

```bash
cd agency-os
node server.js
```

Open **http://localhost:3000** → the hub (presentation site) loads.

Flagship previews:
- http://localhost:3000/flagships/oak-and-iron
- http://localhost:3000/flagships/vanta-athletic
- http://localhost:3000/flagships/meridian-roast

No `npm install` needed. Zero dependencies.

## Package structure

```
agency-os/
├── README.md                      ← this file
├── ARCHITECTURE.md                ← full system architecture doc
├── server.js                      ← master static server (zero deps)
├── db/
│   ├── schema.sql                 ← Supabase/Postgres schema (7 tables + RLS)
│   └── seed.sql                   ← seed data (6 families, 4 tiers, 25 modules, 3 templates, 17 tools)
├── tokens/
│   └── theme.ts                   ← Theme contract + 6 family defaults + CSS var injection
├── hub/
│   └── index.html                 ← the preview profile / presentation site
└── flagships/
    ├── oak-and-iron/              ← Industry & Hospitality flagship
    │   └── index.html
    ├── vanta-athletic/            ← Consumer Goods flagship #1 (mass-market)
    │   └── index.html
    └── meridian-roast/            ← Consumer Goods flagship #2 (Theme token contract)
        └── index.html
```

## The three flagships

| Slug | Family | Tier | Highlights |
|---|---|---|---|
| `oak-and-iron` | Industry & Hospitality | Growth → Professional | 3D scissors, animated barbershop street scene, spiral-shader barber pole, booking flow, before/after slider, click-to-snip |
| `vanta-athletic` | Consumer Goods | Starter → Growth | Kinetic 3D hero core, orbiting elements, product grid with filters, cart, member tiers |
| `meridian-roast` | Consumer Goods | Growth | Theme token contract wired, roast filter, cart drawer, reviews, order-tracking timeline, wholesale enquiry path |

Each flagship is a single self-contained HTML file. Deploy to GitHub Pages or Vercel free tier in minutes.

## The database (the OS as its own database)

Run `db/schema.sql` then `db/seed.sql` in Supabase SQL editor (or any Postgres):

- `families` — 6 design families + default Theme object each
- `tiers` — 4 tiers with included/excluded module arrays
- `modules` — 25 modules with category, min_tier gate, component path, states
- `templates` — each shipped flagship as a row (theme override + evidence)
- `projects` — per-client cold-call reveal artifacts
- `tools` — the free AI stack catalog
- `qa_releases` — quality-gate records per release
- `content_fields` — what non-technical staff can swap per client

Row-level security: public read for showcase tables, authenticated write for staff tables.

## The Theme contract

`tokens/theme.ts` exports:

```ts
applyTheme(familyThemes["industry-hospitality"]);
```

This injects CSS variables (`--c-bg`, `--c-accent`, `--font-display`, `--radius`, `--motion-duration`…) so every family gets a distinct personality without touching component code.

## Deploying a flagship

```bash
# Option A: GitHub Pages
cd flagships/meridian-roast
git init && git add . && git commit -m "Meridian Roast"
git push origin main
# Enable GitHub Pages in repo settings → done

# Option B: Vercel
npx vercel --prod
```

## What makes even Starter look finished

1. No lorem ipsum — real or convincingly-mocked data everywhere
2. Every state designed (empty, loading, error, out-of-stock, failed payment)
3. Real micro-interactions (hover, focus, active, disabled)
4. One signature motion per page (cloth shader, barber pole, kinetic core)
5. Reduced-motion path for every cinematic moment
6. Consistent data across product page / cart / structured data
7. Live preview link is the deliverable — not screenshots

## What's next

- Wire the configurator's "Save & Preview" button to the `projects` table
- Add sign-in (Clerk free tier / Supabase Auth) for the staff area
- Add real Stripe Checkout keys per client
- Build the remaining 3 family flagships (Micro Products, Data Dashboards, SaaS/Enterprise)
- Package the 5 Three.js modules as `patterns/3d-*.tsx` with reduced-motion fallbacks
