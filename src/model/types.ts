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

/** Which glyph a hero social button renders. */
export type SocialIcon = "linkedin" | "github" | "email";

export interface HeroSocial {
  /** Accessible name — used for aria-label and title. */
  label: string;
  href: string;
  icon: SocialIcon;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  /** One entry per rendered line. */
  lede: string[];
  actions: HeroAction[];
  /** Icon-only links (LinkedIn / GitHub / email) shown beside the actions. */
  socials: HeroSocial[];
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

export interface WorkGroup {
  /**
   * Sub-heading above this batch of tiles (role / era / context).
   * Empty string renders no heading — the tiles sit directly under
   * the section title.
   */
  label: string;
  projects: Project[];
}

export interface WorkContent {
  title: string;
  groups: WorkGroup[];
}

export interface AboutContent {
  title: string;
  /** Rendered as "I'm {name}" above the body. */
  name: string;
  /** Phonetic hint shown in muted text after the name, e.g. "/JYAH-chee/". */
  pronunciation?: string;
  /** One entry per rendered paragraph. */
  body: string[];
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

// ---- Case studies -------------------------------------------
// A case study is a long-form article rendered one block at a time,
// in order. `Project` (above) still owns the id/title/blurb/labels
// used for the header and the card that links here.

/** A plain bullet, or a bolded lead-in followed by its description. */
export type CaseStudyListItem = string | { label: string; text: string };

export type CaseStudyBlock =
  /**
   * Also an in-page nav target — every heading becomes a jump link in
   * the header while its case study is open. `navLabel` overrides the
   * on-page `text` for that link (e.g. "Overview" vs. "Project Overview").
   */
  | { kind: "heading"; id: string; text: string; navLabel?: string }
  | { kind: "subheading"; text: string }
  /** One tier below a subheading — e.g. the named options under a "Decision #N" subheading. */
  | { kind: "subsubheading"; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "list"; ordered?: boolean; items: CaseStudyListItem[] }
  /** `src` omitted renders a labelled placeholder panel until real art lands. */
  | { kind: "image"; src?: string; alt: string };

export interface CaseStudyContent {
  /** Matches a `Project.id` from `WorkContent`. */
  id: string;
  blocks: CaseStudyBlock[];
}

// ---- Theme ------------------------------------------------
export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";
