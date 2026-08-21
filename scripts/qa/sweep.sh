#!/usr/bin/env bash
# M3.8 / M7.1 wireframe QA sweep — every page template at the §4.5 breakpoints.
set -u
BASE=http://localhost:4381
OUT=/opt/projects/control-room/images/grokbot-m7-qa
JSON=/opt/projects/grokbotdev/scripts/qa/last-run.jsonl
PROBE=$(cat /opt/projects/grokbotdev/scripts/qa/page-probe.js)
mkdir -p "$OUT"
: > "$JSON"

PAGES="
home|/
plugins-index|/plugins/
use-cases-index|/use-cases/
collections-index|/collections/
plugin-detail|/plugins/compound-engineering/
use-case-detail|/use-cases/grok-ship/
collection-detail|/collections/grok-ship-firstmate/
wall|/wall/
agent|/agent/
contribute|/contribute/
submit|/submit/
plugin-builder|/plugin-builder/
about|/about/
search|/search/
category-hub|/categories/engineering/
subcategory-hub|/categories/engineering/agents-ops/
integration-hub|/integrations/slack/
subscribed|/subscribed/
404|/this-does-not-exist/
"

for W in 1440 768 390; do
  case $W in 1440) H=900;; 768) H=1024;; 390) H=844;; esac
  agent-browser set viewport "$W" "$H" >/dev/null 2>&1
  echo "$PAGES" | while IFS='|' read -r NAME PATHNAME; do
    [ -z "$NAME" ] && continue
    agent-browser open "$BASE$PATHNAME" >/dev/null 2>&1
    agent-browser wait 350 >/dev/null 2>&1
    RES=$(agent-browser eval "$PROBE" 2>/dev/null)
    echo "{\"page\":\"$NAME\",\"w\":$W,\"probe\":$RES}" >> "$JSON"
    agent-browser screenshot --full "$OUT/${NAME}-${W}.png" >/dev/null 2>&1
    echo "  done $NAME @ $W"
  done
done
echo "SWEEP COMPLETE"
ls -1 "$OUT" | wc -l
