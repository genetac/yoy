#!/bin/bash
# Verify OMNIFORGE core interactions: family view, section expansion, presentation studio.
set -u
cd /home/z/my-project
export AGENT_BROWSER_SESSION="omniforge-verify2"

echo "=== [1] Start dev server ==="
(bun run dev > /tmp/dev-verify2.log 2>&1 &)
for i in $(seq 1 20); do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 http://localhost:3000/ 2>/dev/null)
  if [ "$code" = "200" ]; then echo "server up (${i}s)"; break; fi
  sleep 1
done

agent-browser open http://localhost:3000 2>&1 | head -2
sleep 2

echo
echo "=== [2] Click 'Micro' family ==="
agent-browser click "text=Micro" 2>&1 | head -3
sleep 1

echo
echo "=== [3] Check sections collapsed by default (user rule) ==="
agent-browser eval "Array.from(document.querySelectorAll('section[aria-expanded]')).map(s => s.getAttribute('aria-expanded')).join(',')" 2>&1

echo
echo "=== [4] Snapshot after family click ==="
agent-browser snapshot -i 2>&1 | head -25

echo
echo "=== [5] Expand first section and count plates ==="
agent-browser eval "document.querySelector('section[aria-expanded=\"false\"] button')?.click(); 'clicked'" 2>&1
sleep 1
agent-browser eval "document.querySelectorAll('section[aria-expanded=\"true\"]').length + ' expanded; plates visible: ' + document.querySelectorAll('a[href*=\"plate\"], [data-plate]').length" 2>&1

echo
echo "=== [6] Open Presentation Studio (showcase kit) ==="
agent-browser eval "Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('presentation'))?.click(); 'opening studio'" 2>&1
sleep 3
agent-browser eval "document.body.innerText.slice(0, 300).replace(/\n+/g, ' | ')" 2>&1 | head -5

echo
echo "=== [7] Console errors ==="
agent-browser console 2>&1 | rg -i "error|warn" | head -5 || echo "no errors/warnings"

echo
echo "=== [8] Studio screenshot ==="
agent-browser screenshot /home/z/my-project/scripts/omniforge-studio.png 2>&1
ls -la /home/z/my-project/scripts/omniforge-studio.png 2>/dev/null

agent-browser close 2>&1 | head -1
echo "DONE"
