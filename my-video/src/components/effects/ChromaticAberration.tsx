import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const ChromaticAberration: React.FC<{
  driveProgress: number;
}> = ({ driveProgress }) => {
  const spread = 2 + driveProgress * 4;

  return (
    <AbsoluteFill
      style={{
        boxShadow: `
          inset ${spread}px 0 ${spread * 6}px rgba(255,0,0,0.08),
          inset ${-spread}px 0 ${spread * 6}px rgba(0,0,255,0.08),
          inset 0 ${spread * 0.7}px ${spread * 4}px rgba(255,0,0,0.04),
          inset 0 ${-spread * 0.7}px ${spread * 4}px rgba(0,0,255,0.04)
        `,
        zIndex: 185,
        pointerEvents: "none",
      }}
    />
  );
};
