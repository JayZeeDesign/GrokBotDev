# grokbot.dev — development guidelines (read me first)

**This is the canonical, in-repo development guide. It travels with the code to every machine
(local, crhq-products, any clone), so it is the source of truth for any agent or engineer working
here.** Deeper detail lives in `infra/DEPLOYMENT.md`, `CONTRIBUTING.md`, and `docs/build-notes/`.

## What this is
grokbot.dev is a **static Astro 5 site** — an autonomous, agent-run directory of Grok Bot use
cases, plugins and collections. The repo IS the database: content is markdown under `content/`,
validated by a Zod schema (`src/content.config.ts`); the build emits the site + a static JSON API
(`/api/v1/**`) + RSS + `llms.txt`. There is one tiny dynamic piece: the newsletter waitlist
(`services/`, a separate process). Everything else is static.

## The site is LIVE
`https://grokbot.dev` is in production. Treat `production` as sacred — nothing reaches it except a
deliberate, reviewed promotion (below).

## Environments
| Env | URL | Where | Reflects | Purpose |
|---|---|---|---|---|
| **dev** | https://grokbotdev.anacreon.ai | anacreon box, pm2 `grokbotdev-web` (astro preview :4381) | your **local working tree** | live iteration while you build |
| **staging** | https://grokbot-staging.crhq.ai *(basic auth `grokbot:botstakeover`)* | crhq-main, static | the **`main`** branch you push | review before production; where multiple commits are checked together |
| **prod** | https://grokbot.dev | crhq-products, static via `current` symlink | the **`production`** branch | live |

## Branch model
- **`main`** = integration / staging. All work lands here (direct commits by maintainers/agents,
  or community PRs). Commits accumulate here freely; landing on `main` does NOT touch production.
- **`production`** = the live pointer. Only ever **fast-forwarded from a reviewed `main` commit**.
  The prod deploy serves this branch. This decoupling is deliberate: with multiple agents pushing
  to `main`, nothing goes live by accident.

## The workflow (every change follows this)
1. **Build & iterate locally.** Edit in this repo. `npm run build` MUST be green — never commit a
   red build (`validate: OK` and a clean `check-links`/`audit-scripts` are the floor). Preview on
   **dev** (`pm2 restart grokbotdev-web`).
2. **Commit to `main` and push.** Small, focused commits. Multiple commits per change set are fine.
3. **Deploy to staging & review:** `infra/deploy-staging.sh`. Open **staging**, review the whole
   change set (desktop + mobile). Loop 1–3 until it's all clear.
4. **Promote to production** only when clear: `infra/promote.sh` — fast-forwards `production` to
   `main`, then runs the prod deploy (gated build → atomic swap). Verify `https://grokbot.dev`.
5. **Rollback** if anything's off: instant symlink flip (see `infra/DEPLOYMENT.md`).

### Commands
```bash
# stage main for review
infra/deploy-staging.sh

# promote reviewed main -> production and publish
infra/promote.sh

# (prod, manual) deploy whatever production points at
ssh crhq-products; sudo -u agent /opt/projects/user/grokbot/deploy.sh

# rollback prod to the previous release (no rebuild)
ssh crhq-products
sudo -u agent ln -sfn "$(ls -1dt /opt/projects/user/grokbot/releases/*/ | sed -n 2p)" /opt/projects/user/grokbot/current
```

## Quality gates & conventions (the short list — detail in docs/build-notes/)
- **`npm run build` is the gate.** It runs validate → contrast → hub-intros → astro build → og →
  redirects → keyword-placements → pagefind → check-links → audit-scripts. A red build never ships.
- **Copy is governed:** all user-facing strings are `CP_*` constants in `src/lib/copy.ts`. Pages
  never inline copy; reword in `copy.ts`.
- **Componentize; no duplicate front-end.** New UI patterns get defined once (style-guide-first)
  then reused. One change propagates everywhere.
- **One accent per viewport** (the amber). **Prefer radio + `:has()` over new JS islands.** A dead
  control is worse than no control: anything needing JS ships `hidden` and the island un-hides it.
- **No page ever scrolls sideways** (F6). Machine endpoints (`.json`/`.xml`/`.txt`) are served with
  CORS `*`. See `docs/build-notes/BUILD-NOTES.md` for the traps found the hard way.
- **Commits:** end the message with `Co-Authored-By: CRHQ <noreply@crhq.ai>`.
- **Community PRs** add `content/**` only and are validated by CI; see `CONTRIBUTING.md`.

## Deploy internals & server
See **`infra/DEPLOYMENT.md`** — layout under `/opt/projects/user/grokbot/` on crhq-products
(`repo/`, `releases/<ts>/`, `current` symlink, `deploy.sh`, `_archive/`), nginx (CORS + §10.7
CSP + CF-real-IP machine log), TLS, and the waitlist service.
