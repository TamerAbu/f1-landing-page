"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as THREE from "three";

function RotatingCircuit({ url }: { url: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useLoader(STLLoader, url);

  // Center the geometry and scale to fit
  const centeredGeometry = useMemo(() => {
    const geo = geometry.clone();
    geo.computeBoundingBox();
    geo.center();
    // Scale to fit nicely in view
    const box = geo.boundingBox!;
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 30 / maxDim;
    geo.scale(scale, scale, scale);
    return geo;
  }, [geometry]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} rotation={[-Math.PI / 5, 0, 0]}>
      <mesh geometry={centeredGeometry} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#ff1801"
          metalness={0.7}
          roughness={0.25}
          emissive="#ff1801"
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
}

export default function CircuitModel({ className }: { className?: string }) {
  return (
    <div className={className ?? "h-[120px] w-[120px]"}>
      <Canvas
        camera={{ position: [0, 0, 50], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <directionalLight position={[-10, -5, -10]} intensity={0.4} />
        <pointLight position={[0, 20, 0]} intensity={0.5} color="#ff6b2b" />
        <Suspense fallback={null}>
          <RotatingCircuit url="/images/imola-circuit/files/Imola_F1_Layout.stl" />
        </Suspense>
      </Canvas>
    </div>
  );
}
