'use client';

import React from 'react';

const laurels = [
  {
    src: '/images/686bbad33727ea88cc0b33bb_asset_28.webp',
    alt: 'Logo of the Visions du Réel festival, featuring laurel leaves and the text "Official Selection 2024."',
  },
  {
    src: '/images/686bbb6110d360f05a6c19e2_asset_25.webp',
    alt: 'Logo featuring the word "SPFX" encircled by a decorative laurel wreath, with "A Company" and "Fachtiged 1984" above and below.',
  },
  {
    src: '/images/686bbb9ed0c79e562364f643_asset_24.webp',
    alt: 'Laurel wreath symbol with the text "Official Selection True/False Film Fest" in teal, representing film festival recognition.',
  },
  {
    src: '/images/686bbbe17fb6fdadca57dba7_asset_29.webp',
    alt: 'Logo for the DOXA Documentary Film Festival 2024, featuring laurel leaves and the text "Official Selection."',
  },
  {
    src: '/images/686bbc119c49b9f6e19da8f5_asset_26.webp',
    alt: 'Logo featuring "Official Selection" and "Hot Docs 2024" with a laurel design, highlighting a film festival recognition.',
  },
  {
    src: '/images/686bbc4e7ed61a42566807ad_asset_30.webp',
    alt: 'Logo for Sheffield DocFest 2024 featuring laurel wreaths and the text "Official Selection."',
  },
  {
    src: '/images/686bbd330c8d9aac9111d6f5_asset_27.webp',
    alt: 'Official selection badge for the 2024 Full Frame Documentary Film Festival featuring a laurel wreath design.',
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
            <div className="section-hero__heading-wrapper flex items-center justify-center select-none">
              <div className="flex items-center">
                <h1 data-animation-video="title" className="heading heading--xxl flex items-center">
                  <span className="inline-block opacity-100 text-[#141414]">AB</span>
                </h1>
              </div>

              <div data-animation-video="video-container" className="section-hero__video-wrapper flex items-center justify-center">
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
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    >
                      <source src="/videos/union-of-trailer.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
                <h1 data-animation-video="o" className="heading heading--xxl heading--xxl--ninna opacity-100 text-[#141414]">
                  O
                </h1>
              </div>

              <div className="flex items-center">
                <h1 data-animation-video="title" className="heading heading--xxl flex items-center">
                  <span className="inline-block opacity-100 text-[#141414]">UT</span>
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
