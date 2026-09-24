'use client';

import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError(true);
      return;
    }
    setSubmitted(true);
    setError(false);
  };

  return (
    <footer id="contact" data-role-section="footer" className="footer">
      {/* Background with Noise */}
      <div className="footer__bg">
        <div className="noise-overlay noise-overlay--footer"></div>
        <img src="/images/6874d1975b83fbcec4bc0ffb_Footer__3_.webp" loading="eager" alt="" className="footer__bg-union" />
      </div>

      <div className="container footer__container">
        <div className="footer__inner">
          <div data-widget="navigation-link-hover" className="footer__top">
            {/* Press Kit Download */}
            <a
              href="https://drive.google.com/drive/folders/1o6ipIOSKuJYvgkz-tcK7aYJn1i70RBRm"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__download w-inline-block"
            >
              <div className="footer__download-embed w-embed">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.75195 18L4.90137 18.0127C4.87889 18.2712 4.95708 18.5288 5.11914 18.7314C5.27898 18.9312 5.50883 19.0626 5.76172 19.0996H18.2129C18.4658 19.0626 18.6956 18.9313 18.8555 18.7314C19.0176 18.5288 19.0957 18.2712 19.0732 18.0127L19.0723 18V15C19.0723 14.7613 19.1672 14.5321 19.3359 14.3633C19.5047 14.1946 19.734 14.0996 19.9727 14.0996C20.2111 14.0997 20.4397 14.1948 20.6084 14.3633C20.7772 14.5321 20.8721 14.7613 20.8721 15V17.9932C20.9037 18.728 20.6441 19.446 20.1494 19.9902C19.6547 20.5344 18.9649 20.861 18.2305 20.8994L18.2227 20.9004H5.77637V20.8994C5.40988 20.8845 5.0496 20.7978 4.7168 20.6436C4.38408 20.4894 4.0852 20.2709 3.83691 20.001C3.58859 19.731 3.39551 19.4148 3.26953 19.0703C3.14361 18.7259 3.08695 18.3595 3.10254 17.9932V15C3.10254 14.7613 3.19743 14.5321 3.36621 14.3633C3.53487 14.1948 3.76354 14.0997 4.00195 14.0996C4.24055 14.0996 4.46991 14.1946 4.63867 14.3633C4.80745 14.5321 4.90234 14.7613 4.90234 15V18.0127L4.75195 18Z"
                    fill="#E1EDBA"
                    stroke="#E1EDBA"
                    strokeWidth="0.3"
                  />
                  <path
                    d="M15.9941 10.1162C16.2271 10.1203 16.4494 10.2142 16.6143 10.3789C16.7792 10.5438 16.8738 10.7668 16.8779 11C16.882 11.233 16.7955 11.4584 16.6367 11.6289L12.6328 15.6328C12.5497 15.7168 12.4509 15.7838 12.3418 15.8291C12.2323 15.8745 12.1146 15.897 11.9961 15.8965V15.8955C11.8782 15.8959 11.7613 15.8743 11.6523 15.8291C11.5432 15.7838 11.4444 15.7168 11.3613 15.6328L7.35742 11.6289C7.19851 11.4584 7.11216 11.2331 7.11621 11C7.12032 10.7668 7.21401 10.5438 7.37891 10.3789C7.5438 10.214 7.76684 10.1203 8 10.1162C8.20383 10.1127 8.40193 10.1779 8.5625 10.3008L8.62891 10.3574L8.63281 10.3604V10.3613L11.9961 13.7246L15.3613 10.3613L15.3643 10.3574C15.5349 10.1984 15.761 10.1121 15.9941 10.1162Z"
                    fill="#E1EDBA"
                    stroke="#E1EDBA"
                    strokeWidth="0.3"
                  />
                  <path
                    d="M12.0889 3.10449C12.2949 3.12493 12.489 3.21558 12.6367 3.36328C12.8055 3.53206 12.9004 3.76131 12.9004 4V15.002C12.8973 15.2392 12.8015 15.466 12.6338 15.6338C12.466 15.8015 12.2392 15.8973 12.002 15.9004H11.998C11.7608 15.8973 11.534 15.8015 11.3662 15.6338C11.1985 15.466 11.1027 15.2392 11.0996 15.002V4C11.0996 3.76131 11.1945 3.53206 11.3633 3.36328C11.5321 3.1945 11.7613 3.09961 12 3.09961L12.0889 3.10449Z"
                    fill="#E1EDBA"
                    stroke="#E1EDBA"
                    strokeWidth="0.3"
                  />
                </svg>
              </div>
              <div>download photo and posters</div>
            </a>

            {/* Social & Navigation Lists */}
            <div className="footer-lists__wrapper">
              <div className="footer-social__wrapper">
                <ul role="list" className="footer-list footer-list--flex-start">
                  <li className="footer-list__item">
                    <a href="https://www.instagram.com/unionthefilm/" target="_blank" rel="noopener noreferrer" className="footer-list__nav-link w-inline-block">
                      <div data-role="header-link-hover">Instagram</div>
                    </a>
                  </li>
                  <li className="footer-list__item">
                    <a href="https://www.facebook.com/uniondocumentary" target="_blank" rel="noopener noreferrer" className="footer-list__nav-link w-inline-block">
                      <div data-role="header-link-hover">FACeBOOK</div>
                    </a>
                  </li>
                  <li className="footer-list__item">
                    <a href="https://www.youtube.com/@UniontheFilm" target="_blank" rel="noopener noreferrer" className="footer-list__nav-link w-inline-block">
                      <div data-role="header-link-hover">YOUTUBE</div>
                    </a>
                  </li>
                  <li className="footer-list__item">
                    <a href="https://www.tiktok.com/@unionthefilm" target="_blank" rel="noopener noreferrer" className="footer-list__nav-link w-inline-block">
                      <div data-role="header-link-hover">TIK TOK</div>
                    </a>
                  </li>
                  <li className="footer-list__item">
                    <a href="https://www.facebook.com/uniondocumentary" target="_blank" rel="noopener noreferrer" className="footer-list__nav-link w-inline-block">
                      <div data-role="header-link-hover">X</div>
                    </a>
                  </li>
                </ul>
              </div>

              <ul role="list" className="footer-list footer-list--flex-end">
                <li className="footer-list__item">
                  <a href="#trailer" className="footer-list__nav-link w-inline-block">
                    <div data-role="header-link-hover">TRAILER</div>
                  </a>
                </li>
                <li className="footer-list__item">
                  <a href="#about" className="footer-list__nav-link w-inline-block">
                    <div data-role="header-link-hover">ABOUT</div>
                  </a>
                </li>
                <li className="footer-list__item">
                  <a href="#team" className="footer-list__nav-link w-inline-block">
                    <div data-role="header-link-hover">TEAM</div>
                  </a>
                </li>
                <li className="footer-list__item">
                  <a href="#partners" className="footer-list__nav-link w-inline-block">
                    <div data-role="header-link-hover">Partners</div>
                  </a>
                </li>
                <li className="footer-list__item">
                  <a href="#watch" className="footer-list__nav-link w-inline-block">
                    <div data-role="header-link-hover">OUR STORY</div>
                  </a>
                </li>
                <li className="footer-list__item">
                  <a href="#contact" className="footer-list__nav-link w-inline-block">
                    <div data-role="header-link-hover">Contact</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Body (Email & Newsletter) */}
          <div className="footer__body">
            <div className="footer__body-email-form_wrapper">
              <a href="mailto:union@cineticmedia.org" className="footer__email">
                Aluma
                <br />
                Salon
              </a>

              <div className="form__wrapper w-form">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="email" className="form__label">
                      SIGN UP FOR OUR NEWSLETTER
                    </label>
                    <div className="filed__wrapper">
                      <input
                        className="filed w-input"
                        maxLength="256"
                        name="email"
                        placeholder="Your email"
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <input type="submit" className="form__button-submit w-button" value="" aria-label="Submit" />
                    </div>
                  </form>
                ) : (
                  <div className="w-form-done" style={{ display: 'block' }}>
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                )}
                {error && (
                  <div className="w-form-fail" style={{ display: 'block' }}>
                    <div>Oops! Please enter a valid email address.</div>
                  </div>
                )}
              </div>
            </div>

            {/* Copyright */}
            <div className="footer__copyrights">
              <div>© 2026 Union Film. All rights reserved</div>
              <div>
                <strong>Site by</strong>{' '}
                <a
                  href="https://digitalbutlers.team/?utm_source=awards&amp;utm_medium=site&amp;utm_campaign=db+union+awards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__copyright-link"
                >
                  Digital Butlers
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
