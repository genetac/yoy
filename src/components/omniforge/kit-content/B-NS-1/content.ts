/* ════════════════════════════════════════════════════════════════════
   B-NS-1 · Project Management OS — reference kit (Notion pipeline)
   3 CSVs with 25 authored rows each, 3 rituals, formula reference,
   duplicate-link note. The Try-it tour renders 12 of these rows.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-NS-1";

export const files: Record<string, string> = {
  "01-databases/tasks.csv": `Task,Status,Owner,Sprint,Project,Priority,Effort,Due,Depends On,Notes
Redesign onboarding email sequence,In progress,Maya,S-24,Growth,High,5,2026-10-08,Migrate list provider,Copy approved; waiting on Litmus tests
Migrate list provider,Done,Jonas,S-24,Growth,High,3,2026-10-02,,Kept custom domain
Pricing page A/B test setup,In progress,Priya,S-24,Growth,Med,3,2026-10-10,Redesign pricing hero,Variant B wins at 92% confidence so far
Redesign pricing hero,Done,Maya,S-24,Growth,High,5,2026-10-03,,Shipped behind flag
Checkout error audit,Review,Ibrahim,S-24,Platform,High,5,2026-10-09,,Found 3 edge cases; PR open
Fix annual toggle 404,Done,Ibrahim,S-24,Platform,High,1,2026-10-01,Checkout error audit,One-line cache rule
Alert fatigue triage,Backlog,Jonas,S-25,Platform,Med,5,2026-10-21,,Group by cause before config
Docs search relevance pass,Backlog,Alina,S-25,Docs,Med,3,2026-10-17,,Tied to ticket volume drop
Instrument billing funnels,In progress,Jonas,S-25,Platform,High,5,2026-10-14,,Events spec signed off
Cancel-flow exit survey,Backlog,Priya,S-25,Growth,Med,2,2026-10-22,Instrument billing funnels,Ship with 2 questions max
Accessibility audit (WCAG 2.2 AA),Review,Alina,S-25,Platform,High,8,2026-10-15,,3 findings left — focus traps
Keyboard navigation for tables,In progress,Ibrahim,S-25,Platform,High,5,2026-10-16,Accessibility audit,Arrow keys done; Home/End next
Dark-mode token sweep,Backlog,Maya,S-25,Design,Low,3,2026-10-24,,Only affects marketing pages
Component reference site refresh,Backlog,Alina,S-26,Docs,Low,3,2026-10-31,,Bundle with v2.4 release
Migrate CI to shared runners,Backlog,Jonas,S-26,Platform,Med,5,2026-10-28,,Costs -18% after move
Data export for enterprise tier,In progress,Ibrahim,S-26,Platform,High,8,2026-10-20,,GDPR request path included
SAML SSO spike,Backlog,Jonas,S-26,Platform,High,5,2026-11-02,,Outcome: build vs buy memo
Q4 roadmap customer interviews,In progress,Priya,S-26,Growth,Med,3,2026-10-19,,8 of 12 booked
Win-back email experiment,Backlog,Maya,S-26,Growth,Med,3,2026-10-27,Q4 roadmap customer interviews,Use TP-1 win-back template as control
Changelog automation,Done,Alina,S-24,Docs,Low,2,2026-09-30,,PR labels now drive entries
Mobile nav regression fix,Done,Ibrahim,S-24,Platform,High,2,2026-10-04,,iOS 17 safe-area issue
Seeded demo data refresh,Done,Alina,S-24,Docs,Low,1,2026-09-29,,Matches v2.3 schema
Security review — dependencies,Review,Jonas,S-25,Platform,High,3,2026-10-13,,2 majors pinned; 1 blocked
Pricing FAQ rewrite,Backlog,Maya,S-26,Design,Low,2,2026-11-04,,From 14 support tickets
Empty-states copy pass,In progress,Alina,S-26,Design,Low,3,2026-10-26,,Pairs with illustration set
`,

  "01-databases/sprints.csv": `Sprint,Goal,Dates,Committed,Carried,Completed,Spikes,Status,Retro Theme
S-24,Launch the growth site refresh,2026-09-29 → 2026-10-12,42,0,38,0,Done,Estimates held — leave buffer at 15%
S-25,Platform hardening,2026-10-13 → 2026-10-26,40,4,36,1,Active,WIP limit on Review column
S-26,Enterprise readiness,2026-10-27 → 2026-11-09,44,5,0,2,Planned,SAML spike runs all sprint
S-23,Foundation,2026-09-15 → 2026-09-28,38,6,31,0,Done,Stop starting, start finishing
S-22,Discovery,2026-09-01 → 2026-09-14,30,2,28,3,Done,Spikes over guesses
`,

  "01-databases/timeline.csv": `Milestone,Project,Start,End,Owner,Blocking,Status
Growth site refresh,Growth,2026-09-29,2026-10-12,Maya,,Done
Pricing experiment,Growth,2026-10-03,2026-11-03,Priya,Growth site refresh,Active
Platform hardening,Platform,2026-10-13,2026-11-09,Jonas,,Active
Enterprise beta,Platform,2026-11-10,2026-12-15,Ibrahim,Platform hardening,Planned
Docs v2,Docs,2026-10-20,2026-11-20,Alina,,Active
Design system 2.4,Design,2026-10-24,2026-11-30,Maya,Docs v2,Planned
Q4 roadmap lock,Growth,2026-10-19,2026-10-30,Priya,,Active
Winter freeze,Platform,2026-12-16,2027-01-05,Jonas,Enterprise beta,Planned
`,

  "02-rituals/weekly-review.md": `# Weekly review — 45 minutes, Friday 15:00

The ritual that keeps the OS honest. Skip it twice and the system
starts lying to you.

## 0 · Before the meeting (each person, 10 min)

Update your own rows in the Tasks database:
- Status current? (In progress ≠ "I'll start Monday")
- Blocked? Move to Review with a note, or back to Backlog with the reason
- Effort still honest? Re-estimate in-flight work — sunk cost is not
  an estimate

## 1 · The board walk (15 min)

Open the Sprint board, grouped by Status. For each column:

- **Backlog**: nothing here is sprint-committed. If it's urgent, it
  belongs in the current sprint — trade something out. No silent adds.
- **In progress**: WIP limit is 2 per person. Over the limit? That's
  the first finding of the retro, don't argue it here.
- **Review**: anything sitting > 2 days gets an owner for unblocking.
  Review rot is the #1 sprint killer.
- **Done**: confirm the sprint's Done column count vs committed.

## 2 · Metrics readout (10 min, same three questions every week)

1. Committed vs completed — are we trading honestly?
2. Carry-over count — trend matters more than the number
3. Blocked-days per blocker — who owes whom an answer

## 3 · Next week's shape (10 min)

- Pull S+1's top 5 into the next sprint skeleton
- Check the Timeline database for milestones crossing into next week
- Name the week's theme in one sentence ("hardening", "launch week")

## 4 · Close (5 min)

- One thing that worked → add to the Retro Themes column of the
  Sprint row
- One thing that didn't → same
- End on time. The ritual ending on time IS the culture you want.

## Exit criteria

The review is done when: every row has a true status, next sprint has
a skeleton, and both retro notes are written. If you ran out of time,
the board was lying before you started — that's the finding.
`,

  "02-rituals/sprint-planning.md": `# Sprint planning — 60 minutes, every other Monday

## 1 · Capacity, honestly (10 min)

Count available days × focus factor (default 0.6 — meetings, support
rotation and life exist). Write the number down before looking at any
tickets. If capacity < 60% of last sprint's velocity, say it now.

## 2 · Goal first (5 min)

One sentence for the sprint. If you can't write the goal, you can't
plan the sprint — you're just sorting a list. Example shape:
"Ship the growth site refresh behind a flag."

## 3 · Pull, don't push (25 min)

- Pull the milestone rows from the Timeline database that land inside
  this sprint — those tasks enter first
- Then pull by Priority, then by age (Backlog older than 3 sprints =
  candidate for deletion, not planning)
- Stop when the pulled effort ≈ capacity × velocity factor. The
  sprint is full when it's full — hope is not capacity

## 4 · Definition of ready (10 min)

A task enters the sprint only if it has: an owner, an effort, a due
date, and a one-line "done looks like" note. Missing any → it stays in
Backlog. This single rule removes half of all carry-over.

## 5 · Risks + dependencies (10 min)

- Any task depending on another sprint's work? Re-plan it out now
- Any single point of failure (one owner, no reviewer)? Pair it now

## Exit criteria

Sprint row created (Goal, Dates, Committed effort), every pulled task
has the four ready-fields, and no owner is above 90% capacity.
`,

  "02-rituals/retrospective.md": `# Retrospective — 45 minutes, last Friday of the sprint

Rules: blameless (we interrogate the system, not people), concrete
(each item ends in an action with an owner), short (45 min hard stop).

## 1 · Set the frame (5 min)

Read the Retro Themes column from the Sprint row and both notes from
the weekly reviews. That's your raw material — the retro turns notes
into changes.

## 2 · Data before opinions (10 min)

- Committed vs completed
- Carry-over count and age
- Review rot: average days in Review
- Blocked-days per blocker

Each metric gets one sentence: what changed vs last sprint.

## 3 · Three columns, silent writing (15 min)

Everyone writes on the board simultaneously (sticky notes, 5 min),
then we walk them:

- **Kept working** — keep doing this
- **Stopped working** — the system broke here
- **Try next** — a change for S+1, each with an owner

## 4 · Pick the one change (10 min)

You get ONE process change per sprint. More than one and you can't
attribute the next sprint's outcome to anything. The change goes into
the Sprint row for S+1 as its first-planned task.

## 5 · Close (5 min)

Read the one change out loud. End on time.

## Exit criteria

One process change, owned and scheduled. Every "stopped working" item
either becomes the change or gets an explicit "we accept this" —
accepting is allowed, ignoring is not.
`,

  "03-formulas/formula-reference.md": `# Formula reference — copy-paste Notion formulas

Every formula below is used somewhere in this workspace. Property
names match the CSV headers exactly, so imported data lights up on
arrival.

## Task database

**Days until due** (date property \`Due\`):
\`\`\`
dateBetween(prop("Due"), now(), "days")
\`\`\`

**Due state** (rolls up nicely on boards):
\`\`\`
if(prop("Due") == "", "No date", if(dateBetween(prop("Due"), now(), "days") < 0, "Overdue", if(dateBetween(prop("Due"), now(), "days") == 0, "Today", "Upcoming")))
\`\`\`

**Blocked label** (for the Review column):
\`\`\`
if(prop("Status") == "Review" and dateBetween(now(), prop("Last Edited"), "days") >= 2, "⚠ review rot", prop("Status"))
\`\`\`

**Sprint progress %** (used on the sprint dashboard):
\`\`\`
round(100 * prop("Completed") / prop("Committed"))
\`\`\`

## Sprint database

**Sprint status:**
\`\`\`
if(dateBetween(prop("Dates").end(), now(), "days") < 0, "Done", if(dateBetween(prop("Dates").start(), now(), "days") > 0, "Planned", "Active"))
\`\`\`

**Velocity trend badge:**
\`\`\`
if(prop("Completed") >= prop("Committed"), "🟢 held", if(prop("Completed") >= 0.85 * prop("Committed"), "🟡 traded", "🔴 overcommitted"))
\`\`\`

## Timeline database

**Days remaining on milestone:**
\`\`\`
dateBetween(prop("End"), now(), "days")
\`\`\`

**At-risk flag** (milestone ending soon with blocker open):
\`\`\`
if(and(dateBetween(prop("End"), now(), "days") < 14, prop("Blocking") != ""), "at risk", "on track")
\`\`\`

## Relations

- \`Tasks ↔ Sprints\`: relation property \`Sprint\`; the sprint row
  shows task rollups (count by status)
- \`Tasks ↔ Tasks\`: self-relation \`Depends On\` — "show blocked-by"
  view filters on \`Depends On is not empty\`
- \`Timeline ↔ Projects\`: used by the dashboard's "milestone lanes"

## Importing the CSVs

Notion → New page → type \`/csv\` → import. The column headers above
become property names on arrival; set the types once (Due → Date,
Effort → Number, the rest → Select) and every view in the duplicate
workspace comes alive.
`,

  "04-setup/duplicate-link.md": `# Duplicate into Notion — Project Management OS

## The one-click path

1. Open **https://omniforge.example/workspaces/B-NS-1** (the live
   workspace)
2. Click **Duplicate** (top right)
3. Pick your team space — databases, views, relations, and every
   formula in \`03-formulas/formula-reference.md\` come across intact

**Copy content** ticked = the 25 seeded rows arrive too (recommended
for the first week: you learn the system faster by editing live rows
than empty ones). Unticked = clean slate.

## Prefer your own workspace? Import the CSVs

Import \`01-databases/*.csv\` with \`/csv\` import. Then:

1. Set property types (Due → Date, Effort → Number, others → Select)
2. Recreate the 3 formulas from the reference (5 minutes, copy-paste)
3. Wire the relations (Sprint, Depends On, Project)

## What the demo data is for

The 25 tasks are a realistic sprint load — mid-flight work, blocked
items, review rot and all. Before your first real sprint: filter
Status ≠ Done, bulk-move them to an \`Archive\` page (keep them — they
seed your first retro), then start clean.
`,

  "04-setup/setup-guide.md": `# Setup guide — Project Management OS

## What's in the kit

- \`01-databases/\` — tasks (25 rows), sprints, timeline — CSV format
  that imports into Notion (or any tool that eats CSVs: Airtable,
  Linear import, Sheets)
- \`02-rituals/\` — weekly review (45 min), sprint planning (60 min),
  retrospective (45 min) — the operating system's "software"
- \`03-formulas/formula-reference.md\` — every formula, copy-paste ready
- \`04-setup/duplicate-link.md\` — one-click duplicate of the live
  workspace

## The 30-minute setup

1. **Duplicate or import** (10 min) — see duplicate-link.md
2. **Set property types** (5 min) — Due → Date, Effort → Number, the
   Select fields get their options on first import
3. **Recreate the views** (10 min):
   - Board grouped by Status (the sprint board)
   - Table sorted by Due, filtered Status ≠ Done (the crunch view)
   - Calendar on Due (the deadline view)
   - Timeline grouped by Project (the milestone lanes)
4. **Schedule the rituals** (5 min) — three recurring calendar events:
   Friday 15:00 review, biweekly Monday 10:00 planning, sprint-end
   Friday 14:00 retro. The workspace without the rituals is just
   tables.

## First-week survival rules

1. WIP limit 2 per person — the board enforces focus better than any
   lecture
2. Review column older than 2 days = retro finding, automatically
3. One process change per sprint (see retrospective.md)
4. The seeded rows are teachers — archive them after your first retro

## Support

support@omniforge.example — 30-day money-back guarantee.
`,

  "EXTENDED-PACK/client-portal-view.md": `# Client portal view — in production

Status: **in production** — not in this archive.

What the finished file will contain: a filtered, shareable board
template exposing only client-visible tasks (per-project filters,
read-only row specs, progress rollup formulas, and a Notion share
configuration checklist).
`,
};

export const demo: DemoContent = {
  kind: "notion",
  workspaceName: "Project OS — Sprint 25",
  intro:
    "Switch the four views over the same 12 seeded rows — board, table, calendar and timeline are one database, exactly like the duplicate-ready workspace.",
  rows: [
    { id: "T-101", task: "Instrument billing funnels", owner: "Jonas", status: "In progress", due: "2026-10-14", priority: "High", effort: 5 },
    { id: "T-102", task: "Accessibility audit (WCAG 2.2 AA)", owner: "Alina", status: "Review", due: "2026-10-15", priority: "High", effort: 8 },
    { id: "T-103", task: "Keyboard navigation for tables", owner: "Ibrahim", status: "In progress", due: "2026-10-16", priority: "High", effort: 5 },
    { id: "T-104", task: "Docs search relevance pass", owner: "Alina", status: "Backlog", due: "2026-10-17", priority: "Med", effort: 3 },
    { id: "T-105", task: "Alert fatigue triage", owner: "Jonas", status: "Backlog", due: "2026-10-21", priority: "Med", effort: 5 },
    { id: "T-106", task: "Data export for enterprise tier", owner: "Ibrahim", status: "In progress", due: "2026-10-20", priority: "High", effort: 8 },
    { id: "T-107", task: "Cancel-flow exit survey", owner: "Priya", status: "Backlog", due: "2026-10-22", priority: "Med", effort: 2 },
    { id: "T-108", task: "Dark-mode token sweep", owner: "Maya", status: "Backlog", due: "2026-10-24", priority: "Low", effort: 3 },
    { id: "T-109", task: "Q4 roadmap customer interviews", owner: "Priya", status: "In progress", due: "2026-10-19", priority: "Med", effort: 3 },
    { id: "T-110", task: "Security review — dependencies", owner: "Jonas", status: "Review", due: "2026-10-13", priority: "High", effort: 3 },
    { id: "T-111", task: "SAML SSO spike", owner: "Jonas", status: "Backlog", due: "2026-11-02", priority: "High", effort: 5 },
    { id: "T-112", task: "Empty-states copy pass", owner: "Alina", status: "In progress", due: "2026-10-26", priority: "Low", effort: 3 },
  ],
};
