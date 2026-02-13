import React from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const LightsOut: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 12, 65, 85], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Slam-in: starts at 2.5x scale, springs to 1x
  const slamSpring = spring({
    frame,
    fps,
    config: { damping: 9, mass: 1.0, stiffness: 180 },
  });
  const scale = interpolate(slamSpring, [0, 1], [2.5, 1]);
  const motionBlur = interpolate(slamSpring, [0, 1], [8, 0]);

  // Scanning red line
  const scanY = interpolate(frame, [10, 50], [-20, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: "18%",
        width: "100%",
        textAlign: "center",
        opacity,
        transform: `scale(${scale})`,
        filter: `blur(${motionBlur}px)`,
        zIndex: 65,
      }}
    >
      {/* Scanning line */}
      <div
        style={{
          position: "absolute",
          top: `${scanY}%`,
          left: "20%",
          width: "60%",
          height: 3,
          background:
            "linear-gradient(90deg, transparent, rgba(220,0,0,0.5), transparent)",
          filter: "blur(2px)",
        }}
      />
      {/* LIGHTS OUT */}
      <div
        style={{
          fontSize: 78,
          fontWeight: 900,
          color: "#fff",
          fontFamily: '"Impact", "Arial Black", sans-serif',
          letterSpacing: 10,
          textShadow: `
            0 0 40px rgba(220,0,0,0.9),
            0 0 80px rgba(220,0,0,0.4),
            0 4px 20px rgba(0,0,0,0.7)
          `,
        }}
      >
        LIGHTS OUT
      </div>
      {/* AND AWAY WE GO */}
      <div
        style={{
          fontSize: 38,
          fontWeight: 300,
          color: "#e23e57",
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
          letterSpacing: 16,
          marginTop: 10,
          textShadow: "0 2px 10px rgba(0,0,0,0.5)",
        }}
      >
        AND AWAY WE GO
      </div>
    </div>
  );
};
