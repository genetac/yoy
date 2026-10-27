/* Generates B-AS-3, B-AS-4 (quiz kits) + C-WK-3, C-WK-4 (site kits).
   Run: bun scripts/gen-kits2.ts */
import { writeFileSync } from "node:fs";

const ROOT = "/home/z/my-project/src/components/omniforge/kit-content";
const esc = (s: string) => s.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

/* ── Quiz engine (same engine as B-AS-1, parameterised) ──────────── */
function quizEngine(title: string, sub: string, questionsJson: string, bandsJs: string, accent: string): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} — OMNIFORGE</title>
<style>
  :root { color-scheme: light dark; --bg:#fafaf9; --panel:#fff; --ink:#18181b; --dim:#71717a; --line:#e4e4e7; --accent:${accent}; }
  @media (prefers-color-scheme: dark) { :root { --bg:#101012; --panel:#18181b; --ink:#f4f4f5; --dim:#a1a1aa; --line:#27272a; --accent:${accent}; } }
  * { box-sizing: border-box; }
  body { margin:0; min-height:100vh; display:grid; place-items:center; padding:24px; background:var(--bg); color:var(--ink); font:15px/1.55 ui-sans-serif,system-ui,sans-serif; }
  main { width: min(620px, 100%); background:var(--panel); border:1px solid var(--line); border-radius:16px; padding:28px; }
  h1 { font-size:19px; margin:0 0 4px; }
  .sub { color:var(--dim); font-size:13px; margin:0 0 18px; }
  .meter { height:6px; border-radius:999px; background:var(--line); overflow:hidden; margin-bottom:20px; }
  .meter i { display:block; height:100%; background:var(--accent); width:0; transition:width .3s; }
  .q { font-size:16px; font-weight:650; margin:0 0 14px; }
  .opt { display:flex; gap:10px; width:100%; text-align:left; background:none; border:1px solid var(--line); color:var(--ink); border-radius:10px; padding:12px 14px; margin-bottom:8px; font:inherit; cursor:pointer; }
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
  <h1>${title}</h1>
  <p class="sub">${sub}</p>
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
      <a class="btn" style="text-decoration:none" href="https://omniforge.example">Get the full kit</a>
    </div>
  </section>
  <footer>OMNIFORGE · offline edition · scoring: sum(weights)/max × 100</footer>
</main>
<script>
"use strict";
var QUESTIONS = ${questionsJson.replace(/<\/script/gi, "<\\/script")}.questions;
var BANDS = ${bandsJs};
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
    b.onclick = function () { pick(oi); };
    el("opts").appendChild(b);
  });
  el("next").disabled = true;
  el("next").textContent = i === QUESTIONS.length - 1 ? "Score me" : "Next";
}
function pick(oi) {
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
}

/* Compact question format: [q, [opt,weight] × 4] */
type Q = [string, [string, number][]][];
function bank(QUESTIONS: Q[]) {
  const json = JSON.stringify(
    { questions: QUESTIONS.map(([q, opts]) => ({ q, options: opts.map(([label, weight]) => ({ label, weight })) })) },
    null,
    2
  );
  const csv =
    "number,question,option_a,weight_a,option_b,weight_b,option_c,weight_c,option_d,weight_d\n" +
    QUESTIONS.map(([q, o], i) =>
      `${i + 1},"${q.replace(/"/g, '""')}","${o[0][0].replace(/"/g, '""')}",${o[0][1]},"${o[1][0].replace(/"/g, '""')}",${o[1][1]},"${o[2][0].replace(/"/g, '""')}",${o[2][1]},"${o[3][0].replace(/"/g, '""')}",${o[3][1]}`
    ).join("\n");
  return { json, csv, demoQs: JSON.parse(json).questions };
}

/* ═══════════════ B-AS-3 · Business Health Check ═══════════════ */

