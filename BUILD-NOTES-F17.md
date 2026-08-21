# BUILD-NOTES-F17.md — YouTube source support

**Scope:** F17 working notes, kept OUT of `BUILD-NOTES.md` on purpose. During the F17 window the
main checkout, `:4381`, `pm2 grokbotdev-web` and `BUILD-NOTES.md` belong to the Project Builder's
direct-edit polish round. This file is F17's notes surface; it merges into the main notes when
the F17 branch lands. Same arrangement E6 used for F16.

**Where F17 is built:** clone at `/opt/projects/grokbotdev-f17`, branch `f17-wip`, dev server on
`:4384` (`:4382` may be E6's, `:4381` is the Project Builder's).

---

## ⚠ PENDING MIGRATION INTO `BUILD-NOTES.md` (not F17 content)

The section immediately below is **F16 integration housekeeping, not F17 work**. It was written
for the main notes — §12.8, the file the operator actually reads — and was already appended
there before the handover. It is parked here only because `BUILD-NOTES.md` became the Project
Builder's file mid-flight, and leaving a 29-line append in it guaranteed a merge conflict for
zero benefit.

**Action at merge:** move this section into `BUILD-NOTES.md`, after the M8/F16 material. It is a
clean append — it does not modify any existing line. Alternatively the Project Builder can paste
it onto main during the polish round and I will drop it from here.

# M8 · F16 INTEGRATION HOUSEKEEPING (2026-08-21)

Two items handed over from `BUILD-NOTES-F16.md` at the merge. Recorded here because the main
notes are the file the operator reads (§12.8), and both are things a later executor needs to
know before touching the hero.

**1. §4.1.1 has ONE documented exception: `src/styles/hero-bots.css`.** That convention says
`tokens.css` is the only file allowed to contain hex values. Family v2's six avatar colours
(`--bot-fill` on `.s2-<colour>`) sit in `hero-bots.css` as literal hex, deliberately: **a token
inverts with the theme and a real Grok Bot avatar does not.** Putting them in `tokens.css`
would have made the bots change colour in dark mode, which is the opposite of the point. No
gate is weakened — `check-contrast.mjs` only reads `tokens.css` — and the palette carries its
own contrast table in `BUILD-NOTES-F16.md` §1 (white facial features clear 3:1 on all six;
grey is the tight one at 3.05:1). **This exception covers that one file and those six values.
It is not a licence for hex anywhere else.**

**2. Deferred tidy: the dead `--ink` / `--paper` aliases in `.stage`.** `HeroStage.astro`'s
alias block still declares `--ink` and `--paper`, and nothing inside `.stage` reads them now
that family v2 paints from fixed hexes. It is **two dead lines inside a load-bearing block** —
`--accent`, `--muted`, `--hair`, `--surface`, `--mono` and `--sans` in that same block ARE
still live (the search cursor, the hint and the chips use them), so this is a two-line trim,
not a block deletion. Left alone on purpose: F16's integration window's remit was "delete only
the dead paint", and trimming a live alias block by eye is how you find out at 390 which of the
six were load-bearing. Worth doing deliberately, worth not doing in a hurry.

---

# M9 · F17 — YOUTUBE SOURCE SUPPORT (2026-08-21)

Operator directive. **Machinery only — no YouTube content entries ship with this.** The
verified batch arrives later through the curator pipeline; F17 builds the road, not the
traffic. Everything below was tested against an **uncommitted fixture** that is deleted in this
same commit — B4 stands, nothing fictional ever ships.

## 1 · The schema: one primary source, kind-aware, zero content churn

An entry now names **one primary source** — the thing it was found in — as a discriminated
union on `kind`:

```yaml
primary_source:
  kind: youtube-video
  url: "https://www.youtube.com/watch?v=<id>"   # or youtu.be/<id>, or youtube.com/shorts/<id>
  title: "the video's real title"               # REQUIRED
  channel: "the channel name"                   # REQUIRED
  channel_url: "https://www.youtube.com/@…"     # optional
  timestamp: "4:12"                             # optional; mm:ss or h:mm:ss
  posted_at: "2017-10-05T00:00:00Z"             # optional
```

**Not one content file was edited.** The field is optional, and when it is absent the resolver
returns `{ kind: 'x-post', url: source_tweets[0].url }` — which is precisely the rule the
codebase already followed *implicitly* before F17 named the concept. The API, the feeds, the
wall and the entry page all read through `primarySourceOf()`, so the defaulting rule exists in
exactly one place and every surface agrees with every other by construction.

