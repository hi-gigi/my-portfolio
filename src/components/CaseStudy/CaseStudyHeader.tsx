import { Link, useLocation } from "react-router-dom";
import { getCaseStudySections } from "@/model/caseStudies";
import { useTheme } from "@/presenters/useTheme";
import { ThemeToggle } from "../ThemeToggle";
import "./CaseStudyHeader.less";

interface CaseStudyHeaderProps {
  caseStudyId: string;
}

/**
 * The header shown while a case study is open — a separate bar from
 * the site's main `Header`, not a variant of it. No wordmark, no
 * Résumé CTA: just a way back and a way to jump around this one
 * page. Left: back link + theme toggle. Right: this case study's
 * own section links (sourced from its heading blocks).
 */
export function CaseStudyHeader({ caseStudyId }: CaseStudyHeaderProps) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const sections = getCaseStudySections(caseStudyId);

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
          <nav className="case-study-header-sections" aria-label="Case study sections">
            {sections.map((section) => (
              <Link key={section.id} to={`${pathname}#${section.id}`}>
                {section.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
