---
type: plugin
name: "AdKit"
slug: adkit
tagline: "Let your agent draft and run Meta, Google and TikTok ads."
category: marketing
subcategory: ads
install_steps:
  - "Create a AdKit account at adkit.so and connect the accounts or data you want it to reach."
  - "Get your API key or MCP connection from your AdKit dashboard (see the linked docs for the exact place)."
  - "Paste the prompt below into your Grok Bot and give it your AdKit key so this becomes a standing capability."
prompt: "You are setting up an AdKit integration for me inside Grok Bot. First, read AdKit's documentation at https://adkit.so so you understand its remote MCP server and how it runs ads on Meta, Google and TikTok — creating campaigns, ad sets, budgets, targeting and creatives, and browsing ad libraries — and note its safety model: every change is created as a draft first. Then connect to my AdKit MCP server so that when I ask you to build or adjust a campaign you draft it in plain English through AdKit, and when I want inspiration you pull real ads from the libraries. Rules: follow the documentation exactly and never invent a targeting option, budget field, or metric. Everything stays a draft — never publish, launch, or change spend on a live campaign without showing me the full draft and getting my explicit go-ahead. Confirm access first with a read-only call such as listing my ad accounts."
works_with: []
project_url: "https://adkit.so"
author:
  handle: "adkit"
  url: "https://adkit.so"
  platform: web
setup_minutes: 10
featured: true
sponsor: false
added_at: "2026-08-21T00:00:00Z"
updated_at: "2026-08-21T12:00:00Z"
verified_at: "2026-08-21T12:00:00Z"
status: live
---

## What it does

AdKit is an ads toolbox built for AI agents — a remote MCP server that runs campaigns on Meta, Google and TikTok and browses ad libraries. Its safety model turns every change into a draft first, so a Grok Bot can build campaigns in plain English without risking live spend.

## Use it in Grok Bot

Paste the prompt on this page into a Grok Bot and give it a AdKit API key or MCP connection. The bot reads AdKit's own documentation first, wires up the integration, and from then on you drive AdKit in plain language — it follows the docs and checks with you before anything that writes or spends.
