---
type: plugin
name: "Revid.ai"
slug: revid-ai
tagline: "Let your agent script, render and publish AI videos."
category: marketing
subcategory: content
install_steps:
  - "Create a Revid.ai account at revid.ai and add the credits you will need for rendering."
  - "Get your API key or connect the MCP server from your Revid.ai dashboard — see the linked docs for the exact place."
  - "Paste the prompt below into your Grok Bot and give it your Revid.ai key so video creation becomes a standing capability."
prompt: "You are setting up a Revid.ai integration for me inside Grok Bot. First, read Revid.ai's documentation at https://www.revid.ai/docs (and its MCP guide at https://www.revid.ai/mcp) so you understand its hosted MCP server (endpoint https://www.revid.ai/api/mcp, Bearer API-key or OAuth auth) and the tools it exposes — rendering a video from a script, prompt, link or file, checking project status, generating media, cloning a voice, calculating the credit cost, exporting, and scheduling or publishing. Then connect to my Revid.ai account so that when I describe a video I want, you render it through Revid.ai with the right script, voice-over, captions and music, tell me the credit cost first, and once I approve, publish or schedule it. Rules: follow the documentation exactly, never invent a tool, workflow, or parameter Revid.ai does not list, and always show me the credit cost and the finished video before anything renders or publishes. Confirm the connection first by listing my projects."
works_with: []
project_url: "https://www.revid.ai"
x_handle: "revid_ai"
founder:
  name: "Tibo"
  x_handle: "tibo_maker"
author:
  handle: "revid-ai"
  url: "https://www.revid.ai"
  platform: web
pricing_note: "Credit-based; free tier to start."
setup_minutes: 10
featured: true
sponsor: false
added_at: "2026-08-21T00:00:00Z"
updated_at: "2026-08-21T12:00:00Z"
verified_at: "2026-08-21T12:00:00Z"
status: live
---

## What it does

Revid.ai is an AI video platform with a hosted MCP server and public API built for agents. From one script, prompt, link or file it handles visuals, voice-over, captions and music — so a Grok Bot can render a finished short video, check its status, clone a voice, and schedule or publish it, all in one flow.

## Use it in Grok Bot

Paste the prompt on this page into a Grok Bot and give it a Revid.ai API key or MCP connection. The bot reads Revid.ai's own documentation first, wires up the integration, then you make videos in plain language — it tells you the credit cost and shows you the result before it renders or publishes.
