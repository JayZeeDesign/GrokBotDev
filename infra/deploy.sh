#!/usr/bin/env bash
# grokbot.dev — PRODUCTION deploy. Self-contained, no CI dependency.
#
# Serves the `production` branch (NOT main). `production` is only ever fast-forwarded from a
# reviewed `main` commit (see infra/promote.sh / CLAUDE.md), so nothing reaches prod by accident.
#
# Pulls production, installs deps, runs the FULL build gate (validate -> build -> og -> redirects
# -> keyword-placements -> pagefind -> check-links -> audit-scripts). A red build aborts here —
# BEFORE anything is swapped — so the live site is never served a half-built or failing release.
# On success it snapshots dist/ into a timestamped release and atomically repoints the `current`
# symlink that BOTH the grokbot.dev vhost and the products-grokbot.crhq.ai preview serve. Keeps
# the last 5 releases for instant rollback.
#
# Run as user `agent` on crhq-products:  sudo -u agent /opt/projects/user/grokbot/deploy.sh
set -euo pipefail

BASE=/opt/projects/user/grokbot
REPO="$BASE/repo"
RELEASES="$BASE/releases"
BRANCH=production
KEEP=5
# Optional static-build env (outside git). This provides PUBLIC_TURNSTILE_SITEKEY for the
# P1 votes island without committing secrets; the file may also contain runtime-only secrets.
BUILD_ENV_FILE="$BASE/secrets/votes-api.env"
if [[ -r "$BUILD_ENV_FILE" ]]; then
  set -a
  # shellcheck disable=SC1090
  . "$BUILD_ENV_FILE"
  set +a
fi

echo "[deploy] $(date -u +%FT%TZ) — fetching origin/$BRANCH…"
# The box was cloned --depth 1 (single-branch); widen the refspec so all branches fetch.
git -C "$REPO" config remote.origin.fetch '+refs/heads/*:refs/remotes/origin/*'
git -C "$REPO" fetch --prune origin
git -C "$REPO" reset --hard "origin/$BRANCH"
git -C "$REPO" clean -fd
echo "[deploy] $BRANCH is now $(git -C "$REPO" rev-parse --short HEAD)"

echo "[deploy] npm ci…"
( cd "$REPO" && npm ci --no-audit --no-fund )

echo "[deploy] npm run build (full gate; failure aborts before any swap)…"
( cd "$REPO" && npm run build )

TS=$(date -u +%Y%m%d-%H%M%S)
REL="$RELEASES/$TS"
echo "[deploy] snapshot -> $REL"
mkdir -p "$REL"
rsync -a --delete "$REPO/dist/" "$REL/"

echo "[deploy] atomic swap: current -> releases/$TS"
ln -sfn "$REL" "$BASE/current"

echo "[deploy] prune (keep last $KEEP releases)…"
ls -1dt "$RELEASES"/*/ 2>/dev/null | tail -n +$((KEEP + 1)) | xargs -r rm -rf

echo "[deploy] DONE — current -> $(readlink "$BASE/current")"
echo "[deploy] rollback: sudo -u agent ln -sfn \$(ls -1dt $RELEASES/*/ | sed -n 2p) $BASE/current"
