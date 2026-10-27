/* ════════════════════════════════════════════════════════════════════
   C-WK-4 · Restaurant Kit (Bracera) — 5 authored MDX pages, reservation
   flow, menu schema data, local-SEO pack.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "C-WK-4";

export const files: Record<string, string> = {
  "01-pages/home.mdx": `---
title: "Bracera — coastal Italian on NW Everett"
description: "Wood-fired coastal Italian in Portland's Pearl District. Reservations open 30 days out; the tasting menu drops on Tuesdays."
layout: page
---

<PageHero
  heading="Coastal Italian, cooked over fire"
  sub="A short menu that changes with the boats: crudo, wood-fired catch, handmade pastas, and a vermouth list worth arriving early for."
  primaryCta="Reserve a table"
  primaryHref="/reservations"
  secondaryCta="See the menu"
  secondaryHref="/menu"
/>

<Prose>

## The short version

Bracera is 42 seats around an open hearth. We serve Tuesday through
Saturday, one menu for the room, and the tasting counter for eight
guests a night. The menu changes when the boats land — the version
below is this week's, dated, exactly as printed.

- **Wood-fired, simply.** Olive oil, lemon, fire, salt. If an
  ingredient needs a sauce to be good, we don't serve it.
- **Short menu, long care.** Nine savory plates, four pastas, three
  desserts. Everything on it earns the space.
- **The counter.** Eight seats, five courses, one seating a night —
  booked like a table, priced like dinner (no "experience" markup).

</Prose>

<TestimonialBar
  quote="The crudo, the pasta, the honesty of the menu. This is the restaurant Portland didn't know it was missing."
  author="— The Oregonian, 2026"
/>

<HoursBlock
  lines={[["Tue – Sat", "17:00 – 22:00"], ["Tasting counter", "18:30, one seating"], ["Sunday – Monday", "Closed"]]}
  note="Reservations open 30 days out at 10:00. Walk-ins: the six bar seats, from 17:00."
/>
`,
  "01-pages/menu.mdx": `---
title: "This week's menu — Bracera"
description: "Dated menus from the boats: crudo, hearth plates, handmade pastas, desserts. Allergen keys on every dish; wine and vermouth lists in-house."
layout: page
---

<MenuNote dated="2026-10-26 — week of" note="Menus change with landings; the printed card in the room is the truth. GF = gluten-free available · V = vegetarian · * = contains raw or undercooked elements" />

<MenuSection title="Crudo & cold">
  <Dish name="Scallop crudo" price="21" tags="GF" description="blood orange, castelvetrano olive, chili oil" />
  <Dish name="Beet-cured hamachi" price="19" tags="GF" description="fennel, citrus, fermented chili" />
  <Dish name="Octopus, warm vinaigrette" price="18" tags="GF" description="potato, celery leaf, smoked paprika" />
</MenuSection>

<MenuSection title="From the hearth">
  <Dish name="Whole day-boat fish" price="44" tags="GF" description="for two — olive oil, lemon, charred greens (market price by the boat)" />
  <Dish name="Wood-fired squid" price="26" description="white bean, salsa verde, bread crumbs" />
  <Dish name="Radicchio, burnt honey" price="15" tags="GF, V" description="gorgonzola dolce, hazelnut" />
  <Dish name="Meatballs, Sunday style" price="18" description="veal & pork, soffritto, grilled sourdough" />
</MenuSection>

<MenuSection title="Pasta">
  <Dish name="Bucatini, uni butter" price="29" tags="*" description="sea urchin, calabrian chili, bottarga" />
  <Dish name="Agnolotti, brown butter" price="24" tags="V" description="delicata squash, sage, amaretti" />
  <Dish name="Linguine, alla pescatora" price="31" description="clams, mussels, white wine, no cream — ever" />
  <Dish name="Rigatoni, pork sugo" price="26" description="six-hour sugo, ricotta salata" />
</MenuSection>

<MenuSection title="Dolci">
  <Dish name="Olive oil cake" price="12" description="roasted pear, mascarpone" />
  <Dish name="Affogato" price="9" tags="GF" description="fior di latte, espresso, amaro" />
  <Dish name="Lemon tart, burnt meringue" price="12" tags="V" description="meyer lemon, brown-butter crust" />
</MenuSection>

<Prose>

Allergen key: GF = gluten-free available · V = vegetarian · * =
contains raw or undercooked elements — consuming raw or undercooked
seafood may increase your risk of foodborne illness. Tell the
server about allergies; the kitchen adapts most plates without
drama.

</Prose>
`,
  "01-pages/reservations.mdx": `---
title: "Reservations — Bracera"
description: "42 seats, 30-day booking window, 18:30 tasting counter. Parties of 7+ and the private hearth table book by phone."
layout: page
---

<ReservationForm
  intro="30-day window, released at 10:00 each morning. Parties of 1–6 online; 7+ and the hearth table by phone."
  fields={["party-size", "date", "time", "name", "phone", "notes"]}
  policyNote="Cards hold the table (no charge unless a no-show). Cancel free up to 4 hours before."
/>

<Prose>

## The house rules (short, honest)

1. **We hold the table for 15 minutes.** The room is 42 seats; a
   late table cascades. Call if you're running behind — the kitchen
   flexes more than the seating chart does.
2. **No-shows charge the card 50%** of the tasting price per head.
   Cancel 4+ hours out and it never comes up.
3. **The counter is a table, not an event.** Eight seats, 18:30,
   five courses, priced with the menu. Booked the same way, holds
   the same way.

## Walk-ins

Six bar seats, from 17:00, first-come. The full menu is served at
the bar — including the pasta that's always about to sell out.

</Prose>
`,
  "01-pages/events.mdx": `---
title: "Events & the hearth table — Bracera"
description: "One private table, one seasonal dinner series, and buyouts for 30–42. The honest capacity math is below."
layout: page
---

<Prose>

## The hearth table (10–12)

The room's best seats: a chef's rail beside the open fire, walled
from the main room, served from a family-style menu we write with
you. Thursday–Saturday, one seating, from $95/head (food; wine
pairing optional). Booked by phone after a short menu call.

## Supper club (monthly, 24 seats)

Last Monday of the month, one long table, one region of coastal
Italy per dinner — six courses, $120, wine optional. Dates open
with the 30-day window; the mailing list hears first:
hello@bracera.example.

## Buyouts (30–42)

We close the room to the public and hand you the keys, menu
co-written, bar program included. Pricing from $140/head. Two
buyout slots per month, booked 6+ weeks out — because a buyout
that isn't planned properly punishes everyone's guests.

**The honest capacity math:** 42 seated, 30 for a buyout with
music, 24 for the supper club (the long table eats space). Numbers
above those aren't "cozy" — they're fire-code and kitchen-throughput
facts, and we hold them.

</Prose>
`,
  "01-pages/contact.mdx": `---
title: "Find us — Bracera, NW Everett"
description: "1314 NW Everett St, Portland. Tue–Sat from 17:00. Valet Thu–Sat; street parking otherwise; the Pearl garages are 2 blocks."
layout: page
---

<ContactBlock
  address="1314 NW Everett St, Portland, OR 97209"
  phone="503-555-0182"
  email="hello@bracera.example"
/>

<Prose>

## Hours & access

| Day | Hours |
| --- | --- |
| Tue – Sat | 17:00 – 22:00 (kitchen closes 21:30) |
| Sun – Mon | Closed |

Step-free entry on Everett; the dining room, bar and one accessible
restroom are all on the ground floor. Tell us in the reservation
notes and the corner table by the window is yours.

## Getting here

- **Transit:** MAX Green/Yellow to NW 11th & Couch; the 77 bus stops
  a block away
- **Car:** Street parking on Everett and 13th; the Pearl garages on
  12th are two blocks, ~$4/evening
- **Valet:** Thursday–Saturday from 17:00, $12, at the door

## Large parties & press

Parties of 7+, the hearth table, buyouts and press: call
503-555-0182 between 14:00–17:00, Tuesday–Saturday, or email
hello@bracera.example. Reservations stay online — the phone line is
for the things the form can't hold.

</Prose>
`,

    "02-reservations/reservation-flow.mdx": `## The reservation flow

\`\`\`
step 1: party size (1–6) — 7+ routes to phone with the number shown
step 2: date (30-day window) + available times (17:00/17:30/…/20:30 slots)
step 3: name, phone, card (hold only), notes (allergies, occasions, step-free)
step 4: confirm → SMS + email with the 15-minute hold + 4-hour cancel policy
\`\`\`

## Design rules

1. **Party size first** — it changes availability math (tables of 6
   are scarcer than 2) and routes 7+ to phone instantly, with the
   number visible — no dead end
2. **Card holds, never pre-charges** — stated in the button label:
   "Hold with card — no charge today". The no-show policy is a link
   away, not fine print
3. **Notes field asks for the right things** — allergies, occasions,
   accessibility: the fields that change the experience, and the
   kitchen reads them at prep
4. **Confirmation restates the two policies** — 15-minute hold,
   4-hour free cancel. Restating cuts no-shows; ambiguity raises
   them
5. **Cancel = one tap** in the confirmation (a URL that needs no
   login). Frictionless cancels beat silent no-shows

## States

- Success: SMS + email, calendar file attached
- Fully booked: waitlist offer (date + size remembered, one tap)
- 7+ attempt: phone number rendered LARGE with hours — not an error
`,
  "02-reservations/confirmation-emails.md": `# Confirmation emails — reservation + reminder

## 1 · Reservation confirmation (sends within 60 seconds)

\`\`\`
Subject: Confirmed — {{party}} on {{date}} at {{time}} at Bracera

{{first_name}},

Your table is held. The details that matter:

  Party:   {{party}} guests
  When:    {{date}} at {{time}}
  Where:   1314 NW Everett St, Portland (Pearl District)
  Hold:    we keep the table 15 minutes past {{time}}
  Cancel:  free up to 4 hours before — one tap:
           {{cancel_url}}

Allergies or running late? Reply here or call 503-555-0182 — the
kitchen reads notes at prep.

A presto,
Bracera · 503-555-0182
\`\`\`

**Why it works:** every operational fact in one screen; the cancel
link is IN the email (frictionless cancels beat silent no-shows);
the reply channel is monitored — replies aren't a black hole.

## 2 · Reminder (T-24h, SMS + email)

\`\`\`
Subject: Tomorrow, {{time}} — Bracera

{{first_name}}, tomorrow at {{time}} for {{party}}.

Two things: the bar opens at 17:00 if you're early — the vermouth
list lives there. And if plans changed, cancel free until
{{cutoff}}: {{cancel_url}}

Bracera · 1314 NW Everett St
\`\`\`

**Why it works:** two lines, one useful tip, one cancel link. The
reminder that respects the guest is the reminder that works.

## 3 · Event RSVP confirmation (supper club / hearth table)

\`\`\`
Subject: You're in — {{event_name}}, {{date}}

{{first_name}},

{{event_name}} is confirmed for {{party}}. Doors at 17:30, first
course 18:00 — the long table waits for no straggler (kidding;
we hold 10 minutes, then serve).

Menu notes or allergies: reply here any time before {{date}}.

Bracera · 503-555-0182
\`\`\`
`,
  "03-seo/local-seo-checklist.md": `# Local SEO checklist — restaurants (30 items)

Work top to bottom; Section A is one afternoon, B and C are habits.

## A · Foundations (once, ~3 hours)

- [ ] Google Business Profile claimed; exact NAP everywhere
- [ ] GBP category set correctly — *Restaurant* plus *Italian restaurant*
- [ ] Services/menu in GBP matches the site's wording verbatim
- [ ] Booking/order link in GBP points at the action page, not home
- [ ] Hours in GBP match the site, including nuances (seasonal, by-appointment)
- [ ] 10+ real photos: space, team, exterior with sign visible
- [ ] Restaurant JSON-LD on the homepage (see json-ld.json)
- [ ] robots.txt + sitemap.xml submitted in Search Console
- [ ] Phone number clickable (tel:) above the mobile fold
- [ ] One page per core service/dish section — not a mega-page
- [ ] Internal links from GBP items to the matching site pages
- [ ] Review link shortlinked and printed on the takeaway artifact

## B · Reviews (weekly, 20 min)

- [ ] Every happy customer hears the ask — scripted, never incentivised
- [ ] Every review gets a reply within 48h, referencing one detail
- [ ] Negative reviews: respond with the phone number, take it offline
- [ ] Track review velocity monthly — first thing to dip when the ask stops
- [ ] Food photos in replies where natural — they render in some surfaces

## C · Local signals (monthly, 30 min)

- [ ] NAP audit: Bing, Apple Maps, Yelp, TripAdvisor, OpenTable — identical to the letter
- [ ] One locally-relevant piece per month (neighbourhood + topic)
- [ ] Service/menu pages mention served neighbourhoods in prose (once)
- [ ] GBP Q&A checked weekly — answer unanswered questions with detail
- [ ] Rank tracked at 5-mile radius for the head term
- [ ] Booking/order link re-tested after every site change
- [ ] Fresh photos added to GBP monthly
- [ ] Competitor set (the 3 above you in maps) reviewed for velocity
- [ ] Schema re-validated after any site update
- [ ] Menu prices in schema synced when the menu changes

## The honest note

Local SEO is ~60% reviews, ~25% GBP completeness, 15% everything here.
If time is short: do section B forever and A once.
`,
  "03-seo/json-ld.json": `{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": "https://www.bracera.example/#restaurant",
  "name": "Bracera",
  "description": "Wood-fired coastal Italian in Portland's Pearl District — a short menu that changes with the boats, an eight-seat tasting counter, and a vermouth bar.",
  "url": "https://www.bracera.example/",
  "telephone": "+1-503-555-0182",
  "priceRange": "$$$",
  "servesCuisine": ["Italian", "Seafood"],
  "acceptsReservations": "https://www.bracera.example/reservations",
  "hasMenu": "https://www.bracera.example/menu",
  "menu": "https://www.bracera.example/menu",
  "address": { "@type": "PostalAddress", "streetAddress": "1314 NW Everett St", "addressLocality": "Portland", "addressRegion": "OR", "postalCode": "97209", "addressCountry": "US" },
  "geo": { "@type": "GeoCoordinates", "latitude": 45.5264, "longitude": -122.6821 },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "opens": "17:00", "closes": "22:00" }
  ],
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.7", "reviewCount": "418", "bestRating": "5" },
  "sameAs": ["https://www.instagram.com/bracera.pdx", "https://maps.google.com/?q=Bracera+Portland"]
}
`,
  "03-seo/robots.txt": `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://www.bracera.example/sitemap.xml
`,
  "03-seo/sitemap.xml": `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.bracera.example/</loc><lastmod>2026-10-01</lastmod><priority>1.0</priority></url>
  <url><loc>https://www.bracera.example/menu</loc><lastmod>2026-10-01</lastmod><priority>0.8</priority></url>
  <url><loc>https://www.bracera.example/reservations</loc><lastmod>2026-10-01</lastmod><priority>0.8</priority></url>
  <url><loc>https://www.bracera.example/events</loc><lastmod>2026-10-01</lastmod><priority>0.8</priority></url>
  <url><loc>https://www.bracera.example/contact</loc><lastmod>2026-10-01</lastmod><priority>0.8</priority></url>
</urlset>
`,
  "04-content-model/content-model.md": `# Content model — Bracera

| Page | File | Sections |
| --- | --- | --- |
| Home | \`01-pages/home.mdx\` | PageHero → Prose → TestimonialBar → HoursBlock |
| Menu | \`01-pages/menu.mdx\` | MenuNote → MenuSection ×4 → Prose (allergens) |
| Reservations | \`01-pages/reservations.mdx\` | ReservationForm → Prose (policies, walk-ins) |
| Events | \`01-pages/events.mdx\` | Prose (hearth table, supper club, buyouts) |
| Contact | \`01-pages/contact.mdx\` | ContactBlock → Prose (access, transit) |

## Components

\`\`\`
PageHero            heading · sub · primaryCta · primaryHref · secondaryCta? · secondaryHref?
Prose               children
TestimonialBar      quote · author
HoursBlock          lines[[day, hours]] · note?
MenuNote            dated · note
MenuSection         title · wraps Dish
Dish                name · price · tags? · description
ReservationForm     intro · fields[] · policyNote
ContactBlock        address · phone · email
\`\`\`

## Rules that are load-bearing here

- **Menus are dated** — MenuNote.dated renders on page; an undated
  menu is a broken promise in this segment
- **Dish tags** use the allergen key (GF/V/*) and NOTHING else —
  marketing tags poison the trust the key builds
- **Prices as integers** (dollars, no decimals) — matches the
  menu-data schema and renders cleanly on mobile
- The raw-seafood disclosure is required wherever * dishes appear
`,
  "04-content-model/menu-data.mdx": `# Menu data — structured schema + this week's export

The canonical menu schema (what \`Dish\` serialises to; what the
JSON-LD \`hasMenu\` can be generated from):

\`\`\`json
{
  "week": "2026-W44",
  "sections": [
    {
      "title": "Crudo & cold",
      "dishes": [
        { "name": "Scallop crudo", "price": 21, "tags": ["GF"],
          "description": "blood orange, castelvetrano olive, chili oil" }
      ]
    }
  ]
}
\`\`\`

## This week's full export (2026-W44)

\`\`\`json
{
  "week": "2026-W44",
  "sections": [
    { "title": "Crudo & cold", "dishes": [
      { "name": "Scallop crudo", "price": 21, "tags": ["GF"], "description": "blood orange, castelvetrano olive, chili oil" },
      { "name": "Beet-cured hamachi", "price": 19, "tags": ["GF"], "description": "fennel, citrus, fermented chili" },
      { "name": "Octopus, warm vinaigrette", "price": 18, "tags": ["GF"], "description": "potato, celery leaf, smoked paprika" }
    ] },
    { "title": "From the hearth", "dishes": [
      { "name": "Whole day-boat fish (for two)", "price": 44, "tags": ["GF"], "description": "olive oil, lemon, charred greens — market price by the boat" },
      { "name": "Wood-fired squid", "price": 26, "tags": [], "description": "white bean, salsa verde, bread crumbs" },
      { "name": "Radicchio, burnt honey", "price": 15, "tags": ["GF", "V"], "description": "gorgonzola dolce, hazelnut" },
      { "name": "Meatballs, Sunday style", "price": 18, "tags": [], "description": "veal & pork, soffritto, grilled sourdough" }
    ] },
    { "title": "Pasta", "dishes": [
      { "name": "Bucatini, uni butter", "price": 29, "tags": ["*"], "description": "sea urchin, calabrian chili, bottarga" },
      { "name": "Agnolotti, brown butter", "price": 24, "tags": ["V"], "description": "delicata squash, sage, amaretti" },
      { "name": "Linguine, alla pescatora", "price": 31, "tags": [], "description": "clams, mussels, white wine, no cream — ever" },
      { "name": "Rigatoni, pork sugo", "price": 26, "tags": [], "description": "six-hour sugo, ricotta salata" }
    ] },
    { "title": "Dolci", "dishes": [
      { "name": "Olive oil cake", "price": 12, "tags": [], "description": "roasted pear, mascarpone" },
      { "name": "Affogato", "price": 9, "tags": ["GF"], "description": "fior di latte, espresso, amaro" },
      { "name": "Lemon tart, burnt meringue", "price": 12, "tags": ["V"], "description": "meyer lemon, brown-butter crust" }
    ] }
  ]
}
\`\`\`

## Weekly update ritual (10 minutes)

1. Boats land Tuesday → chef marks changes on the printed card
2. Update this file (it IS the source of truth; the MDX renders from
   it) — re-date MenuNote
3. Regenerate the page; the date on-page updates automatically
4. Menu prices change? The JSON-LD priceRange is the only other
   place to touch
`,
  "05-deploy/deploy-guide.md": `# Deploy guide — Restaurant Kit

The kit is MDX pages + static assets; any Next.js MDX setup runs it.

## The 45-minute path

1. **Create the project** (10 min) — drop \`01-pages/*.mdx\` into the
   content folder; map each to a route
2. **Register the components** (10 min) — every component in
   content-model.md wired into the MDX provider (~120 lines)
3. **Swap the sample data** (15 min) — grep \`Bracera\` to catch every
   fictional value; the content model marks them all
4. **Wire the form** (5 min) — flow spec is in \`02-*/…-flow.mdx\`;
   a working phone beats a broken form on day one
5. **Deploy** (5 min) — GitHub → Vercel → custom domain, HTTPS auto

## Post-deploy checklist

- [ ] sitemap.xml + robots.txt in \`public/\` (from \`03-seo/\`)
- [ ] JSON-LD sample values swapped for the real ones; Rich Results
      Test passes
- [ ] Sitemap submitted; GBP claimed; appointment link → the form page
- [ ] Form flow tested end-to-end on a real phone
- [ ] Local-SEO checklist Section A run once, fully

## Support

support@omniforge.example — 30-day money-back guarantee.
`,
  "05-deploy/walkthrough-link.md": `# Walkthrough

A 9-minute video build of this exact kit, empty repo → deployed site:

**→ https://omniforge.example/walkthroughs/C-WK-4**

Contents:
- 00:00 — What's in the kit (and what's deliberately not)
- 01:00 — Pages, components, the content model
- 02:45 — Swapping the sample data the honest way
- 04:30 — The reservation flow: spec → working form
- 06:15 — SEO pack: JSON-LD, sitemap, the checklist's 80/20
- 07:50 — Deploy + post-deploy checklist

Hosted (not bundled) so the kit stays under 200 KB.
`,
  "EXTENDED-PACK/online-ordering-wireframes.md": `# Online ordering wireframes — in production

Status: **in production** — not in this archive.

What the finished file will contain: wireframes for an add-on
online-ordering flow — menu cart from the same menu-data schema,
checkout with time-slot selection, kitchen ticket views, and a
"hearth-first" positioning note (ordering supplements the room,
never competes with it).
`,
};

