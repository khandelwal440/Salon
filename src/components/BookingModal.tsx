"use client";

import { useState, useEffect } from "react";
import { salonData } from "@/data/salonData";
import { X, Sparkles, CheckCircle2, MessageSquare, Calendar } from "lucide-react";
import confetti from "canvas-confetti";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  defaultStylist?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  defaultService,
  defaultStylist,
}: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: defaultService || salonData.services[0].title,
    stylist: defaultStylist || "Any Available Master Stylist",
    date: "",
    time: "11:00",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, service: defaultService }));
    }
    if (defaultStylist) {
      setFormData((prev) => ({ ...prev, stylist: defaultStylist }));
    }
  }, [defaultService, defaultStylist]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#F4F0EA", "#E8E2D8"],
        });
      } catch (err) {
        // fallback
      }
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-[#0B0D13] border border-[#6875E9]/30 rounded-2xl p-6 sm:p-10 shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#20B364]/20 border border-[#20B364] flex items-center justify-center mx-auto text-[#20B364]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif-luxury text-3xl text-[#FFFFFF]">
              Reservation Requested
            </h3>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              We look forward to welcoming you to Aluma. Our atelier concierge will contact <span className="text-[#6875E9] font-semibold">{formData.phone}</span> shortly to finalize your bespoke session.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-8 py-3 rounded-full bg-[#6875E9] hover:bg-[#20B364] text-[#FFFFFF] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
            >
              Return to Atelier
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="font-mono text-[10px] tracking-[0.25em] text-[#6875E9] uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#20B364]" />
                Concierge Reservation
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#FFFFFF] mt-1">
                Book Your Experience
              </h3>
            </div>

            <div className="space-y-1.5">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-[#94A3B8]">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-lg bg-[#07080B] border border-white/10 focus:border-[#6875E9] focus:outline-none text-[#FFFFFF] text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block font-mono text-[11px] uppercase tracking-wider text-[#94A3B8]">
                Phone / WhatsApp Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-lg bg-[#07080B] border border-white/10 focus:border-[#6875E9] focus:outline-none text-[#FFFFFF] text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#94A3B8]">
                  Service
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#07080B] border border-white/10 focus:border-[#6875E9] focus:outline-none text-[#FFFFFF] text-sm"
                >
                  {salonData.services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title} ({s.price})
                    </option>
                  ))}
                  {salonData.packages.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name} ({p.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#94A3B8]">
                  Stylist
                </label>
                <select
                  value={formData.stylist}
                  onChange={(e) => setFormData({ ...formData, stylist: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#07080B] border border-white/10 focus:border-[#6875E9] focus:outline-none text-[#FFFFFF] text-sm"
                >
                  <option value="Any Available Master Stylist">Any Master Stylist</option>
                  {salonData.team.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#94A3B8]">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#07080B] border border-white/10 focus:border-[#6875E9] focus:outline-none text-[#FFFFFF] text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#94A3B8]">
                  Time Slot
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#07080B] border border-white/10 focus:border-[#6875E9] focus:outline-none text-[#FFFFFF] text-sm"
                >
                  <option value="10:00">10:00 AM</option>
                  <option value="12:30">12:30 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="17:30">05:30 PM</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#20B364] via-[#6875E9] to-[#EA54DB] hover:opacity-90 text-[#FFFFFF] font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl mt-4 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{isSubmitting ? "Reserving..." : "Confirm My Reservation"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
