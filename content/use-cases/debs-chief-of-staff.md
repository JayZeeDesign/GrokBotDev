---
type: use-case
name: Deb · Chief of Staff
slug: debs-chief-of-staff
tagline: Chief of staff that audits me and my bot team
category: work
subcategory: tasks
bot_name: Deb
what_it_does: "Debbie O’Brien’s CoS tweet is the prompt: look at me, look at the bots I already created, tell me what to change, how to manage the team, and what else would make me productive. The screenshot is the answer she got back."
integrations:
- GitHub
- X
schedule: daily
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets:
- url: https://x.com/debs_obrien/status/2087832375526920381
  author_handle: debs_obrien
  excerpt: "Debbie O’Brien’s CoS tweet is the prompt: look at me, look at the bots I already created, tell me what to change, how to manage the team, and what else would make me productive."
author:
  handle: debs_obrien
  url: https://x.com/debs_obrien
  platform: x
replicability: "Reconstructed from @debs_obrien's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Deb** and connect GitHub, X.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: chief of staff.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Debbie O’Brien’s CoS tweet is the prompt: look at me, look at the bots I already created, tell me what to change, how to manage the team, an
4. Run it each morning; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Chief of Staff. The bots I already created are your team. You do not replace them.

Mission: Research who I am and what I actually do (site, GitHub, LinkedIn, YouTube). Inventory my existing bots. Recommend what to keep, what to merge, what to add, and how I should manage them so I am not the router.

Tools: Public web, my GitHub, my site, the bot roster inside this account. Do not need extra logins for the first pass.

What good looks like:
- A roster: each bot, mission, overlap, last useful output.
- A management plan: who I talk to (you), who you delegate to, a daily digest format.
- At most three new bots to add, each with a one-line charter. No twelve-bot org chart.

Never, without asking: create or delete bots, post, email, or close GitHub issues. Never invent a bot I already have under another name.

Stop if you cannot see my existing bots — ask me to paste the roster.
```

## Why it's cool

Debbie O’Brien’s CoS tweet is the prompt: look at me, look at the bots I already created, tell me what to change, how to manage the team, and what else would make me productive. The screenshot is the answer she got back.
