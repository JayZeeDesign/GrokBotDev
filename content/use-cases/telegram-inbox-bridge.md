---
type: use-case
name: Bridge · Telegram Front Door
slug: telegram-inbox-bridge
tagline: Reach your Grok Bot from Telegram, webhooks and all.
headline: "Run your whole bot fleet from a Telegram thread"
summary: "Sets up an inbound Telegram bridge so you can talk to your Grok Bot from anywhere, the way an OpenClaw Telegram webhook works — using your own BotFather bot, with every real-world failure (tunnels, webhook 409s, typing timeouts) already solved inside the prompt."
categories: [engineering]
format: use-case
awesome_score: 87
score_breakdown:
  reproducibility: 25
  ambition: 12
  concreteness: 20
  novelty: 12
  evidence: 9
  craft: 9
category: engineering
subcategory: agents-ops
bot_name: Bridge
what_it_does: Sets up an inbound Telegram bridge so you can talk to your Grok Bot from anywhere, the way an OpenClaw Telegram webhook works — using your own BotFather bot, with every real-world failure (tunnels, webhook 409s, typing timeouts) already solved inside the prompt.
integrations:
- Telegram
schedule: adhoc
autonomy: acts-with-approval
difficulty: advanced
setup_minutes: 60
source_tweets: []
primary_source:
  kind: youtube-video
  url: https://youtu.be/5CSXUsljJ_E
  title: 11 INSANE Use Cases for Grok Bot
  channel: Matthew Berman
  timestamp: "19:50"
replicability: "Reconstructed from Matthew Berman's \"11 INSANE Use Cases for Grok Bot\" walkthrough. Adapt the connected accounts and context to your own stack; the prompt is the author’s own published text."
prompt_provenance: author
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
---

## How it's set up

1. Create your own Telegram bot through BotFather and keep the token private.
2. Paste the reconstructed prompt below — it is the most operationally specific of the three, and it names the fixes for the failures you will hit.
3. Follow its guidance to run inbound as a **cron** routine draining a spool rather than a webhook routine (the agent cannot see the URL or sender key, and opening a webhook front can crash the UI).
4. Let it handle the known gotchas it documents: the Cloudflare quick-tunnel resolve failure and smee.io relay, the getUpdates 409 after setWebhook, and the ~5s sendChatAction typing expiry that needs a ~4s refresh loop.
5. Never print the bot token, webhook secret, or public webhook URL in chat.

## Prompt

