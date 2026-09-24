import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
  Space_Mono,
} from "next/font/google";
import "./globals.css";
import "../styles/about.css";

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const monoFont = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ALUMA | Luxury Salon & Aesthetic Sanctuary Bangalore",
  description:
    "Architecture of hair, French balayage alchemy, molecular keratin glass, and Japanese micro-mist head spa in Whitefield, HSR Layout & Sarjapur Bangalore.",
  keywords: [
    "luxury hair salon Bangalore",
    "Aluma Salon Whitefield",
    "Aluma HSR Layout",
    "French balayage Bangalore",
    "Japanese head spa Bangalore",
    "bridal hair architecture",
  ],
  openGraph: {
    title: "ALUMA | Architecture of Hair & Aesthetic Sanctuary",
    description:
      "Your look, our promise. Architectural precision cuts, bespoke colour chemistry, and sensory rituals.",
    url: "https://aluma.salon",
    siteName: "Aluma Salon",
    type: "website",
  },
  icons: {
    icon: "/aluma-assets/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} ${monoFont.variable} dark scroll-smooth bg-[#0B0C10] text-[#F8FAFC]`}
    >
      <body className="min-h-screen bg-[#0B0C10] text-[#F8FAFC] antialiased selection:bg-[#20B364] selection:text-[#0B0C10] overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
