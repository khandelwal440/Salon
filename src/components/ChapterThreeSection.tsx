"use client";

import { useEffect, useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 5 Authentic High-Resolution Salon Transformation Photos from the folder
const FOLDER_PHOTOS = [
  {
    id: 1,
    src: "/aluma-assets/aluma-white-hero.4e1788185e4dce97f3b3.jpeg",
    title: "SCULPTURAL",
    sub: "FORM & SILHOUETTE",
    tag: "PRECISION CUT",
  },
  {
    id: 2,
    src: "/aluma-assets/haircolorF.6f5b1a1c602c52d43689.png",
    title: "BOLD",
    sub: "WHEN NEEDED",
    tag: "FRENCH BALAYAGE",
    isShine: true,
  },
  {
    id: 3,
    src: "/aluma-assets/1.66e60b3584f79fa15f73.jpeg",
    title: "HARMONY",
    sub: "OF TONE & LIGHT",
    tag: "CASHMERE MELT",
  },
  {
    id: 4,
    src: "/aluma-assets/treatmentsF.9128d5ce138c0e09ae6b.png",
    title: "QUIET",
    sub: "WHEN CALLED",
    tag: "BOTANICAL SPA",
    isShine: true,
  },
  {
    id: 5,
    src: "/aluma-assets/brideF.b368b3b3ce3801b10be8.png",
    title: "RELENTLESS",
    sub: "FEARLESS, TIMELESS & BOLD",
    tag: "COUTURE BRIDAL",
    isShine: true,
  },
];

export default function ChapterThreeSection() {
  const rootRef = useRef<HTMLElement>(null);
  const [photos, setPhotos] = useState(FOLDER_PHOTOS);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom photo upload support
  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files).slice(0, 5);
    const updated = photos.map((item, i) => {
      if (fileList[i]) {
        return { ...item, src: URL.createObjectURL(fileList[i]) };
      }
      return item;
    });
    setPhotos(updated);
    e.target.value = "";
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024;

      // ==========================================
      // SECTION 1: Spotlight Radial Sweep
      // ==========================================
      const s1Tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: ".chapter-3 .sect-1-wrap",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          id: "stChapterThree",
        },
      });
      s1Tl.set(".chapter-3", { pointerEvents: "auto" });
      s1Tl.set(".chapter-3 .sect-1-wrap", { opacity: 1 });
      s1Tl.fromTo(".chapter-3 .sect-1", { "--mx": "20%" }, { "--mx": "100%" });

      // ==========================================
      // SECTION 2: Pinned 5-Photo ClipPath Wipe
      // ==========================================
      if (isDesktop) {
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

      } else {
        // Mobile Animation
        gsap.set(".chapter-3 .sect-2-wrap-mob", { opacity: 1 });

        document.querySelectorAll<HTMLElement>(".chapter-3 .sect-2-wrap-mob .item-photo").forEach((photoEl) => {
          gsap.timeline({
            scrollTrigger: {
              trigger: photoEl,
              start: "top bottom",
              toggleActions: "play none reverse none",
            },
          }).from(photoEl, { y: "6rem", opacity: 0, ease: "power2.out" });
        });
      }

      // ==========================================
      // SECTION 3: Horizontal Drifting Press Spread
      // ==========================================
      const sect3Container = document.querySelector<HTMLElement>(".chapter-3 .sect-3-container");
      const sect3Images = document.querySelectorAll<HTMLElement>(".chapter-3 .sect-3-img");
      const sect3Photos = document.querySelector<HTMLElement>(".chapter-3 .sect-3-photos");

      if (sect3Container && sect3Photos) {
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
      {/* ------------------------------------------------------------- */}
      {/* SUB-SECTION 1: Spotlight Radial Sweep (Objects of Desire)      */}
      {/* ------------------------------------------------------------- */}
      <div className="sect-1-wrap" data-v-da1c79fb="" data-v-61e9ac12="" style={{ opacity: 1 }}>
        <div className="sect-1-sticky" data-v-61e9ac12="">
          <section className="sect-1" data-v-61e9ac12="" style={{ "--mx": "50%" } as React.CSSProperties}>
            <div className="sect-1-content" data-v-61e9ac12="">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="img" src="/images/image_176.webp" alt="Ambient" data-v-61e9ac12="" />
              <div className="chapter-title" data-v-61e9ac12="" data-v-8c7a0c4d="">
                <div className="decor flex items-center gap-1 bg-transparent w-auto h-auto" data-v-8c7a0c4d="">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#20B364]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6875E9]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA54DB]" />
                </div>
                <div className="title-text l1-thin" data-v-8c7a0c4d="">
                  OBJECTS OF <strong className="text-transparent bg-clip-text bg-gradient-to-r from-[#20B364] via-[#6875E9] to-[#EA54DB]">DESIRE</strong>
                </div>
              </div>
              <div className="chapter-count l1-thin" data-v-61e9ac12="" data-v-25e4460d="">
                <span className="text-[#6875E9]">chapter</span> III
              </div>
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
            {/* Item 1: Architectural White Hero */}
            <div className="item" data-v-ebc3b246="">
              <div className="item-photo" data-v-ebc3b246="">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photos[0].src} className="inner-img" alt="Look 01" data-v-ebc3b246="" />
                <div className="photo-badge">{photos[0].tag} • 01</div>
              </div>
            </div>

            {/* Item 2: French Balayage (BOLD WHEN NEEDED) */}
            <div
              className="item"
              data-v-ebc3b246=""
              style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            >
              <div className="item-photo" data-v-ebc3b246="">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photos[1].src} className="inner-img" alt="Look 02" data-v-ebc3b246="" style={{ transform: "scale(1.15, 1.15)" }} />
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

            {/* Item 3: Cashmere Melt */}
            <div
              className="item"
              data-v-ebc3b246=""
              style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            >
              <div className="item-photo" data-v-ebc3b246="">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photos[2].src} className="inner-img" alt="Look 03" data-v-ebc3b246="" style={{ transform: "scale(1.15, 1.15)" }} />
                <div className="photo-badge">{photos[2].tag} • 03</div>
              </div>
            </div>

            {/* Item 4: Botanical Treatment (QUIET WHEN CALLED) */}
            <div
              className="item"
              data-v-ebc3b246=""
              style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            >
              <div className="item-photo" data-v-ebc3b246="">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photos[3].src} className="inner-img" alt="Look 04" data-v-ebc3b246="" style={{ transform: "scale(1.15, 1.15)" }} />
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

            {/* Item 5: High Occasion Bridal (RELENTLESS FEARLESS, TIMELESS & BOLD) */}
            <div
              className="item"
              data-v-ebc3b246=""
              style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
            >
              <div className="item-photo" data-v-ebc3b246="">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photos[4].src} className="inner-img" alt="Look 05" data-v-ebc3b246="" style={{ transform: "scale(1.15, 1.15)" }} />
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
      {/* MOBILE SECTION 2: Vertical Stack with Parallax Photos         */}
      {/* ------------------------------------------------------------- */}
      <div className="sect-2-wrap-mob" data-v-da1c79fb="" data-v-7a9c6173="">
        <div className="main-title title-anim" data-v-7a9c6173="">
          <div className="text-shine h1-book title-book" data-v-7a9c6173="" data-v-0235e11e="" style={{ opacity: 1 }}>
            BOLD
          </div>
          <div className="h1-thin title-thin" data-v-7a9c6173="" aria-label="whenneeded">
            <div className="text-line" aria-hidden="true">
              <div className="text-word" aria-hidden="true">
                <div>w</div><div>h</div><div>e</div><div>n</div>
              </div>
            </div>
            <div className="text-line" aria-hidden="true">
              <div className="text-word" aria-hidden="true">
                <div>n</div><div>e</div><div>e</div><div>d</div><div>e</div><div>d</div>
              </div>
            </div>
          </div>
        </div>

        <div className="items" data-v-7a9c6173="">
          {photos.map((p, idx) => (
            <div key={p.id} className="item" data-v-7a9c6173="">
              <div className="item-photo parallax-image" data-v-7a9c6173="" style={{ overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} className="inner-img" alt={p.title} data-v-7a9c6173="" style={{ transform: "translate(0px, -2rem) scale(1.15, 1.15)" }} />
                <div className="photo-badge">{p.tag} • 0{p.id}</div>
              </div>
              {idx === 1 && (
                <div className="item-text title-anim" data-v-7a9c6173="">
                  <div className="text-shine h2-book title-book" data-v-7a9c6173="" data-v-0235e11e="" style={{ opacity: 1 }}>
                    QUIET
                  </div>
                  <div className="h2-thin title-thin" data-v-7a9c6173="" aria-label="WHEN CALLED">
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
              )}
              {idx === 3 && (
                <div className="item-text title-anim" data-v-7a9c6173="">
                  <div className="text-shine h2-book title-book" data-v-7a9c6173="" data-v-0235e11e="" style={{ opacity: 1 }}>
                    RELENTLESS
                  </div>
                  <div className="h2-thin title-thin" data-v-7a9c6173="" aria-label="FEARLESS, TIMELESS &">
                    <div className="text-line" aria-hidden="true">
                      <div className="text-word" aria-hidden="true">
                        <div>F</div><div>E</div><div>A</div><div>R</div><div>L</div><div>E</div><div>S</div><div>S</div>
                      </div>
                    </div>
                    <div className="text-line" aria-hidden="true">
                      <div className="text-word" aria-hidden="true">
                        <div>T</div><div>I</div><div>M</div><div>E</div><div>L</div><div>E</div><div>S</div><div>S</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
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
                    <div className="text-shine h1-book title-book" data-v-2b312de3="" data-v-0235e11e="" style={{ opacity: 0 }}>
                      Leading
                    </div>
                    <div className="text-shine h1-book title-book" data-v-2b312de3="" data-v-0235e11e="" style={{ opacity: 0 }}>
                      Voices
                    </div>
                  </div>
                </div>
              </div>
              <div className="sect-3-desc2 b1-light" data-v-2b312de3="" style={{ transform: "translate(0%, 105%)" }}>
                Aluma&apos;s architectural artistry is recognized by premier luxury publications like{" "}
                <span className="b1-bold" data-v-2b312de3="">
                  Architectural Digest, ELLE Decoration, and VOGUE
                </span>
                , highlighting a vision of refined originality.
              </div>
              <div className="sect-3-images" data-v-2b312de3="">
                <div className="sect-3-photos" data-v-2b312de3="">
                  <div className="sect-3-img" data-v-2b312de3="">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/info-img-1.webp" className="inner-img" alt="Vogue" data-v-2b312de3="" />
                  </div>
                  <div className="sect-3-img" data-v-2b312de3="">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/info-img-2.webp" className="inner-img" alt="Elle" data-v-2b312de3="" />
                  </div>
                  <div className="sect-3-img" data-v-2b312de3="">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/info-img-3.webp" className="inner-img" alt="AD" data-v-2b312de3="" />
                  </div>
                  <div className="sect-3-img" data-v-2b312de3="">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/info-img-4.webp" className="inner-img" alt="Harper's" data-v-2b312de3="" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* EXACT STYLESHEET WITH BADHIYA PRESENTATION & CONTRAST         */}
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

        /* 1. Sect 1 (Spotlight sweep) */
        .chapter-3 .sect-1-sticky {
          height: 100vh;
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
            height: 200vh;
          }
        }
        .chapter-3 .sect-1 {
          height: 100vh;
          position: relative;
          --mx: 0%;
          -webkit-mask: radial-gradient(ellipse 30% 65% at var(--mx) 50%, #000 0, #000 35%, transparent 100%);
          mask: radial-gradient(ellipse 30% 65% at var(--mx) 50%, #000 0, #000 35%, transparent 100%);
        }
        .chapter-3 .sect-1-content {
          background: #08090C;
          inset: 0;
          position: absolute;
        }
        .chapter-3 .sect-1-content .img {
          mix-blend-mode: lighten;
          position: absolute;
          right: 19rem;
          top: 2.5rem;
          width: 39.375rem;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-1-content .img {
            right: -7rem;
            top: 6rem;
            width: 28.125rem;
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

        /* 2. Sect 2 (Desktop Pinned 800vh Track) */
        .chapter-3 .sect-2-wrap {
          height: 800vh;
          position: relative;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-2-wrap {
            display: none;
          }
        }
        .chapter-3 .sect-2-sticky {
          height: 100vh;
          left: 0;
          overflow: hidden;
          position: sticky;
          top: 0;
          width: 100%;
        }
        .chapter-3 .circles {
          left: 50%;
          margin-left: -.5rem;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 71rem;
          position: absolute;
          pointer-events: none;
          z-index: 5;
        }
        .chapter-3 .items,
        .chapter-3 .item {
          position: absolute;
          inset: 0;
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
          background: radial-gradient(circle at center, transparent 35%, rgba(8, 9, 12, 0.75) 100%);
          pointer-events: none;
        }
        .chapter-3 .photo-badge {
          position: absolute;
          top: 2.5rem;
          left: 2.5rem;
          z-index: 30;
          font-family: monospace;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          padding: 0.4rem 1.1rem;
          border-radius: 9999px;
          background: rgba(11, 13, 19, 0.88);
          border: 1px solid rgba(104, 117, 233, 0.25);
          color: #F8FAFC;
          backdrop-filter: blur(14px);
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.6), 0 0 15px -3px rgba(32, 179, 100, 0.25);
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
          text-shadow: 0 4px 25px rgba(0, 0, 0, 0.9);
        }
        .chapter-3 .item:nth-child(2) .item-text {
          right: 12.625rem;
          top: 14.375rem;
          text-align: right;
        }
        .chapter-3 .item:nth-child(4) .item-text {
          left: 13.9375rem;
          top: 27.5rem;
          text-align: left;
        }
        .chapter-3 .item:nth-child(5) .item-text {
          left: 39.3125rem;
          top: 15.75rem;
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

        /* 3. Sect 2 Mobile */
        .chapter-3 .sect-2-wrap-mob {
          display: none;
          position: relative;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-2-wrap-mob {
            display: block;
            padding: 10vh 1rem 5.3125rem;
          }
        }
        .chapter-3 .main-title {
          margin-bottom: 4.5rem;
        }
        .chapter-3 .sect-2-wrap-mob .item:first-child .item-photo {
          height: 18rem;
        }
        .chapter-3 .sect-2-wrap-mob .item:not(:last-child) {
          margin-bottom: 3rem;
        }
        .chapter-3 .sect-2-wrap-mob .item-photo {
          height: 24rem;
          position: relative;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .chapter-3 .sect-2-wrap-mob .item-text {
          margin-top: -2.5rem;
          padding-bottom: 2.5rem;
          position: relative;
          z-index: 20;
        }
        .chapter-3 .sect-2-wrap-mob .item:nth-child(4) .item-text {
          display: flex;
          flex-direction: column;
          text-align: right;
        }
        .chapter-3 .sect-2-wrap-mob .item:nth-child(4) .item-text .h2-book {
          order: 2;
        }

        /* 4. Sect 3 (Featured In Leading Voices) */
        .chapter-3 .sect-3-container {
          height: 400vh;
          position: relative;
        }
        .chapter-3 .sect-3-sticky {
          height: 100vh;
          left: 0;
          overflow: hidden;
          position: sticky;
          top: 0;
          width: 100%;
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
            padding: 1rem;
          }
        }
        .chapter-3 .sect-3-wrap {
          background: #f1f1f1;
          color: #0b0b0b;
          height: 100%;
          overflow: hidden;
          position: relative;
          z-index: 100;
          border-radius: 1.5rem;
        }
        .chapter-3 .sect-3-descr {
          left: 4.6875rem;
          padding-top: 18.3125rem;
          position: absolute;
          top: 0;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-3-descr {
            left: 0;
            padding-top: 25rem;
            text-align: center;
            width: 100%;
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
            left: 1rem;
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
          .chapter-3 .sect-3-decor {
            display: none;
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
        .chapter-3 .sect-3-photos {
          display: flex;
          gap: 2.5rem;
          padding: 0 35vw 0 45vw;
          width: max-content;
          will-change: transform;
          align-items: center;
        }
        @media (max-width: 1023px) {
          .chapter-3 .sect-3-photos {
            gap: 1.25rem;
            padding: 0 15vw 0 20vw;
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
            height: 16rem;
            width: 12.5rem;
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
            left: 1rem;
            padding-bottom: 1rem;
            width: 15rem;
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
            font-size: 4rem;
            letter-spacing: -.25rem;
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
            font-size: 4rem;
            letter-spacing: -.3rem;
          }
        }
        .h2-thin {
          font-family: var(--font-alata), var(--font-sans), sans-serif;
          font-size: 3.75rem;
          letter-spacing: -.2rem;
          line-height: 92%;
          text-transform: uppercase;
          font-weight: 300;
          color: #F8FAFC;
        }
        @media (max-width: 1023px) {
          .h2-thin {
            font-size: 2.25rem;
            letter-spacing: -.12rem;
          }
        }
        .h2-book {
          font-family: var(--font-alata), var(--font-sans), sans-serif;
          font-size: 3.75rem;
          letter-spacing: -.22rem;
          line-height: 92%;
          text-transform: uppercase;
          font-weight: 700;
        }
        @media (max-width: 1023px) {
          .h2-book {
            font-size: 2.25rem;
            letter-spacing: -.15rem;
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
        .text-word > div {
          position: relative;
          display: inline-block;
          will-change: transform, opacity;
        }

        /* 6. Text Shine Effect (Using Authentic Aluma Triad: Iris #6875E9, Orchid #EA54DB, Emerald #20B364) */
        .text-shine {
          background-clip: text;
          -webkit-background-clip: text;
          background-image: linear-gradient(
            90deg,
            #6875E9 0%,
            #EA54DB 25%,
            #FFFFFF 50%,
            #20B364 75%,
            #6875E9 100%
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
      `}</style>
    </section>
  );
}
