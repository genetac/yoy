/* ════════════════════════════════════════════════════════════════════
   B-NS-3 · Content Planning System — ContentOS
   3 databases with 25 authored rows each (content calendar, ideas,
   channels), 3 editorial rituals, formula reference, duplicate-link
   and setup guide. Every file's key equals its bundle path. The
   Try-it demo tours 12 rows of the same calendar.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-NS-3";

export const files: Record<string, string> = {
  /* ── 01 Databases (25 authored rows each) ──────────────────────── */

  "01-databases/content-calendar.csv": `Title,Channel,Status,Publish Date,Owner,Format,Theme,Word Count,Hook,Notes
How we cut report build time from 6 hours to 40 minutes,Blog,Published,2026-07-14,Jonas Weber,How-to,Automation,2400,The 6-hour number is the hook,Repurposed into newsletter #31 and two social posts
Newsletter #31 — the report-time story,Newsletter,Published,2026-07-16,Lena Ortiz,Newsletter,Automation,900,"One story, three links",42% open rate — best of Q3
Automation teardown: 5 busywork tasks we killed this quarter,Blog,Published,2026-07-28,Jonas Weber,Teardown,Automation,1900,Listicle with receipts,
Why your data dashboard is lying to you,Blog,Published,2026-08-04,Dev Patel,Myth-buster,Analytics,2100,Contrarian title with receipts,Top organic performer — position 4
Building a metrics dictionary your team actually uses,Blog,Published,2026-08-18,Kim Ha,How-to,Data Quality,2300,Practical with template included,Freelance piece — edits took two rounds
Newsletter #32 — dashboards special,Newsletter,Published,2026-08-20,Lena Ortiz,Newsletter,Analytics,850,Curated plus commentary,
Case study: Fernway Transit's ops rebuild,Blog,Published,2026-09-01,Jonas Weber,Case Study,Case Study,2600,Real numbers and a real timeline,Customer legal approval took 9 days
"Live teardown: a messy workflow, fixed on camera",YouTube,Published,2026-09-03,Aisha Bello,Video,Automation,350,Watch-over-the-shoulder format,1.8k views in week one
Newsletter #33 — the Fernway story,Newsletter,Published,2026-09-17,Lena Ortiz,Newsletter,Case Study,880,Story-first not promo,Three replies asking about pricing
The state of manual work 2026 — survey report,Blog,Published,2026-09-22,Lena Ortiz,Research,Industry Trends,3600,Original data earns links,14 linking domains so far
5 automation patterns from 200 support tickets,Blog,Published,2026-10-06,Jonas Weber,How-to,Automation,2000,Data pulled from our own tickets,
Newsletter #34 — survey highlights,Newsletter,Published,2026-10-08,Lena Ortiz,Newsletter,Industry Trends,900,Charts over paragraphs,
LinkedIn carousel: the 40-minute report,LinkedIn,Published,2026-10-09,Aisha Bello,Carousel,Automation,120,Before/after visual,Best social engagement of Q4 so far
Metrics dictionary template — free download,Blog,Scheduled,2026-10-21,Kim Ha,Template,Data Quality,1500,"Gift, not gate",Assets done — landing page pending
Newsletter #35 — templates special,Newsletter,Scheduled,2026-10-22,Lena Ortiz,Newsletter,Data Quality,850,All gifts and no pitch,
Dashboard audit in 12 minutes,YouTube,Scheduled,2026-10-28,Aisha Bello,Video,Analytics,400,Timed format — watch along,Rough cut is in review
Case study: Corvid Analytics' renewal turnaround,Blog,In Review,2026-11-04,Jonas Weber,Case Study,Case Study,2400,Numbers moved and names attached,With the customer for approval
Automation myths — LinkedIn series of 5 posts,LinkedIn,In Review,2026-11-02,Dev Patel,Post Series,Automation,200,One myth per post,3 of 5 approved by Lena
The hiring manager's guide to automation skills,Blog,Drafting,2026-11-11,Kim Ha,Guide,Industry Trends,2800,Keyword play on automation skills,Outline approved — draft at 60%
Newsletter #36 — the skills issue,Newsletter,Drafting,2026-11-19,Lena Ortiz,Newsletter,Industry Trends,850,Ties back to the guide,
Podcast ep. 12 — a data team of one,Podcast,Drafting,2026-11-25,Lena Ortiz,Interview,Analytics,150,Solo data practitioners are underserved,Guest confirmed — recording Nov 3
3 workflows to automate before year-end,YouTube,Outline,2026-11-13,Aisha Bello,Video,Automation,300,Seasonal urgency,Shot list not started
Year in review: what we automated in 2026,Blog,Outline,2026-12-08,Lena Ortiz,Retrospective,Automation,2200,Honest version with fails included,Needs Q4 data first
Newsletter #37 — year in review,Newsletter,Outline,2026-12-10,Lena Ortiz,Newsletter,Automation,900,Reader stats plus thanks,
Behind the metrics dictionary — design process,Instagram,Outline,2026-11-06,Marco Ruiz,Short-form,Data Quality,80,Process b-roll,Needs Marco's storyboard
`,

  "01-databases/ideas.csv": `Idea,Source,Theme,Format,Channel Fit,Effort,Impact,Score,Status,Added
"Every report your team rebuilds weekly, ranked",Internal data,Automation,Teardown,Blog,4,9,2.3,Next up,2026-09-02
Workflow audit checklist — printable,Team retro,Automation,Template,"Blog + Newsletter",3,8,2.7,Next up,2026-10-01
Dashboard speedrun: 0 to live in 20 minutes,Team retro,Analytics,Video,YouTube,6,9,1.5,Next up,2026-09-24
Data quality scoreboard: 6 metrics that matter,Keyword research,Data Quality,How-to,Blog,4,7,1.8,Next up,2026-08-12
Interview: the ops lead who deleted 14 tools,Reader reply,Industry Trends,Interview,Podcast,5,8,1.6,Backlog,2026-08-19
"The cost of context-switching, in dollars",Keyword research,Analytics,Research,Blog,8,7,0.9,Backlog,2026-07-30
We read 100 job posts: what automation means now,Keyword research,Industry Trends,Research,Blog,7,8,1.1,Backlog,2026-09-11
Migration horror stories and the fix,Customer interview,Data Quality,Story,Newsletter,3,6,2.0,Backlog,2026-08-05
What support tickets teach product teams,Internal data,Analytics,Teardown,Blog,5,7,1.4,Backlog,2026-07-22
The one-person data team starter stack,Community,Industry Trends,Guide,Blog,6,8,1.3,Researching,2026-08-28
Automation ROI calculator — interactive,Sales call,Automation,Tool,Blog,9,9,1.0,Backlog,2026-09-15
Founder myths about dashboards,Reader reply,Analytics,Myth-buster,LinkedIn,2,6,3.0,Backlog,2026-10-03
Case study: support deflection at Whistler Freight,Sales call,Case Study,Case Study,Blog,5,9,1.8,Researching,2026-09-30
The spreadsheet-to-system graduation test,Team retro,Automation,How-to,Newsletter,3,7,2.3,Backlog,2026-07-18
Interview: a CIO who killed the annual report,Conference,Industry Trends,Interview,Podcast,4,7,1.8,Backlog,2026-09-08
Behind the scenes: how we plan a content quarter,Team retro,Industry Trends,Meta,Blog,4,6,1.5,Backlog,2026-10-05
The 5-minute workflow audit — video short,Internal data,Automation,Short-form,Instagram,2,5,2.5,Backlog,2026-09-19
Which departments automate first — chart post,Internal data,Analytics,Chart,LinkedIn,3,6,2.0,Backlog,2026-08-26
Reader Q&A: stakeholder buy-in for clean data,Reader reply,Data Quality,Q&A,Newsletter,2,5,2.5,Backlog,2026-09-26
The state of manual work 2027 — survey planning,Team retro,Industry Trends,Research,Blog,9,9,1.0,Parking lot,2026-10-10
Tool teardown: replacing 3 tools with 1 workflow,Competitor gap,Automation,Teardown,YouTube,7,8,1.1,Backlog,2026-07-25
Glossary: 30 data terms in plain English,Keyword research,Data Quality,Reference,Blog,6,6,1.0,Backlog,2026-08-02
The interview question that finds automation talent,Community,Industry Trends,How-to,LinkedIn,2,5,2.5,Backlog,2026-09-05
Annual report automation — the 2026 wrap,Customer interview,Automation,How-to,"Blog + Newsletter",5,7,1.4,Backlog,2026-10-07
Cold email teardown — what actually gets replies,Competitor gap,Industry Trends,Teardown,YouTube,5,6,1.2,Parking lot,2026-08-15
`,

  "01-databases/channels.csv": `Channel,Cadence,Owner,Primary Format,Audience,Key Metric,Baseline,Target,Prep Hours,Status,Notes
Blog — How-tos,2 per month,Jonas Weber,How-to,Practitioners,Organic sessions,4200/mo,6000/mo,8,Active,Core channel — feeds every other channel
Blog — Teardowns,Monthly,Jonas Weber,Teardown,Practitioners,Organic sessions,2600/mo,3000/mo,10,Active,Best dwell time of any format
Blog — Case studies,Monthly,Jonas Weber,Case Study,Evaluators,Demo requests,18/mo,30/mo,12,Active,Legal review adds 1-2 weeks
Blog — Research,Quarterly,Lena Ortiz,Research,Industry,Backlinks,14 domains,30 domains,40,Active,One piece at a time — see weekly planning
Blog — Myth-busters,Monthly,Dev Patel,Myth-buster,Practitioners,Organic sessions,1800/mo,2400/mo,7,Active,Contrarian hooks test well
Blog — Templates,Monthly,Kim Ha,Template,Practitioners,Email signups,110/mo,250/mo,9,Active,Every template carries a download link
Blog — Comparisons,Monthly,Dev Patel,Comparison,Evaluators,Demo requests,12/mo,25/mo,6,Active,Highest buyer intent of the blog formats
Newsletter — Main,Every other Thursday,Lena Ortiz,Newsletter,Subscribers,Open rate,38%,42%,4,Active,"Sent Thu 07:00 — never Friday"
Newsletter — Reader Q&A,Monthly,Lena Ortiz,Q&A,Subscribers,Replies,22 per issue,40 per issue,2,Active,Replies feed the ideas bank
YouTube — Teardowns,Monthly,Aisha Bello,Video,Practitioners,Avg view duration,5:40,7:00,16,Active,One-camera setup — no over-production
YouTube — Tutorials,Monthly,Aisha Bello,Video,Practitioners,Subscribers,3100,5000,18,Active,Chapters matter more than thumbnails
YouTube — Product updates,Monthly,Aisha Bello,Video,Customers,Watch-through,42%,55%,4,Active,Under 6 minutes or it flops
YouTube — Shorts,2 per month,Aisha Bello,Short-form,Practitioners,Views,2100,5000,3,Trial,Two-month trial — verdict at Nov recap
LinkedIn — Company page,3 per week,Aisha Bello,Post,Evaluators,Engagements,210 per post,350 per post,1,Active,Two originals plus one repost
LinkedIn — Founder posts,2 per week,Lena Ortiz,Post,Industry,Engagements,480 per post,600 per post,1.5,Active,First-person beats company voice 2:1
LinkedIn — Carousels,Monthly,Aisha Bello,Carousel,Practitioners,Reposts,34,60,3,Active,Marco designs — book him at planning
X — Threads and posts,4 per week,Dev Patel,Post,Practitioners,Link clicks,190 per post,300 per post,0.5,Active,Batch-written on writing day
Instagram — Design process,Bi-weekly,Marco Ruiz,Short-form,Designers,Reach,1200 per post,2500 per post,4,Trial,Trial ends at the Nov recap
Podcast — Interviews,Monthly,Lena Ortiz,Interview,Industry,Listens per episode,640,900,10,Active,Guest brings their own audience
Reddit — Community answers,Monthly,Dev Patel,Comment,Practitioners,Qualified clicks,90/mo,200/mo,2,Active,Helpful first — link only when asked
Partner swaps — guest posts,Quarterly,Lena Ortiz,Guest post,Industry,Referrals,60 per quarter,120 per quarter,8,Active,Trade bylines with adjacent tools
Webinars — Live sessions,Quarterly,Lena Ortiz,Webinar,Evaluators,Registrations,420,700,30,Active,Recording becomes 2 YouTube chapters
TikTok — Office hours clips,2 per month,Aisha Bello,Short-form,Practitioners,Followers,700,2000,2,Trial,Clips from podcast audio
Conference talks,2 per year,Lena Ortiz,Talk,Industry,Deck downloads,85 per talk,150 per talk,25,Active,Talk becomes a blog teardown after
In-app release notes,Monthly,Marco Ruiz,Changelog,Customers,Read rate,31%,45%,2,Active,Three bullets and a gif — no more
`,

  /* ── 02 Rituals ────────────────────────────────────────────────── */

  "02-rituals/weekly-planning.md": `# Weekly planning — Monday, 45 minutes

The meeting where next week's calendar gets filled on purpose, from
the ideas bank, by score — instead of by whoever panicked loudest on
Friday.

**When:** Monday 10:00, before the week picks a fight with the plan.
**Who:** everyone who owns a byline (Lena, Jonas, Aisha, Dev, Kim —
Marco when design ships that week).
**Where:** the Calendar grouped by Status on the main screen; the
Ideas database sorted by Score descending on the second tab.

## Before the meeting — Lena, 5 minutes on Friday

- [ ] Everything that published has Status = Published and its real
      Word Count
- [ ] Anything that slipped has a new date and a one-line reason in
      Notes
- [ ] Last week's recap numbers (pieces planned vs shipped) jotted
      in the meeting page

## Agenda

| Time | Block | What happens |
| --- | --- | --- |
| 0:00–0:05 | Recap | Planned vs shipped last week; one thing that slipped and why |
| 0:05–0:15 | Capacity | Each owner states hours free for content this week |
| 0:15–0:35 | Pick and assign | Pull top-scored ideas into next week's slots |
| 0:35–0:40 | Repurpose check | Which published piece gets a second life where |
| 0:40–0:45 | Commitments | Owners say their one piece; risks said out loud |

## Capacity math (say the numbers, don't guess)

One writer-week holds **either**: two blog drafts, **or** one draft
plus two newsletters, **or** one video script plus the shoot. Video
costs two people for the shoot block. Research pieces cost 40 hours
— maximum one live at a time. Leave 20% slack: a week planned to
100% ships at 80%.

## The questions — ask them exactly

1. What is the single most important piece this week, and who is
   writing it by name?
2. Which channel is off cadence — 21+ days since its last publish?
3. What is blocked, who unblocks it, by when?
4. Which idea in the backlog are we promoting, and which are we
   explicitly not doing this week?

## House rules

- A slot without a named owner stays empty. Capacity is real.
- Hooks get decided at planning. Wednesday is for writing, not for
   staring at a blinking cursor wondering what the angle is.
- Themes rotate: two consecutive weeks on the same theme is the
   ceiling, or the audience tunes out.
- If Status has said "Drafting" for two weeks, the piece gets cut or
  re-scoped in this meeting. Zombies don't ship.

## Exit criteria — all five, or the meeting didn't end

- [ ] Every piece scheduled for next week has an owner, a hook and a
      word-count target
- [ ] Every In Review piece has a named reviewer
- [ ] Every off-cadence channel has a piece scheduled or a stated
      reason not to
- [ ] One idea promoted from the backlog, one explicitly deferred
- [ ] Notes in the meeting page within the hour (rotating scribe)
`,

  "02-rituals/batch-writing-day.md": `# Batch-writing day — Wednesday, 09:00–17:00

One day a week where the calendar moves by construction. Everything
scheduled for next week gets drafted today, in blocks, with research
already done. Editing is Thursday's problem.

**Who:** every writer with a slot this week (Jonas, Kim, Lena when
she has a piece, Dev for scripts). Aisha blocks it for scripts and
shoots.
**Where:** wherever you write best — cameras off, Slack status set
to "Writing until 12:30", one shared meeting page for blockers.

## Tuesday prep — each writer, 15 minutes

- [ ] Research links saved into the draft page
- [ ] Outline approved (or written — there is no research on
      Wednesday morning)
- [ ] Interviews done; quotes already pasted in
- [ ] Hook written: one sentence, from the planning meeting

## Environment checklist — first 5 minutes of the day

- [ ] Notifications off, phone in a drawer
- [ ] Research doc open; everything else closed
- [ ] Timer set for the first 90-minute block
- [ ] Water within reach; headphones on if the room is loud

## Agenda

| Time | Block | What happens |
| --- | --- | --- |
| 09:00–09:10 | Stand-up | Each writer: piece, target words, first sentence |
| 09:10–10:40 | Block 1 — 90 min | Draft. No editing, no research |
| 10:40–10:55 | Break | Walk. No screens |
| 10:55–12:25 | Block 2 — 90 min | Finish draft one |
| 12:25–13:25 | Lunch | Away from the desk |
| 13:25–14:55 | Block 3 — 90 min | Draft two (or finish a long one) |
| 14:55–15:10 | Break | Walk. Still no screens |
| 15:10–16:40 | Block 4 — 90 min | Draft two, or scripts and newsletter |
| 16:40–17:00 | Wrap-up | Update Status and Word Count; log blockers |

## The rules that make it work

1. **No research during blocks.** Unknown fact? Write [TK] and keep
   moving. [TK]s get resolved at 16:40 or Thursday morning.
2. **No editing while drafting.** Editing is a different brain state;
   mixing them is how a 2,000-word piece takes eight hours.
3. **Parking lot.** Any idea that arrives mid-draft goes into the
   Ideas database, not into the draft. The draft stays on its hook.
4. **A block that starts late still ends on time.** Short blocks
   beat abandoned ones.
5. **The first-sentence escape.** Stuck for ten minutes? Write
   "This piece is about X because Y" and keep going. Fix it
   Thursday.

## Definition of done — a draft is done when

- [ ] Within 10% of its word-count target
- [ ] Hook lands in the first two lines
- [ ] Every [TK] resolved or listed as a blocker
- [ ] Status moved Drafting → In Review, reviewer tagged

## Exit criteria — 16:40 stand-up, each writer, one breath each

- [ ] Two drafts in Review (or one long-form plus an honest reason)
- [ ] Word Count property updated on every touched row
- [ ] Blockers in the shared page — nothing gets "figured out later"
- [ ] Thursday's editing queue is written down before anyone leaves
`,

  "02-rituals/monthly-recap.md": `# Monthly recap — first Friday, 75 minutes

The meeting where content becomes a system instead of a treadmill:
every channel gets a verdict, baselines get updated to reality, and
next month's themes come from the ideas bank, not from the mood of
the room.

**When:** first Friday of the month, 14:00, after lunch and before
anyone starts pretending to work.
**Who:** the whole content team. Anyone who shipped a piece attends;
freelancers for the first 30 minutes if their pieces are reviewed.
**Inputs:** Channels table (Baseline vs Target), Calendar filtered
to last month and Status = Published, last month's recap page.

## Agenda

| Time | Block | What happens |
| --- | --- | --- |
| 0:00–0:10 | The month in numbers | Pieces planned vs shipped, per channel |
| 0:10–0:30 | Channel review | Every channel row: metric vs baseline, verdict |
| 0:30–0:45 | Top 3 / bottom 3 | Best and worst pieces of the month, by channel metric |
| 0:45–0:55 | Kill / scale decisions | Each channel: scale, hold, fix one thing, or kill |
| 0:55–1:10 | Next month's themes | Pull from Ideas by Score, one per theme |
| 1:10–1:15 | Close | Recap page published to the team space |

## Channel review — the questions

For every channel, in the table, ask:

1. Did we hit cadence? Count published pieces versus what the
   cadence column promised.
2. Did the key metric beat baseline? By how much, as a number?
3. Is prep time paying back? Prep Hours × pieces versus what the
   metric moved. A channel that eats 16 hours a month to hold a
   baseline flat is a hobby, not a channel.

## Decision thresholds — write yours in, these are the defaults

- Beat baseline two months running → **scale**: add a slot or a
  format variant next month
- Missed two months running → **kill it**, or fix exactly one
  variable (format, hook style, send time) and give it one more
  month. Never fix three variables — you learn nothing.
- Trial channels get two months, then Active or dead. No eternal
  trials.

## Top 3 / bottom 3 — the questions

1. What do the top three pieces share — theme, format, or hook
   style?
2. Did the bottom three fail on the idea (wrong topic) or on
   execution (weak hook, late publish)?
3. Which one piece gets repurposed this month, into which channel?
   (The repurposing rule: the source piece must have beaten its
   channel baseline.)

## Exit criteria

- [ ] Every channel row has a verdict: scale / hold / fix / kill
- [ ] Baselines updated to last month's actuals — the table now
      tracks reality, not history
- [ ] Trial channels have an end date or are dead
- [ ] Next month's themes picked, one top-Score idea per theme
- [ ] One repurposing fan-out queued for the first week
- [ ] Recap page published where the rest of the company can read it
`,

  /* ── 03 Formulas ───────────────────────────────────────────────── */

  "03-formulas/formula-reference.md": `# ContentOS formula reference

Every formula below is copy-paste ready: open a database, click
**New property → Formula**, paste, name it as shown. Property names
inside prop("…") match the CSV headers exactly — if you renamed a
property, update it inside the formula too.

## Ideas database

### 1. Score (if you keep Effort and Impact as numbers)
\`\`\`
round(prop("Impact") / prop("Effort") * 10) / 10
\`\`\`
Impact per unit of effort, one decimal. The CSV ships with Score
pre-computed on this exact math, so the two never disagree.
Powers: the backlog's default sort in weekly planning.

### 2. Idea Age
\`\`\`
dateBetween(now(), prop("Added"), "days")
\`\`\`
Days since the idea entered the bank.
Powers: the "stale idea" pass — anything over 90 days gets promoted
or deleted at the monthly recap.

### 3. Promoted
\`\`\`
if(empty(prop("Promoted To")),
  "💡 Idea",
  "🗓 On calendar")
\`\`\`
Shows whether an idea already has a calendar row (a relation to the
Content Calendar database — see the setup guide).
Powers: the planning meeting's "already promised" check.

## Content Calendar database

### 4. Days Until Publish
\`\`\`
dateBetween(prop("Publish Date"), now(), "days")
\`\`\`
Runway to the date. Negative means it is late.
Powers: sorting the week's board and the Late flag below.

### 5. This Week
\`\`\`
if(and(
  dateBetween(prop("Publish Date"), now(), "days") >= 0,
  dateBetween(prop("Publish Date"), now(), "days") <= 7),
  "🚀 This week",
  "")
\`\`\`
Flags everything publishing in the next seven days.
Powers: the writer's home view — the only list that matters today.

### 6. Late
\`\`\`
if(and(
  prop("Publish Date") < now(),
  prop("Status") != "Published"),
  "⚠️ Late",
  "")
\`\`\`
Publish date passed, piece not published. The honesty property.
Powers: the first question of weekly planning's recap block.

### 7. Status Light
\`\`\`
if(prop("Status") == "Published", "✅",
  if(prop("Status") == "Scheduled", "🗓",
    if(prop("Status") == "In Review", "👀", "✍️")))
\`\`\`
Five statuses condensed to a glanceable icon.
Powers: dense table views where full status text would crowd out
the hook.

### 8. Reading Time
\`\`\`
format(round(prop("Word Count") / 220)) + " min read"
\`\`\`
Word count at 220 words per minute.
Powers: the planning meeting's promise-breaking check — "12 minutes"
reads like a commitment once it is on screen.

### 9. Close Month
\`\`\`
formatDate(prop("Publish Date"), "MMM YYYY")
\`\`\`
Renders the date as "Oct 2026".
Powers: grouping the calendar by month without a second property.

### 10. Channel Icon (optional garnish)
\`\`\`
switch(prop("Channel"),
  "Blog", "📝",
  "Newsletter", "📧",
  "YouTube", "🎬",
  "LinkedIn", "💼",
  "Podcast", "🎙",
  "Instagram", "📷",
  "🌐")
\`\`\`
Powers: mixed-channel boards where color alone is not enough.

## Channels database

### 11. Last Published (rollup, configured in the property menu)
Property type **Rollup** → relation **Calendar** → property
**Publish Date** → calculate **Latest date**. Every channel row now
shows when it last actually shipped something.

### 12. Days Since Publish
\`\`\`
if(empty(prop("Last Published")),
  "—",
  format(dateBetween(now(), prop("Last Published"), "days")) + "d")
\`\`\`
Cadence decay, on the row itself. Empty means the channel has never
published — its own kind of verdict.
Powers: planning question 2 ("which channel is off cadence?")
without opening anything.

### 13. Off Pace
\`\`\`
if(dateBetween(now(), prop("Last Published"), "days") > 21,
  "⚠️ Off pace",
  "✅ On cadence")
\`\`\`
The 21-day default fits weekly-plus channels; monthly channels get
their own number (35–40) — set it per row with a formula variant or
just read Days Since Publish in the recap.
Powers: the recap's cadence question and the channel board's filter.

### 14. Words Published (formula alternative to a rollup)
\`\`\`
prop("Calendar").map(current.prop("Word Count")).sum()
\`\`\`
Total words shipped through this channel, straight off the relation.
Powers: the recap's prep-time payback math.

## Setup order

1. Import the three CSVs (see 04-setup/setup-guide.md)
2. Wire relations: Calendar.Channel → Channels; Ideas.Promoted To →
   Calendar
3. Add formulas 1–3 on Ideas, 4–10 on Calendar, 11–14 on Channels
4. Point weekly planning at Score + This Week; the recap at
   Baseline, Target and Off Pace

Support: support@omniforge.example
`,

  /* ── 04 Setup ──────────────────────────────────────────────────── */

  "04-setup/duplicate-link.md": `# Duplicate ContentOS into Notion

The fastest path: the hosted ContentOS workspace, duplicated with
one click.

**→ https://omniforge.example/duplicates/B-NS-3**

## What the duplicate brings across

1. Click **Duplicate** (top-right of the hosted workspace) and pick
   your team space in the dialog.
2. All three databases arrive with relations, select options and
   every formula from the reference pre-wired.
3. Tick **Include content** in the duplicate dialog to also get the
   75 seeded rows — the same 25 calendar entries, 25 ideas and 25
   channel programs you previewed before buying. Leave it unticked
   for empty databases.
4. The demo data is ordinary rows: delete everything, keep the
   views.

## Prefer your own workspace? Import the CSVs

Notion → New page → slash command /csv → pick a file from
01-databases/. Column headers map 1:1 to Notion property names, so
the formulas in 03-formulas/formula-reference.md plug straight in.
The property-type table and the two relation hooks are in
04-setup/setup-guide.md — the whole import takes about 25 minutes.

## After duplicating: three things to change

- Replace the owners (Lena, Jonas, Aisha, Dev, Kim, Marco) with your
  team in the Owner property options
- Swap the channel programs in channels.csv for your real channels
  — the Baseline and Target columns expect your numbers, not ours
- Put the three rituals on the calendar with real dates; a content
  system without rituals reverts to a sticky note within a quarter

Support: support@omniforge.example — 30-day money-back guarantee.
`,

  "04-setup/setup-guide.md": `# Setup guide — Content Planning System

Two paths: duplicate the finished workspace (10 minutes) or import
the CSVs into your own (25 minutes). Both end with the same system.

## What's in the kit

- 01-databases/ — content-calendar.csv, ideas.csv, channels.csv,
  25 authored rows each: one quarter of a six-person content team
  (Q3–Q4 2026), mid-flight — 13 pieces published, 3 scheduled, the
  rest in review, drafting or outline
- 02-rituals/ — weekly-planning (45 min), batch-writing-day (all
  day Wednesday), monthly-recap (75 min)
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
| Title / Idea / Channel | all three | Title |
| Channel, Status, Format, Theme | Calendar | Select |
| Source, Channel Fit, Status | Ideas | Select |
| Cadence, Owner, Primary Format, Audience, Status | Channels | Select / Text |
| Publish Date, Added | Calendar, Ideas | Date |
| Owner | all three | Person (after import: change to People) |
| Word Count, Effort, Impact, Score, Baseline, Target, Prep Hours | varies | Number |
| Hook, Notes | Calendar | Text |

Then wire two relations:

1. Calendar → Channels: add a **Relation** property on the calendar
   named Channel → connect to the Channels database. On each row,
   link the matching channel program.
2. Ideas → Calendar: add a **Relation** property on Ideas named
   Promoted To → connect to the Content Calendar. Link an idea once
   it lands a slot.

Finally paste the formulas from 03-formulas/ (setup order is at the
bottom of that file).

## Views worth building first (10 min)

1. **This week** — Calendar as table, filtered: This Week is not
   empty. Grouped by Status. This is the writer's home screen
2. **Pipeline board** — Calendar as board grouped by Status, sorted
   by Publish Date inside columns
3. **Backlog** — Ideas as table sorted by Score descending, grouped
   by Theme. Planning reads straight off this view
4. **Channel table** — Channels with Baseline, Target, Off Pace and
   Prep Hours visible. The recap runs on this view

## First week

- **Monday:** run weekly-planning on the seeded calendar — 25 rows
  is enough to feel the capacity math work
- **Wednesday:** run one batch-writing day, even solo. The block
  structure works for one person as well as for six
- **Friday:** publish whatever made it to Review; run the first
  weekly numbers
- **First Friday of next month:** run monthly-recap — the seeded
  channels.csv baselines make the first verdicts easy

## House rules that keep the system honest

1. If it is not on the calendar, it does not publish — "we'll just
   post something" is how cadences die
2. Word Count gets updated the moment a draft finishes, not when
   someone remembers
3. An idea enters the calendar through planning, never straight
   from a shower thought

Support: support@omniforge.example
`,

  /* kit stub note for the extended pack */

  "EXTENDED-PACK/repurposing-engine.md": `# Repurposing engine — in production

Status: **in production** — not in this archive.

What the finished file will contain: a one-to-many repurposing board
where every published piece fans out into 6 channel-specific
derivative tasks, each pre-filled with format, word target and
owner — plus the rules for which pieces earn a fan-out at all.
`,
};

