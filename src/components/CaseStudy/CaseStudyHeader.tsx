import { Link, useLocation } from "react-router-dom";
import { getCaseStudySections } from "@/model/caseStudies";
import { useNavMenu } from "@/presenters/useNavMenu";
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
 * Résumé CTA, and (unlike the site header) not sticky. Left: back
 * link + theme toggle. Right: this case study's own section links
 * (from its heading blocks), collapsing into a hamburger dropdown on
 * narrow screens instead of wrapping.
 */
export function CaseStudyHeader({ caseStudyId }: CaseStudyHeaderProps) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const sections = getCaseStudySections(caseStudyId);
  const menu = useNavMenu();

  return (
    <header className="case-study-header">
      <div className="case-study-header-inner">
        <div className="case-study-header-left">
          <Link to="/#work" className="case-study-header-back">
            ← Back to work
          </Link>
          <ThemeToggle isDark={theme.isDark} onToggle={theme.toggle} />
        </div>

        {sections.length > 0 && (
          <>
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

            <nav
              id={SECTIONS_ID}
              ref={menu.containerRef}
              className={
                menu.isOpen
                  ? "case-study-header-sections is-open"
                  : "case-study-header-sections"
              }
              aria-label="Case study sections"
            >
              {sections.map((section) => (
                <Link
                  key={section.id}
                  to={`${pathname}#${section.id}`}
                  onClick={menu.close}
                >
                  {section.label}
                </Link>
              ))}
            </nav>
          </>
        )}
      </div>
    </header>
  );
}
