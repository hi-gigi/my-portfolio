// ============================================================
//  MODEL — domain types
//  The shape of the portfolio's content. Views render these;
//  presenters never mutate them.
// ============================================================

export interface NavItem {
  label: string;
  href: string;
}

export type ButtonVariant = "primary" | "secondary";

export interface HeroAction {
  label: string;
  href: string;
  variant: ButtonVariant;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  /** One entry per rendered line. */
  lede: string[];
  actions: HeroAction[];
}

export interface Project {
  id: string;
  title: string;
  blurb: string;
  /** Short tags under the description — e.g. role, discipline, year. */
  labels: string[];
  /** Static thumbnail. Absolute or base-relative URL; falls back to an empty panel. */
  image?: string;
  /**
   * Optional looping clip (mp4/webm). Plays on hover, resets on leave, and is
   * left paused when the visitor prefers reduced motion. `image` is its poster.
   */
  video?: string;
}

export interface WorkContent {
  title: string;
  projects: Project[];
}

export interface AboutContent {
  title: string;
  body: string;
}

export interface SocialLink {
  label: string;
  href: string;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
}

export interface FooterContent {
  name: string;
  links: SocialLink[];
}

export interface PortfolioContent {
  wordmark: string;
  resume: SocialLink;
  nav: NavItem[];
  hero: HeroContent;
  work: WorkContent;
  about: AboutContent;
  footer: FooterContent;
}

// ---- Theme ------------------------------------------------
export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";
