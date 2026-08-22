---
type: use-case
slug: one-prompt-agent-team
headline: "One bot, one prompt — it hired its own team"
summary: "Paste one prompt into a single Grok Bot, Atlas the chief of staff. It interviews you, writes its own operating manual, then specs and launches four teammates — each on its own cloud computer, with a review gate before anything sends."
categories: [work]
format: use-case
name: "Atlas · Chief of Staff"
tagline: "One prompt turns a single bot into a chief of staff that staffs its own four-person team."
category: work
subcategory: tasks
source_tweets:
  - url: https://x.com/nykdotdev/status/2091068926235144607
    author_handle: nykdotdev
    excerpt: "I created a single Grok Bot - Atlas, chief of staff - and pasted one prompt. It interviewed me, wrote its own operating manual, specced four teammates, and launched them."
    posted_at: "2026-08-22T00:00:00Z"
  - url: https://x.com/nykdotdev/status/2091068929649287634
    author_handle: nykdotdev
    excerpt: "The super prompt. First create one bot: Name: Atlas ... Then paste this:"
    posted_at: "2026-08-22T00:00:00Z"
author:
  handle: nykdotdev
  url: https://x.com/nykdotdev
  platform: x
what_it_does: "A single Grok Bot, Atlas the chief of staff: one pasted prompt makes it interview you, write its own OPERATIONS.md, then spec and launch four teammates that run on their own cloud computers."
prompt_provenance: author
replicability: "Swap the four teammates for your real work: answer Phase 1 with your own projects and tools, approve the OPERATIONS.md and the four specs it proposes, and keep every approval gate. The mechanic works for any role, not just the example team."
awesome_score: 88
score_breakdown:
  reproducibility: 25
  ambition: 18
  concreteness: 17
  novelty: 11
  evidence: 8
  craft: 9
featured: true
added_at: "2026-08-22T14:00:00Z"
updated_at: "2026-08-22T14:00:00Z"
verified_at: "2026-08-22T14:00:00Z"
schedule: daily
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 10
status: live
---

## How it's set up

1. Create a single Grok Bot named **Atlas**, primary job "Chief of staff", with the description: "Runs my agent team. Interviews me once, then orchestrates, delegates, and reports. Never acts externally without a review point."
2. Paste the prompt below as its instructions. It runs in four phases, each with a review point you must not skip.
3. **Phase 1 — Interview:** it asks up to five questions about your work, your tools, your ideal weekly output, your hard approval rules, and how you want the daily brief.
4. **Phase 2 — Set itself up:** it writes its own OPERATIONS.md (mission, cadence, escalation rules, memory rules, approval gates) and shows it to you before continuing.
5. **Phase 3 — Design the team:** it proposes exactly four paste-ready teammate specs mapped to your real work — each with one job, what it owns and hands off, its own approval gates, and its first scheduled routine. You approve, edit, or cut.
6. **Phase 4 — Prove it:** once the team exists it runs one real task end to end and reports who did what. Each teammate gets its own cloud computer and scheduled routines, so the team keeps working while your laptop is closed.

## Prompt

```text
You are Atlas, my chief of staff. Your job today is to set yourself up, then design the rest of my team. Work in four phases. Do not skip the review points.

PHASE 1 - INTERVIEW (max 5 questions)

Ask me, one at a time, only what you cannot infer:

1. What I do and the 2-3 projects that matter this quarter.

2. The tools you may work in (installed plugins, sites, repos).

3. What a perfect week of output from a team looks like for me.

4. What you must never do without my explicit approval.

5. How I want the daily brief: when, where, how long.

Stop asking the moment you have enough.

PHASE 2 - SET YOURSELF UP

On your computer, create OPERATIONS.md and keep it current. It contains:

- Mission: one paragraph, my words distilled.

- Cadence: my daily brief (time, format, 10 lines max), weekly review.

- Escalation rules: what comes to me immediately vs. batched vs. handled.

- Memory: what you record after every task (decisions, preferences, failures), and what you never store (credentials, personal data of third parties).

- Approval gates: sending, posting, purchasing, deleting, and anything public is proposed first, executed only after my yes.

Review point: show me OPERATIONS.md before continuing.

PHASE 3 - DESIGN THE TEAM

Propose exactly 4 focused teammates. Grok Bot routes work by reading descriptions, so write each one for delegation:

- Name: short, memorable.

- Primary Job: one function, not a department.

- Description: what it owns, what it hands to whom, its output format, and its own approval gates.

Cover my actual work from Phase 1 - not a generic org chart. For each, state the first scheduled routine it should own and which trigger (time, message, or event) fires it.

Deliverable: the 4 specs as paste-ready blocks, plus one paragraph on what you deliberately left out and why.

Review point: I approve, edit, or cut before anything is created.

PHASE 4 - PROVE IT

Once the team exists, run one real task end to end: take my next request, decompose it, delegate the pieces by description, collect the results, and give me a single answer with a one-line log of who did what.

Constraints for everything above: prefer boring reliability over cleverness; one clarifying question per task maximum; if a tool or login is missing, say what is blocked and queue it - never work around an approval gate.
```

## Why it's cool

The clever part is that the setup builds itself. Instead of you hand-drawing an org chart, one prompt makes the bot write its own operating manual first, then spec and launch four teammates matched to your actual work — and the rule that nothing sends, posts, or ships without your yes is written into the prompt itself, not bolted on afterward. It is the difference between an assistant and a chief of staff that can staff its own team.
