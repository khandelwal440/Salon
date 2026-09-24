"use client";

interface MarqueeRibbonProps {
  variant?: "emerald" | "pink" | "iris";
  items?: string[];
}

const DEFAULT_ITEMS = [
  "HAUTE COIFFURE",
  "BESPOKE BALAYAGE",
  "ARCHITECTURAL CUTS",
  "TRICHOLOGY SCALP SPA",
  "JAPANESE MICRO-MIST",
  "COUTURE EXTENSIONS",
  "COLD KERATIN GLOSS",
  "EDITORIAL STYLING",
];

export default function MarqueeRibbon({
  variant = "emerald",
  items = DEFAULT_ITEMS,
}: MarqueeRibbonProps) {
  const bgClass =
    variant === "emerald"
      ? "bg-[#20B364] text-[#0B0C10] border-y-2 border-black"
      : variant === "pink"
      ? "bg-[#EA54DB] text-white border-y-2 border-black"
      : "bg-[#6875E9] text-white border-y-2 border-black";

  return (
    <div
      className={`relative w-full overflow-hidden select-none py-2.5 sm:py-3.5 z-20 ${bgClass}`}
    >
      <div className="flex w-max animate-marquee font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
        {/* Render 3 repetitions for seamless infinite ticker */}
        {Array.from({ length: 3 }).map((_, repIdx) => (
          <div key={repIdx} className="flex items-center gap-6 sm:gap-8 px-3 sm:px-4 shrink-0">
            {items.map((item, idx) => (
              <span key={idx} className="flex items-center gap-6 sm:gap-8 whitespace-nowrap">
                <span>{item}</span>
                <span className="text-xs opacity-75">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
