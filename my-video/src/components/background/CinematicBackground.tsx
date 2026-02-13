import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { useParallax } from "../../hooks/useParallax";

interface Props {
  driveProgress: number;
}

// ── Layer 1: Deep sky / ambient ──
const SkyLayer: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(180deg, #06060f 0%, #0d0d1f 30%, #111a2e 60%, #0c1420 100%)",
    }}
  />
);

// ── Layer 2: Garage back wall ──
const GarageWall: React.FC<{ offset: number }> = ({ offset }) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "62%",
      transform: `translateX(${offset}px)`,
    }}
  >
    {/* Wall panels */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(180deg, #0e0e18 0%, #141422 60%, #1a1a28 100%)",
      }}
    />
    {/* Panel seams */}
    {Array.from({ length: 10 }).map((_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          top: 0,
          left: `${i * 10.5 + 2}%`,
          width: 1,
          height: "100%",
          background: "rgba(255,255,255,0.02)",
        }}
      />
    ))}
    {/* Faint Ferrari banner on wall */}
    <div
      style={{
        position: "absolute",
        top: "15%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "60%",
        height: 60,
        background:
          "linear-gradient(90deg, transparent, rgba(220,0,0,0.04), rgba(220,0,0,0.06), rgba(220,0,0,0.04), transparent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: 50,
          fontWeight: 900,
          color: "rgba(220,0,0,0.06)",
          fontFamily: "Arial Black, sans-serif",
          letterSpacing: 30,
        }}
      >
        FERRARI
      </span>
    </div>
  </div>
);

// ── Layer 3: Ceiling beams ──
const CeilingStructure: React.FC<{ offset: number }> = ({ offset }) => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "110%",
      height: "18%",
      transform: `translateX(${offset}px)`,
    }}
  >
    {/* Main horizontal beam */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 18,
        background:
          "linear-gradient(180deg, #2a2a35 0%, #1a1a22 60%, #111118 100%)",
      }}
    />
    {/* Cross braces */}
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          top: 0,
          left: `${i * 13 + 3}%`,
          width: 12,
          height: "100%",
          background:
            "linear-gradient(180deg, #222230, #1a1a25)",
          transform: "skewX(-3deg)",
        }}
      />
    ))}
    {/* Diagonal cross-bracing */}
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={`d-${i}`}
        style={{
          position: "absolute",
          top: "20%",
          left: `${i * 26 + 5}%`,
          width: 200,
          height: 2,
          background: "rgba(255,255,255,0.02)",
          transform: "rotate(25deg)",
          transformOrigin: "left center",
        }}
      />
    ))}
  </div>
);

