import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import AudioPlayer from '../components/AudioPlayer';
import Footer from '../components/Footer';
import MouseEffects from '../components/MouseEffects';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Titan-Service - Innovative Cyber Security Lösungen</title>
        <meta
          name="description"
          content="Erleben Sie die modernsten Cyber Security Lösungen mit atemberaubenden Animationen und Effekten."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Weitere Meta-Tags */}
      </Head>
      <MouseEffects />
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        {/* Weitere Sektionen */}
      </main>
      <AudioPlayer />
      <Footer />
    </>
  );
};

export default HomePage;
