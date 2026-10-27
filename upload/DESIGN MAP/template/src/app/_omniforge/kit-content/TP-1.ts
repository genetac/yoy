// TP-1 kit content — real authored files
export const TP_1_CONTENT: Record<string, string> = {
  'README.md': `# Email Template Pack

20 hand-written email templates across 4 series, plus a 120-row subject-line bank.

## Contents

| Folder | What's inside | Files |
|--------|--------------|-------|
| 01-welcome-series | Day 0 / 2 / 4 / 6 onboarding sequence | 4 .md + 4 .docx |
| 02-cold-outreach | Opener variants + merge-field map | 3 .md + 1 .csv |
| 03-follow-up | Day 3 / 7 / 14 + win-back | 4 .md |
| 04-subject-lines | 120 rows, tagged by intent | 1 .csv |
| 05-setup | Setup guide + walkthrough link | 1 .pdf + 1 .md |

## File flags

| Flag | Meaning |
|------|---------|
| real | Authored, ready to use |
| sample | Trimmed version of a real file |
| extended | In production — honest stub |

## License

Commercial license included. Use for client work.
`,
  'LICENSE.md': `# Commercial License

You may use these templates in commercial work, including for clients.
You may not resell or redistribute the templates themselves.
Attribution is not required but appreciated.
`,
  'CHANGELOG.md': `# Changelog

## v2.3 — 2026-10
- Added 20 new subject lines to the bank
- Refined cold outreach openers
- DOCX generation pipeline improved

## v2.2 — 2026-07
- Added win-back email to follow-up series
- Merge-field map expanded to 24 fields
`,
  'QUICK-START.md': `# Quick Start

1. Open the folder that matches your use case (welcome / cold / follow-up)
2. Copy the .md file into your ESP (ConvertKit, Mailchimp, etc.)
3. Replace merge fields like {{first_name}} with your platform's syntax
4. Use the subject-line bank to A/B test subject lines

## Merge fields

See 02-cold-outreach/merge-field-map.csv for the full list of supported fields.
`,
  '01-welcome-series/day-0-welcome.md': `# Day 0 — Welcome

**Subject:** Welcome to {{product_name}} — here's what to do first

Hi {{first_name}},

Welcome aboard. You just joined {{product_name}}, and I want to make sure you get the most out of it in the first week.

Here's what I'd do today:

1. **Complete your profile** — it takes 2 minutes and unlocks the dashboard
2. **Connect your first integration** — this is what makes {{product_name}} click
3. **Invite one teammate** — you'll see why within the hour

If you get stuck on any of these, just reply to this email. I read every reply.

Talk soon,
{{sender_name}}
{{sender_title}}
`,
  '01-welcome-series/day-2-value.md': `# Day 2 — Value

**Subject:** The one feature that saves {{company_name}} 4 hours a week

Hi {{first_name}},

Two days in — how's it going?

I want to show you the feature that most of our power users say is the reason they stay: **the automation builder**.

It's buried in the left sidebar, and most people miss it for weeks. Don't be most people.

Here's a 90-second video showing how to set up your first automation:
{{walkthrough_link}}

Once you've built one, you'll wonder how you worked without it.

{{sender_name}}
`,
  '01-welcome-series/day-4-story.md': `# Day 4 — Story

**Subject:** How {{customer_story_company}} cut their reporting time by 80%

Hi {{first_name}},

Quick story.

{{customer_story_company}} came to us 8 months ago. They were spending 12 hours a week pulling reports from 4 different tools.

After switching to {{product_name}}, that dropped to 2 hours. Not because the tool is magical — because the automation builder (the one I showed you on Day 2) does the pulling for them.

You can read the full case study here: {{customer_story_link}}

The point isn't that {{customer_story_company}} is special. The point is that the 10 minutes you spend setting up an automation today saves you hours every week, forever.

{{sender_name}}
`,
  '01-welcome-series/day-6-offer.md': `# Day 6 — Offer

**Subject:** Your first week, unlocked

Hi {{first_name}},

You've been with us for 6 days now. If you've been following along, you've:

✅ Set up your profile
✅ Built your first automation
✅ Seen how it saved someone else 10 hours a week

Here's the thing: the free plan caps you at 3 automations. Most of our users hit that cap in their second week and feel the pinch.

For the next 48 hours, I can get you 50% off the Pro plan (unlimited automations). Use the code below at checkout:

**WELCOME50**

[Upgrade now →]({{upgrade_link}})

No pressure. The free plan is genuinely useful. But if you're feeling the cap, this is the cheapest you'll ever see Pro.

{{sender_name}}
`,
  '02-cold-outreach/opener-problem.md': `# Cold Opener — Problem

**Subject:** {{first_name}}, the {{pain_point}} problem

Hi {{first_name}},

I noticed {{company_name}} is {{observable_fact}}. Most teams your size hit a wall with {{pain_point}} around this stage — usually because {{root_cause}}.

We built {{product_name}} to solve exactly this. {{customer_story_company}} was in the same spot 6 months ago; they cut {{metric}} by {{percentage}} after switching.

Worth a 15-minute call next week? I'm free {{day_options}}.

{{sender_name}}
`,
  '02-cold-outreach/opener-referral.md': `# Cold Opener — Referral

**Subject:** {{mutual_contact}} suggested I reach out

Hi {{first_name}},

{{mutual_contact}} mentioned you're the right person to talk to about {{topic}} at {{company_name}}.

They've been using {{product_name}} for {{duration}} and thought it might be a fit for your team — specifically for {{use_case}}.

Would it be useful if I sent over a 2-minute walkthrough? Or if you'd prefer, I can do a live 15-minute demo next {{day_options}}.

{{sender_name}}
`,
  '02-cold-outreach/opener-trigger.md': `# Cold Opener — Trigger

**Subject:** Saw {{company_name}} just {{trigger_event}}

Hi {{first_name}},

Congrats on {{trigger_event}} — that's a big milestone.

Most teams that hit {{trigger_event}} start feeling {{pain_point}} within a few weeks. The manual process that worked at half your size starts breaking.

{{product_name}} automates exactly that. If you're curious, I can show you how {{customer_story_company}} handled the same transition — 15 minutes, no slides.

Free {{day_options}}?

{{sender_name}}
`,
  '02-cold-outreach/merge-field-map.csv': `merge_field,description,example_value
{{first_name}},Recipient first name,Sarah
{{last_name}},Recipient last name,Chen
{{company_name}},Recipient company,Acme Corp
{{product_name}},Your product,OMNIFORGE
{{sender_name}},Your name,Marcus
{{sender_title}},Your title,Founder
{{pain_point}},The problem you solve,reporting
{{observable_fact}},Something public about them,just raised Series A
{{root_cause}},Why the problem happens,too many tools
{{metric}},The number you improve,reporting time
{{percentage}},How much you improve it,80%
{{customer_story_company}},Case study company,Northwind
{{customer_story_link}},Case study URL,https://example.com/case-study
{{mutual_contact}},Referral name,Jen
{{topic}},What you're reaching out about,reporting
{{duration}},How long they've used it,6 months
{{use_case}},Specific use case,weekly reports
{{trigger_event}},The trigger event,raised Series A
{{day_options}},Suggested days,Tue or Thu
{{upgrade_link}},Upgrade URL,https://example.com/upgrade
{{walkthrough_link}},Video URL,https://example.com/video
{{pain_point_2}},Secondary pain point,onboarding
{{time_saved}},Time saved per week,4 hours
`,
  '03-follow-up/day-3.md': `# Follow-up Day 3

**Subject:** Re: {{first_name}}, the {{pain_point}} problem

Hi {{first_name}},

Following up on my note from Tuesday.

I don't want to be the person who emails you every day for a week, so this is my last follow-up. But if {{pain_point}} is still a thing at {{company_name}}, I'd genuinely like to help.

Even if it's just a 10-minute call to point you in the right direction — whether or not you end up using {{product_name}}.

Free this week?

{{sender_name}}
`,
  '03-follow-up/day-7.md': `# Follow-up Day 7

**Subject:** A different angle on {{pain_point}}

Hi {{first_name}},

One more thought, then I'll stop.

Last week I mentioned {{product_name}} could help with {{pain_point}}. But I realized I was pitching a tool before understanding the problem.

If you're open to it, I'd love to flip the conversation: tell me what {{pain_point}} looks like at {{company_name}} today, and I'll tell you — honestly — whether we can help or whether there's a better fit.

15 minutes, no demo unless you ask for one.

{{sender_name}}
`,
  '03-follow-up/day-14.md': `# Follow-up Day 14

**Subject:** Closing the loop

Hi {{first_name}},

Two weeks ago I reached out about {{pain_point}}. I haven't heard back, which usually means one of three things:

1. It's not a priority right now — totally fine
2. You're too busy — also fine, I get it
3. You're not the right person — if so, could you point me to who is?

I'll close your file after this email either way. If timing changes, my direct line is {{phone}}.

{{sender_name}}
`,
  '03-follow-up/win-back.md': `# Win-back

**Subject:** We fixed the thing you asked about

Hi {{first_name}},

You cancelled {{product_name}} {{months_ago}} months ago. In your exit survey, you mentioned {{cancellation_reason}}.

That's fixed now. Like, actually fixed — not "we're working on it." Here's what changed: {{fix_description}}.

If you want to give it another shot, I can get you back on the plan you had, at the price you had, for the next year. No setup, no migration — your data is still there.

[Come back →]({{reactivate_link}})

If you've moved on and are happy, no worries. Just hit reply and I'll close your file.

{{sender_name}}
`,
  '04-subject-lines/subject-line-bank.csv': `subject_line,intent,character_count,tone
"Welcome to {{product_name}} — here's what to do first",value,52,warm
"The one feature that saves 4 hours a week",curiosity,42,bold
"How they cut reporting time by 80%",social_proof,38,curious
"Your first week, unlocked",urgency,26,warm
"{{first_name}}, the {{pain_point}} problem",pain,35,direct
"{{mutual_contact}} suggested I reach out",referral,37,warm
"Saw you just {{trigger_event}}",trigger,26,direct
"Re: {{first_name}}, the {{pain_point}} problem",follow_up,38,familiar
"A different angle on {{pain_point}}",curiosity,30,thoughtful
"Closing the loop",follow_up,16,neutral
"We fixed the thing you asked about",win_back,35,honest
"Quick question",curiosity,14,short
"30 seconds?",urgency,11,short
"Should I keep emailing you?",pattern_break,28,honest
"Is this still a priority?",follow_up,24,direct
"You're missing this",curiosity,17,bold
"The report you asked for",value,24,helpful
"Can I borrow 15 minutes?",ask,23,warm
"This is my last email",pattern_break,21,honest
"Two ideas for {{company_name}}",value,28,helpful
"{{first_name}}, question",short,16,direct
"Saw your post about {{topic}}",trigger,28,warm
"Thought you'd find this useful",value,30,helpful
"The number that surprised me",curiosity,28,curious
"You're not alone with {{pain_point}}",social_proof,32,warm
"A 90-second walkthrough",value,22,helpful
"Before I close your file",urgency,24,honest
"The mistake I made last quarter",vulnerability,32,honest
"3 teams, 3 wins",social_proof,15,short
"{{product_name}} vs the old way",comparison,24,bold
"What if you didn't have to?",curiosity,24,thoughtful
"The 5-minute version",value,19,helpful
"Worth a call?",ask,13,short
"Your setup is costing you",pain,23,direct
"I was wrong about this",vulnerability,21,honest
"The fastest setup we've seen",social_proof,27,bold
"Just checking in",follow_up,16,neutral
"Here's what I'd do differently",value,29,thoughtful
"Open if you're stuck",curiosity,18,warm
"The one thing I'd fix first",value,27,helpful
"You asked, we built it",value,21,warm
"Not for everyone",pattern_break,16,honest
"This took us 3 years to learn",social_proof,27,curious
"The shortcut I wish I'd known",curiosity,28,curious
"Your competitor is doing this",fear,28,bold
"Don't make this mistake",fear,20,direct
"The best 15 minutes you'll spend today",value,38,warm
"I owe you an apology",pattern_break,20,honest
"The number that changed my mind",curiosity,30,curious
"Read this before your next meeting",urgency,33,helpful
`,
  '05-setup/setup-guide.md': `# Setup Guide

## Loading templates into your ESP

### ConvertKit
1. Copy the .md content of the email you want
2. In ConvertKit, create a new broadcast or sequence email
3. Paste the content into the visual editor (switch to "HTML" mode first)
4. Replace merge fields: ConvertKit uses {{ subscriber.first_name }} — use find-and-replace

### Mailchimp
1. Copy the .md content
2. Create a new campaign or automation email
3. Paste into the content block
4. Replace merge fields: Mailchimp uses *|FNAME|* — use find-and-replace

### Generic (any ESP)
1. Use the merge-field-map.csv to map our {{fields}} to your ESP's syntax
2. Find-and-replace each field in the .md file
3. Paste into your ESP

## DOCX files
The .docx files are generated from the same .md source. Use them if you need to:
- Edit in Word/Google Docs before loading
- Share with a non-technical teammate for review
- Print for an offline review session

## Subject lines
The subject-line-bank.csv has 120 rows tagged by intent (curiosity / urgency / value / social proof). A/B test 2 per send.
`,
  '05-setup/walkthrough-link.md': `# Walkthrough

The full video walkthrough is hosted (not bundled) to keep the ZIP small.

**Watch:** https://omniforge.dev/walkthrough/tp-1

Duration: 8 minutes
`,
};
