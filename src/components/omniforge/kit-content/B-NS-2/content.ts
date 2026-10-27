/* ════════════════════════════════════════════════════════════════════
   B-NS-2 · Sales CRM System — SalesOS
   3 databases with 25 authored rows each (deals, contacts, companies),
   3 pipeline rituals, a copy-paste formula reference, duplicate-link
   and setup guide. Every file's key equals its bundle path. The
   Try-it demo tours 12 of the same deals that ship in deals.csv.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-NS-2";

export const files: Record<string, string> = {
  /* ── 01 Databases (25 authored rows each) ──────────────────────── */

  "01-databases/deals.csv": `Deal,Stage,Value,Company,Owner,Close Date,Probability,Next Step,Last Touch
Harborline Logistics — Platform — New Logo,Negotiation,48000,Harborline Logistics,Priya Sharma,2026-10-30,80,"Redline MSA with legal, security addendum signed",2026-10-13
Corvid Analytics — Platform — Renewal,Closed Won,62000,Corvid Analytics,Elena Fischer,2026-09-18,100,Book Q1 2027 expansion scoping,2026-09-18
Meridian Health — Platform — New Logo,Proposal,96000,Meridian Health,Priya Sharma,2026-11-20,60,"Walk CFO through ROI model Thursday, bring security one-pager",2026-10-12
Bluepine Studios — Seats — Expansion,Closed Won,14500,Bluepine Studios,Elena Fischer,2026-08-27,100,"Hand to onboarding, upsell plays in Jan",2026-08-27
Kestrel Robotics — Platform — New Logo,Demo,55000,Kestrel Robotics,Maya Chen,2026-11-06,40,Send demo recording + security one-pager,2026-10-08
Alder & Grant LLP — Platform — New Logo,Closed Lost,30000,Alder & Grant LLP,Daniel Okafor,2026-09-04,0,"Archive, revisit at their renewal per Harriet",2026-09-04
Sunhaven Foods — Platform — New Logo,Negotiation,37500,Sunhaven Foods,Maya Chen,2026-10-23,75,Confirm PO cut-off with procurement before Oct 31,2026-10-14
Ridgeline Solar — Data Warehouse Add-on,Proposal,22000,Ridgeline Solar,Daniel Okafor,2026-11-13,55,"Mutual action plan v2 sent, chasing CTO sign-off",2026-10-09
Farrier Insurance — Platform — Renewal,Negotiation,84000,Farrier Insurance,Elena Fischer,2026-10-16,85,"Counter with 3-year flat pricing, legal call Monday",2026-10-15
Tidewater Marine — Platform — New Logo,Discovery,68000,Tidewater Marine,Priya Sharma,2026-12-11,25,"Map current stack with IT lead, confirm budget cycle",2026-10-05
Copperleaf Design — Seats — Expansion,Closed Won,9000,Copperleaf Design,Elena Fischer,2026-07-21,100,Closed — onboarding complete,2026-07-21
Norlight Energy — Platform — New Logo,Demo,110000,Norlight Energy,Priya Sharma,2026-12-04,40,Exec workshop Nov 2 — deck due Oct 28,2026-10-11
Bellamy Farms Co-op — Starter — New Logo,Closed Lost,6000,Bellamy Farms Co-op,Daniel Okafor,2026-08-14,0,"Archive — lost to spreadsheets, nurture list",2026-08-14
Quarry Mill Manufacturing — Platform — New Logo,Qualifying,28000,Quarry Mill Manufacturing,Tom Reyes,2026-11-27,15,Discovery call Oct 21 with ops director Hank,2026-10-07
Vantage Point Media — Platform — New Logo,Proposal,41000,Vantage Point Media,Maya Chen,2026-10-30,60,"Silent since Oct 6 — send break-up email, keep door open",2026-10-06
Glasswing Airlines — Platform — New Logo,Discovery,145000,Glasswing Airlines,Priya Sharma,2026-12-18,20,"Champion building internal case, supply ROI deck by Friday",2026-10-12
Hollowfield Bank — Compliance Module,Demo,52000,Hollowfield Bank,Daniel Okafor,2026-11-25,40,"Security review underway, feed answers to product by Fri",2026-10-13
Marrow & Sprig — Starter — New Logo,Closed Won,7500,Marrow & Sprig,Maya Chen,2026-09-29,100,Day-30 check-in scheduled Oct 29,2026-09-29
Fernway Transit — Platform — Renewal,Negotiation,58000,Fernway Transit,Elena Fischer,2026-10-23,80,Procurement routing PO — signature expected this week,2026-10-14
Oakridge Academies — Seats — Expansion,Demo,18000,Oakridge Academies,Elena Fischer,2026-11-18,45,"Pilot cohort feedback due Friday, draft case study",2026-10-10
Steelgate Security — Platform — New Logo,Qualifying,36000,Steelgate Security,Tom Reyes,2026-12-11,10,No-show on first call — requalify or archive,2026-09-30
Lumen Goods — Platform — New Logo,Proposal,47000,Lumen Goods,Daniel Okafor,2026-10-21,65,Verbal yes from VP — paper to procurement Tuesday,2026-10-13
Petra Clean Co — Starter — New Logo,Demo,8400,Petra Clean Co,Maya Chen,2026-10-28,40,"Trial day 6 of 14, mid-trial check-in Wednesday",2026-10-12
Whistler Freight — Data Warehouse Add-on,Discovery,26000,Whistler Freight,Daniel Okafor,2026-12-08,25,Data audit booked — confirm their ETL owner,2026-10-02
Arbor Vitae Wellness — Starter — New Logo,Qualifying,5000,Arbor Vitae Wellness,Tom Reyes,2026-11-06,15,Intro call Oct 20 — confirm decision process,2026-10-08
`,

  "01-databases/contacts.csv": `Contact,Company,Title,Email,Phone,Owner,Influence,Lifecycle,Last Touch,Notes
Dana Whitlock,Harborline Logistics,VP Operations,dana.whitlock@harborline.example,+1 312 555 0164,Priya Sharma,Champion,Active,2026-10-13,Wants the win before their fiscal year closes
Owen Brady,Corvid Analytics,Head of Data,owen.brady@corvidanalytics.example,+1 415 555 0122,Elena Fischer,Decision Maker,Customer,2026-09-18,Renewal champion — introduced us to two peers
Dr. Amara Osei,Meridian Health,CFO,a.osei@meridianhealth.example,+1 617 555 0119,Priya Sharma,Decision Maker,Active,2026-10-12,ROI model or nothing — hates sales decks
Nina Kowalski,Bluepine Studios,Studio Manager,nina@bluepine.example,+1 604 555 0187,Elena Fischer,Champion,Customer,2026-08-27,Asked for 12 more seats in Q1
Lukas Ferreira,Kestrel Robotics,Operations Lead,l.ferreira@kestrel.example,+49 30 555 0143,Maya Chen,Influencer,Active,2026-10-08,Buys for the ops team — finance is the friction
Harriet Alder,Alder & Grant LLP,Managing Partner,h.alder@aldergrant.example,+44 20 5550 0176,Daniel Okafor,Decision Maker,Lost,2026-09-04,Went on-prem — open to a revisit in 2027
Ray Salazar,Sunhaven Foods,IT Director,ray.salazar@sunhaven.example,+1 713 555 0158,Maya Chen,Decision Maker,Active,2026-10-14,Needs the PO in before the Oct 31 cutoff
Priyanka Rao,Ridgeline Solar,CTO,priyanka.rao@ridgelinesolar.example,+1 503 555 0171,Daniel Okafor,Decision Maker,Active,2026-10-09,Sole sign-off — replies fast before 8am
Malcolm Frey,Farrier Insurance,Head of Underwriting Ops,m.frey@farrier.example,+44 20 5550 0134,Elena Fischer,Gatekeeper,Customer,2026-10-15,Price-sensitive — escalation path mapped
Ingrid Halvorsen,Tidewater Marine,Director of Fleet Systems,ingrid.h@tidewater.example,+47 21 55 50 168,Priya Sharma,Influencer,Active,2026-10-05,Building the internal case — shares incumbent pain
Sophie Tremblay,Copperleaf Design,Founder,sophie@copperleaf.example,+1 514 555 0129,Elena Fischer,Champion,Customer,2026-07-21,Best referral source — gave two intros
Erik Lindqvist,Norlight Energy,VP Digital,e.lindqvist@norlight.example,+46 8 555 0152,Priya Sharma,Decision Maker,Active,2026-10-11,Wants the exec workshop agenda a week ahead
June Bellamy,Bellamy Farms Co-op,Co-op Manager,june@bellamyfarms.example,+1 515 555 0161,Daniel Okafor,Decision Maker,Lost,2026-08-14,Chose spreadsheets — keep on the newsletter
Hank Purcell,Quarry Mill Manufacturing,Ops Director,h.purcell@quarrymill.example,+1 615 555 0183,Tom Reyes,Influencer,Lead,2026-10-07,Referred by Corvid's Owen Brady
Talia Ng,Vantage Point Media,Editorial Director,talia.ng@vantagepoint.example,+1 212 555 0146,Maya Chen,Champion,Active,2026-10-06,Went quiet after proposal v2 — not dead
Rosa Marin,Glasswing Airlines,Head of Digital Products,rosa.marin@glasswing.example,+44 20 5550 0192,Priya Sharma,Champion,Active,2026-10-12,Needs ROI slides for the internal case
Victor Hahn,Hollowfield Bank,SVP Risk & Compliance,v.hahn@hollowfield.example,+1 917 555 0125,Daniel Okafor,Decision Maker,Active,2026-10-13,Security questionnaire is the real gate
Kenji Mori,Marrow & Sprig,Co-owner,kenji@marrowandsprig.example,+1 206 555 0138,Maya Chen,Decision Maker,Customer,2026-09-29,Day-30 check-in lands Oct 29
Louise Gagnon,Fernway Transit,GM Strategy,l.gagnon@fernway.example,+1 438 555 0157,Elena Fischer,Decision Maker,Customer,2026-10-14,Renewal paper is in legal this week
Andre Whitfield,Oakridge Academies,Director of Curriculum,a.whitfield@oakridge.example,+1 303 555 0121,Elena Fischer,Champion,Customer,2026-10-10,Pilot teacher feedback due Friday
Sloane Kimura,Steelgate Security,VP Engineering,sloane.kimura@steelgate.example,+1 628 555 0166,Tom Reyes,Gatekeeper,Lead,2026-09-30,No-show Oct 1 — one more try then archive
Marcus Webb,Lumen Goods,VP Operations,marcus.webb@lumengoods.example,+1 646 555 0117,Daniel Okafor,Champion,Active,2026-10-13,Verbal yes — hand him the business case doc
Bea Alonzo,Petra Clean Co,Owner,bea@petraclean.example,+1 313 555 0149,Maya Chen,Decision Maker,Active,2026-10-12,Trial day 6 — loves the scheduling view
Callum Fraser,Whistler Freight,Head of Data,c.fraser@whistlerfreight.example,+1 778 555 0154,Daniel Okafor,Influencer,Active,2026-10-02,Wants the ETL audit before any talk of price
Ivy Chen,Arbor Vitae Wellness,Founder,ivy@arborvitae.example,+1 505 555 0133,Tom Reyes,Decision Maker,Lead,2026-10-08,Intro call Oct 20 — founder-led decision
`,

  "01-databases/companies.csv": `Company,Industry,Employees,ARR,Region,Tier,Website,Owner,Lifecycle,Last Activity,Notes
Harborline Logistics,Logistics & Freight,420,0,US — Midwest,A,harborline.example,Priya Sharma,Prospect,2026-10-13,"Pilot beat the incumbent, legal is the last gate"
Corvid Analytics,Data & Analytics,210,62000,US — West,A,corvidanalytics.example,Elena Fischer,Customer,2026-09-18,Renewed three years — expansion talk starts Q1
Meridian Health,Healthcare,1900,0,US — Northeast,A,meridianhealth.example,Priya Sharma,Prospect,2026-10-12,CFO wants the ROI model — security review queued
Bluepine Studios,Media Production,60,14500,Canada,B,bluepine.example,Elena Fischer,Customer,2026-08-27,Expanded 20 to 32 seats — strong reference
Kestrel Robotics,Industrial Robotics,340,0,DACH,B,kestrel.example,Maya Chen,Prospect,2026-10-08,Demo landed with ops — procurement is slow
Alder & Grant LLP,Legal,180,0,UK,B,aldergrant.example,Daniel Okafor,Prospect,2026-09-04,Lost to an on-prem rival — revisit at their renewal
Sunhaven Foods,Food & Beverage,850,0,US — South,B,sunhaven.example,Maya Chen,Prospect,2026-10-14,Budget must be committed before fiscal close Oct 31
Ridgeline Solar,Renewable Energy,260,0,US — West,B,ridgelinesolar.example,Daniel Okafor,Prospect,2026-10-09,Warehouse add-on — CTO is the sole sign-off
Farrier Insurance,Insurance,1200,84000,UK,A,farrier.example,Elena Fischer,Customer,2026-10-15,Renewal at risk on price — 3-year counter in play
Tidewater Marine,Shipping,1500,0,Nordics,A,tidewater.example,Priya Sharma,Prospect,2026-10-05,Incumbent contract ends Mar 2027 — long game
Copperleaf Design,Design Agency,25,9000,Canada,C,copperleaf.example,Elena Fischer,Customer,2026-07-21,Seat expansion closed — loves the tool
Norlight Energy,Utilities,2600,0,Nordics,A,norlight.example,Priya Sharma,Prospect,2026-10-11,Exec workshop Nov 2 — enterprise motion
Bellamy Farms Co-op,Agriculture,90,0,US — Midwest,C,bellamyfarms.example,Daniel Okafor,Prospect,2026-08-14,Lost to spreadsheets — tiny account anyway
Quarry Mill Manufacturing,Manufacturing,540,0,US — South,B,quarrymill.example,Tom Reyes,Prospect,2026-10-07,Ops director engaged — discovery Oct 21
Vantage Point Media,Media & Publishing,130,0,US — Northeast,B,vantagepoint.example,Maya Chen,Prospect,2026-10-06,Champion quiet — break-up email queued
Glasswing Airlines,Aviation,4800,0,UK,A,glasswing.example,Priya Sharma,Prospect,2026-10-12,Champion needs the deck — budget cycles in December
Hollowfield Bank,Banking,3100,0,US — Northeast,A,hollowfield.example,Daniel Okafor,Prospect,2026-10-13,Compliance module — security review in flight
Marrow & Sprig,Restaurants,40,7500,US — West,C,marrowandsprig.example,Maya Chen,Customer,2026-09-29,Starter plan — check in at day 30
Fernway Transit,Public Transit,2100,58000,Canada,A,fernway.example,Elena Fischer,Customer,2026-10-14,Renewal in legal — usage stats are strong
Oakridge Academies,Education,700,16000,US — West,B,oakridge.example,Elena Fischer,Customer,2026-10-10,Pilot cohort mid-term — case study drafted
Steelgate Security,Cybersecurity,300,0,US — West,B,steelgate.example,Tom Reyes,Prospect,2026-09-30,No-show once — requalify before spending more effort
Lumen Goods,E-commerce,220,0,US — Northeast,B,lumengoods.example,Daniel Okafor,Prospect,2026-10-13,Verbal yes — procurement next
Petra Clean Co,Cleaning Services,55,0,US — Midwest,C,petraclean.example,Maya Chen,Prospect,2026-10-12,Mid-trial — day-9 usage is strong
Whistler Freight,Logistics & Freight,480,0,Canada,B,whistlerfreight.example,Daniel Okafor,Prospect,2026-10-02,Data audit booked — ETL owner unknown
Arbor Vitae Wellness,Wellness,35,0,US — West,C,arborvitae.example,Tom Reyes,Prospect,2026-10-08,Intro Oct 20 — founder-led decision
`,

  /* ── 02 Rituals ────────────────────────────────────────────────── */

  "02-rituals/deal-review.md": `# Deal review — Monday, 45 minutes

The one meeting that keeps the pipeline honest. Every open deal gets
looked at, but only the deals that need talking about get talked about.

**When:** Monday 09:30, right after coffee, before the week starts
moving. Reschedule before you cancel — a skipped review shows up in
the forecast three weeks later.
**Who:** every deal owner plus whoever owns the number (here: Priya).
**Where:** the Pipeline board, grouped by Stage, on the shared screen.

## Before the meeting — each owner, 10 minutes on Monday morning

- [ ] Every deal you touched last week sits in today's honest Stage
- [ ] Every deal has a Next Step with a date inside it
- [ ] Last Touch is updated — days since last touch is the first
      thing the room sees
- [ ] Close dates that will not happen are moved, not hoped at

## Agenda

| Time | Block | What happens |
| --- | --- | --- |
| 0:00–0:05 | Numbers at a glance | Board totals: count, value and weighted value per stage, versus last Monday |
| 0:05–0:20 | Stale and slipping | Every deal red on Freshness, plus anything flagged Slipped |
| 0:20–0:35 | Stage moves | Deals that changed stage last week — owner walks the why |
| 0:35–0:42 | New entries | Deals created in the last 7 days — is the entry bar real? |
| 0:42–0:45 | Commitments | Each owner states their two committed moves for the week |

## The questions — ask them exactly

For every stale deal (14+ days untouched):

1. Who on their side owns the next action, by name?
2. What did we send them that they never answered?
3. Is this deal actually alive — yes or no?

For every slipped deal (Close Date in the past, not closed):

1. What date is real, and what has to happen before then?
2. If we move the date, what changes in how we work the deal?
3. Third slip in a row? It goes to Lost or Nurture. Today.

For every stage move:

1. What did the buyer do — not us, the buyer — to earn the new stage?
2. What is the exit criterion for the next stage?

## House rules

- The deal owner speaks first, in one breath. Everyone else listens
  before advising.
- "I'll follow up" is not a next step. "Send the revised MSA to Dana
  by Wednesday" is.
- A deal that leaves the room without a next step leaves the pipeline.
- No re-litigating lost deals here — that is the autopsy ritual's job.

## Exit criteria — all four, or the meeting did not end

- [ ] Every stale deal has a named next action with a date
- [ ] Every slipped deal has a new real date or is closed out
- [ ] Each owner has stated two committed moves for the week
- [ ] Notes land in the meeting page within the hour (rotating scribe)

## If you only have 15 minutes

Run the stale block. It is the only block where deals die silently.
`,

  "02-rituals/weekly-forecast.md": `# Weekly forecast — Friday, 30 minutes

Turns the pipeline into a number you can defend to a founder or a
board. The forecast is not a wish list: every dollar in it has a deal,
a date and a reason.

**When:** Friday 15:00 — late enough that the week's news is in,
early enough that people are still thinking.
**Who:** deal owners only. No guests, no observers.
**Where:** the Forecast view: Deals table, grouped by close month,
weighted value shown, closed stages hidden.

## The three buckets — define them once, use them forever

- **Commit:** you would bet your month's number on it. Paper exists,
  or a verbal yes from someone who signs. Slip risk stated out loud.
- **Best case:** could close this month, one known blocker left.
  Name the blocker and the date it resolves.
- **Pipeline:** everything else. It counts toward coverage, never
  toward the number.

## Agenda

| Time | Block | What happens |
| --- | --- | --- |
| 0:00–0:05 | Last week's call | Read back last Friday's three buckets — where were we wrong, and why? |
| 0:05–0:20 | The three buckets | Each owner calls Commit / Best case for every deal closing this month |
| 0:20–0:25 | Coverage math | Weighted pipeline versus next month's target |
| 0:25–0:30 | The one number | Team Commit total goes in the page, dated |

## Coverage math (do it live, on the screen)

1. Next month's target: say it out loud (example: 150,000).
2. Weighted pipeline for next month's close dates: the view's total.
3. Divide pipeline by target. Under 3.0x means the top of the funnel
   is next week's problem — book prospecting blocks now, not at
   month end.
4. Under 1.5x, say the honest sentence: "we will miss unless
   something closes that is not in the pipeline yet."

## Forecast honesty rules

- A deal with no dated next step cannot be in Commit. Move it down.
- Probability follows stage, not optimism. If you want 80%, get the
  deal to Negotiation.
- A slipped Commit deal stays in Commit for one week, with a reason.
  Second slip drops it to Best case, automatically, no discussion.
- Renewals in legal count as Commit only when procurement has the
  paper, not when we sent it.

## Exit criteria

- [ ] Every deal closing this month is in exactly one bucket
- [ ] Team Commit total is written in the meeting page with the date
- [ ] Coverage ratio is written next to it, with the 3.0x verdict
- [ ] Each owner leaves with their gap-closing action if under 3.0x
`,

  "02-rituals/lost-deal-autopsy.md": `# Lost-deal autopsy — 30 minutes per loss

A loss you don't understand is a loss you will repeat. This ritual
runs within 10 business days of any Closed Lost over 10,000 — sooner
if the buyer will still talk.

**Who:** the deal owner plus one person who never touched the deal
(fresh eyes ask the dumb questions that matter).
**Never:** managers scoring the rep, or anyone drafting a "win it
back" email during the meeting. Both kill honesty.

## Step 1 — The buyer interview (before anything else)

If the buyer will take a 15-minute call, their answer beats every
internal theory. Ask exactly this, in this order, then stop talking:

1. "What tipped it — was it one thing or a pile of small things?"
2. "When did you know? What was happening that week?"
3. "What did the winner do that we didn't — honestly?"
4. "What did we do that slowed you down or put you off?"
5. "If price had been equal, same decision?"

Rules: no rebuttals, no "but our security addendum…". You are
collecting data, not defending the deal. Thank them by name, ask if
you may check back in two quarters.

## Step 2 — The write-up (fill this in, every field, 15 minutes)

- Deal, value, days open, entry stage of record (where it really
  started, not where we logged it)
- Who our champion was, and whether they still work there
- The one moment the deal tipped (the buyer's words, quoted)
- What we believed that was false, and when we could have known
- What we would do differently at the same stage next time

## Step 3 — The code (pick exactly one primary, optional secondary)

| Code | Meaning | Typical fix lives in |
| --- | --- | --- |
| P1 | Price / value case too thin | Proposal template, ROI model |
| P2 | Missing product capability | Roadmap note to product |
| P3 | Champion lost or never real | Qualification bar |
| P4 | Incumbent renewed (switch cost) | Displacement playbook |
| P5 | Timing / budget genuinely gone | Nurture, not a loss |
| N0 | No decision (they did nothing) | Qualification bar, exit criteria |

## Step 4 — The monthly batch (first Friday, 20 minutes)

Review every autopsy from the month and answer three questions:

1. Which code showed up twice or more?
2. Which single process change would have saved the most value?
3. What did we write down that we now know we'll never use?

## Exit criteria

- [ ] Buyer's actual reason is quoted in the write-up (or "declined
      interview" is noted, with the two attempts logged)
- [ ] One primary code assigned — never two primaries
- [ ] One lesson added to the team's Lessons page, one line, plain
- [ ] If P2: the capability gap is noted for product within the week
- [ ] If P5: the company moved to Nurture with a dated check-in

## What this ritual is not

It is not a win-back meeting, not a coaching session, and not a place
for "we almost had it". Almost is a stage called Negotiation.
`,

  /* ── 03 Formulas ───────────────────────────────────────────────── */

  "03-formulas/formula-reference.md": `# SalesOS formula reference

Every formula below is copy-paste ready: open a database, click
**New property → Formula**, paste, name it as shown. Property names
inside prop("…") match the CSV headers exactly — if you renamed a
property, update it inside the formula too.

## Deals database

### 1. Weighted Value
\`\`\`
prop("Value") * prop("Probability") / 100
\`\`\`
Stage-probability applied to deal dollars.
Powers: the pipeline summary at the top of Sales home, and the
coverage math in the Friday forecast.

### 2. Days Since Touch
\`\`\`
dateBetween(now(), prop("Last Touch"), "days")
\`\`\`
Whole days since anyone on the team touched the account.
Powers: sorting the Monday review by staleness before anyone talks.

### 3. Freshness
\`\`\`
if(dateBetween(now(), prop("Last Touch"), "days") > 14,
  "🔴 Stale",
  if(dateBetween(now(), prop("Last Touch"), "days") > 7,
    "🟡 Aging",
    "🟢 Fresh"))
\`\`\`
Turns Days Since Touch into a traffic light.
Powers: the review's stale block and the At-risk filter on the board.

### 4. Days To Close
\`\`\`
dateBetween(prop("Close Date"), now(), "days")
\`\`\`
Positive = runway left; negative = already past the date.
Powers: the "closing in 14 days" filter sales leaders actually open.

### 5. Slipped
\`\`\`
if(and(prop("Close Date") < now(),
  not(or(prop("Stage") == "Closed Won", prop("Stage") == "Closed Lost"))),
  "⚠️ Slipped",
  "")
\`\`\`
Flags open deals whose close date is already history.
Powers: the honesty check in the Monday review — reset the date or
close the deal, nothing in between.

### 6. Forecast Month
\`\`\`
formatDate(prop("Close Date"), "MMM YYYY")
\`\`\`
Renders the close date as "Oct 2026".
Powers: grouping the Forecast view by month without a second
property.

### 7. Next Step Check
\`\`\`
if(empty(prop("Next Step")),
  "❌ No next step",
  "→ " + prop("Next Step"))
\`\`\`
A deal without a next step is a wish, on screen.
Powers: the first column of the Monday review — empty ones get
fixed before the meeting starts.

### 8. Probability By Stage (optional upgrade)
\`\`\`
switch(prop("Stage"),
  "Qualifying", 10,
  "Discovery", 25,
  "Demo", 40,
  "Proposal", 60,
  "Negotiation", 80,
  "Closed Won", 100,
  "Closed Lost", 0)
\`\`\`
Replaces the imported Probability number with a stage-driven one, so
probability can never drift from reality.
Powers: Weighted Value, once you delete the old number property.

### 9. Open Value (helper for rollups)
\`\`\`
if(or(prop("Stage") == "Closed Won", prop("Stage") == "Closed Lost"),
  0,
  prop("Value"))
\`\`\`
Deal value, zeroed out once a deal resolves.
Powers: every company-level rollup below — keep this one a number.

## Companies database — rollups

### 10. Account Pipeline (rollup, configured in the property menu)
Property type **Rollup** → relation **Deals** → property **Open
Value** → calculate **Sum**. Notion rollups add up what the relation
points at, using the helper formula from #9 so closed deals vanish.

What it answers: "how much is live at this account right now?"

### 11. Account Pipeline (formula alternative)
\`\`\`
prop("Deals").map(current.prop("Open Value")).sum()
\`\`\`
The same number as a formula — no rollup property needed, and it
survives copy-paste into docs where rollups don't travel.

### 12. Open Deals Count (rollup)
Rollup → relation **Deals** → property **Deal** → calculate **Count
per group**. Skim an account page and see 0, 1 or 4 live deals
before reading a word.

## Contacts database

### 13. Reconnect
\`\`\`
if(dateBetween(now(), prop("Last Touch"), "days") > 30,
  "🌐 Reconnect",
  "✅ In touch")
\`\`\`
Relationship decay, made visible. Thirty days is the default —
tighten to 14 for Champions.
Powers: the Reconnect filter the owner opens before every account
visit.

### 14. Working Days Since Touch (rough)
\`\`\`
dateBetween(now(), prop("Last Touch"), "days")
  - dateBetween(prop("Last Touch"), now(), "weeks") * 2
\`\`\`
Approximates weekdays by shaving two days per elapsed week — good
enough to spot the "we only ever talk Mondays" pattern.
Powers: nothing critical; it earns its keep in quarterly reviews.

## Setup order

1. Import the three CSVs (see 04-setup/setup-guide.md)
2. Wire the relations: Deals.Company → Companies, Contacts.Company →
   Companies
3. Add formulas 1–9 on Deals, 10–12 on Companies, 13–14 on Contacts
4. Point the Monday review at Freshness + Slipped, and the Friday
   forecast at Weighted Value grouped by Forecast Month

Support: support@omniforge.example
`,

  /* ── 04 Setup ──────────────────────────────────────────────────── */

  "04-setup/duplicate-link.md": `# Duplicate SalesOS into Notion

The fastest path: the hosted SalesOS workspace, duplicated with one
click.

**→ https://omniforge.example/duplicates/B-NS-2**

## What the duplicate brings across

1. Click **Duplicate** (top-right of the hosted workspace) and pick
   your team space in the dialog.
2. All three databases arrive with relations, select options and
   every formula from the reference pre-wired.
3. Tick **Include content** in the duplicate dialog to also get the
   75 seeded rows — the same 25 deals, 25 contacts and 25 companies
   you previewed before buying. Leave it unticked for empty
   databases.
4. The demo data is ordinary rows: delete everything, keep the views.

## Prefer your own workspace? Import the CSVs

Notion → New page → slash command /csv → pick a file from
01-databases/. Column headers map 1:1 to Notion property names, so
the formulas in 03-formulas/formula-reference.md plug straight in.
The property-type table and the two relation hooks are in
04-setup/setup-guide.md — the whole import takes about 25 minutes.

## After duplicating: three things to change

- Replace the owners (Priya, Maya, Daniel, Elena, Tom) with your
  team's names in the Owner property options
- Reset the Stage select options to your pipeline's words — the
  formulas only care that "Closed Won" and "Closed Lost" exist
- Skim 02-rituals/ and put the three meetings on the calendar;
  systems without rituals decay in about a quarter

Support: support@omniforge.example — 30-day money-back guarantee.
`,

  "04-setup/setup-guide.md": `# Setup guide — Sales CRM System

Two paths: duplicate the finished workspace (10 minutes) or import
the CSVs into your own (25 minutes). Both end with the same system.

## What's in the kit

- 01-databases/ — deals.csv, contacts.csv, companies.csv, 25
  authored rows each: one quarter of a five-person team's pipeline
  (Q3–Q4 2026), warts included — two lost deals, one stale
  Steelgate entry, a renewal at risk on price
- 02-rituals/ — deal-review (weekly, 45 min), weekly-forecast
  (weekly, 30 min), lost-deal-autopsy (per loss, 30 min)
- 03-formulas/formula-reference.md — 14 copy-paste formulas and
  rollups keyed to these exact property names

## Path A — duplicate the hosted workspace (10 min)

1. Open the link in 04-setup/duplicate-link.md
2. Duplicate → choose your team space → tick "Include content" for
   the seeded rows
3. Skip to "First week" below — the formulas and relations are done

## Path B — import the CSVs (25 min)

Import each file with /csv, then set property types so Notion
interprets them correctly:

| Property | Database | Type |
| --- | --- | --- |
| Deal / Contact / Company | all three | Title |
| Stage, Probability, Influence, Lifecycle, Tier | Deals, Contacts, Companies | Select / Number |
| Value, Employees, ARR | Deals, Companies | Number |
| Owner | all three | Person (after import: change to People) |
| Close Date, Last Touch, Last Activity | all | Date |
| Next Step, Notes, Website, Region, Email, Phone, Title, Industry | varies | Text / URL / Email / Phone |

Then wire two relations:

1. Deals → Companies: add a **Relation** property on Deals named
   Company → connect to the Companies database. On each deal row,
   link the matching company (names match the Company column).
2. Contacts → Companies: same, so every contact sits inside their
   account page.

Finally paste the formulas from 03-formulas/ into each database
(setup order is at the bottom of that file).

## Views worth building first (10 min)

1. **Pipeline board** — Deals as board, grouped by Stage, sorted by
   Value inside columns, Freshness and Weighted Value shown
2. **Forecast** — Deals as table, grouped by Forecast Month, closed
   stages hidden, Weighted Value summed per group
3. **Monday list** — Deals filtered: Freshness contains "Stale" or
   Slipped is not empty. This is the review's agenda
4. **My accounts** — Contacts filtered by owner, grouped by
   Reconnect. Open it before every account call

## First week

- **Monday:** run deal-review on the seeded data — 25 rows is the
  right size to learn the ritual in 45 minutes
- **Wednesday:** replace the example owners with your team, delete
  the rows you don't want, add your live pipeline
- **Friday:** run weekly-forecast once, even if the pipeline is thin.
  The buckets teach faster than a clean quarter would
- **When your first loss lands:** run lost-deal-autopsy the same week

## House rules that keep the system honest

1. If it's not in Deals, it doesn't exist — hallway pipeline is the
   first thing that kills forecasting
2. Last Touch is updated the moment you touch the account, not the
   moment you remember
3. Stage moves need a buyer action behind them, per the review's
   question 1

Support: support@omniforge.example
`,

  /* kit stub note for the extended pack */

  "EXTENDED-PACK/email-sync-playbook.md": `# Email sync playbook — in production

Status: **in production** — not in this archive.

What the finished file will contain: a Notion-to-inbox sync playbook
using the Notion API webhooks pattern, with copy-ready request
templates — moving "Last Touch" and "Next Step" updates out of
manual entry and into an automated two-way flow that the Monday
review can trust.
`,
};

