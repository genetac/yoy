/* Generates C-WK-3 (Law) + C-WK-4 (Restaurant) kit-content modules.
   Run: bun scripts/gen-sites.ts */
import { writeFileSync } from "node:fs";

const ROOT = "/home/z/my-project/src/components/omniforge/kit-content";
const esc = (s: string) => s.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
const FM = (t: string, d: string) =>
  `---\ntitle: "${t}"\ndescription: "${d}"\nlayout: page\n---\n\n`;

const SEO_COMMON = (kind: string, extra: string) => `# Local SEO checklist — ${kind} (30 items)

Work top to bottom; Section A is one afternoon, B and C are habits.

## A · Foundations (once, ~3 hours)

- [ ] Google Business Profile claimed; exact NAP everywhere
- [ ] GBP category set correctly${extra}
- [ ] Services/menu in GBP matches the site's wording verbatim
- [ ] Booking/order link in GBP points at the action page, not home
- [ ] Hours in GBP match the site, including nuances (seasonal, by-appointment)
- [ ] 10+ real photos: space, team, exterior with sign visible
- [ ] ${kind === "law firms" ? "LegalService" : "Restaurant"} JSON-LD on the homepage (see json-ld.json)
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
- [ ] ${kind === "law firms" ? "Never discuss case details in review replies — confidentiality outranks SEO" : "Food photos in replies where natural — they render in some surfaces"}

## C · Local signals (monthly, 30 min)

- [ ] NAP audit: Bing, Apple Maps, Yelp${kind === "law firms" ? ", Avvo, FindLaw" : ", TripAdvisor, OpenTable"} — identical to the letter
- [ ] One locally-relevant piece per month (neighbourhood + topic)
- [ ] Service/menu pages mention served neighbourhoods in prose (once)
- [ ] GBP Q&A checked weekly — answer unanswered questions with detail
- [ ] Rank tracked at 5-mile radius for the head term
- [ ] Booking/order link re-tested after every site change
- [ ] Fresh photos added to GBP monthly
- [ ] Competitor set (the 3 above you in maps) reviewed for velocity
- [ ] Schema re-validated after any site update
- [ ] ${kind === "law firms" ? "Disclaimer language audited quarterly (advertising rules shift)" : "Menu prices in schema synced when the menu changes"}

## The honest note

Local SEO is ~60% reviews, ~25% GBP completeness, 15% everything here.
If time is short: do section B forever and A once.
`;

const ROBOTS = (host: string) => `User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://${host}/sitemap.xml
`;

