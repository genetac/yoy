#!/bin/bash
# Verify the design matrix: 5 engines, one structure.
set -u
cd /home/z/my-project
export AGENT_BROWSER_SESSION="matrix-verify"

echo "=== [0] Server check ==="
code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 http://localhost:3000/ 2>/dev/null)
if [ "$code" != "200" ]; then
  echo "starting server (double-fork)…"
  (bun run dev > /tmp/dev-matrix.log 2>&1 &)
  for i in $(seq 1 20); do
    code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 http://localhost:3000/ 2>/dev/null)
    [ "$code" = "200" ] && break
    sleep 1
  done
fi
echo "server: HTTP $code"

agent-browser open http://localhost:3000 2>&1 | head -2
sleep 2

echo
echo "=== [1] Switcher present? ==="
agent-browser eval "[...document.querySelectorAll('[role=radiogroup][aria-label=\"Design engine\"] button')].length + ' engine chips: ' + [...document.querySelectorAll('[role=radiogroup][aria-label=\"Design engine\"]')[0].innerText].join('')"

echo
echo "=== [2] Matrix band present? ==="
agent-browser eval "document.body.innerText.includes('The design matrix') ? 'matrix band OK' : 'MISSING'"

echo
echo "=== [3] Cycle all 5 engines: data-style + body bg + display font ==="
for S in obsidian nocturne midhigh agencyos templateos; do
  agent-browser eval "setStyleRef || (()=>{const b=[...document.querySelectorAll('[role=radiogroup] button')]; return 'noop'})()" > /dev/null 2>&1
  # click the chip whose title starts with the style label
  agent-browser eval "(()=>{const btns=[...document.querySelectorAll('[role=radiogroup][aria-label=\"Design engine\"] button')]; const t={obsidian:'Obsidian & Brass',nocturne:'Nocturne',midhigh:'Mid-to-High Dining',agencyos:'Agency OS',templateos:'Template OS'}['$S']; const b=btns.find(x=>x.title.startsWith(t)); b.click(); return 'clicked '+t})()" 2>&1 | head -1
  sleep 1
  agent-browser eval "JSON.stringify({style:document.documentElement.dataset.style, ofdark:document.documentElement.classList.contains('of-dark'), bg:getComputedStyle(document.body).backgroundColor, displayFont:getComputedStyle(document.querySelector('h1')||document.querySelector('h2')).fontFamily.split(',')[0], plateRadius:getComputedStyle(document.querySelector('.of-plate')).borderRadius})"
done

echo
echo "=== [4] Screenshots (matrix band + hero) ==="
agent-browser eval "window.scrollTo(0,0)" > /dev/null
agent-browser screenshot /home/z/my-project/scripts/style-obsidian.png 2>&1 | head -1
agent-browser eval "(()=>{const b=[...document.querySelectorAll('[role=radiogroup][aria-label=\"Design engine\"] button')].find(x=>x.title.startsWith('Nocturne')); b.click(); return 'nc'})()" > /dev/null
sleep 1
agent-browser screenshot /home/z/my-project/scripts/style-nocturne.png 2>&1 | head -1
agent-browser eval "(()=>{const b=[...document.querySelectorAll('[role=radiogroup][aria-label=\"Design engine\"] button')].find(x=>x.title.startsWith('Mid-to-High')); b.click(); return 'mh'})()" > /dev/null
sleep 1
agent-browser screenshot /home/z/my-project/scripts/style-midhigh.png 2>&1 | head -1
agent-browser eval "(()=>{const b=[...document.querySelectorAll('[role=radiogroup][aria-label=\"Design engine\"] button')].find(x=>x.title.startsWith('Agency OS')); b.click(); return 'ao'})()" > /dev/null
sleep 1
agent-browser screenshot /home/z/my-project/scripts/style-agencyos.png 2>&1 | head -1
agent-browser eval "(()=>{const b=[...document.querySelectorAll('[role=radiogroup][aria-label=\"Design engine\"] button')].find(x=>x.title.startsWith('Template OS')); b.click(); return 'to'})()" > /dev/null
sleep 1
agent-browser screenshot /home/z/my-project/scripts/style-templateos.png 2>&1 | head -1

echo
echo "=== [5] Persistence: reload keeps Template OS ==="
agent-browser open http://localhost:3000 2>&1 | head -1
sleep 2
agent-browser eval "document.documentElement.dataset.style"

echo
echo "=== [6] Studio rail: open presentation, switch engine inside ==="
agent-browser eval "(()=>{const b=[...document.querySelectorAll('button')].find(x=>(x.getAttribute('aria-label')||'').includes('presentation')); b.click(); return 'studio opening'})()" 2>&1 | head -1
sleep 3
agent-browser eval "(()=>{const rails=[...document.querySelectorAll('[role=radiogroup]')]; const rail=rails.find(r=>r.getAttribute('aria-label')==='Design engine' && getComputedStyle(r.closest('aside')||r).display!=='none'); return rails.length + ' radiogroups on page'})()"
agent-browser eval "(()=>{const rail=[...document.querySelectorAll('aside [role=radiogroup] button')]; const ao=rail.find(x=>x.title.startsWith('Agency OS')); ao.click(); return 'switched to AO inside studio'})()" 2>&1 | head -1
sleep 1
agent-browser eval "JSON.stringify({style:document.documentElement.dataset.style, headerChip:[...document.querySelectorAll('[role=dialog] .of-chip')].map(c=>c.innerText).slice(0,4)})"
agent-browser screenshot /home/z/my-project/scripts/studio-agencyos.png 2>&1 | head -1
agent-browser press Escape 2>&1 | head -1

echo
echo "=== [7] Console errors ==="
agent-browser console 2>&1 | rg -i "error" | head -5 || echo "no console errors"

agent-browser close 2>&1 | head -1
echo "DONE"
