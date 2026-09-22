'use client';

import React from 'react';

export default function TrailerSection() {
  return (
    <section id="trailer" className="section section--trailer">
      <div className="section__trailer-video w-embed">
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
    </section>
  );
}
