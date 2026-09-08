import type { AboutContent } from "@/model/types";
import "./About.less";

export function About({ title, body }: AboutContent) {
  return (
    <section id="about" className="about">
      <h2 className="section-title">{title}</h2>
      <p>{body}</p>
    </section>
  );
}
