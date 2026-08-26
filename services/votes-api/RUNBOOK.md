# grokbot votes API runbook

P1 local-only service for anonymous use-case upvotes. The API binds `127.0.0.1:4390`; nginx exposes only `/api/v1/*` on the review vhost.

## Local start / stop

```bash
cd /opt/projects/grokbotdev-upvotes/services/votes-api
npm install
npm run db:start      # creates /opt/projects/grokbot-votes-data and .env if missing
npm run db:migrate
npm run build
pm2 start ecosystem.config.cjs --update-env
pm2 logs grokbot-votes-api --lines 100
```

Stop without deleting data:

```bash
pm2 stop grokbot-votes-api
# optional DB stop
docker stop grokbot-votes-pg
```

## Database

- Container: `grokbot-votes-pg` (Postgres 16)
- Host port: `127.0.0.1:54390`
- Data volume: `/opt/projects/grokbot-votes-data`
- App role: `votes_app` (no `UPDATE`/`DELETE` on `vote_events`)
- Admin role: `votes_admin` (CLI maintenance)

Apply migrations:

```bash
cd /opt/projects/grokbotdev-upvotes/services/votes-api
npm run db:migrate
```

## Backups

Nightly cron example (operator adjusts retention/storage):

```cron
17 3 * * * cd /opt/projects/grokbotdev-upvotes/services/votes-api && \
  /usr/bin/env bash -lc 'set -a; . ./.env; set +a; mkdir -p /opt/backups/grokbot-votes; pg_dump "$ADMIN_DATABASE_URL" | gzip > /opt/backups/grokbot-votes/grokbot_votes_$(date -u +\%Y\%m\%dT\%H\%M\%SZ).sql.gz'
```

## Restore drill

1. Stop API writes: `pm2 stop grokbot-votes-api`.
2. Restore into a fresh database/container from the selected dump.
3. Run `npm run recount` and confirm `hash_chain: "clean"`.
4. Point `.env` URLs at the restored DB.
5. Restart API: `pm2 start ecosystem.config.cjs --update-env`.

## Recount / ledger verification

`vote_events` is append-only and hash-chained. Rebuild materialized `votes` and `vote_counts` from the ledger:

```bash
cd /opt/projects/grokbotdev-upvotes/services/votes-api
npm run recount
```

Expected clean output includes `"ok": true` and `"hash_chain": "clean"`.

## Flag review

```bash
npm run review-flags -- list
npm run review-flags -- bless --slug account-expert --flag velocity --reason "operator reviewed campaign"
npm run review-flags -- bury  --slug account-expert --flag velocity --reason "bot cluster"
```

The CLI records the decision in `audit_log`, verifies the hash chain, and rebuilds materialized `votes`/`vote_counts`; the ledger remains append-only.

## Daily digest

```bash
npm run digest
```

Shows 24h event totals, top slugs, and flag counts.

## Pepper/key rotation

The `VOTES_HMAC_PEPPER` signs voter cookies and HMACs IP/UA signals. Rotation invalidates existing anonymous cookies and changes future IP hashes.

1. Schedule a quiet window.
2. Stop API writes.
3. Update `.env` with a fresh `openssl rand -hex 32` pepper.
4. Restart API. Existing votes remain in the ledger/counts, but returning users receive new identities when they vote again.
5. Keep old `.env` in secure operator secret storage only if forensic verification of old IP hashes is required.

## Surge alert checklist

1. Check API health: `curl -s https://grokbot-upvotes.anacreon.ai/api/v1/health`.
2. Check nginx 429s and pm2 logs.
3. Run `npm run digest` and `npm run review-flags -- list`.
4. If abuse is clear, tighten nginx `limit_req` temporarily and/or stop `grokbot-votes-api`.
5. Do not mutate `vote_events`. Use `review-flags` + `recount` after operator review.
