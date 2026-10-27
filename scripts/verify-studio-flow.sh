#!/bin/bash
# Verify OMNIFORGE elite flows with ref-based interactions: family view, section expand, studio, escape.
set -u
cd /home/z/my-project
export AGENT_BROWSER_SESSION="omniforge-verify3"

(bun run dev > /tmp/dev-verify3.log 2>&1 &)
for i in $(seq 1 20); do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 http://localhost:3000/ 2>/dev/null)
  [ "$code" = "200" ] && { echo "server up (${i}s)"; break; }
  sleep 1
done

agent-browser open http://localhost:3000 2>&1 | head -2
sleep 2

echo "=== [A] Click Micro family via ref ==="
agent-browser snapshot -i 2>&1 | rg "Micro 8 products" | head -1
agent-browser click "@e2" 2>&1 | head -2
sleep 1

echo
echo "=== [B] Family view: what rendered? ==="
agent-browser eval "document.body.innerText.slice(0, 400).replace(/\n+/g, ' | ')" 2>&1 | head -4

echo
echo "=== [C] Collapsed sections check (any aria-expanded) ==="
agent-browser eval "[...document.querySelectorAll('[aria-expanded]')].map(e => e.tagName + ':' + e.getAttribute('aria-expanded') + ':' + (e.innerText||'').slice(0,30).replace(/\n/g,' ')).join(' || ').slice(0, 600)" 2>&1

echo
echo "=== [D] Click first collapsed section header ==="
agent-browser eval "[...document.querySelectorAll('[aria-expanded=\"false\"]')][0]?.click(); 'clicked first collapsed header'" 2>&1
sleep 1
agent-browser eval "[...document.querySelectorAll('[aria-expanded=\"true\"]')].length + ' section(s) now expanded'" 2>&1

echo
echo "=== [E] Plates now visible? ==="
agent-browser snapshot -i 2>&1 | head -20

echo
echo "=== [F] Open a plate presentation ==="
agent-browser eval "Array.from(document.querySelectorAll('button')).find(b => (b.getAttribute('aria-label')||'').includes('presentation'))?.click(); 'clicked presentation'" 2>&1
sleep 3
echo "--- studio open? (look for dialog/overlay) ---"
agent-browser eval "const d = document.querySelector('[role=dialog], dialog, [data-studio], .of-studio'); d ? 'STUDIO OPEN: ' + d.innerText.slice(0,150).replace(/\n+/g,' | ') : 'no dialog element found'" 2>&1

echo
echo "=== [G] Escape key closes studio? ==="
agent-browser press Escape 2>&1 | head -1
sleep 1
agent-browser eval "document.querySelector('[role=dialog], dialog, [data-studio], .of-studio') ? 'still open' : 'closed after Escape'" 2>&1

echo
echo "=== [H] Console errors final check ==="
agent-browser console 2>&1 | rg -iv "^$" | tail -6

agent-browser screenshot /home/z/my-project/scripts/omniforge-final.png 2>&1
agent-browser close 2>&1 | head -1
echo "DONE"
