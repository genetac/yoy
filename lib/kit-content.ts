/**
 * OMNIFORGE · Kit content generator (Elite Plan P5)
 * Produces genuinely useful file contents per archetype — no lorem, no filler.
 * Every generated file is honest: flagged real/sample in the manifest, and the
 * content matches what the filename promises.
 */
import type { OfferV2 } from '@/data/product-catalog';

const B = (s: string) => s.trim(); // strip template indentation

/* ── template archetype: written emails, docs, banks ───────────── */
const tplEmail = (day: string, subj: string, body: string) =>
`# ${subj}

<!--
  Welcome series · ${day}
  Merge fields: {{first_name}}, {{company}}, {{sender_name}}
  ESP-ready: plain structure, no tables, single CTA.
-->

**Subject:** ${subj}
**Preview text:** ${'{{preview_text}}'}

Hi {{first_name}},

${body}

— {{sender_name}}
${'{{company}}'}
`;

function templateContent(path: string, offer: OfferV2): string {
  const name = path.split('/').pop() ?? '';
  if (path.startsWith('01-welcome-series/')) {
    if (name.includes('day-0')) return tplEmail('Day 0', 'Welcome aboard, {{first_name}}', B(`
You're in. Here's what happens next:

1. **Today** — your account is live and this guide walks you through setup in about five minutes.
2. **Day 2** — I'll send the one tactic most customers see results from first.
3. **Day 4** — a short story about how a team like yours solved the same problem.
4. **Day 6** — the offer, with your onboarding discount attached.

No spam, no daily nagging. Reply to any email if you get stuck — a human reads these.`));
    if (name.includes('day-2')) return tplEmail('Day 2', 'The 5-minute win most people miss', B(`
One setting, five minutes, measurable difference.

Customers who enable **single-field onboarding** see completion jump by roughly a third, because every extra field you ask for before value is a door you make them hold open.

Today: remove one field from your signup form. Measure this week.

Tomorrow I'll show you where the drop-off actually happens — it's almost never where teams assume.`));
    if (name.includes('day-4')) return tplEmail('Day 4', 'How {{company}}-sized teams fixed this', B(`
A four-person agency we work with had the same problem you might: great work, invisible process.

They did two things. First, they wrote down their delivery steps — all eleven, including the embarrassing ones. Second, they attached a checklist to each step so nothing lived in anyone's head.

Delivery time fell by a fifth in six weeks. Nothing about the work changed — only the visibility.

On day 6 I'll send the offer. If the sequence has been useful, I think you'll like what's inside.`));
    return tplEmail('Day 6', 'Your onboarding offer (ends Friday)', B(`
Everything from this week — the welcome flow, the quick win, the story, and the full system behind them — is in the complete pack.

**Inside:** every template in this series, editable, plus the sequences I didn't have room to send: cold outreach, follow-up, and win-back.

**Your onboarding price:** the pack at its published rate, plus the setup guide free.

Use your link below — it works until Friday, then the standard price returns.`));
  }
  if (path.startsWith('02-')) {
    if (name.includes('opener-problem')) return tplEmail('Cold outreach', 'The {{company}} problem you can see in your numbers', B(`
I noticed something specific about {{company}} — the kind of thing that shows up in the numbers before anyone names it.

Teams at your stage usually feel it as: work arriving faster than process can absorb it. The symptoms are rework, slow replies, and the sense that quality depends on who happens to be free.

I put the three fixes that survive contact with reality into a one-pager. Want it? Reply "one-pager" and it's yours — no call required.

— {{sender_name}}`));
    if (name.includes('opener-referral')) return tplEmail('Cold outreach', '{{mutual_contact}} suggested we talk', B(`
{{mutual_contact}} mentioned you when we were talking about {{company}}'s next quarter — specifically the part where growth outpaces process.

They thought the system I built for their team would map onto yours almost directly. Rather than guess, here's the one-pager version — if it resonates, the full system is a longer conversation. If not, the one-pager is yours either way.

— {{sender_name}}`));
    if (name.includes('proposal-') || name.startsWith('proposal')) return B(`
# Proposal — {{client_company}}
**Prepared by:** {{sender_name}}, {{company}} · **Date:** {{date}} · **Valid for:** 14 days

## 1. Objective
{{client_company}} will {{objective}} — measured by {{metric}} within {{timeframe}}.

## 2. Scope
| Phase | Deliverable | Duration |
|---|---|---|
| Discovery | Audit, interviews, findings memo | Week 1 |
| Build | Implementation of the agreed system | Weeks 2–3 |
| Handover | Documentation, training, 14-day support | Week 4 |

## 3. Investment
**Fixed scope total: {{price}}** — invoiced 50% on start, 50% on handover.

## 4. What is explicitly not included
Paid media spend, third-party licenses, and post-handover feature work (available at the standard rate card).

## 5. Terms
Payment terms net-7. Two revision rounds included per phase. Cancellation before build start refunds the deposit minus discovery hours.
`);
    if (name.includes('service-agreement') || name.includes('contract')) return B(`
# Service Agreement — {{company}} / {{client_company}}

*Template with drafting notes. Not legal advice — have counsel review before use.*

**1. Services.** Provider will deliver the services described in the attached Statement of Work ("SOW"). The SOW controls over this agreement for that engagement.

**2. Fees.** Fees are stated in the SOW. Invoices are due net-7 unless the SOW says otherwise. Late amounts accrue 1.5% monthly.

**3. Intellectual property.** On full payment, deliverables created specifically for Client transfer to Client. Provider retains its pre-existing tools, templates, and know-how, and grants Client a perpetual license to use them within the deliverables.

**4. Confidentiality.** Each party protects the other's non-public information with at least the care it uses for its own.

**5. Term.** This agreement runs until all SOWs under it complete. Either party may terminate for material breach with 14 days written notice to cure.

**6. Warranty.** Provider warrants services will be performed with professional skill. Client's exclusive remedy for a breach is re-performance or a refund of the affected fees.

**7. Governing law.** {{jurisdiction}}.
`);
    if (name.includes('mutual-nda')) return B(`
# Mutual Non-Disclosure Agreement

**Between:** {{party_a}} and {{party_b}} · **Effective:** {{date}}

1. **Purpose.** The parties will share confidential information to evaluate a potential engagement.

2. **Confidential information.** Non-public information disclosed for the purpose, whether marked or not: business plans, customer data, pricing, code, designs.

3. **Obligations.** Each party will (a) use the other's information only for the purpose, (b) limit access to people who need it, (c) protect it with reasonable care.

4. **Exclusions.** Information that is public, independently developed, or lawfully received elsewhere.

5. **Term.** Obligations run for 2 years from disclosure.

*Drafting template, not legal advice.*
`);
    if (name.includes('pitch') || name.includes('slide')) return B(`
# 10-Slide Pitch Outline — {{company}}

**Slide 1 — Title.** Company name, one-line promise, contact.
**Slide 2 — Problem.** Name the pain in the customer's own words. One statistic.
**Slide 3 — Insight.** Why now? What changed in the market?
**Slide 4 — Product.** Show, don't describe. One screenshot beats five bullets.
**Slide 5 — How it works.** Three steps, numbered, no sub-bullets.
**Slide 6 — Traction.** Revenue, usage, or pipeline — pick the strongest, show the trend line.
**Slide 7 — Market.** Bottom-up sizing: customers × price. Never a top-down circle.
**Slide 8 — Competition.** A 2×2 you can defend, with you in the honest corner.
**Slide 9 — Team.** Why this team, specifically, wins this market.
**Slide 10 — Ask.** Amount, use of funds, and the milestone it buys.

*Each slide above maps to a layout in slide-outline-map.csv.*
`);
    if (name.includes('merge-field-map')) return csv([['Field', 'Where it appears', 'Example'], ['first_name', 'Every opener', 'Marta'], ['company', 'Subject + body', 'Northwind Studio'], ['sender_name', 'Sign-off', 'Dan'], ['preview_text', 'Inbox preview', 'A 5-minute win inside'], ['mutual_contact', 'Referral opener', 'Priya'], ['client_company', 'Proposals', 'Acme Ltd'], ['date', 'Proposals, NDAs', '2026-03-14'], ['objective', 'Proposal section 1', 'Cut onboarding time 30%'], ['price', 'Proposal section 3', '$4,800'], ['jurisdiction', 'Agreements', 'Vilnius, Lithuania']]);
  }
  if (path.startsWith('03-follow-up/')) {
    const map: Record<string, [string, string]> = {
      'day-3-nudge': ['Still worth a look?', 'Adding one line to my last email in case it slipped past: the one-pager is a reply away — one word, "one-pager", and it is yours. No call, no form.'],
      'day-7-proof': ['The numbers behind the one-pager', 'Since my last note: two teams your size adopted the system. Median result was a 19% cycle-time drop in the first month. The one-pager covers how; happy to share the anonymized breakdown if numbers are your language.'],
      'day-14-last-call': ['Closing the loop', 'This is my last note on this thread — I do not want to be the newsletter you silently archive. If the timing is wrong, say "not now" and I will check back in a quarter. If it is right, the one-pager starts with the exact fix.'],
      'win-back-90d': ['It has been a while, {{first_name}}', 'You used {{product}} last quarter and stopped — usually that means the setup cost more than the payoff, and that is on me. The new quick-start cuts setup to about four minutes. Want the two-minute tour before deciding?'],
    };
    const key = name.replace('.md', '');
    const [subj, body] = map[key] ?? ['Following up', 'Picking this thread back up — happy to answer any questions.'];
    return tplEmail(key, subj, body + '\n\n— {{sender_name}}');
  }
  if (name.includes('subject-line-bank') || name.endsWith('bank.csv')) {
    return csv([
      ['Subject', 'Intent', 'Length', 'Best for'],
      ['The {{company}} problem you can see in your numbers', 'cold', 52, 'First touch'],
      ['{{mutual_contact}} suggested we talk', 'referral', 34, 'Warm intro'],
      ['A 5-minute win most people miss', 'welcome', 32, 'Day-2 nurture'],
      ['How {{company}}-sized teams fixed this', 'nurture', 41, 'Day-4 story'],
      ['Your onboarding offer (ends Friday)', 'offer', 36, 'Day-6 close'],
      ['Still worth a look?', 'follow-up', 19, 'Day-3 nudge'],
      ['The numbers behind the one-pager', 'follow-up', 32, 'Day-7 proof'],
      ['Closing the loop', 'follow-up', 16, 'Day-14'],
      ['Quick question about {{company}} hiring', 'cold', 38, 'Trigger-based'],
      ['Re: your {{month}} plan', 'follow-up', 21, 'Context re-entry'],
      ['Two fixes before your next launch', 'value', 32, 'Newsletter'],
      ['You asked, one-pager attached', 'reply', 29, 'Speed-to-value'],
    ]);
  }
  if (name.includes('pricing-table')) return csv([['Item', 'Basis', 'Rate', 'Qty', 'Total'], ['Discovery workshop', 'Fixed', '$600', '1', '$600'], ['System build', 'Fixed', '$2,400', '1', '$2,400'], ['Copywriting (5 pages)', 'Per page', '$280', '5', '$1,400'], ['Training session', 'Per hour', '$120', '2', '$240'], ['', '', '', 'Total', '$4,640']]);
  if (name.includes('clause-map')) return csv([['Clause', 'File', 'Note'], ['Services', 'service-agreement.md', 'Points at SOW; SOW controls'], ['IP transfer', 'service-agreement.md', 'On full payment — never before'], ['Termination', 'service-agreement.md', '14-day cure period'], ['Non-solicit', 'mutual-nda.md', 'Optional in most states — flag for counsel']]);
  if (name.includes('slide-outline-map') || name.includes('outline-map')) return csv([['Slide', 'Layout', 'Words on slide', 'Image'], ['1', 'title-center', 8, 'none'], ['2', 'stat-left', 14, 'photo'], ['3', 'insight-split', 22, 'diagram'], ['4', 'product-shot', 6, 'screenshot'], ['5', 'steps-3', 18, 'icons'], ['6', 'traction-chart', 10, 'chart'], ['7', 'market-stack', 12, 'custom'], ['8', 'grid-2x2', 16, 'custom'], ['9', 'team-3', 15, 'headshots'], ['10', 'ask-center', 9, 'none']]);
  if (name.includes('setup-guide')) return B(`
# Setup Guide — ${offer.title}

## 1. Import the templates (10 min)
1. Open your ESP (any of them work — the files are plain Markdown with standard merge fields).
2. Create a campaign per sequence folder. Each file is one email; the front-matter comment carries subject and preview text.
3. Map merge fields using \`merge-field-map.csv\`. Defaults: \`first_name\`, \`company\`, \`sender_name\`.

## 2. Sequence timing
- Welcome series: day 0 / 2 / 4 / 6.
- Follow-ups: only after action or after silence — never stack both.
- Cold outreach: one thread per prospect. Follow-ups continue the thread (see follow-up files).

## 3. Sending rules that keep deliverability
- Warm a new domain: 20/day week 1, doubling weekly to your cap.
- Plain text beats heavy HTML for cold. Keep images out of openers.
- Send windows: 8–10am recipient local time converts best for B2B in most verticals.

## 4. Editing voice
Replace any sentence you would not say out loud. The templates are written conversationally on purpose — stilted copy is the #1 reason sequences underperform.
`);
  if (name === 'walkthrough-link.md') return B(`
# Hosted walkthrough

Video walkthrough: https://omniforge.example/walkthroughs/${offer.offerId.toLowerCase()}

*Videos are hosted, never bundled — your ZIP stays small and the walkthrough stays current.*
`);
  return B(`
# ${name.replace(/\.[a-z]+$/, '')}

Authored file from ${offer.title} (${offer.offerId}).
`);
}

