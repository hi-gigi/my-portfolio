import { useCallback, useRef } from "react";

/**
 * Hover-to-play behaviour for a project card's optional video loop.
 * The view hands `ref` to the <video> and wires `play` / `pause` to
 * pointer enter / leave. Both no-op when the visitor prefers reduced
 * motion, so the poster frame stays put.
 */
export function useCardVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  const play = useCallback(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    void video.play().catch(() => {
      /* autoplay can be refused; the poster frame is a fine fallback */
    });
  }, []);

  const pause = useCallback(() => {
    const video = ref.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, []);

  return { ref, play, pause };
}
