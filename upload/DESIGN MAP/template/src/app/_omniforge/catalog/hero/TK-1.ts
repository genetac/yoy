import type { OfferV2 } from '../../types';

export const TK_1: OfferV2 = {
  offerId: 'B-TK-1',
  title: 'SEO Quick-Check Toolkit',
  archetype: 'toolkit',
  family: 'toolkits',
  tagline: '3 working HTML tools: title/meta scorer, keyword density, SERP preview',
  promise: '3 single-file HTML tools that run offline — title/meta length scorer, keyword-density checker, SERP preview generator.',
  price: { amount: 35, compareAt: 55 },
  deliverables: [
    {
      id: '01',
      title: 'SEO tools (3 HTML files)',
      promise: 'Run by double-clicking, no server needed',
      files: [
        { path: '01-tools/title-meta-scorer.html', ext: 'html', bytes: 18000, flag: 'real', source: 'TK-1/01-tools/title-meta-scorer.html' },
        { path: '01-tools/keyword-density.html', ext: 'html', bytes: 14000, flag: 'real', source: 'TK-1/01-tools/keyword-density.html' },
        { path: '01-tools/serp-preview.html', ext: 'html', bytes: 12000, flag: 'real', source: 'TK-1/01-tools/serp-preview.html' },
      ],
    },
    {
      id: '02',
      title: 'Formula cheatsheet + setup',
      promise: 'How each score is computed',
      files: [
        { path: '02-formulas/cheatsheet.md', ext: 'md', bytes: 4200, flag: 'real', source: 'TK-1/02-formulas/cheatsheet.md' },
        { path: '02-formulas/setup-guide.md', ext: 'md', bytes: 1800, flag: 'real', source: 'TK-1/02-formulas/setup-guide.md' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 3400, flag: 'real', source: 'TK-1/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'TK-1/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1400, flag: 'real', source: 'TK-1/QUICK-START.md' },
  ],
  policies: [
    { kind: 'updates', label: 'Lifetime free updates' },
    { kind: 'guarantee-30d', label: '30-day guarantee' },
    { kind: 'license-commercial', label: 'Commercial license' },
  ],
  formats: ['HTML', 'Markdown'],
  proof: {
    rating: 4.9, reviewCount: 78, soldCount: 534, version: '1.3', demoData: true,
    testimonials: [
      { persona: 'Tom', role: 'Freelance SEO Consultant', quote: 'The title/meta scorer caught 4 over-length titles on my client audit. Paid for itself in 10 minutes.', rating: 5 },
      { persona: 'Priya', role: 'In-house SEO', quote: 'The SERP preview is more accurate than the paid tool I was using. The keyword density formula is sound.', rating: 5 },
    ],
  },
  authored: true,
  edition: { number: 31, of: 500, year: 2026 },
};

export const TK_2: OfferV2 = {
  offerId: 'B-TK-2',
  title: 'Design Audit Toolkit',
  archetype: 'toolkit',
  family: 'toolkits',
  tagline: 'WCAG contrast checker + spacing ruler + type-scale generator',
  promise: '3 working design-audit tools: WCAG 2.2 contrast checker (real luminance formula), spacing ruler, type-scale generator.',
  price: { amount: 35, compareAt: 55 },
  deliverables: [
    {
      id: '01',
      title: 'Audit tools (3 HTML files)',
      promise: 'Real formulas, not guesses',
      files: [
        { path: '01-tools/contrast-checker.html', ext: 'html', bytes: 16000, flag: 'real', source: 'TK-2/01-tools/contrast-checker.html' },
        { path: '01-tools/spacing-ruler.html', ext: 'html', bytes: 10000, flag: 'real', source: 'TK-2/01-tools/spacing-ruler.html' },
        { path: '01-tools/type-scale.html', ext: 'html', bytes: 11000, flag: 'real', source: 'TK-2/01-tools/type-scale.html' },
      ],
    },
    {
      id: '02',
      title: 'WCAG reference + setup',
      promise: '2.2 AA/AAA thresholds explained',
      files: [
        { path: '02-reference/wcag-2.2.md', ext: 'md', bytes: 5200, flag: 'real', source: 'TK-2/02-reference/wcag-2.2.md' },
        { path: '02-reference/setup-guide.md', ext: 'md', bytes: 1600, flag: 'real', source: 'TK-2/02-reference/setup-guide.md' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 3200, flag: 'real', source: 'TK-2/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'TK-2/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1300, flag: 'real', source: 'TK-2/QUICK-START.md' },
  ],
  policies: [
    { kind: 'updates', label: 'Lifetime free updates' },
    { kind: 'guarantee-30d', label: '30-day guarantee' },
  ],
  formats: ['HTML', 'Markdown'],
  proof: {
    rating: 4.8, reviewCount: 61, soldCount: 387, version: '1.2', demoData: true,
    testimonials: [
      { persona: 'Kai', role: 'Product Designer', quote: 'The contrast checker uses the real relative-luminance formula. I trust it over the browser devtools now.', rating: 5 },
    ],
  },
  authored: true,
  edition: { number: 19, of: 500, year: 2026 },
};

export const TK_3: OfferV2 = {
  offerId: 'B-TK-3',
  title: 'Regex Toolkit',
  archetype: 'toolkit',
  family: 'toolkits',
  tagline: 'Live regex tester + 40 tested patterns + cheat sheet',
  promise: 'Single-file regex tester with live match highlighting, plus 40 battle-tested patterns for email/phone/date/URL/IP.',
  price: { amount: 25, compareAt: 39 },
  deliverables: [
    {
      id: '01',
      title: 'Regex tester + pattern bank',
      promise: 'Runs offline, no dependencies',
      files: [
        { path: '01-tools/regex-tester.html', ext: 'html', bytes: 22000, flag: 'real', source: 'TK-3/01-tools/regex-tester.html' },
        { path: '01-tools/pattern-bank.csv', ext: 'csv', bytes: 6800, flag: 'real', source: 'TK-3/01-tools/pattern-bank.csv' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 2800, flag: 'real', source: 'TK-3/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'TK-3/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1100, flag: 'real', source: 'TK-3/QUICK-START.md' },
  ],
  policies: [{ kind: 'updates', label: 'Lifetime free updates' }],
  formats: ['HTML', 'CSV', 'Markdown'],
  proof: {
    rating: 4.7, reviewCount: 43, soldCount: 256, version: '1.1', demoData: true,
    testimonials: [
      { persona: 'Raj', role: 'Backend Developer', quote: '40 patterns that actually work. The email regex is the best I have used — no false positives.', rating: 5 },
    ],
  },
  authored: true,
  edition: { number: 14, of: 500, year: 2026 },
};

export const TK_4: OfferV2 = {
  offerId: 'B-TK-4',
  title: 'Headline Scorer Toolkit',
  archetype: 'toolkit',
  family: 'toolkits',
  tagline: 'Score headlines on length, power words, numbers, sentiment',
  promise: 'Single-file headline scorer with a real 4-factor formula (length / power words / number present / sentiment).',
  price: { amount: 19, compareAt: 29 },
  deliverables: [
    {
      id: '01',
      title: 'Headline scorer tool',
      promise: 'Live score as you type',
      files: [
        { path: '01-tools/headline-scorer.html', ext: 'html', bytes: 15000, flag: 'real', source: 'TK-4/01-tools/headline-scorer.html' },
      ],
    },
    {
      id: '02',
      title: 'Power-word bank',
      promise: '180 words tagged by emotion',
      files: [
        { path: '02-bank/power-words.csv', ext: 'csv', bytes: 5400, flag: 'real', source: 'TK-4/02-bank/power-words.csv' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 2400, flag: 'real', source: 'TK-4/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'TK-4/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1000, flag: 'real', source: 'TK-4/QUICK-START.md' },
  ],
  policies: [{ kind: 'updates', label: 'Lifetime free updates' }],
  formats: ['HTML', 'CSV', 'Markdown'],
  proof: {
    rating: 4.6, reviewCount: 38, soldCount: 198, version: '1.0', demoData: true,
    testimonials: [
      { persona: 'Lia', role: 'Content Writer', quote: 'The sentiment check caught a negative undertone in a headline I thought was positive. Eye-opening.', rating: 4 },
    ],
  },
  authored: true,
  edition: { number: 6, of: 500, year: 2026 },
};
