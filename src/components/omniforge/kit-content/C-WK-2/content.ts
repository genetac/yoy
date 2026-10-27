/* ════════════════════════════════════════════════════════════════════
   C-WK-2 · Gym & Fitness Website Kit — sample business: Northline
   Strength Club. 5 authored MDX pages, signup flow + confirmation
   emails, a 37-item local-SEO pack, HealthClub JSON-LD, robots +
   sitemap, content model, pricing FAQ, deploy guide. Every file's key
   equals its bundle path. The Try-it demo (SiteFlythrough) walks the
   same pages with the same copy.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "C-WK-2";

export const files: Record<string, string> = {
  /* ── 01 Five authored pages ────────────────────────────────────── */

  "01-pages/home.mdx": `---
title: Northline Strength Club — coached strength training in NE Portland
description: A 4,200 sq ft coached barbell gym in Portland's Vernon neighborhood. Ten racks, five platforms, 38 classes a week, class caps of twelve.
---

<Section id="home-hero" kicker="Northeast Portland · Est. 2016" title="Strength training for people with jobs.">
<Prose>

Northline is a coached strength club, not a room of treadmills pointed
at a TV. Ten racks, five platforms, thirty-eight classes a week, and a
hard cap of twelve people per class — because the coach on the floor
should know both your name and your deadlift.

You do not need to be fit to start. About half our members had never
touched a barbell before their first session here. The intro is free,
it takes thirty minutes, and you leave with a plan whether or not you
join.

</Prose>
<CTA href="/contact#book" label="Book a free intro session" note="30 minutes · no card required · no sales script" />
</Section>

<Section id="home-how" kicker="How it works" title="Intro session, first eight weeks, then you decide.">
<Prose>

**1. The intro session (30 min).** A coach walks the floor with you,
asks about your schedule and your injury history, and takes you through
a light movement screen. You will squat and hinge an empty bar — badly
is fine, that is what the session is for.

**2. The first eight weeks.** You start in Barbell Fundamentals or
Strength 101. Coaches write your starting weights, watch every working
set, and adjust them before you have to ask. Most members train two or
three times a week; two is enough to feel it working by week six.

**3. Then you decide.** Membership is month-to-month. Freeze it if work
explodes, cancel with thirty days' notice, no exit interview. The
people who stay are the people whose training stopped feeling like a
decision.

</Prose>
</Section>

<Section id="home-classes" kicker="Coached classes" title="Thirty-eight classes a week, capped at twelve.">
<Prose>

- **Barbell Fundamentals** — Mon/Wed 17:30 & 19:00, Fri 12:15. Squat,
  press and deadlift, coached rep by rep. Where you start if the barbell
  is new to you.
- **Conditioning 45** — Mon/Wed/Fri 06:15. Rowing, ski erg, sleds and
  kettlebell complexes. Starts at 6:15, done by 7:05, you still make
  the 7:30 meeting.
- **Team Lift Saturday** — Sat 09:00 & 10:30. Partner workouts, loud
  music, coffee after. The most beginner-friendly hour of the week.

Three more class types — Strength 101, Kettlebell Express, Mobility &
Recovery — run seven days a week between them. The full schedule is on
the classes page.

</Prose>
<CTA href="/classes" label="See the full schedule" />
</Section>

<Section id="home-memberships" kicker="Memberships" title="Three tiers, month to month.">
<Prose>

- **Off-Peak** ({{price_off_peak}}/mo) — the whole floor, weekdays
  09:00–16:00. For shift workers, students and the self-employed.
- **Standard** ({{price_standard}}/mo) — all open hours, four coached
  classes a month, one guest pass.
- **Unlimited** ({{price_unlimited}}/mo) — every class, waitlist
  priority, and a one-to-one session with a coach every quarter.

All three are month-to-month: freeze up to three months a year, cancel
any time with thirty days' notice. No "processing fee", no 12-month
lock-in, no fine print longer than this sentence.

</Prose>
<CTA href="/memberships" label="Compare the tiers" />
</Section>

<Section id="home-coaches" kicker="The coaches" title="Six coaches. Zero drill sergeants.">
<Prose>

Every class is coached by someone who holds a real certification —
CSCS, USA Weightlifting, FRC, StrongFirst — and who trains regularly on
the same floor you will. Head coach Mara Ellinger has run the onboarding
program since the club opened in 2016; she has probably watched three
hundred people bench press for the first time.

</Prose>
<CTA href="/trainers" label="Meet the coaches" />
</Section>

<Section id="home-visit" kicker="Find us" title="2140 Crane Avenue, Vernon.">
<Prose>

Open Mon–Fri 05:30–22:00, Sat 07:00–20:00, Sun 08:00–18:00. Free
parking behind the building, bike racks at the door, and the 72 bus
stops two minutes away. Coffee is always on, sometimes good.

</Prose>
<CTA href="/contact" label="Hours, parking and directions" />
</Section>

<Section id="home-last" kicker="One more thing" title="The hardest lift is the door.">
<Prose>

Book the intro session. Thirty minutes, one coach, zero pressure. If
Northline is not the right gym for you, we will say so and tell you
what is.

</Prose>
<CTA href="/contact#book" label="Book a free intro session" note="Slots Monday–Saturday, same-week availability" />
</Section>
`,

  "01-pages/classes.mdx": `---
title: Class schedule — Northline Strength Club
description: Six coached class types, 38 sessions a week, capped at twelve. Barbell, conditioning, kettlebell and mobility — seven days a week in NE Portland.
---

<Section id="classes-intro" kicker="Coached classes" title="Show up. We'll handle the rest.">
<Prose>

Every class is sixty minutes, capped at twelve people, and led by a
coach who writes the day's weights on the whiteboard before you arrive.
The shape never changes: ten minutes of warm-up and movement prep,
thirty-five to forty minutes of work, five minutes to cool down and
write your numbers down.

You do not pick your own weights for your first month — the coach does,
because guessing is how people get hurt and quit. Book classes up to
seven days ahead from the member app or the front desk. If a class is
full, join the waitlist: spots open most weeks, and the waitlist
promotes automatically.

</Prose>
</Section>

<Section id="classes-barbell" kicker="Barbell" title="Barbell Fundamentals">
<Prose>

The starting point if you are new to barbells, coming back after time
off, or rehabbing confidence after a bad gym experience elsewhere. The
squat, press and deadlift taught over an eight-week rolling curriculum
— you can join any week. Coaches keep the load light until your
positions are consistent, then add weight faster than you expect.

</Prose>
</Section>

<Section id="classes-strength" kicker="Barbell" title="Strength 101">
<Prose>

For graduates of Fundamentals and returning lifters. A linear
progression program you run inside the class: three lifts a session,
five sets of five, weights that go up every week until they stop — then
the coach resets you and keeps you going. You keep a logbook; the coach
keeps you honest.

</Prose>
</Section>

<Section id="classes-conditioning" kicker="Conditioning" title="Conditioning 45">
<Prose>

Forty-five minutes, no barbells. Rowing, ski erg, sled pushes,
kettlebell circuits and bodyweight work in intervals that are hard
enough to matter and short enough to survive. Every movement has an
easier version — the coach scales it to the person, not the other way
around.

</Prose>
</Section>

<Section id="classes-kb" kicker="Conditioning" title="Kettlebell Express">
<Prose>

Forty minutes with one bell. Swings, cleans, presses, squats and
carries, built into flowing complexes that train strength and
conditioning at the same time. Taught by Andre, who will teach you the
hinge you thought you already knew.

</Prose>
</Section>

<Section id="classes-mobility" kicker="Recovery" title="Mobility & Recovery">
<Prose>

The class everyone wishes they had started sooner. Guided mobility for
hips, shoulders and spine; breathing work; and thirty minutes of
loaded stretching that pairs with the barbell classes. Run by Priya,
who spent six years in physiotherapy clinics before coaching and will
tell you exactly which desk posture is eating your squat.

</Prose>
</Section>

<Section id="classes-team" kicker="Saturdays" title="Team Lift Saturday">
<Prose>

Partner workouts at 09:00 and 10:30. You share reps, sleds and
encouragement with whoever lands next to you. Members bring friends,
friends bring parents, and the coffee after is half the point. All
levels welcome — the scaling sheet covers everything from first-timer
to fire-breather.

</Prose>
</Section>

<Section id="classes-pt" kicker="One to one" title="Personal training and nutrition">
<Prose>

One-to-one and two-to-one sessions with any coach, fifty minutes,
booked by the session or in ten-packs. Nutrition coaching runs monthly:
a one-hour setup session, a plan written around how you actually eat,
and a thirty-minute check-in every second week. You do not need a
membership to buy personal training.

</Prose>
<CTA href="/memberships#addons" label="Pricing for PT and nutrition" />
</Section>

<Section id="classes-schedule" kicker="The week" title="Weekly schedule">
<Prose>

| Day | 06:15 | 09:30–16:00 | Midday | Evening |
| --- | --- | --- | --- | --- |
| Mon | Conditioning 45 | Open gym (all tiers) | Mobility & Recovery 12:15 | Barbell Fundamentals 17:30 · Barbell Fundamentals 19:00 |
| Tue | Kettlebell Express | Open gym (all tiers) | — | Strength 101 18:00 |
| Wed | Conditioning 45 | Open gym (all tiers) | Mobility & Recovery 12:15 | Barbell Fundamentals 17:30 · Barbell Fundamentals 19:00 |
| Thu | Kettlebell Express | Open gym (all tiers) | — | Strength 101 18:00 |
| Fri | Conditioning 45 | Open gym (all tiers) | Barbell Fundamentals 12:15 | Open lifting 17:30–20:00 |
| Sat | Team Lift 09:00 · 10:30 | Kettlebell Express 11:45 | — | Open gym until 20:00 |
| Sun | — | Mobility & Recovery 10:00 | Strength 101 11:00 | Open gym until 18:00 |

Open gym hours are the club's full opening hours — the 09:00–16:00
column marks when the Off-Peak tier trains free of the crowd.

</Prose>
</Section>

<Section id="classes-rules" kicker="House rules" title="Booking rules, in plain English">
<Prose>

- Book up to seven days ahead; Unlimited members get waitlist priority.
- Cancel from the app up to **four hours** before class — after that it
  counts as a no-show, and three no-shows pause your class booking for
  two weeks.
- Waitlisted? You are automatically promoted if a spot opens, and you
  get a text the moment it happens. Confirm within two hours or it goes
  to the next person.
- Arrive five minutes early. The whiteboard talk starts on the dot.

</Prose>
<CTA href="/memberships" label="Pick a membership" note="Class access starts the day you join" />
</Section>
`,

  "01-pages/memberships.mdx": `---
title: Memberships — Northline Strength Club
description: Three month-to-month tiers — Off-Peak, Standard, Unlimited — plus day passes, PT packs and nutrition coaching. Freeze up to three months a year.
---

<Section id="mem-intro" kicker="Memberships" title="Three tiers. Month to month. No lock-in.">
<Prose>

Pick the tier that matches your schedule, not your ambition — you can
change tiers any month, and the change takes effect on your next
billing date. Every tier includes the intro-session onboarding, the
member app, showers, towels and the coffee that is sometimes good.

Prices below use the kit's merge fields. Set your real rates once, in
the content model, and every page updates — see the deploy guide,
step 1.

</Prose>
</Section>

<Section id="mem-tiers" kicker="The tiers" title="Off-Peak, Standard, Unlimited.">
<Prose>

**Off-Peak — {{price_off_peak}}/mo.** The full floor — every rack,
platform and machine — weekdays 09:00–16:00, when the club is quietest.
For shift workers, students, remote workers and anyone whose calendar
refuses to cooperate. Coached classes at the {{price_drop_in}} drop-in
rate, or add a four-class pack any month you want it.

**Standard — {{price_standard}}/mo.** All open hours, including
evenings and weekends. Four coached classes a month included (extra
classes at the drop-in rate), plus one guest pass a month — bring
someone you like enough to be sore with.

**Unlimited — {{price_unlimited}}/mo.** Every coached class on the
schedule, waitlist priority, two guest passes a month, and a
fifty-minute one-to-one session with a coach every quarter to
re-test your lifts and rewrite your program.

| | Off-Peak | Standard | Unlimited |
| --- | --- | --- | --- |
| Open gym | weekdays 09:00–16:00 | all hours | all hours |
| Coached classes | {{price_drop_in}} drop-in | 4/mo included | unlimited |
| Guest passes | — | 1/mo | 2/mo |
| Quarterly 1:1 session | — | — | yes |
| Waitlist priority | — | — | yes |
| Month-to-month | yes | yes | yes |

</Prose>
</Section>

<Section id="mem-policy" kicker="The fine print, unhidden" title="Freeze, cancel, pause — the honest version.">
<Prose>

- **Month-to-month.** Thirty days' notice to cancel, by email or at the
  desk. No exit fee, no retention call, no "are you sure" maze.
- **Freeze.** Up to three months a year, in whole-month chunks, no
  charge. Tell us seven days before your billing date.
- **Joining fee.** {{joining_fee}} once, which pays for your sixty-minute
  onboarding session and movement screen — waived if you join within
  seven days of your free intro.
- **First 14 days.** If you have attended three sessions or fewer and
  decide Northline is not for you, we refund the month in full.

</Prose>
</Section>

<Section id="addons" kicker="Without a membership" title="Day passes, PT packs, nutrition.">
<Prose>

- **Day pass — {{price_day_pass}}.** The full floor for one day, including
  a coached class if there is room. Bring photo ID; sign the waiver.
- **Drop-in class — {{price_drop_in}}.** Any coached class, space
  permitting. Non-members can book two days out.
- **Personal training — {{price_pt_single}} a session, or a ten-pack for
  {{price_pt_ten}}.** One-to-one or split a two-to-one with a friend at
  the same price. No membership required.
- **Nutrition coaching — {{price_nutrition}}/mo.** Setup session, written
  plan, check-ins every second week. Pairs with any tier.

</Prose>
</Section>

<Section id="mem-faq-tease" kicker="Questions" title="The ten questions we actually get.">
<Prose>

Student rates, corporate plans, what happens to your rate when prices
change, whether you can pause for a surgery — the pricing FAQ answers
all of it, and the answers are the ones the front desk gives, not the
ones marketing wishes were true.

</Prose>
<CTA href="/contact#book" label="Read the pricing FAQ" />
</Section>

<Section id="mem-cta" kicker="Ready?" title="Join online in about two minutes.">
<Prose>

Pick a tier, enter your details, pay through our payment provider — you
never send card details through this site. Your membership starts the
moment payment clears, and the first email tells you exactly how to
book your onboarding and first class.

</Prose>
<CTA href="/memberships#signup" label="Start signup" note="Steps: tier → details → payment → done" />
</Section>
`,

  "01-pages/trainers.mdx": `---
title: Coaches — Northline Strength Club
description: Six credentialed coaches — CSCS, USA Weightlifting, FRC, StrongFirst. Every class is coached, every coach trains on the same floor you do.
---

<Section id="coaches-intro" kicker="The coaches" title="Certified, on the floor, and reachable.">
<Prose>

Six coaches, one rule: the person coaching your class also trains at
the club, so nothing you struggle with is theoretical to them. Every
coach holds at least one current certification, re-certifies on the
club's clock, and carries the liability insurance that lets you trust
the coaching you did not have to think about.

</Prose>
</Section>

<Section id="coach-mara" kicker="Head coach" title="Mara Ellinger — CSCS, USA Weightlifting L2">
<Prose>

Mara has coached barbell classes since 2013 — first in Chicago, then at
Northline from the week the doors opened in 2016. She runs Barbell
Fundamentals and the onboarding program, which means she has walked
more first-timers through a first squat than anyone in the building.

She coaches the return-from-injury crowd, the over-50 crowd and anyone
who was told at some point that they are "not built for" lifting — a
sentence she has disproved roughly four hundred times and counting.

**Coaches:** Barbell Fundamentals, onboarding, one-to-one.
**Ask her about:** why your squat depth is your business but your back
angle is hers.

</Prose>
</Section>

<Section id="coach-devon" kicker="Strength" title="Devon Okafor — CSCS">
<Prose>

Devon coaches Strength 101 and the evening lifts. A former college
heptathlete, he came to barbell coaching the way most good coaches do —
by being an athlete whose program needed more thinking than talent.

He runs the logbook culture in Strength 101: if your numbers are not
written down, they did not happen, and he will hand you a pencil. His
members stay because the program keeps working after the novelty wears
off.

**Coaches:** Strength 101, evening open lifting, one-to-one.
**Ask him about:** what to do the week your bench stops moving.

</Prose>
</Section>

<Section id="coach-priya" kicker="Mobility" title="Priya Raghavan — FRCms, PN1">
<Prose>

Priya spent six years as a physiotherapy assistant before crossing into
coaching, and it shows in Mobility & Recovery: she can look at your
squat and name the desk posture that is eating it. Her classes pair
loaded stretching with breath work, and her members report the two
least-glamorous, most-requested results in the club — sleeping better
and losing the afternoon back ache.

She also handles the club's return-to-training programming after
physio discharge, working from your therapist's notes if you bring
them.

**Coaches:** Mobility & Recovery, lunchtime classes, one-to-one.
**Ask her about:** the ninety-second hip sequence before your next squat
day.

</Prose>
</Section>

<Section id="coach-tom" kicker="Saturdays" title="Tom Bruns — USA Weightlifting L1">
<Prose>

Tom coaches Team Lift Saturday, the club's loudest and most
beginner-friendly hour. He competed in strongman for a decade, which
taught him two things he now teaches weekly: how to move something
heavy safely, and how to make strangers cheer for each other by 9:15
on a Saturday morning.

His scaling sheet is famous — every workout exists in four versions,
and nobody can tell from across the room which one you are doing.

**Coaches:** Team Lift Saturday, open lifting, one-to-one.
**Ask him about:** the sled-push relay and its four-year grudge match.

</Prose>
</Section>

<Section id="coach-jess" kicker="Pre & postnatal" title="Jessamine Cole — NASM-CPT, pre/postnatal certified">
<Prose>

Jess coaches Barbell Fundamentals and runs the club's pre- and
postnatal programming — the only coached barbell pathway of its kind in
the neighborhood. She coaches pregnant and postpartum lifters with
their care provider's clearance, modifies without drama, and has
written the club's guide to returning to the barbell after a baby.

Her Fundamentals classes are where the club's quietest success stories
happen: people who walked in certain they would be the least athletic
person in the room, and who by week eight are coaching the newcomer
next to them through a set-up.

**Coaches:** Barbell Fundamentals, pre/postnatal, one-to-one.
**Ask her about:** which lifts change first and which barely change at
all.

</Prose>
</Section>

<Section id="coach-andre" kicker="Kettlebells" title="Andre Whitlock — StrongFirst SFG1">
<Prose>

Andre runs Kettlebell Express and the 06:15 Conditioning 45 crew — the
people who did something hard before the rest of Portland found
coffee. He has held his StrongFirst SFG1 since 2018 and teaches the
kettlebell the old way: one hinge, learned properly, before anything
fancy.

His forty-minute classes are the club's best argument that conditioning
does not require a treadmill, a screen, or sixty minutes.

**Coaches:** Kettlebell Express, Conditioning 45, one-to-one.
**Ask him about:** why the swing is a hinge and never a squat.

</Prose>
</Section>

<Section id="coaches-how" kicker="How it works" title="Who coaches you, and how that's decided.">
<Prose>

Your Fundamentals coach is assigned by schedule fit; after that, you
pick by class time. One-to-one clients can request a specific coach,
and if the fit is wrong after two sessions we will move you, no
awkwardness — it is a gym, not a marriage.

Every coach's certifications and re-certification dates are posted at
the front desk, and Continuing Education happens on club time for a
reason: a coach who is learning is a coach worth hiring.

</Prose>
<CTA href="/contact#book" label="Book an intro with a coach" note="Mondays through Saturdays, same week" />
</Section>
`,

  "01-pages/contact.mdx": `---
title: Visit us — Northline Strength Club
description: 2140 Crane Avenue, Portland. Open Mon–Fri 5:30–22:00, Sat 7–20, Sun 8–18. Free parking, bus 72 two minutes away, step-free entrance.
---

<Section id="visit-address" kicker="Find us" title="2140 Crane Avenue, Portland, OR 97227.">
<Prose>

Between 15th and 16th on Crane, in the old Kessler printing works —
look for the roll-up door and the mural of a kettlebell nobody can
explain. The entrance is step-free, the door is heavy, and there is
always someone at the desk during staffed hours.

**Phone:** (503) 555-0142 — answered whenever we're open.
**Email:** hello@northlinestrength.example — replies within one
business day, usually faster.
**Parking:** free lot behind the building, enter from 16th. Bike racks
at the door.
**Transit:** the 72 stops at 15th & Crane, a two-minute walk. The
nearest scooter graveyard is usually outside.

</Prose>
</Section>

<Section id="visit-hours" kicker="Hours" title="We open at 5:30, because someone has to.">
<Prose>

| Day | Open | Staffed |
| --- | --- | --- |
| Monday–Friday | 05:30–22:00 | 06:00–20:00 |
| Saturday | 07:00–20:00 | 08:00–18:00 |
| Sunday | 08:00–18:00 | 09:00–16:00 |
| Holidays | see the member app | closed Thanksgiving & Dec 25 |

Staffed hours mean a human at the desk; outside them, members scan in.
Holiday hours are posted two weeks ahead on the door and in the app.

</Prose>
</Section>

<Section id="visit-accessibility" kicker="Accessibility" title="The floor works for more bodies than most.">
<Prose>

Ground-floor entrance with no steps, an accessible bathroom, an
adjustable-height bench, and a deadlift jack for anyone who trains
seated or with assistance. If you want a walkthrough before joining —
or a coach to meet you at the door — call ahead and we will arrange
it. Tell us what you need and we will tell you honestly whether we can
provide it.

</Prose>
</Section>

<Section id="book" kicker="New here?" title="The intro session is free and takes thirty minutes.">
<Prose>

You will talk with a coach about your schedule and history, take a
light movement screen, and squat an empty bar. You will leave with a
written recommendation — which class, which tier, which coach — and no
obligation. If Northline is the wrong gym for you, we will tell you
that too.

Slots run Monday through Saturday, mornings and evenings, usually with
same-week availability. Choose a time and we confirm by email within
the hour during staffed hours.

</Prose>
<CTA href="#book-form" label="Choose an intro time" note="Or call (503) 555-0142 — a human answers" />
</Section>

<Section id="visit-other" kicker="Everything else" title="Contact, minus the contact form.">
<Prose>

- **Membership questions:** hello@northlinestrength.example or the desk.
- **Corporate and team plans:** five or more people — email us and a
  human (Mara, usually) replies with the rates.
- **Lost something?** The lost-and-found box by the desk is emptied
  quarterly; claim your hoodie before it goes to the shelter.
- **Media and partnerships:** hello@ works for that too; we route it.

We answer the phone during staffed hours, we read every email, and we
have never once pretended the contact form was broken.

</Prose>
</Section>
`,

  /* ── 02 Signup flow ────────────────────────────────────────────── */

  "02-signup/membership-flow.mdx": `---
title: Membership signup flow — spec
description: The four-step online signup: tier selection, member details, provider payment, confirmation. Full form spec and confirmation copy.
---

<Section id="flow-overview" kicker="Signup flow" title="Four steps, about two minutes, zero card fields on our site.">
<Prose>

The signup converts best when it is boring: pick a tier, enter your
details, pay through the payment provider, get a confirmation you can
act on. Steps 1–2 and 4 live on the site; step 3 is the provider's
hosted page, so card data never touches your domain. Analytics events
are listed at the bottom — fire them in order and the funnel reconciles.

</Prose>
</Section>

<Section id="flow-step1" kicker="Step 1 of 4" title="Choose a tier">
<Prose>

A radio group of three cards, keyboard-navigable, one selection
required before Continue enables. Each card shows the tier name, the
monthly price (merge field), the three bullets from the memberships
page, and one "who it's for" line.

| Card | Price line | Bullets | For whom |
| --- | --- | --- | --- |
| Off-Peak | {{price_off_peak}}/mo | whole floor weekdays 09:00–16:00 · app access · freeze any month | shift workers, students, remote |
| Standard | {{price_standard}}/mo | all hours · 4 classes/mo · 1 guest pass/mo | most people |
| Unlimited | {{price_unlimited}}/mo | every class · waitlist priority · quarterly 1:1 | the committed |

Behavior:

- **Preselect via URL:** \`/memberships?tier=standard\` checks that card
  on load — link each tier card on the memberships page to its own URL.
- **Continue** is disabled until a tier is picked; the error state is
  one line, "Pick a tier to continue", never a modal.
- Fire \`tier_selected\` when the user passes step 1, not on every click.

</Prose>
</Section>

<Section id="flow-step2" kicker="Step 2 of 4" title="Your details">
<Prose>

| Field id | Label | Type | Required | Validation | Notes |
| --- | --- | --- | --- | --- | --- |
| full_name | Full name | text | yes | 2+ characters | single field, no title split |
| email | Email | email | yes | valid email | doubles as login; confirm field not needed |
| phone | Mobile | tel | yes | 10+ digits | for class waitlist texts |
| date_of_birth | Date of birth | date | yes | 16+ years | the waiver requires adult status |
| emergency_contact_name | Emergency contact | text | yes | 2+ characters | name of a real human |
| emergency_contact_phone | Emergency contact phone | tel | yes | 10+ digits | may equal mobile; that is fine |
| how_heard | How did you find us? | select | no | — | Friend · Instagram · Google · Walked by · Employer · Other |
| agree_terms | House rules + waiver | checkbox | yes | checked | links open in new tab; unchecked = cannot continue |

Rules:

- Inline validation on blur, not on every keystroke. Errors sit under
  the field, one line each, in this order: "Enter your full name",
  "That email doesn't look right", "Enter a mobile we can text".
- Progress is never lost: step 2 state survives a back navigation from
  step 3 and a page refresh (persist to localStorage on change).
- The waiver text is served from a versioned URL (\`/waiver?v=2\`) so
  you can prove which version a member accepted.

</Prose>
</Section>

<Section id="flow-step3" kicker="Step 3 of 4" title="Payment — off-site, on purpose">
<Prose>

Hand off to the payment provider's hosted checkout (Stripe Checkout or
a Payment Link per tier works well). Send:

1. \`tier_id\` — off_peak | standard | unlimited
2. \`proration\` — if joining mid-billing-cycle, the provider computes
   the prorated first charge; do not compute it client-side
3. \`email\` — from step 2, pre-filled
4. \`success_url\` — \`/memberships#signup/done?session={CHECKOUT_SESSION_ID}\`

The provider returns the customer and subscription ids to your success
handler; store both against the member record. Abandoned payments keep
step-2 details for 14 days — the "finish signup" link in the signup
email works, and details are never reused without consent. No card
numbers, ever, in your own forms or database.

</Prose>
</Section>

<Section id="flow-step4" kicker="Step 4 of 4" title="Confirmation screen">
<Prose>

Show a check mark, then this copy, in this order:

> **You're in, {{first_name}}.**
>
> Your {{tier_name}} membership is active. We've emailed a copy of
> everything below to {{email}}.
>
> 1. **Book your onboarding session** — sixty minutes with a coach,
>    included in your joining fee.
> 2. **Reserve your first class** — Barbell Fundamentals if the barbell
>    is new, Strength 101 if you're coming back.
> 3. **Download the member app** — class booking, waitlist texts and
>    your visit history live there.
>
> See you on the floor.

The onboarding booking link and app store badges are the only actions
on this screen. No offers, no upsells — the welcome email sequence owns
weeks one to four.

</Prose>
</Section>

<Section id="flow-edge" kicker="Edge cases" title="The five that actually happen.">
<Prose>

- **Tier change mid-month:** once per cycle, effective on the next
  billing date.
- **Failed payment on return:** the provider shows its own retry; the
  member lands back on step 3, no data lost.
- **Under 16:** DOB validation blocks with "You must be 16+ to join
  online. Call the club and we'll sort out a junior plan."
- **Duplicate email:** step 2 accepts it; the confirmation email says
  "you already have an account — log in" instead of a second record.
- **Promo code:** one optional field on step 1, validated on blur;
  invalid shows "That code isn't active".

</Prose>
</Section>

<Section id="flow-analytics" kicker="Instrumentation" title="Events, in order.">
<Prose>

| Event | Fires when | Payload |
| --- | --- | --- |
| signup_started | step 1 first interaction | tier preselect source |
| tier_selected | user passes step 1 | tier_id |
| details_completed | user passes step 2 | — (no PII in analytics) |
| payment_redirect | handoff to provider | tier_id |
| signup_completed | provider success handler runs | tier_id |

Never send names, emails or phone numbers to analytics. Counts only.

</Prose>
</Section>
`,

  "02-signup/confirmation-emails.md": `# Confirmation emails — signup & class booking

Three emails, plain-text-friendly, written to survive a phone preview.
Merge fields use double curly braces; every field is listed under each
email. Send all three from the same address so replies land in one
inbox.

## Email 1 — Membership signup confirmation

**Trigger:** signup_completed (payment cleared)
**Send:** immediately
**Subject:** You're in, {{first_name}} — here's what happens next
**Preview text:** Your {{tier_name}} membership is active. First step: book your onboarding.

{{first_name}},

Welcome to Northline. This email is your receipt and your roadmap —
save it.

**What you bought:** {{tier_name}} membership at {{price_monthly}}/mo,
billed monthly starting {{next_billing_date}}. Joining fee
{{joining_fee}} charged once today.

**Do these two things now:**

1. Book your onboarding session (60 min, included in the joining fee):
   {{onboarding_booking_link}}
2. Download the member app and log in with {{email}}:
   {{app_link}}

**Your first class:** most people start with Barbell Fundamentals or
Strength 101. Members book seven days out; Unlimited members get
waitlist priority.

**The practical bits:** the club is at 2140 Crane Avenue — free parking
behind the building, the 72 bus two minutes away. Bring flat shoes, a
water bottle and a towel; showers are stocked.

**Freeze or cancel:** month-to-month, thirty days' notice, up to three
freeze months a year. Details: {{pricing_link}} or just reply here.

See you on the floor,
Northline Strength Club
(503) 555-0142 · hello@northlinestrength.example

*You're receiving this because you joined Northline Strength Club today.
Billing questions? Reply — a human reads this inbox.*

## Email 2 — Class booking confirmation

**Trigger:** a class booking is confirmed (direct or waitlist promotion)
**Send:** immediately
**Subject:** Booked: {{class_name}} — {{class_day}}, {{class_time}}
**Preview text:** With {{coach_name}} · cap 12 · bring flat shoes

Booked — you're on the list.

**{{class_name}}**
{{class_day}} at {{class_time}} (60 min)
Coach: {{coach_name}}
Where: Northline Strength Club, 2140 Crane Avenue

**Bring:** flat shoes, a bottle, a towel. The whiteboard talk starts on
the dot — arrive five minutes early to claim a rack.

**Need to change it?** Cancel from the app up to four hours before
class — after that it counts as a no-show (three no-shows pause class
booking for two weeks).

Booked another and can't make both? Cancel the one you'll skip;
someone on the waitlist gets the spot and the good karma.

— Northline member app
Manage bookings: {{bookings_link}}

## Email 3 — Waitlist promotion (bonus)

**Trigger:** a spot opens and this member is first on the waitlist
**Send:** immediately; also fires the SMS
**Subject:** Spot opened: {{class_name}} — confirm within 2 hours
**Preview text:** You're first on the list. Confirm by {{confirm_by}} or it moves on.

{{first_name}},

A spot just opened in **{{class_name}}, {{class_day}} at
{{class_time}}**, and you're first on the list.

Confirm by {{confirm_by}}: {{confirm_link}}

If you pass, no action needed — the spot moves to the next person and
you stay on the list for later openings.

— Northline member app

## Merge fields used

| Field | Email 1 | Email 2 | Email 3 | Sample |
| --- | --- | --- | --- | --- |
| first_name | ✓ | | ✓ | Maya |
| tier_name | ✓ | | | Standard |
| price_monthly | ✓ | | | 89 |
| next_billing_date | ✓ | | | Nov 1 |
| joining_fee | ✓ | | | 49 |
| onboarding_booking_link | ✓ | | | (booking URL) |
| app_link | ✓ | | | (store URL) |
| pricing_link | ✓ | | | /memberships |
| class_name | | ✓ | ✓ | Barbell Fundamentals |
| class_day / class_time | | ✓ | ✓ | Thursday · 19:00 |
| coach_name | | ✓ | | Mara |
| bookings_link | | ✓ | | (app URL) |
| confirm_by / confirm_link | | | ✓ | 2h deadline · URL |

The same merge fields power the site's signup confirmation screen —
keep the values in one place (see the content model).
`,

  /* ── 03 Local SEO pack ─────────────────────────────────────────── */

  "03-seo/local-seo-checklist.md": `# Local SEO checklist — gyms & fitness studios

37 concrete items, ordered by return on effort. Everything is free
unless marked. Work top to bottom; the first 9 items move rankings more
than the other 28 combined.

Legend: **GBP** = Google Business Profile · **NAP** = name, address,
phone (must match everywhere, character for character).

## 1 · Google Business Profile (items 1–9)

1. Claim and verify the profile at google.com/business — postcard or
   video verification, under a week.
2. Set the primary category to **Gym** (or **Health Club** if you run
   open-gym hours plus coached classes). Primary category outweighs
   every other editable signal.
3. Add secondary categories: **Physical Fitness Program** if you run
   coached classes; **Personal Trainer** if you sell one-to-one work.
4. Add each class type as a named GBP service — "Barbell Fundamentals",
   not "fitness training". Searchers see services; Google matches them
   to queries.
5. Set the booking link to your memberships or schedule page, never the
   homepage — one fewer click, measurably more signups.
6. Upload 20+ real photos: the floor at busy hour, each class in
   session, the street entrance, the parking lot, the changing rooms.
   Stock graphics rank nothing and convert less.
7. Publish the class schedule URL in the profile description and keep
   it crawlable HTML on the site (the kit's classes page ships this
   way — keep it, don't swap it for a PDF).
8. Set holiday hours for every date you deviate — wrong holiday hours
   are the most common GBP complaint in this vertical, and Google
   actively suppresses profiles it catches twice.
9. Fill in every true attribute (showers, Wi-Fi, lockers, free
   parking). Each attribute is a filter searchers apply.

## 2 · Reviews (items 10–15)

10. Ask at milestone moments — first month done, first PR, friend
    referred — not at the door. A two-line SMS with a direct review
    link beats any lobby poster.
11. Reply to every review, 5 stars and 1 star, within 48 hours. Name
    the class or coach they mention; it reads like a gym, not a bot.
12. Never offer anything for reviews — free months and merch deals
    violate Google's policies and this vertical gets audited.
13. Stand up a /review page that redirects to the review form and put
    it in the signup confirmation email footer.
14. Flag policy-violating reviews (spam, competitor, private data) in
    GBP instead of arguing publicly.
15. Watch velocity over average: steady 3–5 real reviews a month
    signals a live gym better than a 4.9 that stopped in 2023.

## 3 · Citations & maps (items 16–21)

16. Pick one phone number and one address format; make them identical
    on the site footer, GBP, and every listing below.
17. Apple Business Connect — powers Apple Maps and Siri "gym near me"
    queries on iPhone, which default here, not to Google.
18. Bing Places — imports from GBP in one click; feeds Bing, DuckDuckGo
    and Outlook maps.
19. Yelp — claim it even if you never look at it again; unclaimed
    pages collect wrong hours and one-star drive-bys.
20. Local directories worth 20 minutes each: city chamber of commerce,
    neighborhood business association, state fitness association.
21. Pitch local "best gyms" listicles with numbers — class caps, coach
    credentials, founding year — not adjectives. Editors print numbers.

## 4 · On-page (items 22–27)

22. Title pattern site-wide: "<Neighborhood> Gym — <Business Name>" or
    "Strength Classes in <City> — <Business Name>". Pick one.
23. Name the neighborhood and city in the home page H1 or first
    paragraph — the kit's home page copy does this for Portland's
    Vernon; replace it with yours once, everywhere it appears.
24. Keep the class schedule as HTML tables and lists (as shipped) —
    images and PDFs are invisible to rankings.
25. Spell out certification names on the coaches page (CSCS, USA
    Weightlifting L2, FRC) — "CSCS coach <city>" is an exact-match
    query people actually type.
26. Skip FAQ structured data: Google stopped showing FAQ rich results
    for ordinary sites in 2023. Keep the question headings — they still
    earn sitelinks and voice answers.
27. Internal-link class names wherever they appear (home → classes →
    memberships) with the class name as the link text.

## 5 · Local links & community (items 28–31)

28. Join the neighborhood business association; member directories are
    the highest-authority local links available per hour of effort.
29. Partner with non-competing fitness businesses — run clubs, physio
    clinics, yoga studios without barbells. Trade guest passes, then
    ask for the link.
30. Sponsor what your members already do: a local 5K, a powerlifting
    meet, a school team. Sponsor pages link out.
31. Corporate wellness: employers within five miles publish gym
    discount pages; ask HR to list you on the external benefits site,
    not just the intranet.

## 6 · Technical (items 32–35)

32. Install \`03-seo/json-ld.json\` in the site layout so every page
    carries it. The Rich Results Test will call LocalBusiness "not a
    rich result" — expected; use Search Console URL inspection to
    confirm it parses.
33. Drop \`robots.txt\` and \`sitemap.xml\` at the domain root (edit
    the domain in both first), then submit the sitemap in Search
    Console once.
34. Run PageSpeed Insights on the home page; fix anything under 50 on
    mobile before touching anything else in this file.
35. The footer NAP must match the JSON-LD address exactly — suite
    numbers and spelling drift quietly dilute both.

## 7 · Measure (items 36–37)

36. In Search Console, filter queries for "gym", "strength", "fitness"
    plus your city and neighborhood names; review monthly, not daily.
37. In GBP insights, track direction requests, phone taps and website
    clicks. Rising directions with flat signups is a front-desk
    problem, not an SEO problem — fix the tour-to-join rate first.
`,

  "03-seo/json-ld.json": `{
  "@context": "https://schema.org",
  "@type": "HealthClub",
  "@id": "https://www.northlinestrength.example/#club",
  "name": "Northline Strength Club",
  "description": "Coached strength training gym in Portland's Vernon neighborhood: barbell classes capped at twelve, ten racks, five platforms, open seven days a week.",
  "url": "https://www.northlinestrength.example/",
  "telephone": "+1-503-555-0142",
  "image": [
    "https://www.northlinestrength.example/photos/club-floor.jpg",
    "https://www.northlinestrength.example/photos/class-in-session.jpg"
  ],
  "priceRange": "$$",
  "foundingDate": "2016",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2140 Crane Avenue",
    "addressLocality": "Portland",
    "addressRegion": "OR",
    "postalCode": "97227",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.5586,
    "longitude": -122.6445
  },
  "hasMap": "https://www.google.com/maps/search/?api=1&query=Northline+Strength+Club+Portland",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "05:30",
      "closes": "22:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "07:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "08:00",
      "closes": "18:00"
    }
  ],
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "Showers", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Free parking", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Lockers", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Wheelchair accessible entrance", "value": true }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-503-555-0142",
    "contactType": "membership",
    "areaServed": "Portland, OR"
  },
  "sameAs": [
    "https://www.instagram.com/northlinestrength",
    "https://www.facebook.com/northlinestrength",
    "https://www.youtube.com/@northlinestrength"
  ]
}
`,

  "03-seo/robots.txt": `# Northline Strength Club — robots.txt
# Replace www.northlinestrength.example with your domain before launch.

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /waiver/signed/

# The signup success callback carries a session id — keep it out of logs.
Disallow: /memberships#signup/done

Sitemap: https://www.northlinestrength.example/sitemap.xml
`,

  "03-seo/sitemap.xml": `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.northlinestrength.example/</loc>
    <lastmod>2026-10-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.northlinestrength.example/classes</loc>
    <lastmod>2026-10-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.northlinestrength.example/memberships</loc>
    <lastmod>2026-10-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.northlinestrength.example/trainers</loc>
    <lastmod>2026-10-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.northlinestrength.example/contact</loc>
    <lastmod>2026-10-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`,

  /* ── 04 Content model + pricing FAQ ────────────────────────────── */

  "04-content-model/content-model.md": `# Content model — Gym & Fitness Kit

One rule holds the kit together: every fact lives in exactly one place,
and every page reads it from there. This file is the map, the field
dictionary and the sync contract.

## Pages and their sections

| Page | Section id | Component stack | Contains |
| --- | --- | --- | --- |
| home | home-hero | Section + Prose + CTA | promise, intro-session CTA |
| home | home-how | Section + Prose | 3-step "how it works" |
| home | home-classes | Section + Prose + CTA | 3 class snapshots |
| home | home-memberships | Section + Prose + CTA | 3 tier one-liners |
| home | home-coaches | Section + Prose + CTA | coach teaser |
| home | home-visit | Section + Prose + CTA | hours + location |
| home | home-last | Section + Prose + CTA | closing CTA |
| classes | classes-intro … classes-team | Section + Prose | one section per class type |
| classes | classes-schedule | Section + Prose | weekly schedule table |
| classes | classes-rules | Section + Prose + CTA | booking rules |
| memberships | mem-intro, mem-tiers | Section + Prose | tier cards + comparison table |
| memberships | mem-policy | Section + Prose | freeze/cancel/fee policy |
| memberships | addons | Section + Prose | day pass, PT, nutrition |
| trainers | coach-* (×6) | Section + Prose | one section per coach |
| contact | visit-address, visit-hours | Section + Prose | address, hours tables |
| contact | book | Section + Prose + CTA | intro-session booking |

## Frontmatter

Every page starts with:

- title — 50–60 characters, ends with the business name
- description — 140–160 characters, includes the neighborhood + city

## Components

- \`<Section id kicker title>\` — page section wrapper. \`id\` is the
  anchor (used by CTAs like \`/contact#book\`), \`kicker\` is the small
  label above the heading, \`title\` is the H2.
- \`<Prose>\` — reading-measure container for the section body; all
  lists, tables and bold leads live inside it.
- \`<CTA href label note? />\` — button-style link; \`note\` is the
  small reassurance line under it. One primary CTA per page maximum.

## Site config — the single source of truth

| Key | Sample value | Used by |
| --- | --- | --- |
| name | Northline Strength Club | all pages, JSON-LD, emails |
| address | 2140 Crane Avenue, Portland, OR 97227 | contact, home, JSON-LD |
| phone | (503) 555-0142 | contact, home, emails, JSON-LD |
| email | hello@northlinestrength.example | contact, emails |
| domain | www.northlinestrength.example | sitemap, robots, JSON-LD |
| hours | Mon–Fri 05:30–22:00 · Sat 07:00–20:00 · Sun 08:00–18:00 | contact, home, JSON-LD |

Change a value here and everywhere it appears, or nothing at all — the
deploy guide's find-and-replace table implements exactly this list.

## Merge fields (prices and email tokens)

Prices exist only as merge fields — never hard-code a number twice.

| Field | Appears in | Sample value |
| --- | --- | --- |
| {{price_off_peak}} | home, memberships, FAQ | 49 |
| {{price_standard}} | home, memberships, FAQ | 89 |
| {{price_unlimited}} | home, memberships, FAQ | 129 |
| {{price_day_pass}} | memberships, FAQ | 15 |
| {{price_drop_in}} | classes, memberships, FAQ | 18 |
| {{price_pt_single}} | memberships, classes, FAQ | 85 |
| {{price_pt_ten}} | memberships, FAQ | 760 |
| {{price_nutrition}} | memberships, FAQ | 99 |
| {{joining_fee}} | memberships, FAQ, email 1 | 49 |
| {{student_discount}} | FAQ | 15% |

Email merge fields ({{first_name}}, {{tier_name}}, {{class_name}},
{{coach_name}} …) are documented in
\`02-signup/confirmation-emails.md\` and follow the same rule: sample
values live in tables, never in body copy.

## Form field ids — the signup contract

\`full_name\`, \`email\`, \`phone\`, \`date_of_birth\`,
\`emergency_contact_name\`, \`emergency_contact_phone\`, \`how_heard\`,
\`agree_terms\`, \`tier_id\` (off_peak | standard | unlimited).

These ids are the contract between the form, the payment handoff, the
confirmation screen and the analytics events. Rename one, rename it in
\`02-signup/membership-flow.mdx\` and your API in the same commit.

## Sync rules

1. The schedule table on the classes page is the schedule of record.
   Change a time there first, then the member app, then GBP hours.
2. Hours appear in three places — contact table, home teaser, JSON-LD
   \`openingHoursSpecification\`. All three change together or none.
3. The tier list appears on home (one-liners), memberships (cards) and
   the signup flow (step 1). Keep bullets and tier ids aligned.
4. Coach certifications appear on the trainers page and in GBP services;
   when a coach re-certifies, update both.

## What NOT to model

Resist per-class pages until a class sustains its own content — the
single schedule page is stronger for a club this size. Model data, not
aspirations.
`,

  "04-content-model/pricing-faq.mdx": `---
title: Pricing FAQ — Northline Strength Club
description: The ten questions new members actually ask: joining fee, freezing, cancellation, student rates, refunds and PT pricing — answered plainly.
---

<Section id="faq-intro" kicker="Pricing" title="The questions the front desk gets, answered the way the front desk answers.">
<Prose>

Every answer below is the real policy — the same one the desk quotes,
applied the same way whether you ask in person, by email, or at
11pm on the signup page.

</Prose>
</Section>

<Section id="faq-cost" kicker="The basics" title="What does a membership cost?">
<Prose>

Three tiers, month-to-month: **Off-Peak** at {{price_off_peak}}/mo
(weekdays 09:00–16:00), **Standard** at {{price_standard}}/mo (all
hours, four classes a month), **Unlimited** at {{price_unlimited}}/mo
(every class, waitlist priority, a quarterly one-to-one). There is no
third-party "initiation fee" — just the joining fee below.

</Prose>
</Section>

<Section id="faq-joining" kicker="The basics" title="Is there a joining fee?">
<Prose>

{{joining_fee}}, once. It pays for your sixty-minute onboarding session
and movement screen — the hour where a coach sets your starting weights
and shows you how the floor works. Join within seven days of your free
intro session and we waive it.

</Prose>
</Section>

<Section id="faq-contract" kicker="Commitment" title="Am I signing a contract?">
<Prose>

No. Month-to-month, with thirty days' notice to cancel. We would rather
earn the next month than trap you in a year you resent — the members
who stay on purpose are the ones who actually train.

</Prose>
</Section>

<Section id="faq-freeze" kicker="Commitment" title="Can I freeze my membership?">
<Prose>

Yes — up to three months per calendar year, in whole-month chunks, no
fee. Tell us seven days before your billing date (email or the desk)
and billing pauses; your tier, booking history and streak all wait for
you. Surgery, sabbatical, new baby: all normal reasons, no doctor's
note required.

</Prose>
</Section>

<Section id="faq-cancel" kicker="Commitment" title="How do I cancel?">
<Prose>

Email hello@northlinestrength.example or tell the desk: "cancel at the
end of next billing period." That's the whole process. Thirty days'
notice, no exit fee, no retention gauntlet, and your visit history
stays in the app for a year if you come back.

</Prose>
</Section>

<Section id="faq-student" kicker="Discounts" title="Do you have student rates?">
<Prose>

Yes — {{student_discount}} off Standard and Unlimited with a current
student ID, applied any month you ask for it (including just during
term time). Show the ID at the desk once and we flag your account for
the year.

</Prose>
</Section>

<Section id="faq-corporate" kicker="Discounts" title="Does my employer count?">
<Prose>

If five or more people from one employer want in, that's a corporate
plan — better rates, one invoice, and we'll run a quarterly on-site
session if you want one. Email hello@ with your company name and head
count and Mara replies with the sheet, usually same day.

</Prose>
</Section>

<Section id="faq-dropin" kicker="No membership" title="Can I try it without joining?">
<Prose>

Three ways: a **free intro session** (thirty minutes, one coach, the
best first step), a **day pass** at {{price_day_pass}} (the whole floor
plus a class if there's room), or a **drop-in class** at
{{price_drop_in}} — non-members can book two days out. If you join
within seven days of a day pass, we credit it toward your first month.

</Prose>
</Section>

<Section id="faq-pt" kicker="One to one" title="What does personal training cost?">
<Prose>

{{price_pt_single}} a session, or a ten-pack at {{price_pt_ten}} — and
two-to-one is the same price split between you, so training with a
friend costs half each. No membership required to buy PT. Nutrition
coaching runs {{price_nutrition}}/mo (setup session, written plan,
check-ins every second week) and stacks with any tier or none.

</Prose>
</Section>

<Section id="faq-refund" kicker="Risk" title="What if I join and hate it?">
<Prose>

Then we'd rather give the money back than have you dread coming. First
14 days, three visits or fewer, full refund of the month — tell us
either way, because the "why" genuinely changes what we stock, coach
and schedule.

</Prose>
</Section>

<Section id="faq-payment" kicker="Logistics" title="How do I pay?">
<Prose>

Card, through the payment provider's hosted page — you never type card
details into this site. Billing runs monthly on your join date; the
receipt is emailed every cycle. Prices: when they change, existing
members keep their current rate through the end of the current
calendar year, and any change arrives by email thirty days before it
happens. In writing, every time.

</Prose>
<CTA href="/contact#book" label="Still deciding? Book a free intro" note="The FAQ is cheaper than the wrong membership" />
</Section>
`,

  /* ── 05 Deploy guide ───────────────────────────────────────────── */

  "05-deploy/deploy-guide.md": `# Deploy guide — Gym & Fitness Kit

Download to a live site in under an hour. Steps 1–3 are the site; 4–5
wire the flow; 6–7 handle SEO; 8 is the launch check. The commands
assume Next.js (App Router) — the MDX pages port to Astro or any MDX
pipeline with the same content and the components from step 2.

## 0 · What you're holding

| Path | What it is | Lands at |
| --- | --- | --- |
| 01-pages/*.mdx | 5 authored pages | app routes: /, /classes, /memberships, /trainers, /contact |
| 02-signup/ | signup flow spec + emails | your form + ESP |
| 03-seo/ | checklist, JSON-LD, robots, sitemap | layout + public/ |
| 04-content-model/ | field dictionary, pricing FAQ | your reference |
| 05-deploy/ | this guide + walkthrough | — |

## 1 · Replace the sample business (15 min)

Find-and-replace, once, across all files:

| Find | Replace with |
| --- | --- |
| Northline Strength Club | your club name |
| 2140 Crane Avenue, Portland, OR 97227 | your street address |
| (503) 555-0142 / +1-503-555-0142 | your phone |
| hello@northlinestrength.example | your inbox |
| www.northlinestrength.example | your domain (robots, sitemap, JSON-LD) |
| Vernon | your neighborhood |
| 05:30–22:00 etc. | your hours (three places — see sync rules in 04-content-model/) |

Then set real values for the ten price merge fields — the sample values
live only in \`04-content-model/content-model.md\`.

## 2 · Run it locally (10 min)

\`\`\`bash
npx create-next-app@latest my-gym-site --typescript --app
cd my-gym-site && npm i @next/mdx @mdx-js/react @types/mdx
\`\`\`

- Copy the five MDX pages into \`content/pages/\` and render them with
  an MDX pipeline (dynamic route: \`app/[slug]/page.tsx\`).
- Implement the three components (about 40 lines total):

\`\`\`tsx
export function Section(props: { id: string; kicker?: string; title: string; children: React.ReactNode }) {
  return <section id={props.id}><p>{props.kicker}</p><h2>{props.title}</h2>{props.children}</section>;
}
export function Prose(props: { children: React.ReactNode }) {
  return <div className="prose">{props.children}</div>;
}
export function CTA(props: { href: string; label: string; note?: string }) {
  return <a href={props.href} className="cta">{props.label}{props.note && <small>{props.note}</small>}</a>;
}
\`\`\`

Sign conventions: \`Section\` renders the H2 from \`title\`; MDX front
matter becomes the page title and description via generateMetadata.

## 3 · Wire the signup form (15 min)

Three options, best-first for a single-location club:

1. **Payment Links (no backend):** create one hosted link per tier in
   your payment provider, then link the memberships page's tier cards
   to \`/memberships?tier=…\` and redirect Continue to the matching
   link. The provider collects email; the confirmation email is your
   receipt trigger.
2. **Form service + provider:** post step-2 fields to a form handler
   (field ids are the contract — see the content model), then hand off
   to the provider's checkout with the ids from
   \`02-signup/membership-flow.mdx\`.
3. **Your own API:** validate server-side (same rules as the spec),
   create the customer, redirect to checkout, handle the success
   webhook before trusting the subscription.

## 4 · Wire the confirmation emails (10 min)

Paste the three emails from \`02-signup/confirmation-emails.md\` into
your ESP (or provider's email product) and map the merge fields.
Trigger 1 on the payment success webhook; 2 and 3 on your booking
system's events. Keep the same sender for all three.

## 5 · Install the SEO pack (5 min)

- Put \`json-ld.json\` inline in the root layout as
  \`<script type="application/ld+json">\` — one include, every page.
- Copy \`robots.txt\` and \`sitemap.xml\` into \`public/\`; edit the
  domain in both first.
- Book 30 minutes with \`03-seo/local-seo-checklist.md\` — items 1–9
  are the ones that move rankings.

## 6 · Verify (5 min)

- Search Console: add property, submit the sitemap, request indexing
  for the home page.
- Rich Results Test on the home page (LocalBusiness parses; it will
  say it's not a rich result — expected, see the checklist item 32).
- Fill your own signup end to end once with a test card.

## 7 · Analytics (optional, 10 min)

Fire the five events from the flow spec (tier_selected …
signup_completed). No names or emails in analytics — counts only.

## 8 · Launch checklist

- [ ] \`rg "555-0142"\` returns nothing (sample data all replaced)
- [ ] domain replaced in robots.txt, sitemap.xml, json-ld.json, emails
- [ ] all ten price merge fields render real values
- [ ] waiver link resolves to a versioned URL
- [ ] test signup: confirmation email 1 arrives within a minute
- [ ] intro-session link books a real slot
- [ ] PageSpeed mobile score ≥ 85

Stuck on something in this guide: support@omniforge.example — real
humans, one-business-day replies.
`,

  "05-deploy/walkthrough-link.md": `# Walkthrough

A 9-minute video walkthrough of this kit — every page annotated, the
signup flow run end to end, and the SEO pack installed:

**→ https://omniforge.example/walkthroughs/C-WK-2**

Contents:
- 00:00 — What's in the kit, and the one rule (single source of truth)
- 01:05 — The five pages, page by page
- 03:40 — Signup flow: tier → details → payment → confirmation
- 05:50 — The three confirmation emails and their merge fields
- 07:00 — Local SEO pack: checklist, HealthClub JSON-LD, sitemap
- 08:20 — Deploy in under an hour, step by step

The video is hosted (not bundled) so the kit stays small.
`,

  /* kit stub note for the extended pack */

  "EXTENDED-PACK/member-app-wireframes.md": `# Member app wireframes — in production

Status: **in production** — not in this archive.

What the finished file will contain: annotated wireframes and component
specs for a companion member app — class booking and automatic waitlist
promotion with the two-hour confirm window, visit streaks, personal-record
tracking with charts, and the push/SMS rules that mirror the emails in
\`02-signup/confirmation-emails.md\`. Same format as the web signup flow,
so your developers implement once.
`,
};

