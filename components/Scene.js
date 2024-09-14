import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

const Stars = () => {
  let pointsRef = React.useRef();

  useFrame(() => {
    pointsRef.current.rotation.x += 0.0005;
    pointsRef.current.rotation.y += 0.0005;
  });

  const positions = React.useMemo(() => {
    const positions = [];
    for (let i = 0; i < 5000; i++) {
      positions.push((Math.random() - 0.5) * 100);
      positions.push((Math.random() - 0.5) * 100);
      positions.push((Math.random() - 0.5) * 100);
    }
    return new Float32Array(positions);
  }, []);

  return (
    <group ref={pointsRef}>
      <Points positions={positions} stride={3}>
        <PointMaterial
          transparent
          color="#FFFFFF"
          size={0.5}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <Stars />
      {/* Weitere 3D-Objekte können hier hinzugefügt werden */}
    </>
  );
};

export default Scene;