```text
Set up Telegram inbound for this Grok Bot the way an OpenClaw Telegram webhook works. I am not on anyone else’s team. Use my own BotFather bot. Do not print the bot token, webhook secret, or public webhook URL in chat.

Context you should assume:
- Grok Bot has no native Telegram channel. Slack is the native one. Do not wait for a built-in Telegram integration.
- A Grok Bot “webhook” routine is the wrong public front. The agent cannot see the public URL or sender key, and opening that routine can crash the UI (trigger has no platform). Do not create a Grok Bot webhook routine for this.
- OpenClaw’s working pattern: local HTTP listener on 127.0.0.1:8787, path /telegram-webhook, health /healthz, required secret, validate X-Telegram-Bot-Api-Secret-Token with a constant-time compare, persist the update, then 200. Process async. Register with Telegram setWebhook(publicHttpsUrl, { secret_token }). No secret means refuse to start.
- Telegram setWebhook needs public HTTPS. A Cloudflare quick tunnel (*.trycloudflare.com) often fails Telegram’s checker with “Failed to resolve host” even when the tunnel works locally. If that happens, put a public HTTPS relay in front (smee.io works: Telegram POSTs to smee, smee-client forwards to http://127.0.0.1:8787/telegram-webhook including the secret header).
- Once setWebhook is active, getUpdates 409s. Never poll getUpdates in webhook mode.
- Telegram sendChatAction typing lasts about 5 seconds. One shot is not enough. Keep refreshing every ~4s until the inbound update is processed and the reply is sent.

Do this, in order:

1. Ask me for a BotFather token if you do not already have one. Store it in a 0600 file on your computer, e.g. ~/.local/telegram-mcp/token. Prefer a secret-request / credential field over having me paste it in chat. Optional env TELEGRAM_BOT_TOKEN is fine as a fallback.

2. Build a small stdio MCP server on your computer (official @modelcontextprotocol/sdk + Zod, Node). Hand-rolled Python MCP that is not NDJSON/Content-Length compatible will time out when Grok Bot hosts it. Register it as a custom connector. Tools to expose:
   - tg_get_me
   - tg_send_message (chat_id, text)
   - tg_send_chat_action (chat_id, action default typing)
   - tg_list_spool / tg_ack_spool (optional if you also read spool files directly)
   - tg_webhook_info (getWebhookInfo + local /healthz; never return secrets)
   - tg_get_updates only for first-time setup before the webhook is set
   Token is read from the token file. Never log or print it.

3. Call tg_get_me and tell me the bot @username so I can open it. I will send /start. Capture my numeric chat id from that first DM and remember it. Only send to chats I have already messaged, unless I name a chat.

4. Write the OpenClaw-shaped listener (Node is fine, no extra framework required):
   - bind 127.0.0.1:8787
   - GET /healthz → 200 ok
   - POST /telegram-webhook only
   - require a non-empty webhook secret in a 0600 file; mint one with openssl rand -hex 32 if missing
   - reject missing/wrong X-Telegram-Bot-Api-Secret-Token with 401
   - body limit ~1MB
   - atomically write each update to ~/.local/telegram-mcp/spool/<update_id>.json before 200 (idempotent if the file exists)
   - respond 200 quickly after it is durable
   - if the update is from my chat id, start sendChatAction typing immediately, then refresh every 4s until that spool file is gone or 2 minutes pass
   Do not put the secret or token in logs.

5. Get a public HTTPS URL Telegram can resolve. Try a tunnel if you want; if setWebhook returns “Failed to resolve host”, switch to a smee.io (or similar) relay into the local listener. Save the public URL in a 0600 file. Then setWebhook with secret_token and allowed_updates including message. Confirm getWebhookInfo shows a URL and no last_error_message.

6. Add a supervisor that keeps the listener, the public relay/tunnel, and setWebhook healthy. If you restart the listener to pick up code changes, actually kill the old PID. A supervisor that “starts only if pid is dead” will leave stale code serving, and typing keepalive will look broken.

7. Create a Grok Bot scheduled routine (cron), not a webhook routine, that drains the spool. Cadence: every minute during my waking hours in my timezone (default 7:00–23:59 local, all week if this is a personal bot). Prompt the routine to:
   - look up the Telegram connector
   - check /healthz and restart the supervisor if it is down
   - read ~/.local/telegram-mcp/spool/*.json (not spool/done)
   - stay completely silent in the Grok Bot chat if there is nothing new
   - only handle my chat id
   - refresh typing, do the work, reply with tg_send_message as this agent
   - move processed files to spool/done
   - never print token, secret, or public URL
   - never call tg_get_updates while the webhook is set
   Stay quiet in Grok Bot after a normal Telegram reply unless blocked.

8. Set connector custom instructions to match that inbound path.

9. Prove it: send me a short Telegram message asking me to reply, process that reply via webhook → spool → routine, and reply in Telegram. Then tell me in Grok Bot chat that it is live, including the bot @username. Mention the one caveat: this is not instant like OpenClaw’s own gateway; the drain is about once a minute, but typing should hold from the moment the DM lands until the reply.

If something fails, fix that path. Do not fall back to a 2-minute getUpdates poller unless webhook registration is truly impossible, and say so plainly if you do.
```

## Why it's cool

This is the one that makes a fleet of single-purpose bots usable from your phone — one front door, reachable anywhere. It ships as the author-published prompt and confirms his on-video claim that every failure he hit is solved inside it, which is exactly the kind of hard-won detail that saves you an afternoon.
