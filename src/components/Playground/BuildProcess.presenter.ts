// ============================================================
//  PRESENTER — build-process stepper state
// ============================================================

import { useState } from "react";

export function useBuildProcess(stepCount: number) {
  const [index, setIndex] = useState(0);
  const clamp = (value: number) => Math.min(Math.max(value, 0), stepCount - 1);

  return {
    index,
    goTo: (value: number) => setIndex(clamp(value)),
    next: () => setIndex((value) => clamp(value + 1)),
    prev: () => setIndex((value) => clamp(value - 1)),
    isFirst: index === 0,
    isLast: index === stepCount - 1,
  };
}