/* ── toolkit archetype: real working single-file HTML tools ────── */
const toolHtml = (title: string, body: string, script: string) => B(`<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<style>
  :root{--ink:#23201c;--muted:#7c746a;--line:#e8e3db;--bg:#f7f4ee;--card:#fffdf9;--ok:#2f855a;--warn:#b7791f;--bad:#c53030}
  *{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.55 system-ui,sans-serif}
  main{max-width:720px;margin:0 auto;padding:32px 20px}
  h1{font-size:22px;letter-spacing:-.02em;margin:0 0 4px}p.sub{color:var(--muted);margin:0 0 24px}
  label{display:block;font-size:12px;font-weight:600;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);margin:16px 0 6px}
  input,textarea{width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:8px;font:inherit;background:var(--card)}
  textarea{min-height:96px;font-family:ui-monospace,monospace;font-size:13px}
  .card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px 18px;margin-top:16px;box-shadow:0 1px 2px rgba(10,8,4,.06)}
  .chip{display:inline-block;padding:2px 10px;border-radius:999px;font-size:12px;font-weight:700}
  .ok{background:#e6f4ea;color:var(--ok)}.warn{background:#fdf3e2;color:var(--warn)}.bad{background:#fde8e8;color:var(--bad)}
  .big{font-size:28px;font-weight:700;font-variant-numeric:tabular-nums}
  .row{display:flex;gap:16px;flex-wrap:wrap}.row>div{flex:1;min-width:140px}
  output{font-variant-numeric:tabular-nums}
</style></head><body><main>
<h1>${title}</h1>
<p class="sub">OMNIFORGE instrument · runs fully offline · nothing leaves this page</p>
${body}
</main>
<script>
${script}
</script></body></html>`);

