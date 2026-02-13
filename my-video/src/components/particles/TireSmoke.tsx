import React from "react";
import { AbsoluteFill, random, interpolate, useCurrentFrame } from "remotion";

interface Props {
  progress: number; // 0–1 drive progress
  carX: number; // car horizontal offset %
}

interface Particle {
  startDelay: number;
  x0: number;
  y0: number;
  dx: number;
  dy: number;
  size: number;
  lifetime: number;
  alpha: number;
}

export const TireSmoke: React.FC<Props> = ({ progress, carX }) => {
  const frame = useCurrentFrame();

  const particles = React.useMemo<Particle[]>(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      startDelay: random(`smoke-delay-${i}`) * 60,
      x0: random(`smoke-x-${i}`) * 6 - 3,
      y0: random(`smoke-y-${i}`) * 4,
      dx: (random(`smoke-dx-${i}`) - 0.3) * 80,
      dy: -random(`smoke-dy-${i}`) * 60 - 20,
      size: 40 + random(`smoke-sz-${i}`) * 80,
      lifetime: 30 + random(`smoke-lt-${i}`) * 40,
      alpha: 0.12 + random(`smoke-a-${i}`) * 0.15,
    }));
  }, []);

  if (progress <= 0.05) return null;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 40 }}>
      {particles.map((p, i) => {
        const spawnFrame = 180 + p.startDelay; // starts after GETIN_END
        const age = frame - spawnFrame;
        if (age < 0 || age > p.lifetime) return null;

        const lifeProgress = age / p.lifetime;
        const x = carX + 15 + p.x0 + p.dx * lifeProgress;
        const y = p.y0 + p.dy * lifeProgress;
        const currentSize = p.size * (0.3 + lifeProgress * 0.7);
        const opacity = p.alpha * (1 - lifeProgress * lifeProgress);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: `${18 + y * 0.2}%`,
              left: `${x}%`,
              width: currentSize,
              height: currentSize,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(180,180,180,${opacity}) 0%, rgba(120,120,120,${opacity * 0.5}) 40%, transparent 70%)`,
              filter: "blur(10px)",
              transform: "translate(-50%, 50%)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
