---
type: use-case
name: Roomba · Vacuum Controller
slug: robot-vacuum-from-chat
tagline: Text your robot vacuum from Grok Bot
headline: "One bot built the bridge to my robot vacuum"
summary: "Yun-Ta Tsai had his 'Chief Engineer' bot build a feature so he can text his Matic robot vacuum from Grok Bot. Video/thread. 2.7K likes / 1.8M views."
categories: [personal]
format: use-case
awesome_score: 68
score_breakdown:
  reproducibility: 13
  ambition: 11
  concreteness: 16
  novelty: 12
  evidence: 9
  craft: 7
category: personal
subcategory: home
bot_name: Roomba
what_it_does: "Yun-Ta Tsai had his 'Chief Engineer' bot build a feature so he can text his Matic robot vacuum from Grok Bot. Video/thread. 2.7K likes / 1.8M views."
integrations:
- Google Drive
schedule: adhoc
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets:
- url: https://x.com/yunta_tsai/status/2089223114416898288
  author_handle: yunta_tsai
  excerpt: "Yun-Ta Tsai had his 'Chief Engineer' bot build a feature so he can text his Matic robot vacuum from Grok Bot."
author:
  handle: yunta_tsai
  url: https://x.com/yunta_tsai
  platform: x
replicability: "Reconstructed from @yunta_tsai's published Grok Bot build. Adapt the connected accounts and context to your own stack — the prompt is a Curator reconstruction, not the author's original text."
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
prompt_provenance: curator
---

## How it's set up

1. In Grok Bot, create a bot named **Roomba** and connect Google Drive.
2. Paste the reconstructed prompt below in as its standing instructions, then tell it the one job: vacuum controller.
3. Give it the context it needs — the accounts, files, and rules specific to your setup — so it can hold the job the way the original build did.
4. Run it on demand; it acts once you approve each step.
5. Watch the first few runs, correct anything off, then let it hold the job. Adapt the connected tools to match your own stack.

## Prompt

```text
Role: Chief Engineer for home devices.

Goal: I should be able to message you (‘clean the kitchen’, ‘go dock’, ‘status’) and you send the right command to my Matic robot vacuum’s existing app or API.

Work: Explore the Matic app and any public API/docs. Implement the smallest bridge (script, shortcut, or authenticated session). Test with a status read before any move command. Confirm rooms/zones match what the robot actually has.

Commands I will use: status, clean <room>, go dock, stop.

Never drive the robot unless I confirm the first live run. Never share credentials. Never stream the camera. Log every command (time, intent, API call, result). If the robot is already running or the battery is low, say so and wait.
```

## Why it's cool

One bot building a feature for another bot to use is the layer worth noticing: a 'Chief Engineer' agent wired up texting access to a Matic vacuum's existing app, rather than Yun-Ta wiring it up by hand. Letting an agent extend your own toolset, not just operate it, is a different level of delegation than most of these use cases show.
