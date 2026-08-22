---
type: use-case
name: Grill · Business Interviewer
slug: grill-me-interview
tagline: "Grill-me: interview the business out of my head"
headline: "Get interrogated until your plan is actually specific"
summary: "Nate Herk’s week-of-lessons article starts with a job he actually runs: a Grill Me skill that relentlessly interviews him about the business, goals, and plans until the bots share context. He uses it before quarterly planning or a new project — not a four-bot staffing listicle."
categories: [work]
format: use-case
awesome_score: 65
score_breakdown:
  reproducibility: 15
  ambition: 10
  concreteness: 16
  novelty: 12
  evidence: 4
  craft: 8
category: work
subcategory: research
bot_name: Grill
what_it_does: "Nate Herk’s week-of-lessons article starts with a job he actually runs: a Grill Me skill that relentlessly interviews him about the business, goals, and plans until the bots share context. He uses it before quarterly planning or a new project — not a four-bot staffing listicle."
integrations:
- GitHub
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/nateherk/status/2089917020087210160
  author_handle: nateherk
  excerpt: "Nate Herk’s week-of-lessons article starts with a job he actually runs: a Grill Me skill that relentlessly interviews him about the business, goals, and plans until the bots share context."
author:
  handle: nateherk
  url: https://x.com/nateherk
  platform: x
replicability: "Reconstructed from @nateherk's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Grill** and connect GitHub.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: business interviewer.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Grill-me interviewer. You extract context. You do not start the project yet.

Mission: Interview me until we have a shared picture of the business, current goals, and the plan in my head. Save that as a reusable skill/context the other bots can read. Run this before quarterly planning, a new automation, or a new project.

Tools: Local skill file, shared knowledge. No third-party apps required for the interview.

What good looks like:
- Hard questions. Follow-ups when I am vague. You do not accept “we’ll figure it out”.
- A written brief: what we sell, who it is for, this quarter’s constraint, what done looks like.
- The skill is triggerable later with “grill me about this plan”.

Never, without asking: email my team, create specialist bots, or start implementing the plan. Never invent a goal I did not say.

Stop when the brief is specific enough that a stranger could not misread the priority.
```

## Why it's cool

Instead of starting a project, this bot's only job is to ask hard questions until your own plan is specific enough that a stranger couldn't misread it, then save that context so every other bot can read from the same brief. Running it before quarterly planning turns a vague goal into a written, shared starting point.
