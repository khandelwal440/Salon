"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, reduced, buzz, wa, splitText } from "./fx";

const LOOKS = [
  { n: "Balayage melt", img: "look-melt-front" },
  { n: "Soft curls", img: "look-curls-front" },
  { n: "Sleek and straight", img: "look-glass-front" },
  { n: "Violet waves", img: "violet-hair" },
  { n: "Long glossy layers", img: "model-brown" },
  { n: "Beach waves", img: "model-dress" },
  { n: "The sharp lob", img: "look-lob-front" },
  { n: "Curly with a fringe", img: "model-white" },
];

/** Swipe right to save a look, left to skip. The saved list goes to us on WhatsApp so your stylist sees it before you arrive. */
export default function LookDeck() {
  const sec = useRef<HTMLElement>(null);
  const deck = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [left, setLeft] = useState(LOOKS.length);
  const savedRef = useRef<string[]>([]);

  useEffect(() => {
    const s = sec.current!;
    const ch = splitText(s.querySelector<HTMLElement>(".al-dtitle"));
    if (!reduced()) gsap.from(ch, { yPercent: 120, stagger: 0.025, duration: 0.8, ease: "back.out(2)", scrollTrigger: { trigger: s, start: "top 70%" } });
    layout();
    // drag
    const D = deck.current!;
    let card: HTMLElement | null = null,
      sx = 0,
      sy = 0,
      dx = 0,
      dy = 0;
    const down = (e: PointerEvent) => {
      const c = top();
      if (!c || !(e.target as HTMLElement).closest(".al-lcard")) return;
      card = c;
      sx = e.clientX;
      sy = e.clientY;
      dx = dy = 0;
      card.setPointerCapture(e.pointerId);
      card.style.transition = "none";
    };
    const move = (e: PointerEvent) => {
      if (!card) return;
      dx = e.clientX - sx;
      dy = e.clientY - sy;
      card.style.transform = `translate(${dx}px,${dy * 0.3}px) rotate(${dx * 0.07}deg)`;
      card.dataset.lean = dx > 40 ? "r" : dx < -40 ? "l" : "";
    };
    const up = () => {
      if (!card) return;
      const c = card;
      card = null;
      c.style.transition = "";
      if (Math.abs(dx) > 90) fling(c, dx > 0);
      else {
        c.dataset.lean = "";
        layout();
      }
    };
    D.addEventListener("pointerdown", down);
    D.addEventListener("pointermove", move);
    D.addEventListener("pointerup", up);
    D.addEventListener("pointercancel", up);
    return () => {
      D.removeEventListener("pointerdown", down);
      D.removeEventListener("pointermove", move);
      D.removeEventListener("pointerup", up);
      D.removeEventListener("pointercancel", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function cards() {
    return Array.from(deck.current!.querySelectorAll<HTMLElement>(".al-lcard:not(.gone)"));
  }
  function top() {
    const c = cards();
    return c[c.length - 1] || null;
  }
  function layout() {
    const c = cards();
    c.forEach((el, i) => {
      const k = c.length - 1 - i;
      el.style.transform = `translateY(${k * 10}px) scale(${1 - k * 0.04}) rotate(${k % 2 ? 2.5 : -2.5}deg)`;
      el.style.zIndex = String(i);
      el.tabIndex = k === 0 ? 0 : -1;
    });
  }
  function fling(c: HTMLElement, right: boolean) {
    c.classList.add("gone");
    c.dataset.lean = right ? "r" : "l";
    c.style.transform = `translate(${right ? 140 : -140}vw, -10vh) rotate(${right ? 40 : -40}deg)`;
    buzz(right ? 20 : 8);
    if (right) {
      savedRef.current = [...savedRef.current, c.dataset.name!];
      setSaved(savedRef.current);
    }
    setLeft(cards().length);
    layout();
  }
  const act = (right: boolean) => {
    const c = top();
    if (c) fling(c, right);
  };
  const reset = () => {
    savedRef.current = [];
    setSaved([]);
    deck.current!.querySelectorAll<HTMLElement>(".al-lcard").forEach((c) => {
      c.classList.remove("gone");
      c.dataset.lean = "";
    });
    setLeft(LOOKS.length);
    layout();
  };
  const msg = saved.length
    ? `Hi Aluma! I saved these looks on your site: ${saved.join(", ")}. Can I book a consult?`
    : "Hi Aluma! I'd like to book a consult.";

  return (
    <section ref={sec} className="al-sec al-deckwrap" data-off="6" aria-labelledby="dk-h">
      <div className="al-dhead">
        <h2 id="dk-h" className="al-h2 al-dtitle" data-lines="Save the|looks you like."></h2>
        <p className="al-lede">Swipe right to save, left to skip. We'll send your saves straight to your stylist.</p>
      </div>
      <div className="al-deckcol">
        <div className="al-deck" ref={deck} data-cursor="Drag">
          <div className="al-dend">
            <h3>{saved.length ? `You saved ${saved.length}.` : "Nothing saved yet."}</h3>
            <p>{saved.length ? saved.join(", ") : "Swipe again and save the ones you'd wear."}</p>
            <a className="al-obtn" href={wa(msg)} target="_blank" rel="noopener">
              {saved.length ? "Send to my stylist" : "Book a consult"}
            </a>
            <button className="al-tlink" type="button" onClick={reset}>
              Swipe again
            </button>
          </div>
          {LOOKS.map((l) => (
            <article className="al-lcard" key={l.n} data-name={l.n} aria-label={l.n}>
              <img src={`/aluma/${l.img}.webp`} alt="" loading="lazy" draggable={false} />
              <b className="al-stamp yes">Save</b>
              <b className="al-stamp no">Skip</b>
              <h3>{l.n}</h3>
            </article>
          ))}
        </div>
        <div className="al-dctl">
          <button className="al-obtn ghost mag" type="button" onClick={() => act(false)} disabled={!left}>
            Skip
          </button>
          <button className="al-obtn mag" type="button" onClick={() => act(true)} disabled={!left}>
            Save
          </button>
        </div>
        <p className="al-dcount" aria-live="polite">
          {left ? `${left} left, ${saved.length} saved` : "That's every look."}
        </p>
      </div>
    </section>
  );
}
