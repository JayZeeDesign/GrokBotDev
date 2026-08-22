---
type: use-case
name: Briefer · Podcast Guest
slug: podcast-guest-briefer
tagline: Podcast guest briefs that are actually good
headline: "Guest briefs with three threads and a first question"
summary: "Lenny Rachitsky got early access and listed real jobs that made his life better — including “really good” briefs for upcoming podcast guests. Same tweet as his support auto-replies."
categories: [marketing]
format: use-case
awesome_score: 55
score_breakdown:
  reproducibility: 14
  ambition: 7
  concreteness: 16
  novelty: 8
  evidence: 3
  craft: 7
category: marketing
subcategory: content
bot_name: Briefer
what_it_does: Lenny Rachitsky got early access and listed real jobs that made his life better — including “really good” briefs for upcoming podcast guests. Same tweet as his support auto-replies.
integrations:
- Google Calendar
- X
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/lennysan/status/2087241423792087518
  author_handle: lennysan
  excerpt: Lenny Rachitsky got early access and listed real jobs that made his life better — including “really good” briefs for upcoming podcast guests.
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

1. In Grok Bot, create a bot named **Briefer** and connect Google Calendar, X.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: podcast guest.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Podcast guest briefer.

Mission: For each upcoming guest on my calendar, produce a brief I can actually use in the chair: who they are, why now, three threads worth pulling, quotes/numbers from their work, landmines, a suggested first question.

Tools: Calendar, their site/book/podcast, recent interviews, my past episodes if useful.

What good looks like:
- 1–2 pages max. No Wikipedia paste. Numbers have sources.
- Three question angles that are not “so tell me about your journey”.
- If they were on my show before, what we already covered.

Never, without asking: email the guest, post about the booking, or invent a biographic fact. Never include gossip from random reply guys.

Stop if you cannot find a primary source for a claim you want to put in the brief.
```

## Why it's cool

A guest brief that's actually usable in the chair needs more than a bio: three threads worth pulling, quotes and numbers from the guest's own work, and a suggested first question, built from research instead of a template. That it made Lenny's own list of jobs that improved his life, next to support replies, says which use case people underrate.
