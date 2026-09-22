import type { Metadata } from "next";
import AboutPageContent from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description: "About the documentary — Directed by Brett Story & Stephen Maing.",
  openGraph: {
    title: "About",
    description: "About the documentary — Directed by Brett Story & Stephen Maing.",
    images: ["/union/images/6878ac08c8ccb2977b3a39c9_Union-Still-6.webp"],
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
