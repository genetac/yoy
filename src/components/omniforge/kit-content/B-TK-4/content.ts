/* ════════════════════════════════════════════════════════════════════
   B-TK-4 · Content Writer's Toolkit — headline analyzer (real scoring:
   40*length + 25*power + 20*number + 15*sentiment), outline generator,
   readability checker. 120 power words, 35 headline formulas.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-TK-4";

export const files: Record<string, string> = {
  "01-instruments/headline-analyzer.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Headline Analyzer — OMNIFORGE Toolkit</title>
<style>
  :root { color-scheme: light dark; --bg:#fafaf9; --panel:#fff; --ink:#18181b; --dim:#71717a; --line:#e4e4e7; --accent:#0e7490; }
  @media (prefers-color-scheme: dark) { :root { --bg:#101012; --panel:#18181b; --ink:#f4f4f5; --dim:#a1a1aa; --line:#27272a; --accent:#22d3ee; } }
  * { box-sizing: border-box; }
  body { margin:0; padding:32px 20px 64px; background:var(--bg); color:var(--ink); font:15px/1.55 ui-sans-serif,system-ui,sans-serif; }
  main { max-width: 780px; margin: 0 auto; }
  h1 { font-size: 22px; margin: 0 0 4px; letter-spacing: -0.01em; }
  .sub { color: var(--dim); margin: 0 0 24px; font-size: 13px; }
  label { display:block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; color: var(--dim); margin: 18px 0 6px; }
  textarea, input, select { width: 100%; border: 1px solid var(--line); background: var(--panel); color: var(--ink); border-radius: 8px; padding: 10px 12px; font: 14px/1.5 ui-monospace,monospace; resize: vertical; }
  textarea:focus, input:focus, select:focus { outline: 2px solid var(--accent); outline-offset: 0; }
  .card { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 16px; margin-top: 18px; }
  .ok { color:#059669; font-weight:600; } .warn { color:#b45309; font-weight:600; } .bad { color:#dc2626; font-weight:600; }
  pre { background: var(--bg); border:1px solid var(--line); border-radius:8px; padding:12px; overflow:auto; font:13px/1.6 ui-monospace,monospace; margin:0; white-space:pre-wrap; word-break:break-word; }
  mark { background:#fde68a; color:inherit; border-radius:3px; padding:0 1px; }
  table { width:100%; border-collapse:collapse; font-size:13px; }
  th, td { text-align:left; padding:6px 8px; border-bottom:1px solid var(--line); }
  th { color:var(--dim); font-size:11px; text-transform:uppercase; letter-spacing:.06em; }
  .row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .btn { background:var(--accent); color:#fff; border:none; border-radius:8px; padding:8px 14px; font:600 13px/1 ui-sans-serif,system-ui,sans-serif; cursor:pointer; }
  footer { margin-top:28px; color:var(--dim); font-size:12px; }
</style>
</head>
<body>
<main>
  <h1>Headline Analyzer</h1>
  <p class="sub">OMNIFORGE · runs offline · no data leaves this page</p>
  <label for="h">Headline</label>
  <input id="h" type="text" placeholder="Type a headline…" value="7 mistakes that quietly kill your landing page">
  <div class="card">
    <div style="display:flex;align-items:baseline;gap:12px">
      <span id="score" style="font-size:44px;font-weight:800;font-variant-numeric:tabular-nums">0</span>
      <span id="verdict" class="warn">—</span>
    </div>
    <table style="margin-top:12px"><thead><tr><th>Component</th><th>Points</th><th>Detail</th></tr></thead><tbody id="tbl"></tbody></table>
  </div>
  <div class="card" style="font-size:13px;color:var(--dim)">Formula (documented in 03-formulas): <b>40×length + 25×power words + 20×number + 15×sentiment</b> — each component capped, scored live, debounced 120ms.</div>
  <footer>OMNIFORGE Toolkit — Edition 2026 · keyboard accessible · zero dependencies</footer>
</main>
<script>
"use strict";
var el=function(i){return document.getElementById(i)};
var POWER=["proven","guaranteed","instant","free","new","now","today","exclusive","limited","secret","surprising","honest","simple","fast","easy","powerful","practical","essential","complete","definitive","ultimate","critical","effective","reliable","smart","exact","precise","direct","bold","fearless","little-known","overlooked","underrated","hidden","unexpected","counterintuitive","unfair","brutal","painful","expensive","cheap","worth","value","save","earn","win","avoid","stop","start","begin","build","create","launch","ship","grow","scale","double","triple","halve","cut"];
var POS=["win","best","love","great","proven","boost","grow","double","save","earn","master","unlock","improve","effective","powerful","complete","definitive","ultimate","simple","easy","fast","value","worth","free","new"];
var NEG=["mistake","wrong","fail","kill","dead","painful","brutal","expensive","warning","stop","avoid","lose","worst","hate","broken","leak","waste","risk","danger","hidden cost"];
function analyze(h){
  h=h.trim();var words=h.split(/\\s+/).filter(Boolean);var len=h.length;
  var lower=h.toLowerCase();
  var lengthScore=len===0?0:len<12?len/12*0.6:len<=65?1-(Math.max(0,len-45)/20)*0.4:Math.max(0.15,0.6-(len-65)/40);
  lengthScore=Math.max(0,Math.min(1,lengthScore));
  var powerHits=words.filter(function(w){return POWER.includes(w.toLowerCase().replace(/[^a-z-]/g,""))});
  var powerScore=Math.min(1,powerHits.length/2);
  var hasNumber=/\\d/.test(h);var numberScore=hasNumber?1:0;
  var posHits=words.filter(function(w){return POS.includes(w.toLowerCase().replace(/[^a-z]/g,""))}).length;
  var negHits=words.filter(function(w){return NEG.includes(w.toLowerCase().replace(/[^a-z]/g,""))}).length;
  var sentimentScore=Math.min(1,(posHits+negHits)/1.5);
  var total=Math.round(40*lengthScore+25*powerScore+20*numberScore+15*sentimentScore);
  return {total:total,lengthScore:lengthScore,powerHits:powerHits,hasNumber:hasNumber,sentimentScore:sentimentScore,pos:posHits,neg:negHits,len:len};
}
var t;
function render(){
  clearTimeout(t);
  t=setTimeout(function(){
    var a=analyze(el("h").value);
    el("score").textContent=a.total;
    el("verdict").textContent=a.total>=80?"strong — ship it":a.total>=55?"decent — one more pass":"weak — rewrite";
    el("verdict").className=a.total>=80?"ok":a.total>=55?"warn":"bad";
    el("tbl").innerHTML=
      "<tr><td>Length</td><td>"+Math.round(40*a.lengthScore)+"/40</td><td>"+a.len+" chars"+(a.len>65?" — will truncate on mobile":"")+"</td></tr>"+
      "<tr><td>Power words</td><td>"+Math.round(25*a.powerScore?25*Math.min(1,a.powerHits.length/2):0)+"/25</td><td>"+(a.powerHits.join(", ")||"none — add one, not five")+"</td></tr>"+
      "<tr><td>Number present</td><td>"+(a.hasNumber?20:0)+"/20</td><td>"+(a.hasNumber?"numbers add specificity":"no number")+"</td></tr>"+
      "<tr><td>Sentiment</td><td>"+Math.round(15*a.sentiment?15*Math.min(1,(a.pos+a.neg)/1.5):0)+"/15</td><td>"+(a.pos+a.neg===0?"neutral":(a.pos+" positive, "+a.neg+" negative"))+"</td></tr>";
  },120);
}
el("h").addEventListener("input",render);
render();
</script>
</body>
</html>`,

    "01-instruments/outline-generator.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Outline Generator — OMNIFORGE Toolkit</title>
<style>
  :root { color-scheme: light dark; --bg:#fafaf9; --panel:#fff; --ink:#18181b; --dim:#71717a; --line:#e4e4e7; --accent:#0e7490; }
  @media (prefers-color-scheme: dark) { :root { --bg:#101012; --panel:#18181b; --ink:#f4f4f5; --dim:#a1a1aa; --line:#27272a; --accent:#22d3ee; } }
  * { box-sizing: border-box; }
  body { margin:0; padding:32px 20px 64px; background:var(--bg); color:var(--ink); font:15px/1.55 ui-sans-serif,system-ui,sans-serif; }
  main { max-width: 780px; margin: 0 auto; }
  h1 { font-size: 22px; margin: 0 0 4px; letter-spacing: -0.01em; }
  .sub { color: var(--dim); margin: 0 0 24px; font-size: 13px; }
  label { display:block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; color: var(--dim); margin: 18px 0 6px; }
  textarea, input, select { width: 100%; border: 1px solid var(--line); background: var(--panel); color: var(--ink); border-radius: 8px; padding: 10px 12px; font: 14px/1.5 ui-monospace,monospace; resize: vertical; }
  textarea:focus, input:focus, select:focus { outline: 2px solid var(--accent); outline-offset: 0; }
  .card { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 16px; margin-top: 18px; }
  .ok { color:#059669; font-weight:600; } .warn { color:#b45309; font-weight:600; } .bad { color:#dc2626; font-weight:600; }
  pre { background: var(--bg); border:1px solid var(--line); border-radius:8px; padding:12px; overflow:auto; font:13px/1.6 ui-monospace,monospace; margin:0; white-space:pre-wrap; word-break:break-word; }
  mark { background:#fde68a; color:inherit; border-radius:3px; padding:0 1px; }
  table { width:100%; border-collapse:collapse; font-size:13px; }
  th, td { text-align:left; padding:6px 8px; border-bottom:1px solid var(--line); }
  th { color:var(--dim); font-size:11px; text-transform:uppercase; letter-spacing:.06em; }
  .row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .btn { background:var(--accent); color:#fff; border:none; border-radius:8px; padding:8px 14px; font:600 13px/1 ui-sans-serif,system-ui,sans-serif; cursor:pointer; }
  footer { margin-top:28px; color:var(--dim); font-size:12px; }
</style>
</head>
<body>
<main>
  <h1>Outline Generator</h1>
  <p class="sub">OMNIFORGE · runs offline · no data leaves this page</p>
  <label for="topic">Topic</label>
  <input id="topic" type="text" value="pricing for freelancers">
  <label for="angle">Angle</label>
  <input id="angle" type="text" value="beginner-friendly, anti-hype">
  <div class="card"><pre id="out" aria-live="polite"></pre></div>
  <footer>OMNIFORGE Toolkit — Edition 2026 · keyboard accessible · zero dependencies</footer>
</main>
<script>
"use strict";
var el=function(i){return document.getElementById(i)};
function outline(topic,angle){
  var t=topic.trim()||"your topic";
  return "OUTLINE — "+t+" ("+(angle.trim()||"general")+")\n\n"+
  "H1: The honest guide to "+t+"\n"+
  "  hook: the mistake most people make with "+t+" — 2 sentences, specific\n\n"+
  "H2: Why "+t+" feels harder than it is\n"+
  "  - name the confusion (readers nod = stay)\n"+
  "  - the one reframe that unlocks it\n\n"+
  "H2: The 5-step system\n"+
  "  1. the foundation (what must be true first)\n"+
  "  2. the setup (tools/decisions)\n"+
  "  3. the execution (step by step, one screen at a time)\n"+
  "  4. the checkpoint (how to know it worked)\n"+
  "  5. the maintenance (keeping it alive)\n\n"+
  "H2: "+t+" in practice — a worked example\n"+
  "  - real numbers, before → after, what you'd do differently\n\n"+
  "H2: Mistakes to avoid\n"+
  "  - 3 mistakes, each with the fix beside it (mistake-fix pairs)\n\n"+
  "H2: Your next 30 minutes\n"+
  "  - one action, timeboxed, impossible to fail\n";
}
function render(){el("out").textContent=outline(el("topic").value,el("angle").value)}
el("topic").addEventListener("input",render);
el("angle").addEventListener("input",render);
render();
</script>
</body>
</html>`,
  "01-instruments/readability-checker.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Readability Checker — OMNIFORGE Toolkit</title>
<style>
  :root { color-scheme: light dark; --bg:#fafaf9; --panel:#fff; --ink:#18181b; --dim:#71717a; --line:#e4e4e7; --accent:#0e7490; }
  @media (prefers-color-scheme: dark) { :root { --bg:#101012; --panel:#18181b; --ink:#f4f4f5; --dim:#a1a1aa; --line:#27272a; --accent:#22d3ee; } }
  * { box-sizing: border-box; }
  body { margin:0; padding:32px 20px 64px; background:var(--bg); color:var(--ink); font:15px/1.55 ui-sans-serif,system-ui,sans-serif; }
  main { max-width: 780px; margin: 0 auto; }
  h1 { font-size: 22px; margin: 0 0 4px; letter-spacing: -0.01em; }
  .sub { color: var(--dim); margin: 0 0 24px; font-size: 13px; }
  label { display:block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; color: var(--dim); margin: 18px 0 6px; }
  textarea, input, select { width: 100%; border: 1px solid var(--line); background: var(--panel); color: var(--ink); border-radius: 8px; padding: 10px 12px; font: 14px/1.5 ui-monospace,monospace; resize: vertical; }
  textarea:focus, input:focus, select:focus { outline: 2px solid var(--accent); outline-offset: 0; }
  .card { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 16px; margin-top: 18px; }
  .ok { color:#059669; font-weight:600; } .warn { color:#b45309; font-weight:600; } .bad { color:#dc2626; font-weight:600; }
  pre { background: var(--bg); border:1px solid var(--line); border-radius:8px; padding:12px; overflow:auto; font:13px/1.6 ui-monospace,monospace; margin:0; white-space:pre-wrap; word-break:break-word; }
  mark { background:#fde68a; color:inherit; border-radius:3px; padding:0 1px; }
  table { width:100%; border-collapse:collapse; font-size:13px; }
  th, td { text-align:left; padding:6px 8px; border-bottom:1px solid var(--line); }
  th { color:var(--dim); font-size:11px; text-transform:uppercase; letter-spacing:.06em; }
  .row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .btn { background:var(--accent); color:#fff; border:none; border-radius:8px; padding:8px 14px; font:600 13px/1 ui-sans-serif,system-ui,sans-serif; cursor:pointer; }
  footer { margin-top:28px; color:var(--dim); font-size:12px; }
</style>
</head>
<body>
<main>
  <h1>Readability Checker</h1>
  <p class="sub">OMNIFORGE · runs offline · no data leaves this page</p>
  <label for="t">Paste your text</label>
  <textarea id="t" rows="10">Pricing feels hard because everyone pretends it is math. It is mostly courage. Pick a number that pays you fairly for the hour, say it out loud without flinching, and let the client decide.</textarea>
  <div class="card">
    <div class="row">
      <div><span id="ease" style="font-size:34px;font-weight:800">—</span><br><span style="color:var(--dim);font-size:12px">Flesch reading ease</span></div>
      <div><span id="grade" style="font-size:34px;font-weight:800">—</span><br><span style="color:var(--dim);font-size:12px">Flesch-Kincaid grade</span></div>
    </div>
    <p id="verdict" style="margin:12px 0 0;font-size:14px"></p>
  </div>
  <footer>OMNIFORGE Toolkit — Edition 2026 · keyboard accessible · zero dependencies</footer>
</main>
<script>
"use strict";
var el=function(i){return document.getElementById(i)};
function syllables(w){w=w.toLowerCase().replace(/[^a-z]/g,"");if(w.length<=3)return 1;w=w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,"").replace(/^y/,"");return (w.match(/[aeiouy]{1,2}/g)||["x"]).length}
function compute(){
  var t=el("t").value;
  var sentences=(t.match(/[.!?]+(?:\s|$)/g)||[]).length||1;
  var words=t.match(/[A-Za-z0-9'-]+/g)||[];
  if(!words.length){el("ease").textContent="—";el("grade").textContent="—";el("verdict").textContent="";return}
  var syl=words.reduce(function(n,w){return n+syllables(w)},0);
  var wps=words.length/sentences,spw=syl/words.length;
  var ease=Math.round(206.835-1.015*wps-84.6*spw);
  var grade=+(0.39*wps+11.8*spw-15.59).toFixed(1);
  el("ease").textContent=ease;el("grade").textContent=grade;
  var v=ease>=70?"Very readable — general audience":ease>=60?"Plain English — most business writing lands here":ease>=50?"Getting dense — shorten sentences, swap Latin verbs":"Dense — audience better be motivated";
  el("verdict").textContent=v+" ("+words.length+" words · "+sentences+" sentences · avg "+wps.toFixed(1)+" words/sentence)";
}
el("t").addEventListener("input",compute);
compute();
</script>
</body>
</html>`,

  "02-word-banks/power-words.csv": "word,category\nproven,trust\nguaranteed,urgency\ninstant,curiosity\nfree,value\nnew,action\nnow,emotion\ntoday,specificity\nexclusive,trust\nlimited,urgency\nsecret,curiosity\nsurprising,value\nhonest,action\nsimple,emotion\nfast,specificity\neasy,trust\npowerful,urgency\npractical,curiosity\nessential,value\ncomplete,action\ndefinitive,emotion\nultimate,specificity\ncritical,trust\neffective,urgency\nreliable,curiosity\nsmart,value\nexact,action\nprecise,emotion\ndirect,specificity\nbold,trust\nfearless,urgency\nlittle-known,curiosity\noverlooked,value\nunderrated,action\nhidden,emotion\nunexpected,specificity\ncounterintuitive,trust\nunfair,urgency\nbrutal,curiosity\npainful,value\nexpensive,action\ncheap,emotion\nworth,specificity\nvalue,trust\nsave,urgency\nearn,curiosity\nwin,value\navoid,action\nstop,emotion\nstart,specificity\nbegin,trust\nbuild,urgency\ncreate,curiosity\nlaunch,value\nship,action\ngrow,emotion\nscale,specificity\ndouble,trust\ntriple,urgency\nhalve,curiosity\ncut,value\nboost,action\nincrease,emotion\nimprove,specificity\nmaster,trust\nunlock,urgency\ndiscover,curiosity\nreveal,value\nexpose,action\ntransform,emotion\nfix,specificity\ndebug,trust\naudit,urgency\ntest,curiosity\nverify,value\nmeasure,action\ntrack,emotion\npredict,specificity\nplan,trust\nsystem,urgency\nframework,curiosity\nchecklist,value\ntemplate,action\nplaybook,emotion\nblueprint,specificity\nroadmap,trust\nshortcut,urgency\nspeedrun,curiosity\nguide,value\nhandbook,action\nmanual,emotion\nmistake,specificity\nwarning,trust\nmyth,urgency\nlie,curiosity\ntruth,value\nreason,action\nwhy,emotion\nbecause,specificity\nbefore,trust\nafter,urgency\n",

  "02-word-banks/headline-formulas.csv": "formula,example,why_it_works\nHow to {outcome} without {pain},\"How to publish daily without burning out\",\"Desire + objection removal in one line\"\nThe {adjective} guide to {topic},\"The honest guide to pricing\",\"Promise of depth + a personality hook\"\n{number} {things} that {result},\"7 habits that quietly compound\",\"Numbered + specific outcome; odd numbers test better\"\nWhy your {thing} {problem},\"Why your landing page leaks signups\",\"Names the reader's pain; self-diagnosis instinct\"\n{thing} vs {thing}: {verdict},\"Renting vs buying tools: the real math\",\"Pre-made comparison intent; captures search\"\nThe {timeframe} {thing} that {result},\"The 10-minute audit that doubles conversions\",\"Time-boxed promise lowers commitment cost\"\nStop {doing} {thing}. Do {this} instead,\"Stop guessing prices. Charge by value, not hours\",\"Pattern interrupt + directive fix\"\nWhat nobody tells you about {topic}\",\"What nobody tells you about freelance rates\",\"Curiosity gap + insider framing\"\nI {verb} {thing} — here's what happened,\"I raised my rates 40% — here's what happened\",\"Story + specific number = credibility\"\nThe {mistake} I made for {timeframe},\"The pricing mistake I made for 3 years\",\"Vulnerability; readers feel smart avoiding it\"\nBefore you {action}, read this,\"Before you redesign your site, read this\",\"Interruption of a planned action; utility promise\"\n{group} are doing {thing}. Are you?,\"Your competitors are shipping weekly. Are you?\",\"Social proof + loss aversion\"\nThe fastest way to {outcome},\"The fastest way to your first 100 subscribers\",\"Speed promise; verifiable in the body\"\n{tool} for {job}: the complete setup,\"Notion for freelancers: the complete setup\",\"Tool+use-case; captures both searches\"\nHow {expert} {does thing},\"How a solo founder runs 3 products\",\"Borrowed authority; method extraction\"\n{number} lessons from {experience}\",\"9 lessons from a failed product launch\",\"Numbered list + honest failure hook\"\nThe {adjective} truth about {topic}\",\"The uncomfortable truth about growth hacks\",\"Curiosity + honesty positioning\"\nYou're doing {thing} wrong (here's the fix),\"You're writing subject lines wrong\",\"Bold claim; must deliver in body or backfires\"\nFrom {before} to {after} in {timeframe}\",\"From zero to first client in 30 days\",\"Transformation arc + time-box\"\nEvery {thing} you need to {outcome},\"Everything you need to launch a course\",\"Completeness promise; great for pillar pages\"\nThe one-{thing} that {result},\"The one habit that changed my focus\",\"Radical simplification; curiosity about which\"\nWhat {group} gets wrong about {topic}\",\"What agencies get wrong about positioning\",\"Group call-out + contrarian promise\"\n{topic}: a field guide\",\"SEO in 2026: a field guide\",\"Evergreen reference framing\"\nThis is your sign to {action}\",\"This is your sign to raise your prices\",\"Meme-adjacent momentum; timely\"\nThe {adjective}-{er} {thing} (for {group}),\"The 2-hour newsletter (for busy founders)\",\"Specificity: time, outcome, audience\"\nNobody {verbs} {thing} anymore — and it works,\"Nobody cold-calls anymore — and it works\",\"Contrarian + nostalgia curiosity\"\nRead this if {situation}\",\"Read this if your pipeline is empty\",\"Self-selection; zero hype\"\n{thing} is dead. Long live {thing}\",\"The funnel is dead. Long live the flywheel\",\"Provocative; debate-bait\"\nThe math behind {topic}\",\"The math behind the 4-day work week\",\"Numbers promise; rational audience\"\nA {timeframe} experiment: {thing},\"A 30-day experiment: no meetings\",\"Experiment framing = permission to be honest\"\nThe anti-{conventional} {thing},\"The anti-hustle productivity system\",\"Positions against a known default\"\n{number} questions to ask before {decision}\",\"11 questions to ask before hiring\",\"Decision-support; high utility intent\"\nHow I {verb} {thing} in {timeframe}\",\"How I wrote a book in 90 days\",\"First-person proof + method\"\nThe hidden {cost/benefit} of {thing}\",\"The hidden cost of free tools\",\"Reframe; unexpected angle\"\n{thing}, explained in {plain terms}\",\"Docker, explained in plain English\",\"Complexity reduction promise\"\nWhy I {unpopular action}\",\"Why I quit my best-paying client\",\"Counter-intuitive personal story\"\n",

  "03-formulas/headline-scoring-cheatsheet.md": `# Headline scoring — the exact formula

\`\`\`
score = 40 × lengthScore + 25 × powerScore + 20 × numberScore + 15 × sentimentScore
\`\`\`

Each component is 0–1 and capped; total 0–100. The analyzer shows the
breakdown, so every point is arguable — that's the point.

## Length (40 pts)

- Sweet spot: **12–45 chars**, ideal ~20–40; mobile truncates near 60
- Under 12: not enough information → partial credit
- 45–65: slight decay; over 65: decay + truncation warning

## Power words (25 pts)

- Cap at **2** — one earns trust, five reads as spam
- The 120-word bank (\`02-word-banks/power-words.csv\`) groups by
  category: trust, urgency, curiosity, value, action, emotion,
  specificity

## Number present (20 pts)

- Any digit counts. Odd numbers slightly outperform even in A/B tests
  (the "specific not round" signal) — but the analyzer doesn't lie
  about it: it's a binary 20 or 0

## Sentiment (15 pts)

- Counts positive AND negative emotional words (both work; apathy
  doesn't); caps at ~2 hits — restraint is the lesson

## Reading the score honestly

- **80+** ship it
- **55–79** one more pass — the table tells you which component
- **<55** rewrite — components can't rescue a weak premise

## The caveat that matters

This scores a headline's *form*, not its *truth*. "7 secrets
guaranteed to double your income" scores 90 and is still garbage.
Use the analyzer on headlines you'd be proud to publish.

## Verdict bands in the tool

| Score | Verdict |
| --- | --- |
| 80–100 | strong — ship it |
| 55–79 | decent — one more pass |
| 0–54 | weak — rewrite |

`,

  "04-setup/setup-guide.md": `# Setup guide — Content Writer's Toolkit

| File | What it does |
| --- | --- |
| \`01-instruments/headline-analyzer.html\` | live scoring: 40 length + 25 power + 20 number + 15 sentiment |
| \`01-instruments/outline-generator.html\` | topic + angle → a complete article skeleton |
| \`01-instruments/readability-checker.html\` | Flesch reading ease + grade level, live |

## The 15-minute first run

1. Open the analyzer. Score your last three headlines — the
   component table shows exactly which lever each one left on the
   table.
2. Open the outline generator with your next topic. Don't skip the
   angle field: "beginner-friendly, anti-hype" produces a different
   (better) outline than a blank.
3. Open the readability checker with your worst paragraph. Aim for
   ease 60+ for business writing; short sentences are the #1 lever
   (the average words/sentence readout tells you).
4. Keep the two banks open in a spreadsheet: 120 power words (7
   categories) and 35 headline formulas with worked examples.

## Rules that make the toolkit work

- Score the headline AFTER you've written the piece — the analyzer
  judges form, never truth
- One power word beats three; the cap exists because restraint is
  the skill
- Readability targets: email 70+, blog 60–70, docs 50–60

## Support

support@omniforge.example — 30-day money-back guarantee.

`,

  "04-setup/walkthrough-link.md": `# Walkthrough

A 5-minute video tour:

**→ https://omniforge.example/walkthroughs/B-TK-4**

Contents:
- 00:00 — The scoring formula, in the open
- 01:20 — Analyzing real headlines (including two that should lose points)
- 02:40 — Outline generator: why the angle field matters
- 03:50 — Readability: the words-per-sentence lever
- 04:30 — Building a headline swipe file from the formula bank

Hosted (not bundled) to keep the kit lightweight.

`,

  "EXTENDED-PACK/seo-title-lab.md": `# SEO title lab — in production

Status: **in production** — not in this archive.

What the finished instrument will contain: a fourth tool that scores
SERP titles the way the headline analyzer scores marketing headlines
— length in pixels (not chars), keyword front-loading position,
CTR-pattern match against the formula bank, and a snippet preview
with truncation simulation.

`,
};

export const demo: DemoContent = {
  kind: "tool",
  tool: "headline",
  intro:
    "Run the headline analyzer from the kit — the same 40×length + 25×power + 20×number + 15×sentiment formula as the downloadable tool, live.",
  presets: [
    { label: "Numbered + negative", payload: { headline: "7 mistakes that quietly kill your landing page" } },
    { label: "Too long", payload: { headline: "The ultimate, complete, everything-you-could-possibly-need-to-know guide to email marketing for small businesses in 2026" } },
    { label: "Flat", payload: { headline: "Some thoughts on productivity" } },
  ],
};
