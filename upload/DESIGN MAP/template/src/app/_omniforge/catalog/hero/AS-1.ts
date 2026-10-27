import type { OfferV2 } from '../../types';

export const AS_1: OfferV2 = {
  offerId: 'B-AS-1',
  title: 'Maturity Assessment',
  archetype: 'assessment',
  family: 'assessments',
  tagline: '25-question quiz with weighted scoring and 4 result bands',
  promise: 'A 25-question maturity assessment with weighted scoring, 4 result bands (Platinum/Gold/Silver/Bronze), and a sealed-medal result card.',
  price: { amount: 55, compareAt: 85 },
  deliverables: [
    {
      id: '01',
      title: 'Quiz engine (offline HTML)',
      promise: 'Runs by double-clicking, no server',
      files: [
        { path: '01-quiz/maturity-quiz.html', ext: 'html', bytes: 28000, flag: 'real', source: 'AS-1/01-quiz/maturity-quiz.html' },
      ],
    },
    {
      id: '02',
      title: 'Question bank (25 questions)',
      promise: 'JSON + CSV, weighted options',
      files: [
        { path: '02-questions/questions.json', ext: 'json', bytes: 14000, flag: 'real', source: 'AS-1/02-questions/questions.json' },
        { path: '02-questions/questions.csv', ext: 'csv', bytes: 9800, flag: 'real', source: 'AS-1/02-questions/questions.csv' },
      ],
    },
    {
      id: '03',
      title: 'Scoring + result page',
      promise: 'Formula doc + branded result HTML',
      files: [
        { path: '03-scoring/scoring-formula.md', ext: 'md', bytes: 3600, flag: 'real', source: 'AS-1/03-scoring/scoring-formula.md' },
        { path: '03-scoring/result-page.html', ext: 'html', bytes: 16000, flag: 'real', source: 'AS-1/03-scoring/result-page.html' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 3800, flag: 'real', source: 'AS-1/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'AS-1/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1600, flag: 'real', source: 'AS-1/QUICK-START.md' },
  ],
  policies: [
    { kind: 'updates', label: 'Lifetime free updates' },
    { kind: 'guarantee-30d', label: '30-day guarantee' },
    { kind: 'license-commercial', label: 'Commercial license' },
  ],
  formats: ['HTML', 'JSON', 'CSV', 'Markdown'],
  proof: {
    rating: 4.9, reviewCount: 47, soldCount: 289, version: '2.0', demoData: true,
    testimonials: [
      { persona: 'Carlos', role: 'Consultant', quote: 'I use this as a lead magnet. The sealed-medal result card gets shared on LinkedIn — free distribution.', rating: 5 },
      { persona: 'Wendy', role: 'Agency Owner', quote: 'The weighted scoring is the real value. My clients finally get a number they can track over time.', rating: 5 },
    ],
  },
  authored: true,
  edition: { number: 22, of: 500, year: 2026 },
};

export const AS_2: OfferV2 = {
  offerId: 'B-AS-2',
  title: 'Brand Health Quiz',
  archetype: 'assessment',
  family: 'assessments',
  tagline: '20 questions across 5 brand dimensions with radar result',
  promise: 'A 20-question brand health quiz scored across 5 dimensions (clarity / consistency / voice / visual / trust), with a radar-chart result.',
  price: { amount: 45, compareAt: 69 },
  deliverables: [
    {
      id: '01',
      title: 'Quiz engine + questions',
      promise: 'Offline HTML + 20-question JSON',
      files: [
        { path: '01-quiz/brand-quiz.html', ext: 'html', bytes: 26000, flag: 'real', source: 'AS-2/01-quiz/brand-quiz.html' },
        { path: '01-quiz/questions.json', ext: 'json', bytes: 12000, flag: 'real', source: 'AS-2/01-quiz/questions.json' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 3200, flag: 'real', source: 'AS-2/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'AS-2/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1400, flag: 'real', source: 'AS-2/QUICK-START.md' },
  ],
  policies: [{ kind: 'updates', label: 'Lifetime free updates' }, { kind: 'guarantee-30d', label: '30-day guarantee' }],
  formats: ['HTML', 'JSON', 'Markdown'],
  proof: {
    rating: 4.7, reviewCount: 31, soldCount: 167, version: '1.2', demoData: true,
    testimonials: [
      { persona: 'Iris', role: 'Brand Strategist', quote: 'The 5-dimension radar is the kind of result clients screenshot and share. Great lead gen.', rating: 5 },
    ],
  },
  authored: true,
  edition: { number: 12, of: 500, year: 2026 },
};

export const AS_3: OfferV2 = {
  offerId: 'B-AS-3',
  title: 'Team Readiness Assessment',
  archetype: 'assessment',
  family: 'assessments',
  tagline: '15 questions for hiring managers, scored on 4 bands',
  promise: 'A 15-question team-readiness quiz for hiring managers, with weighted scoring and 4 readiness bands.',
  price: { amount: 39, compareAt: 59 },
  deliverables: [
    {
      id: '01',
      title: 'Quiz engine + questions',
      promise: 'Offline HTML + 15-question JSON',
      files: [
        { path: '01-quiz/readiness-quiz.html', ext: 'html', bytes: 24000, flag: 'real', source: 'AS-3/01-quiz/readiness-quiz.html' },
        { path: '01-quiz/questions.json', ext: 'json', bytes: 9000, flag: 'real', source: 'AS-3/01-quiz/questions.json' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 3000, flag: 'real', source: 'AS-3/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'AS-3/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1300, flag: 'real', source: 'AS-3/QUICK-START.md' },
  ],
  policies: [{ kind: 'updates', label: 'Lifetime free updates' }],
  formats: ['HTML', 'JSON', 'Markdown'],
  proof: {
    rating: 4.6, reviewCount: 24, soldCount: 134, version: '1.1', demoData: true,
    testimonials: [
      { persona: 'Omar', role: 'Engineering Manager', quote: 'Used this before a hiring sprint. Caught a gap in our onboarding I would have missed.', rating: 4 },
    ],
  },
  authored: true,
  edition: { number: 8, of: 500, year: 2026 },
};

export const AS_4: OfferV2 = {
  offerId: 'B-AS-4',
  title: 'Pricing Power Score',
  archetype: 'assessment',
  family: 'assessments',
  tagline: '12 questions that tell you if you can raise prices',
  promise: 'A 12-question pricing-power assessment scored on 4 bands, with a result card showing how much you can raise.',
  price: { amount: 35, compareAt: 49 },
  deliverables: [
    {
      id: '01',
      title: 'Quiz engine + questions',
      promise: 'Offline HTML + 12-question JSON',
      files: [
        { path: '01-quiz/pricing-quiz.html', ext: 'html', bytes: 22000, flag: 'real', source: 'AS-4/01-quiz/pricing-quiz.html' },
        { path: '01-quiz/questions.json', ext: 'json', bytes: 7800, flag: 'real', source: 'AS-4/01-quiz/questions.json' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 2800, flag: 'real', source: 'AS-4/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'AS-4/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1200, flag: 'real', source: 'AS-4/QUICK-START.md' },
  ],
  policies: [{ kind: 'updates', label: 'Lifetime free updates' }],
  formats: ['HTML', 'JSON', 'Markdown'],
  proof: {
    rating: 4.8, reviewCount: 19, soldCount: 98, version: '1.0', demoData: true,
    testimonials: [
      { persona: 'Daria', role: 'Product Consultant', quote: 'The result card told my client to raise prices 18%. They did. Revenue jumped. I looked like a genius.', rating: 5 },
    ],
  },
  authored: true,
  edition: { number: 4, of: 500, year: 2026 },
};
