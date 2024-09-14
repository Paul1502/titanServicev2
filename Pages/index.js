import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import AudioPlayer from '../components/AudioPlayer';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Titan-Service - Innovative Cyber Security Lösungen</title>
        <meta name="description" content="Erleben Sie die modernsten Cyber Security Lösungen mit atemberaubenden Animationen und Effekten." />
        {/* Weitere Meta-Tags */}
      </Head>
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
        {/* Weitere Sektionen */}
      </main>
      <AudioPlayer />
    </>
  );
};

export default HomePage;
