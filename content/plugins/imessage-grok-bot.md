---
type: plugin
name: "iMessage Grok Bot"
slug: imessage-grok-bot
tagline: Gives Grok Bot a local, preview-first bridge to iMessage on macOS.
category: personal
subcategory: family
install_steps:
  - "Clone the skill repo on a supported Mac, or download the latest release archive."
  - "Run the standard installer, or the hardened installer if you want a stricter allowlist."
  - "Grant Full Disk Access, allow Messages automation on first send, then give Grok Bot the bridge path."
works_with: []
project_url: "https://github.com/jeffhuber/grokbot-imessage-skill/releases"
repo_url: "https://github.com/jeffhuber/grokbot-imessage-skill"
author:
  handle: "jeffhuber"
  url: "https://github.com/jeffhuber"
  platform: github
source_url: "https://github.com/jeffhuber/grokbot-imessage-skill"
setup_minutes: 30
featured: false
added_at: "2026-08-20T22:45:00Z"
updated_at: "2026-08-20T23:45:00Z"
verified_at: "2026-08-20T23:45:00Z"
status: live
---

## What it does

A local macOS skill that lets Grok Bot read, search, triage, summarise and draft replies to your iMessages. A launchd helper reads the local Messages database and sends through AppleScript; the README says the helper itself makes no outbound network requests. What you hand to Grok for summarising still goes through xAI's normal pipeline, so this is powerful and privacy-sensitive at the same time. Read the README before you install it, not after.

The send gate is the reason this one is worth listing. Sending is not silent: the Bot asks for a preview, the helper issues a single-use nonce bound to that exact message, and macOS then shows a native confirmation dialog with the recipient and the text — with Cancel as the default button.

## Install setup

You need macOS 13 or newer, Python 3.9+, and the Xcode command line tools. Install from a release archive or clone the repo, then run the installer; there is a hardened variant if you want a tighter allowlist from the start.

macOS will ask for Full Disk Access (to read `chat.db`) and for Messages automation the first time something is sent. Grant those deliberately. Start read-only for a day — triage and summaries only — before you let it draft anything you might send.