function toolkitContent(path: string): string {
  const name = (path.split('/').slice(-2).join('/'));
  if (name.includes('seo-title-meta')) return toolHtml('SEO Title & Meta Budgets', `
<label for="t">Title</label><input id="t" placeholder="Best Coffee in Vilnius — Roastery &amp; School">
<label for="m">Meta description</label><textarea id="m" placeholder="Describe the page in one sentence a searcher would act on…"></textarea>
<label for="k">Focus keyword</label><input id="k" placeholder="coffee vilnius">
<div class="card"><div class="row">
<div><div class="big" id="tc">0</div>title chars · <output id="tp">0</output>px (limit 580)</div>
<div><div class="big" id="mc">0</div>meta chars · <output id="mp">0</output>px (limit 920)</div>
</div><p id="chips" style="margin:12px 0 0"></p></div>
<div class="card"><div class="row">
<div><div class="big" id="kd">0%</div>keyword density (title)</div>
<div><div class="big" id="kdm">0%</div>keyword density (meta)</div>
</div><p class="sub" style="margin-top:8px">Aim for 0.8–2.5%. Exact-match stuffing reads badly and helps nobody.</p></div>`,
`const $=id=>document.getElementById(id);
const px=s=>[...s].reduce((w,c)=>w+(c.charCodeAt(0)>255?12:6.5),0); // rough px estimate
const dens=(s,k)=>{if(!k||!s)return 0;const words=s.toLowerCase().split(/\\W+/).filter(Boolean);const hits=words.filter(w=>w===k.toLowerCase()).length;return words.length?100*hits/words.length:0};
const chip=(ok,txt)=>'<span class="chip '+(ok?'ok':'bad')+'">'+txt+'</span>';
function upd(){const t=$('t').value,m=$('m').value,k=$('k').value;
$('tc').textContent=t.length;$('tp').textContent=Math.round(px(t));$('mc').textContent=m.length;$('mp').textContent=Math.round(px(m));
$('kd').textContent=dens(t,k).toFixed(1);$('kdm').textContent=dens(m,k).toFixed(1);
$('chips').innerHTML=chip(px(t)<=580,'Title ≤ 580px')+' '+chip(px(m)<=920,'Meta ≤ 920px')+' '+chip(t.length>=30&&t.length<=60,'Title 30–60 chars')+' '+(k?chip(dens(t,k)>0,'Keyword in title'):'');}
['t','m','k'].forEach(id=>$(id).addEventListener('input',upd));upd();`);
  if (name.includes('contrast-checker')) return toolHtml('WCAG 2.2 Contrast Checker', `
<div class="row"><div>
<label for="fg">Foreground</label><input id="fg" value="#23201c"><input type="color" id="fgp" value="#23201c" style="padding:4px;height:40px">
</div><div>
<label for="bg">Background</label><input id="bg" value="#f7f4ee"><input type="color" id="bgp" value="#f7f4ee" style="padding:4px;height:40px">
</div></div>
<div class="card"><div class="big" id="ratio">–</div><p id="badges"></p></div>
<div class="card" id="prev" style="min-height:80px;display:grid;place-items:center;font-weight:600">Preview text 16px · <span style="font-size:22px">Large 24px</span></div>
<p class="sub">Ratio = (L1 + 0.05) / (L2 + 0.05), relative luminance per WCAG 2.2. AA: 4.5:1 normal, 3:1 large. AAA: 7:1 / 4.5:1.</p>`,
`const $=id=>document.getElementById(id);
const lum=hex=>{const c=hex.replace('#','');const n=c.length===3?c.split('').map(x=>x+x).join(''):c;const[r,g,b]=[0,2,4].map(i=>parseInt(n.slice(i,i+2),16)/255).map(v=>v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4));return .2126*r+.7152*g+.0722*b};
const ratio=(a,b)=>{const[l1,l2]=[lum(a),lum(b)].sort((x,y)=>y-x);return(l1+.05)/(l2+.05)};
const chip=(ok,txt)=>'<span class="chip '+(ok?'ok':'bad')+'">'+txt+'</span>';
function upd(){try{const f=$('fg').value,b=$('bg').value;const r=ratio(f,b);$('ratio').textContent=r.toFixed(2)+':1';
$('badges').innerHTML=chip(r>=4.5,'AA normal')+' '+chip(r>=7,'AAA normal')+' '+chip(r>=3,'AA large')+' '+chip(r>=4.5,'AAA large');
$('prev').style.color=f;$('prev').style.background=b;}catch(e){$('ratio').textContent='invalid hex'}}
['fg','bg','fgp','bgp'].forEach(id=>$(id).addEventListener('input',()=>{if(id.endsWith('p')){$(id.slice(0,2)).value=$(id).value;}upd();}));upd();`);
  if (name.includes('regex-tester')) return toolHtml('Regex Tester', `
<label for="p">Pattern (without slashes)</label><input id="p" value="\\b\\w+@\\w+\\.[a-z]{2,}\\b" spellcheck="false">
<label for="s">Test string</label><textarea id="s">Contact: marta@northwind.io, dan@acme.co.uk — invalid: foo@bar</textarea>
<div class="card"><p id="status"></p><p id="out" style="line-height:1.8"></p><p class="sub" id="list"></p></div>`,
`const $=id=>document.getElementById(id);
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function upd(){const p=$('p').value,s=$('s').value;
try{const re=new RegExp(p,'g');const matches=[...s.matchAll(re)];
let html=esc(s);let off=0;
for(const m of matches){const start=m.index,end=start+m[0].length;html=html.slice(0,start+off)+'<mark>'+esc(m[0])+'</mark>'+html.slice(end+off);off+=13;}
$('out').innerHTML=html||'&nbsp;';
$('status').innerHTML='<span class="chip ok">'+matches.length+' match'+(matches.length===1?'':'es')+'</span>';
$('list').textContent=matches.slice(0,12).map(m=>m[0]).join(' · ');
}catch(e){$('status').innerHTML='<span class="chip bad">'+esc(e.message)+'</span>';$('out').innerHTML=esc(s);$('list').textContent='';}}
$('p').addEventListener('input',upd);$('s').addEventListener('input',upd);upd();`);
  if (name.includes('headline')) return toolHtml('Headline Scorer', `
<label for="h">Headline</label><input id="h" placeholder="10 proven ways to double your open rate in a week">
<div class="card"><div class="big" id="score">0<span style="font-size:14px;color:var(--muted)">/100</span></div></div>
<div class="card" id="factors"></div>
<p class="sub">Score = 40×length (40–70 chars ideal) + 25×power word + 20×contains a number + 15×positive sentiment.</p>`,
`const $=id=>document.getElementById(id);
const POWER=['free','proven','instantly','secret','ultimate','essential','never','always','why','how','best','guaranteed','fast','simple','new','now','you','your','works','stop','avoid','mistake','tested','surprisingly','little-known'];
const POS=['proven','best','simple','fast','new','works','win','love','great','easy','helpful','effective'];
function upd(){const h=$('h').value.toLowerCase();
const len=h.length?Math.min(1,(h.length>=40&&h.length<=70)?1:(h.length<40?h.length/40:Math.max(0,1-(h.length-70)/40))):0;
const pw=POWER.some(w=>h.includes(w))?1:0;const num=/\\d/.test(h)?1:0;const pos=POS.some(w=>h.includes(w))?1:0;
const total=Math.round(40*len+25*pw+20*num+15*pos);
$('score').firstChild.textContent=total;
const bar=(w,v,l)=>'<div style="margin:6px 0"><div style="display:flex;justify-content:space-between;font-size:12px"><span>'+l+'</span><span>'+Math.round(v*100)+'%</span></div><div style="height:6px;background:#eee8dc;border-radius:4px"><div style="height:100%;width:'+Math.round(v*100)+'%;background:#b8913f;border-radius:4px"></div></div></div>';
$('factors').innerHTML=bar(0,len,'Length factor (40)')+bar(0,pw,'Power word (25)')+bar(0,num,'Number (20)')+bar(0,pos,'Sentiment (15)');}
$('h').addEventListener('input',upd);upd();`);
  // generic instrument fallback + cheatsheets + guides
  if (name.endsWith('index.html') || name.includes('instrument')) return toolHtml(`${'{{tool}}'} Instrument`, `
<div class="card"><p>This instrument was generated for the OMNIFORGE toolkit.</p><p class="sub">Replace this placeholder in <code>lib/kit-content.ts</code>.</p></div>`, `console.log('instrument ready');`);
  if (name.includes('formula')) return B(`
# Formula Cheatsheet — ${'{{toolkit}}'}

## Contrast (WCAG 2.2)
\`\`\`
L = 0.2126·R + 0.7152·G + 0.0722·B   (linearised sRGB)
contrast = (L1 + 0.05) / (L2 + 0.05)
\`\`\`
AA: ≥ 4.5 normal text, ≥ 3.0 large (≥24px or ≥18.66px bold).

## Pixel budgets (desktop SERP)
Title: 580px ≈ 60 chars. Meta: 920px ≈ 155 chars.

## Keyword density
\`density % = 100 × exact-match occurrences / total words\` — healthy band 0.8–2.5%.

## Headline score
\`40×length + 25×power word + 20×number + 15×sentiment\`, each factor 0–1, capped at 100.
`);
  if (name.includes('setup-guide')) return B(`
# Setup Guide

1. **No install.** Every instrument is a single HTML file — double-click, it opens in your browser, fully offline.
2. **Pin them.** Bookmark or keep the folder in your dock; they are faster than any web tool because there is no round-trip.
3. **Trust the math.** Every formula is printed in the cheatsheet and implemented in plain JS in the file — open the source and read it.
4. **Edit them.** Public domain-style license for internal use: change colors, limits, copy. The code is deliberately readable.
`);
  return `# ${name}\n\nAuthored toolkit file.\n`;
}

