"use client";

import { salonData } from "@/data/salonData";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const rotations = ["-rotate-2 hover:rotate-0", "rotate-2 hover:rotate-0", "-rotate-1 hover:rotate-0", "rotate-3 hover:rotate-0"];

  return (
    <section
      id="press"
      className="relative py-28 md:py-40 bg-[#0A0A0A] text-[#F4F0EA] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="eyebrow-badge">
                <span>08</span>
                <span className="w-8 h-[1px] bg-[#D4AF37]" />
                <span>CRITICAL ACCLAIM</span>
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F4F0EA]">
              As Seen In <span className="italic font-normal text-[#D4AF37]">The Press</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-mono text-xs text-[#A69F94] leading-relaxed uppercase tracking-wider">
              [ROTATED EDITORIAL MAGAZINE COVERS • CRITIC REVIEWS &amp; INDUSTRY HONOURS]
            </p>
          </div>
        </div>

        {/* Magazine Cover-Style Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          {salonData.pressQuotes.map((item, idx) => (
            <div
              key={item.id}
              className={`relative bg-[#141414] border border-white/15 p-8 rounded-xl shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:z-20 hover:border-[#D4AF37] ${
                rotations[idx % rotations.length]
              } group flex flex-col justify-between min-h-[380px]`}
            >
              {/* Publication Header (Magazine Banner Style) */}
              <div className="border-b border-white/10 pb-6 mb-6">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#9E9587] tracking-[0.2em] uppercase mb-2">
                  <span>ISSUE ARCHIVE</span>
                  <span>{item.year}</span>
                </div>
                <h3 className="font-serif-luxury text-3xl md:text-4xl font-light tracking-[0.1em] text-[#F4F0EA] group-hover:text-[#D4AF37] transition-colors">
                  {item.publication}
                </h3>
              </div>

              {/* Quote Body */}
              <div className="space-y-4 my-auto">
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  ))}
                </div>
                <p className="font-serif-luxury text-lg text-[#D6CCBE] font-light leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author / Critic Footer */}
              <div className="border-t border-white/10 pt-4 mt-6 flex items-center justify-between">
                <div>
                  <p className="font-mono text-xs font-semibold text-[#F4F0EA]">
                    {item.author}
                  </p>
                  <p className="font-mono text-[10px] text-[#A69F94] tracking-wider uppercase">
                    {item.role}
                  </p>
                </div>
                <Quote className="w-6 h-6 text-[#D4AF37]/30 group-hover:text-[#D4AF37] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
