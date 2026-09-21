"use client";

import { useEffect, useRef, useState } from "react";
import { salonData } from "@/data/salonData";

export default function StatsCounter() {
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          salonData.stats.forEach((stat, index) => {
            const target = stat.number;
            const duration = 2000;
            const steps = 60;
            const stepTime = duration / steps;
            let current = 0;
            const increment = target / steps;

            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              setCounts((prev) => {
                const next = [...prev];
                next[index] = Math.round(current);
                return next;
              });
            }, stepTime);
          });
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-[#0E0E0E] text-[#F4F0EA] border-t border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-16">
          <span className="eyebrow-badge">
            <span>06</span>
            <span className="w-8 h-[1px] bg-[#D4AF37]" />
            <span>PRECISION BENCHMARKS</span>
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {salonData.stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`pt-8 sm:pt-0 ${idx > 0 ? "sm:pl-8 lg:pl-10" : ""} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-baseline font-serif-luxury text-5xl sm:text-6xl md:text-7xl font-light text-[#F4F0EA] tracking-tight">
                  <span>{counts[idx].toLocaleString()}</span>
                  <span className="text-[#D4AF37] ml-1">{stat.suffix}</span>
                </div>
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mt-3">
                  {stat.label}
                </h3>
              </div>

              <p className="text-xs text-[#9E9587] font-mono leading-relaxed mt-4">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
