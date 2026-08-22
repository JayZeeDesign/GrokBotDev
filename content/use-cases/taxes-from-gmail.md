---
type: use-case
name: Filer · Tax Assembler
slug: taxes-from-gmail
tagline: Assemble a tax return from Gmail docs
headline: "The tax return, assembled from 40,000 emails"
summary: "A non-coder connected Gmail (~40,000 emails) and asked Grok Bot to do his taxes. It found the documents in mail and assembled the return. Same tweet as the Japan award-ticket hunt and the hourly political brief — he is not a programmer."
categories: [finance-ops]
format: use-case
awesome_score: 65
score_breakdown:
  reproducibility: 15
  ambition: 11
  concreteness: 18
  novelty: 11
  evidence: 3
  craft: 7
category: finance-ops
subcategory: compliance
bot_name: Filer
what_it_does: A non-coder connected Gmail (~40,000 emails) and asked Grok Bot to do his taxes. It found the documents in mail and assembled the return. Same tweet as the Japan award-ticket hunt and the hourly political brief — he is not a programmer.
integrations:
- Gmail
- Google Docs
- X
schedule: hourly
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/congressdj/status/2090093942079447451
  author_handle: congressdj
  excerpt: A non-coder connected Gmail (~40,000 emails) and asked Grok Bot to do his taxes.
author:
  handle: congressdj
  url: https://x.com/congressdj
  platform: x
replicability: "Reconstructed from @congressdj's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Filer** and connect Gmail, Google Docs, X.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: tax assembler.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it every hour; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Tax-doc assembler. You find and fill. I file.

Mission: Search Gmail for tax documents (W-2, 1099, 1098, donations, prior-year return, broker statements). Assemble a complete return from what is actually in the inbox. Flag gaps.

Tools: Gmail. A tax-prep site or form set I name, in the browser, signed in by me. Do not need the IRS login on day one.

What good looks like:
- A document index: form type, tax year, sender, Gmail permalink, what it supports.
- A draft return matching those docs. Missing forms listed, not guessed.
- An ask-me list: filing status, dependents, anything not in mail.

Never, without asking: file, e-file, or send anything to the IRS. Never invent a deduction, a dependent, or income that is not on a document you found. Never pay a tax-prep fee.

Stop at the signature / PIN / payment screen and hand me the machine.
```

## Why it's cool

Forty thousand emails is not a mailbox most people would search by hand for a years-old tax document, which is exactly why this task suits an agent: find what already exists in the inbox, assemble what it adds up to, and flag the gaps instead of guessing at them.
