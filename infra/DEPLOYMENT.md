# Production deployment — grokbot.dev

grokbot.dev is a **static Astro build served by nginx** on **crhq-products**
(`root@2.28.9.79`, a.k.a. products.crhq.ai), **behind Cloudflare (Full mode)**.
There is **no CI/CD** — deploys are a single self-contained script on the box.

## Layout — `/opt/projects/user/grokbot/`
| Path | What |
|---|---|
| `repo/` | Canonical checkout of `github.com/ZeroPointRepo/GrokBotDev` (public), owned `agent`. |
| `releases/<UTC-ts>/` | Each build's `dist/` snapshot. Last 5 kept. |
| `current` | Symlink → the active release. **nginx `root` points here** (both the public vhost and the preview). |
| `deploy.sh` | The deploy script. Kept **outside** `repo/` so `git reset` can't clobber it mid-run. |
| `secrets/votes-api.env` | External votes-api/static-build env file. Never commit it; keep it `chmod 600`. |
| `_archive/` | `coming-soon-dist.tgz` (the pre-launch landing) + the retired AM2studio placeholder checkout. |

## Deploy — publish the `production` branch
Production serves the **`production`** branch, not `main`. Normal flow is `infra/promote.sh` from
the dev box (fast-forwards `production` to a reviewed `main`, then runs this). Manual prod deploy:
```bash
ssh crhq-products
sudo -u agent /opt/projects/user/grokbot/deploy.sh
```
`deploy.sh`: `git reset --hard origin/production` → `npm ci` → `npm run build` (the **full gate** —
a red build aborts **before** anything is swapped, so the live site is never a broken release)
→ snapshot `dist/` to `releases/<ts>/` → atomically `ln -sfn` the `current` symlink → prune to 5.
Zero-downtime: the swap is a single symlink flip.

## Rollback — instant, no rebuild
```bash
sudo -u agent ln -sfn "$(ls -1dt /opt/projects/user/grokbot/releases/*/ | sed -n 2p)" \
  /opt/projects/user/grokbot/current
```
Points `current` at the previous release.

## nginx
- **Public** vhost `/etc/nginx/sites-available/grokbot.dev` (archived: `nginx-grokbot.dev.prod.conf`):
  §10.7 security headers on every location; every `.json`/`.xml`/`.txt` served with
  `Access-Control-Allow-Origin: *` + a **CF-real-IP machine access log** (`/var/log/nginx/grokbot-machine.log`);
  `/api/waitlist` → the services process on `:4390`; `80 → 301 https`; `404 → /404.html`.
  TLS reuses the generatespecs LE cert (CF Full does not validate the origin cert name — swap to a
  grokbot.dev Origin/LE cert later, no behaviour change).
- **Preview** vhost `/etc/nginx/projects.d/grokbot.conf` (archived: `nginx-grokbot-preview.crhq.conf`):
  `products-grokbot.crhq.ai`, serves the **same `current` symlink** so preview == production.
- Snippets on the box: `security-headers.conf` → `/etc/nginx/snippets/grokbot-security-headers.conf`;
  the machine `log_format` → `/etc/nginx/conf.d/grokbot-machine-log.conf`.

## Waitlist service
`grokbot-services` (pm2, user `agent`, `:4390`) is the newsletter POST endpoint. DB at
`/opt/data/grokbot/waitlist.sqlite`. Independent of the static site — the site works if it's down.

## Dynamic port map
- `127.0.0.1:4390` = existing `grokbot-services` waitlist/MCP service (`/api/waitlist`, `/mcp`, `/healthz`).
- `127.0.0.1:4391` = P1 `grokbot-votes-api` service (`/api/v1/*` votes endpoints).


## Upvotes P1 rollout / production notes

The upvotes stack adds a same-origin votes API and keeps the static build invariant. Production rollout is manual and review-gated:

1. Review and merge/promote only after `npm run build`, `services/votes-api npm test`, E2E, and `npm run recount` are green.
2. Provision Postgres 16 on crhq-products with an external data volume equivalent to `/opt/projects/grokbot-votes-data`; create a `grokbot_votes` database.
3. Create production secrets outside git: `VOTES_HMAC_PEPPER` (`openssl rand -hex 32`), Postgres passwords/URLs for `votes_app`, `votes_admin`, and the migration role, and Cloudflare Turnstile production `TURNSTILE_SECRET_KEY`. The browser gets only `PUBLIC_TURNSTILE_SITEKEY`.
   Required prod slug-registry lines:
   ```dotenv
   # Slug registry sync: force fallback to the deployed site manifest so new content publishes need no votes-api redeploy.
   USE_CASE_CONTENT_DIR=/nonexistent-force-fallback
   SLUGS_FILE=/opt/projects/user/grokbot/current/api-meta/use-case-slugs.json
   ```
   Production must use the deployed `current/api-meta/use-case-slugs.json` manifest as the permanent slug source. The `current` symlink is atomically updated on every promote and the API re-reads the manifest on the default `SLUG_REFRESH_MS` cadence (10 minutes), so newly published use cases become voteable without redeploying the service checkout.
4. Install and migrate on the production checkout: `cd services/votes-api && npm ci && npm run db:migrate && npm run build`.
5. Start `pm2` app `grokbot-votes-api` bound to `127.0.0.1:4391` with the external production env file.
6. Apply the nginx changes from `infra/nginx-grokbot.dev.votes.snippet.conf` (http-level `limit_req_zone` once, then server-level exact `/api/v1/identity`, `/api/v1/votes`, `/api/v1/votes/*`, and `/api/v1/health` proxy locations). Keep existing static `.json` handling untouched.
7. Copy the updated `infra/security-headers.conf` into `/etc/nginx/snippets/grokbot-security-headers.conf`; this consciously adds `https://challenges.cloudflare.com` for Turnstile script/frame/connect. Confirm `nginx -t` before reload.
8. No DNS change is expected for `grokbot.dev`; Cloudflare already fronts the origin. Do not change Cloudflare except to create/provision Turnstile production keys.
9. After reload, smoke-test: `/api/v1/health`, `/api/v1/votes/counts?slugs=<known>`, one Turnstile-backed vote, `npm run recount`, then monitor `pm2 logs grokbot-votes-api` and nginx 429s.
