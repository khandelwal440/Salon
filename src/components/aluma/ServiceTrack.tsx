"use client";
import { useEffect, useRef } from "react";
import { gsap, reduced, splitText, wa } from "./fx";

const SERVICES = [
  { name: "Cut and|blow-dry", what: "A consult, a proper wash, a cut shaped to your face and a blow-dry you can repeat at home.", time: "60 min", price: "₹1,499", img: "svc-cut" },
  { name: "Colour and|balayage", what: "Global colour or hand-painted balayage, sealed with a gloss so it fades soft.", time: "180 min", price: "₹4,999", img: "svc-colour" },
  { name: "Japanese|head spa", what: "Scalp scan, a mist steam and a long shoulder and neck massage. People fall asleep.", time: "90 min", price: "₹2,499", img: "svc-spa" },
  { name: "Keratin|glass", what: "Formaldehyde-free smoothing. Humidity stops winning for up to six months.", time: "150 min", price: "₹5,999", img: "svc-keratin" },
  { name: "Bridal|hair", what: "A trial run first, then the day itself: updo or waves, veil set, touch-up kit to go.", time: "120 min", price: "₹7,999", img: "svc-bridal" },
  { name: "Nails and|glow facial", what: "Nail art, gel or a clean buff, plus a hydrating facial while it sets.", time: "75 min", price: "₹2,899", img: "svc-nails" },
];

/** Pinned horizontal menu. Each service gets its own colour; the photo tilts in 3D as it slides past. */
export default function ServiceTrack() {
  const sec = useRef<HTMLElement>(null);
  useEffect(() => {
    const s = sec.current!;
    const names = Array.from(s.querySelectorAll<HTMLElement>(".al-pname")).map((el) => splitText(el));
    if (reduced()) return;
    const track = s.querySelector<HTMLElement>(".al-track")!;
    const bar = s.querySelector<HTMLElement>(".al-hprog i")!;
    const ctx = gsap.context(() => {
      const dist = () => track.scrollWidth - innerWidth;
      const move = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: s,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (st) => (bar.style.transform = `scaleX(${st.progress})`),
        },
      });
      gsap.utils.toArray<HTMLElement>(".al-panel", s).forEach((p, i) => {
        const frame = p.querySelector(".al-pframe");
        if (frame)
          gsap.fromTo(
            frame,
            { rotationY: -38, rotationZ: -6, z: -120 },
            {
              rotationY: 38,
              rotationZ: 6,
              z: -120,
              ease: "none",
              scrollTrigger: { trigger: p, containerAnimation: move, start: "left right", end: "right left", scrub: true },
            }
          );
        const img = p.querySelector(".al-pframe img");
        if (img)
          gsap.fromTo(img, { xPercent: -8, scale: 1.2 }, { xPercent: 8, scale: 1.2, ease: "none", scrollTrigger: { trigger: p, containerAnimation: move, start: "left right", end: "right left", scrub: true } });
        const ch = names[i - 1];
        if (ch)
          gsap.from(ch, {
            yPercent: 120,
            rotation: 12,
            stagger: 0.02,
            ease: "back.out(2)",
            duration: 0.7,
            scrollTrigger: { trigger: p, containerAnimation: move, start: "left 70%" },
          });
      });
    }, s);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sec} className="al-hs" id="services" aria-label="Services">
      <div className="al-track">
        <article className="al-panel al-pintro al-sec" data-off="1">
          <h2 className="al-h2">
            What we
            <br />
            do all day.
          </h2>
          <p className="al-lede">Six things we're known for. Keep scrolling, they come to you.</p>
          <span className="al-swipe" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </article>
        {SERVICES.map((sv, i) => (
          <article className="al-panel al-sec" key={sv.name} data-off={(i + 2) % 7}>
            <span className="al-pnum">
              {i + 1} of {SERVICES.length}
            </span>
            <h3 className="al-pname" data-lines={sv.name}></h3>
            <div className="al-pstage">
              <div className="al-pframe">
                <img src={`/aluma/${sv.img}.webp`} alt="" loading="lazy" draggable={false} />
              </div>
            </div>
            <div className="al-pfoot">
              <p>{sv.what}</p>
              <div className="al-prow">
                <span className="al-price">
                  {sv.price}
                  <small>{sv.time}</small>
                </span>
                <a className="al-obtn mag" href={wa(`Hi Aluma! I'd like to book: ${sv.name.replace("|", " ")}.`)} target="_blank" rel="noopener">
                  Book this
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="al-hprog" aria-hidden="true">
        <i />
      </div>
    </section>
  );
}
