// ============================================================
//  MODEL — case studies index
//  One file per case study (this dir), keyed by Project.id here.
//  Split out from content.ts because a single case study runs to
//  hundreds of lines — keeping content.ts as the index of everything
//  else stays readable this way.
// ============================================================

import type { CaseStudyContent } from "../types";
import { aiSearch } from "./ai-search";

export const caseStudies: Record<string, CaseStudyContent> = {
  [aiSearch.id]: aiSearch,
};

export function getCaseStudy(id: string): CaseStudyContent | undefined {
  return caseStudies[id];
}
