// Salon props drawn as SVG so they can recolour with the palette and animate in 3D.
import React from "react";

type P = { className?: string; style?: React.CSSProperties };

export function Dots({ className, size = 22 }: { className?: string; size?: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 38 38" aria-hidden="true">
      <circle className="d d1" cx="19" cy="12.73" r="6.09" fill="#20B364" />
      <circle className="d d2" cx="11.8" cy="25.27" r="6.09" fill="#6875E9" />
      <circle className="d d3" cx="26.2" cy="25.27" r="6.09" fill="#EA54DB" />
    </svg>
  );
}

/** Scissors. Blades are .bA / .bB rotating around the screw at (84,100). */
export function Scissors({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 210 200" aria-hidden="true">
      <g className="bA">
        <path d="M84 96 C122 86 172 82 204 88 C176 96 124 106 84 108 Z" fill="var(--steel,#EDEAF7)" stroke="var(--line,#1C1442)" strokeWidth="4" strokeLinejoin="round" />
        <path d="M100 97 C140 91 176 88 196 89" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".8" fill="none" />
        <path d="M86 102 L46 130" stroke="var(--line,#1C1442)" strokeWidth="14" strokeLinecap="round" />
        <path d="M86 102 L46 130" stroke="var(--h1,#EA54DB)" strokeWidth="8" strokeLinecap="round" />
        <circle cx="32" cy="142" r="20" fill="none" stroke="var(--line,#1C1442)" strokeWidth="14" />
        <circle cx="32" cy="142" r="20" fill="none" stroke="var(--h1,#EA54DB)" strokeWidth="8" />
      </g>
      <g className="bB">
        <path d="M84 104 C122 114 172 118 204 112 C176 104 124 94 84 92 Z" fill="var(--steel,#EDEAF7)" stroke="var(--line,#1C1442)" strokeWidth="4" strokeLinejoin="round" />
        <path d="M86 98 L46 70" stroke="var(--line,#1C1442)" strokeWidth="14" strokeLinecap="round" />
        <path d="M86 98 L46 70" stroke="var(--h2,#20B364)" strokeWidth="8" strokeLinecap="round" />
        <circle cx="32" cy="58" r="20" fill="none" stroke="var(--line,#1C1442)" strokeWidth="14" />
        <circle cx="32" cy="58" r="20" fill="none" stroke="var(--h2,#20B364)" strokeWidth="8" />
      </g>
      <circle cx="86" cy="100" r="7" fill="var(--h3,#6875E9)" stroke="var(--line,#1C1442)" strokeWidth="3" />
    </svg>
  );
}

export function Comb({ className, style }: P) {
  const teeth = [];
  for (let i = 0; i < 17; i++) {
    const x = 18 + i * 10.5;
    teeth.push(<rect key={i} x={x} y="46" width="5.5" height={i < 6 ? 44 : 34} rx="2.75" />);
  }
  return (
    <svg className={className} style={style} viewBox="0 0 210 100" aria-hidden="true">
      <g fill="var(--c,#20B364)" stroke="var(--line,#1C1442)" strokeWidth="3">
        {teeth}
        <rect x="8" y="16" width="194" height="36" rx="14" />
      </g>
      <rect x="22" y="24" width="120" height="6" rx="3" fill="#fff" opacity=".55" />
    </svg>
  );
}

export function Dryer({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 220 220" aria-hidden="true">
      <g stroke="var(--line,#1C1442)" strokeWidth="4" strokeLinejoin="round">
        <path d="M92 118 L120 206 Q124 214 134 212 L150 208 Q158 205 156 196 L136 118 Z" fill="var(--c2,#6875E9)" />
        <path d="M60 58 L188 70 Q206 72 206 90 L206 104 Q206 122 188 124 L60 136 Z" fill="var(--c,#EA54DB)" />
        <circle cx="70" cy="97" r="52" fill="var(--c,#EA54DB)" />
        <circle cx="70" cy="97" r="30" fill="var(--c2,#6875E9)" />
        <rect x="200" y="74" width="14" height="46" rx="5" fill="var(--c2,#6875E9)" />
      </g>
      <g stroke="var(--line,#1C1442)" strokeWidth="4" strokeLinecap="round">
        <path d="M58 84 L82 110 M82 84 L58 110" />
      </g>
      <path d="M40 66 Q58 50 84 52" stroke="#fff" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".6" />
      <rect x="126" y="150" width="18" height="10" rx="4" fill="var(--c3,#20B364)" stroke="var(--line,#1C1442)" strokeWidth="3" />
    </svg>
  );
}

export function Bottle({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 220" aria-hidden="true">
      <g stroke="var(--line,#1C1442)" strokeWidth="4" strokeLinejoin="round">
        <path d="M52 34 L52 14 L96 14 L96 26 L66 26 L66 34 Z" fill="var(--c2,#6875E9)" />
        <rect x="44" y="34" width="32" height="26" rx="4" fill="var(--c2,#6875E9)" />
        <path d="M22 76 Q22 58 40 58 L80 58 Q98 58 98 76 L98 196 Q98 212 82 212 L38 212 Q22 212 22 196 Z" fill="var(--c,#20B364)" />
        <rect x="34" y="104" width="52" height="60" rx="8" fill="#fff" />
      </g>
      <circle cx="50" cy="126" r="6" fill="#20B364" />
      <circle cx="43" cy="139" r="6" fill="#6875E9" />
      <circle cx="57" cy="139" r="6" fill="#EA54DB" />
      <rect x="66" y="122" width="12" height="4" rx="2" fill="#1C1442" />
      <rect x="66" y="134" width="12" height="4" rx="2" fill="#1C1442" />
      <path d="M32 80 L32 186" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".5" />
    </svg>
  );
}

export function HandMirror({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 140 240" aria-hidden="true">
      <g stroke="var(--line,#1C1442)" strokeWidth="4">
        <rect x="56" y="126" width="28" height="104" rx="14" fill="var(--c2,#6875E9)" />
        <circle cx="70" cy="70" r="62" fill="var(--c,#EA54DB)" />
        <circle cx="70" cy="70" r="46" fill="#E9F4FF" />
      </g>
      <path d="M44 58 Q52 38 74 34" stroke="#fff" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M50 84 L86 48 M60 96 L96 60" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity=".7" />
    </svg>
  );
}

/** Fake extrusion: stacks the same flat prop a few px apart in Z so it reads as a solid object when it spins. */
export function Ex({ children, className, depth = 5 }: { children: React.ReactElement; className?: string; depth?: number }) {
  const layers = [];
  for (let i = depth; i >= 0; i--)
    layers.push(
      <div key={i} className={`al-exl${i ? " back" : ""}`} style={{ transform: `translateZ(${-i * 2.2}px)` }}>
        {children}
      </div>
    );
  return <div className={`al-ex ${className || ""}`}>{layers}</div>;
}
