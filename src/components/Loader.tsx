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
        shutterOpen ? "-translate-y-full opacity-0" : "bg-[#0A0A0A] opacity-100"
      }`}
    >
      {/* Top row */}
      <div className="flex justify-between items-center text-xs tracking-[0.25em] text-[#9E9587] font-mono">
        <span>ALUMA SALON</span>
        <span>MAYFAIR • SOHO</span>
      </div>

      {/* Centerpiece */}
      <div className="text-center my-auto flex flex-col items-center">
        <div className="w-16 h-16 rounded-full border border-white/20 p-2 bg-white flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(104,117,233,0.3)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/aluma-assets/logo.svg"
            alt="Aluma Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="font-alata text-4xl md:text-6xl tracking-[0.1em] text-[#FFFFFF] font-normal">
          ALUMA
        </h1>
        <p className="font-mono text-xs tracking-[0.3em] text-[#6875E9] mt-3 uppercase">
          Haute Coiffure &amp; Artistry
        </p>
      </div>

      {/* Bottom Counter */}
      <div className="flex justify-between items-end border-t border-white/10 pt-4 text-xs font-mono text-[#94A3B8]">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-[#20B364] animate-pulse" />
          <span className="tracking-widest uppercase text-[#F8FAFC]">Initialising Experience</span>
        </div>
        <div className="font-serif-luxury text-3xl md:text-5xl text-[#F4F0EA] font-light tracking-tight">
          {count.toString().padStart(3, "0")}%
        </div>
      </div>
    </div>
  );
}
