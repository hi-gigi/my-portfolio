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
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const { title, blurb, labels, image, video } = project;
  const { ref, play, pause } = useCardVideo();
  const hasMedia = Boolean(image || video);

  return (
    <article
      className="card"
      onMouseEnter={video ? play : undefined}
      onMouseLeave={video ? pause : undefined}
    >
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
          <img src={image} alt="" />
        ) : null}
      </div>

      <div className="card-body">
        <h3>{title}</h3>
        <p>{blurb}</p>
        {labels.length > 0 && (
          <ul className="card-labels">
            {labels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
