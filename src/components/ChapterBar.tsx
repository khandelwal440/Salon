"use client";

import { useEffect, useState } from "react";
import { salonData } from "@/data/salonData";

export default function ChapterBar() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall page scroll percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      // Determine which chapter section is currently most visible in the viewport
      const chapterElements = salonData.chapters.map((ch) =>
        document.querySelector(ch.anchor)
      );

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      let currentIndex = 0;
      chapterElements.forEach((el, index) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          if (scrollPosition >= elementTop) {
            currentIndex = index;
          }
        }
      });

      setActiveChapterIndex(currentIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeChapter = salonData.chapters[activeChapterIndex] || salonData.chapters[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 md:px-12 py-3 bg-[#0E0E0E]/90 backdrop-blur-md border-t border-white/10 select-none">
      {/* Dynamic Progress Line */}
      <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#F4F0EA] to-[#D4AF37] transition-all duration-150"
        style={{ width: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Active Chapter Label */}
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shrink-0" />
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xs text-[#D4AF37] tracking-[0.2em] uppercase font-semibold">
              {activeChapter.roman}
            </span>
            <span className="font-serif-luxury text-sm md:text-base text-[#F4F0EA] font-light hidden sm:inline">
              — {activeChapter.title}
            </span>
          </div>
        </div>

        {/* Chapter Steps Navigator */}
        <div className="flex items-center gap-1 sm:gap-2">
          {salonData.chapters.map((ch, idx) => {
            const isActive = idx === activeChapterIndex;
            const isPassed = idx < activeChapterIndex;

            return (
              <a
                key={ch.id}
                href={ch.anchor}
                className="group flex items-center gap-1.5 px-2 py-1 rounded transition-colors"
                title={`${ch.roman}: ${ch.title}`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-8 sm:w-12 bg-[#D4AF37]"
                      : isPassed
                      ? "w-3 sm:w-4 bg-white/40"
                      : "w-2 sm:w-3 bg-white/15 group-hover:bg-white/30"
                  }`}
                />
                <span
                  className={`font-mono text-[10px] hidden md:inline tracking-widest ${
                    isActive ? "text-[#D4AF37] font-bold" : "text-[#9E9587] group-hover:text-white"
                  }`}
                >
                  {ch.roman.replace("Chapter ", "")}
                </span>
              </a>
            );
          })}
        </div>

        {/* Numerical Scroll Percentage */}
        <div className="font-mono text-xs text-[#9E9587] tracking-widest hidden xs:block">
          <span>{Math.round(scrollProgress)}%</span>
        </div>
      </div>
    </div>
  );
}
