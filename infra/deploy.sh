#!/usr/bin/env bash
# grokbot.dev — production deploy. Self-contained, no CI dependency.
#
# Pulls the exact tip of origin/main, installs deps, and runs the FULL build gate
# (validate -> build -> og -> redirects -> keyword-placements -> pagefind -> check-links ->
# audit-scripts). A red build aborts here — BEFORE anything is swapped — so the live site is
# never served a half-built or failing release. On success it snapshots dist/ into a timestamped
# release and atomically repoints the `current` symlink that BOTH the grokbot.dev vhost and the
# products-grokbot.crhq.ai preview serve, so they are always identical. Keeps the last 5 releases
# for instant rollback (see ROLLBACK note at the bottom).
#
# Run as user `agent` on crhq-products:  sudo -u agent /opt/projects/user/grokbot/deploy.sh
set -euo pipefail

BASE=/opt/projects/user/grokbot
REPO="$BASE/repo"
RELEASES="$BASE/releases"
KEEP=5

echo "[deploy] $(date -u +%FT%TZ) — fetching origin/main…"
git -C "$REPO" fetch --prune origin
git -C "$REPO" reset --hard origin/main
git -C "$REPO" clean -fd
echo "[deploy] main is now $(git -C "$REPO" rev-parse --short HEAD)"

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
echo "[deploy] rollback: ln -sfn \$(ls -1dt $RELEASES/*/ | sed -n 2p) $BASE/current   (points at the previous release)"
