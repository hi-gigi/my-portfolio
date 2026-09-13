import { Link } from "react-router-dom";
import { playgroundContent } from "@/model/playground";
import { BuildProcess } from "./BuildProcess";
import { DesignExplorer } from "./DesignExplorer";
import { MotionSandbox } from "./MotionSandbox";
import { usePlaygroundNav } from "./Playground.presenter";
import "./PlaygroundPage.less";

/**
 * Standalone page at /playground — three modules under one thesis
 * ("same system, three lenses"): the design tokens, the motion
 * layer, and the AI workflow behind both. Uses the site's normal
 * sticky `Header` (it isn't a case study), plus its own sticky
 * anchor-scroll tabs docked just beneath it.
 */
export function PlaygroundPage() {
  const { eyebrow, lede, nav, designExplorer, motionSandbox, buildProcess, closing } =
    playgroundContent;
  const sectionIds = nav.map((item) => item.id);
  const { activeId } = usePlaygroundNav(sectionIds);

  return (
    <>
      <section className="playground-intro">
        <p className="playground-eyebrow">{eyebrow}</p>
        <p className="playground-lede">{lede}</p>
      </section>

      <nav className="playground-tabs" aria-label="Playground sections">
        <div className="playground-tabs-inner">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={item.id === activeId ? "is-active" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <section id="design" className="playground-module">
        <h2 className="section-title">Design system explorer</h2>
        <DesignExplorer content={designExplorer} />
      </section>

      <section id="motion" className="playground-module">
        <h2 className="section-title">Motion &amp; interaction sandbox</h2>
        <MotionSandbox content={motionSandbox} />
      </section>

      <section id="process" className="playground-module">
        <h2 className="section-title">AI build-process replay</h2>
        <BuildProcess content={buildProcess} />
      </section>

      <section className="playground-closing">
        <h2>{closing.heading}</h2>
        <p>{closing.body}</p>
        <div className="playground-closing-actions">
          <Link className="btn btn-primary" to={closing.workLink.href}>
            {closing.workLink.label}
          </Link>
          <a className="btn btn-secondary" href={closing.contactLink.href}>
            {closing.contactLink.label}
          </a>
        </div>
      </section>
    </>
  );
}
