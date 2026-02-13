import React from "react";
import { Img, staticFile, interpolate, useCurrentFrame, Easing } from "remotion";

interface Props {
  walkX: number;
  scale: number;
  sinkY: number;
  opacity: number;
  isWalking: boolean;
}

export const CharacterLayer: React.FC<Props> = ({
  walkX,
  scale,
  sinkY,
  opacity,
  isWalking,
}) => {
  const frame = useCurrentFrame();

  // Walking bob
  const walkBob = isWalking
    ? Math.sin(frame * 0.4) * 3.5 * interpolate(frame, [0, 90], [1, 0.2], {
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <>
      {/* Ground contact shadow */}
      <div
        style={{
          position: "absolute",
          bottom: "13%",
          left: `${walkX}%`,
          transform: `translateX(-50%) scaleX(${scale * 1.2}) scaleY(0.2)`,
          width: 180,
          height: 60,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
          opacity: opacity * 0.7,
          filter: "blur(8px)",
          zIndex: 9,
        }}
      />

      {/* Character */}
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: `${walkX}%`,
          transform: `translateX(-50%) scale(${scale}) translateY(${sinkY + walkBob}px)`,
          opacity,
          zIndex: 10,
        }}
      >
        <Img
          src={staticFile("character.png")}
          style={{
            height: 540,
            objectFit: "contain",
            // Darken to match dim garage + orange rim light + contrast
            filter:
              "brightness(0.82) contrast(1.15) drop-shadow(-4px 0 10px rgba(255,100,50,0.25)) drop-shadow(4px 0 12px rgba(0,40,60,0.3)) drop-shadow(0 12px 40px rgba(0,0,0,0.8))",
          }}
        />
      </div>

      {/* Floor reflection */}
      <div
        style={{
          position: "absolute",
          bottom: "3%",
          left: `${walkX}%`,
          transform: `translateX(-50%) scaleY(-1) scale(${scale * 0.9})`,
          opacity: opacity * 0.06,
          zIndex: 8,
          filter: "blur(8px)",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 60%)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 60%)",
        }}
      >
        <Img
          src={staticFile("character.png")}
          style={{
            height: 400,
            objectFit: "contain",
          }}
        />
      </div>
    </>
  );
};
