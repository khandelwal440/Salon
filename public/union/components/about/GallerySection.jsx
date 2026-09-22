'use client';

import React from 'react';

const galleryImages = [
  {
    src: '/images/6878a875e31ca11ac4e687cf_asset_52.webp',
    alt: 'A large industrial building looms in the distance, shrouded in fog, with a field of tall, dry grasses in the foreground.',
    className: 'gallery__image-wrapper--first',
  },
  {
    src: '/images/6878aa257bd089d6436c846d_asset_50.webp',
    alt: 'A long line of diverse people waits in front of a building under a blue sky, some holding bags and a bicycle nearby.',
    className: 'gallery__image-wrapper--second',
  },
  {
    src: '/images/6878abbbdf1f6516dda844ae_asset_51.webp',
    alt: 'A crowd gathers around a speaker wearing a red sweatshirt and baseball cap, with signs advocating for Amazon workers rights in the background.',
    className: 'gallery__image-wrapper--thrd',
  },
  {
    src: '/images/6878ac08c8ccb2977b3a39c9_Union-Still-6.webp',
    alt: 'A person in a dark hoodie and cap stands against a brick wall, holding a flyer featuring union-related graphics.',
    className: 'gallery__image-wrapper--fourth',
  },
  {
    src: '/images/6878ac48ed55b92eb1761592_Nat.webp',
    alt: 'A group of people in red jackets walks outside an industrial building at night, holding signs and engaged in a protest.',
    className: 'gallery__image-wrapper--fifth',
  },
  {
    src: '/images/6878ac95236abf46ae61f6cb_JFK8_timessq.webp',
    alt: 'A person in a red shirt holds a sign saying "HONK 4 UNIONS!" by a busy road, with a bus and Amazon sign in the background.',
    className: 'gallery__image-wrapper--sixth',
  },
];

export default function GallerySection() {
  return (
    <section className="section section--padding-top-m">
      <div className="container">
        <div className="gallery__wrapper">
          <div className="gallery__outer">
            <div className="gallery">
              {galleryImages.map((img, index) => (
                <div key={index} className={`gallery__image-wrapper ${img.className}`}>
                  <img src={img.src} loading="eager" alt={img.alt} className="gallery__image" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
