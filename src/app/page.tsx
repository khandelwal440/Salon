"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChapterThreeSection from "@/components/ChapterThreeSection";
import RunRobRunSection from "@/components/RunRobRunSection";
import DotTxtProductsFullSection from "@/components/DotTxtProductsFullSection";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SmoothScroll>
      {/* Intro Editorial Shutter Loader */}
      <Loader />

      {/* Sticky Luxury Header with Gliding Logo */}
      <Header onOpenBooking={() => setIsModalOpen(true)} />

      <main className="relative min-h-screen bg-[#0B0C10] text-[#F8FAFC]">
        {/* 01: Hero Section */}
        <Hero onOpenBooking={() => setIsModalOpen(true)} />

        {/* 02: Pure Clone of Nabil Issa Chapter III (Objects of Desire & Leading Voices) */}
        <ChapterThreeSection />

        {/* 04: RunRobRun Creative Tools Reel, Pixel Runner & Procedural Work Canvas */}
        <RunRobRunSection />

        {/* 05: Client Reviews & Salon Experiences Section with Soft Pink Grid Theme */}
        <DotTxtProductsFullSection onOpenBooking={() => setIsModalOpen(true)} />
      </main>

      {/* Quick Reservation Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </SmoothScroll>
  );
}
