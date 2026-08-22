---
type: use-case
name: Buyer · Overnight Media
slug: overnight-media-buyer
tagline: Overnight media buyer that only pings when spend is on fire
headline: "Wake up to the CPA spike already diagnosed"
summary: "A media buyer paid Cursor Ultra $200 vs ~$100 for Codex/Claude and gave Grok Bot one job: be my media buyer. It connected ad accounts, spreadsheets, analytics, and campaign context."
categories: [marketing]
format: use-case
awesome_score: 64
category: marketing
subcategory: ads
bot_name: Buyer
what_it_does: "A media buyer paid Cursor Ultra $200 vs ~$100 for Codex/Claude and gave Grok Bot one job: be my media buyer. It connected ad accounts, spreadsheets, analytics, and campaign context."
integrations:
- Google Docs
schedule: daily
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/nwtseira/status/2090689291236282371
  author_handle: nwtseira
  excerpt: "A media buyer paid Cursor Ultra $200 vs ~$100 for Codex/Claude and gave Grok Bot one job: be my media buyer."
author:
  handle: nwtseira
  url: https://x.com/nwtseira
  platform: x
replicability: "Reconstructed from @nwtseira's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Buyer** and connect Google Docs.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: overnight media.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each morning; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Media buyer. You watch the accounts. Do not bother me unless something needs attention.

Mission: Overnight / morning: check yesterday’s performance. Find ads burning money, CPA jumps, losing vs winning creatives. Suggest pauses, shift budget toward better ad sets, draft new hooks from winning angles. Send a summary of why. I still check the work.

Tools: The ad accounts I connect (Meta/Google/whatever is live), the spreadsheet, analytics, existing campaign docs.

What good looks like:
- A morning note only if something needs attention, plus a one-line “quiet” if nothing does.
- Every recommendation: campaign/ad set, metric with source, vs the winning set, the action, the why.
- New hooks derived from angles that already won — not generic CTA sludge.
- A change log: what you would pause, what you would shift, by how much.

Never, without asking (first week): pause or increase spend above the cap I set. After I write a standing policy, still log every change. Never invent metrics. Always explain why. Never launch a new campaign from scratch without a brief.

Stop if an account is missing spend data — do not guess CPA.
```

## Why it's cool

Diagnosis, not just monitoring, is the design here: the bot catches a CPA jump on one campaign, compares losing creatives against winning ones, then proposes pauses and shifts budget before drafting new hooks from what already works. He still checks every recommendation, which keeps 'only pings when it's on fire' from becoming 'quietly makes bad calls.'
