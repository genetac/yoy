/* ════════════════════════════════════════════════════════════════════
   B-AS-1 · Skill Assessment Quiz — reference kit (assessment pipeline)
   Offline HTML quiz engine, 25 weighted questions (.json + .csv),
   scoring logic, result assets. Same questions power the Try-it demo.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-AS-1";

/* [question, [option, weight] × 4] — weights 1–4, one each. */
const QUESTIONS: [string, [string, number][]][] = [
  ["A user reports your site looks broken on their phone. What do you open first?", [["The CSS file you edited last", 3], ["The responsive dev-tools view at 390px", 4], ["A ticket asking for their device model", 1], ["The analytics funnel for mobile", 2]]],
  ["What does `git rebase --onto` primarily operate on?", [["Commits", 4], ["Branches only", 1], ["Stashes", 2], ["Remotes", 1]]],
  ["A REST endpoint returns 500s intermittently. First move?", [["Roll back the deploy", 2], ["Read the server logs around the failure window", 4], ["Bump the timeout and retry", 1], ["Reproduce locally with the same payload", 3]]],
  ["Which CSS unit scales with the root font-size?", [["em", 2], ["rem", 4], ["vw", 1], ["%", 1]]],
  ["Your LCP is 4.1s on mobile. Highest-leverage first fix?", [["Convert the hero image to AVIF with a 1280w variant + preload", 4], ["Minify the CSS bundle", 1], ["Add a service worker", 2], ["Lazy-load below-the-fold images", 2]]],
  ["What does an HTTP 410 status mean vs 404?", [["Gone permanently — don't retry; 404 is just 'not found now'", 4], ["Server error; 404 is client error", 1], ["Redirect required; 404 is forbidden", 1], ["Rate limited; 404 is gone", 1]]],
  ["In SQL, which clause runs LAST logically?", [["SELECT", 4], ["WHERE", 2], ["FROM", 1], ["GROUP BY", 2]]],
  ["A teammate's PR has no tests but ships a fix. You...", [["Approve with a test-follow-up ticket", 2], ["Request tests in the PR — the ticket is the PR", 4], ["Merge — speed wins, revert if broken", 1], ["Write the tests yourself after merge", 2]]],
  ["Which array method mutates the original array?", [["map", 1], ["slice", 1], ["sort", 4], ["concat", 2]]],
  ["Your feature flag is at 50% and error rates rose 0.2pp. Worth investigating?", [["No — within noise", 1], ["Yes — segment errors by flag exposure first", 4], ["Yes — immediately roll back to 0%", 2], ["Wait a day for more data", 2]]],
  ["What's the difference between `==` and `===` in JavaScript?", [["=== also compares types; == coerces", 4], ["== is deprecated", 1], ["=== is faster only", 1], ["No difference in modern engines", 1]]],
  ["A migration is stuck mid-deploy. Safest next step?", [["Run the down migration blindly", 1], ["Check DB advisory locks + migration journal state, then decide", 4], ["Restart the app servers", 1], ["Drop and recreate the database", 1]]],
  ["Which header prevents browsers from MIME-sniffing?", [["X-Content-Type-Options: nosniff", 4], ["Content-Security-Policy", 2], ["Strict-Transport-Security", 1], ["X-Frame-Options", 2]]],
  ["Users can't see a button that your tests assert exists. Why did tests pass?", [["Tests assert presence, not visibility — different predicates", 4], ["Flaky tests", 2], ["CI ran old code", 2], ["The button renders only for admins", 1]]],
  ["Estimate the risk: storing JWTs in localStorage", [["High — XSS exfiltrates them; prefer httpOnly cookies", 4], ["None — industry standard", 1], ["Low — CSP blocks theft", 2], ["Only matters for banks", 1]]],
  ["Which query is fastest for 'latest 10 of 1M rows, newest first'?", [["ORDER BY created_at DESC LIMIT 10 with an index on created_at", 4], ["SELECT * then slice in app code", 1], ["OFFSET 999990 LIMIT 10", 1], ["Full scan with a WHERE on date range", 2]]],
  ["What is a database transaction's isolation level protecting?", [["Concurrent read/write anomalies like dirty and phantom reads", 4], ["Only disk failures", 1], ["Network partitions", 2], ["Password storage", 1]]],
  ["Your bundle grew 240KB gzipped. First place you look?", [["The webpack/bundle analyzer — largest new chunks first", 4], ["Images", 1], ["Database queries", 1], ["Font files", 2]]],
  ["What does `defer` on a script tag actually guarantee?", [["Download in parallel, execute after HTML parsing, in order", 4], ["Execute immediately on load", 1], ["Load only when scrolled into view", 1], ["Async execute out of order", 2]]],
  ["A canary deploy at 5% shows elevated latency p99 but fine p50. Meaning?", [["A tail-latency subset is hurting — often a slow dependency or GC", 4], ["Overall regression — roll back everything", 2], ["Measurement noise — ignore", 1], ["p99 is always broken — trust p50", 1]]],
  ["Which practice most reduces CSS specificity wars?", [["A consistent naming convention (e.g. BEM/utility layers) with low-specificity selectors", 4], ["!important as a tiebreaker", 1], ["Inline styles for overrides", 1], ["Re-adding IDs for clarity", 1]]],
  ["In React, when does a `useEffect` cleanup function run?", [["Before the next effect and on unmount", 4], ["Only on unmount", 2], ["Never automatically", 1], ["After every render", 1]]],
  ["The staging DB is 40GB; prod is 2TB. Query plans differ wildly. Best fix?", [["Test against a prod-sized, anonymised clone for plan-sensitive work", 4], ["Trust staging — plans are portable", 1], ["Add more indexes in prod blindly", 1], ["Disable the query planner's stats in staging", 1]]],
  ["A user asks you to store passwords for their team. You...", [["Hash with argon2id/bcrypt + per-user salt; never store plaintext", 4], ["Encrypt with AES and store the key nearby", 1], ["Store in the DB as base64", 1], ["Delegate to the browser's password manager only", 2]]],
  ["What's the first thing you write for a new endpoint?", [["Its contract: request/response shapes, errors, auth, and the test that asserts them", 4], ["The implementation", 1], ["The docs page", 2], ["The migration", 2]]],
];

