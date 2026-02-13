import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Easing,
} from "remotion";

// Background
import { CinematicBackground } from "./components/background/CinematicBackground";

// Car
import { F1CarSvg } from "./components/car/F1CarSvg";

// Effects
import { Letterbox } from "./components/effects/Letterbox";
import { FilmGrain } from "./components/effects/FilmGrain";
import { ColorGrading } from "./components/effects/ColorGrading";
import { Vignette } from "./components/effects/Vignette";
import { ChromaticAberration } from "./components/effects/ChromaticAberration";
import { LensFlare } from "./components/effects/LensFlare";
import { GodRays } from "./components/effects/GodRays";

// Particles
import { TireSmoke } from "./components/particles/TireSmoke";
import { ExhaustFlames } from "./components/particles/ExhaustFlames";
import { Sparks } from "./components/particles/Sparks";
import { AmbientHaze } from "./components/particles/AmbientHaze";

// Typography
import { TitleCard } from "./components/typography/TitleCard";
import { LightsOut } from "./components/typography/LightsOut";

// Character
import { CharacterLayer } from "./components/character/CharacterLayer";

// Hooks
import { useCameraSystem } from "./hooks/useCameraSystem";

// ══════════════════════════════════════
// MAIN COMPOSITION
// ══════════════════════════════════════

export const F1Ferrari: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Timing constants (30fps × 300 frames = 10s) ──
  const WALK_END = 90; // 0–3s
  const GETIN_END = 180; // 3–6s
  const DRIVE_END = 300; // 6–10s

  // ── Drive progress (0–1) ──
  const driveProgress = interpolate(frame, [GETIN_END, DRIVE_END], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Camera system ──
  const camera = useCameraSystem(frame, fps, driveProgress);

  // ══════════════════════════
  // SCENE 1: Character walks in (0–90)
  // ══════════════════════════
  const charWalkX = interpolate(frame, [0, WALK_END], [82, 48], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const charWalkScale = interpolate(frame, [0, WALK_END], [0.5, 0.92], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ══════════════════════════
  // SCENE 2: Getting into cockpit (90–180)
  // ══════════════════════════
  const sinkY = interpolate(frame, [WALK_END, GETIN_END], [0, 380], {
    easing: Easing.in(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const sinkScale = interpolate(frame, [WALK_END, GETIN_END], [0.92, 0.28], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const charOpacity = interpolate(frame, [GETIN_END - 40, GETIN_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ══════════════════════════
  // CAR MOTION
  // ══════════════════════════
  // Slides in from right
  const carSlideIn = interpolate(frame, [5, 65], [55, 0], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const carOpacity = interpolate(frame, [5, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Drives off with exponential acceleration
  const carDriveOff = interpolate(
    frame,
    [GETIN_END + 20, DRIVE_END],
    [0, -160],
    {
      easing: Easing.in(Easing.exp),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  const carX = carSlideIn + carDriveOff;

  // ── Wheel rotation ──
  const wheelRotation = interpolate(
    frame,
    [0, GETIN_END, GETIN_END + 10, DRIVE_END],
    [0, 0, 0, 360 * 14],
    {
      easing: Easing.in(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // ── Rev vibration (increasing frequency) ──
  const revFreq = interpolate(frame, [155, 180], [2, 8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const revAmp = interpolate(frame, [155, 180], [1, 4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const revVibrate =
    frame > 155 && frame < 205 ? Math.sin(frame * revFreq) * revAmp : 0;

  // ── Engine / brake glow ──
  const engineGlow = interpolate(
    frame,
    [GETIN_END - 30, GETIN_END + 10],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // ── Background blur during drive ──
  const bgBlur = interpolate(frame, [GETIN_END + 40, DRIVE_END], [0, 10], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Lens flare intensity (peaks mid-drive) ──
  const flareIntensity = interpolate(
    frame,
    [GETIN_END, GETIN_END + 40, DRIVE_END - 40, DRIVE_END],
    [0, 0.6, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ── God ray opacity ──
  const godRayOpacity = interpolate(
    frame,
    [0, 30, DRIVE_END - 30, DRIVE_END],
    [0, 0.8, 0.8, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // ── Fade out at end ──
  const fadeOut = interpolate(frame, [DRIVE_END - 25, DRIVE_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Red flash on launch ──
  const launchFlash =
    frame > GETIN_END && frame < GETIN_END + 20
      ? interpolate(frame, [GETIN_END, GETIN_END + 20], [0.7, 0], {
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050508",
        overflow: "hidden",
        opacity: fadeOut,
      }}
    >
      {/* ══════ BACKGROUND LAYER (with blur during drive) ══════ */}
      <div
        style={{
          position: "absolute",
          inset: "-5%",
          width: "110%",
          height: "110%",
          transform: camera.transform,
          transformOrigin: "center center",
          filter: `blur(${bgBlur}px)`,
        }}
      >
        <CinematicBackground driveProgress={driveProgress} />
        <GodRays opacity={godRayOpacity} />
        <AmbientHaze />
      </div>

      {/* ══════ SCENE CONTENT (camera, no bg blur) ══════ */}
      <div
        style={{
          position: "absolute",
          inset: "-5%",
          width: "110%",
          height: "110%",
          transform: camera.transform,
          transformOrigin: "center center",
        }}
      >
        {/* F1 Car */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: `calc(50% + ${carX}% - 600px)`,
            transform: `translateX(${revVibrate}px)`,
            opacity: carOpacity,
            zIndex: 5,
          }}
        >
          <F1CarSvg
            wheelRotation={wheelRotation}
            brakeGlowIntensity={engineGlow}
          />
        </div>

        {/* Tire smoke */}
        <TireSmoke progress={driveProgress} carX={carX} />

        {/* Exhaust flames */}
        <ExhaustFlames
          intensity={engineGlow * Math.min(driveProgress * 3, 1)}
          carX={carX}
        />

        {/* Sparks */}
        <Sparks active={driveProgress > 0.05} carX={carX} />

        {/* Character */}
        <Sequence from={0} durationInFrames={GETIN_END}>
          <CharacterLayer
            walkX={frame < WALK_END ? charWalkX : 48}
            scale={frame < WALK_END ? charWalkScale : sinkScale}
            sinkY={frame < WALK_END ? 0 : sinkY}
            opacity={charOpacity}
            isWalking={frame < WALK_END}
          />
        </Sequence>
      </div>

      {/* ══════ UI OVERLAYS (fixed, not camera-affected) ══════ */}

      {/* Title card */}
      <Sequence from={0} durationInFrames={120}>
        <TitleCard />
      </Sequence>

      {/* Lights out text */}
      <Sequence from={GETIN_END - 15} durationInFrames={90}>
        <LightsOut />
      </Sequence>

      {/* Red launch flash */}
      {launchFlash > 0 && (
        <AbsoluteFill
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(220,0,0,0.35) 0%, transparent 70%)",
            opacity: launchFlash,
            zIndex: 70,
            pointerEvents: "none",
          }}
        />
      )}

      {/* ── Post-processing stack ── */}
      <LensFlare intensity={flareIntensity} />
      <ColorGrading />
      <Vignette />
      <ChromaticAberration driveProgress={driveProgress} />
      <FilmGrain />
      <Letterbox />
    </AbsoluteFill>
  );
};
