/* eslint-disable */
// Addendum A4 (BINDING) — lifted VERBATIM from assets/hero-animation/hero-demo.html.
// Do not retune: INFLATE 1.10, strokeInset sw/2, dropZone 0.22/0.78, 10 bots desktop /
// 6 under 720px, resize reseed-with-the-same-seed, the ?static=1 flag and the
// deterministic static pile are all integration-notes non-negotiables.
// Kept as plain JS on purpose: this file is a lift, not our code to restyle.

(function(){
"use strict";

/* ============================================================
   1. THE FORMS  — "no two alike"
   Recreated as inline SVG from round-3 hero cluster.
   Every shape carries the family DNA: two tilted slash eyes.
   Coordinate space: ~120x120 units, centred on the shape bbox.
   Eleven forms, ten drawn per desktop assembly — one sits out each roll, so
   re-roll still changes the ROSTER and not just the sizes and placement.
   ============================================================ */

var FORMS = [
  { id:'squircle',   style:'solid',    geo:{t:'rect', w:88,  h:80,  r:26},  eye:{cy:2,   gap:36, w:15, h:27, tilt:20} },
  { id:'squircleXL', style:'outline',  geo:{t:'rect', w:100, h:93,  r:31},  eye:{cy:4,   gap:40, w:16, h:29, tilt:23}, sw:7 },
  { id:'hexagon',    style:'solid',    geo:{t:'hex',  w:100, h:86},         eye:{cy:2,   gap:38, w:15, h:26, tilt:17} },
  { id:'pill',       style:'solid',    geo:{t:'rect', w:88,  h:46,  r:23},  eye:{cy:0,   gap:32, w:13, h:22, tilt:22} },
  { id:'diamond',    style:'halftone', geo:{t:'diamond', w:94},             eye:{cy:2,   gap:35, w:14, h:24, tilt:19}, sw:3 },
  { id:'capsule',    style:'solid',    geo:{t:'rect', w:48,  h:104, r:24},  eye:{cy:26,  gap:26, w:12, h:22, tilt:24} },
  { id:'arch',       style:'outline',  geo:{t:'arch', w:78,  h:100},        eye:{cy:-8,  gap:34, w:15, h:26, tilt:18}, sw:7 },
  { id:'triangle',   style:'solid',    geo:{t:'tri',  w:96,  h:78},         eye:{cy:14,  gap:31, w:13, h:21, tilt:21} },
  { id:'wideRect',   style:'outline',  geo:{t:'rect', w:114, h:56,  r:28},  eye:{cy:0,   gap:38, w:14, h:23, tilt:25} , sw:6 },
  // --- round-3 family, second pass: one faceted, one upright. Both are chosen
  // symmetric about BOTH axes so their centroid is the origin — the drawn shape
  // and the physics body share one frame, no offset correction needed.
  { id:'octagon',    style:'outline',  geo:{t:'oct',  w:98,  h:90},        eye:{cy:2,   gap:37, w:15, h:26, tilt:18}, sw:6, strokeInset:true },
  { id:'tallHex',    style:'solid',    geo:{t:'vhex', w:70,  h:104},       eye:{cy:-6,  gap:30, w:13, h:23, tilt:20} }
];

/* Physics bodies are inflated slightly beyond the drawn silhouette so that
   two solid-ink bots never visually fuse into one blob when they rest together. */
var INFLATE = 1.10;

/* ---------- geometry helpers ---------- */
function hexVerts(w,h){ return [ {x:-w/2,y:0},{x:-w/4,y:-h/2},{x:w/4,y:-h/2},{x:w/2,y:0},{x:w/4,y:h/2},{x:-w/4,y:h/2} ]; }
// upright hexagon: points top & bottom, flat sides — reads as a distinct
// silhouette next to the wide flat-top hex above.
function vhexVerts(w,h){ return [ {x:0,y:-h/2},{x:w/2,y:-h/4},{x:w/2,y:h/4},{x:0,y:h/2},{x:-w/2,y:h/4},{x:-w/2,y:-h/4} ]; }
// octagon: rectangle with the corners cut by `c` of each half-axis. Clockwise
// in screen space (y down), as matter.js requires.
function octVerts(w,h,c){
  var x=w/2, y=h/2, cx=w*(c||0.29), cy=h*(c||0.29);
  return [ {x:-x+cx,y:-y},{x:x-cx,y:-y},{x:x,y:-y+cy},{x:x,y:y-cy},
           {x:x-cx,y:y},{x:-x+cx,y:y},{x:-x,y:y-cy},{x:-x,y:-y+cy} ];
}
function diamondVerts(w){ var a=w/2; return [ {x:0,y:-a},{x:a,y:0},{x:0,y:a},{x:-a,y:0} ]; }
function triVerts(w,h){ return [ {x:0,y:-h/2},{x:w/2,y:h/2},{x:-w/2,y:h/2} ]; }
function archVerts(w,h){
  // flat-bottomed arch: semicircular cap + straight sides
  var r=w/2, v=[], N=22, topY=-h/2+r, botY=h/2;
  for(var i=0;i<=N;i++){ var a=Math.PI + (i/N)*Math.PI; v.push({x:r*Math.cos(a), y:topY + r*Math.sin(a)}); }
  v.push({x:r,y:botY}); v.push({x:-r,y:botY});
  return v;
}
function centroidOf(v){
  var a=0,cx=0,cy=0;
  for(var i=0;i<v.length;i++){ var p=v[i],q=v[(i+1)%v.length], f=p.x*q.y-q.x*p.y; a+=f; cx+=(p.x+q.x)*f; cy+=(p.y+q.y)*f; }
  a*=0.5; if(Math.abs(a)<1e-9) return {x:0,y:0};
  return {x:cx/(6*a), y:cy/(6*a)};
}
function ptsAttr(v,ox,oy){ return v.map(function(p){ return (p.x-ox).toFixed(2)+','+(p.y-oy).toFixed(2); }).join(' '); }

function formVerts(f){
  var g=f.geo;
  if(g.t==='hex') return hexVerts(g.w,g.h);
  if(g.t==='vhex') return vhexVerts(g.w,g.h);
  if(g.t==='oct') return octVerts(g.w,g.h,g.c);
  if(g.t==='diamond') return diamondVerts(g.w);
  if(g.t==='tri') return triVerts(g.w,g.h);
  if(g.t==='arch') return archVerts(g.w,g.h);
  return null; // rect
}

/* ---------- SVG builder ---------- */
function eyesMarkup(e){
  var hx=e.gap/2, rx=e.w/2;
  function slash(sx){
    return '<rect class="eye" x="'+(-rx)+'" y="'+(-e.h/2)+'" width="'+e.w+'" height="'+e.h+'" rx="'+rx+'"'
         + ' transform="translate('+sx+','+e.cy+') rotate('+e.tilt+')"/>';
  }
  return slash(-hx)+slash(hx);
}

function buildBotSVG(f, size){
  var g=f.geo, sw=f.sw||0, off={x:0,y:0}, shape='';
  var verts=formVerts(f);
  if(verts){ off=centroidOf(verts); }

  // A stroke is painted centred on the path, i.e. it bleeds sw/2 OUTSIDE the
  // geometry the physics body uses. Inset the drawn path by sw/2 so the painted
  // silhouette equals the nominal geometry — otherwise neighbours visually overlap.
  if(g.t==='rect'){
    var iw=g.w-sw, ih=g.h-sw, ir=Math.max(1,g.r-sw/2);
    shape='<rect x="'+(-iw/2)+'" y="'+(-ih/2)+'" width="'+iw+'" height="'+ih+'" rx="'+ir+'"'
        + (sw?' stroke-width="'+sw+'"':'')+'/>';
  } else if(g.t==='tri'){
    // rounded corners via a fat round-joined stroke; verts pulled in to the
    // incircle offset so stroke-outer-edge lands back on the nominal triangle
    var TSW=16, k=f.inset||0.70;
    var tv=verts.map(function(p){ return {x:(p.x-off.x)*k, y:(p.y-off.y)*k}; });
    shape='<polygon points="'+tv.map(function(p){return p.x.toFixed(2)+','+p.y.toFixed(2);}).join(' ')
        + '" class="rt" stroke-width="'+TSW+'" stroke-linejoin="round"/>';
  } else {
    var pv=verts;
    // Same rule as the rect branch above: an SVG stroke paints CENTRED on the
    // path, so it bleeds sw/2 OUTSIDE the geometry the physics body uses. Scale
    // the drawn polygon toward its centroid until every edge has come in by at
    // least sw/2 — the painted silhouette then never exceeds the nominal shape.
    // Opt-in per form so the already-tuned arch/diamond render byte-identically.
    if(sw && f.strokeInset){
      var dmin=Infinity, vi, p, q;
      for(vi=0; vi<verts.length; vi++){
        p=verts[vi]; q=verts[(vi+1)%verts.length];
        var ex=q.x-p.x, ey=q.y-p.y, L=Math.hypot(ex,ey);
        if(L<1e-6) continue;
        var d=Math.abs((p.x-off.x)*ey-(p.y-off.y)*ex)/L;   // centroid -> edge
        if(d<dmin) dmin=d;
      }
      if(isFinite(dmin) && dmin>sw){
        var ik=1-(sw/2)/dmin;
        pv=verts.map(function(pt){ return {x:off.x+(pt.x-off.x)*ik, y:off.y+(pt.y-off.y)*ik}; });
      }
    }
    shape='<polygon points="'+ptsAttr(pv,off.x,off.y)+'"'+(sw?' stroke-width="'+sw+'" stroke-linejoin="round"':'')+'/>';
  }

  var inner = shape + '<g class="eyes" transform="translate(0,0)">'+eyesMarkup(f.eye)+'</g>';
  return '<svg width="'+size+'" height="'+size+'" viewBox="-60 -60 120 120">'
       + '<g class="s-'+f.style+'" transform="translate('+(-off.x).toFixed(2)+','+(-off.y).toFixed(2)+')">'
       + inner + '</g></svg>';
}

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
function botCount(){ return isMobile() ? 6 : 10; }
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
  var accentIdx = Math.floor(rnd()*picks.length);   // exactly ONE bot wears Ash Amber

  picks.forEach(function(f,i){
    var form = Object.assign({}, f);
    form.__scale = rr(0.88, 1.12);                   // mutation: size variance
    form.eye = Object.assign({}, f.eye);
    form.eye.tilt = f.eye.tilt + rr(-5,5);           // mutation: eye tilt variance
    if(i===accentIdx && form.style==='solid') form.style='accent';

    var size = botSize(form);
    var el = document.createElement('div');
    el.className='bot';
    el.innerHTML = buildBotSVG(form, size);
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
  var c=content.getBoundingClientRect();
  var cx=c.left-B.left+c.width/2, cy=c.top-B.top+c.height/2;
  var block = M.Bodies.rectangle(cx, cy, c.width, c.height, Object.assign({},opts,{chamfer:{radius:14}}));

  statics=[floor,left,right,block];
  M.Composite.add(world, statics);
}

/* ---------- physics bodies for bots ---------- */
function makeBody(b, x, y){
  var M=window.Matter, f=b.form, g=f.geo, s=b.size/120;
  var o={
    restitution:0.24, friction:0.5, frictionAir:0.014, frictionStatic:0.6,
    density:0.0016, slop:0.02
  };
  var si = s * INFLATE;
  var verts=formVerts(f), body;
  if(verts){
    var c=centroidOf(verts);
    var vs=verts.map(function(p){ return {x:(p.x-c.x)*si, y:(p.y-c.y)*si}; });
    body = M.Bodies.fromVertices(x, y, [vs], o, true);
    if(!body) body = M.Bodies.circle(x,y,(g.w||90)*si/2,o);
  } else {
    body = M.Bodies.rectangle(x, y, g.w*si, g.h*si, Object.assign({}, o, {chamfer:{radius:g.r*si}}));
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

function releaseDue(now){
  var M=window.Matter;
  bots.forEach(function(b){
    if(b.entered || !b.body) return;
    if(now - startedAt < b.delay) return;
    b.entered=true;
    var z=dropZone(b.size);
    var x=rr(z.l, z.r);
    M.Body.setStatic(b.body,false);
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

  if(now-startedAt > 2600) idleBehaviours(now);
  updateEyes(now, dt);
  render();
}

/* ============================================================
   4. STATIC FALLBACK  (prefers-reduced-motion, or no matter.js)
   A hand-placed assembly that mirrors the round-3 hero mock.
   ============================================================ */
/* A tapered pile that lands where the physics sim would settle: widest bots on
   the bottom row, resting just above the headline. Count-driven, so it follows
   botCount() — 6/3/1 for ten on desktop, 4/2 for six on mobile. */
function pileRows(n){
  var r0=Math.ceil(n*0.55), rem=n-r0, r1=Math.ceil(rem*0.7), r2=rem-r1;
  return [r0,r1,r2].filter(function(c){ return c>0; });
}
function renderStatic(){
  var B=stageBox(), c=content.getBoundingClientRect();
  var contentTop=c.top-B.top;

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