const AS3_Q: Q[] = [
  ["Do you know your exact cash position today — without opening a spreadsheet?", [["No, I check when I must", 1], ["Roughly, in my head", 2], ["Yes, within a day's accuracy", 3], ["Yes — dashboard updates daily", 4]]],
  ["How many months of runway can you see right now?", [["Runway isn't the right word here", 1], ["Under 3 months", 2], ["3–6 months", 3], ["6+ months, modelled with scenarios", 4]]],
  ["When a customer pays late, what happens?", [["I notice when cash gets tight", 1], ["I send a reminder when I remember", 2], ["There's a dunning cadence I follow", 3], ["Automated reminders + a late-fee policy that's actually applied", 4]]],
  ["What's your gross margin, roughly?", [["Honestly unsure", 1], ["I know revenue, not margin", 2], ["Within a 10% band", 3], ["Per product line, reviewed quarterly", 4]]],
  ["Revenue concentration: your top client is what % of revenue?", [["Over 50%", 1], ["30–50%", 2], ["15–30%", 3], ["Under 15%", 4]]],
  ["If sales stopped for 60 days, the business would…", [["Be in serious trouble", 1], ["Survive but scarred", 2], ["Tighten and hold", 3], ["Run lean on the playbook we've written", 4]]],
  ["Where do new leads actually come from?", [["Word of mouth, untracked", 2], ["One channel that works", 3], ["Two+ channels, both measured", 4], ["Referrals only, and they're drying up", 1]]],
  ["Your sales pipeline is…", [["A list of hopes", 1], ["In my head and inbox", 2], ["In a doc/board, loosely maintained", 3], ["Stage-defined, with next steps and dates per deal", 4]]],
  ["How long is your average sales cycle?", [["Varies wildly, no average", 1], ["Months — but I couldn't say how many", 2], ["Known roughly by feel", 3], ["Measured, and we work to shorten it", 4]]],
  ["When you lose a deal, do you know why?", [["Rarely", 1], ["Sometimes they tell us", 2], ["We ask and record it", 3], ["We analyse losses monthly and it changes the pitch", 4]]],
  ["Do customers come back / expand?", [["One-and-done mostly", 1], ["Some repeat, untracked", 2], ["Repeat rate known", 3], ["NRR tracked; expansion is a planned motion", 4]]],
  ["Your pricing was last reviewed…", [["At founding", 1], ["Over 18 months ago", 2], ["Within the last year", 3], ["This year, with data and a raise shipped", 4]]],
  ["When someone asks 'what do you do?', the team answers…", [["Differently, each in their own words", 1], ["Similarly but improvised", 2], ["With one agreed sentence", 3], ["With one sentence, tested on customers", 4]]],
  ["Do you know your customer acquisition cost?", [["No", 1], ["A gut number", 2], ["Yes, blended", 3], ["Yes, per channel, with payback period", 4]]],
  ["How do you decide what to build / offer next?", [["Founder intuition", 2], ["Whatever the loudest customer asked for", 1], ["A prioritised backlog with a rubric", 3], ["Rubric + validation before build", 4]]],
  ["New hires: is there a first-week plan?", [["They shadow until they get it", 1], ["A doc exists, sometimes used", 2], ["A checklist we actually follow", 3], ["A tested plan; day-30 and day-60 reviews included", 4]]],
  ["If you disappeared for 4 weeks, operations would…", [["Stall badly", 1], ["Hobble with lots of calls to you", 2], ["Mostly run; a few things would wait", 3], ["Run — that was the design goal", 4]]],
  ["Who can approve spending, and how much?", [["Unclear until it's a problem", 1], ["Me, always, case by case", 2], ["Written thresholds by role", 3], ["Thresholds + a monthly budget review", 4]]],
  ["Your operating docs (policies, playbooks, how-tos) live…", [["In people's heads", 1], ["Chat threads and old emails", 2], ["A shared drive, imperfectly organised", 3], ["One searchable home, owner per doc", 4]]],
  ["How are decisions recorded?", [["They aren't, really", 1], ["In meeting notes if we're lucky", 2], ["A decision log exists", 3], ["Decision log with owner + revisit dates, used weekly", 4]]],
  ["What happens when a customer complains publicly?", [["Panic, then improvise", 1], ["We respond when we see it", 2], ["There's a response playbook", 3], ["Playbook + a post-mortem that feeds product", 4]]],
  ["Key-person risk: your most critical system is known by…", [["One person", 1], ["Two people, informally", 2], ["Documented, one owner", 3], ["Documented, two owners, tested by rotation", 4]]],
  ["How often do you look at your numbers as a whole?", [["Tax time", 1], ["Quarterly, roughly", 2], ["Monthly review on the calendar", 3], ["Monthly review + weekly cash pulse", 4]]],
  ["Your 12-month plan is…", [["Growth, generally", 1], ["A revenue target", 2], ["Targets + 3 initiatives with owners", 3], ["Initiatives with milestones, reviewed monthly, killable", 4]]],
  ["Honestly: the biggest current risk to the business is…", [["Named, watched, and has a mitigation owner", 4], ["Named, watched informally", 3], ["A vague worry", 2], ["Whatever this week's fire is", 1]]],
];

