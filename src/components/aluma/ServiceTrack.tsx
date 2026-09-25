"use client";
import { useEffect, useRef } from "react";
import { gsap, reduced, splitText, wa } from "./fx";

const SERVICES = [
  {
    name: "Men's cut|& beard",
    what: "Hair cut ₹399, kids hair cut ₹249, beard styling & shave ₹199, beard colour ₹299, and dandruff wash ₹899.",
    time: "from 30 min",
    price: "₹399",
    img: "svc-cut.webp",
  },
  {
    name: "Women's cut|& blow-dry",
    what: "Basic cuts (U, V & Straight) ₹699, advance cut ₹899, blow-dry curls ₹699, ironing curls ₹1,099, and hair do ₹1,399.",
    time: "from 45 min",
    price: "₹699",
    img: "svc-womencut.jpg",
  },
  {
    name: "Hair wash|& scalp spa",
    what: "Regular wash ₹299, sulphate-free restorative wash ₹599, dandruff wash ₹899, and wash & blow dry ₹499.",
    time: "from 30 min",
    price: "₹299",
    img: "svc-wash.jpg",
  },
  {
    name: "Clean-up &|luxury facials",
    what: "Basic clean up ₹899, premium clean up ₹1,399, instant glow ₹2,999, glass skin ₹4,999, and hydra facial ₹6,999.",
    time: "from 45 min",
    price: "₹899",
    img: "svc-facial.webp",
  },
  {
    name: "Threading &|Rica waxing",
    what: "Eyebrows ₹49, upper lip & chin ₹39, full face ₹249, Rica wax from ₹99, front wax ₹599, and full body ₹2,999.",
    time: "from 15 min",
    price: "₹39",
    img: "svc-threading.jpg",
  },
  {
    name: "Targeted & body|De-Tan",
    what: "Underarms de-tan ₹200, face & neck ₹400, full back ₹700, feet ₹600, arms ₹1,100, legs ₹1,200, and full body ₹4,000.",
    time: "from 20 min",
    price: "₹200",
    img: "svc-detan.jpg",
  },
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
      const getDist = () => {
        const panels = Array.from(track.querySelectorAll<HTMLElement>(".al-panel"));
        if (!panels.length) return track.scrollWidth - innerWidth;
        const last = panels[panels.length - 1];
        return Math.max(0, last.offsetLeft + last.offsetWidth - innerWidth);
      };
      const move = gsap.to(track, {
        x: () => -getDist(),
        ease: "none",
        scrollTrigger: {
          trigger: s,
          start: "top top",
          end: () => "+=" + getDist(),
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
          <div className="al-pintro-mobile" aria-hidden="true">
            <div className="al-pintro-card">
              <div className="al-pintro-head">
                <span className="al-pintro-badge">
                  <i />
                  Official Salon Menu
                </span>
                <span className="al-pintro-count">06 Services</span>
              </div>
              <div className="al-pintro-pills">
                <span className="al-pintro-pill"><em>✂️</em> Men's Cut (₹399)</span>
                <span className="al-pintro-pill"><em>💇</em> Women's Cut (₹699)</span>
                <span className="al-pintro-pill"><em>💆</em> Scalp Wash (₹299)</span>
                <span className="al-pintro-pill"><em>✨</em> Facials (₹899)</span>
                <span className="al-pintro-pill"><em>🌸</em> Threading (₹39)</span>
                <span className="al-pintro-pill"><em>☀️</em> De-Tan (₹200)</span>
              </div>
              <div className="al-pintro-thumbs">
                <div className="al-pintro-thumb">
                  <img src="/aluma/svc-cut.webp" alt="Men's Cut" />
                  <span>Cut</span>
                </div>
                <div className="al-pintro-thumb">
                  <img src="/aluma/svc-womencut.jpg" alt="Women's Cut" />
                  <span>Style</span>
                </div>
                <div className="al-pintro-thumb">
                  <img src="/aluma/svc-wash.jpg" alt="Wash" />
                  <span>Wash</span>
                </div>
                <div className="al-pintro-thumb">
                  <img src="/aluma/svc-facial.webp" alt="Facial" />
                  <span>Facial</span>
                </div>
              </div>
              <div className="al-pintro-prompt">
                <span>Swipe left to explore</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </article>
        {SERVICES.map((sv, i) => (
          <article className="al-panel al-sec" key={sv.name} data-off={(i + 2) % 7}>
            <span className="al-pnum">
              {i + 1} of {SERVICES.length}
            </span>
            <h3 className="al-pname" data-lines={sv.name}></h3>
            <div className="al-pstage">
              <div className="al-pframe">
                <img
                  src={sv.img.startsWith("/") ? sv.img : sv.img.includes(".") ? `/aluma/${sv.img}` : `/aluma/${sv.img}.webp`}
                  alt=""
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
            <div className="al-pfoot">
              <p>{sv.what}</p>
              <div className="al-prow">
                <span className="al-price">
                  {sv.price}
                  <small>{sv.time}</small>
                </span>
                <a className="al-obtn mag" href={wa(`Hi Aluma! I'd like to book: ${sv.name.replace("|", " ")} (${sv.price}).`)} target="_blank" rel="noopener">
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
