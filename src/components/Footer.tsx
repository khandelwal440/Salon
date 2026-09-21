"use client";

import { useState } from "react";
import { salonData } from "@/data/salonData";
import { ArrowUp, MessageSquare, Mail, Sparkles, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // JSON-LD Schema for LocalBusiness / BeautySalon SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": "Aluma Salon",
    "image": "https://aluma.salon/static/media/aluma-white-hero.4e1788185e4dce97f3b3.jpeg",
    "telephone": salonData.contact.phone,
    "email": salonData.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": salonData.contact.addressLine1,
      "addressLocality": "Bangalore",
      "postalCode": "560100",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.91017,
      "longitude": 77.67825
    },
    "url": "https://aluma.salon",
    "priceRange": "₹₹₹",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "08:30",
        "closes": "19:30"
      }
    ]
  };

  return (
    <footer className="relative bg-[#080808] text-[#F4F0EA] border-t border-white/10 pb-20 pt-20">
      {/* Inject Structured Data JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Newsletter & Brand statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-serif-luxury text-4xl sm:text-5xl font-light tracking-tight text-[#F4F0EA]">
              ALUMA
            </span>
            <p className="font-serif-luxury text-xl md:text-2xl text-[#D6CCBE] font-light italic max-w-md">
              &ldquo;Where hair is shaped into architectural form and personal poetry.&rdquo;
            </p>
            <p className="font-mono text-xs text-[#A69F94] tracking-widest uppercase">
              LONDON MAYFAIR • NEW YORK SOHO • MILAN
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-[0.2em] block">
              The Salon Gazette
            </span>
            <p className="text-xs font-mono text-[#A69F94] leading-relaxed">
              Receive private invitations to seasonal hair collections, masterclass previews, and trichological care notes.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-xl bg-white/[0.03] border border-[#D4AF37]/40 flex items-center gap-3 text-xs font-mono text-[#D4AF37]">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>You have been added to the confidential atelier register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your confidential email"
                  className="flex-1 px-4 py-3 rounded-full bg-[#141414] border border-white/10 focus:border-[#D4AF37] focus:outline-none text-xs font-mono text-[#F4F0EA] placeholder:text-neutral-600"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#D4AF37] hover:bg-[#F4F0EA] text-[#0E0E0E] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-xs font-mono">
          <div className="space-y-3">
            <h4 className="text-[#D4AF37] uppercase tracking-widest font-semibold">Atelier</h4>
            <ul className="space-y-2 text-[#9E9587]">
              <li><a href="#promise" className="hover:text-white transition-colors">Philosophy</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Haute Services</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">Signature Packages</a></li>
              <li><a href="#transformations" className="hover:text-white transition-colors">Metamorphosis</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Master Stylists</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-[#D4AF37] uppercase tracking-widest font-semibold">Disciplines</h4>
            <ul className="space-y-2 text-[#9E9587]">
              <li>French Balayage</li>
              <li>Japanese Head Spa</li>
              <li>Architectural Bobs</li>
              <li>Caviar Keratin Glass</li>
              <li>Couture Bridal</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-[#D4AF37] uppercase tracking-widest font-semibold">Sanctuary</h4>
            <div className="space-y-1 text-[#9E9587]">
              <p>18 Mount Street</p>
              <p>Mayfair, London W1K 2RP</p>
              <p className="pt-2 text-white">{salonData.contact.phone}</p>
              <p>{salonData.contact.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[#D4AF37] uppercase tracking-widest font-semibold">Connect</h4>
            <div className="flex flex-col space-y-2 text-[#9E9587]">
              <a
                href={salonData.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>{salonData.contact.instagram}</span>
              </a>
              <a
                href={`https://wa.me/${salonData.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#25D366] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Direct WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#9E9587] gap-4">
          <p>&copy; {new Date().getFullYear()} ALUMA ATELIER LTD. ALL RIGHTS RESERVED.</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">PRIVACY CHARTER</span>
            <span className="hover:text-white transition-colors cursor-pointer">TERMS OF APPOINTMENT</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#D4AF37] hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
