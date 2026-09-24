'use client';

import React from 'react';

export default function HeroSection() {
  return (
    <section target-section-trailer="" className="section section--hero">
      <div className="container">
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
                      <source src="/videos/C3815.MP4" type="video/mp4" />
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
          </div>
        </div>
      </div>
      <div id="trailer-botom" className="botom-scrol"></div>
    </section>
  );
}
