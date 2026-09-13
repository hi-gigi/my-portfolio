import { Link } from "react-router-dom";
import { getCaseStudy } from "@/model/caseStudies";
import type { Project } from "@/model/types";
import { useCardVideo } from "./ProjectCard.presenter";
import "./ProjectCard.less";

interface ProjectCardProps {
  project: Project;
}

/**
 * A single project tile. Order, top to bottom:
 *   1. thumbnail  — inset from the card edge; static image (hover-zoom)
 *      or a hover-play video loop
 *   2. title
 *   3. description
 *   4. labels
 *
 * Renders as a link to the case study when one exists (`caseStudies`),
 * otherwise as an inert tile. Setting `comingSoon` on the project (see
 * model/content.ts) is what drives the "Coming soon" cursor label,
 * title prefix, and flat hover ring — no other wiring needed to mark
 * a future project this way.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const { id, title, blurb, labels, image, video, comingSoon } = project;
  const { ref, play, pause } = useCardVideo();
  const hasMedia = Boolean(image || video);
  const hasCaseStudy = Boolean(getCaseStudy(id));

  const media = (
    <div className="card-media" aria-hidden={hasMedia ? undefined : true}>
      {video ? (
        <video
          ref={ref}
          src={video}
          poster={image}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : image ? (
        <img src={image} alt="" loading="lazy" decoding="async" />
      ) : null}
    </div>
  );

  const body = (
    <div className="card-body">
      <h4>{comingSoon ? `(Coming soon) ${title}` : title}</h4>
      <p>{blurb}</p>
      {labels.length > 0 && (
        <ul className="card-labels">
          {labels.map((label) => (
            <li key={label}>{label}</li>
          ))}
        </ul>
      )}
    </div>
  );

  if (hasCaseStudy) {
    return (
      <Link
        to={`/work/${id}`}
        className="card"
        data-cursor-label="View case study"
        onMouseEnter={video ? play : undefined}
        onMouseLeave={video ? pause : undefined}
      >
        {media}
        {body}
      </Link>
    );
  }

  return (
    <article
      className={comingSoon ? "card card--coming-soon" : "card"}
      data-cursor-label={comingSoon ? "Coming soon" : undefined}
      data-cursor-arrow={comingSoon ? "false" : undefined}
      onMouseEnter={video ? play : undefined}
      onMouseLeave={video ? pause : undefined}
    >
      {media}
      {body}
    </article>
  );
}
