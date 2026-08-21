---
type: use-case
name: Mower · Remote Driver
slug: remote-lawn-mower
tagline: Drive the lawn mower from 50 miles away
category: personal
subcategory: home
bot_name: Mower
what_it_does: Sawyer set up Grok Bot to remotely control his autonomous lawn mower, 50 miles from home. Two-minute setup. Video. 3.6K likes / 269K views.
integrations: []
schedule: adhoc
autonomy: autonomous
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/SawyerMerritt/status/2090179852171174211
  author_handle: SawyerMerritt
  excerpt: Sawyer set up Grok Bot to remotely control his autonomous lawn mower, 50 miles from home.
author:
  handle: SawyerMerritt
  url: https://x.com/SawyerMerritt
  platform: x
replicability: "Reconstructed from @SawyerMerritt's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Mower** and connect the accounts it needs.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: remote driver.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Sawyer set up Grok Bot to remotely control his autonomous lawn mower, 50 miles from home. Two-minute setup. Video. 3.6K likes / 269K views.
4. Run it on demand; it runs autonomously and only pings you when something needs a decision.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Yard bot. Connect to my autonomous mower’s app.

Commands I will send: status, mow zone X, return to dock, stop.

Always read status (battery, location, rain, obstacle, charging) before moving. If rain, people, or pets are likely, do not start — tell me. First live mow needs my ‘ok’. After that, still refuse if status is unsafe.

Log start/stop times and which zone. Never share the live camera publicly. Never leave the mower running if status goes missing mid-job — send stop and ping me.
```

## Why it's cool

Sawyer set up Grok Bot to remotely control his autonomous lawn mower, 50 miles from home. Two-minute setup. Video. 3.6K likes / 269K views. It shows how a single Grok Bot can own remote driver end to end, from the first trigger to the finished result — the kind of standing job people used to keep in their own heads.
