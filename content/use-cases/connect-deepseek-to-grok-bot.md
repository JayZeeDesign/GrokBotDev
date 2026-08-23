---
type: use-case
slug: connect-deepseek-to-grok-bot
headline: "Connect DeepSeek (or any LLM) to your Grok Bot and route work by cost"
summary: "Thomas Heimann's copy-paste directive registers DeepSeek V4 Flash as a callable tool on your Chief of Staff bot (OpenAI-compatible, key stored securely), then gives the bot a routing policy: send ops, API/browser, tool-use and bulk work to the cheap fast model, and reserve native Grok for deep reasoning."
category: engineering
subcategory: agents-ops
categories: [engineering, work]
format: use-case
bot_name: "Chief of Staff"
what_it_does: "A verbatim directive you paste into your orchestrator bot. It registers DeepSeek V4 Flash as a call_deepseek_v4_flash tool (OpenAI-compatible, key stored securely), then sets routing rules so mechanical work goes to the cheap fast model and native Grok is saved for deep reasoning."
integrations: []
schedule: none
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 10
source_tweets:
  - url: https://x.com/thomasheimann/status/2090435932520329252
    author_handle: thomasheimann
    excerpt: "How to connect Deepseek (or other LLMs) to Grok Bot. Directive - copy and paste this entire block into your Chief of Staff / Orchestrator bot."
    posted_at: "2026-08-20T13:48:59.000Z"
author:
  handle: thomasheimann
  url: https://x.com/thomasheimann
  platform: x
prompt_provenance: author
replicability: "Thomas Heimann's exact directive (below), verbatim. You provide a DeepSeek API key - or swap in any OpenAI-compatible model and endpoint; the bot stores it securely and only asks when ready. 'HighLevel' is just the author's example bot name - sub in any of yours."
awesome_score: 82
score_breakdown:
  reproducibility: 22
  ambition: 17
  concreteness: 18
  novelty: 13
  evidence: 4
  craft: 8
featured: false
added_at: "2026-08-23T12:15:00Z"
updated_at: "2026-08-23T12:15:00Z"
verified_at: "2026-08-23T12:15:00Z"
status: live
---

## How it's set up

Grok Bot's native model is powerful but it's also the expensive pool. Most agent work - CRM ops, API calls, browser actions, bulk extraction and classification - doesn't need that reasoning depth. This directive makes your orchestrator bot register a cheap, fast model (DeepSeek V4 Flash) as a permanent tool and then route work to it intelligently.

1. Get a **DeepSeek API key** - or pick any OpenAI-compatible model and endpoint you'd rather route to.
2. Paste the directive below into your **Chief of Staff / Orchestrator bot**.
3. When the bot asks, hand it the key. It stores it securely (environment variable or protected secrets file), **never hard-coded or logged**.
4. From then on the bot **auto-routes**: mechanical ops / tool-use / bulk work goes to the cheap fast model, while native Grok is reserved for deep reasoning - and anything customer-facing or compliance-sensitive still comes back to you for approval.

## Prompt

```text
Command for Chief of Staff / Orchestrator Bot:
Please execute the following setup completely and confirm when finished.

1. Add DeepSeek V4 Flash as a permanent tool/model
Register DeepSeek V4 Flash (model ID: deepseek-v4-flash or the exact current official ID) as a callable external model/tool.
Endpoint: https://api.deepseek.com/v1 (OpenAI-compatible).
Ask me for the API key only when you are ready to store it securely (environment variable or protected secrets file on the cloud computer - never hard-code or log it).
Create a clean, reusable tool named call_deepseek_v4_flash that:
- Accepts system prompt + user message (or conversation context).
- Calls the model with sensible defaults for speed and tool-use (temperature ~0.2-0.5, adequate max tokens).
- Returns the full response cleanly so you (and other bots) can use it.
Make this tool permanently available to all bots, especially you.

2. Your new decision rules for when to use DeepSeek V4 Flash
DeepSeek V4 Flash is a very capable, fast, and extremely cost-efficient model that is excellent at tool use, API work, browser actions, and high-volume accurate processing. It is not as strong on pure deep reasoning or high-stakes judgment as native Grok (or future stronger models such as Kimi K3).
Always prefer DeepSeek V4 Flash for these job classes:
- HighLevel ops / API calls / browser work / tool-heavy execution
- Bulk extraction, classification, data processing, and high-volume accurate tasks
- Any fast tool-using or operational work where speed and cost matter more than maximum reasoning depth
Reserve native Grok (or stronger models later) for:
- True high-level strategic reasoning, complex judgment calls, prioritization of major initiatives, nuanced synthesis, and situations where reasoning strength is the primary requirement
- Final customer-facing or compliance-sensitive drafts that need the strongest available model + my approval
Your required decision process:
- Classify the task.
- If it is HighLevel ops, API/browser/tool work, bulk extraction, or classification -> call DeepSeek V4 Flash first.
- If it is deep strategic/judgment work -> use native Grok (or escalate to me).
- You may call DeepSeek in parallel or as a first pass even on borderline tasks if it can handle the mechanical parts efficiently.
- If DeepSeek underperforms twice on the same class of task, note it and escalate one tier.
- Always keep a brief internal log of when and why you chose DeepSeek so we can refine the rules.

3. Make the change permanent
Update your own profile, system instructions, and any relevant routines so these routing rules are always active.
Create a short skill/routine called /deepseek that forces a DeepSeek V4 Flash consultation on the current task.
Ensure other bots know to route HighLevel ops / bulk work through you (or directly to the new tool) rather than burning the native Grok pool.

4. Test and confirm
When the setup is complete, reply with:
- Confirmation that the DeepSeek V4 Flash tool is live and the key is stored securely.
- The exact decision rules you will now follow (copy them back to me).
- A short live example: take a sample HighLevel ops or bulk-extraction task and show the flow of you calling DeepSeek V4 Flash.
- Any remaining steps I need to take (e.g., providing the API key).

Execute this now. Ask me for the DeepSeek API key only when you are ready to store it securely.
```

## Why it's cool

Everyone runs their whole agent fleet on the native model and then watches the usage pool drain. This flips it: the orchestrator becomes a cost-aware router that offloads the high-volume mechanical work - CRM ops, API and browser calls, bulk extraction - to a cheap, fast model, and keeps expensive native reasoning for the calls that actually need it. The routing isn't vibes: the prompt hands the bot a concrete task-classification process, a rule to escalate a tier if the cheap model underperforms twice, and a log so you can refine the policy over time. It's also security-conscious by construction - the API key is requested only when it can be stored safely, and never hard-coded or logged. Swap DeepSeek for any OpenAI-compatible model and the same pattern gives you a multi-model bot that spends where it matters.
