import type { NavItem, SocialLink } from "@/model/types";
import { NavMenu } from "../NavMenu";
import { ThemeToggle } from "../ThemeToggle";
import { CloseIcon, HamburgerIcon } from "../icons";
import { useHeaderPresenter } from "./Header.presenter";
import "./Header.less";

interface HeaderProps {
  wordmark: string;
  nav: NavItem[];
  resume: SocialLink;
}

const NAV_ID = "primary-nav";

export function Header({ wordmark, nav, resume }: HeaderProps) {
  const { theme, menu } = useHeaderPresenter();

  return (
    <header className="site-header">
      <div className="brand">
        <a className="wordmark" href="#top">
          {wordmark}
        </a>
        <ThemeToggle isDark={theme.isDark} onToggle={theme.toggle} />
      </div>

      {/* Hamburger and close share the same header slot — only one is
          mounted at a time so they land in the exact same position. */}
      {menu.isOpen ? (
        <button
          type="button"
          className="nav-close"
          aria-label="Close menu"
          aria-expanded
          aria-controls={NAV_ID}
          onClick={menu.close}
        >
          <CloseIcon />
        </button>
      ) : (
        <button
          type="button"
          className="nav-toggle"
          aria-label="Open menu"
          aria-expanded={false}
          aria-controls={NAV_ID}
          ref={menu.triggerRef}
          onClick={menu.open}
        >
          <HamburgerIcon />
        </button>
      )}

      <NavMenu
        id={NAV_ID}
        items={nav}
        resume={resume}
        isOpen={menu.isOpen}
        onNavigate={menu.close}
        containerRef={menu.containerRef}
      />
    </header>
  );
}
