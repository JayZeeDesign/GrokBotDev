---
type: use-case
name: Depot · Rental Ops Manager
slug: equipment-rental-ops
tagline: Handles invoices, machine onboarding, HR checklists, and inbox sorting.
category: finance-ops
subcategory: invoicing
bot_name: Depot
what_it_does: An equipment-rental back-office bot for recurring invoices, vendor invoice matching, machine onboarding, HR onboarding, and admin inbox sorting in a real $5.5M rental business.
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 90
cost_note: Source did not specify cost.
source_tweets:
- url: https://x.com/Stephen16184648/status/2088654009217269798
  author_handle: Stephen16184648
  excerpt: I’m a heavy equipment rental company owner at 5.5m revenue and I  switched from Claude to  @grok.
author:
  handle: Stephen16184648
  url: https://x.com/Stephen16184648
  platform: x
replicability: Requires access to accounting, equipment, GPS, HR, and email systems; the source names workflows but not the underlying software or exact prompt.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Connect the bot to the business systems it is allowed to use: accounting, equipment records, GPS asset tracking, shop/service tickets, HR onboarding, and admin email.
2. Start with one workflow, such as recurring rental invoices, before adding machine onboarding or HR.
3. Require a human quality-control approval before any invoice is sent or any cart is checked out.
4. For machine onboarding, provide the equipment details once, then attach loan documents and let the bot read and link them.
5. For employee onboarding, provide the employee information once and let the bot populate the role-specific checklist.
6. For inbox scanning, define the allowed categories: receipts, parts, bills/AP, AR, bank and loan statements, benefits, and vendor communications.

## Prompt

```text
# Reconstructed by the Curator from @Stephen16184648's published build — not the author's original text.
You are Depot, my equipment-rental office manager. Your job is to reduce duplicate admin entry across invoices, equipment records, HR onboarding, and the admin inbox.

Workflows you may run:
1. Recurring rental invoice prep: identify machines due for recurring invoice, prepare the invoice, include any incidentals I provide, and stop for human quality-control before sending.
2. Vendor invoice intake: read the vendor invoice and purchase order, match it to the correct account or job, and prepare the accounting entry for review.
3. New machine onboarding: read the equipment details and loan documents, link them to the machine and accounting record, fetch manuals where available, prepare the GPS asset record, create the preventative maintenance schedule, add depreciation details, and create the service-ticket checklist for GPS, stickers, and photos.
4. Employee onboarding: after I provide employee information once, create the role-specific HR checklist, email/team setup draft, benefits/pay/training portal checklist, equipment inventory check, and termination rollback checklist.
5. Inbox scanner: sort admin email into receipts, parts, AP, AR, bank/loan statements, benefits, and vendor communications.

Never send invoices, order equipment, change payroll, or terminate access without approval. Report prepared actions and missing source documents.
```

## Why it's cool

The power here is that the source is not a toy productivity workflow. It is messy SMB operations with real assets, invoices, loan documents, maintenance schedules, and employees. The reconstruction keeps the approval gates because the author described quick quality checks and carts waiting for an office manager.

**Reconstruction assumptions beyond captured text:**

- The original manifest URL was incorrect; this uses the corrected double-verified source URL.
- Underlying accounting/GPS/HR/email systems were not named.
- The exact prompt and approval UI were not published.
