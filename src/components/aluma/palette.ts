// Brand colours pulled straight from the Aluma logo (three dots) plus tints and a night ink.
export const C = {
  pink: "#EA54DB",
  green: "#20B364",
  iris: "#6875E9",
  white: "#FFFFFF",
  night: "#1C1442",
  blush: "#FFC7F6",
  mint: "#BDF5D5",
  lilac: "#D6DAFF",
};

export type Pal = { bg: string; ink: string; pop: string; popInk: string; hair: string[] };

// Every section carries data-off="n": it paints with PAL[(base + n) % N].
// A snip on the hero (or a tap on a swatch) moves base, so the whole site recolours.
export const PAL: Pal[] = [
  { bg: C.pink, ink: C.night, pop: C.green, popInk: C.white, hair: [C.night, C.green, C.white, C.iris] },
  { bg: C.green, ink: C.night, pop: C.blush, popInk: C.night, hair: [C.night, C.pink, C.white, C.blush] },
  { bg: C.iris, ink: C.white, pop: C.blush, popInk: C.night, hair: [C.white, C.pink, C.night, C.mint] },
  { bg: C.white, ink: C.iris, pop: C.pink, popInk: C.white, hair: [C.iris, C.pink, C.green, C.night] },
  { bg: C.night, ink: C.blush, pop: C.green, popInk: C.night, hair: [C.pink, C.green, C.iris, C.blush] },
  { bg: C.mint, ink: "#0B4A2A", pop: C.pink, popInk: C.white, hair: [C.green, C.pink, "#0B4A2A", C.iris] },
  { bg: C.blush, ink: "#3A2BB5", pop: C.iris, popInk: C.white, hair: [C.pink, C.iris, "#3A2BB5", C.green] },
];
export const N = PAL.length;

let base = 0;
const subs = new Set<(b: number) => void>();

export const getBase = () => base;
export const pal = (off = 0) => PAL[(((base + off) % N) + N) % N];
export const onPaint = (fn: (b: number) => void) => {
  subs.add(fn);
  return () => {
    subs.delete(fn);
  };
};

export function paint() {
  if (typeof document === "undefined") return;
  document.querySelectorAll<HTMLElement>("[data-off]").forEach((el) => {
    const p = pal(+(el.dataset.off || 0));
    el.style.setProperty("--bg", p.bg);
    el.style.setProperty("--ink", p.ink);
    el.style.setProperty("--pop", p.pop);
    el.style.setProperty("--popInk", p.popInk);
  });
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", pal(0).bg);
  subs.forEach((f) => f(base));
}

export function setBase(b: number) {
  base = ((b % N) + N) % N;
  paint();
}
export const advance = () => setBase(base + 1);
