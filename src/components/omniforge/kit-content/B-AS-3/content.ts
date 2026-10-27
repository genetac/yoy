/* ════════════════════════════════════════════════════════════════════
   B-AS-3 · Business Health Check — offline quiz engine, 25 weighted
   questions (.json + .csv), scoring docs, result assets.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-AS-3";

export const files: Record<string, string> = {
  "01-quiz/quiz.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Business Health Check — OMNIFORGE</title>
<style>
  :root { color-scheme: light dark; --bg:#fafaf9; --panel:#fff; --ink:#18181b; --dim:#71717a; --line:#e4e4e7; --accent:#0e7490; }
  @media (prefers-color-scheme: dark) { :root { --bg:#101012; --panel:#18181b; --ink:#f4f4f5; --dim:#a1a1aa; --line:#27272a; --accent:#0e7490; } }
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
  <h1>Business Health Check</h1>
  <p class="sub">25 questions across finance, pipeline, ops and team — weighted scoring, four bands, an action map that turns your score into homework.</p>
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
var QUESTIONS = {
  "questions": [
    {
      "q": "Do you know your exact cash position today — without opening a spreadsheet?",
      "options": [
        {
          "label": "No, I check when I must",
          "weight": 1
        },
        {
          "label": "Roughly, in my head",
          "weight": 2
        },
        {
          "label": "Yes, within a day's accuracy",
          "weight": 3
        },
        {
          "label": "Yes — dashboard updates daily",
          "weight": 4
        }
      ]
    },
    {
      "q": "How many months of runway can you see right now?",
      "options": [
        {
          "label": "Runway isn't the right word here",
          "weight": 1
        },
        {
          "label": "Under 3 months",
          "weight": 2
        },
        {
          "label": "3–6 months",
          "weight": 3
        },
        {
          "label": "6+ months, modelled with scenarios",
          "weight": 4
        }
      ]
    },
    {
      "q": "When a customer pays late, what happens?",
      "options": [
        {
          "label": "I notice when cash gets tight",
          "weight": 1
        },
        {
          "label": "I send a reminder when I remember",
          "weight": 2
        },
        {
          "label": "There's a dunning cadence I follow",
          "weight": 3
        },
        {
          "label": "Automated reminders + a late-fee policy that's actually applied",
          "weight": 4
        }
      ]
    },
    {
      "q": "What's your gross margin, roughly?",
      "options": [
        {
          "label": "Honestly unsure",
          "weight": 1
        },
        {
          "label": "I know revenue, not margin",
          "weight": 2
        },
        {
          "label": "Within a 10% band",
          "weight": 3
        },
        {
          "label": "Per product line, reviewed quarterly",
          "weight": 4
        }
      ]
    },
    {
      "q": "Revenue concentration: your top client is what % of revenue?",
      "options": [
        {
          "label": "Over 50%",
          "weight": 1
        },
        {
          "label": "30–50%",
          "weight": 2
        },
        {
          "label": "15–30%",
          "weight": 3
        },
        {
          "label": "Under 15%",
          "weight": 4
        }
      ]
    },
    {
      "q": "If sales stopped for 60 days, the business would…",
      "options": [
        {
          "label": "Be in serious trouble",
          "weight": 1
        },
        {
          "label": "Survive but scarred",
          "weight": 2
        },
        {
          "label": "Tighten and hold",
          "weight": 3
        },
        {
          "label": "Run lean on the playbook we've written",
          "weight": 4
        }
      ]
    },
    {
      "q": "Where do new leads actually come from?",
      "options": [
        {
          "label": "Word of mouth, untracked",
          "weight": 2
        },
        {
          "label": "One channel that works",
          "weight": 3
        },
        {
          "label": "Two+ channels, both measured",
          "weight": 4
        },
        {
          "label": "Referrals only, and they're drying up",
          "weight": 1
        }
      ]
    },
    {
      "q": "Your sales pipeline is…",
      "options": [
        {
          "label": "A list of hopes",
          "weight": 1
        },
        {
          "label": "In my head and inbox",
          "weight": 2
        },
        {
          "label": "In a doc/board, loosely maintained",
          "weight": 3
        },
        {
          "label": "Stage-defined, with next steps and dates per deal",
          "weight": 4
        }
      ]
    },
    {
      "q": "How long is your average sales cycle?",
      "options": [
        {
          "label": "Varies wildly, no average",
          "weight": 1
        },
        {
          "label": "Months — but I couldn't say how many",
          "weight": 2
        },
        {
          "label": "Known roughly by feel",
          "weight": 3
        },
        {
          "label": "Measured, and we work to shorten it",
          "weight": 4
        }
      ]
    },
    {
      "q": "When you lose a deal, do you know why?",
      "options": [
        {
          "label": "Rarely",
          "weight": 1
        },
        {
          "label": "Sometimes they tell us",
          "weight": 2
        },
        {
          "label": "We ask and record it",
          "weight": 3
        },
        {
          "label": "We analyse losses monthly and it changes the pitch",
          "weight": 4
        }
      ]
    },
    {
      "q": "Do customers come back / expand?",
      "options": [
        {
          "label": "One-and-done mostly",
          "weight": 1
        },
        {
          "label": "Some repeat, untracked",
          "weight": 2
        },
        {
          "label": "Repeat rate known",
          "weight": 3
        },
        {
          "label": "NRR tracked; expansion is a planned motion",
          "weight": 4
        }
      ]
    },
    {
      "q": "Your pricing was last reviewed…",
      "options": [
        {
          "label": "At founding",
          "weight": 1
        },
        {
          "label": "Over 18 months ago",
          "weight": 2
        },
        {
          "label": "Within the last year",
          "weight": 3
        },
        {
          "label": "This year, with data and a raise shipped",
          "weight": 4
        }
      ]
    },
    {
      "q": "When someone asks 'what do you do?', the team answers…",
      "options": [
        {
          "label": "Differently, each in their own words",
          "weight": 1
        },
        {
          "label": "Similarly but improvised",
          "weight": 2
        },
        {
          "label": "With one agreed sentence",
          "weight": 3
        },
        {
          "label": "With one sentence, tested on customers",
          "weight": 4
        }
      ]
    },
    {
      "q": "Do you know your customer acquisition cost?",
      "options": [
        {
          "label": "No",
          "weight": 1
        },
        {
          "label": "A gut number",
          "weight": 2
        },
        {
          "label": "Yes, blended",
          "weight": 3
        },
        {
          "label": "Yes, per channel, with payback period",
          "weight": 4
        }
      ]
    },
    {
      "q": "How do you decide what to build / offer next?",
      "options": [
        {
          "label": "Founder intuition",
          "weight": 2
        },
        {
          "label": "Whatever the loudest customer asked for",
          "weight": 1
        },
        {
          "label": "A prioritised backlog with a rubric",
          "weight": 3
        },
        {
          "label": "Rubric + validation before build",
          "weight": 4
        }
      ]
    },
    {
      "q": "New hires: is there a first-week plan?",
      "options": [
        {
          "label": "They shadow until they get it",
          "weight": 1
        },
        {
          "label": "A doc exists, sometimes used",
          "weight": 2
        },
        {
          "label": "A checklist we actually follow",
          "weight": 3
        },
        {
          "label": "A tested plan; day-30 and day-60 reviews included",
          "weight": 4
        }
      ]
    },
    {
      "q": "If you disappeared for 4 weeks, operations would…",
      "options": [
        {
          "label": "Stall badly",
          "weight": 1
        },
        {
          "label": "Hobble with lots of calls to you",
          "weight": 2
        },
        {
          "label": "Mostly run; a few things would wait",
          "weight": 3
        },
        {
          "label": "Run — that was the design goal",
          "weight": 4
        }
      ]
    },
    {
      "q": "Who can approve spending, and how much?",
      "options": [
        {
          "label": "Unclear until it's a problem",
          "weight": 1
        },
        {
          "label": "Me, always, case by case",
          "weight": 2
        },
        {
          "label": "Written thresholds by role",
          "weight": 3
        },
        {
          "label": "Thresholds + a monthly budget review",
          "weight": 4
        }
      ]
    },
    {
      "q": "Your operating docs (policies, playbooks, how-tos) live…",
      "options": [
        {
          "label": "In people's heads",
          "weight": 1
        },
        {
          "label": "Chat threads and old emails",
          "weight": 2
        },
        {
          "label": "A shared drive, imperfectly organised",
          "weight": 3
        },
        {
          "label": "One searchable home, owner per doc",
          "weight": 4
        }
      ]
    },
    {
      "q": "How are decisions recorded?",
      "options": [
        {
          "label": "They aren't, really",
          "weight": 1
        },
        {
          "label": "In meeting notes if we're lucky",
          "weight": 2
        },
        {
          "label": "A decision log exists",
          "weight": 3
        },
        {
          "label": "Decision log with owner + revisit dates, used weekly",
          "weight": 4
        }
      ]
    },
    {
      "q": "What happens when a customer complains publicly?",
      "options": [
        {
          "label": "Panic, then improvise",
          "weight": 1
        },
        {
          "label": "We respond when we see it",
          "weight": 2
        },
        {
          "label": "There's a response playbook",
          "weight": 3
        },
        {
          "label": "Playbook + a post-mortem that feeds product",
          "weight": 4
        }
      ]
    },
    {
      "q": "Key-person risk: your most critical system is known by…",
      "options": [
        {
          "label": "One person",
          "weight": 1
        },
        {
          "label": "Two people, informally",
          "weight": 2
        },
        {
          "label": "Documented, one owner",
          "weight": 3
        },
        {
          "label": "Documented, two owners, tested by rotation",
          "weight": 4
        }
      ]
    },
    {
      "q": "How often do you look at your numbers as a whole?",
      "options": [
        {
          "label": "Tax time",
          "weight": 1
        },
        {
          "label": "Quarterly, roughly",
          "weight": 2
        },
        {
          "label": "Monthly review on the calendar",
          "weight": 3
        },
        {
          "label": "Monthly review + weekly cash pulse",
          "weight": 4
        }
      ]
    },
    {
      "q": "Your 12-month plan is…",
      "options": [
        {
          "label": "Growth, generally",
          "weight": 1
        },
        {
          "label": "A revenue target",
          "weight": 2
        },
        {
          "label": "Targets + 3 initiatives with owners",
          "weight": 3
        },
        {
          "label": "Initiatives with milestones, reviewed monthly, killable",
          "weight": 4
        }
      ]
    },
    {
      "q": "Honestly: the biggest current risk to the business is…",
      "options": [
        {
          "label": "Named, watched, and has a mitigation owner",
          "weight": 4
        },
        {
          "label": "Named, watched informally",
          "weight": 3
        },
        {
          "label": "A vague worry",
          "weight": 2
        },
        {
          "label": "Whatever this week's fire is",
          "weight": 1
        }
      ]
    }
  ]
}.questions;
var BANDS = [
  { name: "Platinum", min: 85, blurb: "Operationally mature. Your next edge is leverage: systemise what works and price it." },
  { name: "Gold", min: 70, blurb: "Healthy business with defined gaps. The action map turns your weakest axis into a 90-day project." },
  { name: "Silver", min: 50, blurb: "Foundations exist but cash and pipeline visibility are thin — fix those two first; everything else compounds on them." },
  { name: "Bronze", min: 0, blurb: "Early-stage chaos, which is normal and fixable. Start with the cash dashboard; awareness changes decisions within weeks." }
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
</html>`,

  "02-questions/questions.json": "{\n  \"questions\": [\n    {\n      \"q\": \"Do you know your exact cash position today — without opening a spreadsheet?\",\n      \"options\": [\n        {\n          \"label\": \"No, I check when I must\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Roughly, in my head\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Yes, within a day's accuracy\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Yes — dashboard updates daily\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"How many months of runway can you see right now?\",\n      \"options\": [\n        {\n          \"label\": \"Runway isn't the right word here\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Under 3 months\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"3–6 months\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"6+ months, modelled with scenarios\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"When a customer pays late, what happens?\",\n      \"options\": [\n        {\n          \"label\": \"I notice when cash gets tight\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"I send a reminder when I remember\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"There's a dunning cadence I follow\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Automated reminders + a late-fee policy that's actually applied\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"What's your gross margin, roughly?\",\n      \"options\": [\n        {\n          \"label\": \"Honestly unsure\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"I know revenue, not margin\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Within a 10% band\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Per product line, reviewed quarterly\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Revenue concentration: your top client is what % of revenue?\",\n      \"options\": [\n        {\n          \"label\": \"Over 50%\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"30–50%\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"15–30%\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Under 15%\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"If sales stopped for 60 days, the business would…\",\n      \"options\": [\n        {\n          \"label\": \"Be in serious trouble\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Survive but scarred\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Tighten and hold\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Run lean on the playbook we've written\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Where do new leads actually come from?\",\n      \"options\": [\n        {\n          \"label\": \"Word of mouth, untracked\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"One channel that works\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Two+ channels, both measured\",\n          \"weight\": 4\n        },\n        {\n          \"label\": \"Referrals only, and they're drying up\",\n          \"weight\": 1\n        }\n      ]\n    },\n    {\n      \"q\": \"Your sales pipeline is…\",\n      \"options\": [\n        {\n          \"label\": \"A list of hopes\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"In my head and inbox\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"In a doc/board, loosely maintained\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Stage-defined, with next steps and dates per deal\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"How long is your average sales cycle?\",\n      \"options\": [\n        {\n          \"label\": \"Varies wildly, no average\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Months — but I couldn't say how many\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Known roughly by feel\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Measured, and we work to shorten it\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"When you lose a deal, do you know why?\",\n      \"options\": [\n        {\n          \"label\": \"Rarely\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Sometimes they tell us\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"We ask and record it\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"We analyse losses monthly and it changes the pitch\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Do customers come back / expand?\",\n      \"options\": [\n        {\n          \"label\": \"One-and-done mostly\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Some repeat, untracked\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Repeat rate known\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"NRR tracked; expansion is a planned motion\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Your pricing was last reviewed…\",\n      \"options\": [\n        {\n          \"label\": \"At founding\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Over 18 months ago\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Within the last year\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"This year, with data and a raise shipped\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"When someone asks 'what do you do?', the team answers…\",\n      \"options\": [\n        {\n          \"label\": \"Differently, each in their own words\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Similarly but improvised\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"With one agreed sentence\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"With one sentence, tested on customers\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Do you know your customer acquisition cost?\",\n      \"options\": [\n        {\n          \"label\": \"No\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"A gut number\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Yes, blended\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Yes, per channel, with payback period\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"How do you decide what to build / offer next?\",\n      \"options\": [\n        {\n          \"label\": \"Founder intuition\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Whatever the loudest customer asked for\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"A prioritised backlog with a rubric\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Rubric + validation before build\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"New hires: is there a first-week plan?\",\n      \"options\": [\n        {\n          \"label\": \"They shadow until they get it\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"A doc exists, sometimes used\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"A checklist we actually follow\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"A tested plan; day-30 and day-60 reviews included\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"If you disappeared for 4 weeks, operations would…\",\n      \"options\": [\n        {\n          \"label\": \"Stall badly\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Hobble with lots of calls to you\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Mostly run; a few things would wait\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Run — that was the design goal\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Who can approve spending, and how much?\",\n      \"options\": [\n        {\n          \"label\": \"Unclear until it's a problem\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Me, always, case by case\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Written thresholds by role\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Thresholds + a monthly budget review\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Your operating docs (policies, playbooks, how-tos) live…\",\n      \"options\": [\n        {\n          \"label\": \"In people's heads\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Chat threads and old emails\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"A shared drive, imperfectly organised\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"One searchable home, owner per doc\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"How are decisions recorded?\",\n      \"options\": [\n        {\n          \"label\": \"They aren't, really\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"In meeting notes if we're lucky\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"A decision log exists\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Decision log with owner + revisit dates, used weekly\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"What happens when a customer complains publicly?\",\n      \"options\": [\n        {\n          \"label\": \"Panic, then improvise\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"We respond when we see it\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"There's a response playbook\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Playbook + a post-mortem that feeds product\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Key-person risk: your most critical system is known by…\",\n      \"options\": [\n        {\n          \"label\": \"One person\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Two people, informally\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Documented, one owner\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Documented, two owners, tested by rotation\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"How often do you look at your numbers as a whole?\",\n      \"options\": [\n        {\n          \"label\": \"Tax time\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Quarterly, roughly\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Monthly review on the calendar\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Monthly review + weekly cash pulse\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Your 12-month plan is…\",\n      \"options\": [\n        {\n          \"label\": \"Growth, generally\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"A revenue target\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Targets + 3 initiatives with owners\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Initiatives with milestones, reviewed monthly, killable\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Honestly: the biggest current risk to the business is…\",\n      \"options\": [\n        {\n          \"label\": \"Named, watched, and has a mitigation owner\",\n          \"weight\": 4\n        },\n        {\n          \"label\": \"Named, watched informally\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"A vague worry\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Whatever this week's fire is\",\n          \"weight\": 1\n        }\n      ]\n    }\n  ]\n}",

  "02-questions/questions.csv": "number,question,option_a,weight_a,option_b,weight_b,option_c,weight_c,option_d,weight_d\n1,\"Do you know your exact cash position today — without opening a spreadsheet?\",\"No, I check when I must\",1,\"Roughly, in my head\",2,\"Yes, within a day's accuracy\",3,\"Yes — dashboard updates daily\",4\n2,\"How many months of runway can you see right now?\",\"Runway isn't the right word here\",1,\"Under 3 months\",2,\"3–6 months\",3,\"6+ months, modelled with scenarios\",4\n3,\"When a customer pays late, what happens?\",\"I notice when cash gets tight\",1,\"I send a reminder when I remember\",2,\"There's a dunning cadence I follow\",3,\"Automated reminders + a late-fee policy that's actually applied\",4\n4,\"What's your gross margin, roughly?\",\"Honestly unsure\",1,\"I know revenue, not margin\",2,\"Within a 10% band\",3,\"Per product line, reviewed quarterly\",4\n5,\"Revenue concentration: your top client is what % of revenue?\",\"Over 50%\",1,\"30–50%\",2,\"15–30%\",3,\"Under 15%\",4\n6,\"If sales stopped for 60 days, the business would…\",\"Be in serious trouble\",1,\"Survive but scarred\",2,\"Tighten and hold\",3,\"Run lean on the playbook we've written\",4\n7,\"Where do new leads actually come from?\",\"Word of mouth, untracked\",2,\"One channel that works\",3,\"Two+ channels, both measured\",4,\"Referrals only, and they're drying up\",1\n8,\"Your sales pipeline is…\",\"A list of hopes\",1,\"In my head and inbox\",2,\"In a doc/board, loosely maintained\",3,\"Stage-defined, with next steps and dates per deal\",4\n9,\"How long is your average sales cycle?\",\"Varies wildly, no average\",1,\"Months — but I couldn't say how many\",2,\"Known roughly by feel\",3,\"Measured, and we work to shorten it\",4\n10,\"When you lose a deal, do you know why?\",\"Rarely\",1,\"Sometimes they tell us\",2,\"We ask and record it\",3,\"We analyse losses monthly and it changes the pitch\",4\n11,\"Do customers come back / expand?\",\"One-and-done mostly\",1,\"Some repeat, untracked\",2,\"Repeat rate known\",3,\"NRR tracked; expansion is a planned motion\",4\n12,\"Your pricing was last reviewed…\",\"At founding\",1,\"Over 18 months ago\",2,\"Within the last year\",3,\"This year, with data and a raise shipped\",4\n13,\"When someone asks 'what do you do?', the team answers…\",\"Differently, each in their own words\",1,\"Similarly but improvised\",2,\"With one agreed sentence\",3,\"With one sentence, tested on customers\",4\n14,\"Do you know your customer acquisition cost?\",\"No\",1,\"A gut number\",2,\"Yes, blended\",3,\"Yes, per channel, with payback period\",4\n15,\"How do you decide what to build / offer next?\",\"Founder intuition\",2,\"Whatever the loudest customer asked for\",1,\"A prioritised backlog with a rubric\",3,\"Rubric + validation before build\",4\n16,\"New hires: is there a first-week plan?\",\"They shadow until they get it\",1,\"A doc exists, sometimes used\",2,\"A checklist we actually follow\",3,\"A tested plan; day-30 and day-60 reviews included\",4\n17,\"If you disappeared for 4 weeks, operations would…\",\"Stall badly\",1,\"Hobble with lots of calls to you\",2,\"Mostly run; a few things would wait\",3,\"Run — that was the design goal\",4\n18,\"Who can approve spending, and how much?\",\"Unclear until it's a problem\",1,\"Me, always, case by case\",2,\"Written thresholds by role\",3,\"Thresholds + a monthly budget review\",4\n19,\"Your operating docs (policies, playbooks, how-tos) live…\",\"In people's heads\",1,\"Chat threads and old emails\",2,\"A shared drive, imperfectly organised\",3,\"One searchable home, owner per doc\",4\n20,\"How are decisions recorded?\",\"They aren't, really\",1,\"In meeting notes if we're lucky\",2,\"A decision log exists\",3,\"Decision log with owner + revisit dates, used weekly\",4\n21,\"What happens when a customer complains publicly?\",\"Panic, then improvise\",1,\"We respond when we see it\",2,\"There's a response playbook\",3,\"Playbook + a post-mortem that feeds product\",4\n22,\"Key-person risk: your most critical system is known by…\",\"One person\",1,\"Two people, informally\",2,\"Documented, one owner\",3,\"Documented, two owners, tested by rotation\",4\n23,\"How often do you look at your numbers as a whole?\",\"Tax time\",1,\"Quarterly, roughly\",2,\"Monthly review on the calendar\",3,\"Monthly review + weekly cash pulse\",4\n24,\"Your 12-month plan is…\",\"Growth, generally\",1,\"A revenue target\",2,\"Targets + 3 initiatives with owners\",3,\"Initiatives with milestones, reviewed monthly, killable\",4\n25,\"Honestly: the biggest current risk to the business is…\",\"Named, watched, and has a mitigation owner\",4,\"Named, watched informally\",3,\"A vague worry\",2,\"Whatever this week's fire is\",1",

  "03-scoring/scoring-logic.md": `# Scoring logic — Business Health Check

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

  "03-scoring/action-item-map.md": `# Action-item map — score band → the work

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
`,

  "04-results/result-page.html": `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Business Health Check — Result</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#0f172a;color:#f8fafc;font:15px/1.6 ui-sans-serif,system-ui,sans-serif}main{width:min(520px,100%);background:#1e293b;border-radius:20px;padding:32px;text-align:center}.medal{width:88px;height:88px;margin:0 auto 14px;border-radius:50%;display:grid;place-items:center;font-size:38px;border:3px solid #22d3ee}h1{font-size:22px;margin:0 0 2px}.score{font-size:48px;font-weight:800;margin:10px 0 2px;font-variant-numeric:tabular-nums}.band{color:#22d3ee;font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-size:13px}p{color:#94a3b8}.btn{background:#22d3ee;color:#083344;border-radius:10px;padding:11px 20px;font-weight:700;text-decoration:none}footer{margin-top:24px;color:#64748b;font-size:12px}</style></head>
<body><main>
<div class="medal" aria-hidden="true">{{BAND_EMOJI}}</div>
<h1>{{USER_NAME}} scored</h1>
<div class="score">{{SCORE}}<span style="font-size:22px;color:#64748b">/100</span></div>
<div class="band">{{BAND_NAME}}</div>
<p>{{BAND_BLURB}}</p>
<a class="btn" href="https://omniforge.example">Take the assessment</a>
<footer>OMNIFORGE B-AS-3 · result template — replace the {{placeholders}}</footer>
</main></body></html>`,

  "04-results/action-plan-layout.md": `# Action-plan layout — spec

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
`,

  "05-setup/setup-guide.md": `# Setup guide — Business Health Check

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

  "05-setup/walkthrough-link.md": `# Walkthrough

A 5-minute video tour of the Business Health Check engine and scoring model:

**→ https://omniforge.example/walkthroughs/B-AS-3**

Contents:
- 00:00 — Running the engine offline (double-click)
- 00:48 — Editing the question bank (JSON ↔ CSV ↔ embed)
- 02:10 — Weighted scoring: why 3-vs-4 matters
- 03:20 — Branding the result page
- 04:10 — Reading the report

Hosted (not bundled) to keep the kit lightweight.
`,

  "EXTENDED-PACK/benchmark-data.md": `# In production

Status: **in production** — not in this archive.

What the finished file will contain: anonymised band distributions by
industry (retail, SaaS, services, agencies) collected from consenting
runs — so a respondent can see "Silver, services, top quartile" style
context next to their own score.
`,
};

export const demo: DemoContent = {
  kind: "quiz",
  intro: "25 questions across finance, pipeline, ops and team — weighted scoring, four bands, an action map that turns your score into homework.",
  questions: [{"q":"Do you know your exact cash position today — without opening a spreadsheet?","options":[{"label":"No, I check when I must","weight":1},{"label":"Roughly, in my head","weight":2},{"label":"Yes, within a day's accuracy","weight":3},{"label":"Yes — dashboard updates daily","weight":4}]},{"q":"How many months of runway can you see right now?","options":[{"label":"Runway isn't the right word here","weight":1},{"label":"Under 3 months","weight":2},{"label":"3–6 months","weight":3},{"label":"6+ months, modelled with scenarios","weight":4}]},{"q":"When a customer pays late, what happens?","options":[{"label":"I notice when cash gets tight","weight":1},{"label":"I send a reminder when I remember","weight":2},{"label":"There's a dunning cadence I follow","weight":3},{"label":"Automated reminders + a late-fee policy that's actually applied","weight":4}]},{"q":"What's your gross margin, roughly?","options":[{"label":"Honestly unsure","weight":1},{"label":"I know revenue, not margin","weight":2},{"label":"Within a 10% band","weight":3},{"label":"Per product line, reviewed quarterly","weight":4}]},{"q":"Revenue concentration: your top client is what % of revenue?","options":[{"label":"Over 50%","weight":1},{"label":"30–50%","weight":2},{"label":"15–30%","weight":3},{"label":"Under 15%","weight":4}]},{"q":"If sales stopped for 60 days, the business would…","options":[{"label":"Be in serious trouble","weight":1},{"label":"Survive but scarred","weight":2},{"label":"Tighten and hold","weight":3},{"label":"Run lean on the playbook we've written","weight":4}]},{"q":"Where do new leads actually come from?","options":[{"label":"Word of mouth, untracked","weight":2},{"label":"One channel that works","weight":3},{"label":"Two+ channels, both measured","weight":4},{"label":"Referrals only, and they're drying up","weight":1}]},{"q":"Your sales pipeline is…","options":[{"label":"A list of hopes","weight":1},{"label":"In my head and inbox","weight":2},{"label":"In a doc/board, loosely maintained","weight":3},{"label":"Stage-defined, with next steps and dates per deal","weight":4}]},{"q":"How long is your average sales cycle?","options":[{"label":"Varies wildly, no average","weight":1},{"label":"Months — but I couldn't say how many","weight":2},{"label":"Known roughly by feel","weight":3},{"label":"Measured, and we work to shorten it","weight":4}]},{"q":"When you lose a deal, do you know why?","options":[{"label":"Rarely","weight":1},{"label":"Sometimes they tell us","weight":2},{"label":"We ask and record it","weight":3},{"label":"We analyse losses monthly and it changes the pitch","weight":4}]},{"q":"Do customers come back / expand?","options":[{"label":"One-and-done mostly","weight":1},{"label":"Some repeat, untracked","weight":2},{"label":"Repeat rate known","weight":3},{"label":"NRR tracked; expansion is a planned motion","weight":4}]},{"q":"Your pricing was last reviewed…","options":[{"label":"At founding","weight":1},{"label":"Over 18 months ago","weight":2},{"label":"Within the last year","weight":3},{"label":"This year, with data and a raise shipped","weight":4}]},{"q":"When someone asks 'what do you do?', the team answers…","options":[{"label":"Differently, each in their own words","weight":1},{"label":"Similarly but improvised","weight":2},{"label":"With one agreed sentence","weight":3},{"label":"With one sentence, tested on customers","weight":4}]},{"q":"Do you know your customer acquisition cost?","options":[{"label":"No","weight":1},{"label":"A gut number","weight":2},{"label":"Yes, blended","weight":3},{"label":"Yes, per channel, with payback period","weight":4}]},{"q":"How do you decide what to build / offer next?","options":[{"label":"Founder intuition","weight":2},{"label":"Whatever the loudest customer asked for","weight":1},{"label":"A prioritised backlog with a rubric","weight":3},{"label":"Rubric + validation before build","weight":4}]},{"q":"New hires: is there a first-week plan?","options":[{"label":"They shadow until they get it","weight":1},{"label":"A doc exists, sometimes used","weight":2},{"label":"A checklist we actually follow","weight":3},{"label":"A tested plan; day-30 and day-60 reviews included","weight":4}]},{"q":"If you disappeared for 4 weeks, operations would…","options":[{"label":"Stall badly","weight":1},{"label":"Hobble with lots of calls to you","weight":2},{"label":"Mostly run; a few things would wait","weight":3},{"label":"Run — that was the design goal","weight":4}]},{"q":"Who can approve spending, and how much?","options":[{"label":"Unclear until it's a problem","weight":1},{"label":"Me, always, case by case","weight":2},{"label":"Written thresholds by role","weight":3},{"label":"Thresholds + a monthly budget review","weight":4}]},{"q":"Your operating docs (policies, playbooks, how-tos) live…","options":[{"label":"In people's heads","weight":1},{"label":"Chat threads and old emails","weight":2},{"label":"A shared drive, imperfectly organised","weight":3},{"label":"One searchable home, owner per doc","weight":4}]},{"q":"How are decisions recorded?","options":[{"label":"They aren't, really","weight":1},{"label":"In meeting notes if we're lucky","weight":2},{"label":"A decision log exists","weight":3},{"label":"Decision log with owner + revisit dates, used weekly","weight":4}]},{"q":"What happens when a customer complains publicly?","options":[{"label":"Panic, then improvise","weight":1},{"label":"We respond when we see it","weight":2},{"label":"There's a response playbook","weight":3},{"label":"Playbook + a post-mortem that feeds product","weight":4}]},{"q":"Key-person risk: your most critical system is known by…","options":[{"label":"One person","weight":1},{"label":"Two people, informally","weight":2},{"label":"Documented, one owner","weight":3},{"label":"Documented, two owners, tested by rotation","weight":4}]},{"q":"How often do you look at your numbers as a whole?","options":[{"label":"Tax time","weight":1},{"label":"Quarterly, roughly","weight":2},{"label":"Monthly review on the calendar","weight":3},{"label":"Monthly review + weekly cash pulse","weight":4}]},{"q":"Your 12-month plan is…","options":[{"label":"Growth, generally","weight":1},{"label":"A revenue target","weight":2},{"label":"Targets + 3 initiatives with owners","weight":3},{"label":"Initiatives with milestones, reviewed monthly, killable","weight":4}]},{"q":"Honestly: the biggest current risk to the business is…","options":[{"label":"Named, watched, and has a mitigation owner","weight":4},{"label":"Named, watched informally","weight":3},{"label":"A vague worry","weight":2},{"label":"Whatever this week's fire is","weight":1}]}],
  bands: [
  { name: "Platinum", min: 85, blurb: "Operationally mature. Your next edge is leverage: systemise what works and price it." },
  { name: "Gold", min: 70, blurb: "Healthy business with defined gaps. The action map turns your weakest axis into a 90-day project." },
  { name: "Silver", min: 50, blurb: "Foundations exist but cash and pipeline visibility are thin — fix those two first; everything else compounds on them." },
  { name: "Bronze", min: 0, blurb: "Early-stage chaos, which is normal and fixable. Start with the cash dashboard; awareness changes decisions within weeks." }
],
};
