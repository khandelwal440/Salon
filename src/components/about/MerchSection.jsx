'use client';

import React from 'react';

const merchItems = [
  {
    title: 'vinyl record',
    image: '/images/6870c707165059b4064d7915_image.webp',
    alt: 'A circular vinyl record with a white base and striking black splatter patterns radiating from the center.',
  },
  {
    title: 'Film Poster',
    image: '/images/6870c80f6e30dce1ef7d7c7a_image__2_.webp',
    alt: 'Movie poster for "Union," showcasing a crowd gathered outside a building, emphasizing the theme of labor movements.',
  },
  {
    title: 'Film pins',
    image: '/images/699ecbd79c596626579f0ccf_image__1_.webp',
    alt: 'A bronze-colored fist sculpture symbolizing strength and unity, with detailed textures on the fingers and palm.',
  },
];

export default function MerchSection() {
  return (
    <section id="merch" className="section section--padding-top-l">
      <div className="section__inner">
        <div className="container">
          <div className="section__header section__header--center-and-mobile">
            <div className="section__content-wrapper">
              <div className="section__heading_wrapper section__heading_wrapper--merch hidden-mobile">
                <h2 className="heading heading--xl">Exclusive merch: express your style</h2>
                <div className="section__svg-wrapper section__svg-wrapper--merch">
                  <div className="section__svg hidden-mobile w-embed">
                    <svg width="100%" height="100%" viewBox="0 0 1504 668" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1165 97.5L23 360.5L1489.5 569"
                        stroke="#E1EDBA"
                        strokeWidth="200"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="section__heading_wrapper show-mobile">
                <h2 className="heading heading--xl">
                  Elite merch:
                  <br />
                  express your style
                </h2>
                <div className="section__svg-wrapper section__svg-wrapper--merch">
                  <div className="section__svg show-mobile w-embed">
                    <svg width="100%" height="100%" viewBox="0 0 375 267" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M-33.1832 106.168L251.669 230.758L72.1418 35.5636C192.462 93.3882 412.774 223.448 422.194 229.205"
                        stroke="#E1EDBA"
                        strokeWidth="78"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Merch Grid / Cards */}
        <div className="merch-slider__wrapper">
          <div className="swiper merch-slider-swiper">
            <div className="merch-slider swiper-wrapper">
              {merchItems.map((item, idx) => (
                <div key={idx} className="merch-slide swiper-slide">
                  <div className="merch-card">
                    <div className="merch-card__image-wrapper">
                      <img src={item.image} loading="lazy" alt={item.alt} className="image-contain" />
                    </div>
                    <div className="heading heading--l">{item.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
