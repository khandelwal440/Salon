'use client';

import React, { useState } from 'react';
import TeamModal from './TeamModal';

const teamMembers = [
  {
    id: 'stephen-maing',
    name: 'Stephen Maing',
    role: 'Director, Cinematographer, Editor, Producer',
    image: '/images/686f7de273d01e75b157be7b_Stephen_Maing_2023_1.webp',
    bio: `Stephen Maing is an Emmy-award winning filmmaker based in New York. His feature documentary Crime + Punishment, which he directed, filmed and edited, won a Special Jury Award at the 2018 Sundance Film Festival, an Emmy Award for Outstanding Social Issue Documentary and was shortlisted for the Academy Award for Best Documentary. <br/><br/>His previous films, High Tech, Low Life, which he directed, filmed and edited over five years, and The Surrender, have screened internationally and were released on P.O.V. and Field of Vision, respectively.<br/><br/> Maing is a 2021 United States Artists Fellow, Sundance Institute Fellow, NBC Original Voices Fellow, John Jay/Harry Frank Guggenheim Reporting Fellow and a recipient of the IDA's prestigious Courage Under Fire Award shared with the whistleblowers of the NYPD12. He is a frequent visiting artist and educator based in Ridgewood, Queens.`,
  },
  {
    id: 'brett-story',
    name: 'BRETT STORY',
    role: 'Director, Producer',
    image: '/images/686f7dabbc1517b5c5f5ee75_Stephen_Maing_2023_1__6_.webp',
    bio: `Brett Story is an award-winning filmmaker and writer whose work pushes the formal boundaries of political cinema. Her films have screened in theaters and festivals internationally, including at Sundance, CPH-DOX, and SXSW. She is the director of the feature films THE PRISON IN TWELVE LANDSCAPES (2016) and THE HOTTEST AUGUST (2019), and the author of the book PRISON LAND (2019). THE HOTTEST AUGUST was a New York Times Critics’ Pick and was called one of the best documentary films of 2019 by Rolling Stone and Vanity Fair, among others. <br/><br/>Brett has held fellowships from the Guggenheim Foundation and the Sundance Institute, and was named one of Variety's 10 Documentary Filmmakers to Watch. In 2020 she was nominated for a Cinema Eye Award for Best Director. She holds a PhD in geography and is currently an assistant professor of Cinema at the University of Toronto.`,
  },
  {
    id: 'mars-verrone',
    name: 'MARS VERRONE',
    role: 'Producer',
    image: '/images/686f7ddd96946e6903f3408f_Stephen_Maing_2023_1__1_.webp',
    bio: `Mars Verrone is a filmmaker, musician, and educator from Los Angeles, CA, currently based in Brooklyn, NY. In 2022, Mars directed and produced award-winning short documentary GOLDEN VOICE, which continues to be programmed at LGBTQ+ festivals and events across the globe.<br/><br/>Mars is a Sundance Documentary Producers Fellow, NBC Original Voices Artist Mentor and Fellow, PGA Create Fellow, Brown Girls Doc Mafia Sustainable Artist Fellow, Dear Producer Mentee, and was selected for DOC NYC’S 2024 “40 Under 40” cohort. Their work has been supported by Sundance Institute, Ford Foundation, Field of Vision, and the International Documentary Association, among others.`,
  },
  {
    id: 'samantha-curley',
    name: 'SAMANTHA CURLEY',
    role: 'Producer',
    image: '/images/686f7dcd1d5495112e92b56a_Stephen_Maing_2023_1__3_.webp',
    bio: `Samantha Curley is an award-winning documentary film producer and creative entrepreneur based in Los Angeles. She is the Co-Founder of Level Ground, which is both a 501(c)3 nonprofit artist collective and a collaboratively run production company. The first film she produced, FRAMING AGNES (dir. Chase Joynt), premiered at the 2022 Sundance Film Festival where it won the NEXT Innovator Award and Audience Award and went on to win the 2023 GLAAD Media Award for Outstanding Documentary.<br/><br/> She is a graduate of Northwestern University and the Kellogg School of Management and currently holds fellowships with the Producers Guild of America, Impact Partners, and NBCU Original Voices. In 2023, she received a Cali Catalyst grant awarded to California changemakers creating tangible impact within the arts and culture sector, shifting power and influence to historically underrepresented voices.`,
  },
  {
    id: 'martin-dicicco',
    name: 'MARTIN DICICCO',
    role: 'Cinematographer, Producer',
    image: '/images/686f7dd7eb91eccdeca2d118_Stephen_Maing_2023_1__2_.webp',
    bio: `Martin DiCicco is a cinematographer and director whose work includes ALL THAT PASSES BY THROUGH A WINDOW THAT DOESN’T OPEN, HERE THERE IS NO EARTH, GIRLS GOT GAME, SEARCHERS, THE HOTTEST AUGUST, LANDFALL, and forthcoming films by Angelo Madsen Minax, Timothy George Kelly, Iva Radivojević and Jem Cohen.`,
  },
  {
    id: 'blair-mcclendon',
    name: 'BLAIR MCCLENDON',
    role: 'Editor',
    image: '/images/686f7da1ce4e1a39dd35fbc4_Stephen_Maing_2023_1__8_.webp',
    bio: `Blair McClendon is a New York based writer, film editor, and filmmaker. His films have screened at Sundance, Cannes, Tribeca, and TIFF, and include AFTERSUN, AFTER SHERMAN, THE ASSISTANT, MR. SOUL!, GIVE UP THE GHOST, and WALK FOR MEHAS. Blair’s writing has been published in n+1, the New Republic, the New York Times Magazine, and elsewhere.`,
  },
  {
    id: 'malika-zouhali-worrall',
    name: 'Malika Zouhali-Worrall',
    role: 'Editor',
    image: '/images/686f7db93293db288dde45a7_Stephen_Maing_2023_1__5_.webp',
    bio: `Malika Zouhali-Worrall is a British/Moroccan editor and director based in New York. She most recently edited THROUGH THE NIGHT (2020), which was a New York Times and Hollywood Reporter Critics' Pick, and named as one of The Guardian’s Best Documentaries of 2020. An Emmy Award-winning director, Malika's directing credits include CALL ME KUCHU (2012), THANK YOU FOR PLAYING (2015), and VIDEO VISIT (2022). Her films have screened at the Berlin Film Festival, Tribeca Film Festival, True/False, AFI Festival, Blackstar and SXSW, and broadcast on Netflix, the BBC, The New York Times, ARTE and PBS. Malika is a 2020 Sundance Momentum Fellow, a 2020 William Greaves Award recipient, and a 2021 Adobe Women at Sundance fellow.`,
  },
  {
    id: 'robert-aiki-aubrey-lowe',
    name: 'ROBERT AIKI AUBREY LOWE',
    role: 'Composer',
    image: '/images/686f7dc3dc013be7d516002d_Stephen_Maing_2023_1__4_.webp',
    bio: `Robert Aiki Aubrey Lowe (b. 1975) is an artist, curator and composer that works primarily with, but not limited to voice and modular synthesizer for sound works in the realm of spontaneous music, which lends itself to Lowe’s aleatoric process. As of late Lowe has directed focus on composition for film and television. Over the last several years Robert has scored CANDYMAN for Nia DaCosta, THE COLOR OF CARE and POWER for Yance Ford, MASTER for Mariama Diallo, GRASSHOPPER REPUBLIC for Daniel McCabe, the docuseries TELEMARKETERS and UNION for Brett Story and Stephen Maing.`,
  },
];

