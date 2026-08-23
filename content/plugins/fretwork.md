---
type: plugin
name: "Fretwork"
slug: fretwork
tagline: "Local-first freelance management - time, invoices, expenses, CRM - for your Grok Bot."
category: finance-ops
subcategory: invoicing
install_steps:
  - "Make sure you're on a Grok Bot plan that supports plugins / MCP connectors, and that Node.js is available on your bot's computer - Fretwork runs locally as an MCP server, with no account and no cloud."
  - "Paste Fretwork's one-line install into your Grok Bot. It reads the AGENT.md from github.com/ryanlanciaux/fretwork.ai, runs npm install, creates a local SQLite database, and connects Fretwork as an MCP server."
  - "Paste the prompt below so time tracking, invoicing, expenses and light CRM become a standing capability you drive in plain language."
prompt: "You now have Fretwork connected as an MCP server - a local-first freelance management system (time tracking, invoicing, expenses, and light CRM) stored in a local SQLite file on this computer, with no external accounts. Read what Fretwork exposes so you understand its ~58 operations, then let me run my freelance business in plain language: log time ('log 4.5 hours for Acme on the redesign'), create and render invoices (with PDF), record expenses and payments, set up recurring invoices (weekly, monthly, quarterly, yearly), keep dated CRM notes and follow-ups, and pull financial reports by client and status. Rules: Fretwork is my source of truth for billing, so NEVER invent a client, an invoice, an amount, or hours it didn't return; always show me the exact figures before you create or send an invoice or record a payment, and get my explicit confirmation for anything that bills a client or moves money. When I ask for my numbers, read them from Fretwork rather than estimating. Confirm the connection by listing my clients and any open invoices."
works_with: []
project_url: https://fretwork.ai
repo_url: https://github.com/ryanlanciaux/fretwork.ai
founder:
  name: "Ryan Lanciaux"
  x_handle: "ryanlanciaux"
author:
  handle: ryanlanciaux
  url: https://x.com/ryanlanciaux
  platform: x
pricing_note: "Free and open source; runs locally, no account or cloud."
setup_minutes: 10
featured: false
sponsor: false
added_at: "2026-08-23T16:50:00Z"
updated_at: "2026-08-23T16:50:00Z"
verified_at: "2026-08-23T16:50:00Z"
status: live
---

## What it does

Fretwork is an open-source, **local-first freelance management system** that lives inside your AI agent instead of a separate app. It handles time tracking, invoicing (with PDF rendering), expenses, payments, recurring invoices, a lightweight CRM with dated notes and follow-ups, and financial reporting by client and status - around 58 operations in all. Every operation works both as an MCP tool your Grok Bot can call and as a CLI command, and all of your data stays in a single SQLite file on your own machine: no accounts, no cloud, no telemetry.

## Use it in Grok Bot

Fretwork installs with a single line pasted into your Bot: it reads the project's AGENT.md from GitHub, runs `npm install`, spins up a local SQLite database, and connects as an MCP server. From then on you run your freelance back office in plain language - "log 4.5 hours for Acme", "create this month's invoice", "show me overdue invoices" - and because Fretwork is the source of truth for your billing, the prompt on this page makes the Bot show you exact figures and confirm before it ever sends an invoice or records a payment.
