// ============================================================
//  PRESENTER — useSlidingPuzzle
//  Owns the portrait puzzle's state: the board, the move count and
//  where the game is (idle → playing → solved). The rules live in
//  `@/model/puzzle`; this hook just sequences them and runs the timers.
// ============================================================

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import {
  CONFETTI_MS,
  makeConfetti,
  type ConfettiPiece,
} from "@/model/confetti";
import {
  DEFAULT_PUZZLE_SIZE,
  type Board,
  type Direction,
  type PuzzleSize,
  isSolved,
  shuffledBoard,
  slide,
  slotToSlide,
  solvedBoard,
} from "@/model/puzzle";

export type PuzzleStatus = "idle" | "playing" | "solved";

/** Tiles first appear in place, then slide to their shuffled slots. */
const SCRAMBLE_DELAY_MS = 80;
/** How long the finished tiles stay on screen before the whole image returns. */
const SETTLE_MS = 700;

interface State {
  /** Tiles per side. Survives a reset, so the visitor's choice sticks. */
  size: PuzzleSize;
  board: Board;
  status: PuzzleStatus;
  moves: number;
  /** False until the shuffle has been applied — ignores early clicks. */
  ready: boolean;
  /** True once a solved puzzle has swapped back to the single image. */
  settled: boolean;
}

type Action =
  | { type: "start"; size: PuzzleSize }
  | { type: "scramble"; board: Board }
  | { type: "slide"; slot: number }
  | { type: "settle" }
  | { type: "reset" };

const idle = (size: PuzzleSize): State => ({
  size,
  board: solvedBoard(size),
  status: "idle",
  moves: 0,
  ready: false,
  settled: false,
});

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "start":
      return { ...idle(action.size), status: "playing" };
    case "scramble":
      return state.status === "playing"
        ? { ...state, board: action.board, ready: true }
        : state;
    case "slide": {
      if (state.status !== "playing" || !state.ready) return state;
      const board = slide(state.board, action.slot);
      if (board === state.board) return state;
      return {
        ...state,
        board,
        moves: state.moves + 1,
        status: isSolved(board) ? "solved" : "playing",
      };
    }
    case "settle":
      return state.status === "solved" ? { ...state, settled: true } : state;
    case "reset":
      return idle(state.size);
  }
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useSlidingPuzzle() {
  const [state, dispatch] = useReducer(reducer, DEFAULT_PUZZLE_SIZE, idle);
  /** Confetti to show right now — empty except for a few seconds after a win. */
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const scrambleTimer = useRef<number>();

  /** Starts a fresh game — at `size`, or at the current size if omitted. */
  const start = useCallback(
    (size: PuzzleSize = state.size) => {
      window.clearTimeout(scrambleTimer.current);
      dispatch({ type: "start", size });
      scrambleTimer.current = window.setTimeout(
        () => dispatch({ type: "scramble", board: shuffledBoard(size) }),
        SCRAMBLE_DELAY_MS,
      );
    },
    [state.size],
  );

  const reset = useCallback(() => {
    window.clearTimeout(scrambleTimer.current);
    dispatch({ type: "reset" });
  }, []);

  const slideSlot = useCallback(
    (slot: number) => dispatch({ type: "slide", slot }),
    [],
  );

  const slideDirection = useCallback(
    (direction: Direction) => {
      const slot = slotToSlide(state.board, direction);
      if (slot !== null) dispatch({ type: "slide", slot });
    },
    [state.board],
  );

  // A solved puzzle lingers as tiles for a beat, then swaps back to the image.
  useEffect(() => {
    if (state.status !== "solved") return;
    const timer = window.setTimeout(
      () => dispatch({ type: "settle" }),
      SETTLE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [state.status]);

  // Fire the confetti the moment the puzzle is solved (never for reduced
  // motion), and clear it again after it has played out — or if the game
  // is restarted or closed first.
  useEffect(() => {
    if (state.status !== "solved" || prefersReducedMotion()) {
      setConfetti([]);
      return;
    }
    setConfetti(makeConfetti());
    const timer = window.setTimeout(() => setConfetti([]), CONFETTI_MS);
    return () => window.clearTimeout(timer);
  }, [state.status]);

  useEffect(() => () => window.clearTimeout(scrambleTimer.current), []);

  return {
    size: state.size,
    board: state.board,
    status: state.status,
    moves: state.moves,
    settled: state.settled,
    confetti,
    start,
    reset,
    slideSlot,
    slideDirection,
  };
}
