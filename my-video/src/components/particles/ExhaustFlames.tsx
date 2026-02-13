import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";

interface Props {
  intensity: number; // 0–1
  carX: number; // car horizontal offset %
}

interface FlameParticle {
  dx: number;
  dy: number;
  width: number;
  height: number;
  color: string;
}

export const ExhaustFlames: React.FC<Props> = ({ intensity, carX }) => {
  const frame = useCurrentFrame();

  const particles = React.useMemo<FlameParticle[]>(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      dx: -(random(`fl-dx-${i}`) * 40 + 5),
      dy: (random(`fl-dy-${i}`) - 0.5) * 20,
      width: 12 + random(`fl-w-${i}`) * 25,
      height: 6 + random(`fl-h-${i}`) * 12,
      color:
        i % 4 === 0
          ? "rgba(255,255,200,0.9)"
          : i % 4 === 1
            ? "rgba(255,180,50,0.8)"
            : i % 4 === 2
              ? "rgba(255,100,20,0.7)"
              : "rgba(200,40,0,0.5)",
    }));
  }, []);

  if (intensity <= 0.01) return null;

  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 35 }}>
      {/* Exhaust glow */}
      <div
        style={{
          position: "absolute",
          bottom: "24%",
          left: `calc(46% + ${carX}% - 530px)`,
          width: 80,
          height: 40,
          background: `radial-gradient(ellipse, rgba(255,120,20,${intensity * 0.7}) 0%, rgba(255,60,0,${intensity * 0.3}) 40%, transparent 70%)`,
          boxShadow: `0 0 ${80 * intensity}px ${30 * intensity}px rgba(255,80,0,${intensity * 0.4})`,
          borderRadius: "50%",
          filter: "blur(4px)",
        }}
      />
      {/* Flame particles */}
      {particles.map((p, i) => {
        const jitter =
          Math.sin(frame * 0.5 + i * 2.3) * 3 * intensity;
        const flicker = 0.5 + Math.sin(frame * 0.8 + i * 1.7) * 0.5;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: `${24 + p.dy * intensity * 0.05 + jitter * 0.1}%`,
              left: `calc(45% + ${carX}% - 530px + ${p.dx * intensity}px)`,
              width: p.width * intensity,
              height: p.height * intensity,
              background: p.color,
              borderRadius: "50%",
              filter: `blur(${2 + i * 0.3}px)`,
              opacity: intensity * flicker,
              transform: `translateY(${jitter}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