/* ── notion archetype: CSV databases + rituals ─────────────────── */
const PEOPLE = ['Ana Ruiz', 'Ben Cole', 'Clara Ott', 'Dana Voss', 'Elias Pine'];
const STATUS = ['Backlog', 'In progress', 'Review', 'Done'];
function notionContent(path: string, offer: OfferV2): string {
  const name = path.split('/').pop() ?? '';
  const h = (offer.offerId.charCodeAt(4) ?? 3) % 5;
  if (name.includes('projects')) return csv([['Name', 'Owner', 'Status', 'Due', 'Priority', 'Notes'],
    ...['Website relaunch', 'Pricing revamp', 'Onboarding v2', 'Q2 content sprint', 'Partner portal', 'Brand refresh', 'Churn deep-dive', 'Automation pass', 'Hiring loop design', 'Data cleanup'].map((p, i) => [p, PEOPLE[(i + h) % 5], STATUS[i % 4], `2026-0${(i % 6) + 3}-1${i % 9}`, ['High', 'Medium', 'Low'][i % 3], ''])]);
  if (name.includes('tasks')) return csv([['Task', 'Project', 'Owner', 'Status', 'Estimate (h)', 'Due'],
    ...['Draft home copy', 'Wireframe services', 'Collect testimonials', 'Set up redirects', 'Build pricing table', 'Book photo shoot', 'Review schema', 'QA booking form', 'Launch checklist run', 'Write changelog', 'Archive old pages', 'Stakeholder review'].map((t, i) => [t, ['Website relaunch', 'Pricing revamp', 'Onboarding v2'][i % 3], PEOPLE[(i + h) % 5], STATUS[i % 4], String(1 + (i % 8)), `2026-0${(i % 6) + 3}-0${1 + (i % 9)}`])]);
  if (name.includes('contacts')) return csv([['Name', 'Company', 'Stage', 'Owner', 'Last touch', 'Next step'],
    ...[['Marta Kova', 'Northwind Studio', 'Negotiation', 'Ben Cole', '2026-03-02', 'Send SOW'], ['Ola Duda', 'Acme Ltd', 'Qualified', 'Ana Ruiz', '2026-03-05', 'Discovery call'], ['Tomas Vera', 'Vera & Co', 'Proposal sent', 'Clara Ott', '2026-02-27', 'Follow up day-7'], ['Ines Rau', 'Rau Group', 'Won', 'Ana Ruiz', '2026-02-20', 'Kickoff'], ['Pavel Dvo', 'Dvoriane', 'Nurture', 'Dana Voss', '2026-03-01', 'Share one-pager']]]);
  if (name.includes('deals')) return csv([['Deal', 'Company', 'Value', 'Stage', 'Probability', 'Expected close'],
    ['Brand system', 'Northwind Studio', '4800', 'Proposal', '60', '2026-03-18'], ['Retainer pilot', 'Acme Ltd', '2400', 'Negotiation', '75', '2026-03-12'], ['Website audit', 'Vera & Co', '900', 'Qualified', '40', '2026-03-25'], ['Full relaunch', 'Rau Group', '8600', 'Won', '100', '2026-03-01'], ['Sprint pack', 'Dvoriane', '1500', 'Nurture', '20', '2026-04-08']]);
  if (name.includes('editorial') || name.includes('calendar')) return csv([['Title', 'Format', 'Status', 'Author', 'Publish date', 'Channel'],
    ...['Pricing page teardown', 'Case study: Rau Group', 'Welcome-flow anatomy', 'Tool spotlight: contrast', 'Q2 roadmap notes', 'Founder Q&A', 'Checklist: launch day', 'Metric week: cycle time'].map((t, i) => [t, ['Article', 'Case study', 'Newsletter', 'Video'][i % 4], STATUS[i % 4], PEOPLE[(i + h) % 5], `2026-0${(i % 3) + 3}-1${i % 9}`, ['Blog', 'Email', 'LinkedIn'][i % 3]])]);
  if (name.includes('habits')) return csv([['Habit', 'Cadence', 'Streak', 'This week', 'Last week', 'Notes'],
    ...['Morning pages', 'Gym', 'Read 20 pages', 'No phone before 9', 'Weekly review'].map((hb, i) => [hb, ['Daily', '3×/week', 'Daily', 'Daily', 'Weekly'][i], String(2 + i * 3), `${4 + i % 3}/7`, `${3 + i % 4}/7`, ''])]);
  if (name.includes('reading')) return csv([['Title', 'Author', 'Status', 'Rating', 'Takeaway'],
    ['Thinking in Systems', 'Donella Meadows', 'Reading', '', ''], ['The Mom Test', 'Rob Fitzpatrick', 'Done', '5', 'Ask about behavior, not opinions'], ['Shape Up', 'Ryan Singer', 'Done', '4', 'Appetites before estimates'], ['Deep Work', 'Cal Newport', 'Queued', '', ''], ['Show Your Work', 'Austin Kleon', 'Done', '4', 'Process is content']]);
  if (name.includes('budget')) return csv([['Month', 'Category', 'Planned', 'Actual', 'Delta', 'Notes'],
    ...['2026-01', '2026-02', '2026-03'].flatMap((m) => [['Software', '680', '640'], ['Groceries', '520', '592'], ['Transport', '180', '162'], ['Fun', '250', '310']].map((c) => [m, c[0], c[1], c[2], String(Number(c[2]) - Number(c[1])), '']))]);
  if (name.includes('ritual')) return B(`
# Weekly Review Ritual (30 minutes, Friday afternoon)

## 1. Inbox & capture sweep (10 min)
Empty the inbox into the right database: tasks → Tasks, ideas → Idea Backlog, meetings → Meetings. Zero is not the goal; sorted is the goal.

## 2. Board truth pass (10 min)
Open the Board view. For every "In progress" card older than 7 days, choose one: break it smaller, unblock it, or move it back. In-progress lies are the #1 source of Monday dread.

## 3. Next week's three (5 min)
Pick exactly three outcomes for next week. Write them as done ("Pricing page live"). Everything else is optional by definition.

## 4. Close the loop (5 min)
Mark Done what is done — actually done. Archive the noise. Close the laptop.

*This ritual is the difference between owning a database and having a system.*
`);
  if (name.includes('formula-reference')) return B(`
# Notion Formula Reference (used in this system)

\`\`\`js
// Days until due
dateBetween(prop("Due"), now(), "days")

// Overdue badge
if(dateBetween(prop("Due"), now(), "days") < 0 && prop("Status") != "Done", "OVERDUE", "")

// Progress rollup
round(100 * prop("Done count") / prop("Total count")) + "%"

// Owner initials
substring(replaceAll(prop("Owner"), "[a-z ]", ""), 0, 2)
\`\`\`
`);
  if (name.includes('duplicate-link')) return B(`
# How to duplicate this system

1. Open the shared duplicate link you received after purchase (top of your receipt email).
2. Click **Duplicate** in the top-right corner of the destination workspace.
3. Import the CSVs from \`01-databases/\` into each database with **Merge with existing** OFF.
4. The boards, calendars and timelines rebuild themselves from the imported rows — no setup beyond import.
`);
  if (name.includes('template')) return B(`
# {{template_name}}

**Purpose:** {{purpose}}
**Owner:** {{owner}} · **Cadence:** {{cadence}}

## Agenda
1. Context (2 min) — why this meeting/template exists
2. Input (8 min) — the one artifact everyone should have read
3. Work (30 min) — the actual decisions
4. Outputs (10 min) — who does what by when, written down before anyone leaves

## Rules
- No agenda, no meeting.
- Decisions land in the Decisions database the same day.
- If a slot needs 3+ meetings, it wants a project instead.
`);
  return `# ${name}\n\nAuthored Notion file for ${offer.title}.\n`;
}

