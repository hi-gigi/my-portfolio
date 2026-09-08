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
  role: string;
  year: string;
  /** Absolute or base-relative URL. Falls back to a placeholder panel. */
  imageUrl?: string;
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
