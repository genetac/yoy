#!/bin/bash
# Final check: hydration clean + hero photo + obsidian screenshot correct
set -u
cd /home/z/my-project
export AGENT_BROWSER_SESSION="matrix-final"

code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 http://localhost:3000/ 2>/dev/null)
[ "$code" = "200" ] || { (bun run dev > /tmp/dev-matrix.log 2>&1 &); sleep 8; }

agent-browser open http://localhost:3000 2>&1 | head -2
sleep 4

echo "=== style from storage (reset to obsidian) ==="
agent-browser eval "(()=>{const b=[...document.querySelectorAll('[role=radiogroup][aria-label=\"Design engine\"] button')].find(x=>x.title.startsWith('Obsidian')); b.click(); return document.documentElement.dataset.style})()" 2>&1 | head -1
sleep 3

echo "=== hero photo rendered? ==="
agent-browser eval "const img=document.querySelector('img'); img ? 'img: ' + (img.naturalWidth > 0 ? 'LOADED ' + img.naturalWidth + 'px' : 'still loading') + ' — ' + (img.currentSrc||img.src||'').slice(0,60) : 'no img'"

echo "=== console errors after hydration fix ==="
agent-browser console 2>&1 | rg -i "error|hydrat" | head -4 || echo "CLEAN — no errors"

agent-browser screenshot /home/z/my-project/scripts/style-obsidian-final.png 2>&1 | head -1
agent-browser close 2>&1 | head -1
echo DONE
