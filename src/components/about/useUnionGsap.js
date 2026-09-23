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

        mm.add('(min-width: 0px)', () => {
          const heroTl = gsap.timeline({
            scrollTrigger: {
              trigger: trigger,
              start: 'top top',
              end: '+=240%',
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });

          // 1. Fade & shrink side letters & text indicators
          heroTl.to(titles, {
            duration: 0.6,
            ease: 'power2.inOut',
            opacity: 0,
            scale: 0.85,
            width: '0px',
          }, 0);

          if (oLetter) {
            heroTl.to(oLetter, {
              duration: 0.4,
              ease: 'power2.inOut',
              opacity: 0,
              scale: 0.85,
            }, 0);
          }

          if (scrollText) {
            heroTl.to(scrollText, {
              duration: 0.3,
              ease: 'power2.inOut',
              opacity: 0,
            }, 0);
          }

          if (credits) {
            heroTl.to(credits, {
              duration: 0.4,
              ease: 'power2.inOut',
              opacity: 0,
              y: 20,
            }, 0);
          }

          // 2. Expand video container to full screen center without any horizontal offset
          if (videoContainer) {
            heroTl.to(videoContainer, {
              duration: 1.2,
              ease: 'power2.inOut',
              marginTop: 0,
              marginLeft: 0,
            }, 0);
          }

          if (headingWrapper) {
            heroTl.to(headingWrapper, {
              duration: 1.2,
              ease: 'power2.inOut',
              width: '100vw',
              maxWidth: '100vw',
              justifyContent: 'center',
              alignItems: 'center',
            }, 0);
          }

          // 3. Expand the video to exact 100vw x 100vh full-screen (covers every pixel, no white gap)
          heroTl.to(videoElement, {
            duration: 1.6,
            ease: 'power2.inOut',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            minWidth: '100vw',
            minHeight: '100vh',
            maxWidth: '100vw',
            maxHeight: '100vh',
            inset: 0,
            margin: 0,
            transform: 'none',
            borderRadius: '0px',
            zIndex: 100,
          }, 0);

          if (videoEmbed) {
            heroTl.to(videoEmbed, {
              duration: 1.6,
              ease: 'power2.inOut',
              width: '100%',
              height: '100%',
              transform: 'none',
            }, 0);
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
