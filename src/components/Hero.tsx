"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { salonData } from "@/data/salonData";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    // Ensure video is paused so its frames are purely controlled by scroll
    video.pause();

    let tween: gsap.core.Tween | null = null;
    let scrollTriggerInstance: ScrollTrigger | null = null;

    const setupScrub = () => {
      if (tween) {
        tween.kill();
        tween = null;
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
        scrollTriggerInstance = null;
      }

      const duration = video.duration && !isNaN(video.duration) ? video.duration : 5.875;
      const proxy = { time: video.currentTime || 0 };

      // Prime initial frame
      try {
        video.currentTime = 0.001;
      } catch {
        // Ignore if video cannot seek yet
      }

      // Tween the proxy object synced with ScrollTrigger scrub
      tween = gsap.to(proxy, {
        time: Math.max(0, duration - 0.04),
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "+=260%", // Generous scroll distance for ultra-smooth playback
          pin: true,
          scrub: 0.6, // Smooth momentum damping
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
        onUpdate: () => {
          if (video && !isNaN(video.duration) && video.duration > 0) {
            const targetTime = Math.min(
              Math.max(0, video.duration - 0.04),
              Math.max(0, proxy.time)
            );
            video.currentTime = targetTime;
          }
        },
      });

      scrollTriggerInstance = tween.scrollTrigger as ScrollTrigger;
      ScrollTrigger.refresh();
    };

    if (video.readyState >= 1 && video.duration > 0) {
      setupScrub();
    } else {
      video.addEventListener("loadedmetadata", setupScrub, { once: true });
      video.addEventListener("canplay", () => {
        if (!tween) setupScrub();
      }, { once: true });
    }

    return () => {
      if (tween) tween.kill();
      if (scrollTriggerInstance) scrollTriggerInstance.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100svh] w-full bg-[#0E0E0E] text-[#FFFFFF] overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 select-none will-change-transform"
    >
      {/* Full-Bleed High-Definition Cinema Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          className="w-full h-full object-cover scale-105 pointer-events-none [&::-webkit-media-controls]:hidden [&::-webkit-media-controls-enclosure]:hidden"
          src={salonData.brand.heroVideo}
        />

        {/* Cinematic Dusk Gradients for contrast and luxury atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/55 pointer-events-none" />
      </div>

      {/* Top Spacer to clear the fixed navigation */}
      <div className="relative z-10" />

      {/* Bottom Editorial Scroll Hint & Minimal Progress Bar */}
      <div
        className={`relative z-10 w-full max-w-[1720px] mx-auto px-6 md:px-12 flex items-end justify-between transition-opacity duration-500 ${
          scrollProgress > 0.95 ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Subtle Video Scroll Guidance */}
        <div
          style={{
            opacity: Math.max(0, 1 - scrollProgress * 2.5),
            transform: `translateY(${scrollProgress * 20}px)`,
          }}
          className="flex items-center gap-3 transition-transform"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#20B364] animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.28em] uppercase text-white/70">
            Scroll to experience cinematic film
          </span>
        </div>

        {/* Minimalist Scrub Progress Track */}
        <div className="flex items-center gap-3 font-mono text-[10px] text-white/50 tracking-wider">
          <span className="text-[#20B364] font-medium">
            {Math.round(scrollProgress * 100).toString().padStart(2, "0")}%
          </span>
          <div className="w-20 sm:w-28 h-[2px] bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#20B364] to-[#EA54DB] transition-[width] duration-100 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
            />
          </div>
          <span className="hidden sm:inline">ALUMA CINEMA</span>
        </div>
      </div>
    </section>
  );
}
