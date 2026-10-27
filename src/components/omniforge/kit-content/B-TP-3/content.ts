/* ════════════════════════════════════════════════════════════════════
   B-TP-3 · Presentation Template Pack
   20 master slide layouts (index CSV + cover/data/story spec docs), a
   fully written 12-slide pitch deck, a quarterly report deck with chart
   specs, speaker notes for every layout, setup guide. Every file's key
   equals its bundle path. The Try-it demo reads the same copy.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-TP-3";

export const files: Record<string, string> = {
  /* ── 01 Master layouts ─────────────────────────────────────────── */

  "01-master-layouts/layout-index.csv": `layout_id,name,purpose,grid,notes
L01,cover-title,Open the deck with the project in one line,Full-bleed image right / title block left 5 cols,Title ≤ 8 words; one-line subtitle; date + presenter strip
L02,cover-agenda,Tell them the three things you will cover,Title top / three numbered rows below,Write the three agenda items as verbs not topics
L03,section-divider,Reset attention between chapters,Oversized section number left / section title right,Use between unlike chapters; number sections not slides
L04,statement-slide,Plant the one claim they must remember,Single centered claim / 60% of slide height,One sentence; if it needs a second sentence it is two slides
L05,big-number,Make one metric land emotionally,Number left 60% / context and comparison right,Always state the comparison: down from / up to / bigger than
L06,comparison-two-column,Contrast two options honestly,Two equal columns / shared heading,A predictable winner column reads as rigged; keep both honest
L07,before-after,Show the change the work produced,Left before / right after / shared caption,Same framing and same scale in both halves
L08,timeline-horizontal,Walk a plan across time,Horizontal spine / 3-5 labeled nodes,Verb-first labels; dates above the line and outcomes below
L09,process-flow,Explain how the work happens,Three or four connected steps left to right,Name the steps from the client's point of view
L10,feature-grid-2x2,Group four related facts,2x2 grid / equal cells / icon + four-word label,Four is the ceiling; five needs the 3-col layout
L11,feature-grid-3-col,Group three facts or six in two rows,Three columns / optional second row,Default for team slides and win roundups
L12,chart-single,Prove the story with one chart,Chart 80% width / takeaway title above / source below,One series maximum; label directly not via legend
L13,chart-duo,Compare two views of the same story,Two half-width charts / shared takeaway title,Only when the pair tells one story together
L14,chart-plus-commentary,Chart with the reasoning beside it,Chart left 7 cols / commentary right 5,Commentary is three bullets max; the chart stays the hero
L15,table-data,Show structured detail without clutter,Clean table / header row / zebra striping,Right-align numbers; cap at 7 rows per slide
L16,quote-slide,Let a customer or stakeholder speak,Large quote centered / attribution bottom right,Their words beat your words; 25 words maximum per quote
L17,team-grid,Show who does the work,3-6 cards / photo + name + one-line role,One-line roles only; full credentials live in the appendix
L18,roadmap,Show the plan across quarters or phases,Horizontal swimlanes / phase columns,Name phases by outcome not by calendar month
L19,options-table,Present choices with a recommendation,Three option columns / recommended tier tagged,Tag the recommendation visually; never hide it
L20,closing-cta,Land the one ask,Single ask centered / contact strip bottom,One ask per deck; it should be the deck's only ask
`,

  "01-master-layouts/cover-sections.md": `# Master layouts I — covers, sections, statements and closers

Spec sheet for the structural layouts: L01, L02, L03, L04, L16, L20.
Data-carrying layouts live in \`data-slides.md\`; narrative patterns live
in \`story-slides.md\`. Every layout below is specified on a 12-column
grid, 16:9, with the same type scale.

## The type scale (all layouts)

| Role | Size | Weight | Notes |
| --- | --- | --- | --- |
| Cover title | 54–72pt | Bold | One line; two lines maximum |
| Slide title | 32–40pt | Semibold | The takeaway, not the topic |
| Statement text | 40–48pt | Medium | One sentence fills the slide |
| Body / table text | 18–24pt | Regular | 18pt is the absolute floor |
| Caption / source | 14–16pt | Regular | Source lines live here |

## L01 — cover-title

**Purpose:** the deck's first impression and its filing name.
**Grid:** full-bleed image right (7 cols) / title block left (5 cols),
both vertically centered.
**Copy pattern:**

- Title: {{project_name}} — at most 8 words
- Subtitle: {{one_line_outcome}} — what changes if this deck works
- Strip: "Prepared for {{client_name}} · {{sent_date}} · {{sender_company}}"

**Rules:** the image comes from the client's world — their product,
their store, their dashboard — never stock photography of handshakes.
If no image exists, a flat brand color beats a bad photo.

## L02 — cover-agenda

**Purpose:** set expectations in three items; buy attention for the
whole deck.
**Grid:** title top-left; three numbered rows beneath, left-aligned.
**Copy pattern:**

1. {{agenda_verb_1}} {{agenda_object_1}} — e.g. "Name the problem"
2. {{agenda_verb_2}} {{agenda_object_2}} — e.g. "Show the plan"
3. {{agenda_verb_3}} {{agenda_object_3}} — e.g. "Agree the next step"

**Rules:** verbs, not topics ("Name the problem" beats "Background").
Three items — a fourth halves recall. Skip this layout for decks under
six slides.

## L03 — section-divider

**Purpose:** reset attention between chapters that feel different.
**Grid:** oversized section number left ({{section_number}}), section
title right, both on a flat background.
**Copy pattern:** number ("02") + title ("What it costs").
**Rules:** use between unlike chapters only (context → plan → ask).
Number sections, not slides — the audience counts sections back to
questions later.

## L04 — statement-slide

**Purpose:** plant the one claim they must remember a week later.
**Grid:** a single sentence, centered, 40–48pt, nothing else on the
slide.
**Copy pattern:** {{subject}} {{verb}} {{number or stake}} —
"{{statement_example}}".
**Rules:** one sentence. If it needs a second sentence, it is two
slides. No logos, no footers, no decoration — the emptiness is the
emphasis.

## L16 — quote-slide

**Purpose:** let someone else say it — a customer, the client's own
stakeholder, a user.
**Grid:** large quote centered (left-aligned rag), attribution bottom
right.
**Copy pattern:** "{{quote_text}}" — {{quote_speaker}},
{{quote_context}}.
**Rules:** 25 words maximum. Their words beat your words: a client
stakeholder describing the problem is stronger than you describing the
solution. Never trim a quote into meaning something it didn't say.

## L20 — closing-cta

**Purpose:** land the one ask, then end.
**Grid:** single ask centered, contact strip along the bottom.
**Copy pattern:**
Ask: {{the_ask}} — "Sign by {{signature_date}}; kickoff
{{kickoff_date}}"
Strip: {{sender_name}} · {{sender_email}} · {{sender_phone}}
**Rules:** one ask per deck. It should be the deck's only ask — an
audience that was asked twice remembers neither. After this slide:
black. A "thank you / questions?" slide dilutes the ask.
`,

  "01-master-layouts/data-slides.md": `# Master layouts II — data slides

Spec sheet for the data-carrying layouts: L05, L12, L13, L14, L15, L19.
The chart specs in \`03-report-slides/quarterly-report-deck.md\` use the
exact format defined here.

## The takeaway-title rule (applies to every data slide)

The slide title states the conclusion, not the topic. "Checkout
conversion, Q2" is a topic. "Conversion held above {{rate}} through the
migration" is a takeaway. The audience should understand the slide from
the title alone — the chart is the evidence, not the message.

## The chart chooser

| Your data situation | Use | Not |
| --- | --- | --- |
| One metric over time | Line (L12) | Area with shading |
| Compare 3–7 categories | Horizontal bar (L12) | Pie, ever |
| Two metrics, one story | Chart duo (L13) | Dual-axis single chart |
| One chart + your reasoning | Chart + commentary (L14) | Chart + paragraph |
| Structure and status | Table (L15) | Traffic-light icons alone |
| Before vs after one change | Two bars or L07 | Two pies |
| Composition of a total | Stacked bar (if 2–3 parts) | Pie of 6+ slices |

## The chart spec format (copy for every chart you build)

1. **Type + series:** e.g. line, one series
2. **Metric + unit:** {{metric_name}} ({{unit}})
3. **Source:** {{data_source}}, pulled {{pull_date}}
4. **Annotation:** mark {{annotation_event}} on the week it happened
5. **Takeaway title:** "Takeaway: {{takeaway_line}}"

If you cannot fill all five lines, the chart is not ready for a slide.

## L05 — big-number

**Purpose:** make one metric land emotionally before anyone reads
anything.
**Grid:** number left (60% of the slide, 200pt+), context right.
**Copy pattern:**
Number: {{big_number}} — the unit and period in small text
Context: {{comparison_line}} — "down from {{old_value}} in
{{old_period}}"
**Rules:** always give the comparison. A number without a comparison is
a number nobody can feel. One big number per deck section.

## L12 — chart-single

**Grid:** takeaway title above, chart at 80% width, source line at 14pt
bottom-left.
**Rules:** one series; label the line or bar directly — delete the
legend; start bar axes at zero (line axes may zoom, but annotate the
zoom).

## L13 — chart-duo

**Grid:** two half-width charts under one shared takeaway title; one
source line covers both.
**Rules:** only pair charts that tell one story together ("volume and
quality moved together"). Same y-scale unless labeled otherwise. If
each chart has its own title, they belong on two slides.

## L14 — chart-plus-commentary

**Grid:** chart left (7 cols), commentary right (5 cols).
**Copy pattern:** three bullets maximum — what moved, why, what we do
next. The chart stays the hero; commentary supports, never competes.

## L15 — table-data

**Grid:** header row + zebra striping; 7 rows maximum per slide.
**Rules:** right-align numbers (units in the header, not the cells);
round to the precision that matters — 2.1% not 2.1379%; "—" for
not-applicable, "n/a" only when you must.

## L19 — options-table

**Grid:** three option columns; the recommended one carries a visible
tag or border.
**Copy pattern:** identical row labels across tiers (price / duration /
what's included / best for) — the audience compares down the rows.
**Rules:** tag the recommendation visually and say it out loud once.
Never let the top option be an obvious strawman — see the three-tier
builder in the Proposal Pack.

## Honest-data rules (non-negotiable)

1. Every chart carries its source line. No source, no slide.
2. Annotate the bad news too — the chart that hides a dip is the chart
   nobody trusts again.
3. Don't truncate axes to inflate a change; when a line axis zooms,
   write the zoom on the slide.
4. Show the base size where it matters (n = {{sample_size}}).

## Accessibility

- Text on charts ≥ 14pt; contrast ratio 4.5:1 or better.
- Never encode meaning in color alone — add labels, patterns or direct
  annotation. One in twelve men reads color differently than you.
- Alt-text formula for shared charts: "Chart type of {{metric}}
showing {{takeaway}} from {{period_start}} to {{period_end}},
source {{data_source}}."
`,

  "01-master-layouts/story-slides.md": `# Master layouts III — story slides

Spec sheet for the narrative patterns: L04 as story beat, L06, L07, L08,
L16, and how sequences of them carry a room.

## The one-slide-one-beat rule

A slide is one beat of a story: one situation, one tension, one turn.
Two beats on one slide means neither lands. Testing a deck: say each
slide's beat out loud in one sentence — "this is where they learn the
cost." A slide with no beat is a slide to cut.

## The five-beat arc (whole decks, not single slides)

| Beat | Job | Typical layouts |
| --- | --- | --- |
| 1. Situation | Their world, fairly stated | L01, L16 |
| 2. Tension | The problem and its owner | L16, L11 |
| 3. Stakes | What it costs, in their numbers | L05, L12 |
| 4. Turn | The plan that changes it | L04, L09 |
| 5. New state | Life after, then the ask | L07, L20 |

Most weak decks are beats 1–3 repeated with different fonts.

## L04 as a story beat — writing the claim line

Pattern: {{subject}} {{verb}} {{number or stake}}.

- "Every week the leak continues costs {{weekly_cost}}."
- "{{client_company}}'s team spends {{hours}} hours a month on
  {{wasted_activity}}."

Two rules: the subject is the client's world (never "our methodology");
the verb is concrete ("loses", "spends", "ships"), never "leverages".

## L06 — comparison-two-column

Two equal columns under a shared heading: "{{option_a}} vs
{{option_b}}". Three rows of honest differences. Rules: if one column
wins every row, you have written an ad, not a comparison — find the row
where the other option legitimately wins and say so. Credibility here
is what the investment slide spends later.

## L07 — before-after

Left "before", right "after", shared caption underneath. Rules: same
framing, same scale, same lighting — the audience must be able to
attribute every difference to the work, not the camera. Caption
pattern: "{{before_state}} ({{before_date}}) → {{after_state}}
({{after_date}})". When the change is a number, not an image, use two
bars and label the delta between them.

## L08 — timeline-horizontal

A horizontal spine with 3–5 nodes. Labels are verb-first: "Ship
{{deliverable}}", "Review {{artifact}}", "Decide {{decision}}". Dates
sit above the line; what the client sees sits below it. Rules: never
draw a timeline you cannot staff — every node needs an owner name in
the appendix. Five nodes maximum; a longer plan is a roadmap (L18).

## L16 as a story beat — the quote sequence

The strongest three-slide opening in this pack: their user quotes the
problem (L16), their numbers size it (L05), their stakeholder asks for
the plan (L16). You have not claimed anything yet — and the room is
already on your side of the table.

## A written example — the six-slide story

1. **L16:** "{{user_quote}}" — {{user_name}}, {{user_role}}. Beat:
   a real person feels this.
2. **L05:** {{cost_number}} a month. Down from {{trend_line}}. Beat:
   and it has a number.
3. **L04:** "{{client_company}} should not have to
   {{simplified_outcome}}." Beat: the turn.
4. **L09:** Audit → Fix → Harden, each step with what you see. Beat:
   the plan is real.
5. **L12:** {{proof_metric}} after the same fix at {{peer_company}}.
   Beat: it has worked before.
6. **L20:** Approve the sprint by {{date}}. Beat: the ask.

Twenty sentences, six slides, one story. That is the density target.
`,

  /* ── 02 Pitch deck ─────────────────────────────────────────────── */

  "02-pitch-deck/pitch-deck-12-slides.md": `# The 12-slide client pitch — fully written

A freelancer/agency pitch deck: every slide's copy, message and visual
direction. Fill the {{merge_fields}}, paste into your slide tool, apply
the layouts from \`layout-index.csv\`. At 12 slides it runs 15 minutes
with questions — the room's attention budget for a first pitch.

**The spine:** their words → their numbers → your plan → your proof →
the ask. You do not speak about yourself until slide 9.

### Slide 1 — {{project_name}} (L01 cover-title)

**Key message:** this deck is about one project for one client.
**On-slide copy:** "{{project_name}}" / "{{one_line_outcome}}" /
"Prepared for {{client_name}} · {{sent_date}} · {{sender_company}}"
**Visual direction:** full-bleed image from the client's world — their
product, storefront or dashboard — duotoned to your brand accent.
**Speaker beat:** say the project in one sentence, then the agenda in
one breath. 15 seconds, next slide.

### Slide 2 — What you told me (L11 three quotes)

**Key message:** I listened; this is your problem in your words.
**On-slide copy:** "{{their_quote_1}}" — {{quote_1_speaker}} /
"{{their_quote_2}}" — {{quote_2_speaker}} / "{{their_quote_3}}" —
{{quote_3_speaker}}
**Visual direction:** three columns, quote text at 24pt, no quotation
clip-art, no stock faces.
**Speaker beat:** read quote one aloud, slowly. Attribute it. That's
all.

### Slide 3 — What it costs (L05 big number)

**Key message:** the problem has a number.
**On-slide copy:** {{cost_number}} {{cost_unit}} per {{period}}.
Comparison line: "{{comparison_anchor}} — and it recurs every
{{period}} until it's fixed."
**Visual direction:** the number at 200pt+; comparison line at 18pt
right of it.
**Speaker beat:** say the number, then stop. The pause after a big
number is the slide doing its job.

### Slide 4 — Why now (L04 statement)

**Key message:** a real trigger makes this quarter different.
**On-slide copy:** "{{why_now_claim}}"
**Visual direction:** one sentence, centered, nothing else.
**Speaker beat:** connect the trigger to their calendar —
{{trigger_event}} — not to your availability.

### Slide 5 — The plan in one sentence (L04 statement)

**Key message:** if they remember one slide, this one.
**On-slide copy:** "We will {{the_plan}} by {{deadline}}."
**Visual direction:** identical treatment to slide 4 — the repetition
is deliberate: claim, then plan.
**Speaker beat:** slow down. This sentence is the deck's thesis.

### Slide 6 — How it works (L09 process-flow)

**Key message:** the plan is a process, not a hope.
**On-slide copy:** {{step_1_name}} ({{step_1_duration}}) →
{{step_2_name}} ({{step_2_duration}}) → {{step_3_name}}
({{step_3_duration}}), each with "you see: {{step_output}}".
**Visual direction:** three connected boxes left to right; outputs
below the line.
**Speaker beat:** name what they receive at each step — reviews,
access, deliverables. Process trust is built of visible outputs.

### Slide 7 — Proof (L13 chart-duo)

**Key message:** this has worked before, in comparable conditions.
**On-slide copy:** Chart A takeaway: "{{case_1_takeaway}}" (metric:
{{case_1_metric}}, source {{case_1_source}}). Chart B takeaway:
"{{case_2_takeaway}}" (metric: {{case_2_metric}}, source
{{case_2_source}}).
**Visual direction:** two single-series charts under one shared title;
both carry source lines.
**Speaker beat:** "Same category, tighter constraints" — then stop.
Never volunteer the differences; answer them if asked.

### Slide 8 — Timeline (L08 timeline-horizontal)

**Key message:** the finish line is dated and owned.
**On-slide copy:** {{milestone_1}} ({{m1_date}}) → {{milestone_2}}
({{m2_date}}) → {{milestone_3}} ({{m3_date}}) → Final review
({{m4_date}}), each with "you see: {{milestone_output}}".
**Visual direction:** four nodes, verb-first labels, outputs below the
line.
**Speaker beat:** flag the client dependencies — feedback windows and
the single decision-maker — before they ask.

### Slide 9 — Who does the work (L17 team-grid)

**Key message:** named people, not "resources".
**On-slide copy:** {{team_member_1}} — {{role_1}}, one line on what
they own. Repeat for 2–4 more.
**Visual direction:** cards with photos, one-line roles; no CV lists.
**Speaker beat:** this is the first slide about you. Keep it about
them: "You'll work directly with {{senior_name}} — no account-manager
wall."

### Slide 10 — Investment (L19 options-table)

**Key message:** three options, one recommendation, no hidden numbers.
**On-slide copy:** {{tier_a_name}} / {{tier_b_name}} — recommended /
{{tier_c_name}}, with rows: price / duration / what's included /
revisions / best for.
**Visual direction:** three columns; recommended column tagged. Built
with the Proposal Pack's three-tier builder.
**Speaker beat:** "All three achieve the outcome we opened with. They
differ in depth and speed." Then let them read.

### Slide 11 — De-risked (L10 feature-grid-2x2)

**Key message:** the four questions you're too polite to ask, answered.
**On-slide copy:** If it's late → {{late_policy}}. If the scope changes
→ written change orders, priced before work. If you're unhappy →
{{remedy_policy}}. Your data and IP → {{ip_policy}}.
**Visual direction:** four equal cells, icon + four-word label.
**Speaker beat:** read the four cells as questions, answer them as
policies. This slide exists because someone in the room is thinking
them.

### Slide 12 — The ask (L20 closing-cta)

**Key message:** one decision, dated.
**On-slide copy:** "Sign by {{signature_date}} → kickoff
{{kickoff_date}} → first deliverable {{first_deliverable_date}}."
Contact strip: {{sender_name}} · {{sender_email}}.
**Visual direction:** single ask centered; black slide after this one.
**Speaker beat:** say the ask. Then stop talking. Ten full seconds of
silence is the slide doing its job — the first voice after it should
not be yours.
`,

  /* ── 03 Report slides ──────────────────────────────────────────── */

  "03-report-slides/quarterly-report-deck.md": `# The quarterly report deck — 10 slides with chart specs

A client-facing quarterly report: honest numbers, shipped work, misses
with fixes, and one decision. Built from the data layouts
(L05/L12/L13/L14/L15/L18/L20); every chart uses the spec format from
\`data-slides.md\`. Runs 25 minutes with discussion.

**The spine:** numbers first, story second, decision last. A report
deck that saves the numbers for the end has already lost the room.

### Slide 1 — {{client_company}} · {{quarter}} report (L01)

On-slide: title, "{{quarter}} results and what they mean", "Prepared by
{{sender_company}} · {{report_date}}". Presenter strip with the single
sentence the whole quarter reduces to: "{{quarter_headline}}".

### Slide 2 — Executive summary (L13 or three L05s)

**Key message:** three numbers defined the quarter — here they are.
On-slide: {{primary_metric}}: {{primary_now}} ({{primary_delta}} vs
{{previous_quarter}}) / {{secondary_metric}}: {{secondary_now}}
({{secondary_delta}}) / {{tertiary_metric}}: {{tertiary_now}}
({{tertiary_delta}}).
Speaker beat: good or bad, say it in the first 60 seconds — the room
already knows which it is.

### Slide 3 — Primary metric, {{n}}-week trend (L12 chart-single)

**Chart spec**
1. Type + series: line, one series
2. Metric + unit: {{primary_metric}} ({{primary_unit}})
3. Source: {{data_source}}, pulled {{pull_date}}
4. Annotation: mark {{annotation_event}} on the week it happened
5. Takeaway title: "Takeaway: {{trend_takeaway}}"

Speaker beat: walk the annotation first ("this jump is the
{{annotation_event}} shipping"), then the trend.

### Slide 4 — Channel / workstream breakdown (L13 chart-duo)

**Chart A spec:** horizontal bar, {{channel_a_metric}} by
{{breakdown_dimension}}; source {{data_source_a}}; takeaway
"{{breakdown_a_takeaway}}".
**Chart B spec:** horizontal bar, {{channel_b_metric}} by the same
dimension; source {{data_source_b}}; takeaway
"{{breakdown_b_takeaway}}".
Speaker beat: name the best and the worst channel out loud — in that
order — and what the pair tells you together.

### Slide 5 — The work shipped (L11 feature-grid-3-col)

On-slide: six cards, verb-first: "Shipped {{shipped_item_1}}" …
"Shipped {{shipped_item_6}}", each with its one-line effect:
"{{shipped_effect_1}}". Speaker beat: one sentence per card, no more —
the deck exists so you don't have to recount the quarter verbosely.

### Slide 6 — Misses and fixes (L15 table-data)

**Key message:** we found what underperformed and here is the fix.
Table columns: Miss | Impact | The fix | Status. Rows:
{{miss_1}} | {{miss_1_impact}} | {{miss_1_fix}} | {{miss_1_status}}
…(cap at 4 misses; the fifth goes in the appendix).
Speaker beat: this slide buys more trust than slide 2. Read every miss
before every win you mention after it.

### Slide 7 — Experiments (L15 table-data)

Table columns: Test | Hypothesis | Result | Verdict. Rows:
{{test_1}} | {{hypothesis_1}} | {{result_1}} | {{verdict_1}} …
Verdicts are "double down / tweak / kill" — never "inconclusive"
without a next step attached.

### Slide 8 — Spend vs plan (L12 chart-single)

**Chart spec**
1. Type + series: two bars per month — planned vs actual
2. Metric + unit: {{budget_metric}} ({{currency}})
3. Source: {{finance_source}}, as of {{pull_date}}
4. Annotation: variance >{{variance_threshold}} gets a labeled note
5. Takeaway title: "Takeaway: {{spend_takeaway}}"

Speaker beat: explain variance in one cause + one correction, not a
paragraph of accounting.

### Slide 9 — Next quarter (L18 roadmap)

Three priorities, outcome-named: "{{next_q_priority_1}}",
"{{next_q_priority_2}}", "{{next_q_priority_3}}", each with a target:
"→ {{priority_1_target}}". Speaker beat: three priorities, not seven —
a plan with seven priorities is a to-do list.

### Slide 10 — The one decision (L20 closing-cta)

On-slide: "{{the_decision}} by {{decision_date}}" plus the contact
strip. Speaker beat: reports end with a decision, not a "thank you" —
name the one call you need from them, then stop.

## Building the charts

1. Pull the data on {{pull_date}} or later — never before; stale
   numbers in a report cost the credibility of every other number.
2. Build charts natively in your slide tool (PowerPoint / Keynote /
   Google Slides / Figma) from the five-line spec; the spec is the
   contract between the data and the slide.
3. Every chart gets its source line at 14pt bottom-left. No source, no
   slide — this rule is why the deck survives scrutiny.
`,

  /* ── 04 Speaker notes ──────────────────────────────────────────── */

  "04-speaker-notes/speaker-notes.md": `# Speaker notes — what to say on every layout

The layouts say what's on the slide; the notes say what to do while it's
up. Paste the relevant note into the notes pane of each slide, then edit
the {{merge_fields}}.

## The three-part note (the pattern for any slide)

1. **Beat:** what this slide means — one sentence you could say
   verbatim.
2. **Evidence:** the number or example behind the beat — the thing you
   say when someone challenges it.
3. **Bridge:** the one line that carries the room into the next slide.

If you cannot write all three for a slide, the slide isn't ready to be
presented — it might not need to exist.

## Timing (before you write a single note)

| Deck | Runtime | Budget |
| --- | --- | --- |
| 12-slide pitch | 15 min with questions | ~60s per slide; slides 3, 10 and 12 get 90s |
| 10-slide report | 25 min with discussion | ~120s per slide; misses slide gets 240s |
| Warm intro (deck halved) | 8 min | Slides 1, 3, 5, 10, 12 of the pitch only |

## What to say, layout by layout

- **L01 cover-title:** Beat: "This is about {{project_name}} for
  {{client_company}}." Don't introduce yourself for two minutes — your
  name is on the strip; the agenda is more valuable than your bio.
- **L02 cover-agenda:** Beat: the three things. Say them as verbs.
  Bridge: "Let's start with the one you already feel."
- **L03 section-divider:** Say nothing for two seconds. The divider is
  a palate reset — use the silence, don't fill it.
- **L04 statement-slide:** Read it once, verbatim, slowly. Then say the
  evidence line. Never paraphrase your own thesis slide — it dilutes
  the sentence you chose as the most important in the deck.
- **L05 big-number:** Say the number, then the comparison, then stop
  for three seconds. The pause is the delivery.
- **L06 comparison-two-column:** Concede the row the weaker option
  legitimately wins. The concession is what makes the winning rows
  land.
- **L07 before-after:** "Same framing, same scale" — say it out loud
  once, while pointing at both halves. Then the caption.
- **L08 timeline:** Point at the client-dependency nodes while naming
  them. A timeline you present as effortless reads as unowned.
- **L09 process-flow:** For each step, name the output the client sees
  — not the work you do. Evidence: the output list under the line.
- **L10 feature-grid-2x2:** Read cells as questions, answer as
  policies. Bridge: "That's the downside mapped. Here's the upside
  you're buying."
- **L11 feature-grid-3-col:** One sentence per card, max. The grid does
  the enumeration; you do the meaning.
- **L12 chart-single:** Title first ("The takeaway is in the title —
  the chart is the evidence"), then the annotation, then the trend.
  Never narrate the line point by point.
- **L13 chart-duo:** Say what the pair tells you together, then the
  best and worst item. Bridge to the fix or the ask.
- **L14 chart-plus-commentary:** Let them read the three bullets
  silently for five seconds, then add the one thing that's not written.
- **L15 table-data:** Never read the table aloud. Say the row that
  matters, then invite the room to the others.
- **L16 quote-slide:** Read the quote in the speaker's voice — flat,
  unhurried. Attribution second. Never editorialize a quote before
  reading it.
- **L17 team-grid:** "You'll work directly with {{senior_name}}" —
  the org-chart reassurance beats the credential list.
- **L18 roadmap:** Priorities by outcome, then targets. If asked "when
  exactly", answer from the appendix, not by inventing dates.
- **L19 options-table:** "All three hit the outcome; they differ in
  depth and speed." Then silence. Let them read — the table was built
  to be read, not narrated.
- **L20 closing-cta:** Say the ask, verbatim. Then stop talking. The
  ten-second silence after the ask is the single most important moment
  in the deck — the first voice after it should not be yours.

## Five delivery rules

1. **Never read the slide.** The only exceptions: statements (L04),
   quotes (L16) and big numbers (L05) — written to be read aloud once.
2. **Pause after numbers.** Three seconds after L05, ten after the ask.
3. **One conversation, one voice.** Agree who fields questions before
   the room joins; "let me check with {{colleague}}" twice reads as
   unrehearsed.
4. **The table read.** Rehearse aloud, seated, once. Every sentence
   that doesn't survive being spoken gets edited on the spot.
5. **Remote:** share the slides, not your face, while presenting; the
   layouts carry the room. Bring your face back for questions — trust
   transfers in the Q&A, not the deck.
`,

  /* ── 05 Setup ──────────────────────────────────────────────────── */

  "05-setup/setup-guide.md": `# Setup guide — Presentation Template Pack

The pack is tool-agnostic: the .md files are the source of truth, and
every layout, chart and note transfers to PowerPoint, Keynote, Google
Slides, Figma or Canva. This guide is the 45-minute path from download
to a presented deck.

## What's in the pack

- \`01-master-layouts/layout-index.csv\` — the 20 master layouts: id,
  purpose, grid and usage notes
- \`01-master-layouts/cover-sections.md\`, \`data-slides.md\`,
  \`story-slides.md\` — the layout spec docs (type scale, grids, copy
  patterns, chart rules)
- \`02-pitch-deck/pitch-deck-12-slides.md\` — a complete 12-slide client
  pitch, every slide written
- \`03-report-slides/quarterly-report-deck.md\` — a complete 10-slide
  quarterly report with chart specs
- \`04-speaker-notes/speaker-notes.md\` — the note pattern plus what to
  say on every layout

## The 45-minute setup

### 1. Pick the deck (5 min)

| You need to | Start from |
| --- | --- |
| Win a project (freelancer / agency pitch) | \`pitch-deck-12-slides.md\` |
| Report quarterly results to a client | \`quarterly-report-deck.md\` |
| Build something else | The spec docs + \`layout-index.csv\` |

### 2. Set up the master (10 min)

In your slide tool, create a master slide per layout you'll use (both
decks need 8–10 of the 20). Copy the grid description from
\`layout-index.csv\` into the master's layout name — "L05 big-number
(number 60% / comparison right)" — so the layouts stay findable a
quarter from now. Apply the type scale from \`cover-sections.md\` once,
at the master level.

### 3. Fill the deck (10 min)

Paste each slide's "On-slide copy" from the .md into its layout. The
{{merge_fields}} are the same vocabulary the Proposal Pack uses —
{{client_name}}, {{project_name}}, {{tier_b_price}} — so a pitch deck
and its proposal read as one document.

### 4. Rebuild the charts natively (10 min)

Never screenshot a chart. Recreate it in the slide tool from the
five-line chart spec (type / metric / source / annotation / takeaway
title) defined in \`data-slides.md\`. Native charts stay editable when
the numbers move — and the numbers always move before the meeting.

### 5. Write the speaker notes (5 min)

Paste the layout's note from \`speaker-notes.md\` into each slide's
notes pane; edit the {{merge_fields}}. Then do the table read, out
loud, seated, once — editing every sentence that doesn't survive being
spoken.

### 6. The pre-flight check (5 min)

- Every slide answers one beat (say it out loud per slide)
- Every data slide has a takeaway title and a source line
- Body text ≥ 18pt; captions ≥ 14pt
- One ask, on the last slide, with a date
- The slide after the ask is black — no "thank you" slide

## The four rules that make decks land

1. **One message per slide.** Two messages means neither survives the
   room's recall test a week later.
2. **Takeaway titles.** The title states the conclusion; the chart is
   evidence. Topic titles make the audience do the work.
3. **18pt floor.** If it doesn't fit at 18pt, it's an appendix, not a
   slide.
4. **Every chart carries its source.** No source, no slide. The source
   line is why your numbers survive the skeptic in the room.

## Troubleshooting

- **"My deck is too long"** — merge, never shrink: font size is not a
  length strategy. Two related slides become one L14; three background
  slides become one appendix.
- **"Charts look different in PowerPoint"** — build them natively from
  the spec rather than pasting; the spec format exists precisely so
  the chart survives the tool.
- **"Presenting in a bright room"** — use the light variant: same
  layouts, background flipped, brand accent unchanged.
- **"They want the deck beforehand"** — send the PDF export of a
  notes-free version, and say so: "I'll send the version with speaker
  notes after the meeting."

## Files reference

| Path | What it is |
| --- | --- |
| \`01-master-layouts/*.csv/.md\` | 20 layouts + the spec docs |
| \`02-pitch-deck/*.md/.docx\` | the 12-slide client pitch |
| \`03-report-slides/*.md/.docx\` | the quarterly report deck |
| \`04-speaker-notes/*.md\` | notes for every layout |
| \`05-setup/*\` | this guide + walkthrough link |
`,

  "05-setup/walkthrough-link.md": `# Walkthrough

An 11-minute video walkthrough of this pack — the 20 layouts paged
through one by one, the pitch deck assembled live from a blank file,
and the chart spec turned into a native chart:

**→ https://omniforge.example/walkthroughs/B-TP-3**

Contents:
- 00:00 — The 45-minute setup
- 01:00 — The 20 layouts in 90 seconds (the index, read)
- 02:30 — The type scale and why 18pt is the floor
- 03:45 — The pitch deck assembled, slide by slide
- 06:10 — Chart specs → native charts in PowerPoint and Google Slides
- 08:20 — Speaker notes: the three-part pattern and the pauses
- 10:00 — The table read + the pre-flight check

The video is hosted (not bundled) so the pack stays under 5 MB.
Questions: support@omniforge.example.
`,

  /* kit stub note for the extended pack */
  "EXTENDED-PACK/pptx-master-file.md": `# Native .pptx master — in production

Status: **in production** — not in this archive.

What the finished file will contain: a native .pptx master with the 20
layouts installed as slide masters in dark and light themes, the type
scale preloaded, the L19 options table and L15 table as editable
components, and the chart specs mapped to the tool's native chart
types.
`,
};