/* ── Try-it demo — 12 rows lifted from content-calendar.csv ──────── */

export const demo: DemoContent = {
  kind: "notion",
  workspaceName: "ContentOS — Q4 2026",
  intro:
    "Twelve rows from the editorial calendar that ships in the kit. Every piece has an owner, a hook and a date; the Corvid case study is waiting on customer approval and the year-in-review is blocked on Q4 data — a real calendar looks like this.",
  rows: [
    {
      id: "cal-01",
      task: "Metrics dictionary template — landing page before Oct 21",
      owner: "Kim Ha",
      status: "In progress",
      due: "2026-10-21",
      priority: "High",
      effort: 3,
    },
    {
      id: "cal-02",
      task: "Newsletter #35 — templates special (all gifts, no pitch)",
      owner: "Lena Ortiz",
      status: "In progress",
      due: "2026-10-22",
      priority: "Med",
      effort: 1,
    },
    {
      id: "cal-03",
      task: "Dashboard audit video — review the rough cut",
      owner: "Aisha Bello",
      status: "Review",
      due: "2026-10-28",
      priority: "High",
      effort: 4,
    },
    {
      id: "cal-04",
      task: "Corvid case study — customer approval round",
      owner: "Jonas Weber",
      status: "Review",
      due: "2026-11-04",
      priority: "High",
      effort: 3,
    },
    {
      id: "cal-05",
      task: "Automation myths #4–5 — final two posts for approval",
      owner: "Dev Patel",
      status: "Review",
      due: "2026-11-02",
      priority: "Low",
      effort: 1,
    },
    {
      id: "cal-06",
      task: "Automation skills guide — draft at 60%",
      owner: "Kim Ha",
      status: "In progress",
      due: "2026-11-11",
      priority: "Med",
      effort: 5,
    },
    {
      id: "cal-07",
      task: "Podcast ep. 12 — record the guest Nov 3",
      owner: "Lena Ortiz",
      status: "In progress",
      due: "2026-11-25",
      priority: "Med",
      effort: 3,
    },
    {
      id: "cal-08",
      task: "Newsletter #36 — the skills issue",
      owner: "Lena Ortiz",
      status: "In progress",
      due: "2026-11-19",
      priority: "Low",
      effort: 1,
    },
    {
      id: "cal-09",
      task: "3 workflows video — write the shot list",
      owner: "Aisha Bello",
      status: "Backlog",
      due: "2026-11-13",
      priority: "Med",
      effort: 3,
    },
    {
      id: "cal-10",
      task: "Year-in-review post — blocked on Q4 data",
      owner: "Lena Ortiz",
      status: "Backlog",
      due: "2026-12-08",
      priority: "Med",
      effort: 4,
    },
    {
      id: "cal-11",
      task: "Behind the metrics dictionary — storyboard for Instagram",
      owner: "Marco Ruiz",
      status: "Backlog",
      due: "2026-11-06",
      priority: "Low",
      effort: 2,
    },
    {
      id: "cal-12",
      task: "LinkedIn carousel — published, best engagement of Q4",
      owner: "Aisha Bello",
      status: "Done",
      due: "2026-10-09",
      priority: "Med",
      effort: 2,
    },
  ],
};
