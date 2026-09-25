"use client";
import "@fontsource-variable/anybody/wdth.css";
import "@fontsource-variable/figtree";
import "../../styles/aluma.css";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reduced, finePointer, magnetize, wa, PHONE, buzz, splitText } from "./fx";
import { paint, C, onPaint } from "./palette";
import { Dots } from "./Props";

type Props = { page: "home" | "about"; children: React.ReactNode };

export default function Shell({ page, children }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const [snips, setSnips] = useState(0);

  // ---------- smooth scroll + palette + magnetic ----------
  useEffect(() => {
    const r = root.current!;
    document.documentElement.classList.toggle("al-rm", reduced());
    paint();
    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;
    if (!reduced()) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1.4 });
      (window as any).__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }
    const unMag = magnetize(r);
    const onSnip = (e: Event) => setSnips((e as CustomEvent).detail);
    window.addEventListener("al:snip", onSnip);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    const t = setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => {
      clearTimeout(t);
      unMag();
      window.removeEventListener("al:snip", onSnip);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      (window as any).__lenis = null;
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  useEffect(() => {
    paint();
  }, [page]);

  // ---------- loader ----------
  useEffect(() => {
    const L = document.getElementById("al-loader")!;
    const num = document.getElementById("al-lnum")!;
    const seen = sessionStorage.getItem("al-seen");
    const done = () => {
      L.style.display = "none";
      document.body.classList.remove("al-loading");
      window.dispatchEvent(new Event("al:ready"));
      (window as any).__alReady = true;
      ScrollTrigger.refresh();
    };
    document.body.classList.add("al-loading");
    if (reduced()) return done();
    sessionStorage.setItem("al-seen", "1");
    const quick = !!seen;
    const tl = gsap.timeline({ onComplete: done });
    const o = { v: 0 };
    tl.from(".al-ldot", { y: -140, scale: 0.4, duration: quick ? 0.35 : 0.7, ease: "bounce.out", stagger: 0.12 });
    if (!quick)
      tl.to(o, {
        v: 100,
        duration: 1.3,
        ease: "power2.inOut",
        onUpdate: () => (num.textContent = String(Math.round(o.v))),
      }, 0.1);
    tl.to(".al-ldot", { scale: 60, duration: 0.9, ease: "power3.in", stagger: 0.13 }, quick ? ">-0.05" : ">-0.2")
      .to(".al-lnum,.al-lname", { opacity: 0, duration: 0.2 }, "<")
      .to(L, { clipPath: "circle(0% at 50% 50%)", duration: 0.7, ease: "power3.inOut" }, ">-0.15");
    return () => {
      tl.kill();
    };
  }, []);

  // ---------- cursor ----------
  useEffect(() => {
    if (!finePointer() || reduced()) return;
    const cur = document.getElementById("al-cursor")!;
    const lab = cur.querySelector("span")!;
    let cx = innerWidth / 2,
      cy = innerHeight / 2,
      tx = cx,
      ty = cy,
      raf = 0;
    const mv = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      cx += (tx - cx) * 0.24;
      cy += (ty - cy) * 0.24;
      cur.style.transform = `translate(${cx}px,${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const z = t.closest<HTMLElement>("[data-cursor]");
      const l = t.closest("a,button");
      cur.classList.toggle("big", !!z && z.dataset.cursor !== "scissors");
      cur.classList.toggle("sc", !!z && z.dataset.cursor === "scissors");
      cur.classList.toggle("link", !!l && !z);
      if (z) lab.textContent = z.dataset.cursor || "";
    };
    addEventListener("pointermove", mv);
    document.addEventListener("pointerover", over);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", mv);
      document.removeEventListener("pointerover", over);
    };
  }, []);

  // ---------- bottom bar ----------
  useEffect(() => {
    const bar = document.getElementById("al-bar")!;
    const foot = document.getElementById("al-foot")!;
    const st = ScrollTrigger.create({
      start: () => innerHeight * 0.8,
      end: () => foot.offsetTop - innerHeight * 1.05,
      onToggle: (s) => bar.classList.toggle("on", s.isActive),
    });
    return () => st.kill();
  }, []);

  // ---------- footer ----------
  useEffect(() => {
    const foot     = document.getElementById("al-foot")!;
    const gridCols = Array.from(foot.querySelectorAll<HTMLElement>(".al-finfo > *"));
    const letters  = Array.from(foot.querySelectorAll<HTMLElement>(".al-fl"));
    const offs: (() => void)[] = [];

    // Contrast protection against dynamic background palette
    const hexToRgb = (hex: string) => {
      let c = hex.replace("#", "").trim();
      if (c.length === 3) c = c.split("").map((x) => x + x).join("");
      const n = parseInt(c, 16);
      return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    };
    const dist = (h1: string, h2: string) => {
      try {
        const a = hexToRgb(h1), b = hexToRgb(h2);
        return Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b);
      } catch { return 0; }
    };
    const getBg = () => getComputedStyle(foot).getPropertyValue("--bg").trim() || C.pink;
    const pickSafe = (col: string, bg: string, pool: string[]) => {
      if (dist(col, bg) >= 125) return col;
      return pool.find((c) => dist(c, bg) >= 125) || (dist(C.night, bg) > dist(C.white, bg) ? C.night : C.white);
    };

    // A  L  U  M  A — distinct brand colours
    const baseCols  = [C.night, C.iris,  C.green, C.blush, C.lilac];
    const hoverCols = [C.pink,  C.blush, C.iris,  C.green, C.pink ];
    const clickCols = [C.iris, C.green, C.blush, C.lilac, C.white, C.pink, C.night];
    const letterState = letters.map((_, i) => ({
      base: baseCols[i % baseCols.length],
      k: i,
    }));

    const updateColors = () => {
      const bg = getBg();
      letters.forEach((l, i) => {
        const safe = pickSafe(letterState[i].base, bg, [C.pink, C.white, C.night, C.iris, C.blush, C.lilac]);
        letterState[i].base = safe;
        l.style.color = safe;
      });
    };

    updateColors();
    offs.push(onPaint(updateColors));

    letters.forEach((l, i) => {
      // click: elastic bounce + advance colour cycle
      const hit = () => {
        letterState[i].k++;
        const bg = getBg();
        let col = clickCols[letterState[i].k % clickCols.length];
        col = pickSafe(col, bg, clickCols);
        letterState[i].base = col;
        l.style.color = col;
        buzz(15);
        const jumpY = window.innerWidth < 640 ? -36 : -60;
        if (!reduced())
          gsap.fromTo(l,
            { y: jumpY, rotation: gsap.utils.random(-20, 20), scaleY: 1.25, scaleX: 0.88 },
            { y: 0, rotation: 0, scaleY: 1, scaleX: 1, duration: 1.0, ease: "elastic.out(1,.32)", overwrite: true }
          );
      };

      // hover: flash to per-letter accent, restore on leave
      const over = () => {
        l.classList.add("hov");
        const bg = getBg();
        const hCol = pickSafe(hoverCols[i % hoverCols.length], bg, [C.white, C.pink, C.night, C.iris, C.blush]);
        l.style.color = hCol;
      };
      const out = () => {
        l.classList.remove("hov");
        l.style.color = letterState[i].base;
        if (!reduced()) gsap.to(l, { rotation: 0, x: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      };
      const move = (e: MouseEvent) => {
        if (reduced()) return;
        const r  = l.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        gsap.to(l, { rotation: dx * 10, x: dx * 5, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      };

      l.addEventListener("click",      hit);
      l.addEventListener("mouseenter", over);
      l.addEventListener("mouseleave", out);
      l.addEventListener("mousemove",  move as EventListener);
      offs.push(() => {
        l.removeEventListener("click",      hit);
        l.removeEventListener("mouseenter", over);
        l.removeEventListener("mouseleave", out);
        l.removeEventListener("mousemove",  move as EventListener);
      });
    });

    if (reduced()) return () => offs.forEach(f => f());

    // Title uses splitText() — exactly like Studios, Turnaround, HairHero
    const titleEl = foot.querySelector<HTMLElement>(".al-ftitle");
    const chars   = splitText(titleEl, false);  // no clip — foot has overflow:hidden

    const ctx = gsap.context(() => {

      // 1. Big title: same entrance as Studios heading
      gsap.from(chars, {
        yPercent: 120,
        rotation: (i: number) => (i % 2 === 0 ? -10 : 10),
        stagger:  0.028,
        duration: 0.85,
        ease: "back.out(2)",
        scrollTrigger: { trigger: foot, start: "top 80%" },
      });

      // 2. Scrub parallax on title — same as HairHero lines drifting on scroll
      gsap.to(".al-ftitle", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: foot,
          start: "top bottom",
          end:   "bottom top",
          scrub: 1.2,
        },
      });

      // 3. Info rows: same y+opacity pattern as MaskStats stats
      if (gridCols.length) {
        gsap.from(gridCols, {
          y: 32,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: foot, start: "top 72%" },
        });
      }

      // 4. Interactive letters idle sway — rotation only, safe inside foot's overflow
      gsap.to(letters, {
        rotation: (i: number) => (i % 2 === 0 ? -2.5 : 2.5),
        repeat: -1, yoyo: true,
        duration: (i: number) => 1.8 + i * 0.22,
        ease: "sine.inOut",
        stagger: 0.14,
        transformOrigin: "50% 100%",
        scrollTrigger: { trigger: foot, start: "top 85%" },
      });

    }, foot);

    offs.push(() => ctx.revert());
    return () => offs.forEach(f => f());
  }, []);

  const other = page === "home" ? { href: "/about", label: "About" } : { href: "/", label: "Home" };

  return (
    <div className="al" ref={root}>
      <div className="al-grain" aria-hidden="true" />
      <div className="al-cursor" id="al-cursor" aria-hidden="true">
        <span />
        <svg className="al-csc" viewBox="0 0 40 40">
          <circle cx="12" cy="12" r="6" fill="none" stroke="#fff" strokeWidth="3" />
          <circle cx="12" cy="28" r="6" fill="none" stroke="#fff" strokeWidth="3" />
          <path d="M16 15 L36 26 M16 25 L36 14" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div id="al-loader" aria-hidden="true" data-off="4">
        <span className="al-lname">Aluma Salon</span>
        <div className="al-ldots">
          <i className="al-ldot" style={{ background: C.green }} />
          <i className="al-ldot" style={{ background: C.iris }} />
          <i className="al-ldot" style={{ background: C.pink }} />
        </div>
        <span className="al-lnum" id="al-lnum">0</span>
      </div>

      <header className="al-top" data-off="3">
        <Link className="al-logo" href="/" aria-label="Aluma Salon home">
          <Dots size={26} />
          <span>aluma</span>
        </Link>
        {page === "home" && (
          <span className="al-count" aria-live="polite">
            {snips} {snips === 1 ? "snip" : "snips"}
          </span>
        )}
        <Link className="al-nav" href={other.href}>
          {other.label}
        </Link>
        <a className="al-pill mag" href={wa("Hi Aluma! I'd like to book a chair.")} target="_blank" rel="noopener">
          Book
        </a>
      </header>

      {children}

      <footer id="al-foot" className="al-sec al-foot" data-off="0">

        {/* Big display heading — same .al-h2 class as Studios + Turnaround */}
        <div className="al-fhead" aria-label="Aluma Salon">
          <h2
            className="al-h2 al-ftitle"
            data-lines="Come in.|We cut good."
            aria-label="Come in. We cut good."
          />
        </div>

        {/* CTA row — site's own .al-obtn and .al-pill button styles */}
        <div className="al-fcta">
          <a
            className="al-obtn mag"
            href={wa("Hi Aluma! I'd like to book a chair.")}
            target="_blank"
            rel="noopener"
          >
            Book a chair
          </a>
          <a
            className="al-tlink"
            href="https://www.instagram.com/aluma.salon/"
            target="_blank"
            rel="noopener"
          >
            @aluma.salon
          </a>
        </div>

        {/* Interactive ALUMA letters — each in a clip wrapper */}
        <div className="al-fword" aria-hidden="true" data-cursor="Tap">
          {"ALUMA".split("").map((c, i) => (
            <div key={i} className="al-fclip">
              <span className="al-fl">{c}</span>
            </div>
          ))}
        </div>

        {/* Footer info — 3 columns on desktop, matches Studios ticket layout */}
        <div className="al-finfo">
          <div>
            <p className="al-finfo-label">Find us</p>
            <p>Whitefield &bull; HSR Layout &bull; Sarjapur Rd</p>
            <p>Bangalore. Open daily, 9 am – 9 pm.</p>
          </div>
          <div>
            <p className="al-finfo-label">Contact</p>
            <p><a href={`tel:${PHONE.replace(/\s/g, "")}`}>{PHONE}</a></p>
            <p><a href="mailto:support@aluma.salon">support@aluma.salon</a></p>
          </div>
          <div>
            <p className="al-finfo-label">Small print</p>
            <p>Tap the letters. They like it.</p>
            <p className="al-fsmall">&copy; 2026 Aluma Salon</p>
          </div>
        </div>

      </footer>

      <nav className="al-bar" id="al-bar" data-off="1" aria-label="Quick booking">
        <span>Your chair is free today.</span>
        <a className="al-pill" href={wa("Hi Aluma! Is there a chair free today?")} target="_blank" rel="noopener">
          Book on WhatsApp
        </a>
      </nav>
    </div>
  );
}
