import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";

interface Props {
  active: boolean;
  carX: number;
}

interface Spark {
  vx: number;
  vy: number;
  lifetime: number;
  startDelay: number;
}

export const Sparks: React.FC<Props> = ({ active, carX }) => {
  const frame = useCurrentFrame();

  const sparks = React.useMemo<Spark[]>(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      vx: (random(`sp-vx-${i}`) - 0.6) * 8,
      vy: -random(`sp-vy-${i}`) * 5 - 2,
      lifetime: 10 + random(`sp-lt-${i}`) * 20,
      startDelay: random(`sp-sd-${i}`) * 80,
    }));
  }, []);

  if (!active) return null;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 42 }}>
      {sparks.map((s, i) => {
        const spawnFrame = 190 + s.startDelay;
        const age = frame - spawnFrame;
        if (age < 0 || age > s.lifetime) return null;

        const t = age / s.lifetime;
        const gravity = 0.15;
        const x = s.vx * age;
        const y = s.vy * age + 0.5 * gravity * age * age;
        const opacity = 1 - t;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: `${16 - y * 0.3}%`,
              left: `calc(50% + ${carX}% - 400px + ${x * 3}px)`,
              width: 3 + (1 - t) * 2,
              height: 3 + (1 - t) * 2,
              background: t < 0.3 ? "#fff" : "#ffcc00",
              borderRadius: "50%",
              boxShadow: `0 0 ${6 * opacity}px ${t < 0.3 ? "#fff" : "#ff8800"}`,
              opacity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