// ── Layer 4: Overhead lights with volumetric cones ──
const OverheadLights: React.FC<{ offset: number }> = ({ offset }) => {
  const positions = [0.14, 0.38, 0.62, 0.86];
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        transform: `translateX(${offset}px)`,
        pointerEvents: "none",
      }}
    >
      {positions.map((pos, i) => (
        <React.Fragment key={i}>
          {/* Light fixture */}
          <div
            style={{
              position: "absolute",
              top: "13%",
              left: `${pos * 100}%`,
              transform: "translateX(-50%)",
              width: 110,
              height: 16,
              background:
                "linear-gradient(180deg, #555 0%, #eee 30%, #fff 50%, #eee 70%, #555 100%)",
              borderRadius: 4,
              boxShadow:
                "0 0 60px 15px rgba(255,240,220,0.15), 0 0 120px 40px rgba(255,240,220,0.06)",
            }}
          />
          {/* Volumetric light cone */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: `${pos * 100}%`,
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "120px solid transparent",
              borderRight: "120px solid transparent",
              borderTop: "500px solid rgba(255,240,220,0.018)",
              filter: "blur(15px)",
            }}
          />
          {/* Inner bright cone */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: `${pos * 100}%`,
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "50px solid transparent",
              borderRight: "50px solid transparent",
              borderTop: "400px solid rgba(255,240,220,0.012)",
              filter: "blur(8px)",
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

// ── Layer 5: Equipment silhouettes ──
const EquipmentSilhouettes: React.FC<{ offset: number }> = ({ offset }) => (
  <div
    style={{
      position: "absolute",
      bottom: "35%",
      left: 0,
      width: "100%",
      height: "20%",
      transform: `translateX(${offset}px)`,
    }}
  >
    {/* Tire stack left */}
    <div style={{ position: "absolute", left: "3%", bottom: 0 }}>
      {[0, 1, 2].map((j) => (
        <div
          key={j}
          style={{
            width: 45,
            height: 45,
            borderRadius: "50%",
            background: `radial-gradient(circle, #0d0d0d 60%, #151515)`,
            border: "2px solid #111",
            marginBottom: -12,
          }}
        />
      ))}
    </div>
    {/* Tool cart right */}
    <div
      style={{
        position: "absolute",
        right: "5%",
        bottom: 0,
        width: 70,
        height: 90,
        background: "linear-gradient(180deg, #111 0%, #0d0d0d 100%)",
        borderRadius: "4px 4px 0 0",
      }}
    />
    {/* Fuel rig */}
    <div
      style={{
        position: "absolute",
        right: "15%",
        bottom: 0,
        width: 30,
        height: 130,
        background: "linear-gradient(90deg, #0f0f0f, #141414, #0f0f0f)",
        borderRadius: "3px 3px 0 0",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 10,
          left: -20,
          width: 70,
          height: 6,
          background: "#111",
          borderRadius: 3,
        }}
      />
    </div>
  </div>
);

// ── Layer 6: Reflective wet floor ──
const GarageFloor: React.FC<{ offset: number }> = ({ offset }) => (
  <div
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "42%",
      transform: `translateX(${offset}px)`,
      overflow: "hidden",
    }}
  >
    {/* Base floor */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(180deg, #222228 0%, #18181e 30%, #101015 60%, #0a0a0e 100%)",
      }}
    />
    {/* Wet patches (light reflections) */}
    <div
      style={{
        position: "absolute",
        top: "10%",
        left: "30%",
        width: "40%",
        height: "50%",
        background:
          "radial-gradient(ellipse at center, rgba(255,240,220,0.015) 0%, transparent 70%)",
        filter: "blur(20px)",
      }}
    />
    {/* Perspective grid */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "-10%",
        width: "120%",
        height: "200%",
        transform: "perspective(600px) rotateX(55deg)",
        transformOrigin: "center top",
      }}
    >
      {/* Horizontal lines */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={`h-${i}`}
          style={{
            position: "absolute",
            top: `${i * 7}%`,
            left: 0,
            width: "100%",
            height: 1,
            background: `rgba(255,255,255,${0.015 + i * 0.002})`,
          }}
        />
      ))}
      {/* Vertical lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`v-${i}`}
          style={{
            position: "absolute",
            top: 0,
            left: `${i * 5.5}%`,
            width: 1,
            height: "100%",
            background: "rgba(255,255,255,0.015)",
          }}
        />
      ))}
    </div>
    {/* Pit box markings */}
    <div
      style={{
        position: "absolute",
        bottom: "15%",
        left: "35%",
        width: 200,
        height: 4,
        background: "rgba(255,255,255,0.04)",
        transform: "skewX(-5deg)",
      }}
    />
    <div
      style={{
        position: "absolute",
        bottom: "15%",
        left: "55%",
        width: 200,
        height: 4,
        background: "rgba(255,255,255,0.04)",
        transform: "skewX(-5deg)",
      }}
    />
    {/* Light reflections on floor (from overhead lights) */}
    {[0.14, 0.38, 0.62, 0.86].map((pos, i) => (
      <div
        key={`ref-${i}`}
        style={{
          position: "absolute",
          top: "5%",
          left: `${pos * 100}%`,
          transform: "translateX(-50%)",
          width: 200,
          height: 80,
          background:
            "radial-gradient(ellipse, rgba(255,240,220,0.025) 0%, transparent 70%)",
          filter: "blur(15px)",
        }}
      />
    ))}
  </div>
);

// ── Layer 7: Foreground blur elements (depth of field) ──
const ForegroundElements: React.FC = () => (
  <>
    {/* Blurred tire stack far left */}
    <div
      style={{
        position: "absolute",
        bottom: "10%",
        left: "-3%",
        width: 120,
        height: 160,
        background:
          "radial-gradient(ellipse at center, #0a0a0a 60%, transparent 100%)",
        filter: "blur(8px)",
        zIndex: 50,
      }}
    />
    {/* Blurred pit wall edge right */}
    <div
      style={{
        position: "absolute",
        bottom: 0,
        right: "-2%",
        width: 80,
        height: "50%",
        background:
          "linear-gradient(90deg, transparent 0%, #0a0a0a 40%)",
        filter: "blur(6px)",
        zIndex: 50,
      }}
    />
  </>
);

// ══════════════════════════════════
// Master Background
// ══════════════════════════════════

export const CinematicBackground: React.FC<Props> = ({ driveProgress }) => {
  const p1 = useParallax(driveProgress, 0.05);
  const p2 = useParallax(driveProgress, 0.1);
  const p3 = useParallax(driveProgress, 0.15);
  const p4 = useParallax(driveProgress, 0.2);
  const p5 = useParallax(driveProgress, 0.3);
  const p6 = useParallax(driveProgress, 0.08);

  return (
    <AbsoluteFill>
      <SkyLayer />
      <GarageWall offset={p1} />
      <CeilingStructure offset={p2} />
      <OverheadLights offset={p3} />
      <EquipmentSilhouettes offset={p4} />
      <GarageFloor offset={p6} />
      <ForegroundElements />
    </AbsoluteFill>
  );
};
