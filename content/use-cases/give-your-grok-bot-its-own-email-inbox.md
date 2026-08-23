---
type: use-case
slug: give-your-grok-bot-its-own-email-inbox
headline: "One prompt that gives your Grok Bot its own email inbox and identity"
summary: "Adi Singh's AgentMail guide, turned into a single prompt you paste into your Grok Bot. The bot explains why it shouldn't use your personal Gmail, walks you step by step through installing the AgentMail plugin and tells you exactly what to do on your end, then creates its own inbox and proves it works by emailing you."
category: work
subcategory: email
categories: [work, support, sales]
format: guide
bot_name: "Mailbot"
what_it_does: "A paste-in prompt that turns your Grok Bot into its own setup guide: it explains why a bot shouldn't use your personal Gmail, walks you through installing the AgentMail plugin (telling you what to do at each manual step), then creates its own inbox and proves it works by emailing you."
integrations: []
schedule: adhoc
autonomy: acts-with-approval
difficulty: beginner
setup_minutes: 10
source_tweets:
  - url: https://x.com/adisingh/status/2091295851943780737
    author_handle: adisingh
    excerpt: "Grok Bot ships with a Gmail plugin, but that plugin points at your inbox. A separate inbox keeps that access contained."
    posted_at: "2026-08-22T22:46:00.000Z"
  - url: https://x.com/agentmail/status/2091298099859955814
    author_handle: agentmail
    excerpt: "We just published a step-by-step guide on how to give your Grok Bot its own email address. AgentMail is a native plugin on Cursor/Grok so it takes two clicks to get up and running!"
    posted_at: "2026-08-22T22:54:56.000Z"
primary_source:
  kind: x-post
  url: https://x.com/adisingh/status/2091295851943780737
author:
  handle: adisingh
  url: https://x.com/adisingh
  platform: x
replicability: "Works with any Grok Bot plan that supports plugins (Cursor Ultra, SuperGrok Heavy, or Cursor Premium Teams) plus a free AgentMail account. The prompt walks you through each manual step and pauses; all you provide is the OAuth approval and your real email for the test."
prompt_provenance: curator
awesome_score: 88
score_breakdown:
  reproducibility: 23
  ambition: 17
  concreteness: 18
  novelty: 13
  evidence: 9
  craft: 8
featured: true
added_at: "2026-08-23T12:05:00Z"
updated_at: "2026-08-23T12:05:00Z"
verified_at: "2026-08-23T12:05:00Z"
status: live
---

## How it's set up

The idea, from AgentMail co-founder **Adi Singh**'s guide: your Grok Bot shouldn't run on your personal Gmail. That plugin points at *your* inbox, so any bot can read your private mail and 2FA codes and send as you - and one malformed email could prompt-inject it. Give the bot its own AgentMail inbox and that access stays contained.

This use case packages his step-by-step into a single prompt. Paste it into a fresh bot and the bot becomes your setup guide - it explains the why, tells you exactly what to do on your end at each step, and pauses until you've done it:

1. Confirm you're on a plugin-capable Grok Bot plan (Cursor Ultra, SuperGrok Heavy, or Cursor Premium Teams) and create a free account at **agentmail.to**.
2. Open **Settings -> Plugins**, search for **AgentMail**, and click **Install**.
3. Approve the **OAuth** prompt in your browser (it reads "Cursor wants to access AgentMail..." - that's expected). No API key to paste.
4. Confirm the connector card shows AgentMail's tools, then let the bot take over: it creates its own inbox, tells you the address, and sends you a test email to prove the loop works end to end.

## Prompt

```text
I want you to have your own email inbox and internet identity, completely separate from my personal email. We'll use AgentMail, which has a native Grok Bot plugin. Walk me through the whole setup one step at a time, and wait for me to confirm each step before moving on.

First, explain briefly why this matters: my built-in Gmail plugin points at MY inbox, so any bot using it can read my private mail and my password/2FA codes and send email as me - and a single malicious email could prompt-inject you. Your own AgentMail inbox keeps all of that contained.

Then guide me through what I need to do on my end, pausing after each step until I confirm:
1. Confirm I'm on a Grok Bot plan that supports plugins (Cursor Ultra, SuperGrok Heavy, or Cursor Premium Teams). If I'm not, tell me and stop here.
2. Have me create a free account at agentmail.to (the free tier is enough).
3. Have me open Settings -> Plugins, search for "AgentMail", and click Install.
4. Tell me to approve the OAuth prompt in my browser (it will say "Cursor wants to access AgentMail..." - that's expected). There is no API key to paste. Have me confirm your AgentMail tools now show on the connector card before you continue.

Once the plugin is connected, take over: create yourself a dedicated inbox (pick a clear name and tell me the exact address), then prove it works - send a short test email to me at [YOUR EMAIL], ask me to reply from my normal inbox, and read my reply back to me in the same thread.

From then on this inbox is YOURS: use it to sign yourself up for services (read the verification code from your own inbox and finish signup), run outreach and reply threads from your own address, own a support inbox, and join any thread I CC you on. Safety rules that never change: before you send any email, show me the exact recipient(s), subject, and full body and wait for my explicit approval; never send in bulk without me confirming the whole list first; never invent an address or contact AgentMail didn't return; and never touch my personal inbox.
```

## What your bot can do next

Once it owns an inbox, four things open up that the built-in Gmail plugin can't do:

- **Sign itself up for accounts.** Notion, Stripe, Vercel, GitHub - the verification code lands in the bot's inbox, it reads it and finishes signup. Nothing runs under your Google identity.
- **Run an outreach loop.** It sends from its own address, tracks each thread, and drafts personalized replies (held for your approval), so your personal inbox stays clean and deliverability doesn't compete with your mail.
- **Own a support inbox.** help-desk@yourdomain belongs to the bot: it handles first-line replies and forwards the rest to a human.
- **Sit in a group thread.** CC the bot on any thread and it reads the history and participates like a colleague, replying inside the thread.

## Why it's cool

Most "connect email to your AI" setups just point the bot at your own Gmail - which quietly hands it your private mail, your login codes, and your outgoing identity. This flips that: one paste turns the bot into its own onboarding guide, and the payoff is a real internet identity for the agent - its own address that can sign up for services, run its own threads, and keep its own memory - without ever touching yours. The prompt keeps it safe by design: it pauses for every manual step so you stay in control of the install, and it requires your explicit approval on the exact recipient, subject, and body before any email ever leaves.
