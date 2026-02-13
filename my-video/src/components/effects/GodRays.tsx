import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const GodRays: React.FC<{ opacity: number }> = ({ opacity }) => {
  const frame = useCurrentFrame();
  // Subtle sway
  const sway = Math.sin(frame * 0.02) * 2;

  return (
    <AbsoluteFill style={{ zIndex: 14, pointerEvents: "none", opacity }}>
      {[12, 32, 55, 78].map((left, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: `${left}%`,
            width: 140,
            height: "100%",
            background: `linear-gradient(180deg, rgba(255,240,220,0.07) 0%, rgba(255,240,220,0.02) 40%, transparent 65%)`,
            transform: `skewX(${-6 + i * 3 + sway}deg)`,
            filter: "blur(25px)",
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
