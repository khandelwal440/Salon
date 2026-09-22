'use client';

import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import TrailerSection from './TrailerSection';
import AboutSection from './AboutSection';
import GallerySection from './GallerySection';
import TeamSection from './TeamSection';
import FundersMarqueeSection from './FundersMarqueeSection';
import StatementsSection from './StatementsSection';
import PressSection from './PressSection';
import WatchSection from './WatchSection';
import LaborSection from './LaborSection';
import MerchSection from './MerchSection';
import Footer from './Footer';

export default function AboutPage() {
  return (
    <>
      {/* Header Navigation */}
      <Header />

      {/* Main Content Sections */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main className="main">
            {/* 1. Hero with festival laurels, UNION typographic title & inline teaser */}
            <HeroSection />

            {/* 2. Full Trailer video */}
            <TrailerSection />

            {/* 3. About & Synopsis */}
            <AboutSection />

            {/* 4. Film photo gallery */}
            <GallerySection />

            {/* 5. Team cards & Modal */}
            <TeamSection />

            {/* 6. Funders & Partners Infinite Marquee */}
            <FundersMarqueeSection />

            {/* 7. Film team & Director Statements (Dark mode) */}
            <StatementsSection />

            {/* 8. Press Quotes Slider */}
            <PressSection />

            {/* 9. Watch / Screenings (Interactive Upcoming/Past Toggle) */}
            <WatchSection />

            {/* 10. Fight for Fair Labor editorial */}
            <LaborSection />

            {/* 11. Exclusive Merchandise Catalog */}
            <MerchSection />
          </main>

          {/* 12. Footer with press kit download, socials & newsletter */}
          <Footer />
        </div>
      </div>
    </>
  );
}
