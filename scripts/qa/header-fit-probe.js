(() => {
  // Header fit probe — QA only, evaluated in the page by agent-browser.
  // Wrap detection groups boxes by VERTICAL OVERLAP, not equal top: the row is
  // centre-aligned, so items of different heights legitimately have different tops.
  const rowsOf = (els) => {
    const boxes = els
      .filter((el) => {
        const cs = getComputedStyle(el);
        return cs.display !== 'none' && cs.visibility !== 'hidden' && el.getClientRects().length;
      })
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { el, top: r.top, bottom: r.bottom, x: r.x, w: r.width, label: (el.className.toString().match(/siteHeader__\w+|navDrawer|navMore|headerConnect|brand/) || [el.tagName.toLowerCase()])[0], text: el.textContent.trim().slice(0, 16) };
      })
      .filter((b) => b.w > 0)
      .sort((a, b) => a.top - b.top);
    const groups = [];
    for (const b of boxes) {
      const g = groups.find((grp) => b.top < grp.bottom - 1 && b.bottom > grp.top + 1);
      if (g) {
        g.top = Math.min(g.top, b.top);
        g.bottom = Math.max(g.bottom, b.bottom);
        g.items.push(b);
      } else groups.push({ top: b.top, bottom: b.bottom, items: [b] });
    }
    return groups;
  };

  const header = document.querySelector('header.siteHeader');
  const bar = document.querySelector('.siteHeader__bar');
  const row = document.querySelector('.siteHeader__row');
  if (!bar || !row) return { error: 'no header bar' };

  const cs = getComputedStyle(bar);
  const contentBox =
    bar.getBoundingClientRect().width -
    parseFloat(cs.paddingInlineStart) -
    parseFloat(cs.paddingInlineEnd);

  const nav = row.querySelector('.siteHeader__nav');
  const cluster = row.querySelector('.siteHeader__cluster');
  const drawer = row.querySelector('[data-nav-drawer]');
  const more = row.querySelector('[data-nav-more]');
  const shown = (el) => !!el && getComputedStyle(el).display !== 'none';

  const barRows = rowsOf([...row.children]);
  const navRows = shown(nav) ? rowsOf([...nav.children]) : [];
  const clusterRows = shown(cluster) ? rowsOf([...cluster.children]) : [];

  const mode = shown(nav) ? 'inline' : 'drawer';
  const wrapped =
    barRows.length > 1 || navRows.length > 1 || clusterRows.length > 1;

  const rect = header.getBoundingClientRect();
  return {
    vw: innerWidth,
    contentBox: Math.round(contentBox),
    inlineMin: cs.getPropertyValue('--header-inline-min').trim(),
    containerType: cs.containerType,
    mode,
    wrapped,
    barRowCount: barRows.length,
    navRowCount: navRows.length,
    clusterRowCount: clusterRows.length,
    headerH: Math.round(rect.height),
    rowH: Math.round(row.getBoundingClientRect().height),
    // intrinsic width the inline row needs right now (groups + group gutters)
    needed: shown(nav)
      ? Math.round(
          [...row.children]
            .filter((el) => getComputedStyle(el).display !== 'none')
            .reduce((s, el) => s + el.getBoundingClientRect().width, 0) +
            (barRows[0].items.length - 1) * parseFloat(getComputedStyle(row).columnGap)
        )
      : null,
    navVisible: shown(nav)
      ? [...nav.children].map((a) => a.textContent.trim())
      : null,
    moreVisible: shown(more),
    themeVisible: shown(row.querySelector('.siteHeader__themeMobile')) || shown(cluster?.querySelector('.themeToggle')),
    drawerVisible: shown(drawer),
    connectPill: shown(row.querySelector('.headerConnect')),
    connectCta: shown(cluster?.querySelector('a[data-install-trigger]')),
    f6: { scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth, ok: document.documentElement.scrollWidth <= window.innerWidth },
    groups: barRows.map((g) => g.items.map((i) => `${i.label}:${Math.round(i.w)}`)),
  };
})()
