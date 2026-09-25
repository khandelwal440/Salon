"use client";
import { useEffect, useRef } from "react";
import { gsap, reduced, splitText } from "./fx";

const LOOKS = [
  { name: "Glass straight", line: "Smoothing and keratin glass. Frizz stays out for up to six months.", meta: "150 min, from ₹5,999", f: "look-glass-front", b: "look-glass-back" },
  { name: "Soft curls", line: "Wash, cut and a tong-set finish that holds through dinner.", meta: "60 min, from ₹1,499", f: "look-curls-front", b: "look-curls-back" },
  { name: "Balayage melt", line: "Hand-painted from espresso roots to caramel ends. No stripe lines.", meta: "180 min, from ₹4,999", f: "look-melt-front", b: "look-melt-back" },
  { name: "The sharp lob", line: "A clean shoulder-length cut, shaped to your jaw.", meta: "60 min, from ₹1,499", f: "look-lob-front", b: "look-lob-back" },
];
const BULBS = 18;

/**
 * A vanity mirror. As you scroll, each client turns around so you see the back,
 * the way a stylist holds up the hand mirror at the end. The bulbs light up as you go.
 */
export default function Turnaround() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const s = sec.current!;
    const title = splitText(s.querySelector<HTMLElement>(".al-ttitle"));
    if (reduced()) return;
    const cards = gsap.utils.toArray<HTMLElement>(".al-card", s);
    const caps = gsap.utils.toArray<HTMLElement>(".al-tcap", s);
    const bulbs = gsap.utils.toArray<HTMLElement>(".al-bulb", s);
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.from(title, {
        yPercent: 110,
        rotation: 8,
        stagger: 0.03,
        duration: 0.8,
        ease: "back.out(2)",
        scrollTrigger: { trigger: s, start: "top 70%" },
      });
      gsap.set(cards, { rotationY: -110, xPercent: -40, opacity: 0 });
      gsap.set(caps, { opacity: 0, y: 40 });
      gsap.set(cards[0], { rotationY: 0, xPercent: 0, opacity: 1 });
      gsap.set(caps[0], { opacity: 1, y: 0 });
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: s.querySelector(".al-tpin"),
          start: "top top",
          end: () => "+=" + innerHeight * LOOKS.length * 1.1,
          pin: true,
          scrub: 0.7,
          onUpdate: (st) => {
            const lit = Math.round(st.progress * BULBS);
            bulbs.forEach((b, i) => b.classList.toggle("on", i < lit));
          },
        },
      });
      cards.forEach((c, i) => {
        const at = i * 1.2;
        if (i > 0) {
          tl.to(cards[i - 1], { rotationY: 270, xPercent: 60, opacity: 0, duration: 0.3 }, at)
            .to(caps[i - 1], { opacity: 0, y: -40, duration: 0.2 }, at)
            .to(c, { rotationY: 0, xPercent: 0, opacity: 1, duration: 0.35 }, at + 0.1)
            .to(caps[i], { opacity: 1, y: 0, duration: 0.25 }, at + 0.2);
        }
        tl.to(c, { rotationY: 180, duration: 0.5 }, at + 0.5).to(
          c.querySelector(".al-lip"),
          { scaleY: 1.2, duration: 0.25, yoyo: true, repeat: 1 },
          at + 0.5
        );
      });
      tl.to({}, { duration: 0.3 });
    }, s);
    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section ref={sec} className="al-sec al-turn" data-off="3" aria-labelledby="turn-h">
      <div className="al-tpin">
        <div className="al-ttext">
          <h2 id="turn-h" className="al-h2 al-ttitle" data-lines="The|turnaround."></h2>
          <p className="al-lede">Every look ends the same way: we hold up the mirror so you see the back. Scroll to spin them.</p>
        </div>
        <div className="al-mirror">
          <div className="al-bulbs" aria-hidden="true">
            {Array.from({ length: BULBS }).map((_, i) => (
              <i key={i} className="al-bulb" style={{ ["--i" as any]: i }} />
            ))}
          </div>
          <div className="al-glass">
            {LOOKS.map((l, i) => (
              <figure className="al-card" key={l.name} style={{ zIndex: 10 - i }}>
                <div className="al-face front">
                  <img src={`/aluma/${l.f}.webp`} alt={`${l.name}, front`} loading={i ? "lazy" : "eager"} draggable={false} />
                  <span className="al-lip">Front</span>
                </div>
                <div className="al-face back">
                  <img src={`/aluma/${l.b}.webp`} alt={`${l.name}, back`} loading="lazy" draggable={false} />
                  <span className="al-lip">Back</span>
                </div>
              </figure>
            ))}
          </div>
        </div>
        <div className="al-tcaps">
          {LOOKS.map((l) => (
            <div className="al-tcap" key={l.name}>
              <h3>{l.name}</h3>
              <p>{l.line}</p>
              <p className="al-meta">{l.meta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
