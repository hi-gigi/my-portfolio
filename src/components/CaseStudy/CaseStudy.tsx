import type { CaseStudyBlock, CaseStudyListItem, Project } from "@/model/types";
import { ProjectCard } from "../ProjectCard";
import "./CaseStudy.less";

interface CaseStudyProps {
  project: Project;
  blocks: CaseStudyBlock[];
  /** Shown as "More work" at the bottom of the page. */
  otherProjects: Project[];
}

/**
 * One case study, rendered as a single reading column: header (from
 * the matching Project) then every block in order. Layout is
 * deliberately plain for now — text and images, one column; a real
 * layout pass comes later.
 */
export function CaseStudy({ project, blocks, otherProjects }: CaseStudyProps) {
  return (
    <article className="case-study">
      <header className="case-study-intro">
        {project.labels.length > 0 && (
          <p className="case-study-eyebrow">{project.labels.join(" · ")}</p>
        )}
        <h1>{project.title}</h1>
        <p className="case-study-lede">{project.blurb}</p>
      </header>

      <div className="case-study-body">
        {blocks.map((block, index) => (
          <CaseStudyBlockView key={index} block={block} />
        ))}
      </div>

      {otherProjects.length > 0 && (
        <section className="case-study-more">
          <h2 className="section-title">More work</h2>
          <div className="case-study-more-grid">
            {otherProjects.map((otherProject) => (
              <ProjectCard key={otherProject.id} project={otherProject} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

function CaseStudyBlockView({ block }: { block: CaseStudyBlock }) {
  switch (block.kind) {
    case "heading":
      return <h2 id={block.id}>{block.text}</h2>;

    case "subheading":
      return <h3>{block.text}</h3>;

    case "paragraph":
      return <p>{block.text}</p>;

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      return (
        <ListTag>
          {block.items.map((item, index) => (
            <ListItem key={index} item={item} />
          ))}
        </ListTag>
      );
    }

    case "image":
      return block.src ? (
        <img src={block.src} alt={block.alt} loading="lazy" decoding="async" />
      ) : (
        <div className="case-study-image-placeholder" role="img" aria-label={block.alt}>
          <span>{block.alt}</span>
        </div>
      );
  }
}

function ListItem({ item }: { item: CaseStudyListItem }) {
  if (typeof item === "string") {
    return <li>{item}</li>;
  }
  return (
    <li>
      <strong>{item.label}</strong> — {item.text}
    </li>
  );
}
