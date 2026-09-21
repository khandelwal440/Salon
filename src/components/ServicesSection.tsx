"use client";

import { useState } from "react";
import { salonData, ServiceItem } from "@/data/salonData";
import { ArrowUpRight, Clock, Tag } from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ["All", "Sculpting & Form", "Colour Chemistry", "Scalp & Trichology", "Restoration", "High Occasion"];

  const filteredServices =
    activeCategory === "All"
      ? salonData.services
      : salonData.services.filter((s) => s.category === activeCategory);

  return (
    <section
      id="services"
      className="relative py-28 md:py-40 bg-[#0E0E0E] text-[#F4F0EA] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow and Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="eyebrow-badge">
                <span>03</span>
                <span className="w-8 h-[1px] bg-[#D4AF37]" />
                <span>HAUTE SERVICES CATALOGUE</span>
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F4F0EA]">
              Bespoke <span className="italic font-normal text-[#D4AF37]">Offerings</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-mono text-xs text-[#A69F94] leading-relaxed uppercase tracking-wider">
              [HOVER OR TAP A SERVICE TO REVEAL TIME INVESTMENT & ARTISANAL PRICING]
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar border-b border-white/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300 shrink-0 ${
                activeCategory === cat
                  ? "bg-[#D4AF37] text-[#0E0E0E] font-semibold shadow-lg shadow-[#D4AF37]/20"
                  : "bg-white/[0.03] text-[#A69F94] hover:text-[#F4F0EA] hover:bg-white/[0.08]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Inverted Row Numbered List (Inspired by runrobrun.com) */}
        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {filteredServices.map((service) => {
            const isHovered = hoveredId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative transition-all duration-500 cursor-pointer ${
                  isHovered
                    ? "bg-[#F4F0EA] text-[#0E0E0E] px-6 md:px-10 py-8 md:py-10 shadow-2xl rounded-lg scale-[1.01]"
                    : "bg-transparent text-[#F4F0EA] px-4 md:px-6 py-7 md:py-8"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
                  {/* Number, Category & Authentic Icon */}
                  <div className="lg:col-span-3 flex items-center gap-3.5">
                    <span
                      className={`font-mono text-xs md:text-sm font-semibold tracking-widest transition-colors ${
                        isHovered ? "text-[#0E0E0E]" : "text-[#D4AF37]"
                      }`}
                    >
                      [{service.number}]
                    </span>

                    {service.icon && (
                      <div
                        className={`w-9 h-9 rounded-full p-1.5 flex items-center justify-center shrink-0 transition-all ${
                          isHovered
                            ? "bg-[#0E0E0E] text-[#F4F0EA]"
                            : "bg-white/5 border border-white/10"
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={service.icon}
                          alt={service.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    <span
                      className={`font-mono text-[11px] tracking-[0.18em] uppercase transition-colors line-clamp-1 ${
                        isHovered ? "text-[#444]" : "text-[#9E9587]"
                      }`}
                    >
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div className="lg:col-span-5 space-y-1.5">
                    <div className="flex items-center gap-3">
                      <h3
                        className={`font-serif-luxury text-2xl sm:text-3xl md:text-4xl font-light tracking-tight transition-colors ${
                          isHovered ? "text-[#0E0E0E] font-medium" : "text-[#F4F0EA]"
                        }`}
                      >
                        {service.title}
                      </h3>
                      {service.tag && (
                        <span
                          className={`hidden sm:inline-block px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider ${
                            isHovered
                              ? "bg-[#0E0E0E] text-[#F4F0EA]"
                              : "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30"
                          }`}
                        >
                          {service.tag}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-sm md:text-base font-light transition-colors line-clamp-2 ${
                        isHovered ? "text-[#333333]" : "text-[#A69F94]"
                      }`}
                    >
                      {isHovered ? service.fullDesc : service.shortDesc}
                    </p>
                  </div>

                  {/* Duration & Pricing Inversion Reveal */}
                  <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-6 pt-2 lg:pt-0">
                    <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
                      <Clock
                        className={`w-3.5 h-3.5 transition-colors ${
                          isHovered ? "text-[#0E0E0E]" : "text-[#9E9587]"
                        }`}
                      />
                      <span className={isHovered ? "text-[#444]" : "text-[#9E9587]"}>
                        {service.duration}
                      </span>
                    </div>

                    <div className="text-right flex items-center gap-4">
                      <span
                        className={`font-serif-luxury text-2xl md:text-3xl font-light tracking-tight transition-colors ${
                          isHovered ? "text-[#0E0E0E] font-medium" : "text-[#D4AF37]"
                        }`}
                      >
                        {service.price}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectService(service.title);
                        }}
                        className={`inline-flex items-center justify-center p-3 rounded-full transition-all duration-300 ${
                          isHovered
                            ? "bg-[#0E0E0E] text-[#F4F0EA] hover:bg-[#D4AF37] hover:text-[#0E0E0E]"
                            : "bg-white/5 text-[#F4F0EA] border border-white/10 group-hover:border-[#D4AF37]"
                        }`}
                        title={`Book ${service.title}`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote advice */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#9E9587] tracking-wider gap-2">
          <span>* ALL SERVICES INCLUDE A BESPOKE 15-MIN CONSULTATION & BOTANICAL HAIR BATH</span>
          <a
            href="#booking"
            className="text-[#D4AF37] hover:underline uppercase tracking-widest inline-flex items-center gap-1"
          >
            Custom Bridal & VIP requests inquiry &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
