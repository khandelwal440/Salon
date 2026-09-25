"use client";
import { useEffect, useRef } from "react";
import { gsap, reduced, wa, splitText } from "./fx";

const STUDIOS = [
  { name: "Whitefield", note: "The flagship. Biggest colour bar, the head spa beds live here.", q: "Aluma Salon Whitefield Bangalore" },
  { name: "HSR Layout", note: "Quick cuts on the way to work. Late slots on weekdays.", q: "Aluma Salon HSR Layout Bangalore" },
  { name: "Sarjapur Road", note: "Bridal suite and a quiet lounge for the family who tags along.", q: "Aluma Salon Sarjapur Road Bangalore" },
];

/** Studio tickets hang from pins and swing when you scroll past. */
export default function Studios() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const s = sec.current!;
    const ch = splitText(s.querySelector<HTMLElement>(".al-sttitle"));
    if (reduced()) return;
    const tickets = gsap.utils.toArray<HTMLElement>(".al-ticket", s);
    const ctx = gsap.context(() => {
      gsap.from(ch, { yPercent: 120, stagger: 0.025, ease: "back.out(2)", duration: 0.8, scrollTrigger: { trigger: s, start: "top 70%" } });
      gsap.from(tickets, {
        y: -300,
        rotation: (i) => [-40, 30, -25][i % 3],
        opacity: 0,
        stagger: 0.14,
        duration: 1.3,
        ease: "elastic.out(1,.45)",
        scrollTrigger: { trigger: s.querySelector(".al-tickets"), start: "top 80%" },
      });
    }, s);
    let last = scrollY,
      v = 0,
      raf = 0;
    const loop = () => {
      const d = scrollY - last;
      last = scrollY;
      v += (d - v) * 0.1;
      tickets.forEach((t, i) => (t.style.setProperty("--sw", `${Math.max(-12, Math.min(12, v * (0.4 + i * 0.12)))}deg`)));
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section ref={sec} className="al-sec al-studios" data-off="6" aria-labelledby="st-h">
      <h2 id="st-h" className="al-h2 al-sttitle" data-lines="Three|chairs|waiting."></h2>
      <div className="al-tickets">
        {STUDIOS.map((st, i) => (
          <article className="al-ticket al-sec" key={st.name} data-off={(i + 2) % 7}>
            <span className="al-pin" aria-hidden="true" />
            <h3>{st.name}</h3>
            <p>{st.note}</p>
            <p className="al-meta">Open daily, 9 am to 9 pm</p>
            <div className="al-trow">
              <a className="al-obtn mag" href={wa(`Hi Aluma! I'd like to book at ${st.name}.`)} target="_blank" rel="noopener">
                Book here
              </a>
              <a className="al-tlink" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(st.q)}`} target="_blank" rel="noopener">
                Directions
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
