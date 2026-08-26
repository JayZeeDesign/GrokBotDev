#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."
DATA_DIR=/opt/projects/grokbot-votes-data
CONTAINER=grokbot-votes-pg
DB_NAME=grokbot_votes

if [ ! -f .env ]; then
  POSTGRES_PASSWORD="$(openssl rand -hex 24)"
  APP_PASSWORD="$(openssl rand -hex 24)"
  ADMIN_PASSWORD="$(openssl rand -hex 24)"
  PEPPER="$(openssl rand -hex 32)"
  cat > .env <<EOF_ENV
NODE_ENV=development
VOTES_HOST=127.0.0.1
VOTES_PORT=4391
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
VOTES_APP_PASSWORD=$APP_PASSWORD
VOTES_ADMIN_PASSWORD=$ADMIN_PASSWORD
DATABASE_URL=postgres://votes_app:$APP_PASSWORD@127.0.0.1:54390/$DB_NAME
ADMIN_DATABASE_URL=postgres://votes_admin:$ADMIN_PASSWORD@127.0.0.1:54390/$DB_NAME
MIGRATE_DATABASE_URL=postgres://postgres:$POSTGRES_PASSWORD@127.0.0.1:54390/$DB_NAME
VOTES_HMAC_PEPPER=$PEPPER
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
PUBLIC_TURNSTILE_SITEKEY=1x00000000000000000000AA
USE_CASE_CONTENT_DIR=../../content/use-cases
SLUGS_FILE=../../dist/api-meta/use-case-slugs.json
LOG_LEVEL=info
EOF_ENV
  chmod 600 .env
  echo "created services/votes-api/.env with local-only generated secrets"
fi

set -a
# shellcheck disable=SC1091
. ./.env
set +a

if ! docker ps -a --format '{{.Names}}' | grep -qx "$CONTAINER"; then
  sudo mkdir -p "$DATA_DIR"
  sudo chown "$(id -u):$(id -g)" "$DATA_DIR"
  docker run -d \
    --name "$CONTAINER" \
    -e POSTGRES_DB="$DB_NAME" \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD="$POSTGRES_PASSWORD" \
    -p 127.0.0.1:54390:5432 \
    -v "$DATA_DIR:/var/lib/postgresql/data" \
    postgres:16 >/dev/null
else
  docker start "$CONTAINER" >/dev/null
fi

for _ in {1..60}; do
  if docker exec "$CONTAINER" pg_isready -U postgres -d "$DB_NAME" >/dev/null 2>&1; then
    echo "postgres ready: $CONTAINER on 127.0.0.1:54390"
    exit 0
  fi
  sleep 1
done

echo "postgres did not become ready" >&2
exit 1
