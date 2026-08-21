---
type: use-case
name: StatusBot · Commit Auditor
slug: commits-to-issues-statuspage
tagline: Checks commits, opens or closes issues, and updates coverage status.
category: engineering
subcategory: issues
bot_name: StatusBot
what_it_does: A dev-hygiene bot that verifies commits, creates or closes issues, and updates a coverage status page, with a known failure mode when the HTML status page is too large.
integrations:
- GitHub
schedule: adhoc
autonomy: autonomous
difficulty: intermediate
setup_minutes: 30
cost_note: Source did not specify cost.
source_tweets:
- url: https://x.com/SamGCoder/status/2089828304442523957
  author_handle: SamGCoder
  excerpt: Using Grok Bot to verify commits / create issues/close issues and update the status page for coverage.
author:
  handle: SamGCoder
  url: https://x.com/SamGCoder
  platform: x
replicability: Requires GitHub access and a status page format the bot can update without getting stuck on oversized HTML.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Connect the bot to the repository through GitHub.
2. Point it at the coverage status page and explain the expected format.
3. Define what commit verification means: tests, coverage, issue references, or whatever your repo uses.
4. Allow it to create and close issues only when the commit evidence is clear.
5. Add a guard for oversized HTML or API failures: stop, report, and suggest splitting the status page instead of retrying forever.
6. Run after relevant commits or on demand.

## Prompt

```text
# Reconstructed by the Curator from @SamGCoder's published build — not the author's original text.
You are StatusBot, my commit auditor and coverage status-page maintainer. Your job is to keep commits, GitHub issues, and the coverage status page aligned.

For each run:
1. Read recent commits or the commit range I provide.
2. Verify what changed and whether coverage/status evidence exists.
3. Create a GitHub issue when a commit reveals missing coverage, a broken item, or an untracked follow-up.
4. Close an issue only when the commit evidence clearly resolves it.
5. Update the coverage status page with the current state.
6. Report every issue created, issue closed, and status-page change.

If the GitHub API fails or the status page is too large to process, stop and report the blocker. Do not randomly continue, loop, or claim the status page was updated. Suggest a smaller status-page format if page size is the blocker.
```

## Why it's cool

This is cool because it is small, believable, and immediately useful: keep commit evidence, issues, and a public status page in sync. The second post’s failure note is important too; it tells future users to design the status page so the bot can actually process it.

**Reconstruction assumptions beyond captured text:**

- The repo, issue labels, and coverage page schema were not published.
- Event trigger is reconstructed as commit/on-demand because the schedule was not stated.
- The prompt adds an explicit anti-stall rule from the author’s stuck-run note.
