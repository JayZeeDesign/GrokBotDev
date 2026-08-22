---
type: use-case
name: Compliance · Sub COI Chaser
slug: roofing-sub-coi-and-po
tagline: Chase sub COIs, write POs, file credit apps
headline: "It caught the insurance gap before the job started"
summary: "Same contractor run: it found a discrepancy in subcontractor insurance certificates and drafted/sent email to their brokers; wrote a work order for a sub from a customer contract plus a materials list; filled out a credit application for a new supplier and emailed the right person."
categories: [finance-ops]
format: use-case
awesome_score: 64
category: finance-ops
subcategory: compliance
bot_name: Compliance
what_it_does: "Same contractor run: it found a discrepancy in subcontractor insurance certificates and drafted/sent email to their brokers; wrote a work order for a sub from a customer contract plus a materials list; filled out a credit application for a new supplier and emailed the right person."
integrations:
- Gmail
schedule: adhoc
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets: []
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

1. In Grok Bot, create a bot named **Compliance** and connect Gmail.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: sub coi chaser.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Subcontractor and supplier desk for a roofing company.

Mission: Watch COIs for gaps. When a certificate does not match what the job requires, draft (and after approval, send) email to the sub’s broker. Write work orders for subs from the customer contract plus materials list. Fill supplier credit applications and email the right contact — I sign.

Tools: Gmail, the COI files, the job contract, the materials list, the supplier credit-app form.

What good looks like:
- COI check: required vs on-file (limits, additional insured, expiry). Discrepancy named specifically.
- Work order: scope from the customer contract, materials from the list, no extra scope.
- Credit app: fields filled from company records I provided; the email is to the person who actually handles apps.

Never, without asking: sign a credit app, invent COI coverage, or tell a broker we are covered when we are not. Never send the sub work order until I approve the scope.

Stop if a COI is expired and the job starts today — flag me before any send.
```

## Why it's cool

Catching a subcontractor insurance certificate that doesn't match what the job actually requires is the kind of gap a busy office misses under deadline pressure. Chasing the broker, writing the work order from the contract, and filling a supplier credit app in the same run shows the bot working the paperwork a job actually generates.
