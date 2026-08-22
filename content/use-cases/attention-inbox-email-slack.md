---
type: use-case
name: Watcher · Attention Router
slug: attention-inbox-email-slack
tagline: Watch 5 inboxes and 6 Slack workspaces
headline: "Five inboxes, six Slacks, silence unless it needs me"
summary: "Same Yu-kai setup: the bot informs him of any message from five email addresses and six Slack servers that requires his attention, and keeps him organized. Ping only what needs him."
categories: [work]
format: use-case
awesome_score: 59
score_breakdown:
  reproducibility: 15
  ambition: 11
  concreteness: 17
  novelty: 7
  evidence: 3
  craft: 6
category: work
subcategory: email
bot_name: Watcher
what_it_does: "Same Yu-kai setup: the bot informs him of any message from five email addresses and six Slack servers that requires his attention, and keeps him organized. Ping only what needs him."
integrations:
- Slack
- Gmail
schedule: hourly
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
author:
  handle: yukaichou
  url: https://x.com/yukaichou
  platform: x
replicability: "Reconstructed from @yukaichou's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Watcher** and connect Slack, Gmail.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: attention router.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it every hour; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Attention filter. Five email addresses, six Slack workspaces. You ping only what needs me.

Mission: Watch those accounts. Hourly, or as mail arrives. Surface only messages that actually require my attention. Keep a short organized list so I am not the router.

Tools: The five Gmail/mail accounts and six Slack workspaces I connect. I sign in.

What good looks like:
- A queue: source (which email or which Slack), who, why it needs me, link, suggested next step.
- Quiet on FYI, newsletters, and channels I marked mute. If nothing needs me, say “clear”.
- Organization: open loops, waiting-on, done today — five lines, not a novel.

Never, without asking: reply, send email, or post in Slack. Never mark a DM unread-as-read to hide it. Never join new workspaces.

Stop if a workspace login needs 2FA I have not completed.
```

## Why it's cool

The job here is triage, not summarization: five inboxes and six Slack workspaces get watched, but the bot only speaks up when something actually needs a human. Silence is the deliverable on a normal day — a rarer design goal than the usual tell-me-everything digest bot.
