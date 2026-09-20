// ============================================================
//  MODEL — sliding-tile puzzle rules
//  Pure functions for the portrait puzzle. No React, no side effects.
//  A board is `board[slot] = tile` on a square grid whose side is
//  `sizeOf(board)`; the puzzle is solved when every tile sits in the
//  slot with its own number. The last tile is the blank one.
// ============================================================

export type PuzzleSize = 2 | 3;
export const PUZZLE_SIZES: readonly PuzzleSize[] = [2, 3];
export const DEFAULT_PUZZLE_SIZE: PuzzleSize = 2;

export type Board = readonly number[];
export type Direction = "up" | "down" | "left" | "right";

export const sizeOf = (board: Board): number =>
  Math.round(Math.sqrt(board.length));
export const rowOf = (slot: number, size: number): number =>
  Math.floor(slot / size);
export const colOf = (slot: number, size: number): number => slot % size;

/** The gap: always the last tile. Hidden while playing, revealed once solved. */
export const blankTile = (board: Board): number => board.length - 1;
const blankSlot = (board: Board): number => board.indexOf(blankTile(board));

export const solvedBoard = (size: number): Board =>
  Array.from({ length: size * size }, (_, slot) => slot);

export const isSolved = (board: Board): boolean =>
  board.every((tile, slot) => tile === slot);

const isAdjacent = (a: number, b: number, size: number): boolean =>
  Math.abs(rowOf(a, size) - rowOf(b, size)) +
    Math.abs(colOf(a, size) - colOf(b, size)) ===
  1;

/** A tile can slide only if it touches the gap. */
export const canSlide = (board: Board, slot: number): boolean =>
  isAdjacent(slot, blankSlot(board), sizeOf(board));

/** Slides the tile in `slot` into the gap. Returns the same board if illegal. */
export function slide(board: Board, slot: number): Board {
  if (!canSlide(board, slot)) return board;
  const blank = blankSlot(board);
  const next = [...board];
  next[blank] = board[slot];
  next[slot] = blankTile(board);
  return next;
}

/**
 * The slot of the tile that would slide in `direction` (arrow keys):
 * "left" slides the tile on the gap's right into the gap, and so on.
 * `null` when the gap is against that edge.
 */
export function slotToSlide(board: Board, direction: Direction): number | null {
  const size = sizeOf(board);
  const blank = blankSlot(board);
  const dRow = direction === "up" ? 1 : direction === "down" ? -1 : 0;
  const dCol = direction === "left" ? 1 : direction === "right" ? -1 : 0;
  const row = rowOf(blank, size) + dRow;
  const col = colOf(blank, size) + dCol;
  if (row < 0 || row >= size || col < 0 || col >= size) return null;
  return row * size + col;
}

const inversions = (board: Board): number => {
  const blank = blankTile(board);
  const tiles = board.filter((tile) => tile !== blank);
  let count = 0;
  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] > tiles[j]) count++;
    }
  }
  return count;
};

/** The classic parity test: half of all arrangements can never be solved. */
export function isSolvable(board: Board): boolean {
  const size = sizeOf(board);
  const flips = inversions(board);
  if (size % 2 === 1) return flips % 2 === 0;
  const blankRowFromBottom = size - rowOf(blankSlot(board), size);
  return (flips + blankRowFromBottom) % 2 === 1;
}

/** Total distance of every tile from its home slot. */
const manhattan = (board: Board): number => {
  const size = sizeOf(board);
  const blank = blankTile(board);
  return board.reduce(
    (sum, tile, slot) =>
      tile === blank
        ? sum
        : sum +
          Math.abs(rowOf(slot, size) - rowOf(tile, size)) +
          Math.abs(colOf(slot, size) - colOf(tile, size)),
    0,
  );
};

/**
 * A random arrangement that is solvable, and far enough from solved to
 * be worth playing. (Random arrangements are unsolvable half the time,
 * so those are simply drawn again.)
 */
export function shuffledBoard(
  size: number,
  random: () => number = Math.random,
): Board {
  const minScramble = size * size - 1; // anything closer would not feel shuffled
  for (;;) {
    const board = [...solvedBoard(size)];
    for (let i = board.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [board[i], board[j]] = [board[j], board[i]];
    }
    if (isSolvable(board) && manhattan(board) >= minScramble) return board;
  }
}
