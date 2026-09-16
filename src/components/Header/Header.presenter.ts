// ============================================================
//  PRESENTER — header
//  Composes the shared theme + nav-menu presenters into the
//  single view-model the Header view consumes.
// ============================================================

import { useNavMenu, type NavMenuViewModel } from "@/presenters/useNavMenu";
import { useScrolled } from "@/presenters/useScrolled";
import { useTheme, type ThemeViewModel } from "@/presenters/useTheme";

export interface HeaderViewModel {
  theme: ThemeViewModel;
  menu: NavMenuViewModel;
  /** Past the top of the page — the header's divider only shows once this is true. */
  scrolled: boolean;
}

export function useHeaderPresenter(): HeaderViewModel {
  return {
    theme: useTheme(),
    menu: useNavMenu(),
    scrolled: useScrolled(),
  };
}
