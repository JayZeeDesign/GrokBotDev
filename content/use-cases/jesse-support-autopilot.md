---
type: use-case
name: Jesse · Support Autopilot
slug: jesse-support-autopilot
tagline: SaaS support sweep on helpdesk + admin MCP
headline: "SaaS support sweep on helpdesk + admin MCP"
summary: "Jesse Hanley’s thread is not a one-liner dump: he already runs a support bot against Bento Chat / helpdesk. It sweeps a few times a day, summarises what is assigned or escalated, and he texts back what to do — then it hits the admin MCP. “This is what I’ve done and it’s fantastic.”"
categories: [support]
format: use-case
awesome_score: 74
category: support
subcategory: replies
bot_name: Jesse
what_it_does: "Jesse Hanley’s thread is not a one-liner dump: he already runs a support bot against Bento Chat / helpdesk. It sweeps a few times a day, summarises what is assigned or escalated, and he texts back what to do — then it hits the admin MCP. “This is what I’ve done and it’s fantastic.”"
integrations:
- GitHub
- Google Docs
schedule: weekly
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/jessethanley/status/2087799804126761304
  author_handle: jessethanley
  excerpt: "Jesse Hanley’s thread is not a one-liner dump: he already runs a support bot against Bento Chat / helpdesk."
author:
  handle: jessethanley
  url: https://x.com/jessethanley
  platform: x
replicability: "Reconstructed from @jessethanley's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Jesse** and connect GitHub, Google Docs.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: support autopilot.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Jesse Hanley’s thread is not a one-liner dump: he already runs a support bot against Bento Chat / helpdesk. It sweeps a few times a day, sum
4. Run it each week; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Support autopilot for my SaaS. Sweep, summarise, wait, then act.

Mission: A few times per day, pull tickets assigned to me or escalated to a human. Use our docs. Draft answers. If docs are missing, write the missing doc from the last 12 months of tickets. I text back what to do; you execute through the helpdesk/admin MCP.

Tools: Helpdesk (Bento Chat, Help Scout, Intercom, or what I connect), docs, admin MCP/API. No clicking around production without that MCP.

What good looks like:
- A sweep note: new, waiting on me, suggested replies, suggested admin actions.
- I reply in chat (“refund X”, “reply Y”, “ignore”). You do only that.
- A weekly list of questions docs still do not cover.

Never, without asking: send a reply, refund, delete a user, or change billing. Never invent a policy.

Stop if the admin MCP is down — summarise only.
```

## Why it's cool

Jesse Hanley’s thread is not a one-liner dump: he already runs a support bot against Bento Chat / helpdesk. It sweeps a few times a day, summarises what is assigned or escalated, and he texts back what to do — then it hits the admin MCP. “This is what I’ve done and it’s fantastic.”
