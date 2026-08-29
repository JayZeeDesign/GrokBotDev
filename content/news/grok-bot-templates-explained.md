---
type: news
slug: grok-bot-templates-explained
title: "Everything you need to know about Grok Bot templates"
summary: "A Grok Bot template is a shareable blueprint for a Bot. Open one link and Grok Bot creates a new copy with the original role, skills, routines, and supported integrations. Your chats, logins, and secrets stay private."
kind: announcement
important: true
published_at: "2026-08-29T02:00:00Z"
updated_at: "2026-08-29T02:00:00Z"
status: live
---
Grok Bot has a new Templates feature.

Sharing a good Bot used to be awkward. A long prompt looks ugly on X. A screenshot leaves out the setup. And the next person still has to rebuild the Bot.

That is one reason grokbot.dev exists: to collect useful Grok Bot setups and make them easier to try.

Templates make the handoff much cleaner. You send one link. The other person reviews it and adds a new copy to Grok Bot.

## What is a Bot template?

A template creates a separate Bot in the recipient's account.

They do not enter your Bot or see its old conversations. They receive a new Bot carrying the shared role, instructions, skills, routines, and supported integrations. It then connects to their accounts and builds its own memories as they use it.

Think of it like sharing a recipe. The recipient gets the instructions and ingredients list, then makes their own version in their own kitchen.

The result may differ slightly from the original. The two Bots are independent after installation.

A prompt is still a paragraph. A template can carry the job around that paragraph: the role, the schedule, which plugin to ask for, and where the Bot has to stop and wait.

## What gets shared

A template can include:

- The Bot's name, role, and description
- Its instructions and reusable context
- Skills
- Routines (as intent: Slack channels and GitHub repos become fill-ins, run history does not travel)
- Supported first-party plugins and connectors from the Cursor Marketplace (ids, not your login)
- Memories considered relevant to the workflow
- Setup instructions added by the creator
- The geometric avatar

The contents depend on the Bot. Open View details before publishing to see the context and integrations Grok Bot selected.

## What does not get shared

The recipient does not get:

- Your conversation history
- Your cloud computer, files, or browser sessions
- Your account logins
- API keys and other secrets
- Personal or private memories
- Custom scripts or code
- Custom MCP servers
- `[episode]` and `[note]` chat residue

Supported integrations may appear in the template, but the recipient still has to connect their own account. A GitHub integration tells the new Bot that GitHub is part of the setup. It does not give the recipient your GitHub login.

Custom infrastructure needs a separate handover. If the workflow depends on a private repository, script, internal tool, or MCP server, explain how to install it and what access it needs.

Daily YouTube Recap is a good example. It depends on the TranscriptAPI MCP, which is not a first-party integration in the Cursor Marketplace.

The template builder was told that transcript access was essential. It could not bundle the custom MCP, so it carried the requirement in the Bot's model card and relevant memories. The recipient's Bot can then set up TranscriptAPI or decide to use another source.

https://x.ai/bot/dug1Zq29P009fdcI5-tTC

## How to share a Bot as a template

1. Open the Bot you want to share.
2. Open its settings.
3. Select Share as template.
4. Wait for Grok Bot to prepare the template.
5. Open View details and review what is included.
6. Choose the available audience, such as public or team-only.
7. Select Publish.
8. Copy the link.

Selecting Share as template does not immediately publish anything. It prepares an unpublished version first, so you can inspect it before anyone else sees it.

You can also tell the Bot what the template must include or exclude before publishing it. For example:

```text
Include the TranscriptAPI requirement and setup instructions.
Exclude my private channel list, API keys, and internal project names.
Then show me the updated template details.
```

What I watched in practice: the Bot inventories itself out loud (memories, skills, routines, plugins), keeps the job, drops the person, and stages unpublished v1. If a card is wrong, you tell the Bot and it packs again. You cannot ninja-edit the fields yourself.

## What the recipient sees

The link opens a preview on x.ai with the Bot's name, creator, description, and an Add to Grok Bot button.

Nothing is installed when the preview opens. The recipient can review the template before adding it. They need the Grok Bot app to finish the installation.

