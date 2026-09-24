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
  const [modalMember, setModalMember] = useState(null);

  return (
    <>
      <section id="team" className="relative w-full bg-[#F1EFEA] text-[#141414] py-28 md:py-36 border-t border-black/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Section Heading */}
          <div className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#5356FF] font-bold block mb-3">
              // PRINCIPAL FILMMAKERS
            </span>
            <div className="relative inline-block">
              {/* Hand-drawn SVG highlighter */}
              <div className="absolute -inset-x-6 -inset-y-3 pointer-events-none -z-10">
                <svg width="100%" height="100%" viewBox="0 0 835 631" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M781.907 86.0026L52.1782 531.487L774.907 435.021"
                    stroke="#D9F16B"
                    strokeWidth="120"
                    strokeOpacity="0.8"
                  />
                </svg>
              </div>
              <h2
                className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#141414]"
                style={{ fontFamily: 'Newtitle, Anton, sans-serif' }}
              >
                Creative team
              </h2>
            </div>
          </div>

        {/* 
          Single Continuous Auto-Running Marquee Line:
          - Automatically scrolls horizontally in an infinite continuous track
          - Pauses smoothly on hover so user can click and view bio
        */}
        <div className="w-full overflow-hidden relative group/marquee py-4">
          <div className="flex w-max team-marquee-track hover:[animation-play-state:paused]">
            {[...teamMembers, ...teamMembers].map((member, idx) => (
              <div
                key={`${member.id}-${idx}`}
                onClick={() => setModalMember(member)}
                className="group relative bg-[#F1EFEA] border border-dashed border-black/20 mx-3 p-6 sm:p-8 flex flex-col items-center justify-between w-[280px] sm:w-[320px] md:w-[340px] min-h-[460px] flex-shrink-0 cursor-pointer transition-all duration-400 ease-out hover:bg-[#0D0D0D] hover:scale-[1.02] shadow-sm hover:shadow-xl rounded-sm"
              >
                {/* 1. Egg-Shaped Oval / Ellipse Portrait (taller than wide: 50% / 60%) */}
                <div className="relative w-36 h-48 sm:w-40 sm:h-52 overflow-hidden bg-neutral-900 mx-auto transition-transform duration-500 group-hover:scale-105 shadow-md">
                  <div
                    className="w-full h-full overflow-hidden"
                    style={{
                      borderRadius: '50% / 60%',
                      clipPath: 'ellipse(48% 52% at 50% 50%)',
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover filter grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-110 group-hover:brightness-105"
                    />
                  </div>
                </div>

                {/* 2. Small Caps Role Label (Centered Below Portrait, no black bar) */}
                <div className="text-center mt-6 px-2">
                  <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium text-[#7A7873] group-hover:text-white/70 transition-colors duration-300">
                    {member.role}
                  </p>
                </div>

                {/* 3. Rotated Vertical Name on Same Background (No separate black band) */}
                {/* Default: Muted Grey (#C9C7C2), On Hover: Lime-Green (#D9F16B) */}
                <div className="flex-1 flex items-center justify-center my-4">
                  <span
                    className="font-mono text-sm sm:text-base md:text-lg font-bold tracking-[0.22em] uppercase text-[#9E9D97] group-hover:text-[#D9F16B] transition-colors duration-400 select-none text-center"
                    style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      fontFamily: 'Newtitle, Anton, monospace',
                    }}
                  >
                    {member.name}
                  </span>
                </div>

                {/* 4. Subtitle / Read Bio trigger */}
                <div className="pt-2 text-center">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7A7873] group-hover:text-[#D9F16B] border-b border-transparent group-hover:border-[#D9F16B] pb-0.5 transition-all duration-300">
                    View bio →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

          {/* Additional Crew & Executive Producers Section */}
          <div className="mt-24 pt-16 border-t border-black/15">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-4">
                <h3
                  className="text-2xl sm:text-3xl font-black uppercase text-[#141414] tracking-tight"
                  style={{ fontFamily: 'Newtitle, Anton, sans-serif' }}
                >
                  Additional Crew &amp; Executive Producers
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#7A7873] mt-2">
                  Complete producing &amp; executive partner credits.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Associate Producers */}
                <div className="space-y-2">
                  <span
                    className="text-2xl sm:text-3xl uppercase tracking-[0.38em] font-bold text-[#141414] block border-b border-black/15 pb-2"
                    style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                  >
                    Associate Producers
                  </span>
                  <p className="font-sans text-sm text-[#4A4843] leading-relaxed">
                    Hana Elias <br />
                    Wyatt Winborne
                  </p>
                </div>

                {/* Executive Producers */}
                <div className="space-y-2">
                  <span
                    className="text-2xl sm:text-3xl uppercase tracking-[0.38em] font-bold text-[#141414] block border-b border-black/15 pb-2"
                    style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                  >
                    Executive Producers
                  </span>
                  <p className="font-sans text-sm text-[#4A4843] leading-relaxed">
                    Jenny Raskin <br />
                    Lauren Haber <br />
                    Geralyn White Dreyfous <br />
                    The Villa Family <br />
                    David Levine <br />
                    Jessica Grimshaw <br />
                    Nick Shumaker <br />
                    Dawn Olmstead
                  </p>
                </div>

                {/* Co-Executive Producers */}
                <div className="space-y-2">
                  <span
                    className="text-2xl sm:text-3xl uppercase tracking-[0.38em] font-bold text-[#141414] block border-b border-black/15 pb-2"
                    style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                  >
                    Co-Executive Producers
                  </span>
                  <p className="font-sans text-sm text-[#4A4843] leading-relaxed">
                    Kelsey Koenig <br />
                    Barbara &amp; Eric Dobkin <br />
                    Paula Froehle &amp; Steve Cohen <br />
                    Natasha &amp; David Dolby <br />
                    Meryl Metni <br />
                    Pierre Hauser <br />
                    Chelsea Halligan <br />
                    Ryan Parker <br />
                    Alexander Carpenter <br />
                    Andrew Neel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Bio Modal on click */}
      <TeamModal member={modalMember} isOpen={!!modalMember} onClose={() => setModalMember(null)} />
    </>
  );
}
