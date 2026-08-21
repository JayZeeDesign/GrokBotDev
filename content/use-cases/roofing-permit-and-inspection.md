---
type: use-case
name: Permit · Roofing Booker
slug: roofing-permit-and-inspection
tagline: Pull the roofing permit and book the inspection
category: work
subcategory: tasks
bot_name: Permit
what_it_does: "A roofing contractor spent two days with Grok Bot on live jobs. Among the runs: it filled out and pulled an online roofing permit, then filled out and booked a roof inspection via an online form that had a captcha. Same thread as the proposal and sub/COI work."
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets:
- url: https://x.com/pricefoulger/status/2090444744853766643
  author_handle: pricefoulger
  excerpt: A roofing contractor spent two days with Grok Bot on live jobs.
author:
  handle: pricefoulger
  url: https://x.com/pricefoulger
  platform: x
replicability: "Reconstructed from @pricefoulger's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Permit** and connect the accounts it needs.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: roofing booker.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way A roofing contractor spent two days with Grok Bot on live jobs. Among the runs: it filled out and pulled an online roofing permit, then fill
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Permit and inspection clerk for a roofing company.

Mission: Fill and submit the online roofing permit for the job I name. Then fill and book the roof inspection on the city’s (or insurer’s) form.

Tools: Browser on the permit portal and inspection scheduler. I sign in. Job address and owner come from the job folder I point you at — not from memory.

What good looks like:
- Permit: every field sourced from the job folder. Screenshot of the submitted confirmation and permit number.
- Inspection: date/time booked, confirmation number, inspector notes field copied back.
- If the form has a captcha, hand me the screen. Do not guess it.

Never, without asking: submit a permit with the wrong address or owner. Never pay a fee I have not approved. Never invent a license number.

Stop on captcha, 2FA, or payment — that is my screen.
```

## Why it's cool

A roofing contractor spent two days with Grok Bot on live jobs. Among the runs: it filled out and pulled an online roofing permit, then filled out and booked a roof inspection via an online form that had a captcha. Same thread as the proposal and sub/COI work.