const as3 = bank(AS3_Q);
const AS3_BANDS = `[
  { name: "Platinum", min: 85, blurb: "Operationally mature. Your next edge is leverage: systemise what works and price it." },
  { name: "Gold", min: 70, blurb: "Healthy business with defined gaps. The action map turns your weakest axis into a 90-day project." },
  { name: "Silver", min: 50, blurb: "Foundations exist but cash and pipeline visibility are thin — fix those two first; everything else compounds on them." },
  { name: "Bronze", min: 0, blurb: "Early-stage chaos, which is normal and fixable. Start with the cash dashboard; awareness changes decisions within weeks." }
]`;

/* ═══════════════ B-AS-4 · Launch Readiness Quiz ═══════════════ */

const AS4_Q: Q[] = [
  ["Can a stranger use the product end-to-end without you in the room?", [["Haven't tested that", 1], ["Once, with hand-holding", 2], ["Mostly — rough edges documented", 3], ["Yes, validated with 5+ strangers", 4]]],
  ["Your onboarding path (first 10 minutes) is…", [["Whatever they figure out", 1], ["A welcome email", 2], ["A guided first-run", 3], ["Guided, measured, iterated from drop-off data", 4]]],
  ["Does the product solve a problem people already pay to solve?", [["We believe so", 2], ["Some signals", 3], ["Validated: pre-orders or waitlist with payment intent", 4], ["Not proven yet", 1]]],
  ["Core loop completeness: the main job gets…", [["Done partially; workarounds needed", 1], ["Done, with rough edges", 2], ["Done cleanly for the happy path", 3], ["Done cleanly including edge cases we tested", 4]]],
  ["Bug triage: launch-blocking bugs are…", [["Undefined — bugs are bugs", 1], ["In a tracker, unranked", 2], ["Ranked by severity", 3], ["Ranked; launch blockers have owners and dates", 4]]],
  ["Load expectation: you know what traffic launch day brings because…", [["We don't", 1], ["A guess based on audience size", 2], ["List sizes + send plan per channel", 3], ["Modelled, with a load test done", 4]]],
  ["Monitoring and alerts: if the site dies at 2am…", [["We find out from users", 1], ["We notice in the morning", 2], ["Uptime monitor pings us", 3], ["Alerts with severity routing; a runbook exists", 4]]],
  ["Rollback plan if the launch build is broken?", [["Rollback? We'd fix forward", 1], ["We could redeploy an old build manually", 2], ["Documented redeploy steps", 3], ["One-command rollback, tested this month", 4]]],
  ["Legal: terms of service and privacy policy are…", [["Not written", 1], ["Copy-pasted from a template, unreviewed", 2], ["Drafted for our actual product", 3], ["Reviewed against data flows; cookie/consent wired", 4]]],
  ["If you collect personal data, where is it stored and who can access it?", [["An honest 'not sure'", 1], ["Known, access informal", 2], ["Documented; access by role", 3], ["Documented, least-privilege, audit-logged", 4]]],
  ["Pricing page: can a buyer complete purchase without asking you anything?", [["We sell via DMs/calls", 1], ["Page exists; checkout has friction", 2], ["Checkout works; edge cases (refunds, tax) untested", 3], ["Full flow tested incl. refund path", 4]]],
  ["Launch copy (headline, benefits, FAQ) has been…", [["Written once, by the founder, at 2am", 1], ["Reviewed internally", 2], ["Reviewed by friendly customers", 3], ["Tested against 2–3 variants", 4]]],
  ["Email flows at launch (confirmation, welcome, support) are…", [["Manual replies", 1], ["One welcome email", 2], ["Confirmation + welcome automated", 3], ["Confirmation, welcome, and a support-routing flow tested end-to-end", 4]]],
  ["Support channel on launch day is…", [["The founder's personal inbox", 1], ["A shared inbox", 2], ["A help desk with canned replies", 3], ["Help desk + response-time target + escalation path", 4]]],
  ["You've set response-time expectations with customers because…", [["We didn't", 1], ["A line on the contact page", 2], ["Stated SLA (e.g. 'within one business day')", 3], ["Stated SLA we've tested with a soft-launch cohort", 4]]],
  ["Analytics: will you know where launch traffic converts (or dies)?", [["We'll see it in the news", 1], ["Total visits only", 2], ["Funnel events wired", 3], ["Funnel wired + a dashboard the team checks daily", 4]]],
  ["The 'why now' of your launch story is…", [["Vibes", 1], ["Clear to us, untested externally", 2], ["Written and reviewed", 3], ["Written, tested, and it's what the waitlist quotes back", 4]]],
  ["Assets for launch day (screens, demo video, press blurb) are…", [["Not made", 1], ["Half-made, unreviewed", 2], ["Made and approved", 3], ["Made, approved, staged per channel with copy variants", 4]]],
  ["Your waitlist/audience has been warmed by…", [["Nothing yet", 1], ["Occasional updates", 2], ["A regular cadence", 3], ["A cadence that includes the product's actual voice", 4]]],
  ["Success metric for launch week is…", [["Attention, generally", 1], ["Signups, untargeted", 2], ["One numeric target (signups/sales)", 3], ["One target + guardrail metrics (churn signals, support load)", 4]]],
  ["Post-launch week one plan exists?", [["We'll see what happens", 1], ["Rough priorities", 2], ["A fix-list triage plan", 3], ["Fix-list + comms plan + a scheduled retro for day 7", 4]]],
  ["Accessibility: keyboard-only use and contrast have been…", [["Not checked", 1], ["Spot-checked", 2], ["Audited once, main issues fixed", 3], ["Audited (WCAG 2.2 AA), findings closed", 4]]],
  ["Mobile: the full core loop on a phone is…", [["Untested", 1], ["Looks okay in dev tools", 2], ["Tested on real devices", 3], ["Tested on real devices by non-team users", 4]]],
  ["Backups and data loss: if the database vanished today…", [["It's gone", 1], ["We'd lose up to a day", 2], ["Daily backups, restore untested", 3], ["Backups with a tested restore", 4]]],
  ["Honestly, the biggest untested assumption still standing is…", [["Named, and there's an experiment running to test it", 4], ["Named, no test yet", 3], ["A feeling we avoid naming", 2], ["We test nothing until launch", 1]]],
];

