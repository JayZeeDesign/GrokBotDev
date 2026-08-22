---
type: plugin
name: "Post Bridge"
slug: post-bridge
tagline: "Give your agent one API to post to 10+ social platforms."
category: marketing
subcategory: social
install_steps:
  - "Create a Post Bridge account at post-bridge.com and connect the accounts or data you want it to reach."
  - "Get your API key or MCP connection from your Post Bridge dashboard (see the linked docs for the exact place)."
  - "Paste the prompt below into your Grok Bot and give it your Post Bridge key so this becomes a standing capability."
prompt: "You are setting up a Post Bridge integration for me inside Grok Bot. First, read Post Bridge's API reference at https://api.post-bridge.com/reference (and its MCP guide at https://www.post-bridge.com/mcp) so you understand its authentication and the endpoints for uploading media, creating posts, scheduling, and reading analytics, plus which of the 10+ platforms each supports. Then use my Post Bridge API key so that whenever I ask you to cross-post or schedule to my social accounts — Instagram, TikTok, YouTube, X, LinkedIn and the rest — you upload any media and create the post through Post Bridge at the time I specify. Rules: follow the docs exactly, never invent an endpoint or field, and if a platform does not support what I asked, say so. Show me the caption, target platforms, and schedule before publishing, and confirm access first with a read-only call such as listing my connected accounts."
works_with: ["X"]
project_url: "https://www.post-bridge.com"
x_handle: "postbridge_"
founder:
  name: "Jack Friks"
  x_handle: "jackfriks"
author:
  handle: "post-bridge"
  url: "https://www.post-bridge.com"
  platform: web
pricing_note: "API access is a $5/mo add-on."
setup_minutes: 10
featured: true
sponsor: false
added_at: "2026-08-21T00:00:00Z"
updated_at: "2026-08-21T12:00:00Z"
verified_at: "2026-08-21T12:00:00Z"
status: live
---

## What it does

Post Bridge is one API for publishing and scheduling across 10+ networks — Instagram, TikTok, YouTube, X, LinkedIn and more. It ships a native MCP server and an agent mode so a Grok Bot can upload media and cross-post from a single call.

## Use it in Grok Bot

Paste the prompt on this page into a Grok Bot and give it a Post Bridge API key or MCP connection. The bot reads Post Bridge's own documentation first, wires up the integration, and from then on you drive Post Bridge in plain language — it follows the docs and checks with you before anything that writes or spends.
