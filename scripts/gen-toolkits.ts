/* Generates B-TK-3 + B-TK-4 kit-content modules. Run: bun scripts/gen-toolkits.ts */
import { writeFileSync } from "node:fs";

const ROOT = "/home/z/my-project/src/components/omniforge/kit-content";

/* Shared instrument shell (same design system as B-TK-1). */
const SHELL = (title: string, body: string, script: string) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} — OMNIFORGE Toolkit</title>
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
  <h1>${title}</h1>
  <p class="sub">OMNIFORGE · runs offline · no data leaves this page</p>
${body}
  <footer>OMNIFORGE Toolkit — Edition 2026 · keyboard accessible · zero dependencies</footer>
</main>
<script>
${script}
</script>
</body>
</html>`;

const esc = (s: string) => s.replace(/`/g, "\\`").replace(/\$\{/g, "\\${");

/* ═══════════════ B-TK-3 · Developer's Toolkit ═══════════════ */

const tk3 = `/* ════════════════════════════════════════════════════════════════════
   B-TK-3 · Developer's Toolkit — 3 working offline instruments, a
   32-snippet bank, regex fixtures. The Try-it demo runs the regex
   tester's exact engine.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-TK-3";

export const files: Record<string, string> = {
${[
  ["01-instruments/regex-tester.html", SHELL("Regex Tester",
  `  <label for="p">Pattern</label>
  <input id="p" type="text" value="\\\\b(\\\\w+)@(\\\\w+\\\\.\\\\w+)\\\\b" spellcheck="false">
  <div class="row">
    <div><label for="f">Flags</label><input id="f" type="text" value="g"></div>
    <div><label for="in">Input</label><input id="in" type="text" value="maya@forge.io, jonas@hey.com"></div>
  </div>
  <div class="card"><pre id="out" aria-live="polite"></pre></div>
  <div class="card"><table aria-label="Capture groups"><thead><tr><th>Match</th><th>Index</th><th>Groups</th></tr></thead><tbody id="tbl"></tbody></table></div>`,
  `"use strict";
var el=function(i){return document.getElementById(i)};
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")}
function render(){
  var out=el("out"),tbl=el("tbl");out.innerHTML="";tbl.innerHTML="";
  try{
    var flags=el("f").value.replace(/[^gimsuy]/g,"")||"g";
    var re=new RegExp(el("p").value,flags);
    var input=el("in").value,rows="",m,count=0,guard=0;
    if(flags.includes("g")){while((m=re.exec(input))&&guard++<2000){rows+="<tr><td>"+esc(m[0])+"</td><td>"+m.index+"</td><td>"+(m.slice(1).map(esc).join(" · ")||"—")+"</td></tr>";if(m[0]==="")re.lastIndex++;count++;}}
    else{m=re.exec(input);if(m){rows="<tr><td>"+esc(m[0])+"</td><td>"+m.index+"</td><td>"+(m.slice(1).map(esc).join(" · ")||"—")+"</td></tr>";count=1;}}
    out.innerHTML=input.replace(re,function(mt){return "<mark>"+esc(mt)+"</mark>"});
    if(!count)out.innerHTML=esc(input)+"\\n<span class='warn'>— no matches</span>";
    tbl.innerHTML=rows;
  }catch(e){out.innerHTML="<span class='bad'>"+esc(e.message)+"</span>";}
}
["p","f","in"].forEach(function(i){el(i).addEventListener("input",render)});
render();`)],

  ["01-instruments/json-formatter.html", SHELL("JSON Formatter & Validator",
  `  <label for="in">JSON input</label>
  <textarea id="in" rows="10" placeholder='{"paste":"your JSON"}'>{ "user": { "name": "Maya", "roles": ["admin","editor"], "active": true } }</textarea>
  <div class="row" style="margin-top:14px">
    <button class="btn" id="fmt">Format (2-space)</button>
    <button class="btn" id="min" style="background:var(--dim)">Minify</button>
  </div>
  <div class="card"><pre id="out" aria-live="polite"></pre></div>`,
  `"use strict";
var el=function(i){return document.getElementById(i)};
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")}
function run(min){
  try{
    var v=JSON.parse(el("in").value);
    var s=min?JSON.stringify(v):JSON.stringify(v,null,2);
    el("out").innerHTML="<span class='ok'>valid JSON ✓ ("+s.length+" chars"+(min?" minified":"")+")</span>\\n"+esc(s);
  }catch(e){
    var pos=(e.message.match(/position (\\\\d+)/)||[])[1];
    var hint=pos?" — near char "+pos+" (line "+(el("in").value.slice(0,+pos).split("\\n").length)+")":"";
    el("out").innerHTML="<span class='bad'>"+esc(e.message)+hint+"</span>";
  }
}
el("fmt").onclick=function(){run(false)};
el("min").onclick=function(){run(true)};
el("in").addEventListener("input",function(){run(false)});
run(false);`)],

  ["01-instruments/snippet-library.html", SHELL("Snippet Library",
  `  <label for="q">Search 32 snippets</label>
  <input id="q" type="text" placeholder="react hook, git, css…">
  <div class="card"><table aria-label="Snippets"><tbody id="tbl"></tbody></table></div>
  <div class="card"><pre id="code">Click a snippet to view it. Arrow keys navigate.</pre></div>`,
  `"use strict";
var el=function(i){return document.getElementById(i)};
var esc=function(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")};
var SNIPPETS=/*__SNIPPETS__*/;
var sel=0;
function render(){
  var q=el("q").value.toLowerCase();
  var hits=SNIPPETS.filter(function(s){return !q||(s.title+" "+s.tags+" "+s.code).toLowerCase().includes(q)});
  el("tbl").innerHTML=hits.map(function(s,i){
    return '<tr tabindex="0" data-i="'+i+'"><td><b>'+esc(s.title)+'</b><br><span style="color:var(--dim);font-size:12px">'+esc(s.tags)+'</span></td></tr>';
  }).join("")||'<tr><td style="color:var(--dim)">No matches</td></tr>';
  Array.prototype.forEach.call(el("tbl").querySelectorAll("tr"),function(tr){
    tr.onclick=function(){sel=+tr.dataset.i;show(hits)};
    tr.onkeydown=function(e){if(e.key==="Enter")tr.click()};
  });
  window._hits=hits;show(hits);
}
function show(hits){if(hits[sel])el("code").textContent=hits[sel].code;}
el("q").addEventListener("input",function(){sel=0;render()});
document.addEventListener("keydown",function(e){
  if(e.key==="ArrowDown"&&window._hits[sel+1]){sel++;show(window._hits)}
  if(e.key==="ArrowUp"&&window._hits[sel-1]){sel--;show(window._hits)}
});
render();`)],
].map(([p, html]) => `  ${JSON.stringify(p)}: \`${esc(html)}\`,`).join("\n")}

  "02-fixtures/snippet-bank.json": /*__SNIPPET_JSON__*/,

  "02-fixtures/regex-fixtures.csv": ${JSON.stringify(`pattern,flags,test_input,expected_matches
^\\\\w+$,g,hello world,2
\\\\d{3}-\\\\d{4},,call 555-0199 or 555-0188,555-0199;555-0188
(?i)error,g,Error ERROR error,3
https?://[^\\\\s]+,,see https://a.io and http://b.io,https://a.io;http://b.io
\\\\b\\\\d{2}:\\\\d{2}\\\\b,,meet at 10:30 not 1030,10:30
^[A-Z][a-z]+$,g,Maya jonas Priya,2
(?<year>\\\\d{4})-(?<month>\\\\d{2}),,2026-10-26 and 2025-09-01,2026-10;2025-09
\\\\{\\\\{.+?\\\\}\\\\},,Hi {{name}} from {{company}},{{name}};{{company}}
(?<=@)\\\\w+\\\\.\\\\w+,g,maya@forge.io jonas@hey.com,forge.io;hey.com
\\\\s{2,},g,"a  b   c",a b c (after replace)
^#,gm,"# h1\\n## h2\\nbody",2
\\\\b\\\\d+(?:\\\\.\\\\d+)?%$,g,up 12% flat 3.5x down 8%,12%
[$]{1}[a-z]+,g,cost $99 and $149,99;149
\\\\\\\\n,,line1\\\\nline2,1
\\\\b(\\\\w+)\\\\s+\\\\1\\\\b,gi,"the the and and once",the the;and and
<(\\\\w+)[^>]*>.*?</\\\\1>,g,"<b>bold</b><i>it</i>",2
^\\\\s+|\\\\s+$,gm," padded ",strip both ends
[AEIOU],g,Alphabet,2
\\\\d(?=px),g,12px 3em 44px,2
(\\\\d+)x(\\\\d+),,sizes 1280x800 and 640x400,2
^(?:[a-z-]+\\\\.)+[a-z]{2,}$,,forge.io,1
\\\\bx\\\\w*,gi,"x64 box Xylophone next",3
(?<!\\\\$)\\\\b\\\\d{2}\\\\b,,7 42 $42 100,42;100 via boundary
#[0-9a-fA-F]{6},g,color #E7C982 and #b8913f,#E7C982;#b8913f
"trailing\\\\.\\\\.\\\\.",,ends with trailing...,1
\\\\bTODO\\\\b,g,"TODO: fix // TODO more",2
^\\\\s*- \\\\[[ x]\\\\],gm,"- [ ] a\\n- [x] b",2
(?s)<script.*?</script>,,"<script>a</script> body",1
\\\\b\\\\d{1,3}(?:,\\\\d{3})+,,1,000 and 12,345,2
^-+$,gm,"---\\n***","1 (dashes only)
(\\\\w+)@(\\\\w+),g,maya@forge jonas@hey,maya@forge;jonas@hey
\\\\b\\\\d+(am|pm)\\\\b,,at 10am or 3pm,2
(?i)^re:.*,gm,"Re: hello\\nFwd: hi",1`)},

  "03-formulas/regex-cheatsheet.md": \`${esc(`# Regex cheatsheet — the working set

