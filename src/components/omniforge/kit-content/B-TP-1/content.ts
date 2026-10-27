/* ════════════════════════════════════════════════════════════════════
   B-TP-1 · Email Template Pack — REFERENCE KIT
   11 fully-written emails, a 120-row subject-line bank, merge-field
   map, setup guide. Every file's key equals its bundle path.
   The Try-it demo (TemplateReader) reads the same copy.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-TP-1";

export const files: Record<string, string> = {
  /* ── 01 Welcome series ─────────────────────────────────────────── */

  "01-welcome-series/day-0-welcome.md": `# Day 0 — Welcome + quick win

**Send:** immediately after signup · **From:** {{sender_name}} at {{company_name}}
**Subject:** Welcome — here's the thing I promised you
**Preview text:** Plus the 5-minute setup that makes the rest work.

---

{{first_name}},

Thanks for joining {{list_name}} — I'm glad you're here.

I know why you signed up: {{signup_reason}}. So before anything else,
here's the quick win I promised — the same one I give my own clients
on day one:

1. Open {{product_name}} and go straight to {{quick_win_screen}}.
2. Change **one** setting: {{quick_win_setting}}.
3. Watch what happens to {{quick_win_metric}} the next time you
   {{trigger_action}}.

That's it. Five minutes, one meaningful result. Everything else I send
you builds on that single change.

**What to expect from me:** one email every few days. Short, specific,
always with something you can use the same day. No "newsletter
updates", no filler — if I don't have something worth your attention,
I don't send.

Reply and tell me how the quick win worked out — I read every reply.

— {{sender_name}}
{{company_name}}

*You're receiving this because you asked to join {{list_name}}.
Unsubscribe any time: {{unsubscribe_link}}*`,

  "01-welcome-series/day-2-value.md": `# Day 2 — The mistake almost everyone makes

**Send:** 2 days after Day 0 · **From:** {{sender_name}} at {{company_name}}
**Subject:** The mistake I made for 3 years
**Preview text:** So you can skip straight past it.

---

{{first_name}},

Quick question: after you did the quick win, did you also
{{common_reflex_action}}?

Almost everyone does. It feels productive. It's actually the single
biggest time-sink in {{category_name}} — and I did it for three years
before someone showed me the numbers.

Here's what the numbers say:

- {{reflex_stat_1}}
- {{reflex_stat_2}}
- {{reflex_stat_3}}

The fix is counter-intuitive: {{counter_intuitive_fix}}. It takes the
same effort as the reflex, but compounds instead of resetting.

**Your action today:** apply {{counter_intuitive_fix}} to
{{current_project}}. It takes about 15 minutes.

Tomorrow I'll show you the full system — and where people usually get
it wrong.

— {{sender_name}}

*{{company_name}} · {{unsubscribe_link}}*`,

  "01-welcome-series/day-4-story.md": `# Day 4 — The story that changed how I work

**Send:** 4 days after Day 0 · **From:** {{sender_name}} at {{company_name}}
**Subject:** {{customer_name}} was ready to quit
**Preview text:** What happened next is the reason this email exists.

---

{{first_name}},

{{customer_name}} almost became a statistic.

Six months into {{category_name}}, {{customer_pronoun}} had nothing to
show for it: {{failure_snapshot}}. The spreadsheet was fine. The tools
were fine. The effort was there. The *results* weren't.

What {{customer_pronoun}} changed isn't what you'd expect. It wasn't a
new tool or more hours — it was {{pivotal_change}}.

Ninety days later: {{turnaround_result}}.

I tell this story because the pattern repeats everywhere I look:

1. Effort without a **feedback loop** always plateaus
2. Plateaus feel like personal failure — they're system failure
3. Fixing the system takes a afternoon; the *story* that you can't,
   takes years to unlearn

The full walkthrough of {{pivotal_change}} — including the exact
{{artifact_name}} {{customer_pronoun}} used — is here: {{link}}.

— {{sender_name}}

*{{company_name}} · {{unsubscribe_link}}*`,

  "01-welcome-series/day-6-offer.md": `# Day 6 — The soft pitch

**Send:** 6 days after Day 0 · **From:** {{sender_name}} at {{company_name}}
**Subject:** The system behind everything I've sent you
**Preview text:** Plus who it's wrong for — that part matters.

---

{{first_name}},

Over the last week you've used the quick win, sidestepped the
beginner trap, and seen what changes when the feedback loop exists.

All of it comes from one system: {{product_name}}.

**What it is:** {{product_one_liner}}

**What's inside:**
- {{component_1}} — {{component_1_promise}}
- {{component_2}} — {{component_2_promise}}
- {{component_3}} — {{component_3_promise}}
- Plus {{bonus_name}} ({{bonus_worth}} value)

**Who it's for:** {{ideal_customer}}.
**Who it's wrong for:** {{wrong_customer}} — if that's you, skip it and
keep using the free emails; that's what they're for.

**Launch terms** (this week only): {{price}} instead of
{{compare_at_price}}, 30-day money-back guarantee.
**→ {{buy_link}}**

Either way — thanks for a good week. Reply with questions; a human
(that's me) answers.

— {{sender_name}}

*{{company_name}} · {{unsubscribe_link}}*`,

  /* ── 02 Cold outreach ──────────────────────────────────────────── */

  "02-cold-outreach/opener-problem.md": `# Opener A — Problem-led

**Use when:** you can see a specific, public problem the prospect has.
**Subject:** {{their_problem_in_three_words}}
**Length:** under 120 words.

---

Hi {{first_name}},

Noticed {{observable_problem}} on {{observable_location}} —
specifically {{specific_detail}}.

Companies in {{their_industry}} usually lose {{loss_metric}} to that
exact issue. The fix is usually {{short_fix}}, which takes
{{fix_time}}.

We do this for {{peer_company_1}} and {{peer_company_2}}. Happy to send
the 1-page breakdown of how {{peer_company_1}}'s numbers moved — no
call needed.

Worth a look?

— {{sender_name}}

---

**Why it works:** leads with *their* world, not yours; offers proof
before asking for time; the ask is a yes/no, not a calendar link.`,

  "02-cold-outreach/opener-referral.md": `# Opener B — Referral-led

**Use when:** a named person connected you (mutual acquaintance,
investor, customer overlap).
**Subject:** {{mutual_name}} said to email you
**Length:** under 110 words.

---

Hi {{first_name}},

{{mutual_name}} suggested I reach out — {{mutual_reason}}
({{mutual_quote}} if you want the exact words).

Short version: we help {{their_role}}s at {{their_company_type}} with
{{core_outcome}}. {{mutual_name}} thought your
{{relevant_initiative}} makes you the right kind of fit.

If useful, I can share {{proof_artifact}} — it shows
{{proof_specific}} for a team like yours. No call required.

Want me to send it?

— {{sender_name}}

---

**Why it works:** the mutual name is the subject line; permission is
implied by the referral; again — zero asks for meetings.`,

  "02-cold-outreach/opener-trigger.md": `# Opener C — Trigger-led

**Use when:** a verifiable event just happened (funding, hire, launch,
expansion, incident).
**Subject:** About {{trigger_event}}
**Length:** under 100 words.

---

Hi {{first_name}},

Saw {{trigger_event}} — congratulations, {{relevant_congrats}}.

Teams right after {{trigger_event}} usually hit
{{post_trigger_problem}} within {{time_window}}. When that lands,
{{consequence}}.

We built {{short_solution}} exactly for that window:
{{proof_company}} saw {{proof_result}} in {{proof_timeframe}}.

One-page breakdown, no call: {{yes_or_no}}?

— {{sender_name}}

---

**Why it works:** timing does the convincing; the congratulations is
specific (not "congrats on the news!"); the pattern-interrupt is the
"no call" close.`,

  "02-cold-outreach/merge-field-map.csv": `merge_field,where_it_appears,example_value,if_missing
first_name,every opener,Maya,drop the email entirely
sender_name,signature + body,Jonas,use company name
company_name,signature,Forge Labs,omit line
their_problem_in_three_words,subject line (opener A),Cart leaks,rewrite subject
observable_problem,body (opener A),checkout errors,body without it fails — research first
observable_location,body (opener A),pricing page,required
specific_detail,body (opener A),404 on /pricing,required
their_industry,body (opener A),DTC retail,required
loss_metric,body (opener A),8% of revenue,use category default
short_fix,body (opener A),CDN cache rule,required
fix_time,body (opener A),under an hour,required
peer_company_1,body (opener A),Hearth Co,required
peer_company_2,body (opener A),Lumen Goods,required
mutual_name,subject + body (opener B),Priya,required — never fake
mutual_reason,body (opener B),shared board seat,required
mutual_quote,body (opener B),"""they run the tightest ops in the category""",optional
their_role,body (opener B),Head of Ops,required
their_company_type,body (opener B),Series B startups,required
core_outcome,body (opener B),cut infra spend 30%,required
relevant_initiative,body (opener B),the EU expansion,required
proof_artifact,body (opener B),the Lumen teardown,required
proof_specific,body (opener B),savings per order,required
trigger_event,subject + body (opener C),the Series A,required
relevant_congrats,body (opener C),on the clean cap table,be specific or cut
post_trigger_problem,body (opener C),onboarding debt,required
time_window,body (opener C),90 days,use 90 days
consequence,body (opener C),CSAT drops a full point,required
short_solution,body (opener C),the 2-week onboarding kit,required
proof_company,body (opener C),Verano,required
proof_result,body (opener C),+0.8 CSAT,required
proof_timeframe,body (opener C),6 weeks,required
yes_or_no,close (opener C),Want it,keep it lowercase`,

  /* ── 03 Follow-up ──────────────────────────────────────────────── */

  "03-follow-up/day-3-nudge.md": `# Day 3 — The gentle nudge

**Use on:** proposals, replies-gone-cold, post-demo silence.
**Subject:** Re: {{original_subject}}
**Length:** under 60 words. Reply in-thread.

---

{{first_name}},

Floating this back up — I know {{their_week}} weeks like this.

One thing that might help the decision: {{decision_helper}}. Happy to
share regardless of what you decide.

If the timing is simply wrong, a one-word "later" works and I'll
circle back in {{later_window}}.

— {{sender_name}}

---

**Why it works:** stays in-thread (context preserved); gives before
asking again; offers an easy exit — which, counter-intuitively, keeps
deals alive.`,

  "03-follow-up/day-7-value-add.md": `# Day 7 — The value add

**Use on:** the follow-up after the nudge. Never ask for anything.
**Subject:** {{value_subject}}
**Length:** under 80 words.

---

{{first_name}},

No ask today — just something useful.

We mapped {{relevant_process}} across {{sample_size}}
{{their_company_type}}s. The pattern that surprised us:
{{surprising_finding}}.

The one-pager is here: {{link}}. Numbers, method and the raw data are
all in it — steal whatever's useful.

(If the original thread is still alive on your side, I'm still glad to
continue it whenever.)

— {{sender_name}}

---

**Why it works:** re-earns attention instead of spending it; the
"no ask" line is honest (there is no ask); the data gift is specific
to their world.`,

  "03-follow-up/day-14-last-call.md": `# Day 14 — The last call

**Use on:** final follow-up in a sequence. One per thread, ever.
**Subject:** Closing the loop on {{original_subject}}
**Length:** under 70 words.

---

{{first_name}},

I'll assume {{topic}} isn't a priority right now and close the loop
on my side — no hard feelings, timing is a real thing.

If it comes back around, the shortest path is a reply to this email;
it lands at the top of my queue.

Last thing: {{parting_gift}} is yours regardless: {{link}}.

— {{sender_name}}

---

**Why it works:** "closing the loop" is the least needy close that
exists; the door stays open with a specific mechanism; the parting
gift ends the sequence with value, not guilt.`,

  "03-follow-up/win-back.md": `# Win-back — 6 months later

**Use on:** churned customers or dead threads, once.
**Subject:** What changed since you left
**Length:** under 90 words.

---

{{first_name}},

You tried {{product_name}} back in {{original_period}}. Since then,
the thing that probably drove you away — {{likely_churn_reason}} — is
fixed: {{fix_description}}.

If you want to see it, the 2-minute version is here: {{link}}. Your
old {{account_artifact}} still exists, so nothing to rebuild.

If {{category_name}} still isn't on your list, ignore me and it's the
last you'll hear for another six months.

— {{sender_name}}

---

**Why it works:** names the likely churn reason before they have to;
respects the "last you'll hear" promise; reactivating an old account
beats starting a new one — for both sides.`,

  /* ── 04 Subject-line bank (120 rows) ───────────────────────────── */

  "04-subject-lines/subject-line-bank.csv": `subject_line,intent,tags,proven_on,notes
Welcome — here's the thing I promised you,welcome,promise;delivery,onboarding sequences,front-loads the promise
Your first result is 5 minutes away,welcome,quick-win;time-box,onboarding sequences,concrete time-box
The mistake I made for 3 years,welcome,story;vulnerability,newsletter welcomes,curiosity + humility
What nobody tells you about {{topic}},welcome,curiosity;contrarian,newsletter welcomes,generic but tests well
Before you open {{product_name}},welcome,priming,onboarding sequences,anticipation beat
The 10 minutes that saved me 10 hours,welcome,story;time-roi,newsletter welcomes,time math always opens
The {{their_problem}} fix, on one page,welcome,specificity;utility,onboarding sequences,utility first
You made the right call joining {{list_name}},welcome,reassurance,onboarding sequences,reduces buyer's remorse
Noticed something on your {{page_type}},outreach,observation;cold,email outreach,pair with opener A
{{their_problem_in_three_words}},outreach,mirror;cold,email outreach,subject mirrors their words
About {{trigger_event}},outreach,trigger;cold,email outreach,pair with opener C
{{mutual_name}} said to email you,outreach,referral;cold,email outreach,pair with opener B
A question about {{relevant_initiative}},outreach,question;cold,email outreach,questions out-open statements
{{peer_company}}'s {{metric}} — the breakdown,outreach,proof;cold,email outreach,social proof in subject
Wrong number?,outreach,pattern-interrupt;cold,email outreach,high risk — split test first
Quick one, {{first_name}},outreach,short;cold,email outreach,under 25 chars
Your {{page_type}} has a leak,outreach,problem;cold,email outreach,only if verifiably true
Re: our {{event_type}} conversation,outreach,continuation,email outreach,in-thread follow-ups only
The 1-page {{topic}} breakdown,outreach,utility;cold,email outreach,utility promise
Saw your {{trigger_event}} — congrats,outreach,trigger;cold,email outreach,specific congrats beat generic
Worth a look?,outreach,yes-no;cold,email outreach,micro-ask subject
Day 3 nudge — still worth it?,follow-up,nudge,post-proposal follow-up,in-thread reply preferred
Re: {{original_subject}},follow-up,in-thread,post-proposal follow-up,context preserved
Still on your desk?,follow-up,nudge,post-proposal follow-up,physical metaphor
One thing for the decision,follow-up,decision-helper,post-proposal follow-up,pair with day-3
No ask today,follow-up,value-add,post-demo follow-up,honest — there is no ask
Something useful, no strings,follow-up,value-add,post-demo follow-up,curiosity without bait
The pattern we found in {{sample_size}} {{type}}s,follow-up,data;value-add,post-demo follow-up,sample size = credibility
This changed the numbers — see for yourself,follow-up,proof,post-demo follow-up,show don't tell
Should I close the file?,follow-up,last-call,dead threads,gentle exit
Closing the loop on {{original_subject}},follow-up,last-call,dead threads,respectful exit
Bumping this one last time,follow-up,last-call,dead threads,use sparingly
If timing is the only problem,follow-up,timing,dead threads,keeps door open
Later works too — just say the word,follow-up,timing,dead threads,easy exit
When it's a no, tell me,follow-up,clarity,dead threads,prefers truth over hope
The one-question version,follow-up,simplification,post-demo follow-up,shrinks the ask
{{parting_gift}} — yours regardless,follow-up,gift,dead threads,value at exit
What changed since you left,win-back,fixed-churn,lapsed customers,leads with the fix
The {{churn_reason}} problem is fixed,win-back,fixed-churn,lapsed customers,name the real reason
Your {{account_artifact}} still exists,win-back,reactivation,lapsed customers,zero-rebuild promise
6 months, one fix,win-back,re-engage,lapsed customers,time + fix
We shipped what you asked for,win-back,shipped-request,lapsed customers,only if literally true
Give it one more week,win-back,re-engage,lapsed customers,soft second chance
The invoice-killer feature,win-back,objection;lapsed,lapsed customers,only if that was the objection
Ready when you are,win-back,open-door,lapsed customers,zero pressure
Before your renewal date,win-back,timing,lapsed customers,calendar-driven
What {{n}} customers changed next,win-back,social-proof,lapsed customers,cohort story
You were right about {{product_area}},win-back,validation,lapsed customers,concede honestly
The 5-minute setup, on one screen,welcome,utility;time-box,onboarding sequences,screenshot pairs well
Your week-1 plan,welcome,plan;onboarding,onboarding sequences,structure reduces anxiety
What to expect from me,welcome,expectation-setting,onboarding sequences,anti-newsletter promise
The 3 settings that matter,welcome,utility;specificity,onboarding sequences,numbered promise
Skip the queue — start here,welcome,orientation,onboarding sequences,reduces choice paralysis
The beginner's trap,welcome,warning;contrarian,newsletter welcomes,pairs with day-2 email
Everyone does this (don't),welcome,warning;contrarian,newsletter welcomes,gentle warning
The numbers behind the mistake,welcome,data;story,newsletter welcomes,proof for day-2
The afternoon fix that compounds,welcome,counter-intuitive,newsletter welcomes,contrarian fix
{{customer_name}} was ready to quit,welcome,story;turnaround,newsletter welcomes,pairs with day-4
90 days later: {{result}},welcome,story;turnaround,newsletter welcomes,outcome first
The system behind the emails,welcome,bridge-to-offer,onboarding sequences,pairs with day-6
Who this is wrong for,welcome,honesty;offer,onboarding sequences,disqualifies honestly
Launch week: {{price}} not {{compare_at}},welcome,offer;price,onboarding sequences,transparent pricing
The guarantee, in plain words,welcome,offer;guarantee,onboarding sequences,risk removal
A question before the week ends,welcome,engagement,onboarding sequences,reply-bait
Hit reply with your {{metric}},welcome,engagement,onboarding sequences,makes replies easy
The template from {{scenario}},value,utility;template,newsletter sends,attach real artifact
Steal this {{artifact_name}},value,utility;gift,newsletter sends,permission granted
The exact {{process}} we use,value,process;utility,newsletter sends,internal transparency
I was wrong about {{topic}},value,vulnerability,newsletter sends,trust builder
The {{timeframe}} teardown,value,teardown,newsletter sends,recurring format
Numbers, method, raw data,value,transparency,newsletter sends,link triples open rate
Ask me anything about {{topic}},value,engagement,newsletter sends,reply-bait
The case against {{common_advice}},value,contrarian,newsletter sends,myth-busting
What {{group}} gets wrong,value,contrarian;specificity,newsletter sends,specific beats general
The cheaper way to {{outcome}},value,cost;utility,newsletter sends,saves them money
Do this, not that,value,comparison,newsletter sends,scannable format
The 2-minute audit,value,audit;time-box,newsletter sends,diagnostic gift
Your {{metric}} is lying to you,value,data;contrarian,newsletter sends,metric myth-busting
From {{before}} to {{after}},value,transformation,newsletter sends,before/after proof
The one slide that explains it,value,simplicity,newsletter sends,dense-idea digest
Nothing to sell today,value,no-sell,newsletter sends,subject matches content
The unglamorous thing that works,value,honesty,newsletter sends,anti-hack
Year in review — the honest version,value,retrospective,year-end sends,annual format
What we're keeping in {{year}},value,intentions,year-end sends,annual format
The waitlist is open (early access),launch,scarcity;access,product launches,time-boxed
Doors open: {{date_and_time}},launch,launch;specificity,product launches,exact timestamp
24 hours early — because you're on this list,launch,early-access,product launches,list privilege
The first {{n}} get {{bonus}},launch,bonus;scarcity,product launches,honest cap
Price goes up {{date}},launch,deadline;price,product launches,only if true
The last day for {{price}},launch,deadline;price,product launches,final call
We're closing {{date}} (for real),launch,deadline,product launches,never fake this
Sold out — waitlist inside,launch,sold-out,product launches,turns scarcity into list growth
What's inside: the full walkthrough,launch,transparency,product launches,demo email
The top 3 questions, answered,launch,objection-handling,product launches,FAQ beat
Is this you? (honest checklist),launch,qualification,product launches,self-selection
The offer in one screen,launch,simplicity,product launches,single-link email
Cart open — 72 hours,launch,window,product launches,concrete window
One seat left in {{cohort}},launch,cohort;scarcity,live programs,only if literally true
Your receipt + first steps,purchase,onboarding;logistics,purchase confirmations,bridge to usage
Here's your login,purchase,logistics,purchase confirmations,minimal friction
The file you asked for,purchase,attachment,purchase follow-ups,delivery first
How was your first week?,purchase,check-in,purchase follow-ups,survey lite
You're {{n}}% through the course,purchase,progress,product usage,progress nudge
Stuck? Here's the shortcut,purchase,support,product usage,proactive help
The update you voted for,product,shipped;feedback,existing customers,closes the loop
New: {{feature_name}},product,shipped,existing customers,changelog email
We fixed {{bug_name}},product,fixed,existing customers,plain-language fix note
{{feature}} is now {{faster_metric}} faster,product,performance,existing customers,quantified
The roadmap for {{quarter}},product,transparency,existing customers,sets expectations
Sunsetting {{feature}} — here's why,product,sunset;honesty,existing customers,respectful sunset
Your data export is ready,product,data;logistics,existing customers,portability gesture
Renewal in 30 days (and what's new),product,renewal,existing customers,earn the renewal
Bring a friend to {{event}},event,invite,community events,plus-one
The replay is up,event,replay,webinars,24-hour window works
Your seat + the prep list,event,logistics,live workshops,prep reduces no-shows
See you {{day}} at {{time}},event,reminder,live workshops,final reminder
The recording + top 3 moments,event,recap,live workshops,value archive
Rsvp: {{deadline}} is firm,event,deadline,live workshops,soft deadline stated
What you missed (and where to find it),event,recap,live workshops,FOMO-lite
Notes from {{event_name}},event,notes,conferences,unique value
The discount inside expires tonight,reminder,deadline,cart abandonment,only once per cart
You left {{product_name}} in the cart,reminder,cart-recovery,cart abandonment,factual not guilt
Still thinking it over?,reminder,check-in,cart abandonment,one gentle beat
Your trial ends {{date}},reminder,trial-deadline,product trials,decision point
The {{n}}-day trial results,reminder,trial-recap,product trials,usage-based nudge
Last day of your trial,reminder,final-deadline,product trials,clear CTA
What you'd lose (honest list),reminder,value-recap,product trials,features-used recap
`,

  /* ── 05 Setup ──────────────────────────────────────────────────── */

  "05-setup/setup-guide.md": `# Setup guide — Email Template Pack

Everything in this pack is copy-paste-then-edit. This guide shows the
30-minute path from download to first send.

## What's in the pack

- 11 emails: a 4-email welcome series, 3 cold-outreach openers,
  4 follow-up templates (day-3 / day-7 / day-14 / win-back)
- \`04-subject-lines/subject-line-bank.csv\` — 120 subject lines tagged
  by intent (\`welcome\`, \`outreach\`, \`follow-up\`, \`win-back\`,
  \`value\`, \`launch\`, \`purchase\`, \`product\`, \`event\`,
  \`reminder\`) with notes on when each pattern wins
- \`02-cold-outreach/merge-field-map.csv\` — every merge field, where
  it appears, an example value, and what to do if it's missing

## The 30-minute setup

### 1. Load the pack (5 min)

Open the DOCX files in Word / Google Docs / Pages — or the .md sources
in any editor. Keep \`merge-field-map.csv\` open in a second tab; it's
your reference for every placeholder.

### 2. Define your voice replacements (10 min)

Find-and-replace these once, across all files:

| Placeholder | Replace with |
| --- | --- |
| \`{{sender_name}}\` | your first name |
| \`{{company_name}}\` | your brand |
| \`{{product_name}}\` | what you sell |
| \`{{list_name}}\` | the list/community name |

Then per-email fields (\`{{first_name}}\`, \`{{signup_reason}}\`, …)
get filled by your ESP or by hand — the map says which.

### 3. Pick your subject lines (5 min)

Open the subject bank. Filter \`intent\` to the sequence you're
building. Pick **two** per email — every subject line is written to
survive an A/B test.

### 4. Sequence and send (10 min)

1. Welcome series: load days 0/2/4/6 into your ESP as a 4-step
   automation, trigger = list join.
2. Cold outreach: openers go out **one at a time** — never all three
   to the same person.
3. Follow-ups: day-3/day-7/day-14 chain off your sends; win-back is a
   **6-month-later** one-off.

## Rules that make the templates work

1. **Under 120 words for cold, under 90 for follow-ups.** Every
   template is already inside the limit — your edits shouldn't escape
   it.
2. **One ask per email.** The ask is always either a yes/no or a
   one-click. Never "book 30 minutes".
3. **Merge fields or it doesn't send.** If \`{{first_name}}\` is
   empty, delete the row. A missing name reads as spam faster than no
   name at all.
4. **Reply, always.** These templates are written to generate replies.
   Answer them within 24 hours or the whole system decays.

## Troubleshooting

- **"My ESP stripped the formatting"** — paste as plain text; the
  structure (short paragraphs, one-line asks) survives without styles.
- **"Open rates under 30%"** — subject line first, sender name second,
  list quality third. The bank's \`notes\` column tells you which
  patterns to A/B against.
- **"Someone replied grumpy to a cold email"** — reply like a human,
  apologise once, move on. Opener A's research requirement exists
  precisely to keep this rare.

## Files reference

| Path | What it is |
| --- | --- |
| \`01-welcome-series/*.md/.docx\` | 4-email welcome automation |
| \`02-cold-outreach/*.md\` | 3 openers + merge-field map |
| \`03-follow-up/*.md/.docx\` | nudge / value-add / last-call / win-back |
| \`04-subject-lines/*.csv\` | 120-row subject bank |
| \`05-setup/*\` | this guide + walkthrough link |
`,

  "05-setup/walkthrough-link.md": `# Walkthrough

A 6-minute video walkthrough of this pack — every email annotated with
why it works and where to edit first:

**→ https://omniforge.example/walkthroughs/B-TP-1**

Contents:
- 00:00 — The 30-minute setup
- 01:12 — Voice replacements (find & replace once)
- 02:30 — Welcome series, annotated
- 03:48 — Cold openers: research first, send second
- 04:55 — Follow-up cadence and the easy-exit close
- 05:40 — Reading the subject-line bank

The video is hosted (not bundled) so the pack stays under 5 MB.
`,

  /* kit stub note for the extended pack */
  "EXTENDED-PACK/dark-mode-html-variants.md": `# Dark-mode HTML variants — in production

Status: **in production** — not in this archive.

What the finished file will contain: dark-mode-safe HTML versions of
all 11 emails, tested in Gmail (web + iOS/Android), Apple Mail and
Outlook mobile rendering engines, with a tested \`color-scheme\`
meta strategy and per-client fallback table.
`,
};

