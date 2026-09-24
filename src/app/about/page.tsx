'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', margin: 0, padding: 0, border: 'none', overflow: 'hidden', zIndex: 9999 }}>
      <iframe
        src="/union/index.html?v=6.1"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        title="Union Awards"
      />
    </div>
  );
}

