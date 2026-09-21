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
          <div className="case-study-more-head">
            <h2 className="section-title">Explore more work</h2>
            <Link to="/#work" className="btn btn-secondary">
              ← View all work
            </Link>
          </div>
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

    case "paragraph": {
      const classes = [
        block.emphasis && "case-study-emphasis",
        block.continuation && "case-study-continuation",
      ].filter(Boolean).join(" ");
      return <p className={classes || undefined}>{renderInlineText(block.text)}</p>;
    }

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      const hasIcons = block.items.some((item) => typeof item === "object" && "icon" in item);
      return (
        <ListTag className={hasIcons ? "case-study-list-icon" : undefined}>
          {block.items.map((item, index) => (
            <ListItem key={index} item={item} />
          ))}
        </ListTag>
      );
    }

    case "split":
      return (
        <div className="case-study-split">
          <div className="case-study-split-main">
            {block.content.map((text, index) => (
              <p key={index}>{renderInlineText(text)}</p>
            ))}
            <div className="case-study-split-timeline">
              <h3 className="case-study-split-label">Timeline</h3>
              <div className="case-study-stepper">
                {block.timeline.map((step, index) => (
                  <p className="case-study-step" key={index}>
                    <span className="case-study-step-date">{step.date}</span>
                    {step.label}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <aside className="case-study-split-sidebar">
            <div className="case-study-split-block">
              <h3 className="case-study-split-label">My role</h3>
              <p className="case-study-split-role-title">
                <strong>{block.sidebar.role.title}</strong>
              </p>
              <ul className="case-study-split-role-list">
                {block.sidebar.role.items.map((item, index) => (
                  <li key={index}>{renderInlineText(item)}</li>
                ))}
              </ul>
            </div>
            <div className="case-study-split-block">
              <h3 className="case-study-split-label">Collaborators</h3>
              <div className="case-study-split-team-list">
                {block.sidebar.collaborators.map((collaborator, index) => (
                  <div className="case-study-split-team" key={index}>
                    <p className="case-study-split-team-name">
                      <strong>{collaborator.name}</strong>
                    </p>
                    {collaborator.tag && (
                      <p className="case-study-split-team-tag">{collaborator.tag}</p>
                    )}
                    <p className="case-study-split-team-text">{renderInlineText(collaborator.text)}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      );

    case "beats":
      return (
        <div className="case-study-beats">
          {block.items.map((beat, index) =>
            beat.conclusion ? (
              <div className="case-study-beat-conclusion" key={index}>
                <p className="case-study-beat-body">
                  <strong>{renderInlineText(beat.text)}</strong>
                </p>
              </div>
            ) : (
              <div className="case-study-beat" key={index}>
                <span className="case-study-beat-num">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  {beat.label && (
                    <p className="case-study-beat-label">
                      <strong>{beat.label}</strong>
                    </p>
                  )}
                  <p className="case-study-beat-body">{renderInlineText(beat.text)}</p>
                  {beat.cite && <div className="case-study-beat-cite">{renderInlineText(beat.cite)}</div>}
                </div>
              </div>
            ),
          )}
        </div>
      );

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
          <video
            src={block.src}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label={block.alt}
          />
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
  if ("icon" in item) {
    return (
      <li className="case-study-list-icon-item">
        <span className="case-study-list-icon-tile">
          <img src={item.icon} alt="" loading="lazy" decoding="async" />
        </span>
        <span className="case-study-list-icon-text">{renderInlineText(item.text)}</span>
      </li>
    );
  }
  return (
    <li>
      <strong>{item.label}</strong> — {item.text}
    </li>
  );
}
