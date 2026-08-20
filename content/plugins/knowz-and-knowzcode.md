---
type: plugin
name: "Knowz + KnowzCode"
slug: knowz-and-knowzcode
tagline: Gives Grok Bot vault memory and a gated coding workflow.
category: engineering
subcategory: agents-ops
install_steps:
  - "Open Plugins in the Grok Bot sidebar, or Cursor's plugin marketplace — same catalog."
  - "Search Knowz. Add Knowz for vault memory, KnowzCode for the coding workflow, or both."
  - "For Knowz, finish the Authorize step in the browser and confirm it shows under Installed."
works_with: []
project_url: "https://knowz.io/"
repo_url: "https://github.com/knowz-io/cursor-knowz-plugin"
author:
  handle: "knowz-io"
  url: "https://github.com/knowz-io"
  platform: github
source_url: "https://github.com/knowz-io/cursor-knowz-plugin"
setup_minutes: 10
featured: false
added_at: "2026-08-20T22:45:00Z"
updated_at: "2026-08-20T23:45:00Z"
verified_at: "2026-08-20T23:45:00Z"
status: live
---

## What it does

Knowz and KnowzCode are two plugins from one repo, and the README is explicit that they stay separate installs. Knowz gives your Bot a durable vault it can ask, save, search, browse and amend — memory that survives the end of a chat. KnowzCode is the coding side: setup, work, relay, explore, fix, regroup, continue.

The README opens with "Knowz + KnowzCode for Grok Bot and Cursor" and documents the Grok Bot install path directly: open Plugins in the sidebar, search Knowz, add what you want, and complete Authorize in the browser.

This is for people whose Bot keeps re-learning the same project every week. Pair the vault with the coding workflow and the Bot starts a task already knowing what the last one decided.

## Install setup

Install from the Plugins sidebar in Grok Bot or from Cursor — the repo says they are the same catalog for this plugin. Authorization happens in the browser during install.

One safety note worth repeating because the repo says it plainly: **do not paste API keys into chat.** The browser Authorize flow exists so you never have to. Knowz connects to a hosted MCP server (`mcp.knowz.io`), which is a normal integration endpoint, not a reason to hand credentials to a Bot in a message.
