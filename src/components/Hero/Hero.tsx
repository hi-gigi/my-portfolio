import { Fragment, type ComponentType } from "react";
import type { HeroContent, SocialIcon } from "@/model/types";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../icons";
import "./Hero.less";

const SOCIAL_ICONS: Record<SocialIcon, ComponentType<{ className?: string }>> = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  email: MailIcon,
};

export function Hero({ eyebrow, headline, lede, actions, socials }: HeroContent) {
  return (
    <section id="intro" className="intro">
      <p className="eyebrow">{eyebrow}</p>

      <h1>{headline}</h1>

      <p className="lede">
        {lede.map((line, index) => (
          <Fragment key={line}>
            {index > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </p>

      <div className="intro-actions">
        {actions.map((action) => (
          <a
            key={action.href}
            className={`btn btn-${action.variant}`}
            href={action.href}
          >
            {action.label}
          </a>
        ))}

        <div className="intro-socials">
          {socials.map((social) => {
            const Icon = SOCIAL_ICONS[social.icon];
            return (
              <a
                key={social.href}
                className="btn btn-icon"
                href={social.href}
                aria-label={social.label}
                title={social.label}
                {...(social.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <Icon className="btn-icon-glyph" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
