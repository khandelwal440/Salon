'use client';

import React, { useState } from 'react';

const upcomingScreenings = [
  {
    name: 'The Neon',
    dateLocation: 'Sep 2  /  Dayton, OH',
    link: 'https://gathr.com/events/c511650f/checkout',
  },
  {
    name: 'AMC Center Park 8',
    dateLocation: 'Jul 21  /  Beltsville, MD',
    link: 'https://gathr.com/events/51671b96/union-at-amc-center-park-8',
  },
  {
    name: 'Knon Film Festival',
    dateLocation: 'Jul 20 /  Dallas, TX',
    link: 'https://www.knon.org/',
  },
  {
    name: 'Rio Cinema',
    dateLocation: 'Jul 12 /  Playa Vista, CA',
    link: 'https://gathr.com/events/f3463585/checkout',
  },
  {
    name: 'Indianapolis, IN',
    dateLocation: 'Jun 26 /  Indianapolis, IN',
    link: 'https://gathr.com/events/f3463585/checkout',
  },
  {
    name: "PAM CUT's Tomorrow Theater",
    dateLocation: 'Jun 15 /  Portland, OR',
    link: 'https://gathr.com/events/cda80656/union',
  },
  {
    name: 'Ipswich, Essex County',
    dateLocation: 'May 31 /  Ipswich, Essex County',
    link: 'https://gathr.com/events/88e18b8b/checkout',
  },
];

const pastScreenings = [
  {
    name: 'Sundance Film Festival',
    dateLocation: 'Jan 21 /  Park City, UT',
    link: '#',
  },
  {
    name: 'True/False Film Fest',
    dateLocation: 'Feb 29 /  Columbia, MO',
    link: '#',
  },
  {
    name: 'Green Mountain Film Festival',
    dateLocation: 'Mar 17 /  Montpelier, VT',
    link: '#',
  },
  {
    name: 'CPH: DOX',
    dateLocation: 'Mar 18 /  Copenhagen, Denmark',
    link: '#',
  },
  {
    name: 'Full Frame Documentary Film Festival',
    dateLocation: 'Apr 6 /  Durham, NC',
    link: '#',
  },
  {
    name: 'Visions Du Reel',
    dateLocation: 'Apr 12 /  Nyon, France',
    link: '#',
  },
  {
    name: 'Labor Notes Conference',
    dateLocation: 'Apr 19 /  Chicago, IL',
    link: '#',
  },
];

export default function WatchSection() {
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'
  const [showAll, setShowAll] = useState(false);

  const toggleTab = () => {
    setActiveTab((prev) => (prev === 'upcoming' ? 'past' : 'upcoming'));
  };

  const currentList = activeTab === 'upcoming' ? upcomingScreenings : pastScreenings;
  const visibleList = showAll ? currentList : currentList.slice(0, 5);

  return (
    <section
      id="watch"
      data-role-section="dark"
      data-widget="watch-film"
      className="section section--padding-top-l section--padding-bottom-l section--bg-darck section--border-top-mobile section--postion--relative section--overflow-hidden"
    >
      <div className="noise-overlay"></div>
      <div data-widget="more-watch-film" className="section__inner">
        <div className="container">
          <div className="section__header section__header--center-and-mobile">
            <div className="watch-film__inner">
              <div className="section__content-wrapper">
                <div className="section__heading_wrapper">
                  <h2 className="heading heading--xl">
                    Watch <span className="hidden-mobile">film</span>
                  </h2>
                </div>
              </div>

              {/* Tab switch button */}
              <div
                data-role-watch-film="button-change"
                className={`watch-film__change_wrapper ${activeTab === 'past' ? 'js--past' : ''}`}
                onClick={toggleTab}
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
                aria-label="Toggle between upcoming and past screenings"
              >
                <div className="watch-film__change_inner">
                  <div
                    data-role-watch-film="upcoming-text"
                    className="watch-film__change_text"
                    style={{
                      color: activeTab === 'upcoming' ? '#e1edba' : '#898989',
                      textDecoration: activeTab === 'upcoming' ? 'underline' : 'none',
                    }}
                  >
                    upcoming screenings
                  </div>
                  <div className="watch-film__change">
                    <div
                      className="watch-film__change-ellipse"
                      style={{
                        position: 'absolute',
                        transition: 'left 0.3s ease',
                        left: activeTab === 'past' ? '29px' : '4px',
                      }}
                    ></div>
                  </div>
                  <div
                    data-role-watch-film="past-text"
                    className="watch-film__change_text"
                    style={{
                      color: activeTab === 'past' ? '#e1edba' : '#898989',
                      textDecoration: activeTab === 'past' ? 'underline' : 'none',
                    }}
                  >
                    past screenings
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Screenings List */}
        <div className="watch-film__list-wrapper js--active">
          <div className="watch-film__list">
            {visibleList.map((item, idx) => (
              <a
                key={idx}
                data-role-watch-film="film-item"
                href={item.link}
                target={item.link !== '#' ? '_blank' : undefined}
                rel={item.link !== '#' ? 'noopener noreferrer' : undefined}
                className="watch-film__list-item w-inline-block"
              >
                <div className="watch-film__list-item_inner">
                  <div className="watch-film__list-item_content">
                    <div className="heading heading--l">{item.name}</div>
                    <p className="watch-film__list-item_paragraph">{item.dateLocation}</p>
                  </div>
                  {activeTab === 'upcoming' && item.link !== '#' && (
                    <div>
                      <div className="watch-film__list-item_link">Click here for tickets</div>
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>

          {currentList.length > 5 && (
            <div className="container">
              <div className="section__button-wrapper">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="button-light w-inline-block"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <div className="link__text">{showAll ? 'Show less' : 'Show more'}</div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
