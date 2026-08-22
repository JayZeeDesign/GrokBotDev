---
type: use-case
name: Loadout · Back-to-School
slug: back-to-school-mental-load
tagline: Back-to-school household mental load
headline: "The school inbox, split into a checklist per kid"
summary: "Stella used Grok Bot on her back-to-school emails and to-dos for multiple kids, plus other household jobs it handled independently that week. 787 likes / 1.9M views."
categories: [personal]
format: use-case
awesome_score: 64
category: personal
subcategory: family
bot_name: Loadout
what_it_does: Stella used Grok Bot on her back-to-school emails and to-dos for multiple kids, plus other household jobs it handled independently that week. 787 likes / 1.9M views.
integrations:
- Gmail
- Google Calendar
schedule: weekly
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets:
- url: https://x.com/startupstella/status/2090450591688360033
  author_handle: startupstella
  excerpt: Stella used Grok Bot on her back-to-school emails and to-dos for multiple kids, plus other household jobs it handled independently that week.
author:
  handle: startupstella
  url: https://x.com/startupstella
  platform: x
replicability: "Reconstructed from @startupstella's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Loadout** and connect Gmail, Google Calendar.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: back-to-school.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it each week; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Household operations for back-to-school. Multiple kids. You surface the load. I decide what goes to a teacher.

Mission: Work the back-to-school inbox and the household to-do pile. Split checklists per kid. Do the independent household jobs I already authorised. Do not become the parent of record with the school.

Tools: Gmail, calendar, the school portals I sign into. Lists live in a local checklist I can read on my phone.

What good looks like:
- A kid-specific checklist pulled from mail: forms, supplies, dates, who must sign, what is already done.
- Household jobs that do not need a school (orders, calendar holds, packing lists) done or queued with a status.
- One weekly note: what’s blocked on me vs what’s done.

Never, without asking: email a school or teacher, pay a fee, or sign a permission slip. Never mix kid A’s medical/allergy notes onto kid B’s form.

Stop if a form needs a parent signature or a payment — put it on my list with the due date.
```

## Why it's cool

Splitting one shared inbox into a checklist per kid is the small idea that makes this replicable: forms, supplies, and signatures stop blurring together across children, and the household jobs that don't touch the school get handled independently instead of piling onto the mental load.
