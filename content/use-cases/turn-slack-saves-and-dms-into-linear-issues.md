---
type: use-case
name: "Slack Catcher · Issue Filer"
slug: turn-slack-saves-and-dms-into-linear-issues
headline: "The Slack message I miss still becomes a Linear issue"
summary: "Sebastian Aarnio has Grok Bot watch his saved Slack messages and his Linear issues. When someone messages him it files an issue too, so nothing is lost even when he misses the message, and it drafts his meeting notes from what is done and in progress."
categories: [engineering, work]
format: use-case
tagline: "Saved Slack messages and DMs land in Linear before you can forget them."
category: engineering
subcategory: issues
bot_name: "Slack Catcher"
what_it_does: "Grok Bot tracks saved Slack messages against Linear. Any direct message becomes an issue automatically, so a request survives even when you never see it, and the same bot writes meeting notes from what you finished and what is still in progress."
integrations:
  - Slack
  - Linear
schedule: daily
autonomy: acts-with-approval
difficulty: beginner
setup_minutes: 20
source_tweets:
  - url: https://x.com/aarniodev/status/2091316096678670382
    author_handle: aarniodev
    excerpt: "I have Grok Bot keep track of my saved slack messages and linear issues. If someone messages me it also creates an issue so it won't be forgotten, even if I personally miss the message."
    posted_at: "2026-08-23T00:06:26Z"
author:
  handle: aarniodev
  url: https://x.com/aarniodev
  platform: x
prompt_provenance: curator
replicability: "Sebastian described the setup rather than posting a prompt, so the starter below is a curator distillation. To adapt: swap Linear for your tracker, keep the rule that an unclear ask still becomes an issue, and mirror the whole thing on a personal account for chores."
awesome_score: 72
score_breakdown:
  reproducibility: 20
  ambition: 13
  concreteness: 16
  novelty: 11
  evidence: 4
  craft: 8
featured: true
added_at: "2026-08-23T07:30:00Z"
updated_at: "2026-08-23T07:30:00Z"
verified_at: "2026-08-23T07:30:00Z"
status: live
---

## How it's set up

1. **Connect Grok Bot to Slack and to Linear** and give it one standing job: keep the two in sync for you.
2. **Point it at your saved Slack messages.** Anything you save is a thing you meant to come back to, which makes it the cleanest possible signal of intent.
3. **Add the safety net.** When someone direct-messages you, it files a Linear issue as well. Sebastian's reason is the whole point of the setup: it will not be forgotten even if he personally misses the message.
4. **Keep the issue linked back to the Slack thread** so the context is one click away and nobody has to re-ask.
5. **Have it prepare your meeting notes** from the same data: what you completed since last time, and what is in progress.
6. **Let it spin up coding agents for the small stuff.** Sebastian uses it to launch Cursor agents for draft PRs and changes that do not need babysitting; the larger, iterative UI work he still drives himself.
7. **Mirror the whole thing personally.** He runs the same Grok Bot plus Linear setup on his personal account for chores and day-to-day life.

## Prompt

```text
You are my personal assistant across Slack and Linear. Standing job: nothing that is asked of me gets lost.

WATCH:
1. My saved Slack messages. Anything I save is something I meant to come back to.
2. Direct messages sent to me. Treat every DM as a potential request, INCLUDING ones I never opened.

FILE:
- For each one, create a Linear issue in <team/project>: a title in plain language, the ask in one or two lines, who asked, and a link back to the Slack thread.
- If the ask is vague, still file it, and title it with the open question rather than guessing what they meant.
- Before you file, check Linear for an existing issue on the same thing. If one exists, comment on it instead of creating a duplicate.
- Never close, reassign or re-prioritise anything. Filing and commenting only.

REPORT:
- Once a day, give me the new issues and anything I have been sitting on for more than three days.
- Before each of my meetings, draft notes: what I completed since the last one, what is in progress, and what I am blocked on.

Show me the issue titles and the meeting notes and get my approval before you post anything into Slack or assign anything to another person.
```

## Why it's cool

The design assumption is the good part: it assumes you will miss things. Most Slack-to-tracker automations are built for the messages you read and then meant to action, which is the easy half of the problem. Sebastian's fires on the message he never opened, so the request survives his attention rather than depending on it, and the Slack link means the issue arrives with its own context instead of as a one-line mystery. Stacking meeting notes on the same data is what makes it hold together - the bot already knows what you finished and what is open, so the standup writes itself out of the record it was keeping anyway. And the fact that he runs the identical setup on a personal account for chores is the quiet proof that it is a habit rather than a demo.
