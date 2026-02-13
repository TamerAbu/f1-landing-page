import { interpolate, Easing } from "remotion";
import { noise1D } from "../utils/noise";

interface CameraOutput {
  transform: string;
  zoom: number;
}

export const useCameraSystem = (
  frame: number,
  fps: number,
  driveProgress: number
): CameraOutput => {
  // Slow zoom in during walk (0-90)
  const zoomWalk = interpolate(frame, [0, 90], [1.0, 1.05], {
    easing: Easing.inOut(Easing.sin),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Push in during get-in (90-170)
  const zoomGetIn = interpolate(frame, [90, 170], [1.05, 1.12], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Quick zoom out on launch, then slight pull back
  const zoomDrive = interpolate(frame, [180, 210, 300], [1.12, 1.0, 0.98], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const zoom = frame < 90 ? zoomWalk : frame < 180 ? zoomGetIn : zoomDrive;

  // Horizontal pan following action
  const panX = interpolate(frame, [0, 90, 180, 300], [15, 0, 0, 30], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Multi-frequency shake (organic feel using noise)
  const shakeIntensity = driveProgress * 7;
  const shakeX =
    noise1D(frame * 0.15, "shake-x") * shakeIntensity +
    noise1D(frame * 0.3, "shake-x2") * shakeIntensity * 0.4;
  const shakeY =
    noise1D(frame * 0.12, "shake-y") * shakeIntensity * 0.5 +
    noise1D(frame * 0.25, "shake-y2") * shakeIntensity * 0.3;

  return {
    transform: `scale(${zoom}) translate(${panX + shakeX}px, ${shakeY}px)`,
    zoom,
  };
};
