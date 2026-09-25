"use client";
import { useEffect, useRef } from "react";
import { gsap, reduced, splitText, finePointer } from "./fx";
import { C } from "./palette";

/** About hero: the three logo dots as glossy balls that follow your pointer, then roll away as you scroll. */
export default function AboutHero() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const s = sec.current!;
    const chars = splitText(s.querySelector<HTMLElement>("h1"));
    if (reduced()) return;
    const balls = gsap.utils.toArray<HTMLElement>(".al-ball", s);
    const ctx = gsap.context(() => {
      const intro = () => {
        gsap.from(chars, { yPercent: 120, rotation: 10, stagger: 0.03, duration: 0.9, ease: "back.out(1.8)" });
        gsap.from(balls, { scale: 0, duration: 1.1, ease: "elastic.out(1,.4)", stagger: 0.12, delay: 0.2 });
        gsap.from(".al-ahsub", { y: 30, opacity: 0, delay: 0.5, duration: 0.6 });
      };
      if ((window as any).__alReady) intro();
      else window.addEventListener("al:ready", intro, { once: true });
      balls.forEach((b, i) =>
        gsap.to(b, { y: "+=22", duration: 2 + i * 0.4, yoyo: true, repeat: -1, ease: "sine.inOut" })
      );
      gsap.to(balls, {
        yPercent: (i) => [-160, 120, 60][i],
        xPercent: (i) => [-80, 90, -40][i],
        scale: (i) => [2.2, 0.5, 1.6][i],
        ease: "none",
        scrollTrigger: { trigger: s, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("h1 .ln", { xPercent: (i) => (i % 2 ? 20 : -20), ease: "none", scrollTrigger: { trigger: s, start: "top top", end: "bottom top", scrub: true } });
    }, s);
    let raf = 0;
    const tgt = { x: 0, y: 0 },
      cur = { x: 0, y: 0 };
    const mv = (e: PointerEvent) => {
      tgt.x = e.clientX / innerWidth - 0.5;
      tgt.y = e.clientY / innerHeight - 0.5;
    };
    if (finePointer()) {
      addEventListener("pointermove", mv);
      const loop = () => {
        cur.x += (tgt.x - cur.x) * 0.06;
        cur.y += (tgt.y - cur.y) * 0.06;
        s.style.setProperty("--mx", String(cur.x));
        s.style.setProperty("--my", String(cur.y));
        raf = requestAnimationFrame(loop);
      };
      loop();
    }
    return () => {
      ctx.revert();
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", mv);
    };
  }, []);
  return (
    <section ref={sec} className="al-sec al-ahero" data-off="2">
      <div className="al-balls" aria-hidden="true">
        <span className="al-ballw b1"><i className="al-ball" style={{ ["--c" as any]: C.green }} /></span>
        <span className="al-ballw b2"><i className="al-ball" style={{ ["--c" as any]: C.iris }} /></span>
        <span className="al-ballw b3"><i className="al-ball" style={{ ["--c" as any]: C.pink }} /></span>
      </div>
      <h1 className="al-h1 al-ah1" data-lines="Three dots.|One chair|at a time."></h1>
      <p className="al-sub al-ahsub">
        Aluma is a Bangalore salon, open since 2018. We cut, colour and fuss over hair in Whitefield, HSR Layout and Sarjapur Road.
      </p>
    </section>
  );
}
