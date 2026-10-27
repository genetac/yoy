/* ════════════════════════════════════════════════════════════════════
   B-TP-2 · Proposal Template Pack
   3 proposal formats (fixed-scope / retainer / sprint), pricing tables
   (three-tier builder / value stack / objection handling), T&C inserts,
   a 66-row negotiation email bank, setup guide. Every file's key equals
   its bundle path. The Try-it demo (TemplateReader) reads the same copy.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-TP-2";

export const files: Record<string, string> = {
  /* ── 01 Service proposals ──────────────────────────────────────── */

  "01-service-proposals/proposal-fixed-scope.md": `# {{project_name}} — proposal for {{client_company}}

**Prepared for:** {{client_name}} · {{client_title}} at {{client_company}}
**Prepared by:** {{sender_name}} at {{sender_company}}
**Date:** {{sent_date}} · **Proposal no.:** {{proposal_number}} · **Valid until:** {{valid_until}}

> **Format:** fixed-scope · **Best for:** one defined outcome with a clear
> finish line · **Fill time:** about 25 minutes · **Length when sent:** 3–4 pages

---

## 1. The short version

{{client_company}} needs {{the_outcome}}. This proposal covers exactly
that — a fixed scope, a fixed price, and a fixed finish line — in
{{timeline_weeks}} weeks, for a total investment of {{tier_b_price}} for
the recommended option.

Everything below answers three questions: what gets delivered, when it
lands, and what it costs. If a question you have is not answered, that is
my mistake — reply and I will fix the proposal, not talk you into it.

## 2. What you told me

In our conversations you said, in your words:

- "{{their_quote_1}}"
- "{{their_quote_2}}"
- "{{their_quote_3}}"

I have built the scope around those three statements, not around a
package I wanted to sell. If I have misheard any of them, the time to say
so is before signature.

## 3. What "done" looks like

| Success measure | Today | After this project |
| --- | --- | --- |
| {{metric_1_name}} | {{metric_1_now}} | {{metric_1_target}} |
| {{metric_2_name}} | {{metric_2_now}} | {{metric_2_target}} |
| {{metric_3_name}} | {{metric_3_now}} | {{metric_3_target}} |

These are the numbers we will judge the work by at {{project_name}}'s
final review. Nothing on this table gets quietly dropped.

## 4. Scope of work

**Phase 1 — {{phase_1_name}} ({{phase_1_duration}})**

| Deliverable | What it is | Lands |
| --- | --- | --- |
| {{p1_deliverable_1}} | {{p1_deliverable_1_desc}} | {{p1_date_1}} |
| {{p1_deliverable_2}} | {{p1_deliverable_2_desc}} | {{p1_date_2}} |

**Phase 2 — {{phase_2_name}} ({{phase_2_duration}})**

| Deliverable | What it is | Lands |
| --- | --- | --- |
| {{p2_deliverable_1}} | {{p2_deliverable_1_desc}} | {{p2_date_1}} |
| {{p2_deliverable_2}} | {{p2_deliverable_2_desc}} | {{p2_date_2}} |

**Phase 3 — {{phase_3_name}} ({{phase_3_duration}})**

| Deliverable | What it is | Lands |
| --- | --- | --- |
| {{p3_deliverable_1}} | {{p3_deliverable_1_desc}} | {{p3_date_1}} |

**Included in every phase:** {{inclusion_1}}, {{inclusion_2}}, and a
written status update every {{update_day}}.

**Explicitly out of scope:** {{out_of_scope_1}}, {{out_of_scope_2}},
{{out_of_scope_3}}. Anything not listed as a deliverable is out of scope
by default — and can be added any time through a written change order
(see terms, section 7).

## 5. Timeline

| Milestone | Date | What you see |
| --- | --- | --- |
| Kickoff | {{kickoff_date}} | Working session; access; the plan on one page |
| {{milestone_1_name}} | {{milestone_1_date}} | {{milestone_1_visible}} |
| {{milestone_2_name}} | {{milestone_2_date}} | {{milestone_2_visible}} |
| Final review | {{final_review_date}} | Everything, plus the numbers from section 3 |

The timeline assumes {{client_dependency}} from your side within
{{response_window}} of each request. If a review round slips, the finish
line moves by the same number of days — the price does not.

## 6. Investment

| | **{{tier_a_name}}** | **{{tier_b_name}} — recommended** | **{{tier_c_name}}** |
| --- | --- | --- | --- |
| **Price (fixed)** | {{tier_a_price}} | {{tier_b_price}} | {{tier_c_price}} |
| **Duration** | {{tier_a_weeks}} weeks | {{tier_b_weeks}} weeks | {{tier_c_weeks}} weeks |
| **Deliverables** | {{tier_a_deliverables}} | {{tier_b_deliverables}} | {{tier_c_deliverables}} |
| **Revisions** | 1 round per deliverable | 2 rounds per deliverable | 2 rounds + {{tier_c_extra}} |
| **Support after delivery** | {{tier_a_support}} | {{tier_b_support}} | {{tier_c_support}} |
| **Best for** | {{tier_a_best_for}} | {{tier_b_best_for}} | {{tier_c_best_for}} |

All three options achieve the success measures in section 3. They differ
in depth and speed, not in whether the outcome happens — if an option
could not hit the table in section 3, it would not be on this page.

**Payment schedule:** {{deposit_percent}} deposit on signature;
{{milestone_payment_percent}} at {{milestone_1_name}}; balance on final
delivery. Invoices are due within {{payment_days}} days.

## 7. The terms, in plain words

1. **Scope is fixed.** New ideas are welcome and priced through a written
   change order — no surprise invoices, ever.
2. **Revisions:** the rounds in the table above. Extra rounds are billed
   at {{revision_rate}}.
3. **Ownership:** on final payment, everything in section 4 is yours —
   files, access, and full rights. Before that, it stays mine.
4. **Late payment:** work pauses after {{late_pause_days}} days overdue.
   The deadline moves; the price does not.
5. **Cancellation:** either side can stop in writing. You pay for work
   completed plus a {{kill_fee_percent}} kill fee on what is not started.
6. **Confidentiality:** everything you share stays between us.
7. **Full terms:** the signing page of this proposal incorporates the
   terms in \`03-terms/terms-insert.md\` by reference.

## 8. Acceptance

Signing below (a typed electronic signature counts) accepts this
proposal, the selected option, and the terms above.

**Selected option:** ☐ {{tier_a_name}} ☐ {{tier_b_name}} ☐ {{tier_c_name}}

**For {{client_company}}**

Signature: ______________________  Name: {{client_signer_name}}
Title: {{client_signer_title}}  Date: ______________

**For {{sender_company}}**

Signature: ______________________  Name: {{sender_name}}
Date: ______________

*Questions before signing? {{sender_email}} — answered within one
business day, no call required.*
`,

  "01-service-proposals/proposal-retainer.md": `# {{retainer_name}} — monthly retainer proposal for {{client_company}}

**Prepared for:** {{client_name}} · {{client_title}} at {{client_company}}
**Prepared by:** {{sender_name}} at {{sender_company}}
**Date:** {{sent_date}} · **Proposal no.:** {{proposal_number}} · **Valid until:** {{valid_until}}

> **Format:** retainer · **Best for:** ongoing work after a successful
> first project, or predictable monthly capacity · **Fill time:** about
> 25 minutes · **Length when sent:** 3 pages

---

## 1. The short version

{{client_company}} needs {{ongoing_outcome}} every month — not a one-off
project. This proposal sets up a monthly retainer: reserved capacity, a
fixed monthly price, and a reporting rhythm that shows what the hours
became. Three sizes are on the table; the middle one fits
{{client_company}} best.

## 2. Why a retainer (the honest version)

- **You get a reserved slot.** Work starts within {{response_time}} of
  your request — no re-proposal, no scheduling queue.
- **The price is lower than project rates.** {{retainer_discount_note}}
  In exchange you commit to the month; that certainty is worth something
  on both sides.
- **Priorities can move monthly.** The monthly scope flexes inside the
  capacity you reserve — this month {{example_focus_a}}, next month
  {{example_focus_b}}.
- **What it is NOT:** a subscription to forgotten hours. If you don't
  use the capacity, that is my job to flag — see the rollover policy.

## 3. What a month looks like

| Week | What happens |
| --- | --- |
| 1 | Planning note: this month's priorities, in writing |
| 2–3 | Delivery: the work, with {{update_cadence}} updates |
| 4 | Month report: hours by task, results against section 5, next month's plan |

## 4. Monthly options

| | **{{tier_a_name}}** | **{{tier_b_name}} — recommended** | **{{tier_c_name}}** |
| --- | --- | --- | --- |
| **Monthly price** | {{tier_a_monthly}} | {{tier_b_monthly}} | {{tier_c_monthly}} |
| **Reserved hours** | {{tier_a_hours}}/mo | {{tier_b_hours}}/mo | {{tier_c_hours}}/mo |
| **Response time** | {{tier_a_response}} | {{tier_b_response}} | {{tier_c_response}} |
| **Typical fit** | {{tier_a_fit}} | {{tier_b_fit}} | {{tier_c_fit}} |

**Rollover:** up to {{rollover_percent}} of unused hours roll into the
next month, then expire. Expired hours get reported, not hidden — you
will always know what you paid for and what happened to it.

**Out-of-scope work** (beyond the reserved hours) is quoted before it
starts, at {{overage_rate}} — never billed silently.

**Pausing:** {{pause_notice}} written notice pauses the retainer for up
to {{pause_max}} months. The price on resumption is the current rate
sheet, not this proposal's.

## 5. How we judge the retainer

Every month, the report answers three questions against the measures
below. If two consecutive months miss, we fix the plan or wind the
retainer down honestly.

| Measure | Baseline today | Target |
| --- | --- | --- |
| {{retainer_metric_1}} | {{rm1_now}} | {{rm1_target}} |
| {{retainer_metric_2}} | {{rm2_now}} | {{rm2_target}} |

## 6. Term and exit

- **Initial term:** {{initial_term_months}} months from the start date.
- **After that:** renews monthly. Either side can end it with
  {{exit_notice}} written notice — no penalty, no exit fee.
- **The retainer never owns your files.** Everything created during the
  term is yours under the IP terms in section 8, whether you stay or go.

## 7. First month, planned

If signed by {{signature_deadline}}, month one looks like this:

| Priority | Why first |
| --- | --- |
| {{month_one_priority_1}} | {{month_one_reason_1}} |
| {{month_one_priority_2}} | {{month_one_reason_2}} |

## 8. The terms, in plain words

1. **Billing:** monthly in advance, due within {{payment_days}} days.
   Work pauses after {{late_pause_days}} days overdue.
2. **Capacity:** the hours in section 4 are reserved for you. Work beyond
   them is pre-quoted, never surprise-billed.
3. **IP:** everything created under this retainer becomes yours on
   payment for the month it was created in.
4. **Confidentiality:** mutual — your information and mine stay put.
5. **Exit:** {{exit_notice}} notice, in writing, no penalty. The final
   month's report includes a handover pack: files, access, and a
   60-day what-does-what document.
6. **Full terms:** the signing page incorporates the terms in
   \`03-terms/terms-insert.md\` by reference.

## 9. Acceptance

Signing below (typed electronic signature counts) starts the retainer on
{{start_date}}.

**Selected size:** ☐ {{tier_a_name}} ☐ {{tier_b_name}} ☐ {{tier_c_name}}

**For {{client_company}}**

Signature: ______________________  Name: {{client_signer_name}}
Title: {{client_signer_title}}  Date: ______________

**For {{sender_company}}**

Signature: ______________________  Name: {{sender_name}}
Date: ______________

*Questions before signing? {{sender_email}} — answered within one
business day.*
`,

  "01-service-proposals/proposal-sprint.md": `# {{sprint_name}} — a {{sprint_weeks}}-week sprint for {{client_company}}

**Prepared for:** {{client_name}} · {{client_title}} at {{client_company}}
**Prepared by:** {{sender_name}} at {{sender_company}}
**Date:** {{sent_date}} · **Proposal no.:** {{proposal_number}} · **Valid until:** {{valid_until}}

> **Format:** sprint · **Best for:** stalled decisions, audits, pilots,
> and anything that shrinks if it waits · **Fill time:** about 20 minutes
> · **Length when sent:** 2–3 pages

---

## 1. The short version

A sprint is a fixed box: {{sprint_weeks}} weeks, one price of
{{sprint_price}}, one outcome — {{sprint_outcome}}. At the end you own
the deliverables whatever you decide next. No phase two is hiding inside
this proposal.

## 2. Why a sprint

- **The box is the product.** Fixed time forces the scope conversation
  up front: we decide together what fits in {{sprint_weeks}} weeks, and
  cut the rest consciously.
- **It is the cheapest way to evaluate me.** You see how I plan,
  communicate, and deliver — on real work, not a discovery call.
- **It ends.** On day {{sprint_days}} you receive everything and can
  walk away with it. Continuation is a separate conversation you get to
  have from a position of evidence.

## 3. The outcome, in one sentence

At the end of the sprint, {{client_company}} will have
{{sprint_outcome_sentence}} — judged by whether {{sprint_success_test}}.

## 4. The schedule

| Day | Focus | What you see |
| --- | --- | --- |
| 1 | Kickoff + prioritisation | The sprint plan on one page; what got cut and why |
| 2–{{mid_day}} | Build | A working session invite + {{mid_day_visible}} |
| {{mid_day}} | Midpoint review | {{midpoint_artifact}}; course-correct window |
| {{mid_day}}–{{final_day_minus_1}} | Build + revise | {{late_stage_visible}} |
| {{sprint_days}} | Handover | Deliverables + the numbers + what I would do next |

The two rules that keep sprints honest:

1. **Feedback window is {{feedback_window}}.** Reviews that sit for
   three days eat the calendar; the sprint dates hold only if feedback
   lands inside the window.
2. **One decision-maker.** You, {{client_name}}, or a named delegate.
   Committee sprints fail — this is a known failure mode, not a theory.

## 5. Deliverables

| Deliverable | Format |
| --- | --- |
| {{sprint_deliverable_1}} | {{sd1_format}} |
| {{sprint_deliverable_2}} | {{sd2_format}} |
| {{sprint_deliverable_3}} | {{sd3_format}} |
| Sprint report: what was built, what was cut, results | {{report_format}} |

## 6. Investment

| | **The sprint** | **Sprint + follow-through month** |
| --- | --- | --- |
| **Price** | {{sprint_price}} | {{sprint_plus_price}} |
| **What's in** | Section 5, delivered day {{sprint_days}} | The sprint + {{follow_through_scope}} for 30 days after |
| **Best for** | Deciding with evidence | When {{follow_through_condition}} is likely |

One payment structure for both: {{deposit_percent}} on signature,
balance on handover. Fixed price — the sprint costing more than planned
is my risk, not yours.

## 7. What happens after the sprint

Three honest paths, none of them a trap:

1. **Stop.** You own everything; the sprint report tells the next person
   (or the next quarter) exactly where things stand.
2. **Continue as a project.** The sprint report's "what I would do next"
   section converts into a fixed-scope proposal within
   {{conversion_days}} days, at a {{return_client_note}}.
3. **Continue as a retainer.** If the work turns out to be ongoing
   monthly matter rather than a project, the retainer format fits
   better — happy to propose that instead.

## 8. The terms, in plain words

1. **The price is fixed.** Nothing in this sprint gets re-quoted unless
   you ask for something outside section 5 — and that goes through a
   written change order.
2. **Your side of the box:** {{client_dependency_1}} and feedback inside
   the {{feedback_window}} window. If neither happens by day
   {{escalation_day}}, I will raise it once, in writing, before the
   dates move.
3. **IP:** deliverables become yours on final payment.
4. **Cancellation:** before day {{cancel_free_day}}, full refund minus
   hours worked; after that, hours worked plus {{kill_fee_percent}}.
5. **Full terms:** the signing page incorporates the terms in
   \`03-terms/terms-insert.md\` by reference.

## 9. Acceptance

**Selected option:** ☐ The sprint ☐ Sprint + follow-through

**For {{client_company}}**

Signature: ______________________  Name: {{client_signer_name}}
Title: {{client_signer_title}}  Date: ______________

**For {{sender_company}}**

Signature: ______________________  Name: {{sender_name}}
Date: ______________

*Questions before signing? {{sender_email}} — answered within one
business day.*
`,

  /* ── 02 Pricing tables ─────────────────────────────────────────── */

  "02-pricing-tables/three-tier-builder.md": `# The three-tier pricing builder

The system behind every investment table in this pack. Read once, then
build your table in 30 minutes.

## Why three tiers (and not one, or five)

- **One price is a yes/no question.** The client's only move is accept
  or negotiate — you have handed them the pen.
- **Three prices is a comparison question.** "Which of these fits?" The
  client compares your options to each other instead of comparing you to
  a cheaper competitor. That comparison happens inside your proposal,
  where the differences are honest and visible.
- **Five options is a research project.** Choice overload slows
  decisions; slow decisions go to procurement.

The top and bottom tiers are not decoration: the bottom tier makes the
middle look safe, the top tier makes the middle look sensible. Both must
still be options you would happily deliver.

## The build order (do not skip steps)

1. **Define the outcome all three tiers deliver.** Write one sentence:
   "Every option achieves {{outcome}}; they differ in depth and speed."
   If a tier cannot achieve the outcome, it is a Strawman — cut it.
2. **Build the middle tier first.** This is the work you actually want
   to do at a price you actually want to charge. It gets your best
   thinking.
3. **Carve the bottom tier from it.** Same quality, less depth: fewer
   deliverables, longer timeline, thinner support. Never worse craft.
4. **Extend the top tier from it.** More of what worked: faster
   timeline, extra deliverables, deeper support, priority access.
5. **Set the ladder.** A ratio that reads honestly: middle ≈ 1.8–2.2×
   the bottom, top ≈ 3–4× the bottom. Round to clean numbers.
6. **Name and mark.** Plain names (see below), and mark the middle tier
   **recommended** in the table itself.

## The tier definition grid

Fill every cell — empty cells are where negotiations start:

| Row | Bottom | Middle — recommended | Top |
| --- | --- | --- | --- |
| Name | {{tier_a_name}} | {{tier_b_name}} | {{tier_c_name}} |
| Price | {{tier_a_price}} | {{tier_b_price}} | {{tier_c_price}} |
| Duration | {{tier_a_weeks}} | {{tier_b_weeks}} | {{tier_c_weeks}} |
| Deliverables | {{tier_a_list}} | {{tier_b_list}} | {{tier_c_list}} |
| Revisions | 1 round | 2 rounds | 2 rounds + {{tier_c_extra}} |
| Support after delivery | {{tier_a_support}} | {{tier_b_support}} | {{tier_c_support}} |
| Best for | {{tier_a_best_for}} | {{tier_b_best_for}} | {{tier_c_best_for}} |

**Names:** functional beats clever. "Essential / Recommended /
Complete" outperforms invented names because the client can rank them
without you in the room.

## Which tier to mark recommended

The one that hits the client's stated outcome with the least waste. Two
rules:

1. **Never recommend the top tier by default.** It reads as upsell and
   contaminates the trust the table built.
2. **Never recommend a tier the client's own words don't support.**
   Their section-2 quotes tell you their priority: speed, depth, or
   price. The recommendation must match that priority — that is why the
   proposals in this pack quote the client before the pricing table.

## When NOT to use three tiers

- **Small engagements** where the table outweighs the work: quote one
  price, in a paragraph.
- **Repeat clients** who already know your quality: offer one option
  and one alternative, in prose.
- **Procurement-led buys** that will re-cut anything you present: give
  your itemised rate basis and let them build the tier.

## The three mistakes that break the table

1. **The strawman bottom.** A tier designed to lose. Clients spot it,
   and the trust cost lands on the middle tier you wanted to win.
2. **Six differences between tiers.** If every row differs, nobody can
   compare. Keep the differences to 3–4 visible rows.
3. **Padding with junk lines.** "Priority email support" that was free
   last year. Every differentiator must cost you something real or the
   tier is dishonest.
`,

  "02-pricing-tables/value-stack.md": `# The value stack — an honest one

A value stack is the block on page 2 of a proposal that shows everything
the engagement includes, in the client's terms. Built honestly, it does
the selling while you sleep. Built dishonestly, it reads like a
late-night infomercial — and modern buyers are fluent in spotting that.

## The four-line stack

| # | Line | Question it answers |
| --- | --- | --- |
| 1 | **The core outcome** | What changes for us? |
| 2 | **The speed component** | Why is this fast / why now? |
| 3 | **The risk-reversal component** | What happens if it goes wrong? |
| 4 | **The bonus** | What do we get that we didn't ask for? |

Every line must pass three tests:

- **True.** You can point at where it happens in the plan.
- **Theirs.** It names their world (their metric, their team, their
  deadline) — not your process.
- **Verifiable.** If they asked "prove it", you could, on the spot.

## The stack table (copy into the proposal)

| What you get | What it actually is | Why it matters to {{client_company}} |
| --- | --- | --- |
| {{stack_item_1}} | {{si1_description}} | {{si1_their_payoff}} |
| {{stack_item_2}} | {{si2_description}} | {{si2_their_payoff}} |
| {{stack_item_3}} | {{si3_description}} | {{si3_their_payoff}} |
| {{stack_item_4}} (bonus) | {{si4_description}} | {{si4_their_payoff}} |

## Pricing the stack — the honest way

Do **not** put invented dollar values on each line and sum them into a
"total value" that dwarfs the price. Two reasons:

1. **The math invites an audit.** The first client who asks "where does
   {{invented_value}} come from?" has found the seam, and the whole
   proposal unravels from there.
2. **The sum is not your call.** What a deliverable is worth depends on
   the client's numbers, not yours — you don't have the authority to
   price their outcome.

Instead, one of two honest formats:

**Format A — "What's included" (default).** The stack table above, no
dollar values, directly above the pricing table. The client does the
math themselves; self-drawn conclusions stick.

**Format B — "How this pays back" (when you have their numbers).** A
short block using inputs they gave you:

> Using your numbers from our call — {{their_metric}} at
> {{their_current_value}} — the plan in this proposal targets
> {{their_projected_shift}} over {{payback_window}}. The spreadsheet is
> attached so you can move every input yourself.

Their inputs, their model, their conclusion. Your signature at the
bottom of it.

## The bonus rule

The bonus must be real, cheap for you to deliver, and genuinely
unrequested. Good bonuses: {{good_bonus_examples}}. Bad bonuses:
{{bad_bonus_examples}} — anything you were going to do anyway, relabelled.

## Testing the stack before it ships

- **The read-aloud test.** Read each line out loud to a colleague. If
  you flinch, the line is decoration.
- **The procurement test.** Would this line survive being read aloud in
  a client's internal budget meeting? That is where proposals actually
  get judged.
- **The cut test.** If you removed the line, would the client notice?
  If not, it is padding — cut it now before they cut it for you.
`,

  "02-pricing-tables/objection-handling.md": `# Objection handling — the proposal pack version

Objections are information. Most of them mean something different from
what they say, and responding to the surface text loses deals that
responding to the real message would win. Each objection below has: what
they say, what it usually means, your move, and a line you can send
nearly verbatim (the full email versions live in
\`04-negotiation-emails/negotiation-bank.csv\`).

## The loop: Listen → Acknowledge → Explore → Respond

Never respond to an objection you have not explored. "It's too
expensive" answered with a discount trains the client that numbers are
theatre. "It's too expensive" answered with "compared to what?" usually
surfaces the real constraint in one reply.

## The ten that decide most proposals

**1. "It's more than we budgeted."**
Means: the number crossed a line they set before understanding the
scope. Move: find the real budget first, then trade scope against it.
Line: "{{their_budget}} doesn't cover the full scope — it does cover two
of the three options. Want me to re-cut the proposal at that number?"

**2. "We need to think about it."**
Means: an unvoiced objection — price, trust, timing, or an internal
stakeholder you haven't met. Move: make the unvoiced safe to say.
Line: "Completely fair. Usually when someone says that, it's one of
three things — price, timing, or something I failed to explain. Which
one is it here?"

**3. "We have a cheaper quote."**
Means: they are comparing, which is rational, or they want you to bid
against yourself, which is not. Move: never match blind — compare like
for like, out loud. Line: "Happy to look at it. The comparison that
usually matters is {{the_specific_gap}} — if they match us there, they
are a good deal and I will say so."

**4. "Can you do it for {{their_number}}?"**
Means: the value story landed but the price didn't, and they like you
enough to keep talking. Move: trade, never discount naked. Line: "I
can't move the price without moving something else. Fewer revisions or
a longer timeline — pick the trade and I'll re-cut it today."

**5. "The board needs to approve."**
Means: real process, real calendar, and possibly real dilution of your
pitch by people who weren't on the call. Move: arm your champion with a
one-pager, offer to attend. Line: "Here's the board version — cost,
timeline, expected outcome, one page. If it helps, I'll join for ten
minutes of questions."

**6. "Can you start before we sign?"**
Means: urgency is real — or the signature was never the priority. Move:
never. Warmly, but never. Line: "I start on signature — it protects
both of us on scope and IP. I can send the signature page first thing
and start the same day."

**7. "Why do you need a deposit?"**
Means: they have been burned, or accounting pushes back on prepayment.
Move: explain the risk logic, not the policy. Line: "The deposit puts
your dates in the calendar and my time on your project. Without it,
someone else's deposit does."

**8. "We'll do it in-house."**
Means: budget, pride, or a genuine capability. Move: respect it, stay
useful, stay in touch. Line: "Legitimate call — your team knows the
terrain. The plan in section 4 works regardless of who executes it;
steal it."

**9. "The scope seems small for the price."**
Means: the invisible work — judgement, experience, risk — didn't make
it onto the page. Move: make the invisible visible. Line: "Fair
question. The table shows the deliverables; the price also carries
{{invisible_work}}. Here's the breakdown of where the number goes."

**10. "We'd rather pay after delivery."**
Means: cash flow, or trust not yet earned. Move: risk-priced terms, not
a wall. Line: "For a new engagement it's deposit + milestone payments.
If the cash flow is the issue, I can split it into {{n}} monthly
payments — that's a terms question, not a discount."

## The hard lines (never cross)

1. **No unpaid pilots "to prove value."** A paid sprint exists for
   exactly this — see the sprint proposal format.
2. **No starting without signature.** Every exception you make becomes
   the story they tell about you.
3. **No unlimited revisions.** The moment revisions are infinite, the
   scope is too — price them at {{revision_rate}} and say so in the
   proposal.

## When to walk

- The client negotiates the deposit twice after agreeing to it.
- "Trust me" flows one direction only.
- Scope grows every call while price pressure grows every email.
- They name a competitor's quote and ask you to beat it blind.
- Your gut says yes to the revenue and no to the client.

Walking away from a bad fit is not losing a deal — it is protecting the
calendar that good clients need.
`,

  /* ── 03 Terms + conditions inserts ─────────────────────────────── */

  "03-terms/terms-insert.md": `# Terms & conditions insert — the proposal's legal spine

Drop-in numbered terms for any proposal in this pack (the proposals
reference this file's clauses by number). Written to be read: plain
words, defined terms, no Latin. For the full contract layer —
enforceable definitions, limitation of liability, indemnities — pair
with the OMNIFORGE Contract Template Pack; this insert summarises, it
does not replace.

## How to use

1. Copy the clauses you need into the proposal's terms section (or
   attach this file and reference it in the acceptance block).
2. Fill every {{merge_field}}; delete optional clauses that don't fit
   the engagement.
3. Keep the numbering — the acceptance block says "clauses 1–N" and
   renumbering breaks the reference.

## The clauses

**1. Scope.** {{sender_company}} ("Provider") will deliver the
deliverables listed in section {{scope_section}} of the proposal for
{{client_company}} ("Client"). Anything not listed there is outside this
engagement.

**2. Changes.** Either side may request changes. Provider will respond
within {{change_response_days}} days with the impact on price and
timeline. Changes take effect only when both sides confirm them in
writing (email counts).

**3. Revisions.** Each deliverable includes {{revision_rounds}} round(s)
of revisions requested within {{revision_window}} days of delivery.
Further rounds are billed at {{revision_rate}}.

**4. Payment schedule.** {{deposit_percent}} deposit on signature;
{{milestone_percent}} at {{milestone_name}}; the balance on final
delivery. Invoices are due within {{payment_days}} days of issue.

**5. Late payment.** Invoices unpaid after {{payment_days}} days accrue
interest at {{late_interest_rate}} per month. Provider may pause work on
engagements more than {{late_pause_days}} days overdue; paused days move
deadlines, not prices.

**6. Client responsibilities.** Client will provide
{{client_dependencies}} within {{response_window}} of request. Delays in
Client responsibilities move deadlines day-for-day.

**7. Intellectual property.** On receipt of final payment, Provider
assigns to Client all rights in the deliverables. Provider retains
rights to its pre-existing tools, templates and know-how, and may
reference the engagement in its portfolio unless Client asks in writing
not to.

**8. Confidentiality.** Each side will keep the other's non-public
information confidential for {{confidentiality_years}} years after this
engagement ends.

**9. Cancellation.** Client may cancel in writing at any time and pays
for work completed plus a {{kill_fee_percent}} fee on work not yet
started. Provider may cancel with {{provider_notice_days}} days written
notice, refunding any unearned fees.

**10. Warranty.** Provider warrants deliverables will materially match
the agreed specifications for {{warranty_days}} days after delivery and
will fix defects in that window at no charge. That is the entire
warranty — Provider is not responsible for outcomes outside its
control, including changes Client makes after handover.

**11. Liability.** Each side's total liability under this engagement is
capped at {{liability_cap_amount}}, the total fees paid. Neither side is
liable for indirect or consequential losses. (This clause is a summary —
the contractual version lives in the Master Services Agreement.)

**12. Independent contractor.** Provider is an independent contractor,
not an employee or partner of Client. Each side bears its own taxes,
insurance and costs.

**13. Governing law.** This engagement is governed by the laws of
{{jurisdiction}}; disputes go to the courts of {{jurisdiction_venue}}.

**14. Entire agreement.** This proposal, its referenced terms, and any
signed change orders are the whole agreement — earlier emails and calls
are conversations, not commitments.
`,

  "03-terms/payment-terms.md": `# Payment terms — the four structures and how to write them

Payment terms are pricing's execution layer: a good price with bad terms
is a cash-flow problem wearing a win's clothes. This file gives you the
four structures, when each fits, the deposit logic, and copy-paste
payment blocks for proposals.

## The four structures

| Structure | Shape | Best for | Watch out |
| --- | --- | --- | --- |
| Deposit + balance | {{deposit_percent}} now / rest on delivery | Projects under {{short_project_weeks}} weeks | Balance too big to be leverage at the end |
| Milestone | Payment per phase gate | Multi-phase projects | Milestones that client can't verify |
| Monthly billing | Fixed monthly in advance | Retainers | Letting unpaid months stack |
| Split payment | {{n}} equal payments over {{n}} months | Client cash-flow constraints | Interest-free framing — price the spread |

## The deposit: how big and why

- **{{deposit_low_band}}** — established clients, short engagements,
  low upfront cost.
- **{{deposit_mid_band}}** — the default for new clients: covers
  startup work and confirms commitment.
- **{{deposit_high_band}}** — projects under {{rush_weeks}} weeks,
  custom work with no resale value, or clients who paid late before.

A deposit is not distrust — it is calendar physics. Say it exactly like
that: "The deposit reserves {{start_date}} for you and puts your project
ahead of the next signed one."

## Writing the payment section (five rules)

1. **Exact amounts and exact triggers.** "50% deposit" is a start;
   "{{deposit_percent}} deposit on signature, due within
   {{payment_days}} days" is a term.
2. **State what each invoice buys.** Tie every payment to a visible
   thing the client receives — signature, phase gate, delivery.
3. **Accepted methods and currency.** {{accepted_methods}},
   {{currency}}; the client bears {{transfer_fee_owner}} on transfers.
4. **The late clause, stated once, calmly.** Not a threat — a schedule.
5. **No ambiguity about the first invoice.** It goes out
   {{first_invoice_timing}}; everything downstream keys off it.

## The late-payment ladder (polite, then firm, then structural)

1. **+{{reminder_days}} days:** reminder with the invoice re-attached.
   Assume the email was missed, not the payment.
2. **+{{firm_days}} days:** firm note naming the consequence — "work
   pauses on {{pause_date}} under clause 5; paused days move deadlines,
   not prices."
3. **+{{pause_days}} days:** pause work, in writing, without drama. The
   proposal already said this would happen; now it does.

Never skip a rung. The ladder only works because the client watched you
climb it slowly.

## Currency, tax and invoice hygiene

- Invoice in {{currency}} unless agreed otherwise; state the tax
  treatment line ({{tax_line}}) so accounting doesn't bounce it.
- Every invoice carries: sequential number, dated, both legal names,
  the PO reference if the client uses purchase orders.
- For international clients: agree who eats transfer fees
  ({{transfer_fee_owner}}) before the first invoice, not after.

## Copy-paste payment blocks

**Deposit + balance:**
> {{deposit_percent}} deposit on signature. Balance of {{balance_percent}}
> due within {{payment_days}} days of final delivery.

**Milestone:**
> {{deposit_percent}} deposit on signature; {{m1_percent}} on
> {{milestone_1}}; {{m2_percent}} on {{milestone_2}}; {{final_percent}}
> on final delivery. Each invoice fires on its milestone's completion
> note.

**Monthly:**
> {{monthly_amount}} monthly in advance, invoiced on the
> {{billing_day}} of each month, due within {{payment_days}} days. The
> first invoice accompanies signature.

**Split:**
> {{n}} monthly payments of {{split_amount}}, first on signature. Title
> to deliverables passes with the final payment.
`,

  /* ── 04 Negotiation email bank (66 rows) ────────────────────────── */

  "04-negotiation-emails/negotiation-bank.csv": `stage,email_purpose,when_to_send,subject,body_opening,body_ask,notes
follow-up,send-receipt,2 hours after sending,Proposal sent — {{project_name}} is live in your inbox,Hi {{first_name}} — sending {{project_name}} over now as promised on our call. Everything we discussed is inside including all three investment options.,Reply with questions as they come up — I answer within one business day.,No read-receipt tricks; the next email confirms receipt honestly
follow-up,confirm-receipt,Next morning 9-10am their local time,Quick confirm — did the proposal land?,Hi {{first_name}} — no reply needed if it arrived: attachments sometimes get eaten by filters and I would rather ask than assume silence.,Confirm it opened on your side and name your decision date.,Gives an easy yes; surfaces a spam-filter problem early
follow-up,early-questions,Day 2 after sending,Anything unclear in {{project_name}}?,Hi {{first_name}} — day two. Questions tend to surface in the first 48 hours when a proposal is unclear anywhere.,Send me anything confusing — I would rather over-explain than have you guess.,Invites questions before objections harden
follow-up,day-3-nudge,Day 3 after sending,Still worth it? A nudge on {{project_name}},Hi {{first_name}} — floating this back up. I know {{their_pressure}} weeks look like this on your side.,Tell me if the timeline still works or needs moving.,One nudge per thread; stay in-thread
follow-up,value-add,Day 5 after sending,No ask — the {{peer_project}} numbers,Hi {{first_name}} — no ask today. After our call I pulled the {{peer_project}} results and the pattern surprised even me.,Here is the one-page breakdown — use it with or without me.,Re-earns attention; never mentions the open proposal
follow-up,decision-window,Day 7 after sending,Decision window on {{project_name}}?,Hi {{first_name}} — the proposal holds {{price}} and the {{month}} delivery slot for {{n}} more days.,Confirm your decision date so I can hold or release the slot.,Only with a real deadline; never invent expiry dates
follow-up,second-nudge,Day 10 after sending,{{project_name}} — the 60-second version,Hi {{first_name}} — you are busy so here is the whole proposal in sixty seconds: three bullets and the numbers.,If only the numbers matter skip to page {{n}} — the table stands alone.,Respects their time; the summary often closes by itself
follow-up,last-call,Day 14 after sending,Closing the file on {{project_name}},Hi {{first_name}} — I will close the file on my side this week and assume timing is the blocker. No hard feelings either way.,If it comes back around reply to this email and it jumps my queue.,One per thread ever; the parting tone keeps the door open
price,budget-too-small,Reply same day,I hear you on budget — here is what fits,Hi {{first_name}} — completely fair. {{their_budget}} does not cover the full scope but it does cover two of the three options.,Would option A as a phase one starting {{date}} work?,Trade scope not price; a smaller yes beats a discounted maybe
price,competitor-cheaper,Reply same day,About the cheaper quote,Hi {{first_name}} — thanks for being direct; a cheaper quote deserves a direct answer. The difference is usually {{the_specific_gap}}.,Here is a like-for-like checklist to compare us line by line — if they match we should talk.,Never disparage the competitor; facts only
price,do-it-for-less,Reply same day,On the number — what I can move,Hi {{first_name}} — I cannot move the price without moving something else; that is how fixed quotes stay honest. Two honest options are inside.,Pick a trade — fewer revisions or a longer timeline — and I will re-cut the proposal today.,Shows the price is structural rather than negotiable theater
price,value-reframe,Reply within 24 hours,What the number actually buys,Hi {{first_name}} — one thing worth saying out loud: {{outcome_metric}} is worth roughly {{their_value_anchor}} per {{period}} to you based on your own numbers from the call.,Correct my math wherever it is off — I would genuinely like to know.,Use only their numbers; never invent value on their behalf
price,discount-scope-cut,Same day,Same outcome — smaller first step,Hi {{first_name}} — the fastest honest path to a lower number is a smaller first step: {{phase_one_scope}} at {{phase_one_price}} with the rest untouched for later.,Approve phase one and we start {{date}} with full continuity.,Downsell with dignity; phase two sells itself after phase one lands
price,discount-fast-pay,Same day,If the number works — a term that helps,Hi {{first_name}} — if you can pay {{n_percent}} on signature I can sharpen the total to {{adjusted_price}}. It is a cash-flow trade not a discount.,Confirm and I will send the updated page today.,Only offer this when your own cash position genuinely benefits
price,discount-refusal,Same day,Why the price is the price,Hi {{first_name}} — straight answer: the price reflects {{what_the_price_reflects}}. Cutting it means cutting one of those and you would feel it in {{where_they_would_feel_it}}.,If the outcome matters less than the number say so — there is a cheaper honest path and I will write it.,Honesty closes more deals than discount theater
price,volume-discount,Same day,On booking multiple {{units}},Hi {{first_name}} — multiple engagements do change the math: {{n_percent}} off from the second project onward because setup and learning amortize.,Tell me how many you are thinking and I will price the ladder.,Volume discounts must map to real cost savings — here they do
price,payment-plan,Same day,Spreading it over {{n}} months,Hi {{first_name}} — yes we can split it: {{n}} monthly payments of {{amount}} starting on signature. Slightly more in total — that is the cost of spreading it.,Confirm and the proposal will show the full schedule on page {{n}}.,Never frame a payment plan as a discount
price,rate-clarity,Same day,What is inside the number,Hi {{first_name}} — quick anatomy of the quote: {{x_percent}} senior delivery / {{y_percent}} revisions and QA / {{z_percent}} project management and reporting. No hidden lines.,Flag anything you would rather not pay for and I will show the trade.,Pre-empts the what-exactly-am-I-paying-for reply
price,hourly-vs-fixed,Same day,Fixed versus hourly — the honest trade,Hi {{first_name}} — hourly means you carry the risk of my estimate being wrong; fixed means I do. That is the whole difference.,If you would rather carry it for a possibly lower ceiling I will write the hourly version.,Fixed-price confidence is a product; treat it as one
price,roi-framing,Within 24 hours,The breakeven math,Hi {{first_name}} — here is the breakeven math using your numbers from the call: at {{their_metric}} the project pays for itself in {{payback_window}}.,Correct my inputs — the spreadsheet is attached so you can move them yourself.,Attach the actual spreadsheet; their inputs only
price,not-the-cheapest,Same day,No — I am not the cheapest,Hi {{first_name}} — correct. I am rarely the cheapest and never the most expensive; the premium is {{the_one_thing}}.,If that is not worth it to you the cheaper option is genuinely better for you — no hard feelings.,Disarming honesty often flips the whole negotiation
price,price-increase-notice,Before the next proposal goes out,My rates change on {{date}},Hi {{first_name}} — a heads-up before your proposal: from {{date}} my rate moves from {{old_rate}} to {{new_rate}} for new work. Anything signed before keeps the current rate.,If you are planning {{project}} this quarter signing before {{date}} locks today's number.,Honest notice builds trust and real urgency; never bluff this
scope,scope-creep,When a new ask appears mid-thread,Love this idea — here is how we add it,Hi {{first_name}} — {{new_idea}} is a genuinely good addition and it sits outside the signed scope. That is fine — here is the honest way to add it.,Approve change order {{n}} at {{amount}} and it joins the current sprint with no timeline slip.,Warm change orders keep both the client and the margin
scope,trim-to-budget,Same day,{{their_budget}} — here is what it honestly buys,Hi {{first_name}} — at {{their_budget}} the honest scope is {{included_list}}. What leaves: {{excluded_list}}. Nothing else changes.,Confirm the cut-down scope and I will send the revised page today.,An explicit out-scope list prevents the I-thought-it-was-included fight
scope,phase-two-parking,With the proposal or after scope pushback,Phase two — parked not forgotten,Hi {{first_name}} — {{extra_capability}} did not make the proposal because it is a phase-two idea: valuable only once {{phase_one_outcome}} is live.,Say the word and I will spec phase two alongside signature so it is ready when you are.,Creates a roadmap instead of a bloated phase one
scope,change-order-intro,At kickoff or on the first change request,How changes work — so they are never a fight,Hi {{first_name}} — a quick protocol for scope changes: you describe the outcome; I reply within 48 hours with the impact on price and date; you approve or park it.,Nothing changes without your written yes — that is the whole rule.,Set at kickoff; saves ten awkward emails later
scope,deliverable-count,Same day,On the number of {{concepts_or_revisions}},Hi {{first_name}} — the count is not arbitrary: {{n}} is where quality stops falling off a cliff in my experience and {{n_minus}} is how clients end up paying twice.,Keep the count and trim elsewhere — or take the risk knowingly and I will document it.,Education beats capitulation; document their choice either way
scope,rush-surcharge,Same day,On the {{date}} deadline,Hi {{first_name}} — {{date}} is doable. It means {{rush_cost}} so the rush version prices at {{rush_price}} rather than {{standard_price}}.,Pick the date or the number — both are honest options.,A rush fee is real cost not punishment; say so out loud
scope,source-files,Same day,Source files — what is included,Hi {{first_name}} — the proposal includes {{final_deliverables}} plus {{editable_formats}}. Raw working files are {{source_file_policy}} because they are how I maintain quality and reuse licensed assets.,Tell me what you need access to and I will make sure the right files transfer.,Set IP expectations before signature; see the Contract Template Pack for the full paper
scope,meetings-included,Same day,On calls and reporting,Hi {{first_name}} — included: a weekly {{n}}-minute sync / async video updates / one shared board. Anything beyond — workshops or daily standups — is billable at {{rate}}.,Confirm the rhythm and I will set the recurring invite today.,Bound the unbounded before it eats the margin
timeline,faster-request,Same day,Shipping by {{date}} — yes with one trade,Hi {{first_name}} — {{date}} is possible by {{the_trade}}. Here is exactly what that means for your team's review windows.,Approve the compressed schedule and I will lock the date in writing.,Speed is only real when the trade is explicit
timeline,slower-request,Same day,Moving the start to {{month}},Hi {{first_name}} — absolutely fine. Two things happen: the price holds until {{quote_expiry}} and the delivery calendar moves to the next slot which currently opens {{next_slot}}.,Confirm the new start and I will pencil the slot for {{n}} days.,Holding price with a date beats discounting to fill calendars
timeline,start-confirm,3-5 days before kickoff,Kickoff {{date}} — confirmed,Hi {{first_name}} — confirming the {{date}} kickoff: {{time}} on {{video_link}} with {{attendees}} and the agenda attached to the invite.,Reply with anything missing and I will add it before {{date}}.,Confirmation emails surface conflicts while they are still cheap
timeline,queue-honesty,Same day,When I can honestly start,Hi {{first_name}} — straight answer: my next open slot is {{date}}. I would rather tell you now than sandwich your project and deliver it badly.,If {{date}} works I will hold the slot against signature; if not I will say so and suggest an honest alternative.,Honest scarcity builds more trust than fake availability
timeline,deadline-urgency,Same day,Your {{event}} date is fixed — so is the plan,Hi {{first_name}} — since {{event_date}} cannot move the plan back-plans from it: signature by {{sign_date}} leaves {{n}} days of buffer on a {{m}}-day build.,Countersigned by {{sign_date}} keeps the buffer intact; after that it shrinks a day a day.,Real external deadlines only; never manufactured urgency
timeline,phased-delivery,Same day,Shipping value every {{n}} weeks,Hi {{first_name}} — instead of one big reveal the plan ships in phases: {{phase_one_outcome}} live by {{date_one}}; {{phase_two_outcome}} by {{date_two}}; {{phase_three_outcome}} by {{date_three}}.,Confirm and I will structure the payment schedule to match the phases.,Phasing de-risks big numbers and creates natural win moments
procurement,legal-review,When they say it is with legal,For your counsel — the five things to check,Hi {{first_name}} — happy to wait for legal. To save a cycle: the five clauses counsel usually flags are {{flagged_clauses}} and each has a plain-English rationale on page {{n}}.,Send counsel my direct contact — I answer redlines within 48 hours.,Make legal's job easy; they hold the pen more often than you think
procurement,their-msa,When they push their own paper,On using your MSA — mostly yes with two flags,Hi {{first_name}} — happy to sign your MSA with two exceptions most paper makes: {{ip_wording_flag}} and {{liability_flag}}. Everything else is fine as written.,Send it over with those two noted and I will return redlines the same week.,Have your redlines ready before you say this
procurement,authorized-signer,When signature stalls,Who countersigns {{project_name}}?,Hi {{first_name}} — before the calendar eats another week: who besides you needs to sign? If it is {{their_role}} I am glad to walk them through it directly.,Point me at the signer and I will take it from there.,Prevents the surprise approval layer at day twelve
procurement,board-approval,When they cite a committee,The board-packet version,Hi {{first_name}} — for the {{committee}}: here is the one-page summary with the three numbers they will ask about — cost / timeline / expected outcome.,Tell me when the committee meets and I will have answers prepped for that date.,Boards approve what fits on one page
procurement,new-stakeholder,When a new person appears,Welcome {{new_name}} — the five-minute catch-up,Hi {{first_name}} and {{new_name}} — {{new_name}} since you are joining at decision time here is the five-minute version: problem / plan / price / next step.,Anything you would like reopened — now is the moment; the proposal bends until it is signed.,New stakeholders restart deals; absorb them fast or lose them
procurement,three-quotes,When they must collect bids,On the three quotes you are collecting,Hi {{first_name}} — collecting three quotes is good practice. Ask all of us the same three questions: who does the work / what happens if it is late / what is not included.,Compare on answers not prices — I will win or lose honestly.,Handing over the rubric signals confident expertise
procurement,po-process,When they mention purchase orders,POs — happy to work with yours,Hi {{first_name}} — no problem running through your PO system. I will need: a PO number on every invoice / your billing address / your AP contact email / net-{{n}} terms after PO issue.,Send the PO template or the AP contact and I will match it.,Invoicing friction kills more starts than pricing ever does
procurement,vendor-forms,When onboarding paperwork arrives,Forms received — {{n}} business days,Hi {{first_name}} — tax forms / insurance certificates / banking details received and returned. Two forms ask for things that do not exist yet — {{pending_item}} waits until {{milestone}}.,Confirm your AP timeline so the first invoice lands on day one of work.,A boring email that saves a fortnight of payment limbo
silence,one-week-breaker,7 days after last contact,One week — still here?,Hi {{first_name}} — it has been a week so a quick pulse check: still alive on your side or parked for now?,One word back — alive / parked / dead — and I will act accordingly.,The one-word menu gets replies that essays never do
silence,two-week-breaker,14 days after last contact,{{project_name}} — assuming parked,Hi {{first_name}} — two weeks of quiet reads as parked and that is completely okay. I will stop nudging and leave the thread open.,Reply any time — even months from now — and this thread resurfaces instantly.,Dignified; assumes nothing about why they went quiet
silence,close-the-file,21+ days after last contact,Filed — with the door open,Hi {{first_name}} — filing {{project_name}} as timing-not-now. The proposal stays valid until {{expiry}} and after that I will simply re-quote with fresh numbers.,If it resurrects reply here first — this thread skips every queue.,The least needy close in existence; revive rates on these are real
silence,door-reopen,When they said not now,Your {{month}} note — is now now?,Hi {{first_name}} — in {{month}} you said {{their_reason}} and asked me to circle back in {{n}} months. That was {{n}} months ago.,Is the {{reason}} resolved? If yes the original plan still fits — updated numbers attached.,Their own words reopen doors better than any fresh pitch
silence,budget-cycle,When they mention the fiscal year,Fiscal {{year}} planning — adding {{project_name}},Hi {{first_name}} — since {{project_name}} needs {{year}} budget: here is the one-pager formatted for planning with cost / timeline / owner fields pre-filled.,Tell me your budget submission deadline and I will get you whatever the form needs.,Land in the budget cycle early or watch from outside it
silence,revive-after-no,2-3 months after a decline,What changed since we last spoke,Hi {{first_name}} — you passed in {{month}} which was fair. Since then {{what_changed}}.,Worth five minutes now? If still no this stays my last note on it.,Revive once; if nothing specific changed do not send at all
close,same-day-signature,Minutes after a verbal yes,Locking it in — the signature link,Hi {{first_name}} — wonderful. Here is the signature link: {{sign_link}}. It holds {{kickoff_date}} and the {{price}} we discussed.,Sign today and {{kickoff_date}} is locked with the team reserved.,Momentum peaks in the first 24 hours after a verbal yes
close,expiry-reminder,2 days before proposal expiry,{{project_name}} — the held slot expires {{expiry}},Hi {{first_name}} — the held pricing and the {{month}} delivery slot expire {{expiry}}. After that the calendar decides both.,Sign before {{expiry}} to keep both — or ask me to extend and I will if I can.,Only with a real expiry; extending once is honest and twice is theater
close,deposit-kickoff,Immediately after signature,Signature received — deposit and kickoff,Hi {{first_name}} — signed and countersigned; the copy is attached. Two steps left: the {{deposit_percent}} deposit invoice and the kickoff slot on {{kickoff_date}}.,Pay the deposit and pick a kickoff slot — both links are inside.,Fast paperwork sets the tone for the whole engagement
close,counter-accept,When their counter is acceptable,Your number works — done,Hi {{first_name}} — {{counter_price}} works. I would rather start {{start_date}} at a number we both like than win a negotiation.,Confirm and the updated signature page goes out tonight.,Accept counters fast and warmly; dignity beats victory laps
close,counter-middle,When their counter is too low,A middle path on {{project_name}},Hi {{first_name}} — you said {{their_number}} and I said {{my_number}}. Here is a real middle: {{mid_price}} with one small visible trade — {{the_trade}}.,Confirm the middle and the paperwork goes out tonight.,One middle path beats a haggle spiral; make the trade visible
close,counter-decline,When their counter does not work,I cannot get to {{their_number}} — honestly,Hi {{first_name}} — {{their_number}} does not cover the work and pretending otherwise would betray you at delivery time. Two honest paths are inside: smaller scope at your number or full scope at mine.,Pick either — both are proposals I can stand behind.,Walking away well is a sales asset; these clients come back
close,hesitant-yes,When they stall after saying yes,Since you said yes — the smallest next step,Hi {{first_name}} — you said yes on {{day}} and signatures stall; it happens. The smallest possible step: {{n}} minutes tomorrow to walk your team through the plan.,Pick a slot and I will handle everything else on my side.,Lower the activation energy; never re-sell a decision already made
close,downsell-sprint,When the full project stalls,Can I offer the {{n}}-week version?,Hi {{first_name}} — if the full {{project_name}} is stuck the sprint version exists precisely for this: {{sprint_scope}} in {{n}} weeks at {{sprint_price}} — outcome first and expansions later.,Start the sprint {{date}} and decide the rest from evidence.,Sprints convert stalled deals; see the sprint proposal format
post,accepted-next-steps,Same day as signature,Thank you — here is exactly what happens next,Hi {{first_name}} — thank you. Next: the deposit invoice today; kickoff confirmed for {{kickoff_date}}; the first deliverable lands {{first_deliverable_date}}. You will hear from me every {{update_day}}.,Reply with anything urgent — otherwise the next thing you see is the invoice.,Certainty after signature prevents buyer's remorse
post,declined-ask-why,1-2 days after a decline,One question — so the next one is better,Hi {{first_name}} — thank you for telling me straight; that is rarer than you think. One question: was it price / scope / timing or trust?,One word is enough — it genuinely shapes what I build next.,Losses are data and most people answer this honestly
post,declined-door-open,1-2 days after a decline,No problem — here is what stays yours,Hi {{first_name}} — completely understood. The {{artifacts_sent}} stay yours regardless; use them with whoever you choose.,If anything changes the thread stays open — no expiry on that.,Generosity at the exit gets remembered at the next buying cycle
post,lost-to-inhouse,When they build it themselves,Respect — one thing for the build,Hi {{first_name}} — building in-house is a legitimate call and your team knows the terrain. One gift: the {{plan_artifact}} from the proposal maps the road — steal it.,If you hit {{predictable_wall}} in {{n}} months my number has not changed.,The wall usually arrives on schedule; this email ages well
post,lost-to-competitor,When they choose someone else,Good luck — checking back in {{n}} days,Hi {{first_name}} — congratulations on deciding; commitment beats analysis at some point. I will check back in {{n}} days — not to poach but to see how it is landing.,If it is flying I will celebrate that honestly.,Ninety-day check-ins convert at a surprising rate; zero pressure is why
post,archive-notice,After 30+ days of silence,Archiving {{project_name}} — nothing owed,Hi {{first_name}} — archiving our thread as housekeeping. You owe me nothing — not a reply nor an apology nor a sorry-I-went-quiet.,If it ever revives reply to this email; it skips every queue.,The you-owe-me-nothing line gets replies years later
post,referral-ask,1-2 weeks after acceptance,One favor while it is fresh,Hi {{first_name}} — while the project is fresh: is there one person in your network with the same {{problem}}? A warm introduction only — no deck and no call until they ask.,Forward the one-pager or connect us — either is perfect.,Ask at peak freshness; ask for exactly one person
upsell,retainer-conversion,Near the end of a fixed project,{{project_name}} ends {{date}} — then what?,Hi {{first_name}} — {{project_name}} wraps on {{date}} and it will be genuinely finished rather than artificially cliff-hung. What tends to come next: {{next_work_type}}.,Want the {{n}}-month retainer page? It is a natural continuation — not a dependency trap.,Sell retainers from delivered value; see the retainer proposal format
`,

  /* ── 05 Setup ──────────────────────────────────────────────────── */

  "05-setup/setup-guide.md": `# Setup guide — Proposal Template Pack

Everything here is fill-in-and-send. This guide is the 45-minute path
from download to a proposal a client can sign today.

## What's in the pack

- 3 proposal formats in \`01-service-proposals/\`: fixed-scope (one
  defined outcome), retainer (monthly capacity), sprint (a fixed
  {{n}}-week box) — each a complete document with scope, timeline,
  three-tier pricing, terms and e-signature blocks
- 3 pricing systems in \`02-pricing-tables/\`: the three-tier builder,
  the honest value stack, objection handling for the ten objections that
  decide most proposals
- 2 terms files in \`03-terms/\`: the numbered T&C insert every proposal
  references, and the payment-terms playbook
- \`04-negotiation-emails/negotiation-bank.csv\` — 66 follow-up and
  negotiation emails tagged by stage (follow-up / price / scope /
  timeline / procurement / silence / close / post / upsell)

## The 45-minute setup

### 1. Pick the format (5 min)

| Their situation | Send this |
| --- | --- |
| One defined outcome, clear finish line | \`proposal-fixed-scope.md\` |
| Ongoing monthly work, or a successful first project ending | \`proposal-retainer.md\` |
| Stalled decision, audit, pilot, anything that shrinks if it waits | \`proposal-sprint.md\` |

### 2. Voice replacements, once (10 min)

Find-and-replace across all files:

| Placeholder | Replace with |
| --- | --- |
| \`{{sender_name}}\` | your first name |
| \`{{sender_company}}\` | your brand or legal name |
| \`{{sender_email}}\` | your reply-to address |

Then the per-proposal fields (\`{{client_name}}\`,
\`{{project_name}}\`, prices, dates) get filled per deal — every field
in a template is a decision you'd make anyway.

### 3. Build the pricing table before writing (15 min)

Work through \`02-pricing-tables/three-tier-builder.md\` once — the
build order, the ladder ratios, the recommended-tier rules. The output
fills the investment table of whichever proposal you picked. If the
client gave you numbers on the call, run the value stack's Format B
("how this pays back") with their inputs.

### 4. Assemble the terms (5 min)

Fill \`03-terms/terms-insert.md\` once — deposits, revision rounds,
kill fee, jurisdiction — and every proposal in the pack references the
same clauses. \`03-terms/payment-terms.md\` helps you pick the payment
structure; the copy-paste blocks at its end drop straight into section 6.

### 5. Send it right (10 min)

1. Export to PDF (or use the .docx) — never send a link that can be
   edited; send a document that can be signed.
2. Set a real expiry date (\`{{valid_until}}\`) and honour it.
3. Send it as a reply in the existing thread, not a cold attachment.
4. Open \`negotiation-bank.csv\` and schedule the cadence: send-receipt
   (same day) → confirm-receipt (next morning) → early-questions (day
   2) → day-3 nudge → day-5 value-add → decision-window (day 7) →
   60-second version (day 10) → last-call (day 14).

## Rules that make these proposals close

1. **The price is on the table, not in a follow-up.** Hidden prices
   read as negotiable prices.
2. **One tier marked recommended.** You are the expert; say which option
   fits their words.
3. **The expiry is real.** A date you extend twice is a date nobody
   believes.
4. **Quote the client in section 2.** Their own words, before your
   prices — every format opens with them for that reason.
5. **Reply to every response within one business day.** The proposals
   create momentum; slow replies spend it.

## Troubleshooting

- **"They only asked for the price"** — send the 60-second version
  (bank row: second-nudge) with the investment table and the expiry
  date. Nothing else.
- **"Procurement wants their own MSA"** — use the their-msa row; have
  your two flags ready (IP wording, liability cap). The full contract
  layer is the Contract Template Pack's job.
- **"They want hourly instead of fixed"** — the hourly-vs-fixed row
  answers it honestly; if they still want hourly, write it, and keep
  the estimate's risk language explicit.

## Files reference

| Path | What it is |
| --- | --- |
| \`01-service-proposals/*.md/.docx\` | 3 complete proposal formats |
| \`02-pricing-tables/*.md\` | tier builder / value stack / objections |
| \`03-terms/*.md\` | T&C insert + payment terms playbook |
| \`04-negotiation-emails/*.csv\` | 66-row negotiation email bank |
| \`05-setup/*\` | this guide + walkthrough link |
`,

  "05-setup/walkthrough-link.md": `# Walkthrough

A 9-minute video walkthrough of this pack — all three proposal formats
annotated, the pricing builder live-built from a blank page, and the
negotiation bank read like a playbook:

**→ https://omniforge.example/walkthroughs/B-TP-2**

Contents:
- 00:00 — The 45-minute setup
- 01:10 — Picking the format: fixed-scope vs retainer vs sprint
- 02:30 — The fixed-scope proposal, annotated section by section
- 04:15 — Building a three-tier table from scratch (the builder, live)
- 06:00 — Terms inserts: fill once, reference forever
- 07:20 — The negotiation bank: the cadence and the hard lines
- 08:30 — Sending, expiry dates and the follow-up rhythm

The video is hosted (not bundled) so the pack stays under 5 MB.
Questions: support@omniforge.example.
`,

  /* kit stub note for the extended pack */
  "EXTENDED-PACK/figma-proposal-layouts.md": `# Figma proposal layouts — in production

Status: **in production** — not in this archive.

What the finished file will contain: Figma layouts for the three
proposal formats — fixed-scope, retainer and sprint — print-ready at A4
and US Letter, wired to brand tokens (logo, colors and type swap in one
place) with the three-tier pricing table as a reusable auto-layout
component.
`,
};

