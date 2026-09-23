'use client';

import React from 'react';

export default function TrailerSection() {
  return (
    <section id="trailer" className="section section--trailer w-full min-h-screen h-screen relative overflow-hidden bg-black" style={{ width: '100vw', height: '100vh', minHeight: '100vh', display: 'block' }}>
      <div className="section__trailer-video w-embed" style={{ width: '100%', height: '100%', minHeight: '100vh' }}>
        <video
          width="100%"
          height="100%"
          playsInline
          autoPlay
          muted
          loop
          poster="/images/6879fe6dec427cb553651a55_asset_24__1_.webp"
          style={{ objectFit: 'cover', width: '100%', height: '100%', minHeight: '100vh', display: 'block' }}
        >
          <source src="/videos/C3815.MP4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}

