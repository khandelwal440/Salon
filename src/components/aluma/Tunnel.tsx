"use client";
import { useEffect, useRef } from "react";
import { gsap, reduced } from "./fx";

const ITEMS = [
  { t: "word", v: "Step inside." },
  { t: "img", v: "storefront", c: "The front door, lit up after dark.", x: -1 },
  { t: "img", v: "reception", c: "Hello at the desk. Chai is on us.", x: 1 },
  { t: "word", v: "Mind the chairs." },
  { t: "img", v: "floor", c: "The floor. Every chair gets its own mirror and light.", x: -1 },
  { t: "img", v: "lounge", c: "The lounge, for anyone who came along to wait.", x: 1 },
  { t: "img", v: "wall-pose", c: "And the wall. Everybody takes a photo here.", x: -1 },
  { t: "word", v: "Welcome in." },
];
const GAP = 1000;

/** A scroll-driven walk through the salon: photos hang in 3D space and you move the camera through them. */
export default function Tunnel() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const s = sec.current!;
    if (reduced()) return;
    const world = s.querySelector<HTMLElement>(".al-world")!;
    const items = gsap.utils.toArray<HTMLElement>(".al-ti", s);
    const cam = { z: 0 };
    const total = (ITEMS.length - 1) * GAP;
    const render = () => {
      world.style.transform = `translate3d(0,0,${cam.z}px)`;
      items.forEach((el, i) => {
        const d = cam.z - i * GAP; // item's z after the camera move: 0 = on the glass, >0 = passing us
        let o = 1;
        if (d > 0) o = 1 - d / 480;
        else if (-d > 1700) o = 1 - (-d - 1700) / 1100;
        el.style.opacity = String(Math.max(0, Math.min(1, o)));
        el.style.visibility = o <= 0.01 ? "hidden" : "visible";
      });
    };
    render();
    const ctx = gsap.context(() => {
      gsap.to(cam, {
        z: total,
        ease: "none",
        onUpdate: render,
        scrollTrigger: { trigger: s.querySelector(".al-tunpin"), start: "top top", end: () => "+=" + innerHeight * ITEMS.length * 0.6, pin: true, scrub: 0.9 },
      });
    }, s);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={sec} className="al-sec al-tun" data-off="4" aria-label="A walk through the salon">
      <div className="al-tunpin">
        <div className="al-lens">
          <div className="al-world">
            {ITEMS.map((it, i) => (
              <div
                key={i}
                className={`al-ti ${it.t}`}
                style={{
                  transform: `translate(-50%,-50%) translate3d(${it.t === "img" ? (it.x || 0) * 26 : 0}vw, ${it.t === "img" ? (i % 2 ? -4 : 5) : 0}vh, ${-i * GAP}px) rotateY(${it.t === "img" ? -(it.x || 0) * 14 : 0}deg)`,
                }}
              >
                {it.t === "img" ? (
                  <figure>
                    <img src={`/aluma/${it.v}.webp`} alt={it.c} loading="lazy" draggable={false} />
                    <figcaption>{it.c}</figcaption>
                  </figure>
                ) : (
                  <p className="al-tword">{it.v}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