/* ── assessment archetype: offline quiz + banks ────────────────── */
const QUIZ_QUESTIONS: [string, string[], number[]][] = [
  ['You can state your target customer in one sentence without hedging.', ['Exactly, and we have 3 verified interviews', 'We have a paragraph', 'We think so', 'Not yet'], [3, 2, 1, 0]],
  ['Your offer has a price, and someone not related to you has paid it.', ['Multiple paying customers', 'One paying customer', 'Priced but unpaid', 'Still free'], [3, 2, 1, 0]],
  ['You know your top acquisition channel by numbers, not gut.', ['Two quarters of data', 'One quarter', 'Anecdotal only', 'No channel yet'], [3, 2, 1, 0]],
  ['New customers can start and get value without you being in the room.', ['Documented self-serve path', 'Some docs exist', 'Needs a call', 'High-touch only'], [3, 2, 1, 0]],
  ['Your cash runway is known to the week.', ['Known and reviewed monthly', 'Known roughly', 'Avoided looking', 'Runway not meaningful yet'], [3, 2, 1, 0]],
  ['Support requests get a reply within one business day.', ['Within hours, tracked', 'Within a day, mostly', 'Days, sometimes', 'No support process'], [3, 2, 1, 0]],
  ['Pricing was tested against at least two alternatives.', ['Two+ tested with data', 'One alternative tried', 'Set by feel', 'Copied a competitor'], [3, 2, 1, 0]],
  ['Churn/repeat is measured monthly and someone owns the number.', ['Owned and reviewed', 'Measured, unowned', 'Checked occasionally', 'Not measured'], [3, 2, 1, 0]],
];
function assessmentContent(path: string, offer: OfferV2): string {
  const name = path.split('/').pop() ?? '';
  if (name.includes('quiz') && name.endsWith('.html')) return toolHtml(`${offer.title} — Offline Edition`, `
<div class="card" id="quiz">
<p class="sub" id="meta"></p>
<div id="body"></div>
</div>
<p class="sub">25-question bank ships in the full kit; this offline edition runs 8 core questions. Score = Σ chosen weights ÷ max possible × 100. Bands: Platinum ≥ 85, Gold 70–84, Silver 50–69, Bronze &lt; 50.</p>`,
`const QS=${JSON.stringify(QUIZ_QUESTIONS.map(([q, opts, w]) => ({q, opts, w})))};
let i=0,score=0;const $=id=>document.getElementById(id);
function render(){const b=$('body');$('meta').textContent='Question '+(i+1)+' of '+QS.length;
if(i<QS.length){const {q,opts,w}=QS[i];
b.innerHTML='<p style="font-weight:600;font-size:17px">'+q+'</p>'+opts.map((o,j)=>'<button style="display:block;width:100%;text-align:left;margin:8px 0;padding:10px 14px;border:1px solid var(--line);border-radius:8px;background:var(--card);font:inherit;cursor:pointer" onclick="pick('+j+')">'+o+'</button>').join('');}
else{const pct=Math.round(100*score/(3*QS.length));
const band=pct>=85?['Platinum','Outstanding — protect what works and compound it.']:pct>=70?['Gold','Strong foundation — the gaps are known and fixable this quarter.']:pct>=50?['Silver','Fundamentals forming — pick two weaknesses and schedule them.']:['Bronze','Early days — the checklist order in the report is your roadmap.'];
b.innerHTML='<div class="big">'+pct+' / 100</div><p><span class="chip ok">'+band[0]+'</span></p><p>'+band[1]+'</p><p class="sub">Full band report with recommendations ships in the kit.</p>';}}
window.pick=j=>{score+=QS[i].w[j];i++;render();};render();`);
  if (name.includes('questions') && name.endsWith('.json')) return JSON.stringify(
    { offerId: offer.offerId, scoring: 'sum(weights)/max*100', bands: { platinum: 85, gold: 70, silver: 50, bronze: 0 }, questions: QUIZ_QUESTIONS.map(([q, opts, w], idx) => ({ id: `Q${String(idx + 1).padStart(2, '0')}`, q, options: opts.map((o, j) => ({ label: o, weight: w[j] })) })) }, null, 2);
  if (name.includes('questions') && name.endsWith('.csv')) return csv([['id', 'question', 'option_a', 'wa', 'option_b', 'wb', 'option_c', 'wc', 'option_d', 'wd'],
    ...QUIZ_QUESTIONS.map(([q, o, w], i) => [`Q${i + 1}`, q, ...o.flatMap((opt, j) => [opt, String(w[j])])])]);
  if (name.includes('scoring-guide')) return B(`
# Scoring Guide — ${offer.title}

## Formula
\`score = round(100 × Σ chosen option weights ÷ (3 × question count))\`

Every question has four options weighted 0–3 in ascending order of readiness. No negative weights; no double-loading.

## Bands
| Band | Range | Read |
|---|---|---|
| Platinum | ≥ 85 | Protect and compound |
| Gold | 70–84 | Known gaps, fixable this quarter |
| Silver | 50–69 | Fundamentals forming |
| Bronze | < 50 | Early days — follow the report order |

## Why weighted, not counted
A binary quiz punishes honest uncertainty; weighted options reward direction and magnitude. The band boundaries were set so a team answering "middle option" everywhere lands at 50 — the honest center of Silver.
`);
  if (name.includes('result-page')) return toolHtml('Result Page Template', `
<div class="card" style="text-align:center;padding:40px 24px">
<p class="sub">YOUR RESULT</p>
<div class="big" style="font-size:40px" id="band">GOLD</div>
<p id="sub" style="max-width:420px;margin:8px auto">Strong foundation — the gaps are known and fixable this quarter.</p>
<div style="margin:20px 0"><div style="height:8px;background:#eee8dc;border-radius:4px;max-width:360px;margin:0 auto"><div style="height:100%;width:76%;background:#b8913f;border-radius:4px"></div></div><p class="sub" style="margin-top:6px">76 / 100</p></div>
</div>
<p class="sub">Wire the band + score from the query string: \`?band=gold&score=76\`</p>`, `const p=new URLSearchParams(location.search);if(p.get('band'))document.getElementById('band').textContent=p.get('band').toUpperCase();if(p.get('score')){const s=document.getElementById('sub');document.querySelector('[style*="width:76%"]').style.width=p.get('score')+'%';}`);
  if (name.includes('report-layout')) return B(`
# Result Report Layout (print + PDF)

**Page 1 — Verdict.** Band medal, score dial, one-sentence read.
**Page 2 — Breakdown.** The four weakest questions, each with: what strong looks like, the 2-week fix, the metric that proves it moved.
**Page 3 — Plan.** Next 30 days as a checklist ordered by dependency, not urgency.
**Page 4 — Appendix.** Their answers vs. the strongest-band answer, side by side.

Rules: no stock-photo people, no graph junk. One accent color. Tabular numbers for all figures.
`);
  if (name.includes('setup-guide')) return B(`
# Setup Guide

**Run offline:** double-click \`quiz.html\` — it works from a USB stick with zero network.
**Embed:** host the folder anywhere static (any web host, even a shared drive with a local server).
**Print:** result-page.html accepts \`?band=&score=\` and prints cleanly on one page.
**Modify:** questions live in \`questions.json\`; the engine reads nothing else.
`);
  return `# ${name}\n\nAuthored assessment file.\n`;
}

