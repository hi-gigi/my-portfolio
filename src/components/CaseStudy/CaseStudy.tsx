import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { CaseStudyBlock, CaseStudyListItem, CaseStudyStat, Project } from "@/model/types";
import { ProjectCard } from "../ProjectCard";
import "./CaseStudy.less";

/**
 * Splits on `**bold**` markers and returns plain strings interleaved
 * with `<strong>` nodes — the only inline markup case-study copy
 * supports, for calling out a phrase mid-paragraph without breaking
 * it into a separate block.
 */
function renderInlineText(text: string): ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  if (parts.length === 1) return text;

  return parts.map((part, index) =>
    index % 2 === 1 ? <strong key={index}>{part}</strong> : part,
  );
}

interface CaseStudyProps {
  project: Project;
  blocks: CaseStudyBlock[];
  /** Curated picks shown as "More work" at the bottom of the page. */
  otherProjects: Project[];
}

/**
 * One case study, rendered as a single reading column: header (from
 * the matching Project) then every block in order. Layout is
 * deliberately plain for now — text and images, one column; a real
 * layout pass comes later.
 */
export function CaseStudy({ project, blocks, otherProjects }: CaseStudyProps) {
  const leadsWithMedia = blocks[0]?.kind === "image" || blocks[0]?.kind === "video";

  return (
    <article className="case-study">
      <header className={leadsWithMedia ? "case-study-intro case-study-intro--tight" : "case-study-intro"}>

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
          <h2 className="section-title">Explore more work</h2>
          <div className="case-study-more-grid">
            {otherProjects.map((otherProject) => (
              <ProjectCard key={otherProject.id} project={otherProject} />
            ))}
            <Link to="/#work" className="case-study-more-back btn btn-secondary">
              ← View all work
            </Link>
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

    case "paragraph": {
      const classes = [
        block.emphasis && "case-study-emphasis",
        block.continuation && "case-study-continuation",
      ].filter(Boolean).join(" ");
      return <p className={classes || undefined}>{renderInlineText(block.text)}</p>;
    }

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
        <div className="case-study-media-frame">
          <img src={block.src} alt={block.alt} loading="lazy" decoding="async" />
        </div>
      ) : (
        <div className="case-study-media-placeholder" role="img" aria-label={block.alt}>
          <span>{block.alt}</span>
        </div>
      );

    case "video":
      return block.src ? (
        <div className="case-study-media-frame">
          <video src={block.src} controls playsInline preload="metadata" aria-label={block.alt} />
        </div>
      ) : (
        <div className="case-study-media-placeholder" role="img" aria-label={block.alt}>
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
    return <li>{renderInlineText(item)}</li>;
  }
  return (
    <li>
      <strong>{item.label}</strong> — {item.text}
    </li>
  );
}
