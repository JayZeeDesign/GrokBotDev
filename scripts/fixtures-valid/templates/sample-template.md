---
type: template
name: A spec-compliant shareable bot
slug: sample-template
tagline: "The fixture every template rule is measured against, top to bottom"
description: "This file mirrors the CONTRIBUTING.md template for a shareable bot exactly and exercises every optional field. If the rulebook and the validator ever drift apart, this fixture stops passing and CI catches it before a real contributor does."
sharer:
  handle: example
  name: Example Sharer
  url: https://x.com/example
  platform: x
source:
  url: https://x.com/example/status/1234567891
  excerpt: "A short, real quote from the post the template was shared in, used only as a validation fixture."
  posted_at: "2026-01-01T12:00:00Z"
share_url: https://x.ai/bot/Xk7mQ2pR9vT4nB6cL1sD8
tags: [business, automation, support, on-demand]
primary_category: automation
includes: [instructions, memories, workflow, connectors]
includes_note: "One bot, one connector, and a memory of the last thirty tickets it handled."
integrations: [Slack]
featured: true
added_at: "2026-01-01T12:00:00Z"
updated_at: "2026-01-01T12:00:00Z"
verified_at: "2026-01-01T12:00:00Z"
status: live
---

## What it does

A concrete description of the packaged Bot, written specifically enough that a reader could decide
whether they want it without opening the share link. It names what the Bot watches, what it writes,
what it is allowed to do on its own, and the exact point at which it stops and asks. At least two
hundred characters across this section so it clears the body contract comfortably, and no raw HTML
anywhere in it because the validator rejects that outright.

## What you get

The concrete outcome, in one or two lines: what lands in front of you, how often, and what it saves
you from doing by hand.

## Before you install

The honest caveats: what it needs connected, what it will read, and what it will never do without
being asked. A shared Bot carries somebody else's instructions, so this section is where a reader
finds out what those instructions are before they run them.
