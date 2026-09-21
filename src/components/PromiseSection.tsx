"use client";

import { salonData } from "@/data/salonData";
import { Sparkles, MessageSquare, ShieldCheck, HeartHandshake, Leaf, Award } from "lucide-react";

interface PromiseProps {
  onOpenBooking: () => void;
}

export default function PromiseSection({ onOpenBooking }: PromiseProps) {
  const whatsappUrl = `https://wa.me/${salonData.contact.whatsapp}?text=${encodeURIComponent(
    "Hello Aluma Concierge, I would like to inquire about booking an appointment at the Mayfair sanctuary."
  )}`;

  return (
    <section
      id="promise"
      className="relative py-28 md:py-40 bg-[#0E0E0E] text-[#F4F0EA] border-t border-white/5 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-10">
          <span className="eyebrow-badge">
            <span>02</span>
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
            <span>THE ALUMA PHILOSOPHY</span>
          </span>
        </div>

        {/* The Bold Promise & Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Statement */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light leading-[1.05] tracking-tight text-[#F4F0EA]">
              &ldquo;{salonData.brand.promise}&rdquo;
            </h2>

            <p className="text-lg md:text-2xl text-[#D6CCBE] font-light leading-relaxed max-w-3xl">
              {salonData.brand.promiseParagraph}
            </p>

            {/* Dual CTAs: Book Now + WhatsApp Concierge */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={onOpenBooking}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#D4AF37] hover:bg-[#F4F0EA] text-[#0E0E0E] font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl hover:shadow-[#D4AF37]/25"
              >
                <Sparkles className="w-4 h-4 text-[#0E0E0E] group-hover:scale-110 transition-transform" />
                <span>Reserve An Experience</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 hover:border-[#D4AF37] bg-white/[0.02] hover:bg-white/[0.06] text-[#F4F0EA] hover:text-[#D4AF37] font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Side Editorial Pillars / Trust Badges */}
          <div className="lg:col-span-4 flex flex-col space-y-6 pt-4 lg:border-l lg:border-white/10 lg:pl-10">
            <span className="font-mono text-[11px] tracking-[0.25em] text-[#D4AF37] uppercase">
              Sanctuary Standards
            </span>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-[#D4AF37] bg-white/[0.02]">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-lg text-[#F4F0EA]">Botanical Formulation</h4>
                  <p className="font-mono text-xs text-[#9E9587] mt-1 leading-relaxed">
                    Formaldehyde-free, vegan & bio-restorative caviar elixirs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-[#D4AF37] bg-white/[0.02]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-lg text-[#F4F0EA]">Facial Golden-Ratio</h4>
                  <p className="font-mono text-xs text-[#9E9587] mt-1 leading-relaxed">
                    Dry-carved geometry mapped to cheekbone and jawline balance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center shrink-0 text-[#D4AF37] bg-white/[0.02]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-lg text-[#F4F0EA]">Artisanal Masters</h4>
                  <p className="font-mono text-xs text-[#9E9587] mt-1 leading-relaxed">
                    Stylists trained in Milan, Paris, and Tokyo with 10+ years practice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
