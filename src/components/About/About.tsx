import type { AboutContent } from "@/model/types";
import "./About.less";

export function About({ title, name, pronunciation, body }: AboutContent) {
  return (
    <section id="about" className="about">
      <h2 className="section-title">{title}</h2>

      <h3 className="about-name">
        I'm {name}
        {pronunciation && (
          <span className="about-pronunciation">{pronunciation}</span>
        )}
      </h3>

      {body.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </section>
  );
}
