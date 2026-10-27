/* ════════════════════════════════════════════════════════════════════
   B-TP-4 · Contract Template Pack
   5 plain-English contracts (MSA, consultancy, mutual NDA, one-way NDA,
   SOW) with a [bracket] fill-in system and numbered clauses, plain-English
   summaries, US/UK/EU jurisdiction notes, legal-review checklist, setup
   guide. Every file's key equals its bundle path. The Try-it demo reads
   the same clause copy.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-TP-4";

export const files: Record<string, string> = {
  /* ── 01 Service agreements ─────────────────────────────────────── */

  "01-service-agreements/master-services-agreement.md": `# Master Services Agreement

**Between:** [Client Legal Name], of [Client Registered Address] ("**Client**"), and [Provider Legal Name], of [Provider Registered Address] ("**Provider**"). Each a "**Party**", together the "**Parties**".
**Effective date:** [Effective Date] · **Agreement no.:** [MSA-Number]

> **Structure:** this Agreement fixes the legal terms once; each project runs on a Statement of Work ("**SOW**") signed under it — a 3-page project document instead of a 40-page renegotiation. Fill or delete every [bracket] before signing; the checklist in \`06-setup/legal-review-checklist.md\` catches what you miss.

## 1. Definitions

In this Agreement and every SOW:
1.1 "**Services**" means the work Provider performs for Client as described in an SOW.
1.2 "**Deliverables**" means the work product expressly listed as a deliverable in an SOW.
1.3 "**SOW**" means a statement of work signed by both Parties that references this Agreement by number.
1.4 "**Fees**" means the amounts payable for an SOW as set out in that SOW.
1.5 "**Intellectual Property Rights**" means patents, rights in inventions, copyrights, design rights, trademarks, trade secrets, database rights and all similar rights, worldwide.
1.6 "**Confidential Information**" means information a Party discloses that is marked confidential, or that a reasonable person would understand to be confidential from its nature or the circumstances — including pricing, source code, designs, roadmaps, customer and personnel data. Personal data is also governed by clause 6.4.
1.7 "**Background IP**" means Intellectual Property Rights that existed before an SOW, or that Provider develops independently of it.

## 2. How this Agreement works

2.1 Each SOW forms part of this Agreement. If an SOW and this Agreement conflict, this Agreement wins — unless the SOW expressly overrides a clause by number.
2.2 An SOW is effective when signed by both Parties; email confirmation from both signatories counts as signature.
2.3 Signing an SOW is how work starts. No SOW obliges Client to commission anything.

## 3. Providing the Services

3.1 Provider will perform the Services with reasonable skill and care, using personnel appropriately qualified for the work.
3.2 Provider may use subcontractors and remains responsible for their work as if it were Provider's own.
3.3 Client will provide, at its cost and in reasonable time, the access, information and decisions listed under "Client responsibilities" in the SOW. If a Client dependency is late, timelines shift by the same number of days and the Fees do not change.
3.4 Provider is not responsible for delays caused by Client materials, feedback or approvals arriving outside the windows in the SOW.

## 4. Fees, invoices and late payment

4.1 Client will pay each undisputed invoice within [30] days of its date, in [Currency], to the account on the invoice. Good-faith disputes must be raised in writing within [10] days, identifying the disputed amount; undisputed amounts remain payable.
4.2 Fees are exclusive of taxes and of pre-approved expenses; Provider itemises both on every invoice.
4.3 Late payment bears interest at [the statutory rate] ([or] [1.5]% per month) from the due date, plus reasonable collection costs. Provider may pause work on overdue amounts after [15] days' written notice, shifting timelines by the delay; clause 5.3 (IP) is unaffected.
4.4 If Client is more than [60] days late on any amount, Provider may terminate the affected SOW for cause under clause 10.2.

## 5. Intellectual property

5.1 On payment in full of the Fees for an SOW, Provider assigns to Client all Intellectual Property Rights in that SOW's Deliverables, worldwide.
5.2 Provider keeps Background IP. To the extent Background IP is embedded in a Deliverable, Provider grants Client a perpetual, irrevocable, worldwide, non-exclusive, royalty-free license to use, modify and build on it as part of that Deliverable.
5.3 Until payment in full, Deliverables remain Provider's property.
5.4 Unless an SOW says otherwise, Provider may show the Deliverables in a portfolio or work summary after the SOW's public launch date, respecting Client confidentiality marks.
5.5 [Drafting note — moral rights: in the UK and most EU states, an author's moral rights cannot be assigned, only waived in writing. If Governing Law (clause 14.2) is UK or a EU member state, keep the waiver line in the SOW signature block; see \`05-jurisdiction/jurisdiction-notes.md\`.]

## 6. Confidentiality

6.1 Each Party will protect the other's Confidential Information with at least the care it uses for its own, and use it only to perform this Agreement.
6.2 Disclosure is permitted to employees, contractors and advisers who need the information for this Agreement and are bound by obligations no weaker than these.
6.3 These obligations do not apply to information that is or becomes public without breach, was already lawfully known, is independently developed without use of the other's information, or must be disclosed by law or court order — with prompt written notice where lawful.
6.4 Personal data is not shared under this clause; it needs a data-processing arrangement. [If either Party will share personal data — customer records, user analytics, personnel files — sign a data-processing addendum before sharing; see \`05-jurisdiction/jurisdiction-notes.md\`.]
6.5 Confidentiality obligations survive for [3] years after this Agreement ends; for trade secrets, for as long as they remain trade secrets.

## 7. Warranties and disclaimers

7.1 Provider warrants that the Services will be performed with reasonable skill and care, and that Deliverables will materially match the acceptance criteria in their SOW.
7.2 Provider warrants that it is free to enter this Agreement and that the Deliverables, to the best of Provider's knowledge, do not knowingly infringe a third party's Intellectual Property Rights.
7.3 Except as expressly stated, all other warranties are disclaimed to the fullest extent the law allows. Provider does not warrant uninterrupted or error-free operation, or results from Client's use of the Deliverables.
7.4 Any claim under this clause 7 must be made within [90] days of the event giving rise to it.

## 8. Limitation of liability

8.1 Neither Party is liable for indirect, incidental, special, consequential or punitive damages, or for lost profits, lost revenue or lost data — even if told such loss was possible.
8.2 Each Party's total liability under or in connection with this Agreement and its SOWs is capped at [the total Fees paid and payable in the 12 months before the event giving rise to the claim] ([or] [a fixed amount of [Amount]]).
8.3 Nothing in this Agreement limits liability for death or personal injury caused by negligence, for fraud or willful misconduct, or for any liability that cannot lawfully be limited.
8.4 [Drafting note — carve-outs: a disclosing Party sometimes asks to add "or breach of clause 6 (Confidentiality)" to 8.3. In most US states this is negotiable; in the UK it must pass the reasonableness test. Cap confidentiality breaches at a higher multiple instead of removing them from the cap entirely. Delete this note before signing.]

## 9. Indemnities

9.1 Provider will defend Client against a third-party claim that a Deliverable, as delivered, infringes that third party's Intellectual Property Rights, and will pay damages finally awarded — provided Client notifies Provider promptly, gives Provider control of the defense, and cooperates reasonably. If a Deliverable is, or is likely to be, found infringing, Provider may at its cost procure the right to continue use, replace it with a non-infringing equivalent, or refund the Fees paid for it and terminate the affected SOW.
9.2 Clause 9.1 is the whole of Provider's IP obligation, and clause 8 applies to it. [Drafting note: larger Clients may demand an uncapped IP indemnity. Cap it as a multiple of the affected SOW's Fees — [2]x is a common middle ground — rather than agreeing to uncapped.]
9.3 Each Party indemnifies the other against third-party claims arising from its gross negligence or willful misconduct.

## 10. Term and termination

10.1 This Agreement starts on the Effective Date and continues until [either Party gives [90] days' written notice] ([or] [it is terminated only for cause under 10.2]). SOWs in progress continue to their end unless they say otherwise.
10.2 Either Party may terminate this Agreement or any SOW for cause with immediate written notice if the other Party: materially breaches and fails to cure within [15] days of written notice; becomes insolvent or enters an analogous proceeding; or [is more than 60 days late on payment (Provider only, per clause 4.4)].
10.3 On termination: Client pays for Services performed and expenses incurred to the termination date; Provider delivers work in progress [on payment of the pro-rata amount] ([or] [on payment of the lesser of the pro-rata amount and the cost to complete]); each Party returns or destroys the other's Confidential Information on request.
10.4 Clauses 1, 4 (for accrued amounts), 5, 6, 7, 8, 9, 11, 14 and 15 survive termination.

## 11. Independent contractor

11.1 Provider is an independent contractor. Nothing in this Agreement creates employment, partnership, joint venture or agency.
11.2 Each Party is responsible for its own taxes, social contributions and insurance for its personnel.

## 12. Insurance [optional]

12.1 Provider maintains [professional indemnity] insurance of at least [Amount] per claim and [general liability] insurance of at least [Amount], and provides certificates on request. [Delete this clause if you do not carry the cover — an unenforced insurance clause is worse than none; see the review checklist.]

## 13. Non-solicitation [optional — check enforceability first]

13.1 During the term and for [12] months after it ends, neither Party will directly solicit for employment the other's personnel who worked on the SOWs. General job postings are not solicitation.
13.2 [Drafting note: in the US, non-competes are banned or heavily restricted in several states (including California); in the UK, restraints must protect a legitimate interest and be no wider than necessary; several EU states require compensation for post-term non-competes. Non-solicit clauses are far safer than non-competes everywhere. See the jurisdiction notes.]

## 14. Disputes and governing law

14.1 The Parties will first try to resolve any dispute in good faith between [Named Executive, Client] and [Named Executive, Provider] within 30 days of written notice.
14.2 Failing that, disputes go to [the courts of [City, State/Country]], and this Agreement is governed by [the law of [State/Country]], excluding its conflict-of-laws rules. ([Alternative: arbitration under [institution] rules, seat [City].])
14.3 Either Party may propose [mediation] first; participating is without prejudice to either Party's rights.

## 15. General

15.1 This Agreement and its SOWs are the entire agreement between the Parties on their subject matter, and replace all prior discussions; changes must be in writing and signed by both Parties (email counts).
15.2 Neither Party may assign this Agreement without the other's written consent, except to a successor in a merger or sale of substantially all assets.
15.3 If a clause is unenforceable, the rest continues; the Parties will replace it with the closest lawful equivalent.
15.4 Notices go to the addresses above (or as updated in writing): email on confirmed receipt, post [5] business days after sending. Third parties have no rights under this Agreement.
15.5 Signed counterparts — including electronic signatures under [ESIGN / eIDAS-equivalent law] — together form one agreement.

## Signatures

**For [Client Legal Name]:** Signature: ____________________ · Name: [Signer Name] · Title: [Signer Title] · Date: [Date]
**For [Provider Legal Name]:** Signature: ____________________ · Name: [Signer Name] · Title: [Signer Title] · Date: [Date]

*Template for common business use — have counsel review before signing.*`,

  "01-service-agreements/consultancy-agreement.md": `# Consultancy Agreement

**Between:** [Client Legal Name] ("**Client**") and [Consultant Name], trading as [Consultancy Trading Name] ("**Consultant**").
**Effective date:** [Effective Date] · **Governing law:** [State / Country]

> **What this is:** one engagement between one client and one consultant (a person or one-person firm), with the services and fees in Schedule 1. Use the MSA + SOW pair instead when the same client will commission multiple projects over time.

## 1. The engagement

1.1 Consultant will provide the services described in Schedule 1 (the "**Services**"), starting on [Start Date] and continuing [until [End Date]] ([or] [until the Services are complete]).
1.2 Consultant will perform with reasonable skill and care, and will devote the time needed to meet the dates in Schedule 1.
1.3 Consultant decides how and where the Services are performed; Client controls outcomes, not methods. This clause is what makes the arrangement consultancy rather than employment — keep it.

## 2. Consultant's status

2.1 Consultant is an independent business, not an employee, worker or agent of Client.
2.2 Consultant is free to work for other clients, including [competing businesses, subject to the confidentiality and non-solicit terms as written] ([or] [clients in [Industry], excluded during the term]).
2.3 Consultant is responsible for Consultant's own taxes, social contributions and any registrations in [Consultant's Jurisdiction].
2.4 [UK note: if Client is UK-based, each Party should take its own advice on the off-payroll working rules (IR35 / Chapter 10); nothing in this Agreement determines employment status by itself. See the jurisdiction notes.]

## 3. Fees and payment

3.1 Client will pay the fees set out in Schedule 1 — ([a fixed fee of [Amount]]) ([or] [a rate of [Amount] per [day], capped at [N] [days] without written approval to go beyond]) — within [30] days of each invoice.
3.2 Pre-approved expenses are billed at cost with receipts; travel beyond [City] needs prior written approval.
3.3 Late payment bears interest at [the statutory rate] from the due date. Consultant may pause the Services after [15] days' written notice of an overdue amount, shifting dates by the same delay.
3.4 Fees exclude VAT and sales taxes, which are added where applicable.

## 4. Changes

4.1 Either Party may propose changes. A change takes effect only when both sign a short written change note (email counts) stating the change to scope, fee and dates.
4.2 Work outside Schedule 1 is billed at [Amount] per [day / hour], and only after written approval.

## 5. Intellectual property

5.1 On payment in full, Consultant assigns to Client all Intellectual Property Rights in the deliverables listed in Schedule 1, worldwide.
5.2 Consultant keeps Consultant's pre-existing materials, methods and tools. To the extent they appear in a deliverable, Client receives a perpetual, worldwide, non-exclusive, royalty-free license to use and modify them within that deliverable.
5.3 Consultant may reuse general knowledge, skills and experience gained on the engagement, including improvements to Consultant's own methods and tools. [Where moral rights cannot be assigned (UK and most of the EU), Consultant waives them to the extent the law allows; see the jurisdiction notes.]
5.4 Unless Schedule 1 says otherwise, Consultant may name Client and describe the engagement in Consultant's portfolio after [public launch / Client's written approval].

## 6. Confidentiality

6.1 Consultant will protect Client's confidential information with at least the care used for Consultant's own, and use it only to perform the Services.
6.2 Disclosure is permitted to Consultant's subcontractors and advisers who need it for the Services and are bound at least as protectively.
6.3 The obligation does not apply to information that is or becomes public without breach, was already lawfully known, is independently developed, or must be disclosed by law — with prompt written notice where lawful.
6.4 [If Client will share personal data with Consultant, sign a data-processing addendum first; this clause is not one.]

## 7. Substitution

7.1 The Services are personal to Consultant. If Consultant cannot perform for more than [15] consecutive days (illness, emergency), Consultant will ([propose a substitute of equivalent skill for Client's written approval]) ([or] [give notice and refund the unperformed part]).

## 8. Insurance

8.1 Consultant holds [professional indemnity] cover of at least [Amount] and will provide evidence on request. [Delete if untrue — never sign an insurance clause you cannot satisfy.]

## 9. Warranties

9.1 Consultant warrants reasonable skill and care, and that deliverables will materially match Schedule 1.
9.2 No other warranty is given. In particular, Consultant does not warrant specific business outcomes — Client remains responsible for decisions made using Consultant's advice.

## 10. Limitation of liability

10.1 Neither Party is liable for indirect or consequential loss, lost profits or lost data.
10.2 Each Party's total liability is capped at ([the fees paid and payable under this Agreement in the 12 months before the claim]) ([or] [[Amount]]).
10.3 Nothing limits liability for death or personal injury caused by negligence, for fraud, or for anything the law does not permit to be limited.

## 11. Term and termination

11.1 The engagement runs from [Start Date] until [End Date / completion of the Services].
11.2 Either Party may terminate for convenience on [30] days' written notice. ([Alternative for fixed-fee work: no convenience termination — changes go through clause 4 instead.])
11.3 Either Party may terminate for cause on [15] days' written notice of an uncured material breach, or immediately for insolvency.
11.4 On termination, Client pays for work performed to date; Consultant delivers work in progress on payment of the pro-rata fee. Clauses 3 (accrued amounts), 5, 6, 9, 10, 12 and 13 survive.

## 12. Non-solicitation [optional]

12.1 For [12] months after the engagement ends, Client will not directly solicit for employment Consultant's [employees / subcontractors] who worked on the Services; general job postings are excluded. [Check enforceability in the governing jurisdiction — see the jurisdiction notes.]

## 13. General

13.1 Governing law: [State / Country]. Disputes: good-faith negotiation for 30 days, then [the courts of [City, State/Country]].
13.2 Entire agreement; changes in writing (email counts); no assignment without consent except to a business successor; severability; notices to the addresses in the header; counterparts and electronic signatures are valid originals.

## Schedule 1 — Services and fees

| # | Deliverable | What it is / what "done" means | Due | Acceptance |
| --- | --- | --- | --- | --- |
| 1 | [Deliverable] | [Description] | [Date] | [Checkable criteria] |
| 2 | [Deliverable] | [Description] | [Date] | [Checkable criteria] |
| 3 | [Deliverable] | [Description] | [Date] | [Checkable criteria] |

**Fees:** ([a fixed fee of [Amount], invoiced [Deposit %] on signature and the balance on acceptance of item [N]]) ([or] [a rate of [Amount] per [day], invoiced monthly in arrears]).
**Client responsibilities:** [access], [data and materials], a named decision-maker ([Name]), and feedback within [5] business days per deliverable.

## Signatures

**For [Client Legal Name]:** Signature: ____________________ · Name: [Signer Name] · Title: [Signer Title] · Date: [Date]
**For [Consultant Name] / [Consultancy Trading Name]:** Signature: ____________________ · Name: [Consultant Name] · Title: Owner · Date: [Date]

*Template for common business use — have counsel review before signing.*`,

  /* ── 02 NDAs ───────────────────────────────────────────────────── */

  "02-ndas/mutual-nda.md": `# Mutual Non-Disclosure Agreement

**Between:** [Party A Legal Name] and [Party B Legal Name] (each a
"**Party**", together the "**Parties**").
**Date:** [Date] · **Governing law:** [State / Country]

> **What this is:** both sides will share confidential information for
> the purpose in clause 1, and neither side may use or leak it beyond
> that purpose. Use the one-way NDA instead when only one side is
> disclosing.

## 1. Purpose

1.1 The Parties will share Confidential Information to [evaluate or
pursue: e.g. a possible design partnership around [Project]] (the
"**Purpose**").

## 2. What counts as Confidential Information

2.1 Information disclosed by or for a Party, in any form — written,
oral, visual or machine-readable — that is marked or identified as
confidential, or that a reasonable person would understand to be
confidential from its nature or the circumstances of disclosure.
2.2 Each Party will summarise significant oral disclosures in a written
note sent within [30] days, so the record is clear.

## 3. What does not count

3.1 Information that: (a) is or becomes public without breach of this
Agreement; (b) the receiving Party lawfully knew before disclosure; (c)
is received from a third party free of confidentiality; or (d) is
independently developed without use of the other Party's Confidential
Information.

## 4. The promises

4.1 The receiving Party will: use the other Party's Confidential
Information only for the Purpose; protect it with at least the care used
for its own confidential information, and never less than reasonable
care; share it only with representatives who need it for the Purpose and
who are bound by obligations at least as protective as these.
4.2 The receiving Party is responsible for its representatives'
compliance with this Agreement.
4.3 If the law or a court requires disclosure, the receiving Party will
notify the disclosing Party promptly where lawful, disclose only what is
required, and seek confidential treatment where available.

## 5. No licence, no obligation

5.1 No Intellectual Property Rights are licensed or transferred by this
Agreement; all rights stay with their owner.
5.2 This Agreement does not oblige either Party to enter any further
contract, and does not create exclusivity, agency or partnership.

## 6. Personal data [include if sharing personal data]

6.1 Personal data shared under this Agreement is shared for the Purpose
only and under ([a separate data-processing agreement]) ([or] [the
data-sharing terms in [Document]]). Nothing in this Agreement authorises
processing of personal data beyond the Purpose. [EU/UK: see the
jurisdiction notes; a GDPR-aware variant is in the extended pack.]

## 7. Term and survival

7.1 This Agreement starts on [Date] and continues for [2] years, unless
ended earlier by [30] days' written notice.
7.2 The confidentiality obligations survive for [3] years after each
disclosure; trade secrets remain protected for as long as they qualify
as trade secrets.

## 8. Return or destruction

8.1 On written request, each Party will return or destroy the other
Party's Confidential Information within [30] days and confirm in
writing — except copies retained in routine backups or required by law,
which remain protected under this Agreement.

## 9. Remedies and liability

9.1 The Parties agree that a breach of this Agreement may cause harm
that money cannot fully repair, so the disclosing Party may seek an
injunction or equivalent relief in addition to damages. No bond is
required.
9.2 Neither Party is liable for indirect or consequential loss arising
from the other Party's disclosure or use of Confidential Information
under this Agreement.

## 10. Governing law and general

10.1 Governing law: [State / Country]. Disputes: [the courts of [City,
State/Country]] ([or] [arbitration under [rules], seat [City]]).
10.2 This is the entire agreement between the Parties on
confidentiality; changes must be in writing and signed (email counts).
No assignment without consent; unenforceable clauses are replaced with
the closest lawful equivalent; counterparts and electronic signatures
are valid originals.
10.3 No residuals clause is included. [Drafting note: a residuals
clause — allowing reuse of things remembered — favours the receiving
Party and is usually a large company's ask. If pressed, limit residuals
to general skills and knowledge, never identified Confidential
Information. See the jurisdiction notes.]

## Signatures

**For [Party A Legal Name]:**
Signature: ____________________ Name: [Signer Name]
Title: [Signer Title] Date: [Date]

**For [Party B Legal Name]:**
Signature: ____________________ Name: [Signer Name]
Title: [Signer Title] Date: [Date]

*Template for common business use — have counsel review before signing.*`,

  "02-ndas/one-way-nda.md": `# One-Way Non-Disclosure Agreement

**Between:** [Discloser Legal Name] ("**Discloser**") and [Receiver
Legal Name] ("**Receiver**").
**Date:** [Date] · **Governing law:** [State / Country]

> **What this is:** Discloser shares confidential information so
> Receiver can [evaluate a product / provide a service / assess an
> investment]; Receiver receives and protects it. Only Discloser
> discloses — use the mutual NDA when both sides do.

## 1. Disclosure and purpose

1.1 Discloser may share Confidential Information with Receiver for the
purpose of ([evaluating whether to license Discloser's [Product] for
Receiver's [Use Case]]) (the "**Purpose**"). Sharing is at Discloser's
option; nothing compels disclosure.
1.2 Receiver acknowledges that no licence or right of any kind is
granted except the limited right to receive and evaluate for the
Purpose.

## 2. Confidential Information

2.1 Information disclosed by or for Discloser, in any form, that is
marked confidential or that a reasonable person would understand to be
confidential from its nature — including [source code, designs,
financials, customer lists, roadmaps].
2.2 Significant oral disclosures are confirmed in a written summary
sent by Discloser within [30] days.

## 3. Exclusions

3.1 Information that: (a) is or becomes public without breach; (b)
Receiver lawfully knew before disclosure; (c) is received from a third
party free of confidentiality; or (d) is independently developed without
use of the Confidential Information.

## 4. Receiver's promises

4.1 Use the Confidential Information only for the Purpose.
4.2 Protect it with at least reasonable care, and at least the care used
for Receiver's own confidential information.
4.3 Share it only with employees, contractors and advisers who need it
for the Purpose and are bound at least as protectively; Receiver is
responsible for them.
4.4 Notify Discloser promptly of any unauthorised use or disclosure, and
cooperate reasonably to remedy it.
4.5 If the law or a court requires disclosure: prompt written notice
where lawful; disclose only what is required; seek confidential
treatment.

## 5. No licence, no obligation

5.1 All rights stay with Discloser. Nothing here licenses, transfers or
grants any right to use Discloser's Intellectual Property, trademarks or
trade names.
5.2 Neither Party is obliged to proceed with any transaction; either
may end discussions at any time; no agency or partnership is created.

## 6. Personal data [include if applicable]

6.1 If Discloser will share personal data, the Parties will first sign
([a data-processing agreement]) ([or] [data-sharing terms]); this NDA
alone does not authorise sharing it. [EU/UK: see the jurisdiction notes
and the GDPR-aware variant in the extended pack.]

## 7. Term, survival, return

7.1 This Agreement starts on [Date] and continues for [2] years. The
confidentiality obligations survive for [3] years after each
disclosure; trade secrets for as long as they remain trade secrets.
7.2 On written request, Receiver will return or destroy the Confidential
Information within [30] days and confirm in writing; routine backups and
legal holds remain protected under this Agreement.

## 8. Remedies and liability

8.1 A breach may cause irreparable harm; Discloser may seek injunctive
relief without posting a bond, in addition to damages and costs.
8.2 Neither Party is liable for indirect or consequential loss arising
from disclosure or use of the Confidential Information under this
Agreement; 8.1 is unaffected.

## 9. Governing law and general

9.1 Governing law: [State / Country]. Disputes: [the courts of [City,
State/Country]] ([or] [arbitration under [rules], seat [City]]).
9.2 Entire agreement on confidentiality; changes in writing (email
counts); no assignment without consent; severability; counterparts and
electronic signatures are valid originals.

## Signatures

**For [Discloser Legal Name]:**
Signature: ____________________ Name: [Signer Name]
Title: [Signer Title] Date: [Date]

**For [Receiver Legal Name]:**
Signature: ____________________ Name: [Signer Name]
Title: [Signer Title] Date: [Date]

*Template for common business use — have counsel review before signing.*`,

  /* ── 03 SOW ────────────────────────────────────────────────────── */

  "03-sow/statement-of-work.md": `# Statement of Work

**SOW no.:** [SOW-Number] · **Under MSA no.:** [MSA-Number], dated [MSA
Date] · **Governing law:** as in the MSA, clause 14.2
**Between:** [Client Legal Name] ("Client") and [Provider Legal Name]
("Provider") — defined terms as in the MSA
**Project:** [Project Name] · **Dates:** [Start Date] to [Target End Date]

> **What this is:** the 3-page project document that runs under the MSA —
> scope, dates, fees, acceptance. If you have not signed the MSA, sign it
> first ([or] [attach this SOW to the consultancy agreement and adjust
> the clause references in section 9]). Fill every [bracket].

## 1. The project in one sentence

[One sentence: Client gets [Outcome], measured by [Success Measure], by
[Date].]

## 2. Scope and deliverables

| # | Deliverable | What it is / includes | Due | Acceptance criteria |
| --- | --- | --- | --- | --- |
| 1 | [Deliverable] | [Description and inclusions] | [Date] | [Objective, checkable criteria] |
| 2 | [Deliverable] | [Description and inclusions] | [Date] | [Checkable criteria] |
| 3 | [Deliverable] | [Description and inclusions] | [Date] | [Checkable criteria] |

2.1 Explicitly out of scope: [item], [item], [item]. Anything not listed
in the table is out of scope by default; additions go through clause 7.

## 3. Milestones and timeline

| Milestone | Date | What Client sees |
| --- | --- | --- |
| Kickoff | [Date] | [Working session; the plan on one page] |
| [Milestone 1] | [Date] | [Visible output] |
| [Milestone 2] | [Date] | [Visible output] |
| Final review | [Date] | [All deliverables, plus results against section 1] |

3.1 Dates assume Client provides what section 5 lists within [5]
business days of each request. Client delays shift dates one-for-one;
the Fees do not change.

## 4. Fees and payment

| Payment | Amount | Trigger |
| --- | --- | --- |
| Deposit | [Amount] ([% of total]) | SOW signature |
| [Milestone payment] | [Amount] | [Acceptance of deliverable [N]] |
| Balance | [Amount] | [Acceptance of the final deliverable] |

**Total:** [Amount], exclusive of taxes and pre-approved expenses,
invoiced under MSA clause 4 — [30]-day terms, late interest and pause
rights as written there.

## 5. Client responsibilities

[Access to systems and people: what, by when] · [Data and materials:
what, in which format, by when] · [A named decision-maker: [Name] or a
delegate] · [Feedback within [5] business days per deliverable]

## 6. Acceptance

6.1 Client reviews each deliverable against the acceptance criteria in
section 2 within [10] business days of delivery, and either accepts in
writing or returns specific, criterion-based comments.
6.2 A deliverable is accepted on Client's written sign-off (email
counts), or at the end of the review window if no comments were received
(deemed acceptance).
6.3 One round of revisions per deliverable is included; further rounds
are a change under clause 7.

## 7. Changes

7.1 Either Party may propose a change. A change is effective only when
both sign a written change note (email counts) stating the change to
scope, fee and dates.
7.2 Provider will not bill for work outside this SOW without a signed
change note — and will not do out-of-scope work at all without one.

## 8. People

[Lead: [Name], [Role]] · [Support: [Name], [Role]] · Subcontractors as
permitted by MSA clause 3.2; Provider remains responsible for them.

## 9. In case of conflict

9.1 This SOW is governed by the MSA. Where they conflict, the MSA wins
unless this SOW expressly overrides a clause by number. The MSA's
liability caps (clause 8), IP assignment on payment (clause 5) and
confidentiality (clause 6) apply to this project unchanged.

## Signatures

**For [Client Legal Name]:**
Signature: ____________________ Name: [Signer Name]
Title: [Signer Title] Date: [Date]

**For [Provider Legal Name]:**
Signature: ____________________ Name: [Signer Name]
Title: [Signer Title] Date: [Date]
[Where the governing law is the UK or an EU member state: the signatories
waive the authors' moral rights in the Deliverables to the extent the
law allows. See MSA clause 5.5.]

*Template for common business use — have counsel review before signing.*`,

  /* ── 04 Plain-English summaries ────────────────────────────────── */

  "04-plain-english/plain-english-summaries.md": `# Plain-English summaries — what each contract actually says

Eight bullets per contract, written for someone who has never read a
contract on purpose. Clause numbers match the templates in this pack.
Read the summary, then the contract; if a bullet and a clause seem to
disagree, the clause wins — and the summary needs fixing.

## Master Services Agreement — in 8 bullets

- **It is an umbrella.** The MSA sets the legal rules once; every
  project runs on a short SOW underneath it (clause 2).
- **Both sides owe care.** Provider works with reasonable skill and
  care; Client owes access, information and timely decisions (clause 3).
- **Money has rules.** Invoices are due in [30] days; late payment earns
  interest and can pause the work — the dates move, the price does not
  (clause 4).
- **You own what you paid for.** Deliverables transfer to Client on
  payment in full; before that, they stay Provider's (clause 5.1/5.3).
- **Secrets stay secret** for [3] years after the agreement ends —
  trade secrets for as long as they remain secret (clause 6).
- **Liability is capped** at roughly the last 12 months of fees, and
  neither side pays the other's lost profits (clause 8).
- **Either side can exit.** Cause (uncured breach, insolvency) ends it
  immediately; the survival clause list keeps the important clauses
  alive after termination (clause 10).
- **Nobody is anybody's employee.** Independent contractor, own taxes,
  own insurance (clause 11).

## Consultancy Agreement — in 8 bullets

- **One consultant, one engagement** — the work and the money are in
  Schedule 1, not the body of the contract (clause 1).
- **Independence is the point.** Consultant decides how the work is
  done, works for whomever else they like (within the brackets), and
  pays their own taxes (clause 2).
- **Fixed fee or rate, [30]-day invoices, interest when late.** Work
  can pause after [15] days overdue (clause 3).
- **Changes are signed notes.** No verbal scope, no surprise invoices
  (clause 4).
- **IP transfers on final payment**, and Consultant keeps their
  pre-existing tools and methods — Client gets a license to use them
  inside the deliverable (clause 5).
- **Consultant can be replaced** if they are out for more than [15]
  days — by a substitute Client approves, or by refund (clause 7).
- **Liability is capped** at the last 12 months of fees (or the bracket
  amount); no consequential damages either way (clause 10).
- **Either side can stop** with [30] days' notice — and pays only for
  work done to date (clause 11).

## Mutual NDA — in 8 bullets

- **Both sides share, both sides protect** — for one purpose, stated in
  clause 1. Everything flows from that purpose.
- **Confidential means marked or obviously confidential** — pricing,
  code, designs, customer data. Oral disclosures get confirmed in
  writing within [30] days (clause 2).
- **The standard exclusions** apply: public information, prior
  knowledge, independent development, third-party sources (clause 3).
- **Need-to-know only.** Representatives can receive it if they are
  bound at least as tightly — and the receiving Party answers for them
  (clause 4).
- **Compelled disclosure** (court, regulator) is allowed — with notice
  where lawful and only the minimum shared (clause 4.3).
- **Nothing is licensed.** No IP rights move; no obligation to do a
  deal exists (clause 5).
- **[2]-year term; [3]-year tail** on the secrecy promises; trade
  secrets stay protected as long as they qualify (clause 7).
- **Give it back or destroy it** on request within [30] days —
  backups excepted, still protected (clause 8).

## One-Way NDA — in 8 bullets

- **One direction only.** Discloser shares; Receiver receives and
  evaluates. If information will flow both ways, use the mutual NDA.
- **The purpose is narrow** and written down (clause 1.1); use outside
  it is a breach, full stop.
- **Receiver promises: purpose-only use, reasonable care, need-to-know
  sharing, prompt breach reporting** (clause 4).
- **No licence, ever.** Seeing code or designs grants zero rights to
  reuse them (clause 5.1).
- **No deal is implied.** Either side can walk away from the
  discussions at any time (clause 5.2).
- **[2]-year term, [3]-year tail**, trade secrets for as long as they
  remain trade secrets (clause 7.1).
- **Return or destroy on request** within [30] days; backups stay
  protected (clause 7.2).
- **Injunctions are on the table** — a leak cannot always be fixed with
  money (clause 8).

## Statement of Work — in 8 bullets

- **It is the project, on three pages**, and it only works under the
  MSA (or the consultancy agreement, if you adjusted section 9).
- **Scope is a table** — deliverables, due dates, acceptance criteria.
  If it is not in the table, it is not in the project (section 2).
- **Out of scope is written down too**, so "while you're in there" has
  somewhere to be politely filed (clause 2.1).
- **Money follows milestones**: deposit on signature, payments on
  acceptance, balance at the end (section 4).
- **Client has homework** — access, materials, a named decision-maker,
  feedback inside [5] business days (section 5).
- **Acceptance has a clock.** [10] business days to review; silence
  counts as acceptance (clause 6.2).
- **Changes are signed notes** — scope, fee and date adjustments
  together, or not at all (clause 7).
- **The MSA still governs** — liability caps, IP on payment,
  confidentiality all apply unchanged (clause 9.1).

## Which contract when

| Situation | Sign |
| --- | --- |
| Multiple projects with the same client over time | MSA + a new SOW per project |
| One engagement, one consultant, likely never repeated | Consultancy Agreement |
| Both sides will show sensitive material (partnership talks) | Mutual NDA |
| Only you are showing sensitive material (pitch, evaluation) | One-way NDA |
| A project starting under a signed MSA | SOW only — the umbrella already exists |

*Template for common business use — have counsel review before signing.*`,

  /* ── 05 Jurisdiction notes ─────────────────────────────────────── */

  "05-jurisdiction/jurisdiction-notes.md": `# Jurisdiction notes — US / UK / EU variance

Pick governing law first — it decides how every bracket below behaves.
These are drafting notes from common commercial practice, not legal
advice; the footer line applies to this file too.

## At a glance

| Topic | US | UK | EU |
| --- | --- | --- | --- |
| Liability caps (B2B) | Generally enforceable as written | Must pass the UCTA 1977 reasonableness test | National unfair-terms rules can bite; caps usually survive B2B |
| Statutory interest | Varies by state and contract | 8% + Bank of England base rate (Late Payment of Commercial Debts Act 1998) | Set by member state; EU late-payment directive sets a floor |
| Moral rights | Limited (VARA); waivable | Cannot be assigned (CDPA 1988 s.94); waive in writing | Cannot be assigned in most states; waiver culture varies |
| Non-competes | State-by-state; banned for most workers in several states (e.g. California) | Enforceable only if protecting a legitimate interest, no wider | Several states require compensation; tighter review everywhere |
| Trade-secret backbone | Defend Trade Secrets Act 2016 + state law | Trade Secrets (Enforcement) Regulations / common law | Trade Secrets Directive (EU) 2016/943, transposed nationally |
| E-signatures | ESIGN Act + UETA (most states) | eIDAS (retained UK version) | eIDAS (Regulation 910/2014) |
| Personal data | Sectoral + state laws (e.g. CCPA/CPRA) | UK GDPR + DPA 2018 | GDPR — a processing addendum is usually mandatory |
| Work-for-hire | Default doctrine for certain commissioned work | No equivalent; must assign expressly | No equivalent; must assign expressly |

## The notes, region by region

### United States

- **Governing law and venue are negotiable currency.** Large clients
  push for their home state; a neutral middle is common. Whatever you
  pick, name it in the bracket and keep it consistent across the MSA
  and every SOW.
- **Liability caps between businesses are generally enforced as
  written.** The carve-outs in MSA clause 8.3 (negligence, fraud) are
  the standard minimum; confidentiality carve-outs are negotiable.
- **Non-competes are the trap.** They are unenforceable for most
  workers in several states (California most famously), and enforcement
  varies sharply elsewhere. This pack deliberately ships a
  **non-solicit** clause instead (MSA 13.1) — it survives review far
  more often.
- **E-signature** is valid for these contracts under ESIGN/UETA; no
  witnessed wet-ink requirement applies.

### United Kingdom

- **Caps must be reasonable** under the Unfair Contract Terms Act 1977
  when one side deals on the other's written terms. A cap set at 12
  months of fees, negotiated between two businesses, is commonly
  upheld — but it is a test, not a guarantee.
- **Statutory interest beats your bracket.** Under the Late Payment of
  Commercial Debts (Interest) Act 1998, B2B late payment earns 8% plus
  base rate plus fixed compensation — you cannot contract below it for
  B2B debts. The bracket in MSA 4.3 should reference "the statutory
  rate" rather than a lower number.
- **Moral rights cannot be assigned** (Copyright, Designs and Patents
  Act 1988, s.94) — only waived, in writing. That is why the SOW
  signature block carries the waiver line when UK law governs.
- **Off-payroll (IR35 / Chapter 10)**: the consultancy agreement's
  clause 2.4 is a flag, not a determination — both sides take their own
  advice.

### European Union (and EEA)

- **Choice of law generally holds B2B** (Rome I), but mandatory
  national rules can override — consumer-facing and employment-adjacent
  contexts especially. These templates are B2B.
- **GDPR changes the NDA conversation.** Personal data is not simply
  "confidential information": if either side shares it, you usually
  need a data-processing addendum (Art. 28) or another lawful basis and
  transparency notice. NDA clauses 6 in this pack route you there; the
  GDPR-aware variants live in the extended pack.
- **Trade secrets** are harmonised by Directive (EU) 2016/943 — the
  definitions in these NDAs are drafted to match its "reasonable steps"
  standard.
- **E-signatures** under eIDAS: standard electronic signatures suffice
  for these contracts; no qualified-certificate requirement applies to
  a services agreement or NDA.
- **Non-competes need consideration** in several member states
  (compensation during the restricted period); non-solicits are treated
  more leniently almost everywhere — one more reason this pack ships a
  non-solicit only.

## Two brackets that behave differently by region

- **Late-payment interest (MSA 4.3):** write "the statutory rate" in
  the UK (you cannot opt below it B2B); a fixed 1.5%/month works in
  most US contexts; EU member states set their own statutory floors.
- **Moral rights (MSA 5.5 / SOW signature block):** in the US this is
  mostly a non-issue (limited VARA rights); in the UK/EU the waiver
  line is what makes the IP assignment complete as intended.

*Template for common business use — have counsel review before signing.*`,

  /* ── 06 Setup ──────────────────────────────────────────────────── */

  "06-setup/setup-guide.md": `# Setup guide — Contract Template Pack

Five contracts, a fill-in system, and a checklist that catches what
humans miss. This guide is the 30-minute path from download to a
signature-ready contract.

## What's in the pack

- \`01-service-agreements/\` — the Master Services Agreement (the
  umbrella, projects run under it) and the Consultancy Agreement (one
  standalone engagement)
- \`02-ndas/\` — mutual and one-way NDAs, both 2 pages in use
- \`03-sow/statement-of-work.md\` — the 3-page project document that
  runs under the MSA
- \`04-plain-english/plain-english-summaries.md\` — what each contract
  says, 8 bullets at a time (send this to your client before they ask
  "what am I signing?")
- \`05-jurisdiction/jurisdiction-notes.md\` — US/UK/EU variance notes
- \`06-setup/\` — this guide, the walkthrough link, and the
  legal-review checklist

## The fill-in system

Two kinds of placeholder, one rule each:

| Mark | Meaning | Rule before signing |
| --- | --- | --- |
| \`[square bracket]\` | A blank or a drafting choice (sometimes with \`(option a)\` /\`(option b)\`) | Fill it, choose one, or delete the clause — none survive to signature |
| \`**Bold term**\` | A defined term (Services, Deliverables, Confidential Information) | Never edit one side of a definition; check the other side still matches |

Every contract opens with the parties, the date and its identifier —
fill those first, then work top to bottom. The negotiation rule: if a
client edits a defined term, re-read every clause that uses it.

## The 30-minute path

### 1. Pick the contract (5 min)

Use the "Which contract when" table at the end of the plain-English
summaries. The short version: repeat client → MSA + SOWs; one-off
consultant → consultancy agreement; pitching under NDA → one-way
(mutual only if they share too).

### 2. Fill the header and party block (5 min)

Legal names, not trading names — the entity on the other side's
signature is the entity that owes you the money. Registered addresses
matter for the notices clause.

### 3. Make the bracket choices (10 min)

Work top to bottom. The brackets that decide money and risk, in order
of consequence: liability cap (MSA 8.2), payment days (4.1), termination
notice (10.1), non-solicit period (13.1), insurance amounts (12.1).
Everything else is mechanics.

### 4. Run the checklist (5 min)

\`legal-review-checklist.md\`, every box, every time — including the
bracket sweep that searches for "[" one last time. A template with a
surviving bracket is worse than no template.

### 5. Sign (5 min)

Countersign electronically (DocuSign, Dropbox Sign, or typed name under
a "typed signature counts" line — valid under ESIGN in the US and
eIDAS in the UK/EU for these contract types). Both sides keep a signed
copy; the SOW references the MSA number so the pair stays findable.

## How the MSA + SOW system works in practice

1. Sign the MSA once per client relationship. It holds the legal terms:
   liability, IP, confidentiality, termination.
2. Per project, send only the SOW — 3 pages, scope and money. Signature
   speed goes up because the legal conversation already happened.
3. When terms change (rates, cap), amend the MSA once in writing; new
   SOWs inherit it automatically.

[If you also use the OMNIFORGE Proposal Template Pack: its terms-insert
and payment-terms files mirror this pack's clause topics — for larger
engagements, replace the proposal's inline terms summary with a
signature of this MSA and keep proposals as the selling document only.]

## Troubleshooting

- **"The client's lawyer rewrote everything"** — expected for
  enterprise deals; your leverage is the checklist: cap, IP on payment,
  termination. Trade notice periods before you trade the cap.
- **"We're both in different countries"** — read the jurisdiction notes
  first, then pick governing law. The contract that wins is usually the
  one whose law somebody in the room understands.
- **"They want an uncapped indemnity"** — cap it as a multiple of the
  SOW fees instead (MSA 9.2's drafting note gives the wording).

## Files reference

| Path | What it is |
| --- | --- |
| \`01-service-agreements/*.md/.docx\` | MSA + consultancy agreement |
| \`02-ndas/*.md/.docx\` | mutual + one-way NDA |
| \`03-sow/statement-of-work.md\` | the project document under the MSA |
| \`04-plain-english/*.md\` | 8-bullet summaries of every contract |
| \`05-jurisdiction/*.md\` | US/UK/EU variance notes |
| \`06-setup/*\` | this guide, walkthrough, review checklist |

Questions: support@omniforge.example — answered within one business day.`,

  "06-setup/walkthrough-link.md": `# Walkthrough

An 8-minute video walkthrough of this pack — every contract annotated,
the bracket system filled live, and the checklist run against a real
example:

**→ https://omniforge.example/walkthroughs/B-TP-4**

Contents:
- 00:00 — The 30-minute setup
- 01:00 — Picking the contract: MSA+SOW vs consultancy vs NDA
- 02:10 — The bracket system, filled live on a real client
- 03:45 — The five brackets that decide money and risk
- 05:00 — MSA + SOW in practice: sign once, start fast forever
- 06:20 — Jurisdiction notes: the two brackets that move (interest, moral rights)
- 07:10 — Running the legal-review checklist

The video is hosted (not bundled) so the pack stays under 5 MB.
Questions: support@omniforge.example.
`,

  "06-setup/legal-review-checklist.md": `# Legal-review checklist — run before every signature

Print it, tick it, keep it with the signed copy. Sections A–D take ten
minutes; section E tells you when to stop and call a lawyer.

## A. The bracket sweep

- [ ] Search the document for "[" — zero matches remain
- [ ] Every (option a)/(option b) pair has exactly one survivor
- [ ] Every "[optional]" clause is either filled or deleted, not ignored
- [ ] Drafting notes (the grey-note paragraphs) are deleted
- [ ] The footer line is still the last line of the contract

## B. The parties

- [ ] Legal entity names, not trading names, on both sides
- [ ] Registered addresses present (the notices clause depends on them)
- [ ] Signer has authority to bind their entity ([check for sole traders])
- [ ] Dates are real dates, including the effective date and any term end
- [ ] SOW references the correct MSA number and date (if used)

## C. The money

- [ ] Fee amounts and totals match across every table and clause
- [ ] Payment triggers are events that actually happen (e.g. "acceptance
      of deliverable 2", not "project going well")
- [ ] Invoice terms state days, currency and the receiving account
- [ ] Late-payment interest references the statutory rate where the law
      sets a floor (UK/EU — see the jurisdiction notes)
- [ ] Taxes are stated as exclusive (or inclusive, deliberately)

## D. The risk

- [ ] Liability cap is a number you chose on purpose — not last year's
- [ ] IP assignment triggers on payment in full (not on signature, not
      never)
- [ ] Termination notice periods work both ways and you can live with
      both directions
- [ ] Survival clause list still names the clauses that exist
- [ ] Insurance amounts (if the clause survived) match a policy you hold
- [ ] Governing law and venue are named, in both the header and the
      dispute clause, and they match

## E. When to stop and call counsel

Escalate before signing — not after — if any of these is true:

- The engagement value is above [your threshold — set one now]
- Either side will share personal data (you need a processing addendum,
  not just an NDA — see the jurisdiction notes)
- Anyone asks for a non-compete (enforceability varies sharply; see the
  jurisdiction notes)
- An indemnity is uncapped, or wider than the IP defense in MSA 9.1
- You cannot explain a clause to the other side in one sentence — if
  you can't explain it, you can't enforce it knowingly

*Template for common business use — have counsel review before signing.*`,

  /* kit stub note for the extended pack */
  "EXTENDED-PACK/eu-uk-gdpr-variants.md": `# EU/UK GDPR variants — in production

Status: **in production** — not in this archive.

What the finished file will contain: GDPR-aware variants of the NDA and
MSA for EU/UK client work — a data-processing addendum template on the
Art. 28 clauses (processor obligations, sub-processor consent,
international transfers), a UK Addendum for transfers under the
UK Extension to the EU adequacy decisions, and the two NDA variants
rewritten so personal data is routed through the processing terms
instead of the confidentiality clauses.
`,
};

