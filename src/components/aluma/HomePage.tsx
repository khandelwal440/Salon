"use client";
import Shell from "./Shell";
import HairHero from "./HairHero";
import Marquee from "./Marquee";
import Turnaround from "./Turnaround";
import ServiceTrack from "./ServiceTrack";
import SwatchFan from "./SwatchFan";
import MaskStats from "./MaskStats";
import Studios from "./Studios";

export default function HomePage() {
  return (
    <Shell page="home">
      <main>
        <HairHero />
        <Marquee off={2} />
        <Turnaround />
        <ServiceTrack />
        <SwatchFan />
        <MaskStats />
        <Studios />
      </main>
    </Shell>
  );
}