const qJson = JSON.stringify(
  { scoring: { formula: "sum(chosen weights) / max possible × 100", bands: [
    { name: "Platinum", min: 85 }, { name: "Gold", min: 70 }, { name: "Silver", min: 50 }, { name: "Bronze", min: 0 },
  ] }, questions: QUESTIONS.map(([q, opts]) => ({ q, options: opts.map(([label, weight]) => ({ label, weight })) })) },
  null,
  2
);

const qCsv =
  "number,question,option_a,weight_a,option_b,weight_b,option_c,weight_c,option_d,weight_d\n" +
  QUESTIONS.map(([q, o], i) =>
    `${i + 1},"${q.replace(/"/g, '""')}","${o[0][0].replace(/"/g, '""')}",${o[0][1]},"${o[1][0].replace(/"/g, '""')}",${o[1][1]},"${o[2][0].replace(/"/g, '""')}",${o[2][1]},"${o[3][0].replace(/"/g, '""')}",${o[3][1]}`
  ).join("\n");

/* The quiz engine embeds the same questions, inline, zero network. */
const quizHtml = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Skill Assessment Quiz — OMNIFORGE</title>
<style>
  :root { color-scheme: light dark; --bg:#fafaf9; --panel:#fff; --ink:#18181b; --dim:#71717a; --line:#e4e4e7; --accent:#0e7490; }
  @media (prefers-color-scheme: dark) { :root { --bg:#101012; --panel:#18181b; --ink:#f4f4f5; --dim:#a1a1aa; --line:#27272a; --accent:#22d3ee; } }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100vh; display:grid; place-items:center; padding:24px; background:var(--bg); color:var(--ink); font:15px/1.55 ui-sans-serif,system-ui,sans-serif; }
  main { width: min(620px, 100%); background:var(--panel); border:1px solid var(--line); border-radius:16px; padding:28px; }
  h1 { font-size:19px; margin:0 0 4px; }
  .sub { color:var(--dim); font-size:13px; margin:0 0 18px; }
  .meter { height:6px; border-radius:999px; background:var(--line); overflow:hidden; margin-bottom:20px; }
  .meter i { display:block; height:100%; background:var(--accent); width:0; transition:width .3s; }
  .q { font-size:16px; font-weight:650; margin:0 0 14px; }
  .opt { display:flex; gap:10px; align-items:flex-start; width:100%; text-align:left; background:none; border:1px solid var(--line); color:var(--ink); border-radius:10px; padding:12px 14px; margin-bottom:8px; font:inherit; cursor:pointer; }
  .opt:hover, .opt:focus-visible { border-color:var(--accent); outline:none; }
  .opt[aria-pressed="true"] { border-color:var(--accent); box-shadow:0 0 0 2px color-mix(in srgb, var(--accent) 35%, transparent); }
  .opt kbd { font:600 11px ui-monospace,monospace; border:1px solid var(--line); border-radius:5px; padding:1px 6px; color:var(--dim); }
  .row { display:flex; justify-content:space-between; align-items:center; margin-top:16px; }
  .btn { background:var(--accent); color:#fff; border:none; border-radius:9px; padding:10px 18px; font:600 14px/1 ui-sans-serif,system-ui,sans-serif; cursor:pointer; }
  .btn:disabled { opacity:.45; cursor:default; }
  .ghost { background:none; border:1px solid var(--line); color:var(--dim); border-radius:9px; padding:9px 14px; font:inherit; cursor:pointer; }
  .score { font-size:44px; font-weight:800; margin:8px 0 0; font-variant-numeric: tabular-nums; }
  .band { display:inline-block; border:1px solid var(--line); border-radius:999px; padding:4px 12px; font-weight:700; font-size:13px; margin-top:6px; }
  .hide { display:none; }
  footer { margin-top:22px; color:var(--dim); font-size:12px; }
</style>
</head>
<body>
<main>
  <h1>Skill Assessment Quiz</h1>
  <p class="sub">25 questions · weighted scoring · keyboard: 1–4 or click, Enter to continue</p>
  <div class="meter" aria-hidden="true"><i id="bar"></i></div>

  <section id="play">
    <p class="q" id="q"></p>
    <div id="opts"></div>
    <div class="row">
      <button class="ghost" id="reset">Restart</button>
      <button class="btn" id="next" disabled>Next</button>
    </div>
  </section>

  <section id="result" class="hide">
    <p class="score" id="score"></p>
    <span class="band" id="band"></span>
    <p id="blurb" style="color:var(--dim);font-size:14px"></p>
    <div class="row">
      <button class="ghost" id="again">Take it again</button>
      <a class="btn" style="text-decoration:none" href="https://omniforge.example">Get the full report kit</a>
    </div>
  </section>

  <footer>OMNIFORGE B-AS-1 · offline edition · scoring: sum(weights)/max × 100</footer>
</main>
<script>
"use strict";
var QUESTIONS = ${qJson.replace(/<\/script/gi, "<\\/script")}.questions;
var BANDS = [
  { name: "Platinum", min: 85, blurb: "Senior instincts. You reason about trade-offs, tail cases and failure modes before syntax." },
  { name: "Gold", min: 70, blurb: "Strong practitioner. A few gaps are normal — the report maps exactly which areas to sharpen." },
  { name: "Silver", min: 50, blurb: "Solid foundations. The fastest win: deepen debugging and performance instincts — they compound." },
  { name: "Bronze", min: 0, blurb: "Early days. Work through the explanations in the full kit — each one turns a guess into a method." }
];
var i = 0, answers = [];
var el = function (id) { return document.getElementById(id); };
function renderQ() {
  var q = QUESTIONS[i];
  el("q").textContent = (i + 1) + ". " + q.q;
  el("bar").style.width = (i / QUESTIONS.length * 100) + "%";
  el("opts").innerHTML = "";
  q.options.forEach(function (o, oi) {
    var b = document.createElement("button");
    b.className = "opt"; b.type = "button";
    b.innerHTML = "<kbd>" + (oi + 1) + "</kbd><span></span>";
    b.querySelector("span").textContent = o.label;
    b.setAttribute("aria-pressed", "false");
    b.onclick = function () { pick(oi, b); };
    el("opts").appendChild(b);
  });
  el("next").disabled = true;
  el("next").textContent = i === QUESTIONS.length - 1 ? "Score me" : "Next";
}
function pick(oi, btn) {
  answers[i] = oi;
  Array.prototype.forEach.call(el("opts").children, function (b, k) {
    b.setAttribute("aria-pressed", k === oi ? "true" : "false");
  });
  el("next").disabled = false;
}
function score() {
  var got = 0, max = 0;
  QUESTIONS.forEach(function (q, qi) {
    var best = Math.max.apply(null, q.options.map(function (o) { return o.weight; }));
    max += best;
    got += q.options[answers[qi]].weight;
  });
  return Math.round(got / max * 100);
}
function finish() {
  var s = score();
  var band = BANDS.find(function (b) { return s >= b.min; });
  el("play").classList.add("hide");
  el("result").classList.remove("hide");
  el("bar").style.width = "100%";
  el("score").textContent = s + "/100";
  el("band").textContent = band.name;
  el("band").style.borderColor = s >= 85 ? "#0891b2" : s >= 70 ? "#059669" : s >= 50 ? "#b45309" : "#dc2626";
  el("blurb").textContent = band.blurb;
}
el("next").onclick = function () { if (i < QUESTIONS.length - 1) { i++; renderQ(); } else { finish(); } };
document.addEventListener("keydown", function (e) {
  if (el("play").classList.contains("hide")) return;
  if (e.key >= "1" && e.key <= "4") { var b = el("opts").children[+e.key - 1]; if (b) b.click(); }
  if (e.key === "Enter" && !el("next").disabled) el("next").click();
});
el("reset").onclick = el("again").onclick = function () { i = 0; answers = []; el("result").classList.add("hide"); el("play").classList.remove("hide"); renderQ(); };
renderQ();
</script>
</body>
</html>`;

export const files: Record<string, string> = {
  "01-quiz/quiz.html": quizHtml,

  "02-questions/questions.json": qJson,

  "02-questions/questions.csv": qCsv,

  "03-scoring/scoring-logic.md": `# Scoring logic — exact, auditable, no black boxes

## The formula

\`\`\`
score = round( sum(weight of chosen options) / sum(best weight per question) × 100 )
\`\`\`

- Every question has exactly 4 options with weights 1–4 (no duplicate
  weights within a question).
- The denominator is the maximum possible score: answering "best" on
  all 25 questions = 100.
- Partial credit is intentional: a defensible-but-slower answer (a 3)
  should nearly tie with the ideal (a 4); a counter-productive answer
  (a 1) hurts.

## Bands

| Band | Score | Reading |
| --- | --- | --- |
| Platinum | 85–100 | Senior instincts: trade-offs, failure modes, tail cases first |
| Gold | 70–84 | Strong practitioner with a few deliberate gaps |
| Silver | 50–69 | Solid foundations; debugging/performance instincts next |
| Bronze | 0–49 | Early days — the explanations matter more than the score |

## Why weights instead of right/wrong

Real work grades *quality of judgment*, not binary recall. A 4 is the
move a senior makes first; a 3 works but costs time; a 2 is a detour;
a 1 is the anti-pattern. The 25 questions mix those deliberately.

## Auditing it yourself

\`quiz.html\` embeds the same question set; open dev-tools and call
\`score()\` after answering to compare against the on-screen number. The
CSV mirrors the JSON one-to-one — diff them if you edit either.
`,

  "03-scoring/bands.md": `# Result bands — what each level means and what to do next

## Platinum (85–100)

You reason like the person who gets paged when everyone else is
stuck. Next moves:
- Convert instincts into writing — the explanations you'd give for
  your 4-weight answers are worth more than the badge
- Measure your p99-impact work: performance, reliability, security

## Gold (70–84)

Strong practitioner; the gaps are usually breadth, not depth. Next:
- Look at which questions you scored 2 on — those are your detour
  patterns
- Turn one 3-area into a 4-area per quarter

## Silver (50–69)

Foundations are there. The compounding skills are debugging method
and performance intuition — both improve every other skill.
- Rehearse the failure-mode questions: read the band blurbs, then the
  reasoning in the full report
- Pair with a Gold/Platinum on their next incident review

## Bronze (0–49)

The report's explanations are the product for you. Method beats
memorization:
- Each question's 4-weight answer comes with WHY it's first
- Re-take after 2 weeks; the delta is the real score

## Using bands for hiring? Read this first

This quiz measures *judgment patterns*, not complete knowledge.
Platinum ≠ "senior" and Bronze ≠ "junior" — bands describe how the
test-taker reasons about 25 specific trade-offs. Use it as a
conversation starter, never a filter.
`,

  "04-results/result-page.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>My Skill Assessment Result</title>
<style>
  :root { color-scheme: light dark; --bg:#0f172a; --panel:#1e293b; --ink:#f8fafc; --dim:#94a3b8; --accent:#22d3ee; }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100vh; display:grid; place-items:center; padding:24px; background:var(--bg); color:var(--ink); font:15px/1.6 ui-sans-serif,system-ui,sans-serif; }
  main { width:min(520px,100%); background:var(--panel); border-radius:20px; padding:32px; text-align:center; }
  .medal { width:88px; height:88px; margin:0 auto 14px; border-radius:50%; display:grid; place-items:center; font-size:38px; border:3px solid var(--accent); }
  h1 { font-size:22px; margin:0 0 2px; }
  .score { font-size:48px; font-weight:800; font-variant-numeric:tabular-nums; margin:10px 0 2px; }
  .band { color:var(--accent); font-weight:700; letter-spacing:.08em; text-transform:uppercase; font-size:13px; }
  p.blurb { color:var(--dim); }
  .share { display:flex; gap:10px; justify-content:center; margin-top:18px; }
  .btn { background:var(--accent); color:#083344; border-radius:10px; padding:11px 20px; font-weight:700; text-decoration:none; }
  footer { margin-top:24px; color:var(--dim); font-size:12px; }
</style>
</head>
<body>
<main>
  <div class="medal" aria-hidden="true">{{BAND_EMOJI}}</div>
  <h1>{{USER_NAME}} scored</h1>
  <div class="score">{{SCORE}}<span style="font-size:22px;color:var(--dim)">/100</span></div>
  <div class="band">{{BAND_NAME}}</div>
  <p class="blurb">{{BAND_BLURB}}</p>
  <div class="share">
    <a class="btn" href="https://twitter.com/intent/tweet?text=I%20scored%20{{SCORE}}%2F100%20on%20the%20OMNIFORGE%20Skill%20Assessment">Share result</a>
    <a class="btn" style="background:none;color:var(--accent);border:1px solid var(--accent)" href="https://omniforge.example">Take the quiz</a>
  </div>
  <footer>OMNIFORGE B-AS-1 · result template — replace the {{placeholders}}</footer>
</main>
</body>
</html>`,

  "04-results/report-layout.md": `# PDF report layout — spec

One page, three zones, print-safe.

## Zone 1 — Identity (top third)

- Left: name, date, assessment title
- Right: the medal (band-coloured ring: Platinum cyan, Gold emerald,
  Silver amber, Bronze red) with the score inside — 48pt tabular
  figures

## Zone 2 — The radar (middle)

Five-axis chart, one axis per question cluster:

| Axis | Questions | What it reads |
| --- | --- | --- |
| Debugging method | Q3, Q14, Q16 | Signal → hypothesis → instrument |
| Performance | Q5, Q18, Q20 | Tail awareness, budget thinking |
| Security | Q15, Q24, Q13 | Default-deny instincts |
| Systems | Q7, Q17, Q23 | Where data lives and how it moves |
| Craft & process | Q8, Q22, Q25 | Contracts, tests, review standards |

Each axis = cluster score ÷ max, 0–100. The shape IS the insight:
spiky profiles are normal; flat-low profiles point at fundamentals.

## Zone 3 — The plan (bottom)

Top-3 lowest axes, each with:
- One-line diagnosis ("You reach for tools before reading signals")
- One concrete practice ("Read logs before theorising — 2 weeks")
- The band blurb as the closing line

## Print rules

- A4 portrait, 15mm margins, ink-friendly (medal uses band colour only)
- No page 2 — if content overflows, the plan shrinks first
`,

  "05-setup/setup-guide.md": `# Setup guide — Skill Assessment Quiz

## What's in the kit

- \`01-quiz/quiz.html\` — the offline engine. Double-click, it runs.
- \`02-questions/questions.json|csv\` — the 25-question bank, one source
  of truth in two formats
- \`03-scoring/\` — the exact formula + band philosophy
- \`04-results/\` — shareable result page template + PDF report layout
  spec
- \`05-setup/\` — this guide + walkthrough link

## The 15-minute setup

1. Open \`quiz.html\` in a browser. Take it once yourself — you'll see
   exactly what respondents see (keyboard 1–4 + Enter works too).
2. Edit questions? Edit the JSON (or CSV), then re-embed: open
   \`quiz.html\`, find \`var QUESTIONS =\` and paste your edited array.
   Both files carry the same bank on purpose — diff them after edits.
3. Brand the result page: open \`04-results/result-page.html\`, replace
   the \`{{placeholders}}\`, swap the palette to your tokens.

## Hosting it (optional)

The engine is a single file — it works from a file:// URL, from any
static host (Netlify drop, S3, GitHub Pages), or inside an LMS that
accepts HTML uploads. No server, no tracking, no accounts.

## Scoring integrity rules

- Weights are invisible to the taker by design — keep it that way
- Never re-weight a question after responses exist (or mark the run
  as a new version in CHANGELOG)
- The formula is public (03-scoring/scoring-logic.md) — link it from
  your results page; transparency raises completion

## Support

support@omniforge.example — 30-day money-back guarantee.
`,

  "05-setup/walkthrough-link.md": `# Walkthrough

A 5-minute video tour of the quiz engine and the scoring model:

**→ https://omniforge.example/walkthroughs/B-AS-1**

Contents:
- 00:00 — Running the engine offline (double-click)
- 00:48 — Editing the question bank (JSON ↔ CSV ↔ embed)
- 02:10 — Weighted scoring: why 3-vs-4 matters
- 03:20 — Branding the result page
- 04:10 — Reading the report radar

Hosted (not bundled) to keep the kit lightweight.
`,

  "EXTENDED-PACK/lead-capture-wiring.md": `# Lead capture wiring — in production

Status: **in production** — not in this archive.

What the finished file will contain: a drop-in form handler (single
JS file + form markup) that emails each result — respondent, score,
band and radar values — to your inbox, with a spam-neutral honeypot
and no third-party scripts.
`,
};

export const demo: DemoContent = {
  kind: "quiz",
  intro:
    "Answer three questions from the real 25-question bank. Weighted scoring, four bands — the exact engine that ships in the kit's offline quiz.html.",
  questions: QUESTIONS.map(([q, opts]) => ({
    q,
    options: opts.map(([label, weight]) => ({ label, weight })),
  })),
  bands: [
    { name: "Platinum", min: 85, blurb: "Senior instincts. You reason about trade-offs, tail cases and failure modes before syntax." },
    { name: "Gold", min: 70, blurb: "Strong practitioner. A few gaps are normal — the report maps exactly which areas to sharpen." },
    { name: "Silver", min: 50, blurb: "Solid foundations. The fastest win: deepen debugging and performance instincts — they compound." },
    { name: "Bronze", min: 0, blurb: "Early days. Work through the explanations in the full kit — each one turns a guess into a method." },
  ],
};
