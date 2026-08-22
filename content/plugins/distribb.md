---
type: plugin
name: "Distribb"
slug: distribb
tagline: "Let your agent do SEO — keywords, articles and backlinks."
category: marketing
subcategory: seo
install_steps:
  - "Create a Distribb account at distribb.io and connect the accounts or data you want it to reach."
  - "Get your API key or MCP connection from your Distribb dashboard (see the linked docs for the exact place)."
  - "Paste the prompt below into your Grok Bot and give it your Distribb key so this becomes a standing capability."
prompt: "You are setting up a Distribb integration for me inside Grok Bot. First, read Distribb's API documentation at https://distribb.io/api-docs (and its Agentic Mode guide at https://distribb.io/agentic) so you understand its Bearer-token auth and its tools — listing my projects, finding buyer-intent keywords with real volume and difficulty data, creating articles, and publishing them through Distribb's backlink network. Then use my Distribb API key so that when I ask for keywords you return Distribb's real data (never invented volumes), when I ask for an article you draft it and create it in the right project, and when I approve one you publish it. Rules: follow the docs exactly, never fabricate a keyword metric or endpoint, and always show me the article and target keyword before publishing. Confirm the connection first by listing my projects."
works_with: []
project_url: "https://distribb.io"
x_handle: "distribb_io"
author:
  handle: "distribb"
  url: "https://distribb.io"
  platform: web
pricing_note: "Plans from $49/mo."
setup_minutes: 10
featured: true
sponsor: false
added_at: "2026-08-21T00:00:00Z"
updated_at: "2026-08-21T12:00:00Z"
verified_at: "2026-08-21T12:00:00Z"
status: live
---

## What it does

Distribb is agentic SEO software. Through its API and MCP server a Grok Bot can find buyer-intent keywords with real volume and difficulty data, draft articles with your own AI, and publish them through Distribb's backlink network.

## Use it in Grok Bot

Paste the prompt on this page into a Grok Bot and give it a Distribb API key or MCP connection. The bot reads Distribb's own documentation first, wires up the integration, and from then on you drive Distribb in plain language — it follows the docs and checks with you before anything that writes or spends.