const SITEMAP = (host: string, pages: string[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>https://${host}/${p}</loc><lastmod>2026-10-01</lastmod><priority>${p === "" ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>
`;

const SETUP_GUIDE = (name: string, kit: string, swap: string) => `# Deploy guide — ${name} Kit

The kit is MDX pages + static assets; any Next.js MDX setup runs it.

## The 45-minute path

1. **Create the project** (10 min) — drop \`01-pages/*.mdx\` into the
   content folder; map each to a route
2. **Register the components** (10 min) — every component in
   content-model.md wired into the MDX provider (~120 lines)
3. **Swap the sample data** (15 min) — grep \`${swap}\` to catch every
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
`;

const WALKTHROUGH = (kit: string, name: string) => `# Walkthrough

A 9-minute video build of this exact kit, empty repo → deployed site:

**→ https://omniforge.example/walkthroughs/${kit}**

Contents:
- 00:00 — What's in the kit (and what's deliberately not)
- 01:00 — Pages, components, the content model
- 02:45 — Swapping the sample data the honest way
- 04:30 — The ${name} flow: spec → working form
- 06:15 — SEO pack: JSON-LD, sitemap, the checklist's 80/20
- 07:50 — Deploy + post-deploy checklist

Hosted (not bundled) so the kit stays under 200 KB.
`;

/* ═══════════════ C-WK-3 · Law Firm Kit ═══════════════ */

const wk3 = `/* ════════════════════════════════════════════════════════════════════
   C-WK-3 · Law Firm Kit (Hartwell & Vance LLP) — 5 authored MDX pages,
   confidential intake flow, disclaimers, local-SEO pack.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "C-WK-3";

export const files: Record<string, string> = {
${[
  ["01-pages/home.mdx", FM("Hartwell & Vance LLP — Portland business & employment law",
    "A six-lawyer firm that answers the phone, quotes flat fees where possible, and explains the law in plain English.")
+ `<PageHero
  heading="Counsel that answers, then explains"
  sub="Business and employment law for Portland companies. Flat fees where the work is predictable, clear next-steps when it isn't — and every conversation privileged from the first minute."
  primaryCta="Request a consultation"
  primaryHref="/contact"
  secondaryCta="Practice areas"
  secondaryHref="/practice-areas"
/>

<Prose>

## Why companies call us

1. **You'll know what things cost.** Every engagement starts with a
   written fee structure — flat fee where the work is predictable,
   a capped range when it isn't, and the cap in writing.
2. **Plain English, both directions.** We translate the law into
   decisions, and we're honest when the law doesn't help you.
3. **Response times in our engagement letter.** 24 hours on weekdays,
   48 on weekends — a promise with teeth because it's in the contract.

</Prose>

<ServiceGrid
  services={[
    { name: "Business formation & contracts", price: "flat fee from $1,450", href: "/practice-areas#business" },
    { name: "Employment counsel", price: "advisory from $395/hr", href: "/practice-areas#employment" },
    { name: "Commercial disputes", price: "case evaluation free", href: "/practice-areas#disputes" },
    { name: "Intellectual property", price: "flat fee from $950", href: "/practice-areas#ip" }
  ]}
/>

<TestimonialBar
  quote="They told us which claims weren't worth pursuing — before billing us to pursue them."
  author="General counsel, 90-person manufacturer"
/>

<ConfidentialityNote
  text="Everything you tell us, from the first call, is protected by attorney-client privilege — even if you never hire us. The consultation form asks only what's needed for the conflict check."
/>
`],
  ["01-pages/practice-areas.mdx", FM("Practice areas — Hartwell & Vance",
    "Business formation, employment, commercial disputes and IP — each with the engagement structure and what the first 30 days look like.")
+ `<Prose>

## Engagements, in the open

Each practice area below states how we price, what the first month
delivers, and the honest limits of what law can do for that matter.

</Prose>

<ServiceSection id="business" name="Business formation & contracts" from="$1,450 flat">
  Entity selection (LLC, S-corp, C-corp with the tax conversation up
  front), operating and shareholder agreements, and a contract stack
  you actually own: MSAs, NDAs, employment offers, contractor
  agreements. First 30 days: formation docs filed, the core five
  contracts drafted, a 60-minute walkthrough of what each protects.
</ServiceSection>

<ServiceSection id="employment" name="Employment counsel" from="$395/hr advisory">
  Handbook reviews, terminations done right (documentation before
  the meeting, not after), restrictive covenants that survive
  Oregon scrutiny, and an on-call line for the "can I say this?"
  questions. First 30 days: handbook audited against current Oregon
  and multistate rules, top-5 risks ranked, fixes drafted.
</ServiceSection>

<ServiceSection id="disputes" name="Commercial disputes" from="free case evaluation">
  Partnership breaks, breach-of-contract claims, collections. The
  evaluation is genuinely free and genuinely honest — we decline
  roughly a third of the matters presented because the math doesn't
  work, and we say so in writing. First 30 days: exposure analysis,
  a demand letter or response strategy, and a budget you can hold
  us to.
</ServiceSection>

<ServiceSection id="ip" name="Intellectual property" from="$950 flat">
  Trademark clearance and registration, copyright assignments in
  plain English, and trade-secret programs that survive employee
  departures. First 30 days: clearance run, application filed or
  honest advice not to, and a trade-secret checklist applied to
  your shop.
</ServiceSection>

<FAQAccordion
  items={[
    { q: "What happens in the first call?", a: "Fifteen minutes. We confirm no conflict of interest, hear the shape of the matter, and tell you honestly whether it needs a lawyer at all. Some callers get a statute reference and a wave goodbye — free, and better than an engagement letter." },
    { q: "Flat fee or hourly — how do you decide?", a: "Predictable work (formation, contracts, filings) is flat. Contested matters are capped ranges, revised only in writing, with a mid-matter budget review at every 25% of cap." },
    { q: "Will you oppose our existing counsel's advice?", a: "Only with reasons in writing. Second opinions are a third of our dispute work; the honest ones sometimes end with 'your lawyer is right' — also in writing." }
  ]}
/>
`],
  ["01-pages/attorneys.mdx", FM("Attorneys — Hartwell & Vance LLP",
    "Six lawyers, Oregon and Washington bars. Credentials, admission dates, and who answers the phone for what.")
+ `<TeamGrid>
  <TeamMember
    name="Dana Hartwell, Esq."
    role="Managing partner · business formation & contracts"
    bio="Lewis & Clark JD, 2004. Twenty years of entity and contract work; wrote the firm's flat-fee pricing policy after a decade of watching clients flinch at hourly letters. Answers the intake line personally on Tuesdays."
    credentials={["JD, Lewis & Clark 2004", "Oregon & Washington bars", "Martindale-Hubble AV Preeminent"]}
  />
  <TeamMember
    name="Marcus Vance, Esq."
    role="Partner · commercial disputes"
    bio="Georgetown JD, 2007. Twelve jury trials, forty-some arbitrations, and a reputation for the honest case evaluation — the one that sometimes talks clients out of lawsuits. Teaches the negotiation section of OLI's practice course."
    credentials={["JD, Georgetown 2007", "Oregon State Bar, Litigation Section chair 2023", "AAA arbitrator panel"]}
  />
  <TeamMember
    name="Priya Raghavan, Esq."
    role="Counsel · employment"
    bio="NYU JD, 2012. Handbooks for 100+ Oregon employers; the one to call before the termination meeting, not after. Fluent in the difference between what's legal, what's defensible, and what's wise."
    credentials={["JD, NYU 2012", "Oregon Employment Law Association board", "SHRM-adjacent handbook audits"]}
  />
  <TeamMember
    name="Elena Brandt, Esq."
    role="Associate · intellectual property"
    bio="University of Washington JD, 2019. Trademark clearances with a 4-day turnaround promise; talks clients out of weak marks as often as into strong ones."
    credentials={["JD, UW 2019", "USPTO registered practitioner"]}
  />
</TeamGrid>

<Prose>

## Who you'll actually get

The lawyer who does the work is the lawyer you meet. Our engagement
letters name the responsible attorney and the reviewer — no bait and
switch, no work routed to whoever's idle. If we can't staff it
properly, we decline it properly.

</Prose>
`],
  ["01-pages/results.mdx", FM("Results & representative matters — Hartwell & Vance",
    "Selected matters with outcomes, described within the rules of professional conduct. No guarantees, no gimmicks, no fine print.")
+ `<Prose>

## Representative matters

Oregon's professional-conduct rules govern what we may say about
results. What follows is accurate, verifiable where possible, and —
per the same rules — not a promise about your matter.

| Matter type | Outcome | Posture |
| --- | --- | --- |
| Partnership dissolution, 4-member LLC | Client retained the operating business; buyout at 1.4× initial demand | Arbitrated, 2025 |
| Executive departure,Restrictive covenant | Covenant narrowed to enforceable scope; no suit filed | Negotiated, 2025 |
| Trademark opposition, consumer brand | Opposing mark withdrawn at pre-filing conference | Cleared, 2026 |
| Wage-and-hour audit, 60-employee employer | Zero findings after remediation plan | Settled pre-claim, 2025 |
| Commercial lease dispute, restaurant group | $180k of disputed CAM charges reduced to $22k | Settled, 2024 |

## How to read results pages (ours or anyone's)

1. **Posture matters** — settlements aren't verdicts and vice versa
2. **Selection bias is legal** — every firm's results page is its
   highlight reel; ours is shorter than most because we decline a
   third of what walks in
3. **The only number that predicts yours** is the one in your own
   case evaluation, in writing, from the lawyer who'll do the work

</Prose>
`],
  ["01-pages/contact.mdx", FM("Request a consultation — Hartwell & Vance LLP",
    "Privileged from the first keystroke. The form asks only what the conflict check requires; we reply within one business day.")
+ `<IntakeForm
  intro="Everything here is privileged. We ask only what the conflict check needs — names of the other parties — and reply within one business day with next steps or a graceful decline."
  fields={["name", "company", "phone", "matter-type", "description"]}
  conflictNote="Before we can discuss your matter, Oregon rules require us to check we don't already represent someone on the other side. That's why the form asks about the other parties — and why the check runs before anything else."
/>

<Prose>

## The office

**421 SW Broadway, Suite 900, Portland, OR 97205** — Pioneer
Courthouse Square, MAX at the door, validated parking in the
 garages on SW 6th.

## Hours

| Day | Hours |
| --- | --- |
| Mon – Fri | 8:30 – 17:30 |
| Evenings | By appointment |
| Weekends | Intake form only (48h reply) |

## What the first call costs

Fifteen minutes, no charge, and the honest version: some matters
get a statute reference and a wave goodbye. If it needs us, the
engagement letter states the fee structure before work begins —
flat, capped, or hourly, in writing.

</Prose>
`],
].map(([p, mdx]) => `  ${JSON.stringify(p)}: \`${esc(mdx)}\`,`).join("\n")}

  ${[
  ["02-intake/intake-flow.mdx", `## The confidential intake flow

\`\`\`
step 1: identity — name, company, phone (no email required)
step 2: matter — type (business | employment | dispute | IP) + one-paragraph description
step 3: conflict check input — other parties' names (required by Oregon RPC 1.7)
step 4: submit → "Privileged and received" state (encrypted inbox, 2 attorneys)
\`\`\`

## Design rules (load-bearing)

1. **Conflict check comes first.** The form's step-3 exists because
   Oregon RPC 1.7 forbids the conversation before the check. The UI
   explains this — users complete it because they understand why.
2. **No email field.** Attorneys call back; clients in disputes
   often don't want a paper trail in their inbox. Phone optional
   after name.
3. **One paragraph, not a form full of fields.** The intake
   attorney reads prose better than dropdowns; free-text with a
   2000-char ceiling.
4. **"Privileged and received" page** restates: what we'll do
   (conflict check → callback within one business day), what we
   won't (share, bill, or commit to representation). Restating it
   is the trust move.
5. **The decline path is designed.** A graceful decline template
   exists (conflict, fit, or economics) — declining clearly beats
   dragging a bad-fit matter.

## Validation

- Name + at least one party name required; everything else optional
- Phone validated for format only, never autodialed
- No marketing consent checkbox — this form is not a funnel, and
  saying so is a conversion feature in this practice area
`],
  ["02-intake/confirmation-emails.md", `# Confirmation emails — intake + engagement

## 1 · Intake received (sends within 15 minutes)

\`\`\`
Subject: Privileged — consultation request received

{{salutation_name}},

Your consultation request is privileged and received.

  What happens now: a conflict check (usually same day)
  Then: a call from {{attorney_name}} within one business day
  What we will never do: share these details, bill for the call,
  or treat this message as creating an attorney-client relationship

If the matter is urgent before then: 503-555-0140, ask for intake.

— Hartwell & Vance LLP · 421 SW Broadway, Suite 900, Portland
\`\`\`

**Why it works:** manages the privilege expectation precisely (the
"does not create a relationship" line is required and reassuring at
once), gives the phone escape hatch, and promises exactly two
things — both of which happen.

## 2 · Engagement follow-up (after the call, if mutual fit)

\`\`\`
Subject: Engagement letter & first steps — {{matter_short_name}}

{{salutation_name}},

As discussed: attached is the engagement letter. The two numbers
that matter:

  Fee structure: {{fee_structure}} (as quoted on the call)
  First deliverable: {{first_deliverable}} by {{first_date}}

Questions before signing are normal — reply here or call.

— {{attorney_name}}
\`\`\`

**Why it works:** repeats the quoted numbers (fee disputes start
when memory diverges), names the first deliverable with a date, and
invites pre-signature questions.
`],
  ["03-seo/local-seo-checklist.md", SEO_COMMON("law firms", " — *Lawyer* plus practice-area secondaries")],
  ["03-seo/json-ld.json", `{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": "https://www.hartwellvance.example/#firm",
  "name": "Hartwell & Vance LLP",
  "description": "Portland business and employment law firm — flat fees where work is predictable, written fee structures always.",
  "url": "https://www.hartwellvance.example/",
  "telephone": "+1-503-555-0140",
  "priceRange": "$$$",
  "address": { "@type": "PostalAddress", "streetAddress": "421 SW Broadway, Suite 900", "addressLocality": "Portland", "addressRegion": "OR", "postalCode": "97205", "addressCountry": "US" },
  "geo": { "@type": "GeoCoordinates", "latitude": 45.5194, "longitude": -122.6795 },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:30", "closes": "17:30" }
  ],
  "areaServed": { "@type": "City", "name": "Portland" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "96", "bestRating": "5" },
  "availableService": [
    { "@type": "LegalService", "name": "Business formation & contracts", "url": "https://www.hartwellvance.example/practice-areas#business" },
    { "@type": "LegalService", "name": "Employment counsel", "url": "https://www.hartwellvance.example/practice-areas#employment" },
    { "@type": "LegalService", "name": "Commercial disputes", "url": "https://www.hartwellvance.example/practice-areas#disputes" },
    { "@type": "LegalService", "name": "Intellectual property", "url": "https://www.hartwellvance.example/practice-areas#ip" }
  ]
}
`],
  ["03-seo/robots.txt", ROBOTS("www.hartwellvance.example")],
  ["03-seo/sitemap.xml", SITEMAP("www.hartwellvance.example", ["", "practice-areas", "attorneys", "results", "contact"])],
  ["04-content-model/content-model.md", `# Content model — Hartwell & Vance

| Page | File | Sections |
| --- | --- | --- |
| Home | \`01-pages/home.mdx\` | PageHero → Prose → ServiceGrid → TestimonialBar → ConfidentialityNote |
| Practice areas | \`01-pages/practice-areas.mdx\` | Prose → ServiceSection ×4 → FAQAccordion |
| Attorneys | \`01-pages/attorneys.mdx\` | TeamGrid → Prose |
| Results | \`01-pages/results.mdx\` | Prose (representative matters table + reading guide) |
| Contact | \`01-pages/contact.mdx\` | IntakeForm → Prose (office/hours/cost) |

## Components

\`\`\`
PageHero           heading · sub · primaryCta · primaryHref · secondaryCta? · secondaryHref?
Prose              children (markdown)
ServiceGrid        services[{ name · price · href }]
ServiceSection     id · name · from · children
FAQAccordion       items[{ q · a }]
TestimonialBar     quote · author
ConfidentialityNote text
TeamGrid/TeamMember name · role · bio · credentials[]
IntakeForm         intro · fields[] · conflictNote
\`\`\`

## Rules that are load-bearing here

- **Fees always with structure** — "from $X flat" / "$X/hr" / "free
  evaluation"; never a bare number (bare reads as quote)
- **Results page:** every claim must survive RPC 7.1 — the page's
  own "how to read this" section keeps future edits honest
- **ConfidentialityNote appears exactly once per site** (Home); the
  IntakeForm carries its own conflictNote
- Bios: 40–70 words, credentials verifiable, one human sentence
`],
  ["04-content-model/disclaimers.mdx", FM("Disclaimers — Hartwell & Vance LLP",
    "The four disclaimers every law-firm site needs, written to be read.")
+ `<Prose>

## Attorney advertising (Bar Rule 7.1)

This website is attorney advertising. Prior results do not guarantee
or predict a similar outcome. The matter descriptions on this site
are representative only; every matter turns on its own facts and
law.

## No legal advice

Nothing on this site is legal advice, and nothing here creates an
attorney-client relationship. That relationship begins only when
both you and the firm sign a written engagement letter. The intake
form's "privileged and received" page says the same thing — on
purpose.

## Confidentiality, stated precisely

What you send through the intake form is treated as privileged and
confidential from receipt, subject to the conflict-check process.
Email is convenient but not perfectly private; if your matter is
sensitive, call instead — 503-555-0140.

## Case results, read honestly

The results page exists within professional-conduct rules: it lists
selected matters, discloses posture (arbitrated, negotiated,
settled), and refuses to imply outcomes. If any line on that page
ever reads as a promise, that's a drafting error — flag it:
front-desk@hartwellvance.example.

</Prose>
`],
  ["05-deploy/deploy-guide.md", SETUP_GUIDE("Law Firm", "C-WK-3", "Hartwell")],
  ["05-deploy/walkthrough-link.md", WALKTHROUGH("C-WK-3", "intake")],
  ["EXTENDED-PACK/client-portal-wireframes.md", `# Client portal wireframes — in production

Status: **in production** — not in this archive.

What the finished file will contain: wireframes and specs for a
secure client messaging + document-upload portal aligned to the
intake flow — conflict-safe matter channels, privilege-preserving
notification design (no matter details in email bodies), and an
access-control review checklist.
`],
].map(([p, c]) => `  ${JSON.stringify(p)}: \`${esc(c)}\`,`).join("\n")}
};

