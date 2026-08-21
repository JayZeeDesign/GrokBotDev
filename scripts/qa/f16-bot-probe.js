(() => {
  // M8 · F16 — bot geometry probe. Not a build gate; part of the scripts/qa harness.
  //
  // Reports the shape of a settled assembly so the F16 claims can be re-measured rather
  // than eyeballed: how many bots actually made it onto the stage, how the pile is
  // proportioned, and which painted boxes touch.
  //
  // WHAT THIS DELIBERATELY DOES NOT DO: decide whether two bots have FUSED. The `.bot`
  // element is a square containing a rotated silhouette, so an AABB test over-reports
  // badly — a triangle and a pill can have overlapping boxes with 30px of clear
  // background between them. `touching` below is therefore a CANDIDATE list, not a
  // verdict. The real fuse test is done on pixels, per palette colour, by
  // .scratch fusecheck (see BUILD-NOTES-F16.md): family v2's bots are flat solid fills,
  // so two bots of one colour that merge show up as ONE connected component where the
  // DOM says there should be two. That test is exact; this one is context.

  const stage = document.getElementById('stage');
  const layer = document.getElementById('botlayer');
  if (!stage || !layer) return JSON.stringify({ error: 'no stage' });

  const st = stage.getBoundingClientRect();
  const els = Array.from(layer.children);

  const bots = els.map((el, i) => {
    const r = el.getBoundingClientRect();
    const svg = el.querySelector('svg');
    const shape = svg && (svg.querySelector('rect:not(.eye)') || svg.querySelector('polygon')
      || svg.querySelector('circle') || svg.querySelector('ellipse'));
    let tight = null;
    if (shape) {
      const sr = shape.getBoundingClientRect();
      if (sr.width > 1 && sr.height > 1) tight = { l: sr.left, t: sr.top, r: sr.right, b: sr.bottom };
    }
    const cx = (r.left + r.right) / 2 - st.left;
    const cy = (r.top + r.bottom) / 2 - st.top;
    return {
      i,
      kind: shape ? shape.tagName.toLowerCase() : null,
      fill: shape ? getComputedStyle(shape.parentNode).fill : null,
      size: Math.round(r.width),
      cx: Math.round(cx),
      cy: Math.round(cy),
      // A bot whose centre is outside the stage is clipped by `overflow:hidden` and is
      // simply not on screen. Before the F16 release fix this caught ~1 bot on half of
      // all seeds — a body released from its stagger while flagged asleep never gets
      // integrated and hangs above the stage. Should now always be 0.
      offstage: cx < 0 || cx > st.width || cy < 0 || cy > st.height,
      box: { l: r.left, t: r.top, r: r.right, b: r.bottom },
      tight,
    };
  });

  // ---- pile proportions: is this reading as a PILE or as one flat row? ----
  const clusterW = bots.length
    ? Math.max(...bots.map((b) => b.box.r)) - Math.min(...bots.map((b) => b.box.l)) : 0;
  const clusterH = bots.length
    ? Math.max(...bots.map((b) => b.box.b)) - Math.min(...bots.map((b) => b.box.t)) : 0;
  const avgSize = bots.length ? bots.reduce((t, b) => t + b.size, 0) / bots.length : 0;

  // rows = centre-y clusters, at half a bot-height tolerance
  const ys = bots.map((b) => b.cy).sort((a, b) => a - b);
  let rows = ys.length ? 1 : 0;
  for (let i = 1; i < ys.length; i++) {
    if (ys[i] - ys[i - 1] > avgSize * 0.5) rows++;
  }

  const touching = [];
  for (let a = 0; a < bots.length; a++) {
    for (let b = a + 1; b < bots.length; b++) {
      const A = bots[a].tight;
      const B = bots[b].tight;
      if (!A || !B) continue;
      const w = Math.min(A.r, B.r) - Math.max(A.l, B.l);
      const h = Math.min(A.b, B.b) - Math.max(A.t, B.t);
      if (w > 0 && h > 0) {
        touching.push({ a, b, sameFill: bots[a].fill === bots[b].fill, areaPx: Math.round(w * h) });
      }
    }
  }

  return JSON.stringify({
    seed: (document.getElementById('seedLabel') || {}).textContent || null,
    stage: { w: Math.round(st.width), h: Math.round(st.height) },
    bots: bots.length,
    offstage: bots.filter((b) => b.offstage).length,
    kinds: bots.map((b) => b.kind),
    fills: bots.map((b) => b.fill),
    avgSize: Math.round(avgSize),
    clusterW: Math.round(clusterW),
    clusterH: Math.round(clusterH),
    aspect: +(clusterW / Math.max(1, clusterH)).toFixed(2),
    rows,
    touching,
  });
})()
