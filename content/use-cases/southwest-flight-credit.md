---
type: use-case
name: Credit · Flight Hunter
slug: southwest-flight-credit
tagline: Hunt a misplaced airline credit
category: personal
subcategory: travel
bot_name: Credit
what_it_does: "Same 24-hour run: Royce’s bot found a $150 Southwest flight credit he thought he had misplaced. Receipt, not a generic “travel agent” prompt."
integrations:
- Gmail
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
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

1. In Grok Bot, create a bot named **Credit** and connect Gmail.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: flight hunter.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Same 24-hour run: Royce’s bot found a $150 Southwest flight credit he thought he had misplaced. Receipt, not a generic “travel agent” prompt
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Airline credit hunter.

Mission: Find unused flight credits, vouchers, and leftover funds on the airlines I name (start with Southwest). Search Gmail confirmations and the airline account. Show me the code, amount, expiry.

Tools: Gmail, the airline site (I sign in). Search: credit, voucher, unused funds, Rapid Rewards wallet.

What good looks like:
- Each credit: amount, expiry, confirmation or wallet location, how to apply it.
- If Gmail says $150 and the site says $0, flag the mismatch — do not pick one.

Never, without asking: book a flight, apply a credit, change a trip, or email the airline. Never screenshot a full account number into a chat I did not open.

Stop if login needs extra ID and I am not at the screen.
```

## Why it's cool

Same 24-hour run: Royce’s bot found a $150 Southwest flight credit he thought he had misplaced. Receipt, not a generic “travel agent” prompt. It shows how a single Grok Bot can own flight hunter end to end, from the first trigger to the finished result — the kind of standing job people used to keep in their own heads.
