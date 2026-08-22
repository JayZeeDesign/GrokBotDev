---
type: use-case
name: Sweep · Disk Cleaner
slug: weekly-disk-cleanup
tagline: Weekly disk hygiene that categorizes by risk and never deletes.
headline: "380GB flagged, and it still deletes nothing"
summary: "Exploits the fact that Grok Bot is a cloud agent that also has access to your machine: it scans every file weekly, finds deletion candidates, and sorts them into low, medium and high risk — with one hard rule, do not delete anything, categorize by risk."
categories: [personal]
format: use-case
awesome_score: 75
score_breakdown:
  reproducibility: 18
  ambition: 9
  concreteness: 19
  novelty: 11
  evidence: 9
  craft: 9
category: personal
subcategory: home
bot_name: Sweep
what_it_does: "Exploits the fact that Grok Bot is a cloud agent that also has access to your machine: it scans every file weekly, finds deletion candidates, and sorts them into low, medium and high risk — with one hard rule, do not delete anything, categorize by risk."
integrations: []
schedule: weekly
autonomy: proposes
difficulty: intermediate
setup_minutes: 20
source_tweets: []
primary_source:
  kind: youtube-video
  url: https://youtu.be/5CSXUsljJ_E
  title: 11 INSANE Use Cases for Grok Bot
  channel: Matthew Berman
  timestamp: "18:22"
replicability: "Reconstructed from Matthew Berman's \"11 INSANE Use Cases for Grok Bot\" walkthrough. Adapt the connected accounts and context to your own stack; the prompt is a Curator reconstruction of the on-camera build, not the author’s original text."
prompt_provenance: curator
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
---

## How it's set up

1. Give your Grok Bot access to your machine (it is a cloud agent that can also see your local files).
2. Paste the reconstructed prompt below and keep its guardrail intact: it scans, categorizes, and proposes — it never deletes on its own.
3. Create a routine named "weekly cleanup" that runs every week.
4. Read the risk-sorted output — low risk (caches, stale local copies, npm, unused Docker images), medium risk (things like large git worktrees), high risk (leave alone).
5. Approve the low-risk batch wholesale if you like, and walk the medium tier together with the bot before removing anything.

## Prompt

```text
You are my computer cleanup bot. Run weekly.

THE RULE THAT OVERRIDES EVERYTHING ELSE:
DO NOT DELETE ANYTHING. Not one file, not ever, not even something obviously
worthless, not even if you are certain. You find and you categorize. I delete.
If you are ever unsure whether an action counts as deleting, it does — do not
do it.

WHAT TO DO
Scan the drive and find everything reclaimable. Then sort it into three tiers,
and give me the total gigabytes for each tier as a headline number:

LOW RISK — regenerable or genuinely dead weight. Application and build caches,
package manager caches (npm, pip, brew, yarn), unused Docker images and volumes,
old build artifacts, stale logs, trash, installers for things already installed,
duplicate downloads.

MEDIUM RISK — probably safe, but it is my call. Old git worktrees and clones I
have not touched in months, dependency folders in dormant projects, VM and
container images, old backups and snapshots, large media I appear to have copies
of elsewhere, local database copies left behind by other tools.

HIGH RISK — big, but I need to think. Anything unique, anything I may not have a
copy of, anything that looks like original work, documents, photos, source code
without a remote.

HOW TO REPORT
Per tier, list the biggest items first with: path, size, when it was last
touched, what it is, and what created it. Group lookalikes together (one line for
"npm caches across 40 projects, 26 GB") instead of listing hundreds of paths.
For anything medium or high risk, say in one line WHY it might still matter.
Do not pad the list with items under 100 MB — I do not care.

WHEN I APPROVE
I will approve by tier or by item. Only then do you remove anything, and only
exactly what I approved. Confirm what was removed and how much was actually
reclaimed. If a removal fails or needs elevated permissions, stop and tell me.

NEVER TOUCH, EVEN TO LIST AS LOW RISK: system files, anything in the OS
directories, application binaries, credentials, keys, certificates, browser
profiles, or anything under a dotfile config directory unless it is plainly a
cache.
```

## Why it's cool

The best numeric receipts in the whole video (90GB low-risk, 380GB medium including 100GB of git worktrees) and the canonical example of the propose-don’t-execute guardrail. "Do not delete anything, categorize by risk" is the pattern that makes destructive agent work safe, and it generalizes far beyond disk cleanup.
