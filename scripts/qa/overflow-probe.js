(() => {
  // F6 global guard — the PAGE must never scroll sideways.
  //
  // Two measures, because either one alone lies:
  //   · `documentElement.scrollWidth > innerWidth` is the headline symptom, but it is MASKED
  //     whenever a scroll lock (`overflow: hidden` on <html>) is active — which is exactly
  //     the InstallModal case the operator reported. It reads clean while the real page pans.
  //   · so also assert that no rendered box extends past the viewport's right edge, which the
  //     lock cannot hide.
  //
  // Two exclusions, both genuine false positives rather than convenience:
  //   · descendants of a CLOSED <details> — collapsed to a ~34px box, so scrollWidth vs
  //     clientWidth is meaningless there;
  //   · `.sr-only` — clipped to 1px by design, permanently "overflowing" itself.
  const vw = window.innerWidth;
  const inClosedDetails = (el) => {
    for (let n = el.parentElement; n; n = n.parentElement) {
      if (n.tagName === 'DETAILS' && !n.open) return true;
    }
    return false;
  };
  const isSrOnly = (el) => el.closest('.sr-only') !== null;

  const pastViewport = [];
  const contentOverflow = [];

  for (const el of document.querySelectorAll('body *')) {
    if (isSrOnly(el) || inClosedDetails(el)) continue;

    const r = el.getBoundingClientRect();
    const label =
      el.tagName.toLowerCase() +
      (el.id ? '#' + el.id : '') +
      (typeof el.className === 'string' && el.className
        ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
        : '');

    if (r.width > 0 && r.height > 0 && r.right > vw + 1) {
      pastViewport.push(`${label} right=${Math.round(r.right)} (vw ${vw})`);
    }

    // A container that opts into its own horizontal scroll is allowed (C4 table rule) —
    // it is contained, and the page still cannot move.
    const ox = getComputedStyle(el).overflowX;
    if (ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') continue;
    if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0) {
      contentOverflow.push(`${label} [${el.scrollWidth} > ${el.clientWidth}]`);
    }
  }

  return JSON.stringify({
    vw,
    docScrollWidth: document.documentElement.scrollWidth,
    pageOverflow: document.documentElement.scrollWidth > vw,
    scrollLockActive: getComputedStyle(document.documentElement).overflow === 'hidden',
    pastViewport: pastViewport.slice(0, 8),
    contentOverflow: contentOverflow.slice(0, 8),
    ok: document.documentElement.scrollWidth <= vw && pastViewport.length === 0,
  });
})()
