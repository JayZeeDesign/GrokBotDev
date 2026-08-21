---
type: use-case
name: "Newsroom · Solo Newsletter Business"
slug: solo-newsletter-business
tagline: "Run a whole newsletter business with a team of Grok Bot agents."
category: marketing
subcategory: content
bot_name: Newsroom
what_it_does: "Greg Isenberg's thread on his friend Billy: a non-technical solo founder runs an entire newsletter business on a team of Grok Bot agents — research, drafting, editing, scheduling and growth handled by the agents, so one person operates what used to need a small team."
integrations: []
schedule: daily
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 120
source_tweets:
- url: https://x.com/gregisenberg/status/2090901863814017300
  author_handle: gregisenberg
  excerpt: "My friend Billy runs his whole newsletter business on Grok Bot agents, and I think we're about to see 100,000+ businesses like his."
  posted_at: '2026-08-21T20:40:26Z'
replicability: "Reconstructed from Greg Isenberg's thread describing his friend Billy's newsletter business run on Grok Bot agents. The prompt is a Curator reconstruction of that setup — adapt the roles, cadence, and connected tools to your own newsletter and stack."
featured: false
added_at: '2026-08-21T20:00:00Z'
updated_at: '2026-08-21T20:40:26Z'
verified_at: '2026-08-21T20:40:26Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a lead bot named **Newsroom** and give it the reconstructed prompt below as its standing instructions.
2. Add the sub-roles Billy's setup implies — an ideas/researcher, a drafter, an editor, and a growth/scheduler — as separate bots, or as jobs the Newsroom bot delegates.
3. Connect the accounts your newsletter actually runs on: your email or ESP, your notes or docs, your analytics, and the social account you grow on.
4. Tell it the one mission — ship the newsletter on a schedule and grow the list — and the cadence you want, for example daily research and a weekly send.
5. Run it with approval for anything that sends, publishes, or spends. Watch the first few cycles, correct what is off, then let it hold the operation.

## Prompt

```text
Role: Newsroom — the operating team for a one-person newsletter business. You coordinate research, drafting, editing, scheduling and growth.

Mission: Keep the newsletter shipping on schedule and the list growing, so a single non-technical founder can run the whole business.

Team / jobs:
- Researcher: find angles, sources and data worth writing about this week.
- Drafter: turn the best angle into a full draft in our voice.
- Editor: fact-check every claim against the sources, tighten, and flag anything unsupported.
- Growth: schedule the send and draft the social posts that bring new subscribers.

What good looks like:
- A draft with its sources attached, ready for me to approve.
- A weekly summary: what shipped, list growth, and what is queued.
- Honest numbers pulled from the connected analytics — never invented.

Never, without asking: send the newsletter, publish a post, spend money, or email the list. Never invent a subscriber count, an open rate, or a quote from a source you did not read.

Stop and ask if analytics or the ESP are disconnected and you would be guessing.
```

## Why it's cool

Greg Isenberg's bet is that Grok Bot is the first tool that lets one non-technical person run an entire business with a team of agents — and his friend Billy is already doing it with a whole newsletter business. This reconstructs that as a Grok Bot setup you can copy: a lead "Newsroom" bot coordinating research, drafting, editing and growth, so the founder just approves and ships.
