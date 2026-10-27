/* ════════════════════════════════════════════════════════════════════
   B-TK-3 · Developer's Toolkit — 3 working offline instruments, a
   32-snippet bank, regex fixtures. The Try-it demo runs the regex
   tester's exact engine.
   ════════════════════════════════════════════════════════════════════ */

import type { DemoContent } from "../../catalog/schema";

export const kitId = "B-TK-3";

export const files: Record<string, string> = {
  "01-instruments/regex-tester.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Regex Tester — OMNIFORGE Toolkit</title>
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
  <h1>Regex Tester</h1>
  <p class="sub">OMNIFORGE · runs offline · no data leaves this page</p>
  <label for="p">Pattern</label>
  <input id="p" type="text" value="\\b(\\w+)@(\\w+\\.\\w+)\\b" spellcheck="false">
  <div class="row">
    <div><label for="f">Flags</label><input id="f" type="text" value="g"></div>
    <div><label for="in">Input</label><input id="in" type="text" value="maya@forge.io, jonas@hey.com"></div>
  </div>
  <div class="card"><pre id="out" aria-live="polite"></pre></div>
  <div class="card"><table aria-label="Capture groups"><thead><tr><th>Match</th><th>Index</th><th>Groups</th></tr></thead><tbody id="tbl"></tbody></table></div>
  <footer>OMNIFORGE Toolkit — Edition 2026 · keyboard accessible · zero dependencies</footer>
</main>
<script>
"use strict";
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
    if(!count)out.innerHTML=esc(input)+"\n<span class='warn'>— no matches</span>";
    tbl.innerHTML=rows;
  }catch(e){out.innerHTML="<span class='bad'>"+esc(e.message)+"</span>";}
}
["p","f","in"].forEach(function(i){el(i).addEventListener("input",render)});
render();
</script>
</body>
</html>`,
  "01-instruments/json-formatter.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>JSON Formatter & Validator — OMNIFORGE Toolkit</title>
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
  <h1>JSON Formatter & Validator</h1>
  <p class="sub">OMNIFORGE · runs offline · no data leaves this page</p>
  <label for="in">JSON input</label>
  <textarea id="in" rows="10" placeholder='{"paste":"your JSON"}'>{ "user": { "name": "Maya", "roles": ["admin","editor"], "active": true } }</textarea>
  <div class="row" style="margin-top:14px">
    <button class="btn" id="fmt">Format (2-space)</button>
    <button class="btn" id="min" style="background:var(--dim)">Minify</button>
  </div>
  <div class="card"><pre id="out" aria-live="polite"></pre></div>
  <footer>OMNIFORGE Toolkit — Edition 2026 · keyboard accessible · zero dependencies</footer>
</main>
<script>
"use strict";
var el=function(i){return document.getElementById(i)};
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")}
function run(min){
  try{
    var v=JSON.parse(el("in").value);
    var s=min?JSON.stringify(v):JSON.stringify(v,null,2);
    el("out").innerHTML="<span class='ok'>valid JSON ✓ ("+s.length+" chars"+(min?" minified":"")+")</span>\n"+esc(s);
  }catch(e){
    var pos=(e.message.match(/position (\\d+)/)||[])[1];
    var hint=pos?" — near char "+pos+" (line "+(el("in").value.slice(0,+pos).split("\n").length)+")":"";
    el("out").innerHTML="<span class='bad'>"+esc(e.message)+hint+"</span>";
  }
}
el("fmt").onclick=function(){run(false)};
el("min").onclick=function(){run(true)};
el("in").addEventListener("input",function(){run(false)});
run(false);
</script>
</body>
</html>`,
  "01-instruments/snippet-library.html": `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Snippet Library — OMNIFORGE Toolkit</title>
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
  <h1>Snippet Library</h1>
  <p class="sub">OMNIFORGE · runs offline · no data leaves this page</p>
  <label for="q">Search 32 snippets</label>
  <input id="q" type="text" placeholder="react hook, git, css…">
  <div class="card"><table aria-label="Snippets"><tbody id="tbl"></tbody></table></div>
  <div class="card"><pre id="code">Click a snippet to view it. Arrow keys navigate.</pre></div>
  <footer>OMNIFORGE Toolkit — Edition 2026 · keyboard accessible · zero dependencies</footer>
</main>
<script>
"use strict";
var el=function(i){return document.getElementById(i)};
var esc=function(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")};
var SNIPPETS=[
  {
    "title": "Debounce",
    "tags": "js,utility",
    "code": "function debounce(fn, ms = 200) {\n  let t;\n  return (...args) => {\n    clearTimeout(t);\n    t = setTimeout(() => fn(...args), ms);\n  };\n}"
  },
  {
    "title": "Throttle",
    "tags": "js,utility",
    "code": "function throttle(fn, ms = 200) {\n  let last = 0;\n  return (...args) => {\n    const now = Date.now();\n    if (now - last >= ms) { last = now; fn(...args); }\n  };\n}"
  },
  {
    "title": "Deep clone",
    "tags": "js,utility",
    "code": "const deepClone = (o) => structuredClone(o);"
  },
  {
    "title": "Group by",
    "tags": "js,array",
    "code": "const groupBy = (arr, key) =>\n  arr.reduce((acc, x) => ((acc[x[key]] ??= []).push(x), acc), {});"
  },
  {
    "title": "Unique by",
    "tags": "js,array",
    "code": "const uniqueBy = (arr, key) => [...new Map(arr.map(x => [x[key], x])).values()];"
  },
  {
    "title": "Sleep",
    "tags": "js,async",
    "code": "const sleep = (ms) => new Promise(r => setTimeout(r, ms));"
  },
  {
    "title": "Fetch with timeout",
    "tags": "js,async,fetch",
    "code": "async function fetchTimeout(url, ms = 8000, opts = {}) {\n  const c = new AbortController();\n  const t = setTimeout(() => c.abort(), ms);\n  try { return await fetch(url, { ...opts, signal: c.signal }); }\n  finally { clearTimeout(t); }\n}"
  },
  {
    "title": "Retry with backoff",
    "tags": "js,async",
    "code": "async function retry(fn, tries = 3, base = 300) {\n  for (let i = 0; i < tries; i++) {\n    try { return await fn(); }\n    catch (e) { if (i === tries - 1) throw e; await sleep(base * 2 ** i); }\n  }\n}"
  },
  {
    "title": "useEffect cleanup",
    "tags": "react,hooks",
    "code": "useEffect(() => {\n  const id = setInterval(tick, 1000);\n  return () => clearInterval(id);\n}, []);"
  },
  {
    "title": "useDebouncedValue",
    "tags": "react,hooks",
    "code": "function useDebouncedValue(value, ms = 300) {\n  const [v, setV] = useState(value);\n  useEffect(() => { const t = setTimeout(() => setV(value), ms); return () => clearTimeout(t); }, [value, ms]);\n  return v;\n}"
  },
  {
    "title": "useLocalStorage",
    "tags": "react,hooks",
    "code": "function useLocalStorage(key, initial) {\n  const [v, setV] = useState(() => {\n    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }\n    catch { return initial; }\n  });\n  useEffect(() => localStorage.setItem(key, JSON.stringify(v)), [key, v]);\n  return [v, setV];\n}"
  },
  {
    "title": "Refs before paint",
    "tags": "react,hooks",
    "code": "const ref = useRef(null);\nuseLayoutEffect(() => { /* measure DOM before paint */ }, []);"
  },
  {
    "title": "Error boundary hook",
    "tags": "react,error",
    "code": "const [err, reset] = useErrorBoundary();\n// wrap risky children; call reset() in a retry button"
  },
  {
    "title": "Git undo last commit",
    "tags": "git",
    "code": "git reset --soft HEAD~1   # keep changes staged\ngit reset HEAD~1          # keep changes unstaged\ngit reset --hard HEAD~1    # discard (careful)"
  },
  {
    "title": "Git save stray work",
    "tags": "git",
    "code": "git stash push -m \"wip: before rebase\"\ngit stash list\ngit stash pop"
  },
  {
    "title": "Git fix last message",
    "tags": "git",
    "code": "git commit --amend -m \"new message\""
  },
  {
    "title": "Git find the culprit",
    "tags": "git",
    "code": "git log -S \"theStringThatDisappeared\" --oneline"
  },
  {
    "title": "Git sync fork",
    "tags": "git",
    "code": "git fetch upstream\ngit rebase upstream/main\ngit push -f origin main"
  },
  {
    "title": "Bash serve a folder",
    "tags": "bash,http",
    "code": "python3 -m http.server 8080          # or:\nbun x serve -l 8080"
  },
  {
    "title": "Bash kill port holder",
    "tags": "bash,process",
    "code": "lsof -ti:3000 | xargs kill -9"
  },
  {
    "title": "Bash count lines by type",
    "tags": "bash,count",
    "code": "git ls-files '*.ts' '*.tsx' | xargs wc -l | tail -1"
  },
  {
    "title": "Bash find big files",
    "tags": "bash,git",
    "code": "git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | awk '/^blob/ {print $3, $4}' | sort -rn | head"
  },
  {
    "title": "CSS grid responsive cards",
    "tags": "css,layout",
    "code": ".cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr));\n  gap: 1rem;\n}"
  },
  {
    "title": "CSS fluid type",
    "tags": "css,typography",
    "code": "h1 { font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3.5rem); }"
  },
  {
    "title": "CSS truncate two lines",
    "tags": "css,text",
    "code": ".clamp-2 {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}"
  },
  {
    "title": "CSS center anything",
    "tags": "css,layout",
    "code": ".center { display: grid; place-items: center; }"
  },
  {
    "title": "Focus-visible only",
    "tags": "css,a11y",
    "code": ":focus { outline: none; }\n:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }"
  },
  {
    "title": "Prefers reduced motion",
    "tags": "css,a11y,motion",
    "code": "@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }\n}"
  },
  {
    "title": "SQL latest per group",
    "tags": "sql",
    "code": "SELECT DISTINCT ON (user_id) user_id, created_at, action\nFROM events\nORDER BY user_id, created_at DESC;"
  },
  {
    "title": "SQL date bucketing",
    "tags": "sql,dates",
    "code": "SELECT date_trunc('week', created_at) AS week, count(*)\nFROM signups GROUP BY 1 ORDER BY 1;"
  },
  {
    "title": "URLSearchParams",
    "tags": "js,dom",
    "code": "const params = new URLSearchParams(location.search);\nconst page = +(params.get(\"page\") ?? 1);"
  },
  {
    "title": "Clipboard write",
    "tags": "js,dom",
    "code": "await navigator.clipboard.writeText(text);\n// requires user gesture + secure context"
  }
];
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
render();
</script>
</body>
</html>`,

  "02-fixtures/snippet-bank.json": "[\n  {\n    \"title\": \"Debounce\",\n    \"tags\": \"js,utility\",\n    \"code\": \"function debounce(fn, ms = 200) {\\n  let t;\\n  return (...args) => {\\n    clearTimeout(t);\\n    t = setTimeout(() => fn(...args), ms);\\n  };\\n}\"\n  },\n  {\n    \"title\": \"Throttle\",\n    \"tags\": \"js,utility\",\n    \"code\": \"function throttle(fn, ms = 200) {\\n  let last = 0;\\n  return (...args) => {\\n    const now = Date.now();\\n    if (now - last >= ms) { last = now; fn(...args); }\\n  };\\n}\"\n  },\n  {\n    \"title\": \"Deep clone\",\n    \"tags\": \"js,utility\",\n    \"code\": \"const deepClone = (o) => structuredClone(o);\"\n  },\n  {\n    \"title\": \"Group by\",\n    \"tags\": \"js,array\",\n    \"code\": \"const groupBy = (arr, key) =>\\n  arr.reduce((acc, x) => ((acc[x[key]] ??= []).push(x), acc), {});\"\n  },\n  {\n    \"title\": \"Unique by\",\n    \"tags\": \"js,array\",\n    \"code\": \"const uniqueBy = (arr, key) => [...new Map(arr.map(x => [x[key], x])).values()];\"\n  },\n  {\n    \"title\": \"Sleep\",\n    \"tags\": \"js,async\",\n    \"code\": \"const sleep = (ms) => new Promise(r => setTimeout(r, ms));\"\n  },\n  {\n    \"title\": \"Fetch with timeout\",\n    \"tags\": \"js,async,fetch\",\n    \"code\": \"async function fetchTimeout(url, ms = 8000, opts = {}) {\\n  const c = new AbortController();\\n  const t = setTimeout(() => c.abort(), ms);\\n  try { return await fetch(url, { ...opts, signal: c.signal }); }\\n  finally { clearTimeout(t); }\\n}\"\n  },\n  {\n    \"title\": \"Retry with backoff\",\n    \"tags\": \"js,async\",\n    \"code\": \"async function retry(fn, tries = 3, base = 300) {\\n  for (let i = 0; i < tries; i++) {\\n    try { return await fn(); }\\n    catch (e) { if (i === tries - 1) throw e; await sleep(base * 2 ** i); }\\n  }\\n}\"\n  },\n  {\n    \"title\": \"useEffect cleanup\",\n    \"tags\": \"react,hooks\",\n    \"code\": \"useEffect(() => {\\n  const id = setInterval(tick, 1000);\\n  return () => clearInterval(id);\\n}, []);\"\n  },\n  {\n    \"title\": \"useDebouncedValue\",\n    \"tags\": \"react,hooks\",\n    \"code\": \"function useDebouncedValue(value, ms = 300) {\\n  const [v, setV] = useState(value);\\n  useEffect(() => { const t = setTimeout(() => setV(value), ms); return () => clearTimeout(t); }, [value, ms]);\\n  return v;\\n}\"\n  },\n  {\n    \"title\": \"useLocalStorage\",\n    \"tags\": \"react,hooks\",\n    \"code\": \"function useLocalStorage(key, initial) {\\n  const [v, setV] = useState(() => {\\n    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }\\n    catch { return initial; }\\n  });\\n  useEffect(() => localStorage.setItem(key, JSON.stringify(v)), [key, v]);\\n  return [v, setV];\\n}\"\n  },\n  {\n    \"title\": \"Refs before paint\",\n    \"tags\": \"react,hooks\",\n    \"code\": \"const ref = useRef(null);\\nuseLayoutEffect(() => { /* measure DOM before paint */ }, []);\"\n  },\n  {\n    \"title\": \"Error boundary hook\",\n    \"tags\": \"react,error\",\n    \"code\": \"const [err, reset] = useErrorBoundary();\\n// wrap risky children; call reset() in a retry button\"\n  },\n  {\n    \"title\": \"Git undo last commit\",\n    \"tags\": \"git\",\n    \"code\": \"git reset --soft HEAD~1   # keep changes staged\\ngit reset HEAD~1          # keep changes unstaged\\ngit reset --hard HEAD~1    # discard (careful)\"\n  },\n  {\n    \"title\": \"Git save stray work\",\n    \"tags\": \"git\",\n    \"code\": \"git stash push -m \\\"wip: before rebase\\\"\\ngit stash list\\ngit stash pop\"\n  },\n  {\n    \"title\": \"Git fix last message\",\n    \"tags\": \"git\",\n    \"code\": \"git commit --amend -m \\\"new message\\\"\"\n  },\n  {\n    \"title\": \"Git find the culprit\",\n    \"tags\": \"git\",\n    \"code\": \"git log -S \\\"theStringThatDisappeared\\\" --oneline\"\n  },\n  {\n    \"title\": \"Git sync fork\",\n    \"tags\": \"git\",\n    \"code\": \"git fetch upstream\\ngit rebase upstream/main\\ngit push -f origin main\"\n  },\n  {\n    \"title\": \"Bash serve a folder\",\n    \"tags\": \"bash,http\",\n    \"code\": \"python3 -m http.server 8080          # or:\\nbun x serve -l 8080\"\n  },\n  {\n    \"title\": \"Bash kill port holder\",\n    \"tags\": \"bash,process\",\n    \"code\": \"lsof -ti:3000 | xargs kill -9\"\n  },\n  {\n    \"title\": \"Bash count lines by type\",\n    \"tags\": \"bash,count\",\n    \"code\": \"git ls-files '*.ts' '*.tsx' | xargs wc -l | tail -1\"\n  },\n  {\n    \"title\": \"Bash find big files\",\n    \"tags\": \"bash,git\",\n    \"code\": \"git rev-list --objects --all | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | awk '/^blob/ {print $3, $4}' | sort -rn | head\"\n  },\n  {\n    \"title\": \"CSS grid responsive cards\",\n    \"tags\": \"css,layout\",\n    \"code\": \".cards {\\n  display: grid;\\n  grid-template-columns: repeat(auto-fill, minmax(min(260px, 100%), 1fr));\\n  gap: 1rem;\\n}\"\n  },\n  {\n    \"title\": \"CSS fluid type\",\n    \"tags\": \"css,typography\",\n    \"code\": \"h1 { font-size: clamp(1.75rem, 1.2rem + 2.5vw, 3.5rem); }\"\n  },\n  {\n    \"title\": \"CSS truncate two lines\",\n    \"tags\": \"css,text\",\n    \"code\": \".clamp-2 {\\n  display: -webkit-box;\\n  -webkit-line-clamp: 2;\\n  -webkit-box-orient: vertical;\\n  overflow: hidden;\\n}\"\n  },\n  {\n    \"title\": \"CSS center anything\",\n    \"tags\": \"css,layout\",\n    \"code\": \".center { display: grid; place-items: center; }\"\n  },\n  {\n    \"title\": \"Focus-visible only\",\n    \"tags\": \"css,a11y\",\n    \"code\": \":focus { outline: none; }\\n:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }\"\n  },\n  {\n    \"title\": \"Prefers reduced motion\",\n    \"tags\": \"css,a11y,motion\",\n    \"code\": \"@media (prefers-reduced-motion: reduce) {\\n  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }\\n}\"\n  },\n  {\n    \"title\": \"SQL latest per group\",\n    \"tags\": \"sql\",\n    \"code\": \"SELECT DISTINCT ON (user_id) user_id, created_at, action\\nFROM events\\nORDER BY user_id, created_at DESC;\"\n  },\n  {\n    \"title\": \"SQL date bucketing\",\n    \"tags\": \"sql,dates\",\n    \"code\": \"SELECT date_trunc('week', created_at) AS week, count(*)\\nFROM signups GROUP BY 1 ORDER BY 1;\"\n  },\n  {\n    \"title\": \"URLSearchParams\",\n    \"tags\": \"js,dom\",\n    \"code\": \"const params = new URLSearchParams(location.search);\\nconst page = +(params.get(\\\"page\\\") ?? 1);\"\n  },\n  {\n    \"title\": \"Clipboard write\",\n    \"tags\": \"js,dom\",\n    \"code\": \"await navigator.clipboard.writeText(text);\\n// requires user gesture + secure context\"\n  }\n]",

  "02-fixtures/regex-fixtures.csv": "pattern,flags,test_input,expected_matches\n^\\\\w+$,g,hello world,2\n\\\\d{3}-\\\\d{4},,call 555-0199 or 555-0188,555-0199;555-0188\n(?i)error,g,Error ERROR error,3\nhttps?://[^\\\\s]+,,see https://a.io and http://b.io,https://a.io;http://b.io\n\\\\b\\\\d{2}:\\\\d{2}\\\\b,,meet at 10:30 not 1030,10:30\n^[A-Z][a-z]+$,g,Maya jonas Priya,2\n(?<year>\\\\d{4})-(?<month>\\\\d{2}),,2026-10-26 and 2025-09-01,2026-10;2025-09\n\\\\{\\\\{.+?\\\\}\\\\},,Hi {{name}} from {{company}},{{name}};{{company}}\n(?<=@)\\\\w+\\\\.\\\\w+,g,maya@forge.io jonas@hey.com,forge.io;hey.com\n\\\\s{2,},g,\"a  b   c\",a b c (after replace)\n^#,gm,\"# h1\\n## h2\\nbody\",2\n\\\\b\\\\d+(?:\\\\.\\\\d+)?%$,g,up 12% flat 3.5x down 8%,12%\n[$]{1}[a-z]+,g,cost $99 and $149,99;149\n\\\\\\\\n,,line1\\\\nline2,1\n\\\\b(\\\\w+)\\\\s+\\\\1\\\\b,gi,\"the the and and once\",the the;and and\n<(\\\\w+)[^>]*>.*?</\\\\1>,g,\"<b>bold</b><i>it</i>\",2\n^\\\\s+|\\\\s+$,gm,\" padded \",strip both ends\n[AEIOU],g,Alphabet,2\n\\\\d(?=px),g,12px 3em 44px,2\n(\\\\d+)x(\\\\d+),,sizes 1280x800 and 640x400,2\n^(?:[a-z-]+\\\\.)+[a-z]{2,}$,,forge.io,1\n\\\\bx\\\\w*,gi,\"x64 box Xylophone next\",3\n(?<!\\\\$)\\\\b\\\\d{2}\\\\b,,7 42 $42 100,42;100 via boundary\n#[0-9a-fA-F]{6},g,color #E7C982 and #b8913f,#E7C982;#b8913f\n\"trailing\\\\.\\\\.\\\\.\",,ends with trailing...,1\n\\\\bTODO\\\\b,g,\"TODO: fix // TODO more\",2\n^\\\\s*- \\\\[[ x]\\\\],gm,\"- [ ] a\\n- [x] b\",2\n(?s)<script.*?</script>,,\"<script>a</script> body\",1\n\\\\b\\\\d{1,3}(?:,\\\\d{3})+,,1,000 and 12,345,2\n^-+$,gm,\"---\\n***\",\"1 (dashes only)\n(\\\\w+)@(\\\\w+),g,maya@forge jonas@hey,maya@forge;jonas@hey\n\\\\b\\\\d+(am|pm)\\\\b,,at 10am or 3pm,2\n(?i)^re:.*,gm,\"Re: hello\\nFwd: hi\",1",

  "03-formulas/regex-cheatsheet.md": `# Regex cheatsheet — the working set

The 20% of regex that handles 95% of real matching work. Every entry
was chosen because it appears in the fixtures file — test each one
live in \`regex-tester.html\` while you read.

## Anchors & boundaries

| Pattern | Meaning | Fixture |
| --- | --- | --- |
| \`^…$\` | full-string match | \`^\\w+$\` — "hello world" fails, "hello" passes |
| \`\\b\` | word boundary | \`\\b\\d{2}:\\d{2}\\b\` finds "10:30" but not "1030" |
| \`m\` flag | \`^\` / \`$\` match per line | \`^#\` matches every heading line |

## The lookaround pair people mix up

- \`(?=…)\` **lookahead** — position followed by: \`\\d(?=px)\` finds digits only before "px"
- \`(?<=…)\` **lookbehind** — position preceded by: \`(?<=@)\\w+\` finds domains in emails
- Neither consumes characters — that's why they're perfect for extraction without splitting.

## Groups

| Syntax | What it does | When |
| --- | --- | --- |
| \`(…)\` | capturing group | you need the value back (replace, extract) |
| \`(?:…)\` | non-capturing | grouping only — keep your group indexes clean |
| \`(?<name>…)\` | named group | more than 2 groups; readability wins |
| \`\\1\` | backreference | repeated words: \`\\b(\\w+)\\s+\\1\\b\` |

## Quantifiers, greedily misunderstood

- \`*\` and \`+\` are **greedy**; add \`?\` for lazy: \`<.+?>\` stops at the first \`>\`, \`<.+>\` swallows to the last
- Lazy quantifiers are the #1 fix for HTML-matching regexes (still: parse HTML with a parser, regex for quick scrapes only)
- \`{2,}\` = "two or more" — \`\\s{2,}\` collapses runs of spaces

## Replace patterns worth memorising

\`\`\`
"$1 $2"        →  reorder groups
"[$1]"         →  wrap a capture
"$1x$2"        →  "1280x800" from (\\d+)x(\\d+)
""             →  delete matches (strip comments, blank lines)
\`\`\`

## The five-step debugging method

1. Reproduce with the smallest input that still fails
2. Drop to \`g\` + no groups — does the pattern itself match?
3. Add one group at a time back
4. Suspect greediness before complexity
5. When it works, add a fixture row — patterns without tests decay

`,

  "04-setup/setup-guide.md": `# Setup guide — Developer's Toolkit

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

`,

  "04-setup/walkthrough-link.md": `# Walkthrough

A 5-minute video tour of the three instruments:

**→ https://omniforge.example/walkthroughs/B-TK-3**

Contents:
- 00:00 — Regex tester: groups, lookarounds, the 5-step debug method
- 01:40 — JSON formatter: error positions, minify mode
- 03:00 — Snippet library: search, keyboard nav, growing the bank
- 04:10 — Building your fixtures file into a regression suite

Hosted (not bundled) to keep the kit lightweight.

`,

  "EXTENDED-PACK/vscode-snippets-export.md": `# VS Code snippets export — in production

Status: **in production** — not in this archive.

What the finished file will contain: the full snippet bank exported as
a VS Code snippets JSON payload — \`prefix\`, \`body\` with \`$1/$2\`
tabstops, and \`description\` — plus per-language files (\`html.json\`,
\`javascript.json\`, \`shell.json\`) ready for the User Snippets folder.

`,
};

export const demo: DemoContent = {
  kind: "tool",
  tool: "regex",
  intro:
    "Run the flagship instrument — the regex tester's engine, live in this tab. Flags, highlights and capture groups work exactly like the downloadable HTML tool.",
  presets: [
    { label: "Email extraction", payload: { pattern: "\\b(\\w+)@(\\w+\\.\\w+)\\b", flags: "g", testInput: "maya@forge.io, jonas@hey.com — not maya@forge" } },
    { label: "Merge-field finder", payload: { pattern: "\\{\\{(.+?)\\}\\}", flags: "g", testInput: "Hi {{name}} from {{company}} — sent {{date}}" } },
    { label: "Time matcher", payload: { pattern: "\\b\\d{2}:\\d{2}\\b", flags: "g", testInput: "meet at 10:30, not 1030, ok? 14:45 works" } },
  ],
};
