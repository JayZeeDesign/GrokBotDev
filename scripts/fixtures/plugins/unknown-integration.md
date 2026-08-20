---
type: plugin
name: "Unknown Integration Fixture"
slug: unknown-integration
tagline: Failure class — an integration value outside the controlled vocabulary.
category: engineering
subcategory: code-review
install_steps:
  - "This fixture exists to make `npm run validate` fail. It never ships."
works_with: ["Github", "gcal"]
project_url: "https://example.com/fixtures/unknown-integration"
author:
  handle: "fixture"
  url: "https://example.com/fixture"
  platform: web
added_at: "2026-08-20T00:00:00Z"
updated_at: "2026-08-20T00:00:00Z"
verified_at: "2026-08-20T00:00:00Z"
status: live
---

Golden fixture for §11 M2.5, failure class **unknown integration**. `Github` is the right
tool with the wrong casing (the canonical name is `GitHub`, matched exactly and
case-sensitively per §5.5) and `gcal` is a registered *alias*, which §5.5 says is never
valid in frontmatter.

Both must fail, and both must produce the closest-match suggestion — "did you mean
`GitHub`?" and "did you mean `Google Calendar`?" — because a validator that only says "no"
sends the contributor back to read a JSON file for a capital letter.
