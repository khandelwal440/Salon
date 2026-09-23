'use client';

import React from 'react';

const partnersTrack1 = [
  {
    src: '/images/686f72ddb344fca339a5d510_asset_28__1_.webp',
    alt: 'Logo of Level Ground Productions, featuring bold, dark green text with a modern font.',
  },
  {
    src: '/images/686f741704699206b85ff5a2_asset_28__2_.webp',
    alt: 'Logo of Anonymous Content, featuring the words "ANONYMOUS" in bold green and "CONTENT" in a smaller font.',
  },
  {
    src: '/images/686f7495cf519663e92f0ed6_asset_28__1_.webp',
    alt: 'Logo of Impact Partners featuring the text "+impactpartners" in a modern, minimalist font on a white background.',
  },
  {
    src: '/images/686f766da8d766bb84d4ac55_asset_28__2_.webp',
    alt: 'Logo of Perspective Fund featuring a diamond shape icon and the text "PERSPECTIVE FUND" in modern typography.',
  },
  {
    src: '/images/686f7708aaf3139294473d08_asset_28__3_.webp',
    alt: 'Logo for the Original Voices Fellowship by NBCU Academy, featuring stylized text and NBC News Studios branding.',
  },
  {
    src: '/images/686f779ea479cb1ee92dd802_asset_28__1_.webp',
    alt: 'Logo of Ford Foundation JustFilms, emphasizing support for social justice through film and media initiatives.',
  },
];

const partnersTrack2 = [
  {
    src: '/images/686f7495cf519663e92f0ed6_asset_28__1_.webp',
    alt: 'Logo of Impact Partners featuring the text "+impactpartners" in a modern, minimalist font on a white background.',
  },
  {
    src: '/images/686f785a90e455fee36dc178_asset_28__1_.webp',
    alt: 'Logo of Catapult Film Fund featuring a film reel and the text "CATAPULT FILM FUND" in bold, dark green letters.',
  },
  {
    src: '/images/686f788dadef37939d8a568d_asset_28__2_.webp',
    alt: 'Logo of Sundance Institute: a circular design featuring the word "sundance" in lowercase and "institute" below it in a smaller font.',
  },
  {
    src: '/images/686f790eeb91eccdec9e9e8b_asset_28__3_.webp',
    alt: 'Logo of the International Documentary Association featuring the text "Enterprise Documentary Fund" in a modern font.',
  },
  {
    src: '/images/686f798e04fa71c85c44b044_asset_28__4_.webp',
    alt: 'The image displays the words "FIELD_OF_VISION" in uppercase letters with underscores separating the words, centered on a plain background.',
  },
  {
    src: '/images/686f72ddb344fca339a5d510_asset_28__1_.webp',
    alt: 'Logo of Level Ground Productions, featuring bold, dark green text with a modern font.',
  },
];

export default function FundersMarqueeSection() {
  return (
    <section id="partners" className="section section--padding-top-l section--padding-bottom-l">
      <div className="section__inner">
        <div className="container">
          <div className="section__header">
            <div className="section__content-wrapper">
              <div className="section__heading_wrapper section__heading_wrapper--film">
                <h2 className="heading heading--xl">Our partners</h2>
                <div className="section__svg-wrapper section__svg-wrapper--film">
                  <div className="section__svg hidden-mobile w-embed">
                    <svg width="100%" height="100%" viewBox="0 0 1010 838" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M973 744L177 432L905.5 401.5C559.167 279.833 -126 103.5 -151.5 97"
                        stroke="#E1EDBA"
                        strokeWidth="200"
                      />
                    </svg>
                  </div>
                  <div className="section__svg show-mobile w-embed">
                    <svg width="100%" height="100%" viewBox="0 0 375 264" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M387.64 108.331L100.466 227.472L283.679 35.7331C162.279 91.2552 -60.4703 217.095 -69.9981 222.671"
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

        {/* Marquee Dual Rows */}
        <div className="marquee-horizontal__wrapper">
          {/* Row 1 */}
          <div className="marquee-vertical__slider" style={{ display: 'flex', overflow: 'hidden' }}>
            <div className="marquee-horizontal__list marquee-horizontal__list-run">
              {partnersTrack1.map((p, i) => (
                <div key={i} className="partner_box">
                  <div className="partner_box-image_wrapper">
                    <img src={p.src} loading="eager" alt={p.alt} className="image-contain" />
                  </div>
                </div>
              ))}
            </div>
            <div className="marquee-horizontal__list marquee-horizontal__list-run" aria-hidden="true">
              {partnersTrack1.map((p, i) => (
                <div key={`dup-${i}`} className="partner_box">
                  <div className="partner_box-image_wrapper">
                    <img src={p.src} loading="eager" alt={p.alt} className="image-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 (Reverse) */}
          <div className="marquee-vertical__slider" style={{ display: 'flex', overflow: 'hidden' }}>
            <div className="marquee-horizontal__list marquee-horizontal__list-run-revers">
              {partnersTrack2.map((p, i) => (
                <div key={i} className="partner_box">
                  <div className="partner_box-image_wrapper">
                    <img src={p.src} loading="eager" alt={p.alt} className="image-contain" />
                  </div>
                </div>
              ))}
            </div>
            <div className="marquee-horizontal__list marquee-horizontal__list-run-revers" aria-hidden="true">
              {partnersTrack2.map((p, i) => (
                <div key={`dup-${i}`} className="partner_box">
                  <div className="partner_box-image_wrapper">
                    <img src={p.src} loading="eager" alt={p.alt} className="image-contain" />
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
