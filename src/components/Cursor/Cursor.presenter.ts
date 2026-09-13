// ============================================================
//  PRESENTER — custom cursor
//  Owns the "should we draw one?" decision and the pointer wiring.
//  Three parts:
//    · disc  — white circle in mix-blend-mode: difference, lags the
//              pointer and swells over interactive targets
//    · dot   — small accent dot, tracks the pointer exactly
//    · label — a pill that appears over any [data-cursor-label]
//              element, showing that element's text (project tiles)
//  The view only renders the three nodes and hands back their refs.
// ============================================================

import { useEffect, useRef, useState } from "react";

/** A real mouse-like pointer — never on touch-only devices. */
const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** Disc easing per frame (0–1). Lower = more lag. */
const DISC_LERP = 0.18;

/** Targets that swell the disc. Extend if the site grows form controls. */
const INTERACTIVE = "a, button, .btn, [role='button'], label, summary";

/** Any element carrying a contextual cursor label (see ProjectCard). */
const LABEL_TARGET = "[data-cursor-label]";

/**
 * Gap in px between the pointer and the contextual label pill. Label
 * targets are always links, so the disc is also swollen to its "hot"
 * (48px, 24px radius) size whenever the pill is visible — the gap has
 * to clear that radius or the pill's near corner sits inside the disc.
 */
const LABEL_GAP = 20;

export interface CursorViewModel {
  /** False on touch / reduced-motion — the view renders nothing. */
  enabled: boolean;
  dotRef: React.RefObject<HTMLDivElement>;
  discRef: React.RefObject<HTMLDivElement>;
  labelRef: React.RefObject<HTMLDivElement>;
}

export function useCursor(): CursorViewModel {
  const dotRef = useRef<HTMLDivElement>(null);
  const discRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Decide once, then follow changes — a mouse gets plugged in, or the
  // OS "reduce motion" setting is toggled.
  useEffect(() => {
    const fine = window.matchMedia(FINE_POINTER);
    const reduce = window.matchMedia(REDUCED_MOTION);
    const sync = () => setEnabled(fine.matches && !reduce.matches);

    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  // Wire pointer tracking only while enabled and all nodes are mounted.
  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const disc = discRef.current;
    const label = labelRef.current;
    if (!dot || !disc || !label) return;
    const labelText = label.querySelector<HTMLElement>(".cursor__label-text");

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let discX = targetX;
    let discY = targetY;
    let visible = false;
    let frame = 0;
    let labelW = 0;
    let labelH = 0;

    const centre = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    };
    const setVisible = (next: boolean) => {
      if (next === visible) return;
      visible = next;
      dot.classList.toggle("is-visible", next);
      disc.classList.toggle("is-visible", next);
      if (!next) label.classList.remove("is-visible");
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      targetX = event.clientX;
      targetY = event.clientY;
      centre(dot, targetX, targetY);

      const el = event.target instanceof Element ? event.target : null;
      disc.classList.toggle("is-hot", !!el?.closest(INTERACTIVE));

      const host = el?.closest<HTMLElement>(LABEL_TARGET) ?? null;
      if (host) {
        const text = host.dataset.cursorLabel ?? "";
        if (labelText && labelText.textContent !== text) {
          labelText.textContent = text;
          labelW = label.offsetWidth;
          labelH = label.offsetHeight;
        }
        // Sit the pill just off the pointer, but flip it to the other
        // side / below when it would spill past a viewport edge, so it's
        // always fully readable — including in the rightmost tile column.
        const flipX = targetX + LABEL_GAP + labelW > window.innerWidth;
        const flipY = targetY - LABEL_GAP - labelH < 0;
        const offsetX = flipX ? `calc(-100% - ${LABEL_GAP}px)` : `${LABEL_GAP}px`;
        const offsetY = flipY ? `${LABEL_GAP}px` : `calc(-100% - ${LABEL_GAP}px)`;
        label.style.transform = `translate(${targetX}px, ${targetY}px) translate(${offsetX}, ${offsetY})`;
        label.classList.add("is-visible");
      } else {
        label.classList.remove("is-visible");
      }

      setVisible(true);
    };
    const onLeave = () => setVisible(false);

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      disc.classList.add("is-pressed");
    };
    // The disc compresses for the duration of the press — covers clicks
    // and drags alike (e.g. dragging out a text selection).
    const onUp = () => disc.classList.remove("is-pressed");

    const tick = () => {
      discX += (targetX - discX) * DISC_LERP;
      discY += (targetY - discY) * DISC_LERP;
      centre(disc, discX, discY);
      frame = requestAnimationFrame(tick);
    };

    document.body.classList.add("has-custom-cursor");
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("blur", onUp);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("blur", onUp);
      document.body.classList.remove("has-custom-cursor");
      for (const el of [dot, disc, label]) {
        el.style.transform = "";
        el.classList.remove("is-visible", "is-hot", "is-pressed");
      }
    };
  }, [enabled]);

  return { enabled, dotRef, discRef, labelRef };
}
