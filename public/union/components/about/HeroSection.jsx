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
              <svg width="100%" height="100%" viewBox="0 0 335 189" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M258.062 1.85355V187.143H279.137V73.4215L277.979 20.3821H278.676L296.047 187.143H334.494V1.85355H313.647V113.029L315.037 168.614H314.34L296.969 1.85355H258.058H258.062ZM212.665 160.971V28.025C212.665 24.55 215.212 22.0036 219.383 22.0036C223.554 22.0036 226.101 24.55 226.101 28.025V160.971C226.101 164.446 223.554 166.993 219.383 166.993C215.212 166.993 212.665 164.446 212.665 160.971ZM186.261 27.1V161.9C186.261 181.818 203.633 189 219.383 189C235.133 189 252.504 181.821 252.504 161.9V27.1C252.504 7.18208 235.133 0 219.383 0C203.633 0 186.261 7.17862 186.261 27.1ZM154.529 1.85355V187.143H180.933V1.85355H154.529ZM72.3079 1.85355V187.143H93.3829V73.4215L92.2258 20.3821H92.9221L110.294 187.143H148.74V1.85355H127.894V113.029L129.283 168.614H128.587L111.215 1.85355H72.3044H72.3079ZM0.507812 1.85355V161.897C0.507812 181.814 17.8792 188.997 33.6292 188.997C49.3792 188.997 66.7507 181.818 66.7507 161.897V1.85355H40.3471V160.971C40.3471 164.446 37.8006 166.993 33.6292 166.993C29.4579 166.993 26.9114 164.446 26.9114 160.971V1.85355H0.507812Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Title: UNI - [Video in O] - N */}
            <div className="section-hero__heading-wrapper">
              <div>
                <h1 data-animation-video="title" className="heading heading--xxl">
                  <span>UNI</span>
                </h1>
              </div>

              <div data-animation-video="video-container" className="section-hero__video-wrapper">
                <div data-animation-video="video-element" className="section-hero__video">
                  <div data-animation-video="video-embed" className="section-hero__video-embed w-embed">
                    <video
                      width="100%"
                      height="100%"
                      playsInline
                      controls
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
                  <span>N</span>
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