export const demo: DemoContent = {
  kind: "site",
  siteName: "Hartwell & Vance LLP",
  vertical: "law",
  intro:
    "Tour the five authored pages of the Law Firm Kit — then submit the confidential intake form. The tour renders the kit's real MDX copy.",
  pages: [
    { id: "home", title: "Home", sections: [
      { kind: "hero", heading: "Counsel that answers, then explains", copy: "Business and employment law for Portland companies. Flat fees where the work is predictable, clear next-steps when it isn't — and every conversation privileged from the first minute." },
      { kind: "services", heading: "Why companies call us", copy: "You'll know what things cost — written fee structure before work begins. Plain English both directions. Response times in the engagement letter: 24 hours weekdays, 48 on weekends." },
      { kind: "proof", heading: "4.8 stars · 96 reviews", copy: "\\"They told us which claims weren't worth pursuing — before billing us to pursue them.\\" — General counsel, 90-person manufacturer" },
      { kind: "booking", heading: "Privileged from the first keystroke", copy: "Everything you tell us, from the first call, is protected by attorney-client privilege — even if you never hire us." },
    ] },
    { id: "practice-areas", title: "Practice areas", sections: [
      { kind: "hero", heading: "Engagements, in the open", copy: "Each practice area states how we price, what the first month delivers, and the honest limits of what law can do." },
      { kind: "services", heading: "Four practice areas", copy: "Business formation & contracts from $1,450 flat · Employment counsel from $395/hr · Commercial disputes — free case evaluation (we decline a third of them, in writing) · IP from $950 flat." },
    ] },
    { id: "attorneys", title: "Attorneys", sections: [
      { kind: "team", heading: "Who you'll actually get", copy: "Dana Hartwell (formation & contracts), Marcus Vance (disputes, 12 jury trials), Priya Raghavan (employment, 100+ handbook audits), Elena Brandt (IP, 4-day trademark clearances). The lawyer who does the work is the lawyer you meet." },
    ] },
    { id: "results", title: "Results", sections: [
      { kind: "proof", heading: "Representative matters", copy: "Partnership dissolution — client retained the business at 1.4× initial demand (arbitrated 2025). Wage-and-hour audit — zero findings after remediation. Lease dispute — $180k disputed CAM reduced to $22k. Postures disclosed; no guarantees implied." },
    ] },
    { id: "contact", title: "Consultation", sections: [
      { kind: "booking", heading: "The conflict check comes first", copy: "Oregon rules require checking we don't already represent the other side — that's why the form asks. Then a call within one business day, from the attorney who'd do the work." },
      { kind: "hours", heading: "421 SW Broadway, Suite 900", copy: "Pioneer Courthouse Square, MAX at the door, validated parking. Mon–Fri 8:30–17:30 · evenings by appointment · intake form on weekends with 48h reply." },
    ] },
  ],
  bookingFields: [
    { key: "name", label: "Your name", type: "text" },
    { key: "company", label: "Company (if any)", type: "text" },
    { key: "phone", label: "Phone", type: "tel" },
    { key: "matter", label: "Matter type", type: "select", options: ["Business & contracts", "Employment", "Commercial dispute", "Intellectual property"] },
    { key: "parties", label: "Other parties involved (conflict check)", type: "text" },
  ],
};
`;

writeFileSync(`${ROOT}/C-WK-3/content.ts`, wk3);
console.log("C-WK-3 written,", wk3.length);

/* ═══════════════ C-WK-4 · Restaurant Kit ═══════════════ */

const wk4 = `/* ════════════════════════════════════════════════════════════════════
   C-WK-4 · Restaurant Kit (Bracera) — 5 authored MDX pages, reservation
   flow, menu schema data, local-SEO pack.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "C-WK-4";

export const files: Record<string, string> = {
${[
  ["01-pages/home.mdx", FM("Bracera — coastal Italian on NW Everett",
    "Wood-fired coastal Italian in Portland's Pearl District. Reservations open 30 days out; the tasting menu drops on Tuesdays.")
+ `<PageHero
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
`],
  ["01-pages/menu.mdx", FM("This week's menu — Bracera",
    "Dated menus from the boats: crudo, hearth plates, handmade pastas, desserts. Allergen keys on every dish; wine and vermouth lists in-house.")
+ `<MenuNote dated="2026-10-26 — week of" note="Menus change with landings; the printed card in the room is the truth. GF = gluten-free available · V = vegetarian · * = contains raw or undercooked elements" />

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
`],
  ["01-pages/reservations.mdx", FM("Reservations — Bracera",
    "42 seats, 30-day booking window, 18:30 tasting counter. Parties of 7+ and the private hearth table book by phone.")
+ `<ReservationForm
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
`],
  ["01-pages/events.mdx", FM("Events & the hearth table — Bracera",
    "One private table, one seasonal dinner series, and buyouts for 30–42. The honest capacity math is below.")
+ `<Prose>

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
`],
  ["01-pages/contact.mdx", FM("Find us — Bracera, NW Everett",
    "1314 NW Everett St, Portland. Tue–Sat from 17:00. Valet Thu–Sat; street parking otherwise; the Pearl garages are 2 blocks.")
+ `<ContactBlock
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
`],
].map(([p, mdx]) => `  ${JSON.stringify(p)}: \`${esc(mdx)}\`,`).join("\n")}

  ${[
  ["02-reservations/reservation-flow.mdx", `## The reservation flow

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
`],
  ["02-reservations/confirmation-emails.md", `# Confirmation emails — reservation + reminder

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
`],
  ["03-seo/local-seo-checklist.md", SEO_COMMON("restaurants", " — *Restaurant* plus *Italian restaurant*")],
  ["03-seo/json-ld.json", `{
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
`],
  ["03-seo/robots.txt", ROBOTS("www.bracera.example")],
  ["03-seo/sitemap.xml", SITEMAP("www.bracera.example", ["", "menu", "reservations", "events", "contact"])],
  ["04-content-model/content-model.md", `# Content model — Bracera

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
`],
  ["04-content-model/menu-data.mdx", `# Menu data — structured schema + this week's export

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
`],
  ["05-deploy/deploy-guide.md", SETUP_GUIDE("Restaurant", "C-WK-4", "Bracera")],
  ["05-deploy/walkthrough-link.md", WALKTHROUGH("C-WK-4", "reservation")],
  ["EXTENDED-PACK/online-ordering-wireframes.md", `# Online ordering wireframes — in production

Status: **in production** — not in this archive.

What the finished file will contain: wireframes for an add-on
online-ordering flow — menu cart from the same menu-data schema,
checkout with time-slot selection, kitchen ticket views, and a
"hearth-first" positioning note (ordering supplements the room,
never competes with it).
`],
].map(([p, c]) => `  ${JSON.stringify(p)}: \`${esc(c)}\`,`).join("\n")}
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
      { kind: "proof", heading: "4.7 stars · 418 reviews", copy: "\\"The crudo, the pasta, the honesty of the menu. This is the restaurant Portland didn't know it was missing.\\" — The Oregonian, 2026" },
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
`;

writeFileSync(`${ROOT}/C-WK-4/content.ts`, wk4);
console.log("C-WK-4 written,", wk4.length);
