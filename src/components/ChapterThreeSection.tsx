"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 5 Authentic High-Resolution Salon Transformation Photos from the Google Drive
const FOLDER_PHOTOS = [
  {
    id: 1,
    src: "/aluma-drive/DSC00595.JPG",
    title: "SCULPTURAL",
    sub: "FORM & SILHOUETTE",
    tag: "EDITORIAL STYLING",
    objectPosition: "center 22%",
  },
  {
    id: 2,
    src: "/aluma-drive/DSC00589.JPG",
    title: "BOLD",
    sub: "WHEN NEEDED",
    tag: "PRECISION CUT",
    isShine: true,
    objectPosition: "center 20%",
  },
  {
    id: 3,
    src: "/aluma-drive/DSC00577.JPG",
    title: "HARMONY",
    sub: "OF TONE & LIGHT",
    tag: "LAYERED FORM",
    objectPosition: "center 20%",
  },
  {
    id: 4,
    src: "/aluma-drive/DSC00600.JPG",
    title: "QUIET",
    sub: "WHEN CALLED",
    tag: "TEXTURE & TONE",
    isShine: true,
    objectPosition: "center 20%",
  },
  {
    id: 5,
    src: "/aluma-drive/DSC00594.JPG",
    title: "RELENTLESS",
    sub: "FEARLESS, TIMELESS & BOLD",
    tag: "ALUMA SIGNATURE",
    isShine: true,
    objectPosition: "center 28%",
  },
];

const MAGAZINE_COVERS = [
  { id: "vogue", src: "/images/aluma_vogue_cover.jpg", alt: "Aluma in Vogue", mag: "VOGUE" },
  { id: "elle", src: "/images/aluma_elle_cover.jpg", alt: "Aluma in Elle", mag: "ELLE" },
  { id: "ad", src: "/images/aluma_ad_cover.jpg", alt: "Aluma in Architectural Digest", mag: "ARCHITECTURAL DIGEST" },
  { id: "bazaar", src: "/images/aluma_bazaar_cover.jpg", alt: "Aluma in Harper's Bazaar", mag: "HARPER'S BAZAAR" },
];

