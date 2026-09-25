import type { Metadata, Viewport } from "next";
import AboutPage from "@/components/aluma/AboutPage";

export const metadata: Metadata = {
  title: "About Aluma Salon | Three dots, one chair at a time",
  description: "Aluma is a Bangalore salon, open since 2018, with studios in Whitefield, HSR Layout and Sarjapur Road.",
};
export const viewport: Viewport = { themeColor: "#6875E9", viewportFit: "cover" };

export default function Page() {
  return <AboutPage />;
}
