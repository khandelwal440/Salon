"use client";

import { useState, useEffect, useRef } from "react";
import { salonData } from "@/data/salonData";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenBooking: () => void;
}

export default function Header({ onOpenBooking }: HeaderProps) {
  const [progress, setProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coords, setCoords] = useState({
    startX: 48,
    startY: 650,
    targetY: 18,
    targetScale: 0.22,
  });

  useEffect(() => {
    const calculateGeometry = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Padding matching max-w-[1720px] mx-auto px-6 md:px-12
      const paddingX = w < 768 ? 24 : 48;
      const maxW = 1720;
      const computedStartX = Math.max(paddingX, (w - maxW) / 2 + paddingX);

      // Bottom-left position in Hero (where the monumental name rests)
      // Adjusted for mobile, tablet, and desktop viewports
      const offsetFromBottom = w < 640 ? 190 : w < 1024 ? 220 : 250;
      const computedStartY = Math.max(120, h - offsetFromBottom);

      // Docking scale in header: on desktop approx 0.20 - 0.23, on mobile ~0.35
      const computedScale = w < 640 ? 0.36 : w < 1024 ? 0.26 : 0.21;

      setCoords({
        startX: computedStartX,
        startY: computedStartY,
        targetY: w < 640 ? 14 : 18,
        targetScale: computedScale,
      });
    };

    calculateGeometry();
    window.addEventListener("resize", calculateGeometry);

    const handleScroll = () => {
      // Smooth upward glide over the first 340px of scroll
      const range = 340;
      const currentScroll = window.scrollY;
      const p = Math.min(1, Math.max(0, currentScroll / range));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Re-verify after font and DOM render
    const t = setTimeout(calculateGeometry, 300);

    return () => {
      window.removeEventListener("resize", calculateGeometry);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(t);
    };
  }, []);

  // Compute interpolated upward position
  // Starts at coords.startY (hero bottom-left) and glides UPWARDS to coords.targetY (header)
  const currentY = coords.startY + (coords.targetY - coords.startY) * progress;
  const currentScale = 1 + (coords.targetScale - 1) * progress;

  return (
    <>
      {/* 
        Artisun-Style Glide Upward Logo:
        Starts at the bottom-left of the hero section at monumental scale.
        As you scroll down, it glides UPWARDS into the top navigation bar,
        scaling down smoothly to dock on the upper side of the website!
      */}
      <div
        style={{
          left: `${coords.startX}px`,
          top: `${currentY}px`,
          transform: `scale(${currentScale})`,
          transformOrigin: "top left",
          willChange: "transform, top",
        }}
        className="fixed z-50 pointer-events-auto select-none cursor-pointer flex items-center gap-4 sm:gap-6 md:gap-8 transition-[filter] duration-200"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Aluma — Haute Coiffure"
      >
        {/* Official Triad Circles Logo Mark */}
        <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/30 p-2 bg-white flex items-center justify-center shrink-0 shadow-[0_0_35px_rgba(255,110,64,0.4)] hover:border-[#FF6E40] transition-all">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={salonData.brand.logoSvg}
            alt="Aluma Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Hero Name / Monumental Wordmark styled with Alata */}
        <span className="font-alata text-6xl sm:text-7xl md:text-[11vw] lg:text-[13vw] tracking-[0.04em] font-normal text-[#FFFFFF] leading-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)] hover:text-[#FF6E40] transition-colors">
          {salonData.brand.name}
        </span>
      </div>

      {/* Sticky Navigation Bar (Elyse Residence Style) */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          progress > 0.15
            ? "bg-[#3D2267]/90 backdrop-blur-md py-4 shadow-2xl"
            : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Invisible Spacer reserving the exact left dock for the gliding logo */}
          <div
            className="w-[140px] sm:w-[180px] md:w-[220px] h-10 opacity-0 pointer-events-none shrink-0"
            aria-hidden="true"
          />

          {/* Center Navigation Links (Elyse Style) */}
          <nav
            style={{
              opacity: Math.min(1, Math.max(0, (progress - 0.2) / 0.6)),
              pointerEvents: progress > 0.4 ? "auto" : "none",
            }}
            className="hidden lg:flex items-center gap-8 xl:gap-10 text-[11px] xl:text-xs uppercase tracking-[0.22em] font-mono text-[#F4F0EA]/85 transition-opacity duration-300"
          >
            {salonData.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative py-1 hover:text-[#FFFFFF] transition-colors group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#FFFFFF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action: Pill Button (Elyse "BOOK A VISIT" Style) */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 rounded-full text-xs font-mono tracking-[0.18em] uppercase text-[#3D2267] bg-[#FFFFFF] hover:bg-[#FF6E40] hover:text-[#FFFFFF] transition-all duration-300 font-semibold shadow-md active:scale-95 hover:shadow-[0_0_20px_rgba(255,110,64,0.5)]"
            >
              Book A Visit
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#FFFFFF] hover:text-[#FF6E40] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Full-width razor-thin bottom line divider like Elyse Residence */}
        <div
          style={{
            opacity: Math.min(1, Math.max(0, progress * 1.5)),
          }}
          className="w-full h-[1px] bg-white/20 mt-4 md:mt-5 transition-opacity duration-300"
        />
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#3D2267]/98 backdrop-blur-xl transition-all duration-500 lg:hidden flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-6">
          <span className="font-mono text-xs tracking-[0.25em] text-[#FF6E40] uppercase">
            Menu
          </span>
          {salonData.navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-baseline justify-between py-2 border-b border-white/10 font-serif-luxury text-3xl text-[#F4F0EA] hover:text-[#FF6E40] transition-colors"
            >
              <span>{link.name}</span>
              <span className="font-mono text-xs text-[#9E9587]">0{idx + 1}</span>
            </a>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 space-y-4">
          <div className="text-xs font-mono text-[#9E9587] space-y-1">
            <p>{salonData.contact.addressLine1}</p>
            <p>{salonData.contact.phone}</p>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full py-4 rounded-full bg-[#FFFFFF] text-[#3D2267] font-mono text-xs uppercase tracking-[0.2em] font-semibold text-center hover:bg-[#FF6E40] hover:text-[#FFFFFF] transition-colors"
          >
            Book A Visit
          </button>
        </div>
      </div>
    </>
  );
}
