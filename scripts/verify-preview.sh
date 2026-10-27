#!/bin/bash
# Verify OMNIFORGE preview end-to-end: boot server, render page, test interactions, check console errors.
set -u
cd /home/z/my-project

export AGENT_BROWSER_SESSION="omniforge-verify"

echo "=== [1] Start dev server (background, this call only) ==="
(bun run dev > /tmp/dev-verify.log 2>&1 &)
for i in $(seq 1 20); do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 http://localhost:3000/ 2>/dev/null)
  if [ "$code" = "200" ]; then echo "server up after ${i}s (HTTP $code)"; break; fi
  sleep 1
done
[ "$code" = "200" ] || { echo "SERVER FAILED TO START"; tail -20 /tmp/dev-verify.log; exit 1; }

echo
echo "=== [2] Open page in browser ==="
agent-browser open http://localhost:3000 2>&1 | head -5
sleep 2

echo
echo "=== [3] Page title + heading ==="
agent-browser eval "document.title" 2>&1
agent-browser eval "document.querySelector('h1')?.innerText?.slice(0,80)" 2>&1

echo
echo "=== [4] Console errors ==="
agent-browser console 2>&1 | tail -10

echo
echo "=== [5] Interactive elements snapshot (top) ==="
agent-browser snapshot -i 2>&1 | head -40

echo
echo "=== [6] Screenshot ==="
agent-browser screenshot /home/z/my-project/scripts/omniforge-home.png 2>&1
ls -la /home/z/my-project/scripts/omniforge-home.png 2>/dev/null

echo
echo "=== [7] Cleanup ==="
agent-browser close 2>&1 | head -2
echo "DONE"
