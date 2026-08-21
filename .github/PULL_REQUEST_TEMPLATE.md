## What this adds
<!-- One line: entry name + type (plugin / use-case / collection). -->

## Checklist
- [ ] This PR adds exactly ONE new file under `content/` (plus assets for this entry, if any).
- [ ] `npm run validate` passes locally (schema, slug, vocabularies — see /contribute/).
- [ ] `slug` is kebab-case and exactly matches the filename.
- [ ] I ran / used this myself end to end — it works today.
- [ ] Every URL in the frontmatter resolves to real, relevant content.
- [ ] The prompt body is the real, complete prompt — not a summary or a teaser.
- [ ] The entry body is plain markdown — no raw HTML (`<script>`, `<iframe>`, `<style>`, `<form>`, inline event handlers). CI rejects it (§8.5).
- [ ] I did NOT set `verified_at` or `status: live` — a maintainer sets those during verification (§10.1).
- [ ] This is not an ad. A listing that exists to funnel traffic to your product gets closed. Sponsor slots will exist for that — this isn't one.
- [ ] If this is someone else's work: `author` is the original creator, the origin is linked (`source_url` for a plugin, `source_tweets[]` for a use case), and `scouted_by` is me.
- [ ] I license this contribution under CC BY 4.0 (attribution: entry author + grokbot.dev).

## Where it came from
<!-- Link the source post / repo / your own writeup. -->