**Why a discriminated union rather than a `kind` field beside optional siblings:** it makes "a
YouTube source with no title" and "an X source carrying a channel name" *unrepresentable*
rather than merely discouraged, and Zod narrows on `kind` before complaining, so the error
names the branch instead of listing every field of both shapes.

**`title` and `channel` are REQUIRED, and that is a design decision, not a default.** The
fallback card is also the permanent failure state. A failure state that cannot name the video
is not attribution, it is a dead rectangle — so the schema refuses to let an entry ship a
source that disappears the moment Google is unreachable.

**`exactly one` is structural.** It is an object, not an array. There is nothing to enforce.

**An `x-post` primary must be one of the entry's own credited posts** (`primaryIsCredited`).
Otherwise a page could name a primary source that appears nowhere in its credit line. That arm
also carries *only* a URL — no excerpt, no handle — so `source_tweets[]` stays the single
source of that text and the two can never drift.

## 2 · The dedupe trap that URL normalisation would have walked straight into

§5.6 rule 3 dedupes URLs through `normalizeUrl()`, **which strips the query string**. For a
YouTube watch URL the video id lives in the query. So the obvious one-liner —
`track(urls, primary.url, 'primary_source url')` — would have collapsed **every**
`youtube.com/watch?v=…` in the corpus to the single key `https://www.youtube.com/watch` and
reported every entry after the first as a duplicate of the first.

Dedupe is therefore keyed on **video id**, via the same `youtubeVideoId()` the schema and the
renderer use. That is not just a fix, it is strictly better than URL dedupe could ever be: it
catches the same video submitted once as `youtu.be/X` and once as `youtube.com/watch?v=X`,
which no amount of URL normalisation can do. **Proven, not assumed** — two fixtures pointing at
the same video through two different link shapes collide, naming the id.

Found by reading `normalizeUrl()` before writing the call, not by watching a build fail.

## 3 · `src/lib/sources.js` — and why it is `.js`

Every consumer that has to agree about what a valid source URL looks like reads from one file:
the Zod schema, the resolver, the components, the wall endpoint, and `scripts/validate.mjs`.
That last one is the reason the file is **`.js` with JSDoc types rather than `.ts`**:
`validate.mjs` runs under plain node with no TS loader, so a `.ts` module would have forced a
second copy of the YouTube regex into the validator — the exact thing the file exists to
prevent. `astro check` type-checks it either way. One definition, five consumers, zero copies.

It also owns URL *construction*: `youtubeEmbedUrl()` is the only place a player URL is built,
so nothing can quietly frame `youtube.com` instead of the no-cookie host and be blocked by CSP
in production only.

## 4 · YouTubeEmbed — the failure model is the interesting part

F5's discipline throughout: nothing third-party is requested until the reader scrolls to it,
and the attribution row sits **outside the swap** so the source stays named and reachable on
every failure path. Both embeds now read one shared `data-embed-root-margin` (renamed from
`data-tweet-root-margin`), so a surface tunes X and YouTube together — the wall's tighter 100px
applies to both, where before F17 it would have applied to one.

**The design problem.** `TweetEmbed` can ask `createTweet` whether it worked. An `<iframe>`
cannot be asked. A blocked frame may fire `load` anyway for its own error page, and a
cross-origin frame that *did* load is unreadable by design. Any state machine built on those
signals is guessing.

**So the component does not need one to be correct.** The fallback card is the *background* of
the 16:9 box and is never hidden or removed; the iframe layers on top. A player that loads is
opaque and covers it. A player that never loads leaves it showing. The right outcome in both
cases, with nothing having to detect which case it is in.

**This was measured, and the measurement is the reason it is written down.** With
`youtube-nocookie.com` aborted at the network layer, `data-yt-state` reported **`loaded`** —
the cross-origin heuristic false-positives on an aborted request, exactly as feared. The card
still rendered correctly: title, channel, `on youtube ↗`, `at 4:12` and the date, all visible,
because the aborted frame is transparent and nothing keys off that attribute. **Had the
fallback been hidden on `state === 'loaded'`, that would have been an empty grey box.** The
invariant is load-bearing, so state it plainly:

