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
 * model/content.ts) is what drives the "Coming soon" cursor label and
 * title prefix — no other wiring needed to mark a future project this
 * way. `wip` is the lighter-weight sibling: the case study is live and
 * linked, just flagged as still being finished, via an extra tag and
 * a swapped-in cursor label instead of going inert.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const { id, title, blurb, labels, image, video, comingSoon, wip, mediaBleed, mediaPadding } =
    project;
  const { ref, play, pause } = useCardVideo();
  const hasMedia = Boolean(image || video);
  const hasCaseStudy = Boolean(getCaseStudy(id));

  const mediaClassName = [
    "card-media",
    mediaBleed && `card-media--bleed-${mediaBleed}`,
    mediaPadding && `card-media--padding-${mediaPadding}`,
  ]
    .filter(Boolean)
    .join(" ");

  const media = (
    <div className={mediaClassName} aria-hidden={hasMedia ? undefined : true}>
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
      {(labels.length > 0 || wip) && (
        <ul className="card-labels">
          {wip && <li className="card-label-wip">Work in progress</li>}
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
        data-cursor-label={wip ? "Work in progress" : "View case study"}
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
      className="card"
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
