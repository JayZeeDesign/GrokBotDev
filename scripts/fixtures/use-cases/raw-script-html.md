---
type: use-case
name: "Injection · Raw HTML Fixture"
slug: raw-script-html
tagline: Failure class — contributor markdown carrying raw HTML in the body.
category: engineering
subcategory: agents-ops
what_it_does: >-
  A deliberately hostile fixture. Its body contains a raw script tag, which is the
  stored-XSS vector §8.5 check 7 exists to close. Validation must reject it before the
  sanitizer ever gets a turn.
integrations: []
schedule: adhoc
autonomy: readonly
difficulty: beginner
setup_minutes: 5
replicability: This entry is a test fixture and is never imported into the content corpus.
added_at: "2026-08-20T00:00:00Z"
updated_at: "2026-08-20T00:00:00Z"
verified_at: "2026-08-20T00:00:00Z"
status: live
---

## How it's set up

Golden fixture for §11 M2.5, failure class **raw `<script>` HTML in a body**. The line below
is the payload. `rehype-sanitize` would strip it at build (§3.3, §10.2), but stripping is
the second line of defence — §8.5 check 7 requires validation to *reject the file*, so a
contributor never gets a merged PR whose rendered page silently lost content, and so no
future template change can accidentally re-expose it.

<script>alert('this must never reach dist')</script>

The body also has to clear the section-length floors so the run fails on the raw-HTML rule
under test rather than on a length rule, which is why this paragraph keeps going for a
while longer than it otherwise would.

## Prompt

```text
This fixture never ships and this prompt is never run by anything. It exists only so the
body satisfies the §5.3 use-case contract — required sections present, in order, with
exactly one fenced text block of at least two hundred characters — which means the
validation run fails on the raw-HTML rule this fixture is testing, and on nothing else.
```

## Why it's cool

It is not cool, it is hostile, and that is the point: the negative fixtures are the only
part of the corpus that proves the gate actually closes. A validator is only as good as the
last time someone watched it reject something.
