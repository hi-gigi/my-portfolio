import { Link } from "react-router-dom";
import type { CaseStudyBlock, CaseStudyListItem, Project } from "@/model/types";
import "./CaseStudy.less";

interface CaseStudyProps {
  project: Project;
  blocks: CaseStudyBlock[];
}

/**
 * One case study, rendered as a single reading column: header (from
 * the matching Project) then every block in order. Layout is
 * deliberately plain for now — text and images, one column; a real
 * layout pass comes later.
 */
export function CaseStudy({ project, blocks }: CaseStudyProps) {
  return (
    <article className="case-study">
      <Link to="/#work" className="case-study-back">
        ← Back to work
      </Link>

      <header className="case-study-header">
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
