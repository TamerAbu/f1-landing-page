import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";

const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>`;
const GRAIN_URI = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

export const FilmGrain: React.FC<{ intensity?: number }> = ({
  intensity = 0.07,
}) => {
  const frame = useCurrentFrame();
  const ox = random(`grain-x-${frame}`) * 200;
  const oy = random(`grain-y-${frame}`) * 200;

  return (
    <AbsoluteFill
      style={{
        backgroundImage: GRAIN_URI,
        backgroundPosition: `${ox}px ${oy}px`,
        opacity: intensity,
        mixBlendMode: "overlay",
        zIndex: 190,
        pointerEvents: "none",
      }}
    />
  );
};
