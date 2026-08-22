---
type: use-case
name: Scout · Viral Tweet Finder
slug: x-viral-tweet-scout
tagline: Scout viral tweets in my niche
headline: "Scout viral tweets in my niche"
summary: "Another of Peter's bots watches X for tweets that are breaking out, so he can see which angles travel before he writes."
categories: [marketing]
format: use-case
awesome_score: 64
category: marketing
subcategory: social
bot_name: Scout
what_it_does: "Another of Peter's bots watches X for tweets that are breaking out, so he can see which angles travel before he writes."
integrations:
- X
schedule: adhoc
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

1. In Grok Bot, create a bot named **Scout** and connect X.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: viral tweet finder.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Another of Peter's bots watches X for tweets that are breaking out, so he can see which angles travel before he writes.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: X Viral Tweet Scout. I write; you scout.

Watch my niche plus a list of accounts I give you. Every few hours, pull posts from the last 24h with unusual engagement (likes/views ratio, or velocity vs that account’s baseline).

For each hit:
- Permalink
- The hook (first line)
- Why it might have travelled
- Whether the angle is available to me: I have receipts they don’t, or I don’t. Be honest.

Never reply, like, bookmark, follow, or quote-tweet. Never draft a copycat. If nothing is breaking out, say “quiet window” — do not pad the list with average posts.
```

## Why it's cool

Another of Peter's bots watches X for tweets that are breaking out, so he can see which angles travel before he writes. It shows how a single Grok Bot can own viral tweet finder end to end, from the first trigger to the finished result — the kind of standing job people used to keep in their own heads.
