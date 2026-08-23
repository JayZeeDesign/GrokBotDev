---
type: use-case
name: "CSV Medic · Desk Operator"
slug: fix-a-broken-csv-then-slack-and-email-it
headline: "A broken CSV fixed, Slacked and emailed in one chat"
summary: "Marc Saint-Jour's cofounder had an upload fail because line 1 was a title row. Rather than touch the importer he asked Grok Bot to fix the file: 31 rows, headers first. The same chat then posted the note in Slack and emailed the cleaned file."
categories: [work, data]
format: use-case
tagline: "Fix the file, not the importer, then Slack the note and email the CSV."
category: work
subcategory: docs
bot_name: "CSV Medic"
what_it_does: "One chat repairs a broken CSV export - drops the stray title row, puts the real headers on line 1, keeps all 31 rows - then posts the summary note into Slack and emails the cleaned file, so the fix and the delivery never leave the thread."
integrations:
  - Slack
  - X
schedule: adhoc
autonomy: acts-with-approval
difficulty: beginner
setup_minutes: 10
source_tweets:
  - url: https://x.com/MSaintjour/status/2091315303552868437
    author_handle: MSaintjour
    excerpt: "This one cleaned a CSV, posted the note in Slack, and emailed the file. Same chat. ... Cofounder upload failed because line 1 was a title row. I asked Grok Bot to fix the file instead of the importer. 31 rows. Headers first."
    posted_at: "2026-08-23T00:03:17Z"
author:
  handle: MSaintjour
  url: https://x.com/MSaintjour
  platform: x
prompt_provenance: curator
replicability: "Marc described the run rather than posting his prompt, so the starter below is a curator distillation. To adapt: point it at your own failing export, keep the before/after row-count check so a repair can never silently drop rows, and keep the approval gate before it sends anything."
awesome_score: 70
score_breakdown:
  reproducibility: 20
  ambition: 11
  concreteness: 16
  novelty: 9
  evidence: 7
  craft: 7
featured: true
added_at: "2026-08-23T07:30:00Z"
updated_at: "2026-08-23T07:30:00Z"
verified_at: "2026-08-23T07:30:00Z"
status: live
---

## How it's set up

1. **Hand Grok Bot the broken file and the actual error.** Marc's cofounder tried to upload a CSV and the import failed because line 1 was a title row rather than the header row.
2. **Tell it to fix the file, not the importer.** That is the whole judgement call, and it is the one most people get backwards: the importer was behaving correctly, the export was malformed.
3. **Make it diagnose before it edits.** It reports what is actually wrong first, so you are not trusting a silent rewrite.
4. **Repair with a row-count receipt.** It drops the stray title row, promotes the real headers to line 1, and confirms the row count matches on both sides. Marc's run: 31 rows in, 31 rows out, headers first.
5. **Post the note into Slack from the same chat** - the channel that was waiting on the file gets a plain-language summary of what was broken and what changed.
6. **Email the cleaned file** to whoever needs it. In Marc's run the inbox and the channel both got the result out of that one thread.
7. Marc also had Grok Bot cut the demo video of the run and post it to X, again without leaving the conversation.

## Prompt

```text
Here is a CSV export that failed to import. The importer is fine - the file is not. Fix the file, not the importer.

1. Open it and tell me exactly what is wrong BEFORE you change anything. (In my case, line 1 was a title/banner row instead of the header row.)
2. Repair it: drop any stray title or banner rows, promote the real header row to line 1, normalise the column names, and leave every data row intact.
3. Report the row count before and after. If they do not match, STOP and show me the difference instead of guessing.
4. Save the cleaned file alongside the original with a "-clean" suffix. Never overwrite my original.

Then, once you have shown me the summary and I have said go:
5. Post a short plain-language note in the #<channel> Slack channel: what was wrong, what you fixed, and the row count.
6. Email the cleaned file to <recipient> with a two-line summary.

Show me the exact Slack message and the exact email text, and get my approval, before you send either one.
```

## Why it's cool

The clever part is the diagnosis, not the automation. When an import fails, the reflex is to go argue with the importer; Marc's read was that the export was malformed and the file was the cheap thing to fix. What turns that into a use case is that the repair and the delivery happen in one conversation: the cleaned CSV lands in an inbox and the note lands in a channel without anyone opening a spreadsheet, a mail client or a Slack tab. The row-count receipt is the honest bit - a cleanup that cannot prove it kept all 31 rows is not a cleanup, it is a guess. As Marc put it, that is the product: not a recap, the work.