The 20% of regex that handles 95% of real matching work. Every entry
was chosen because it appears in the fixtures file — test each one
live in \`regex-tester.html\` while you read.

## Anchors & boundaries

| Pattern | Meaning | Fixture |
| --- | --- | --- |
| \`^…$\` | full-string match | \`^\\\\w+$\` — "hello world" fails, "hello" passes |
| \`\\\\b\` | word boundary | \`\\\\b\\\\d{2}:\\\\d{2}\\\\b\` finds "10:30" but not "1030" |
| \`m\` flag | \`^\` / \`$\` match per line | \`^#\` matches every heading line |

## The lookaround pair people mix up

- \`(?=…)\` **lookahead** — position followed by: \`\\\\d(?=px)\` finds digits only before "px"
- \`(?<=…)\` **lookbehind** — position preceded by: \`(?<=@)\\\\w+\` finds domains in emails
- Neither consumes characters — that's why they're perfect for extraction without splitting.

## Groups

| Syntax | What it does | When |
| --- | --- | --- |
| \`(…)\` | capturing group | you need the value back (replace, extract) |
| \`(?:…)\` | non-capturing | grouping only — keep your group indexes clean |
| \`(?<name>…)\` | named group | more than 2 groups; readability wins |
| \`\\\\1\` | backreference | repeated words: \`\\\\b(\\\\w+)\\\\s+\\\\1\\\\b\` |

## Quantifiers, greedily misunderstood

- \`*\` and \`+\` are **greedy**; add \`?\` for lazy: \`<.+?>\` stops at the first \`>\`, \`<.+>\` swallows to the last
- Lazy quantifiers are the #1 fix for HTML-matching regexes (still: parse HTML with a parser, regex for quick scrapes only)
- \`{2,}\` = "two or more" — \`\\\\s{2,}\` collapses runs of spaces

## Replace patterns worth memorising

\`\`\`
"$1 $2"        →  reorder groups
"[$1]"         →  wrap a capture
"$1x$2"        →  "1280x800" from (\\\\d+)x(\\\\d+)
""             →  delete matches (strip comments, blank lines)
\`\`\`

## The five-step debugging method

1. Reproduce with the smallest input that still fails
2. Drop to \`g\` + no groups — does the pattern itself match?
3. Add one group at a time back
4. Suspect greediness before complexity
5. When it works, add a fixture row — patterns without tests decay
`)}
\`,

  "04-setup/setup-guide.md": \`${esc(`# Setup guide — Developer's Toolkit

