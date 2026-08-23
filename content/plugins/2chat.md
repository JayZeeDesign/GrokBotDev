---
type: plugin
name: "2Chat"
slug: 2chat
tagline: "Give your Grok Bot a WhatsApp + SMS phone system for messaging and contacts."
category: support
subcategory: replies
install_steps:
  - "Create a 2Chat account at 2chat.co and connect the WhatsApp number(s) you want your agent to use (no WhatsApp Business API required)."
  - "In your Grok Bot's connector / MCP settings, add a custom connector at https://mcp.2chat.io/mcp (Streamable HTTP). A browser opens to sign in - 2Chat uses OAuth 2.1, so there is no API key to paste."
  - "Paste the prompt below into your Grok Bot so sending WhatsApp/SMS, running templates, and managing contacts become a standing capability."
prompt: "You are setting up a 2Chat integration for me inside Grok Bot. Connect to 2Chat's hosted MCP server at https://mcp.2chat.io/mcp (Streamable HTTP, OAuth 2.1 - a browser window will open for me to sign in; there is no API key). Read what 2Chat exposes so you understand it: it is an AI-native phone system with WhatsApp and SMS, so you can list my connected WhatsApp channels, send WhatsApp and SMS messages, send WhatsApp Business template messages, and look up or manage contacts. Then let me drive it in plain language: 'message this contact on WhatsApp', 'send the <template> to these numbers', 'who did we last talk to'. Rules: follow 2Chat's docs exactly and NEVER invent a contact, a channel, a template, or a phone number it doesn't return. Sending a WhatsApp or SMS message is an IRREVERSIBLE action that reaches a real person - always show me the exact recipient(s) and the exact message and get my explicit approval before you send anything, and never send to a list in bulk without me confirming the full set of recipients first. Confirm the connection by listing my connected 2Chat WhatsApp channels."
works_with: []
project_url: https://2chat.co
x_handle: "2chat_"
founder:
  name: "Carlos Ruiz-Díaz"
  x_handle: "caruizdiaz"
author:
  handle: 2chat
  url: https://2chat.co
  platform: web
source_url: https://developers.2chat.co/docs/MCP/setup
pricing_note: "Free trial; paid plans - see 2chat.co/pricing."
setup_minutes: 10
featured: true
sponsor: false
added_at: "2026-08-22T20:30:00Z"
updated_at: "2026-08-22T20:30:00Z"
verified_at: "2026-08-22T20:30:00Z"
status: live
---

## What it does

2Chat is an AI-native phone system with WhatsApp and SMS, built so teams can run sales, marketing and customer support on their existing numbers - no WhatsApp Business API required. Its hosted MCP server lets a Grok Bot list your connected WhatsApp channels, send WhatsApp and SMS messages, run WhatsApp Business templates, and look up or manage contacts, all in plain language.

## Use it in Grok Bot

Connect your Bot to 2Chat's MCP server at https://mcp.2chat.io/mcp (OAuth sign-in, no API key), then paste the prompt on this page. From then on you can tell your Bot to message a contact, send a template to a list, or check who you last spoke to - and because a WhatsApp or SMS message reaches a real person, the Bot always shows you the exact recipients and message and waits for your go-ahead before it sends.