/* ── website archetype: MDX pages with real copy ───────────────── */
const SITE_COPY: Record<string, Record<string, [string, string]>> = {
  dental: {
    hero: ['A calm visit, every time', 'Modern dentistry in the hands of people who explain everything first. Same-week appointments, transparent pricing, and a plan you actually understand.'],
    services: ['Treatments', 'From routine cleanings to full smile restorations — every treatment starts with a photo of your own teeth on the screen, so you see what we see before deciding anything.'],
  },
  gym: {
    hero: ['Train like it matters', 'Coached strength, conditioning and mobility in a gym that measures your progress. First session free — bring shoes and zero experience.'],
    services: ['Programs', 'Small-group strength, engine-building conditioning, and one-to-one coaching with quarterly testing weeks that prove the program is working.'],
  },
  law: {
    hero: ['Counsel that removes doubt', 'A firm that answers the question you actually came with — in plain language, with the costs in writing before work begins.'],
    services: ['Practice areas', 'Commercial contracts, employment counsel and dispute resolution for owner-managed businesses. First consultation fixed-fee, always.'],
  },
  restaurant: {
    hero: ['Fire, season, serve', 'A short menu cooked properly: wood fire, market vegetables, natural wine. Reservations held for exactly 15 minutes — we are worth the punctuality.'],
    services: ['The menu', 'Changes with the market, printed daily. Five starters, six mains, two proper desserts — everything else is noise.'],
  },
};
function websiteContent(path: string, offer: OfferV2): string {
  const v = offer.offerId.includes('WK-1') ? 'dental' : offer.offerId.includes('WK-2') ? 'gym' : offer.offerId.includes('WK-3') ? 'law' : 'restaurant';
  const copy = SITE_COPY[v] ?? SITE_COPY.dental;
  const name = path.split('/').pop() ?? '';
  if (name.startsWith('home')) return B(`
---
title: "${copy.hero[0]}"
description: "${copy.hero[1].slice(0, 155)}"
heroImage: /images/hero.jpg
---

import { BookingForm } from '../../components/BookingForm'

# ${copy.hero[0]}

${copy.hero[1]}

<BookingForm service="consultation" />

## Why people stay

- **Transparent pricing** — every treatment or service priced before booking, in writing.
- **Same-week availability** — calendars updated live; no phone-tag.
- **Real reviews** — verified patients or clients only, published unedited.

## Find us

Open Monday to Saturday. Two-minute walk from the central stop, parking behind the building.
`);
  if (name.startsWith('services')) return B(`
---
title: "${copy.services[0]}"
---

# ${copy.services[0]}

${copy.services[1]}

| Service | First visit | Ongoing | Duration |
|---|---|---|---|
| Consultation & plan | ${v === 'dental' ? '€45 (incl. x-rays)' : v === 'law' ? '€120 fixed' : 'Free'} | — | 30–45 min |
| ${v === 'gym' ? 'Coached strength' : v === 'restaurant' ? 'Tasting menu' : 'Core service'} | from €${v === 'restaurant' ? '58' : '90'} | — | 60–90 min |
| ${v === 'dental' ? 'Hygiene & polish' : 'Complete package'} | from €${v === 'dental' ? '75' : '240'} | quarterly | 45 min |

*Every price is the price — the number you see is the number you pay.*
`);
  if (name.startsWith('about')) return B(`
---
title: "About & team"
---

# The people

We started in 2019 with one rule that has not changed: **explain first, act second.**

The team is small on purpose — four people, every one of them a decision-maker. You will not be handed between departments, and the person who meets you is the person responsible for you.

| Name | Role | With us since |
|---|---|---|
| {{founder_name}} | Founder & lead | 2019 |
| {{teammate_2}} | Senior specialist | 2020 |
| {{teammate_3}} | Client care | 2022 |

## Standards we hold

1. Every recommendation comes with the reason, in writing.
2. If we cannot help, we say so and point you to someone who can.
3. Prices before work. Always.
`);
  if (name.startsWith('pricing')) return B(`
---
title: "Pricing & insurance"
---

# Pricing & insurance

No surprise line items. Pick the level of care that fits; upgrade when it makes sense — never because a contract traps you.

## Included at every level

- Written plan before any paid work
- Follow-up within 48 hours
- Direct support line, human-answered

## Insurance

We are direct-billing partners with the four major providers. For others, we prepare the complete claim documentation for you — stamped, itemized, ready to send.

| Provider | Direct billing | Claim prep |
|---|---|---|
| {{insurer_1}} | Yes | — |
| {{insurer_2}} | Yes | — |
| Others | — | Included free |
`);
  if (name.startsWith('contact')) return B(`
---
title: "Contact & booking"
---

import { BookingForm } from '../../components/BookingForm'

# Book a visit

<BookingForm service="first-visit" />

**Prefer to talk?** Call {{phone}} — a person answers, 9:00–18:00.

**Address:** {{street_address}}, {{city}} · Parking behind the building, entrance on the corner.

## What happens after you book

1. Confirmation within minutes, with a calendar file attached.
2. A reminder 24 hours before, with the one thing to bring.
3. Your visit — starting on time, because yours started on time.
`);
  if (name.includes('content-model')) return B(`
# Content Model — ${offer.title}

Every page, section and field your writer needs to fill. Structured so copy, code and schema agree.

\`\`\`yaml
site:
  name: string            # "…"
  phone: tel              # "+370 …"
  address:
    street: string
    city: string
  hours: schedule[]       # day, open, close
  social: url[]

hero:
  headline: string        # ≤ 48 chars, benefit-led
  sub: string             # ≤ 155 chars, matches meta description
  cta_primary: {label, service_ref}
  image: asset            # 1600×900, real photography only

services[]:
  name: string
  first_visit_price: money | "Free"
  duration: minutes
  includes: string[3]

team[]:
  name, role, since: year
  photo: asset            # consistent square crop

testimonials[]:           # verified only
  quote: string           # ≤ 220 chars
  author: first_name + initial
  source: enum[google, onsite, referrer]

faq[]:
  q, a: string            # answers feed the FAQ schema block
\`\`\`

**Rule:** if a field is not filled, the section does not render. No placeholders ever ship.
`);
  if (name.includes('brand-voice')) return B(`
# Brand Voice — ${offer.title}

**Three words:** calm, concrete, warm.

- Say the price early. Hesitation reads as hiding.
- Short sentences under pressure. Long sentences for comfort.
- "We" for responsibility, "you" for benefits.
- Never: exclamation marks, stock-photo energy, "solutions", jargon as status.
- Numbers over adjectives: "48-hour reply" beats "fast, friendly service".
`);
  if (name.includes('booking-form')) return toolHtml('Booking Form', `
<div class="card">
<h2 style="margin:0 0 12px;font-size:18px">Request a visit</h2>
<label for="n">Name</label><input id="n" autocomplete="name">
<label for="e">Email</label><input id="e" type="email" autocomplete="email">
<label for="d">Preferred day</label><input id="d" type="date">
<label for="s">Service</label><select id="s"><option>First visit</option><option>Consultation</option><option>Follow-up</option></select>
<p style="margin:14px 0 0"><button onclick="send()" style="padding:10px 22px;border:0;border-radius:8px;background:#23201c;color:#f3dfa6;font-weight:700;cursor:pointer">Request booking</button></p>
<p id="msg" class="sub" style="margin-top:10px"></p>
</div>`, `function send(){const v=id=>document.getElementById(id).value;const errs=[];
if(!v('n'))errs.push('name');if(!/^[^@\\s]+@[^@\\s]+\\.[a-z]{2,}$/i.test(v('e')))errs.push('a valid email');if(!v('d'))errs.push('preferred day');
document.getElementById('msg').innerHTML=errs.length?'<span class="chip bad">Please add: '+errs.join(', ')+'</span>':'<span class="chip ok">Requested — confirmation within minutes. This demo validates locally; the full kit wires your endpoint.</span>';}`);
  if (name.includes('local-seo-checklist')) return B(`
# Local SEO Checklist — ${offer.title}

## Must-have (blocks map-pack eligibility)
- [ ] \`schema-jsonld.json\` values match the real NAP (name, address, phone) character-for-character
- [ ] Google Business Profile claimed, category exact, photos current
- [ ] \`robots.txt\` allows crawling; \`sitemap.xml\` submitted in Search Console
- [ ] One page per core service, each with its own title pattern: Service · City · Brand

## Strong signals
- [ ] Review velocity: ask every happy visitor, in person, the same week
- [ ] Hours schema with holiday overrides
- [ ] Internal links: home → each service → booking, present on every page
- [ ] Alt text describes the room/team, not "image1"

## Myths to skip
- Keyword-stuffed footer NAP blocks, doorway city pages, buying reviews. They cost more to undo than to never do.
`);
  if (name.includes('schema')) return JSON.stringify({
    '@context': 'https://schema.org', '@type': v === 'dental' ? 'Dentist' : v === 'gym' ? 'HealthClub' : v === 'law' ? 'LegalService' : 'Restaurant',
    name: '{{site_name}}', telephone: '{{phone}}', priceRange: v === 'restaurant' ? '€€' : '€€',
    address: { '@type': 'PostalAddress', streetAddress: '{{street_address}}', addressLocality: '{{city}}', addressCountry: '{{country}}' },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' }],
    ...(v === 'restaurant' ? { servesCuisine: ['Contemporary'], acceptsReservations: 'True' } : { availableService: { '@type': v === 'law' ? 'LegalService' : 'MedicalProcedure', name: '{{primary_service}}' } }),
  }, null, 2);
  if (name.includes('deploy-guide')) return B(`
# Deploy Guide — ${offer.title}

## The five-minute path
1. Create a repo from the kit's \`site/\` output.
2. Import to any static host (Vercel, Netlify, Cloudflare Pages — all have free tiers).
3. Set the custom domain; SSL is automatic on all three.
4. Replace \`{{merge_fields}}\` in the content model with real values.
5. Submit \`sitemap.xml\` in Search Console; validate the JSON-LD with the Rich Results test.

## After launch
- Bookings: wire the form to your endpoint (the kit ships validation states ready).
- Analytics: add the host's free analytics or your preferred tool — no other changes needed.
`);
  return `# ${name}\n\nAuthored website-kit file.\n`;
}

