/* ════════════════════════════════════════════════════════════════════
   B-1 Template Packs — hero kits TP-1…4 (build plan v3 reference block)
   8–12 fully written templates (.md source → .docx generated), one data
   file, setup guide, root 4.
   ════════════════════════════════════════════════════════════════════ */

import { f, gen, stub, setupFolder, type HeroDef } from "./shared";

/* ── TP-1 · EmailPack — the reference kit every other kit copies ──── */

export const TP1: HeroDef = {
  offerId: "B-TP-1",
  example: "Email Template Pack",
  archetype: "template-pack",
  tierLetter: "B",
  title: "Email Template Pack",
  promise: "11 fully-written emails + a 120-row subject-line bank, ready to send",
  price: [34, 49],
  formats: ["DOCX", "PDF", "EML", "CSV", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Welcome series",
      promise: "Welcome series",
      files: [
        gen("01-welcome-series/day-0-welcome.docx", "01-welcome-series/day-0-welcome.md"),
        gen("01-welcome-series/day-2-value.docx", "01-welcome-series/day-2-value.md"),
        gen("01-welcome-series/day-4-story.docx", "01-welcome-series/day-4-story.md"),
        gen("01-welcome-series/day-6-offer.docx", "01-welcome-series/day-6-offer.md"),
        f("01-welcome-series/day-0-welcome.md"),
        f("01-welcome-series/day-2-value.md"),
        f("01-welcome-series/day-4-story.md"),
        f("01-welcome-series/day-6-offer.md"),
      ],
    },
    {
      id: "02",
      title: "Cold outreach",
      promise: "Cold outreach",
      files: [
        f("02-cold-outreach/opener-problem.md"),
        f("02-cold-outreach/opener-referral.md"),
        f("02-cold-outreach/opener-trigger.md"),
        f("02-cold-outreach/merge-field-map.csv"),
      ],
    },
    {
      id: "03",
      title: "Follow-up templates",
      promise: "Follow-up templates",
      files: [
        gen("03-follow-up/day-3-nudge.docx", "03-follow-up/day-3-nudge.md"),
        gen("03-follow-up/day-7-value-add.docx", "03-follow-up/day-7-value-add.md"),
        gen("03-follow-up/day-14-last-call.docx", "03-follow-up/day-14-last-call.md"),
        gen("03-follow-up/win-back.docx", "03-follow-up/win-back.md"),
        f("03-follow-up/day-3-nudge.md"),
        f("03-follow-up/day-7-value-add.md"),
        f("03-follow-up/day-14-last-call.md"),
        f("03-follow-up/win-back.md"),
      ],
    },
    {
      id: "04",
      title: "Subject-line bank",
      promise: "Subject-line bank — 120 rows, tagged by intent",
      files: [f("04-subject-lines/subject-line-bank.csv")],
    },
    setupFolder(),
  ],
  extended: [
    {
      path: "dark-mode-html-variants.md",
      what: "Dark-mode-safe HTML versions of all 11 emails, tested in Gmail, Apple Mail and Outlook mobile rendering engines.",
      bytes: 9200,
    },
  ],
};

/* ── TP-2 · ProposalPack ──────────────────────────────────────────── */

export const TP2: HeroDef = {
  offerId: "B-TP-2",
  example: "Proposal Template Pack",
  archetype: "template-pack",
  tierLetter: "B",
  title: "Proposal Template Pack",
  promise: "3 proposal formats + pricing tables and T&C inserts that close",
  price: [39, 59],
  formats: ["DOCX", "PDF", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Service proposals",
      promise: "Service proposals",
      files: [
        gen("01-service-proposals/proposal-fixed-scope.docx", "01-service-proposals/proposal-fixed-scope.md"),
        gen("01-service-proposals/proposal-retainer.docx", "01-service-proposals/proposal-retainer.md"),
        gen("01-service-proposals/proposal-sprint.docx", "01-service-proposals/proposal-sprint.md"),
        f("01-service-proposals/proposal-fixed-scope.md"),
        f("01-service-proposals/proposal-retainer.md"),
        f("01-service-proposals/proposal-sprint.md"),
      ],
    },
    {
      id: "02",
      title: "Pricing tables",
      promise: "Pricing tables",
      files: [
        f("02-pricing-tables/three-tier-builder.md"),
        f("02-pricing-tables/value-stack.md"),
        f("02-pricing-tables/objection-handling.md"),
      ],
    },
    {
      id: "03",
      title: "Terms + conditions inserts",
      promise: "Terms + conditions",
      files: [
        f("03-terms/terms-insert.md"),
        f("03-terms/payment-terms.md"),
      ],
    },
    {
      id: "04",
      title: "Negotiation email bank",
      promise: "Follow-up emails that move a proposal to signature",
      files: [f("04-negotiation-emails/negotiation-bank.csv")],
    },
    setupFolder(),
  ],
  extended: [
    {
      path: "figma-proposal-layouts.md",
      what: "Figma layouts for the three proposal formats, print-ready and brand-token wired.",
      bytes: 7800,
    },
  ],
};