export default function TeamSection() {
  const [activeCardId, setActiveCardId] = useState(teamMembers[0].id);
  const [modalMember, setModalMember] = useState(null);

  const handleCardClick = (member) => {
    // Check if mobile screen
    if (typeof window !== 'undefined' && window.innerWidth <= 991) {
      setModalMember(member);
    } else {
      setActiveCardId(activeCardId === member.id ? null : member.id);
    }
  };

  return (
    <>
      <section id="team" className="section section--padding-top-l section--postion--relative">
        <div className="section__inner">
          <div className="container">
            <div className="section__header section__header--center">
              <div className="section__content-wrapper">
                <div className="section__heading_wrapper">
                  <div className="section__svg-wrapper section__svg-wrapper--creative">
                    <div className="section__svg hidden-mobile w-embed">
                      <svg width="100%" height="100%" viewBox="0 0 835 631" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M781.907 86.0026L52.1782 531.487L774.907 435.021"
                          stroke="#E1EDBA"
                          strokeWidth="200"
                        />
                      </svg>
                    </div>
                    <div className="section__svg show-mobile w-embed">
                      <svg width="100%" height="100%" viewBox="0 0 375 227" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M-61.9998 139.441L261.994 188.422L26.0381 38.6956C164.307 64.6809 419.672 141.824 427.102 143.901"
                          stroke="#E1EDBA"
                          strokeWidth="78"
                        />
                      </svg>
                    </div>
                  </div>
                  <h2 className="heading heading--xl">Creative team</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members Carousel / Cards */}
          <div className="team__content">
            <div>
              <div data-widget="team-card-click" className="team__slider-wrapper swiper">
                <div className="team__slider swiper-wrapper">
                  {teamMembers.map((member) => {
                    const isActive = activeCardId === member.id;
                    return (
                      <div
                        key={member.id}
                        data-role="item"
                        className="embla-slide swiper-slide"
                        onClick={() => handleCardClick(member)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div data-role="team-card" className={`team__card ${isActive ? 'js--active' : ''}`}>
                          <div className="team__card-info">
                            <div className="team__card-info_top">
                              <div className="team__card_image-wrapper">
                                <img src={member.image} loading="lazy" alt={member.name} className="team__card_image" />
                              </div>
                              <p className="team__card-info_job">{member.role}</p>
                            </div>
                            <div data-team-card="name" className="heading heading--l heading--transform-90deg">
                              {member.name}
                            </div>
                          </div>
                          <div className="team__card-description">
                            <div
                              className="paragraph paragraph--m"
                              dangerouslySetInnerHTML={{ __html: member.bio }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Additional Crew & Producers */}
            <div className="container">
              <div className="team__content-inner">
                <div className="section__box"></div>
                <div className="section__box">
                  <div className="additional-crew__heading-wrapper">
                    <h3 className="heading heading--m">additional crew and Executive Producers</h3>
                  </div>
                  <div className="additional-crew__list">
                    <div className="additional-crew__list-item">
                      <div className="additional-crew__list-item_heading-wrapper">
                        <div className="additional-crew__list-item_heading">Associate Producers</div>
                      </div>
                      <div className="additional-crew__list-item_paragraph-wrapper">
                        <p className="paragraph paragraph--l">
                          Hana Elias <br />
                          Wyatt Winborne
                        </p>
                      </div>
                    </div>

                    <div className="additional-crew__list-item">
                      <div className="additional-crew__list-item_heading-wrapper">
                        <div className="additional-crew__list-item_heading">Executive Producers</div>
                      </div>
                      <div className="additional-crew__list-item_paragraph-wrapper">
                        <p className="paragraph paragraph--l">
                          Jenny Raskin
                          <br />
                          Lauren Haber
                          <br />
                          Geralyn White Dreyfous
                          <br />
                          The Villa Family
                          <br />
                          David Levine
                          <br />
                          Jessica Grimshaw
                          <br />
                          Nick Shumaker
                          <br />
                          Dawn Olmstead
                        </p>
                      </div>
                    </div>

                    <div className="additional-crew__list-item">
                      <div className="additional-crew__list-item_heading-wrapper">
                        <div className="additional-crew__list-item_heading">Co-Executive Producers</div>
                      </div>
                      <div className="additional-crew__list-item_paragraph-wrapper">
                        <p className="paragraph paragraph--l">
                          Kelsey Koenig
                          <br />
                          Barbara &amp; Eric Dobkin
                          <br />
                          Paula Froehle &amp; Steve Cohen
                          <br />
                          Natasha &amp; David Dolby
                          <br />
                          Meryl Metni
                          <br />
                          Pierre Hauser
                          <br />
                          Chelsea Halligan
                          <br />
                          Ryan Parker
                          <br />
                          Alexander Carpenter
                          <br />
                          Andrew Neel
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Modal */}
      <TeamModal member={modalMember} isOpen={!!modalMember} onClose={() => setModalMember(null)} />
    </>
  );
}
