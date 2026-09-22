'use client';

import React, { useState, useRef } from 'react';

const pressReviews = [
  {
    outlet: 'the guardian',
    author: '(Benjamin Lee)',
    text: '“The never-ending growth of Amazon’s empire has led to expansion beyond comprehension and predictably problems beyond control as workers have started to push back against a litany of unfair practices. The documentary Union pulls together the stories and journeys of those fighting against them, centering Chris Smalls, the famed organiser of the company’s first-ever union. It’s an age-old battle and directors Brett Story and Stephen Maing have gained intimate access to a modern version of the struggle, hit by Covid, as a charm offensive is employed to combat the misinformation being peddled by Amazon. Likely to be one of the festival’s most rousing films.”',
    link: 'https://www.theguardian.com/film/2024/jan/18/sundance-2024-biggest-films-documentaries',
  },
  {
    outlet: 'THE FILM STAGE',
    author: '(Edward Frumkin)',
    text: '“A key addition to the canon of workers’ cinema … Traces the intimate, intense vérité approach of being in precarious situations [...] to observe how an institution not only affects public officials, but citizens and people across every sector of life. … Maing and Story show that the outcome is the beginning of a generational fight for companies to properly value the labor that keeps them running”',
    link: 'https://thefilmstage.com/sundance-review-union-is-a-quintessential-addition-to-workers-cinema-canon/',
  },
  {
    outlet: 'THE HOLLYWOOD REPORTER',
    author: '(Daniel Fienberg)',
    text: '“Using unobtrusive direct cinema techniques, the documentary takes us inside the fledgling union, capturing the frustration and elation of trying to do the right thing in an impossible historical moment. It’s a nuanced portrait of the challenges of leadership and a revealing celebration of the values of persistence, solidarity and free weed. … By the end of the 102-minute film, Union has presented, without any exposition at all, at least a half-dozen of the organizers in ways that make them feel like complicated characters. … For me, it’s a documentary about the fight, one that takes the necessity of the fight as a given. That’s amply inspiring”',
    link: 'https://www.hollywoodreporter.com/movies/movie-reviews/union-review-amazon-union-struggle-1235794285/',
  },
  {
    outlet: 'THE PLAYLIST',
    author: '(Warren Cantrell)',
    text: '“A raw examination of labor organization at its most powerful, pure, and fragile … Union drama uncut and without any guardrails … the film should be used as an educational primer to outline not just the possibilities of inspired organizing but also its uglier, more complicated side … Maing and Story’s honesty and remove from the filmmaking process has produced an unvarnished, raw document that offers up a slice of history: warts and all.”',
    link: 'https://theplaylist.net/union-review-ultra-verite-labor-doc-swerves-away-from-greatness-settles-instead-for-good-sundance-20240121/',
  },
  {
    outlet: 'INDIEWIRE',
    author: '(David Ehrlich)',
    text: '“Tough and gripping … In spite — or because — of how eagerly this film throws us into the frontlines and stays true to its on-the-ground perspective, a compelling David vs. Goliath story naturally emerges from watching the ALU race to become real.  … In spite — or because — of how eagerly this film throws us into the frontlines and stays true to its on-the-ground perspective, a compelling David vs. Goliath story naturally emerges from watching the ALU race to become real. ”',
    link: 'https://www.indiewire.com/criticism/movies/union-review-documentary-amazon-1234946940/',
  },
  {
    outlet: 'THE MOVEABLE FEST',
    author: '(Stephen Saito)',
    text: '“A sober look at the internal guessing games and debate that ensue within a movement because of an impervious adversary, leaving them to question themselves when they hit road blocks and inevitably slightly at odds over the best way forward. … Individually, the imagery Maing and Story capture may not call attention to itself, but fittingly, it holds tremendous power collectively.”',
    link: 'https://moveablefest.com/stephen-maing-brett-story-union/',
  },
  {
    outlet: 'FILMMAKER MAGAZINE',
    author: '(Natalia Keogan)',
    text: '“Riveting … Only with Maing and Story jointly behind the lens — and on the frontlines — there’s enough street cred between the two to inspire the unwavering trust of their rightfully vigilant characters. Which, in turn, gives the critically acclaimed duo access to a tight-knit world the Blue Origin founder might try to infiltrate but could never imagine.”',
    link: 'https://filmmakermagazine.com/127938-18-recommended-movies-2024-doc-nyc/',
  },
  {
    outlet: 'VARIETY',
    author: '(Guy Lodge)',
    text: 'Brett Story and Stephen Maing\'s richly observed film follows weary workers at a Staten Island Amazon warehouse as they fight to unionize, encountering opposition from their peers as well as their overlords.',
    link: 'https://variety.com/2024/film/reviews/union-review-1235888521/',
  },
];

export default function PressSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  const handleDotClick = (idx) => {
    setActiveIndex(idx);
    if (sliderRef.current) {
      const children = sliderRef.current.children;
      if (children[idx]) {
        children[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  return (
    <section id="press" className="section section--padding-top-l section--padding-bottom-l">
      <div className="section__inner">
        <div className="container">
          <div className="section__header section__header--center-and-mobile">
            <div className="section__content-wrapper">
              <div className="section__heading_wrapper">
                <h2 className="heading heading--xl">Additional press</h2>
                <div className="section__svg-wrapper section__svg-wrapper--press">
                  <div className="section__svg w-embed">
                    <svg width="100%" height="100%" viewBox="0 0 891 509" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M879.76 99.9028L30.1313 195.252L725.914 413.262"
                        stroke="#E1EDBA"
                        strokeWidth="200"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Press Slider */}
        <div data-widget="press-slider" className="press__slider-wrapper">
          <div className="container">
            <div className="swiper swiper--press">
              <div
                ref={sliderRef}
                className="press__slider swiper-wrapper"
                style={{
                  display: 'flex',
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {pressReviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="press__slide swiper-slide"
                    style={{ scrollSnapAlign: 'start', flexShrink: 0 }}
                  >
                    <a
                      href={review.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press__card w-inline-block"
                    >
                      <div className="press__card-top">
                        <div className="heading heading--l">{review.outlet}</div>
                        <p className="press__card-name">{review.author}</p>
                      </div>
                      <div className="press__bottom">
                        <p className="press__paragraph">{review.text}</p>
                        <div className="text-link">Read more</div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="press__slider-mask"></div>

          {/* Dots Pagination */}
          <div className="swiper-pagination__wrapper swiper-pagination__wrapper--press">
            <div className="swiper-pagination" style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {pressReviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`swiper-pagination-bullet ${
                    activeIndex === idx ? 'swiper-pagination-bullet-active' : ''
                  }`}
                  style={{
                    width: activeIndex === idx ? '8px' : '6px',
                    height: activeIndex === idx ? '8px' : '6px',
                    borderRadius: '50%',
                    backgroundColor: activeIndex === idx ? '#1c1c1c' : '#bdbdbd',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.3s ease',
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