export const demo: DemoContent = {
  kind: "site",
  siteName: "Bracera",
  vertical: "restaurant",
  intro:
    "Tour the five authored pages of the Restaurant Kit — then book a table through the reservation flow. The tour renders the kit's real MDX copy, menu included.",
  pages: [
    { id: "home", title: "Home", sections: [
      { kind: "hero", heading: "Coastal Italian, cooked over fire", copy: "A short menu that changes with the boats: crudo, wood-fired catch, handmade pastas, and a vermouth list worth arriving early for. 42 seats around an open hearth, Tue–Sat." },
      { kind: "proof", heading: "4.7 stars · 418 reviews", copy: "\"The crudo, the pasta, the honesty of the menu. This is the restaurant Portland didn't know it was missing.\" — The Oregonian, 2026" },
      { kind: "hours", heading: "Hours", copy: "Tue–Sat 17:00–22:00 · tasting counter 18:30, one seating · closed Sun–Mon. Reservations open 30 days out at 10:00; six walk-in bar seats from 17:00." },
    ] },
    { id: "menu", title: "This week's menu", sections: [
      { kind: "hero", heading: "Week of 2026-10-26", copy: "Menus change with landings; the printed card in the room is the truth. Allergen key on every dish: GF · V · * (raw or undercooked elements)." },
      { kind: "services", heading: "From the boats & the hearth", copy: "Scallop crudo 21 · beet-cured hamachi 19 · whole day-boat fish for two 44 · wood-fired squid 26 · radicchio with burnt honey 15. Pastas: bucatini with uni butter 29 · linguine alla pescatora 31 — no cream, ever." },
      { kind: "gallery", heading: "Dolci", copy: "Olive oil cake 12 · affogato 9 · lemon tart with burnt meringue 12." },
    ] },
    { id: "reservations", title: "Reservations", sections: [
      { kind: "booking", heading: "30-day window, released at 10:00", copy: "Parties of 1–6 online; 7+ and the hearth table by phone. Cards hold the table (no charge unless a no-show); cancel free up to 4 hours before. The counter is a table, not an event." },
      { kind: "hours", heading: "Walk-ins", copy: "Six bar seats from 17:00, first-come. The full menu is served at the bar — including the pasta that's always about to sell out." },
    ] },
    { id: "events", title: "Events", sections: [
      { kind: "services", heading: "The hearth table · supper club · buyouts", copy: "Hearth table for 10–12 beside the open fire, from $95/head, menu co-written. Monthly supper club: 24 seats, one region of coastal Italy, six courses, $120. Buyouts 30–42 from $140/head, two slots monthly — the capacity math is fire-code fact, not coziness." },
    ] },
    { id: "contact", title: "Find us", sections: [
      { kind: "hours", heading: "1314 NW Everett St, Portland", copy: "Step-free entry; ground-floor room and accessible restroom. MAX Green/Yellow to NW 11th & Couch. Valet Thu–Sat from 17:00, $12. Large parties & press: 503-555-0182, 14:00–17:00." },
    ] },
  ],
  bookingFields: [
    { key: "party", label: "Party size", type: "select", options: ["1", "2", "3", "4", "5", "6", "7+ (we'll call)"] },
    { key: "date", label: "Date", type: "text" },
    { key: "time", label: "Time", type: "select", options: ["17:00", "17:30", "18:30", "19:30", "20:30"] },
    { key: "name", label: "Name", type: "text" },
    { key: "phone", label: "Phone", type: "tel" },
    { key: "notes", label: "Allergies, occasions, step-free?", type: "text" },
  ],
};
