/* ════════════════════════════════════════════════════════════════════
   B-4 Assessments — hero kits AS-1…4
   Offline HTML quiz, 25 questions (.json + .csv), scoring .md,
   result-page .html, report layout, root 4. The quiz in the ZIP plays
   offline by double-click; the Try-it demo runs the same questions.
   ════════════════════════════════════════════════════════════════════ */

import { f, gen, type HeroDef } from "./shared";

export const AS1: HeroDef = {
  offerId: "B-AS-1",
  example: "Skill Assessment Quiz",
  archetype: "assessment-tool",
  tierLetter: "B",
  title: "Skill Assessment Quiz",
  promise: "25 weighted questions, 4 result bands and an offline quiz engine",
  price: [37, 54],
  formats: ["HTML", "JSON", "CSV", "PDF", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Offline quiz engine",
      promise: "10 questions",
      files: [f("01-quiz/quiz.html")],
    },
    {
      id: "02",
      title: "Question bank (25 questions)",
      promise: "Score result",
      files: [
        f("02-questions/questions.json"),
        f("02-questions/questions.csv"),
      ],
    },
    {
      id: "03",
      title: "Scoring logic",
      promise: "Skill breakdown",
      files: [
        f("03-scoring/scoring-logic.md"),
        f("03-scoring/bands.md"),
      ],
    },
    {
      id: "04",
      title: "Result assets",
      promise: "Shareable result page",
      files: [
        f("04-results/result-page.html"),
        f("04-results/report-layout.md"),
      ],
    },
    {
      id: "05",
      title: "Setup guide",
      promise: "Get running in under an hour",
      files: [
        gen("05-setup/setup-guide.pdf", "05-setup/setup-guide.md"),
        f("05-setup/walkthrough-link.md"),
      ],
    },
  ],
  extended: [
    {
      path: "lead-capture-wiring.md",
      what: "A drop-in form handler that emails each result to your inbox with the respondent's band and score.",
      bytes: 5200,
    },
  ],
};

export const AS2: HeroDef = {
  offerId: "B-AS-2",
  example: "Personality Assessment",
  archetype: "assessment-tool",
  tierLetter: "B",
  title: "Personality Assessment",
  promise: "Scenario-driven type quiz with strengths report and share page",
  price: [37, 54],
  formats: ["HTML", "JSON", "CSV", "PDF", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Offline quiz engine",
      promise: "Scenario questions",
      files: [f("01-quiz/quiz.html")],
    },
    {
      id: "02",
      title: "Question bank (25 questions)",
      promise: "Type result",
      files: [
        f("02-questions/questions.json"),
        f("02-questions/questions.csv"),
      ],
    },
    {
      id: "03",
      title: "Scoring logic",
      promise: "Strengths report",
      files: [
        f("03-scoring/scoring-logic.md"),
        f("03-scoring/type-mapping.md"),
      ],
    },
    {
      id: "04",
      title: "Result assets",
      promise: "Shareable result page",
      files: [
        f("04-results/result-page.html"),
        f("04-results/strengths-report-layout.md"),
      ],
    },
    {
      id: "05",
      title: "Setup guide",
      promise: "Get running in under an hour",
      files: [
        gen("05-setup/setup-guide.pdf", "05-setup/setup-guide.md"),
        f("05-setup/walkthrough-link.md"),
      ],
    },
  ],
  extended: [
    {
      path: "team-report-builder.md",
      what: "Aggregates multiple respondents into a team-type distribution report with facilitation notes.",
      bytes: 6800,
    },
  ],
};

export const AS3: HeroDef = {
  offerId: "B-AS-3",
  example: "Business Health Check",
  archetype: "assessment-tool",
  tierLetter: "B",
  title: "Business Health Check",
  promise: "20-question health score with action items per weak area",
  price: [37, 54],
  formats: ["HTML", "JSON", "CSV", "PDF", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Offline quiz engine",
      promise: "20 questions",
      files: [f("01-quiz/quiz.html")],
    },
    {
      id: "02",
      title: "Question bank (25 questions)",
      promise: "Health score",
      files: [
        f("02-questions/questions.json"),
        f("02-questions/questions.csv"),
      ],
    },
    {
      id: "03",
      title: "Scoring logic",
      promise: "Action items",
      files: [
        f("03-scoring/scoring-logic.md"),
        f("03-scoring/action-item-map.md"),
      ],
    },
    {
      id: "04",
      title: "Result assets",
      promise: "Scored recommendations",
      files: [
        f("04-results/result-page.html"),
        f("04-results/action-plan-layout.md"),
      ],
    },
    {
      id: "05",
      title: "Setup guide",
      promise: "Get running in under an hour",
      files: [
        gen("05-setup/setup-guide.pdf", "05-setup/setup-guide.md"),
        f("05-setup/walkthrough-link.md"),
      ],
    },
  ],
  extended: [
    {
      path: "benchmark-data.csv",
      what: "Anonymised band distributions by industry so respondents can compare their score to peers.",
      bytes: 4200,
    },
  ],
};

export const AS4: HeroDef = {
  offerId: "B-AS-4",
  example: "Launch Readiness Quiz",
  archetype: "assessment-tool",
  tierLetter: "B",
  title: "Launch Readiness Quiz",
  promise: "Gap-analysis quiz that scores launch readiness across 5 dimensions",
  price: [37, 54],
  formats: ["HTML", "JSON", "CSV", "PDF", "MD"],
  policies: ["updates", "guarantee-30d", "license-commercial"],
  folders: [
    {
      id: "01",
      title: "Offline quiz engine",
      promise: "Pre-launch checklist quiz",
      files: [f("01-quiz/quiz.html")],
    },
    {
      id: "02",
      title: "Question bank (25 questions)",
      promise: "Readiness score",
      files: [
        f("02-questions/questions.json"),
        f("02-questions/questions.csv"),
      ],
    },
    {
      id: "03",
      title: "Scoring logic",
      promise: "Gap analysis",
      files: [
        f("03-scoring/scoring-logic.md"),
        f("03-scoring/dimension-weights.md"),
      ],
    },
    {
      id: "04",
      title: "Result assets",
      promise: "Gap analysis report",
      files: [
        f("04-results/result-page.html"),
        f("04-results/gap-report-layout.md"),
      ],
    },
    {
      id: "05",
      title: "Setup guide",
      promise: "Get running in under an hour",
      files: [
        gen("05-setup/setup-guide.pdf", "05-setup/setup-guide.md"),
        f("05-setup/walkthrough-link.md"),
      ],
    },
  ],
  extended: [
    {
      path: "notion-launch-tracker.md",
      what: "A companion Notion tracker that turns the gap report into assigned pre-launch tasks.",
      bytes: 4600,
    },
  ],
};

export const ASSESSMENT_HEROES = [AS1, AS2, AS3, AS4];
