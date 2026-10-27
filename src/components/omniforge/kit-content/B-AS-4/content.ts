/* ════════════════════════════════════════════════════════════════════
   B-AS-4 · Launch Readiness Quiz — offline quiz engine, 25 weighted
   questions (.json + .csv), scoring docs, result assets.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-AS-4";

export const files: Record<string, string> = {
  "01-quiz/quiz.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Launch Readiness Quiz — OMNIFORGE</title>
<style>
  :root { color-scheme: light dark; --bg:#fafaf9; --panel:#fff; --ink:#18181b; --dim:#71717a; --line:#e4e4e7; --accent:#b45309; }
  @media (prefers-color-scheme: dark) { :root { --bg:#101012; --panel:#18181b; --ink:#f4f4f5; --dim:#a1a1aa; --line:#27272a; --accent:#b45309; } }
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
  <h1>Launch Readiness Quiz</h1>
  <p class="sub">25 questions across product, marketing, ops, support and legal — weighted scoring, five dimensions, a gap report that names what blocks your launch date.</p>
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
      "q": "Can a stranger use the product end-to-end without you in the room?",
      "options": [
        {
          "label": "Haven't tested that",
          "weight": 1
        },
        {
          "label": "Once, with hand-holding",
          "weight": 2
        },
        {
          "label": "Mostly — rough edges documented",
          "weight": 3
        },
        {
          "label": "Yes, validated with 5+ strangers",
          "weight": 4
        }
      ]
    },
    {
      "q": "Your onboarding path (first 10 minutes) is…",
      "options": [
        {
          "label": "Whatever they figure out",
          "weight": 1
        },
        {
          "label": "A welcome email",
          "weight": 2
        },
        {
          "label": "A guided first-run",
          "weight": 3
        },
        {
          "label": "Guided, measured, iterated from drop-off data",
          "weight": 4
        }
      ]
    },
    {
      "q": "Does the product solve a problem people already pay to solve?",
      "options": [
        {
          "label": "We believe so",
          "weight": 2
        },
        {
          "label": "Some signals",
          "weight": 3
        },
        {
          "label": "Validated: pre-orders or waitlist with payment intent",
          "weight": 4
        },
        {
          "label": "Not proven yet",
          "weight": 1
        }
      ]
    },
    {
      "q": "Core loop completeness: the main job gets…",
      "options": [
        {
          "label": "Done partially; workarounds needed",
          "weight": 1
        },
        {
          "label": "Done, with rough edges",
          "weight": 2
        },
        {
          "label": "Done cleanly for the happy path",
          "weight": 3
        },
        {
          "label": "Done cleanly including edge cases we tested",
          "weight": 4
        }
      ]
    },
    {
      "q": "Bug triage: launch-blocking bugs are…",
      "options": [
        {
          "label": "Undefined — bugs are bugs",
          "weight": 1
        },
        {
          "label": "In a tracker, unranked",
          "weight": 2
        },
        {
          "label": "Ranked by severity",
          "weight": 3
        },
        {
          "label": "Ranked; launch blockers have owners and dates",
          "weight": 4
        }
      ]
    },
    {
      "q": "Load expectation: you know what traffic launch day brings because…",
      "options": [
        {
          "label": "We don't",
          "weight": 1
        },
        {
          "label": "A guess based on audience size",
          "weight": 2
        },
        {
          "label": "List sizes + send plan per channel",
          "weight": 3
        },
        {
          "label": "Modelled, with a load test done",
          "weight": 4
        }
      ]
    },
    {
      "q": "Monitoring and alerts: if the site dies at 2am…",
      "options": [
        {
          "label": "We find out from users",
          "weight": 1
        },
        {
          "label": "We notice in the morning",
          "weight": 2
        },
        {
          "label": "Uptime monitor pings us",
          "weight": 3
        },
        {
          "label": "Alerts with severity routing; a runbook exists",
          "weight": 4
        }
      ]
    },
    {
      "q": "Rollback plan if the launch build is broken?",
      "options": [
        {
          "label": "Rollback? We'd fix forward",
          "weight": 1
        },
        {
          "label": "We could redeploy an old build manually",
          "weight": 2
        },
        {
          "label": "Documented redeploy steps",
          "weight": 3
        },
        {
          "label": "One-command rollback, tested this month",
          "weight": 4
        }
      ]
    },
    {
      "q": "Legal: terms of service and privacy policy are…",
      "options": [
        {
          "label": "Not written",
          "weight": 1
        },
        {
          "label": "Copy-pasted from a template, unreviewed",
          "weight": 2
        },
        {
          "label": "Drafted for our actual product",
          "weight": 3
        },
        {
          "label": "Reviewed against data flows; cookie/consent wired",
          "weight": 4
        }
      ]
    },
    {
      "q": "If you collect personal data, where is it stored and who can access it?",
      "options": [
        {
          "label": "An honest 'not sure'",
          "weight": 1
        },
        {
          "label": "Known, access informal",
          "weight": 2
        },
        {
          "label": "Documented; access by role",
          "weight": 3
        },
        {
          "label": "Documented, least-privilege, audit-logged",
          "weight": 4
        }
      ]
    },
    {
      "q": "Pricing page: can a buyer complete purchase without asking you anything?",
      "options": [
        {
          "label": "We sell via DMs/calls",
          "weight": 1
        },
        {
          "label": "Page exists; checkout has friction",
          "weight": 2
        },
        {
          "label": "Checkout works; edge cases (refunds, tax) untested",
          "weight": 3
        },
        {
          "label": "Full flow tested incl. refund path",
          "weight": 4
        }
      ]
    },
    {
      "q": "Launch copy (headline, benefits, FAQ) has been…",
      "options": [
        {
          "label": "Written once, by the founder, at 2am",
          "weight": 1
        },
        {
          "label": "Reviewed internally",
          "weight": 2
        },
        {
          "label": "Reviewed by friendly customers",
          "weight": 3
        },
        {
          "label": "Tested against 2–3 variants",
          "weight": 4
        }
      ]
    },
    {
      "q": "Email flows at launch (confirmation, welcome, support) are…",
      "options": [
        {
          "label": "Manual replies",
          "weight": 1
        },
        {
          "label": "One welcome email",
          "weight": 2
        },
        {
          "label": "Confirmation + welcome automated",
          "weight": 3
        },
        {
          "label": "Confirmation, welcome, and a support-routing flow tested end-to-end",
          "weight": 4
        }
      ]
    },
    {
      "q": "Support channel on launch day is…",
      "options": [
        {
          "label": "The founder's personal inbox",
          "weight": 1
        },
        {
          "label": "A shared inbox",
          "weight": 2
        },
        {
          "label": "A help desk with canned replies",
          "weight": 3
        },
        {
          "label": "Help desk + response-time target + escalation path",
          "weight": 4
        }
      ]
    },
    {
      "q": "You've set response-time expectations with customers because…",
      "options": [
        {
          "label": "We didn't",
          "weight": 1
        },
        {
          "label": "A line on the contact page",
          "weight": 2
        },
        {
          "label": "Stated SLA (e.g. 'within one business day')",
          "weight": 3
        },
        {
          "label": "Stated SLA we've tested with a soft-launch cohort",
          "weight": 4
        }
      ]
    },
    {
      "q": "Analytics: will you know where launch traffic converts (or dies)?",
      "options": [
        {
          "label": "We'll see it in the news",
          "weight": 1
        },
        {
          "label": "Total visits only",
          "weight": 2
        },
        {
          "label": "Funnel events wired",
          "weight": 3
        },
        {
          "label": "Funnel wired + a dashboard the team checks daily",
          "weight": 4
        }
      ]
    },
    {
      "q": "The 'why now' of your launch story is…",
      "options": [
        {
          "label": "Vibes",
          "weight": 1
        },
        {
          "label": "Clear to us, untested externally",
          "weight": 2
        },
        {
          "label": "Written and reviewed",
          "weight": 3
        },
        {
          "label": "Written, tested, and it's what the waitlist quotes back",
          "weight": 4
        }
      ]
    },
    {
      "q": "Assets for launch day (screens, demo video, press blurb) are…",
      "options": [
        {
          "label": "Not made",
          "weight": 1
        },
        {
          "label": "Half-made, unreviewed",
          "weight": 2
        },
        {
          "label": "Made and approved",
          "weight": 3
        },
        {
          "label": "Made, approved, staged per channel with copy variants",
          "weight": 4
        }
      ]
    },
    {
      "q": "Your waitlist/audience has been warmed by…",
      "options": [
        {
          "label": "Nothing yet",
          "weight": 1
        },
        {
          "label": "Occasional updates",
          "weight": 2
        },
        {
          "label": "A regular cadence",
          "weight": 3
        },
        {
          "label": "A cadence that includes the product's actual voice",
          "weight": 4
        }
      ]
    },
    {
      "q": "Success metric for launch week is…",
      "options": [
        {
          "label": "Attention, generally",
          "weight": 1
        },
        {
          "label": "Signups, untargeted",
          "weight": 2
        },
        {
          "label": "One numeric target (signups/sales)",
          "weight": 3
        },
        {
          "label": "One target + guardrail metrics (churn signals, support load)",
          "weight": 4
        }
      ]
    },
    {
      "q": "Post-launch week one plan exists?",
      "options": [
        {
          "label": "We'll see what happens",
          "weight": 1
        },
        {
          "label": "Rough priorities",
          "weight": 2
        },
        {
          "label": "A fix-list triage plan",
          "weight": 3
        },
        {
          "label": "Fix-list + comms plan + a scheduled retro for day 7",
          "weight": 4
        }
      ]
    },
    {
      "q": "Accessibility: keyboard-only use and contrast have been…",
      "options": [
        {
          "label": "Not checked",
          "weight": 1
        },
        {
          "label": "Spot-checked",
          "weight": 2
        },
        {
          "label": "Audited once, main issues fixed",
          "weight": 3
        },
        {
          "label": "Audited (WCAG 2.2 AA), findings closed",
          "weight": 4
        }
      ]
    },
    {
      "q": "Mobile: the full core loop on a phone is…",
      "options": [
        {
          "label": "Untested",
          "weight": 1
        },
        {
          "label": "Looks okay in dev tools",
          "weight": 2
        },
        {
          "label": "Tested on real devices",
          "weight": 3
        },
        {
          "label": "Tested on real devices by non-team users",
          "weight": 4
        }
      ]
    },
    {
      "q": "Backups and data loss: if the database vanished today…",
      "options": [
        {
          "label": "It's gone",
          "weight": 1
        },
        {
          "label": "We'd lose up to a day",
          "weight": 2
        },
        {
          "label": "Daily backups, restore untested",
          "weight": 3
        },
        {
          "label": "Backups with a tested restore",
          "weight": 4
        }
      ]
    },
    {
      "q": "Honestly, the biggest untested assumption still standing is…",
      "options": [
        {
          "label": "Named, and there's an experiment running to test it",
          "weight": 4
        },
        {
          "label": "Named, no test yet",
          "weight": 3
        },
        {
          "label": "A feeling we avoid naming",
          "weight": 2
        },
        {
          "label": "We test nothing until launch",
          "weight": 1
        }
      ]
    }
  ]
}.questions;
var BANDS = [
  { name: "Platinum", min: 85, blurb: "Launch-ready. Ship it — and keep the day-7 retro on the calendar." },
  { name: "Gold", min: 70, blurb: "Ready with caveats. Close the two lowest dimensions before the date; they rarely fix themselves post-launch." },
  { name: "Silver", min: 50, blurb: "Not yet. The gap report shows which dimension blocks you — usually ops or support, not the product." },
  { name: "Bronze", min: 0, blurb: "Pre-launch stage. Work the 5 dimensions in order; a soft launch at this stage burns your list." }
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

  "02-questions/questions.json": "{\n  \"questions\": [\n    {\n      \"q\": \"Can a stranger use the product end-to-end without you in the room?\",\n      \"options\": [\n        {\n          \"label\": \"Haven't tested that\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Once, with hand-holding\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Mostly — rough edges documented\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Yes, validated with 5+ strangers\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Your onboarding path (first 10 minutes) is…\",\n      \"options\": [\n        {\n          \"label\": \"Whatever they figure out\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"A welcome email\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"A guided first-run\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Guided, measured, iterated from drop-off data\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Does the product solve a problem people already pay to solve?\",\n      \"options\": [\n        {\n          \"label\": \"We believe so\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Some signals\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Validated: pre-orders or waitlist with payment intent\",\n          \"weight\": 4\n        },\n        {\n          \"label\": \"Not proven yet\",\n          \"weight\": 1\n        }\n      ]\n    },\n    {\n      \"q\": \"Core loop completeness: the main job gets…\",\n      \"options\": [\n        {\n          \"label\": \"Done partially; workarounds needed\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Done, with rough edges\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Done cleanly for the happy path\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Done cleanly including edge cases we tested\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Bug triage: launch-blocking bugs are…\",\n      \"options\": [\n        {\n          \"label\": \"Undefined — bugs are bugs\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"In a tracker, unranked\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Ranked by severity\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Ranked; launch blockers have owners and dates\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Load expectation: you know what traffic launch day brings because…\",\n      \"options\": [\n        {\n          \"label\": \"We don't\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"A guess based on audience size\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"List sizes + send plan per channel\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Modelled, with a load test done\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Monitoring and alerts: if the site dies at 2am…\",\n      \"options\": [\n        {\n          \"label\": \"We find out from users\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"We notice in the morning\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Uptime monitor pings us\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Alerts with severity routing; a runbook exists\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Rollback plan if the launch build is broken?\",\n      \"options\": [\n        {\n          \"label\": \"Rollback? We'd fix forward\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"We could redeploy an old build manually\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Documented redeploy steps\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"One-command rollback, tested this month\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Legal: terms of service and privacy policy are…\",\n      \"options\": [\n        {\n          \"label\": \"Not written\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Copy-pasted from a template, unreviewed\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Drafted for our actual product\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Reviewed against data flows; cookie/consent wired\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"If you collect personal data, where is it stored and who can access it?\",\n      \"options\": [\n        {\n          \"label\": \"An honest 'not sure'\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Known, access informal\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Documented; access by role\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Documented, least-privilege, audit-logged\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Pricing page: can a buyer complete purchase without asking you anything?\",\n      \"options\": [\n        {\n          \"label\": \"We sell via DMs/calls\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Page exists; checkout has friction\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Checkout works; edge cases (refunds, tax) untested\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Full flow tested incl. refund path\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Launch copy (headline, benefits, FAQ) has been…\",\n      \"options\": [\n        {\n          \"label\": \"Written once, by the founder, at 2am\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Reviewed internally\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Reviewed by friendly customers\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Tested against 2–3 variants\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Email flows at launch (confirmation, welcome, support) are…\",\n      \"options\": [\n        {\n          \"label\": \"Manual replies\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"One welcome email\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Confirmation + welcome automated\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Confirmation, welcome, and a support-routing flow tested end-to-end\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Support channel on launch day is…\",\n      \"options\": [\n        {\n          \"label\": \"The founder's personal inbox\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"A shared inbox\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"A help desk with canned replies\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Help desk + response-time target + escalation path\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"You've set response-time expectations with customers because…\",\n      \"options\": [\n        {\n          \"label\": \"We didn't\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"A line on the contact page\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Stated SLA (e.g. 'within one business day')\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Stated SLA we've tested with a soft-launch cohort\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Analytics: will you know where launch traffic converts (or dies)?\",\n      \"options\": [\n        {\n          \"label\": \"We'll see it in the news\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Total visits only\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Funnel events wired\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Funnel wired + a dashboard the team checks daily\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"The 'why now' of your launch story is…\",\n      \"options\": [\n        {\n          \"label\": \"Vibes\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Clear to us, untested externally\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Written and reviewed\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Written, tested, and it's what the waitlist quotes back\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Assets for launch day (screens, demo video, press blurb) are…\",\n      \"options\": [\n        {\n          \"label\": \"Not made\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Half-made, unreviewed\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Made and approved\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Made, approved, staged per channel with copy variants\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Your waitlist/audience has been warmed by…\",\n      \"options\": [\n        {\n          \"label\": \"Nothing yet\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Occasional updates\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"A regular cadence\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"A cadence that includes the product's actual voice\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Success metric for launch week is…\",\n      \"options\": [\n        {\n          \"label\": \"Attention, generally\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Signups, untargeted\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"One numeric target (signups/sales)\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"One target + guardrail metrics (churn signals, support load)\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Post-launch week one plan exists?\",\n      \"options\": [\n        {\n          \"label\": \"We'll see what happens\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Rough priorities\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"A fix-list triage plan\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Fix-list + comms plan + a scheduled retro for day 7\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Accessibility: keyboard-only use and contrast have been…\",\n      \"options\": [\n        {\n          \"label\": \"Not checked\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Spot-checked\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Audited once, main issues fixed\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Audited (WCAG 2.2 AA), findings closed\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Mobile: the full core loop on a phone is…\",\n      \"options\": [\n        {\n          \"label\": \"Untested\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"Looks okay in dev tools\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Tested on real devices\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Tested on real devices by non-team users\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Backups and data loss: if the database vanished today…\",\n      \"options\": [\n        {\n          \"label\": \"It's gone\",\n          \"weight\": 1\n        },\n        {\n          \"label\": \"We'd lose up to a day\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"Daily backups, restore untested\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"Backups with a tested restore\",\n          \"weight\": 4\n        }\n      ]\n    },\n    {\n      \"q\": \"Honestly, the biggest untested assumption still standing is…\",\n      \"options\": [\n        {\n          \"label\": \"Named, and there's an experiment running to test it\",\n          \"weight\": 4\n        },\n        {\n          \"label\": \"Named, no test yet\",\n          \"weight\": 3\n        },\n        {\n          \"label\": \"A feeling we avoid naming\",\n          \"weight\": 2\n        },\n        {\n          \"label\": \"We test nothing until launch\",\n          \"weight\": 1\n        }\n      ]\n    }\n  ]\n}",

  "02-questions/questions.csv": "number,question,option_a,weight_a,option_b,weight_b,option_c,weight_c,option_d,weight_d\n1,\"Can a stranger use the product end-to-end without you in the room?\",\"Haven't tested that\",1,\"Once, with hand-holding\",2,\"Mostly — rough edges documented\",3,\"Yes, validated with 5+ strangers\",4\n2,\"Your onboarding path (first 10 minutes) is…\",\"Whatever they figure out\",1,\"A welcome email\",2,\"A guided first-run\",3,\"Guided, measured, iterated from drop-off data\",4\n3,\"Does the product solve a problem people already pay to solve?\",\"We believe so\",2,\"Some signals\",3,\"Validated: pre-orders or waitlist with payment intent\",4,\"Not proven yet\",1\n4,\"Core loop completeness: the main job gets…\",\"Done partially; workarounds needed\",1,\"Done, with rough edges\",2,\"Done cleanly for the happy path\",3,\"Done cleanly including edge cases we tested\",4\n5,\"Bug triage: launch-blocking bugs are…\",\"Undefined — bugs are bugs\",1,\"In a tracker, unranked\",2,\"Ranked by severity\",3,\"Ranked; launch blockers have owners and dates\",4\n6,\"Load expectation: you know what traffic launch day brings because…\",\"We don't\",1,\"A guess based on audience size\",2,\"List sizes + send plan per channel\",3,\"Modelled, with a load test done\",4\n7,\"Monitoring and alerts: if the site dies at 2am…\",\"We find out from users\",1,\"We notice in the morning\",2,\"Uptime monitor pings us\",3,\"Alerts with severity routing; a runbook exists\",4\n8,\"Rollback plan if the launch build is broken?\",\"Rollback? We'd fix forward\",1,\"We could redeploy an old build manually\",2,\"Documented redeploy steps\",3,\"One-command rollback, tested this month\",4\n9,\"Legal: terms of service and privacy policy are…\",\"Not written\",1,\"Copy-pasted from a template, unreviewed\",2,\"Drafted for our actual product\",3,\"Reviewed against data flows; cookie/consent wired\",4\n10,\"If you collect personal data, where is it stored and who can access it?\",\"An honest 'not sure'\",1,\"Known, access informal\",2,\"Documented; access by role\",3,\"Documented, least-privilege, audit-logged\",4\n11,\"Pricing page: can a buyer complete purchase without asking you anything?\",\"We sell via DMs/calls\",1,\"Page exists; checkout has friction\",2,\"Checkout works; edge cases (refunds, tax) untested\",3,\"Full flow tested incl. refund path\",4\n12,\"Launch copy (headline, benefits, FAQ) has been…\",\"Written once, by the founder, at 2am\",1,\"Reviewed internally\",2,\"Reviewed by friendly customers\",3,\"Tested against 2–3 variants\",4\n13,\"Email flows at launch (confirmation, welcome, support) are…\",\"Manual replies\",1,\"One welcome email\",2,\"Confirmation + welcome automated\",3,\"Confirmation, welcome, and a support-routing flow tested end-to-end\",4\n14,\"Support channel on launch day is…\",\"The founder's personal inbox\",1,\"A shared inbox\",2,\"A help desk with canned replies\",3,\"Help desk + response-time target + escalation path\",4\n15,\"You've set response-time expectations with customers because…\",\"We didn't\",1,\"A line on the contact page\",2,\"Stated SLA (e.g. 'within one business day')\",3,\"Stated SLA we've tested with a soft-launch cohort\",4\n16,\"Analytics: will you know where launch traffic converts (or dies)?\",\"We'll see it in the news\",1,\"Total visits only\",2,\"Funnel events wired\",3,\"Funnel wired + a dashboard the team checks daily\",4\n17,\"The 'why now' of your launch story is…\",\"Vibes\",1,\"Clear to us, untested externally\",2,\"Written and reviewed\",3,\"Written, tested, and it's what the waitlist quotes back\",4\n18,\"Assets for launch day (screens, demo video, press blurb) are…\",\"Not made\",1,\"Half-made, unreviewed\",2,\"Made and approved\",3,\"Made, approved, staged per channel with copy variants\",4\n19,\"Your waitlist/audience has been warmed by…\",\"Nothing yet\",1,\"Occasional updates\",2,\"A regular cadence\",3,\"A cadence that includes the product's actual voice\",4\n20,\"Success metric for launch week is…\",\"Attention, generally\",1,\"Signups, untargeted\",2,\"One numeric target (signups/sales)\",3,\"One target + guardrail metrics (churn signals, support load)\",4\n21,\"Post-launch week one plan exists?\",\"We'll see what happens\",1,\"Rough priorities\",2,\"A fix-list triage plan\",3,\"Fix-list + comms plan + a scheduled retro for day 7\",4\n22,\"Accessibility: keyboard-only use and contrast have been…\",\"Not checked\",1,\"Spot-checked\",2,\"Audited once, main issues fixed\",3,\"Audited (WCAG 2.2 AA), findings closed\",4\n23,\"Mobile: the full core loop on a phone is…\",\"Untested\",1,\"Looks okay in dev tools\",2,\"Tested on real devices\",3,\"Tested on real devices by non-team users\",4\n24,\"Backups and data loss: if the database vanished today…\",\"It's gone\",1,\"We'd lose up to a day\",2,\"Daily backups, restore untested\",3,\"Backups with a tested restore\",4\n25,\"Honestly, the biggest untested assumption still standing is…\",\"Named, and there's an experiment running to test it\",4,\"Named, no test yet\",3,\"A feeling we avoid naming\",2,\"We test nothing until launch\",1",

  "03-scoring/scoring-logic.md": `# Scoring logic — Launch Readiness Quiz

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

  "03-scoring/dimension-weights.md": `# Dimension weights — the five axes

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
`,

  "04-results/result-page.html": `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Launch Readiness Quiz — Result</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:#0f172a;color:#f8fafc;font:15px/1.6 ui-sans-serif,system-ui,sans-serif}main{width:min(520px,100%);background:#1e293b;border-radius:20px;padding:32px;text-align:center}.medal{width:88px;height:88px;margin:0 auto 14px;border-radius:50%;display:grid;place-items:center;font-size:38px;border:3px solid #22d3ee}h1{font-size:22px;margin:0 0 2px}.score{font-size:48px;font-weight:800;margin:10px 0 2px;font-variant-numeric:tabular-nums}.band{color:#22d3ee;font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-size:13px}p{color:#94a3b8}.btn{background:#22d3ee;color:#083344;border-radius:10px;padding:11px 20px;font-weight:700;text-decoration:none}footer{margin-top:24px;color:#64748b;font-size:12px}</style></head>
<body><main>
<div class="medal" aria-hidden="true">{{BAND_EMOJI}}</div>
<h1>{{USER_NAME}} scored</h1>
<div class="score">{{SCORE}}<span style="font-size:22px;color:#64748b">/100</span></div>
<div class="band">{{BAND_NAME}}</div>
<p>{{BAND_BLURB}}</p>
<a class="btn" href="https://omniforge.example">Take the assessment</a>
<footer>OMNIFORGE B-AS-4 · result template — replace the {{placeholders}}</footer>
</main></body></html>`,

  "04-results/gap-report-layout.md": `# Gap report layout — spec

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
`,

  "05-setup/setup-guide.md": `# Setup guide — Launch Readiness Quiz

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

  "05-setup/walkthrough-link.md": `# Walkthrough

A 5-minute video tour of the Launch Readiness Quiz engine and scoring model:

**→ https://omniforge.example/walkthroughs/B-AS-4**

Contents:
- 00:00 — Running the engine offline (double-click)
- 00:48 — Editing the question bank (JSON ↔ CSV ↔ embed)
- 02:10 — Weighted scoring: why 3-vs-4 matters
- 03:20 — Branding the result page
- 04:10 — Reading the report

Hosted (not bundled) to keep the kit lightweight.
`,

  "EXTENDED-PACK/notion-launch-tracker.md": `# In production

Status: **in production** — not in this archive.

What the finished file will contain: a companion Notion tracker that
ingests the gap report — one database, dimension property, owner and
due per row, a "Go/No-Go" board view, and a T-minus checklist that
counts down the three retake dates.
`,
};

export const demo: DemoContent = {
  kind: "quiz",
  intro: "25 questions across product, marketing, ops, support and legal — weighted scoring, five dimensions, a gap report that names what blocks your launch date.",
  questions: [{"q":"Can a stranger use the product end-to-end without you in the room?","options":[{"label":"Haven't tested that","weight":1},{"label":"Once, with hand-holding","weight":2},{"label":"Mostly — rough edges documented","weight":3},{"label":"Yes, validated with 5+ strangers","weight":4}]},{"q":"Your onboarding path (first 10 minutes) is…","options":[{"label":"Whatever they figure out","weight":1},{"label":"A welcome email","weight":2},{"label":"A guided first-run","weight":3},{"label":"Guided, measured, iterated from drop-off data","weight":4}]},{"q":"Does the product solve a problem people already pay to solve?","options":[{"label":"We believe so","weight":2},{"label":"Some signals","weight":3},{"label":"Validated: pre-orders or waitlist with payment intent","weight":4},{"label":"Not proven yet","weight":1}]},{"q":"Core loop completeness: the main job gets…","options":[{"label":"Done partially; workarounds needed","weight":1},{"label":"Done, with rough edges","weight":2},{"label":"Done cleanly for the happy path","weight":3},{"label":"Done cleanly including edge cases we tested","weight":4}]},{"q":"Bug triage: launch-blocking bugs are…","options":[{"label":"Undefined — bugs are bugs","weight":1},{"label":"In a tracker, unranked","weight":2},{"label":"Ranked by severity","weight":3},{"label":"Ranked; launch blockers have owners and dates","weight":4}]},{"q":"Load expectation: you know what traffic launch day brings because…","options":[{"label":"We don't","weight":1},{"label":"A guess based on audience size","weight":2},{"label":"List sizes + send plan per channel","weight":3},{"label":"Modelled, with a load test done","weight":4}]},{"q":"Monitoring and alerts: if the site dies at 2am…","options":[{"label":"We find out from users","weight":1},{"label":"We notice in the morning","weight":2},{"label":"Uptime monitor pings us","weight":3},{"label":"Alerts with severity routing; a runbook exists","weight":4}]},{"q":"Rollback plan if the launch build is broken?","options":[{"label":"Rollback? We'd fix forward","weight":1},{"label":"We could redeploy an old build manually","weight":2},{"label":"Documented redeploy steps","weight":3},{"label":"One-command rollback, tested this month","weight":4}]},{"q":"Legal: terms of service and privacy policy are…","options":[{"label":"Not written","weight":1},{"label":"Copy-pasted from a template, unreviewed","weight":2},{"label":"Drafted for our actual product","weight":3},{"label":"Reviewed against data flows; cookie/consent wired","weight":4}]},{"q":"If you collect personal data, where is it stored and who can access it?","options":[{"label":"An honest 'not sure'","weight":1},{"label":"Known, access informal","weight":2},{"label":"Documented; access by role","weight":3},{"label":"Documented, least-privilege, audit-logged","weight":4}]},{"q":"Pricing page: can a buyer complete purchase without asking you anything?","options":[{"label":"We sell via DMs/calls","weight":1},{"label":"Page exists; checkout has friction","weight":2},{"label":"Checkout works; edge cases (refunds, tax) untested","weight":3},{"label":"Full flow tested incl. refund path","weight":4}]},{"q":"Launch copy (headline, benefits, FAQ) has been…","options":[{"label":"Written once, by the founder, at 2am","weight":1},{"label":"Reviewed internally","weight":2},{"label":"Reviewed by friendly customers","weight":3},{"label":"Tested against 2–3 variants","weight":4}]},{"q":"Email flows at launch (confirmation, welcome, support) are…","options":[{"label":"Manual replies","weight":1},{"label":"One welcome email","weight":2},{"label":"Confirmation + welcome automated","weight":3},{"label":"Confirmation, welcome, and a support-routing flow tested end-to-end","weight":4}]},{"q":"Support channel on launch day is…","options":[{"label":"The founder's personal inbox","weight":1},{"label":"A shared inbox","weight":2},{"label":"A help desk with canned replies","weight":3},{"label":"Help desk + response-time target + escalation path","weight":4}]},{"q":"You've set response-time expectations with customers because…","options":[{"label":"We didn't","weight":1},{"label":"A line on the contact page","weight":2},{"label":"Stated SLA (e.g. 'within one business day')","weight":3},{"label":"Stated SLA we've tested with a soft-launch cohort","weight":4}]},{"q":"Analytics: will you know where launch traffic converts (or dies)?","options":[{"label":"We'll see it in the news","weight":1},{"label":"Total visits only","weight":2},{"label":"Funnel events wired","weight":3},{"label":"Funnel wired + a dashboard the team checks daily","weight":4}]},{"q":"The 'why now' of your launch story is…","options":[{"label":"Vibes","weight":1},{"label":"Clear to us, untested externally","weight":2},{"label":"Written and reviewed","weight":3},{"label":"Written, tested, and it's what the waitlist quotes back","weight":4}]},{"q":"Assets for launch day (screens, demo video, press blurb) are…","options":[{"label":"Not made","weight":1},{"label":"Half-made, unreviewed","weight":2},{"label":"Made and approved","weight":3},{"label":"Made, approved, staged per channel with copy variants","weight":4}]},{"q":"Your waitlist/audience has been warmed by…","options":[{"label":"Nothing yet","weight":1},{"label":"Occasional updates","weight":2},{"label":"A regular cadence","weight":3},{"label":"A cadence that includes the product's actual voice","weight":4}]},{"q":"Success metric for launch week is…","options":[{"label":"Attention, generally","weight":1},{"label":"Signups, untargeted","weight":2},{"label":"One numeric target (signups/sales)","weight":3},{"label":"One target + guardrail metrics (churn signals, support load)","weight":4}]},{"q":"Post-launch week one plan exists?","options":[{"label":"We'll see what happens","weight":1},{"label":"Rough priorities","weight":2},{"label":"A fix-list triage plan","weight":3},{"label":"Fix-list + comms plan + a scheduled retro for day 7","weight":4}]},{"q":"Accessibility: keyboard-only use and contrast have been…","options":[{"label":"Not checked","weight":1},{"label":"Spot-checked","weight":2},{"label":"Audited once, main issues fixed","weight":3},{"label":"Audited (WCAG 2.2 AA), findings closed","weight":4}]},{"q":"Mobile: the full core loop on a phone is…","options":[{"label":"Untested","weight":1},{"label":"Looks okay in dev tools","weight":2},{"label":"Tested on real devices","weight":3},{"label":"Tested on real devices by non-team users","weight":4}]},{"q":"Backups and data loss: if the database vanished today…","options":[{"label":"It's gone","weight":1},{"label":"We'd lose up to a day","weight":2},{"label":"Daily backups, restore untested","weight":3},{"label":"Backups with a tested restore","weight":4}]},{"q":"Honestly, the biggest untested assumption still standing is…","options":[{"label":"Named, and there's an experiment running to test it","weight":4},{"label":"Named, no test yet","weight":3},{"label":"A feeling we avoid naming","weight":2},{"label":"We test nothing until launch","weight":1}]}],
  bands: [
  { name: "Platinum", min: 85, blurb: "Launch-ready. Ship it — and keep the day-7 retro on the calendar." },
  { name: "Gold", min: 70, blurb: "Ready with caveats. Close the two lowest dimensions before the date; they rarely fix themselves post-launch." },
  { name: "Silver", min: 50, blurb: "Not yet. The gap report shows which dimension blocks you — usually ops or support, not the product." },
  { name: "Bronze", min: 0, blurb: "Pre-launch stage. Work the 5 dimensions in order; a soft launch at this stage burns your list." }
],
};