/* ── Try-it demo content — the same copy, playable in the studio ─── */

export const demo: DemoContent = {
  kind: "templates",
  intro:
    "Open the flagship emails from the pack. Fill a merge field, watch it propagate, copy the result — this is the actual copy you download.",
  templates: [
    {
      id: "day-0",
      folder: "01-welcome-series",
      title: "Day 0 — Welcome + quick win",
      subject: "Welcome — here's the thing I promised you",
      mergeFields: [
        { key: "first_name", sample: "Maya" },
        { key: "company_name", sample: "Forge Labs" },
        { key: "quick_win_screen", sample: "the Alerts tab" },
      ],
      body: `{{first_name}},

Thanks for joining — I'm glad you're here.

Before anything else, here's the quick win I promised: open
{{product_name}} and go straight to {{quick_win_screen}}. Change one
setting, and watch what happens the next time you publish.

That's it. Five minutes, one meaningful result. Everything else I
send builds on that single change.

**What to expect from me:** one email every few days. Short,
specific, always with something you can use the same day. No
"newsletter updates", no filler.

Reply and tell me how the quick win worked out — I read every reply.

— {{sender_name}}
{{company_name}}`,
    },
    {
      id: "opener-a",
      folder: "02-cold-outreach",
      title: "Opener A — Problem-led",
      subject: "{{their_problem_in_three_words}}",
      mergeFields: [
        { key: "first_name", sample: "Daniel" },
        { key: "observable_problem", sample: "checkout errors" },
        { key: "observable_location", sample: "the pricing page" },
        { key: "peer_company_1", sample: "Hearth Co" },
      ],
      body: `Hi {{first_name}},

Noticed {{observable_problem}} on {{observable_location}} —
specifically the 404 that fires when the annual toggle flips.

Companies in your category usually lose 6–8% of checkouts to exactly
that. The fix is usually a one-line cache rule, which takes under an
hour.

We do this for {{peer_company_1}} and Lumen Goods. Happy to send the
1-page breakdown of how Hearth's numbers moved — no call needed.

Worth a look?

— {{sender_name}}`,
    },
    {
      id: "day-7",
      folder: "03-follow-up",
      title: "Day 7 — The value add",
      subject: "Something useful, no strings",
      mergeFields: [
        { key: "first_name", sample: "Priya" },
        { key: "surprising_finding", sample: " Tuesday is the worst send day" },
        { key: "sample_size", sample: "214" },
      ],
      body: `{{first_name}},

No ask today — just something useful.

We mapped onboarding emails across {{sample_size}} B2B SaaS teams.
The pattern that surprised us: {{surprising_finding}}. The one-pager
with numbers, method and the raw data: {{link}} — steal whatever's
useful.

(If the original thread is still alive on your side, I'm still glad
to continue it whenever.)

— {{sender_name}}`,
    },
  ],
};
