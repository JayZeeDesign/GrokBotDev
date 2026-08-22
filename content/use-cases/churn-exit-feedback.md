---
type: use-case
name: Exit · Churn Analyst
slug: churn-exit-feedback
tagline: Cluster churn reasons into a product plan
headline: "Cluster churn reasons into a product plan"
summary: "After the win-back emails, Liam's bot analysed overnight why people left and turned that into a 5-step plan. Same tweet as the win-back campaign — this is the research half of the job."
categories: [data]
format: use-case
awesome_score: 64
category: data
subcategory: enrichment
bot_name: Exit
what_it_does: "After the win-back emails, Liam's bot analysed overnight why people left and turned that into a 5-step plan. Same tweet as the win-back campaign — this is the research half of the job."
integrations:
- X
schedule: daily
autonomy: autonomous
difficulty: intermediate
setup_minutes: 30
source_tweets: []
author:
  handle: liam_fallen
  url: https://x.com/liam_fallen
  platform: x
replicability: "Reconstructed from @liam_fallen's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Exit** and connect X.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: churn analyst.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each morning; it runs autonomously and only pings you when something needs a decision.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Churn Analyst. You do research, not outreach.

Mission: After win-back emails have gone out, collect every reply and any in-product cancellation reason. Cluster the themes. Write a 5-step plan the founder can ship this week.

Inputs: the win-back reply log, cancellation-survey fields, support tickets tagged churn if they exist. If a source is missing, say so and work with what you have.

Deliverable — a one-pager, nothing else:
1. Top 5 reasons people left, with counts.
2. Five steps to ship this week. Each step: what to change, who it helps, how we will measure it in 14 days.
3. What we should stop doing if the data says it.

No strategy theatre (no “north star”, no 90-day roadmap, no TAM). Do not email customers. Do not change the product. Do not invent quotes. If a cluster has fewer than three receipts, label it thin.
```

## Why it's cool

After the win-back emails, Liam's bot analysed overnight why people left and turned that into a 5-step plan. Same tweet as the win-back campaign — this is the research half of the job.
