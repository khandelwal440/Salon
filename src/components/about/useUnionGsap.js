'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function useUnionGsap() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Context for clean React unmounting
    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // 1. HERO VIDEO MORPH & PINNED SCRUB (db-union-awards.webflow.io)
      // -------------------------------------------------------------
      const trigger = document.querySelector('[data-animation-video="video-trigger"]');
      const videoElement = document.querySelector('[data-animation-video="video-element"]');
      const videoContainer = document.querySelector('[data-animation-video="video-container"]');
      const titles = document.querySelectorAll('[data-animation-video="title"]');
      const oLetter = document.querySelector('[data-animation-video="o"]');
      const videoEmbed = document.querySelector('[data-animation-video="video-embed"]');
      const credits = document.querySelector('[data-animation-video="opacity"]');
      const scrollText = document.querySelector('[data-animation-video="scroll"]');
      const headingWrapper = document.querySelector('.section-hero__heading-wrapper');

      if (trigger && videoElement) {
        const mm = gsap.matchMedia();

        mm.add('(min-width: 768px)', () => {
          // Collapse and fade side letters "UNI" and "N"
          titles.forEach((title) => {
            gsap.to(title, {
              duration: 1,
              ease: 'power2.inOut',
              width: '0px',
              scrollTrigger: {
                trigger: trigger,
                start: 'top -30%',
                end: '+=280%',
                scrub: 1,
              },
            });

            gsap.to(title, {
              duration: 1,
              ease: 'power2.inOut',
              opacity: 0,
              scrollTrigger: {
                trigger: trigger,
                start: 'top top',
                end: '+=8%',
                scrub: 1,
              },
            });
          });

          // Zoom video inside embed
          if (videoEmbed) {
            gsap.to(videoEmbed, {
              duration: 1,
              ease: 'power2.inOut',
              transform: 'scale(1)',
              scrollTrigger: {
                trigger: trigger,
                start: 'top top',
                end: '+=260%',
                scrub: 1,
              },
            });
          }

          // Fade out scroll indicator and credits
          if (scrollText) {
            gsap.to(scrollText, {
              duration: 1,
              ease: 'power2.inOut',
              opacity: 0,
              scrollTrigger: {
                trigger: trigger,
                start: 'top top',
                end: '+=160%',
                scrub: 1,
              },
            });
          }

          if (credits) {
            gsap.to(credits, {
              duration: 1,
              ease: 'power2.inOut',
              opacity: 0,
              scrollTrigger: {
                trigger: trigger,
                start: 'top -5%',
                end: '+=10%',
                scrub: 1,
              },
            });
          }

          if (oLetter) {
            gsap.to(oLetter, {
              duration: 0.01,
              ease: 'power2.inOut',
              opacity: 0,
              zIndex: -1,
              scrollTrigger: {
                trigger: trigger,
                start: 'top 5%',
                end: '+=15%',
                scrub: 1,
              },
            });
          }

          // Expand circular video to full viewport pinned
          gsap.to(videoElement, {
            duration: 2,
            ease: 'power2.inOut',
            minWidth: '101vw',
            width: '101vw',
            minHeight: '101vh',
            height: '101vh',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '0px',
            scrollTrigger: {
              trigger: trigger,
              start: 'top top',
              end: '+=320%',
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });

          if (headingWrapper) {
            const offsetH = Math.max(0, window.innerHeight / 2 - headingWrapper.offsetHeight / 2 - 80);
            gsap.to(headingWrapper, {
              duration: 1,
              ease: 'power2.inOut',
              y: offsetH,
              scrollTrigger: {
                trigger: trigger,
                start: 'top top',
                end: '+=280%',
                scrub: 1,
              },
            });
          }

          if (videoContainer) {
            gsap.to(videoContainer, {
              duration: 1,
              ease: 'power2.inOut',
              marginTop: 0,
              scrollTrigger: {
                trigger: trigger,
                start: 'top top',
                end: '+=280%',
                scrub: 1,
              },
            });
          }
        });
      }

      // -------------------------------------------------------------
      // 2. GALLERY PINNED STACKING CARDS (db-union-awards.webflow.io)
      // -------------------------------------------------------------
      const galleryOuter = document.querySelector('.gallery__outer');
      const galleryImages = document.querySelectorAll('.gallery__image-wrapper');

      if (galleryOuter && galleryImages.length > 1) {
        const mm = gsap.matchMedia();

        mm.add('(min-width: 768px)', () => {
          const galleryTl = gsap.timeline();

          galleryImages.forEach((img, idx) => {
            if (idx !== 0) {
              galleryTl.to(galleryImages[idx - 1], {
                y: '-140%',
                scale: 0.95,
                duration: 1,
                ease: 'none',
              });
            }
          });

          ScrollTrigger.create({
            animation: galleryTl,
            trigger: galleryOuter,
            start: 'top 10%',
            end: () => `+=${window.innerHeight * (galleryImages.length - 1)}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          });
        });
      }

      // -------------------------------------------------------------
      // 3. BASE SCROLL ANIMATIONS (Fade-up, Blur, Image-scale, SVG)
      // -------------------------------------------------------------
      // Fade-up elements
      const fadeUpElements = document.querySelectorAll('[data-base-animation-role="fade-up"]');
      fadeUpElements.forEach((el) => {
        const delayAttr = el.getAttribute('base-animation-delay');
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: delayAttr ? parseFloat(delayAttr) : 0.2,
            ease: 'cubic-bezier(0.5, 1, 0.89, 1)',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Blur-reveal elements
      const blurElements = document.querySelectorAll('[data-base-animation-role="fade"]');
      blurElements.forEach((el) => {
        const delayAttr = el.getAttribute('base-animation-delay');
        gsap.fromTo(
          el,
          { filter: 'blur(12px)', opacity: 0, y: 20 },
          {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: delayAttr ? parseFloat(delayAttr) : 0.2,
            ease: 'cubic-bezier(0.5, 1, 0.89, 1)',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Image-scale elements
      const scaleImages = document.querySelectorAll('[data-base-animation-role="image-scale"]');
      scaleImages.forEach((img) => {
        gsap.fromTo(
          img,
          { opacity: 0, scale: 1.12 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // SVG Path animation (hand-drawn animated highlight lines)
      const svgPaths = document.querySelectorAll('[data-base-animation-role="svg"]');
      svgPaths.forEach((path) => {
        if (path instanceof SVGGeometryElement) {
          const len = path.getTotalLength ? path.getTotalLength() : 800;
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: path,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      });

      // Top scroll opacity fades
      const scrollOpacities = document.querySelectorAll('[data-scroll-animation-role="scroll-top-opacity"]');
      scrollOpacities.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 1 },
          {
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: el,
              start: 'top 10%',
              end: 'top -40%',
              scrub: true,
            },
          }
        );
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);
}
