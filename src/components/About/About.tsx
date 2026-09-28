import type { AboutContent } from "@/model/types";
import "./About.less";

export function About({
  title,
  name,
  pronunciation,
  photo,
  intro,
  sections,
}: AboutContent) {
  return (
    <section id="about" className="about">
      <h2 className="section-title">{title}</h2>

      <div className="about-layout">
        <img
          className="about-photo"
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
        />

        <div className="about-copy">
          <h3 className="about-name">
            I'm {name}
            {pronunciation && (
              <span className="about-pronunciation">{pronunciation}</span>
            )}
          </h3>

          <p className="about-intro">
            {intro.map((part, i) =>
              typeof part === "string" ? (
                <span key={i}>{part}</span>
              ) : (
                <a
                  key={i}
                  href={part.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {part.text}
                </a>
              ),
            )}
          </p>

          {sections.map((section) => (
            <div key={section.heading} className="about-section">
              <h4 className="about-heading">{section.heading}</h4>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
