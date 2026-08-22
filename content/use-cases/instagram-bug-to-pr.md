---
type: use-case
name: "Support Line · Bug to Fix"
slug: instagram-bug-to-pr
headline: "An Instagram bug report that routes itself to QA"
summary: "Dan Peguine's Grok Bot watches his Instagram inbox. A website-bug complaint got routed to a QA bot in the Ship channel (with his engineer bot 'David'); QA tested the funnel, found nothing, and had a Writer bot reply — and a real bug would have become David's fix and a PR."
categories: [support]
format: use-case
tagline: "A bot watches your social inbox and routes bug reports to QA, a fix, and a reply."
category: support
subcategory: escalation
bot_name: "Support Line"
what_it_does: "A Grok Bot watches your social inbox; a bug report escalates to a QA bot in a shared channel with an engineer bot, QA reproduces it, a Writer bot replies to the customer, and a real bug becomes a fix and a PR — a support-to-engineering loop you don't touch."
integrations: []
schedule: none
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 25
source_tweets:
  - url: https://x.com/danpeguine/status/2091109796686471339
    author_handle: danpeguine
    excerpt: "my @bot is monitoring my instagram inbox ... it let the QA agent know inside the Ship channel ... QA immediately started testing the funnel"
    posted_at: "2026-08-22T16:00:00Z"
author:
  handle: danpeguine
  url: https://x.com/danpeguine
  platform: x
prompt_provenance: curator
replicability: "A Curator reconstruction of Dan's multi-bot setup. To adapt: give an inbox-watcher access to your social DMs, put a QA bot and an engineer bot in one shared channel, define the report→reproduce→fix/reply path, and keep the customer reply and any PR merge behind approval."
awesome_score: 73
score_breakdown:
  reproducibility: 15
  ambition: 17
  concreteness: 15
  novelty: 13
  evidence: 6
  craft: 7
featured: false
added_at: "2026-08-22T16:00:00Z"
updated_at: "2026-08-22T16:00:00Z"
verified_at: "2026-08-22T16:00:00Z"
status: live
---

## How it's set up

1. Give an inbox-watcher bot access to your Instagram (or other social) inbox to catch incoming complaints and bug reports.
2. Create a shared **Ship channel** holding a **QA** bot and an **engineer** bot (Dan's is named 'David').
3. When a bug is reported, the watcher posts it into the Ship channel and tags QA.
4. QA reproduces it — tests the funnel/flow the customer described. If nothing's wrong, a **Writer** bot drafts the reply back to the customer.
5. If QA finds a real bug, the engineer bot fixes it and opens a PR for your review. Keep the customer reply and the PR merge behind your approval.

## Prompt

```text
You run my front-line support-to-engineering loop across a team. Watch my social inbox and turn bug reports into either a clear reply or a fix.

When a message looks like a bug report or complaint about the product:
1. Post a concise summary into the Ship channel and tag the QA bot: what the customer said, where, and any link.
2. QA: reproduce it — walk the exact flow/funnel described. Report what you actually observed.
3. If QA finds no problem: the Writer bot drafts a friendly reply to the customer explaining what you checked. Show it to me before sending.
4. If QA confirms a bug: the engineer bot proposes a fix and opens a PR for my review — do not merge without me. Then the Writer drafts the customer reply once a fix is in motion.

Rules: never tell a customer something is fixed unless it is; never merge or ship without my approval; keep the whole thread visible in the Ship channel so I can see who did what.
```

## Why it's cool

It's a whole support desk and a slice of an engineering team wired together. One complaint in a social inbox becomes a reproduction attempt, a real reply, and — when warranted — a fix and a PR, with the humans only in the approval seats. The clever bit is the shared channel as the handoff surface: support, QA, and engineering bots passing one issue between them instead of a person forwarding screenshots around.
