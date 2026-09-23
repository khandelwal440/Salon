'use client';

import React from 'react';

const galleryImages = [
  {
    src: '/photos/DSC00577.JPG',
    alt: 'Aluma Salon styling experience',
    className: 'gallery__image-wrapper--first',
  },
  {
    src: '/photos/DSC00580.JPG',
    alt: 'Aluma Salon premium atmosphere',
    className: 'gallery__image-wrapper--second',
  },
  {
    src: '/photos/DSC00582.JPG',
    alt: 'Aluma Salon hair styling & grooming',
    className: 'gallery__image-wrapper--thrd',
  },
  {
    src: '/photos/DSC00585.JPG',
    alt: 'Aluma Salon expert care',
    className: 'gallery__image-wrapper--fourth',
  },
  {
    src: '/photos/DSC00588.JPG',
    alt: 'Aluma Salon luxury studio',
    className: 'gallery__image-wrapper--fifth',
  },
  {
    src: '/photos/DSC00591.JPG',
    alt: 'Aluma Salon client personalization',
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
