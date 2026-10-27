/* ════════════════════════════════════════════════════════════════════
   B-NS-4 · Personal Life OS — LifeOS
   3 databases with 25 authored rows each (habits, reading list,
   budget), 3 personal rituals, formula reference, duplicate-link
   and setup guide. Every file's key equals its bundle path. The
   Try-it demo tours 12 of the same habits that ship in habits.csv.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-NS-4";

export const files: Record<string, string> = {
  /* ── 01 Databases (25 authored rows each) ──────────────────────── */

  "01-databases/habits.csv": `Habit,Category,Cadence,Streak,Record,Done This Month,Days Per Week,Status,Time of Day,Anchor,Notes
Morning walk 20 min,Health,Daily,41,63,14,7,Active,07:00,after coffee,"Counts in any weather, rain jacket lives by the door"
Make the bed,Home,Daily,214,214,15,7,Graduated,07:10,before the shower,Automatic for 7 months — hidden from the daily view
Vitamins with breakfast,Health,Daily,96,96,15,7,Graduated,08:00,with breakfast,The pill organizer solved it
Strength training,Health,3 per week,2,18,5,3,Active,18:30,after work,"Mon/Wed/Fri, deload every 4th week"
Floss,Health,Daily,63,63,15,7,Active,22:00,brushing teeth,Tied to brushing — unbroken since June
Lights out by 23:30,Health,Daily,9,34,12,7,Active,23:30,phone on charger,Fri and Sat exempt by design
Run 5k,Health,2 per week,0,12,1,2,Paused,07:00,after the walk,Shin splints — physio cleared a November restart
Stretch 10 min,Health,Daily,158,158,15,7,Graduated,07:20,before the walk,Part of the morning now — tracking stopped
10-min meditation,Mind,Daily,27,52,14,7,Active,07:30,after the walk,App timer not vibes
Journal 3 lines,Mind,Daily,88,88,15,7,Active,22:15,before lights out,Longest active streak — day 88
No-phone before noon,Mind,Daily,3,21,10,7,Paused,12:00,phone in drawer,Paused during the move — restarts Nov 1
Reading 20 pages,Mind,Daily,33,71,13,7,Active,21:45,after dinner cleanup,Only counts if logged in the reading list
Spanish drill,Learning,5 per week,11,46,9,5,Active,08:15,with breakfast,Two streak freezes used this year
Deep work block 90 min,Work,Daily,6,24,12,5,Active,09:00,before opening email,Phone goes in the desk drawer
Inbox zero,Work,Daily,4,29,11,5,Active,16:30,before the last meeting,Only counts before 17:00
Weekly plan (Sunday),Work,Weekly,14,22,3,1,Active,Sun 17:00,before dinner,Runs the weekly review ritual
Meal prep Sunday,Home,Weekly,7,15,3,1,Active,Sun 11:00,after groceries,Four lunches minimum
Grocery run with list,Home,Weekly,22,30,4,1,Active,Sat 10:00,after breakfast,No list means no snacks
Track every expense,Money,Daily,54,66,15,7,Active,21:00,with the journal,App plus receipt photo for cash
Budget check-in 10 min,Money,Weekly,19,26,3,1,Active,Sun 20:00,before the weekly plan,Feeds the budget rollups
No-spend day,Money,Weekly,6,9,3,1,Active,All day,any single day,Three wins logged this week
Call parents,Relationships,Weekly,5,8,2,1,Active,Sun 12:00,after meal prep,Speakerphone while cooking
Date night,Relationships,Weekly,3,10,2,1,Active,Fri 19:00,after work,60 dollar envelope — no card
Practice guitar,Creativity,4 per week,1,16,4,4,Active,20:30,after reading,Song 3 at 60 bpm without stops
Side project commit,Creativity,3 per week,12,25,5,3,Active,21:15,after guitar,Public log keeps it honest
`,

  "01-databases/reading-list.csv": `Title,Author,Category,Status,Rating,Pages,Started,Finished,Format,Priority,Takeaway
Thinking in Systems,Donella Meadows,Systems,Finished,5,240,2026-08-03,2026-08-24,Paper,,Leverage points beat effort
Deep Work,Cal Newport,Work,Finished,4,304,2026-07-06,2026-07-21,Paper,,Schedule depth like meetings
The Mom Test,Rob Fitzpatrick,Work,Finished,5,128,2026-09-12,2026-09-14,Paper,,Ask about their life not your idea
Atomic Habits,James Clear,Habits,Finished,4,320,2026-06-15,2026-07-04,Paper,,Systems over goals — hence this OS
Shape Up,Ryan Singer,Work,Finished,5,143,2026-08-25,2026-09-02,Digital,,Six-week appetite framing stuck
The Pragmatic Programmer,Hunt & Thomas,Craft,Reading,,352,2026-10-01,,Paper,,Chapter 7 so far
Seeing Like a State,James C. Scott,Systems,Reading,,480,2026-10-08,,Paper,,Slow but dense — 40 pages in
Four Thousand Weeks,Oliver Burkeman,Life,Reading,,288,2026-10-12,,Audio,,Audio pace works for this one
The Goal,Goldratt & Cox,Systems,Want to read,,384,,,Paper,High,Queue after Pragmatic Programmer
Crossing the Chasm,Geoffrey Moore,Business,Want to read,,256,,,Digital,Med,Skim the framework chapters
The Great CEO Within,Matt Mochary,Business,Want to read,,400,,,Digital,Low,Reference read not cover to cover
Slow Productivity,Cal Newport,Work,Want to read,,304,,,Audio,Med,
How to Take Smart Notes,Sönke Ahrens,Learning,Want to read,,240,,,Paper,High,Apply to the reading workflow
The Timeless Way of Building,Christopher Alexander,Design,Want to read,,576,,,Paper,Low,Long-game shelf
Range,David Epstein,Learning,Want to read,,352,,,Paper,Low,
The Anxious Generation,Jonathan Haidt,Society,Want to read,,400,,,Audio,Low,
Quiet,Susan Cain,Psychology,Abandoned,2,368,2026-08-01,,Paper,,Dropped at ch 5 — not my question
The Lean Startup,Eric Ries,Business,Abandoned,3,336,2026-09-05,,Paper,,Re-skim chapters 2-4 only
Getting Things Done,David Allen,Work,Finished,3,288,2026-07-08,2026-07-19,Paper,,Inbox capture survives — contexts didn't
The Psychology of Money,Morgan Housel,Money,Finished,5,256,2026-09-18,2026-09-26,Audio,,Behavior beats spreadsheets — need both
Die With Zero,Bill Perkins,Money,Reading,,288,2026-10-10,,Audio,,Chapter 3 — uncomfortable in a good way
The Design of Everyday Things,Don Norman,Design,Finished,4,368,2026-07-22,2026-08-02,Paper,,Seeing affordances everywhere now
Essentialism,Greg McKeown,Life,Finished,3,272,2026-08-28,2026-09-08,Paper,,Less but better — fine in small doses
The Beginning of Infinity,David Deutsch,Science,Want to read,,528,,,Paper,Low,Long-game shelf
Hooked,Nir Eyal,Product,Want to read,,240,,,Digital,Med,Reference for the side project
`,

  "01-databases/budget.csv": `Item,Category,Type,Planned,Actual,Month,Due,Status,Auto?,Notes
Rent,Housing,Fixed,1650,1650,2026-10,2026-10-01,Paid,Yes,Auto-pay on the 1st
Renter's insurance,Housing,Fixed,14,14,2026-10,2026-10-01,Paid,Yes,Bundled with auto
Auto insurance,Transport,Fixed,96,96,2026-10,2026-10-05,Paid,Yes,Annual policy shown as a monthly slice
Electric,Utilities,Variable,85,102.4,2026-10,2026-10-08,Paid,Yes,Heat kicked in early
Internet,Utilities,Fixed,60,60,2026-10,2026-10-08,Paid,Yes,
Phone,Utilities,Fixed,45,45,2026-10,2026-10-12,Paid,Yes,
Groceries,Food,Variable,420,386.75,2026-10,2026-10-31,Tracking,No,Farmers market swap saved about 20
Dining out,Food,Variable,180,214.6,2026-10,2026-10-31,Tracking,No,Over — two team dinners
Coffee shops,Food,Variable,60,48.2,2026-10,2026-10-31,Tracking,No,
Gas,Transport,Variable,90,74.1,2026-10,2026-10-31,Tracking,No,
Transit pass,Transport,Fixed,75,75,2026-10,2026-10-03,Paid,No,
Car maintenance fund,Transport,Savings,60,60,2026-10,2026-10-27,Planned,Yes,Tires due in spring
Emergency fund,Savings,Savings,500,500,2026-10,2026-10-15,Paid,Yes,Balance 9900 after this transfer
Index fund (taxable),Investing,Savings,400,400,2026-10,2026-10-15,Paid,Yes,Auto-buy on payday
Roth IRA,Investing,Savings,458,458,2026-10,2026-10-15,Paid,Yes,On pace to max the year
Student loan,Debt,Fixed,310,310,2026-10,2026-10-17,Paid,Yes,Balance 11240 — extra payment planned Dec
Gym membership,Health,Fixed,39,39,2026-10,2026-10-02,Paid,Yes,
Streaming — video,Fun,Subscription,28,28,2026-10,2026-10-06,Paid,Yes,Cancel one of two services in the Nov audit
Music subscription,Fun,Subscription,11,11,2026-10,2026-10-06,Paid,Yes,
Fun money,Fun,Variable,150,96.4,2026-10,2026-10-31,Tracking,No,Guitar strings plus one book
Gifts,Relationships,Variable,50,82,2026-10,2026-10-31,Tracking,No,Dad's birthday overran the plan
Travel fund,Savings,Savings,150,150,2026-10,2026-10-15,Paid,Yes,March trip target 1800
Pet care,Pets,Variable,40,61.25,2026-10,2026-10-31,Tracking,No,Vet food price up again
Rent,Housing,Fixed,1650,,2026-11,2026-11-01,Planned,Yes,Next month — autopay confirmed
Emergency fund,Savings,Savings,500,,2026-11,2026-11-15,Planned,Yes,Second-to-last transfer to hit 10k by Dec
`,

  /* ── 02 Rituals ────────────────────────────────────────────────── */

  "02-rituals/morning-setup.md": `# Morning setup — weekdays, 15 minutes

The morning setup is not a planning session. It loads today into your
head, picks the day's one big thing, and gets out of the way before
the world starts asking for things.

**When:** at your day's start — 07:00 here — before opening
anything with a notification on it.
**Where:** the LifeOS dashboard: habits filtered to today, the
budget's due list, the calendar, one blank line in the journal.

## The sequence — set a timer, seriously

| Time | Block | What happens |
| --- | --- | --- |
| 0:00–0:03 | Open LifeOS | Dashboard up, phone still face-down |
| 0:03–0:06 | Today's habits | Filter Status = Active and Time of Day = morning; check off what is already done (walk, vitamins, stretch) |
| 0:06–0:08 | Calendar | What is actually scheduled today — including the travel gaps between things |
| 0:08–0:11 | The one big thing | Pick from Sunday's weekly plan. One, not three. Write it down |
| 0:11–0:13 | Money glance | Budget view, filter Due Soon: anything due within 3 days that is not Paid gets a payment moment today |
| 0:13–0:15 | Close | Write today's first journal line: the date, the one big thing, one word for how you woke up |

## Rules that keep it 15 minutes

1. **Before email, before messages.** The inbox is everyone else's
   priority list; the morning setup is yours.
2. **The one big thing must fit in the 90-minute deep work block.**
   If it doesn't, it is two days — split it now, not at 11:00.
3. **No re-planning the week at 07:00.** Week-sized problems wait
   for Sunday's review. Mornings execute.
4. **Habits are checked, not negotiated.** If the walk happened, it
   is checked. If it is 07:12 and it hasn't, the note says when it
   will — today or never.

## The three questions

1. What would make today count as a win at 22:00 tonight?
2. Which habit is most at risk today, and when exactly will it
   happen?
3. Is there a calendar ambush between now and the deep work block?

## Exit criteria

- [ ] Morning habits checked off (or rescheduled with a time)
- [ ] The one big thing is written down, in one sentence
- [ ] Every bill due within 3 days is Paid or has today's moment
- [ ] The journal has its first line
- [ ] The phone got opened after LifeOS, not before

## The 5-minute version

One big thing, calendar glance, morning habits. That is the 80%
version — use it on the days the 15-minute version would die anyway
(travel, sick kid, 06:40 flight).
`,

  "02-rituals/weekly-review.md": `# Weekly review — Sunday, 45 minutes, 17:00

The OS's maintenance window. Everything the week generated gets
logged honestly, and next week gets set up so that Monday-morning-you
doesn't have to think — just execute.

**When:** Sunday 17:00. Late enough that the weekend already happened,
early enough that it isn't bedtime. The calendar invite is recurring
— the ritual that lives on willpower dies by week three.
**Where:** habits board (week view), budget table (this month),
reading list, journal. Music on, phone in a drawer.

## Agenda

| Time | Block | What happens |
| --- | --- | --- |
| 0:00–0:10 | Habits | Backfill the week's checkmarks honestly; breakages get a reason |
| 0:10–0:20 | Budget | Log every expense through Saturday; read the variance flags |
| 0:20–0:25 | Reading | Log pages; finish anything? Status + rating + one-line takeaway |
| 0:25–0:35 | Life admin & calendar | Next week's commitments, travel gaps, the one thing that must not slip |
| 0:35–0:43 | Next week's plan | Pick at most 3 big things; place each on a day |
| 0:43–0:45 | Close | Journal line + one sentence: the week's lesson |

## Habits — the questions

1. Which habit broke this week, and what was the actual moment it
   broke? (Time of day, what preceded it, what the anchor was doing)
2. Which habit beat its Record — and does it still earn tracking,
   or is it time to graduate it and free the attention?
3. Anything at 0 streak twice this month: change the anchor, shrink
   the habit, or pause it honestly. Tracking a dead habit is lying
   with extra steps.

## Budget — the questions

1. Which Tracking lines are already over plan with days left in the
   month? Name the number, not the feeling.
2. What did money go to that you don't remember enjoying? That is
   the cut candidate — next week's plan gets the line item.
3. What unusual spend is coming next week (gift, trip, renewal), and
   is it pre-funded or a surprise to future-you?

## Reading — two minutes of discipline

- Pages read this week go into the row (the streak counts logged
  pages, not good intentions)
- Anything finished gets Status = Finished, a rating, and exactly
  one takeaway line. If you can't write the line, the book didn't
  land yet — that is allowed, write that.

## Exit criteria

- [ ] Habit checkmarks current through Saturday — backfilled, not
      rounded up
- [ ] Every expense through Saturday is in the budget table
- [ ] Next week has at most 3 big things, each with a day
- [ ] The journal has the week's one-sentence lesson
- [ ] Monday's one big thing is already decided (tomorrow's morning
      setup reads it, doesn't invent it)
`,

  "02-rituals/monthly-rollup.md": `# Monthly rollup — last Sunday of the month, 60 minutes

The month gets closed like an accountant closes a quarter: numbers
final, decisions made, next month cloned from reality instead of
from hope. Run it while the month's data is still warm.

**When:** last Sunday of the month, 16:00 — before the weekly review
so the review starts from a closed month.
**Where:** budget table (this month, then next), habits board,
reading list, the month's journal page.

## Agenda

| Time | Block | What happens |
| --- | --- | --- |
| 0:00–0:15 | Budget close | Every row Paid or consciously carried; variance per category read out loud |
| 0:15–0:25 | Habit consistency | Percentages per habit; pause / shrink / graduate decisions |
| 0:25–0:32 | Reading | Books finished, pages total, pace, one re-read candidate |
| 0:32–0:40 | Goals check | Quarterly goals — on track, at risk, or quietly dead (see the goal cascade) |
| 0:40–0:50 | Next month setup | Budget rows cloned and adjusted; habit counters reset |
| 0:50–1:00 | Write the month page | 3 wins, honest misses, exactly one change |

## Budget close

1. Every row for the month is Paid, or rolled with a note saying why
   and when. "Tracking" does not survive the rollup.
2. Planned vs actual per category: name the top three overages, one
   sentence each. No shame, just mechanics.
3. Savings rate: (income − total Actual) / income, written as a
   number in the month page. Tracked monthly, it stops lying.
4. Next month's Planned values come from this month's actuals, not
   from January's ambitions. Groceries cost what groceries cost.

## Habit consistency — the thresholds

- Consistency = Done This Month ÷ days in month (dailies) or ÷ 4.33
  (weeklies), written as a percentage on the row
- **Under 50%:** pause it, shrink it, or re-anchor it. Pick one,
  today. A habit below 50% is a guilt subscription.
- **Over 90% two months running:** graduate it — Status = Graduated,
  stop counting, free the attention for the next one.
- Paused habits get a restart date or a funeral. Nothing haunts.

## Reading

- Books finished this month, total pages (the rollup), average days
  per book
- One book gets promoted to "re-read" with a reason — a shelf of
  re-reads beats a shelf of almost-reads

## The month page — write it, don't think it

- **Wins:** 3 bullets max, each with a number in it
- **Misses:** honest, no spin, one line each
- **One change for next month:** exactly one. Systems that change
  three things at once learn nothing from what happens next.

## Exit criteria

- [ ] Every budget row closed or rolled, with a note
- [ ] Next month's budget rows exist (clone + adjust Planned)
- [ ] Habit counters reset; every pause/graduate decision made
- [ ] Reading list takeaways current; re-read picked
- [ ] Month page written with the one change named
- [ ] The goal-cascade numbers (if you run it) updated
`,

  /* ── 03 Formulas ───────────────────────────────────────────────── */

  "03-formulas/formula-reference.md": `# LifeOS formula reference

Every formula below is copy-paste ready: open a database, click
**New property → Formula**, paste, name it as shown. Property names
inside prop("…") match the CSV headers exactly — if you renamed a
property, update it inside the formula too.

## Habits database

### 1. Streak Status
\`\`\`
if(prop("Streak") == 0, "🌱 Restart",
  if(prop("Streak") >= prop("Record"),
    "🏆 Record",
    "🔥 " + format(prop("Streak"))))
\`\`\`
Emoji + count at a glance. Zero shows a restart, not a failure.
Powers: the daily board — you read this before coffee, so it reads
fast.

### 2. Record Check
\`\`\`
if(prop("Streak") > prop("Record"),
  "New record — update the Record field",
  "")
\`\`\`
Flags a beaten record so the Record field stays true.
Powers: the weekly review's habit block — beat-the-record is the
graduation conversation starter.

### 3. Pace Check
\`\`\`
if(prop("Done This Month") >= prop("Days Per Week") * 3,
  "✅ On pace",
  if(prop("Done This Month") >= prop("Days Per Week") * 2,
    "🟡 Catch up",
    "🔴 Behind"))
\`\`\`
Compares this month's checkmarks against three weeks of target —
check mid-month. At month end, swap the 3 for 4.33.
Powers: the monthly rollup's consistency pass, without a calculator.

### 4. Status Icon
\`\`\`
switch(prop("Status"),
  "Active", "▶️",
  "Paused", "⏸",
  "Graduated", "🏁",
  "❓")
\`\`\`
Powers: dense views where Active/Paused/Graduated text would crowd
out the streak.

## Reading list database

### 5. Days To Read
\`\`\`
if(empty(prop("Finished")),
  "",
  dateBetween(prop("Finished"), prop("Started"), "days"))
\`\`\`
Calendar days from Started to Finished, blank while reading.
Powers: the honest pace read — two weeks for 128 pages says
something the streak doesn't.

### 6. Pages Per Day
\`\`\`
if(empty(prop("Finished")),
  "",
  round(prop("Pages") / max(dateBetween(prop("Finished"), prop("Started"), "days"), 1)))
\`\`\`
Pages ÷ days, with max(…, 1) so same-day finishes don't divide by
zero.
Powers: choosing the next book by your real pace, not your fantasy
pace.

### 7. Stars
\`\`\`
if(empty(prop("Rating")),
  "—",
  repeat("★", toNumber(prop("Rating"))) + repeat("☆", 5 - toNumber(prop("Rating"))))
\`\`\`
Renders the rating as ★★★☆☆. CSV imports sometimes land Rating as
text — toNumber() makes this formula survive that.
Powers: the finished-books gallery view.

### 8. Finished Pages (helper for rollups)
\`\`\`
if(prop("Status") == "Finished", prop("Pages"), 0)
\`\`\`
Pages, zeroed unless the book is actually finished.
Powers: the pages-per-month and pages-per-year rollups below.

## Budget database

### 9. Variance
\`\`\`
prop("Planned") - prop("Actual")
\`\`\`
Planned minus Actual. Positive is under, negative is over — decide
once which sign feels right and stick to it.
Powers: every budget view's right-most number column.

### 10. Variance Label
\`\`\`
if(empty(prop("Actual")),
  "— open —",
  if(prop("Actual") > prop("Planned"),
    "⚠️ Over by " + format(prop("Actual") - prop("Planned")),
    "✅ Under by " + format(prop("Planned") - prop("Actual"))))
\`\`\`
The variance, as a sentence. Mid-month, "under" on a Tracking line
just means the month isn't over — read it with Due in mind.
Powers: the weekly review's budget block, read aloud.

### 11. Days Until Due
\`\`\`
dateBetween(prop("Due"), now(), "days")
\`\`\`
Runway to the due date; negative means it already passed.
Powers: the money glance in the morning setup.

### 12. Due Soon
\`\`\`
if(and(
  dateBetween(prop("Due"), now(), "days") <= 3,
  prop("Status") != "Paid"),
  "🔔 Due in " + format(dateBetween(prop("Due"), now(), "days")) + "d",
  "")
\`\`\`
Rings for anything unpaid within three days — late fees are a
systems failure, not bad luck.
Powers: the morning dashboard's due list.

### 13. Locked Or Watch
\`\`\`
if(or(prop("Type") == "Fixed", prop("Type") == "Subscription"),
  "🔒",
  "👀")
\`\`\`
Fixed and subscription lines are locked; variable lines get
watched. The budget's two personalities, at a glance.
Powers: the monthly rollup's "which lines can actually move" pass.

## Rollups (Months and Years databases)

### 14. Month Total (rollup, configured in the property menu)
Create a **Months** database (one page per month: "2026-10"). On
Budget, add a **Relation** named Month → Months, and link every
line to its month. Then on Months: property type **Rollup** →
relation **Lines** → property **Actual** → calculate **Sum**.

What it answers: "what did this month actually cost?" — the number
the monthly rollup's savings-rate math needs.

### 15. Month Spend (formula alternative)
\`\`\`
prop("Lines").map(current.prop("Actual")).sum()
\`\`\`
The same total as a formula, no rollup property needed.

### 16. Pages This Year (rollup)
On a **Years** database (or the Months database, filtered), roll up
the reading list: relation **Books** → property **Finished Pages**
(formula 8) → calculate **Sum**. Pages read, only counting books
you actually finished.

## Setup order

1. Import the three CSVs (see 04-setup/setup-guide.md)
2. Optional but worth it: build the Months database and the two
   relations (Budget.Month → Months, Reading.Year → Years)
3. Add formulas 1–4 on Habits, 5–8 on Reading, 9–13 on Budget
4. Point the morning setup at Due Soon + Streak Status; the weekly
   review at Variance Label; the monthly rollup at Month Total

Support: support@omniforge.example
`,

  /* ── 04 Setup ──────────────────────────────────────────────────── */

  "04-setup/duplicate-link.md": `# Duplicate LifeOS into Notion

The fastest path: the hosted LifeOS workspace, duplicated with one
click.

**→ https://omniforge.example/duplicates/B-NS-4**

## What the duplicate brings across

1. Click **Duplicate** (top-right of the hosted workspace) and pick
   a destination — a private page works; this system is personal.
2. All three databases arrive with select options and every formula
   from the reference pre-wired.
3. Tick **Include content** in the duplicate dialog to also get the
   75 seeded rows — the same 25 habits, 25 books and 25 budget
   lines you previewed before buying. Leave it unticked for empty
   databases.
4. The demo data is ordinary rows: delete it wholesale, or keep a
   week of it to learn the rituals against.

## Prefer your own workspace? Import the CSVs

Notion → New page → slash command /csv → pick a file from
01-databases/. Column headers map 1:1 to Notion property names, so
the formulas in 03-formulas/formula-reference.md plug straight in.
The property-type table is in 04-setup/setup-guide.md — the whole
import takes about 25 minutes, coffee included.

## After duplicating: three things to change

- Replace the seeded habits with yours — keep the Anchor column
  filled; anchors are what make habits run without willpower
- Set the budget rows to your month: clone the October pattern,
  swap in your Planned numbers, delete what doesn't apply
- Put the three rituals on the calendar as recurring events — the
  15-minute morning setup beats every grand system that runs on
  motivation

Support: support@omniforge.example — 30-day money-back guarantee.
`,

  "04-setup/setup-guide.md": `# Setup guide — Personal Life OS

Two paths: duplicate the finished workspace (10 minutes) or import
the CSVs into your own (25 minutes). Both end with the same system.

## What's in the kit

- 01-databases/ — habits.csv, reading-list.csv, budget.csv, 25
  authored rows each: one person's real October 2026 — 20 active
  habits, 2 paused honestly, 3 graduated; 9 finished books with
  takeaways; a full month of budget lines including two planned
  November rows
- 02-rituals/ — morning-setup (15 min, weekdays), weekly-review
  (45 min, Sunday 17:00), monthly-rollup (60 min, last Sunday)
- 03-formulas/formula-reference.md — 16 copy-paste formulas and
  rollups keyed to these exact property names

## Path A — duplicate the hosted workspace (10 min)

1. Open the link in 04-setup/duplicate-link.md
2. Duplicate → choose destination → tick "Include content" for the
   seeded rows
3. Skip to "First week" below — the formulas are done

## Path B — import the CSVs (25 min)

Import each file with /csv, then set property types so Notion
interprets them correctly:

| Property | Database | Type |
| --- | --- | --- |
| Habit / Title / Item | all three | Title |
| Category, Cadence, Status | Habits | Select |
| Status, Format, Priority, Category | Reading list | Select |
| Category, Type, Status, Auto? | Budget | Select / Checkbox |
| Streak, Record, Done This Month, Days Per Week, Rating, Pages | Habits, Reading | Number |
| Planned, Actual | Budget | Number |
| Started, Finished | Reading list | Date |
| Month, Due | Budget | Text / Date |
| Time of Day, Anchor, Notes, Takeaway | varies | Text |

Note: Month imports as text ("2026-10") on purpose — it sorts
correctly and matches the Months database pages if you build them
(see formula 14).

Then paste the formulas from 03-formulas/ (setup order is at the
bottom of that file).

## Views worth building first (10 min)

1. **Today** — Habits filtered: Status = Active, grouped by Time of
   Day. This is the morning setup's screen
2. **Due list** — Budget filtered: Status is not Paid, sorted by
   Due. Glanced at every morning, trusted all day
3. **Queue** — Reading list filtered: Status = Want to read, sorted
   by Priority then Pages ascending
4. **This month** — Budget grouped by Month, Variance Label shown,
   Actual summed per group

## First week

- **Tomorrow morning:** run the morning setup on the seeded rows.
  15 minutes, timer on. The ritual is the product; the databases
  are just its memory
- **Sunday:** run the weekly review once on the demo data, then
  swap in your own habits and budget lines
- **Month end:** run the monthly rollup — clone the budget rows
  forward, reset the habit counters, write the month page
- **Ongoing:** check habits the moment they happen, not at bedtime
  from memory. A checkmark logged at 22:14 is worth two logged
  from the couch at 22:45

## House rules that keep the system honest

1. Backfilling is allowed; rounding up is not. The board is a
   mirror, not a scoreboard
2. Paused is a status, not a failure. Restart dates or funerals —
   nothing haunts
3. The budget's Tracking lines get their Actual updated at the
   weekly review, every week, no exceptions

Support: support@omniforge.example
`,

  /* kit stub note for the extended pack */

  "EXTENDED-PACK/goal-cascade-board.md": `# Goal cascade board — in production

Status: **in production** — not in this archive.

What the finished file will contain: a yearly-to-quarterly-to-weekly
goal cascade board with auto-rollup progress formulas — every yearly
goal decomposed into quarterly outcomes and weekly moves, with each
level's progress computed from the level below it.
`,
};