/* ── Try-it demo content — the same copy, playable in the studio ─── */

export const demo: DemoContent = {
  kind: "templates",
  intro:
    "Open the flagship documents from the pack. Fill a merge field, watch it propagate, copy the result — this is the same copy you download.",
  templates: [
    {
      id: "fixed-scope",
      folder: "01-service-proposals",
      title: "Fixed-scope proposal — {{project_name}}",
      subject: "Proposal no. {{proposal_number}} · valid until {{valid_until}}",
      mergeFields: [
        { key: "client_company", sample: "Meridian Goods" },
        { key: "project_name", sample: "Checkout Rebuild" },
        { key: "tier_b_price", sample: "$8,400" },
        { key: "timeline_weeks", sample: "6" },
      ],
      body: `{{client_company}} needs {{the_outcome}}. This proposal covers exactly
that — a fixed scope, a fixed price, and a fixed finish line — in
{{timeline_weeks}} weeks, for a total investment of {{tier_b_price}} for
the recommended option.

## What "done" looks like

| Success measure | Today | After this project |
| --- | --- | --- |
| {{metric_1_name}} | {{metric_1_now}} | {{metric_1_target}} |
| {{metric_2_name}} | {{metric_2_now}} | {{metric_2_target}} |

These are the numbers we will judge the work by at the final review.
Nothing on this table gets quietly dropped.

## Investment

| | Essential | Recommended | Complete |
| --- | --- | --- | --- |
| **Price (fixed)** | {{tier_a_price}} | {{tier_b_price}} | {{tier_c_price}} |
| **Revisions** | 1 round | 2 rounds | 2 rounds + post-launch month |

All three options achieve the success measures above. They differ in
depth and speed, not in whether the outcome happens.

**Payment schedule:** {{deposit_percent}} deposit on signature; balance
on final delivery.

## Acceptance

Selected option: ☐ Essential ☐ Recommended ☐ Complete

Signing below (a typed electronic signature counts) accepts this
proposal, the selected option, and the terms above.

**For {{client_company}}** — Signature: ____________ Name:
{{client_signer_name}} Date: ______

**For {{sender_company}}** — Signature: ____________ Name:
{{sender_name}} Date: ______`,
    },
    {
      id: "retainer",
      folder: "01-service-proposals",
      title: "Retainer proposal — {{retainer_name}}",
      subject: "Monthly capacity, reserved for {{client_company}}",
      mergeFields: [
        { key: "client_company", sample: "Lumen Studio" },
        { key: "tier_b_hours", sample: "20 hours / month" },
        { key: "tier_b_monthly", sample: "$2,900 / month" },
        { key: "exit_notice", sample: "30 days" },
      ],
      body: `{{client_company}} needs {{ongoing_outcome}} every month — not a
one-off project. This proposal sets up a monthly retainer: reserved
capacity, a fixed monthly price, and a reporting rhythm that shows what
the hours became.

## Why a retainer (the honest version)

- **You get a reserved slot.** Work starts within {{response_time}} of
  your request — no re-proposal, no scheduling queue.
- **The price is lower than project rates.** In exchange you commit to
  the month; that certainty is worth something on both sides.
- **What it is NOT:** a subscription to forgotten hours. If you don't
  use the capacity, that is my job to flag — see the rollover policy.

## Monthly options

| | Baseline | Standard — recommended | Partner |
| --- | --- | --- | --- |
| **Monthly price** | {{tier_a_monthly}} | {{tier_b_monthly}} | {{tier_c_monthly}} |
| **Reserved hours** | {{tier_a_hours}} | {{tier_b_hours}} | {{tier_c_hours}} |

**Rollover:** up to {{rollover_percent}} of unused hours roll into the
next month, then expire. Expired hours get reported, not hidden.

**Exit:** {{exit_notice}} written notice, no penalty. The final month's
report includes a handover pack: files, access, and a 60-day
what-does-what document.`,
    },
    {
      id: "three-tier",
      folder: "02-pricing-tables",
      title: "Three-tier pricing builder — the investment table",
      subject: "One sentence every tier must survive: 'every option achieves the outcome'",
      mergeFields: [
        { key: "outcome", sample: "a checkout that converts" },
        { key: "tier_b_price", sample: "$8,400" },
        { key: "tier_a_price", sample: "$4,200" },
        { key: "tier_c_price", sample: "$14,900" },
      ],
      body: `**Rule one:** every tier delivers {{outcome}}. If a tier cannot
achieve the outcome, it is a strawman — cut it.

**Rule two:** build the middle tier first. This is the work you actually
want to do at a price you actually want to charge. Carve the bottom from
it (same quality, less depth) and extend the top from it (more of what
worked).

**Rule three:** the ladder reads honestly at 1.8–2.2× from bottom to
middle and 3–4× from bottom to top.

| Row | Bottom | Middle — recommended | Top |
| --- | --- | --- | --- |
| Name | Essential | Recommended | Complete |
| Price | {{tier_a_price}} | {{tier_b_price}} | {{tier_c_price}} |
| Revisions | 1 round | 2 rounds | 2 rounds + support month |
| Best for | proving it works | the stated outcome | speed and depth |

**Never recommend the top tier by default** — it reads as upsell and
contaminates the trust the table built. Recommend the tier the client's
own words support: their section-2 quotes tell you their priority —
speed, depth, or price.`,
    },
  ],
};
