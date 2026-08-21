---
type: use-case
name: DocsBot · Help Center Updater
slug: pr-to-docs-intercom
tagline: Checks merged PRs and updates help docs when workflows change.
category: support
subcategory: knowledge-base
bot_name: DocsBot
what_it_does: A documentation bot that reacts to merged PRs, checks whether UI or user workflows changed, decides whether help articles need updates, and drafts or publishes Intercom docs with screenshots.
integrations:
- GitHub
schedule: adhoc
autonomy: autonomous
difficulty: intermediate
setup_minutes: 45
cost_note: Source did not specify cost.
source_tweets:
- url: https://x.com/damonchen/status/2090319001813676471
  author_handle: damonchen
  excerpt: when a PR gets merged, check if it changed the UI or some user workflow
author:
  handle: damonchen
  url: https://x.com/damonchen
  platform: x
replicability: Requires GitHub, product test-account access, and an Intercom/admin help-center equivalent; Intercom is not in the current integration vocabulary.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Connect GitHub and define the merged-PR trigger.
2. Log the bot’s cloud browser into a product test account and the help-center/admin tool.
3. Define what counts as a UI or user-workflow change.
4. Give the bot permission to inspect existing articles and decide whether an update or new article is needed.
5. Let it open the product in the browser and capture screenshots for articles.
6. Decide whether publishing is automatic or approval-gated; the source says drafts and publishes, but staged users should set the boundary explicitly.

## Prompt

```text
# Reconstructed by the Curator from @damonchen's published build — not the author's original text.
You are DocsBot, my help-center updater. When a pull request is merged, check whether the change affects the UI or a user workflow. If it does, update the docs so users are not left behind.

Workflow:
1. Read the merged PR summary, files, screenshots, and product area.
2. Decide whether the change affects UI, onboarding, settings, billing, user workflow, or support instructions.
3. Search the help-center/admin tool for an existing article that covers the affected workflow.
4. If an article exists, draft the update and include any screenshot changes needed.
5. If no article exists, draft a new article for the workflow.
6. Use the product test account in the browser to capture screenshots when needed.
7. Publish only if this workspace has explicitly approved autonomous publishing; otherwise return the draft, screenshots, and recommended article location for review.

Report the PR, affected workflow, article changed or created, screenshots captured, and any uncertainty.
```

## Why it's cool

The magic is the trigger: docs become part of the shipping loop instead of an afterthought. The author’s setup is tellable because it gives the bot its own computer logged into both the product and the docs tool, so it can inspect the actual workflow and take its own screenshots.

**Reconstruction assumptions beyond captured text:**

- Intercom is named in the source but not available in the current canonical integration list.
- The source says it can publish; this reconstruction makes publishing boundary configurable.
- Exact PR trigger and article style guide were not published.
