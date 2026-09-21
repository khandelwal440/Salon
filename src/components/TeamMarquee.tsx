"use client";

import Image from "next/image";
import { salonData, StylistItem } from "@/data/salonData";
import { Award, Sparkles } from "lucide-react";

interface TeamMarqueeProps {
  onSelectStylist: (stylistName: string) => void;
}

export default function TeamMarquee({ onSelectStylist }: TeamMarqueeProps) {
  // Duplicate team items to create seamless infinite loop
  const marqueeItems = [...salonData.team, ...salonData.team, ...salonData.team];

  return (
    <section
      id="team"
      className="relative py-28 md:py-40 bg-[#0E0E0E] text-[#F4F0EA] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        {/* Eyebrow & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="eyebrow-badge">
                <span>07</span>
                <span className="w-8 h-[1px] bg-[#D4AF37]" />
                <span>THE ATELIER ARTISANS</span>
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F4F0EA]">
              Master <span className="italic font-normal text-[#D4AF37]">Stylists</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-mono text-xs text-[#A69F94] leading-relaxed uppercase tracking-wider">
              [PAUSE ON HOVER • OVAL PORTRAITS UNVEIL BESPOKE SPECIALISATIONS &amp; APPOINTMENT RESERVATIONS]
            </p>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Container */}
      <div className="w-full relative py-6 overflow-hidden select-none">
        {/* Left and Right Fade Gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#0E0E0E] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#0E0E0E] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-10 md:gap-14 px-4">
          {marqueeItems.map((stylist, index) => (
            <div
              key={`${stylist.id}-${index}`}
              onClick={() => onSelectStylist(stylist.name)}
              className="group cursor-pointer flex flex-col items-center shrink-0 w-[240px] md:w-[280px]"
            >
              {/* Oval-Framed Portrait Container */}
              <div className="relative w-[220px] h-[300px] md:w-[260px] md:h-[350px] rounded-[50%/38%] overflow-hidden border-2 border-white/10 group-hover:border-[#D4AF37] transition-all duration-700 group-hover:scale-105 shadow-2xl bg-[#141414]">
                <Image
                  src={stylist.image}
                  alt={`${stylist.name} - ${stylist.role}`}
                  fill
                  sizes="300px"
                  className="object-cover object-center grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 scale-100 group-hover:scale-110"
                />

                {/* Ambient Dark Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Hover Quick Action Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <span className="px-4 py-1.5 rounded-full bg-[#D4AF37] text-[#0E0E0E] font-mono text-[10px] uppercase tracking-widest font-bold shadow-lg">
                    Book With {stylist.name.split(" ")[0]}
                  </span>
                </div>
              </div>

              {/* Stylist Details revealed below oval */}
              <div className="text-center mt-6 space-y-1.5 w-full">
                <h3 className="font-serif-luxury text-2xl md:text-3xl font-light text-[#F4F0EA] group-hover:text-[#D4AF37] transition-colors">
                  {stylist.name}
                </h3>
                <p className="font-mono text-xs text-[#A69F94] tracking-wider uppercase">
                  {stylist.role}
                </p>
                <p className="font-mono text-[10px] text-[#D4AF37] tracking-widest uppercase">
                  {stylist.speciality}
                </p>
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-[#9E9587] pt-1">
                  <Award className="w-3 h-3 text-[#D4AF37]" />
                  <span className="line-clamp-1">{stylist.accolade}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
