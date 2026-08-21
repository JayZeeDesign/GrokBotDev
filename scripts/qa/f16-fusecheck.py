#!/usr/bin/env python3
"""F16 fuse check — the decisive test for integration-notes §7/§8.

INFLATE 1.10 exists so "solid-ink bots never fuse into one blob". Family v2 is flat
solid fill on every bot, so a fuse is precisely: two bots OF THE SAME COLOUR whose
painted silhouettes touch, merging into one shape.

Different-colour bots resting against each other are NOT a fuse — you can still read
both. So the test is per-colour: for each palette colour, count connected components
of that colour in the rendered hero and compare against how many bots of that colour
the roll actually contains (read from the live DOM by the probe).

Antialiased boundary pixels are excluded by a tight colour tolerance, so a blend zone
can never bridge two components.
"""
import sys, json
from collections import deque
from PIL import Image

PALETTE = {
    'blue':   (0x4B, 0x92, 0xFA),
    'orange': (0xE4, 0x94, 0x22),
    'teal':   (0x25, 0xB8, 0xA4),
    'purple': (0x9E, 0x77, 0xFD),
    'red':    (0xEF, 0x62, 0x43),
    'grey':   (0x91, 0x94, 0x97),
}
TOL = 18          # tight: antialiased blends fall outside this
MIN_AREA = 400    # px; ignores stray antialiasing specks


def components(img, target, box):
    w, h = img.size
    px = img.load()
    x0, y0, x1, y1 = box
    tr, tg, tb = target
    seen = [[False] * (x1 - x0) for _ in range(y1 - y0)]
    comps = []
    for yy in range(y1 - y0):
        for xx in range(x1 - x0):
            if seen[yy][xx]:
                continue
            r, g, b = px[x0 + xx, y0 + yy][:3]
            if abs(r - tr) > TOL or abs(g - tg) > TOL or abs(b - tb) > TOL:
                continue
            q = deque([(xx, yy)])
            seen[yy][xx] = True
            n = 0
            while q:
                cx, cy = q.popleft()
                n += 1
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < x1 - x0 and 0 <= ny < y1 - y0 and not seen[ny][nx]:
                        rr, gg, bb = px[x0 + nx, y0 + ny][:3]
                        if abs(rr - tr) <= TOL and abs(gg - tg) <= TOL and abs(bb - tb) <= TOL:
                            seen[ny][nx] = True
                            q.append((nx, ny))
            if n >= MIN_AREA:
                comps.append(n)
    return comps


def main():
    shot, fills_json, box_json = sys.argv[1], sys.argv[2], sys.argv[3]
    img = Image.open(shot).convert('RGB')
    fills = json.loads(fills_json)          # computed `fill` per bot, e.g. "rgb(75, 146, 250)"
    box = tuple(json.loads(box_json))       # stage region to search

    # expected bots per palette colour, from the live DOM
    expected = {k: 0 for k in PALETTE}
    for f in fills:
        nums = [int(n) for n in f.replace('rgb(', '').replace(')', '').split(',')] if f and f.startswith('rgb') else None
        if not nums:
            continue
        for name, rgb in PALETTE.items():
            if all(abs(nums[i] - rgb[i]) <= 4 for i in range(3)):
                expected[name] += 1

    ok = True
    rows = []
    for name, rgb in PALETTE.items():
        exp = expected[name]
        comps = components(img, rgb, box)
        got = len(comps)
        # got < exp  => two same-colour bots merged into one blob  => FUSE
        # got > exp  => a bot got split by an occluder in front of it (another bot on top);
        #               that is stacking, not fusing, so it is reported but not a failure.
        verdict = 'FUSE' if got < exp else 'ok'
        if verdict == 'FUSE':
            ok = False
        rows.append((name, exp, got, verdict, comps))
    print(json.dumps({'ok': ok, 'rows': rows}))


if __name__ == '__main__':
    main()
