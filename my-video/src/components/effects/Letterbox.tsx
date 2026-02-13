import React from "react";
import { interpolate, useCurrentFrame, Easing } from "remotion";

export const Letterbox: React.FC = () => {
  const frame = useCurrentFrame();
  const barHeight = interpolate(frame, [0, 25], [0, 80], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateRight: "clamp",
  });

  const style: React.CSSProperties = {
    position: "absolute",
    left: 0,
    width: "100%",
    height: barHeight,
    background: "#000",
    zIndex: 200,
    pointerEvents: "none",
  };

  return (
    <>
      <div style={{ ...style, top: 0 }} />
      <div style={{ ...style, bottom: 0 }} />
    </>
  );
};