Three instruments, zero install, all offline.

| File | What it does |
| --- | --- |
| \`01-instruments/regex-tester.html\` | live pattern testing, highlighting, capture-group table |
| \`01-instruments/json-formatter.html\` | format / validate / minify with error position |
| \`01-instruments/snippet-library.html\` | searchable snippet viewer over the bank |

## The 10-minute first run

1. Open \`regex-tester.html\`. Paste a pattern you use often; add a
   fixture row for it in \`02-fixtures/regex-fixtures.csv\` — the
   fixtures file is your team's regression suite for patterns.
2. Open \`json-formatter.html\` with your worst API response. The
   error line/column readout finds the missing comma faster than
   staring does.
3. Open \`snippet-library.html\`. Search your language. The 32-snippet
   bank covers the daily carries (git, hooks, bash one-liners);
   replace them with your own — the JSON schema is one array of
   \`{title, tags, code}\`.

## Editing the snippet bank

\`02-fixtures/snippet-bank.json\` is plain JSON. Add yours, keep the
three fields, keep tags lowercase and comma-separated. The library
reads the same array — no build step, refresh and search.

## Rules of the road

- The instruments never touch the network — safe on locked-down
  machines and air-gapped networks
- If a fixture disagrees with the tester, the fixture wins (browsers
  differ); file it at support@omniforge.example
`)}
\`,

  "04-setup/walkthrough-link.md": \`${esc(`# Walkthrough

