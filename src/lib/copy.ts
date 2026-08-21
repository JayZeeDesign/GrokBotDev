// Copy pack v1.1 (ADDENDUM C, BINDING) — the M1 slice.
// C4: "M1 (components): chrome strings (nav, buttons, chips, empty states, status
// messages) from pack §§2, 11, 13." Every string below is the pack's AFTER, verbatim.
// CP keys are immutable (pack §0.1) — cite them in commits, never renumber them.
//
// Hazards honoured (pack §18, BINDING):
//   · CP-032 renames the RENDERED LABEL only. The frontmatter/API field stays
//     `replicability` (§5.2 Zod, §5.3, §5.6, §5.7, §7.1.3) — no blind find-replace.
//   · CP-002 / CP-054 are multi-site strings owned by M3 pages, not by components.
//   · FENCED strings (CP-110, CP-112, CP-113, CP-114) are reproduced byte-for-byte.

/** §2 — Newsletter (global component). */
export const CP_014_NEWSLETTER_HEADING = "the week's best, in one email";
export const CP_015_NEWSLETTER_SUBCOPY =
  "new plugins, use cases and collections. one email a week. that's it.";
export const CP_016_NEWSLETTER_SUBMITTING = 'subscribing…';
export const CP_016_NEWSLETTER_SUCCESS = "▪ you're on the list";
export const CP_017_NEWSLETTER_ERROR = 'signup is down — email hello@grokbot.dev';

/** §4 / §6 — prompt + embed chrome (KEEP rows: do not reword). */
export const CP_024_PROMPT_MICROHINT = 'then paste it into Grok';
/** RETIRED at F5 — the operator overruled §10.3's click-to-load, so there is no button.
 *  Kept so the pack key still resolves; nothing renders it. */
export const CP_034_TWEET_LOAD_LABEL = 'load tweet from x';
export const CP_026_RELATED_HEADING = 'related';
export const CP_026_APPEARS_IN_HEADING = 'appears in';

/** §8 — the agent contract block (CP-043 is the pack's best microcopy row: KEEP). */
export const CP_044_CONTRACT_LABEL = 'grokbot.dev agent contract · v1';
export const CP_043_CONTRACT_MICROHINT = 'paste this into your grok bot — it figures out the rest';

/** §11 — search, empty states, status messages, 404. */
export const CP_063_SEARCH_LOADING = 'searching…';
export const CP_064_SEARCH_NOJS = 'search needs JavaScript — browse /plugins/ or /categories/ instead';
export const CP_065_EMPTY_SEARCH = "nothing found for '{q}' — try fewer words, or browse all plugins";
export const CP_066_EMPTY_HUB = 'nothing here yet — the Scouts are on it. submit one and be first.';
export const CP_067_CALLOUT_NEEDS_UPDATE =
  'nobody has checked this since {verified_at}. it might be out of date.';
export const CP_068_CALLOUT_DEPRECATED =
  "this one's been retired. it's here for the record — it may not work any more.";
export const CP_069_COPY_IDLE = 'copy';
export const CP_069_COPY_COPIED = 'copied ▪';
export const CP_069_COPY_ERROR = 'press ctrl+c';
export const CP_069_COPY_ANNOUNCE = 'prompt copied to clipboard';
export const CP_070_404_HEADING = '404 — not found';
export const CP_071_404_BODY =
  "this page doesn't exist. the bots have been notified. (they haven't. it's a static site.)";

/** §13.3 — /wall/ (Addendum B2 added the route; these strings were never written). */
export const CP_099_WALL_LINK_CHIP = '→ posted on grokbot.dev: {entry_name}';
export const CP_100_WALL_BACKLINK = 'see it on the wall →';
export const CP_101_WALL_EMPTY =
  'nothing on the wall yet. post what you built with your Grok Bot — the Scouts will find you.';

/** §13.4 — InstallModal (Addendum B3 named the sections; the strings were never written). */
export const CP_102_INSTALL_TITLE = 'plug your Grok Bot in';
export const CP_103_INSTALL_SECTION1 = 'install this';
export const CP_104_INSTALL_SECTION2 = 'keep getting new ones';
export const CP_105_INSTALL_SECTION2_BODY =
  "pick how often, copy the prompt, paste it into Grok. that's the whole setup.";
