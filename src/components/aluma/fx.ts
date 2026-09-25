"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}
export { gsap, ScrollTrigger };

export const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover:hover) and (pointer:fine)").matches;

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

export const buzz = (ms: number) => {
  if (reduced()) return;
  try {
    navigator.vibrate?.(ms);
  } catch {}
};

export const WA = "919019555087";
export const PHONE = "+91 90195 55087";
export const wa = (msg: string) => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

/** Turn "Hair that|turns heads." into per-line, per-char spans. Returns the char spans. */
export function splitText(el: HTMLElement | null, clip = true): HTMLElement[] {
  if (!el) return [];
  if (el.dataset.done) return Array.from(el.querySelectorAll<HTMLElement>(".ch"));
  const lines = (el.dataset.lines || el.textContent || "").split("|");
  el.setAttribute("aria-label", lines.join(" "));
  el.innerHTML = lines
    .map(
      (l) =>
        `<span class="ln${clip ? " clip" : ""}" aria-hidden="true">` +
        [...l].map((c) => (c === " " ? '<span class="ch sp">&nbsp;</span>' : `<span class="ch">${c}</span>`)).join("") +
        "</span>"
    )
    .join("");
  el.dataset.done = "1";
  return Array.from(el.querySelectorAll<HTMLElement>(".ch"));
}

const WORDS = ["Snip!", "Chop!", "Trim!", "Swish!", "Fresh!", "Ooh!", "Fringe!", "Layers!"];
let wordI = 0;
/** Comic burst + falling hair clippings at x,y (viewport coords). */
export function burst(x: number, y: number, c1: string, c2: string, word?: string) {
  if (reduced()) return;
  const b = document.createElement("div");
  b.className = "al-burst";
  b.style.left = x + "px";
  b.style.top = y + "px";
  b.style.setProperty("--c1", c1);
  b.style.setProperty("--c2", c2);
  for (let i = 0; i < 10; i++) {
    const s = document.createElement("i");
    const a = (i / 10) * 360 + Math.random() * 16;
    b.appendChild(s);
    s.animate(
      [
        { transform: `rotate(${a}deg) translateX(18px) scaleX(.1)`, opacity: 1 },
        { transform: `rotate(${a}deg) translateX(${60 + Math.random() * 40}px) scaleX(1)`, opacity: 1, offset: 0.5 },
        { transform: `rotate(${a}deg) translateX(${120 + Math.random() * 50}px) scaleX(.2)`, opacity: 0 },
      ],
      { duration: 520, easing: "cubic-bezier(.2,.8,.3,1)", fill: "forwards" }
    );
  }
  // little curly clippings
  for (let i = 0; i < 9; i++) {
    const u = document.createElement("u");
    const a = Math.random() * Math.PI * 2,
      v = 80 + Math.random() * 160,
      r = Math.random() * 720 - 360;
    b.appendChild(u);
    u.animate(
      [
        { transform: `translate(0,0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${Math.cos(a) * v}px,${Math.sin(a) * v * 0.5 + 200}px) rotate(${r}deg)`, opacity: 0 },
      ],
      { duration: 1000 + Math.random() * 400, easing: "cubic-bezier(.2,.6,.5,1)", fill: "forwards" }
    );
  }
  const w = document.createElement("b");
  w.textContent = word || WORDS[wordI++ % WORDS.length];
  b.appendChild(w);
  const rot = Math.random() * 30 - 15;
  w.animate(
    [
      { transform: `translate(-50%,-50%) rotate(${rot}deg) scale(.2)`, opacity: 1 },
      { transform: `translate(-50%,-125%) rotate(${rot}deg) scale(1.15)`, opacity: 1, offset: 0.35 },
      { transform: `translate(-50%,-165%) rotate(${rot}deg) scale(1)`, opacity: 0 },
    ],
    { duration: 820, easing: "cubic-bezier(.2,.9,.3,1.3)", fill: "forwards" }
  );
  document.body.appendChild(b);
  setTimeout(() => b.remove(), 1500);
}

/** Magnetic pull on buttons (fine pointers only). */
export function magnetize(root: HTMLElement) {
  if (!finePointer() || reduced()) return () => {};
  const els = Array.from(root.querySelectorAll<HTMLElement>(".mag"));
  const offs: (() => void)[] = [];
  els.forEach((m) => {
    const mv = (e: PointerEvent) => {
      const r = m.getBoundingClientRect();
      m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.28}px,${(e.clientY - r.top - r.height / 2) * 0.38}px)`;
    };
    const lv = () => {
      m.style.transition = "transform .5s cubic-bezier(.3,1.6,.5,1)";
      m.style.transform = "";
      setTimeout(() => (m.style.transition = ""), 500);
    };
    m.addEventListener("pointermove", mv);
    m.addEventListener("pointerleave", lv);
    offs.push(() => {
      m.removeEventListener("pointermove", mv);
      m.removeEventListener("pointerleave", lv);
    });
  });
  return () => offs.forEach((f) => f());
}
