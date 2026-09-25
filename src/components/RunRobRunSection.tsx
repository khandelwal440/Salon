"use client";

import { useEffect, useRef } from "react";
import "./runrobrun.css";

/* =========================================================================
   RUNROBRUN SECTION CONTENT
   Items for the Tools Reel & Work Canvas
   ========================================================================= */
const ITEMS = [
  {
    t: "Runman",
    c: "A lightweight looping pixel-motion study used as a lead-in for the tool reel. It sets the rhythm before the editorial studies begin.",
    v: "",
  },
  {
    t: "Chroma Warp",
    v: "/aluma-assets/gallery-vid.04e7549cd8de058adea6.mp4",
    c: "A motion study mixing image texture with live typography, built as a reusable visual tool for high-fashion art direction tests.",
  },
  {
    t: "Split Mask",
    v: "/aluma-assets/ALUMA.036187e7de1663d09d1a.mp4",
    c: "A compact interaction prototype for opening, masking, and revealing couture hair architecture with clean tactile motion states.",
  },
  {
    t: "Text Maze",
    v: "/aluma-assets/gallery-vid.04e7549cd8de058adea6.mp4",
    c: "A maze-like remix tool built for playful visual variation using procedural layout behavior and graphic rules.",
  },
  {
    t: "Couture Flow",
    v: "/aluma-assets/ALUMA.036187e7de1663d09d1a.mp4",
    c: "A sculptural motion experiment focused on weight, depth, and atmospheric hair movement in the digital atelier.",
  },
];

const GALLERY = [
  { src: "/aluma-assets/1.66e60b3584f79fa15f73.jpeg", alt: "Editorial Silhouette 01", cls: "g1", speed: 0.06 },
  { src: "/aluma-assets/aluma-white-hero.4e1788185e4dce97f3b3.jpeg", alt: "High-Fashion Hero", cls: "g2", speed: -0.04 },
  { src: "/aluma-assets/2.175bc3a5a880c24374a5.jpeg", alt: "Editorial Silhouette 02", cls: "g3", speed: 0.1 },
];

const SKILLS = [
  {
    t: "Visual Systems",
    c: "Building clear art direction, strong composition, and digital identities that feel distinctive and intentional.",
  },
  {
    t: "Front-End Craft",
    c: "Developing responsive interfaces with thoughtful detail, smooth performance, and precise implementation.",
  },
  {
    t: "Motion Language",
    c: "Using animation and interaction to guide attention, add atmosphere, and make the work feel alive.",
  },
  {
    t: "Brand Presence",
    c: "Translating ideas into polished launches, campaigns, and product surfaces that feel cohesive across touchpoints.",
  },
  {
    t: "Concept to Form",
    c: "Shaping early ideas into clear visual systems that stay flexible, purposeful, and ready to evolve.",
  },
];

const PROJECTS = [
  {
    t: "Dash",
    s: "Creative Studio Build",
    u: "https://www.dashcreative.co/",
    img: "/aluma-assets/haircut.d7f2cdd9661c752f3eeb.jpeg",
    c: "A custom Webflow template shaped for a modern creative studio. Built with a sharp CMS structure, reusable sections, and script-led motion details that keep the portfolio fast, polished, and easy to extend.",
  },
  {
    t: "Racepoint",
    s: "Editorial Systems",
    u: "https://racepointglobal.com/",
    img: "/aluma-assets/haircolorF.6f5b1a1c602c52d43689.png",
    c: "A digital experience with an editorial visual system, custom page templates, and a flexible component setup. Modern interactions and lightweight scripts bring movement without losing the confident brand feel.",
  },
  {
    t: "Commuter",
    s: "Cinematic Film Portfolio",
    u: "https://www.commuterfilms.co.uk/",
    img: "/aluma-assets/brideF.b368b3b3ce3801b10be8.png",
    c: "A cinematic portfolio built around immersive project presentation. Custom templates, CMS-driven media, and modern script enhancements give the site a bold rhythm while keeping updates straightforward.",
  },
  {
    t: "Roger W Smith",
    s: "Luxury Atelier Archive",
    u: "https://rwsmithwatches.com/",
    img: "/aluma-assets/aluma-white-hero.4e1788185e4dce97f3b3.jpeg",
    c: "A refined build for a luxury atelier, designed around atmosphere, detail, and controlled pacing. Uses custom templates, structured content, and subtle modern scripts to support a rich archive experience.",
  },
];

