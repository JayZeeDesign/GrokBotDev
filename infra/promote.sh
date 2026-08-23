#!/usr/bin/env bash
# grokbot.dev — PROMOTE reviewed `main` to production, then publish.
#
# Run from the repo on the dev box AFTER staging review is clear and `main` is pushed.
#   1) Verifies local main == origin/main (so you promote exactly what you reviewed/pushed).
#   2) Fast-forwards the `production` branch to `main` (creates it on first run). A rewound or
#      diverged history is REFUSED (no --force), so you cannot promote a rollback by accident.
#   3) Runs the prod deploy on crhq-products (gated build -> atomic symlink swap).
set -euo pipefail
cd "$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"

echo "[promote] syncing refs…"
git fetch -q origin
if [ "$(git rev-parse main)" != "$(git rev-parse origin/main)" ]; then
  echo "[promote] ERROR: local main ($(git rev-parse --short main)) != origin/main ($(git rev-parse --short origin/main))."
  echo "[promote] Commit + push main first, then promote what you reviewed."
  exit 1
fi

MAIN=$(git rev-parse --short main)
echo "[promote] fast-forwarding production -> main ($MAIN)…"
# Push with a FRESH token from the credential store rather than git's cached credential helper,
# which can go stale and 403 ("denied to …") even though the current token is valid. Falls back
# to a plain `git push origin` if the credential CLI is unavailable (e.g. running off-box).
CRED_CLI=/opt/projects/control-room/server/services/credentials-cli.js
ORIGIN_URL=$(git remote get-url origin)
if [ -f "$CRED_CLI" ] && command -v node >/dev/null 2>&1; then
  GT=$(node "$CRED_CLI" get-key github-zeropointrepo 2>/dev/null || true)
  if [ -n "${GT:-}" ]; then
    PUSH_URL=$(printf '%s' "$ORIGIN_URL" | sed -E "s#https://[^@]*@#https://#; s#https://#https://x-access-token:${GT}@#")
    git push "$PUSH_URL" main:production
    unset GT PUSH_URL
  else
    git push origin main:production
  fi
else
  git push origin main:production
fi

echo "[promote] running prod deploy on crhq-products…"
ssh crhq-products 'sudo -u agent /opt/projects/user/grokbot/deploy.sh'

echo "[promote] DONE — verify https://grokbot.dev"