/* ── Try-it demo — 12 rows lifted from habits.csv, board-mapped ──── */

export const demo: DemoContent = {
  kind: "notion",
  workspaceName: "LifeOS — October 2026",
  intro:
    "A week of the LifeOS that ships in the kit — twelve of the 25 seeded habits. Three rituals keep it running: the 15-minute morning setup, Sunday's 45-minute review, and the monthly rollup. Two habits are paused honestly; make-the-bed graduated months ago and still holds a 214-day streak.",
  rows: [
    {
      id: "habit-01",
      task: "Morning walk 20 min — rain jacket by the door",
      owner: "Alex Rivera",
      status: "In progress",
      due: "2026-10-16",
      priority: "Med",
      effort: 1,
    },
    {
      id: "habit-02",
      task: "Deep work block — 90 min before opening email",
      owner: "Alex Rivera",
      status: "In progress",
      due: "2026-10-16",
      priority: "High",
      effort: 4,
    },
    {
      id: "habit-03",
      task: "Journal 3 lines (day 88 of the streak)",
      owner: "Alex Rivera",
      status: "In progress",
      due: "2026-10-16",
      priority: "Low",
      effort: 1,
    },
    {
      id: "habit-04",
      task: "Reading 20 pages — The Pragmatic Programmer",
      owner: "Alex Rivera",
      status: "In progress",
      due: "2026-10-16",
      priority: "Med",
      effort: 2,
    },
    {
      id: "habit-05",
      task: "Spanish drill with breakfast (5/wk pace)",
      owner: "Alex Rivera",
      status: "In progress",
      due: "2026-10-16",
      priority: "Med",
      effort: 2,
    },
    {
      id: "habit-06",
      task: "Strength training — week 4 deload",
      owner: "Alex Rivera",
      status: "In progress",
      due: "2026-10-16",
      priority: "High",
      effort: 3,
    },
    {
      id: "habit-07",
      task: "Weekly plan — the Sunday ritual, 45 min",
      owner: "Alex Rivera",
      status: "Review",
      due: "2026-10-18",
      priority: "High",
      effort: 2,
    },
    {
      id: "habit-08",
      task: "Budget check-in — log the week's receipts",
      owner: "Alex Rivera",
      status: "Review",
      due: "2026-10-18",
      priority: "High",
      effort: 1,
    },
    {
      id: "habit-09",
      task: "Meal prep Sunday — four lunches minimum",
      owner: "Alex Rivera",
      status: "Review",
      due: "2026-10-18",
      priority: "Med",
      effort: 2,
    },
    {
      id: "habit-10",
      task: "Run 5k — physio cleared a Nov 2 restart",
      owner: "Alex Rivera",
      status: "Backlog",
      due: "2026-11-02",
      priority: "Low",
      effort: 3,
    },
    {
      id: "habit-11",
      task: "No-phone before noon — restarts Nov 1",
      owner: "Alex Rivera",
      status: "Backlog",
      due: "2026-11-01",
      priority: "Low",
      effort: 2,
    },
    {
      id: "habit-12",
      task: "Make the bed — graduated, streak 214",
      owner: "Alex Rivera",
      status: "Done",
      due: "2026-10-15",
      priority: "Low",
      effort: 1,
    },
  ],
};
