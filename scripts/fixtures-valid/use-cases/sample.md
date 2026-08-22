---
type: use-case
slug: sample
headline: "A spec-compliant use case that must always pass validation"
summary: "This fixture mirrors the CONTRIBUTING.md template exactly. If the rulebook and the validator ever drift apart again, this file stops passing and CI catches it before a real contributor does."
categories: [work]
format: use-case
source_tweets:
  - url: https://x.com/example/status/1234567890
    author_handle: example
    excerpt: "A short, real quote from the post used only as a validation fixture."
    posted_at: "2026-01-01T12:00:00Z"
author:
  handle: example
  url: https://x.com/example
  platform: x
prompt_provenance: author
replicability: "Adapt it by pointing the bot at your own accounts and keeping the approval gate on."
added_at: "2026-01-01T12:00:00Z"
updated_at: "2026-01-01T12:00:00Z"
status: proposed
---

## How it's set up

1. A concrete first step: create one narrow bot and connect the accounts it needs.
2. A concrete second step, written specifically enough that a reader could reproduce it at home today without guessing anything.
3. Paste the prompt below, run it once on a safe input, and keep the approval gate on anything that sends, posts, or spends — at least three hundred characters across this whole section so it clears the body contract comfortably.

## Prompt

```text
The real, complete prompt goes here, at least two hundred characters. Describe the role, the sources, the constraints, the deliverable, and where the bot must stop for approval before it sends, posts, pays, or connects an account on your behalf.
```

## Why it's cool

One paragraph on why this matters — the angle, the twist, and what makes it genuinely worth copying into your own Grok Bot, at least one hundred and fifty characters of real explanation here.
