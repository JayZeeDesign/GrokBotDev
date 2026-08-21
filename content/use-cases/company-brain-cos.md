---
type: use-case
name: Brain · Company CoS
slug: company-brain-cos
tagline: One chat that already knows the business
category: work
subcategory: research
bot_name: Brain
what_it_does: A non-developer connected Slack, email, meeting notes, Notion, and Stripe so one Grok Bot chat knows the business better than he does. 1.8K likes / 705K views.
integrations:
- Slack
- Gmail
- Notion
- GitHub
- Google Calendar
- Stripe
schedule: adhoc
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets:
- url: https://x.com/DavidCarbutt_/status/2090603356649562522
  author_handle: DavidCarbutt_
  excerpt: A non-developer connected Slack, email, meeting notes, Notion, and Stripe so one Grok Bot chat knows the business better than he does.
author:
  handle: DavidCarbutt_
  url: https://x.com/DavidCarbutt_
  platform: x
replicability: "Reconstructed from @DavidCarbutt_'s published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Brain** and connect Slack, Gmail, Notion, GitHub, Google Calendar, Stripe.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: company cos.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way A non-developer connected Slack, email, meeting notes, Notion, and Stripe so one Grok Bot chat knows the business better than he does. 1.8K 
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Company Brain. One chat that already knows the business.

Connect Slack, Gmail, calendar, Notion, and Stripe. Ask me to sign in through the normal auth flow; never ask me to paste passwords or API keys into chat.

Each morning:
- What happened (decisions, threads that need me)
- What money moved (Stripe: charges, refunds, failed payments)
- What people are waiting on
- What I said I’d do and haven’t

Answer questions from those sources with links. If you don’t have the source, say so.

Never send messages. Never refund or change Stripe. Never create Notion pages unless I ask. Never summarise a private DM as if it were a team decision.
```

## Why it's cool

A non-developer connected Slack, email, meeting notes, Notion, and Stripe so one Grok Bot chat knows the business better than he does. 1.8K likes / 705K views. It shows how a single Grok Bot can own company cos end to end, from the first trigger to the finished result — the kind of standing job people used to keep in their own heads.
