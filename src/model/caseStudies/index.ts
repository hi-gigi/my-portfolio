// ============================================================
//  MODEL — case studies index
//  One file per case study (this dir), keyed by Project.id here.
//  Split out from content.ts because a single case study runs to
//  hundreds of lines — keeping content.ts as the index of everything
//  else stays readable this way.
// ============================================================

import type { CaseStudyBlock, CaseStudyContent } from "../types";
import { aiSearch } from "./ai-search";

function isHeading(
  block: CaseStudyBlock,
): block is Extract<CaseStudyBlock, { kind: "heading" }> {
  return block.kind === "heading";
}

export const caseStudies: Record<string, CaseStudyContent> = {
  [aiSearch.id]: aiSearch,
};

export function getCaseStudy(id: string): CaseStudyContent | undefined {
  return caseStudies[id];
}

/** In-page jump targets for a case study's header nav, in reading order. */
export function getCaseStudySections(
  id: string,
): { id: string; label: string }[] {
  const caseStudy = caseStudies[id];
  if (!caseStudy) return [];

  return caseStudy.blocks
    .filter(isHeading)
    .map((block) => ({ id: block.id, label: block.navLabel ?? block.text }));
}