/* ── Try-it demo — 12 deals lifted from deals.csv, board-mapped ──── */

export const demo: DemoContent = {
  kind: "notion",
  workspaceName: "SalesOS — Q4 2026",
  intro:
    "Twelve of the 25 deals that ship in deals.csv, mapped to the pipeline board. Two are in legal, one is about to get the break-up email, and Steelgate has been stale for two weeks — exactly the kind of quarter this system is built to run.",
  rows: [
    {
      id: "deal-01",
      task: "Redline MSA with Harborline legal — security addendum signed",
      owner: "Priya Sharma",
      status: "Review",
      due: "2026-10-30",
      priority: "High",
      effort: 3,
    },
    {
      id: "deal-02",
      task: "Farrier renewal — counter with 3-year flat pricing",
      owner: "Elena Fischer",
      status: "Review",
      due: "2026-10-16",
      priority: "High",
      effort: 3,
    },
    {
      id: "deal-03",
      task: "Meridian Health — walk CFO through the ROI model",
      owner: "Priya Sharma",
      status: "In progress",
      due: "2026-11-20",
      priority: "High",
      effort: 5,
    },
    {
      id: "deal-04",
      task: "Lumen Goods — verbal yes, paper to procurement Tuesday",
      owner: "Daniel Okafor",
      status: "In progress",
      due: "2026-10-21",
      priority: "High",
      effort: 2,
    },
    {
      id: "deal-05",
      task: "Kestrel Robotics — send demo recording + security one-pager",
      owner: "Maya Chen",
      status: "In progress",
      due: "2026-11-06",
      priority: "Med",
      effort: 2,
    },
    {
      id: "deal-06",
      task: "Norlight exec workshop — build the deck by Oct 28",
      owner: "Priya Sharma",
      status: "In progress",
      due: "2026-12-04",
      priority: "Med",
      effort: 5,
    },
    {
      id: "deal-07",
      task: "Hollowfield Bank — feed security answers to product",
      owner: "Daniel Okafor",
      status: "In progress",
      due: "2026-11-25",
      priority: "Med",
      effort: 4,
    },
    {
      id: "deal-08",
      task: "Vantage Point — send the break-up email, keep door open",
      owner: "Maya Chen",
      status: "In progress",
      due: "2026-10-30",
      priority: "Med",
      effort: 1,
    },
    {
      id: "deal-09",
      task: "Quarry Mill — discovery call with Hank Oct 21",
      owner: "Tom Reyes",
      status: "Backlog",
      due: "2026-11-27",
      priority: "Low",
      effort: 2,
    },
    {
      id: "deal-10",
      task: "Glasswing — send Rosa the ROI deck for the internal case",
      owner: "Priya Sharma",
      status: "Backlog",
      due: "2026-12-18",
      priority: "Med",
      effort: 3,
    },
    {
      id: "deal-11",
      task: "Corvid renewal closed — book Q1 expansion scoping",
      owner: "Elena Fischer",
      status: "Done",
      due: "2026-09-18",
      priority: "Med",
      effort: 2,
    },
    {
      id: "deal-12",
      task: "Bluepine expansion closed — onboarding handed off",
      owner: "Elena Fischer",
      status: "Done",
      due: "2026-08-27",
      priority: "Low",
      effort: 1,
    },
  ],
};
