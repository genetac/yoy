/* ════════════════════════════════════════════════════════════════════
   B-TK-2 · Designer's Toolkit
   3 working single-file instruments (contrast checker, color pair
   generator, grid tool), token export, 40-row font pairing bank,
   WCAG 2.2 formula cheatsheet, setup guide. The Try-it demo runs
   the same contrast math as 01-instruments/contrast-checker.html.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-TK-2";

/* ── token-export.json is built from this verified data (ratios
      computed with the exact WCAG 2.2 formula shipped above) ─────── */
const tokenExport = {
  name: "omniforge-designer-tokens",
  version: "2026.1",
  description:
    "Design tokens for the Designer's Toolkit palette. Every accessiblePairs entry was verified with the WCAG 2.2 contrast formula (relative luminance + contrast ratio) at 2026.1.",
  color: {
    ink: { "900": "#0F172A", "700": "#334155", "500": "#64748B", "400": "#94A3B8", "300": "#CBD5E1" },
    paper: { "0": "#FFFFFF", "50": "#F8FAFC", "200": "#E2E8F0" },
    accent: { "100": "#DBEAFE", "600": "#2563EB", "700": "#1D4ED8" },
    status: { success: "#15803D", warning: "#B45309", danger: "#B91C1C", highlight: "#FACC15" }
  },
  space: { base: 4, scale: [4, 8, 12, 16, 24, 32, 48, 64, 96], unit: "px" },
  type: {
    scale: [
      { name: "caption", size: 12, lineHeight: 16 },
      { name: "body-s", size: 14, lineHeight: 20 },
      { name: "body", size: 16, lineHeight: 26 },
      { name: "body-l", size: 18, lineHeight: 28 },
      { name: "title-s", size: 20, lineHeight: 28 },
      { name: "title", size: 24, lineHeight: 32 },
      { name: "display-s", size: 30, lineHeight: 38 },
      { name: "display", size: 36, lineHeight: 42 },
      { name: "display-l", size: 48, lineHeight: 52 },
      { name: "hero", size: 60, lineHeight: 64 }
    ],
    unit: "px",
    bodyStack: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    monoStack: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
  },
  radius: { sm: 4, md: 8, lg: 16, pill: 9999, unit: "px" },
  shadow: {
    low: "0 1px 2px rgba(15, 23, 42, 0.08)",
    mid: "0 4px 12px rgba(15, 23, 42, 0.12)",
    high: "0 12px 32px rgba(15, 23, 42, 0.18)"
  },
  breakpoint: { sm: 480, md: 768, lg: 1024, xl: 1280, unit: "px" },
  accessiblePairs: [
    { name: "body text on paper", fg: "#0F172A", bg: "#FFFFFF", ratio: 17.85, level: "AAA" },
    { name: "secondary text on paper", fg: "#334155", bg: "#FFFFFF", ratio: 10.35, level: "AAA" },
    { name: "muted text on paper", fg: "#64748B", bg: "#FFFFFF", ratio: 4.76, level: "AA" },
    { name: "body text on surface", fg: "#0F172A", bg: "#F8FAFC", ratio: 17.06, level: "AAA" },
    { name: "secondary text on surface", fg: "#334155", bg: "#F8FAFC", ratio: 9.9, level: "AAA" },
    { name: "muted text on surface", fg: "#64748B", bg: "#F8FAFC", ratio: 4.55, level: "AA" },
    { name: "action link on paper", fg: "#2563EB", bg: "#FFFFFF", ratio: 5.17, level: "AA" },
    { name: "action link on surface", fg: "#2563EB", bg: "#F8FAFC", ratio: 4.94, level: "AA" },
    { name: "button label on accent", fg: "#FFFFFF", bg: "#2563EB", ratio: 5.17, level: "AA" },
    { name: "inverse text on ink", fg: "#FFFFFF", bg: "#0F172A", ratio: 17.85, level: "AAA" },
    { name: "success text on paper", fg: "#15803D", bg: "#FFFFFF", ratio: 5.02, level: "AA" },
    { name: "warning text on paper", fg: "#B45309", bg: "#FFFFFF", ratio: 5.02, level: "AA" },
    { name: "danger text on paper", fg: "#B91C1C", bg: "#FFFFFF", ratio: 6.47, level: "AA" },
    { name: "focus link on paper", fg: "#1D4ED8", bg: "#FFFFFF", ratio: 6.7, level: "AA" },
    { name: "chip: accent-700 on accent-100", fg: "#1D4ED8", bg: "#DBEAFE", ratio: 5.49, level: "AA" },
    { name: "highlight note: ink on amber", fg: "#0F172A", bg: "#FACC15", ratio: 11.66, level: "AAA" },
    { name: "dark-mode body on ink", fg: "#CBD5E1", bg: "#0F172A", ratio: 12.02, level: "AAA" },
    { name: "dark-mode muted on ink", fg: "#94A3B8", bg: "#0F172A", ratio: 6.96, level: "AA" }
  ],
  knownFails: [
    { pair: "#777777 on #FFFFFF", ratio: 4.48, note: "One step lighter than #767676 — fails AA for normal text." },
    { pair: "#2563EB on #DBEAFE", ratio: 4.24, note: "Accent-600 on accent-100 chip fails AA normal; use accent-700 (5.49:1) instead." },
    { pair: "#9CA3AF on #F9FAFB", ratio: 2.43, note: "Tailwind-style gray-400 body text fails every threshold, including large text." }
  ]
};

