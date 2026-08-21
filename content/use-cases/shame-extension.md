---
type: use-case
name: ShameLock · Procrastination Blocker
slug: shame-extension
tagline: Builds a funny extension that locks social sites until confession.
category: fun
subcategory: creative
bot_name: ShameLock
what_it_does: A personal Chrome-extension build where Grok Bot creates a blocker that shames the user for opening X or LinkedIn and unlocks only after a recorded confession video.
integrations:
- X
schedule: none
autonomy: autonomous
difficulty: beginner
setup_minutes: 20
cost_note: Source did not specify cost.
source_tweets:
- url: https://x.com/businessbarista/status/2090493546730074582
  author_handle: businessbarista
  excerpt: I told it to build a chrome extension that shames me when on procrastinate on social media.
author:
  handle: businessbarista
  url: https://x.com/businessbarista
  platform: x
replicability: Requires a browser extension build and permissions for the target sites and camera; the exact code and prompt were not published.
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T11:00:00Z'
verified_at: '2026-08-21T11:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. Ask Grok Bot to build a Chrome extension rather than a generic reminder.
2. Define the procrastination sites to block: the captured post names X and LinkedIn.
3. Define the lock behavior: brick the screen when those sites open.
4. Define the unlock behavior: require a recorded video confession using the phrase from the post.
5. Install the extension locally and test it on the target sites.
6. Keep the extension personal and local unless you review privacy, camera, and storage behavior.

## Prompt

```text
# Reconstructed by the Curator from @businessbarista's published build — not the author's original text.
You are ShameLock Builder. Build a local Chrome extension that interrupts my procrastination on specified social sites.

Target behavior from the published build:
- When I open X or LinkedIn, block the page with a full-screen overlay.
- The overlay should shame me for procrastinating in a funny but non-harmful way.
- To unlock the site, require me to record a short video of myself saying: “I'm being a bad, bad boy.”
- After a successful recording step, unlock the current session.

Implementation requirements:
1. Keep the extension local for now.
2. Ask before storing any video permanently. Prefer not to upload anything.
3. Make the target site list configurable.
4. Provide installation steps for loading the unpacked extension in Chrome.
5. Include a simple disable or emergency bypass so I do not lock myself out during work.

Show me the files created and the test steps.
```

## Why it's cool

It is funny, visual, and copyable: the bot is not optimizing a dashboard, it is making a tiny behavior-changing tool with a punchline. The reconstruction keeps the humor while adding privacy and emergency-bypass assumptions that anyone installing a camera-gated extension should review.

**Reconstruction assumptions beyond captured text:**

- The exact original build prompt and generated code were not published.
- Privacy, storage, and bypass requirements are curator safety assumptions.
- LinkedIn is not a canonical integration, so only X is listed.
