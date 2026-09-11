import { Navigate, useParams } from "react-router-dom";
import { findProject } from "@/model/content";
import { getCaseStudy } from "@/model/caseStudies";
import { CaseStudy } from "./CaseStudy";

/** Route element for `/work/:id` — looks up the project + case study by id. */
export function CaseStudyPage() {
  const { id } = useParams<{ id: string }>();
  const project = id ? findProject(id) : undefined;
  const caseStudy = id ? getCaseStudy(id) : undefined;

  if (!project || !caseStudy) {
    return <Navigate to="/" replace />;
  }

  return <CaseStudy project={project} blocks={caseStudy.blocks} />;
}