export const files: Record<string, string> = {
  /* ── 01 Working instruments ─────────────────────────────────────── */

  "01-instruments/contrast-checker.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Contrast Checker — Designer's Toolkit</title>
<style>
  :root {
    color-scheme: light dark;
    --bg: #f8fafc; --card: #ffffff; --fg: #0f172a; --muted: #64748b;
    --line: #e2e8f0; --accent: #2563eb; --ok: #15803d; --bad: #b91c1c;
  }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #0f172a; --card: #1e293b; --fg: #e2e8f0; --muted: #94a3b8;
            --line: #334155; --accent: #60a5fa; --ok: #4ade80; --bad: #f87171; }
  }
  * { box-sizing: border-box; }
  body { margin: 0; font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif;
         background: var(--bg); color: var(--fg); }
  main { max-width: 58rem; margin: 0 auto; padding: 1.5rem 1.25rem 3rem; }
  h1 { font-size: 1.55rem; margin: 0 0 .3rem; }
  .tagline { margin: 0 0 1.4rem; color: var(--muted); }
  .controls { display: grid; grid-template-columns: 1fr 1fr auto; gap: 1rem; align-items: start; }
  fieldset { border: 1px solid var(--line); border-radius: .6rem; padding: .8rem 1rem 1rem; margin: 0; }
  legend { font-weight: 700; font-size: .8rem; letter-spacing: .04em; text-transform: uppercase; padding: 0 .35rem; }
  .hexrow { display: flex; gap: .6rem; }
  input[type="color"] { width: 3rem; height: 2.4rem; border: 1px solid var(--line); border-radius: .4rem;
                        background: none; padding: 2px; cursor: pointer; }
  input[type="text"] { flex: 1; min-width: 0; font: 1rem/1.4 ui-monospace, Menlo, Consolas, monospace;
                       padding: .5rem .6rem; border: 1px solid var(--line); border-radius: .4rem;
                       background: var(--card); color: var(--fg); }
  .hint { margin: .45rem 0 0; font-size: .82rem; color: var(--muted); min-height: 1.2em; }
  .hint.err { color: var(--bad); }
  button.swap { height: 2.4rem; padding: 0 1rem; font: 600 .95rem/1 system-ui, sans-serif;
                border: 1px solid var(--line); border-radius: .4rem; background: var(--card);
                color: var(--fg); cursor: pointer; }
  button.swap:hover { border-color: var(--accent); color: var(--accent); }
  :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .readout { display: flex; flex-wrap: wrap; align-items: baseline; gap: 1rem; margin: 1.4rem 0 .4rem; }
  .ratio { font-size: 3rem; font-weight: 800; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
  .ratio small { font-size: 1.1rem; font-weight: 600; color: var(--muted); }
  .verdictline { font-weight: 600; }
  .verdictline.pass { color: var(--ok); } .verdictline.fail { color: var(--bad); }
  .grid2 { display: grid; grid-template-columns: 1.1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .panel { background: var(--card); border: 1px solid var(--line); border-radius: .6rem; padding: 1rem 1.1rem; }
  .panel h2 { font-size: .95rem; margin: 0 0 .7rem; letter-spacing: .03em; text-transform: uppercase; color: var(--muted); }
  .badges { display: grid; gap: .45rem; }
  .badge { display: flex; justify-content: space-between; gap: .8rem; padding: .45rem .7rem;
           border: 1px solid var(--line); border-radius: .4rem; font-size: .95rem; }
  .badge b { font-weight: 700; }
  .badge .r { color: var(--muted); font-variant-numeric: tabular-nums; }
  .badge.pass { border-color: var(--ok); } .badge.pass b { color: var(--ok); }
  .badge.fail { border-color: var(--bad); } .badge.fail b { color: var(--bad); }
  .swatch { border-radius: .6rem; padding: 1.4rem 1.4rem 1.2rem; border: 1px solid var(--line); }
  .swatch p { margin: 0 0 .8rem; }
  .sample-normal { font-size: 16px; }
  .sample-large { font-size: 24px; line-height: 1.35; }
  .sample-bold { font-size: 19px; font-weight: 700; }
  .sample-ui { display: inline-block; border: 2px solid currentColor; border-radius: .35rem;
               padding: .3rem .8rem; font-weight: 600; font-size: .95rem; }
  .sample-labels { margin-top: 1rem; font-size: .78rem; color: var(--muted); }
  details { margin-top: 1rem; }
  details summary { cursor: pointer; font-weight: 600; }
  pre.math { background: var(--card); border: 1px solid var(--line); border-radius: .6rem;
             padding: .9rem 1rem; overflow-x: auto; font-size: .85rem; line-height: 1.7; }
  table { border-collapse: collapse; width: 100%; font-size: .9rem; }
  th, td { text-align: left; padding: .35rem .5rem; border-bottom: 1px solid var(--line); }
  th { color: var(--muted); font-weight: 600; }
  footer { margin-top: 2rem; font-size: .82rem; color: var(--muted); }
  @media (max-width: 720px) { .controls { grid-template-columns: 1fr; } .grid2 { grid-template-columns: 1fr; } }
</style>
</head>
<body>
<main>
  <h1>Contrast Checker</h1>
  <p class="tagline">WCAG 2.2 math, live in your browser — C&nbsp;=&nbsp;(L1&nbsp;+&nbsp;0.05)&nbsp;/&nbsp;(L2&nbsp;+&nbsp;0.05). Works offline.</p>

  <div class="controls">
    <fieldset>
      <legend>Text color (foreground)</legend>
      <div class="hexrow">
        <input type="color" id="fgPick" value="#2563eb" aria-label="Foreground color picker">
        <input type="text" id="fgHex" value="#2563EB" autocomplete="off" spellcheck="false" aria-describedby="fgHint">
      </div>
      <p class="hint" id="fgHint">Hex like #2563EB or #25F</p>
    </fieldset>
    <fieldset>
      <legend>Background</legend>
      <div class="hexrow">
        <input type="color" id="bgPick" value="#ffffff" aria-label="Background color picker">
        <input type="text" id="bgHex" value="#FFFFFF" autocomplete="off" spellcheck="false" aria-describedby="bgHint">
      </div>
      <p class="hint" id="bgHint">Both fields stay in sync</p>
    </fieldset>
    <button type="button" class="swap" id="swap" title="Swap foreground and background">⇄ Swap</button>
  </div>

  <div class="readout" role="status" aria-live="polite">
    <span class="ratio" id="ratio">–<small>:1</small></span>
    <span class="verdictline" id="verdictline">Type a hex pair above.</span>
  </div>

  <div class="grid2">
    <section class="panel" aria-label="Verdicts">
      <h2>Verdicts (WCAG 2.2)</h2>
      <div class="badges" id="badges"></div>
    </section>
    <section class="panel" aria-label="Live swatches">
      <h2>Live swatches</h2>
      <div class="swatch" id="swatch">
        <p class="sample-normal">The quick brown fox — body text, 16px.</p>
        <p class="sample-large">Large text — 24px regular.</p>
        <p class="sample-bold">Bold text — 19px / 700.</p>
        <p><span class="sample-ui" id="uiSample">Button · 3:1 for UI</span></p>
        <p class="sample-labels">Large text = ≥24px regular, or ≥18.66px bold. UI parts (borders, icons, focus rings) need 3:1 (§1.4.11).</p>
      </div>
    </section>
  </div>

  <details>
    <summary>The math for this pair</summary>
    <pre class="math" id="math">…</pre>
  </details>

  <details>
    <summary>Thresholds and worked example</summary>
    <table>
      <tr><th>Check</th><th>Ratio needed</th></tr>
      <tr><td>AA, normal text (§1.4.3)</td><td>≥ 4.5:1</td></tr>
      <tr><td>AA, large text (§1.4.3)</td><td>≥ 3:1</td></tr>
      <tr><td>AAA, normal text (§1.4.6)</td><td>≥ 7:1</td></tr>
      <tr><td>AAA, large text (§1.4.6)</td><td>≥ 4.5:1</td></tr>
      <tr><td>Non-text UI (§1.4.11)</td><td>≥ 3:1</td></tr>
    </table>
    <p>Worked example — #2563EB on #FFFFFF: linearized channels R&nbsp;0.018500, G&nbsp;0.124772, B&nbsp;0.830770 → L&nbsp;=&nbsp;0.2126·0.018500&nbsp;+&nbsp;0.7152·0.124772&nbsp;+&nbsp;0.0722·0.830770&nbsp;=&nbsp;0.153152 → C&nbsp;=&nbsp;(1.000000&nbsp;+&nbsp;0.05)&nbsp;/&nbsp;(0.153152&nbsp;+&nbsp;0.05)&nbsp;=&nbsp;5.17:1 → passes AA for normal text.</p>
  </details>

  <footer>Designer's Toolkit · B-TK-2 · no network calls, no tracking — save this file and it keeps working. Support: support@omniforge.example</footer>
</main>
<script>
/* ===== formulas (pure) — WCAG 2.2 relative luminance + contrast ===== */
function hexToRgb(hex) {
  var m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(hex).trim());
  if (!m) return null;
  var s = m[1];
  if (s.length === 3) s = s.charAt(0) + s.charAt(0) + s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2);
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
}
function normalizeHex(hex) {
  var rgb = hexToRgb(hex);
  if (!rgb) return null;
  return "#" + rgb.map(function (v) { var h = v.toString(16); return h.length === 1 ? "0" + h : h; }).join("").toUpperCase();
}
function linChannel(c8) {
  var c = c8 / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function luminance(hex) {
  var rgb = hexToRgb(hex);
  if (!rgb) return null;
  return 0.2126 * linChannel(rgb[0]) + 0.7152 * linChannel(rgb[1]) + 0.0722 * linChannel(rgb[2]);
}
function contrastRatio(a, b) {
  var la = luminance(a), lb = luminance(b);
  if (la === null || lb === null) return null;
  var hi = Math.max(la, lb), lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
}
function verdicts(r) {
  return {
    aaNormal: r >= 4.5, aaLarge: r >= 3,
    aaaNormal: r >= 7, aaaLarge: r >= 4.5,
    ui: r >= 3
  };
}
/* ===== app (dom) ===== */
var fgPick = document.getElementById("fgPick"), fgHex = document.getElementById("fgHex");
var bgPick = document.getElementById("bgPick"), bgHex = document.getElementById("bgHex");
var fgHint = document.getElementById("fgHint"), bgHint = document.getElementById("bgHint");
var CHECKS = [
  ["aaNormal", "AA · normal text", "4.5:1"],
  ["aaLarge", "AA · large text", "3:1"],
  ["aaaNormal", "AAA · normal text", "7:1"],
  ["aaaLarge", "AAA · large text", "4.5:1"],
  ["ui", "UI components · §1.4.11", "3:1"]
];
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function syncPick(pick, text, hint, label) {
  var norm = normalizeHex(text.value);
  if (norm) { pick.value = norm.toLowerCase(); hint.textContent = "L = " + (luminance(norm) === null ? "—" : luminance(norm).toFixed(6)); hint.classList.remove("err"); }
  else { hint.textContent = "Not a hex color — showing last valid pair"; hint.classList.add("err"); }
  render();
}
function render() {
  var fg = normalizeHex(fgHex.value), bg = normalizeHex(bgHex.value);
  if (!fg || !bg) return;
  var r = contrastRatio(fg, bg), v = verdicts(r), shown = r.toFixed(2);
  document.getElementById("ratio").innerHTML = shown + "<small>:1</small>";
  var vl = document.getElementById("verdictline");
  if (v.aaaNormal) { vl.textContent = "Passes AAA for normal text — excellent."; vl.className = "verdictline pass"; }
  else if (v.aaNormal) { vl.textContent = "Passes AA for normal text (the legal baseline)."; vl.className = "verdictline pass"; }
  else if (v.aaLarge) { vl.textContent = "Fails AA for normal text — large text only."; vl.className = "verdictline fail"; }
  else { vl.textContent = "Fails every threshold — do not ship this pair."; vl.className = "verdictline fail"; }
  var html = "";
  for (var i = 0; i < CHECKS.length; i++) {
    var c = CHECKS[i], ok = v[c[0]];
    html += '<div class="badge ' + (ok ? "pass" : "fail") + '"><b>' + (ok ? "PASS" : "FAIL") + "</b><span>" + c[1] + '</span><span class="r">' + c[2] + "</span></div>";
  }
  document.getElementById("badges").innerHTML = html;
  var sw = document.getElementById("swatch");
  sw.style.background = bg.toLowerCase();
  sw.style.color = fg.toLowerCase();
  document.getElementById("uiSample").style.borderColor = fg.toLowerCase();
  var lf = luminance(fg).toFixed(6), lb = luminance(bg).toFixed(6);
  var rgbf = hexToRgb(fg), rgbb = hexToRgb(bg);
  var lines = [
    "FG  " + fg + "  →  R' " + linChannel(rgbf[0]).toFixed(6) + "  G' " + linChannel(rgbf[1]).toFixed(6) + "  B' " + linChannel(rgbf[2]).toFixed(6),
    "    L = 0.2126·R' + 0.7152·G' + 0.0722·B' = " + lf,
    "BG  " + bg + "  →  R' " + linChannel(rgbb[0]).toFixed(6) + "  G' " + linChannel(rgbb[1]).toFixed(6) + "  B' " + linChannel(rgbb[2]).toFixed(6),
    "    L = 0.2126·R' + 0.7152·G' + 0.0722·B' = " + lb,
    "C  = (L1 + 0.05) / (L2 + 0.05) = (" + Math.max(lf, lb) + " + 0.05) / (" + Math.min(lf, lb) + " + 0.05) = " + r.toFixed(2) + ":1",
    "Channel linearization: c/12.92 if c ≤ 0.03928 else ((c + 0.055)/1.055)^2.4  (c = 8-bit value / 255)"
  ];
  document.getElementById("math").textContent = lines.join("\\n");
}
fgPick.addEventListener("input", function () { fgHex.value = fgPick.value.toUpperCase(); syncPick(fgPick, fgHex, fgHint); });
bgPick.addEventListener("input", function () { bgHex.value = bgPick.value.toUpperCase(); syncPick(bgPick, bgHex, bgHint); });
fgHex.addEventListener("input", function () { syncPick(fgPick, fgHex, fgHint); });
bgHex.addEventListener("input", function () { syncPick(bgPick, bgHex, bgHint); });
document.getElementById("swap").addEventListener("click", function () {
  var t = fgHex.value; fgHex.value = bgHex.value; bgHex.value = t; render();
});
render();
</script>
</body>
</html>
`,

  "01-instruments/color-pair-generator.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Color Pair Generator — Designer's Toolkit</title>
<style>
  :root {
    color-scheme: light dark;
    --bg: #f8fafc; --card: #ffffff; --fg: #0f172a; --muted: #64748b;
    --line: #e2e8f0; --accent: #2563eb; --ok: #15803d;
  }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #0f172a; --card: #1e293b; --fg: #e2e8f0; --muted: #94a3b8;
            --line: #334155; --accent: #60a5fa; --ok: #4ade80; }
  }
  * { box-sizing: border-box; }
  body { margin: 0; font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; background: var(--bg); color: var(--fg); }
  main { max-width: 62rem; margin: 0 auto; padding: 1.5rem 1.25rem 3rem; }
  h1 { font-size: 1.55rem; margin: 0 0 .3rem; }
  .tagline { margin: 0 0 1.4rem; color: var(--muted); }
  .controls { display: flex; flex-wrap: wrap; gap: 1rem; align-items: end; }
  fieldset { border: 1px solid var(--line); border-radius: .6rem; padding: .8rem 1rem 1rem; margin: 0; }
  legend { font-weight: 700; font-size: .8rem; letter-spacing: .04em; text-transform: uppercase; padding: 0 .35rem; }
  .hexrow { display: flex; gap: .6rem; }
  input[type="color"] { width: 3rem; height: 2.4rem; border: 1px solid var(--line); border-radius: .4rem; background: none; padding: 2px; cursor: pointer; }
  input[type="text"] { font: 1rem/1.4 ui-monospace, Menlo, Consolas, monospace; padding: .5rem .6rem;
                       border: 1px solid var(--line); border-radius: .4rem; background: var(--card); color: var(--fg); width: 8.5rem; }
  .radios { display: flex; gap: 1rem; flex-wrap: wrap; }
  .radios label { display: flex; gap: .4rem; align-items: center; font-weight: 600; }
  :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .summary { margin: 1.2rem 0 .6rem; font-weight: 600; }
  .pairs { display: grid; grid-template-columns: repeat(auto-fill, minmax(272px, 1fr)); gap: 1rem; }
  .pair { background: var(--card); border: 1px solid var(--line); border-radius: .6rem; overflow: hidden; }
  .pair .demo { padding: 1.2rem 1rem; font-size: 1.5rem; font-weight: 700; letter-spacing: -.01em; }
  .pair .demo small { display: block; font-size: .85rem; font-weight: 400; margin-top: .3rem; }
  .pair .meta { padding: .7rem .9rem .9rem; border-top: 1px solid var(--line); }
  .pair .hexes { display: flex; justify-content: space-between; font: .82rem/1.5 ui-monospace, Menlo, Consolas, monospace; color: var(--muted); }
  .pair .r { font-weight: 800; font-size: 1.15rem; font-variant-numeric: tabular-nums; margin: .3rem 0; }
  .pair .chips { display: flex; gap: .4rem; flex-wrap: wrap; margin-bottom: .7rem; }
  .chip { font-size: .72rem; font-weight: 700; letter-spacing: .03em; padding: .15rem .5rem; border-radius: 999px; border: 1px solid var(--ok); color: var(--ok); }
  .chip.dim { border-color: var(--line); color: var(--muted); }
  .copy { width: 100%; padding: .45rem; font: 600 .85rem/1 system-ui, sans-serif; border: 1px solid var(--line);
          border-radius: .4rem; background: var(--card); color: var(--fg); cursor: pointer; }
  .copy:hover { border-color: var(--accent); color: var(--accent); }
  .copy.done { border-color: var(--ok); color: var(--ok); }
  .empty { color: var(--muted); padding: 1rem; border: 1px dashed var(--line); border-radius: .6rem; }
  footer { margin-top: 2rem; font-size: .82rem; color: var(--muted); }
</style>
</head>
<body>
<main>
  <h1>Color Pair Generator</h1>
  <p class="tagline">Give it one base color — it builds fg/bg pairings that actually pass WCAG AA (4.5:1) and flags AAA (7:1). Same math as the contrast checker.</p>

  <div class="controls">
    <fieldset>
      <legend>Base color</legend>
      <div class="hexrow">
        <input type="color" id="pick" value="#2563eb" aria-label="Base color picker">
        <input type="text" id="hex" value="#2563EB" autocomplete="off" spellcheck="false" aria-label="Base color hex">
      </div>
    </fieldset>
    <fieldset>
      <legend>Base is the…</legend>
      <div class="radios">
        <label><input type="radio" name="mode" value="bg" checked> Background</label>
        <label><input type="radio" name="mode" value="fg"> Text color</label>
      </div>
    </fieldset>
  </div>

  <p class="summary" id="summary" role="status" aria-live="polite">Generating…</p>
  <div class="pairs" id="pairs"></div>

  <footer>Designer's Toolkit · B-TK-2 · runs entirely offline. Support: support@omniforge.example</footer>
</main>
<script>
/* ===== formulas (pure) ===== */
function hexToRgb(hex) {
  var m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(hex).trim());
  if (!m) return null;
  var s = m[1];
  if (s.length === 3) s = s.charAt(0) + s.charAt(0) + s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2);
  return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
}
function rgbToHex(r, g, b) {
  var f = function (v) { var h = Math.max(0, Math.min(255, Math.round(v))).toString(16); return h.length === 1 ? "0" + h : h; };
  return ("#" + f(r) + f(g) + f(b)).toUpperCase();
}
function normalizeHex(hex) {
  var rgb = hexToRgb(hex);
  return rgb ? rgbToHex(rgb[0], rgb[1], rgb[2]) : null;
}
function mix(a, b, t) {
  var x = hexToRgb(a), y = hexToRgb(b);
  if (!x || !y) return null;
  return rgbToHex(x[0] + (y[0] - x[0]) * t, x[1] + (y[1] - x[1]) * t, x[2] + (y[2] - x[2]) * t);
}
function linChannel(c8) {
  var c = c8 / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
function luminance(hex) {
  var rgb = hexToRgb(hex);
  if (!rgb) return null;
  return 0.2126 * linChannel(rgb[0]) + 0.7152 * linChannel(rgb[1]) + 0.0722 * linChannel(rgb[2]);
}
function contrastRatio(a, b) {
  var la = luminance(a), lb = luminance(b);
  if (la === null || lb === null) return null;
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
function buildPairs(base, mode) {
  var WHITE = "#FFFFFF", BLACK = "#000000", INK = "#0F172A";
  var candidates = [], i, c;
  if (mode === "bg") {
    candidates.push({ fg: BLACK, bg: base, label: "Black text on base" });
    candidates.push({ fg: WHITE, bg: base, label: "White text on base" });
    var darks = [0.4, 0.5, 0.6, 0.72, 0.85];
    var lights = [0.55, 0.68, 0.8, 0.9];
    for (i = 0; i < darks.length; i++) { c = mix(base, BLACK, darks[i]); candidates.push({ fg: c, bg: base, label: "Shaded base " + Math.round(darks[i] * 100) + "% on base" }); }
    for (i = 0; i < lights.length; i++) { c = mix(base, WHITE, lights[i]); candidates.push({ fg: c, bg: base, label: "Tinted base " + Math.round(lights[i] * 100) + "% on base" }); }
    var tintsForSurface = [0.8, 0.88, 0.95];
    for (i = 0; i < tintsForSurface.length; i++) {
      c = mix(base, WHITE, tintsForSurface[i]);
      candidates.push({ fg: INK, bg: c, label: "Ink text on " + Math.round((1 - tintsForSurface[i]) * 100) + "% tint of base" });
    }
    var surface = mix(base, WHITE, 0.95), deep = mix(base, BLACK, 0.6);
    candidates.push({ fg: deep, bg: surface, label: "Card pattern: deep base on 5% tint" });
  } else {
    candidates.push({ fg: base, bg: WHITE, label: "Base on white" });
    candidates.push({ fg: base, bg: INK, label: "Base on near-black ink" });
    var tints = [0.7, 0.78, 0.86, 0.92, 0.96];
    var shades = [0.82, 0.9, 0.95];
    for (i = 0; i < tints.length; i++) { c = mix(base, WHITE, tints[i]); candidates.push({ fg: base, bg: c, label: "Base on " + Math.round((1 - tints[i]) * 100) + "% tint of itself" }); }
    for (i = 0; i < shades.length; i++) { c = mix(base, BLACK, shades[i]); candidates.push({ fg: base, bg: c, label: "Base on " + Math.round(shades[i] * 100) + "% shade of itself" }); }
  }
  var seen = {}, out = [];
  for (i = 0; i < candidates.length; i++) {
    var p = candidates[i];
    if (!p.fg || !p.bg) continue;
    var r = contrastRatio(p.fg, p.bg);
    if (r === null || r < 4.5) continue;
    var key = p.fg + "/" + p.bg;
    if (seen[key]) continue;
    seen[key] = true;
    out.push({ fg: p.fg, bg: p.bg, label: p.label, ratio: r });
  }
  out.sort(function (a, b) { return b.ratio - a.ratio; });
  return out.slice(0, 9);
}
/* ===== app (dom) ===== */
var pick = document.getElementById("pick"), hex = document.getElementById("hex");
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function mode() {
  var r = document.querySelector('input[name="mode"]:checked');
  return r ? r.value : "bg";
}
function render() {
  var base = normalizeHex(hex.value);
  var box = document.getElementById("pairs"), sum = document.getElementById("summary");
  if (!base) { box.innerHTML = '<p class="empty">That is not a hex color. Try #2563EB or #25F.</p>'; sum.textContent = "Waiting for a valid base color…"; return; }
  var pairs = buildPairs(base, mode());
  var aaa = pairs.filter(function (p) { return p.ratio >= 7; }).length;
  sum.textContent = pairs.length + " AA-safe pairings from " + base + " · " + aaa + " of them also clear AAA (7:1)";
  var html = "";
  for (var i = 0; i < pairs.length; i++) {
    var p = pairs[i];
    var chips = '<span class="chip">AA normal ' + p.ratio.toFixed(2) + ":1</span>" +
      (p.ratio >= 7 ? '<span class="chip">AAA normal</span>' : '<span class="chip dim">AAA needs 7:1</span>');
    html += '<div class="pair"><div class="demo" style="background:' + p.bg.toLowerCase() + ";color:" + p.fg.toLowerCase() + '">Aa — headline sample<small>' + esc(p.label) + "</small></div>" +
      '<div class="meta"><div class="hexes"><span>text ' + p.fg + "</span><span>bg " + p.bg + "</span></div>" +
      '<div class="r">' + p.ratio.toFixed(2) + ":1</div>" +
      '<div class="chips">' + chips + "</div>" +
      '<button type="button" class="copy" data-css="color: ' + p.fg.toLowerCase() + "; background-color: " + p.bg.toLowerCase() + "; /* " + p.ratio.toFixed(2) + ':1 AA */">Copy CSS</button></div></div>';
  }
  if (!pairs.length) html = '<p class="empty">No AA-safe pairing found from this base. Math fact: black and white text can never both fail 4.5:1 on the same color, so if you see this the hex was almost white or almost black — use the base as a surface and generate text pairs from a darker base instead.</p>';
  box.innerHTML = html;
  var btns = box.querySelectorAll(".copy");
  for (var j = 0; j < btns.length; j++) btns[j].addEventListener("click", onCopy);
}
function onCopy(ev) {
  var btn = ev.currentTarget, css = btn.getAttribute("data-css");
  function flash() { btn.textContent = "Copied"; btn.classList.add("done"); setTimeout(function () { btn.textContent = "Copy CSS"; btn.classList.remove("done"); }, 1400); }
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(css).then(flash, flash);
  else flash();
}
pick.addEventListener("input", function () { hex.value = pick.value.toUpperCase(); render(); });
hex.addEventListener("input", render);
var radios = document.querySelectorAll('input[name="mode"]');
for (var k = 0; k < radios.length; k++) radios[k].addEventListener("change", render);
render();
</script>
</body>
</html>
`,

  "01-instruments/grid-tool.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Grid Tool — Designer's Toolkit</title>
<style>
  :root {
    color-scheme: light dark;
    --bg: #f8fafc; --card: #ffffff; --fg: #0f172a; --muted: #64748b;
    --line: #e2e8f0; --accent: #2563eb;
  }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #0f172a; --card: #1e293b; --fg: #e2e8f0; --muted: #94a3b8; --line: #334155; --accent: #60a5fa; }
  }
  * { box-sizing: border-box; }
  body { margin: 0; font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; background: var(--bg); color: var(--fg); }
  main { max-width: 58rem; margin: 0 auto; padding: 1.5rem 1.25rem 3rem; }
  h1 { font-size: 1.55rem; margin: 0 0 .3rem; }
  .tagline { margin: 0 0 1.4rem; color: var(--muted); }
  .controls { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: .8rem; }
  .field label { display: block; font-size: .8rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: var(--muted); margin-bottom: .3rem; }
  .field input { width: 100%; padding: .5rem .6rem; font: 1rem/1.4 ui-monospace, Menlo, Consolas, monospace;
                 border: 1px solid var(--line); border-radius: .4rem; background: var(--card); color: var(--fg); }
  .presets { display: flex; gap: .5rem; flex-wrap: wrap; margin: 1rem 0 0; }
  .presets button, .copy { padding: .45rem .8rem; font: 600 .85rem/1 system-ui, sans-serif; border: 1px solid var(--line);
                           border-radius: .4rem; background: var(--card); color: var(--fg); cursor: pointer; }
  .presets button:hover, .copy:hover { border-color: var(--accent); color: var(--accent); }
  .copy.done { border-color: var(--ok, #15803d); color: var(--ok, #15803d); }
  :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  .grid2 { display: grid; grid-template-columns: 1.25fr 1fr; gap: 1rem; margin-top: 1.2rem; }
  .panel { background: var(--card); border: 1px solid var(--line); border-radius: .6rem; padding: 1rem 1.1rem; }
  .panel h2 { font-size: .95rem; margin: 0 0 .7rem; letter-spacing: .03em; text-transform: uppercase; color: var(--muted); }
  .stats { display: grid; grid-template-columns: 1fr 1fr; gap: .6rem; }
  .stat { border: 1px solid var(--line); border-radius: .4rem; padding: .5rem .7rem; }
  .stat b { display: block; font-size: 1.25rem; font-variant-numeric: tabular-nums; }
  .stat span { font-size: .78rem; color: var(--muted); }
  .preview { background: repeating-conic-gradient(var(--bg) 0% 25%, transparent 0% 50%) 50% / 18px 18px;
             border: 1px solid var(--line); border-radius: .4rem; }
  .margin-box { border: 1px dashed var(--muted); margin: 0 auto; }
  .cols { display: flex; width: 100%; }
  .col { background: color-mix(in srgb, var(--accent) 22%, transparent); border: 1px solid var(--accent);
         border-radius: 2px; align-self: stretch; min-height: 72px; }
  .col em { font-style: normal; font-size: .68rem; color: var(--muted); text-align: center; display: block; padding-top: 4px; }
  pre { background: var(--bg); border: 1px solid var(--line); border-radius: .6rem; padding: .9rem 1rem;
        overflow-x: auto; font: .85rem/1.65 ui-monospace, Menlo, Consolas, monospace; margin: 0; }
  .scale { display: flex; flex-wrap: wrap; gap: .5rem; }
  .scale span { font: .78rem/1 ui-monospace, Menlo, Consolas, monospace; border: 1px solid var(--line);
                border-radius: .3rem; padding: .3rem .5rem; color: var(--muted); }
  .warn { color: var(--bad, #b91c1c); font-weight: 600; }
  footer { margin-top: 2rem; font-size: .82rem; color: var(--muted); }
  @media (max-width: 780px) { .grid2 { grid-template-columns: 1fr; } }
</style>
</head>
<body>
<main>
  <h1>Grid Tool</h1>
  <p class="tagline">Column and spacing calculator with a to-scale preview — column&nbsp;=&nbsp;(content&nbsp;−&nbsp;gap·(cols−1))&nbsp;/&nbsp;cols.</p>

  <div class="controls">
    <div class="field"><label for="width">Container (px)</label><input id="width" type="number" min="200" max="3840" step="10" value="1200"></div>
    <div class="field"><label for="margin">Outer margin (px)</label><input id="margin" type="number" min="0" max="400" step="1" value="24"></div>
    <div class="field"><label for="cols">Columns</label><input id="cols" type="number" min="1" max="36" step="1" value="12"></div>
    <div class="field"><label for="gap">Gap (px)</label><input id="gap" type="number" min="0" max="200" step="1" value="24"></div>
    <div class="field"><label for="base">Spacing base (px)</label><input id="base" type="number" min="1" max="16" step="1" value="4"></div>
  </div>
  <div class="presets" role="group" aria-label="Grid presets">
    <button type="button" data-p="1200,24,12,24,4">Desktop 12-col</button>
    <button type="button" data-p="720,24,6,24,4">Blog 720</button>
    <button type="button" data-p="360,16,4,16,4">Mobile 360</button>
  </div>

  <div class="grid2">
    <section class="panel" aria-label="Visual preview">
      <h2>Preview — to scale</h2>
      <div class="preview"><div class="margin-box" id="marginBox"><div class="cols" id="colsRow"></div></div></div>
      <p style="font-size:.78rem;color:var(--muted);margin:.6rem 0 0">Dashed border = page margin. Shaded boxes = columns; gap renders between them.</p>
    </section>
    <section class="panel" aria-label="Measurements">
      <h2>Measurements</h2>
      <div class="stats" id="stats"></div>
      <h2 style="margin-top:1.1rem">Spacing scale</h2>
      <div class="scale" id="scale"></div>
    </section>
  </div>

  <section class="panel" style="margin-top:1rem" aria-label="CSS output">
    <h2>CSS — ready to paste <button type="button" class="copy" id="copyCss" style="float:right">Copy</button></h2>
    <pre id="css"></pre>
  </section>

  <footer>Designer's Toolkit · B-TK-2 · no install, no network. Support: support@omniforge.example</footer>
</main>
<script>
/* ===== formulas (pure) ===== */
function gridMath(width, margin, cols, gap) {
  var content = width - margin * 2;
  var gutters = cols - 1;
  var gutterTotal = gutters * gap;
  var column = (content - gutterTotal) / cols;
  return {
    content: content, gutters: gutters, gutterTotal: gutterTotal,
    column: column, total: cols * column + gutterTotal,
    valid: content > 0 && column > 0
  };
}
function spacingScale(base) {
  var steps = [1, 2, 3, 4, 6, 8, 12, 16, 24], out = [], i;
  for (i = 0; i < steps.length; i++) out.push({ step: steps[i], px: steps[i] * base });
  return out;
}
function gridCss(width, margin, cols, gap, base, m) {
  var l = [];
  l.push(":root {");
  l.push("  --container: " + width + "px;");
  l.push("  --margin: " + margin + "px;");
  l.push("  --columns: " + cols + ";");
  l.push("  --gap: " + gap + "px;");
  l.push("  --column: " + (Math.round(m.column * 100) / 100) + "px; /* (" + m.content + " - " + m.gutterTotal + ") / " + cols + " */");
  l.push("  --space-1: " + base + "px;");
  l.push("}");
  l.push("");
  l.push(".layout {");
  l.push("  max-width: var(--container);");
  l.push("  margin-inline: auto;");
  l.push("  padding-inline: var(--margin);");
  l.push("}");
  l.push("");
  l.push(".grid {");
  l.push("  display: grid;");
  l.push("  grid-template-columns: repeat(var(--columns), minmax(0, 1fr));");
  l.push("  column-gap: var(--gap);");
  l.push("}");
  return l.join("\\n");
}
/* ===== app (dom) ===== */
var ids = ["width", "margin", "cols", "gap", "base"];
function vals() {
  var o = {};
  for (var i = 0; i < ids.length; i++) o[ids[i]] = parseFloat(document.getElementById(ids[i]).value);
  return o;
}
function render() {
  var v = vals(), m = gridMath(v.width, v.margin, v.cols, v.gap);
  var stats = document.getElementById("stats");
  if (!m.valid) {
    stats.innerHTML = '<p class="warn">Margins and gaps eat the whole container — no room for columns. Widen the container or shrink margin/gap.</p>';
    return;
  }
  var colR = Math.round(m.column * 100) / 100;
  stats.innerHTML =
    stat(colR + "px", "Column width") + stat(m.content + "px", "Content width") +
    stat(m.gutters + " × " + v.gap + "px", "Gutters") + stat(m.total + "px", "Grid total") +
    stat((v.margin * 2) + "px", "Total margin") + stat(m.column * 2 + "px", "2-col span") +
    stat(m.column * 6 + "px", "6-col span") + stat((m.column * 12 + v.gap * 11) + "px", "12-col full row");
  var box = document.getElementById("marginBox");
  var mp = (v.margin / v.width) * 100, gp = (v.gap / v.width) * 100, cp = (colR / v.width) * 100;
  box.style.width = (100 - mp * 2) + "%";
  box.style.paddingLeft = "0"; box.style.paddingRight = "0";
  var colsRow = document.getElementById("colsRow");
  colsRow.style.gap = gp + "%";
  var html = "";
  for (var c = 0; c < v.cols; c++) {
    html += '<div class="col" style="flex: 0 0 ' + cp + '%"><em>' + (c + 1) + "</em></div>";
  }
  colsRow.innerHTML = html;
  document.getElementById("css").textContent = gridCss(v.width, v.margin, v.cols, v.gap, v.base, m);
  var scale = spacingScale(v.base), chips = "";
  for (var s = 0; s < scale.length; s++) chips += "<span>--space-" + scale[s].step + ": " + scale[s].px + "px</span>";
  document.getElementById("scale").innerHTML = chips;
}
function stat(b, label) {
  return '<div class="stat"><b>' + b + "</b><span>" + label + "</span></div>";
}
for (var i = 0; i < ids.length; i++) document.getElementById(ids[i]).addEventListener("input", render);
var presets = document.querySelectorAll(".presets button");
for (var p = 0; p < presets.length; p++) presets[p].addEventListener("click", function (ev) {
  var parts = ev.currentTarget.getAttribute("data-p").split(",");
  for (var j = 0; j < ids.length; j++) document.getElementById(ids[j]).value = parts[j];
  render();
});
document.getElementById("copyCss").addEventListener("click", function (ev) {
  var btn = ev.currentTarget;
  function flash() { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy"; }, 1400); }
  var text = document.getElementById("css").textContent;
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(flash, flash);
  else flash();
});
render();
</script>
</body>
</html>
`,

  /* ── 02 Token exports ───────────────────────────────────────────── */

  "02-tokens/token-export.json": JSON.stringify(tokenExport, null, 2) + "\n",

  "02-tokens/font-pairing-bank.csv": `pairing,display_font,display_weight,body_font,body_weight,pairing_type,mood,best_for,notes
Editorial Classic,Playfair Display,700,Source Sans 3,400,serif+sans,editorial,long-form blogs,Use display 700 for H1 and H2; keep body at 1.6 line height
Neo-Grotesque System,Inter Tight,700,Inter,400,sans+sans,minimal,SaaS marketing,One family two cuts: tight for headlines and regular for body
Technical Modern,Space Grotesk,500,Inter,400,sans+sans,technical,dev tools and docs,Space Grotesk excels in code-adjacent interfaces
Humanist Warm,DM Serif Display,400,DM Sans,400,serif+sans,friendly,small business sites,DM Serif Display ships at 400 only; scale size instead of weight
Soft Contrast,Fraunces,600,Work Sans,400,serif+sans,playful,creative portfolios,Fraunces variable axes SOFT and WONK tune the mood per project
Academic Calm,Libre Baskerville,700,Montserrat,400,serif+sans,academic,research and education,Both run wide; pair with generous margins
Geometric Confident,Sora,700,Karla,400,sans+sans,modern,startup landing pages,Sora 700 reads best at 32px and above
Unified Quiet,Manrope,800,Manrope,400,sans+sans,minimal,product and design sites,Weight contrast 800 vs 400 does all the work
Storyteller,Lora,600,Open Sans,400,serif+sans,warm,newsletters,Lora italic 400 makes an excellent pull quote
Bold Statement,Archivo Black,400,Archivo,400,sans+sans,bold,event and campaign pages,Set Archivo Black with -1% letter spacing for posters
Craft Report,Bitter,700,Lato,400,serif+sans,sturdy,case studies,Slab display gives reports gravitas without feeling legal
Refined Luxury,Cormorant Garamond,600,Proza Libre,400,serif+sans,luxury,beauty and hospitality,Keep Cormorant at 500 or heavier below 36px
Art Direction,Syne,700,IBM Plex Sans,400,sans+sans,avant-garde,studios and galleries,Syne is a statement font; one headline per page
Tech Editorial,Epilogue,800,Epilogue,400,sans+sans,confident,B2B marketing,Variable font: interpolate any weight between 400 and 800
Art Deco Echo,Prata,400,Jost,400,serif+sans,elegant,fashion lookbooks,Prata at 400 large; avoid sizes under 28px
Friendly Bold,Abril Fatface,400,Poppins,400,display+sans,cheerful,food and lifestyle,Abril Fatface once per page (H1 only)
Poster Energy,Bebas Neue,400,Roboto,400,display+sans,loud,sports and promotions,Pair Bebas all-caps with 1.05 letter spacing
Accessible Default,Zilla Slab,600,Atkinson Hyperlegible,400,slab+sans,legible,government and health,Atkinson letterforms were designed for low vision
All-Access,Atkinson Hyperlegible,700,Atkinson Hyperlegible,400,sans+sans,legible,accessibility-first sites,Distinct letter shapes survive small sizes and glare
Civic Modern,Public Sans,800,Public Sans,400,sans+sans,institutional,public sector,The United States government design system family
Friendly Rounded,Red Hat Display,700,Red Hat Text,400,sans+sans,approachable,education and kids,Rounded terminals read warm without reading childish
Soft Serve,Cabin,700,Nunito,400,sans+sans,friendly,community platforms,Nunito 400 at 17px feels generous on long pages
Long Read,Newsreader,600,Source Sans 3,400,serif+sans,editorial,magazines,Newsreader optical sizes tune it for body or display
Indie Publishing,Vollkorn,700,Mulish,400,serif+sans,literary,essays and journals,Vollkorn bold carries long headlines without tiring
Bookish,Cardo,700,Karla,400,serif+sans,classic,book excerpts and libraries,Cardo ships Greek and Hebrew subsets for classicists
Future Retro,Unbounded,600,Manrope,400,display+sans,futuristic,web3 and gaming,Unbounded 600 maximum one hero line per page
Mono Header,Space Mono,700,Space Grotesk,400,mono+sans,technical,developer blogs,Mono headlines signal engineering culture instantly
Dev Docs,JetBrains Mono,700,Inter,400,mono+sans,technical,documentation,Disable ligatures in headings for clean search results
IBM Legacy,IBM Plex Mono,600,IBM Plex Sans,400,mono+sans,technical,enterprise dashboards,Plex families share metrics so alignment holds in mixed tables
Elegant Standard,Crimson Pro,600,Karla,400,serif+sans,refined,law and finance,Crimson Pro 600 also works for subheads
Vintage Shop,EB Garamond,600,Raleway,400,serif+sans,vintage,artisan and craft,Raleway numerals look sharp in prices and specs
Boutique,Josefin Sans,600,Lora,400,sans+serif,boutique,beauty salons,Inverted pairing: sans display over serif body
Street Smart,Chivo,700,Chivo,400,sans+sans,utilitarian,news and civic tech,Chivo covers 92 languages including Vietnamese
Clean Commerce,Outfit,700,Outfit,400,sans+sans,minimal,ecommerce,Geometric Outfit keeps product grids calm
Jakarta Fresh,Plus Jakarta Sans,700,Plus Jakarta Sans,400,sans+sans,modern,fintech,Originally commissioned for the Jakarta city brand
Hebrew-Aware,Frank Ruhl Libre,700,Assistant,400,serif+sans,multilingual,bilingual sites,Both cover Hebrew; test RTL layouts early
Roman Quiet,Marcellus,400,Karla,400,serif+sans,calm,wellness and spa,Marcellus is single weight; vary scale not weight
Franklin Grid,Libre Franklin,700,Libre Franklin,400,sans+sans,newsy,media sites,Nine weights available for dense editorial UI
Publisher,Alegreya,700,Alegreya Sans,400,serif+sans,literary,blogs,Designed as a paired superfamily; metrics align
Instrument Pair,Instrument Serif,400,Instrument Sans,400,serif+sans,contemporary,portfolios and studios,Matched x-height; swap display for body without reflow
`,

  /* ── 03 Formula cheatsheet ───────────────────────────────────────── */

  "03-formulas/wcag-contrast-cheatsheet.md": `# WCAG 2.2 contrast — the actual math

Every verdict in this kit comes from two formulas. No lookup tables, no
"eye-balling it" — this is the whole computation.

## Formula 1 — relative luminance

For each color, convert each sRGB channel (0–255) to a fraction
c = value / 255, linearize it, then take a weighted sum:

    L = 0.2126 · R + 0.7152 · G + 0.0722 · B

with each channel linearized as:

    c' = c / 12.92                 if c ≤ 0.03928
    c' = ((c + 0.055) / 1.055)^2.4 otherwise

The weights are the reciprocal of the sRGB primaries' contribution to
perceived lightness. Pure black → L = 0; pure white → L = 1.

## Formula 2 — contrast ratio

    C = (L1 + 0.05) / (L2 + 0.05)

where L1 is the lighter of the two colors. The 0.05 floor accounts for
display flare — it is why contrast never reaches infinity and why black
on white tops out at exactly 21:1 (1.05 / 0.05).

## Worked example — #2563EB (link blue) on #FFFFFF

1. Channels: R = 0x25 = 37, G = 0x63 = 99, B = 0xEB = 235.
2. Fractions: 0.145098, 0.388235, 0.921569 — all above 0.03928, so
   each takes the power branch.
3. Linearized: R' = 0.018500, G' = 0.124772, B' = 0.830770.
4. L = 0.2126 · 0.018500 + 0.7152 · 0.124772 + 0.0722 · 0.830770
     = 0.153152
5. White: L = 1.000000.
6. C = (1.000000 + 0.05) / (0.153152 + 0.05) = 1.05 / 0.203152
     = 5.17:1 → **passes AA for normal text** (4.5), fails AAA (7).

## Second example — the gray that quietly fails

#777777 on white: L = 0.184475 → C = 1.05 / 0.234475 = 4.48:1 —
**fails AA for normal text by 0.02**. One step darker, #767676
(L = 0.181164), gives 4.54:1 and passes. #767676 is the lightest
single gray that passes AA on white; memorize it as your floor for
muted body text.

## The thresholds

| Check | Ratio | Applies to |
| --- | --- | --- |
| AA · normal text (§1.4.3) | ≥ 4.5:1 | under 24px, or under 18.66px bold |
| AA · large text (§1.4.3) | ≥ 3:1 | ≥ 24px, or ≥ 18.66px at 700 |
| AAA · normal text (§1.4.6) | ≥ 7:1 | same as AA normal |
| AAA · large text (§1.4.6) | ≥ 4.5:1 | same as AA large |
| Non-text contrast (§1.4.11) | ≥ 3:1 | borders, icons, focus rings, chart strokes |

"Large text" means ≥ 24px regular or ≥ 18.66px (14pt) bold. The
non-text rule (new-ish in 2.x, clarified in 2.2) is the one teams
forget: a 1px gray input border must still clear 3:1 against both the
field background and the page behind it.

## Reference pairs (all verified with the formulas above)

| Pair | Ratio | Verdict |
| --- | --- | --- |
| #000000 on #FFFFFF | 21.00:1 | everything passes |
| #0F172A on #FFFFFF | 17.85:1 | AAA |
| #334155 on #FFFFFF | 10.35:1 | AAA |
| #CBD5E1 on #0F172A | 12.02:1 | AAA (dark mode body) |
| #FACC15 on #111827 | 11.58:1 | AAA (highlight on dark) |
| #1D4ED8 on #FFFFFF | 6.70:1 | AA normal |
| #B91C1C on #FFFFFF | 6.47:1 | AA normal |
| #2563EB on #FFFFFF | 5.17:1 | AA normal |
| #15803D on #FFFFFF | 5.02:1 | AA normal |
| #64748B on #FFFFFF | 4.76:1 | AA normal — muted-text floor |
| #767676 on #FFFFFF | 4.54:1 | AA normal — the lightest passing gray |
| #777777 on #FFFFFF | 4.48:1 | fail (classic off-by-one) |
| #FF0000 on #FFFFFF | 4.00:1 | fails AA normal, passes large |
| #2563EB on #DBEAFE | 4.24:1 | fails AA normal — chip needs #1D4ED8 (5.49:1) |

## Five pitfalls the formulas catch

1. **Opacity is not contrast.** gray-500 at 60% opacity over white is a
   *blend*, not gray-500. The checker needs the blended hex — the color
   pair generator's tint function computes these blends for you.
2. **Gradients.** Measure contrast at the lightest and darkest stops,
   then the midpoints where text actually sits. One ratio per band.
3. **Dark mode is a separate audit.** Inverting colors does not invert
   the ratio. #94A3B8 on #0F172A = 6.96:1 (AA) — but the same gray on
   #1E293B drops below 4.5.
4. **Focus rings.** A blue ring on a blue button fails §1.4.11 even
   when the button's text passes. Check ring vs button AND ring vs
   page, take the worse one.
5. **Same-hue pairs lie to the eye.** Red on black can *look* vivid at
   2.9:1. The formula does not care how it looks.

## Verify it yourself

Open \`01-instruments/contrast-checker.html\`, paste any pair, and open
"The math for this pair" — it prints the linearized channels, both
luminance values, and the substituted ratio expression, so you can
check every number against this sheet.
`,

  /* ── 04 Setup guide ──────────────────────────────────────────────── */

  "04-setup/setup-guide.md": `# Setup guide — Designer's Toolkit

Everything here runs by double-click. No install, no build step, no
account, no network. This guide is the 30-minute path from download
to a design system with verified contrast.

## What's in the pack

- \`01-instruments/contrast-checker.html\` — WCAG 2.2 contrast math with
  live swatches, verdicts for AA/AAA normal + large text and UI
  components (§1.4.11), and a per-pair math readout
- \`01-instruments/color-pair-generator.html\` — feed it one base color,
  get AA-safe fg/bg pairings with copy-ready CSS
- \`01-instruments/grid-tool.html\` — column/spacing calculator with a
  to-scale visual preview and paste-ready CSS custom properties
- \`02-tokens/token-export.json\` — the palette as design tokens: 18
  pre-verified accessible pairs, spacing scale, type scale, radii,
  shadows, breakpoints
- \`02-tokens/font-pairing-bank.csv\` — 40 font pairings (display +
  body) with weights, moods and best-use notes
- \`03-formulas/wcag-contrast-cheatsheet.md\` — the actual formulas with
  two worked examples and 14 verified reference pairs

## The 30-minute setup

### 1. Open the instruments (5 min)

Double-click each file in \`01-instruments/\`. They open in any modern
browser. Try the presets in the grid tool ("Desktop 12-col", "Blog
720", "Mobile 360") to see the live preview react.

### 2. Audit your current palette (10 min)

Open the contrast checker. Paste your text color and background —
copy the hex values straight from your CSS. The ratio and the five
verdicts update as you type. Anything failing AA normal for body
text goes on the fix list.

Repeat for: body text, secondary text, links, buttons, borders and
focus rings (the UI row, §1.4.11 — 3:1). Most palettes fail on
muted text and borders, not on body copy.

### 3. Fix the failures (10 min)

Open the color-pair-generator and paste the failing base color.
Pick the mode (base as background, or base as text color) and it
builds pairings that clear 4.5:1, ranked by ratio, each with a
Copy CSS button. Use the "Card pattern" pairing for surfaces.

### 4. Wire the tokens and fonts (5 min)

Import the values from \`token-export.json\` as CSS custom properties
(\`--color-text: #0F172A\` …) or tokens in Figma/Tailwind. Every pair
in \`accessiblePairs\` already passes; the three entries in
\`knownFails\` document the traps they replace.

Pick one pairing from \`font-pairing-bank.csv\` — filter the \`mood\`
and \`best_for\` columns to your project type. Every font listed is
on Google Fonts, so prototyping is free.

## Rules that make the tools work

1. **4.5 for body, 3 for large and UI, 7 if you want AAA.** The
   thresholds are not stylistic — they are in the cheatsheet with the
   math that produces them.
2. **Check both modes.** A pair that passes in light mode has no
   dark-mode guarantee. Run the checker twice with your dark palette
   (the token file ships a verified dark pair set).
3. **Test with real content.** "Aa" swatches hide kerning and stroke
   issues — paste a real sentence into the live swatch panel.
4. **#767676 is your floor.** The lightest gray that passes AA on
   white. If your muted text is lighter, it fails.
5. **Grids: content first.** Column width = (content − gap·(cols−1))
   / cols. Set container, margin, columns and gap in the grid tool
   and read the exact column width before you design a single
   component.

## Troubleshooting

- **"The generator only offers black or white text for my color"** —
  your base sits near the middle of the luminance range, where shaded
  and tinted text variants fall under 4.5:1. That is correct math, not
  a bug: black and white are the only survivors. Use the tint-surface
  pairings (ink text on a tint of the base) or shift the base.
- **"My hex shows 3-digit form (#25F)"** — the checker accepts both;
  it normalizes to 6-digit and prints the expanded value.
- **"Do these work on mobile?"** — yes; all three instruments are
  plain HTML with a viewport meta tag and reflow under 720px.
- **"Can I check alpha colors?"** — blend them onto the background
  first (the cheatsheet's pitfall #1); the color pair generator's
  tint function does the blend for its own candidates.

## Files reference

| Path | What it is |
| --- | --- |
| \`01-instruments/*.html\` | 3 working instruments (offline) |
| \`02-tokens/token-export.json\` | tokens + 18 verified pairs + 3 documented fails |
| \`02-tokens/font-pairing-bank.csv\` | 40 font pairings |
| \`03-formulas/wcag-contrast-cheatsheet.md\` | formulas, worked examples, reference table |
| \`04-setup/*\` | this guide + walkthrough link |
`,

  "04-setup/walkthrough-link.md": `# Walkthrough

An 8-minute video walkthrough of this kit — every instrument shown
end-to-end on a real (failing) palette:

**→ https://omniforge.example/walkthroughs/B-TK-2**

Contents:
- 00:00 — What's in the download; the 30-minute plan
- 00:45 — Contrast checker: the formula, verdicts, live swatches
- 02:40 — Auditing a real palette; the muted-text trap
- 04:10 — Color pair generator: fixing a failing brand blue
- 05:30 — Grid tool: 12-col desktop, 6-col blog, 4-col mobile
- 06:45 — Token export into CSS custom properties
- 07:30 — Picking a font pairing from the bank

The video is hosted (not bundled) so the pack stays under 5 MB.
`,

  /* kit stub note for the extended pack */
  "EXTENDED-PACK/figma-plugin-starter.md": `# Figma plugin starter — in production

Status: **in production** — not in this archive.

What the finished file will contain: a Figma plugin starter wired to
the same token export format as \`02-tokens/token-export.json\` — a
\`manifest.json\`, a UI that imports the token file, and handlers that
rebuild Figma color and text styles from the \`accessiblePairs\`
entries, so every AA-safe pairing in this kit syncs straight into
your library. Ships with a one-command build and a 3-minute setup
video.
`,
};

/* ── Try-it demo — the flagship instrument, same math ─────────────── */

export const demo: DemoContent = {
  kind: "tool",
  tool: "contrast",
  intro:
    "This is the contrast checker from 01-instruments, running with the exact WCAG 2.2 formula that ships in the download: L = 0.2126R + 0.7152G + 0.0722B, C = (L1 + 0.05) / (L2 + 0.05). Pick a preset or paste a hex pair — presets carry {fg, bg} payloads.",
  presets: [
    {
      label: "Link blue on white — 5.17:1, AA for normal text",
      payload: { fg: "#2563EB", bg: "#FFFFFF" },
    },
    {
      label: "Faded gray on gray — 2.43:1, fails every threshold",
      payload: { fg: "#9CA3AF", bg: "#F9FAFB" },
    },
    {
      label: "Amber on near-black — 11.58:1, AAA everywhere",
      payload: { fg: "#FACC15", bg: "#111827" },
    },
  ],
};