Grok Bot then creates an independent Bot in their account. Simple templates may work immediately. More complex ones may ask them to connect a plugin, authenticate an account, clone a repository, install an MCP server, or provide a missing file.

A copied Bot should start with a setup gate. First chat checks whether setup is done. If not, it asks (which inbox, which city, which URL) and refuses to do the irreversible part. If a routine fires before a human is there, it should stay quiet.

## Make the template reusable

A template that only works for its creator is not very useful.

Do not export a year-old Bot with a novel of chat. Spawn a fresh one, teach it only the job, then Share.

Before sharing a complex Bot, ask it to prepare the handover:

```text
Prepare this Bot to be shared as a template.

List every integration, account, file, API key, MCP server, script, and other
dependency the workflow needs. Explain what cannot be included and how a new
user should add it.

Remove personal, internal, customer, and secret information. Then show me
exactly what the template will include before I publish it.
```

Do this for any Bot that depends on more than one standard integration or has a custom dependency.

Give it a setup gate, a never-touch list, and a stop before send / unsubscribe / purchase / delete. A template that can spend money or wreck an inbox without a stop is not a template.

## Do a manual privacy check

Grok Bot is designed to leave out secrets and private information. Do not rely on that filter alone.

xAI's current documentation says anyone with a public link can view the shared configuration, including its identity, description, skills, and routines. It tells creators to remove API keys, internal URLs, customer data, and anything else they would not put in a public document.

Open View details and read every section yourself before publishing.

If a memory names a person, a repo, a customer, or your city as a default, tell the Bot to pack again.

## Review templates like software

Public templates are created by third parties. Before adding one, check:

- What job the Bot claims to own
- Which instructions and context it includes
- Which skills and routines will run
- Which accounts it wants connected
- Whether it can send, publish, purchase, delete, or change production systems

Keep those sensitive actions behind human approval until the copied Bot has completed a safe test successfully.

Then, if you are the creator, ask someone else to install it without your help. Every step they have to guess belongs in the template's setup instructions.

## Three words people mix up

**Cursor marketplace plugins** are connectors (Gmail, X, AgentMail). Account-level. A template can point at them. It cannot log the recipient in.

**grokbot.dev plugins and use cases** are this directory: copy-paste prompts, writeups, the feed. Independent of xAI. A page that says "install in Grok Bot" is still a prompt until it has an x.ai/bot link.

**Grok Bot templates** are official. Preview on x.ai. Add to Grok Bot. Recipe, not meal.

## Why templates matter

A prompt gives someone instructions. A template can give them the role, skills, routines, integrations, and reusable context around those instructions.

That makes a working Bot easier to share with a team or community. A sales leader can distribute a prospecting Bot. A developer can package a code-review workflow. A creator can share the research Bot behind a repeatable content process.

A large prompt is hard to share on X and easy to copy incorrectly. A template is one clean link. The recipient reviews it, clicks Add to Grok Bot, and gets a new Bot with the reusable setup attached.

That is the connection grokbot.dev cares about. The directory helps people find useful Bot ideas. Templates make those working Bots much easier to pass around.

## Eight live templates

These were packed this week from empty chats, then published. Open the card, Add to Grok Bot. They interview you before they do anything irreversible.

- Overwatch: https://x.ai/bot/7u3XiRiTYw4GVZmuZboyP
- Newsletter Cleanup: https://x.ai/bot/dHd69sBvMG2o3lJa__T7K
- Daily YouTube Recap: https://x.ai/bot/dug1Zq29P009fdcI5-tTC
- Site Audit: https://x.ai/bot/s6JVFYDIDMsCQMBeTcznW
- Deal Hunting: https://x.ai/bot/MGiEdMz0TNxBkvMgUZAbf
- Invoice Hunter: https://x.ai/bot/-kO6HrXokJZANVwUOMZO9
- Competitor Watching: https://x.ai/bot/5PKSzU0ruN_DQbNXc7m0N
- GrokBot Awesome Use Cases: https://x.ai/bot/DTNL6V2HxpUHj3MkI-bSj
