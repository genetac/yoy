import type { OfferV2 } from '../../types';

/**
 * TP-1 · Email Template Pack
 * The reference kit every other kit copies.
 */
export const TP_1: OfferV2 = {
  offerId: 'B-TP-1',
  title: 'Email Template Pack',
  archetype: 'template-pack',
  family: 'template-packs',
  tagline: '20 cold + welcome + follow-up emails, written and ready',
  promise: '20 hand-written email templates across 4 series, plus a 120-row subject-line bank.',
  price: { amount: 49, compareAt: 79 },
  deliverables: [
    {
      id: '01',
      title: 'Welcome series (4 emails)',
      promise: 'Day 0 / 2 / 4 / 6 onboarding sequence',
      files: [
        { path: '01-welcome-series/day-0-welcome.md', ext: 'md', bytes: 3200, flag: 'real', source: 'TP-1/01-welcome-series/day-0-welcome.md' },
        { path: '01-welcome-series/day-0-welcome.docx', ext: 'docx', bytes: 14800, flag: 'real', source: 'TP-1/01-welcome-series/day-0-welcome.md' },
        { path: '01-welcome-series/day-2-value.md', ext: 'md', bytes: 3400, flag: 'real', source: 'TP-1/01-welcome-series/day-2-value.md' },
        { path: '01-welcome-series/day-2-value.docx', ext: 'docx', bytes: 15200, flag: 'real', source: 'TP-1/01-welcome-series/day-2-value.md' },
        { path: '01-welcome-series/day-4-story.md', ext: 'md', bytes: 3800, flag: 'real', source: 'TP-1/01-welcome-series/day-4-story.md' },
        { path: '01-welcome-series/day-4-story.docx', ext: 'docx', bytes: 16400, flag: 'real', source: 'TP-1/01-welcome-series/day-4-story.md' },
        { path: '01-welcome-series/day-6-offer.md', ext: 'md', bytes: 2900, flag: 'real', source: 'TP-1/01-welcome-series/day-6-offer.md' },
        { path: '01-welcome-series/day-6-offer.docx', ext: 'docx', bytes: 13100, flag: 'real', source: 'TP-1/01-welcome-series/day-6-offer.md' },
      ],
    },
    {
      id: '02',
      title: 'Cold outreach (4 emails + merge map)',
      promise: 'Opener variants + merge-field map',
      files: [
        { path: '02-cold-outreach/opener-problem.md', ext: 'md', bytes: 2600, flag: 'real', source: 'TP-1/02-cold-outreach/opener-problem.md' },
        { path: '02-cold-outreach/opener-referral.md', ext: 'md', bytes: 2400, flag: 'real', source: 'TP-1/02-cold-outreach/opener-referral.md' },
        { path: '02-cold-outreach/opener-trigger.md', ext: 'md', bytes: 2800, flag: 'real', source: 'TP-1/02-cold-outreach/opener-trigger.md' },
        { path: '02-cold-outreach/merge-field-map.csv', ext: 'csv', bytes: 1800, flag: 'real', source: 'TP-1/02-cold-outreach/merge-field-map.csv' },
      ],
    },
    {
      id: '03',
      title: 'Follow-up (4 emails)',
      promise: 'Day 3 / 7 / 14 + win-back',
      files: [
        { path: '03-follow-up/day-3.md', ext: 'md', bytes: 2100, flag: 'real', source: 'TP-1/03-follow-up/day-3.md' },
        { path: '03-follow-up/day-7.md', ext: 'md', bytes: 2300, flag: 'real', source: 'TP-1/03-follow-up/day-7.md' },
        { path: '03-follow-up/day-14.md', ext: 'md', bytes: 2500, flag: 'real', source: 'TP-1/03-follow-up/day-14.md' },
        { path: '03-follow-up/win-back.md', ext: 'md', bytes: 2700, flag: 'real', source: 'TP-1/03-follow-up/win-back.md' },
      ],
    },
    {
      id: '04',
      title: 'Subject-line bank (120 rows)',
      promise: 'Tagged by intent: curiosity / urgency / value / social proof',
      files: [
        { path: '04-subject-lines/subject-line-bank.csv', ext: 'csv', bytes: 9600, flag: 'real', source: 'TP-1/04-subject-lines/subject-line-bank.csv' },
      ],
    },
    {
      id: '05',
      title: 'Setup guide + walkthrough link',
      promise: 'How to load templates into your ESP',
      files: [
        { path: '05-setup/setup-guide.pdf', ext: 'pdf', bytes: 84000, flag: 'real', source: 'TP-1/05-setup/setup-guide.md' },
        { path: '05-setup/walkthrough-link.md', ext: 'md', bytes: 400, flag: 'real', source: 'TP-1/05-setup/walkthrough-link.md' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 4200, flag: 'real', source: 'TP-1/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'TP-1/LICENSE.md' },
    { path: 'CHANGELOG.md', ext: 'md', bytes: 800, flag: 'real', source: 'TP-1/CHANGELOG.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1600, flag: 'real', source: 'TP-1/QUICK-START.md' },
  ],
  policies: [
    { kind: 'updates', label: 'Lifetime free updates' },
    { kind: 'guarantee-30d', label: '30-day guarantee' },
    { kind: 'license-commercial', label: 'Commercial license' },
  ],
  formats: ['Markdown', 'DOCX', 'CSV', 'PDF'],
  proof: {
    rating: 4.8,
    reviewCount: 142,
    soldCount: 1284,
    version: '2.3',
    demoData: true,
    testimonials: [
      { persona: 'Sarah', role: 'Head of Growth, B2B SaaS', quote: 'The welcome series alone paid for the pack in the first week. Day-4 story email has a 47% open rate.', rating: 5 },
      { persona: 'Marcus', role: 'Solo Founder', quote: 'I finally stopped dreading cold outreach. The opener variants are sharp without being pushy.', rating: 5 },
      { persona: 'Lin', role: 'Marketing Director', quote: 'The subject-line bank is worth the price on its own. 120 rows, tagged by intent — we A/B test two every send.', rating: 4 },
    ],
  },
  authored: true,
  edition: { number: 48, of: 500, year: 2026 },
};

export const TP_2: OfferV2 = {
  offerId: 'B-TP-2',
  title: 'Slide Deck Template Pack',
  archetype: 'template-pack',
  family: 'template-packs',
  tagline: '12 investor + sales + report decks with real narrative arcs',
  promise: '12 slide decks across pitch / sales / quarterly report, each with a written narrative arc.',
  price: { amount: 59, compareAt: 89 },
  deliverables: [
    {
      id: '01',
      title: 'Pitch decks (4)',
      promise: '10-slide investor narrative',
      files: [
        { path: '01-pitch/problem-solution.md', ext: 'md', bytes: 3800, flag: 'real', source: 'TP-2/01-pitch/problem-solution.md' },
        { path: '01-pitch/market-traction.md', ext: 'md', bytes: 3400, flag: 'real', source: 'TP-2/01-pitch/market-traction.md' },
        { path: '01-pitch/team-ask.md', ext: 'md', bytes: 2900, flag: 'real', source: 'TP-2/01-pitch/team-ask.md' },
        { path: '01-pitch/cover-slide.pptx', ext: 'pptx', bytes: 240000, flag: 'extended' },
      ],
    },
    {
      id: '02',
      title: 'Sales decks (4)',
      promise: 'Demo + objection handling + close',
      files: [
        { path: '02-sales/demo-flow.md', ext: 'md', bytes: 4200, flag: 'real', source: 'TP-2/02-sales/demo-flow.md' },
        { path: '02-sales/objection-cards.md', ext: 'md', bytes: 3600, flag: 'real', source: 'TP-2/02-sales/objection-cards.md' },
      ],
    },
    {
      id: '03',
      title: 'Quarterly report (4)',
      promise: 'OKR review format',
      files: [
        { path: '03-report/q-review-template.md', ext: 'md', bytes: 3100, flag: 'real', source: 'TP-2/03-report/q-review-template.md' },
        { path: '03-report/metrics-dashboard.md', ext: 'md', bytes: 2800, flag: 'real', source: 'TP-2/03-report/metrics-dashboard.md' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 3800, flag: 'real', source: 'TP-2/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'TP-2/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1400, flag: 'real', source: 'TP-2/QUICK-START.md' },
  ],
  policies: [
    { kind: 'updates', label: 'Lifetime free updates' },
    { kind: 'license-commercial', label: 'Commercial license' },
  ],
  formats: ['Markdown', 'PPTX', 'Keynote'],
  proof: {
    rating: 4.7,
    reviewCount: 89,
    soldCount: 642,
    version: '1.4',
    demoData: true,
    testimonials: [
      { persona: 'David', role: 'Pre-seed Founder', quote: 'Raised 500k using the problem-solution arc. The narrative structure forced me to be clear.', rating: 5 },
      { persona: 'Anita', role: 'Sales Lead', quote: 'The objection cards are gold. We closed three deals this month by following the demo flow.', rating: 4 },
    ],
  },
  authored: true,
  edition: { number: 23, of: 500, year: 2026 },
};
