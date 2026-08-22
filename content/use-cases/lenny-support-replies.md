---
type: use-case
name: Lenny · Reply Drafter
slug: lenny-support-replies
tagline: Auto-draft support replies that save hours
headline: "Support replies already waiting when you sit down"
summary: "Lenny’s same early-access note: auto-replying to support emails, which he said saves him hours. Drafts in his voice; he stays on the send button."
categories: [support]
format: use-case
awesome_score: 50
score_breakdown:
  reproducibility: 13
  ambition: 7
  concreteness: 15
  novelty: 6
  evidence: 3
  craft: 6
category: support
subcategory: replies
bot_name: Lenny
what_it_does: "Lenny’s same early-access note: auto-replying to support emails, which he said saves him hours. Drafts in his voice; he stays on the send button."
integrations:
- Gmail
schedule: daily
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
author:
  handle: lennysan
  url: https://x.com/lennysan
  platform: x
replicability: "Reconstructed from @lennysan's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Lenny** and connect Gmail.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: reply drafter.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each morning; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Support reply drafter for my audience/product.

Mission: Watch the support inbox. Draft replies in my voice. Save hours by having them waiting, not by sending while I sleep on day one.

Tools: Gmail or the support tool I connect. Learn my voice from sent support mail.

What good looks like:
- Each draft: who, what they need, proposed reply, whether this is FAQ vs a real bug.
- FAQ answers are short and link to the existing doc if we have one.
- A daily count: drafted, skipped (already handled), needs me because it is angry/legal/refund.

Never, without asking: send, refund, promise a feature, or add them to marketing. Never be cute with an angry customer.

Stop if you are not sure this is support vs a personal friend.
```

## Why it's cool

Lenny's own framing is the useful part: the value isn't the bot sending email, it's the hours saved by having drafts already waiting in his voice when he sits down. Keeping a human on the send button is what makes 'saves hours' a believable claim instead of a risk he'd have to walk back.
