---
type: plugin
name: "Breakcold"
slug: breakcold
tagline: "Let your agent run your CRM across email, LinkedIn and WhatsApp."
category: sales
subcategory: crm
install_steps:
  - "Create a Breakcold account at breakcold.com and connect the accounts or data you want it to reach."
  - "Get your API key or MCP connection from your Breakcold dashboard (see the linked docs for the exact place)."
  - "Paste the prompt below into your Grok Bot and give it your Breakcold key so this becomes a standing capability."
prompt: "You are setting up a Breakcold integration for me inside Grok Bot. First, read Breakcold's MCP documentation at https://www.breakcold.com/crm-mcp (and the setup guides at https://github.com/breakcold/mcp) so you understand its hosted MCP server and the tools it exposes — reading and writing people, companies, deals, tasks, notes and custom fields, moving deals across the pipeline/Kanban, and reading conversations across email, LinkedIn, WhatsApp and Telegram. Then connect to my Breakcold MCP server so that when I ask about a contact or deal you answer from the CRM, when I ask you to log or update something you write it back, and when I ask what to do next you read the recent conversations and propose the next step. Rules: follow the documentation exactly, never invent a record, field, or contact, and never send an outbound message or change a deal stage without showing me first and getting my go-ahead. Confirm the connection by reading one of my pipelines before writing anything."
works_with: ["WhatsApp", "Telegram"]
project_url: "https://www.breakcold.com"
author:
  handle: "breakcold"
  url: "https://www.breakcold.com"
  platform: web
pricing_note: "Paid CRM; hosted MCP included."
setup_minutes: 10
featured: true
sponsor: false
added_at: "2026-08-21T00:00:00Z"
updated_at: "2026-08-21T12:00:00Z"
verified_at: "2026-08-21T12:00:00Z"
status: live
---

## What it does

Breakcold is an AI-native sales CRM with a hosted MCP server (55 tools from its OpenAPI). A Grok Bot can read and write people, companies, deals, tasks and notes, move deals across the pipeline, and read multi-channel threads — email, LinkedIn, WhatsApp and Telegram — in one prompt.

## Use it in Grok Bot

Paste the prompt on this page into a Grok Bot and give it a Breakcold API key or MCP connection. The bot reads Breakcold's own documentation first, wires up the integration, and from then on you drive Breakcold in plain language — it follows the docs and checks with you before anything that writes or spends.