A 5-minute video tour of the three instruments:

**→ https://omniforge.example/walkthroughs/B-TK-3**

Contents:
- 00:00 — Regex tester: groups, lookarounds, the 5-step debug method
- 01:40 — JSON formatter: error positions, minify mode
- 03:00 — Snippet library: search, keyboard nav, growing the bank
- 04:10 — Building your fixtures file into a regression suite

Hosted (not bundled) to keep the kit lightweight.
`)}
\`,

  "EXTENDED-PACK/vscode-snippets-export.md": \`${esc(`# VS Code snippets export — in production

Status: **in production** — not in this archive.

What the finished file will contain: the full snippet bank exported as
a VS Code snippets JSON payload — \`prefix\`, \`body\` with \`$1/$2\`
tabstops, and \`description\` — plus per-language files (\`html.json\`,
\`javascript.json\`, \`shell.json\`) ready for the User Snippets folder.
`)}
\`,
};

export const demo: DemoContent = {
  kind: "tool",
  tool: "regex",
  intro:
    "Run the flagship instrument — the regex tester's engine, live in this tab. Flags, highlights and capture groups work exactly like the downloadable HTML tool.",
  presets: [
    { label: "Email extraction", payload: { pattern: "\\\\b(\\\\w+)@(\\\\w+\\\\.\\\\w+)\\\\b", flags: "g", testInput: "maya@forge.io, jonas@hey.com — not maya@forge" } },
    { label: "Merge-field finder", payload: { pattern: "\\\\{\\\\{(.+?)\\\\}\\\\}", flags: "g", testInput: "Hi {{name}} from {{company}} — sent {{date}}" } },
    { label: "Time matcher", payload: { pattern: "\\\\b\\\\d{2}:\\\\d{2}\\\\b", flags: "g", testInput: "meet at 10:30, not 1030, ok? 14:45 works" } },
  ],
};
`;

