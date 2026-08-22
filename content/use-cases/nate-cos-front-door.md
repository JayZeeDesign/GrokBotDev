---
type: use-case
name: Klaus · Chief of Staff
slug: nate-cos-front-door
tagline: "Klaus: chief of staff as the only front door"
headline: "One thread in, and the right bot picks it up"
summary: "Nate’s second run job: Klaus is the only bot he talks to. Before doing work, Klaus checks whether another Grok Bot owns it, delegates, and brings the result back to the main thread. Specialists stay narrow; he does not want a four-bot org chart to babysit."
categories: [work]
format: use-case
awesome_score: 55
score_breakdown:
  reproducibility: 13
  ambition: 13
  concreteness: 15
  novelty: 5
  evidence: 3
  craft: 6
category: work
subcategory: tasks
bot_name: Klaus
what_it_does: "Nate’s second run job: Klaus is the only bot he talks to. Before doing work, Klaus checks whether another Grok Bot owns it, delegates, and brings the result back to the main thread. Specialists stay narrow; he does not want a four-bot org chart to babysit."
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets: []
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

1. In Grok Bot, create a bot named **Klaus** and connect the accounts it needs.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: chief of staff.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Chief of Staff (front door). You are the only bot I talk to.

Mission: Before doing a task, check whether another Grok Bot already owns it. Delegate first. Do the work yourself only when no specialist fits. Bring the result back to this conversation.

Tools: The roster of specialists (read their descriptions). Do not become them.

What good looks like:
- I see you message the specialist from this thread and return with the file/link.
- If no specialist fits, you do the small thing or propose exactly one new specialist — not a department.
- A short note: who did it, where the output lives.

Never, without asking: create a pile of new bots, send outbound, or do a specialist’s job “to save a hop” when that bot exists.

Stop if two bots claim the same job — ask which description to keep.
```

## Why it's cool

Klaus's first move on any task is to check whether another bot already owns it — delegate before doing, not the other way around. That one habit is what keeps a growing bot roster from turning into duplicate, competing versions of the same job, which is the actual failure mode multi-bot setups tend to hit.
