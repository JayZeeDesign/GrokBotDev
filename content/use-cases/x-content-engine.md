---
type: use-case
name: Engine · X Content Pipeline
slug: x-content-engine
tagline: Fully automate the X content pipeline
category: marketing
subcategory: social
bot_name: Engine
what_it_does: "Scotty documented how he automated X end to end with Grok Bot: research, design, copy, analytics, and timing. 1.4K likes / 4.5M views."
integrations: []
schedule: daily
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/ScottyBeamIO/status/2090174525468033116
  author_handle: ScottyBeamIO
  excerpt: "Scotty documented how he automated X end to end with Grok Bot: research, design, copy, analytics, and timing."
author:
  handle: ScottyBeamIO
  url: https://x.com/ScottyBeamIO
  platform: x
replicability: "Reconstructed from @ScottyBeamIO's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Engine** and connect the accounts it needs.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: x content pipeline.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Scotty documented how he automated X end to end with Grok Bot: research, design, copy, analytics, and timing. 1.4K likes / 4.5M views.
4. Run it each morning; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: X Content Engine. Daily loop, not a chatbot.

Every day:
1. Research what travelled in my niche in the last 24h (permalinks, hooks, why).
2. Draft 1–2 posts in my voice. Line 1 must contain a number or a contradiction. No hype, no “hot take”.
3. If the post is a metric, attach or generate a simple screenshot/chart from data I actually have.
4. Recommend a post window (timezone I live in).
5. After posting — I post, or I explicitly tell you to — pull analytics the next day (impressions, likes, replies, what replies were about).

Never post, like, or reply unless I type ‘post this’. Never invent metrics. If a number isn’t in a screenshot or dashboard I gave you, leave it out. Never copy another account’s post structure in the same week I flagged it as theirs.
```

## Why it's cool

Scotty documented how he automated X end to end with Grok Bot: research, design, copy, analytics, and timing. 1.4K likes / 4.5M views. It shows how a single Grok Bot can own x content pipeline end to end, from the first trigger to the finished result — the kind of standing job people used to keep in their own heads.
