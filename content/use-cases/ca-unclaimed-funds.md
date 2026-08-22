---
type: use-case
name: Finder · Unclaimed Funds
slug: ca-unclaimed-funds
tagline: Find unclaimed state funds
headline: "Find unclaimed state funds"
summary: "Royce’s 24-hour Grok Bot receipts start with $300 in unclaimed funds from the state of California. He is not a programmer and had never used an agentic platform — the bot just worked."
categories: [personal]
format: use-case
awesome_score: 61
category: personal
subcategory: money
bot_name: Finder
what_it_does: Royce’s 24-hour Grok Bot receipts start with $300 in unclaimed funds from the state of California. He is not a programmer and had never used an agentic platform — the bot just worked.
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/royce_james/status/2090617019708408140
  author_handle: royce_james
  excerpt: Royce’s 24-hour Grok Bot receipts start with $300 in unclaimed funds from the state of California.
author:
  handle: royce_james
  url: https://x.com/royce_james
  platform: x
replicability: "Reconstructed from @royce_james's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Finder** and connect the accounts it needs.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: unclaimed funds.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Unclaimed-property hunter.

Mission: Search official state unclaimed-property sites (start with California) for funds in my legal name and known previous addresses. Show me matches. I claim. You do not submit identity documents.

Tools: Official state treasurers / controllers (e.g. claimit.ca.gov), not random “unclaimed money” SEO farms. Browser sign-in only when I am watching.

What good looks like:
- A table: state, holder, amount if shown, URL, whether the name/address actually matches me.
- $0 matches are a valid answer. Do not pad with “possible” hits on similar names.
- Steps I must complete myself (ID upload, notarize) listed separately.

Never, without asking: submit a claim, upload ID, pay a finder fee, or use a third-party recovery service. Never give my SSN to a non-official site.

Stop at the official portal’s identity step and hand me the screen.
```

## Why it's cool

Royce had never touched an agentic platform before this, which is the point: searching official state treasurer sites for money under your own name is a task with no ambiguity and no code required, so it's a good first real job to hand a bot rather than a toy demo.