/* ── Try-it demo — the same site, walked page by page ─────────────── */

export const demo: DemoContent = {
  kind: "site",
  siteName: "Northline Strength Club",
  vertical: "gym",
  intro:
    "Walk the Northline Strength Club site like a visitor: five pages of finished copy, the membership signup with its tier picker, and the booking fields exactly as they ship. This is the same content you download.",
  pages: [
    {
      id: "home",
      title: "Home",
      sections: [
        {
          kind: "hero",
          heading: "Strength training for people with jobs.",
          copy: "Northline is a coached strength club, not a room of treadmills pointed at a TV. Ten racks, five platforms, thirty-eight classes a week, and a hard cap of twelve people per class — because the coach on the floor should know both your name and your deadlift. You do not need to be fit to start; about half our members had never touched a barbell before their first session here.",
        },
        {
          kind: "services",
          heading: "Thirty-eight classes a week, capped at twelve.",
          copy: "Barbell Fundamentals (Mon/Wed 17:30 & 19:00, Fri 12:15) is where you start if the barbell is new. Conditioning 45 (Mon/Wed/Fri 06:15) is rowing, sleds and kettlebell complexes that end before 7:05. Team Lift Saturday is partner workouts, loud music and coffee after — the most beginner-friendly hour of the week.",
        },
        {
          kind: "proof",
          heading: "Three tiers. Month to month.",
          copy: "Off-Peak, Standard and Unlimited — every one month-to-month, freezable up to three months a year, cancellable with thirty days' notice. No processing fee, no twelve-month lock-in, no fine print longer than this sentence. Six coaches on the floor, all CSCS, USA Weightlifting, FRC or StrongFirst certified.",
        },
        {
          kind: "booking",
          heading: "Book a free intro session.",
          copy: "Thirty minutes, one coach, zero pressure. A movement screen, an empty bar, and a written recommendation — which class, which tier, which coach. If Northline is the wrong gym for you, we will tell you that too.",
        },
      ],
    },
    {
      id: "classes",
      title: "Classes",
      sections: [
        {
          kind: "services",
          heading: "Six class types, seven days a week.",
          copy: "Every class is sixty minutes, capped at twelve, and led by a coach who writes the day's weights on the whiteboard before you arrive. Barbell Fundamentals and Strength 101 for the barbell track; Conditioning 45 and Kettlebell Express for engines; Mobility & Recovery for the class everyone wishes they had started sooner; Team Lift Saturday for partner work and coffee after.",
        },
        {
          kind: "hours",
          heading: "The weekly schedule.",
          copy: "06:15 early birds Monday to Friday, lunchtime sessions at 12:15, evening blocks at 17:30 and 19:00, and the full weekend grid from 09:00. Open gym runs every opening hour — the 09:00–16:00 weekday block is when the Off-Peak tier trains away from the crowd. Book up to seven days ahead; waitlists promote automatically by text.",
        },
        {
          kind: "booking",
          heading: "Booking rules in plain English.",
          copy: "Cancel from the app up to four hours before class. Waitlisted? You are automatically promoted if a spot opens — confirm within two hours or it moves to the next person. Arrive five minutes early; the whiteboard talk starts on the dot.",
        },
      ],
    },
    {
      id: "memberships",
      title: "Memberships",
      sections: [
        {
          kind: "services",
          heading: "Off-Peak, Standard, Unlimited.",
          copy: "Off-Peak is the whole floor, weekdays 09:00–16:00, for shift workers and the self-employed. Standard adds all open hours plus four coached classes and a guest pass a month. Unlimited is every class, waitlist priority, two guest passes and a fifty-minute one-to-one with a coach every quarter. Prices are merge fields — set yours once in the content model.",
        },
        {
          kind: "proof",
          heading: "The fine print, unhidden.",
          copy: "Month-to-month with thirty days' notice. Freeze up to three months a year at no charge. The joining fee pays for your sixty-minute onboarding and movement screen — waived if you join within seven days of your free intro. First fourteen days, three visits or fewer, full refund.",
        },
        {
          kind: "booking",
          heading: "Join online in about two minutes.",
          copy: "Pick a tier, enter your details, pay through the payment provider's hosted page — card data never touches this site. Your membership starts the moment payment clears, and the first email tells you exactly how to book your onboarding and first class.",
        },
      ],
    },
    {
      id: "trainers",
      title: "Coaches",
      sections: [
        {
          kind: "team",
          heading: "Six coaches. Zero drill sergeants.",
          copy: "Mara Ellinger (CSCS, USA Weightlifting L2) runs Fundamentals and onboarding and has walked more first-timers through a first squat than anyone in the building. Devon Okafor (CSCS) runs the Strength 101 logbook culture. Priya Raghavan (FRCms, PN1) came from six years in physiotherapy clinics. Tom Bruns (USAW L1) is a decade-strong strongman turned Saturday ringleader. Jessamine Cole (NASM-CPT, pre/postnatal) runs the neighborhood's only coached postnatal barbell pathway. Andre Whitlock (StrongFirst SFG1) teaches the kettlebell the old way: one hinge, learned properly.",
        },
        {
          kind: "proof",
          heading: "Certified, on the floor, and reachable.",
          copy: "Every coach holds at least one current certification, re-certifies on the club's clock, and trains on the same floor you will. Certifications and re-certification dates are posted at the front desk — Continuing Education happens on club time for a reason.",
        },
        {
          kind: "booking",
          heading: "Book an intro with a coach.",
          copy: "Your Fundamentals coach is assigned by schedule fit; after that you pick by class time. One-to-one clients can request a coach, and if the fit is wrong after two sessions we move you, no awkwardness.",
        },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      sections: [
        {
          kind: "hours",
          heading: "2140 Crane Avenue, Portland.",
          copy: "Open Mon–Fri 05:30–22:00, Sat 07:00–20:00, Sun 08:00–18:00 — staffed 06:00–20:00 weekdays. Free parking behind the building (enter from 16th), bike racks at the door, and the 72 bus stops two minutes away. Step-free entrance, accessible bathroom, adjustable bench and a deadlift jack — call ahead and a coach meets you at the door.",
        },
        {
          kind: "booking",
          heading: "The intro session is free.",
          copy: "Thirty minutes: your schedule, your injury history, a light movement screen, an empty bar. You leave with a written recommendation and no obligation. Slots run Monday to Saturday, usually with same-week availability; we confirm by email within the hour during staffed hours.",
        },
      ],
    },
  ],
  bookingFields: [
    { key: "full_name", label: "Full name", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "phone", label: "Mobile", type: "tel" },
    {
      key: "membership_tier",
      label: "Membership tier",
      type: "select",
      options: [
        "Off-Peak — weekdays 09:00–16:00",
        "Standard — all hours + 4 classes/mo",
        "Unlimited — every class + quarterly 1:1",
      ],
    },
  ],
};
