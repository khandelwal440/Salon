'use client';

import React from 'react';

const statements = [
  {
    title: 'Salon Philosophy \nCare & Expertise:',
    text: '“At Aluma, we believe beauty is an experience that should leave you feeling refreshed, understood, and truly confident. Every service is thoughtfully curated to meet your individual lifestyle.”',
    link: '#',
    image: '/photos/DSC00594.JPG',
    alt: 'Aluma Salon professional care',
    wrapperClass: 'statement-list__item-box_image-wrapper--first',
    reverse: false,
  },
  {
    title: 'Personalized Grooming \nAt Home & In Salon:',
    text: '“Whether you choose our serene salon atmosphere or the luxury of at-home grooming, our commitment remains unwavering — exceptional craftsmanship and complete comfort.”',
    link: '#',
    image: '/photos/DSC00598.JPG',
    alt: 'Aluma Salon grooming services',
    wrapperClass: 'statement-list__item-box_image-wrapper--second',
    reverse: true,
  },
  {
    title: 'The Aluma Standard \nHygiene & Excellence:',
    text: '“From premium products to rigorous hygiene protocols, we never compromise on quality. Your peace of mind and satisfaction guide everything we do.”',
    link: '#',
    image: '/photos/DSC00602.JPG',
    alt: 'Aluma Salon quality products and hygiene',
    wrapperClass: 'statement-list__item-box_image-wrapper--third',
    reverse: false,
  },
  {
    title: 'The Aluma Promise \nConfidence Everyday:',
    text: '“Self-care shouldn’t be complicated or reserved for rare occasions. With seamless booking and the Aluma Pass, looking and feeling your best becomes second nature.”',
    link: '#',
    image: '/photos/DSC00605.JPG',
    alt: 'Aluma Salon customer confidence',
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
