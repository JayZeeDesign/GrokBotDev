---
type: plugin
name: "AgentMail"
slug: agentmail
tagline: "Give your Grok Bot its own email inbox and identity on the internet."
category: work
subcategory: email
install_steps:
  - "Make sure you're on a Grok Bot plan that supports plugins (Cursor Ultra, SuperGrok Heavy, or Cursor Premium Teams), then create a free account at agentmail.to - the free tier covers everything here."
  - "In Grok Bot, open Settings -> Plugins, search for AgentMail, and click Install."
  - "Approve the OAuth prompt: your browser opens AgentMail's authorization screen (it reads 'Cursor wants to access AgentMail...' because Grok Bot uses Cursor's plugin plumbing). Click Allow - there is no API key to paste."
  - "Check the connector card - 24 tools appear. Paste the prompt below so your bot creates its own inbox and email becomes a standing capability."
prompt: "You are setting up AgentMail inside Grok Bot so you have your OWN email inbox and identity, separate from my personal email. AgentMail is installed as a native plugin, so its tools are already available to you - do not ask me for an API key. First, use AgentMail to create yourself a dedicated inbox (pick a clear name like assistant or outreach) and tell me the exact address. From now on, send and receive mail only from THAT inbox, never from my personal accounts. With your own inbox you can: sign yourself up for services that email a verification code (read the code from your inbox and finish signup), run outreach and reply threads from your own address, own a support inbox, and follow multi-party threads you're CC'd on. Rules that never change: an email reaches a real person and is effectively irreversible - before you send anything, show me the exact recipient(s), subject, and full body and get my explicit approval; never send in bulk without me confirming the whole recipient list first; never invent an address, contact, or thread that AgentMail didn't return; and never use my personal inbox for any of this. Confirm setup by creating your inbox, telling me its address, and sending a short test email to me at [YOUR EMAIL]."
works_with: []
project_url: https://www.agentmail.to
x_handle: "agentmail"
founder:
  name: "Adi Singh"
  x_handle: "adisingh"
author:
  handle: "AgentMail"
  url: https://www.agentmail.to
  platform: web
source_url: https://x.com/agentmail/status/2091298099859955814
pricing_note: "Free tier covers a personal bot; paid plans scale - see agentmail.to."
setup_minutes: 5
featured: true
sponsor: false
added_at: "2026-08-23T12:00:00Z"
updated_at: "2026-08-23T12:00:00Z"
verified_at: "2026-08-23T12:00:00Z"
status: live
---

## What it does

AgentMail is the email inbox API for AI agents - it gives your Grok Bot its own inbox and internet identity, the way Gmail does for a person. Backed by Y Combinator and General Catalyst, it's built so an agent can create inboxes on demand, send and receive threaded mail (with attachments and multi-party threads), react to real-time events, and treat its own mailbox as persistent, searchable memory. On Grok Bot it installs as a native plugin in two clicks - OAuth, no API key - and exposes 24 tools your bot can drive in plain language.

Why it matters: the built-in Gmail plugin points at *your* inbox, so every bot ends up reading your private mail and 2FA codes and sending as you. A dedicated AgentMail inbox keeps that access contained - your bot gets its own address to sign up for accounts, run outreach, and own a support queue, all without touching your personal identity.

## Use it in Grok Bot

Install AgentMail from Settings -> Plugins (approve the OAuth prompt, no key to paste), then paste the prompt on this page. Your bot creates itself a dedicated inbox and, from then on, sends and receives only from that address. Because email reaches real people, the prompt makes the bot show you every recipient, subject, and body and wait for your approval before it sends - and never touch your personal inbox.
