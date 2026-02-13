import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";

export const AmbientHaze: React.FC = () => {
  const frame = useCurrentFrame();

  const hazeParticles = React.useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      x: random(`haze-x-${i}`) * 110 - 5,
      y: random(`haze-y-${i}`) * 80 + 5,
      size: 100 + random(`haze-sz-${i}`) * 200,
      speed: 0.02 + random(`haze-sp-${i}`) * 0.04,
      drift: (random(`haze-dr-${i}`) - 0.5) * 0.3,
      alpha: 0.01 + random(`haze-a-${i}`) * 0.02,
    }));
  }, []);

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 12 }}>
      {hazeParticles.map((h, i) => {
        const xOffset = Math.sin(frame * h.speed + i) * 15 + h.drift * frame;
        const yOffset = Math.cos(frame * h.speed * 0.7 + i * 2) * 8;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${h.y + yOffset * 0.3}%`,
              left: `${h.x + xOffset * 0.2}%`,
              width: h.size,
              height: h.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(255,240,220,${h.alpha}) 0%, transparent 70%)`,
              filter: "blur(35px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
