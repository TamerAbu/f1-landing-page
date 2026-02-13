import { random } from "remotion";

/** 1D value noise using Remotion's deterministic random. */
export const noise1D = (x: number, seed: string): number => {
  const x0 = Math.floor(x);
  const x1 = x0 + 1;
  const t = x - x0;
  const smooth = t * t * (3 - 2 * t); // smoothstep
  const v0 = random(`${seed}-${x0}`) * 2 - 1;
  const v1 = random(`${seed}-${x1}`) * 2 - 1;
  return v0 + smooth * (v1 - v0);
};

/** 2D value noise. */
export const noise2D = (x: number, y: number, seed: string): number => {
  const a = noise1D(x + y * 57.0, seed);
  const b = noise1D(x + (y + 1) * 57.0, seed);
  const t = (y - Math.floor(y));
  const smooth = t * t * (3 - 2 * t);
  return a + smooth * (b - a);
};
