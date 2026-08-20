---
type: plugin
name: "Discord Grok Bot Bridge"
slug: discord-grok-bot-bridge
tagline: Lets a private Discord bot wake and route messages to Grok Bot.
category: support
subcategory: replies
install_steps:
  - "Create a Discord bot in the Developer Portal and enable Message Content Intent."
  - "Clone the bridge repo, copy `.env.example`, and fill in the Discord and gateway values."
  - "Run install, tests and build, then start the bridge against one private, allowlisted server."
works_with: [Discord]
project_url: "https://github.com/FlyOverCoderKY/discord-agent-bridge"
repo_url: "https://github.com/FlyOverCoderKY/discord-agent-bridge"
author:
  handle: "FlyOverCoderKY"
  url: "https://github.com/FlyOverCoderKY"
  platform: github
source_url: "https://forum.cursor.com/t/official-discord-plugin-for-grok-bot-inbound-channels/168430/7"
setup_minutes: 45
pricing_note: "Free and open source; you host the bridge yourself."
featured: false
added_at: "2026-08-20T22:45:00Z"
updated_at: "2026-08-20T23:45:00Z"
verified_at: "2026-08-20T23:45:00Z"
status: live
---

## What it does

This is the pipe between Discord and Grok Bot, for people who live in Discord instead of Slack. The repo describes an open-source Discord ↔ Grok Bot connector: it handles Discord auth, routing, allowlists, rate limits and reply UX, while your Bot's persona, tools and routines stay in Grok Bot where they belong.

It is an advanced, unofficial entry and we are labelling it that way on purpose. The Grok Bot path runs through the Bot computer's private HTTP gateway, which the repo itself calls interim. The builder posted it to the Cursor forum saying it was working for him and published it under MIT.

## Install setup

Create the Discord bot first, enable Message Content Intent, then clone the repo and fill `.env` from `.env.example`. Run the install, test and build steps before starting it, and point it at one private server you control.

Treat `DISCORD_BOT_TOKEN`, `GROK_BOT_TOKEN` and `BRIDGE_REPLY_TOKEN` like passwords. The repo's own guidance is the right guidance: never commit `.env`, keep the internal reply endpoint authenticated and fail-closed, and bind to localhost when the bridge sits next to the gateway. Start with an allowlist of one channel and widen it only after a clean round trip.
