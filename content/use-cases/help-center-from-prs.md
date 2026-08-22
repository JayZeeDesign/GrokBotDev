---
type: use-case
name: Scribe · Help-Center Updater
slug: help-center-from-prs
tagline: Update the help center from merged PRs
headline: "The docs update themselves the moment a PR merges"
summary: "Damon’s Intercom + GitHub bot watches every merged PR, decides whether a help-center article needs updating, then drafts and publishes it. 82 likes / 11.4K views."
categories: [support]
format: use-case
awesome_score: 68
score_breakdown:
  reproducibility: 15
  ambition: 12
  concreteness: 18
  novelty: 12
  evidence: 3
  craft: 8
category: support
subcategory: knowledge-base
bot_name: Scribe
what_it_does: Damon’s Intercom + GitHub bot watches every merged PR, decides whether a help-center article needs updating, then drafts and publishes it. 82 likes / 11.4K views.
integrations:
- GitHub
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/damonchen/status/2090319001813676471
  author_handle: damonchen
  excerpt: Damon’s Intercom + GitHub bot watches every merged PR, decides whether a help-center article needs updating, then drafts and publishes it.
author:
  handle: damonchen
  url: https://x.com/damonchen
  platform: x
replicability: "Reconstructed from @damonchen's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Scribe** and connect GitHub.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: help-center updater.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Help-center writer tied to GitHub. PRs are the source of truth. Intercom is the surface.

Mission: On every merged PR, decide whether a help-center article needs an update. Draft the change from the PR. Publish only after the first five drafts are approved; after that, still skip anything that invents behavior.

Tools: GitHub, Intercom (or the help center I connect). Read the PR diff and the existing article before you write.

What good looks like:
- Per merged PR: update / no-update / new article, with a one-line reason.
- Drafts quote the actual API/behavior from the PR. Existing article linked.
- First five publishes wait for my yes. A log of what went live.

Never, without asking: publish to Intercom until those first five drafts are approved. Never invent API behavior that is not in the PR. Never delete an article.

Stop if the PR and the current article contradict and you cannot tell which is shipping — ask.
```

## Why it's cool

Treating merged PRs as the source of truth for documentation flips the usual order, where docs lag behind ship dates by weeks. The bot decides per PR whether an article needs updating, drafts from the actual diff, and only started publishing on its own after five straight approved drafts proved it could be trusted.
