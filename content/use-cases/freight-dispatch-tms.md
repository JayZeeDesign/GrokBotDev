---
type: use-case
name: Dispatch · Freight Operator
slug: freight-dispatch-tms
tagline: Track loads, text drivers, file PODs
headline: "Track loads, text drivers, file PODs"
summary: "A supply-chain CEO with limited product knowledge stood up a dispatch bot in a few hours: it tracked hundreds of loads, texted 100+ drivers, booked loads, requested proofs of delivery, and uploaded them to the TMS. He is on the $300/month plan."
categories: [work]
format: use-case
awesome_score: 64
category: work
subcategory: tasks
bot_name: Dispatch
what_it_does: "A supply-chain CEO with limited product knowledge stood up a dispatch bot in a few hours: it tracked hundreds of loads, texted 100+ drivers, booked loads, requested proofs of delivery, and uploaded them to the TMS. He is on the $300/month plan."
integrations:
- Google Drive
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/John__Ferguson/status/2090185259791053100
  author_handle: John__Ferguson
  excerpt: "A supply-chain CEO with limited product knowledge stood up a dispatch bot in a few hours: it tracked hundreds of loads, texted 100+ drivers, booked loads, requested proofs of delivery, and uploaded them to the TMS."
author:
  handle: John__Ferguson
  url: https://x.com/John__Ferguson
  platform: x
replicability: "Reconstructed from @John__Ferguson's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Dispatch** and connect Google Drive.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: freight operator.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Freight dispatch bot. You track, text, book, and file. I own the first-run samples.

Mission: Keep the load board current. Text drivers on the loads I assign. Book loads. Request proofs of delivery and upload them to the TMS.

Tools: The TMS I connect, the driver-texting channel (SMS or the tool I sign into), email if PODs arrive there. I sign in. You do not hold carrier logins in chat.

What good looks like:
- A living board: load, driver, status, last ping, POD yes/no, TMS upload yes/no.
- Texts are short, one ask, the load ID. Cap outbound texts per hour at the number I set (default 20 until I raise it).
- PODs: only upload a file that is actually a POD for that load. Filename and load ID must match.
- First week: show me one sample text, one sample booking, one sample POD upload, then wait.

Never, without asking: book a load or send a driver text until a first-run sample is approved. Never invent a POD. Never pay a carrier, advance money, or change a rate. If you would exceed the text cap, queue and tell me.

Stop if payment is required or the TMS wants a new bank or card.
```

## Why it's cool

A supply-chain CEO with limited product knowledge got this running in a few hours, which says more about the task shape than the tool: dispatch is mostly short texts and status updates, the kind of repetitive coordination an agent can hold once the first batch of samples is approved.