/* Snippet bank (shared JSON between the library instrument + fixture file) */
const SNIPPETS = [
  ["Debounce", "js,utility", `function debounce(fn, ms = 200) {\n  let t;\n  return (...args) => {\n    clearTimeout(t);\n    t = setTimeout(() => fn(...args), ms);\n  };\n}`],
  ["Throttle", "js,utility", `function throttle(fn, ms = 200) {\n  let last = 0;\n  return (...args) => {\n    const now = Date.now();\n    if (now - last >= ms) { last = now; fn(...args); }\n  };\n}`],
  ["Deep clone", "js,utility", `const deepClone = (o) => structuredClone(o);`],
  ["Group by", "js,array", `const groupBy = (arr, key) =>\n  arr.reduce((acc, x) => ((acc[x[key]] ??= []).push(x), acc), {});`],
  ["Unique by", "js,array", `const uniqueBy = (arr, key) => [...new Map(arr.map(x => [x[key], x])).values()];`],
  ["Sleep", "js,async", `const sleep = (ms) => new Promise(r => setTimeout(r, ms));`],
  ["Fetch with timeout", "js,async,fetch", `async function fetchTimeout(url, ms = 8000, opts = {}) {\n  const c = new AbortController();\n  const t = setTimeout(() => c.abort(), ms);\n  try { return await fetch(url, { ...opts, signal: c.signal }); }\n  finally { clearTimeout(t); }\n}`],
  ["Retry with backoff", "js,async", `async function retry(fn, tries = 3, base = 300) {\n  for (let i = 0; i < tries; i++) {\n    try { return await fn(); }\n    catch (e) { if (i === tries - 1) throw e; await sleep(base * 2 ** i); }\n  }\n}`],
  ["useEffect cleanup", "react,hooks", `useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);`],
  ["useDebouncedValue", "react,hooks", `function useDebouncedValue(value, ms = 300) {\n  const [v, setV] = useState(value);\n  useEffect(() => { const t = setTimeout(() => setV(value), ms); return () => clearTimeout(t); }, [value, ms]);\n  return v;\n}`],
  ["useLocalStorage", "react,hooks", `function useLocalStorage(key, initial) {\n  const [v, setV] = useState(() => {\n    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }\n    catch { return initial; }\n  });\n  useEffect(() => localStorage.setItem(key, JSON.stringify(v)), [key, v]);\n  return [v, setV];\n}`],
  ["Refs before paint", "react,hooks", `const ref = useRef(null);\nuseLayoutEffect(() => { /* measure DOM before paint */ }, []);`],
  ["Error boundary hook", "react,error", `const [err, reset] = useErrorBoundary();\n// wrap risky children; call reset() in a retry button`],
  ["Git undo last commit", "git", `git reset --soft HEAD~1   # keep changes staged\ngit reset HEAD~1          # keep changes unstaged\ngit reset --hard HEAD~1    # discard (careful)`],
  ["Git save stray work", "git", `git stash push -m "wip: before rebase"\ngit stash list\ngit stash pop`],
  ["Git fix last message", "git", `git commit --amend -m "new message"`],
  ["Git find the culprit", "git", `git log -S "theStringThatDisappeared" --oneline`],
  ["Git sync fork", "git", `git fetch upstream\ngit rebase upstream/main\ngit push -f origin main`],
  ["Bash serve a folder", "bash,http", `python3 -m http.server 8080          # or:\nbun x serve -l 8080`],
  ["Bash kill port holder", "bash,process", `lsof -ti:3000 | xargs kill -9`],
  ["Bash count lines by type", "bash,count", `git ls-files '*.ts' '*.tsx' | xargs wc -l | tail -1`],
  ["Bash find big files", "bash,git", `git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | awk '/^blob/ {print $3, $4}' | sort -rn | head`],
  ["CSS grid responsive cards", "css,layout", `.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr));\n  gap: 1rem;\n}`],
  ["CSS fluid type", "css,typography", `h1 { font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3.5rem); }`],
  ["CSS truncate two lines", "css,text", `.clamp-2 {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}`],
  ["CSS center anything", "css,layout", `.center { display: grid; place-items: center; }`],
  ["Focus-visible only", "css,a11y", `:focus { outline: none; }\n:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }`],
  ["Prefers reduced motion", "css,a11y,motion", `@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }\n}`],
  ["SQL latest per group", "sql", `SELECT DISTINCT ON (user_id) user_id, created_at, action\nFROM events\nORDER BY user_id, created_at DESC;`],
  ["SQL date bucketing", "sql,dates", `SELECT date_trunc('week', created_at) AS week, count(*)\nFROM signups GROUP BY 1 ORDER BY 1;`],
  ["URLSearchParams", "js,dom", `const params = new URLSearchParams(location.search);\nconst page = +(params.get("page") ?? 1);`],
  ["Clipboard write", "js,dom", `await navigator.clipboard.writeText(text);\n// requires user gesture + secure context`],
];

const snippetJson = JSON.stringify(
  SNIPPETS.map(([title, tags, code]) => ({ title, tags, code })),
  null,
  2
);

const tk3Out = tk3
  .replace("/*__SNIPPETS__*/", snippetJson)
  .replace("/*__SNIPPET_JSON__*/", JSON.stringify(snippetJson));
writeFileSync(`${ROOT}/B-TK-3/content.ts`, tk3Out);
console.log("B-TK-3 written,", tk3Out.length, "chars");

/* ═══════════════ B-TK-4 · Content Writer's Toolkit ═══════════════ */