/* ── Try-it demo content — the same clause copy, playable in the studio ── */

export const demo: DemoContent = {
  kind: "templates",
  intro:
    "Open the flagship contracts from the pack. Fill a merge field, watch it propagate, copy the clause — this is the same clause copy you download. (In the files, fill-ins are [brackets]; here they are live merge fields.)",
  templates: [
    {
      id: "msa",
      folder: "01-service-agreements",
      title: "Master Services Agreement — clause 8, limitation of liability",
      subject: "MSA no. {{msa_number}} · governed by {{governing_law}}",
      mergeFields: [
        { key: "msa_number", sample: "MSA-2026-014" },
        { key: "client_legal_name", sample: "Meridian Goods Ltd" },
        { key: "provider_legal_name", sample: "Fieldnote Studio LLC" },
        { key: "liability_cap", sample: "the total Fees paid and payable in the 12 months before the claim" },
      ],
      body: `## 8. Limitation of liability (extract from MSA no. {{msa_number}})

8.1 Neither Party is liable for indirect, incidental, special,
consequential or punitive damages, or for lost profits, lost revenue or
lost data — even if told such loss was possible.

8.2 Each Party's total liability under or in connection with this
Agreement and its SOWs is capped at {{liability_cap}}.

8.3 Nothing in this Agreement limits liability for death or personal
injury caused by negligence, for fraud or willful misconduct, or for any
liability that cannot lawfully be limited.

Between {{client_legal_name}} and {{provider_legal_name}}, governed by
{{governing_law}} · signatures at the end of the file · the footer line
rides on every contract: "Template for common business use — have
counsel review before signing."`,
    },
    {
      id: "mutual-nda",
      folder: "02-ndas",
      title: "Mutual NDA — clause 4, the promises",
      subject: "Both sides share · purpose: {{purpose}}",
      mergeFields: [
        { key: "party_a", sample: "Meridian Goods Ltd" },
        { key: "party_b", sample: "Corvid Analytics GmbH" },
        { key: "purpose", sample: "a possible design partnership around the autumn launch" },
        { key: "survival_years", sample: "3" },
      ],
      body: `## 4. The promises (extract)

4.1 The receiving Party will: use the other Party's Confidential
Information only for {{purpose}}; protect it with at least the care used
for its own confidential information, and never less than reasonable
care; share it only with representatives who need it and who are bound
by obligations at least as protective as these.

4.3 If the law or a court requires disclosure, the receiving Party will
notify the disclosing Party promptly where lawful, disclose only what is
required, and seek confidential treatment where available.

## 7. Term and survival (extract)

7.2 The confidentiality obligations survive for {{survival_years}}
years after each disclosure; trade secrets remain protected for as long
as they qualify as trade secrets.

Between {{party_a}} and {{party_b}} — the whole NDA is 2 pages in use.`,
    },
    {
      id: "sow",
      folder: "03-sow",
      title: "Statement of Work — scope and fees",
      subject: "SOW no. {{sow_number}} · total {{total_fees}}",
      mergeFields: [
        { key: "sow_number", sample: "SOW-2026-014" },
        { key: "project_name", sample: "Checkout Rebuild" },
        { key: "total_fees", sample: "[$18,000]" },
        { key: "review_window", sample: "10 business days" },
      ],
      body: `## 2. Scope and deliverables (extract)

| # | Deliverable | What it is / includes | Due | Acceptance criteria |
| --- | --- | --- | --- | --- |
| 1 | {{project_name}} — designs | [Description and inclusions] | [Date] | [Checkable criteria] |
| 2 | Build, staging + launch | [Description and inclusions] | [Date] | [Checkable criteria] |

2.1 Explicitly out of scope: [item], [item], [item]. Anything not listed
in the table is out of scope by default; additions go through clause 7.

## 6. Acceptance (extract)

6.1 Client reviews each deliverable against the acceptance criteria in
section 2 within {{review_window}} of delivery, and either accepts in
writing or returns specific, criterion-based comments.

6.2 A deliverable is accepted on Client's written sign-off (email
counts), or at the end of the review window if no comments were received
(deemed acceptance).

**Total: {{total_fees}}** — invoiced under MSA clause 4. {{sow_number}}
runs under the MSA; the umbrella's liability, IP and confidentiality
clauses apply unchanged.`,
    },
  ],
};
