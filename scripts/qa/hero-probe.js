(() => {
  // Tight text-line boxes: a block h1's border box starts above the ascender and spans
  // the full column, so a box-vs-box test over-reports. Range.getClientRects() gives the
  // real glyph line boxes. Bot boxes stay full (they are ⊇ the drawn glyph), so this is a
  // conservative test: zero hits here means zero visual coverage.
  const lineBoxes = [];
  const walk = (node, label) => {
    if (node.nodeType === 3) {
      if (!node.textContent.trim()) return;
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const r of range.getClientRects()) {
        if (r.width > 1 && r.height > 1) lineBoxes.push({ label, l: r.left, t: r.top, r: r.right, b: r.bottom });
      }
      return;
    }
    if (node.nodeType !== 1) return;
    const cs = getComputedStyle(node);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    for (const c of node.childNodes) walk(c, label);
  };

  for (const el of document.querySelectorAll('#content > *')) {
    walk(el, el.tagName.toLowerCase() + (el.className ? '.' + el.className : ''));
  }
  // interactive controls count as copy too — a bot must not sit on the CTA
  for (const el of document.querySelectorAll('#content a, #content button, #content input')) {
    const r = el.getBoundingClientRect();
    if (r.width > 1 && r.height > 1) lineBoxes.push({ label: 'CTRL:' + el.tagName.toLowerCase(), l: r.left, t: r.top, r: r.right, b: r.bottom });
  }

  const bots = Array.from(document.querySelectorAll('#botlayer > *')).map((el, i) => {
    const r = el.getBoundingClientRect();
    return { i, l: r.left, t: r.top, r: r.right, b: r.bottom };
  });

  const hits = [];
  for (const c of lineBoxes) {
    for (const b of bots) {
      const w = Math.min(b.r, c.r) - Math.max(b.l, c.l);
      const h = Math.min(b.b, c.b) - Math.max(b.t, c.t);
      if (w > 0 && h > 0) hits.push({ el: c.label, bot: b.i, px: Math.round(w * h) });
    }
  }

  return JSON.stringify({
    seed: (document.getElementById('seedLabel') || {}).textContent || null,
    bots: bots.length,
    lineBoxes: lineBoxes.length,
    hits,
  });
})()
