import type { OfferV2 } from '../../types';

export const NS_1: OfferV2 = {
  offerId: 'B-NS-1',
  title: 'OKR Notion System',
  archetype: 'notion-system',
  family: 'notion-systems',
  tagline: 'Board + table + calendar + timeline from one row array',
  promise: 'A Notion system with 25 sample OKRs across 4 synced views (board / table / calendar / timeline), plus 3 weekly ritual templates.',
  price: { amount: 45, compareAt: 69 },
  deliverables: [
    {
      id: '01',
      title: 'OKR database (25 rows)',
      promise: 'CSV importable into Notion',
      files: [
        { path: '01-data/okr-database.csv', ext: 'csv', bytes: 8400, flag: 'real', source: 'NS-1/01-data/okr-database.csv' },
        { path: '01-data/owners.csv', ext: 'csv', bytes: 1200, flag: 'real', source: 'NS-1/01-data/owners.csv' },
      ],
    },
    {
      id: '02',
      title: 'View configs (4)',
      promise: 'Board / table / calendar / timeline setup',
      files: [
        { path: '02-views/board-setup.md', ext: 'md', bytes: 2800, flag: 'real', source: 'NS-1/02-views/board-setup.md' },
        { path: '02-views/table-setup.md', ext: 'md', bytes: 2400, flag: 'real', source: 'NS-1/02-views/table-setup.md' },
        { path: '02-views/calendar-setup.md', ext: 'md', bytes: 2200, flag: 'real', source: 'NS-1/02-views/calendar-setup.md' },
        { path: '02-views/timeline-setup.md', ext: 'md', bytes: 2600, flag: 'real', source: 'NS-1/02-views/timeline-setup.md' },
      ],
    },
    {
      id: '03',
      title: 'Rituals (3 templates)',
      promise: 'Weekly check-in + monthly review + quarterly planning',
      files: [
        { path: '03-rituals/weekly-check-in.md', ext: 'md', bytes: 3200, flag: 'real', source: 'NS-1/03-rituals/weekly-check-in.md' },
        { path: '03-rituals/monthly-review.md', ext: 'md', bytes: 3800, flag: 'real', source: 'NS-1/03-rituals/monthly-review.md' },
        { path: '03-rituals/quarterly-planning.md', ext: 'md', bytes: 4200, flag: 'real', source: 'NS-1/03-rituals/quarterly-planning.md' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 3800, flag: 'real', source: 'NS-1/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'NS-1/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1600, flag: 'real', source: 'NS-1/QUICK-START.md' },
    { path: 'DUPLICATE-LINK.md', ext: 'md', bytes: 600, flag: 'real', source: 'NS-1/DUPLICATE-LINK.md' },
  ],
  policies: [
    { kind: 'updates', label: 'Lifetime free updates' },
    { kind: 'guarantee-30d', label: '30-day guarantee' },
  ],
  formats: ['CSV', 'Markdown'],
  proof: {
    rating: 4.8, reviewCount: 56, soldCount: 312, version: '2.1', demoData: true,
    testimonials: [
      { persona: 'Elena', role: 'Ops Lead, 20-person team', quote: 'The 4-view sync is the key. My team finally sees OKRs the way each person needs to.', rating: 5 },
      { persona: 'Ben', role: 'Startup COO', quote: 'The weekly check-in ritual template saved our standup. 15 minutes instead of 40.', rating: 5 },
    ],
  },
  authored: true,
  edition: { number: 27, of: 500, year: 2026 },
};

export const NS_2: OfferV2 = {
  offerId: 'B-NS-2',
  title: 'Content Calendar System',
  archetype: 'notion-system',
  family: 'notion-systems',
  tagline: 'Plan + draft + schedule across 4 platforms',
  promise: 'A Notion content calendar with 25 sample posts, 4 platform workflows, and a Kanban editorial board.',
  price: { amount: 39, compareAt: 59 },
  deliverables: [
    {
      id: '01',
      title: 'Content database (25 posts)',
      promise: 'Tagged by platform, status, content type',
      files: [
        { path: '01-data/content-database.csv', ext: 'csv', bytes: 7800, flag: 'real', source: 'NS-2/01-data/content-database.csv' },
      ],
    },
    {
      id: '02',
      title: 'Workflows + rituals',
      promise: 'Editorial board + weekly planning',
      files: [
        { path: '02-workflows/editorial-board.md', ext: 'md', bytes: 3400, flag: 'real', source: 'NS-2/02-workflows/editorial-board.md' },
        { path: '02-workflows/weekly-planning.md', ext: 'md', bytes: 3000, flag: 'real', source: 'NS-2/02-workflows/weekly-planning.md' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 3400, flag: 'real', source: 'NS-2/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'NS-2/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1400, flag: 'real', source: 'NS-2/QUICK-START.md' },
  ],
  policies: [{ kind: 'updates', label: 'Lifetime free updates' }],
  formats: ['CSV', 'Markdown'],
  proof: {
    rating: 4.7, reviewCount: 41, soldCount: 234, version: '1.3', demoData: true,
    testimonials: [
      { persona: 'Maya', role: 'Social Media Manager', quote: 'The 4-platform workflow finally stopped me from posting the same thing everywhere.', rating: 5 },
    ],
  },
  authored: true,
  edition: { number: 15, of: 500, year: 2026 },
};

export const NS_3: OfferV2 = {
  offerId: 'B-NS-3',
  title: 'CRM Notion System',
  archetype: 'notion-system',
  family: 'notion-systems',
  tagline: 'Pipeline + contacts + activity log in one database',
  promise: 'A Notion CRM with 25 sample deals, 5 pipeline stages, and an activity log tied to contacts.',
  price: { amount: 49, compareAt: 75 },
  deliverables: [
    {
      id: '01',
      title: 'CRM database (25 deals)',
      promise: 'Deals + contacts + activity in one CSV',
      files: [
        { path: '01-data/deals.csv', ext: 'csv', bytes: 9200, flag: 'real', source: 'NS-3/01-data/deals.csv' },
        { path: '01-data/contacts.csv', ext: 'csv', bytes: 4800, flag: 'real', source: 'NS-3/01-data/contacts.csv' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 3600, flag: 'real', source: 'NS-3/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'NS-3/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1500, flag: 'real', source: 'NS-3/QUICK-START.md' },
  ],
  policies: [{ kind: 'updates', label: 'Lifetime free updates' }, { kind: 'guarantee-30d', label: '30-day guarantee' }],
  formats: ['CSV', 'Markdown'],
  proof: {
    rating: 4.6, reviewCount: 34, soldCount: 178, version: '1.2', demoData: true,
    testimonials: [
      { persona: 'Sam', role: 'Solo Sales Consultant', quote: 'Replaced my $50/mo CRM. The pipeline view is cleaner and I own the data.', rating: 4 },
    ],
  },
  authored: true,
  edition: { number: 9, of: 500, year: 2026 },
};

export const NS_4: OfferV2 = {
  offerId: 'B-NS-4',
  title: 'Project Tracker System',
  archetype: 'notion-system',
  family: 'notion-systems',
  tagline: 'Tasks + milestones + time log for small teams',
  promise: 'A Notion project tracker with 25 sample tasks, milestone grouping, and a time-log database.',
  price: { amount: 35, compareAt: 55 },
  deliverables: [
    {
      id: '01',
      title: 'Project database',
      promise: 'Tasks + milestones + time entries',
      files: [
        { path: '01-data/tasks.csv', ext: 'csv', bytes: 7200, flag: 'real', source: 'NS-4/01-data/tasks.csv' },
        { path: '01-data/time-log.csv', ext: 'csv', bytes: 3400, flag: 'real', source: 'NS-4/01-data/time-log.csv' },
      ],
    },
  ],
  root: [
    { path: 'README.md', ext: 'md', bytes: 3200, flag: 'real', source: 'NS-4/README.md' },
    { path: 'LICENSE.md', ext: 'md', bytes: 1100, flag: 'real', source: 'NS-4/LICENSE.md' },
    { path: 'QUICK-START.md', ext: 'md', bytes: 1300, flag: 'real', source: 'NS-4/QUICK-START.md' },
  ],
  policies: [{ kind: 'updates', label: 'Lifetime free updates' }],
  formats: ['CSV', 'Markdown'],
  proof: {
    rating: 4.5, reviewCount: 28, soldCount: 142, version: '1.1', demoData: true,
    testimonials: [
      { persona: 'Nora', role: 'Project Manager', quote: 'The milestone grouping is the right abstraction. Not too simple, not a Jira clone.', rating: 4 },
    ],
  },
  authored: true,
  edition: { number: 5, of: 500, year: 2026 },
};