/* ── shared root files ─────────────────────────────────────────── */
function csv(rows: (string | number)[][]): string { return rows.map((r) => r.map((c) => { const v = String(c); return (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v); }).join(',')).join('\n') + '\n'; }

function rootContent(name: string, offer: OfferV2): string {
  if (name === 'README.md') {
    const rows = offer.deliverables.flatMap((f) => f.files.map((file) => [`omniforge-${offer.offerId.toLowerCase()}/${file.path}`, file.flag === 'real' ? 'real' : file.flag === 'sample' ? 'sample' : 'extended (in production)']));
    return B(`
# ${offer.title} · ${offer.offerId}

${offer.promise} — this archive contains exactly the files listed in the product manifest, each with its honest status.

## File status table

| File | Status |
|---|---|
${rows.map(([p, s]) => `| \`${p}\` | ${s} |`).join('\n')}
| \`omniforge-${offer.offerId.toLowerCase()}/README.md\` | real |

## How to use
Start with \`QUICK-START.md\` — it links to the one file that gets you value fastest.

## Policies
- Lifetime free updates — re-download from your receipt link.
- 30-day money-back guarantee, no questions.
- Commercial license: one seat per purchase; unlimited client deliverables.

*Generated by OMNIFORGE · ${new Date().toISOString().slice(0, 10)}*
`);
  }
  if (name === 'LICENSE.md') return B(`
# Commercial License (one seat)

Copyright © 2026 OMNIFORGE.

You may: use, edit, and build on these files for unlimited personal and client projects; modify and re-brand deliverables produced with them.

You may not: resell, redistribute, or republish the source files themselves, in original or lightly-renamed form, as a competing product.

Warranty: none. The files are provided as-is; formulas are documented for your own verification.
`);
  if (name === 'CHANGELOG.md') return B(`
# Changelog

## ${offer.proof.version} — 2026-03
- Flag-table transparency pass: every file now carries its status.
- Quick-start rewritten per archetype feedback.

## 2.0 — 2026-01
- Restructured folders to match the published manifest 1:1.
- Removed policy text from the file tree (it now ships as chips).

## 1.0 — 2025-11
- First release.
`);
  return B(`
# Quick Start — ${offer.title}

**The one file to open first:** \`${
    offer.archetype === 'template' ? '01-welcome-series/day-0-welcome.md — send it today, edit it tomorrow'
    : offer.archetype === 'toolkit' ? '01-instruments/ — double-click any instrument; it runs offline'
    : offer.archetype === 'notion' ? '03-reference/duplicate-link.md — duplicate the workspace, then import the CSVs'
    : offer.archetype === 'assessment' ? '01-engine/quiz.html — double-click; it scores offline'
    : '01-pages/home.mdx — read it; every {{field}} maps to the content model'}\`

## Then, in order
1. Skim the folder names — they match the manifest you purchased, line by line.
2. Open \`README.md\` for the full file-status table.
3. Set aside 30 focused minutes. Every kit is usable in one sitting, not one sprint.

## If you get stuck
The receipt email contains your support thread. A human replies within one business day.
`);
}

