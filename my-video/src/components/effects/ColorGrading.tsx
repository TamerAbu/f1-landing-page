import React from "react";
import { AbsoluteFill } from "remotion";

export const ColorGrading: React.FC = () => (
  <>
    {/* Contrast boost */}
    <AbsoluteFill
      style={{
        background: "rgba(0,0,0,0.06)",
        mixBlendMode: "multiply",
        zIndex: 170,
        pointerEvents: "none",
      }}
    />
    {/* Teal shadows */}
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(180deg, rgba(0,60,80,0.1) 0%, rgba(0,40,60,0.06) 100%)",
        mixBlendMode: "color",
        zIndex: 172,
        pointerEvents: "none",
      }}
    />
    {/* Orange highlights */}
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, rgba(255,140,50,0.07) 0%, transparent 70%)",
        mixBlendMode: "overlay",
        zIndex: 174,
        pointerEvents: "none",
      }}
    />
  </>
);
