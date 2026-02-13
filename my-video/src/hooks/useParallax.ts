import { interpolate, Easing } from "remotion";

/**
 * Returns a horizontal offset for parallax layers.
 * Deeper layers (lower depthFactor) move less.
 */
export const useParallax = (
  driveProgress: number,
  depthFactor: number
): number => {
  return interpolate(driveProgress, [0, 1], [0, 200 * depthFactor], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
};
