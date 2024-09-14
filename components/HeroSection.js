import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import { Mesh } from 'three';

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
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      <Canvas>
        {/* 3D Animationen mit Three.js */}
      </Canvas>
      <HeroContent>
        <Title>Titan-Service</Title>
        <Subtitle>Innovative Cyber Security Lösungen</Subtitle>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
