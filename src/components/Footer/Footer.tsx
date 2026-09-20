import type { FooterContent } from "@/model/types";
import { useFooterPresenter } from "./Footer.presenter";
import "./Footer.less";

export function Footer({ credit, links }: FooterContent) {
  const { year } = useFooterPresenter();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>
          &copy; {year} &middot; {credit}
        </p>
        <p className="footer-links">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
            </a>
          ))}
        </p>
      </div>
    </footer>
  );
}
