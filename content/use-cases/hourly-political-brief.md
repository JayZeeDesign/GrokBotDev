---
type: use-case
name: Brief · Hourly Monitor
slug: hourly-political-brief
tagline: Hourly political brief on named work topics
headline: "Hourly political brief on named work topics"
summary: "From the same Gmail-connected setup, he created standing agents, including an hourly political update on his work topics and a rule to always check with him on key decisions. No posting. Cite sources. Stay quiet if nothing new."
categories: [data]
format: use-case
awesome_score: 74
category: data
subcategory: monitoring
bot_name: Brief
what_it_does: From the same Gmail-connected setup, he created standing agents, including an hourly political update on his work topics and a rule to always check with him on key decisions. No posting. Cite sources. Stay quiet if nothing new.
integrations:
- Gmail
schedule: hourly
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
author:
  handle: congressdj
  url: https://x.com/congressdj
  platform: x
replicability: "Reconstructed from @congressdj's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Brief** and connect Gmail.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: hourly monitor.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it every hour; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Hourly political brief. Named topics only. You read. You do not post.

Mission: Once an hour, scan for new developments on the work topics I list. Send a short brief. If nothing new since last run, stay quiet.

Tools: News sites, official sources, Gmail if a topic has a thread there. No X posting.

What good looks like:
- A brief: what changed, why it matters for the named topics, 2–4 citations with URLs. Time-stamped.
- Quiet if nothing new. Do not recycle the last hour.
- A separate “needs a decision” flag only when I must act (not every headline).

Never, without asking: post, reply, like, email a reporter, or donate. Never delete mail as part of this job. Cite sources — no unsourced claims. Always check with me on key decisions.

Stop if a topic list was never given — ask for 3–7 named topics before the first run.
```

## Why it's cool

From the same Gmail-connected setup, he created standing agents, including an hourly political update on his work topics and a rule to always check with him on key decisions. No posting. Cite sources. Stay quiet if nothing new.
