import type { BuildProcessContent } from "@/model/types";
import { useBuildProcess } from "./BuildProcess.presenter";
import "./BuildProcess.less";

interface BuildProcessProps {
  content: BuildProcessContent;
}

/** A horizontal stepper over real prompt → first-pass output → shipped-edit steps, pulled from this repo's own history. */
export function BuildProcess({ content }: BuildProcessProps) {
  const { steps } = content;
  const { index, goTo, next, prev, isFirst, isLast } = useBuildProcess(steps.length);
  const step = steps[index];

  return (
    <div className="build-process">
      <div className="build-process-scrubber" role="tablist" aria-label="Build steps">
        {steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={i === index ? "build-process-step is-active" : "build-process-step"}
            onClick={() => goTo(i)}
          >
            <span className="build-process-step-index">{String(i + 1).padStart(2, "0")}</span>
            <span className="build-process-step-title">{s.title}</span>
          </button>
        ))}
      </div>

      <div className="build-process-detail">
        <p className="build-process-label">Prompt</p>
        <p className="build-process-prompt">&ldquo;{step.prompt}&rdquo;</p>

        <p className="build-process-label">{step.outputLabel}</p>
        <pre className="build-process-output">
          <code>{step.output}</code>
        </pre>

        <p className="build-process-label">What I changed</p>
        <p className="build-process-edit">{step.edit}</p>

        <p className="build-process-rationale">{step.rationale}</p>
      </div>

      <div className="build-process-nav">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={prev}
          disabled={isFirst}
        >
          ← Previous
        </button>
        <span className="build-process-nav-count">
          {index + 1} / {steps.length}
        </span>
        <button type="button" className="btn btn-secondary" onClick={next} disabled={isLast}>
          Next →
        </button>
      </div>

      <p className="playground-caption">{content.caption}</p>
    </div>
  );
}
