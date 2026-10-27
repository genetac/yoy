import type { OfferV2 } from '../../types';

export const WK_1: OfferV2 = {
  offerId: 'B-WK-1',
  title: 'Dental Practice Website Kit',
  archetype: 'website-kit',
  family: 'website-kits',
  tagline: '5 MDX pages of real dental copy + booking flow + local-SEO schema',
  promise: 'A 5-page dental website (Home / Services / Team / About / Contact) with real MDX copy, a booking form flow, JSON-LD schema, and a deploy guide.',
  price: { amount: 89, compareAt: 129 },
  deliverables: [
    {
      id: '01',
      title: 'Pages (5 MDX)',
      promise: 'Real dental copy, not lorem ipsum',
      files: [
        { path: '01-pages/home.mdx', ext: 'mdx', bytes: 8400, flag: 'real', source: 'WK-1/01-pages/home.mdx' },
        { path: '01-pages/services.mdx', ext: 'mdx', bytes: 6200, flag: 'real', source: 'WK-1/01-pages/services.mdx' },
        { path: '01-pages/team.mdx', ext: 'mdx', bytes: 4800, flag: 'real', source: 'WK-1/01-pages/team.mdx' },
        { path: '01-pages/about.mdx', ext: 'mdx', bytes: 5400, flag: 'real', source: 'WK-1/01-pages/about.mdx' },
        { path: '01-pages/contact.mdx', ext: 'mdx', bytes: 3600, flag: 'real', source: 'WK-1/01-pages/contact.mdx' },
      ],
    },
    {
      id: '02',
      title: 'Booking flow + SEO',
      promise: 'Form validation + JSON-LD + sitemap',
      files: [
        { path: '02-flow/booking-form.tsx', ext: 'tsx', bytes: 6800, flag: 'real', source: 'WK-1/02-flow/booking-form.tsx' },
        { path: '02-flow/local-seo-checklist.md', ext: 'md', bytes: 4200, flag: 'real', source: 'WK-1/02-flow/local-seo-checklist.md' },
        { path: '02-flow/schema.jsonld', ext: 'jsonld', bytes: 2400, flag: 'real', source: 'WK-1/02-flow/schema.jsonld' },
      ],
    },
    {
      id: '03',
      title: 'Config + deploy',
      promise: 'Robots + sitemap + deploy guide',
      files: [
        { path: '03-config/robots.txt', ext: 'txt', bytes: 200, flag: 'real', source: 'WK-1/03-config/robots.txt' },
        { path: '03-config/sitemap.xml', ext: 'xml', bytes: 800, flag: 'real', source: 'WK-1/03-config/sitemap.xml' },
        { path: '03-config/deploy-guide.md', ext: 'md', bytes: 3400, flag: 'real', source: 'WK-1/03-config/deploy-guide.md' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 4200, flag: 'real', source: 'WK-1/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'WK-1/LICENSE.md' },
    { path: 'CHANGELOG.md', ext: 'md', bytes: 800, flag: 'real', source: 'WK-1/CHANGELOG.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1800, flag: 'real', source: 'WK-1/QUICK-START.md' },
  ],
  policies: [
    { kind: 'updates', label: 'Lifetime free updates' },
    { kind: 'guarantee-30d', label: '30-day guarantee' },
    { kind: 'license-commercial', label: 'Commercial license' },
  ],
  formats: ['MDX', 'TSX', 'JSON-LD', 'Markdown'],
  proof: {
    rating: 4.9, reviewCount: 38, soldCount: 214, version: '1.4', demoData: true,
    testimonials: [
      { persona: 'Dr. Park', role: 'Practice Owner', quote: 'The copy sounded like me, not a template. We booked 14 new patients in the first month.', rating: 5 },
      { persona: 'Lina', role: 'Dental Consultant', quote: 'The local-SEO checklist alone is worth the price. My client ranks #1 for “dentist near me” now.', rating: 5 },
    ],
  },
  authored: true,
  edition: { number: 16, of: 500, year: 2026 },
  vertical: 'dental',
};

export const WK_2: OfferV2 = {
  offerId: 'B-WK-2',
  title: 'Gym Studio Website Kit',
  archetype: 'website-kit',
  family: 'website-kits',
  tagline: '5 pages with class schedules + trial-pass flow + member stories',
  promise: 'A 5-page gym website with real copy, class schedule layout, trial-pass form, and member-story blocks.',
  price: { amount: 89, compareAt: 129 },
  deliverables: [
    {
      id: '01',
      title: 'Pages (5 MDX)',
      promise: 'Gym-specific copy, class schedule',
      files: [
        { path: '01-pages/home.mdx', ext: 'mdx', bytes: 7800, flag: 'real', source: 'WK-2/01-pages/home.mdx' },
        { path: '01-pages/schedule.mdx', ext: 'mdx', bytes: 5400, flag: 'real', source: 'WK-2/01-pages/schedule.mdx' },
        { path: '01-pages/coaches.mdx', ext: 'mdx', bytes: 4600, flag: 'real', source: 'WK-2/01-pages/coaches.mdx' },
        { path: '01-pages/pricing.mdx', ext: 'mdx', bytes: 3800, flag: 'real', source: 'WK-2/01-pages/pricing.mdx' },
        { path: '01-pages/contact.mdx', ext: 'mdx', bytes: 3200, flag: 'real', source: 'WK-2/01-pages/contact.mdx' },
      ],
    },
    {
      id: '02',
      title: 'Trial-pass flow',
      promise: 'Form + confirmation + follow-up',
      files: [
        { path: '02-flow/trial-pass-form.tsx', ext: 'tsx', bytes: 5400, flag: 'real', source: 'WK-2/02-flow/trial-pass-form.tsx' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 3800, flag: 'real', source: 'WK-2/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'WK-2/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1600, flag: 'real', source: 'WK-2/QUICK-START.md' },
  ],
  policies: [{ kind: 'updates', label: 'Lifetime free updates' }, { kind: 'guarantee-30d', label: '30-day guarantee' }],
  formats: ['MDX', 'TSX', 'Markdown'],
  proof: {
    rating: 4.7, reviewCount: 29, soldCount: 156, version: '1.2', demoData: true,
    testimonials: [
      { persona: 'Marcus', role: 'Gym Owner', quote: 'Trial-pass conversions doubled. The form flow is frictionless.', rating: 5 },
    ],
  },
  authored: true,
  edition: { number: 10, of: 500, year: 2026 },
  vertical: 'gym',
};

export const WK_3: OfferV2 = {
  offerId: 'B-WK-3',
  title: 'Law Practice Website Kit',
  archetype: 'website-kit',
  family: 'website-kits',
  tagline: '5 pages with practice areas + consultation booking + authority copy',
  promise: 'A 5-page law firm website with practice-area pages, consultation booking, attorney bios, and authority-building copy.',
  price: { amount: 99, compareAt: 149 },
  deliverables: [
    {
      id: '01',
      title: 'Pages (5 MDX)',
      promise: 'Authority copy, not marketing fluff',
      files: [
        { path: '01-pages/home.mdx', ext: 'mdx', bytes: 8200, flag: 'real', source: 'WK-3/01-pages/home.mdx' },
        { path: '01-pages/practice-areas.mdx', ext: 'mdx', bytes: 6800, flag: 'real', source: 'WK-3/01-pages/practice-areas.mdx' },
        { path: '01-pages/attorneys.mdx', ext: 'mdx', bytes: 5200, flag: 'real', source: 'WK-3/01-pages/attorneys.mdx' },
        { path: '01-pages/results.mdx', ext: 'mdx', bytes: 4800, flag: 'real', source: 'WK-3/01-pages/results.mdx' },
        { path: '01-pages/contact.mdx', ext: 'mdx', bytes: 3600, flag: 'real', source: 'WK-3/01-pages/contact.mdx' },
      ],
    },
    {
      id: '02',
      title: 'Consultation flow',
      promise: 'Intake form + conflict check',
      files: [
        { path: '02-flow/consultation-form.tsx', ext: 'tsx', bytes: 7200, flag: 'real', source: 'WK-3/02-flow/consultation-form.tsx' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 4000, flag: 'real', source: 'WK-3/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'WK-3/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1700, flag: 'real', source: 'WK-3/QUICK-START.md' },
  ],
  policies: [{ kind: 'updates', label: 'Lifetime free updates' }, { kind: 'license-commercial', label: 'Commercial license' }],
  formats: ['MDX', 'TSX', 'Markdown'],
  proof: {
    rating: 4.8, reviewCount: 22, soldCount: 98, version: '1.1', demoData: true,
    testimonials: [
      { persona: 'Hannah', role: 'Managing Partner', quote: 'The authority copy is what sold me. Sounds like a lawyer wrote it, not a marketing intern.', rating: 5 },
    ],
  },
  authored: true,
  edition: { number: 6, of: 500, year: 2026 },
  vertical: 'law',
};

export const WK_4: OfferV2 = {
  offerId: 'B-WK-4',
  title: 'Restaurant Website Kit',
  archetype: 'website-kit',
  family: 'website-kits',
  tagline: '5 pages with menu + reservation flow + private-events copy',
  promise: 'A 5-page restaurant website with menu layout, reservation flow, private-events copy, and a chef-story block.',
  price: { amount: 89, compareAt: 129 },
  deliverables: [
    {
      id: '01',
      title: 'Pages (5 MDX)',
      promise: 'Real menu copy + chef narrative',
      files: [
        { path: '01-pages/home.mdx', ext: 'mdx', bytes: 7600, flag: 'real', source: 'WK-4/01-pages/home.mdx' },
        { path: '01-pages/menu.mdx', ext: 'mdx', bytes: 6400, flag: 'real', source: 'WK-4/01-pages/menu.mdx' },
        { path: '01-pages/chef.mdx', ext: 'mdx', bytes: 4800, flag: 'real', source: 'WK-4/01-pages/chef.mdx' },
        { path: '01-pages/private-events.mdx', ext: 'mdx', bytes: 4200, flag: 'real', source: 'WK-4/01-pages/private-events.mdx' },
        { path: '01-pages/reserve.mdx', ext: 'mdx', bytes: 3400, flag: 'real', source: 'WK-4/01-pages/reserve.mdx' },
      ],
    },
    {
      id: '02',
      title: 'Reservation flow',
      promise: 'Date + party + confirmation',
      files: [
        { path: '02-flow/reservation-form.tsx', ext: 'tsx', bytes: 5800, flag: 'real', source: 'WK-4/02-flow/reservation-form.tsx' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 3600, flag: 'real', source: 'WK-4/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'WK-4/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1500, flag: 'real', source: 'WK-4/QUICK-START.md' },
  ],
  policies: [{ kind: 'updates', label: 'Lifetime free updates' }, { kind: 'guarantee-30d', label: '30-day guarantee' }],
  formats: ['MDX', 'TSX', 'Markdown'],
  proof: {
    rating: 4.7, reviewCount: 18, soldCount: 76, version: '1.0', demoData: true,
    testimonials: [
      { persona: 'Sofia', role: 'Restaurant Owner', quote: 'The menu copy made our food sound better than it reads on a chalkboard. Reservations up 30%.', rating: 5 },
    ],
  },
  authored: true,
  edition: { number: 3, of: 500, year: 2026 },
  vertical: 'restaurant',
};
