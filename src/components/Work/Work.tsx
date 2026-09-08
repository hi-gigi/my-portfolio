import type { WorkContent } from "@/model/types";
import { ProjectCard } from "../ProjectCard";
import "./Work.less";

export function Work({ title, projects }: WorkContent) {
  return (
    <section id="work" className="work">
      <h2 className="section-title">{title}</h2>
      <div className="card-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
