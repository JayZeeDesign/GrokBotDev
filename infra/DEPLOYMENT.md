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