const as4 = bank(AS4_Q);
const AS4_BANDS = `[
  { name: "Platinum", min: 85, blurb: "Launch-ready. Ship it — and keep the day-7 retro on the calendar." },
  { name: "Gold", min: 70, blurb: "Ready with caveats. Close the two lowest dimensions before the date; they rarely fix themselves post-launch." },
  { name: "Silver", min: 50, blurb: "Not yet. The gap report shows which dimension blocks you — usually ops or support, not the product." },
  { name: "Bronze", min: 0, blurb: "Pre-launch stage. Work the 5 dimensions in order; a soft launch at this stage burns your list." }
]`;

function quizKit(opts: {
  kitId: string; title: string; sub: string; accent: string;
  q: ReturnType<typeof bank>; bandsJs: string; bandBlurbs: string;
  dimensionDoc: string; scoringDoc: string; resultLayout: string;
  setupGuide: string; stubPath: string; stubWhat: string;
}): string {
  const engine = quizEngine(opts.title, opts.sub, opts.q.json, opts.bandsJs, opts.accent);
  const resultPage = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${opts.title} — Result</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#0f172a;color:#f8fafc;font:15px/1.6 ui-sans-serif,system-ui,sans-serif}main{width:min(520px,100%);background:#1e293b;border-radius:20px;padding:32px;text-align:center}.medal{width:88px;height:88px;margin:0 auto 14px;border-radius:50%;display:grid;place-items:center;font-size:38px;border:3px solid #22d3ee}h1{font-size:22px;margin:0 0 2px}.score{font-size:48px;font-weight:800;margin:10px 0 2px;font-variant-numeric:tabular-nums}.band{color:#22d3ee;font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-size:13px}p{color:#94a3b8}.btn{background:#22d3ee;color:#083344;border-radius:10px;padding:11px 20px;font-weight:700;text-decoration:none}footer{margin-top:24px;color:#64748b;font-size:12px}</style></head>
<body><main>
<div class="medal" aria-hidden="true">{{BAND_EMOJI}}</div>
<h1>{{USER_NAME}} scored</h1>
<div class="score">{{SCORE}}<span style="font-size:22px;color:#64748b">/100</span></div>
<div class="band">{{BAND_NAME}}</div>
<p>{{BAND_BLURB}}</p>
<a class="btn" href="https://omniforge.example">Take the assessment</a>
<footer>OMNIFORGE ${opts.kitId} · result template — replace the {{placeholders}}</footer>
</main></body></html>`;

  return `/* ════════════════════════════════════════════════════════════════════
   ${opts.kitId} · ${opts.title} — offline quiz engine, 25 weighted
   questions (.json + .csv), scoring docs, result assets.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "${opts.kitId}";

export const files: Record<string, string> = {
  "01-quiz/quiz.html": \`${esc(engine)}\`,

  "02-questions/questions.json": ${JSON.stringify(opts.q.json)},

  "02-questions/questions.csv": ${JSON.stringify(opts.q.csv)},

  "03-scoring/scoring-logic.md": \`${esc(opts.scoringDoc)}\`,

  "03-scoring/${opts.dimensionDoc.split("|").pop()}": \`${esc(opts.dimensionDoc.split("|").slice(0, -1).join("|"))}\`,

  "04-results/result-page.html": \`${esc(resultPage)}\`,

  "04-results/${opts.resultLayout.split("|").pop()}": \`${esc(opts.resultLayout.split("|").slice(0, -1).join("|"))}\`,

  "05-setup/setup-guide.md": \`${esc(opts.setupGuide)}\`,

  "05-setup/walkthrough-link.md": \`# Walkthrough

A 5-minute video tour of the ${opts.title} engine and scoring model:

**→ https://omniforge.example/walkthroughs/${opts.kitId}**

Contents:
- 00:00 — Running the engine offline (double-click)
- 00:48 — Editing the question bank (JSON ↔ CSV ↔ embed)
- 02:10 — Weighted scoring: why 3-vs-4 matters
- 03:20 — Branding the result page
- 04:10 — Reading the report

Hosted (not bundled) to keep the kit lightweight.
\`,

  "${opts.stubPath}": \`# In production

Status: **in production** — not in this archive.

${opts.stubWhat}
\`,
};

export const demo: DemoContent = {
  kind: "quiz",
  intro: ${JSON.stringify(opts.sub)},
  questions: ${JSON.stringify(opts.q.demoQs)},
  bands: ${opts.bandsJs.replace(/\{/g, "{ name:").replace(/name: name:/g, "name:")},
};
`;
}

/* AS-3 docs */
const as3Module = quizKit({
  kitId: "B-AS-3",
  title: "Business Health Check",
  sub: "25 questions across finance, pipeline, ops and team — weighted scoring, four bands, an action map that turns your score into homework.",
  accent: "#0e7490",
  q: as3,
  bandsJs: AS3_BANDS,
  dimensionDoc: `# Action-item map — score band → the work

## How to use this map

Your band tells you *urgency*; your weakest questions tell you
*where*. Cross-reference: find your band below, then pull the 3
lowest-scoring questions from your run and apply their fixes first.

## Platinum (85–100) — leverage phase

- **Pricing audit** — you have the margin data; run a value-based
  raise on the top quartile of clients
- **Systemise one hero process** — document the thing you're best at
  until someone else can run it at 80% quality
- **Key-person rotation drill** — test the "two owners" rule for your
  most critical system, this quarter

## Gold (70–84) — closing gaps

- The 2–3 questions you scored 1–2 on ARE the 90-day plan; each one
  becomes a project with an owner and a definition of done
- Typical Gold gaps: CAC measurement, decision log, loss analysis —
  all three fixable in a month

## Silver (50–69) — foundations first

Priority order (resist re-ordering):
1. **Cash dashboard** — runway, burn, top-5 payables, on one screen.
   Awareness changes decisions within two weeks
2. **Pipeline board** — five stages, next step + date per deal. A
   truth-telling pipeline beats a flattering one
3. **Client concentration** — if one client > 30%, new business is
   not optional; timebox 4 hours weekly until < 25%

## Bronze (0–49) — triage

- **Week 1:** separate business and personal money completely;
  one account, one card, no mixing
- **Week 2:** list every recurring cost; cancel the bottom third
- **Week 3–4:** the cash dashboard + a 13-week cash forecast
  (spreadsheet is fine; updating it weekly is the product)
- Then re-take: the move from Bronze usually happens in one quarter
  of seeing clearly

## The rule of one

One change at a time, with a metric attached. A business that changes
five things learns nothing about any of them.
|action-item-map.md`,
  scoringDoc: `# Scoring logic — Business Health Check

## The formula

\`\`\`
score = round( sum(chosen weights) / sum(best weight per question) × 100 )
\`\`\`

- 25 questions, 4 options each, weights 1–4, no duplicate weights
  within a question
- The denominator = a perfect run (all 4s) = 100
- Partial credit by design: a 3 is "works but fragile", a 2 is
  "improvised", a 1 is the anti-pattern

## Bands

| Band | Score | Reading |
| --- | --- | --- |
| Platinum | 85–100 | Operationally mature; leverage phase |
| Gold | 70–84 | Healthy with defined gaps |
| Silver | 50–69 | Foundations exist; visibility thin |
| Bronze | 0–49 | Early-stage chaos — normal, fixable |

## Dimension coverage

Questions cluster across four dimensions (unevenly on purpose — cash
and pipeline carry more weight than maturity models):

| Dimension | Questions | Why it matters at this weight |
| --- | --- | --- |
| Finance / cash | Q1–6, Q23 | Cash surprises kill businesses that were otherwise fine |
| Sales / pipeline | Q7–11, Q14 | Revenue problems compound monthly |
| Operations / team | Q12–13, 15–22 | Determines whether growth is survivable |
| Strategy / risk | Q24–25 | The 12-month and risk questions bookend honesty |

## Honesty notes

- A 4-weight answer is "true today", not "planned for Q3". Score the
  present, plan the future
- Retake quarterly; the delta between runs is more informative than
  either number alone
- The action-item map (\`action-item-map.md\`) is the actual product —
  the score just routes you into it`,
  resultLayout: `# Action-plan layout — spec

One page, three zones.

## Zone 1 — Identity

Name, date, score (48pt tabular) + band medal. Same shell as the
result page, print-safe.

## Zone 2 — Dimension bars

Four horizontal bars (Finance, Pipeline, Operations, Strategy), each
= cluster score ÷ max. The two shortest get a "→ 90-day project"
tag.

## Zone 3 — The action plan

From the action-item map, your band's block, personalised:
- 3 actions, each with: the question it came from (quoted), the fix
  in one sentence, the owner line, and a 30-day checkpoint
- Closing line: the re-take date, printed — accountability artifact

## Print rules

A4 portrait, one page. The plan zone never spills — if it would,
drop to 2 actions. An unprintable plan doesn't get done.
|action-plan-layout.md`,
  setupGuide: `# Setup guide — Business Health Check

## What's in the kit

- \`01-quiz/quiz.html\` — offline engine, double-click and run
- \`02-questions/questions.json|csv\` — the 25-question bank (one
  source, two formats; diff them after edits)
- \`03-scoring/\` — the formula + the action-item map
- \`04-results/\` — result page template + action-plan layout spec
- \`05-setup/\` — this guide + walkthrough

## The 15-minute setup

1. Take it yourself first — score your own business honestly; the
   1-weight answers sting, that's the product working
2. Rebrand: open \`quiz.html\`, edit the \`<title>\`, \`--accent\` colour
   and the footer; open \`result-page.html\` and swap the palette
3. Advisers/coaches: run it in a client session — the two lowest
   dimensions ARE the engagement proposal; you literally print zone 3

## Scoring integrity rules

- Weights are invisible to takers by design — keep it that way
- Never re-weight questions after responses exist (or version the
  run in CHANGELOG)
- Link the scoring-logic doc from your results page — transparency
  raises completion and trust

## Support

support@omniforge.example — 30-day money-back guarantee.`,
  stubPath: "EXTENDED-PACK/benchmark-data.md",
  stubWhat: `What the finished file will contain: anonymised band distributions by
industry (retail, SaaS, services, agencies) collected from consenting
runs — so a respondent can see "Silver, services, top quartile" style
context next to their own score.`,
});

writeFileSync(`${ROOT}/B-AS-3/content.ts`, as3Module);
console.log("B-AS-3 written,", as3Module.length);

/* AS-4 docs */
const as4Module = quizKit({
  kitId: "B-AS-4",
  title: "Launch Readiness Quiz",
  sub: "25 questions across product, marketing, ops, support and legal — weighted scoring, five dimensions, a gap report that names what blocks your launch date.",
  accent: "#b45309",
  q: as4,
  bandsJs: AS4_BANDS,
  dimensionDoc: `# Dimension weights — the five axes

## The model

\`\`\`
readiness = round( sum(chosen weights) / sum(best weight per question) × 100 )
\`\`\`

Overall score is the simple total — but the *report* is dimensional:
each axis scores independently, and the weakest axis is your
launch-blocker, regardless of the total.

| Dimension | Questions | Weight in report | What "done" looks like |
| --- | --- | --- | --- |
| Product | Q1–5, Q22–23 | 30% | A stranger completes the core loop on mobile, keyboard-only, without you |
| Marketing | Q12–13, Q17–21 | 25% | Copy tested, assets staged, audience warmed, metric defined |
| Ops | Q6–10, Q24 | 20% | Load modelled, monitoring live, rollback tested, backups restored once |
| Support | Q14–16 | 15% | Channel chosen, SLA stated and rehearsed with a soft-launch cohort |
| Legal | Q9–10 | 10% | ToS/privacy match actual data flows; consent wired |

## Why product and marketing dominate

Launches rarely fail because backups were imperfect; they fail
because the product confused strangers or the story didn't land.
Ops failures are *recoverable*; a botched first impression on a
warmed list is not. The weights encode that asymmetry.

## The one-question-per-dimension rule

If any single dimension scores below 60%, it blocks the date even
when the total is Gold. A Platinum launch with a broken checkout is
a Bronze launch with better branding.
|dimension-weights.md`,
  scoringDoc: `# Scoring logic — Launch Readiness Quiz

## The formula

\`\`\`
score = round( sum(chosen weights) / sum(best weight per question) × 100 )
\`\`\`

- 25 questions, 4 options each, weights 1–4 (unique per question)
- Perfect run (all 4s) = 100; partial credit for "works but untested"
  (3) vs "improvised" (2) vs the anti-pattern (1)

## Bands

| Band | Score | Reading |
| --- | --- | --- |
| Platinum | 85–100 | Launch-ready; keep the day-7 retro |
| Gold | 70–84 | Ready with caveats — close the two weakest dimensions |
| Silver | 50–69 | Not yet; usually ops/support, not the product |
| Bronze | 0–49 | Pre-launch; a date now would burn the list |

## Reading the report

The gap report cross-cuts two things:
1. **Weakest dimension** (the blocker) — from dimension-weights.md
2. **Weakest questions** (the fixes) — your 1–2 weighted answers,
   each mapped to a concrete remediation item

The composite is the "two weeks before launch" to-do list, in the
order that de-risks the date fastest.

## Retake discipline

Take it at T-6 weeks, T-3 weeks, and T-3 days. The graph of the
three runs is the real launch review artifact: rising dimensions =
real progress; flat ones = the date is lying to you.`,
  resultLayout: `# Gap report layout — spec

One page, the pre-launch artifact.

## Zone 1 — Identity + verdict

Score, band, and the launch verdict line: "Go" (Gold+, no dimension
under 60), "Go with conditions" (Gold+, one dimension under 60), or
"Hold" — with the blocking dimension named in the verdict itself.

## Zone 2 — Five-axis bar chart

Product · Marketing · Ops · Support · Legal, each scored 0–100 with
the 60-line drawn. Bars under the line get hatch-marked.

## Zone 3 — The gap list

From the 1–2 weighted answers, one row per gap:

\`\`\`
[dimension] question (short)  →  fix (one sentence)  →  owner ____  due ____
\`\`\`

Maximum 8 rows. If there are more than 8 gaps, the date is the gap —
say so instead of listing.

## Print rules

A4 portrait, one page, verdict repeated as the footer on every page
if it spills (it shouldn't). The owner/due blanks are physical on
purpose: handwriting raises follow-through.
|gap-report-layout.md`,
  setupGuide: `# Setup guide — Launch Readiness Quiz

## What's in the kit

- \`01-quiz/quiz.html\` — offline engine, double-click and run
- \`02-questions/questions.json|csv\` — the 25-question bank
- \`03-scoring/\` — the formula + the five-dimension model
- \`04-results/\` — result page template + gap-report layout spec
- \`05-setup/\` — this guide + walkthrough

## The 15-minute setup

1. Take it against your current launch. Score the present, not the
   roadmap — the gap report only works on truth
2. Rebrand the engine (title, accent colour, footer) and the result
   page to your product
3. Teams: have the PM, the ops owner, and support lead each take it
   independently — the disagreements between runs ARE the pre-mortem

## Cadence

T-6 weeks (route the gaps into the sprint), T-3 weeks (verify
closures), T-3 days (the go/no-go print). Skip the T-3-days run and
you'll launch on hope, which occasionally works, never twice.

## Support

support@omniforge.example — 30-day money-back guarantee.`,
  stubPath: "EXTENDED-PACK/notion-launch-tracker.md",
  stubWhat: `What the finished file will contain: a companion Notion tracker that
ingests the gap report — one database, dimension property, owner and
due per row, a "Go/No-Go" board view, and a T-minus checklist that
counts down the three retake dates.`,
});

writeFileSync(`${ROOT}/B-AS-4/content.ts`, as4Module);
console.log("B-AS-4 written,", as4Module.length);
console.log("Quiz kits done. Now run gen-sites.ts for WK-3/WK-4.");
