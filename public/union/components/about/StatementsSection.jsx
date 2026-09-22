'use client';

import React from 'react';

const statements = [
  {
    title: 'Film team statement:',
    text: '“A ince the height of union membership in the 1950s and 1960s, globalization and deindustrialization have sent the U.S. labor movement into steep decline. No company better exemplifies the twin economic trends of union-busting and supply chain globalization than Amazon”',
    link: 'https://gathr.com/vod/15c99c8b/union',
    image: '/images/687644f7ec01669a97f9485a_Rectangle.webp',
    alt: 'A person wearing a dark beanie and reflective vest is seen from behind, sitting in a blurred, busy indoor environment.',
    wrapperClass: 'statement-list__item-box_image-wrapper--first',
    reverse: false,
  },
  {
    title: 'Directors Statement \nBret Story:',
    text: '“As a filmmaker who grew up working-class and who saw my single mother and many neighbors struggle for decent pay and working conditions, I have long understood the stakes of labor organizing. I also know that the state of the union movement is not what it was a half century ago”',
    link: 'https://gathr.com/vod/15c99c8b/union',
    image: '/images/687647bbb9e4be2376c10874_Rectangle__1_.webp',
    alt: 'A cozy nighttime gathering under a tent, adorned with string lights, where people are interacting and enjoying their time together.',
    wrapperClass: 'statement-list__item-box_image-wrapper--second',
    reverse: true,
  },
  {
    title: 'Directors Statement \nStephen Maing:',
    text: '“While the insidious nature of capitalism will always fundamentally seek to undermine unionization efforts, the workers in Staten Island proved organizing may get messy, but progress is the result of each individual believing in the power of their voice and vitality”',
    link: 'https://gathr.com/vod/15c99c8b/union',
    image: '/images/68764815b7c300bc9ac22afc_Rectangle__2_.webp',
    alt: 'A crowd at a rally holds a large black banner demanding recognition of the Amazon Labor Union, displaying solidarity and activism.',
    wrapperClass: 'statement-list__item-box_image-wrapper--third',
    reverse: false,
  },
  {
    title: 'Producers Statement:',
    text: '“Amazon is a lucid and prominent example of how mega-corporations thrive at the immediate expense of Black and brown Americans, and to the long-term detriment of us all”',
    link: 'https://gathr.com/vod/15c99c8b/union',
    image: '/images/68764842b108180d15978886_Rectangle__3_.webp',
    alt: 'Two people embrace closely, with one holding a drink, surrounded by soft textures in a warm, intimate setting.',
    wrapperClass: 'statement-list__item-box_image-wrapper--fourth',
    reverse: true,
  },
];

export default function StatementsSection() {
  return (
    <section
      data-role-section="dark"
      className="section section--bg-darck section--postion--relative section--overflow-hidden"
    >
      <div className="noise-overlay"></div>
      <div className="statement-list">
        {statements.map((stmt, idx) => (
          <div
            key={idx}
            className={`statement-list__item ${stmt.reverse ? 'statement-list__item--revers' : ''}`}
          >
            <div className="statement-list__item-box statement-list__item-box--center">
              <div className="statement-list__item-text_wrapper">
                <div className="heading heading--l" style={{ whiteSpace: 'pre-line' }}>
                  {stmt.title}
                </div>
                <p className="statement-list__item-paragraph">{stmt.text}</p>
                <a
                  href={stmt.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link text-link--light"
                >
                  Read more
                </a>
              </div>
            </div>
            <div className="statement-list__item-box">
              <div className={`statement-list__item-box_image-wrapper ${stmt.wrapperClass}`}>
                <img src={stmt.image} loading="eager" alt={stmt.alt} className="statement__image" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
