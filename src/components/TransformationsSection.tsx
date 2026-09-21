"use client";

import { useState } from "react";
import Image from "next/image";
import { salonData, TransformationItem } from "@/data/salonData";
import { Sparkles, Eye, Scissors, CheckCircle2 } from "lucide-react";

export default function TransformationsSection() {
  // Store view mode ('after' | 'before') for each card
  const [activeViews, setActiveViews] = useState<Record<string, "after" | "before">>({
    "transformation-1": "after",
    "transformation-2": "after",
    "transformation-3": "after",
    "transformation-4": "after",
  });

  const toggleView = (id: string, view: "after" | "before") => {
    setActiveViews((prev) => ({ ...prev, [id]: view }));
  };

  return (
    <section
      id="transformations"
      className="relative py-28 md:py-40 bg-[#0A0A0A] text-[#F4F0EA] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="eyebrow-badge">
                <span>05</span>
                <span className="w-8 h-[1px] bg-[#D4AF37]" />
                <span>ATELIER ARCHIVES</span>
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F4F0EA]">
              Metamorphosis <span className="italic font-normal text-[#D4AF37]">&amp; Craft</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-mono text-xs text-[#A69F94] leading-relaxed uppercase tracking-wider">
              [PINNED STACKED EDITORIAL ARCHIVE • TOGGLE BEFORE &amp; AFTER TO INSPECT COLOUR ALCHEMY]
            </p>
          </div>
        </div>

        {/* Stacked Transformation Cards */}
        <div className="space-y-16 md:space-y-24">
          {salonData.transformations.map((item, index) => {
            const currentView = activeViews[item.id] || "after";
            const currentImg = currentView === "after" ? item.afterImg : item.beforeImg;

            return (
              <div
                key={item.id}
                className="sticky top-24 rounded-2xl bg-[#141414] border border-white/10 shadow-2xl p-6 md:p-12 overflow-hidden transition-all duration-500 backdrop-blur-sm"
                style={{
                  zIndex: index + 10,
                  transform: `scale(${1 - (salonData.transformations.length - index - 1) * 0.015})`,
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
                  {/* Left: Image with Before/After Toggle Controls */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-xl overflow-hidden border border-white/10 group">
                      <Image
                        src={currentImg}
                        alt={`${item.title} - ${currentView} transformation`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                      />

                      {/* Subtle Dark Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                      {/* State Badge */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest font-semibold backdrop-blur-md ${
                            currentView === "after"
                              ? "bg-[#D4AF37] text-[#0E0E0E]"
                              : "bg-white/20 text-[#F4F0EA]"
                          }`}
                        >
                          {currentView === "after" ? "Result: Metamorphosis" : "Initial Canvas"}
                        </span>
                      </div>

                      {/* Before / After Floating Toggle Pill */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center bg-[#0E0E0E]/80 backdrop-blur-md border border-white/15 p-1 rounded-full shadow-xl">
                        <button
                          onClick={() => toggleView(item.id, "before")}
                          className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                            currentView === "before"
                              ? "bg-[#F4F0EA] text-[#0E0E0E] font-bold shadow"
                              : "text-[#A69F94] hover:text-[#F4F0EA]"
                          }`}
                        >
                          Before
                        </button>
                        <button
                          onClick={() => toggleView(item.id, "after")}
                          className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                            currentView === "after"
                              ? "bg-[#D4AF37] text-[#0E0E0E] font-bold shadow"
                              : "text-[#A69F94] hover:text-[#F4F0EA]"
                          }`}
                        >
                          After
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Editorial Narrative & Details */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <span className="font-mono text-xs text-[#D4AF37] tracking-[0.25em] font-semibold">
                        TRANSFORMATION [{item.number}]
                      </span>
                      <span className="font-mono text-xs text-[#9E9587] tracking-wider">
                        {index + 1} OF {salonData.transformations.length}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light text-[#F4F0EA] leading-tight">
                        {item.title}
                      </h3>
                      <p className="font-mono text-xs text-[#D4AF37] tracking-wider uppercase mt-2">
                        {item.subtitle}
                      </p>
                    </div>

                    <p className="text-sm md:text-base text-[#D6CCBE] font-light leading-relaxed">
                      {item.description}
                    </p>

                    <div className="space-y-3 pt-2 border-t border-white/10">
                      <div className="flex items-center gap-3 text-xs font-mono text-[#A69F94]">
                        <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="text-[#F4F0EA] font-semibold">Stylist:</span>
                        <span>{item.stylist}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-mono text-[#A69F94]">
                        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span className="text-[#F4F0EA] font-semibold">Technique:</span>
                        <span>{item.technique}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href="#booking"
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] hover:text-[#F4F0EA] transition-colors"
                      >
                        <span>Request this technique &rarr;</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
