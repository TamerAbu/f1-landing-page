import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

export const LensFlare: React.FC<{ intensity: number }> = ({ intensity }) => {
  if (intensity <= 0.01) return null;

  return (
    <AbsoluteFill style={{ zIndex: 160, pointerEvents: "none" }}>
      {/* Anamorphic horizontal streak */}
      <div
        style={{
          position: "absolute",
          top: "38%",
          left: "-10%",
          width: "120%",
          height: 3,
          background:
            "linear-gradient(90deg, transparent, rgba(255,200,150,0.25), rgba(255,255,255,0.4), rgba(150,200,255,0.25), transparent)",
          filter: "blur(5px)",
          opacity: intensity,
        }}
      />
      {/* Hexagonal flare ghosts */}
      {[0.28, 0.42, 0.58, 0.72].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${35 + i * 2.5}%`,
            left: `${pos * 100}%`,
            width: 18 + i * 12,
            height: 18 + i * 12,
            background: `radial-gradient(circle, rgba(255,200,100,0.15), transparent)`,
            clipPath:
              "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
            opacity: intensity * 0.35,
            transform: `rotate(${i * 15}deg)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