/* ── TP-3 · SlidePack ─────────────────────────────────────────────── */

export const TP3: HeroDef = {
  offerId: "B-TP-3",
  example: "Presentation Template Pack",
  archetype: "template-pack",
  tierLetter: "B",
  title: "Presentation Template Pack",
  promise: "20 master slide layouts with speaker notes for pitches and reports",
  price: [44, 69],
  formats: ["DOCX", "PPTX", "PDF", "CSV", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Master layouts",
      promise: "20 master slide layouts",
      files: [
        f("01-master-layouts/layout-index.csv"),
        f("01-master-layouts/cover-sections.md"),
        f("01-master-layouts/data-slides.md"),
        f("01-master-layouts/story-slides.md"),
      ],
    },
    {
      id: "02",
      title: "Pitch deck",
      promise: "Pitch deck",
      files: [
        gen("02-pitch-deck/pitch-deck-12-slides.docx", "02-pitch-deck/pitch-deck-12-slides.md"),
        f("02-pitch-deck/pitch-deck-12-slides.md"),
      ],
    },
    {
      id: "03",
      title: "Report slides",
      promise: "Report slides",
      files: [
        gen("03-report-slides/quarterly-report-deck.docx", "03-report-slides/quarterly-report-deck.md"),
        f("03-report-slides/quarterly-report-deck.md"),
      ],
    },
    {
      id: "04",
      title: "Speaker notes",
      promise: "Speaker notes for every layout",
      files: [f("04-speaker-notes/speaker-notes.md")],
    },
    setupFolder(),
  ],
  extended: [
    {
      path: "pptx-master-file.md",
      what: "Native .pptx master with the 20 layouts as slide masters, dark + light themes.",
      bytes: 12400,
    },
  ],
};

/* ── TP-4 · ContractPack ──────────────────────────────────────────── */

export const TP4: HeroDef = {
  offerId: "B-TP-4",
  example: "Contract Template Pack",
  archetype: "template-pack",
  tierLetter: "B",
  title: "Contract Template Pack",
  promise: "Plain-English contracts with fill-in bracket systems for freelancers",
  price: [49, 79],
  formats: ["DOCX", "PDF", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Service agreements",
      promise: "Service agreements",
      files: [
        gen("01-service-agreements/master-services-agreement.docx", "01-service-agreements/master-services-agreement.md"),
        gen("01-service-agreements/consultancy-agreement.docx", "01-service-agreements/consultancy-agreement.md"),
        f("01-service-agreements/master-services-agreement.md"),
        f("01-service-agreements/consultancy-agreement.md"),
      ],
    },
    {
      id: "02",
      title: "NDAs",
      promise: "NDAs",
      files: [
        gen("02-ndas/mutual-nda.docx", "02-ndas/mutual-nda.md"),
        gen("02-ndas/one-way-nda.docx", "02-ndas/one-way-nda.md"),
        f("02-ndas/mutual-nda.md"),
        f("02-ndas/one-way-nda.md"),
      ],
    },
    {
      id: "03",
      title: "SOW templates",
      promise: "SOW templates",
      files: [
        gen("03-sow/statement-of-work.docx", "03-sow/statement-of-work.md"),
        f("03-sow/statement-of-work.md"),
      ],
    },
    {
      id: "04",
      title: "Plain-English summaries",
      promise: "Plain-English summary for every contract",
      files: [f("04-plain-english/plain-english-summaries.md")],
    },
    {
      id: "05",
      title: "Jurisdiction notes",
      promise: "Fill-in bracket system + jurisdiction variant notes",
      files: [f("05-jurisdiction/jurisdiction-notes.md")],
    },
    {
      id: "06",
      title: "Setup guide",
      promise: "Get running in under an hour",
      files: [
        gen("06-setup/setup-guide.pdf", "06-setup/setup-guide.md"),
        f("06-setup/walkthrough-link.md"),
        f("06-setup/legal-review-checklist.md"),
      ],
    },
  ],
  extended: [
    {
      path: "eu-uk-gdpr-variants.md",
      what: "GDPR-aware variants of the NDA and MSA for EU/UK client work, with data-processing addendum.",
      bytes: 10800,
    },
  ],
};

export const TEMPLATE_PACK_HEROES = [TP1, TP2, TP3, TP4];
