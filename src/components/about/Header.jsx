'use client';

import React, { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="header-wrapper js--visible">
      <header data-widget="header" className={`header js--visible ${isOpen ? 'js--open' : ''}`}>
        <div data-role="main-navigation" className="main-navigation">
          <div className="container">
            <div className="main-navigation__inner">
              {/* Logo */}
              <a href="/" className="logo-link header__logo-link w-inline-block" aria-label="Union Home">
                <div className="logo-embed w-embed">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 24"
                    fill="none"
                  >
                    <path d="M0 1.38462H5.35714V22.6154H0V1.38462Z" fill="currentColor" />
                    <path d="M8.03571 1.38462H13.3929V22.6154H8.03571V1.38462Z" fill="currentColor" />
                    <path d="M16.0714 1.38462H21.4286V22.6154H16.0714V1.38462Z" fill="currentColor" />
                    <path
                      d="M37.5001 0.5C35.2044 0.5 32.9603 1.17446 31.0515 2.4381C29.1427 3.70174 27.655 5.49779 26.7765 7.59914C25.898 9.70049 25.6681 12.0128 26.116 14.2435C26.5638 16.4743 27.6693 18.5234 29.2926 20.1317C30.9159 21.74 32.9841 22.8353 35.2356 23.279C37.4872 23.7228 39.821 23.495 41.9419 22.6246C44.0629 21.7542 45.8756 20.2802 47.1511 18.3891C48.4265 16.4979 49.1072 14.2745 49.1072 12C49.1072 8.95001 47.8843 6.02494 45.7076 3.86827C43.5308 1.7116 40.5785 0.5 37.5001 0.5ZM37.5001 17.7512C36.352 17.7512 35.2297 17.4139 34.2751 16.7819C33.3205 16.15 32.5765 15.2518 32.1372 14.2009C31.6978 13.15 31.5829 11.9936 31.8069 10.878C32.0308 9.76239 32.5837 8.73762 33.3955 7.93331C34.2073 7.12899 35.2416 6.58125 36.3676 6.35934C37.4936 6.13743 38.6608 6.25132 39.7215 6.68661C40.7821 7.1219 41.6887 7.85905 42.3265 8.80482C42.9644 9.7506 43.3048 10.8625 43.3048 12C43.3048 13.5253 42.6932 14.9881 41.6046 16.0667C40.516 17.1452 39.0396 17.7512 37.5001 17.7512Z"
                      fill="currentColor"
                    />
                    <path d="M51.7858 22.6154L73.2144 1.38462H51.7858L73.2144 22.6154H51.7858Z" fill="currentColor" />
                    <path
                      d="M78.5714 22.6154H100V1.38462H78.5714V22.6154ZM83.9297 6.69123H94.6439V17.3066H83.9275L83.9297 6.69123Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </a>

              {/* Navigation Links */}
              <div data-widget="navigation-link-hover" className="header__links-wrapper">
                <div className="header__links-outer">
                  <div className="header__links header__links--main">
                    <a href="#trailer" onClick={closeMenu} className="header__link mob w-inline-block text-[#141414]">
                      <div data-role="header-link-hover">TRAILER</div>
                    </a>
                    <a href="#trailer" onClick={closeMenu} className="header__link dec w-inline-block text-[#141414]">
                      <div data-role="header-link-hover">TRAILER</div>
                    </a>
                    <a href="#about" onClick={closeMenu} className="header__link w-inline-block text-[#141414]">
                      <div data-role="header-link-hover">ABOUT</div>
                    </a>
                    <a href="#team" onClick={closeMenu} className="header__link w-inline-block text-[#141414]">
                      <div data-role="header-link-hover">TEAM</div>
                    </a>
                    <a href="#watch" onClick={closeMenu} className="header__link w-inline-block text-[#141414]">
                      <div data-role="header-link-hover">OUR STORY</div>
                    </a>
                    <a href="#contact" onClick={closeMenu} className="header__link w-inline-block text-[#141414]">
                      <div data-role="header-link-hover">Contact</div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobile Burger Toggle */}
              <div
                data-role="burger"
                className="burger"
                onClick={toggleMenu}
                role="button"
                tabIndex={0}
                aria-label="Toggle Navigation Menu"
              >
                <div className="burger__inner">
                  <div className="burger-line-top__wrapper">
                    <div className="burger-line burger-line-top"></div>
                  </div>
                  <div className="burger-line-bottom__wrapper">
                    <div className="burger-line burger-line-bottom"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
