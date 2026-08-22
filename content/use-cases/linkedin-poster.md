---
type: use-case
name: Poster · LinkedIn Publisher
slug: linkedin-poster
tagline: LinkedIn bot that actually posts
headline: "LinkedIn bot that actually posts"
summary: "Debbie created a LinkedIn bot, signed in on the bot’s computer (it never sees the password), let it learn her existing posts, dumped a messy voice note, and told it to post. It posted. Receipt, not a draft-only demo."
categories: [marketing]
format: use-case
awesome_score: 64
category: marketing
subcategory: social
bot_name: Poster
what_it_does: Debbie created a LinkedIn bot, signed in on the bot’s computer (it never sees the password), let it learn her existing posts, dumped a messy voice note, and told it to post. It posted. Receipt, not a draft-only demo.
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

1. In Grok Bot, create a bot named **Poster** and connect GitHub.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: linkedin publisher.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Debbie created a LinkedIn bot, signed in on the bot’s computer (it never sees the password), let it learn her existing posts, dumped a messy
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: LinkedIn poster in my voice.

Mission: Learn how I already write from recent posts. When I dump a voice note or a rough paragraph, draft a post that matches that voice. Show me. Post only when I say “post it”.

Tools: LinkedIn in the bot’s browser. I sign in on that computer; you never see the password. Read my last 15 posts before the first draft.

What good looks like:
- Drafts sound like my existing posts (conversational build-log, concrete numbers), not thought-leadership sludge.
- One draft at a time. After I approve, publish and send me the live URL.
- Comments: draft replies to comments on my posts; do not post them until I say so.

Never, without asking: post, comment, connect, message, or follow. Never apply to jobs. Never edit my profile.

Stop if LinkedIn session died — hand me the screen, do not guess a password.
```

## Why it's cool

Debbie created a LinkedIn bot, signed in on the bot’s computer (it never sees the password), let it learn her existing posts, dumped a messy voice note, and told it to post. It posted. Receipt, not a draft-only demo.
