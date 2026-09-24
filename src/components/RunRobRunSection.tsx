"use client";

import { useEffect, useRef } from "react";
import "./runrobrun.css";

/* =========================================================================
   RUNROBRUN SECTION CONTENT
   Items for the Tools Reel & Work Canvas
   ========================================================================= */
const ITEMS = [
  {
    t: "Japanese Precision Shears",
    img: "/aluma-tools/shears.jpg",
    v: "/videos/C3815.MP4",
    c: "Cinematic atelier capture of hand-forged Japanese stainless steel shears executing razor-sharp texturizing and precision point-cutting.",
  },
  {
    t: "Aerodynamic Ionic Dryer",
    img: "/aluma-tools/dryer.jpg",
    v: "/videos/aluma-about.mp4",
    c: "High-velocity thermal air dynamics in action, sealing cuticles and sculpting weightless volume with acoustic precision control.",
  },
  {
    t: "Titanium Ceramic Styler",
    img: "/aluma-tools/styler.jpg",
    v: "/aluma-assets/gallery-vid.04e7549cd8de058adea6.mp4",
    c: "Precision thermal conductivity across floating plates creating high-gloss liquid glass hair and sculptural undulating waves.",
  },
  {
    t: "Ultrasonic Cold Fusion",
    img: "/aluma-tools/extension-tool.jpg",
    v: "/aluma-assets/ALUMA.036187e7de1663d09d1a.mp4",
    c: "Acoustic micro-wave hair bonding in motion, fusing keratin polymers seamlessly without thermal friction or cuticle stress.",
  },
  {
    t: "Trichology Scalp Analyzer",
    img: "/aluma-tools/scalp-scanner.jpg",
    v: "/videos/aluma-brand.mp4",
    c: "High-definition 200x polarized diagnostic optics scanning follicle density and delivering customized treatment mapping in real time.",
  },
];

const GALLERY = [
  { src: "/aluma-drive/DSC00577.JPG", alt: "Aluma Salon Precision Straight Styling", cls: "g1", speed: 0.06 },
  { src: "/aluma-drive/DSC00595.JPG", alt: "Aluma Salon High-Fashion Editorial Look", cls: "g2", speed: -0.04 },
  { src: "/aluma-drive/DSC00589.JPG", alt: "Aluma Salon Silky Gloss & Cut Back View", cls: "g3", speed: 0.1 },
];

const SKILLS = [
  {
    t: "Hair Extensions",
    c: "100% Remy human hair seamless tape-ins, micro-rings, and keratin bonding for natural volume, fluid movement, and undetectable length.",
  },
  {
    t: "Wigs",
    c: "Bespoke medical and couture lace-front wigs hand-crafted for flawless hairline blending, lightweight comfort, and custom styling.",
  },
  {
    t: "Hair",
    c: "Precision editorial haircuts, bespoke balayage, dimensional toning, and structural blowouts tailored to your face silhouette.",
  },
  {
    t: "Hair Patch",
    c: "Non-surgical breathable hair replacement systems engineered for seamless scalp integration, natural density, and active daily wear.",
  },
  {
    t: "Perming",
    c: "Advanced textural reconditioning delivering effortless beach waves, lasting root lift, and bouncy defined curls without damage.",
  },
  {
    t: "Skin",
    c: "Clinical hydra-facials, targeted brightening peels, and barrier hydration therapies delivering radiant, glass-like clarity.",
  },
  {
    t: "Nails",
    c: "Artisanal gel extensions, bespoke creative nail art, Russian manicures, and strengthening treatments with mirror-gloss finish.",
  },
  {
    t: "Makeup",
    c: "Editorial, bridal, and red-carpet artistry emphasizing sculpted features, luminous skin textures, and camera-ready elegance.",
  },
];

