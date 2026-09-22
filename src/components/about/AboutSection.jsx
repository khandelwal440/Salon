'use client';

import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="section section--padding-top-l">
      <div className="container">
        <div className="section__inner">
          <div className="section__header">
            <div className="section__content-wrapper">
              <div className="sub-heading__wrapper" data-scroll-animation-role="scroll-top-opacity">
                <div className="sub-heading" data-base-animation-role="fade-up">
                  &#123; <span>The New York Times</span> &#125;
                </div>
              </div>
              <div
                className="section__heading_wrapper section__heading_wrapper--astounding"
                data-scroll-animation-role="scroll-top-opacity"
              >
                <h2 className="heading heading--xl" data-base-animation-role="fade-up">
                  Astounding, rebellious and brilliant
                </h2>
                <div className="section__svg-wrapper section__svg-wrapper--astounding">
                  <div className="section__svg w-embed">
                    <svg width="100%" height="100%" viewBox="0 0 1021 835" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        data-base-animation-role="svg"
                        d="M984.5 94L188.5 406L917 436.5C558 538.5 -125 735.5 -140 741"
                        stroke="#E1EDBA"
                        strokeWidth="200"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="astounding__content">
              <div className="section__box">
                <div className="blockquote__wrapper" data-scroll-animation-role="scroll-top-opacity">
                  <div className="blockquote" data-base-animation-role="fade-up">
                    <p className="blockquote__paragraph">
                      The Amazon Labor Union (ALU) — a group of current and former Amazon workers in New York City’s
                      Staten Island — takes on one of the world’s largest and most powerful companies in the fight to
                      unionize.
                    </p>
                  </div>
                </div>
              </div>

              <div className="section__box">
                <div className="section__paragrph-box">
                  <div data-scroll-animation-role="scroll-top-opacity">
                    <p className="paragraph paragraph--l" data-base-animation-role="fade">
                      On April 1, 2022 a group of ordinary warehouse workers made history when they did what everyone
                      thought was impossible: win their election and become the first, and only unionized Amazon
                      workplace in America.
                    </p>
                  </div>

                  <div data-scroll-animation-role="scroll-top-opacity">
                    <p className="paragraph paragraph--l" data-base-animation-role="fade" base-animation-delay="0.3">
                      <span className="text-indent__helping">helping </span>
                      This feat would be extraordinary for any union, let alone the Amazon Labor Union (ALU) who did it
                      with no prior organizing experience, no institutional backing, and a total budget of $120,000
                      raised on GoFundMe. Heralded as the most important win for labor since the 1930s, the documentary
                      captures the ALU’s historic grassroots effort from day one of their campaign.
                    </p>
                  </div>

                  <div data-scroll-animation-role="scroll-top-opacity">
                    <p className="paragraph paragraph--l" data-base-animation-role="fade" base-animation-delay="0.4">
                      <span className="text-indent__helping">helping </span>
                      Described by their founder Christian Smalls as the “N.W.A. of the organizing world,” the ALU
                      boldly charts an independent path to unionization through a series of creative (and at times,
                      provocative) tactics. A core emotional arc arises when worker-turned-organizers encounter
                      retaliation, surveillance, burnout, and interpersonal tensions that test their commitment and
                      solidarity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
