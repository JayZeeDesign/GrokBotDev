---
type: plugin
name: "Postiz"
slug: postiz
tagline: "Let your agent schedule and post across 30+ social platforms."
category: marketing
subcategory: social
install_steps:
  - "Create a Postiz account at postiz.com and connect the accounts or data you want it to reach."
  - "Get your API key or MCP connection from your Postiz dashboard (see the linked docs for the exact place)."
  - "Paste the prompt below into your Grok Bot and give it your Postiz key so this becomes a standing capability."
prompt: "You are setting up a Postiz integration for me inside Grok Bot. First, read Postiz's documentation at https://docs.postiz.com/mcp/introduction so you understand how its MCP server works — authentication with a public API key from Settings → Developers → Public API, and the tools it exposes: listing connected accounts, fetching a platform's posting rules, scheduling or publishing posts, and generating images and videos. Then connect to my Postiz MCP server so that whenever I ask you to schedule, draft, or publish across my social accounts, you use Postiz to do it — pick the right accounts, respect each platform's rules, and post at the time I ask. Rules: follow the documentation exactly and never invent a tool, parameter, or platform Postiz does not list; if I ask for something Postiz cannot do, tell me instead of guessing. Always show me the exact post text, accounts, and time before anything is published, and confirm the connection first by listing my connected accounts."
works_with: ["X"]
project_url: "https://postiz.com"
author:
  handle: "postiz"
  url: "https://postiz.com"
  platform: web
pricing_note: "Open-source core; paid hosted plans."
setup_minutes: 10
featured: true
sponsor: false
added_at: "2026-08-21T00:00:00Z"
updated_at: "2026-08-21T12:00:00Z"
verified_at: "2026-08-21T12:00:00Z"
status: live
---

## What it does

Postiz is an all-in-one, agent-native social media scheduler. Its MCP server lets an AI agent list your connected accounts, read each platform's posting rules, schedule or publish posts, and even generate images and videos — across 30+ platforms, all through natural language.

## Use it in Grok Bot

Paste the prompt on this page into a Grok Bot and give it a Postiz API key or MCP connection. The bot reads Postiz's own documentation first, wires up the integration, and from then on you drive Postiz in plain language — it follows the docs and checks with you before anything that writes or spends.
