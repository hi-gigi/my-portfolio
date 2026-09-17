import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCaseStudySections } from "@/model/caseStudies";
import { useActiveSection } from "@/presenters/useActiveSection";
import { useNavMenu } from "@/presenters/useNavMenu";
import { useOverflowNav } from "@/presenters/useOverflowNav";
import { useScrolled } from "@/presenters/useScrolled";
import { useTheme } from "@/presenters/useTheme";
import { ThemeToggle } from "../ThemeToggle";
import { CloseIcon, HamburgerIcon } from "../icons";
import "./CaseStudyHeader.less";

interface CaseStudyHeaderProps {
  caseStudyId: string;
}

const SECTIONS_ID = "case-study-sections";

/**
 * The header shown while a case study is open — a separate bar from
 * the site's main `Header`, not a variant of it. No wordmark, no
 * Résumé CTA. Left: back link + theme toggle. Right: this case
 * study's own section links
 * (from its heading blocks). Case studies vary from 4 to 6 sections
 * with labels of different lengths, so whether the row fits is
 * measured directly (useOverflowNav) rather than assumed from a
 * single viewport breakpoint — it collapses into a hamburger
 * dropdown only when the labels actually don't fit.
 */
export function CaseStudyHeader({ caseStudyId }: CaseStudyHeaderProps) {
  const theme = useTheme();
  const { pathname, hash } = useLocation();
  const sections = getCaseStudySections(caseStudyId);
  const activeId = useActiveSection(
    sections.map((section) => section.id),
    hash ? decodeURIComponent(hash.slice(1)) : undefined,
  );
  const menu = useNavMenu();
  const { isCollapsed, containerRef, siblingRef, measureRef } = useOverflowNav(
    sections.map((section) => section.label).join("|"),
  );
  const scrolled = useScrolled();

  // The dropdown-only state (open/closed) is meaningless once the row no
  // longer needs a hamburger — drop it so it can't reappear stale next
  // time the row actually collapses.
  useEffect(() => {
    if (!isCollapsed) menu.close();
  }, [isCollapsed, menu.close]);

  return (
    <header className="case-study-header" data-scrolled={scrolled || undefined}>
      <div
        ref={containerRef}
        className={
          isCollapsed
            ? "case-study-header-inner is-nav-collapsed"
            : "case-study-header-inner"
        }
      >
        <div className="case-study-header-left" ref={siblingRef}>
          <Link to="/#work" className="case-study-header-back">
            ← Back to work
          </Link>
          <ThemeToggle isDark={theme.isDark} onToggle={theme.toggle} />
        </div>

        {sections.length > 0 && (
          <>
            {isCollapsed && (
              <button
                type="button"
                className="case-study-nav-toggle"
                aria-label={menu.isOpen ? "Close section menu" : "Open section menu"}
                aria-expanded={menu.isOpen}
                aria-controls={SECTIONS_ID}
                ref={menu.triggerRef}
                onClick={menu.toggle}
              >
                {menu.isOpen ? <CloseIcon /> : <HamburgerIcon />}
              </button>
            )}

            <nav
              id={SECTIONS_ID}
              ref={menu.containerRef}
              className={
                isCollapsed && menu.isOpen
                  ? "case-study-header-sections is-open"
                  : "case-study-header-sections"
              }
              aria-label="Case study sections"
            >
              {sections.map((section) => (
                <Link
                  key={section.id}
                  to={`${pathname}#${section.id}`}
                  className={
                    section.id === activeId
                      ? "case-study-header-sections-link is-active"
                      : "case-study-header-sections-link"
                  }
                  onClick={menu.close}
                >
                  {section.label}
                </Link>
              ))}
            </nav>

            {/* Hidden, unwrapped clone of the same labels — used only to
                measure the row's natural width so useOverflowNav can tell
                whether it still fits. Never shown or reachable. */}
            <div
              className="case-study-header-sections-measure"
              aria-hidden="true"
              ref={measureRef}
            >
              {sections.map((section) => (
                <span key={section.id} className="case-study-header-sections-link">
                  {section.label}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </header>
  );
}