const POWER_WORDS = [
  "proven", "guaranteed", "instant", "free", "new", "now", "today", "exclusive", "limited", "secret",
  "surprising", "honest", "simple", "fast", "easy", "powerful", "practical", "essential", "complete", "definitive",
  "ultimate", "critical", "effective", "reliable", "smart", "exact", "precise", "direct", "bold", "fearless",
  "little-known", "overlooked", "underrated", "hidden", "unexpected", "counterintuitive", "unfair", "brutal", "painful", "expensive",
  "cheap", "worth", "value", "save", "earn", "win", "avoid", "stop", "start", "begin",
  "build", "create", "launch", "ship", "grow", "scale", "double", "triple", "halve", "cut",
  "boost", "increase", "improve", "master", "unlock", "discover", "reveal", "expose", "transform", "fix",
  "debug", "audit", "test", "verify", "measure", "track", "predict", "plan", "system", "framework",
  "checklist", "template", "playbook", "blueprint", "roadmap", "shortcut", "speedrun", "guide", "handbook", "manual",
  "mistake", "warning", "myth", "lie", "truth", "reason", "why", "because", "before", "after",
];
const POWER_CSV =
  "word,category\n" + POWER_WORDS.map((w) => `${w},${""}`).join("\n").replace(/,($|\n)/gm, "$1") + "\n";
// give each word a category column properly:
const CATEGORIES = ["trust", "urgency", "curiosity", "value", "action", "emotion", "specificity"];
const powerCsv =
  "word,category\n" +
  POWER_WORDS.map((w, i) => `${w},${CATEGORIES[i % CATEGORIES.length]}`).join("\n") +
  "\n";

const FORMULAS_CSV = `formula,example,why_it_works
How to {outcome} without {pain},"How to publish daily without burning out","Desire + objection removal in one line"
The {adjective} guide to {topic},"The honest guide to pricing","Promise of depth + a personality hook"
{number} {things} that {result},"7 habits that quietly compound","Numbered + specific outcome; odd numbers test better"
Why your {thing} {problem},"Why your landing page leaks signups","Names the reader's pain; self-diagnosis instinct"
{thing} vs {thing}: {verdict},"Renting vs buying tools: the real math","Pre-made comparison intent; captures search"
The {timeframe} {thing} that {result},"The 10-minute audit that doubles conversions","Time-boxed promise lowers commitment cost"
Stop {doing} {thing}. Do {this} instead,"Stop guessing prices. Charge by value, not hours","Pattern interrupt + directive fix"
What nobody tells you about {topic}","What nobody tells you about freelance rates","Curiosity gap + insider framing"
I {verb} {thing} — here's what happened,"I raised my rates 40% — here's what happened","Story + specific number = credibility"
The {mistake} I made for {timeframe},"The pricing mistake I made for 3 years","Vulnerability; readers feel smart avoiding it"
Before you {action}, read this,"Before you redesign your site, read this","Interruption of a planned action; utility promise"
{group} are doing {thing}. Are you?,"Your competitors are shipping weekly. Are you?","Social proof + loss aversion"
The fastest way to {outcome},"The fastest way to your first 100 subscribers","Speed promise; verifiable in the body"
{tool} for {job}: the complete setup,"Notion for freelancers: the complete setup","Tool+use-case; captures both searches"
How {expert} {does thing},"How a solo founder runs 3 products","Borrowed authority; method extraction"
{number} lessons from {experience}","9 lessons from a failed product launch","Numbered list + honest failure hook"
The {adjective} truth about {topic}","The uncomfortable truth about growth hacks","Curiosity + honesty positioning"
You're doing {thing} wrong (here's the fix),"You're writing subject lines wrong","Bold claim; must deliver in body or backfires"
From {before} to {after} in {timeframe}","From zero to first client in 30 days","Transformation arc + time-box"
Every {thing} you need to {outcome},"Everything you need to launch a course","Completeness promise; great for pillar pages"
The one-{thing} that {result},"The one habit that changed my focus","Radical simplification; curiosity about which"
What {group} gets wrong about {topic}","What agencies get wrong about positioning","Group call-out + contrarian promise"
{topic}: a field guide","SEO in 2026: a field guide","Evergreen reference framing"
This is your sign to {action}","This is your sign to raise your prices","Meme-adjacent momentum; timely"
The {adjective}-{er} {thing} (for {group}),"The 2-hour newsletter (for busy founders)","Specificity: time, outcome, audience"
Nobody {verbs} {thing} anymore — and it works,"Nobody cold-calls anymore — and it works","Contrarian + nostalgia curiosity"
Read this if {situation}","Read this if your pipeline is empty","Self-selection; zero hype"
{thing} is dead. Long live {thing}","The funnel is dead. Long live the flywheel","Provocative; debate-bait"
The math behind {topic}","The math behind the 4-day work week","Numbers promise; rational audience"
A {timeframe} experiment: {thing},"A 30-day experiment: no meetings","Experiment framing = permission to be honest"
The anti-{conventional} {thing},"The anti-hustle productivity system","Positions against a known default"
{number} questions to ask before {decision}","11 questions to ask before hiring","Decision-support; high utility intent"
How I {verb} {thing} in {timeframe}","How I wrote a book in 90 days","First-person proof + method"
The hidden {cost/benefit} of {thing}","The hidden cost of free tools","Reframe; unexpected angle"
{thing}, explained in {plain terms}","Docker, explained in plain English","Complexity reduction promise"
Why I {unpopular action}","Why I quit my best-paying client","Counter-intuitive personal story"
`;

