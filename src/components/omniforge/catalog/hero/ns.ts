/* ════════════════════════════════════════════════════════════════════
   B-3 Notion Systems — hero kits NS-1…4
   3 CSVs with 25 authored rows each, 3 .md rituals, formula reference,
   duplicate-link note, root 4. The Try-it demo tours the same rows.
   ════════════════════════════════════════════════════════════════════ */

import { f, gen, type HeroDef } from "./shared";

export const NS1: HeroDef = {
  offerId: "B-NS-1",
  example: "Project Management OS",
  archetype: "notion-system",
  tierLetter: "B",
  title: "Project Management OS",
  promise: "A project workspace with 25 seeded tasks, sprint board and weekly rituals",
  price: [42, 64],
  formats: ["Notion", "CSV", "PDF", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Databases (25 authored rows)",
      promise: "Task database",
      files: [
        f("01-databases/tasks.csv"),
        f("01-databases/sprints.csv"),
        f("01-databases/timeline.csv"),
      ],
    },
    {
      id: "02",
      title: "Rituals",
      promise: "Sprint board",
      files: [
        f("02-rituals/weekly-review.md"),
        f("02-rituals/sprint-planning.md"),
        f("02-rituals/retrospective.md"),
      ],
    },
    {
      id: "03",
      title: "Formula reference",
      promise: "Timeline view",
      files: [f("03-formulas/formula-reference.md")],
    },
    {
      id: "04",
      title: "Duplicate into Notion",
      promise: "Free duplicate link",
      files: [
        f("04-setup/duplicate-link.md"),
        gen("04-setup/setup-guide.pdf", "04-setup/setup-guide.md"),
      ],
    },
  ],
  extended: [
    {
      path: "client-portal-view.md",
      what: "A filtered, shareable client-facing board template with read-only row specs.",
      bytes: 4800,
    },
  ],
};

export const NS2: HeroDef = {
  offerId: "B-NS-2",
  example: "Sales CRM System",
  archetype: "notion-system",
  tierLetter: "B",
  title: "Sales CRM System",
  promise: "Pipeline stages, contacts and deal reviews with 25 seeded rows",
  price: [42, 64],
  formats: ["Notion", "CSV", "PDF", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Databases (25 authored rows)",
      promise: "CRM database",
      files: [
        f("01-databases/deals.csv"),
        f("01-databases/contacts.csv"),
        f("01-databases/companies.csv"),
      ],
    },
    {
      id: "02",
      title: "Rituals",
      promise: "Pipeline board",
      files: [
        f("02-rituals/deal-review.md"),
        f("02-rituals/weekly-forecast.md"),
        f("02-rituals/lost-deal-autopsy.md"),
      ],
    },
    {
      id: "03",
      title: "Formula reference",
      promise: "Meeting notes",
      files: [f("03-formulas/formula-reference.md")],
    },
    {
      id: "04",
      title: "Duplicate into Notion",
      promise: "Free duplicate link",
      files: [
        f("04-setup/duplicate-link.md"),
        gen("04-setup/setup-guide.pdf", "04-setup/setup-guide.md"),
      ],
    },
  ],
  extended: [
    {
      path: "email-sync-playbook.md",
      what: "A Notion-to-inbox sync playbook using the Notion API webhooks pattern, with copy-ready request templates.",
      bytes: 6600,
    },
  ],
};

export const NS3: HeroDef = {
  offerId: "B-NS-3",
  example: "Content Planning System",
  archetype: "notion-system",
  tierLetter: "B",
  title: "Content Planning System",
  promise: "Editorial calendar, idea backlog and publishing checklist with 25 seeded rows",
  price: [42, 64],
  formats: ["Notion", "CSV", "PDF", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Databases (25 authored rows)",
      promise: "Editorial calendar",
      files: [
        f("01-databases/content-calendar.csv"),
        f("01-databases/ideas.csv"),
        f("01-databases/channels.csv"),
      ],
    },
    {
      id: "02",
      title: "Rituals",
      promise: "Content database",
      files: [
        f("02-rituals/weekly-planning.md"),
        f("02-rituals/batch-writing-day.md"),
        f("02-rituals/monthly-recap.md"),
      ],
    },
    {
      id: "03",
      title: "Formula reference",
      promise: "Idea backlog",
      files: [f("03-formulas/formula-reference.md")],
    },
    {
      id: "04",
      title: "Duplicate into Notion",
      promise: "Free duplicate link",
      files: [
        f("04-setup/duplicate-link.md"),
        gen("04-setup/setup-guide.pdf", "04-setup/setup-guide.md"),
      ],
    },
  ],
  extended: [
    {
      path: "repurposing-engine.md",
      what: "A one-to-many repurposing board: every published piece fans out into 6 channel-specific derivative tasks.",
      bytes: 5900,
    },
  ],
};

export const NS4: HeroDef = {
  offerId: "B-NS-4",
  example: "Personal Life OS",
  archetype: "notion-system",
  tierLetter: "B",
  title: "Personal Life OS",
  promise: "Habits, reading and budget trackers with 25 seeded rows and monthly rollups",
  price: [42, 64],
  formats: ["Notion", "CSV", "PDF", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Databases (25 authored rows)",
      promise: "Habit tracker",
      files: [
        f("01-databases/habits.csv"),
        f("01-databases/reading-list.csv"),
        f("01-databases/budget.csv"),
      ],
    },
    {
      id: "02",
      title: "Rituals",
      promise: "Reading list",
      files: [
        f("02-rituals/morning-setup.md"),
        f("02-rituals/weekly-review.md"),
        f("02-rituals/monthly-rollup.md"),
      ],
    },
    {
      id: "03",
      title: "Formula reference",
      promise: "Budget tracker",
      files: [f("03-formulas/formula-reference.md")],
    },
    {
      id: "04",
      title: "Duplicate into Notion",
      promise: "Free duplicate link",
      files: [
        f("04-setup/duplicate-link.md"),
        gen("04-setup/setup-guide.pdf", "04-setup/setup-guide.md"),
      ],
    },
  ],
  extended: [
    {
      path: "goal-cascade-board.md",
      what: "A yearly-to-quarterly-to-weekly goal cascade board with auto-rollup progress formulas.",
      bytes: 6100,
    },
  ],
};

export const NOTION_HEROES = [NS1, NS2, NS3, NS4];
