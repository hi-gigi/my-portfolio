// ============================================================
//  MODEL — win confetti
//  Pure description of the confetti that rains down inside the portrait
//  when the puzzle is solved (the view clips it to the photo). Distances are in `cqw` (percent of the
//  portrait's width) so it scales with the photo. No React, no DOM —
//  the view turns each piece into CSS variables and lets CSS animate it.
// ============================================================

/** Size of the brand-coral palette (`--confetti-1…n` in PortraitPuzzle.less). */
export const CONFETTI_COLORS = 5;
const PIECES = 24;

export interface ConfettiPiece {
  id: number;
  /** Where along the top edge it enters, in percent of the photo's width. */
  x: number;
  /** How far it drifts side to side as it falls, in cqw. */
  sway: number;
  /** Starting height, just above the top edge so it slides into view, in cqw. */
  start: number;
  /** How far it falls — well past the bottom edge, so it crosses the whole photo, in cqw. */
  fall: number;
  /** Total rotation, in degrees. */
  spin: number;
  /** Seconds. */
  delay: number;
  duration: number;
  /** Pixels. */
  size: number;
  /** 1…CONFETTI_COLORS. */
  color: number;
  round: boolean;
}

/** How long the confetti stays mounted, in ms (longest delay + duration, rounded up). */
export const CONFETTI_MS = 4400;

const between = (random: () => number, min: number, max: number) =>
  min + random() * (max - min);

export function makeConfetti(
  random: () => number = Math.random,
): ConfettiPiece[] {
  return Array.from({ length: PIECES }, (_, id) => ({
    id,
    x: between(random, 3, 97),
    sway: between(random, 4, 9),
    start: -between(random, 8, 16),
    fall: between(random, 135, 160),
    spin: between(random, -540, 540),
    delay: between(random, 0, 0.9),
    duration: between(random, 2.2, 3.4),
    size: Math.round(between(random, 8, 12)),
    color: 1 + Math.floor(random() * CONFETTI_COLORS),
    round: random() < 0.3,
  }));
}