const tk4 = `/* ════════════════════════════════════════════════════════════════════
   B-TK-4 · Content Writer's Toolkit — headline analyzer (real scoring:
   40*length + 25*power + 20*number + 15*sentiment), outline generator,
   readability checker. 120 power words, 35 headline formulas.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-TK-4";

export const files: Record<string, string> = {
${[
  ["01-instruments/headline-analyzer.html", SHELL("Headline Analyzer",
  `  <label for="h">Headline</label>
  <input id="h" type="text" placeholder="Type a headline…" value="7 mistakes that quietly kill your landing page">
  <div class="card">
    <div style="display:flex;align-items:baseline;gap:12px">
      <span id="score" style="font-size:44px;font-weight:800;font-variant-numeric:tabular-nums">0</span>
      <span id="verdict" class="warn">—</span>
    </div>
    <table style="margin-top:12px"><thead><tr><th>Component</th><th>Points</th><th>Detail</th></tr></thead><tbody id="tbl"></tbody></table>
  </div>
  <div class="card" style="font-size:13px;color:var(--dim)">Formula (documented in 03-formulas): <b>40×length + 25×power words + 20×number + 15×sentiment</b> — each component capped, scored live, debounced 120ms.</div>`,
  `"use strict";
var el=function(i){return document.getElementById(i)};
var POWER=["${POWER_WORDS.slice(0, 60).join('","')}"];
var POS=["win","best","love","great","proven","boost","grow","double","save","earn","master","unlock","improve","effective","powerful","complete","definitive","ultimate","simple","easy","fast","value","worth","free","new"];
var NEG=["mistake","wrong","fail","kill","dead","painful","brutal","expensive","warning","stop","avoid","lose","worst","hate","broken","leak","waste","risk","danger","hidden cost"];
function analyze(h){
  h=h.trim();var words=h.split(/\\\\s+/).filter(Boolean);var len=h.length;
  var lower=h.toLowerCase();
  var lengthScore=len===0?0:len<12?len/12*0.6:len<=65?1-(Math.max(0,len-45)/20)*0.4:Math.max(0.15,0.6-(len-65)/40);
  lengthScore=Math.max(0,Math.min(1,lengthScore));
  var powerHits=words.filter(function(w){return POWER.includes(w.toLowerCase().replace(/[^a-z-]/g,""))});
  var powerScore=Math.min(1,powerHits.length/2);
  var hasNumber=/\\\\d/.test(h);var numberScore=hasNumber?1:0;
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
render();`)],
].map(([p, html]) => `  ${JSON.stringify(p)}: \`${esc(html)}\`,`).join("\n")}

  ${[
  ["01-instruments/outline-generator.html", SHELL("Outline Generator",
  `  <label for="topic">Topic</label>
  <input id="topic" type="text" value="pricing for freelancers">
  <label for="angle">Angle</label>
  <input id="angle" type="text" value="beginner-friendly, anti-hype">
  <div class="card"><pre id="out" aria-live="polite"></pre></div>`,
  `"use strict";
var el=function(i){return document.getElementById(i)};
function outline(topic,angle){
  var t=topic.trim()||"your topic";
  return "OUTLINE — "+t+" ("+(angle.trim()||"general")+")\\n\\n"+
  "H1: The honest guide to "+t+"\\n"+
  "  hook: the mistake most people make with "+t+" — 2 sentences, specific\\n\\n"+
  "H2: Why "+t+" feels harder than it is\\n"+
  "  - name the confusion (readers nod = stay)\\n"+
  "  - the one reframe that unlocks it\\n\\n"+
  "H2: The 5-step system\\n"+
  "  1. the foundation (what must be true first)\\n"+
  "  2. the setup (tools/decisions)\\n"+
  "  3. the execution (step by step, one screen at a time)\\n"+
  "  4. the checkpoint (how to know it worked)\\n"+
  "  5. the maintenance (keeping it alive)\\n\\n"+
  "H2: "+t+" in practice — a worked example\\n"+
  "  - real numbers, before → after, what you'd do differently\\n\\n"+
  "H2: Mistakes to avoid\\n"+
  "  - 3 mistakes, each with the fix beside it (mistake-fix pairs)\\n\\n"+
  "H2: Your next 30 minutes\\n"+
  "  - one action, timeboxed, impossible to fail\\n";
}
function render(){el("out").textContent=outline(el("topic").value,el("angle").value)}
el("topic").addEventListener("input",render);
el("angle").addEventListener("input",render);
render();`)],
  ["01-instruments/readability-checker.html", SHELL("Readability Checker",
  `  <label for="t">Paste your text</label>
  <textarea id="t" rows="10">Pricing feels hard because everyone pretends it is math. It is mostly courage. Pick a number that pays you fairly for the hour, say it out loud without flinching, and let the client decide.</textarea>
  <div class="card">
    <div class="row">
      <div><span id="ease" style="font-size:34px;font-weight:800">—</span><br><span style="color:var(--dim);font-size:12px">Flesch reading ease</span></div>
      <div><span id="grade" style="font-size:34px;font-weight:800">—</span><br><span style="color:var(--dim);font-size:12px">Flesch-Kincaid grade</span></div>
    </div>
    <p id="verdict" style="margin:12px 0 0;font-size:14px"></p>
  </div>`,
  `"use strict";
var el=function(i){return document.getElementById(i)};
function syllables(w){w=w.toLowerCase().replace(/[^a-z]/g,"");if(w.length<=3)return 1;w=w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,"").replace(/^y/,"");return (w.match(/[aeiouy]{1,2}/g)||["x"]).length}
function compute(){
  var t=el("t").value;
  var sentences=(t.match(/[.!?]+(?:\\s|$)/g)||[]).length||1;
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
compute();`)],
].map(([p, html]) => `  ${JSON.stringify(p)}: \`${esc(html)}\`,`).join("\n")}

  "02-word-banks/power-words.csv": ${JSON.stringify(powerCsv)},

  "02-word-banks/headline-formulas.csv": ${JSON.stringify(FORMULAS_CSV)},

  "03-formulas/headline-scoring-cheatsheet.md": \`${esc(`# Headline scoring — the exact formula

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
`)}
\`,

  "04-setup/setup-guide.md": \`${esc(`# Setup guide — Content Writer's Toolkit

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
`)}
\`,

  "04-setup/walkthrough-link.md": \`${esc(`# Walkthrough

A 5-minute video tour:

**→ https://omniforge.example/walkthroughs/B-TK-4**

Contents:
- 00:00 — The scoring formula, in the open
- 01:20 — Analyzing real headlines (including two that should lose points)
- 02:40 — Outline generator: why the angle field matters
- 03:50 — Readability: the words-per-sentence lever
- 04:30 — Building a headline swipe file from the formula bank

Hosted (not bundled) to keep the kit lightweight.
`)}
\`,

  "EXTENDED-PACK/seo-title-lab.md": \`${esc(`# SEO title lab — in production

Status: **in production** — not in this archive.

What the finished instrument will contain: a fourth tool that scores
SERP titles the way the headline analyzer scores marketing headlines
— length in pixels (not chars), keyword front-loading position,
CTR-pattern match against the formula bank, and a snippet preview
with truncation simulation.
`)}
\`,
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
`;

writeFileSync(`${ROOT}/B-TK-4/content.ts`, tk4);
console.log("B-TK-4 written,", tk4.length, "chars");