/* ── Try-it demo content — the same copy, playable in the studio ─── */

export const demo: DemoContent = {
  kind: "templates",
  intro:
    "Open the flagship slides from the pack. Fill a merge field, watch it propagate, copy the result — this is the same copy you download.",
  templates: [
    {
      id: "pitch-plan",
      folder: "02-pitch-deck",
      title: "Pitch deck — Slide 5: The plan in one sentence",
      subject: "Layout L04 · if they remember one slide, this one",
      mergeFields: [
        { key: "client_company", sample: "Meridian Goods" },
        { key: "the_plan", sample: "rebuild the checkout around one-page payment" },
        { key: "deadline", sample: "March 31" },
      ],
      body: `**Key message:** if they remember one slide, this one.

**On-slide copy:**

"We will {{the_plan}} by {{deadline}}."

**Visual direction:** one sentence, centered, 40–48pt, nothing else —
the same treatment as slide 4. The repetition is deliberate: claim,
then plan.

**Speaker beat:** slow down. This sentence is the deck's thesis. Read
it once, verbatim, then say the evidence line and bridge: "Here's how
it works, step by step."`,
    },
    {
      id: "report-kpi",
      folder: "03-report-slides",
      title: "Quarterly report — Slide 2: Executive summary",
      subject: "Three numbers defined {{quarter}} — here they are",
      mergeFields: [
        { key: "quarter", sample: "Q3" },
        { key: "primary_metric", sample: "checkout conversion" },
        { key: "primary_delta", sample: "+0.4pts" },
        { key: "secondary_metric", sample: "support tickets" },
      ],
      body: `**Key message:** three numbers defined {{quarter}} — good or bad, the
room hears them in the first 60 seconds.

**On-slide copy:**

| Metric | Result | Change |
| --- | --- | --- |
| {{primary_metric}} | {{primary_now}} | {{primary_delta}} vs last quarter |
| {{secondary_metric}} | {{secondary_now}} | {{secondary_delta}} |
| {{tertiary_metric}} | {{tertiary_now}} | {{tertiary_delta}} |

**Chart spec (slide 3, this metric's trend):**
1. Type + series: line, one series
2. Metric + unit: {{primary_metric}} ({{primary_unit}})
3. Source: {{data_source}}, pulled {{pull_date}}
4. Annotation: mark {{annotation_event}} on the week it happened
5. Takeaway title: "Takeaway: {{trend_takeaway}}"

**Speaker beat:** walk the annotation first ("this jump is the
{{annotation_event}} shipping"), then the trend.`,
    },
    {
      id: "layout-big-number",
      folder: "01-master-layouts",
      title: "Layout L05 — Big number",
      subject: "One metric, its comparison, and nothing else",
      mergeFields: [
        { key: "big_number", sample: "38%" },
        { key: "comparison_line", sample: "of carts abandoned at payment — down from 44% in May" },
        { key: "period", sample: "last 30 days" },
      ],
      body: `**Purpose:** make one metric land emotionally before anyone reads
anything.

**Grid:** number left (60% of the slide, 200pt+), context right.

**Copy pattern:**

- Number: {{big_number}} — the unit and period in small text
  ({{period}})
- Context: {{comparison_line}}

**Rules:** always give the comparison — a number without a comparison
is a number nobody can feel. One big number per deck section.

**Speaker note:** say the number, then the comparison, then stop for
three seconds. The pause is the delivery.`,
    },
  ],
};
