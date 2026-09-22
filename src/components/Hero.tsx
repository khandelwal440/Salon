"use client";

import { salonData } from "@/data/salonData";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full bg-[#0E0E0E] text-[#FFFFFF] overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12"
    >
      {/* Full-Bleed High-Definition Cinema Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105"
          src={salonData.brand.heroVideo}
        />

        {/* Cinematic Dusk Gradients for perfect text readability (Elyse Residence Style) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* Top Spacer to clear the fixed navigation */}
      <div className="relative z-10" />

      {/* Clean Cinema Hero Stage (No text overlay over video) */}
      <div className="relative z-10 w-full" />
    </section>
  );
}
