import Head from 'next/head';
import AboutPage from '../components/about/AboutPage';

export default function About() {
  return (
    <>
      <Head>
        <title>About | UNION Film</title>
        <meta
          name="description"
          content="About the documentary UNION — Directed by Brett Story & Stephen Maing. Official Selection at Sundance, CPH:DOX, Visions du Réel."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AboutPage />
    </>
  );
}
