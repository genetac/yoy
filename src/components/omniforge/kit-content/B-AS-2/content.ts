/* ════════════════════════════════════════════════════════════════════
   B-AS-2 · Personality Assessment — Operating Type
   25 scenario questions × 4 weighted responses, an offline quiz
   engine, a type map, a strengths-report spec and a shareable result
   page. questions.json, questions.csv, the data embedded in quiz.html
   and the Try-it demo are ALL generated from the single QS array
   below — the four surfaces cannot drift apart.
   Response positions carry meaning: A = Direct, B = Methodical,
   C = Relational, D = Experimental (channel). Weights 1–4 measure
   demonstrated ownership in the scenario (1 = watch and defer,
   4 = own and act).
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-AS-2";

/* ── The question bank (single source of truth) ──────────────────── */

type Option = { label: string; weight: number };
type Question = { q: string; options: Option[] };

const QS: Question[] = [
  {
    q: "A client emails: the project you lead slipped its deadline — and they noticed before you did.",
    options: [
      { label: "Call them within the hour, own the slip, give a new date.", weight: 4 },
      { label: "Rebuild the schedule with buffer first, then send the new plan.", weight: 3 },
      { label: "Ask the team what happened before saying anything to the client.", weight: 2 },
      { label: "Try a new way of tracking the work and hope it holds.", weight: 1 },
    ],
  },
  {
    q: "You are two-thirds into a meeting that has produced nothing.",
    options: [
      { label: "Say it straight: this is not working — here is the one decision we need.", weight: 3 },
      { label: "Write the open questions on the board and work them top to bottom.", weight: 4 },
      { label: "Ask the quietest person in the room what they think, first.", weight: 1 },
      { label: "Pitch a wildcard idea to shake the room awake.", weight: 2 },
    ],
  },
  {
    q: "You inherit a messy, undocumented process from a colleague who just left.",
    options: [
      { label: "Announce a new process on Monday and start using it.", weight: 2 },
      { label: "Map what exists, mark the broken steps, fix them in order.", weight: 4 },
      { label: "Ask around for how people actually use it, then decide.", weight: 1 },
      { label: "Rebuild it as a lightweight experiment for one cycle.", weight: 3 },
    ],
  },
  {
    q: "Your calendar fills up with meetings other people set.",
    options: [
      { label: "Cancel the ones with no agenda — and say why.", weight: 3 },
      { label: "Introduce office hours and a booking rule everyone can see.", weight: 2 },
      { label: "Take the meetings, but quietly ask organizers to group them.", weight: 1 },
      { label: "Decline everything for a week and watch what actually breaks.", weight: 4 },
    ],
  },
  {
    q: "The day before delivery, you spot a visible flaw in a teammate's work.",
    options: [
      { label: "Tell them today, plainly, and offer to fix it together tonight.", weight: 4 },
      { label: "Log it in the QA checklist for tomorrow's review.", weight: 2 },
      { label: "Ask how their week is going, then name the flaw clearly.", weight: 3 },
      { label: "Quick-patch the visible part yourself and move on.", weight: 1 },
    ],
  },
  {
    q: "Your idea is presented by someone else, uncredited, in a big meeting.",
    options: [
      { label: "Say it in the room: happy to expand — that was my proposal.", weight: 4 },
      { label: "Send the source document to the group afterwards.", weight: 2 },
      { label: "Talk to the presenter privately, right after the meeting.", weight: 3 },
      { label: "Let it slide this time and see whether credit even matters here.", weight: 1 },
    ],
  },
  {
    q: "Every deadline moves — you get one completely free day.",
    options: [
      { label: "Take the day off; you have earned it.", weight: 2 },
      { label: "Clear the rot: inbox, expenses, the small broken things.", weight: 3 },
      { label: "Give the day to whichever teammate sounds most swamped.", weight: 1 },
      { label: "Prototype the side idea you never have time for.", weight: 4 },
    ],
  },
  {
    q: "The team must pick between two tools nobody has used.",
    options: [
      { label: "Push for whichever one the loudest person already knows.", weight: 1 },
      { label: "List the must-haves, score both tools against them.", weight: 3 },
      { label: "Ask which one people would actually enjoy using.", weight: 2 },
      { label: "Run both for a week on the same real task, compare results.", weight: 4 },
    ],
  },
  {
    q: "A stakeholder changes the requirements after the work is finished.",
    options: [
      { label: "State the cost of the change in hours and make them choose.", weight: 4 },
      { label: "Update the spec, version it, and re-plan the timeline.", weight: 3 },
      { label: "Book a call to understand what changed on their side.", weight: 2 },
      { label: "Wait and see whether they mention it again.", weight: 1 },
    ],
  },
  {
    q: "You receive blunt feedback, in public, that stings.",
    options: [
      { label: "Answer it head-on, in the moment, in front of everyone.", weight: 2 },
      { label: "Write down exactly what was said; sleep on the patterns.", weight: 3 },
      { label: "Find an ally afterwards to help you decode it.", weight: 1 },
      { label: "Pick the one true thread and run a two-week change experiment.", weight: 4 },
    ],
  },
  {
    q: "You are asked to present to leadership with one hour's notice.",
    options: [
      { label: "Say yes, build three slides, present from memory.", weight: 4 },
      { label: "Ask for fifteen minutes to prepare a proper one-pager.", weight: 1 },
      { label: "Rally two colleagues to pull the numbers with you.", weight: 3 },
      { label: "Sketch it live on the whiteboard and see where it lands.", weight: 2 },
    ],
  },
  {
    q: "A process you built works fine — but people quietly work around it.",
    options: [
      { label: "Assume they have their reasons and say nothing.", weight: 1 },
      { label: "Instrument it, find the step where people bail, redesign that step.", weight: 4 },
      { label: "Run a retrospective with the people avoiding it.", weight: 3 },
      { label: "Retire it quietly as an experiment and watch who notices.", weight: 2 },
    ],
  },
  {
    q: "Two teammates are in open conflict; both want you on their side.",
    options: [
      { label: "Refuse to pick — tell them to sort it out themselves.", weight: 1 },
      { label: "Reduce it to the concrete decision underneath the dispute.", weight: 3 },
      { label: "Sit them down together and mediate until it is resolved.", weight: 4 },
      { label: "Split the disputed work between them as a two-week test.", weight: 2 },
    ],
  },
  {
    q: "Your industry shifts in a way that makes half your skills older.",
    options: [
      { label: "Announce a pivot publicly and push through the discomfort.", weight: 2 },
      { label: "Audit your skills; double down on the two that still compound.", weight: 3 },
      { label: "Ask the people you trust most what they would do.", weight: 1 },
      { label: "Run a 30-day sprint into the new thing and measure your learning rate.", weight: 4 },
    ],
  },
  {
    q: "A boring-but-critical task has sat unassigned for weeks.",
    options: [
      { label: "Take it, block two hours, finish it today.", weight: 3 },
      { label: "Give it a recurring calendar slot so it never rots again.", weight: 4 },
      { label: "Ask around for someone who might actually enjoy it.", weight: 1 },
      { label: "Automate half of it, then hand the rest to whoever is keen.", weight: 2 },
    ],
  },
  {
    q: "You feel a strong no about a decision everyone else loves.",
    options: [
      { label: "Say the no out loud, in the room, with your reasoning.", weight: 4 },
      { label: "Write the one-page pre-mortem of how it fails.", weight: 3 },
      { label: "Check privately with a skeptic you trust: am I crazy?", weight: 1 },
      { label: "Go along for now, but quietly prepare a plan B.", weight: 2 },
    ],
  },
  {
    q: "Your rejected idea from last quarter returns — proposed by someone else.",
    options: [
      { label: "Point out, flatly, that you proposed exactly this in March.", weight: 2 },
      { label: "Resurface your original document with the new context attached.", weight: 3 },
      { label: "Join their version and make it better than yours was.", weight: 4 },
      { label: "Wait to see whether it survives this time before investing.", weight: 1 },
    ],
  },
  {
    q: "A customer cancels angrily over something that was not your fault.",
    options: [
      { label: "Call them, take the heat, fix what is fixable.", weight: 3 },
      { label: "Trace the exact failure point and write the post-mortem.", weight: 4 },
      { label: "Send a personal note and leave the door open.", weight: 2 },
      { label: "Accept it — some churn is noise, not signal.", weight: 1 },
    ],
  },
  {
    q: "Three urgent priorities arrive from three different bosses.",
    options: [
      { label: "Pick the one with the worst downside and start there.", weight: 2 },
      { label: "Put all three in one view, estimate each, send back a sequence.", weight: 3 },
      { label: "Get the three bosses into one thread to align on the order.", weight: 4 },
      { label: "Do thirty minutes of each and see which gains traction.", weight: 1 },
    ],
  },
  {
    q: "A teammate is clearly drowning but has not asked for help.",
    options: [
      { label: "Say it directly: you look underwater — what can I take?", weight: 3 },
      { label: "Quietly take over their most visible deadline yourself.", weight: 2 },
      { label: "Sit with them, triage their list together, redistribute.", weight: 4 },
      { label: "Send them something useful and let them come to you.", weight: 1 },
    ],
  },
  {
    q: "A new manager restructures everything you had built a rhythm around.",
    options: [
      { label: "Ask for an explicit conversation about what stays and why.", weight: 3 },
      { label: "Adapt quietly — reorganize your files around the new shape.", weight: 1 },
      { label: "Invest early in understanding what the new manager needs.", weight: 4 },
      { label: "Keep parts of your old routine running privately.", weight: 2 },
    ],
  },
  {
    q: "Your side experiment starts outperforming your main project.",
    options: [
      { label: "Propose formally switching priorities this week.", weight: 4 },
      { label: "Run the numbers for two more weeks, then decide on data.", weight: 3 },
      { label: "Loop in the people a switch would affect before deciding.", weight: 2 },
      { label: "Let both run in parallel as long as you can sustain it.", weight: 1 },
    ],
  },
  {
    q: "You are the most experienced person in a room that does not know it.",
    options: [
      { label: "Mention your background only if someone asks directly.", weight: 1 },
      { label: "Ask the structured questions the room is missing.", weight: 3 },
      { label: "Offer to facilitate — order, not authority.", weight: 2 },
      { label: "Start sketching options on the wall and invite reactions.", weight: 4 },
    ],
  },
  {
    q: "You are offered a role you are only 60% qualified for.",
    options: [
      { label: "Take it — the missing 40% is learnable in the role.", weight: 4 },
      { label: "List the gaps, send them back, and ask them to decide.", weight: 1 },
      { label: "Call two people who have done the role before deciding.", weight: 3 },
      { label: "Propose a three-month trial with a defined scope.", weight: 2 },
    ],
  },
  {
    q: "A decision you made six months ago is quietly costing the team.",
    options: [
      { label: "Name it in public: that one is on me — here is the fix.", weight: 3 },
      { label: "Trace the cost, fix the root cause, add it to your checklist.", weight: 4 },
      { label: "Apologise individually to the people it hit hardest.", weight: 2 },
      { label: "Wait — reversing has its own cost.", weight: 1 },
    ],
  },
];

