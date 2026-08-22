#!/usr/bin/env bash
# grokbot.dev — deploy the CURRENT local build to STAGING for review.
# Staging (https://grokbot-staging.crhq.ai, basic auth grokbot:botstakeover) is where a change set
# — one or many commits — is reviewed before it is promoted to production. Run from anywhere in the
# repo on the dev box. Builds with the FULL gate, then rsyncs dist/ to crhq-main.
#
# Discipline: commit to `main` and push before you promote; staging should reflect the committed
# `main` you intend to ship (in practice, working tree == main once you've committed).
set -euo pipefail
cd "$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"

echo "[stage] building (full gate)…"
npm run build

echo "[stage] rsync dist/ -> crhq-main:/var/www/grokbot-staging/"
rsync -az --delete --rsync-path="sudo rsync" dist/ crhq-main:/var/www/grokbot-staging/

echo "[stage] DONE — review: https://grokbot-staging.crhq.ai  (basic auth grokbot:botstakeover)"
