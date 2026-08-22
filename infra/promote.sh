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
git push origin main:production

echo "[promote] running prod deploy on crhq-products…"
ssh crhq-products 'sudo -u agent /opt/projects/user/grokbot/deploy.sh'

echo "[promote] DONE — verify https://grokbot.dev"
