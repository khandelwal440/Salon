'use client';

import React from 'react';

const laurels = [
  {
    src: '/images/awards/award_luxury_salon.svg',
    alt: 'Best Luxury Salon Awards 2024 Winner badge with laurel wreath',
  },
  {
    src: '/images/awards/award_vogue_beauty.svg',
    alt: 'Vogue Beauty Awards 2024 Official Choice badge with laurel wreath',
  },
  {
    src: '/images/awards/award_elle_wellness.svg',
    alt: 'Elle Spa & Care Selection Top Wellness badge with laurel wreath',
  },
  {
    src: '/images/awards/award_gq_grooming.svg',
    alt: 'GQ Grooming Excellence 2024 Awards badge with laurel wreath',
  },
  {
    src: '/images/awards/award_bazaar_styling.svg',
    alt: "Harper's Bazaar Best Styling Studio 2024 badge with laurel wreath",
  },
  {
    src: '/images/awards/award_cosmo_beauty.svg',
    alt: 'Cosmopolitan Beauty Gold Winner 2024 badge with laurel wreath',
  },
  {
    src: '/images/awards/award_hygiene_certified.svg',
    alt: 'Gold Standard Hygiene Certified Care Aluma Protocol badge with laurel wreath',
  },
];

export default function HeroSection() {
  return (
    <section target-section-trailer="" className="section section--hero">
      <div className="container">
        {/* Festival Laurels */}
        <div data-sped="1" className="section-hero__logo-wrapper">
          {laurelItems(laurels)}
        </div>

        {/* Hero Title & Inline Teaser Video */}
        <div data-animation-video="video-trigger" className="section-hero__inner">
          <div className="section-hero__content">
            {/* Background SVG vector */}
            <div className="section-hero__heading-vector w-embed">
              <svg width="100%" height="100%" viewBox="0 0 335 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="75%" dominantBaseline="middle" textAnchor="middle" fontFamily="'Coolvetica Crammed Rg', Arial, sans-serif" fontSize="110" fontWeight="900" fill="currentColor" letterSpacing="4">ABOUT</text>
              </svg>
            </div>

            {/* Title: AB - [Video in O] - UT */}
            <div className="section-hero__heading-wrapper">
              <div>
                <h1 data-animation-video="title" className="heading heading--xxl">
                  <span>AB</span>
                </h1>
              </div>

              <div data-animation-video="video-container" className="section-hero__video-wrapper">
                <div data-animation-video="video-element" className="section-hero__video">
                  <div data-animation-video="video-embed" className="section-hero__video-embed w-embed">
                    <video
                      width="100%"
                      height="100%"
                      playsInline
                      autoPlay
                      muted
                      loop
                      poster="/images/6879fe6dec427cb553651a55_asset_24__1_.webp"
                      style={{ objectFit: 'cover' }}
                    >
                      <source src="/videos/union-of-trailer.mp4" type="video/mp4" />
                    </video>
                  </div>
                  <div data-animation-video="scroll" className="section-hero__video-text">
                    scroll
                  </div>
                </div>
                <h1 data-animation-video="o" className="heading heading--xxl heading--xxl--ninna">
                  O
                </h1>
              </div>

              <div>
                <h1 data-animation-video="title" className="heading heading--xxl">
                  <span>UT</span>
                </h1>
              </div>
            </div>

            {/* Film Credits */}
            <div data-animation-video="opacity" className="list-edited-by">
              <div className="list-edited-by__line">
                <div className="list-edited-by__item">
                  <div className="list-edited-by__item-by">
                    edited
                    <br />
                    by
                  </div>
                  <div className="list-edited-by__item-name">BLAIR MCCLENDON</div>
                </div>
                <div className="list-edited-by__item">
                  <div className="list-edited-by__item-by">
                    cinematography
                    <br />
                    by
                  </div>
                  <div className="list-edited-by__item-name">MARTIN DICICCO</div>
                </div>
                <div className="list-edited-by__item">
                  <div className="list-edited-by__item-by">
                    original music
                    <br />
                    by
                  </div>
                  <div className="list-edited-by__item-name">ROBERT AIKI AUBREY LOWE</div>
                </div>
              </div>

              <div className="list-edited-by__line">
                <div className="list-edited-by__item">
                  <div className="list-edited-by__item-by">
                    produced
                    <br />
                    by
                  </div>
                  <div className="list-edited-by__item-name_wrapper">
                    <div className="list-edited-by__item-name">SAMANTHA CURLEY</div>
                    <div className="list-edited-by__item-name">MARS VERRONE</div>
                  </div>
                </div>
                <div className="list-edited-by__item">
                  <div className="list-edited-by__item-by">
                    directed
                    <br />
                    by
                  </div>
                  <div className="list-edited-by__item-name_wrapper">
                    <div className="list-edited-by__item-name">BRETT STORY</div>
                    <div className="list-edited-by__item-name">STEPHEN MAING</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="trailer-botom" className="botom-scrol"></div>
    </section>
  );
}

function laurelItems(items) {
  return items.map((item, idx) => (
    <div key={idx} className="section-hero__logo">
      <img src={item.src} loading="lazy" alt={item.alt} className="section-hero__logo-image" />
    </div>
  ));
}
