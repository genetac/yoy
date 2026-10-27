/* ════════════════════════════════════════════════════════════════════
   C-WK-1 · Dental Practice Kit — reference kit (website-kit pipeline)
   5 authored MDX pages, booking flow + confirmation emails, local-SEO
   pack, content model, deploy guide. Same pages power the Try-it tour.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "C-WK-1";

const FM = (title: string, description: string) =>
  `---\ntitle: "${title}"\ndescription: "${description}"\nlayout: page\n---\n\n`;

export const files: Record<string, string> = {
  "01-pages/home.mdx": FM(
    "Brightline Dental — Gentle, modern dentistry in Portland",
    "Same-week appointments, transparent pricing and a 10-year implant guarantee. Meet the practice patients rate 4.9 stars."
  ) + `<PageHero
  heading="Dentistry that respects your time"
  sub="Same-week appointments. Transparent pricing before we start. A team that explains everything — including what not to spend on."
  primaryCta="Book a visit"
  primaryHref="/contact"
  secondaryCta="See treatments & prices"
  secondaryHref="/services"
/>

<Prose>

## Why patients stay

Two-thirds of our new patients come from referrals. That number is
the whole strategy: we'd rather earn the next visit than sell this
one.

- **Appointments that start on time.** Our average wait is under 7
  minutes — you can see it live on our Google listing.
- **Prices you see before we begin.** Every treatment page lists a
  from-price and what changes it. No surprise line items.
- **Anxiety-friendly by design.** Noise-cancelling headphones, a
  signal-to-pause system we actually honour, and sedation options
  when you need them.

</Prose>

<ServiceGrid
  services={[
    { name: "Check-ups & hygiene", price: "from $89", href: "/services#hygiene" },
    { name: "Dental implants", price: "from $3,400", href: "/services#implants" },
    { name: "Cosmetic dentistry", price: "from $290", href: "/services#cosmetic" },
    { name: "Emergency care", price: "from $120", href: "/services#emergency" }
  ]}
/>

<TestimonialBar
  quote="They told me what I didn't need before what I did. I've sent four friends."
  author="Dana R., patient since 2023"
/>

<HoursBlock
  lines={[
    ["Mon – Thu", "7:30 – 18:00"],
    ["Friday", "8:00 – 15:00"],
    ["Saturday", "9:00 – 13:00 (hygiene only)"],
    ["Sunday", "Closed"]
  ]}
  note="Early mornings and Saturday slots exist for people who can't leave work — book 2–3 weeks ahead."
/>

<InsuranceStrip insurers={["Delta Dental", "Cigna", "Aetna", "MetLife", "Principal"]} note="+ in-network maximisation on every plan we accept" />
`,

  "01-pages/services.mdx": FM(
    "Treatments & prices — Brightline Dental",
    "Every treatment with a from-price, what changes it, and how many visits to expect. No surprise line items."
  ) + `<Prose>

## Prices, in the open

We list from-prices because that's what you actually want to know.
Each treatment below says exactly what moves the number — so the
estimate you get at the consultation matches this page.

</Prose>

<ServiceSection id="hygiene" name="Check-ups & hygiene" from="$89" visits="1 visit · 45 min">
  Comprehensive exam, x-rays when clinically needed, and a hygiene
  appointment with a gum-health score you get to keep. What moves the
  price: first-visit x-rays (+$40–60) and deep cleaning when gum
  measurements call for it (quoted separately, always before we start).
</ServiceSection>

<ServiceSection id="implants" name="Dental implants" from="$3,400" visits="3–4 visits over 3–6 months">
  Titanium root plus porcelain crown, with a **10-year guarantee**
  covering the fixture. What moves the price: bone grafting when the
  jaw needs width (+$600–1,200), and the crown material. The
  consultation is free and includes a 3D scan — you leave with a
  written plan and a fixed price, valid 60 days.
</ServiceSection>

<ServiceSection id="cosmetic" name="Cosmetic dentistry" from="$290" visits="1–2 visits">
  Whitening, bonding, and veneer consultations that start with a
  photo-simulation instead of a sales pitch. We'll tell you when
  whitening alone gets you 80% of the result. What moves the price:
  in-surgery vs home whitening, and veneer count.
</ServiceSection>

<ServiceSection id="emergency" name="Emergency care" from="$120" visits="same-day slots held daily">
  We hold two emergency slots every weekday. Call before 10:00 and
  we'll see you the same day. What moves the price: whether the visit
  resolves the pain (most do) or schedules the follow-up treatment.
</ServiceSection>

<FAQAccordion
  items={[
    { q: "Do these prices include everything?", a: "The from-price includes the standard visit. Anything beyond it is quoted in writing before it happens — that's a policy, not a courtesy." },
    { q: "Payment plans?", a: "Yes — 0% interest over 3–12 months on treatment over $500, via our finance partner. The implant page has the monthly math worked out." },
    { q: "What if I need less than you quoted?", a: "You pay the lower amount. Quotes are ceilings, not targets." }
  ]}
/>
`,

  "01-pages/about.mdx": FM(
    "About Brightline Dental",
    "Founded 2016. Patient-first dentistry with published prices, honest treatment planning and a 4.9-star average across 800+ reviews."
  ) + `<PageHero heading="Built around the appointment you'd want" sub="Brightline opened in 2016 with one rule: explain everything, including what not to spend on." />

<Prose>

## The practice

Brightline Dental is an independent practice in Portland's Pearl
District — two treatment rooms, one surgeon, one hygienist team, and
a front desk that answers the phone. We chose small on purpose: the
dentist who plans your treatment is the dentist who does it.

## What we believe

1. **Published prices are a trust decision.** You found us through
   reviews, not a discount funnel; the least we can do is show you
   numbers.
2. **The best treatment plan is the smallest one that works.** Our
   treatment planning template literally has a "what we're NOT
   recommending and why" field.
3. **Anxious patients are the norm, not the exception.** Roughly
   40% of new patients tell us they're nervous. The pause signal,
   the headphones and the sedation options aren't extras — they're
   the baseline.

## The numbers

- 4.9-star average across 800+ patient reviews
- 89% of treatment plans accepted without a second visit
- Under 7-minute average wait, tracked monthly

## The building

Ground-floor, step-free access on NW 13th. Same-block parking, bike
racks at the door, and the Green/Yellow line two blocks away.

</Prose>
`,

  "01-pages/team.mdx": FM(
    "Meet the team — Brightline Dental",
    "Dr. Elena Marsh, DDS and the Brightline team. Credentials, specialties and the people you'll actually meet."
  ) + `<TeamGrid>
  <TeamMember
    name="Dr. Elena Marsh, DDS"
    role="Principal dentist · implants & restorative"
    image="/images/team/dr-marsh.jpg"
    bio="NYU College of Dentistry, 2009. Fifteen years in restorative work, 600+ implant placements, and the author of our treatment-planning policy — including the 'what we're not recommending' field. Teaches a monthly anxious-patient clinic."
    credentials={["DDS, NYU 2009", "Fellow, International Congress of Oral Implantologists", "Invisalign-certified provider"]}
  />
  <TeamMember
    name="Jonah Reyes, RDH"
    role="Lead hygienist · periodontal health"
    image="/images/team/jonah-reyes.jpg"
    bio="Twelve years in hygiene, and the reason our gum-health scores go home with patients. Runs the Saturday hygiene clinic and our in-office whitening program."
    credentials={["RDH, Pacific University 2013", "Certified in laser periodontal therapy"]}
  />
  <TeamMember
    name="Amara Okafor"
    role="Patient care coordinator"
    image="/images/team/amara-okafor.jpg"
    bio="The voice that answers before 10am, holds the daily emergency slots, and knows every insurance plan we accept by its exclusions, not its logo. Ask her about payment plans — she built the cheat sheet."
    credentials={["Insurance maximisation certified", "Fluent in Spanish & English"]}
  />
  <TeamMember
    name="Dr. Sofia Brandt, DMD"
    role="Associate dentist · cosmetic & preventive"
    image="/images/team/dr-brandt.jpg"
    bio="University of Oregon DMD, 2018. Leads our cosmetic consults and the photo-simulation-first policy. Her whitening-vs-veneer honesty has been quoted in more than one review."
    credentials={["DMD, University of Oregon 2018", "AACD member"]}
  />
</TeamGrid>

<Prose>

## Who you'll actually meet

Two dentists, one hygiene team, one coordinator: five people, no
rotating cast. If you're a nervous patient, note that we assign the
same dentist from consult to completion — continuity is a clinical
decision, not a scheduling accident.

</Prose>
`,

  "01-pages/contact.mdx": FM(
    "Book a visit — Brightline Dental, Portland",
    "Same-week appointments, two emergency slots held daily, and a form that takes 60 seconds. 1213 NW 13th Ave, Portland."
  ) + `<BookingForm
  intro="Tell us what you need and when. We confirm by text within one business hour — and we never call to 'follow up' unless you ask."
  fields={["name", "phone", "reason", "preferred-time"]}
  emergencyNote="In pain right now? Call 503-555-0164 — two emergency slots are held every weekday."
/>

<Prose>

## Where we are

**1213 NW 13th Ave, Portland, OR 97209** — ground floor, step-free.
Same-block parking (validated), bike racks at the door, MAX Green &
Yellow to NW 12th & Glisan.

## Hours

| Day | Hours |
| --- | --- |
| Mon – Thu | 7:30 – 18:00 |
| Friday | 8:00 – 15:00 |
| Saturday | 9:00 – 13:00 (hygiene only) |
| Sunday | Closed |

## Insurance

In-network with Delta Dental, Cigna, Aetna, MetLife and Principal —
and we run a maximisation check on every plan we accept, including
yours, before the first appointment. No insurance? Ask for the
member pricing sheet; it's the same prices, minus the paperwork.

</Prose>
`,

  "02-booking/booking-flow.mdx": FM(
    "Booking flow — spec",
    "The appointment flow shipped in this kit: fields, validation, states and confirmation copy."
  ) + `## The flow

\`\`\`
choice: reason (exam | hygiene | implant consult | cosmetic | emergency)
   ↓
details: name, phone, preferred time (morning | afternoon | first available)
   ↓
submit → "Request received" state (no email required)
   ↓
SMS + email confirmation (see confirmation-emails.md)
\`\`\`

## Why this shape

1. **Reason first** — it routes the request (implant consults get the
   3D-scan slot; emergencies get the held slots).
2. **Phone, not email-first** — 78% of dental bookings that convert
   do so by text or call. Email is captured at the practice, not the
   form.
3. **Preferred time as a 3-option choice** — free-text time fields
   generate un-answerable requests ("next Tuesday sometime morning or
   maybe Thursday").

## Form rules

- Every field inline-validated on blur; errors in plain language
  ("Add a phone number so we can confirm by text")
- Submit disabled until valid — never punish with a submit-then-error
- After submit: optimistic "Request received — we confirm within one
  business hour" with the practice phone number visible
- No account, no password, no newsletter checkbox. Bookings are not
  a marketing funnel.

## Spam

A honeypot field (hidden, \`tabindex=-1\`, named \`company\`) plus
rate-limit 3 per phone per day. No CAPTCHA — the practice phone
number is public anyway; the cost of a fake booking is one held slot.

## Embedding

The flow is a self-contained component (\`BookingForm\`) driven by the
\`fields\` prop — see content-model.md for the component contract.
`,

  "02-booking/confirmation-emails.md": `# Confirmation emails — appointment + reminder

Two emails ship with the booking flow. Both are plain-text-first
(mobile carriers and spam filters both prefer it), with the practice
signature block as the only formatting.

## 1 · Confirmation (sends within 60 seconds of booking)

\`\`\`
Subject: Confirmed: {{day}}, {{date}} at {{time}} — Brightline Dental

Hi {{first_name}},

You're booked. Here's everything in one place:

  When:    {{day}}, {{date}} at {{time}}
  Where:   1213 NW 13th Ave, Portland (ground floor, step-free)
  Parking: Same-block lot — we validate
  With:    {{dentist_name}}

Your visit: {{reason_label}}. Plan for {{duration_minutes}} minutes.

Need to move it? Reply to this email or call 503-555-0164 before
{{cutoff_time}} the day before — no fee, no guilt.

— The Brightline team
  503-555-0164 · brightlinedental.example
\`\`\`

**Why it works:** every logistical answer in one screen (time, place,
parking, duration, who), the reschedule path is stated *before* it's
needed, and "no fee, no guilt" kills the no-show's best excuse —
anxiety about calling.

## 2 · Reminder (sends 24h before)

\`\`\`
Subject: Tomorrow at {{time}} — Brightline Dental

Hi {{first_name}}, tomorrow at {{time}}.

Two things worth knowing:
1. If it's your first visit, bring your insurance card (if using one)
   — otherwise, just yourself.
2. Running early or late? Call 503-555-0164 and we'll flex within
   the hour.

See you tomorrow,
Brightline Dental · 1213 NW 13th Ave
\`\`\`

**Why it works:** two bullets, zero marketing, one phone number. The
goal is attendance, not engagement.

## Anti-no-show stack (already configured)

- T-24h reminder (this email) — cuts no-shows ~35% on its own
- T-2h SMS (single line: "Today {{time}} — Brightline. Reply R to
  reschedule.") — another ~15%
- Confirmation email states the reschedule policy up front
`,

  "03-seo/local-seo-checklist.md": `# Local SEO checklist — dental practices (33 items)

Work top to bottom. Section A is one afternoon; B and C are monthly
habits. Every item is either done or not — no "partially".

## A · Foundations (do once, ~3 hours)

- [ ] Google Business Profile claimed, with the exact practice name
      used consistently everywhere (NAP: name, address, phone)
- [ ] GBP category set to *Dentist* + secondary *Cosmetic dentist*,
      *Emergency dental service* if offered
- [ ] GBP services list matches the services page verbatim (names,
      not paraphrases)
- [ ] Appointment link in GBP points at the booking page, not the
      homepage
- [ ] Practice hours in GBP match the site (including the Saturday
      nuance — "hygiene only" belongs in the hours note)
- [ ] 10+ real photos: reception, treatment rooms, the team, the
      building exterior with the sign visible
- [ ] LocalBusiness + Dentist JSON-LD (see json-ld.json) on the
      homepage — address, geo, hours, priceRange
- [ ] /services page lists from-prices (priceRanges in schema match)
- [ ] robots.txt + sitemap.xml submitted in Search Console (files in
      this folder)
- [ ] Site displays phone number as clickable tel: link above the
      fold on mobile
- [ ] One page per core treatment (implants, hygiene, cosmetic,
      emergency) — not one "services" mega-page
- [ ] Treatment pages internally linked from GBP service items

## B · Reviews (weekly, 20 minutes)

- [ ] Review link shortlinked (e.g. brightlinedental.example/review)
      and printed on the aftercare card
- [ ] Every patient leaving the front desk hears the ask — script:
      "If the visit earned it, a Google review helps neighbours find
      us" (never incentivise; it violates GBP policy)
- [ ] Reply to every review within 48h — 2 sentences, reference one
      detail from the visit
- [ ] Negative reviews: respond with the phone number, take the
      conversation offline, never dispute details publicly
- [ ] Track review velocity (reviews/month) — it's a top-3 local
      ranking factor and the first thing to dip when the ask stops

## C · Local signals (monthly, 30 minutes)

- [ ] NAP audit: Bing Places, Apple Maps, Yelp, Healthgrades,
      ZocDoc — identical to the letter, including "Ave" vs "Avenue"
- [ ] Local citations consistent (chamber of commerce, local
      directories)
- [ ] One locally-relevant piece per month (e.g. "Cost of dental
      implants in Portland — 2026 edition") — local + topical, not
      keyword spam
- [ ] Treatment pages mention the neighbourhoods you actually serve
      (once, in prose — not a footer list of 30 cities)
- [ ] Check GBP Q&A weekly; answer unanswered questions with real
      detail (they rank)
- [ ] Monitor position for "dentist near me" set at 5-mile radius in
      a rank tracker (any tool — this is the one metric)
- [ ] Verify the booking link still works after any site change (a
      broken booking link silently burns the whole stack)
- [ ] Add post-visit photos to GBP monthly (fresh media signals)
- [ ] Review the competitor set: the 3 practices above you in maps —
      their review count, velocity, and photo freshness
- [ ] Confirm schema still validates after site updates (Rich
      Results Test)

## The honest note

Local SEO for dental is 60% reviews, 25% GBP completeness, 15%
everything on this page. If time is short, do section B forever and
A once; C can wait a quarter.
`,

  "03-seo/json-ld.json": `{
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": "https://www.brightlinedental.example/#practice",
  "name": "Brightline Dental",
  "description": "Independent dental practice in Portland's Pearl District — published prices, same-week appointments, and a 10-year implant guarantee.",
  "url": "https://www.brightlinedental.example/",
  "telephone": "+1-503-555-0164",
  "priceRange": "$$",
  "image": "https://www.brightlinedental.example/images/og/practice.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1213 NW 13th Ave",
    "addressLocality": "Portland",
    "addressRegion": "OR",
    "postalCode": "97209",
    "addressCountry": "US"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 45.5301, "longitude": -122.6832 },
  "hasMap": "https://maps.google.com/?q=Brightline+Dental,+1213+NW+13th+Ave,+Portland,+OR",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"], "opens": "07:30", "closes": "18:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "08:00", "closes": "15:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "13:00" }
  ],
  "areaServed": { "@type": "City", "name": "Portland" },
  "sameAs": [
    "https://www.google.com/maps/place/?q=Brightline+Dental+Portland",
    "https://www.facebook.com/brightlinedental"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "812",
    "bestRating": "5"
  },
  "availableService": [
    { "@type": "MedicalProcedure", "name": "Dental implants", "url": "https://www.brightlinedental.example/services#implants" },
    { "@type": "MedicalProcedure", "name": "Check-ups & hygiene", "url": "https://www.brightlinedental.example/services#hygiene" },
    { "@type": "MedicalProcedure", "name": "Cosmetic dentistry", "url": "https://www.brightlinedental.example/services#cosmetic" },
    { "@type": "MedicalProcedure", "name": "Emergency dental care", "url": "https://www.brightlinedental.example/services#emergency" }
  ]
}
`,

  "03-seo/robots.txt": `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://www.brightlinedental.example/sitemap.xml
`,

  "03-seo/sitemap.xml": `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://www.brightlinedental.example/</loc><lastmod>2026-10-01</lastmod><priority>1.0</priority></url>
  <url><loc>https://www.brightlinedental.example/services</loc><lastmod>2026-10-01</lastmod><priority>0.9</priority></url>
  <url><loc>https://www.brightlinedental.example/services#implants</loc><lastmod>2026-10-01</lastmod><priority>0.8</priority></url>
  <url><loc>https://www.brightlinedental.example/about</loc><lastmod>2026-10-01</lastmod><priority>0.7</priority></url>
  <url><loc>https://www.brightlinedental.example/team</loc><lastmod>2026-10-01</lastmod><priority>0.6</priority></url>
  <url><loc>https://www.brightlinedental.example/contact</loc><lastmod>2026-10-01</lastmod><priority>0.9</priority></url>
</urlset>
`,

  "04-content-model/content-model.md": `# Content model — Brightline Dental

Every page, section and component in this kit, and the fields each
one owns. Edit copy in \`01-pages/*.mdx\`; the model below is the map.

## Pages

| Page | File | Sections (in order) |
| --- | --- | --- |
| Home | \`01-pages/home.mdx\` | PageHero → Prose → ServiceGrid → TestimonialBar → HoursBlock → InsuranceStrip |
| Services | \`01-pages/services.mdx\` | Prose → ServiceSection ×4 → FAQAccordion |
| About | \`01-pages/about.mdx\` | PageHero → Prose |
| Team | \`01-pages/team.mdx\` | TeamGrid → Prose |
| Contact | \`01-pages/contact.mdx\` | BookingForm → Prose (location/hours/insurance) |

## Components & their fields

\`\`\`
PageHero       heading · sub · primaryCta · primaryHref · secondaryCta? · secondaryHref?
Prose          children (markdown)
ServiceGrid    services[{ name · price · href }]
ServiceSection id · name · from · visits · children (markdown: what's included + what moves the price)
FAQAccordion   items[{ q · a }]
TestimonialBar quote · author
HoursBlock     lines[[day, hours]] · note?
InsuranceStrip insurers[] · note?
TeamGrid       wraps TeamMember
TeamMember     name · role · image · bio · credentials[]
BookingForm    intro · fields[] · emergencyNote?
\`\`\`

## Field-level rules

- **Prices**: always "from $X" — matches the priceRange policy and
  the schema's \`priceRange\`. Never bare numbers (they read as
  quotes, not anchors).
- **Hours**: strings exactly as they should render; HoursBlock owns
  the note field for nuance ("hygiene only").
- **Team bios**: 40–70 words, one credential-flavoured sentence, one
  human sentence. No third-person puffery.
- **ServiceSection children**: mandatory structure — what's included,
  then "What moves the price:" (the phrase is load-bearing: it's why
  estimates match the page).

## Copy conventions

- US English, sentence case headings, no exclamation marks
- Phone number always tel:-linked: 503-555-0164
- Address always the full form with the accessibility note once per
  page max (Contact owns the full block)
- Sample-data honesty: names/numbers here are clearly fictional
  (555 numbers) — swap in the real practice's before launch
`,

  "04-content-model/insurance-faq.mdx": FM(
    "Insurance & payment — Brightline Dental",
    "Which plans we accept, how maximisation works, and what things cost without insurance."
  ) + `<Prose>

## Insurance, plainly

We're in-network with **Delta Dental, Cigna, Aetna, MetLife and
Principal**. Before your first visit we run a maximisation check —
which procedures your plan covers this benefit year, at what
percentage, and what your remaining deductible is. You get that in
writing before anything is scheduled.

</Prose>

<FAQAccordion
  items={[
    { q: "What if you're out of network for my plan?", a: "We'll still file the claim for you. Out-of-network reimbursement is usually 10–30% lower — we'll estimate the difference in writing before you decide anything." },
    { q: "Do you take DCO/Medicaid plans?", a: "Not currently. The Oregon Dental Association maintains a live list of practices that do — we'll help you find one, even though it costs us the visit." },
    { q: "No insurance — what do I actually pay?", a: "The same from-prices on the services page, minus the paperwork. Ask for the member pricing sheet at the front desk — it's one page, no membership program, no gimmick." },
    { q: "Payment plans?", a: "0% interest over 3–12 months on any treatment over $500, through our finance partner. Approval takes about four minutes and doesn't affect your credit score to check." },
    { q: "What does 'maximisation' mean?", a: "Timing procedures against your benefit year so you use what you've already paid for. Example: split a treatment across December and January to use two years' of coverage instead of one." },
    { q: "Hidden fees I should ask about?", a: "There's a checklist question for this on purpose: our answer is that the written estimate is the ceiling. If the treatment turns out smaller, you pay less." },
    { q: "Emergency visit — insurance later?", a: "Yes. We'll treat first and file after; the front desk photographs your card on arrival if you have one." },
    { q: "Do you charge for cancelled appointments?", a: "No fee if you let us know by phone or reply before close of business the day before. The confirmation email says this too — no fine print exceptions." },
    { q: "Implant guarantee — what's covered?", a: "The fixture is guaranteed 10 years. If it fails in that window, we replace it — parts and labour. The written warranty ships with your treatment plan." },
    { q: "Can I get a second opinion from you?", a: "Gladly. Bring the other plan; we'll compare it line by line with ours and tell you honestly if theirs is better for you. It sometimes is." }
  ]}
/>
`,

  "05-deploy/deploy-guide.md": `# Deploy guide — Dental Practice Kit

This kit is MDX pages + static assets. Any Next.js MDX setup runs it;
the fastest path is Vercel.

## The 45-minute path

1. **Create the project** (10 min) — the kit's content model expects
   a Next.js App Router site with MDX. Drop \`01-pages/*.mdx\` into
   \`src/content/pages/\` and map each to a route, or use the starter
   referenced in the walkthrough video.
2. **Register the components** (10 min) — every component in
   content-model.md (\`PageHero\`, \`ServiceSection\`, …) needs an MDX
   provider mapping. The reference implementation is ~120 lines; the
   component contract (props in, semantic HTML out) is in the model
   doc.
3. **Swap the sample data** (15 min) — practice name, address,
   phone, hours, insurers, team bios, from-prices. The content model
   marks every fictional value (555 numbers, sample names). Grep for
   \`Brightline\` to catch them all.
4. **Wire the booking form** (5 min) — the flow spec is in
   \`02-booking/booking-flow.mdx\`: reason → details → optimistic
   confirmation. Point the submit at your handler (or the practice
   SMS number to start — a working phone beats a broken form).
5. **Deploy** (5 min) — push to GitHub → import to Vercel → add the
   custom domain. HTTPS is automatic.

## Post-deploy checklist

- [ ] \`/sitemap.xml\` and \`/robots.txt\` resolve (they're in
      \`03-seo/\` — copy them to \`public/\`)
- [ ] Replace the JSON-LD sample values (name, geo, phone, rating)
      with the real practice's — then validate with the Rich Results
      Test
- [ ] Submit the sitemap in Search Console; claim the GBP and point
      its appointment link at \`/contact\`
- [ ] Test the booking flow end to end on a real phone
- [ ] Run the local-SEO checklist section A once, fully

## Customising beyond copy

The content model is the contract: pages compose components; cards
never invent fields. If you need a new section type, add it to the
model first, then the component — the discipline is what keeps the
site editable by non-developers a year from now.

## Support

support@omniforge.example — 30-day money-back guarantee.
`,

  "05-deploy/walkthrough-link.md": `# Walkthrough

A 9-minute video build of this exact kit, from empty repo to
deployed site:

**→ https://omniforge.example/walkthroughs/C-WK-1**

Contents:
- 00:00 — What's in the kit (and what's deliberately not)
- 01:00 — Pages, components and the content model
- 02:45 — Swapping the sample data the honest way
- 04:30 — The booking flow: spec → working form
- 06:15 — SEO pack: JSON-LD, sitemap, the checklist's 80/20
- 07:50 — Deploy + the post-deploy checklist

Hosted (not bundled) so the kit stays under 200 KB.
`,

  "EXTENDED-PACK/patient-portal-wireframes.md": `# Patient portal wireframes — in production

Status: **in production** — not in this archive.

What the finished file will contain: wireframes and component specs
for an optional secure patient portal — login, form history, visit
summaries, document upload — with accessibility annotations and a
data-minimisation review (what the practice stores vs what it
merely displays).
`,
};

export const demo: DemoContent = {
  kind: "site",
  siteName: "Brightline Dental",
  vertical: "dental",
  intro:
    "Take the 25-second tour of the five authored pages — then submit the booking form. The tour pages are the kit's real MDX copy.",
  pages: [
    {
      id: "home",
      title: "Home",
      sections: [
        { kind: "hero", heading: "Dentistry that respects your time", copy: "Same-week appointments. Transparent pricing before we start. A team that explains everything — including what not to spend on." },
        { kind: "services", heading: "Why patients stay", copy: "Two-thirds of new patients come from referrals. Appointments start on time (under 7-minute average wait), prices are visible before we begin, and anxious patients get headphones, a pause signal and sedation options." },
        { kind: "proof", heading: "4.9 stars · 812 reviews", copy: "\"They told me what I didn't need before what I did. I've sent four friends.\" — Dana R., patient since 2023" },
        { kind: "hours", heading: "Hours", copy: "Mon–Thu 7:30–18:00 · Fri 8:00–15:00 · Sat 9:00–13:00 (hygiene only) · Early mornings and Saturday slots exist for people who can't leave work." },
      ],
    },
    {
      id: "services",
      title: "Treatments & prices",
      sections: [
        { kind: "hero", heading: "Prices, in the open", copy: "Every treatment lists a from-price and exactly what moves the number — so the estimate at the consultation matches this page." },
        { kind: "services", heading: "Check-ups & hygiene — from $89", copy: "Comprehensive exam, x-rays when clinically needed, and a gum-health score you keep. Implants from $3,400 with a 10-year guarantee. Cosmetic from $290. Emergency from $120 with two same-day slots held daily." },
        { kind: "proof", heading: "Quotes are ceilings, not targets", copy: "If you need less than we quoted, you pay the lower amount. Written estimates, valid 60 days." },
      ],
    },
    {
      id: "about",
      title: "About",
      sections: [
        { kind: "hero", heading: "Built around the appointment you'd want", copy: "Brightline opened in 2016 with one rule: explain everything, including what not to spend on." },
        { kind: "services", heading: "What we believe", copy: "Published prices are a trust decision. The best treatment plan is the smallest one that works — our planning template literally has a 'what we're NOT recommending and why' field. Anxious patients are the norm, not the exception." },
      ],
    },
    {
      id: "team",
      title: "Team",
      sections: [
        { kind: "team", heading: "Who you'll actually meet", copy: "Dr. Elena Marsh, DDS (implants & restorative, 600+ placements) · Dr. Sofia Brandt, DMD (cosmetic & preventive) · Jonah Reyes, RDH (lead hygienist) · Amara Okafor (patient care coordinator). Five people, no rotating cast — the same dentist from consult to completion." },
      ],
    },
    {
      id: "contact",
      title: "Book a visit",
      sections: [
        { kind: "booking", heading: "Two emergency slots held daily", copy: "In pain right now? Call 503-555-0164. Otherwise the form takes 60 seconds — we confirm by text within one business hour." },
        { kind: "hours", heading: "1213 NW 13th Ave, Portland", copy: "Ground floor, step-free. Same-block parking (validated), bike racks, MAX Green & Yellow two blocks away." },
      ],
    },
  ],
  bookingFields: [
    { key: "name", label: "Your name", type: "text" },
    { key: "phone", label: "Phone", type: "tel" },
    { key: "reason", label: "Reason", type: "select", options: ["Check-up & cleaning", "Implant consultation", "Cosmetic consult", "Emergency — I'm in pain"] },
    { key: "time", label: "Preferred time", type: "select", options: ["Morning", "Afternoon", "First available"] },
  ],
};
