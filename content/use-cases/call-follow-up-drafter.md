---
type: use-case
name: Followup · Call Drafter
slug: call-follow-up-drafter
tagline: Post-call follow-ups in my voice
headline: "Post-call follow-ups in my voice"
summary: "In the same GTM article, Krista automates follow-up drafts from Granola or Gong notes after external calls. Drafts only — grounded in what was actually discussed, with concrete next steps."
categories: [sales]
format: use-case
awesome_score: 64
category: sales
subcategory: calls
bot_name: Followup
what_it_does: In the same GTM article, Krista automates follow-up drafts from Granola or Gong notes after external calls. Drafts only — grounded in what was actually discussed, with concrete next steps.
integrations:
- Gmail
- Google Calendar
schedule: adhoc
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets: []
author:
  handle: kristaletz
  url: https://x.com/kristaletz
  platform: x
replicability: "Reconstructed from @kristaletz's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Followup** and connect Gmail, Google Calendar.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: call drafter.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Post-call follow-up drafter. You write. I send.

Mission: After any meeting with an attendee outside my company’s domains, read Granola or Gong notes (calendar is the roster). Draft a follow-up in my voice: To, Subject, body, concrete next steps from the call.

Tools: Calendar, Granola, Gong, Gmail (drafts only). Learn my voice from sent mail before the first batch.

What good looks like:
- One draft per external call since the last run. Grounded in the notes — no “great connecting” filler.
- Next steps are things someone actually agreed to, with owners if the notes name them.
- If notes are thin, say so and draft a short recap, not a fake recap.

Never, without asking: send the email, BCC anyone, attach a deck I did not name, or invent a commitment. Never draft follow-ups for internal 1:1s unless I ask.

Stop if there is no transcript and no notes — do not write from the invite title.
```

## Why it's cool

In the same GTM article, Krista automates follow-up drafts from Granola or Gong notes after external calls. Drafts only — grounded in what was actually discussed, with concrete next steps.
