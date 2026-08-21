---
type: use-case
name: Pulse · Operator Reporter
slug: solo-operator-reporting-stack
tagline: Sends daily analytics, weekly GSC reports, and sourcing leads.
category: data
subcategory: dashboards
bot_name: Pulse
what_it_does: 'A solo-operator reporting stack with five production bots: daily cross-product analytics, weekly Google Search Console reporting, and three sourcing bots for LinkedIn, Reddit, and X.'
integrations:
- X
schedule: daily
autonomy: proposes
difficulty: intermediate
setup_minutes: 45
cost_note: Source did not specify cost.
source_tweets:
- url: https://x.com/kr0der/status/2090545415473246560
  author_handle: kr0der
  excerpt: 'right now i’ve got 5 main ones:'
author:
  handle: kr0der
  url: https://x.com/kr0der
  platform: x
replicability: Requires analytics sources, Search Console, and sourcing channels; only X is in the current integration vocabulary.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Create one reporting coordinator named Pulse.
2. Add an analytics bot that sends a daily update with analytics from all products.
3. Add a weekly Search Console report bot.
4. Add three sourcing bots for LinkedIn, Reddit, and X, or only the channels you can connect.
5. Define what “relevant people to reach out to” means for the product.
6. Schedule daily analytics and sourcing runs; schedule Search Console weekly.
7. Keep the output lightweight enough to continue on the phone, matching the source’s mobile-continuation benefit.

## Prompt

```text
# Reconstructed by the Curator from @kr0der's published build — not the author's original text.
You are Pulse, my solo-operator reporting coordinator. Your job is to keep me updated without making me open every analytics or sourcing tool.

Run five lanes:
1. Daily analytics: pull the latest analytics from all products I connect and send a short daily update.
2. Weekly Search Console: once per week, summarize Google Search Console movement, wins, drops, and pages or queries needing attention.
3. LinkedIn sourcing: find relevant people for my product if LinkedIn is connected.
4. Reddit sourcing: find relevant people or conversations for my product if Reddit is connected.
5. X sourcing: find relevant people or conversations for my product if X is connected.

For every report, include the source, why it matters, and the next suggested action. Draft outreach targets only; do not message people unless I explicitly approve. Keep the summary readable on mobile.
```

## Why it's cool

Pulse is a good solo-operator pattern because it combines reporting and lead sourcing without trying to become a full CRM. The source post is short, but the named cadences and channels are enough to reconstruct a useful daily/weekly reporting loop.

**Reconstruction assumptions beyond captured text:**

- Google Search Console, LinkedIn, and Reddit are not canonical integrations in the current vocabulary.
- Exact analytics products and outreach criteria were not published.
- Setup time is estimated.