/* ── Serialisers: JSON bank, CSV mirror, quiz engine ─────────────── */

const jstr = (s: string): string => JSON.stringify(s);

const qsJson = (): string =>
  "{\n  \"questions\": [\n" +
  QS.map(
    (x) =>
      "  {\n    \"q\": " +
      jstr(x.q) +
      ",\n    \"options\": [\n" +
      x.options
        .map((o) => "      { \"label\": " + jstr(o.label) + ", \"weight\": " + o.weight + " }")
        .join(",\n") +
      "\n    ]\n  }",
  ).join(",\n") +
  "\n  ]\n}\n";

const csvCell = (v: string): string =>
  /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;

const qsCsv = (): string =>
  "number,question,option_a,weight_a,option_b,weight_b,option_c,weight_c,option_d,weight_d\n" +
  QS.map((x, i) =>
    [String(i + 1), x.q, ...x.options.flatMap((o) => [o.label, String(o.weight)])]
      .map(csvCell)
      .join(","),
  ).join("\n") +
  "\n";

/* quiz.html = head + inline question data + engine. The engine script
   deliberately uses no template literals and no backticks, so the TS
   template literals below need no escaping tricks. */

const QUIZ_HEAD = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Operating Type — Personality Assessment</title>
<style>
:root{--bg:#f6f4ef;--card:#ffffff;--ink:#211d18;--muted:#6f675c;--line:#e4ded2;--accent:#b4532a;--on-accent:#ffffff;--t1:#c2541f;--t2:#a07d10;--t3:#4e7a58;--t4:#4f7292;--shadow:0 1px 3px rgba(33,29,24,.09)}
@media (prefers-color-scheme:dark){:root{--bg:#161310;--card:#201c17;--ink:#f0e9dd;--muted:#a79c8b;--line:#3a342b;--accent:#e07a4a;--on-accent:#161310;--t1:#e59a6d;--t2:#d3b45f;--t3:#8fb998;--t4:#93b7d3;--shadow:0 1px 3px rgba(0,0,0,.5)}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
main{max-width:700px;margin:0 auto;padding:28px 20px 72px}
.kicker{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);font-weight:700;margin:0 0 8px}
h1{font-size:clamp(26px,5vw,34px);line-height:1.15;margin:0 0 10px}
h2{font-size:22px;margin:0 0 6px}
.sub{color:var(--muted);margin:0 0 22px}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:22px;box-shadow:var(--shadow)}
.meta{display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin:0 0 8px;color:var(--muted);font-size:13px}
.track{height:8px;background:var(--line);border-radius:99px;overflow:hidden;margin:0 0 18px}
.fill{height:100%;width:0;background:var(--accent);border-radius:99px;transition:width .25s ease}
.q{font-size:20px;font-weight:650;line-height:1.35;margin:0 0 16px;min-height:54px}
.opts{display:grid;gap:10px}
.opt{display:flex;gap:12px;align-items:flex-start;text-align:left;font:inherit;color:inherit;background:var(--card);border:1px solid var(--line);border-radius:11px;padding:13px 15px;cursor:pointer}
.opt:hover{border-color:var(--accent)}
.opt:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.opt.picked{border-color:var(--accent);box-shadow:inset 0 0 0 1px var(--accent)}
.key{flex:none;display:inline-grid;place-items:center;width:24px;height:24px;border:1px solid var(--line);border-radius:6px;font-size:12px;font-weight:700;color:var(--muted);margin-top:1px}
.opt.picked .key{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.row{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:18px;flex-wrap:wrap}
.btn{font:inherit;font-weight:650;border-radius:10px;border:1px solid var(--line);background:var(--card);color:var(--ink);padding:9px 16px;cursor:pointer}
.btn:hover{border-color:var(--accent)}
.btn:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.btn.primary{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.hint{color:var(--muted);font-size:12.5px}
.result-top{display:flex;gap:18px;align-items:center;flex-wrap:wrap}
.medal{flex:none;width:96px;height:96px;border-radius:50%;display:grid;place-items:center;border:6px solid var(--accent);font-size:26px;font-weight:800}
.band-sub{color:var(--muted);margin:2px 0 10px}
.blurb{margin:0}
.bars{margin:18px 0 2px;display:grid;gap:10px}
.bar-row{display:grid;grid-template-columns:110px 1fr 84px;gap:10px;align-items:center;font-size:14px}
.bar-track{height:10px;background:var(--line);border-radius:99px;overflow:hidden}
.bar-fill{height:100%;border-radius:99px;background:var(--muted)}
.bar-fill.lead{background:var(--accent)}
.bar-num{color:var(--muted);text-align:right;font-variant-numeric:tabular-nums}
ul.steps{margin:10px 0 0;padding-left:20px}
ul.steps li{margin:4px 0}
.share{width:100%;margin-top:12px;font:inherit;font-size:14px;border:1px solid var(--line);border-radius:10px;background:transparent;color:inherit;padding:10px;resize:vertical;min-height:74px}
.footnote{color:var(--muted);font-size:13px;margin-top:16px}
@media (prefers-reduced-motion:reduce){.fill,.bar-fill{transition:none}}
</style>
</head>
<body>
<main>
<p class="kicker">OMNIFORGE · Personality Assessment</p>
<h1>Operating Type</h1>
<p class="sub">25 scenarios, four responses each. Pick what you would actually do — not what sounds best.</p>

<section id="screen-intro" class="card" aria-label="Introduction">
  <h2>How this works</h2>
  <p>Every response carries two hidden attributes: an <strong>ownership weight</strong> — how much of the situation you take on — and one of four <strong>channels</strong>: Direct, Methodical, Relational, Experimental. There are no right answers; there is only what you would do.</p>
  <ul class="steps">
    <li>25 scenarios · about 5 minutes</li>
    <li>Keyboard: press 1–4 to answer, ← to go back, Enter on a focused response</li>
    <li>Everything runs inside this file — nothing is sent anywhere</li>
  </ul>
  <div class="row">
    <span class="hint">Your result: an Operating Type plus your channel mix.</span>
    <button type="button" class="btn primary" id="start">Start — 25 scenarios</button>
  </div>
</section>

<section id="screen-quiz" class="card" aria-label="Quiz" hidden>
  <div class="meta"><span id="qnum" aria-live="polite">Question 1 of 25</span><span>ownership-weighted</span></div>
  <div class="track" role="progressbar" aria-label="Progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="fill" id="fill"></div></div>
  <p class="q" id="qtext" aria-live="polite"></p>
  <div class="opts" id="opts" role="group" aria-label="Responses"></div>
  <div class="row">
    <button type="button" class="btn" id="back">← Back</button>
    <span class="hint">Keys 1–4 answer · ← goes back</span>
  </div>
</section>

<section id="screen-result" class="card" aria-label="Result" hidden>
  <div class="result-top">
    <div class="medal" id="medal">0</div>
    <div>
      <h2 id="band-name">—</h2>
      <p class="band-sub" id="band-sub">—</p>
      <p class="blurb" id="band-blurb">—</p>
    </div>
  </div>
  <div class="bars" id="bars"></div>
  <p class="footnote" id="channel-note"></p>
  <h2 style="font-size:17px;margin:20px 0 0">Read your result</h2>
  <ul class="steps" id="next"></ul>
  <label class="hint" for="share" style="display:block;margin-top:16px">Share text — edit the link, then copy</label>
  <textarea class="share" id="share" readonly></textarea>
  <div class="row">
    <span class="hint">Press R to restart</span>
    <button type="button" class="btn primary" id="restart">Take it again</button>
  </div>
  <p class="footnote">No type is better than another. The score measures how much ownership you take in these scenarios; the channel describes how you prefer to move. Full type map: 03-scoring/type-mapping.md.</p>
</section>
</main>
<script>
"use strict";
`;

const QUIZ_TAIL = `
var TYPES=[
 {name:"The Igniter",min:85,color:"var(--t1)",blurb:"Ownership is your default setting. You convert friction into motion before anyone asks.",steps:["Schedule one deliberate watch-week per quarter — your risk is burnout-by-default, not laziness.","Pair with an Anchor for review before any irreversible bet.","Give away one owned outcome this month: grow an owner, not a hero."]},
 {name:"The Catalyst",min:70,color:"var(--t2)",blurb:"You engage the moment the shape of a thing is clear, then push it hard to done.",steps:["Write down the conditions that flip you from observer to owner — make them visible.","Your gap risk is slow starts: pre-commit a first step within 48 hours of any new initiative.","Systemize what you start — hand off with a checklist, not a hero note."]},
 {name:"The Sustainer",min:50,color:"var(--t3)",blurb:"You take ownership selectively, where stakes and clarity justify it — and you keep running what others would let decay.",steps:["Audit what you maintain silently: make it visible or renegotiate it.","Practice cheap engagement — take one low-stakes thing this week without the full case.","Pick one decaying system and either revive it or kill it this month."]},
 {name:"The Anchor",min:0,color:"var(--t4)",blurb:"You watch first, commit late, de-risk before you move. Teams lean on you for stability, memory and honest second opinions.",steps:["Claim the review-room role explicitly — your caution is a feature there.","Run small reversible commitments: one-week bets with a review date.","You are the team's memory: write down the things only you noticed."]}
];
var CHANNELS=["Direct","Methodical","Relational","Experimental"];
var CHANNEL_NOTES=[
 "Direct — you move through people: decisions spoken out loud, fast.",
 "Methodical — you move through structure: lists, plans, systems.",
 "Relational — you move through others: buy-in, support, alignment.",
 "Experimental — you move through tries: versions, drafts, probes."
];
var state={i:0,answers:[]};
function $(id){return document.getElementById(id);}
function show(name){["intro","quiz","result"].forEach(function(s){$("screen-"+s).hidden=(s!==name);});}
function start(){state={i:0,answers:[]};show("quiz");render();window.scrollTo(0,0);}
function render(){
  var q=QUESTIONS[state.i];
  $("qnum").textContent="Question "+(state.i+1)+" of "+QUESTIONS.length;
  var pct=Math.round((state.i/QUESTIONS.length)*100);
  var f=$("fill");f.style.width=pct+"%";f.setAttribute("aria-valuenow",String(pct));
  $("qtext").textContent=q.q;
  var box=$("opts");box.innerHTML="";
  q.options.forEach(function(o,k){
    var b=document.createElement("button");
    b.type="button";
    b.className="opt"+(state.answers[state.i]===k?" picked":"");
    var key=document.createElement("span");key.className="key";key.textContent=String(k+1);
    var lab=document.createElement("span");lab.textContent=o.label;
    b.appendChild(key);b.appendChild(lab);
    b.addEventListener("click",function(){choose(k);});
    box.appendChild(b);
  });
  $("back").disabled=state.i===0;
  var first=box.querySelector("button");if(first){first.focus();}
}
function choose(k){
  state.answers[state.i]=k;
  if(state.i===QUESTIONS.length-1){finish();return;}
  state.i+=1;render();
}
function back(){if(state.i>0){state.i-=1;render();}}
function finish(){
  var sum=0,counts=[0,0,0,0];
  state.answers.forEach(function(k,i){sum+=QUESTIONS[i].options[k].weight;counts[k]+=1;});
  var max=QUESTIONS.length*4;
  var score=Math.round(sum/max*100);
  var t=TYPES[TYPES.length-1];
  for(var x=0;x<TYPES.length;x++){if(score>=TYPES[x].min){t=TYPES[x];break;}}
  var top=Math.max.apply(null,counts);
  var doms=[];counts.forEach(function(c,k){if(c===top){doms.push(k);}});
  $("medal").textContent=String(score);
  $("medal").style.borderColor=t.color;
  $("medal").style.color=t.color;
  $("band-name").textContent=t.name;
  $("band-sub").textContent=score+" / 100 ownership · "+doms.map(function(k){return CHANNELS[k];}).join(" · ")+" channel"+(doms.length>1?"s":"");
  $("band-blurb").textContent=t.blurb;
  var bars=$("bars");bars.innerHTML="";
  CHANNELS.forEach(function(c,k){
    var row=document.createElement("div");row.className="bar-row";
    var l=document.createElement("span");l.textContent=c;
    var track=document.createElement("div");track.className="bar-track";
    var fill=document.createElement("div");fill.className="bar-fill"+(counts[k]===top?" lead":"");
    fill.style.width=Math.round(counts[k]/QUESTIONS.length*100)+"%";
    track.appendChild(fill);
    var n=document.createElement("span");n.className="bar-num";n.textContent=counts[k]+" / "+QUESTIONS.length;
    row.appendChild(l);row.appendChild(track);row.appendChild(n);
    bars.appendChild(row);
  });
  $("channel-note").textContent="Your channel in one line: "+doms.map(function(k){return CHANNEL_NOTES[k];}).join(" ");
  var ul=$("next");ul.innerHTML="";
  t.steps.forEach(function(s){var li=document.createElement("li");li.textContent=s;ul.appendChild(li);});
  $("share").value="Operating Type: "+score+"/100 — "+t.name+" ("+doms.map(function(k){return CHANNELS[k];}).join(" / ")+"). 25 scenarios, no right answers. Take it: {{link}}";
  show("result");window.scrollTo(0,0);$("restart").focus();
}
function moveFocus(dir){
  var btns=Array.prototype.slice.call(document.querySelectorAll("#opts .opt"));
  var i=btns.indexOf(document.activeElement);
  var n=btns[i+dir];
  if(!n){n=btns[dir>0?0:btns.length-1];}
  if(n){n.focus();}
}
$("start").addEventListener("click",start);
$("restart").addEventListener("click",start);
$("back").addEventListener("click",back);
$("share").addEventListener("focus",function(){this.select();});
document.addEventListener("keydown",function(e){
  var quizOn=!$("screen-quiz").hidden,introOn=!$("screen-intro").hidden,resOn=!$("screen-result").hidden;
  if(quizOn){
    if(e.key>="1"&&e.key<="4"){var k=Number(e.key)-1;if(k<QUESTIONS[state.i].options.length){e.preventDefault();choose(k);}}
    else if(e.key==="ArrowDown"||e.key==="ArrowRight"){e.preventDefault();moveFocus(1);}
    else if(e.key==="ArrowUp"){e.preventDefault();moveFocus(-1);}
    else if(e.key==="ArrowLeft"||e.key==="Backspace"){e.preventDefault();back();}
  }else if(introOn){
    if(e.key==="Enter"){e.preventDefault();start();}
  }else if(resOn){
    if(e.key==="r"||e.key==="R"){start();}
  }
});
</script>
</body>
</html>
`;

/* ── The bundle ──────────────────────────────────────────────────── */

export const files: Record<string, string> = {
  "01-quiz/quiz.html":
    QUIZ_HEAD + "var QUESTIONS=" + JSON.stringify(QS) + ";\n" + QUIZ_TAIL,

  "02-questions/questions.json": qsJson(),

  "02-questions/questions.csv": qsCsv(),

  /* ── 03 Scoring ── */

  "03-scoring/scoring-logic.md": `# Scoring logic — Operating Type

## The model in one paragraph

25 scenarios, four responses each. Every response carries two hidden
attributes:

- **Channel** — fixed by position: A Direct, B Methodical, C Relational,
  D Experimental. It describes *how* you prefer to move.
- **Ownership weight** — 1 to 4, how much of the situation that
  response takes on (1 = watch and defer, 4 = own and act). It
  describes *how much* you take on.

## The math

\`\`\`
score = round( sum(chosen weights) / (4 × 25) × 100 )
\`\`\`

With 25 questions the maximum is exactly 100, so the score IS the raw
sum of chosen weights. Range: 25 (all weight-1 responses) to 100 (all
weight-4). The formula is stated generically because it must survive
edits: if you cut the bank to 20 scenarios, the score stays a clean
0–100 index with maximum \`4 × N\`.

## Type bands

| Score | Type | Identity |
| --- | --- | --- |
| 85–100 | The Igniter | Ownership is the default |
| 70–84 | The Catalyst | Ownership once the shape is clear |
| 50–69 | The Sustainer | Selective ownership |
| 25–49 | The Anchor | Ownership after de-risking |

Bands are thresholds on the score, nothing else — no percentile, no
population norming, and no claim that one band is better. See
\`type-mapping.md\` for the full readings.

## Channel counting

The dominant channel is whichever of A/B/C/D the respondent chose most
often (the engine renders this as the four-bar chart). A tie is read as
a blend: both channels are shown, joined with a dot — a blended channel
is information, not a bug, and must never be averaged into mush.

One design note that keeps the instrument honest: weights attach to the
*response*, not to the channel. Across this bank every channel holds
weight 4 at least five times and weight 1 at least three times, so a
high score requires choosing **when** to be direct, methodical,
relational or experimental — not which one to be. Channel preference
and ownership are separate axes.

## Worked example

| Answered | Q1 | Q2 | Q3 | … | Q25 | Sum |
| --- | --- | --- | --- | --- | --- | --- |
| Weight | 4 | 3 | 2 | … | 3 | **76** |

76 / 100 → **The Catalyst**. Letter counts: A×5, B×9, C×7, D×4 →
dominant **Methodical** → reading: **Catalyst · Methodical**.

## Editing rules (keep the math honest)

1. Exactly 4 responses per scenario; their weights must be a
   permutation of 1, 2, 3, 4 — never duplicate a weight within a
   question.
2. Channel positions are fixed: A Direct, B Methodical, C Relational,
   D Experimental. Reordering an option reassigns its channel.
3. Rewrite scenarios freely; the formula adapts to any question count.
4. \`questions.json\` is the source of truth — mirror every edit into
   \`questions.csv\` and the embedded data in \`01-quiz/quiz.html\`.
`,

  "03-scoring/type-mapping.md": `# Type mapping — Operating Type

Two inputs decide the reading: the **ownership score** (25–100) and the
**dominant channel** (the letter chosen most often). Score sets the
type; channel shades it. Full scoring math: \`scoring-logic.md\`.

## Step 1 — score band

| Score | Type | One-line identity |
| --- | --- | --- |
| 85–100 | The Igniter | Converts friction into motion before being asked |
| 70–84 | The Catalyst | Engages once the shape is clear, then pushes hard |
| 50–69 | The Sustainer | Takes ownership where stakes justify it; keeps things alive |
| 25–49 | The Anchor | Watches first, commits late, de-risks before moving |

## Step 2 — dominant channel

- **Direct (A)** — moves through people: decisions spoken out loud, fast
- **Methodical (B)** — moves through structure: lists, plans, systems
- **Relational (C)** — moves through others: buy-in, support, alignment
- **Experimental (D)** — moves through tries: versions, drafts, probes

Tie → read both channels (\`Catalyst · Direct/Methodical\`).

## The four types, fully read

### The Igniter (85–100)
**Identity:** ownership is your default setting; you would rather ask
forgiveness than watch something stall.
**Strengths:** starts from nothing; absorbs ambiguity; sets a pace
other people borrow.
**Watch-fors:** burns quiet people; mistakes motion for progress;
despises the maintenance phase.
**Under pressure:** accelerates — the question is whether anyone is
still with you.
**Pairs best with:** an Anchor in review before the irreversible bets.

### The Catalyst (70–84)
**Identity:** you engage the moment the shape of a thing is clear, then
drive it to done with confidence inside your circle.
**Strengths:** converts plans into motion; reliable in the messy
middle; knows exactly what you own and what you don't.
**Watch-fors:** slow first steps on vague problems; can hoard the fun
half and drop the boring half.
**Under pressure:** narrows to the critical path — tell people what
you dropped.
**Pairs best with:** an Igniter to open doors, a Sustainer to close
loops.

### The Sustainer (50–69)
**Identity:** selective ownership — you take it on when the stakes and
clarity justify it, and you quietly keep systems alive that others
would let decay.
**Strengths:** maintenance, institutional memory, the good judgement
to say no.
**Watch-fors:** invisible load — things you alone keep running;
ownership drift toward whoever asked loudest.
**Under pressure:** triages calmly; risks defending the status quo
past its sell-by date.
**Pairs best with:** a Catalyst to force the start you keep deferring.

### The Anchor (25–49)
**Identity:** watch first, commit late, de-risk before you move. Teams
lean on you for stability, memory and honest second opinions.
**Strengths:** catches what rushed people miss; cheap to keep, expensive
to lose; the person everyone consults before signing.
**Watch-fors:** commitments arrive after the opportunity; caution can
read as veto; your "no" carries more weight than you think.
**Under pressure:** slows down further — deliberately set a decision
deadline.
**Pairs best with:** an Igniter you trust enough to occasionally say
yes on their energy.

## Reading the combination — four examples

- **Igniter · Relational** — starts movements *through* people; momentum
  with buy-in. Risk: consensus-seeking at ignition speed.
- **Catalyst · Methodical** — the cleanest executor profile: engage,
  structure, ship. Risk: analysis between engagement and motion.
- **Sustainer · Experimental** — keeps things alive by trying small
  fixes; the quiet improver. Risk: experiments nobody hears about.
- **Anchor · Direct** — the blunt auditor: says the unsayable early,
  with receipts. Risk: bluntness before trust exists.

## Honest-use rules

1. Never quote a score without the channel — the number alone invites
   ranking that the instrument explicitly rejects.
2. No type is better. The bands describe ownership habits in these
   scenarios, not worth, skill or intelligence.
3. A mid score is a strategy (selective ownership), not a failure
   verdict — deliver it that way.
`,

  /* ── 04 Results ── */

  "04-results/result-page.html": `<!doctype html>
<!-- ═══════════════════════════════════════════════════════════════
  Shareable result page — Operating Type (B-AS-2)
  Fill guide — replace every {{field}} before publishing:
    {{respondent_name}}  who took it            "Maya Okonkwo"
    {{date}}             result date            "12 Mar 2026"
    {{score}}            25–100                 "78"
    {{type_name}}        Igniter/Catalyst/...   "The Catalyst"
    {{channel_name}}     dominant channel       "Methodical"
    {{headline}}         one-line reading       "You engage the moment..."
    {{share_text}}       the engine share line  "Operating Type: 78/100..."
    {{cta_pitch}}        one line above the button
    {{cta_url}}          where the button goes
    {{cta_label}}        button text
    {{brand_name}}       your brand             "Forge Coaching"
    {{site_url}}         your site              "https://…"
  ═══════════════════════════════════════════════════════════════ -->
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{respondent_name}} — {{type_name}} · Operating Type</title>
<style>
:root{--bg:#f6f4ef;--card:#fff;--ink:#211d18;--muted:#6f675c;--line:#e4ded2;--accent:#b4532a;--on-accent:#fff;--shadow:0 1px 3px rgba(33,29,24,.09)}
@media (prefers-color-scheme:dark){:root{--bg:#161310;--card:#201c17;--ink:#f0e9dd;--muted:#a79c8b;--line:#3a342b;--accent:#e07a4a;--on-accent:#161310;--shadow:0 1px 3px rgba(0,0,0,.5)}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.55 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif}
main{max-width:640px;margin:0 auto;padding:36px 20px 60px}
.kicker{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--accent);font-weight:700;margin:0 0 8px}
h1{font-size:clamp(24px,5vw,32px);line-height:1.15;margin:0 0 6px}
.date{color:var(--muted);margin:0 0 24px;font-size:14px}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:24px;box-shadow:var(--shadow);margin-bottom:18px}
.top{display:flex;gap:20px;align-items:center;flex-wrap:wrap}
.medal{flex:none;width:104px;height:104px;border-radius:50%;display:grid;place-items:center;border:7px solid var(--accent);font-size:28px;font-weight:800}
.medal small{display:block;font-size:11px;font-weight:700;letter-spacing:.08em;color:var(--muted)}
.type{font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:700;margin:0 0 4px}
h2{font-size:26px;margin:0 0 6px}
.channel{color:var(--muted);margin:0 0 10px}
.headline{margin:0}
.share{border-left:3px solid var(--accent);margin:0;padding:4px 0 4px 14px;color:var(--muted);font-style:italic}
.cta p{margin:0 0 14px}
.btn{display:inline-block;font-weight:650;border-radius:10px;border:1px solid var(--accent);background:var(--accent);color:var(--on-accent);padding:12px 22px;text-decoration:none}
.foot{color:var(--muted);font-size:13px;text-align:center;margin-top:8px}
</style>
</head>
<body>
<main>
  <p class="kicker">Operating Type · Personality Assessment</p>
  <h1>{{respondent_name}}, you are {{type_name}}</h1>
  <p class="date">{{date}} · 25 scenarios · no right answers</p>

  <section class="card top" aria-label="Result">
    <div class="medal" role="img" aria-label="Score {{score}} out of 100">{{score}}<small>/ 100</small></div>
    <div>
      <p class="type">{{type_name}}</p>
      <h2>{{channel_name}} channel</h2>
      <p class="headline">{{headline}}</p>
    </div>
  </section>

  <section class="card" aria-label="Share">
    <p class="share">{{share_text}}</p>
  </section>

  <section class="card cta" aria-label="Next step">
    <p>{{cta_pitch}}</p>
    <a class="btn" href="{{cta_url}}">{{cta_label}}</a>
  </section>

  <p class="foot">Assessment by {{brand_name}} · {{site_url}}</p>
</main>
</body>
</html>
`,

  "04-results/strengths-report-layout.md": `# Strengths report layout — Operating Type

The quiz result is the hook; this report is the deliverable. The spec
below produces a 4–6 page PDF (or Notion page) from one respondent's
answers. Every section lists what goes in and the rules that keep it
honest.

## Page 1 — Cover

- Title: "Operating Type — Strengths Report"
- Fields: \`{{respondent_name}}\` · \`{{date}}\` · \`{{type_name}}\` ·
  \`{{score}}\`/100 · \`{{channel_name}}\`
- Visual: the four channel bars (counts) at low opacity as a motif
- Rule: no respondent photo — the report is type-first, not
  person-first

## Page 2 — The type (one page, no more)

- \`{{type_headline}}\`: the 150–180 word reading from
  \`type-mapping.md\`, personalised with one line of evidence from
  their own answers ("In scenario 7 you chose …").
- Type card: name, band, one-line identity.
- "What this type is not": 3 bullets from the watch-fors — the honest
  negative space is what separates a report from a horoscope.

## Page 3 — Channel blend

- The four bars (counts) exactly as the engine rendered them.
- 80–120 words on what the mix means for how this person prefers to
  move.
- Tie rule: two channels tie → both get a paragraph. Never merge them
  into an average.

## Page 4 — Top five strengths

Table with three columns: **strength | where it showed | how to deploy it**

- Source: map each strength to 2–3 scenario answers as evidence
  (scenario number + their chosen response).
- Evidence is mandatory — no strength without a receipt.
- Deploy lines are written as instructions to their manager, not to
  them ("Give her the ambiguous briefs early, not after planning").

## Page 5 — Watch-fors and pairs

- 2–3 watch-fors, each with a one-line antidote.
- "Works well with": the two types this one complements, one line why.
- "Friction with": one type, one line, phrased as both sides'
  responsibility — never a blame line.

## Page 6 — Next 30 days

- Exactly 3 commitments in a table: **action | evidence it happened |
  date**.
- Pull from the type's step list (shown on the quiz result screen) and
  customise with the channel.

## Production rules

- A4 portrait, 2 cm margins, one accent colour matching the quiz,
  body 11 pt, headings in the same typeface at 16/13/11.
- The score appears only on the cover and the type card. The report
  sells the reading, not the number.
- Deliver within 48 hours of the session — interpretation cools fast.
- Merge fields follow the same \`{{snake_case}}\` convention as the
  result page template, so one fill pass covers both.
`,

  /* ── 05 Setup ── */

  "05-setup/setup-guide.md": `# Setup guide — Personality Assessment (Operating Type)

From download to first respondent in under an hour. No build, no
account, no server — the engine is one file.

## What's in the kit

| Path | What it is |
| --- | --- |
| \`01-quiz/quiz.html\` | The whole engine: 25 scenarios, keyboard flow, live scoring, result screen. Double-click to run. |
| \`02-questions/questions.json\` | The bank as data — 25 questions × 4 weighted options. |
| \`02-questions/questions.csv\` | The same bank as a spreadsheet — one row per question, option and weight columns. |
| \`03-scoring/scoring-logic.md\` | The exact math: weights, formula, type bands, channel counting. |
| \`03-scoring/type-mapping.md\` | The four types and how score + dominant channel combine into a reading. |
| \`04-results/result-page.html\` | Shareable result page template — merge fields, medal, share text, CTA. |
| \`04-results/strengths-report-layout.md\` | Spec for the report you deliver on top of the result. |
| \`05-setup/\` | This guide (a PDF twin is generated from it) + walkthrough link. |

## The 45-minute setup

### 1. Run it yourself first (5 min)

Double-click \`01-quiz/quiz.html\` — it opens in any browser and runs
offline. Take it honestly. Note where the result lands and where it
feels off; that calibration is your reference for step 3.

### 2. Brand pass (15 min)

Open \`quiz.html\` in any text editor and find-and-replace:

| Find | Replace with |
| --- | --- |
| \`Operating Type — Personality Assessment\` | your assessment name (title tag) |
| \`OMNIFORGE · Personality Assessment\` | your kicker line |
| \`{{link}}\` (in the share text) | your hosted URL or short link |
| \`--accent:#b4532a\` | your accent colour |

Dark mode follows the OS setting automatically (\`prefers-color-scheme\`)
— check both before shipping.

### 3. Decide what you change — and what you don't (10 min)

Editing rules that keep the instrument honest (details in
\`03-scoring/scoring-logic.md\`):

- Keep exactly 4 responses per scenario, weights a permutation of
  1–4, no duplicates within a question.
- Keep channel positions: A Direct, B Methodical, C Relational,
  D Experimental.
- The formula adapts to any question count: score = sum ÷ (4 × N) × 100.
- \`questions.json\` is the source of truth — mirror edits into the CSV
  and the quiz's embedded data.

### 4. Put it in front of people (10 min)

- **Email it** — the file runs from an attachment, offline.
- **Host it** — any static host (Netlify drop, S3, GitHub Pages); it
  is a single file with zero requests.
- **Embed it** — iframe at full height inside your own page.

### 5. Capture results (5 min)

The engine computes locally and sends nothing. Three honest options:

- The share-text block — respondents copy the one-liner.
- \`04-results/result-page.html\` — fill the merge fields, publish a
  personal result page per respondent.
- The lead-capture wiring listed in the EXTENDED-PACK note of the
  README (in production).

## Troubleshooting

- **"The result feels harsh"** — re-read the type-mapping honest-use
  rules; mid scores are a strategy, not a verdict. Deliver them as
  such.
- **"Keys 1–4 do nothing"** — the quiz screen must be visible; click
  any response once to return focus to the page.
- **"I broke the JSON"** — validate in any JSON linter; the top-level
  shape must remain \`{ "questions": [ … ] }\`.

## Support

Questions, corrections, improvement ideas:
support@omniforge.example — 30-day money-back guarantee.
`,

  "05-setup/walkthrough-link.md": `# Walkthrough

A 7-minute video walkthrough of this kit — the engine annotated, the
scoring math on screen, and the three edits most buyers make first:

**→ https://omniforge.example/walkthroughs/B-AS-2**

Contents:

- 00:00 — Running the engine: keyboard flow and the result screen
- 01:10 — The two hidden attributes: channel and ownership weight
- 02:35 — Reading the type map (and what ties mean)
- 04:00 — The brand pass: title, kicker, accent, share link
- 05:20 — Editing scenarios without breaking the math
- 06:10 — From quiz result to strengths report

The video is hosted (not bundled) so the kit stays small and
offline-first.
`,

  /* kit stub note for the extended pack */

  "EXTENDED-PACK/team-report-builder.md": `# Team report builder — in production

Status: **in production** — not in this archive.

What the finished file will contain: a workflow (plus CSV template)
that aggregates multiple respondents' Operating Type results into a
team-type distribution report — counts per type and channel, coverage
gaps, friction pairs mapped to the pairs table in
\`03-scoring/type-mapping.md\`, and facilitation notes for running the
results conversation with the team present.
`,
};

/* ── Try-it demo content — the same bank, playable in the studio ── */

export const demo: DemoContent = {
  kind: "quiz",
  intro:
    "Play the real assessment — the same 25 scenarios that ship in the ZIP. Pick what you would actually do; the engine scores ownership, maps your Operating Type and shows your channel mix.",
  questions: QS.map((x) => ({ q: x.q, options: x.options })),
  bands: [
    {
      name: "The Igniter",
      min: 85,
      blurb:
        "Ownership is your default. You convert friction into motion before anyone asks — watch the burn rate.",
    },
    {
      name: "The Catalyst",
      min: 70,
      blurb:
        "You engage once the shape is clear, then push hard to done. Confident ownership inside your circle.",
    },
    {
      name: "The Sustainer",
      min: 50,
      blurb:
        "Selective ownership: you take it on when stakes and clarity justify it, and you keep systems alive.",
    },
    {
      name: "The Anchor",
      min: 0,
      blurb:
        "You watch first, commit late, de-risk before moving. The stability and memory others lean on.",
    },
  ],
};
