import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | UNION Film",
  description: "About the documentary UNION — Directed by Brett Story & Stephen Maing.",
  openGraph: {
    title: "About | UNION Film",
    description: "About the documentary UNION — Directed by Brett Story & Stephen Maing.",
    images: ["/union/images/6878ac08c8ccb2977b3a39c9_Union-Still-6.webp"],
  },
};

export default function AboutPage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#f4f3ed",
      }}
    >
      <iframe
        src="/union/index.html"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          display: "block",
          margin: 0,
          padding: 0,
        }}
        title="UNION Documentary"
        allow="autoplay; fullscreen"
      />
    </div>
  );
}
