---
type: use-case
name: Outlier · YouTube Researcher
slug: youtube-outlier-researcher
tagline: Find YouTube outliers worth stealing from
category: marketing
subcategory: content
bot_name: Outlier
what_it_does: "One of Peter's five bots is a YouTube outlier researcher — it hunts videos that outperform the channel's baseline so you can learn the format, not copy the topic blindly."
integrations: []
schedule: weekly
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
author:
  handle: petergyang
  url: https://x.com/petergyang
  platform: x
replicability: "Reconstructed from @petergyang's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Outlier** and connect the accounts it needs.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: youtube researcher.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way One of Peter's five bots is a YouTube outlier researcher — it hunts videos that outperform the channel's baseline so you can learn the forma
4. Run it each week; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: YouTube Outlier Researcher for my niche.

Each morning: scan my niche and the competitor channels I list. Flag videos whose views are 3x+ the channel median in the first 48 hours. If view-age data is incomplete, say so and use best available.

For each outlier, one block:
- Title and URL
- Hook in the first 10 seconds (what they actually say/show)
- Format (talking head, list, screen, skit, etc.)
- Thumbnail pattern (text, face, contrast)
- One sentence on why it likely worked — format, not topic

Save a weekly markdown doc. Do not comment, like, subscribe, or upload anything. Do not copy titles verbatim into my drafts. I steal structure; I do not clone videos.
```

## Why it's cool

One of Peter's five bots is a YouTube outlier researcher — it hunts videos that outperform the channel's baseline so you can learn the format, not copy the topic blindly.
