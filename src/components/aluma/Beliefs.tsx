"use client";
import { useEffect, useRef } from "react";
import { gsap, reduced } from "./fx";
import { Scissors, Comb, Dryer, Ex } from "./Props";
import { paint } from "./palette";

const CARDS = [
  { h: "We listen before we cut.", p: "Five minutes of questions saves five weeks of growing out a mistake.", P: Scissors, off: 0 },
  { h: "Colour should fade kindly.", p: "We mix for your skin tone and your calendar, so month two still looks planned.", P: Comb, off: 3 },
  { h: "You, turned up.", p: "The goal is the best version of your hair. Not someone else's photo, forced onto it.", P: Dryer, off: 5 },
];

/** Cards stack like towels on a trolley; each prop spins as its card arrives. */
export default function Beliefs() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const s = sec.current!;
    paint();
    if (reduced()) return;
    const cards = gsap.utils.toArray<HTMLElement>(".al-bcard", s);
    const ctx = gsap.context(() => {
      cards.forEach((c, i) => {
        const nxt = cards[i + 1];
        gsap.fromTo(c.querySelector(".al-bprop"), { rotationY: -200, rotationX: 30, scale: 0.4 }, { rotationY: 20, rotationX: -8, scale: 1, ease: "none", scrollTrigger: { trigger: c, start: "top 95%", end: "top 20%", scrub: 0.6 } });
        if (nxt)
          gsap.to(c.querySelector(".al-binner"), {
            scale: 0.9,
            rotationX: 10,
            filter: "brightness(.88)",
            ease: "none",
            scrollTrigger: { trigger: nxt, start: "top bottom", end: "top 15%", scrub: true },
          });
      });
    }, s);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={sec} className="al-beliefs" aria-label="What we believe">
      {CARDS.map(({ h, p, P }, i) => (
        <div className="al-bcard" key={h} style={{ zIndex: i + 1 }}>
          <div className="al-binner">
            <Ex className="al-bprop" depth={6}>
              <P />
            </Ex>
            <h2 className="al-h2">{h}</h2>
            <p className="al-lede">{p}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
