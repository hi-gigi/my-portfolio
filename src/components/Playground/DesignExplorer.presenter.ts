// ============================================================
//  PRESENTER — design explorer control state
//  Holds the three slider values and derives the `--pg-*` custom
//  properties from them. The preview panel reads only these CSS
//  variables — no rebuild, no LESS recompile — which is the whole
//  point being demonstrated.
// ============================================================

import { useState } from "react";
import type { DesignExplorerControl } from "@/model/types";

export interface DesignExplorerViewModel {
  values: Record<string, number>;
  setValue: (id: string, value: number) => void;
  /** Spread onto the preview panel's root element. */
  style: React.CSSProperties;
}

export function useDesignExplorer(
  controls: DesignExplorerControl[],
): DesignExplorerViewModel {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(controls.map((control) => [control.id, control.default])),
  );

  const setValue = (id: string, value: number) =>
    setValues((prev) => ({ ...prev, [id]: value }));

  // Saturation/lightness stay fixed so the hue slider reskins the
  // accent without ever landing on something illegible or off-brand
  // dull; only the hue itself — the one thing distinguishing "coral"
  // from any other option — moves.
  const style = {
    "--pg-accent": `hsl(${values.hue} 90% 74%)`,
    "--pg-accent-text": `hsl(${values.hue} 40% 14%)`,
    "--pg-radius": `${values.radius}px`,
    "--pg-scale": values.scale / 100,
  } as React.CSSProperties;

  return { values, setValue, style };
}