export const CP_106_INSTALL_SCHEDULES = ['hourly', 'daily', 'every 2 days', 'weekly'] as const;
export const CP_107_INSTALL_AGENT_LINK = 'the full contract, if your Bot wants it →';
export const CP_108_INSTALL_BROWSE_LINK = "browse what it'll find you";
export const CP_109_INSTALL_TRIGGER = 'install in grok bot';

/** §14 — FENCED. Verbatim at every placement, in this pass and every future one. */
export const CP_110_DISCLAIMER =
  'GrokBot.dev is an independent community project — not affiliated with xAI.';
export const CP_112_CTA_SENTENCE = 'Copy the prompt and paste it into Grok';
export const CP_113_HOME_H1 = 'Everything your Grok Bot could be doing';
export const CP_114_RETRIEVAL_PHRASE = 'ready-to-use Grok Bot prompts';

/** CP-032 — the RENDERED label for the use-case `replicability` field. Field name unchanged. */
export const CP_032_REPLICABILITY_LABEL = 'what you need';

/**
 * §16 PROTECTED — `/about/` privacy statement. CP-119 + CP-120.
 *
 * Written at F5 because auto-loading X embeds made the previous line ("no cookies are set by
 * this site and there is no cross-site tracking") FALSE, on the one page whose entire subject
 * is what we do with your data. §10.8's own escalation rule covers exactly that case. Blessed
 * as-is by the copy authority, zero edits, and registered in the pack's §16 protected list —
 * same status as the original nineteen.
 *
 * DO NOT REWRITE. If the embed behaviour changes, the copy has to change WITH it — that is
 * the point of the pairing, and it is a copy-governance change, not a polish edit.
 *
 * They live here rather than inline in the page precisely because a protected string sitting
 * as inline JSX is the kind that gets casually reworded by a later pass.
 */
export const CP_119_ABOUT_PRIVACY_ANALYTICS =
  'Analytics is cookieless and the dashboard is public — this site sets no cookies of its own ' +
  'and does not track you across the web. If you join the waitlist we store your email address ' +
  'and the page you signed up from, nothing else, and we use it only to send the weekly email. ' +
  'Ask us to delete it and we will.';

export const CP_120_ABOUT_PRIVACY_EMBEDS =
  'Pages that quote a post from X embed it from X, which means X sees the request and may set ' +
  "its own cookies in that embed. We load an embed only as you scroll to it, and we ask X for " +
  "its do-not-track mode, but we can't speak for what X does. If you'd rather not load them, " +
  'block platform.twitter.com — the page still works and you\'ll see our quote of the post instead.';

/** The one token in CP-120 rendered in mono. Split, never re-typed, so the string stays whole. */
export const CP_120_MONO_TOKEN = 'platform.twitter.com';

/**
 * §16 PROTECTED · OPERATOR-AMENDED (F10, 2026-08-21). CP-121 … CP-124.
 *
 * All four are the operator's own wording, supplied verbatim in the F10 brief. Register-first,
 * ship-exactly: CP-121 is deliberately sentence-cased with capitalised product nouns even
 * though modal chrome is lowercase mono elsewhere — that is the operator's call, not a slip,
 * so the heading drops `lowercase` rather than "correcting" the string.
 *
 * CP-124 REPLACES the long §7.3 machine contract inside the modal. The contract itself is NOT
 * deleted from the product — `/agent/` still renders it in full and the modal links there
 * (CP-107), exactly as B3 specified. What changed is who the modal talks to: a human choosing
 * a cadence, not a machine reading a spec.
 */
export const CP_121_INSTALL_SECTION2 = 'Keep getting new Awesome Use Cases and Plugins';
export const CP_122_INSTALL_STEP_1 = 'pick your settings';
export const CP_123_INSTALL_STEP_2 = 'copy the prompt and paste it into your Grok Bot';

/** CP-124 — the one-liner. The cadence opener is the ONLY templated part; the rest is fixed. */
export const CP_124_ROUTINE_ONE_LINER = (cadence: string) =>
  `${cadence}, fetch https://grokbot.dev/api/v1/latest.json and show me new awesome use cases and plugins posted on grokbot.dev`;

/** Cadence openers, operator-supplied. Keys match the schedule picker. */
export const CP_124_CADENCE = {
  hourly: 'Every hour',
  daily: 'Every morning',
  'two-days': 'Every 2 days',
  weekly: 'Every week',
} as const;

/** Interpolate `{token}` placeholders in a pack string without editorialising it. */
export function fillCopy(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? values[key] : match
  );
}
