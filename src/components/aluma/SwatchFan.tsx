"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, reduced, burst, buzz, splitText } from "./fx";
import { setBase, pal } from "./palette";

const SW = [
  { name: "Espresso", a: "#24140C", b: "#6A4028", p: 3 },
  { name: "Plum rush", a: "#3E0F30", b: "#B0337F", p: 4 },
  { name: "Iris", a: "#3B3FA8", b: "#AEB6FF", p: 2 },
  { name: "Leaf green", a: "#0F6B3A", b: "#6FE3A2", p: 1 },
  { name: "Petal pink", a: "#B32FA6", b: "#FFC7F6", p: 0 },
  { name: "Champagne ash", a: "#8C7C62", b: "#F3E7CF", p: 3 },
  { name: "Mint tips", a: "#2A1E16", b: "#BDF5D5", p: 5 },
  { name: "Butterscotch", a: "#5A3217", b: "#E8A95C", p: 6 },
  { name: "Blue black", a: "#0B0E24", b: "#353C78", p: 4 },
];

/** A colourist's swatch ring. Scroll to fan it open, tap a strand to dye the site. */
export default function SwatchFan() {
  const sec = useRef<HTMLElement>(null);
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    const s = sec.current!;
    const title = splitText(s.querySelector<HTMLElement>(".al-ftitle"));
    const sws = gsap.utils.toArray<HTMLElement>(".al-sw", s);
    const n = sws.length;
    const spread = () => (innerWidth < 700 ? 11 : 13);
    if (reduced()) {
      sws.forEach((el, i) => gsap.set(el, { rotation: (i - (n - 1) / 2) * spread() }));
      return;
    }
    const ctx = gsap.context(() => {
      gsap.set(sws, { rotation: 0, rotationX: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: s.querySelector(".al-fpin"), start: "top top", end: () => "+=" + innerHeight * 1.3, pin: true, scrub: 0.8, invalidateOnRefresh: true },
      });
      tl.from(title, { yPercent: 120, stagger: 0.02, duration: 0.3, ease: "back.out(2)" }, 0)
        .from(".al-ring", { scale: 0, rotation: -180, duration: 0.3, ease: "back.out(2)" }, 0)
        .from(sws, { yPercent: -100, scaleY: 0.2, opacity: 0, duration: 0.3, stagger: 0.02, ease: "power2.out" }, 0.05)
        .to(sws, {
          rotation: (i) => (i - (n - 1) / 2) * spread(),
          rotationX: 18,
          z: (i) => -Math.abs(i - (n - 1) / 2) * 14,
          duration: 0.7,
          ease: "power3.inOut",
        }, 0.35);
    }, s);
    // idle sway
    const sway = gsap.to(".al-fan", { rotation: 2.5, duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut", transformOrigin: "50% 0%" });
    return () => {
      ctx.revert();
      sway.kill();
    };
  }, []);

  const pick = (i: number, e: React.MouseEvent) => {
    const sw = SW[i];
    const old = pal(0);
    setBase(sw.p);
    setPicked(sw.name);
    buzz(20);
    burst(e.clientX, e.clientY, old.ink, sw.b, sw.name + "!");
    if (!reduced()) gsap.fromTo(e.currentTarget, { scaleY: 1.12 }, { scaleY: 1, duration: 0.8, ease: "elastic.out(1,.3)" });
  };

  return (
    <section ref={sec} className="al-sec al-fanwrap" data-off="4" aria-labelledby="fan-h">
      <div className="al-fpin">
        <div className="al-fhead">
          <h2 id="fan-h" className="al-h2 al-ftitle" data-lines="Pick a|colour."></h2>
          <p className="al-lede" aria-live="polite">
            {picked ? `${picked}. Good choice. Book a colour consult and we'll mix it for your skin tone.` : "These are real shades from our colour bar. Tap one and the whole site dyes to match."}
          </p>
        </div>
        <div className="al-fanstage">
          <div className="al-fan">
            <span className="al-ring" aria-hidden="true" />
            {SW.map((sw, i) => (
              <button
                key={sw.name}
                className="al-sw"
                style={{ ["--a" as any]: sw.a, ["--b" as any]: sw.b, zIndex: 20 - Math.abs(i - 4) }}
                onClick={(e) => pick(i, e)}
                aria-label={`Dye the site ${sw.name}`}
              >
                <span className="al-swtag">{sw.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
