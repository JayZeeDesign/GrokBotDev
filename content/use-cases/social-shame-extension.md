---
type: use-case
name: Shame · Focus Enforcer
slug: social-shame-extension
tagline: Chrome extension that bricks X/LinkedIn until a shame video
headline: "Chrome extension that bricks X/LinkedIn until a shame video"
summary: "Alex Lieberman (businessbarista) one-shotted a Chrome extension with Grok Bot: when he hits X or LinkedIn, it bricks the screen until he records himself saying “I’m being a bad, bad boy.” Best Grok Bot use case he had, with video."
categories: [fun]
format: use-case
awesome_score: 74
category: fun
subcategory: creative
bot_name: Shame
what_it_does: "Alex Lieberman (businessbarista) one-shotted a Chrome extension with Grok Bot: when he hits X or LinkedIn, it bricks the screen until he records himself saying “I’m being a bad, bad boy.” Best Grok Bot use case he had, with video."
integrations:
- X
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/businessbarista/status/2090493546730074582
  author_handle: businessbarista
  excerpt: "Alex Lieberman (businessbarista) one-shotted a Chrome extension with Grok Bot: when he hits X or LinkedIn, it bricks the screen until he records himself saying “I’m being a bad, bad boy.” Best Grok Bot use case he had, with video."
author:
  handle: businessbarista
  url: https://x.com/businessbarista
  platform: x
replicability: "Reconstructed from @businessbarista's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Shame** and connect X.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: focus enforcer.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can work the way Alex Lieberman (businessbarista) one-shotted a Chrome extension with Grok Bot: when he hits X or LinkedIn, it bricks the screen until he rec
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Build me a local Chrome extension that interrupts procrastination on X and LinkedIn.

Mission: When I open x.com or linkedin.com, overlay a full-screen brick. Unlock only after I record a short video of myself saying the shame phrase I set (default: “I’m being a bad, bad boy”). One-shot the extension; I load it unpacked.

Tools: This computer, Chrome, the extension folder. No store publish unless I ask.

What good looks like:
- Works on X and LinkedIn only. Other sites untouched.
- Overlay cannot be dismissed with Esc. Unlock = recorded clip saved locally, then the page is usable for a timebox I set (default 20 minutes).
- README: how to load unpacked, how to change the phrase, how to add a site.

Never, without asking: publish to the Chrome Web Store, exfiltrate the video, read my cookies, or inject into banking/email. Never phone-home.

Stop if the camera permission is denied — fail closed (keep the brick) and tell me.
```

## Why it's cool

Alex Lieberman (businessbarista) one-shotted a Chrome extension with Grok Bot: when he hits X or LinkedIn, it bricks the screen until he records himself saying “I’m being a bad, bad boy.” Best Grok Bot use case he had, with video.
