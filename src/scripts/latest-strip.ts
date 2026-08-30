// The home "Fresh drops" strip — the two jobs that genuinely need JS, and nothing else.
//
// THE SCROLLING ITSELF IS NOT ONE OF THEM. The track is a CSS scroll-snap container: native
// touch scrolling IS the mobile swipe, so with this module blocked (or simply not yet parsed)
// the strip is fully usable — you swipe it on a phone, you scroll it with a trackpad or
// shift-wheel on a desktop, and every card is a real link. That is the §4.4 floor: nothing
// here is load-bearing.
//
// What it does add:
//   1. AGE CHIPS — a static page built on Tuesday would still be claiming "2h" on Friday.
//      Each chip carries its real `datetime`, so the label is recomputed from the reader's
//      clock on load. The build-time label is the fallback, never a placeholder.
//   2. DESKTOP ARROWS — the buttons ship `hidden` and are un-hidden here, so a reader without
//      this module never sees a control that does nothing (CLAUDE.md: "a dead control is worse
//      than no control"). They are also re-hidden when the track does not overflow, which is
//      the wide-viewport / thin-corpus case.
//
// Bundled module, imported from the component's `<script>` — same shape as vote-counts and the
// sponsor shuffle, so it compiles to /_astro/*.js and `audit-scripts` still reports 0 inline
// blocks. §10.7's `script-src 'self'` is untouched.
import { isFresh, relativeAge } from '../lib/relative-time';

/** Re-label every age chip in `root` from the reader's clock. */
function refreshAges(root: ParentNode): void {
  const now = Date.now();
  root.querySelectorAll<HTMLTimeElement>('[data-latest-age]').forEach((chip) => {
    const ms = Date.parse(chip.dateTime);
    if (Number.isNaN(ms)) return;
    chip.textContent = relativeAge(ms, now);
    if (isFresh(ms, now)) chip.setAttribute('data-fresh', 'true');
    else chip.removeAttribute('data-fresh');
  });
}

/**
 * One card plus one gap — the distance an arrow press should travel.
 *
 * Measured from the live DOM rather than hardcoded, because the card width is a `clamp()` and
 * the gap is a token: any future change to either stays correct here for free. Falls back to
 * 80% of the visible width if the track is somehow empty.
 */
function stepOf(track: HTMLElement): number {
  const card = track.querySelector<HTMLElement>(':scope > li');
  if (!card) return Math.round(track.clientWidth * 0.8);
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
  return Math.round(card.getBoundingClientRect().width + gap);
}

function wireStrip(root: HTMLElement): void {
  refreshAges(root);

  const track = root.querySelector<HTMLElement>('[data-latest-track]');
  const nav = root.querySelector<HTMLElement>('[data-latest-nav]');
  if (!track || !nav) return;

  const buttons = Array.from(nav.querySelectorAll<HTMLButtonElement>('[data-latest-scroll]'));
  if (buttons.length !== 2) return;

  const sync = (): void => {
    // scrollWidth/clientWidth are integer-rounded, so compare with a pixel of slack rather
    // than for equality — an exact test flickers the end-stop on fractional layouts.
    const max = track.scrollWidth - track.clientWidth;
    if (max <= 1) {
      // No overflow: there is nothing to scroll TO, so the arrows go away entirely instead of
      // sitting there permanently disabled.
      nav.hidden = true;
      return;
    }
    nav.hidden = false;
    for (const button of buttons) {
      const dir = Number(button.dataset.latestScroll);
      button.disabled = dir < 0 ? track.scrollLeft <= 1 : track.scrollLeft >= max - 1;
    }
  };

  for (const button of buttons) {
    button.addEventListener('click', () => {
      const dir = Number(button.dataset.latestScroll) || 1;
      track.scrollBy({
        left: dir * stepOf(track),
        // §4.4 rule 6 lives in CSS and cannot reach a scripted scroll, so the preference is
        // read directly here. A reduced-motion reader gets the same jump, instantly.
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
      });
    });
  }

  track.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync, { passive: true });
  sync();
}

export function initLatestStrip(): void {
  document.querySelectorAll<HTMLElement>('[data-latest]').forEach(wireStrip);
}
