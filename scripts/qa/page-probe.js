(() => {
  const q = (s) => Array.from(document.querySelectorAll(s));
  const txt = (el) => (el ? el.textContent.replace(/\s+/g, ' ').trim().slice(0, 90) : null);
  const vw = window.innerWidth;

  // elements that overflow the viewport horizontally.
  //
  // A CLOSED <details> is excluded (added at F7): the mobile nav drawer's panel is parked
  // off-screen at `translateX(100%)` while closed — that IS the slide-in start state, and
  // `body { overflow-x: clip }` (F6) means it can never move the page. Without this the
  // probe flags all 19 templates at 390 while `documentElement.scrollWidth` is exactly the
  // viewport width. `scripts/qa/overflow-probe.js` already carried this exclusion; the two
  // disagreeing is what surfaced it.
  const inClosedDetails = (el) => {
    for (let n = el.parentElement; n; n = n.parentElement) {
      if (n.tagName === 'DETAILS' && !n.open) return true;
    }
    return false;
  };

  // Clipped by an ancestor → cannot widen the page. Kept identical to
  // `overflow-probe.js`, including both of its subtleties: only `hidden`/`clip` count
  // (an element with `overflow-y: auto` computes `overflow-x: auto`, and excluding on that
  // would have hidden the F6 modal defect), and the walk stops at a `position: fixed` node
  // because a fixed element escapes an ancestor's overflow. Without this the A4 hero's
  // gutter-resting edge bot — which `.stage` clips, by design — reads as page overflow on
  // some seeds, making the sweep intermittently and wrongly red.
  const clippedByAncestor = (el) => {
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.position === 'fixed') return false;
      if (n === el) continue;
      if (cs.overflowX === 'hidden' || cs.overflowX === 'clip') return true;
    }
    return false;
  };

  const overflowing = [];
  for (const el of q('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (inClosedDetails(el) || clippedByAncestor(el)) continue;
    if (r.right > vw + 1 || r.left < -1) {
      const cs = getComputedStyle(el);
      if (cs.position === 'fixed' && r.width === 0) continue;
      overflowing.push(
        el.tagName.toLowerCase() +
          (el.id ? '#' + el.id : '') +
          '.' + (el.className && typeof el.className === 'string' ? el.className.split(/\s+/).slice(0, 2).join('.') : '') +
          ` [${Math.round(r.left)}..${Math.round(r.right)}]`
      );
    }
  }

  // grid column count for the first card grid found
  const gridCols = (sel) => {
    const g = document.querySelector(sel);
    if (!g) return null;
    const t = getComputedStyle(g).gridTemplateColumns;
    return t === 'none' ? 'none' : t.split(' ').length;
  };

  const navs = q('nav').map((n) => n.getAttribute('aria-label') || '(UNLABELLED)');
  const h1s = q('h1').map(txt);
  const h2s = q('main h2, main h3').map(txt);

  // region order inside <main>, top-level children
  const main = document.querySelector('main');
  const regions = main
    ? Array.from(main.children).map((c) => {
        const tag = c.tagName.toLowerCase();
        const id = c.id ? '#' + c.id : '';
        const h = c.querySelector('h1,h2,h3');
        return tag + id + (h ? ':' + txt(h).slice(0, 40) : '');
      })
    : [];

  return JSON.stringify({
    url: location.pathname,
    vw,
    docScrollW: document.documentElement.scrollWidth,
    hOverflow: document.documentElement.scrollWidth > vw + 1,
    overflowing: overflowing.slice(0, 8),
    header: q('body > header').length,
    footer: q('body footer').length,
    mainId: main ? main.id : null,
    skipLink: !!document.querySelector('a.skip-link'),
    navs,
    h1count: h1s.length,
    h1: h1s[0] || null,
    headings: h2s.slice(0, 14),
    breadcrumb: !!document.querySelector('nav[aria-label="breadcrumb"]'),
    pagination: !!document.querySelector('nav[aria-label="pagination"]'),
    newsletter: !!document.querySelector('[data-newsletter], form[data-newsletter-form], #newsletter, .newsletter-row') ||
      /weekly|subscribe/i.test(document.querySelector('main')?.textContent?.slice(-3000) || ''),
    cardGridCols: gridCols('[data-card-grid]') ?? gridCols('main ul.grid') ?? gridCols('main div.grid'),
    footerCols: gridCols('footer nav'),
    entryCards: q('[data-entry-card], article').length,
    chips: q('[data-chip], .chip').length,
    filterBar: !!document.querySelector('[data-filter-bar], details[data-filter]'),
    statbar: /·/.test(document.querySelector('main')?.textContent?.slice(0, 1200) || ''),
    regions,
    tinyTargets: q('a,button,summary,input').filter((e) => {
      const r = e.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && (r.width < 24 || r.height < 24);
    }).length,
  });
})()
