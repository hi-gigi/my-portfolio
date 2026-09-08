import type { WorkContent } from "@/model/types";
import { ProjectCard } from "../ProjectCard";
import "./Work.less";

export function Work({ title, groups }: WorkContent) {
  return (
    <section id="work" className="work">
      <h2 className="section-title">{title}</h2>

      {groups.map((group, index) => (
        <div key={group.label || index} className="work-group">
          {group.label && (
            <h3 className="work-group-title">{group.label}</h3>
          )}
          <div className="card-grid">
            {group.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
