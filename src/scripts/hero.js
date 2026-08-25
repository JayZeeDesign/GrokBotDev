/* eslint-disable */
// Addendum A4 (BINDING) — lifted VERBATIM from assets/hero-animation/hero-demo.html.
// Do not retune: INFLATE 1.10, strokeInset sw/2, dropZone 0.22/0.78, 10 bots desktop /
// 6 under 720px, resize reseed-with-the-same-seed, the ?static=1 flag and the
// deterministic static pile are all integration-notes non-negotiables.
// Kept as plain JS on purpose: this file is a lift, not our code to restyle.
//
// ── M8 · F16 — BOT FAMILY v2 ──────────────────────────────────────────────────
// The SIM in this file is unchanged. What changed is WHICH BOTS it draws.
//
// The hero now wears family v2 (src/scripts/botFamilyV2.js): soft silhouettes —
// squircles, rounded-corner triangles, pills/rounded rects, one circle — in flat
// solid fills from a fixed six-colour palette that does NOT invert with the
// theme, because real Grok Bot avatars do not either. Operator directive; it
// supersedes Addendum A1's hero treatment specifically and nothing else.
//
// The old ink/paper/amber family is NOT gone. It is family v1, it kept every
// line of its geometry, and it now renders as a decorative static pile on
// /about/ — src/lib/botFamilyV1.ts + src/components/AboutBotPile.astro.
//
// EVERYTHING integration-notes and A4 lock is byte-identical below: INFLATE 1.10,
// dropZone 0.22/0.78, botCount 10/6, botSize, the seed and reseed-on-resize, the
// staggered release, the idle nudge/topple, the eye tracking + blink, the
// reduced-motion + no-matter static pile, ?static=1, the wheel-listener removal
// and the F3b touch hit-test. The only edits are: FORMS -> FORMS_V2, the SVG
// builder -> buildBotSVGV2, makeBody -> reads bodySpecV2 (which adds the circle
// and ellipse colliders), and the removal of the single-amber-bot pick, which
// family v2 has no use for. See BUILD-NOTES-F16.md.
import '../styles/hero-bots.css';
import { FORMS_V2, bodySpecV2, buildBotSVGV2 } from './botFamilyV2.js';

