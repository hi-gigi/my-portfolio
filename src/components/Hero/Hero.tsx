import { Fragment } from "react";
import type { HeroContent } from "@/model/types";
import "./Hero.less";

export function Hero({ eyebrow, headline, lede, actions }: HeroContent) {
  return (
    <section id="intro" className="intro">
      <p className="eyebrow">{eyebrow}</p>

      <h1>{headline}</h1>

      <p className="lede">
        {lede.map((line, index) => (
          <Fragment key={line}>
            {index > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </p>

      <div className="intro-actions">
        {actions.map((action) => (
          <a
            key={action.href}
            className={`btn btn-${action.variant}`}
            href={action.href}
          >
            {action.label}
          </a>
        ))}
      </div>
    </section>
  );
}
