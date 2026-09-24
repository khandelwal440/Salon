"use client";

import { useEffect, useState } from "react";

export default function Loader({ onLoaded }: { onLoaded?: () => void }) {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shutterOpen, setShutterOpen] = useState(false);

  useEffect(() => {
    // Quick, smooth, rhythmic counter
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShutterOpen(true), 150);
          setTimeout(() => {
            setIsDone(true);
            if (onLoaded) onLoaded();
          }, 900);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onLoaded]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col justify-between p-6 md:p-12 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        shutterOpen ? "-translate-y-full opacity-0" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(ellipse at 50% 45%, #151922 0%, #0B0C10 70%, #060709 100%)",
      }}
    >
      {/* Top row */}
      <div className="flex justify-between items-center text-xs tracking-[0.25em] text-[#94A3B8] font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[#20B364]">✦</span>
          <span className="text-white font-bold">ALUMA SALON</span>
        </div>
        <span className="text-white/60">MAYFAIR • SOHO</span>
      </div>

      {/* Centerpiece */}
      <div className="text-center my-auto flex flex-col items-center">
        {/* Triad Logo Mark with Emerald/Iris aura */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/30 p-2.5 bg-white flex items-center justify-center mb-6 shadow-[0_0_45px_rgba(32,179,100,0.35)] transition-transform hover:scale-105 duration-300">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/aluma-assets/logo.svg"
            alt="Aluma Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Monumental Brand Name */}
        <h1 className="font-alata text-5xl md:text-7xl tracking-[0.08em] text-[#FFFFFF] font-normal drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
          ALUMA
        </h1>

        {/* Subtitle in High-Voltage Emerald Green */}
        <p className="font-mono text-xs sm:text-sm tracking-[0.3em] font-bold text-[#20B364] mt-3 uppercase flex items-center gap-2">
          <span className="text-[#6875E9] text-xs">✦</span>
          <span>Haute Coiffure &amp; Artistry</span>
          <span className="text-[#EA54DB] text-xs">✦</span>
        </p>
      </div>

      {/* Bottom Counter & Status */}
      <div className="space-y-4">
        {/* Gradient Progress Track */}
        <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#20B364] via-[#6875E9] to-[#EA54DB] transition-all duration-100 ease-out"
            style={{ width: `${count}%` }}
          />
        </div>

        <div className="flex justify-between items-end text-xs font-mono text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#20B364] animate-pulse shadow-[0_0_10px_#20B364]" />
            <span className="tracking-widest uppercase text-[#F8FAFC] font-semibold text-[11px] sm:text-xs">
              Initialising Experience
            </span>
          </div>
          <div className="font-serif-luxury text-3xl md:text-5xl text-[#FFFFFF] font-light tracking-tight">
            {count.toString().padStart(3, "0")}%
          </div>
        </div>
      </div>
    </div>
  );
}
