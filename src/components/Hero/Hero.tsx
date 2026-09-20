import type { ComponentType } from "react";
import type { HeroContent, SocialIcon } from "@/model/types";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../icons";
import { useTypewriter } from "@/presenters/useTypewriter";
import { PortraitPuzzle } from "./PortraitPuzzle";
import "./Hero.less";

const SOCIAL_ICONS: Record<
  SocialIcon,
  ComponentType<{ className?: string }>
> = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  email: MailIcon,
};

export function Hero({
  eyebrow,
  headline,
  photo,
  lede,
  actions,
  socials,
}: HeroContent) {
  // `null` = reduced motion: show every word statically instead of typing.
  const typed = useTypewriter(eyebrow.words);

  return (
    <section id="intro" className="intro">
      <div className="intro-copy">
        <p
          className="eyebrow"
          aria-label={`${eyebrow.prefix} ${eyebrow.words.join(", ")}`}
        >
          <span aria-hidden="true">
            {eyebrow.prefix}{" "}
            <span className="typed">
              {typed ?? eyebrow.words.join(" / ")}
              {typed !== null && <span className="typed-caret" />}
            </span>
          </span>
        </p>

        <h1>{headline}</h1>

        <p className="lede">
          {lede.map((part, i) =>
            typeof part === "string" ? (
              part
            ) : (
              <mark key={i} className="lede-mark">
                {part.mark}
              </mark>
            ),
          )}
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
      </div>

      <PortraitPuzzle {...photo} />
    </section>
  );
}
