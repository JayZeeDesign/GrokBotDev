// Site feature flags — build-time constants, flipped by editing this file (static site:
// every flip ships through the usual gate → commit → promote pipeline).

/**
 * Operator (2026-08-27): hide the read-only ▲/count vote blocks on use-case LISTING cards
 * until the site has accumulated enough votes that the numbers read as social proof rather
 * than a wall of zeros. Flip to `true` to bring them back everywhere at once.
 *
 * Scope: this is the DEFAULT for UseCaseCard. The dedicated /use-cases/upvoted/ page
 * opts back in explicitly (showVote={true}) — that page is the upvote leaderboard and is
 * meaningless without counts. Detail-page voting (UpvoteButton) is unaffected.
 */
export const SHOW_CARD_VOTES = false;