> `data-yt-state` exists for analytics, tests and `aria-busy` ONLY. **Nothing visual may depend
> on it.** A paint rule keyed off `[data-yt-state="loaded"]` reintroduces the false-positive
> failure the layering exists to make impossible.

Other deliberate absences:

- **No poster thumbnail, no `i.ytimg.com`.** The fallback is both the loading state and the
  permanent failure state, and the failure state is by definition the case where Google is
  unreachable — so a poster is an image that fails in exactly the situation it was added for,
  while costing a Google round-trip in the situation it wasn't. It also keeps the §10.7
  widening to one token. **`img-src` is already `'self' https: data:`, so this was NOT forced
  by the CSP** — it is a privacy call, and it is what makes CP-125 literally true.
- **No YouTube IFrame API.** We build the `<iframe>`. That is why F17 adds nothing to
  `script-src`.
- **No autoplay.** The frame is created when the reader scrolls to it; a video that started
  talking at that moment would be an ambush, not a lazy-load.
- The fallback is `aria-hidden` because its two strings are repeated verbatim in the
  `<figcaption>`, which always exists. Screen readers get the source once.
- `embed={false}` renders the identical card without the observer hook — the failure state made
  reachable, so the style guide shows the real specimen rather than a hand-built replica.

**Measured behaviour** (fixture, `/use-cases/f17-fixture-youtube/`):

| check | result |
|---|---|
| lazy @390 — before scroll | `state: pending`, **no `<iframe>` in the DOM at all** |
| lazy @390 — after scrolling to it | `state: loaded`, iframe present |
| timestamp `4:12` → URL | `…/embed/aircAruvnKk?rel=0&modestbranding=1&start=252` |
| box aspect @1440 and @390 | `1.778` both (16:9), `boxRight` 1279 @1440 / **357 @390** |
| host blocked | card renders title + channel + `on youtube ↗ · 3Blue1Brown at 4:12` + date |
| rail label | `as seen on youtube` |
| mixed entry (YT primary + credited X post) | 2 embeds in the rail, correct kind each |

## 5 · The wall: mixed, and a pre-existing defect it exposed

Operator ruling applied — YouTube cards **join** the wall rather than getting a lane of their
own. `WallCard` takes `source: PrimarySource` and renders whichever embed the kind demands;
same masonry, same lazy path, same fallback discipline. Measured at 1440: 7 cards, 1 YouTube +
6 X, newest-first unchanged.

**Ordering, precisely:** entries in `sortForLatest` order, and within an entry the primary
source first then the remaining credited posts in file order. For every entry predating F17 the
primary *is* `source_tweets[0]`, so the emitted sequence is byte-identical to the pre-F17 wall.
The rule is new; the rendering of every existing entry is not.

**All three wall surfaces now share one builder** (`wallItems()`). They each rebuilt the same
flatMap before — three copies of one derivation, which is exactly what let F12's Pagination
link at routes that were never generated.

### ⚠ DEFECT FOUND AND FIXED — `/wall/` has had no masonry since F12

Found while verifying F17's mixed wall; **it predates F17 entirely** and is F17-independent.

The masonry rules lived in a `<style is:global>` inside `src/pages/wall/[page].astro`, on the
reasoning that one definition shared by both wall routes beats two copies. The reasoning was
right. **The placement was not:** `wall/[page].astro` only generates pages 2+, so below
`SSR_COUNT` items it generates *nothing* — and a route that builds no pages contributes no
stylesheet to any page. `/wall/` linked no masonry CSS at all.

Measured rather than inferred: `getComputedStyle('.wallMasonry').columnCount` returned **`auto`**
on the built page, and the rule was present in `dist/_astro/` but linked from nothing. The wall
has been rendering as **one full-width column since F12 shipped** — invisible because it has
never held 12 items, and because a single wide column looks like a design choice rather than a
missing stylesheet.

Same family as the bug F12 itself fixed: **output that only exists above an item-count
threshold.** Moved to `src/styles/global.css`, which always ships, so both routes get one copy
and neither can lose it. After: **1 / 2 / 3 columns at 390 / 768 / 1440**, per §4.5.

## 6 · §10.7 — a deliberate widening, gated in BOTH directions

**Exactly one token: `frame-src https://www.youtube-nocookie.com`.** The first new third-party
origin admitted to this policy since M0. Applied together to the §10.7 table (PRD + assembled
copy), `infra/security-headers.conf`, and `scripts/audit-scripts.mjs`.

