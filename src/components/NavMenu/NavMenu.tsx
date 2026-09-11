import { Link, useLocation } from "react-router-dom";
import type { NavItem, SocialLink } from "@/model/types";
import { ArrowUpRightIcon } from "../icons";
import "./NavMenu.less";

interface NavMenuProps {
  id: string;
  items: NavItem[];
  resume: SocialLink;
  isOpen: boolean;
  /** Called after any link is chosen, so the dropdown can close. */
  onNavigate: () => void;
  containerRef: React.RefObject<HTMLElement>;
}

/**
 * The primary navigation. On wide screens it is an inline row in the
 * header; at/below @bp-nav-collapse the same markup becomes the
 * full-width dropdown (see NavMenu.less).
 */
export function NavMenu({
  id,
  items,
  resume,
  isOpen,
  onNavigate,
  containerRef,
}: NavMenuProps) {
  const { pathname } = useLocation();

  return (
    <nav
      id={id}
      ref={containerRef}
      className={isOpen ? "nav is-open" : "nav"}
    >
      <div className="nav-links">
        {items.map((item) => {
          if (item.href.startsWith("#")) {
            // In-page anchor — jumps to a section on *this* page
            // (home's #work/#about, or a case study's own headings).
            // useScrollToHash does the actual scrolling.
            return (
              <Link
                key={item.href}
                to={`${pathname}${item.href}`}
                onClick={onNavigate}
              >
                {item.label}
              </Link>
            );
          }
          if (item.href.startsWith("/")) {
            // Absolute in-app path (e.g. "/#work" from a case study,
            // routing home before scrolling to its Work section).
            return (
              <Link key={item.href} to={item.href} onClick={onNavigate}>
                {item.label}
              </Link>
            );
          }
          return (
            <a key={item.href} href={item.href} onClick={onNavigate}>
              {item.label}
            </a>
          );
        })}
      </div>

      <a
        className="btn btn-primary nav-cta"
        href={resume.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {resume.label}
        <ArrowUpRightIcon className="ext-icon" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </nav>
  );
}