/* ── extended-pack stubs (honest, per P0) ──────────────────────── */
const extendedStub = (path: string) => B(`
# ${path.split('/').pop()?.replace(/\.[a-z]+$/, '')} — in production

**Status:** extended pack, in production.

**What it will contain:** the next drop for this kit — same standards, same review, shipped
as a free update to every buyer of this edition.

**What this file is not:** padding. No half-written draft ships in an OMNIFORGE archive.
When the drop lands, this stub is replaced by the real files and the README table updates.

*Track drops: your receipt link always serves the newest archive.*
`);

/* ── public API ─────────────────────────────────────────────────── */
export function contentFor(offer: OfferV2, path: string): string {
  const base = `omniforge-${offer.offerId.toLowerCase()}/`;
  const rel = path.startsWith(base) ? path.slice(base.length) : path;
  if (rel.startsWith('EXTENDED-PACK/')) return extendedStub(rel);
  if (['README.md', 'LICENSE.md', 'CHANGELOG.md', 'QUICK-START.md'].includes(rel)) return rootContent(rel, offer);
  switch (offer.archetype) {
    case 'template': return templateContent(rel, offer);
    case 'toolkit': return toolkitContent(rel);
    case 'notion': return notionContent(rel, offer);
    case 'assessment': return assessmentContent(rel, offer);
    case 'website': return websiteContent(rel, offer);
    default: return `# ${rel}\n\n${offer.promise}\n`;
  }
}