`script-src` / `script-src-elem` / `img-src` are **unchanged**, and it is worth being exact
about why `img-src` is on that list: it is already `'self' https: data:`, so a poster thumbnail
would have needed **no CSP edit and would have tripped no guard**. The thing that would become
false is CP-125. That asymmetry is recorded in all three files.

**The guard asserts the negative too.** A guard that only checks a token is *present* is
satisfied by a policy that is far too open — so "we widened one directive by one token" would
be a comment rather than a fact. `audit-scripts` now also fails if YouTube appears in either
script directive, or if plain `youtube.com` appears in `frame-src`. All three paths proven by
breaking the conf and watching the guard name the directive:

| tampering | guard output |
|---|---|
| drop `www.youtube-nocookie.com` from `frame-src` | ``CSP `frame-src` is missing `https://www.youtube-nocookie.com` `` |
| add `youtube.com/iframe_api` to `script-src-elem` | ``CSP `script-src-elem` contains `youtube` — … is a NEW decision`` |
| frame `www.youtube.com` instead of the no-cookie host | ``CSP `frame-src` contains `https://www.youtube.com` — …`` |

## 7 · /about privacy — CP-125, and the rule it settled

CP-119/CP-120's asymmetric rule fired: behaviour changed, so the copy changed with it. Drafted
before the build finished, blessed by the copy authority **with zero edits**, applied verbatim,
registered in the pack's §14 table, §16 protected list and §17 reverse index.

Two rulings came back, both worth carrying forward:

1. **ADD, do not amend.** CP-120 is byte-untouched. Nothing in it became false — it describes
   what X pages do, and they still do exactly that. The statement's fault was *silence*.
   **Silence is cured by addition; a protected string is reopened when it is FALSE, never when
   it is merely quiet.** Reopening protected copy to cure silence sets the wrong precedent.
2. **"are on the page either way" over the tighter parallel with CP-120's "instead" —
   precision beats parallelism.** CP-120 can say "instead" because the X excerpt is a swapped
   state. The YouTube title, channel and link render *outside* the swap, so "instead" would be
   false.

And the house pattern the copy authority named out of it: **state our action and our limit, and
nothing about the vendor's behaviour.** "We ask for reduced tracking … but we can't speak for
what Google does" — never "YouTube does not store viewing data unless you play", which is
Google's marketing claim and would put a vendor's promise in our voice on the one page about
what we do with your data.

**The engineering is what made the copy honest.** The zero-network fallback is why "we load a
player only as you scroll to it" is literally rather than approximately true — measured: no
`<iframe>` exists in the DOM at all until the reader scrolls to it. When a factual claim and an
implementation can be brought into line by *simplifying the implementation*, do that before
wordsmithing the claim.

## 8 · /submit and the PR template — where the "field" actually landed

The directive asked for an "optional `youtube_url` field, validated against the three URL
shapes, in the form's existing validation voice". **`/submit/` has no `<form>`** — it is a
chooser with GitHub prefill CTAs, because submission is a pull request. So the *validation*
landed where a frontmatter field is actually validated (the Zod schema and `validate.mjs`), and
the **voice** that was preserved is the schema's error voice, which already reads
``Unknown integration "x" — must exactly match a canonical_name in …``:

> `must be a YouTube video URL — youtube.com/watch?v=…, youtu.be/…, or youtube.com/shorts/… (playlist, channel and /embed/ URLs are not accepted)`

Documented for contributors in the same instructional register on `/submit/`, `/contribute/`,
the README's frontmatter guidance and the PR-template checklist. Playlist, channel and
`/embed/` URLs are rejected on purpose: an entry cites one video, and `/embed/` is our output,
not a contributor's input.

**Five validator paths proven by deliberately breaking the fixture:** playlist URL rejected ·
missing `channel` rejected · `4m12s` timestamp rejected · `x-post` primary not in
`source_tweets[]` rejected · same video under two link shapes colliding on video id.

## 9 · Explicitly descoped, v1

No `/source/youtube` facet, no lane, no hub. Per the directive.

**One thing I did NOT build and am flagging rather than deciding:** a use case with a YouTube
primary is a natural `VideoObject` in the §6.4 structured data, and Google reads it. It is not
in this directive's scope, it would need `uploadDate` and `thumbnailUrl` that the schema does
not currently require, and `thumbnailUrl` would name `i.ytimg.com` in JSON-LD — metadata, not a
request, but close enough to the thumbnail decision above that it deserves a deliberate call
rather than a quiet one. `citation` on the HowTo *does* now include every source URL including
the YouTube one, so the structured data does not disagree with the rail rendered beside it.

