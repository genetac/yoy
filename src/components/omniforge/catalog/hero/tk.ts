/* ════════════════════════════════════════════════════════════════════
   B-2 Toolkits — hero kits TK-1…4
   3 working single-file HTML instruments, formula cheatsheet, setup
   guide, root 4. The instruments are the same tools that run in the
   Try-it demo — what you preview is what you download.
   ════════════════════════════════════════════════════════════════════ */

import { f, gen, stub, setupFolder, type HeroDef } from "./shared";

export const TK1: HeroDef = {
  offerId: "B-TK-1",
  example: "SEO Toolkit",
  archetype: "toolkit",
  tierLetter: "B",
  title: "SEO Toolkit",
  promise: "3 working SEO instruments + a keyword bank — run them in any browser",
  price: [39, 59],
  formats: ["HTML", "CSV", "PDF", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Working instruments",
      promise: "Keyword checker",
      files: [
        f("01-instruments/keyword-density.html"),
        f("01-instruments/meta-length.html"),
        f("01-instruments/serp-preview.html"),
      ],
    },
    {
      id: "02",
      title: "Keyword bank",
      promise: "Meta generator",
      files: [f("02-keyword-bank/keyword-bank.csv")],
    },
    {
      id: "03",
      title: "Formula cheatsheet",
      promise: "Sitemap tool",
      files: [f("03-formulas/seo-scoring-cheatsheet.md")],
    },
    {
      id: "04",
      title: "Setup guide",
      promise: "Get running in under an hour",
      files: [
        gen("04-setup/setup-guide.pdf", "04-setup/setup-guide.md"),
        f("04-setup/walkthrough-link.md"),
      ],
    },
  ],
  extended: [
    {
      path: "sitemap-generator-cli.md",
      what: "A single-file Python script that crawls your site and writes sitemap.xml with lastmod dates.",
      bytes: 6400,
    },
  ],
};

export const TK2: HeroDef = {
  offerId: "B-TK-2",
  example: "Designer's Toolkit",
  archetype: "toolkit",
  tierLetter: "B",
  title: "Designer's Toolkit",
  promise: "Contrast checker, color pairer and grid tool with WCAG 2.2 math built in",
  price: [39, 59],
  formats: ["HTML", "JSON", "PDF", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Working instruments",
      promise: "Color generator",
      files: [
        f("01-instruments/contrast-checker.html"),
        f("01-instruments/color-pair-generator.html"),
        f("01-instruments/grid-tool.html"),
      ],
    },
    {
      id: "02",
      title: "Token exports",
      promise: "Font pairer",
      files: [
        f("02-tokens/token-export.json"),
        f("02-tokens/font-pairing-bank.csv"),
      ],
    },
    {
      id: "03",
      title: "Formula cheatsheet",
      promise: "Grid tool",
      files: [f("03-formulas/wcag-contrast-cheatsheet.md")],
    },
    {
      id: "04",
      title: "Setup guide",
      promise: "Get running in under an hour",
      files: [
        gen("04-setup/setup-guide.pdf", "04-setup/setup-guide.md"),
        f("04-setup/walkthrough-link.md"),
      ],
    },
  ],
  extended: [
    {
      path: "figma-plugin-starter.md",
      what: "A Figma plugin starter wired to the same token export format, so pairings sync into your library.",
      bytes: 7200,
    },
  ],
};

export const TK3: HeroDef = {
  offerId: "B-TK-3",
  example: "Developer's Toolkit",
  archetype: "toolkit",
  tierLetter: "B",
  title: "Developer's Toolkit",
  promise: "Regex tester, JSON formatter and snippet library that run fully offline",
  price: [39, 59],
  formats: ["HTML", "JSON", "PDF", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Working instruments",
      promise: "Snippet library",
      files: [
        f("01-instruments/regex-tester.html"),
        f("01-instruments/json-formatter.html"),
        f("01-instruments/snippet-library.html"),
      ],
    },
    {
      id: "02",
      title: "Snippet fixtures",
      promise: "Regex tester",
      files: [
        f("02-fixtures/snippet-bank.json"),
        f("02-fixtures/regex-fixtures.csv"),
      ],
    },
    {
      id: "03",
      title: "Formula cheatsheet",
      promise: "JSON formatter",
      files: [f("03-formulas/regex-cheatsheet.md")],
    },
    {
      id: "04",
      title: "Setup guide",
      promise: "Get running in under an hour",
      files: [
        gen("04-setup/setup-guide.pdf", "04-setup/setup-guide.md"),
        f("04-setup/walkthrough-link.md"),
      ],
    },
  ],
  extended: [
    {
      path: "vscode-snippets-export.md",
      what: "The snippet bank exported as a VS Code extension payload with tabstop placeholders.",
      bytes: 5600,
    },
  ],
};

export const TK4: HeroDef = {
  offerId: "B-TK-4",
  example: "Content Writer's Toolkit",
  archetype: "toolkit",
  tierLetter: "B",
  title: "Content Writer's Toolkit",
  promise: "Headline analyzer, outline builder and readability checker with real scoring formulas",
  price: [39, 59],
  formats: ["HTML", "CSV", "PDF", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Working instruments",
      promise: "Headline analyzer",
      files: [
        f("01-instruments/headline-analyzer.html"),
        f("01-instruments/outline-generator.html"),
        f("01-instruments/readability-checker.html"),
      ],
    },
    {
      id: "02",
      title: "Word banks",
      promise: "Outline generator",
      files: [
        f("02-word-banks/power-words.csv"),
        f("02-word-banks/headline-formulas.csv"),
      ],
    },
    {
      id: "03",
      title: "Formula cheatsheet",
      promise: "Readability checker",
      files: [f("03-formulas/headline-scoring-cheatsheet.md")],
    },
    {
      id: "04",
      title: "Setup guide",
      promise: "Get running in under an hour",
      files: [
        gen("04-setup/setup-guide.pdf", "04-setup/setup-guide.md"),
        f("04-setup/walkthrough-link.md"),
      ],
    },
  ],
  extended: [
    {
      path: "seo-title-lab.html",
      what: "A fourth instrument that scores SERP titles against length, keyword-frontloading and CTR patterns.",
      bytes: 11200,
    },
  ],
};

export const TOOLKIT_HEROES = [TK1, TK2, TK3, TK4];
