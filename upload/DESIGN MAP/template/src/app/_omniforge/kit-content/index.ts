import { TP_1_CONTENT } from './TP-1';

/**
 * Kit content registry — maps offerId → { source: content }.
 * Only hero kits have real authored content; the rest fall back to
 * 'extended' (honest stubs) until authored.
 */
export const KIT_CONTENT: Record<string, Record<string, string>> = {
  'B-TP-1': TP_1_CONTENT,
};

/** Stubs for the other 4 reference kits — enough to demo the pipeline. */
export const KIT_STUBS: Record<string, Record<string, string>> = {
  'B-TK-1': {
    'README.md': '# SEO Quick-Check Toolkit\n\n3 working HTML tools that run offline.\n\n## Contents\n- 01-tools/title-meta-scorer.html\n- 01-tools/keyword-density.html\n- 01-tools/serp-preview.html\n- 02-formulas/cheatsheet.md\n- 02-formulas/setup-guide.md\n',
    'LICENSE.md': '# Commercial License\n\nYou may use these tools in commercial work. You may not resell the tools themselves.\n',
    'QUICK-START.md': '# Quick Start\n\n1. Open 01-tools/ in your browser\n2. Double-click any .html file\n3. The tool runs offline — no server needed\n',
    '02-formulas/cheatsheet.md': '# Formula Cheatsheet\n\n## Title length score\n- < 30 chars: too short (−10)\n- 30-60 chars: optimal (+10)\n- > 60 chars: too long (−5)\n\n## Meta description score\n- < 120 chars: too short (−5)\n- 120-160 chars: optimal (+10)\n- > 160 chars: truncated (−10)\n\n## Keyword density\n- < 0.5%: too low\n- 0.5-2.5%: optimal\n- > 2.5%: keyword stuffing risk\n',
    '02-formulas/setup-guide.md': '# Setup Guide\n\nNo setup needed. The tools are single-file HTML — just double-click.\n\nFor the CSV pattern bank, open in any spreadsheet app.\n',
  },
  'B-NS-1': {
    'README.md': '# OKR Notion System\n\n25 sample OKRs across 4 synced views.\n\n## Setup\n1. Create a new Notion database\n2. Import 01-data/okr-database.csv\n3. Follow 02-views/ to set up each view\n4. Use 03-rituals/ for weekly/monthly cadence\n',
    'LICENSE.md': '# Commercial License\n\nYou may use this system in commercial work. You may not resell the system itself.\n',
    'QUICK-START.md': '# Quick Start\n\n1. Open Notion, create a new page\n2. Create a database (Table view)\n3. Import 01-data/okr-database.csv\n4. Add the properties listed in 02-views/table-setup.md\n5. Create the other 3 views using the setup guides\n',
    'DUPLICATE-LINK.md': '# Duplicate Link\n\nA pre-built Notion template is available. After purchase, email hello@omniforge.dev with your receipt to get the duplicate link.\n',
  },
  'B-AS-1': {
    'README.md': '# Maturity Assessment\n\n25-question quiz with weighted scoring and 4 result bands.\n\n## Contents\n- 01-quiz/maturity-quiz.html (run offline)\n- 02-questions/questions.json + .csv\n- 03-scoring/scoring-formula.md + result-page.html\n\n## Score formula\nScore = Σ(chosen weights) ÷ max possible × 100\n\n## Bands\n- Platinum ≥ 85\n- Gold 70-84\n- Silver 50-69\n- Bronze < 50\n',
    'LICENSE.md': '# Commercial License\n\nYou may use this assessment in commercial work. You may not resell the assessment itself.\n',
    'QUICK-START.md': '# Quick Start\n\n1. Open 01-quiz/maturity-quiz.html in a browser\n2. The quiz runs offline — no server needed\n3. To customise questions, edit 02-questions/questions.json\n4. To rebrand the result page, edit 03-scoring/result-page.html\n',
  },
  'B-WK-1': {
    'README.md': '# Dental Practice Website Kit\n\n5 MDX pages of real dental copy + booking flow + local-SEO schema.\n\n## Contents\n- 01-pages/ (5 .mdx files)\n- 02-flow/ (booking form + SEO checklist + schema)\n- 03-config/ (robots + sitemap + deploy guide)\n\n## Stack\nBuilt for Next.js + MDX. The deploy guide covers Vercel and Netlify.\n',
    'LICENSE.md': '# Commercial License\n\nYou may use this kit for client work. You may not resell the kit itself.\n',
    'CHANGELOG.md': '# Changelog\n\n## v1.4 — 2026-10\n- Updated booking form validation\n- Added JSON-LD schema for local business\n\n## v1.3 — 2026-07\n- Refined home page copy\n- Added private-events block\n',
    'QUICK-START.md': '# Quick Start\n\n1. Install Next.js: npx create-next-app@latest\n2. Copy 01-pages/*.mdx into your app directory\n3. Copy 02-flow/booking-form.tsx into your components\n4. Update the practice name, address, and phone in each .mdx\n5. Follow 03-config/deploy-guide.md to ship\n',
  },
};
