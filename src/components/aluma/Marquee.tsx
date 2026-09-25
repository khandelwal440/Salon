"use client";
import { useEffect, useRef } from "react";
import { gsap, reduced, clamp } from "./fx";
import { Comb, Dryer, Bottle, Ex } from "./Props";

const ROWS = [
  ["Balayage", "Glass keratin", "Head spa", "Bridal", "Blow-dry"],
  ["Cuts that grow out well", "Colour that fades kindly", "Three studios"],
];

function Sep() {
  return (
    <svg className="al-sep" viewBox="0 0 38 38" aria-hidden="true">
      <circle cx="19" cy="12.7" r="6.1" fill="#20B364" />
      <circle cx="11.8" cy="25.3" r="6.1" fill="#6875E9" />
      <circle cx="26.2" cy="25.3" r="6.1" fill="#EA54DB" />
    </svg>
  );
}

/** Two rows of words that run faster (and lean) the harder you scroll. */
export default function Marquee({ off = 2, rows = ROWS }: { off?: number; rows?: string[][] }) {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const s = sec.current!;
    const els = Array.from(s.querySelectorAll<HTMLElement>(".al-row"));
    const props = Array.from(s.querySelectorAll<HTMLElement>(".al-prop"));
    if (reduced()) return;
    const st = els.map((el, i) => ({ el, dir: i % 2 ? -1 : 1, x: 0 }));
    let lastY = scrollY,
      vel = 0,
      skew = 0,
      raf = 0,
      vis = false;
    const io = new IntersectionObserver((es) => es.forEach((e) => (vis = e.isIntersecting)));
    io.observe(s);
    const loop = () => {
      const y = scrollY;
      const v = y - lastY;
      lastY = y;
      vel += (v - vel) * 0.12;
      skew += (clamp(vel * 0.35, -14, 14) - skew) * 0.12;
      if (vis) {
        st.forEach((r) => {
          const w = r.el.scrollWidth / 2;
          r.x -= r.dir * (0.6 + Math.abs(vel) * 0.45);
          if (r.x < -w) r.x += w;
          if (r.x > 0) r.x -= w;
          r.el.style.transform = `translate3d(${r.x}px,0,0) skewX(${-skew * r.dir}deg)`;
        });
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    const tws = props.map((p, i) =>
      gsap.fromTo(
        p,
        { rotationY: -60 + i * 30, rotationX: 30, rotationZ: -20 + i * 15, y: 120 },
        {
          rotationY: 300 - i * 40,
          rotationX: -20,
          rotationZ: 25 - i * 10,
          y: -120,
          ease: "none",
          scrollTrigger: { trigger: s, start: "top bottom", end: "bottom top", scrub: 0.6 },
        }
      )
    );
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      tws.forEach((t) => t.kill());
    };
  }, []);
  return (
    <section ref={sec} className="al-sec al-marq" data-off={off} aria-label={rows.flat().join(", ")}>
      {rows.map((r, i) => (
        <div className="al-rowwrap" key={i} aria-hidden="true">
          <div className={`al-row ${i % 2 ? "o" : ""}`}>
            {[0, 1].map((k) => (
              <span className="al-rowset" key={k}>
                {[...r, ...r].map((w, j) => (
                  <span key={j} className="al-rw">
                    {w}
                    <Sep />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      ))}
      <div className="al-props" aria-hidden="true">
        <Ex className="al-prop p1"><Comb /></Ex>
        <Ex className="al-prop p2"><Dryer /></Ex>
        <Ex className="al-prop p3"><Bottle /></Ex>
      </div>
    </section>
  );
}
