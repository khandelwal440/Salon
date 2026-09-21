"use client";

import { salonData, PackageItem } from "@/data/salonData";
import { Check, Sparkles, Clock, Crown, ArrowRight } from "lucide-react";

interface PackagesProps {
  onSelectPackage: (packageName: string) => void;
}

export default function PackagesSection({ onSelectPackage }: PackagesProps) {
  return (
    <section
      id="packages"
      className="relative py-28 md:py-40 bg-[#0E0E0E] text-[#F4F0EA] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="eyebrow-badge">
                <span>04</span>
                <span className="w-8 h-[1px] bg-[#D4AF37]" />
                <span>SIGNATURE CURATION</span>
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F4F0EA]">
              Signature <span className="italic font-normal text-[#D4AF37]">Packages</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-mono text-xs text-[#A69F94] leading-relaxed uppercase tracking-wider">
              Comprehensive immersive experiences combining multiple haute disciplines for complete metamorphosis.
            </p>
          </div>
        </div>

        {/* 3 Package Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {salonData.packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl flex flex-col justify-between p-8 md:p-10 transition-all duration-500 group ${
                pkg.featured
                  ? "bg-[#181818] border-2 border-[#D4AF37] gold-glow-card scale-[1.02] -translate-y-2"
                  : "bg-[#141414] border border-white/10 hover:border-white/25 hover:bg-[#181818]"
              }`}
            >
              {/* Featured Badge */}
              {pkg.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#D4AF37] text-[#0E0E0E] font-mono text-[10px] uppercase tracking-[0.2em] font-bold shadow-md">
                  <Crown className="w-3 h-3" />
                  <span>Atelier Crown Experience</span>
                </div>
              )}

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between font-mono text-xs text-[#9E9587] tracking-widest uppercase mb-4">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {pkg.duration}
                  </span>
                  <span>{pkg.featured ? "VIP SUITE" : "CURATED"}</span>
                </div>

                <h3 className="font-serif-luxury text-3xl md:text-4xl font-light text-[#F4F0EA] mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {pkg.name}
                </h3>
                <p className="font-mono text-xs text-[#D4AF37] tracking-wider uppercase mb-4">
                  {pkg.tagline}
                </p>

                <p className="text-xs text-[#A69F94] leading-relaxed mb-8 italic">
                  {pkg.idealFor}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-8 pb-6 border-b border-white/10">
                  <span className="font-serif-luxury text-4xl md:text-5xl font-light text-[#F4F0EA]">
                    {pkg.price}
                  </span>
                  <span className="font-mono text-xs text-[#9E9587] uppercase tracking-wider">
                    / comprehensive ritual
                  </span>
                </div>

                {/* Inclusions list */}
                <div className="space-y-3 mb-10">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9E9587]">
                    Experience Includes:
                  </p>
                  {pkg.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs md:text-sm text-[#D6CCBE] leading-snug">
                      <div className="w-4 h-4 rounded-full bg-[#D4AF37]/20 flex items-center justify-center shrink-0 mt-0.5 text-[#D4AF37]">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action button */}
              <button
                onClick={() => onSelectPackage(pkg.name)}
                className={`w-full py-4 rounded-full font-mono text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  pkg.featured
                    ? "bg-[#D4AF37] hover:bg-[#F4F0EA] text-[#0E0E0E] shadow-lg shadow-[#D4AF37]/20"
                    : "bg-white/10 hover:bg-[#D4AF37] text-[#F4F0EA] hover:text-[#0E0E0E] border border-white/10"
                }`}
              >
                <span>Reserve Package</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
