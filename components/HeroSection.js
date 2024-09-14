import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { Html, useProgress } from '@react-three/drei';
import dynamic from 'next/dynamic';

const HeroContainer = styled.section`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const HeroContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 4rem;
  margin: 0;
  line-height: 1.2;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

const Scene = dynamic(() => import('./Scene'), { ssr: false });

const HeroSection = () => {
  return (
    <HeroContainer>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </Canvas>
      <HeroContent>
        <Title>Titan-Service</Title>
        <Subtitle>Innovative Cyber Security Lösungen</Subtitle>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
