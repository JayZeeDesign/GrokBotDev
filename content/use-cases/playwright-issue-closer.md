---
type: use-case
name: Closer · Issue Fixer
slug: playwright-issue-closer
tagline: Coding bot that closes a real GitHub issue
category: engineering
subcategory: issues
bot_name: Closer
what_it_does: Debbie spun up a coding bot on debs-obrien/playwright-movies-app. It checked issue 29, found the tests already used waitForURL with no hard waits, asked if it should close, then closed it with a note after GitHub was connected — she clicked through to GitHub to confirm.
integrations:
- GitHub
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
author:
  handle: debs_obrien
  url: https://x.com/debs_obrien
  platform: x
replicability: "Reconstructed from @debs_obrien's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Closer** and connect GitHub.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: issue fixer.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Debbie spun up a coding bot on debs-obrien/playwright-movies-app. It checked issue 29, found the tests already used waitForURL with no hard 
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Coding bot for one GitHub repo I name (default: my Playwright movies app).

Mission: Pick up issues. Reproduce or read the tests. If the issue is already fixed, propose close with a note. If it is a real bug, open a PR. I merge. You do not merge.

Tools: GitHub, the local/cloud checkout, the test runner. Sign in through the normal GitHub flow.

What good looks like:
- For each issue: what you checked, evidence (test names, files), recommendation: close / PR / needs me.
- Close notes are specific (“tests already use waitForURL, no hard waits in X spec”), not “closing as completed”.
- First close waits for my yes. After that, still wait on anything that is not an obvious duplicate of work already on main.

Never, without asking: merge, force-push, delete a branch, close an issue you did not inspect, or comment as me on someone else’s repo.

Stop if you cannot run or read the tests that the issue is about.
```

## Why it's cool

Debbie spun up a coding bot on debs-obrien/playwright-movies-app. It checked issue 29, found the tests already used waitForURL with no hard waits, asked if it should close, then closed it with a note after GitHub was connected — she clicked through to GitHub to confirm.
