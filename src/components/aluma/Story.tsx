"use client";
import { useEffect, useRef } from "react";
import { gsap, reduced, splitText } from "./fx";

const STOPS = [
  { h: "2018. One studio in Whitefield.", p: "A handful of chairs and one house rule: talk for five minutes before anyone picks up the scissors." },
  { h: "Then HSR Layout and Sarjapur Road.", p: "Same training, same colour bar, closer to where people actually live." },
  { h: "Then your living room.", p: "Book in the Aluma app and a stylist turns up with the kit. You keep your slippers on." },
  { h: "Today. 35,000 clients later.", p: "Still talking for five minutes first." },
];

/** A single wavy strand of hair draws itself down the page as you read. */
export default function Story() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const s = sec.current!;
    const ch = splitText(s.querySelector<HTMLElement>(".al-sytitle"));
    if (reduced()) return;
    const path = s.querySelector<SVGPathElement>(".al-strand path.main")!;
    const len = path.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.from(ch, { yPercent: 120, stagger: 0.025, duration: 0.8, ease: "back.out(2)", scrollTrigger: { trigger: s, start: "top 70%" } });
      gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: s.querySelector(".al-sylist"), start: "top 70%", end: "bottom 60%", scrub: 0.5 } });
      gsap.utils.toArray<HTMLElement>(".al-stop", s).forEach((st) => {
        gsap.from(st.querySelector(".al-knot"), { scale: 0, duration: 0.8, ease: "elastic.out(1,.4)", scrollTrigger: { trigger: st, start: "top 70%" } });
        gsap.from(st.querySelectorAll("h3,p"), { x: 60, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: st, start: "top 72%" } });
      });
    }, s);
    return () => ctx.revert();
  }, []);
  // wavy path, 100 wide x 1000 tall, stretched to the list height
  let d = "M50 0";
  for (let i = 0; i < 10; i++) d += ` C${i % 2 ? 90 : 10} ${i * 100 + 30}, ${i % 2 ? 90 : 10} ${i * 100 + 70}, 50 ${i * 100 + 100}`;
  return (
    <section ref={sec} className="al-sec al-story" data-off="1" aria-labelledby="sy-h">
      <h2 id="sy-h" className="al-h2 al-sytitle" data-lines="How we|got here."></h2>
      <div className="al-sylist">
        <svg className="al-strand" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
          <path d={d} className="ghost" />
          <path d={d} className="main" />
        </svg>
        <ol>
          {STOPS.map((st) => (
            <li className="al-stop" key={st.h}>
              <span className="al-knot" aria-hidden="true" />
              <h3>{st.h}</h3>
              <p>{st.p}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
