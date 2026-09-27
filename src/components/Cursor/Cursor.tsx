import { useCursor } from "./Cursor.presenter";
import "./Cursor.less";

/**
 * Custom cursor — a white blend-mode disc that lags the pointer and
 * swells over links / buttons, a small accent dot that tracks exactly,
 * and a contextual label that appears over project tiles, swelling in
 * the same way the disc does. `.cursor__label` only positions the
 * pill (translated every pointermove); `.cursor__label-inner` carries
 * the visible pill and its own scale transition, so the two don't
 * fight over the `transform` property. The same pill also has a round
 * icon-only mode (magnifier) for `[data-cursor-icon="zoom"]` targets —
 * e.g. an image that opens full-size — instead of a text label. View
 * only; the show/hide decision and pointer wiring live in the presenter.
 */
export function Cursor() {
  const { enabled, dotRef, discRef, labelRef } = useCursor();

  if (!enabled) return null;

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={discRef} className="cursor__disc" />
      <div ref={dotRef} className="cursor__dot" />
      <div ref={labelRef} className="cursor__label">
        <span className="cursor__label-inner">
          <span className="cursor__label-text" />
          <svg
            className="cursor__label-arrow"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2.5 7.5 8 2M8 2H4M8 2v4" />
          </svg>
          <svg
            className="cursor__label-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M11 8v6M8 11h6" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </span>
      </div>
    </div>
  );
}
