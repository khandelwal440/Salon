import '../styles/about.css';

export const metadata = {
  title: 'UNION — Award-Winning Documentary',
  description:
    'The Amazon Labor Union (ALU) takes on one of the worlds largest and most powerful companies in the fight to unionize.',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/images/686e849b38dd68b89078ae20_66b5bc3d1438e49f7340958a_favicon.png',
    apple: '/images/686e849f130d789fb5aef548_66b5bc43a776c9df2f04e31f_webclip.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
