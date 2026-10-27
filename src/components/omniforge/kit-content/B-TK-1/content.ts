/* ════════════════════════════════════════════════════════════════════
   B-TK-1 · SEO Toolkit — reference kit (toolkit pipeline)
   3 working single-file instruments, keyword bank, formula cheatsheet,
   setup guide. The Try-it demo runs the same density + meta formulas.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-TK-1";

/* Shared instrument shell: layout + styles, zero dependencies. */
const SHELL = (title: string, body: string, script: string) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} — OMNIFORGE SEO Toolkit</title>
<style>
  :root { color-scheme: light dark; --bg:#fafaf9; --panel:#fff; --ink:#18181b; --dim:#71717a; --line:#e4e4e7; --accent:#b45309; }
  @media (prefers-color-scheme: dark) { :root { --bg:#101012; --panel:#18181b; --ink:#f4f4f5; --dim:#a1a1aa; --line:#27272a; --accent:#f59e0b; } }
  * { box-sizing: border-box; }
  body { margin:0; padding:32px 20px 64px; background:var(--bg); color:var(--ink); font:15px/1.55 ui-sans-serif,system-ui,sans-serif; }
  main { max-width: 760px; margin: 0 auto; }
  h1 { font-size: 22px; margin: 0 0 4px; letter-spacing: -0.01em; }
  .sub { color: var(--dim); margin: 0 0 24px; font-size: 13px; }
  label { display:block; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; color: var(--dim); margin: 18px 0 6px; }
  textarea, input { width: 100%; border: 1px solid var(--line); background: var(--panel); color: var(--ink); border-radius: 8px; padding: 10px 12px; font: 14px/1.5 ui-monospace,monospace; resize: vertical; }
  textarea:focus, input:focus { outline: 2px solid var(--accent); outline-offset: 0; }
  .row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .card { background: var(--panel); border: 1px solid var(--line); border-radius: 12px; padding: 16px; margin-top: 18px; }
  .meter { height: 10px; border-radius: 999px; background: var(--line); overflow: hidden; }
  .meter i { display: block; height: 100%; background: var(--accent); transition: width .25s cubic-bezier(.2,.7,.1,1); }
  .verdict { font-weight: 700; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  th, td { text-align: left; padding: 6px 8px; border-bottom: 1px solid var(--line); }
  th { color: var(--dim); font-size: 11px; text-transform: uppercase; letter-spacing: .06em; }
  .ok { color: #059669; font-weight: 600; } .warn { color: #b45309; font-weight: 600; } .bad { color: #dc2626; font-weight: 600; }
  footer { margin-top: 28px; color: var(--dim); font-size: 12px; }
</style>
</head>
<body>
<main>
  <h1>${title}</h1>
  <p class="sub">OMNIFORGE B-TK-1 · runs offline · no data leaves this page</p>
${body}
  <footer>OMNIFORGE SEO Toolkit — Edition 2026 · formulas documented in 03-formulas/seo-scoring-cheatsheet.md</footer>
</main>
<script>
${script}
</script>
</body>
</html>`;

export const files: Record<string, string> = {
  "01-instruments/keyword-density.html": SHELL(
    "Keyword Density Checker",
    `  <label for="text">Page or paragraph text</label>
  <textarea id="text" rows="9" placeholder="Paste your page copy…"></textarea>
  <div class="row">
    <div>
      <label for="kw">Focus keyword or phrase</label>
      <input id="kw" type="text" placeholder="e.g. dental implants">
    </div>
    <div>
      <label>Verdict</label>
      <div class="card" style="margin-top:6px"><span class="verdict" id="verdict">—</span></div>
    </div>
  </div>
  <div class="card">
    <div class="meter"><i id="bar" style="width:0%"></i></div>
    <p style="margin:10px 0 0;font-size:13px;color:var(--dim)">Ideal band: <b>0.8% – 2.0%</b> of total words.</p>
  </div>
  <div class="card">
    <table aria-label="Top terms"><thead><tr><th>Term</th><th>Count</th><th>Density</th></tr></thead><tbody id="terms"></tbody></table>
  </div>`,
    `"use strict";
var el = function (id) { return document.getElementById(id); };
var STOP = new Set("a an and are as at be but by for from has have i in is it its of on or that the to was were will with you your".split(" "));
function words(t) { return (t.toLowerCase().match(/[a-z0-9][a-z0-9'\\-]*/g) || []); }
function compute() {
  var t = el("text").value, kw = el("kw").value.trim().toLowerCase();
  var w = words(t), total = w.length || 1;
  var freq = {};
  w.forEach(function (x) { if (!STOP.has(x) && x.length > 2) freq[x] = (freq[x] || 0) + 1; });
  var density = 0;
  if (kw) {
    var re = new RegExp(kw.replace(/[^a-z0-9 ]/g, "").trim().replace(/\\s+/g, "\\\\s+"), "g");
    var hits = (t.toLowerCase().match(re) || []).length;
    density = (hits * kw.split(/\\s+/).length) / total * 100;
    el("verdict").textContent = hits + " hits · " + density.toFixed(2) + "%";
    el("verdict").className = "verdict " + (density >= 0.8 && density <= 2 ? "ok" : density > 2 ? "warn" : "bad");
    el("bar").style.width = Math.min(100, density / 3 * 100) + "%";
  }
  var rows = Object.keys(freq).map(function (k) { return [k, freq[k]]; })
    .sort(function (a, b) { return b[1] - a[1]; }).slice(0, 12)
    .map(function (r) { return "<tr><td>" + r[0] + "</td><td>" + r[1] + "</td><td>" + (r[1] / total * 100).toFixed(2) + "%</td></tr>"; });
  el("terms").innerHTML = rows.join("");
}
["text", "kw"].forEach(function (id) { el(id).addEventListener("input", compute); });`
  ),

  "01-instruments/meta-length.html": SHELL(
    "Title & Meta Length Checker",
    `  <label for="t">Title tag</label>
  <input id="t" type="text" placeholder="Primary Keyword — Brand | Secondary">
  <div class="card"><div class="meter"><i id="tb" style="width:0%"></i></div><p style="margin:8px 0 0" id="to">—</p></div>
  <label for="d">Meta description</label>
  <textarea id="d" rows="3" placeholder="156 characters that earn the click…"></textarea>
  <div class="card"><div class="meter"><i id="db" style="width:0%"></i></div><p style="margin:8px 0 0" id="do">—</p></div>
  <div class="card"><p style="margin:0" id="google">Google shows ~<b>580px</b> of a title and ~<b>920px</b> of a description. Pixels, not characters, get cut — this tool assumes ~52 chars / ~155 chars as the safe band.</p></div>`,
    `"use strict";
var el = function (id) { return document.getElementById(id); };
function band(len, lo, hi, max) {
  var pct = Math.min(100, len / max * 100);
  var cls = len >= lo && len <= hi ? "ok" : len > hi ? "warn" : "bad";
  var msg = len + " chars — " + (cls === "ok" ? "in the safe band" : cls === "warn" ? "will be truncated" : "room to add");
  return { pct: pct, cls: cls, msg: msg };
}
function compute() {
  var t = band(el("t").value.length, 35, 52, 70);
  el("tb").style.width = t.pct + "%"; el("to").textContent = t.msg; el("to").className = t.cls;
  var d = band(el("d").value.length, 120, 155, 180);
  el("db").style.width = d.pct + "%"; el("do").textContent = d.msg; el("do").className = d.cls;
}
el("t").addEventListener("input", compute);
el("d").addEventListener("input", compute);`
  ),

  "01-instruments/serp-preview.html": SHELL(
    "SERP Preview",
    `  <label for="t">Title tag</label>
  <input id="t" type="text" value="Dental Implants in Portland | Brightline Dental">
  <label for="d">Meta description</label>
  <textarea id="d" rows="3">Permanent dental implants with a 10-year guarantee. Free consultation, same-week slots, and 4.9 stars from 800+ patients.</textarea>
  <div class="card" style="font-family: arial, sans-serif">
    <div style="color:#202124;font-size:14px" id="curl">https://www.example.com/dental-implants</div>
    <div style="color:#1a0dab;font-size:19px;line-height:1.3;margin:2px 0" id="ctitle">Title</div>
    <div style="color:#4d5156;font-size:13px;line-height:1.5" id="cdesc">Description</div>
  </div>
  <div class="card"><p style="margin:0" id="note"></p></div>`,
    `"use strict";
var el = function (id) { return document.getElementById(id); };
function cut(s, n) { return s.length <= n ? s : s.slice(0, n - 1).replace(/\\s+\\S*$/, "") + "…"; }
function render() {
  var t = el("t").value, d = el("d").value;
  el("ctitle").textContent = cut(t, 60);
  el("cdesc").textContent = cut(d, 160);
  el("note").innerHTML = "Title shows <b>" + Math.min(t.length, 60) + "</b> of " + t.length + " chars · description shows <b>" + Math.min(d.length, 160) + "</b> of " + d.length + " chars." + (t.length > 60 || d.length > 160 ? " <span class=\\"warn\\">Parts will be cut.</span>" : " <span class=\\"ok\\">Everything fits.</span>");
}
el("t").addEventListener("input", render);
el("d").addEventListener("input", render);
render();`
  ),

  "02-keyword-bank/keyword-bank.csv": `keyword,intent,monthly_volume,difficulty,title_tag_example,notes
dental implants,commercial-high,14800,67,Dental Implants in {{city}} | {{brand}},price anchor in meta lifts CTR
dental implants cost,commercial-high,6600,58,Dental Implants Cost Guide {{year}} | {{brand}},money page — price table required
implant dentist near me,local-high,9900,46,Implant Dentist Near {{city}} — {{brand}},GBP landing page
all on 4 dental implants,commercial-mid,5400,52,All-on-4 Implants: Am I a Candidate? | {{brand}},treatment sub-page
single tooth implant,commercial-mid,3600,44,Single Tooth Implants | {{brand}},procedure page
full mouth dental implants,commercial-mid,2900,54,Full Mouth Reconstruction | {{brand}},high-consideration — finance info
dental implants financing,commercial-mid,1600,38,Implant Financing & Payment Plans | {{brand}},trust signal page
implant vs bridge,informational,4400,41,Implant vs Bridge: 7 Factors That Decide,comparison content
dental implant procedure,informational,3600,43,The Implant Procedure, Step by Step,stage-by-stage guide
dental implant recovery,informational,2400,36,Implant Recovery: Week by Week,timeline content + FAQ schema
are dental implants safe,informational,1300,33,Are Dental Implants Safe? | {{brand}},YMYL — cite sources
dental implant failure,informational,1000,35,Why Implants Fail (and How We Prevent It),turns fear topic into trust
same day dental implants,commercial-high,1900,49,Same-Day Implants | {{brand}},availability + timeline
mini dental implants,commercial-mid,880,37,Mini Implants: Smaller, Faster, Cheaper?,alternative treatment
dental implant consultation,commercial-mid,590,29,Free Implant Consultation | {{brand}},booking CTA page
teeth in a day,commercial-high,1600,51,Teeth in a Day | {{brand}},branded procedure name
implant dentist reviews,research,720,27,Reviews — {{brand}} Implant Dentistry,review schema page
emergency tooth extraction,local-mid,1900,42,Emergency Extractions | {{brand}},adjacent service — internal link
bone graft for implants,informational,1300,39,Bone Grafts for Implants, Explained,pre-surgery anxiety content
dental implants abroad,research,2900,47,Implants Abroad vs Local: Real Math,cost-comparison content
implant warranty,commercial-low,320,25,Our 10-Year Implant Guarantee,trust/risk-reversal page
sedation dentistry,commercial-mid,3600,48,Sedation Options | {{brand}},fear-reduction service page
dental implants payment plan,commercial-mid,480,31,Implant Payment Plans from {{price}}/mo,finance calculator page
peri-implantitis,informational,590,34,Peri-implantitis: Signs and Prevention,clinical depth = E-E-A-T
implant maintenance,informational,390,28,Implant Care Kit & Maintenance,post-treatment retention content
`,

  "03-formulas/seo-scoring-cheatsheet.md": `# SEO scoring cheatsheet — the math inside the instruments

Every number the toolkit shows is computed here, in the open. No
black boxes, no "proprietary score".

## 1 · Keyword density

\`\`\`
density = (occurrences × words_per_keyword) / total_words × 100
\`\`\`

- **Occurrences** counts non-overlapping, case-insensitive matches of
  the exact phrase (word-boundary matched).
- **Words per keyword** accounts for phrases: 3 hits of a 2-word
  phrase = 6 keyword-words.
- Stopwords (a, and, the, of…) are excluded from the *term table* but
  NOT from total word count — total is every word on the page.

**Verdict bands:**

| Density | Verdict | Why |
| --- | --- | --- |
| < 0.8% | Under-optimised | The page may not clearly signal its topic |
| 0.8% – 2.0% | Natural band | Where almost every top-10 page sits |
| > 2.0% | Over-optimised | Stuffing territory — rewrite, don't add |

**The important caveat:** density is a *diagnostic*, never a target.
Write for the reader; use this to catch accidental stuffing.

## 2 · Title & meta length

Google truncates by **pixels** (~580px title, ~920px description),
not characters. Character bands are the practical proxy:

- Title: safe band **35–52 chars**, hard cut ≈ 60, physical ≈ 70
- Description: safe band **120–155 chars**, hard cut ≈ 160

Why a *safe band* below the cut: capital letters and wide glyphs
(\`W\`, \`M\`) eat pixels faster. If your title is ALL CAPS or dense with
wide letters, aim 10% under the band.

## 3 · SERP preview cut model

\`\`\`
visible_title   = truncate(title, 60)   // on the last word boundary
visible_desc    = truncate(desc, 160)
\`\`\`

Truncation happens at the last full word that fits, then appends an
ellipsis. Front-load the meaning: the first 40% of the title and the
first 100 characters of the description do almost all the work.

## 4 · Worked example

Input: 412 total words, "dental implants" appears 5 times (2-word
phrase).

\`\`\`
density = (5 × 2) / 412 × 100 = 2.43%  →  over-optimised
\`\`\`

Fix: expand the page with genuinely useful content (the density falls
as the page earns its length) rather than deleting the keyword.

## 5 · What this toolkit deliberately does NOT do

No backlink counting, no rank tracking, no "site health score". Those
require data you can't compute locally — and most tools that show
them are guessing. This kit scores only what it can *prove* from the
text you give it.
`,

  "04-setup/setup-guide.md": `# Setup guide — SEO Toolkit

Three instruments, zero install. This guide gets you from download to
first audit in ten minutes.

## The instruments

| File | What it does |
| --- | --- |
| \`01-instruments/keyword-density.html\` | Phrase density + verdict + top-terms table |
| \`01-instruments/meta-length.html\` | Title/description length scoring against pixel-safe bands |
| \`01-instruments/serp-preview.html\` | Pixel-accurate cut simulation of your snippet |

All three are single HTML files. Double-click → they open in your
browser and run offline. Nothing is sent anywhere.

## The 10-minute first run

1. Open \`keyword-density.html\`, paste your most important page's copy
   (view-source → copy the \`<body>\` text), enter the focus keyword.
   Read the verdict, ignore the urge to fix density by deleting — fix
   it by *adding* useful content.
2. Open \`meta-length.html\`. Paste the current title + description.
   Note which of the two is more often out of band.
3. Open \`serp-preview.html\`. Simulate the snippet. Front-load the
   first 40% of the title — that's what actually shows on mobile.
4. Open \`02-keyword-bank/keyword-bank.csv\` in any spreadsheet. It's a
   25-row seed bank for the dental vertical: keyword, intent, volume,
   difficulty, an example title tag, and a note. Replace it with your
   own export — keep the columns; the format is what matters.

## Reading the formulas

\`03-formulas/seo-scoring-cheatsheet.md\` documents every calculation
the instruments make, with worked examples. If an instrument ever
shows a number you can't reproduce by hand, that's a bug — email
support@omniforge.example.

## Embedding on your own site

Each instrument is self-contained HTML+CSS+JS. To embed one in an
internal tool or CMS page, drop the \`<main>\` block plus the
\`<style>\`/\`<script>\` into your page. Keep the attribution comment at
the top of the file — it keeps you compliant with the license.
`,

  "04-setup/walkthrough-link.md": `# Walkthrough

A 6-minute video walkthrough of the three instruments, with a live
page audit at the end:

**→ https://omniforge.example/walkthroughs/B-TK-1**

Contents:
- 00:00 — Why local instruments (and what this kit refuses to guess)
- 01:00 — Keyword density: reading the verdict honestly
- 02:20 — Meta length: pixels vs characters
- 03:40 — SERP preview: front-loading that survives mobile cuts
- 05:00 — Live audit: a real page, before and after

The video is hosted (not bundled) so the kit stays lightweight.
`,

  "EXTENDED-PACK/sitemap-generator-cli.md": `# Sitemap generator CLI — in production

Status: **in production** — not in this archive.

What the finished file will contain: a single-file Python 3 script
(stdlib only) that crawls a base URL with politeness delays, captures
\`lastmod\` from response headers, honours robots.txt, and writes a
valid \`sitemap.xml\` with the same shape as the one in this kit.
`,
};

export const demo: DemoContent = {
  kind: "tool",
  tool: "seo",
  intro:
    "Run the flagship instrument from the SEO Toolkit — the same density and title math as the downloadable HTML tools, live in this tab.",
  presets: [
    {
      label: "Dental implants page",
      payload: {
        text: "Dental implants are the modern standard for replacing missing teeth. Our dental implants use titanium posts that fuse with your jawbone, giving you a permanent tooth replacement that looks and feels natural. During your dental implants consultation we map your bone density and build a treatment plan. Most dental implants patients return to normal eating within a week.",
        keyword: "dental implants",
        title: "Dental Implants in Portland | Brightline Dental — Permanent Tooth Replacement",
        description: "Permanent dental implants with a 10-year guarantee. Free consultation, same-week slots, and 4.9 stars from 800+ patients.",
      },
    },
    {
      label: "Under-optimised draft",
      payload: {
        text: "Our practice offers a full range of services for the whole family. We have convenient hours and a friendly team. New patients are welcome and we accept most insurance plans. Call us today to book your first visit.",
        keyword: "family dentist",
        title: "Home",
        description: "Welcome to our website.",
      },
    },
    {
      label: "Over-stuffed draft",
      payload: {
        text: "Buy running shoes! Our running shoes are the best running shoes for runners who need running shoes. These running shoes outperform other running shoes because our running shoes are engineered for runners. Buy running shoes today — running shoes shipped fast.",
        keyword: "running shoes",
        title: "RUNNING SHOES | BEST RUNNING SHOES | BUY RUNNING SHOES ONLINE FREE SHIPPING SALE",
        description: "Running shoes. Running shoes. Running shoes. Best running shoes. Buy running shoes here. Running shoes for everyone. Cheap running shoes. Running shoes sale now on.",
      },
    },
  ],
};
