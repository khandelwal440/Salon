# Next.js Integration Guide for UNION About Page

This directory now contains a fully converted, modular **Next.js** implementation of the UNION documentary About page. Follow this guide to copy and integrate it into your existing Next.js project.

---

## 📁 Files to Copy to Your Project

### 1. Public Assets (Images, Videos, Fonts)
Copy the contents of the `public/` directory into your existing Next.js project's `public/` folder:
- `public/images/` ➡️ `<your-project>/public/images/`
- `public/videos/` ➡️ `<your-project>/public/videos/`
- `public/fonts/` ➡️ `<your-project>/public/fonts/`

---

### 2. Stylesheet
Copy `styles/about.css` into your project:
- `styles/about.css` ➡️ `<your-project>/styles/about.css` (or import it into your `globals.css` / root layout)

In your root layout (`app/layout.jsx` or `app/layout.tsx`):
```jsx
import '@/styles/about.css'; // Or relative path: import '../styles/about.css';
```

---

### 3. Components
Copy the entire `components/about/` folder into your project's components directory:
- `components/about/` ➡️ `<your-project>/components/about/`

**Components included:**
- `AboutPage.jsx` — Complete assembled page component
- `Header.jsx` — Responsive header with SVG logo & interactive mobile burger menu
- `HeroSection.jsx` — Film festival laurels, giant typographic "UNION" title with inline teaser video, and crew credit roll
- `TrailerSection.jsx` — Full HD trailer video player
- `AboutSection.jsx` — NYT quote highlight and two-column story overview
- `GallerySection.jsx` — Documentary photo still showcase
- `TeamSection.jsx` & `TeamModal.jsx` — Interactive expandable team cards with desktop bio reveals and mobile popup modals
- `FundersMarqueeSection.jsx` — Dual-track infinite horizontal scrolling partner logos
- `StatementsSection.jsx` — Dark mode section with director/producer statements and noise overlay
- `PressSection.jsx` — Press review cards slider with direct links
- `WatchSection.jsx` — Screenings list with interactive Upcoming / Past tab switch
- `LaborSection.jsx` — "Fight for fair labor" editorial text
- `MerchSection.jsx` — Merchandise cards catalog
- `Footer.jsx` — Press kit download link, social links, newsletter signup with reactive feedback

---

## 🚀 How to Add the Page to Your Next.js Project

### Option A: If your project uses Next.js App Router (`app/`)

Create `app/about/page.jsx` (or `app/about/page.tsx`):
```jsx
import AboutPage from '@/components/about/AboutPage';

export const metadata = {
  title: 'About | UNION Film',
  description: 'About the documentary UNION — Directed by Brett Story & Stephen Maing.',
};

export default function Page() {
  return <AboutPage />;
}
```

---

### Option B: If your project uses Next.js Pages Router (`pages/`)

Create `pages/about.jsx` (or `pages/about.tsx`):
```jsx
import Head from 'next/head';
import AboutPage from '@/components/about/AboutPage';

export default function About() {
  return (
    <>
      <Head>
        <title>About | UNION Film</title>
        <meta name="description" content="About the documentary UNION — Directed by Brett Story & Stephen Maing." />
      </Head>
      <AboutPage />
    </>
  );
}
```

---

## 🧩 Using Individual Sections Separately
Each section is completely modular. You can import and use any specific component in any existing page:

```jsx
import HeroSection from '@/components/about/HeroSection';
import TrailerSection from '@/components/about/TrailerSection';
import TeamSection from '@/components/about/TeamSection';
import FundersMarqueeSection from '@/components/about/FundersMarqueeSection';
import WatchSection from '@/components/about/WatchSection';

export default function CustomPage() {
  return (
    <div>
      <HeroSection />
      <TrailerSection />
      <TeamSection />
      <FundersMarqueeSection />
      <WatchSection />
    </div>
  );
}
```

---

## 📦 Dependencies
This conversion uses standard React and vanilla CSS animations without requiring legacy jQuery or heavy external dependencies.

If you don't already have Next.js installed in this workspace, you can install and test with:
```bash
npm install
npm run dev
```
Navigate to `http://localhost:3000` or `http://localhost:3000/about`.
