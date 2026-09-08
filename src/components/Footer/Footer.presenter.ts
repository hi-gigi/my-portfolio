// ============================================================
//  PRESENTER — footer
//  Trivial today (just the current year), but keeps the view free
//  of `new Date()` and gives the footer a seam for future logic.
// ============================================================

export interface FooterViewModel {
  year: number;
}

export function useFooterPresenter(): FooterViewModel {
  return { year: new Date().getFullYear() };
}
