---
type: use-case
name: Recap · Meeting Splitter
slug: meeting-summary-splitter
tagline: Turns every recorded meeting into a summary that splits the promises.
category: work
subcategory: meetings
bot_name: Recap
what_it_does: Polls your notetaker for newly recorded meetings, ingests the transcript, and writes a summary plus action items — specifically separating what you committed to from what the other party committed to you, delivered into Grok Bot, Slack, or Telegram.
integrations:
- Slack
- Telegram
schedule: hourly
autonomy: acts-with-approval
difficulty: intermediate
setup_minutes: 30
source_tweets: []
primary_source:
  kind: youtube-video
  url: https://youtu.be/5CSXUsljJ_E
  title: 11 INSANE Use Cases for Grok Bot
  channel: Matthew Berman
  timestamp: "13:50"
replicability: "Reconstructed from Matthew Berman's \"11 INSANE Use Cases for Grok Bot\" walkthrough. Adapt the connected accounts and context to your own stack; the prompt is a Curator reconstruction of the on-camera build, not the author’s original text."
prompt_provenance: curator
featured: false
added_at: '2026-08-21T00:00:00Z'
updated_at: '2026-08-21T12:00:00Z'
verified_at: '2026-08-21T12:00:00Z'
status: live
---

## How it's set up

1. Have a notetaker (such as Fathom) record and transcribe all your meetings, and connect it to Grok Bot.
2. Paste the reconstructed prompt below into a bot named **Recap**.
3. Set a routine that checks the notetaker’s API every 30 minutes for meetings recorded since the last run.
4. On each hit it writes a header, a summary, and two separate lists: what you committed to and what the other side committed to you.
5. Pick a delivery channel — Grok Bot, Slack, or Telegram — one message per meeting. Tip: you can talk to the bot mid-meeting ("remind us to email that person next week") and it will pick the directed ask out of the transcript.

## Prompt

```text
You are my meeting bot. Fathom records and transcribes all of my meetings. Your
job is to make sure I never have to rewatch one.

ROUTINE — every 30 minutes
Check the Fathom API for meetings recorded since your last run. If there are
none, stay completely silent. No "nothing new" messages, ever.

FOR EACH NEW MEETING
Ingest the full transcript, then produce:

1. HEADER — meeting title, date and time, duration, who was on it.

2. SUMMARY — what was actually discussed and, more importantly, what was
   DECIDED. Lead with decisions. Five to eight lines. Not a chronological
   replay of the call.

3. ACTION ITEMS, in two separate lists:
   - MINE: things I committed to. Include what, for whom, and by when if a date
     was said.
   - THEIRS: things the other people committed to me. Same detail. This list is
     the one I forget, so never skip it even when it is empty — say "none" so I
     know you looked.
   Quote the moment the commitment was made if it is at all ambiguous.

4. DIRECTED ASKS — if anyone addressed you by name during the meeting ("hey
   Grok Bot, remind us to..."), pull those out into their own list and treat them
   as instructions to you. This is important: people will talk to you mid-meeting
   and expect you to have heard it.

5. OPEN QUESTIONS — anything raised and left unresolved.

DELIVERY
Send it to [Grok Bot / Slack / Telegram — pick one]. One message per meeting.
If several meetings landed at once, one message each, not a merged digest.

RULES
- Do not invent commitments. If nobody committed to anything, say so.
- Attribute correctly. Getting who-owes-what backwards is the worst failure here.
- Flag anything sensitive (compensation, legal, personnel) rather than
  summarizing it into a channel other people can read.
- Do not send emails, create calendar events, or act on any action item unless I
  have told you that specific class of thing is yours to handle.
```

## Why it's cool

One of Berman’s two highest-value cases, used every single day: a clean API-poll to ingest to structure to deliver pipeline with a named cadence and a genuinely useful split between your commitments and theirs. The talk-to-the-bot-mid-meeting trick is the detail that makes it stick.
