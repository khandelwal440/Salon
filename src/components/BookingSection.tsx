"use client";

import { useState } from "react";
import { salonData } from "@/data/salonData";
import { Sparkles, Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle } from "lucide-react";
import confetti from "canvas-confetti";

interface BookingSectionProps {
  initialService?: string;
  initialStylist?: string;
}

export default function BookingSection({ initialService, initialStylist }: BookingSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: initialService || salonData.services[0].title,
    stylist: initialStylist || "Any Available Master Stylist",
    date: "",
    time: "11:00",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger celebratory luxury confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#D4AF37", "#F4F0EA", "#E8E2D8"],
        });
      } catch (err) {
        // Confetti fallback
      }
    }, 900);
  };

  const whatsappInquiryUrl = `https://wa.me/${salonData.contact.whatsapp}?text=${encodeURIComponent(
    `Hello Aluma Mayfair Concierge, I would like to reserve an appointment for: ${formData.service} with ${formData.stylist}.`
  )}`;

  return (
    <section
      id="booking"
      className="relative py-28 md:py-40 bg-[#0E0E0E] text-[#F4F0EA] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="eyebrow-badge">
                <span>09</span>
                <span className="w-8 h-[1px] bg-[#D4AF37]" />
                <span>SANCTUARY RESERVATIONS</span>
              </span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#F4F0EA]">
              Bespoke <span className="italic font-normal text-[#D4AF37]">Concierge</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-mono text-xs text-[#A69F94] leading-relaxed uppercase tracking-wider">
              Reserve your private consultation. Walk-ins are accommodated upon availability; advance booking is recommended.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Interactive Booking Form */}
          <div className="lg:col-span-7 bg-[#141414] border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
            {submitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-serif-luxury text-3xl md:text-4xl text-[#F4F0EA] font-light">
                  Reservation Request Received
                </h3>
                <p className="text-sm md:text-base text-[#D6CCBE] max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-[#D4AF37] font-medium">{formData.name}</span>. Our salon concierge will confirm your date ({formData.date || "preferred time"}) via WhatsApp or call within 2 hours.
                </p>

                <div className="pt-4 flex justify-center gap-4">
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-[#0E0E0E] font-mono text-xs uppercase tracking-wider font-semibold"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant WhatsApp Follow-up</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-full border border-white/20 text-xs font-mono uppercase tracking-wider hover:bg-white/10"
                  >
                    Book Another Service
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-[0.2em]">
                    Appointment Specification
                  </span>
                  <span className="font-mono text-xs text-[#9E9587]">
                    BANGALORE ATELIERS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#A69F94]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Lady Vivienne Claire"
                      className="w-full px-4 py-3.5 rounded-lg bg-[#0E0E0E] border border-white/10 focus:border-[#D4AF37] focus:outline-none text-[#F4F0EA] font-sans text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#A69F94]">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+44 7946 000 000"
                      className="w-full px-4 py-3.5 rounded-lg bg-[#0E0E0E] border border-white/10 focus:border-[#D4AF37] focus:outline-none text-[#F4F0EA] font-sans text-sm placeholder:text-neutral-600 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Service Selection */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#A69F94]">
                      Selected Service *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-lg bg-[#0E0E0E] border border-white/10 focus:border-[#D4AF37] focus:outline-none text-[#F4F0EA] font-sans text-sm transition-colors"
                    >
                      {salonData.services.map((s) => (
                        <option key={s.id} value={s.title}>
                          [{s.number}] {s.title} ({s.price})
                        </option>
                      ))}
                      {salonData.packages.map((p) => (
                        <option key={p.id} value={p.name}>
                          [Package] {p.name} ({p.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Stylist Selection */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#A69F94]">
                      Artisan / Stylist
                    </label>
                    <select
                      value={formData.stylist}
                      onChange={(e) => setFormData({ ...formData, stylist: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-lg bg-[#0E0E0E] border border-white/10 focus:border-[#D4AF37] focus:outline-none text-[#F4F0EA] font-sans text-sm transition-colors"
                    >
                      <option value="Any Available Master Stylist">Any Available Master Stylist</option>
                      {salonData.team.map((t) => (
                        <option key={t.id} value={t.name}>
                          {t.name} — {t.role.split("&")[0]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Date */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#A69F94]">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-lg bg-[#0E0E0E] border border-white/10 focus:border-[#D4AF37] focus:outline-none text-[#F4F0EA] font-sans text-sm transition-colors"
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-[#A69F94]">
                      Preferred Time Slot
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-lg bg-[#0E0E0E] border border-white/10 focus:border-[#D4AF37] focus:outline-none text-[#F4F0EA] font-sans text-sm transition-colors"
                    >
                      <option value="09:30">09:30 AM (Morning Solitude)</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="16:30">04:30 PM (Champagne Twilight)</option>
                      <option value="18:30">06:30 PM</option>
                    </select>
                  </div>
                </div>

                {/* Message / Silhouette Notes */}
                <div className="space-y-2">
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#A69F94]">
                    Hair History or Specific Request
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your current hair condition, past chemical treatments, or vision..."
                    className="w-full px-4 py-3.5 rounded-lg bg-[#0E0E0E] border border-white/10 focus:border-[#D4AF37] focus:outline-none text-[#F4F0EA] font-sans text-sm placeholder:text-neutral-600 transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-[#D4AF37] hover:bg-[#F4F0EA] text-[#0E0E0E] font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-xl hover:shadow-[#D4AF37]/25 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSubmitting ? "Transmitting Reservation..." : "Confirm Reservation Request"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Hours, Location & Google Map */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Contact Cards */}
            <div className="bg-[#141414] border border-white/10 p-8 rounded-2xl space-y-6">
              <h3 className="font-serif-luxury text-2xl text-[#F4F0EA] font-light">
                {salonData.brand.name} Flagship Sanctuaries
              </h3>

              <div className="space-y-4 text-xs font-mono text-[#D6CCBE]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#F4F0EA]">{salonData.contact.addressLine1}</p>
                    <p className="text-[#9E9587]">{salonData.contact.addressLine2}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <a href={`tel:${salonData.contact.phone}`} className="hover:text-[#D4AF37] transition-colors">
                    {salonData.contact.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <a href={`mailto:${salonData.contact.email}`} className="hover:text-[#D4AF37] transition-colors">
                    {salonData.contact.email}
                  </a>
                </div>
              </div>

              {/* Operating Hours Table */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Sanctuary Hours</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  {salonData.contact.hours.map((h, i) => (
                    <div key={i} className="flex justify-between text-[#A69F94]">
                      <span>{h.days}</span>
                      <span className="text-[#F4F0EA]">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 h-64 shadow-xl">
              <iframe
                title="Aluma Salon Mayfair Map Location"
                src={salonData.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(110%)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 left-3 bg-[#0E0E0E]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono tracking-widest text-[#D4AF37] border border-white/10">
                18 MOUNT ST • MAYFAIR
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