const TINTS = ["#161924", "#202434", "#10131B", "#1B2030"];

export default function RunRobRunSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Tools Reel Refs
  const toolsSecRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ttlRef = useRef<HTMLHeadingElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const puckRef = useRef<HTMLSpanElement>(null);
  const pxCanvasRef = useRef<HTMLCanvasElement>(null);

  // Work Section Refs
  const workSecRef = useRef<HTMLElement>(null);
  const wcCanvasRef = useRef<HTMLCanvasElement>(null);
  const wrollRef = useRef<HTMLDivElement>(null);
  const wlabRef = useRef<HTMLParagraphElement>(null);
  const wdescRef = useRef<HTMLParagraphElement>(null);
  const wlinkRef = useRef<HTMLAnchorElement>(null);

  // Pixel runner ref
  const runnerCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let isDisposed = false;

    // -------------------------------------------------------------
    // 1. HELPERS & MATH
    // -------------------------------------------------------------
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    const hash = (c: number, r: number) => {
      const x = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    // -------------------------------------------------------------
    // 2. PARALLAX ABOUT GALLERY
    // -------------------------------------------------------------
    const aboutEl = root.querySelector<HTMLElement>("#about");
    const galEl = root.querySelector<HTMLElement>("#gal");
    const figs = galEl ? Array.from(galEl.querySelectorAll<HTMLElement>("figure")) : [];

    const updateParallax = () => {
      if (!aboutEl || figs.length === 0) return;
      const vh = window.innerHeight;
      const rect = aboutEl.getBoundingClientRect();
      if (rect.top > vh + 200 || rect.top < -aboutEl.offsetHeight - 200) return;

      figs.forEach((f) => {
        const speed = parseFloat(f.dataset.speed || "0");
        const centre = rect.top + f.offsetTop + f.offsetHeight / 2;
        f.style.transform = `translate3d(0,${(centre - vh / 2) * speed}px,0)`;
      });
    };

    // -------------------------------------------------------------
    // 3. TOOLS HORIZONTAL REEL & PIXEL DISSOLVE
    // -------------------------------------------------------------
    const sec = toolsSecRef.current;
    const track = trackRef.current;
    const copy = copyRef.current;
    const ttl = ttlRef.current;
    const big = bigRef.current;
    const puck = puckRef.current;
    const cv = pxCanvasRef.current;
    const ctx = cv ? cv.getContext("2d") : null;
    const N = ITEMS.length;

    let W = 0,
      H = 0,
      cs = 0,
      cols = 10,
      rows = 0;
    let cur = 0,
      tgt = 0,
      shown = -1,
      raf = 0;

    const sizeToolsCanvas = () => {
      if (!cv || !ctx) return;
      const b = cv.getBoundingClientRect();
      const d = window.devicePixelRatio || 1;
      W = b.width;
      H = b.height;
      cv.width = W * d;
      cv.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
      cs = Math.ceil(W / cols);
      rows = Math.ceil(H / cs);
    };

    const drawPx = (t: number) => {
      if (!ctx || !cv) return;
      ctx.clearRect(0, 0, W, H);
      if (t <= 0 || t >= 1) return;
      ctx.fillStyle = "#000";
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const thr = (c / cols) * 0.6 + ((rows - 1 - r) / rows) * 0.25 + hash(c, r) * 0.15;
          const on = t < 0.5 ? thr < t * 2 : thr >= t * 2 - 1;
          if (on) ctx.fillRect(c * cs, r * cs, cs + 1, cs + 1);
        }
      }
    };

    const vids = track ? Array.from(track.querySelectorAll<HTMLVideoElement>("video")) : [];
    vids.forEach((v) => {
      v.addEventListener("canplay", () => {
        if (v.parentElement) v.parentElement.classList.add("ready");
      });
    });

    const setActiveSlide = (a: number) => {
      shown = a;
      if (copy && ttl && big) {
        copy.classList.add("out");
        setTimeout(() => {
          if (isDisposed) return;
          if (copy) copy.textContent = ITEMS[a]?.c || "";
          if (ttl) ttl.textContent = ITEMS[a]?.t || "";
          if (copy) copy.classList.remove("out");
        }, 160);
        big.textContent = String(a).padStart(3, "0");
      }

      let vi = 0;
      ITEMS.forEach((it, k) => {
        if (!it.v) return;
        const v = vids[vi++];
        if (!v) return;
        if (Math.abs(k - a) <= 1 && !v.src) {
          v.src = v.dataset.src || "";
          v.load();
        }
        if (k === a) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    };

    const renderTools = (x: number) => {
      if (!track || !puck) return;
      const i = Math.min(Math.floor(x), N - 2);
      const f = x - i;
      const t = clamp((f - 0.35) / 0.3, 0, 1);
      const idx = i + t * t * (3 - 2 * t);
      track.style.transform = `translate3d(${-idx * (100 / N)}%,0,0)`;
      drawPx(t);
      puck.style.left = `${(x / (N - 1)) * 100}%`;
      const a = Math.round(idx);
      if (a !== shown && a >= 0 && a < N) setActiveSlide(a);
    };

    const measureTools = () => {
      if (!sec) return;
      const max = sec.offsetHeight - window.innerHeight;
      if (max <= 0) return;
      tgt = clamp(-sec.getBoundingClientRect().top / max, 0, 1) * (N - 1);
    };

    const tickTools = () => {
      raf = 0;
      cur += (tgt - cur) * 0.14;
      if (Math.abs(tgt - cur) < 0.0005) cur = tgt;
      renderTools(cur);
      if (cur !== tgt) {
        if (!raf) raf = requestAnimationFrame(tickTools);
      }
    };

    const kickTools = () => {
      if (!raf) raf = requestAnimationFrame(tickTools);
    };

    // -------------------------------------------------------------
    // 4. PROCEDURAL PIXEL RUNNER (24x24 Canvas)
    // -------------------------------------------------------------
    const rc = runnerCanvasRef.current;
    const rx = rc ? rc.getContext("2d") : null;

    const line = (x0: number, y0: number, x1: number, y1: number) => {
      if (!rx) return;
      x0 = Math.round(x0);
      y0 = Math.round(y0);
      x1 = Math.round(x1);
      y1 = Math.round(y1);
      const dx = Math.abs(x1 - x0);
      const dy = -Math.abs(y1 - y0);
      const sx = x0 < x1 ? 1 : -1;
      const sy = y0 < y1 ? 1 : -1;
      let e = dx + dy;
      while (true) {
        rx.fillRect(x0, y0, 2, 2);
        if (x0 === x1 && y0 === y1) break;
        const e2 = 2 * e;
        if (e2 >= dy) {
          e += dy;
          x0 += sx;
        }
        if (e2 <= dx) {
          e += dx;
          y0 += sy;
        }
      }
    };

    const limb = (x: number, y: number, a1: number, l1: number, a2: number, l2: number) => {
      const kx = x + Math.sin(a1) * l1;
      const ky = y + Math.cos(a1) * l1;
      line(x, y, kx, ky);
      line(kx, ky, kx + Math.sin(a2) * l2, ky + Math.cos(a2) * l2);
    };

    const runner = (ms: number) => {
      if (!rx) return;
      const p = (ms / 650) * Math.PI * 2;
      const hx = 9;
      const hy = 11 - Math.abs(Math.sin(p)) * 1.4;
      const sx = hx + 3;
      const sy = hy - 6;
      rx.clearRect(0, 0, 24, 24);
      rx.fillStyle = "#000";
      rx.fillRect(sx + 1, sy - 4, 3, 3);
      line(hx, hy, sx, sy);
      line(hx + 1, hy, sx + 1, sy);
      for (const o of [0, Math.PI]) {
        const a = Math.sin(p + o) * 0.9;
        limb(hx, hy, a, 5, a - 0.2 - (0.5 + 0.5 * Math.sin(p + o + 1.4)) * 1.3, 5);
        const b = -Math.sin(p + o) * 0.9;
        limb(sx, sy, b, 3.5, b + 1.2, 3.5);
      }
    };

    let runnerAnimId = 0;
    const runLoop = (ms: number) => {
      if (isDisposed) return;
      if (rx && cur < 0.9) runner(Math.floor(ms / 90) * 90);
      runnerAnimId = requestAnimationFrame(runLoop);
    };

    // -------------------------------------------------------------
    // 5. WORK SECTION & 8-COLUMN PROCEDURAL PIXEL CANVAS
    // -------------------------------------------------------------
    const PN = PROJECTS.length;
    const wsec = workSecRef.current;
    const wcv = wcCanvasRef.current;
    const wx = wcv ? wcv.getContext("2d") : null;
    const wroll = wrollRef.current;
    const wlab = wlabRef.current;
    const wdesc = wdescRef.current;
    const wlink = wlinkRef.current;

    let WW = 0,
      WH = 0,
      dpr = 1,
      layers: HTMLCanvasElement[] = [],
      wcur = 0,
      wtgt = 0,
      wraf = 0,
      wshown = -1;

    const paintLayer = (i: number) => {
      const c = document.createElement("canvas");
      c.width = WW * dpr;
      c.height = WH * dpr;
      const g = c.getContext("2d");
      if (!g) return c;
      g.scale(dpr, dpr);
      const p = PROJECTS[i];
      const im = (p as any)._im as HTMLImageElement | undefined;

      if (im && im.naturalWidth) {
        const k = Math.max(WW / im.naturalWidth, WH / im.naturalHeight);
        const w = im.naturalWidth * k;
        const h = im.naturalHeight * k;
        g.drawImage(im, (WW - w) / 2, (WH - h) / 2, w, h);
      } else {
        g.fillStyle = TINTS[i % TINTS.length];
        g.fillRect(0, 0, WW, WH);
        g.fillStyle = "#dcdcda";
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.font = `900 ${Math.round(WW / 10)}px Archivo,"Arial Black",sans-serif`;
        g.fillText(p.t.toUpperCase(), WW / 2, WH / 2);
      }
      return c;
    };

    const sizeWorkCanvas = () => {
      if (!wcv || !wx) return;
      const b = wcv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      WW = b.width;
      WH = b.height;
      wcv.width = WW * dpr;
      wcv.height = WH * dpr;
      wx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layers = PROJECTS.map((_, i) => paintLayer(i));
    };

    PROJECTS.forEach((p, i) => {
      if (p.img) {
        const img = new Image();
        (p as any)._im = img;
        img.onload = () => {
          if (isDisposed) return;
          layers[i] = paintLayer(i);
          renderWork(wcur);
        };
        img.src = p.img;
      }
    });

    const setWork = (a: number) => {
      wshown = a;
      const p = PROJECTS[a];
      if (!p) return;
      if (wroll) wroll.style.transform = `translate3d(0,${-a * 100}%,0)`;
      if (wlink) wlink.href = p.u;
      if (wlab && wdesc) {
        wlab.classList.add("out");
        wdesc.classList.add("out");
        setTimeout(() => {
          if (isDisposed) return;
          if (wlab) wlab.innerHTML = `<span>${p.t}</span><span>${p.s}</span>`;
          if (wdesc) wdesc.textContent = p.c;
          if (wlab) wlab.classList.remove("out");
          if (wdesc) wdesc.classList.remove("out");
        }, 160);
      }
    };

    const renderWork = (x: number) => {
      if (!wx || layers.length === 0) return;
      const i = Math.min(Math.floor(x), PN - 2);
      const t = clamp((x - i - 0.3) / 0.4, 0, 1);
      if (layers[i]) wx.drawImage(layers[i], 0, 0, WW, WH);

      if (t > 0 && layers[i + 1]) {
        const n = 8;
        const cw = WW / n;
        const rw = Math.ceil(WH / cw);
        const s = cw * dpr;
        for (let r = 0; r < rw; r++) {
          for (let c = 0; c < n; c++) {
            if (hash(c, r) < t) {
              wx.drawImage(layers[i + 1], c * s, r * s, s, s, c * cw, r * cw, cw + 1, cw + 1);
            }
          }
        }
      }
      const a = t >= 0.5 ? i + 1 : i;
      if (a !== wshown && a >= 0 && a < PN) setWork(a);
    };

    const measureWork = () => {
      if (!wsec) return;
      const max = wsec.offsetHeight - window.innerHeight;
      if (max <= 0) return;
      wtgt = clamp(-wsec.getBoundingClientRect().top / max, 0, 1) * (PN - 1);
    };

    const tickWork = () => {
      wraf = 0;
      wcur += (wtgt - wcur) * 0.14;
      if (Math.abs(wtgt - wcur) < 0.0005) wcur = wtgt;
      renderWork(wcur);
      if (wcur !== wtgt) {
        if (!wraf) wraf = requestAnimationFrame(tickWork);
      }
    };

    const kickWork = () => {
      if (!wraf) wraf = requestAnimationFrame(tickWork);
    };

    // -------------------------------------------------------------
    // 6. SCROLL & RESIZE EVENT LISTENERS
    // -------------------------------------------------------------
    const onScroll = () => {
      measureTools();
      kickTools();
      updateParallax();
      measureWork();
      kickWork();
    };

    const onResize = () => {
      sizeToolsCanvas();
      measureTools();
      cur = tgt;
      renderTools(cur);
      updateParallax();
      sizeWorkCanvas();
      measureWork();
      wcur = wtgt;
      renderWork(wcur);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Initial Trigger
    sizeToolsCanvas();
    measureTools();
    cur = tgt;
    renderTools(cur);
    updateParallax();
    sizeWorkCanvas();
    measureWork();
    wcur = wtgt;
    renderWork(wcur);
    runnerAnimId = requestAnimationFrame(runLoop);

    // Arrow navigation
    const prevBtn = root.querySelector<HTMLButtonElement>("#prev");
    const nextBtn = root.querySelector<HTMLButtonElement>("#next");

    const goSlide = (d: number) => {
      if (!sec) return;
      const a = clamp(Math.round(cur) + d, 0, N - 1);
      const y = sec.offsetTop + (a / (N - 1)) * (sec.offsetHeight - window.innerHeight);
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    if (prevBtn) prevBtn.onclick = () => goSlide(-1);
    if (nextBtn) nextBtn.onclick = () => goSlide(1);

    return () => {
      isDisposed = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      if (wraf) cancelAnimationFrame(wraf);
      if (runnerAnimId) cancelAnimationFrame(runnerAnimId);
    };
  }, []);

  return (
    <div ref={rootRef} className="runrobrun-wrapper font-mono relative">
      {/* Precision Crosshairs Overlay */}
      <div className="crosses" aria-hidden="true">
        <i className="x tl"></i>
        <i className="x tr"></i>
        <i className="x tc"></i>
        <i className="x bl"></i>
        <i className="x br"></i>
        <i className="x bc"></i>
      </div>

      {/* ============================================================= */}
      {/* 01: ABOUT SECTION (Parallax Gallery + Interactive Skills)     */}
      {/* ============================================================= */}
      <section className="about" id="about" aria-label="About">
        <div className="gal" id="gal">
          {GALLERY.map((g, idx) => (
            <figure key={idx} className={g.cls} data-speed={g.speed}>
              <div
                className={`im ${g.src ? "has" : ""}`}
                role="img"
                aria-label={g.alt}
                style={g.src ? { backgroundImage: `url('${g.src}')` } : {}}
              >
                {g.src ? "" : g.alt}
              </div>
            </figure>
          ))}
        </div>

        <div className="skills" id="skills">
          {SKILLS.map((s, i) => (
            <article key={i} className="skill" tabIndex={0}>
              <span className="n">[{String(i + 1).padStart(2, "0")}]</span>
              <h3>{s.t}</h3>
              <p>{s.c}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================================= */}
      {/* 02: TOOLS SECTION (Pinned Scroll Reel + Pixel Runner Canvas)   */}
      {/* ============================================================= */}
      <section
        ref={toolsSecRef}
        className="tools"
        id="tools"
        aria-label="Tools"
        style={{ height: `calc(100vh + ${(ITEMS.length - 1) * 120}vh)` }}
      >
        <div className="stick">
          <h2>Tools</h2>
          <div className="rule"></div>
          <div className="meta">
            <p ref={copyRef} id="copy" aria-live="polite">
              {ITEMS[0].c}
            </p>
            <p>Scroll #</p>
          </div>

          <div className="media">
            <div
              ref={trackRef}
              className="track"
              id="track"
              style={{
                width: `${ITEMS.length * 100}%`,
                ["--n" as string]: ITEMS.length,
              }}
            >
              {ITEMS.map((it, idx) => (
                <div key={idx} className="slide">
                  {it.v ? (
                    <div className="frame">
                      <div className="ph">{it.t}</div>
                      <video
                        muted
                        loop
                        playsInline
                        preload="none"
                        data-src={it.v}
                      ></video>
                    </div>
                  ) : (
                    <canvas
                      ref={runnerCanvasRef}
                      className="run"
                      width={24}
                      height={24}
                      aria-label={it.t}
                    ></canvas>
                  )}
                </div>
              ))}
            </div>

            {/* Pixel Block Dissolve Canvas */}
            <canvas ref={pxCanvasRef} id="px" aria-hidden="true"></canvas>

            {/* Arrow Controls */}
            <div className="arrows">
              <button type="button" id="prev" aria-label="Show previous tool">
                &larr;
              </button>
              <button type="button" id="next" aria-label="Show next tool">
                &rarr;
              </button>
            </div>
          </div>

          {/* Footer Rule with Puck Progress */}
          <div className="foot">
            <div className="rule">
              <span ref={puckRef} id="puck"></span>
            </div>
            <h3 ref={ttlRef} id="ttl">
              {ITEMS[0].t}
            </h3>
            <div ref={bigRef} id="big" aria-hidden="true">
              000
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/* 03: WORK SECTION (Interactive Pinned 8-Column Pixel Dissolve) */}
      {/* ============================================================= */}
      <section
        ref={workSecRef}
        className="work"
        id="work"
        aria-label="Work"
        style={{ height: `calc(100vh + ${(PROJECTS.length - 1) * 110}vh)` }}
      >
        <div className="wstick">
          <h2>Work</h2>
          <div className="wrow">
            <div className="wl">
              <div className="widx" aria-hidden="true">
                <div ref={wrollRef} className="wroll" id="wroll">
                  {PROJECTS.map((_, i) => (
                    <span key={i}>{String(i + 1).padStart(2, "0")}</span>
                  ))}
                </div>
              </div>
              <a
                ref={wlinkRef}
                className="wbtn"
                id="wlink"
                href={PROJECTS[0].u}
                target="_blank"
                rel="noreferrer"
              >
                View project
              </a>
            </div>

            {/* Interactive Procedural Canvas */}
            <div className="wm">
              <canvas ref={wcCanvasRef} id="wc" role="img" aria-label="Project preview"></canvas>
            </div>

            <div className="wr">
              <p ref={wlabRef} className="wlab" id="wlab">
                <span>{PROJECTS[0].t}</span>
                <span>{PROJECTS[0].s}</span>
              </p>
              <p ref={wdescRef} className="wdesc" id="wdesc" aria-live="polite">
                {PROJECTS[0].c}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
