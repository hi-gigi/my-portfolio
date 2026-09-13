import type { MotionSandboxContent, MotionSwatch } from "@/model/types";
import { useMagneticHover, useScrollReveal } from "./MotionSandbox.presenter";
import "./MotionSandbox.less";

interface MotionSandboxProps {
  content: MotionSandboxContent;
}

/** A grid of self-contained interaction swatches — each one isolates a single technique already live somewhere else on this site. */
export function MotionSandbox({ content }: MotionSandboxProps) {
  return (
    <div className="motion-sandbox">
      <div className="motion-sandbox-grid">
        {content.swatches.map((swatch) => (
          <MotionSwatchCard key={swatch.id} swatch={swatch} />
        ))}
      </div>
      <p className="playground-caption">{content.caption}</p>
    </div>
  );
}

function MotionSwatchCard({ swatch }: { swatch: MotionSwatch }) {
  return (
    <div className="motion-swatch">
      <div className="motion-swatch-stage">
        <MotionSwatchDemo id={swatch.id} />
      </div>
      <p className="motion-swatch-name">{swatch.name}</p>
      <p className="motion-swatch-technique">{swatch.technique}</p>
      <p className="motion-swatch-description">{swatch.description}</p>
    </div>
  );
}

function MotionSwatchDemo({ id }: { id: string }) {
  switch (id) {
    case "magnetic":
      return <MagneticDemo />;
    case "reveal":
      return <RevealDemo />;
    case "press":
      return <PressDemo />;
    case "ring":
      return <RingDemo />;
    default:
      return null;
  }
}

function MagneticDemo() {
  const { ref, offset, onMouseMove, onMouseLeave } = useMagneticHover();
  return (
    <div
      ref={ref}
      className="motion-magnetic-field"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <span
        className="motion-magnetic-dot"
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      />
    </div>
  );
}

function RevealDemo() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div className="motion-reveal-stage" ref={ref}>
      <div className={isVisible ? "motion-reveal-card is-visible" : "motion-reveal-card"}>
        Scroll me into view
      </div>
    </div>
  );
}

function PressDemo() {
  return (
    <button type="button" className="btn btn-primary">
      Press and hold
    </button>
  );
}

function RingDemo() {
  return (
    <div className="motion-ring-tile">
      <span>Hover</span>
    </div>
  );
}