export default function RunRobRunSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Tools Reel Refs
  const toolsSecRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let isDisposed = false;

    // -------------------------------------------------------------
    // 1. HELPERS & MATH
    // -------------------------------------------------------------
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

    // -------------------------------------------------------------
    // 2. PARALLAX ABOUT GALLERY
    // -------------------------------------------------------------
    const aboutEl = root.querySelector<HTMLElement>("#about");
    const galEl = root.querySelector<HTMLElement>("#gal");
    const figs = galEl ? Array.from(galEl.querySelectorAll<HTMLElement>("figure")) : [];

    const updateParallax = () => {
      if (!aboutEl || figs.length === 0) return;
      const vh = window.innerHeight;
      const rect = aboutEl.getBoundingClientRect();
      if (rect.top > vh + 200 || rect.top < -aboutEl.offsetHeight - 200) return;

      figs.forEach((f) => {
        const speed = parseFloat(f.dataset.speed || "0");
        const centre = rect.top + f.offsetTop + f.offsetHeight / 2;
        f.style.transform = `translate3d(0,${(centre - vh / 2) * speed}px,0)`;
      });
    };

    // -------------------------------------------------------------
    // 3. TOOLS HORIZONTAL REEL & PIXEL DISSOLVE
    // -------------------------------------------------------------
    const sec = toolsSecRef.current;
    const track = trackRef.current;
    const copy = copyRef.current;
    const N = ITEMS.length;

    let cur = 0,
      tgt = 0,
      shown = -1,
      raf = 0;

    const vids = track ? Array.from(track.querySelectorAll<HTMLVideoElement>("video")) : [];
    vids.forEach((v) => {
      v.addEventListener("canplay", () => {
        if (v.parentElement) v.parentElement.classList.add("ready");
      });
      v.addEventListener("playing", () => {
        if (v.parentElement) v.parentElement.classList.add("ready");
      });
    });

    const setActiveSlide = (a: number) => {
      shown = a;
      if (copy) {
        copy.classList.add("out");
        setTimeout(() => {
          if (isDisposed) return;
          if (copy) copy.textContent = ITEMS[a]?.c || "";
          if (copy) copy.classList.remove("out");
        }, 160);
      }

      vids.forEach((v, k) => {
        if (!v) return;
        if (k === a) {
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    };

    const renderTools = (x: number) => {
      if (!track) return;
      const i = Math.min(Math.floor(x), N - 2);
      const f = x - i;
      const t = clamp((f - 0.35) / 0.3, 0, 1);
      const idx = i + t * t * (3 - 2 * t);
      track.style.transform = `translate3d(${-idx * (100 / N)}%,0,0)`;
      const a = Math.round(idx);
      if (a !== shown && a >= 0 && a < N) setActiveSlide(a);
    };

    const measureTools = () => {
      if (!sec) return;
      const max = sec.offsetHeight - window.innerHeight;
      if (max <= 0) return;
      tgt = clamp(-sec.getBoundingClientRect().top / max, 0, 1) * (N - 1);
    };

    const tickTools = () => {
      raf = 0;
      cur += (tgt - cur) * 0.14;
      if (Math.abs(tgt - cur) < 0.0005) cur = tgt;
      renderTools(cur);
      if (cur !== tgt) {
        if (!raf) raf = requestAnimationFrame(tickTools);
      }
    };

    const kickTools = () => {
      if (!raf) raf = requestAnimationFrame(tickTools);
    };

    // -------------------------------------------------------------
    // 4. PROCEDURAL PIXEL RUNNER (24x24 Canvas)
    // -------------------------------------------------------------
    // 4. SCROLL & RESIZE EVENT LISTENERS
    // -------------------------------------------------------------
    const onScroll = () => {
      measureTools();
      kickTools();
      updateParallax();
    };

    const onResize = () => {
      measureTools();
      cur = tgt;
      renderTools(cur);
      updateParallax();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Initial Trigger
    measureTools();
    cur = tgt;
    renderTools(cur);
    updateParallax();
    setActiveSlide(0);

    // Arrow navigation
    const prevBtn = root.querySelector<HTMLButtonElement>("#prev");
    const nextBtn = root.querySelector<HTMLButtonElement>("#next");

    const goSlide = (d: number) => {
      if (!sec) return;
      const a = clamp(Math.round(cur) + d, 0, N - 1);
      const y = sec.offsetTop + (a / (N - 1)) * (sec.offsetHeight - window.innerHeight);
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    if (prevBtn) prevBtn.onclick = () => goSlide(-1);
    if (nextBtn) nextBtn.onclick = () => goSlide(1);

    return () => {
      isDisposed = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={rootRef} className="runrobrun-wrapper font-mono relative">

      {/* ============================================================= */}
      {/* 01: ABOUT SECTION (Parallax Gallery + Interactive Skills)     */}
      {/* ============================================================= */}
      <section className="about" id="about" aria-label="About">
        <div className="gal" id="gal">
          {GALLERY.map((g, idx) => (
            <figure key={idx} className={g.cls} data-speed={g.speed}>
              <div
                className={`im ${g.src ? "has" : ""}`}
                role="img"
                aria-label={g.alt}
                style={g.src ? { backgroundImage: `url('${g.src}')` } : {}}
              >
                {g.src ? "" : g.alt}
              </div>
            </figure>
          ))}
        </div>

        <div className="skills" id="skills">
          {SKILLS.map((s, i) => (
            <article key={i} className="skill" tabIndex={0}>
              <span className="n">[{String(i + 1).padStart(2, "0")}]</span>
              <h3>{s.t}</h3>
              <p>{s.c}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================================= */}
      {/* 02: TOOLS SECTION (Pinned Scroll Reel + Pixel Runner Canvas)   */}
      {/* ============================================================= */}
      <section
        ref={toolsSecRef}
        className="tools"
        id="tools"
        aria-label="Tools"
        style={{ height: `calc(100vh + ${(ITEMS.length - 1) * 120}vh)` }}
      >
        <div className="stick">
          <h2>Tools</h2>
          <div className="rule"></div>
          <div className="meta">
            <p ref={copyRef} id="copy" aria-live="polite">
              {ITEMS[0].c}
            </p>
            <p>Scroll #</p>
          </div>

          <div className="media">
            <div
              ref={trackRef}
              className="track"
              id="track"
              style={{
                width: `${ITEMS.length * 100}%`,
                ["--n" as string]: ITEMS.length,
              }}
            >
              {ITEMS.map((it, idx) => (
                <div key={idx} className="slide">
                  <div className="frame">
                    {it.img && (
                      <img
                        src={it.img}
                        alt={it.t}
                        className="tool-slide-img"
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                    )}
                    {it.v && (
                      <video
                        muted
                        loop
                        playsInline
                        preload={idx === 0 ? "auto" : "metadata"}
                        poster={it.img}
                        src={it.v}
                      ></video>
                    )}
                    <div className="cinematic-indicator">
                      <span className="rec-dot"></span>
                      CINEMATIC REEL
                    </div>
                    <div className="tool-badge">
                      <span className="tool-idx">[{String(idx + 1).padStart(2, "0")}]</span>
                      <span className="tool-name">{it.t}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>


            {/* Arrow Controls */}
            <div className="arrows">
              <button type="button" id="prev" aria-label="Show previous tool">
                &larr;
              </button>
              <button type="button" id="next" aria-label="Show next tool">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