export default function ChapterThreeSection() {
  const rootRef = useRef<HTMLElement>(null);
  const photos = FOLDER_PHOTOS;
  const [, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {

      // ==========================================
      // SECTION 1: Spotlight Radial Sweep & Opacity Glide
      // ==========================================
      const s1Tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".chapter-3 .sect-1-wrap",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          id: "stChapterThree",
        },
      });
      s1Tl.set(root, { pointerEvents: "auto" });
      s1Tl.set(".chapter-3 .sect-1-wrap", { opacity: 1 });
      s1Tl.fromTo(".chapter-3 .sect-1", { "--mx": "15%" }, { "--mx": "85%" });

      // ==========================================
      // SECTION 2: Pinned 5-Photo ClipPath Wipe
      // ==========================================
      gsap.set(".chapter-3 .sect-2-wrap", { opacity: 1 });
      gsap.set(".chapter-3 .sect-2-wrap .items", { opacity: 1 });

      // Text triggers for BOLD, QUIET, RELENTLESS
      const triggers = document.querySelectorAll<HTMLElement>(".chapter-3 .sect-2-wrap .trigger");
      const itemTexts = document.querySelectorAll<HTMLElement>(".chapter-3 .sect-2-wrap .item-text");

      triggers.forEach((triggerEl, idx) => {
        const textEl = itemTexts[idx];
        if (!textEl) return;

        const h2Thin = textEl.querySelector<HTMLElement>(".h2-thin");
        const h2Book = textEl.querySelector<HTMLElement>(".h2-book");

        const textTl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerEl,
            start: "top top",
            end: "top top",
            toggleActions: "play none reverse none",
          },
        });

        if (h2Thin) {
          const letterNodes = h2Thin.querySelectorAll<HTMLElement>(".text-word > div");
          textTl.fromTo(
            letterNodes,
            { rotateY: "90deg", opacity: 0, visibility: "hidden" },
            {
              rotateY: "0deg",
              opacity: 1,
              visibility: "inherit",
              stagger: 0.04,
              duration: 0.64,
              ease: "power2.out",
            }
          );
        }

        if (h2Book) {
          textTl.fromTo(h2Book, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "<");
          textTl.to(h2Book, { animation: "shine 1.5s ease 1" }, "<");
        }
      });

      // Photos Scrub Timeline
      const photoTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".chapter-3 .sect-2-wrap",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const currentStep = Math.min(4, Math.floor(self.progress * 5));
            setActivePhotoIdx(currentStep);
          },
        },
      });

      const items = document.querySelectorAll<HTMLElement>(".chapter-3 .sect-2-wrap .item");
      items.forEach((itemEl, idx) => {
        const imgEl = itemEl.querySelector("img");
        if (idx > 0) {
          photoTl.fromTo(
            itemEl,
            { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
            { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1 }
          );
          if (imgEl) {
            photoTl.fromTo(imgEl, { scale: 1.15 }, { scale: 1.0, duration: 1 }, "<");
          }
        }
      });

      // Exit Transition
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".chapter-3 .sect-2-wrap",
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      }).to(".chapter-3 .sect-2-sticky", { yPercent: 100 });

      // ==========================================
      // SECTION 3: Horizontal Drifting Press Spread
      // ==========================================
      const sect3Container = document.querySelector<HTMLElement>(".chapter-3 .sect-3-container");
      const sect3Images = document.querySelectorAll<HTMLElement>(".chapter-3 .sect-3-img");
      const sect3Photos = document.querySelector<HTMLElement>(".chapter-3 .sect-3-photos");

      if (sect3Container && sect3Photos && typeof window !== "undefined" && window.innerWidth >= 1024) {
        const distance = sect3Photos.scrollWidth - window.innerWidth;
        const horizTl = gsap.to(sect3Photos, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: sect3Container,
            scrub: true,
            start: "top top",
            end: "bottom center",
          },
        });

        sect3Images.forEach((imgEl) => {
          const randX = (Math.random() * 20 + 30) * (Math.random() < 0.5 ? 1 : -1);
          const randY = Math.random() * 40 + 50;
          const randRot = (Math.random() * 10 + 10) * (Math.random() < 0.5 ? 1 : -1);

          gsap.fromTo(
            imgEl,
            { rotation: randRot, xPercent: randX, yPercent: randY },
            {
              rotation: -randRot,
              xPercent: -randX,
              yPercent: -randY,
              ease: "none",
              scrollTrigger: {
                trigger: imgEl,
                containerAnimation: horizTl,
                start: "left 120%",
                end: "right -20%",
                scrub: true,
              },
            }
          );
        });

        const vertTl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sect3Container,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        vertTl.to(".chapter-3 .sect-3-title, .chapter-3 .sect-3-descr", { yPercent: -105, duration: 2 });
        vertTl.fromTo(".chapter-3 .sect-3-desc2", { yPercent: 105 }, { yPercent: -100, duration: 2 });
        vertTl.from(".chapter-3 .sect-3-decor2", { scaleY: 0, duration: 2 }, "<");
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="chapter-3"
      data-v-0441ea5a=""
      data-v-da1c79fb=""
      style={{ pointerEvents: "auto" }}
    >
      {/* ------------------------------------------------------------- */}
      {/* SUB-SECTION 1: Spotlight Radial Sweep (Objects of Desire)      */}
      {/* ------------------------------------------------------------- */}
      <div className="sect-1-wrap" data-v-da1c79fb="" data-v-61e9ac12="" style={{ opacity: 1 }}>
        <div className="sect-1-sticky" data-v-61e9ac12="">
          <section className="sect-1" data-v-61e9ac12="" style={{ "--mx": "50%" } as CSSProperties}>
            <div className="sect-1-content" data-v-61e9ac12="">
              {/* Master Stylists Team Image (Full visibility across mobile and desktop) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="img"
                src="/images/image_176.webp"
                alt="Aluma Atelier Master Stylists Collective"
                data-v-61e9ac12=""
              />
            </div>
          </section>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SUB-SECTION 2: Pinned 800vh Track with Folder Photos & Wipe    */}
      {/* ------------------------------------------------------------- */}
      <div className="sect-2-wrap" data-v-da1c79fb="" data-v-ebc3b246="" style={{ opacity: 1 }}>
        {/* Invisible Scroll Triggers */}
        <div className="triggers-for-text" data-v-ebc3b246="">
          <div className="trigger trigger-1" data-v-ebc3b246=""></div>
          <div className="trigger trigger-2" data-v-ebc3b246=""></div>
          <div className="trigger trigger-3" data-v-ebc3b246=""></div>
        </div>

        {/* Sticky 100vh Viewport */}
        <div className="sect-2-sticky" data-v-ebc3b246="">
          {/* 5 Stacked Items (Using Authentic Photos from the Folder) */}
          <div className="items" data-v-ebc3b246="" style={{ opacity: 1 }}>
            {/* Item 1: Editorial Styling */}
            <div className="item" data-v-ebc3b246="">
              <div className="item-photo" data-v-ebc3b246="">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photos[0].src} className="inner-img" alt="Look 01" data-v-ebc3b246="" style={{ objectPosition: photos[0].objectPosition || "center 22%" }} />
                <div className="photo-badge">{photos[0].tag} • 01</div>
              </div>
            </div>

            {/* Item 2: Precision Cut (BOLD WHEN NEEDED) */}
            <div
              className="item"
              data-v-ebc3b246=""
              style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            >
              <div className="item-photo" data-v-ebc3b246="">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photos[1].src} className="inner-img" alt="Look 02" data-v-ebc3b246="" style={{ transform: "scale(1.15, 1.15)", objectPosition: photos[1].objectPosition || "center 20%" }} />
                <div className="photo-badge">{photos[1].tag} • 02</div>
              </div>
              <div className="item-text" data-v-ebc3b246="">
                <div className="text-shine h2-book" data-v-ebc3b246="" data-v-0235e11e="" style={{ opacity: 0 }}>
                  bold
                </div>
                <div className="h2-thin" data-v-ebc3b246="" aria-label="WHEN NEEDED">
                  <div className="text-line" aria-hidden="true">
                    <div className="text-word" aria-hidden="true">
                      <div>W</div><div>H</div><div>E</div><div>N</div>
                    </div>
                  </div>
                  <div className="text-line" aria-hidden="true">
                    <div className="text-word" aria-hidden="true">
                      <div>N</div><div>E</div><div>E</div><div>D</div><div>E</div><div>D</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 3: Layered Form */}
            <div
              className="item"
              data-v-ebc3b246=""
              style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            >
              <div className="item-photo" data-v-ebc3b246="">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photos[2].src} className="inner-img" alt="Look 03" data-v-ebc3b246="" style={{ transform: "scale(1.15, 1.15)", objectPosition: photos[2].objectPosition || "center 20%" }} />
                <div className="photo-badge">{photos[2].tag} • 03</div>
              </div>
            </div>

            {/* Item 4: Texture & Tone (QUIET WHEN CALLED) */}
            <div
              className="item"
              data-v-ebc3b246=""
              style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            >
              <div className="item-photo" data-v-ebc3b246="">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photos[3].src} className="inner-img" alt="Look 04" data-v-ebc3b246="" style={{ transform: "scale(1.15, 1.15)", objectPosition: photos[3].objectPosition || "center 20%" }} />
                <div className="photo-badge">{photos[3].tag} • 04</div>
              </div>
              <div className="item-text" data-v-ebc3b246="">
                <div className="text-shine h2-book" data-v-ebc3b246="" data-v-0235e11e="" style={{ opacity: 0 }}>
                  QUIET
                </div>
                <div className="h2-thin" data-v-ebc3b246="" aria-label="WHEN CALLED">
                  <div className="text-line" aria-hidden="true">
                    <div className="text-word" aria-hidden="true">
                      <div>W</div><div>H</div><div>E</div><div>N</div>
                    </div>
                  </div>
                  <div className="text-line" aria-hidden="true">
                    <div className="text-word" aria-hidden="true">
                      <div>C</div><div>A</div><div>L</div><div>L</div><div>E</div><div>D</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 5: High Occasion / Aluma Signature (RELENTLESS FEARLESS, TIMELESS & BOLD) */}
            <div
              className="item"
              data-v-ebc3b246=""
              style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            >
              <div className="item-photo" data-v-ebc3b246="">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photos[4].src} className="inner-img" alt="Look 05" data-v-ebc3b246="" style={{ transform: "scale(1.15, 1.15)", objectPosition: photos[4].objectPosition || "center 28%" }} />
                <div className="photo-badge">{photos[4].tag} • 05</div>
              </div>
              <div className="item-text" data-v-ebc3b246="">
                <div className="text-shine h2-book" data-v-ebc3b246="" data-v-0235e11e="" style={{ opacity: 0 }}>
                  RELENTLESS
                </div>
                <div className="h2-thin" data-v-ebc3b246="" aria-label="FEARLESS, TIMELESS &">
                  <div className="text-line" aria-hidden="true">
                    <div className="text-word" aria-hidden="true">
                      <div>F</div><div>E</div><div>A</div><div>R</div><div>L</div><div>E</div><div>S</div><div>S</div><div>,</div>
                    </div>
                  </div>
                  <div className="text-line" aria-hidden="true">
                    <div className="text-word" aria-hidden="true">
                      <div>T</div><div>I</div><div>M</div><div>E</div><div>L</div><div>E</div><div>S</div><div>S</div>
                    </div>
                    <div className="text-word" aria-hidden="true">
                      <div>&amp;</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>


      {/* ------------------------------------------------------------- */}
      {/* SUB-SECTION 3: Featured In the World's Leading Voices          */}
      {/* ------------------------------------------------------------- */}
      <div className="sect-3-container" data-v-da1c79fb="" data-v-2b312de3="">
        <div className="sect-3-sticky" data-v-2b312de3="">
          <section className="sect-3" data-v-2b312de3="">
            <div className="sect-3-wrap" data-v-2b312de3="">
              <div className="sect-3-decor2" data-v-2b312de3="" style={{ transform: "scale(1, 0)" }}></div>
              <div className="sect-3-text" data-v-2b312de3="">
                <div className="sect-3-descr l1-thin" data-v-2b312de3="">
                  <div className="sect-3-descr-wrap text-anim" data-v-2b312de3="" aria-label="Where bold ideas find their audience.">
                    <div className="split-line" aria-hidden="true">
                      Where <span className="l1-bold" data-v-2b312de3="">bold ideas</span> find their audience.
                    </div>
                  </div>
                </div>
                <div className="sect-3-title" data-v-2b312de3="">
                  <div className="sect-3-decor" data-v-2b312de3=""></div>
                  <div className="title-anim" data-v-2b312de3="">
                    <div className="h1-thin title-thin" data-v-2b312de3="" aria-label="Featured In the World’s">
                      <div className="text-line" aria-hidden="true">
                        <div className="text-word" aria-hidden="true">
                          <div>F</div><div>e</div><div>a</div><div>t</div><div>u</div><div>r</div><div>e</div><div>d</div>
                        </div>
                      </div>
                      <div className="text-line" aria-hidden="true">
                        <div className="text-word" aria-hidden="true">
                          <div>I</div><div>n</div>
                        </div>
                        <div className="text-word" aria-hidden="true">
                          <div>t</div><div>h</div><div>e</div>
                        </div>
                      </div>
                      <div className="text-line" aria-hidden="true">
                        <div className="text-word" aria-hidden="true">
                          <div>W</div><div>o</div><div>r</div><div>l</div><div>d</div><div>’</div><div>s</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-shine h1-book title-book" data-v-2b312de3="" data-v-0235e11e="">
                      Leading
                    </div>
                    <div className="text-shine h1-book title-book" data-v-2b312de3="" data-v-0235e11e="">
                      Voices
                    </div>
                  </div>
                </div>
              </div>
              <div className="sect-3-desc2 b1-light" data-v-2b312de3="" style={{ transform: "translate(0%, 105%)" }}>
                Aluma&apos;s architectural artistry is recognized by premier luxury publications like{" "}
                <span className="b1-bold" data-v-2b312de3="">
                  Architectural Digest, ELLE, VOGUE, and Harper&apos;s BAZAAR
                </span>
                , highlighting a vision of refined originality.
              </div>
              <div className="sect-3-images" data-v-2b312de3="">
                <div className="sect-3-photos" data-v-2b312de3="">
                  {/* Two identical sets of covers for infinite seamless marquee auto-scroll on mobile */}
                  {[...MAGAZINE_COVERS, ...MAGAZINE_COVERS].map((cover, idx) => (
                    <div key={`${cover.id}-${idx}`} className="sect-3-img relative group" data-v-2b312de3="">
                      {/* Top Magazine Label Badge */}
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full text-[10px] font-mono text-white flex items-center gap-1.5 z-10 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#20B364]" />
                        <span>{cover.mag}</span>
                      </div>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cover.src} className="inner-img" alt={cover.alt} data-v-2b312de3="" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STYLESHEET                                                     */}
      {/* ------------------------------------------------------------- */}
      <style jsx global>{`
        :root {
          --c-obsidian-dust: #08090C;
          --c-soft-concrete: #f1f1f1;
          --default-ease: cubic-bezier(.83, 0, .17, 1);
          --20: 1.25rem;
          --72: 4.5rem;
        }

        .chapter-3 {
          position: relative;
          background: #08090C;
          color: #f1f1f1;
        }

        /* 1. Sect 1 (Spotlight sweep & Opacity glide) */
        .chapter-3 .sect-1-sticky {
          height: 100vh;
          height: 100svh;
          left: 0;
          overflow: hidden;
          position: sticky;
          top: 0;
          width: 100%;
        }
        .chapter-3 .sect-1-wrap {
          height: 300vh;
          margin-top: 0;
          position: relative;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-1-wrap {
            height: 180vh; /* Smooth, natural scroll distance for mobile opacity sweep */
            position: relative;
          }
          .chapter-3 .sect-1-sticky {
            height: 100vh;
            height: 100svh;
            position: sticky;
            top: 0;
            left: 0;
            width: 100%;
            overflow: hidden;
          }
        }
        .chapter-3 .sect-1 {
          height: 100vh;
          height: 100svh;
          position: relative;
          --mx: 50%;
          /* Luminous spotlight at center, with sleek 35% silhouette opacity for rest of team */
          -webkit-mask: radial-gradient(ellipse 50% 75% at var(--mx, 50%) 50%, #000 0%, #000 25%, rgba(0, 0, 0, 0.35) 70%, rgba(0, 0, 0, 0.22) 100%);
          mask: radial-gradient(ellipse 50% 75% at var(--mx, 50%) 50%, #000 0%, #000 25%, rgba(0, 0, 0, 0.35) 70%, rgba(0, 0, 0, 0.22) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-1 {
            height: 100vh;
            height: 100svh;
            width: 100%;
            /* Wide luminous spotlight for mobile: smoothly sweeps across all figures */
            -webkit-mask: radial-gradient(ellipse 55% 75% at var(--mx, 50%) 50%, #000 0%, #000 25%, rgba(0, 0, 0, 0.38) 70%, rgba(0, 0, 0, 0.25) 100%) !important;
            mask: radial-gradient(ellipse 55% 75% at var(--mx, 50%) 50%, #000 0%, #000 25%, rgba(0, 0, 0, 0.38) 70%, rgba(0, 0, 0, 0.25) 100%) !important;
          }
        }
        .chapter-3 .sect-1-content {
          background: #08090C;
          inset: 0;
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .chapter-3 .sect-1-content .img {
          mix-blend-mode: lighten;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 48rem;
          max-width: 80vw;
          max-height: 80vh;
          object-fit: contain;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-1-content {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            background: #08090C;
          }
          .chapter-3 .sect-1-content .img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 95vw;
            max-width: 32rem;
            max-height: 72vh;
            object-fit: contain;
          }
        }
        .chapter-3 .chapter-title {
          left: 25rem;
          padding-left: 1.8125rem;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
        @media (max-width: 1023px) {
          .chapter-3 .chapter-title {
            left: 1rem;
          }
        }
        .chapter-3 .decor {
          align-items: center;
          background: #f1f1f1;
          display: flex;
          height: .5625rem;
          justify-content: center;
          left: 0;
          position: absolute;
          top: .125rem;
          width: .5625rem;
        }
        .chapter-3 .decor:after {
          background: #08090C;
          border-radius: 100%;
          content: "";
          height: .4763rem;
          width: .4763rem;
        }
        .chapter-3 .chapter-count {
          position: absolute;
          right: 13.9375rem;
          top: 50%;
          transform: translateY(-50%);
          text-transform: uppercase;
        }
        @media (max-width: 1023px) {
          .chapter-3 .chapter-count {
            right: 1rem;
          }
        }

        /* 2. Sect 2 (Universal Pinned 5-Photo ClipPath Wipe Track) */
        .chapter-3 .sect-2-wrap {
          height: 800vh;
          position: relative;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-2-wrap {
            height: 320vh; /* snappy, seamless transitions on mobile with zero dead zones */
            display: block;
          }
        }
        .chapter-3 .sect-2-sticky {
          height: 100vh;
          height: 100svh;
          left: 0;
          overflow: hidden;
          position: sticky;
          top: 0;
          width: 100%;
        }
        .chapter-3 .sect-2-sticky .main-title {
          left: 26.625rem;
          position: absolute;
          top: 1.25rem;
          z-index: 5;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-2-sticky .main-title {
            left: 1.25rem;
            top: 1.25rem;
          }
        }
        .chapter-3 .items {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: min(560px, 86vw);
          height: min(640px, 70vh);
          border-radius: 1.5rem;
          overflow: hidden;
          background: #08090C;
          box-shadow: 0 25px 70px -10px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.12), 0 0 40px -10px rgba(104, 117, 233, 0.2);
          z-index: 10;
        }
        @media (max-width: 640px) {
          .chapter-3 .items {
            border-radius: 1.25rem;
            width: 88vw;
            height: 64vh;
          }
        }
        .chapter-3 .item {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          overflow: hidden;
        }
        .chapter-3 .item-photo {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background: #08090C;
        }
        .chapter-3 .item-photo:after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(8, 9, 12, 0.1) 0%, transparent 40%, rgba(8, 9, 12, 0.85) 100%);
          pointer-events: none;
        }
        .chapter-3 .photo-badge {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          z-index: 30;
          font-family: monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          padding: 0.4rem 1rem;
          border-radius: 9999px;
          background: rgba(11, 13, 19, 0.85);
          border: 1px solid rgba(104, 117, 233, 0.3);
          color: #F8FAFC;
          backdrop-filter: blur(14px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6), 0 0 15px -3px rgba(32, 179, 100, 0.25);
        }
        @media (max-width: 640px) {
          .chapter-3 .photo-badge {
            top: 1rem;
            left: 1rem;
            font-size: 0.65rem;
            padding: 0.3rem 0.75rem;
          }
        }
        .chapter-3 .inner-img {
          height: 100%;
          left: 0;
          object-fit: cover;
          position: absolute;
          top: 0;
          width: 100%;
          filter: contrast(108%) brightness(95%);
        }
        .chapter-3 .item-text {
          position: absolute;
          z-index: 30;
          pointer-events: none;
          text-shadow: 0 4px 25px rgba(0, 0, 0, 0.95);
          bottom: 2rem;
          left: 2rem;
          right: 2rem;
        }
        @media (max-width: 640px) {
          .chapter-3 .item-text {
            bottom: 1.25rem;
            left: 1.25rem;
            right: 1.25rem;
          }
        }
        .chapter-3 .item:nth-child(2) .item-text {
          text-align: right;
        }
        .chapter-3 .item:nth-child(4) .item-text {
          text-align: left;
        }
        .chapter-3 .item:nth-child(5) .item-text {
          text-align: left;
        }
        .chapter-3 .triggers-for-text {
          inset: 0;
          padding-top: 100vh;
          position: absolute;
          pointer-events: none;
        }
        .chapter-3 .trigger {
          position: absolute;
          width: 100%;
          z-index: 10;
        }
        .chapter-3 .trigger-1 {
          top: 300vh;
        }
        .chapter-3 .trigger-2 {
          top: 510vh;
        }
        .chapter-3 .trigger-3 {
          top: 660vh;
        }
        @media (max-width: 1023px) {
          .chapter-3 .trigger-1 {
            top: 180vh;
          }
          .chapter-3 .trigger-2 {
            top: 310vh;
          }
          .chapter-3 .trigger-3 {
            top: 400vh;
          }
        }

        /* 4. Sect 3 (Featured In Leading Voices) */
        /* 4. Sect 3 (Featured In Leading Voices) */
        .chapter-3 .sect-3-container {
          height: 400vh;
          position: relative;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-3-container {
            height: auto !important;
            position: relative !important;
            display: block !important;
            padding: 3rem 1rem 4rem !important;
          }
        }
        .chapter-3 .sect-3-sticky {
          height: 100vh;
          left: 0;
          overflow: hidden;
          position: sticky;
          top: 0;
          width: 100%;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-3-sticky {
            position: relative !important;
            height: auto !important;
            width: 100% !important;
            overflow: visible !important;
          }
        }
        .chapter-3 .sect-3 {
          background: #08090C;
          inset: 0;
          padding: 1.25rem;
          position: absolute;
          z-index: 10;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-3 {
            position: relative !important;
            inset: auto !important;
            padding: 0 !important;
            background: transparent !important;
            width: 100% !important;
          }
        }
        .chapter-3 .sect-3-wrap {
          background: #0B0C10;
          color: #F8FAFC;
          border: 1px solid rgba(255, 255, 255, 0.12);
          height: 100%;
          overflow: hidden;
          position: relative;
          z-index: 100;
          border-radius: 1.5rem;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-3-wrap {
            height: auto !important;
            min-height: auto !important;
            padding: 2.25rem 1.25rem 2.5rem !important;
            overflow: hidden !important;
            display: flex !important;
            flex-direction: column !important;
            gap: 1.5rem !important;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.85) !important;
          }
        }
        @media (max-width: 640px) {
          .chapter-3 .sect-3-wrap {
            border-radius: 1.25rem;
          }
        }
        .chapter-3 .sect-3-descr {
          left: 4.6875rem;
          padding-top: 18.3125rem;
          position: absolute;
          top: 0;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-3-descr {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            padding: 0 !important;
            text-align: left !important;
            width: 100% !important;
            color: #20B364 !important;
            font-size: 11px !important;
            letter-spacing: 0.22em !important;
            text-transform: uppercase !important;
            font-weight: 700 !important;
            font-family: var(--font-mono) !important;
          }
        }
        .chapter-3 .sect-3-title {
          left: 26.625rem;
          padding-top: 1.25rem;
          position: absolute;
          top: 0;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-3-title {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            padding: 0 !important;
            width: 100% !important;
          }
          .chapter-3 .sect-3-title .h1-thin,
          .chapter-3 .sect-3-title .h1-book {
            font-size: clamp(2.2rem, 9.5vw, 3.4rem) !important;
            line-height: 92% !important;
            letter-spacing: -0.04rem !important;
          }
          .chapter-3 .sect-3-title .text-word > div {
            transform: none !important;
            opacity: 1 !important;
            visibility: visible !important;
          }
          .chapter-3 .sect-3-title .text-shine {
            opacity: 1 !important;
            visibility: visible !important;
          }
        }
        .chapter-3 .sect-3-decor {
          background: #0b0b0b;
          height: 19.875rem;
          left: -2.5rem;
          position: absolute;
          top: -.125rem;
          width: 1.25rem;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-3-decor,
          .chapter-3 .sect-3-decor2 {
            display: none !important;
          }
        }
        .chapter-3 .sect-3-images {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: center;
          left: 0;
          position: absolute;
          top: 0;
          width: 100%;
        }
        @keyframes autoGlideCovers {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 0.625rem));
          }
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-3-images {
            position: relative !important;
            inset: auto !important;
            height: auto !important;
            width: 100% !important;
            margin: 1.25rem 0 !important;
            overflow: hidden !important;
            mask-image: linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%);
          }
          .chapter-3 .sect-3-photos {
            display: flex !important;
            flex-direction: row !important;
            gap: 1.25rem !important;
            padding: 0.5rem 0 1.25rem !important;
            width: max-content !important;
            animation: autoGlideCovers 20s linear infinite !important;
            will-change: transform !important;
            touch-action: pan-y;
          }
          .chapter-3 .sect-3-photos:hover,
          .chapter-3 .sect-3-photos:active {
            animation-play-state: paused !important;
          }
        }
        @media (min-width: 1024px) {
          .chapter-3 .sect-3-photos {
            animation: none !important;
          }
        }
        .chapter-3 .sect-3-img {
          height: 23rem;
          position: relative;
          width: 17.5rem;
          z-index: 100;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.06);
          background: #000;
          flex-shrink: 0;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-3-img {
            flex-shrink: 0 !important;
            width: 220px !important;
            height: 320px !important;
            scroll-snap-align: center !important;
            transform: none !important;
            border-radius: 1rem !important;
            overflow: hidden !important;
            box-shadow: 0 16px 36px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.15) !important;
            background: #000 !important;
            position: relative !important;
          }
          .chapter-3 .sect-3-img .inner-img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            display: block !important;
          }
        }
        .chapter-3 .sect-3-desc2 {
          bottom: 0;
          color: #f1f1f1;
          left: 25.375rem;
          mix-blend-mode: difference;
          padding-bottom: 3.5rem;
          position: absolute;
          width: 14rem;
          z-index: 1000;
          font-size: 0.9375rem;
          line-height: 135%;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-3-desc2 {
            position: relative !important;
            left: auto !important;
            bottom: auto !important;
            transform: none !important;
            width: 100% !important;
            padding-top: 1.25rem !important;
            color: #CBD5E1 !important;
            font-size: 13px !important;
            line-height: 1.55 !important;
            mix-blend-mode: normal !important;
            border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
          }
        }
        .chapter-3 .sect-3-decor2 {
          background: #0b0b0b;
          bottom: -.125rem;
          height: 19.875rem;
          position: absolute;
          right: 24.0625rem;
          transform-origin: bottom;
          width: 1.25rem;
        }

        /* 5. Typography Classes */
        .h1-thin {
          font-family: var(--font-alata), var(--font-sans), sans-serif;
          font-size: 6.25rem;
          letter-spacing: -.4rem;
          line-height: 90%;
          text-transform: uppercase;
          font-weight: 300;
        }
        @media (max-width: 1023px) {
          .h1-thin {
            font-size: clamp(2.4rem, 11vw, 4rem);
            letter-spacing: -.15rem;
          }
        }
        .h1-book {
          font-family: var(--font-alata), var(--font-sans), sans-serif;
          font-size: 6.25rem;
          letter-spacing: -.45rem;
          line-height: 90%;
          text-transform: uppercase;
          font-weight: 400;
        }
        @media (max-width: 1023px) {
          .h1-book {
            font-size: clamp(2.4rem, 11vw, 4rem);
            letter-spacing: -.18rem;
          }
        }
        .h2-thin {
          font-family: var(--font-alata), var(--font-sans), sans-serif;
          font-size: 2.85rem;
          letter-spacing: -.12rem;
          line-height: 95%;
          text-transform: uppercase;
          font-weight: 300;
          color: #F8FAFC;
        }
        @media (max-width: 1023px) {
          .h2-thin {
            font-size: clamp(1.4rem, 6.5vw, 2rem);
            letter-spacing: -.05rem;
          }
        }
        .h2-book {
          font-family: var(--font-alata), var(--font-sans), sans-serif;
          font-size: 2.85rem;
          letter-spacing: -.12rem;
          line-height: 95%;
          text-transform: uppercase;
          font-weight: 700;
        }
        @media (max-width: 1023px) {
          .h2-book {
            font-size: clamp(1.4rem, 6.5vw, 2rem);
            letter-spacing: -.05rem;
          }
        }
        .l1-thin {
          font-size: .75rem;
          letter-spacing: -.0075rem;
          line-height: 110%;
          text-transform: uppercase;
          font-weight: 300;
        }
        .l1-bold {
          font-size: .75rem;
          letter-spacing: -.0075rem;
          line-height: 110%;
          text-transform: uppercase;
          font-weight: 700;
        }
        .b1-light {
          font-size: .9375rem;
          letter-spacing: -.0094rem;
          line-height: 135%;
          font-weight: 300;
        }
        .b1-bold {
          font-weight: 700;
        }
        .text-line {
          position: relative;
          display: block;
          margin-bottom: -0.4rem;
          padding-bottom: 0.4rem;
          overflow: hidden;
        }
        .text-word {
          position: relative;
          display: inline-block;
        }
        /* FIX: words were sticking together ("Inthe", "TIMELESS&") */
        .text-word + .text-word {
          margin-left: 0.28em;
        }
        .text-word > div {
          position: relative;
          display: inline-block;
          will-change: transform, opacity;
        }

        /* 6. Text Shine Effect (Aluma Logo Triad: Green #20B364, Iris Blue #6875E9, Orchid Pink #EA54DB) */
        .text-shine {
          background-clip: text;
          -webkit-background-clip: text;
          background-image: linear-gradient(
            90deg,
            #20B364 0%,
            #6875E9 25%,
            #FFFFFF 50%,
            #EA54DB 75%,
            #20B364 100%
          );
          background-position: -100% 0;
          background-size: 200% 100%;
          color: transparent !important;
          -webkit-text-fill-color: transparent !important;
          padding-right: .625rem;
          animation: alumaShine 3s cubic-bezier(.83, 0, .17, 1) infinite;
        }
        @keyframes alumaShine {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }

        /* 7. Mobile fix: use small-viewport height so the phone address bar
              doesn't leave a blank strip under the pinned panels.
              (Browsers without svh support just keep the 100vh above.) */
        @media (max-width: 1023px) {
          .chapter-3 .sect-1-sticky,
          .chapter-3 .sect-1,
          .chapter-3 .sect-3-sticky {
            height: 100svh;
          }
        }
      `}</style>
    </section>
  );
}