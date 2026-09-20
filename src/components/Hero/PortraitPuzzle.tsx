import {
  useEffect,
  useId,
  useRef,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import {
  PUZZLE_SIZES,
  blankTile,
  canSlide,
  colOf,
  rowOf,
  type Direction,
  type PuzzleSize,
} from "@/model/puzzle";
import { useSlidingPuzzle } from "@/presenters/useSlidingPuzzle";
import { CheckIcon, CloseIcon, ResetIcon, ShuffleIcon } from "../icons";
import "./PortraitPuzzle.less";

interface PortraitPuzzleProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  hint: string;
}

const ARROWS: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
};

/**
 * How big the photo sits inside its card, as a fraction of the card's width.
 * Below 1 the card keeps its size and the photo gets a margin at the top and
 * sides, resting on the bottom edge. (Avoid exactly 1 / size — the tile maths
 * below divides by `1 - PHOTO_SCALE * size`.)
 */
const PHOTO_SCALE = 0.8;

/** Four-point star outline, centred on (cx, cy), `r` from centre to tip. */
const star = (cx: number, cy: number, r: number): string => {
  const c = r * 0.2;
  return [
    `M${cx} ${cy - r}`,
    `Q${cx + c} ${cy - c} ${cx + r} ${cy}`,
    `Q${cx + c} ${cy + c} ${cx} ${cy + r}`,
    `Q${cx - c} ${cy + c} ${cx - r} ${cy}`,
    `Q${cx - c} ${cy - c} ${cx} ${cy - r}Z`,
  ].join("");
};

// Sparkle positions as fractions of the whole photo; scaled up by the puzzle
// size to fill one tile's 100-unit box, so they stay the same size at any
// puzzle size.
const SPARKLE_BIG = [0.12, 0.147, 0.057] as const;
const SPARKLE_SMALL = [0.22, 0.227, 0.03] as const;
const starFor = ([x, y, r]: readonly [number, number, number], size: number) =>
  star(x * size * 100, y * size * 100, r * size * 100);

/**
 * Sparkles for the photo's top-left corner. Drawn to fill one puzzle
 * tile, so they can sit over the photo or ride along with tile 0 —
 * which also makes that tile easy to tell apart from the empty
 * top-right one.
 */
function Sparkles({
  size,
  corner = false,
}: {
  size: number;
  corner?: boolean;
}) {
  return (
    <svg
      className={`portrait-sparkles${corner ? " is-corner" : ""}`}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <path d={starFor(SPARKLE_BIG, size)} />
      <path d={starFor(SPARKLE_SMALL, size)} />
    </svg>
  );
}

/**
 * The hero portrait. At rest it is just the photo; the corner button
 * slices it into a sliding-tile puzzle (2×2 to start, 3×3 on request).
 * Click a piece next to the gap, or use the arrow keys, to slide it.
 */
