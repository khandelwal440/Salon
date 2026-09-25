"use client";
import { useEffect, useRef } from "react";
import { gsap, reduced, splitText, burst, buzz, clamp } from "./fx";
import { pal, advance, onPaint } from "./palette";
import { Scissors } from "./Props";

type Pt = { x: number; y: number; px: number; py: number; ox?: number; oy?: number; cx?: number; cy?: number };
type Strand = { ax: number; pts: Pt[]; full: number; col: number; w: number; grow: number };
type Piece = { pts: Pt[]; col: number; w: number; life: number };

/**
 * The hero is a curtain of dyed hair drawn on a canvas.
 * Drag across it to comb it. Tap to snip: the locks under your finger fall,
 * the whole site switches colour, and the hair slowly grows back.
 */
export default function HairHero() {
  const sec = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const sc = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = sec.current!,
      canvas = cv.current!,
      ctx = canvas.getContext("2d")!;
    const RM = reduced();
    const chars = splitText(hero.querySelector<HTMLElement>("h1"));
    let W = 0,
      H = 0,
      dpr = 1,
      SEG = 14;
    let strands: Strand[] = [];
    const pieces: Piece[] = [];
    const m = { x: -999, y: -999, vx: 0, vy: 0, on: false };
    let wind = 0,
      t = 0,
      raf = 0,
      anchorY = -6,
      started = false,
      visible = true,
      snips = 0,
      lastScroll = scrollY;
    let hair = pal(0).hair;

    function build() {
      const r = hero.getBoundingClientRect();
      W = r.width;
      H = r.height;
      dpr = Math.min(devicePixelRatio || 1, W < 700 ? 1.6 : 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      SEG = W < 700 ? 13 : 16;
      if (!started) anchorY = RM ? -6 : -H * 0.95;
      const gap = W < 700 ? 9 : 11;
      const n = Math.min(170, Math.floor(W / gap) + 2);
      strands = [];
      let lockCol = 0,
        lockLeft = 0;
      for (let i = 0; i < n; i++) {
        if (lockLeft-- <= 0) {
          lockCol = Math.random() < 0.46 ? 0 : 1 + Math.floor(Math.random() * 3);
          lockLeft = 3 + Math.floor(Math.random() * 7);
        }
        const ax = (i / (n - 1)) * (W + 20) - 10 + (Math.random() * 4 - 2);
        const u = ax / W - 0.5; // -0.5..0.5
        // curtain fringe: short in the middle, long at the sides
        const frac = (W < 700 ? 0.34 : 0.3) + Math.pow(Math.abs(u) * 2, 1.6) * (W < 700 ? 0.36 : 0.42) + Math.random() * 0.06;
        const count = Math.max(4, Math.round((H * frac) / SEG));
        const pts: Pt[] = [];
        for (let k = 0; k < count; k++) {
          // start bunched above the top edge so the hair drops in
          const y = anchorY + k * SEG;
          pts.push({ x: ax, y, px: ax, py: y });
        }
        strands.push({ ax, pts, full: count, col: lockCol, w: 3.4 + Math.random() * 2.6, grow: 0 });
      }
    }

    function step(dt: number) {
      t += dt;
      const g = 0.42;
      const sway = Math.sin(t * 0.9) * 0.05;
      wind *= 0.94;
      for (const s of strands) {
        const P = s.pts;
        P[0].x = s.ax;
        P[0].y = anchorY;
        for (let k = 1; k < P.length; k++) {
          const p = P[k];
          const vx = (p.x - p.px) * 0.985,
            vy = (p.y - p.py) * 0.985;
          p.ox = p.x;
          p.oy = p.y;
          p.x += vx + sway * (k / P.length) + wind * (k / P.length) + Math.sin(t * 1.7 + s.ax * 0.02 + k * 0.3) * 0.03;
          p.y += vy + g;
          if (m.on) {
            const dx = p.x - m.x,
              dy = p.y - m.y,
              d = Math.hypot(dx, dy),
              R = W < 700 ? 54 : 70;
            if (d < R && d > 0.01) {
              const f = (R - d) / R;
              p.x += (dx / d) * f * 7 + m.vx * f * 0.35;
              p.y += (dy / d) * f * 3 + m.vy * f * 0.2;
            }
          }
        }
        // dynamic follow-the-leader (Mueller et al.): inextensible and stable
        for (let k = 1; k < P.length; k++) {
          const a = P[k - 1],
            b = P[k];
          const dx = b.x - a.x,
            dy = b.y - a.y,
            d = Math.hypot(dx, dy) || 1;
          const nx = a.x + (dx / d) * SEG,
            ny = a.y + (dy / d) * SEG;
          b.cx = nx - b.x;
          b.cy = ny - b.y;
          b.x = nx;
          b.y = ny;
        }
        for (let k = 1; k < P.length; k++) {
          const p = P[k],
            nx = P[k + 1];
          const cx = nx ? nx.cx || 0 : 0,
            cy = nx ? nx.cy || 0 : 0;
          p.px = p.x - (p.x - (p.ox as number) - 0.9 * cx);
          p.py = p.y - (p.y - (p.oy as number) - 0.9 * cy);
        }
        // regrow
        if (P.length < s.full) {
          s.grow += dt;
          if (s.grow > 1.6) {
            s.grow = 1.52;
            const a = P[P.length - 1],
              b = P[P.length - 2] || { x: a.x, y: a.y - SEG };
            const nx = a.x + (a.x - b.x),
              ny = a.y + (a.y - b.y);
            P.push({ x: nx, y: ny, px: nx, py: ny });
          }
        } else s.grow = 0;
      }
      for (let i = pieces.length - 1; i >= 0; i--) {
        const pc = pieces[i];
        pc.life += dt;
        for (const p of pc.pts) {
          const vx = (p.x - p.px) * 0.99,
            vy = (p.y - p.py) * 0.99;
          p.px = p.x;
          p.py = p.y;
          p.x += vx;
          p.y += vy + 0.5;
        }
        for (let k = 1; k < pc.pts.length; k++) {
          const a = pc.pts[k - 1],
            b = pc.pts[k];
          const dx = b.x - a.x,
            dy = b.y - a.y,
            d = Math.hypot(dx, dy) || 1;
          b.x = a.x + (dx / d) * SEG;
          b.y = a.y + (dy / d) * SEG;
        }
        if (pc.life > 2.4 || pc.pts[0].y > H + 400) pieces.splice(i, 1);
      }
    }

    function path(P: Pt[], ox = 0, oy = 0) {
      ctx.beginPath();
      ctx.moveTo(P[0].x + ox, P[0].y + oy);
      for (let k = 1; k < P.length - 1; k++) {
        const mx = (P[k].x + P[k + 1].x) / 2,
          my = (P[k].y + P[k + 1].y) / 2;
        ctx.quadraticCurveTo(P[k].x + ox, P[k].y + oy, mx + ox, my + oy);
      }
      const l = P[P.length - 1];
      ctx.lineTo(l.x + ox, l.y + oy);
    }

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      // soft cast shadow for depth
      ctx.globalAlpha = 0.16;
      ctx.strokeStyle = "#000";
      for (const s of strands) {
        if (s.pts.length < 2) continue;
        ctx.lineWidth = s.w + 1;
        path(s.pts, 7, 12);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      const all: { pts: Pt[]; col: number; w: number; a: number }[] = [
        ...strands.map((s) => ({ pts: s.pts, col: s.col, w: s.w, a: 1 })),
        ...pieces.map((p) => ({ pts: p.pts, col: p.col, w: p.w, a: clamp(1.9 - p.life * 0.8) })),
      ];
      for (const s of all) {
        if (s.pts.length < 2) continue;
        ctx.globalAlpha = s.a;
        ctx.strokeStyle = hair[s.col % hair.length];
        ctx.lineWidth = s.w;
        path(s.pts);
        ctx.stroke();
      }
      // glossy highlight
      ctx.strokeStyle = "#fff";
      for (const s of all) {
        if (s.pts.length < 3) continue;
        ctx.globalAlpha = 0.28 * s.a;
        ctx.lineWidth = s.w * 0.3;
        path(s.pts, -s.w * 0.22, 0);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    let last = performance.now();
    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (visible) {
        // substeps keep it stable at 120 Hz and 30 Hz alike
        const n = Math.max(1, Math.round(dt * 60));
        for (let i = 0; i < n; i++) step(1 / 60);
        m.vx *= 0.8;
        m.vy *= 0.8;
        draw();
      }
      raf = requestAnimationFrame(frame);
    }

    function snip(cx: number, cy: number) {
      const r = hero.getBoundingClientRect();
      const x = cx - r.left,
        y = cy - r.top;
      const R = W < 700 ? 60 : 80;
      let cut = 0;
      for (const s of strands) {
        if (Math.abs(s.pts[0].x - x) > R * 2) continue;
        let best = -1,
          bd = 1e9;
        for (let k = 2; k < s.pts.length; k++) {
          const p = s.pts[k];
          const d = Math.abs(p.x - x) * 0.9 + Math.abs(p.y - y);
          if (Math.abs(p.x - x) < R && Math.abs(p.y - y) < SEG * 2 && d < bd) {
            bd = d;
            best = k;
          }
        }
        if (best > 0) {
          const tail = s.pts.splice(best);
          tail.forEach((p) => {
            p.px = p.x - (Math.random() - 0.5) * 3;
            p.py = p.y - 1;
          });
          if (tail.length > 1) pieces.push({ pts: tail, col: s.col, w: s.w, life: 0 });
          s.grow = -0.4;
          cut++;
        }
      }
      snips++;
      window.dispatchEvent(new CustomEvent("al:snip", { detail: snips }));
      const old = pal(0);
      advance();
      buzz(cut ? 30 : 12);
      if (RM) {
        draw();
        return;
      }
      burst(cx, cy, old.ink, old.pop, cut ? undefined : "Missed!");
      wind += (x < W / 2 ? 1 : -1) * 3;
      const s = sc.current!;
      gsap.killTweensOf([s, s.querySelectorAll(".bA,.bB")]);
      gsap.set(s, { left: x, top: y, opacity: 1, scale: 0.6, rotation: -20 + Math.random() * 40 });
      gsap.fromTo(s.querySelector(".bA"), { rotation: -26 }, { rotation: 0, duration: 0.14, ease: "power4.in", transformOrigin: "86px 100px" });
      gsap.fromTo(s.querySelector(".bB"), { rotation: 26 }, { rotation: 0, duration: 0.14, ease: "power4.in", transformOrigin: "86px 100px" });
      gsap.to(s, { scale: 1, duration: 0.14 });
      gsap.to(s, { y: 60, opacity: 0, duration: 0.45, delay: 0.25, ease: "power2.in", onComplete: () => gsap.set(s, { y: 0 }) });
      gsap.fromTo(
        chars,
        { x: () => gsap.utils.random(-18, 18), y: () => gsap.utils.random(-26, 26), rotation: () => gsap.utils.random(-22, 22) },
        { x: 0, y: 0, rotation: 0, duration: 0.9, ease: "elastic.out(1,.35)", stagger: 0.008, overwrite: true }
      );
      hero.querySelector<HTMLElement>(".al-hint")!.classList.add("used");
    }

    // ---------- input ----------
    const pm = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      const x = e.clientX - r.left,
        y = e.clientY - r.top;
      if (m.on) {
        m.vx = x - m.x;
        m.vy = y - m.y;
      }
      m.x = x;
      m.y = y;
      m.on = true;
    };
    const pl = () => {
      m.on = false;
    };
    let downX = 0,
      downY = 0,
      downT = 0;
    const pd = (e: PointerEvent) => {
      downX = e.clientX;
      downY = e.clientY;
      downT = performance.now();
      pm(e);
    };
    const pu = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a,button")) return;
      if (Math.hypot(e.clientX - downX, e.clientY - downY) < 12 && performance.now() - downT < 500) snip(e.clientX, e.clientY);
      if (e.pointerType !== "mouse") m.on = false;
    };
    const kd = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const r = hero.getBoundingClientRect();
        snip(r.left + r.width * (0.3 + Math.random() * 0.4), r.top + r.height * 0.28);
      }
    };
    hero.addEventListener("pointermove", pm);
    hero.addEventListener("pointerleave", pl);
    hero.addEventListener("pointercancel", pl);
    hero.addEventListener("pointerdown", pd);
    hero.addEventListener("pointerup", pu);
    hero.addEventListener("keydown", kd);

    const io = new IntersectionObserver((es) => es.forEach((e) => (visible = e.isIntersecting)));
    io.observe(hero);
    const onScroll = () => {
      const v = scrollY - lastScroll;
      lastScroll = scrollY;
      wind += clamp(v * 0.04, -2, 2);
    };
    addEventListener("scroll", onScroll, { passive: true });
    const unPaint = onPaint(() => {
      hair = pal(0).hair;
      if (RM) draw();
    });

    let rw = innerWidth;
    const onResize = () => {
      if (Math.abs(innerWidth - rw) < 2) return; // ignore mobile URL-bar height changes
      rw = innerWidth;
      build();
      if (RM) {
        for (let i = 0; i < 240; i++) step(1 / 60);
        draw();
      }
    };
    addEventListener("resize", onResize);

    build();
    const intro = () => {
      started = true;
      if (RM) return;
      const o = { y: anchorY };
      gsap.to(o, { y: -6, duration: 1.4, ease: "bounce.out", onUpdate: () => (anchorY = o.y) });
      gsap.from(chars, { yPercent: 115, duration: 0.9, ease: "back.out(1.6)", stagger: 0.022 });
      gsap.fromTo(".al-hbot > *", { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1, delay: 0.4, clearProps: "transform,opacity,visibility" });
    };
    if (RM) {
      for (let i = 0; i < 240; i++) step(1 / 60);
      draw();
    } else raf = requestAnimationFrame(frame);
    if ((window as any).__alReady) intro();
    else window.addEventListener("al:ready", intro, { once: true });

    // scroll-away: headline lines drift apart
    let tl: gsap.core.Timeline | null = null;
    if (!RM) {
      tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
      tl.to(".al-h1 .ln:nth-child(1)", { xPercent: -18 }, 0)
        .to(".al-h1 .ln:nth-child(2)", { xPercent: 14, fontStretch: "60%" }, 0)
        .to(".al-h1 .ln:nth-child(3)", { xPercent: -8 }, 0);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      unPaint();
      tl?.kill();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      window.removeEventListener("al:ready", intro);
      hero.removeEventListener("pointermove", pm);
      hero.removeEventListener("pointerleave", pl);
      hero.removeEventListener("pointercancel", pl);
      hero.removeEventListener("pointerdown", pd);
      hero.removeEventListener("pointerup", pu);
      hero.removeEventListener("keydown", kd);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sec}
      className="al-sec al-hero"
      data-off="0"
      data-cursor="scissors"
      tabIndex={0}
      aria-label="A curtain of dyed hair. Drag to comb it, tap or press Enter to give it a snip."
    >
      <canvas ref={cv} className="al-hair" aria-hidden="true" />
      <div ref={sc} className="al-snipper" aria-hidden="true">
        <Scissors />
      </div>
      <div className="al-htext">
        <h1 className="al-h1" data-lines="Hair that|turns|heads."></h1>
      </div>
      <div className="al-hbot">
        <p className="al-sub">Aluma Salon, Bangalore. Comb it with your finger. Tap to give it a cut.</p>
        <span className="al-hint">Tap to snip</span>
      </div>
    </section>
  );
}
