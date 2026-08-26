---
type: use-case
name: "Detox · Newsletter Unsubscriber"
slug: newsletter-unsubscribe-audit
headline: "Audit every newsletter you get, review one HTML page, then it unsubscribes"
summary: "A two-phase inbox detox with a human gate. The bot sweeps your email and builds a simple HTML review page of every newsletter you receive, sorted into keep vs certainly-unsubscribe with its reasoning. You decide. Then it works the list slowly in the browser, logging every attempt in a progress file."
category: work
subcategory: email
categories: [work, personal]
format: use-case
bot_name: "Detox"
what_it_does: "Phase one: the bot audits your inbox, finds every recurring newsletter, and builds an HTML review page sorted into keep vs certainly-unsubscribe with reasons. Phase two, after you decide: it unsubscribes in the browser a few at a time, tracking every sender in a dedicated progress file."
integrations: [Gmail]
schedule: adhoc
autonomy: acts-with-approval
difficulty: beginner
setup_minutes: 10
author:
  handle: scheemunai
  url: https://x.com/scheemunai
  platform: x
replicability: "Paste the prompt as-is - it works on whatever email your bot can read. The review gate is structural: the bot builds the HTML list and stops until you decide. Transactional email is fenced off, and anything that demands a login or looks like a trap gets flagged, not clicked."
prompt_provenance: author
awesome_score: 84
score_breakdown:
  reproducibility: 23
  ambition: 15
  concreteness: 19
  novelty: 13
  evidence: 5
  craft: 9
featured: false
added_at: "2026-08-26T14:30:00Z"
updated_at: "2026-08-26T14:30:00Z"
verified_at: "2026-08-26T14:30:00Z"
status: live
---

## How it's set up

Plenty of people have pointed a bot at a messy inbox and posted the body count - [6,000 emails and 40 lists](/use-cases/inbox-delete-unsub/), [150,000 junk emails](/use-cases/junk-purge-150k/). This is the careful version: a method with a review gate in the middle, so nothing you actually wanted disappears.

1. **Connect your email** (Gmail or whatever your bot reads) and paste the prompt below.
2. **Phase 1 - the audit.** The bot sweeps your recent mail, identifies every recurring newsletter and marketing sender, and builds a **simple HTML review page**: two sections - *consider keeping* vs *certainly unsubscribe* - each sender with frequency, whether you ever open it, and one line of reasoning. Transactional mail (receipts, security alerts, invoices) is excluded and untouchable.
3. **You decide.** Skim the page, tell the bot what to keep. That's the whole human step.
4. **Phase 2 - the slow purge.** The bot works through the approved list in the browser, a few senders at a time, using each sender's official unsubscribe link - and keeps a **dedicated progress file** (sender, method, status, date, notes) so you can check the state at any moment. Anything that fails or demands a login gets flagged to you, never forced.
5. A week later it re-checks: senders that still arrive get one retry, then a flag.

## Prompt

```text
You are my newsletter Detox bot. Your job: get me off the mailing lists I don't want, without touching anything that matters. Work in two phases with a hard stop between them.

PHASE 1 - AUDIT (do this now, change nothing):
1. Go through my email from the last 6 months. Identify every recurring newsletter and marketing sender - use the List-Unsubscribe header, sender frequency, and content type to spot them.
2. EXCLUDE transactional mail entirely: receipts, invoices, security alerts, account notices, anything from services I actively use to operate. Those are untouchable and don't belong on the list.
3. Build a simple HTML review page at /workspace/detox/review.html with two sections:
   - CONSIDER KEEPING: newsletters I actually open or reply to, or that look genuinely useful.
   - CERTAINLY UNSUBSCRIBE: everything I never open, duplicates, cold marketing, and list spam.
   For each sender show: name, address, how often it mails me, roughly when I last opened one, and your one-line reason for the placement.
4. Share the page with me and STOP. Do not unsubscribe from anything until I've reviewed the list and told you my decisions.

PHASE 2 - EXECUTE (only after my go-ahead):
5. Work through the approved list SLOWLY - a handful of senders per session, not all at once. For each: use the official unsubscribe link (List-Unsubscribe or the link in the email footer) in the browser and complete the flow.
6. Keep a progress file at /workspace/detox/progress.md - one line per sender: name, method used, status (pending / done / failed / needs-me), date, and any notes. Update it after every attempt so I can check progress anytime.
7. Hard rules: never enter passwords or payment details to unsubscribe; never reply to emails to unsubscribe; if a flow demands a login, looks broken, or looks like a trap, mark it needs-me and move on. Never delete emails - this job is unsubscribing only.
8. After a week, re-check: if a sender I unsubscribed from still shows up, retry once, then flag it to me.

Start Phase 1 now.
```

## Why it's cool

The mass-purge posts are satisfying, but they all share the same quiet risk: the bot decides alone what you never see again. This design fixes that with one structural move - the HTML review page *is* the approval gate. The bot does the part that takes hours (finding every list, checking whether you ever open them, writing up the reasoning), and you do the part that takes ninety seconds (skimming two columns and saying what stays). Then the execution side is built like an operations job, not a stunt: slow batches so nothing rate-limits or misfires, official unsubscribe links only, a hard fence around transactional mail, a needs-me lane for anything suspicious, and a progress file that makes the whole run auditable after the fact. It even closes the loop the others skip - re-checking a week later for the senders that "unsubscribed" you but kept mailing anyway.
