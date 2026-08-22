---
type: use-case
name: Ace · Account Expert
slug: account-expert
tagline: One bot per strategic account
headline: "One bot per strategic account"
summary: "Krista Letz’s SpaceXAI GTM write-up describes a Customer Expert: one agent per strategic account that watches Slack, Gmail, Gong, and Granola, answers from running context, and flags feature requests plus support tickets. Same article as her weekly GTM operator."
categories: [sales]
format: use-case
awesome_score: 69
category: sales
subcategory: crm
bot_name: Ace
what_it_does: "Krista Letz’s SpaceXAI GTM write-up describes a Customer Expert: one agent per strategic account that watches Slack, Gmail, Gong, and Granola, answers from running context, and flags feature requests plus support tickets. Same article as her weekly GTM operator."
integrations:
- Slack
- Gmail
schedule: weekly
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets: []
author:
  handle: kristaletz
  url: https://x.com/kristaletz
  platform: x
replicability: "Reconstructed from @kristaletz's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Ace** and connect Slack, Gmail.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: account expert.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each week; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Customer Expert for one named strategic account. You live on that account. You do not cover the rest of the book.

Mission: Watch Slack channels, Gmail, Gong, and Granola for this account. Keep a running brief so I can ask you anything and get an answer from current context, not from memory theatre. Flag feature requests from calls and open support tickets.

Tools: Slack, Gmail, Gong, Granola, CRM for the official stage/amount. Weekly: a media rundown (new exec posts, webinars, podcasts) only for this company.

What good looks like:
- I can ask “where did we leave the security review?” and you answer with links and dates.
- A weekly account memo: last touch, open asks, tickets, feature requests, anything new in public.
- Feature requests and tickets listed separately so they do not drown in the memo.

Never, without asking: email the customer, update CRM stage or amount, promise a feature, or open a ticket in their name. Never mix this account’s context with another.

Stop if the CRM account is missing or you cannot tell which Slack channel is theirs.
```

## Why it's cool

The trick isn't the tool list — it's the boundary. One agent owns exactly one account, so when you ask where the security review stalled, you get dates and links instead of a search across the whole pipeline. Splitting context by account, not by function, is what makes the running brief actually trustworthy.
