---
type: plugin
name: "Sequenzy"
slug: sequenzy
tagline: "Run your email marketing - subscribers, campaigns, sequences - from your Grok Bot."
category: marketing
subcategory: content
install_steps:
  - "Create a Sequenzy account at sequenzy.com. Sequenzy is a developer-first email marketing platform - subscribers, campaigns, sequences, forms and landing pages - with a remote MCP server your agent can drive."
  - "In your Grok Bot's connector / MCP settings, add a custom connector pointing at https://api.sequenzy.com/v1/mcp (Streamable HTTP). A browser opens for OAuth sign-in - there is no API key to paste."
  - "Paste the prompt below so managing subscribers, campaigns and sequences becomes a standing capability you drive in plain language."
prompt: "You are setting up a Sequenzy integration inside Grok Bot. Connect to Sequenzy's remote MCP server at https://api.sequenzy.com/v1/mcp (Streamable HTTP; a browser opens for OAuth sign-in, no API key). Read what Sequenzy exposes so you understand it: it is a developer-first email marketing platform with 100+ tools for subscribers (add, update, tag, search), lists and segments, campaigns (create, schedule, send test, render), automated sequences (create, enable, enroll subscribers), templates and transactional email, forms, popups and landing pages, integrations, and analytics. Then let me run my email marketing in plain language: 'add these subscribers and tag them', 'draft and schedule this campaign', 'build a 3-email welcome sequence and enroll new signups', 'show me how the last campaign performed'. Rules: sending email reaches real people and is effectively irreversible, so ALWAYS show me the exact audience (list or segment and its approximate size), the subject, and the full content, and get my explicit approval before you send or schedule any campaign or enable any sequence; send a test to me first when I ask; and never invent a subscriber, list, segment, or template that Sequenzy didn't return. Confirm the connection by listing my Sequenzy lists and recent campaigns."
works_with: [Stripe]
project_url: https://www.sequenzy.com
founder:
  name: "Nic Polotnianko"
  x_handle: "nikpolale"
author:
  handle: nikpolale
  url: https://x.com/nikpolale
  platform: x
source_url: https://docs.sequenzy.com/concepts/mcp
pricing_note: "See sequenzy.com for current pricing."
setup_minutes: 5
featured: false
sponsor: false
added_at: "2026-08-23T22:15:00Z"
updated_at: "2026-08-23T22:15:00Z"
verified_at: "2026-08-23T22:15:00Z"
status: live
---

## What it does

Sequenzy is a developer-first email marketing platform - think "Cursor for marketing emails." It handles the whole lifecycle: subscribers, lists and segments, broadcast campaigns, automated sequences, templates and transactional email, forms, popups and landing pages, plus integrations (like Stripe, to segment by MRR/LTV) and analytics. Its remote MCP server exposes 100+ tools, so your Grok Bot can run all of it in plain language instead of you clicking through a dashboard.

## Use it in Grok Bot

Add a custom MCP connector in your Bot pointing at `https://api.sequenzy.com/v1/mcp` (Streamable HTTP, OAuth sign-in - no API key), then paste the prompt on this page. From then on you can tell your Bot to add and tag subscribers, draft and schedule a campaign, build a welcome sequence and enroll new signups, or pull last week's numbers. Because a campaign reaches real inboxes, the prompt makes the Bot show you the exact audience, subject and content and wait for your approval before it ever sends or schedules anything.
