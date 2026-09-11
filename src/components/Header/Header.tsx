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
      <div className="site-header-inner">
        <div className="brand">
          <a className="wordmark" href="#top">
            {wordmark}
          </a>
          <ThemeToggle isDark={theme.isDark} onToggle={theme.toggle} />
        </div>

        {/* One persistent button — it only swaps its icon. Keeping the same
            node mounted keeps `triggerRef` live, so the outside-click guard
            can tell "clicked the toggle" from "clicked outside". */}
        <button
          type="button"
          className="nav-toggle"
          aria-label={menu.isOpen ? "Close menu" : "Open menu"}
          aria-expanded={menu.isOpen}
          aria-controls={NAV_ID}
          ref={menu.triggerRef}
          onClick={menu.toggle}
        >
          {menu.isOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        <NavMenu
          id={NAV_ID}
          items={nav}
          resume={resume}
          isOpen={menu.isOpen}
          onNavigate={menu.close}
          containerRef={menu.containerRef}
        />
      </div>
    </header>
  );
}
