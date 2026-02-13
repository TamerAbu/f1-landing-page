import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 25, 100, 120], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scaleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 },
  });

  const y = interpolate(scaleSpring, [0, 1], [-50, 0]);

  const glowPulse = 0.5 + Math.sin(frame * 0.12) * 0.15;

  return (
    <div
      style={{
        position: "absolute",
        top: "12%",
        width: "100%",
        textAlign: "center",
        opacity,
        transform: `translateY(${y}px)`,
        zIndex: 60,
      }}
    >
      {/* Subtitle */}
      <div
        style={{
          fontSize: 26,
          fontWeight: 300,
          color: "transparent",
          backgroundImage: "linear-gradient(90deg, #777, #ccc, #777)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          letterSpacing: 14,
          fontFamily: '"Helvetica Neue", "Segoe UI", Arial, sans-serif',
          textTransform: "uppercase",
        }}
      >
        Scuderia Ferrari
      </div>
      {/* Main title */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 900,
          color: "#fff",
          fontFamily: '"Impact", "Arial Black", sans-serif',
          letterSpacing: 8,
          marginTop: 6,
          textShadow: `
            0 0 20px rgba(220,0,0,${glowPulse}),
            0 0 60px rgba(220,0,0,${glowPulse * 0.5}),
            0 0 120px rgba(220,0,0,${glowPulse * 0.2}),
            0 3px 6px rgba(0,0,0,0.8)
          `,
        }}
      >
        RACE DAY
      </div>
      {/* Decorative line */}
      <div
        style={{
          margin: "12px auto 0",
          width: 180,
          height: 2,
          background:
            "linear-gradient(90deg, transparent, rgba(220,0,0,0.5), transparent)",
        }}
      />
    </div>
  );
};
