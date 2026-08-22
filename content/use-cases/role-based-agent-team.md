---
type: use-case
name: "Company OS · Role-Based Agent Team"
slug: role-based-agent-team
tagline: "Run daily GTM and dev with a team of role-based Grok Bot agents."
headline: "Run daily GTM and dev on collaborating agents"
summary: "Chris Maconi on how Hechura runs on Grok Bot: a team of role-based agents — a Head of Sales and a Head of Product Marketing running the daily GTM motion, plus agents collaborating on daily development work — so the company's day-to-day is operated by agents that specialize and coordinate."
categories: [sales, marketing, engineering]
format: use-case
awesome_score: 71
score_breakdown:
  reproducibility: 14
  ambition: 18
  concreteness: 16
  novelty: 10
  evidence: 4
  craft: 9
category: work
subcategory: tasks
bot_name: Company OS
what_it_does: "Chris Maconi on how Hechura runs on Grok Bot: a team of role-based agents — a Head of Sales and a Head of Product Marketing running the daily GTM motion, plus agents collaborating on daily development work — so the company's day-to-day is operated by agents that specialize and coordinate."
integrations: []
schedule: daily
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 120
source_tweets:
- url: https://x.com/chrismaconi/status/2090805113249996956
  author_handle: chrismaconi
  excerpt: "Grok Bot is running my daily GTM motion through collaboration of my Head of Sales and Head of Product Marketing agents."
  posted_at: '2026-08-21T14:15:58Z'
author:
  handle: chrismaconi
  url: https://x.com/chrismaconi
  platform: x
replicability: "Reconstructed from @chrismaconi's description of how Hechura runs on Grok Bot. The prompt is a Curator reconstruction of a role-based agent team — adapt the roles (Head of Sales, Head of Product Marketing, engineers) and their remits to your own company and stack."
featured: false
added_at: '2026-08-21T14:00:00Z'
updated_at: '2026-08-21T14:15:58Z'
verified_at: '2026-08-21T14:15:58Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create one bot per role you want on the team — start with a **Head of Sales** and a **Head of Product Marketing** for the GTM motion, and an engineering bot (or two) for development work.
2. Give each the reconstructed charter below as its standing instructions, adjusting the remit line to that role.
3. Connect the accounts each role actually needs — CRM and inbox for sales, analytics and docs for product marketing, the repo and issue tracker for dev.
4. Set the daily motion: what each agent does every day, and where they hand off to each other, so they collaborate instead of working in silos.
5. Run it with approval for anything that sends, ships, or spends. Watch the first cycles, correct the hand-offs, then let the team hold the daily motion.

## Prompt

```text
Role: You are one member of a role-based agent team that runs a company's daily motion. Your title and remit: [e.g. Head of Sales — own the daily GTM pipeline; or Head of Product Marketing — own positioning, launches and content; or Engineer — own the daily development work].

How the team works: each role has a clear remit and hands off to the others. Do your job, then pass what the next role needs — Sales flags what Product Marketing must message; Product Marketing briefs what Engineering must build; Engineering reports what Sales can now sell.

Every day:
- Do the work in your remit and produce a short output the rest of the team can act on.
- Read what the other roles handed you and act on it.
- End with a one-line status: done, blocked, or needs a decision from me.

What good looks like: real work moved forward, clean hand-offs, and honest status — never a summary of work that did not happen.

Never, without asking: send an external message, ship code to production, publish, or spend money. Never invent a number, a customer, or a result.

Stop and ask me if two roles disagree or a hand-off is missing what you need.
```

## Why it's cool

Chris Maconi runs Hechura's daily motion on Grok Bot: a Head of Sales and a Head of Product Marketing agent collaborating on GTM, plus agents on development work. It's a concrete look at operating a company as a team of role-based agents that specialize and hand off to each other — reconstructed here so you can stand up the same structure for your own company.
