import type { Metadata, Viewport } from "next";
import HomePage from "@/components/aluma/HomePage";

export const metadata: Metadata = {
  title: "Aluma Salon | Hair that turns heads. Whitefield, HSR Layout, Sarjapur Road",
  description: "Cuts, colour, balayage, keratin and Japanese head spa at Aluma Salon, Bangalore. Tap the hair. It gets a trim.",
};
export const viewport: Viewport = { themeColor: "#EA54DB", viewportFit: "cover" };

export default function Page() {
  return <HomePage />;
}