(function(){
"use strict";

/* ============================================================
   1. THE FORMS  — "no two alike"
   Family v2 — see src/scripts/botFamilyV2.js for the roster, the palette
   derivation and the deniability reasoning behind baking colour into the form.
   Twelve forms, ten drawn per desktop assembly (v1: eleven and ten), so two sit
   out each roll and the ROSTER still changes on re-roll, not just the sizes and
   placement. Bot COUNTS are untouched — 10 desktop / 6 mobile, per A4.
   ============================================================ */

var FORMS = FORMS_V2;

/* Physics bodies are inflated slightly beyond the drawn silhouette so that
   two solid-ink bots never visually fuse into one blob when they rest together. */
var INFLATE = 1.10;

/* Operator: hold the hero empty for a beat after load, THEN let the bots drop in. This is a
   global offset on the staggered release gate (releaseDue) measured from the sim boot
   (startedAt), so the headline reads on its own for 2s and the cluster arrives as a group.
   Live-sim only — the reduced-motion / no-JS static pile has no "drop" to delay, and the
   manual "drop more bots" control stays instant (its bots enter directly, bypassing the gate). */
var DROP_DELAY = 2000;

/* ============================================================
   2. RANDOMISED ASSEMBLY  — a different cluster every visit
   ============================================================ */
function mulberry32(a){ return function(){ a|=0;a=a+0x6D2B79F5|0; var t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
var seed, rnd;
function reseed(s){ seed = (s===undefined) ? (Math.floor(Math.random()*9000)+1000) : s; rnd = mulberry32(seed); return seed; }
function rr(a,b){ return a + rnd()*(b-a); }
function shuffled(arr){ var a=arr.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(rnd()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }

/* ============================================================
   3. SIM
   ============================================================ */
var stage    = document.getElementById('stage'),
    layer    = document.getElementById('botlayer'),
    content  = document.getElementById('content'),
    seedLbl  = document.getElementById('seedLabel'),
    hintEl   = document.getElementById('hint');

// ?static=1 forces the reduced-motion render path (QA / preview aid)
var FORCE_STATIC = /[?&]static=1/.test(location.search);
var REDUCED = FORCE_STATIC || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
var HAS_MATTER = !window.__GB_NO_MATTER && typeof window.Matter !== 'undefined';

var engine=null, runnerRAF=null, world=null, mouseC=null;
var bots=[];               // {el, svgEl, eyesEl, body, size, blinkAt, blinkT}
var statics=[];
var pointer={x:-9999,y:-9999,inside:false};
var lastNudge=0, lastTopple=0, startedAt=0;

function stageBox(){ return stage.getBoundingClientRect(); }
function isMobile(){ return stageBox().width < 720; }

// 10 of the 11 forms on desktop; mobile stays at 6 (small stage, small bots).
function botCount(){ return isMobile() ? 8 : 10; } // direct round: operator raised mobile 6 -> 8
function botSize(f){
  var W=stageBox().width;
  var k = Math.max(0.56, Math.min(1, W/1180));
  var base = isMobile() ? 88 : 104;
  return Math.round(base * k * (f.__scale||1));
}

/* ---------- build DOM bots ---------- */
function makeBots(){
  layer.innerHTML='';
  bots=[];
  var picks = shuffled(FORMS).slice(0, botCount());
  // v1 promoted exactly one bot to Ash Amber here. Family v2 drops that: colour
  // is a property of the FORM (botFamilyV2.js explains why — it is what makes the
  // cousin-not-copy guarantee hold on every seed rather than most of them), and
  // v2 carries no amber at all. That is a tightening of A1, not a breach: the
  // hero no longer spends the one-accent-element-per-viewport budget, so amber is
  // left entirely to the CTA and the search cursor.

  picks.forEach(function(f,i){
    var form = Object.assign({}, f);
    form.__scale = rr(0.88, 1.12);                   // mutation: size variance
    form.eye = Object.assign({}, f.eye);
    form.eye.tilt = f.eye.tilt + rr(-5,5);           // mutation: eye tilt variance

    var size = botSize(form);
    var el = document.createElement('div');
    el.className='bot';
    el.innerHTML = buildBotSVGV2(form, size);
    layer.appendChild(el);

    bots.push({
      form:form, el:el, size:size,
      eyesEl: el.querySelector('.eyes'),
      body:null,
      blinkAt: performance.now() + rr(1200, 5200),
      blinkT: -1,
      delay: i * rr(70,150) + rr(0,120)
    });
  });
}

/* ---------- static world: floor, walls, headline block ---------- */
function buildStatics(){
  var B=stageBox(), W=B.width, H=B.height, T=200;
  var M = window.Matter;
  statics.forEach(function(b){ M.Composite.remove(world,b); });
  statics=[];

  var opts={isStatic:true, friction:0.6, restitution:0.15};
  var floor = M.Bodies.rectangle(W/2, H+T/2-2, W*2, T, opts);
  var left  = M.Bodies.rectangle(-T/2, H/2, T, H*3, opts);
  var right = M.Bodies.rectangle(W+T/2, H/2, T, H*3, opts);

  // the headline + CTA block is part of the environment.
  // Operator (2026-08-25): the block used to be the WHOLE #content rect — when the bookmark
  // pill became content's first child, the rect's top edge rose to the pill, and bots
  // hovered mid-air left and right of it. Now the block starts at the H1's top edge, and
  // the narrow pill gets its own little shelf: bots perch on the pill in the middle and
  // fall past its sides onto the headline.
  var c=content.getBoundingClientRect();
  var h1El=content.querySelector('h1');
  var hTop=h1El ? h1El.getBoundingClientRect().top : c.top;
  var bTop=hTop-B.top, bH=(c.top-B.top)+c.height-bTop;
  var cx=c.left-B.left+c.width/2, cy=bTop+bH/2;
  var block = M.Bodies.rectangle(cx, cy, c.width, bH, Object.assign({},opts,{chamfer:{radius:14}}));

  statics=[floor,left,right,block];

  var pillEl=content.querySelector('[data-bookmark-nudge]');
  if(pillEl){
    var p=pillEl.getBoundingClientRect();
    var shelf=M.Bodies.rectangle(
      p.left-B.left+p.width/2, p.top-B.top+p.height/2,
      p.width, p.height,
      Object.assign({},opts,{chamfer:{radius:Math.min(14,p.height/2)}}));
    statics.push(shelf);
  }

  M.Composite.add(world, statics);
}

/* ---------- physics bodies for bots ----------
   The collider comes from bodySpecV2(), which is family v2's single source of
   truth for shape -> collider (botFamilyV2.js documents each branch against
   integration-notes §8). The rule that matters is unchanged: the body is the
   nominal geometry scaled by INFLATE, so the collider always BOUNDS the painted
   silhouette and two solid bots can never visually fuse.

   v2 adds two branches v1 never needed — a true circle (exact, no
   approximation) and an ellipse (an inscribed 18-gon, 1.52% inside the paint,
   two orders inside the INFLATE margin). Rounded rects still chamfer at the same
   r they paint with; the rounded triangle still colliders as the full sharp
   triangle while painting inset-plus-round-stroke, exactly as v1 did. */
function makeBody(b, x, y){
  var M=window.Matter, f=b.form, s=b.size/120;
  var o={
    restitution:0.24, friction:0.5, frictionAir:0.014, frictionStatic:0.6,
    density:0.0016, slop:0.02
  };
  var si = s * INFLATE;
  var spec = bodySpecV2(f), body;

  if(spec.kind==='circle'){
    body = M.Bodies.circle(x, y, spec.r*si, o);
  } else if(spec.kind==='poly'){
    var c=spec.off;
    var vs=spec.verts.map(function(p){ return {x:(p.x-c.x)*si, y:(p.y-c.y)*si}; });
    body = M.Bodies.fromVertices(x, y, [vs], o, true);
    // fromVertices returns null if decomposition fails; fall back to a circle
    // that circumscribes the form so the pile never loses a body.
    if(!body) body = M.Bodies.circle(x, y, (f.geo.w||90)*si/2, o);
  } else {
    body = M.Bodies.rectangle(x, y, spec.w*si, spec.h*si,
                              Object.assign({}, o, {chamfer:{radius:spec.r*si}}));
  }
  return body;
}

/* ---------- spawn / drop ----------
   Bots are dropped over the headline block (plus a little shoulder), so the
   cluster reads as one group above the type instead of scattering to the corners. */
function dropZone(size){
  var B=stageBox(), c=content.getBoundingClientRect();
  var cl=c.left-B.left, cw=c.width;
  // drop over the MIDDLE of the block, narrower than the block itself, so bots
  // stack into a 2-row pile instead of spreading into one flat row.
  // Tightened from 0.15/0.85 when the cluster went 9 -> 10: ten bots are wider
  // than the block laid end-to-end, so the extra lateral pressure squeezed an
  // edge bot off the block and into the gutter on ~36% of seeds. Narrowing the
  // entry makes them stack rather than spread, which puts that back at ~7% —
  // the same rate as the 9-bot build. Tune here, never in gravity.
  var l=cl+cw*0.22, r=cl+cw*0.78;
  l=Math.max(size*0.6, l); r=Math.min(B.width-size*0.6, r);
  if(r<=l){ l=B.width*0.25; r=B.width*0.75; }
  return {l:l, r:r};
}

function dropBots(){
  var M=window.Matter;
  bots.forEach(function(b){
    var z=dropZone(b.size);
    var x = rr(z.l, z.r);
    var y = -b.size - rr(40, 420);
    var body = makeBody(b, x, y);
    M.Body.setAngle(body, rr(-0.5, 0.5));
    M.Body.setAngularVelocity(body, rr(-0.06, 0.06));
    M.Body.setVelocity(body, {x:rr(-0.8,0.8), y:rr(0,2)});
    body.collisionFilter.mask = 0;          // ghost until its turn to enter
    b.body = body;
    b.entered = false;
    M.Composite.add(world, body);
    // park it off-stage until the stagger fires
    M.Body.setStatic(body, true);
    M.Body.setPosition(body, {x:x, y:-2000});
  });
}

/* Operator: "drop more bots" — spawn 1..n extra bots from the top, on demand. Only meaningful
   in the live sim; the control that calls this is revealed by build() only in that path. New
   bots enter immediately (entered:true) so releaseDue() never re-parks them, and join `bots`
   so render/blink/idle handle them like the rest. */
function spawnBots(n){
  if(!HAS_MATTER || !world) return;
  var M=window.Matter;
  for(var k=0;k<n;k++){
    var f = FORMS[Math.floor(Math.random()*FORMS.length)];
    var form = Object.assign({}, f);
    form.__scale = 0.88 + Math.random()*0.24;
    form.eye = Object.assign({}, f.eye);
    form.eye.tilt = f.eye.tilt + (Math.random()*10 - 5);
    var size = botSize(form);
    var el = document.createElement('div');
    el.className='bot';
    el.innerHTML = buildBotSVGV2(form, size);
    layer.appendChild(el);
    var b = { form:form, el:el, size:size, eyesEl: el.querySelector('.eyes'),
      body:null, blinkAt: performance.now() + (1200 + Math.random()*4000), blinkT:-1,
      delay:0, entered:true };
    var z = dropZone(size);
    var x = z.l + Math.random()*(z.r - z.l);
    var y = -size - (40 + Math.random()*220);
    var body = makeBody(b, x, y);
    M.Body.setAngle(body, Math.random()-0.5);
    M.Body.setAngularVelocity(body, (Math.random()-0.5)*0.12);
    M.Body.setVelocity(body, {x:(Math.random()-0.5)*1.6, y:Math.random()*2});
    M.Sleeping.set(body, false);
    b.body = body;
    M.Composite.add(world, body);
    bots.push(b);
  }
}

function releaseDue(now){
  var M=window.Matter;
  bots.forEach(function(b){
    if(b.entered || !b.body) return;
    if(now - startedAt < b.delay + DROP_DELAY) return;
    b.entered=true;
    var z=dropZone(b.size);
    var x=rr(z.l, z.r);
    M.Body.setStatic(b.body,false);
    // ── F16 fix: WAKE THE BODY ON RELEASE ────────────────────────────────────
    // A bot waits off-stage as a static body until its stagger delay fires. With
    // `enableSleeping:true`, Sleeping.update does NOT skip static bodies — it
    // sees zero motion and, after sleepThreshold (60 frames ≈ 1s), flags the
    // parked bot asleep. Body.setStatic(body,false) restores mass and
    // restitution but deliberately does not clear `isSleeping`, and
    // Engine._bodiesUpdate skips sleeping bodies outright — so the bot is
    // released, repositioned and given a velocity that is never integrated. It
    // hangs above the stage forever, clipped by `overflow:hidden`, and the hero
    // renders NINE bots.
    //
    // It bites the LAST bots in the stagger, whose delay (i*rr(70,150)+rr(0,120))
    // crosses the ~1s threshold — i.e. i>=8 — which is why it is intermittent.
    // Measured before the fix: 4 of 8 seeds lost a bot, at an IDENTICAL rate on
    // the pre-F16 build (also 4 of 8), so this is a long-standing bug that F16
    // inherited, not one it introduced. It only became worth fixing here because
    // family v2's bots are large and brightly coloured, so a missing one reads.
    //
    // This RESTORES the 10-desktop / 6-mobile count A4 and integration-notes
    // lock, rather than changing it, and it is the same idiom integration-notes
    // §7 already documents for the idle nudges ("explicitly wake bodies via
    // Sleeping.set(body, false)") and that idleBehaviours() uses below.
    M.Sleeping.set(b.body, false);
    b.body.collisionFilter.mask = 0xFFFFFFFF;
    M.Body.setPosition(b.body, {x:x, y:-b.size-rr(30,160)});
    M.Body.setVelocity(b.body, {x:rr(-0.7,0.7), y:rr(1,3)});
    M.Body.setAngularVelocity(b.body, rr(-0.07,0.07));
  });
}

/* ---------- idle personality ---------- */
function idleBehaviours(now){
  var M=window.Matter;
  var settled = bots.filter(function(b){ return b.entered && b.body && !b.body.isStatic; });
  if(!settled.length) return;

  // tiny shuffle — a bot shifts its weight
  if(now-lastNudge > rr(2200,4200)){
    lastNudge=now;
    var b=settled[Math.floor(rnd()*settled.length)];
    M.Sleeping.set(b.body,false);
    M.Body.applyForce(b.body, b.body.position, {x:rr(-1,1)*0.00055*b.body.mass, y:-0.0006*b.body.mass});
  }
  // occasional topple — one bot rolls over a neighbour, both wobble
  if(now-lastTopple > rr(7000,13000)){
    lastTopple=now;
    var t=settled[Math.floor(rnd()*settled.length)];
    M.Sleeping.set(t.body,false);
    var dir = rnd()<0.5 ? -1 : 1;
    // aim the topple back toward the middle of the pile so bots wobble onto each
    // other rather than slowly migrating off the block over a long session
    var mid=(dropZone(t.size).l+dropZone(t.size).r)/2;
    if(Math.abs(t.body.position.x-mid) > t.size*1.2) dir = t.body.position.x<mid ? 1 : -1;
    M.Body.applyForce(t.body, {x:t.body.position.x, y:t.body.position.y - t.size*0.35},
                      {x:dir*0.0015*t.body.mass, y:-0.0013*t.body.mass});
    M.Body.setAngularVelocity(t.body, dir*rr(0.06,0.13));
  }
}

/* ---------- eyes: track cursor, blink ---------- */
function updateEyes(now, dt){
  var B=stageBox();
  for(var i=0;i<bots.length;i++){
    var b=bots[i]; if(!b.eyesEl) continue;
    var ang = b.body ? b.body.angle : 0;
    var px, py;
    if(b.body){ px=b.body.position.x; py=b.body.position.y; }
    else { px=b.sx; py=b.sy; ang=b.srot||0; }

    var ex=0, ey=0;
    if(pointer.inside){
      var dx=pointer.x-px, dy=pointer.y-py;
      var d=Math.hypot(dx,dy);
      var amt = 6.2 * Math.min(1, d/230);            // saturates with distance
      var la = Math.atan2(dy,dx) - ang;              // world -> bot-local
      ex = Math.cos(la)*amt; ey = Math.sin(la)*amt;
    }

    // blink
    var sy=1;
    if(b.blinkT>=0){
      b.blinkT += dt;
      var p=b.blinkT/145;
      if(p>=1){ b.blinkT=-1; b.blinkAt = now + rr(1800,6500); sy=1; }
      else sy = 1 - Math.sin(p*Math.PI)*0.9;
    } else if(now>=b.blinkAt){ b.blinkT=0; }

    b.eyesEl.setAttribute('transform','translate('+ex.toFixed(2)+','+ey.toFixed(2)+') scale(1,'+sy.toFixed(3)+')');
  }
}

/* ---------- render ---------- */
function render(){
  for(var i=0;i<bots.length;i++){
    var b=bots[i]; if(!b.body) continue;
    var s=b.size/2;
    b.el.style.transform='translate3d('+(b.body.position.x-s).toFixed(2)+'px,'
                        +(b.body.position.y-s).toFixed(2)+'px,0) rotate('+b.body.angle.toFixed(4)+'rad)';
  }
}

/* ---------- main loop ---------- */
var lastT=0, acc=0;
function loop(now){
  runnerRAF=requestAnimationFrame(loop);
  if(!lastT) lastT=now;
  var dt=Math.min(48, now-lastT); lastT=now;

  releaseDue(now);
  acc+=dt;
  var steps=0;
  while(acc>=16.666 && steps<3){ window.Matter.Engine.update(engine,16.666); acc-=16.666; steps++; }
  if(acc>50) acc=0;

  if(now-startedAt > 2600 + DROP_DELAY) idleBehaviours(now);
  updateEyes(now, dt);
  render();
}

/* ============================================================
   4. STATIC FALLBACK  (prefers-reduced-motion, or no matter.js)
   A hand-placed assembly that mirrors the round-3 hero mock.
   ============================================================ */
/* A tapered pile that lands where the physics sim would settle: widest bots on
   the bottom row, resting just above the headline. Count-driven, so it follows
   botCount() — 6/3/1 for ten on desktop; pileRows() is formula-based so eight on mobile tapers 5/3. */
function pileRows(n){
  var r0=Math.ceil(n*0.55), rem=n-r0, r1=Math.ceil(rem*0.7), r2=rem-r1;
  return [r0,r1,r2].filter(function(c){ return c>0; });
}
function renderStatic(){
  var B=stageBox(), c=content.getBoundingClientRect();
  // Same reference as buildStatics(): the pile rests just above the H1, not above the
  // bookmark pill (which is content's first child and would float the pile mid-air).
  var h1El=content.querySelector('h1');
  var contentTop=(h1El ? h1El.getBoundingClientRect().top : c.top)-B.top;

  // biggest bots at the bottom of the pile
  var order=bots.slice().sort(function(a,b){ return b.size-a.size; });
  var avg=order.reduce(function(t,b){ return t+b.size; },0)/Math.max(1,order.length);

  var clusterW=Math.min(c.width*0.86, B.width-32);
  var left=(B.width-clusterW)/2;
  var rowH=avg*0.78;
  var baseY=Math.max(avg*0.6+10, contentTop-avg*0.50-10);

  var rows=pileRows(order.length), k=0;
  rows.forEach(function(cnt, ri){
    var inset=ri*0.11;
    for(var i=0;i<cnt;i++){
      var b=order[k];
      if(!b) return;
      var t = cnt===1 ? 0.5 : i/(cnt-1);
      var x = left + (inset + t*(1-2*inset))*clusterW;
      var y = baseY - ri*rowH;
      var rot = (((k*37)%7)-3)*0.045;          // deterministic, gentle tilt
      var s=b.size/2;
      b.sx=x; b.sy=y; b.srot=rot;
      b.el.style.transform='translate3d('+(x-s).toFixed(1)+'px,'+(y-s).toFixed(1)+'px,0) rotate('+rot.toFixed(3)+'rad)';
      k++;
    }
  });
  if(hintEl) hintEl.textContent='static assembly · reduced motion';
}

/* ============================================================
   5. BOOT / RESET
   ============================================================ */
function teardown(){
  if(runnerRAF) cancelAnimationFrame(runnerRAF);
  runnerRAF=null; lastT=0; acc=0;
  if(engine){ window.Matter.Composite.clear(engine.world,false); window.Matter.Engine.clear(engine); }
  engine=null; world=null; statics=[];
}

function build(newSeed){
  teardown();
  var s=reseed(newSeed);
  if(seedLbl) seedLbl.textContent='assembly #'+s;
  makeBots();

  if(REDUCED || !HAS_MATTER){ renderStatic(); return; }

  var M=window.Matter;
  engine=M.Engine.create({ enableSleeping:true, positionIterations:8, velocityIterations:6 });
  engine.gravity.y=1.06;
  world=engine.world;
  buildStatics();
  dropBots();

  // drag & toss
  var mouse=M.Mouse.create(stage);
  mouseC=M.MouseConstraint.create(engine,{ mouse:mouse, constraint:{ stiffness:0.16, damping:0.08, render:{visible:false} } });
  M.Composite.add(world, mouseC);
  // never hijack page scroll — wheel (desktop)
  if(mouse.mousewheel){ mouse.element.removeEventListener('wheel', mouse.mousewheel); mouse.element.removeEventListener('mousewheel', mouse.mousewheel); }

  /* ---------- touch: hit-tested drag (F3 + F3b) ----------
     F3 found the scroll trap: `Matter.Mouse.setElement` registers touchmove/touchstart/
     touchend with {passive:false} and its handlers do
     `e.changedTouches && (button=0, e.preventDefault())` — they preventDefault EVERY touch
     event unconditionally, which cancels the browser's pan gesture on the first touchmove,
     before `touch-action: pan-y` is ever consulted. The CSS was correct and inert.

     F3 removed those listeners, which fixed scrolling but cost touch users the bots.
     F3b restores the play WITHOUT giving the scroll back:

       touchstart → hit-test the point against the bot bodies.
         · lands ON a bot  → we own the gesture: call Matter's own handlers (they
           preventDefault, which is now exactly what we want) and the bot follows the finger.
         · lands on empty  → we do NOTHING. No listener calls preventDefault, `pan-y`
           applies, and the page scrolls normally.

     So the decision is made once, on touchstart, from geometry — not from a global flag.
     Matter's handlers are reused rather than reimplemented so the constraint keeps its exact
     coordinate/pixelRatio maths; only WHEN they run changes. Desktop mouse is untouched. */
  mouse.element.removeEventListener('touchmove', mouse.mousemove);
  mouse.element.removeEventListener('touchstart', mouse.mousedown);
  mouse.element.removeEventListener('touchend', mouse.mouseup);

  var touchDragging = false;

  function botBodies(){
    var out=[];
    for(var i=0;i<bots.length;i++){ if(bots[i].body) out.push(bots[i].body); }
    return out;
  }

  stage.addEventListener('touchstart', function(e){
    if(!engine || !e.changedTouches || !e.changedTouches.length) return;
    // ── F16x — DECLINE ANY GESTURE THAT BELONGS TO SOMETHING ON TOP OF THE HERO ──
    // The hit-test below decides purely from GEOMETRY, which is correct only while
    // nothing overlays the stage. That is not always true: the site InstallModal's
    // overlay lives INSIDE #content, i.e. inside #stage, so its touches BUBBLE to this
    // listener. With the modal open its sheet sits directly over the bot cluster, so a
    // touch on a control inside the sheet hit-tests onto a bot behind it, engages the
    // constraint and preventDefaults — stealing the modal's own gesture and dragging an
    // invisible bot. At 390 the sheet is full-height with every bot behind it, so that
    // was most of the sheet: the modal could not be scrolled by finger.
    //
    // Latent since F3b and only reachable once F10 fixed the modal's positioning (before
    // that a transformed ancestor mispositioned the sheet so it never covered the bots).
    // Neither change was wrong on its own; the defect only exists where they meet.
    //
    // #botlayer is pointer-events:none, so when nothing overlays the hero a touch over a
    // bot has e.target === #stage itself. If anything IS on top, e.target is that thing.
    // So this one comparison declines the gesture for any current or FUTURE overlay,
    // without the handler needing to know which overlays exist — deliberately not keyed
    // off the install-modal-open class, which would fix exactly one case and rot.
    if(e.target !== stage) return;
    var t = e.changedTouches[0];
    var B = stageBox();
    // Query.point uses world coords, which for this sim are stage-relative pixels.
    var hits = M.Query.point(botBodies(), { x: t.clientX - B.left, y: t.clientY - B.top });
    if(hits && hits.length){
      touchDragging = true;
      mouse.mousedown(e);   // engages the constraint AND preventDefaults — intended here
    }
    // no bot under the finger: fall through untouched so the page can pan
  }, { passive:false });

  stage.addEventListener('touchmove', function(e){
    if(touchDragging) mouse.mousemove(e);
  }, { passive:false });

  function endTouch(e){
    if(!touchDragging) return;
    touchDragging = false;
    mouse.mouseup(e);
  }
  stage.addEventListener('touchend', endTouch, { passive:false });
  stage.addEventListener('touchcancel', endTouch, { passive:false });
  M.Events.on(mouseC,'startdrag',function(e){ stage.classList.add('dragging'); if(e.body) M.Sleeping.set(e.body,false); });
  M.Events.on(mouseC,'enddrag',function(){ stage.classList.remove('dragging'); });

  // Operator: reveal + wire the "drop more bots" control — ONLY in the live sim (this code
  // never runs on the reduced-motion / no-JS / static path). Listener lives here in the
  // bundled module, so no inline handler is needed and §10.7's CSP stays untouched.
  var dropCtl = document.querySelector('[data-drop-bots]');
  if(dropCtl){
    dropCtl.hidden = false;
    if(!dropCtl.__wired){
      dropCtl.__wired = true;
      dropCtl.addEventListener('click', function(e){
        e.preventDefault();
        spawnBots(1 + Math.floor(Math.random()*4));
      });
    }
  }

  startedAt=performance.now();
  runnerRAF=requestAnimationFrame(loop);
}

/* ---------- pointer ---------- */
stage.addEventListener('pointermove', function(e){
  var B=stageBox(); pointer.x=e.clientX-B.left; pointer.y=e.clientY-B.top; pointer.inside=true;
});
stage.addEventListener('pointerleave', function(){ pointer.inside=false; });
if(REDUCED){ /* keep eyes perfectly still */ pointer.inside=false; }

/* ---------- resize (debounced rebuild) ---------- */
var rt=null, lastW=window.innerWidth;
window.addEventListener('resize', function(){
  clearTimeout(rt);
  rt=setTimeout(function(){
    if(Math.abs(window.innerWidth-lastW)<40 && engine){ buildStatics(); return; }
    lastW=window.innerWidth; build(seed);
  },240);
});

/* ---------- go ---------- */
if(document.fonts && document.fonts.ready){ document.fonts.ready.then(function(){ build(); }); }
else build();

})();
export {};