## 10 · ⚠ OPEN — CP-098 becomes false when the content batch lands

`/wall/`'s intro, CP-098, currently reads:

> `every entry here started as someone's post on X. this is the wall of them, newest first — and the credit stays with whoever built it.`

Once a YouTube-sourced entry is on the wall, **the first clause is false.** F17 ships no YouTube
content, so it is true today and this is *not* a blocker for F17 — but it is armed, and it goes
off silently the day the curator batch merges. CP-098 is not §16 protected, so this is a normal
copy-pass change rather than a governance one, but it is a *factual claim about system
behaviour* and those are the copy authority's by precedent (CP-119/120/125).

Flagged, not fixed, and not fixed on purpose: the wall's whole voice is "credit stays with
whoever built it", and rewording it to cover two vendors without losing that is a copy decision,
not an engineering one. **It must be applied before the first YouTube entry goes live, not
before F17 ships.**

---

## CP-125 registration — verified, and one gap found next door

**Registered and verified byte-for-byte in all three places**, the standard CP-119/CP-120 set:
the pack's **§14** FENCED table, its **§16** protected list, and its **§17** reverse index under
`src/pages/about/index.astro`. Pack scope line updated **120 → 121 keyed rows**. Verification was
mechanical, not eyeballed — the string was extracted from `src/lib/copy.ts`, extracted from the
§14 table cell, and compared programmatically:

```
CODE len 468 | PACK len 468
code === pack : YES (byte-identical)
rendered on /about verbatim : YES
```

The third check matters most and is the one easiest to skip: the string is compared against the
**built** `dist/about/index.html` with tags stripped and entities decoded, so the mono-token split
(`www.youtube-nocookie.com` rendered in its own `<span class="font-mono">`) is proven not to have
altered a single byte of the sentence. That split is exactly the mechanism CP-120 uses; the risk
it carries is that a re-typed token silently diverges from the constant, and this check closes it.

Both governance rulings are recorded **in the §14 cell itself**, not only here: ADD-not-amend
(with *"reopening protected copy to cure silence sets the wrong precedent"* on the record), and
*"precision beats parallelism"* for "are on the page either way" over CP-120's "instead". The cell
also carries the load-bearing warning — `img-src` is already `'self' https: data:`, so a poster
thumbnail would pass the CSP and `audit-scripts` both; **this string** is the only thing that
would become false. That warning lives next to the claim, per the standing convention.

### GAP FOUND, DELIBERATELY NOT FIXED: CP-121 … CP-124 are absent from the pack

While registering CP-125 I checked its neighbours. **CP-121, CP-122, CP-123 and CP-124 appear
ZERO times in the copy pack** — not in §14, not in §16, not in §17. They exist only as constants
in `src/lib/copy.ts`, marked `§16 PROTECTED · OPERATOR-AMENDED (F10)`. The pack's InstallModal
rows therefore still describe the **pre-F10** copy, and some are now superseded in fact:

| pack row (still current in the pack) | superseded in code by |
|---|---|
| **CP-104** `keep getting new ones` | **CP-121** `Keep getting new Awesome Use Cases and Plugins` |
| **CP-105** `pick how often, copy the prompt, paste it into Grok. that's the whole setup.` | **CP-122** `pick your settings` + **CP-123** `copy the prompt and paste it into your Grok Bot` |
| *(no row)* | **CP-124** `CP_124_ROUTINE_ONE_LINER` / `CP_124_CADENCE` |

This is **F10's registration debt, not F17's**, and it is left alone on purpose for two reasons.
First, scope: CP-121–124 are operator-amended protected strings, and quietly registering someone
else's protected copy while finishing an unrelated feature is the same class of move the CP-125
ruling just pushed back on. Second, and more practically, **CP-124 is being revised right now** —
the operator is restoring the full contract with only sentence one replaced. Registering a string
mid-rewrite would register the wrong bytes.

**Flagged to the Project Builder instead**, because he holds the pen on CP-124 this round and it
is the natural moment to close all four. Note the knock-on: the scope line will need
**121 → 125 keyed rows** when they land, and §17's `InstallModal` entry needs the four keys added.
