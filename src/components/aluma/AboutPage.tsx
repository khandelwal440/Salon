"use client";
import Shell from "./Shell";
import AboutHero from "./AboutHero";
import Tunnel from "./Tunnel";
import Story from "./Story";
import Beliefs from "./Beliefs";
import Marquee from "./Marquee";
import LookDeck from "./LookDeck";
import Ring from "./Ring";
import Studios from "./Studios";

export default function AboutPage() {
  return (
    <Shell page="about">
      <main>
        <AboutHero />
        <Tunnel />
        <Story />
        <Marquee off={5} rows={[["Listen first", "Cut second", "Colour kindly"], ["Whitefield", "HSR Layout", "Sarjapur Road"]]} />
        <Beliefs />
        <LookDeck />
        <Ring />
        <Studios />
      </main>
    </Shell>
  );
}