export function PortraitPuzzle({
  src,
  alt,
  width,
  height,
  hint,
}: PortraitPuzzleProps) {
  const puzzle = useSlidingPuzzle();
  const boardRef = useRef<HTMLDivElement>(null);

  const { status, moves, settled, size, board, confetti } = puzzle;
  const hintId = useId();
  const showTiles = status === "playing" || (status === "solved" && !settled);
  const idle = status === "idle";

  // Send keyboard focus to the board so the arrow keys work straight away.
  useEffect(() => {
    if (status === "playing") boardRef.current?.focus({ preventScroll: true });
  }, [status]);

  // Each tile is a window onto the card, and the photo sits inset in the card
  // (centred, resting on the bottom edge). `background-position` percentages
  // are measured against (tile − image), hence the division by that gap.
  const aspect = height / width;
  const bgX = (col: number) =>
    ((((1 - PHOTO_SCALE) * size) / 2 - col) / (1 - PHOTO_SCALE * size)) * 100;
  const bgY = (row: number) =>
    ((size * (1 - PHOTO_SCALE * aspect) - row) /
      (1 - PHOTO_SCALE * size * aspect)) *
    100;

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") return puzzle.reset();
    const direction = ARROWS[event.key];
    if (!direction) return;
    event.preventDefault();
    puzzle.slideDirection(direction);
  };

  // Idle: start a game. Playing: reset it. Solved: close the puzzle and go
  // back to the photo (the size picker is still there to play again).
  const { label: actionLabel, Icon: ActionIcon } = idle
    ? { label: "Turn my portrait into a sliding puzzle", Icon: ShuffleIcon }
    : status === "playing"
      ? { label: "Reset puzzle", Icon: ResetIcon }
      : { label: "Close puzzle", Icon: CloseIcon };

  const action = (
    <button
      type="button"
      className={`portrait-action${idle ? " is-corner" : ""}`}
      onClick={() => (idle ? puzzle.start() : puzzle.reset())}
      aria-label={actionLabel}
      aria-describedby={idle ? hintId : undefined}
      title={idle ? undefined : actionLabel}
    >
      <ActionIcon className="portrait-action-glyph" />
    </button>
  );

  return (
    <div
      className={`intro-photo portrait${showTiles ? " is-playing" : ""}${
        status === "solved" ? " is-solved" : ""
      }`}
      style={
        {
          "--puzzle-size": size,
          "--photo-scale": PHOTO_SCALE,
          "--photo-aspect": aspect,
        } as CSSProperties
      }
    >
      {showTiles ? (
        <div
          ref={boardRef}
          className="puzzle"
          role="group"
          aria-label="Portrait puzzle. Use the arrow keys, or click a piece next to the gap, to slide it. Escape resets."
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          {board.map((_, tile) => {
            const slot = board.indexOf(tile);
            const style = {
              "--col": colOf(slot, size),
              "--row": rowOf(slot, size),
              "--bg-x": `${bgX(colOf(tile, size))}%`,
              "--bg-y": `${bgY(rowOf(tile, size))}%`,
              backgroundImage: `url(${src})`,
            } as CSSProperties;

            if (tile === blankTile(board)) {
              return (
                <div
                  key={tile}
                  className="puzzle-tile is-blank"
                  style={style}
                  aria-hidden="true"
                />
              );
            }
            return (
              <button
                key={tile}
                type="button"
                className={`puzzle-tile${
                  canSlide(board, slot) ? " is-movable" : ""
                }`}
                style={style}
                tabIndex={-1}
                aria-label={`Piece ${tile + 1}`}
                onClick={() => puzzle.slideSlot(slot)}
              >
                {tile === 0 && <Sparkles size={size} />}
                <span className="puzzle-number" aria-hidden="true">
                  {tile + 1}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <>
          <img
            className="portrait-img"
            src={src}
            alt={alt}
            width={width}
            height={height}
            decoding="async"
          />
          <Sparkles size={size} corner />
        </>
      )}

      {confetti.length > 0 && (
        <div className="confetti" aria-hidden="true">
          {confetti.map((piece) => (
            <span
              key={piece.id}
              className={`confetti-piece${piece.round ? " is-round" : ""}`}
              style={
                {
                  "--x": `${piece.x}%`,
                  "--sway": `${piece.sway}cqw`,
                  "--start": `${piece.start}cqw`,
                  "--fall": `${piece.fall}cqw`,
                  "--spin": `${piece.spin}deg`,
                  "--delay": `${piece.delay}s`,
                  "--dur": `${piece.duration}s`,
                  "--size": `${piece.size}px`,
                  "--color": `var(--confetti-${piece.color})`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      {idle ? (
        <>
          {action}
          {/* Callout shown the moment the shuffle button is hovered or focused. */}
          <span id={hintId} role="tooltip" className="portrait-callout">
            {hint}
          </span>
        </>
      ) : (
        <div className="portrait-controls">
          <p
            className={`portrait-status${status === "solved" ? " is-solved" : ""}`}
            role="status"
          >
            {status === "solved" && (
              <>
                <CheckIcon className="portrait-status-glyph" />
                <span className="sr-only">Solved in </span>
              </>
            )}
            {moves}
            <span className="portrait-status-word">
              {" "}
              {moves === 1 ? "move" : "moves"}
            </span>
          </p>
          <div className="portrait-controls-end">
            <div
              className="portrait-sizes"
              role="radiogroup"
              aria-label="Puzzle size"
            >
              {PUZZLE_SIZES.map((option: PuzzleSize) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={option === size}
                  className="portrait-size"
                  onClick={() =>
                    // After a win, the current size doubles as "play again".
                    (option !== size || status === "solved") &&
                    puzzle.start(option)
                  }
                >
                  {option}×{option}
                </button>
              ))}
            </div>
            {action}
          </div>
        </div>
      )}
    </div>
  );
}
