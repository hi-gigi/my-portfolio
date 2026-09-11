// ============================================================
//  PRESENTER — header
//  Composes the shared theme + nav-menu presenters into the
//  single view-model the Header view consumes.
// ============================================================

import { useMatch } from "react-router-dom";
import { getCaseStudySections } from "@/model/caseStudies";
import type { NavItem } from "@/model/types";
import { useNavMenu, type NavMenuViewModel } from "@/presenters/useNavMenu";
import { useTheme, type ThemeViewModel } from "@/presenters/useTheme";

export interface HeaderViewModel {
  theme: ThemeViewModel;
  menu: NavMenuViewModel;
  /** Site nav on most pages; swapped for back-to-work + in-page section
   *  jump links while a case study is open. */
  nav: NavItem[];
}

export function useHeaderPresenter(siteNav: NavItem[]): HeaderViewModel {
  const caseStudyMatch = useMatch("/work/:id");
  const caseStudyId = caseStudyMatch?.params.id;

  const nav: NavItem[] = caseStudyId
    ? [
        { label: "← Back to work", href: "/#work" },
        ...getCaseStudySections(caseStudyId).map((section) => ({
          label: section.label,
          href: `#${section.id}`,
        })),
      ]
    : siteNav;

  return {
    theme: useTheme(),
    menu: useNavMenu(),
    nav,
  };
}
