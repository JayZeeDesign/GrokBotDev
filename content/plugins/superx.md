---
type: plugin
name: "SuperX"
slug: superx
tagline: "Give your agent your X analytics and a 50M-post idea library."
category: marketing
subcategory: social
install_steps:
  - "Create a SuperX account at superx.so and connect the accounts or data you want it to reach."
  - "Get your API key or MCP connection from your SuperX dashboard (see the linked docs for the exact place)."
  - "Paste the prompt below into your Grok Bot and give it your SuperX key so this becomes a standing capability."
prompt: "You are setting up a SuperX integration for me inside Grok Bot. First, read SuperX's developer documentation at https://superx.so/developers so you understand its REST API (base URL https://api.superx.so/v1, Bearer API-key auth) — how to read my published posts and their metrics, pull account analytics, list my most engaging followers, create or delete drafts and scheduled posts, and query its library of viral post ideas. Then use my SuperX API key so that when I ask how my X account is doing you pull the real analytics; when I ask for post ideas you reference the library instead of making things up; and when I ask you to schedule a tweet or thread you create it as a draft or scheduled post. Rules: follow the docs exactly, never invent a metric or endpoint, and base every claim about my account on data the API actually returned. Confirm the connection first by reading my recent posts, and show me any tweet before it is scheduled."
works_with: ["X"]
project_url: "https://superx.so"
x_handle: "superx_so"
founder:
  x_handle: "robj3d3"
author:
  handle: "superx"
  url: "https://superx.so"
  platform: web
pricing_note: "API included in every plan."
setup_minutes: 10
featured: true
sponsor: false
added_at: "2026-08-21T00:00:00Z"
updated_at: "2026-08-21T12:00:00Z"
verified_at: "2026-08-21T12:00:00Z"
status: live
---

## What it does

SuperX is an X (Twitter) growth tool — scheduling, analytics, AI content and a library of 50M+ real posts. Its REST API and agent skill let a Grok Bot read your metrics, pull proven post structures, and schedule tweets and threads.

## Use it in Grok Bot

Paste the prompt on this page into a Grok Bot and give it a SuperX API key or MCP connection. The bot reads SuperX's own documentation first, wires up the integration, and from then on you drive SuperX in plain language — it follows the docs and checks with you before anything that writes or spends.
