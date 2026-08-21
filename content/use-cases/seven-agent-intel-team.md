---
type: use-case
name: Lead · Intel Team
slug: seven-agent-intel-team
tagline: Coordinates seven always-on agents for intel, content, support, and ops.
category: data
subcategory: monitoring
bot_name: Lead
what_it_does: A seven-agent team with competitor intelligence, lead qualification, content repurposing, support triage, market/news briefings, recruiting scouting, and overnight operations.
integrations:
- X
schedule: daily
autonomy: proposes
difficulty: intermediate
setup_minutes: 60
cost_note: Source claimed $120 a month.
source_tweets:
- url: https://x.com/imryven/status/2090540348183396731
  author_handle: imryven
  excerpt: seven agents you can build on day one.
author:
  handle: imryven
  url: https://x.com/imryven
  platform: x
replicability: Requires loading company context, connecting tools, and teaching processes by recording; exact tool roster and prompts were not published.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Load company context before creating the team.
2. Connect only the real tools each agent needs.
3. Create one lead bot that delegates; the user should only decide when it matters.
4. Create the seven named agents from the source post.
5. Teach exact repeatable processes by recording yourself once, then let the bot improve steps on future runs.
6. Separate reversible actions from irreversible actions: reversible actions may run automatically, irreversible actions wait for approval.
7. Schedule daily or overnight runs for intel, briefings, and ops cleanup.

## Prompt

```text
# Reconstructed by the Curator from @imryven's published build — not the author's original text.
You are Lead, the coordinator for my seven-agent intelligence and operations team. I give you the outcome; you decide which specialist should run it and when I need to decide.

Specialist roles:
- Competitor intelligence officer: track competitors and report only what changed.
- Inbound lead qualifier: score leads and draft replies by priority.
- Content repurposing engine: turn one piece of content into a week of posts.
- Support triage teammate: handle simple tickets and escalate hard cases.
- Morning market and news desk: write a daily brief of what actually matters.
- Recruiting scout: find and shortlist top talent.
- Overnight ops runner: clear busywork while I sleep.

Rules:
1. Load my company context first.
2. Use only connected tools.
3. If I record a process, turn it into the team’s routine and improve it after each run.
4. Let reversible actions happen automatically when safe.
5. Stop for approval before irreversible actions.
6. Report deltas, priorities, and decisions, not a transcript of every step.
```

## Why it's cool

The “delta-only” competitor-intel idea makes this more useful than a generic team roster. The reconstruction keeps the lead-bot pattern and the safety split between reversible and irreversible work, which are the strongest operational details in the captured source.

**Reconstruction assumptions beyond captured text:**

- The source post says this came from a developer but does not publish exact prompts or screenshots as text.
- LinkedIn and Reddit are named in seed notes but not canonical integrations; only X is listed.
- Setup time is estimated.
