"use client";
import { useEffect, useRef } from "react";
import { gsap, reduced } from "./fx";

const STATS = [
  { n: 35000, suf: "+", l: "clients through our chairs" },
  { n: 8, suf: " yrs", l: "of cutting in Bangalore" },
  { n: 3, suf: "", l: "studios, one standard" },
];

/** The photo shrinks into the word, then the numbers count up. */
export default function MaskStats() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const s = sec.current!;
    const nums = Array.from(s.querySelectorAll<HTMLElement>(".al-snum b"));
    const fmt = (v: number) => Math.round(v).toLocaleString("en-IN");
    if (reduced()) {
      nums.forEach((el, i) => (el.textContent = fmt(STATS[i].n)));
      return;
    }
    const ctx = gsap.context(() => {
      const o = STATS.map(() => ({ v: 0 }));
      const tl = gsap.timeline({
        scrollTrigger: { trigger: s.querySelector(".al-mpin"), start: "top top", end: () => "+=" + innerHeight * 1.6, pin: true, scrub: 0.8 },
      });
      tl.fromTo(".al-mimg", { scale: 1.15, opacity: 1, clipPath: "inset(0% 0% 0% 0% round 0px)" }, { scale: 0.9, clipPath: "inset(30% 12% 30% 12% round 40px)", duration: 0.5, ease: "power2.in" }, 0)
        .to(".al-mimg", { opacity: 0, duration: 0.15 }, 0.42)
        .fromTo(".al-mtext", { scale: 2.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.3)
        .to(".al-mtext", { fontStretch: "78%", duration: 0.4, ease: "power1.inOut" }, 0.8)
        .from(".al-stat", { y: 80, opacity: 0, stagger: 0.08, duration: 0.3 }, 0.85);
      o.forEach((obj, i) =>
        tl.to(obj, { v: STATS[i].n, duration: 0.45, ease: "power2.out", onUpdate: () => (nums[i].textContent = fmt(obj.v)) }, 0.9 + i * 0.08)
      );
    }, s);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={sec} className="al-sec al-mask" data-off="5" aria-label="Aluma. 35,000 clients, 8 years, 3 studios.">
      <div className="al-mpin">
        <img className="al-mimg" src="/aluma/model-melt-side.webp" alt="" aria-hidden="true" />
        <p className="al-mtext" style={{ backgroundImage: "url(/aluma/model-melt-side.webp)" }} aria-hidden="true">
          aluma
        </p>
        <div className="al-stats">
          {STATS.map((st) => (
            <div className="al-stat" key={st.l}>
              <span className="al-snum">
                <b>0</b>
                {st.suf}
              </span>
              <span>{st.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
