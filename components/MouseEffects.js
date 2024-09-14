import React, { useEffect } from 'react';
import styled from 'styled-components';

const MouseCircle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  z-index: 9999;
`;

const MouseEffects = () => {
  useEffect(() => {
    const cursor = document.querySelector('#mouse-circle');

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  }, []);

  return <MouseCircle id="mouse-circle" />;
};

export default MouseEffects;
