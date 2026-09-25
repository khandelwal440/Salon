"use client";
import { useEffect, useRef } from "react";
import { gsap, reduced, splitText } from "./fx";

const IMGS = ["party-1", "red-chair", "party-2", "wall-sit", "party-3", "before-after", "look-melt-back", "storefront"];

/** A carousel of salon nights and chair moments on a 3D ring that turns with the scroll. */
export default function Ring() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const s = sec.current!;
    const ch = splitText(s.querySelector<HTMLElement>(".al-rtitle"));
    if (reduced()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: s.querySelector(".al-rpin"), start: "top top", end: () => "+=" + innerHeight * 2, pin: true, scrub: 0.8 },
      });
      tl.from(ch, { yPercent: 120, stagger: 0.02, duration: 0.15, ease: "back.out(2)" }, 0)
        .fromTo(".al-ring3d", { rotationY: 40, rotationX: -18 }, { rotationY: -320, rotationX: 8, ease: "none", duration: 1 }, 0)
        .fromTo(".al-rstage", { scale: 0.6 }, { scale: 1.05, ease: "power1.out", duration: 0.35 }, 0);
    }, s);
    return () => ctx.revert();
  }, []);
  const n = IMGS.length;
  return (
    <section ref={sec} className="al-sec al-ringwrap" data-off="0" aria-labelledby="rg-h">
      <div className="al-rpin">
        <h2 id="rg-h" className="al-h2 al-rtitle" data-lines="Nights at|Aluma."></h2>
        <div className="al-rstage">
          <div className="al-ring3d" style={{ ["--n" as any]: n }}>
            {IMGS.map((im, i) => (
              <figure key={im} className="al-ritem" style={{ ["--i" as any]: i }}>
                <img src={`/aluma/${im}.webp`} alt="" loading="lazy" draggable={false} />
              </figure>
            ))}
          </div>
        </div>
        <p className="al-lede al-rlede">Launch parties, bridal mornings and a lot of selfies at the wall. Some of our favourite evenings.</p>
      </div>
    </section>
  );
}
