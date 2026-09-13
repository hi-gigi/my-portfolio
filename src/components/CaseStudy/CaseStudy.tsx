import type { CaseStudyBlock, CaseStudyListItem, CaseStudyStat, Project } from "@/model/types";
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

    case "subsubheading":
      return <h4>{block.text}</h4>;

    case "paragraph":
      return (
        <p className={block.emphasis ? "case-study-emphasis" : undefined}>
          {block.text}
        </p>
      );

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

    case "stats":
      return (
        <div className="case-study-stats">
          {block.period && <p className="case-study-stats-period">{block.period}</p>}
          <div className="case-study-stats-grid">
            {block.items.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
          {block.note && <p className="case-study-stats-note">{block.note}</p>}
        </div>
      );
  }
}

function StatCard({ stat }: { stat: CaseStudyStat }) {
  return (
    <div className="case-study-stat">
      <p className="case-study-stat-label">{stat.label}</p>
      <p className="case-study-stat-value">{stat.value}</p>
      {stat.description && <p className="case-study-stat-description">{stat.description}</p>}
      {stat.details && stat.details.length > 0 && (
        <dl className="case-study-stat-details">
          {stat.details.map((detail, index) => (
            <div className="case-study-stat-detail-row" key={index}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
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
