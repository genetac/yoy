import type { OfferV2 } from '../../types';

export const TP_3: OfferV2 = {
  offerId: 'B-TP-3',
  title: 'Landing Page Copy Pack',
  archetype: 'template-pack',
  family: 'template-packs',
  tagline: '8 page variants with headline + hero + features + CTA written',
  promise: '8 landing-page copy blocks (SaaS / agency / product / event), each with 3 headline variants.',
  price: { amount: 39, compareAt: 59 },
  deliverables: [
    {
      id: '01',
      title: 'SaaS landing pages (2)',
      promise: 'Hero + features + pricing + FAQ',
      files: [
        { path: '01-saas/saas-v1.md', ext: 'md', bytes: 4800, flag: 'real', source: 'TP-3/01-saas/saas-v1.md' },
        { path: '01-saas/saas-v2.md', ext: 'md', bytes: 4600, flag: 'real', source: 'TP-3/01-saas/saas-v2.md' },
      ],
    },
    {
      id: '02',
      title: 'Agency + product + event (6)',
      promise: 'One per vertical, 3 headline variants each',
      files: [
        { path: '02-verticals/agency.md', ext: 'md', bytes: 3900, flag: 'real', source: 'TP-3/02-verticals/agency.md' },
        { path: '02-verticals/product.md', ext: 'md', bytes: 4100, flag: 'real', source: 'TP-3/02-verticals/product.md' },
        { path: '02-verticals/event.md', ext: 'md', bytes: 3700, flag: 'real', source: 'TP-3/02-verticals/event.md' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 3200, flag: 'real', source: 'TP-3/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'TP-3/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1200, flag: 'real', source: 'TP-3/QUICK-START.md' },
  ],
  policies: [
    { kind: 'updates', label: 'Lifetime free updates' },
    { kind: 'guarantee-30d', label: '30-day guarantee' },
  ],
  formats: ['Markdown', 'HTML'],
  proof: {
    rating: 4.6, reviewCount: 67, soldCount: 412, version: '1.2', demoData: true,
    testimonials: [
      { persona: 'Jen', role: 'Indie Hacker', quote: 'The headline variants alone saved me a day of staring at a blank page. The SaaS v1 hero converted at 8%.', rating: 5 },
    ],
  },
  authored: true,
  edition: { number: 11, of: 500, year: 2026 },
};

export const TP_4: OfferV2 = {
  offerId: 'B-TP-4',
  title: 'Social Caption Pack',
  archetype: 'template-pack',
  family: 'template-packs',
  tagline: '60 caption templates + hashtag banks for 4 platforms',
  promise: '60 caption templates (LinkedIn / Instagram / X / TikTok) with hashtag banks and CTA variants.',
  price: { amount: 29, compareAt: 45 },
  deliverables: [
    {
      id: '01',
      title: 'Platform captions (4 × 15)',
      promise: '15 per platform, tagged by post type',
      files: [
        { path: '01-captions/linkedin.md', ext: 'md', bytes: 5400, flag: 'real', source: 'TP-4/01-captions/linkedin.md' },
        { path: '01-captions/instagram.md', ext: 'md', bytes: 4800, flag: 'real', source: 'TP-4/01-captions/instagram.md' },
        { path: '01-captions/x.md', ext: 'md', bytes: 3200, flag: 'real', source: 'TP-4/01-captions/x.md' },
        { path: '01-captions/tiktok.md', ext: 'md', bytes: 3600, flag: 'real', source: 'TP-4/01-captions/tiktok.md' },
      ],
    },
    {
      id: '02',
      title: 'Hashtag banks',
      promise: 'Tagged by niche and reach tier',
      files: [
        { path: '02-hashtags/hashtag-bank.csv', ext: 'csv', bytes: 4200, flag: 'real', source: 'TP-4/02-hashtags/hashtag-bank.csv' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 2800, flag: 'real', source: 'TP-4/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'TP-4/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1000, flag: 'real', source: 'TP-4/QUICK-START.md' },
  ],
  policies: [{ kind: 'updates', label: 'Lifetime free updates' }],
  formats: ['Markdown', 'CSV'],
  proof: {
    rating: 4.5, reviewCount: 54, soldCount: 298, version: '1.1', demoData: true,
    testimonials: [
      { persona: 'Mira', role: 'Content Manager', quote: 'Finally a caption pack that does not sound like a robot wrote it. The LinkedIn hooks are sharp.', rating: 4 },
    ],
  },
  authored: true,
  edition: { number: 7, of: 500, year: 2026 },
};
