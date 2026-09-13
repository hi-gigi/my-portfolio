import type { DesignExplorerContent } from "@/model/types";
import { useDesignExplorer } from "./DesignExplorer.presenter";
import "./DesignExplorer.less";

interface DesignExplorerProps {
  content: DesignExplorerContent;
}

/**
 * Left: three range inputs bound to real `--pg-*` custom properties.
 * Right: a button, a badge, and a card reading those same properties
 * live — the point being that a token change reaches every component
 * at once, with no rebuild.
 */
export function DesignExplorer({ content }: DesignExplorerProps) {
  const { values, setValue, style } = useDesignExplorer(content.controls);

  return (
    <div className="design-explorer">
      <div className="design-explorer-controls">
        {content.controls.map((control) => (
          <label key={control.id} className="design-explorer-control">
            <span className="design-explorer-control-label">
              {control.label}
              <span className="design-explorer-control-value">
                {values[control.id]}
                {control.unit}
              </span>
            </span>
            <input
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={values[control.id]}
              onChange={(event) => setValue(control.id, Number(event.target.value))}
            />
          </label>
        ))}
      </div>

      <div className="design-explorer-preview" style={style}>
        <div className="design-explorer-preview-row">
          <button type="button" className="btn btn-primary">
            Primary
          </button>
          <button type="button" className="btn btn-secondary">
            Secondary
          </button>
          <span className="badge">Badge</span>
        </div>

        <div className="pg-card">
          <p className="pg-card-eyebrow">Card</p>
          <p className="pg-card-title">Same tokens, new values</p>
          <p className="pg-card-body">
            Drag a control — the button, badge, and card above all read from
            the same three custom properties.
          </p>
        </div>
      </div>

      <p className="playground-caption">{content.caption}</p>
    </div>
  );
}
