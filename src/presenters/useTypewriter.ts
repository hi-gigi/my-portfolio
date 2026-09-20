// ============================================================
//  PRESENTER — useTypewriter
//  Types each word out, holds, deletes it, then moves to the next
//  (looping). Returns the text visible right now, or `null` when the
//  visitor prefers reduced motion so the view can render static copy.
// ============================================================

import { useEffect, useState } from "react";

const TYPE_MS = 70;
const DELETE_MS = 40;
const HOLD_MS = 1600; // full word on screen
const PAUSE_MS = 300; // empty, before the next word
const START_MS = 400;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useTypewriter(words: readonly string[]): string | null {
  const [reduced] = useState(prefersReducedMotion);
  const [text, setText] = useState("");

  useEffect(() => {
    if (reduced || words.length === 0) return;

    let wordIndex = 0;
    let length = 0;
    let deleting = false;
    let timer: number;

    const tick = () => {
      const word = words[wordIndex];

      if (!deleting) {
        length += 1;
        setText(word.slice(0, length));
        if (length === word.length) {
          deleting = true;
          timer = window.setTimeout(tick, HOLD_MS);
          return;
        }
        timer = window.setTimeout(tick, TYPE_MS);
        return;
      }

      length -= 1;
      setText(word.slice(0, length));
      if (length === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        timer = window.setTimeout(tick, PAUSE_MS);
        return;
      }
      timer = window.setTimeout(tick, DELETE_MS);
    };

    timer = window.setTimeout(tick, START_MS);
    return () => window.clearTimeout(timer);
  }, [words, reduced]);

  return reduced ? null : text;
}
