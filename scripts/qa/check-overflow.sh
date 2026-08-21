#!/usr/bin/env bash
# F6 global guard — no page may scroll sideways at any mobile width.
#
# Not a build gate (it needs a browser and a running preview server), but it IS the check
# that would have caught the operator's F6 report, so it lives with the harness and is run
# on every polish round. Exits non-zero if any route/width combination overflows.
#
#   npm run build && npm run preview -- --host --port 4381
#   bash scripts/qa/check-overflow.sh
set -u
BASE=${BASE:-http://localhost:4381}
PROBE=$(cat "$(dirname "$0")/overflow-probe.js")
WIDTHS=${WIDTHS:-"360 390 768"}
fails=0
checked=0

# name|path|action   — `modal` opens the InstallModal before measuring, because a scroll lock
# masks the headline symptom and that is precisely where the reported defect lived.
ROUTES="
home|/|
lane-index|/plugins/|
hub|/categories/engineering/|
entry-plugin|/plugins/aaron-marketing-skills/|
entry-plugin-MODAL|/plugins/aaron-marketing-skills/|modal
entry-use-case|/use-cases/factored-digest/|
entry-use-case-MODAL|/use-cases/factored-digest/|modal
collection-MODAL|/collections/grok-ship-firstmate/|modal
home-MODAL|/|modal
agent|/agent/|
wall|/wall/|
contribute|/contribute/|
submit|/submit/|
plugin-builder|/plugin-builder/|
search|/search/|
"

for W in $WIDTHS; do
  agent-browser set viewport "$W" 800 >/dev/null 2>&1
  echo "$ROUTES" | while IFS='|' read -r NAME PATHNAME ACTION; do
    [ -z "$NAME" ] && continue
    agent-browser open "$BASE$PATHNAME" >/dev/null 2>&1
    agent-browser wait 1400 >/dev/null 2>&1
    if [ "$ACTION" = "modal" ]; then
      agent-browser eval 'document.querySelector("[data-install-trigger]")?.click(); "x"' >/dev/null 2>&1
      agent-browser wait 800 >/dev/null 2>&1
    fi
    RES=$(agent-browser eval "$PROBE" 2>/dev/null)
    if echo "$RES" | grep -q '\\"ok\\":true'; then
      echo "  ok    $NAME @ $W"
    else
      echo "  FAIL  $NAME @ $W  ->  $RES"
      echo "fail" >> /tmp/.overflow-fails
    fi
  done
done

if [ -f /tmp/.overflow-fails ]; then
  COUNT=$(wc -l < /tmp/.overflow-fails)
  rm -f /tmp/.overflow-fails
  echo "check-overflow: $COUNT route/width combination(s) scroll sideways"
  exit 1
fi
echo "check-overflow: no page scrolls sideways at any tested width"
