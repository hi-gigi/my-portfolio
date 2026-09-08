// ============================================================
//  PRESENTER — header
//  Composes the shared theme + nav-menu presenters into the
//  single view-model the Header view consumes.
// ============================================================

import { useNavMenu, type NavMenuViewModel } from "@/presenters/useNavMenu";
import { useTheme, type ThemeViewModel } from "@/presenters/useTheme";

export interface HeaderViewModel {
  theme: ThemeViewModel;
  menu: NavMenuViewModel;
}

export function useHeaderPresenter(): HeaderViewModel {
  return {
    theme: useTheme(),
    menu: useNavMenu(),
  };
}
