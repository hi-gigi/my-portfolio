import type { Project } from "@/model/types";
import "./ProjectCard.less";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, blurb, role, year, imageUrl } = project;

  return (
    <article className="card">
      <div className="card-media" aria-hidden={imageUrl ? undefined : true}>
        {imageUrl && <img src={imageUrl} alt="" />}
      </div>
      <div className="card-body">
        <h3>{title}</h3>
        <p>{blurb}</p>
        <p className="card-meta">
          Role: {role} &middot; {year}
        </p>
      </div>
    </article>
  );
}
