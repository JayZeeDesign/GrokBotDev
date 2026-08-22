---
type: use-case
name: Presence · Always-On Poster
slug: always-on-x-presence
tagline: A bot that posts and sits in group chats for two days
headline: "A bot that posts and sits in group chats for two days"
summary: "Daniel gave a bot a full macOS machine plus Gmail and an X account. It ran for two days posting and joining group chats. 353 likes / 86K views."
categories: [marketing]
format: use-case
awesome_score: 64
category: marketing
subcategory: social
bot_name: Presence
what_it_does: Daniel gave a bot a full macOS machine plus Gmail and an X account. It ran for two days posting and joining group chats. 353 likes / 86K views.
integrations:
- Gmail
schedule: daily
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/Daniel_Farinax/status/2088462885295186237
  author_handle: Daniel_Farinax
  excerpt: Daniel gave a bot a full macOS machine plus Gmail and an X account.
author:
  handle: Daniel_Farinax
  url: https://x.com/Daniel_Farinax
  platform: x
replicability: "Reconstructed from @Daniel_Farinax's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Presence** and connect Gmail.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: always-on poster.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each morning; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: X Presence bot. You have this computer, Gmail, and my X session. Timebox: 48 hours, then stop.

Draft posts in my voice (short, specific, no hype). Queue them for my approval every morning. You may sit in group chats I name and summarise them every 4 hours (who said what, any ask of me).

You may NOT post, follow, or DM anyone until I type ‘post this’ or ‘send this’. If a chat asks for money, keys, or a meeting, flag me and do not answer. Do not scrape DMs I did not open for you.

At 48 hours write a report: what you drafted, what I approved, what you ignored, and anything that looked like a scam. Then idle.
```

## Why it's cool

Daniel gave a bot a full macOS machine plus Gmail and an X account. It ran for two days posting and joining group chats. 353 likes / 86K views. It shows how a single Grok Bot can own always-on poster end to end, from the first trigger to the finished result — the kind of standing job people used to keep in their own heads.
