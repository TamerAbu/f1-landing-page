import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

export const Vignette: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.04) * 0.04;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center,
          transparent 30%,
          rgba(0,20,30,${0.35 + pulse}) 65%,
          rgba(0,10,15,${0.85 + pulse}) 100%)`,
        zIndex: 180,
        pointerEvents: "none",
      }}
    />
  );
};
