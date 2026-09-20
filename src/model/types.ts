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
  eyebrow: {
    prefix: string;
    /** Typed out one after another after the prefix. */
    words: string[];
  };
  headline: string;
  /** Sub-line under the headline. */
  lede: string;
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
  /**
   * Not yet written up — renders as an inert tile with a "Coming soon"
   * cursor label and a flat (non-accent) hover ring instead of the
   * usual "View case study" link treatment.
   */
  comingSoon?: boolean;
}

export interface WorkGroup {
  /**
   * Sub-heading above this batch of tiles (role / era / context).
   * Empty string renders no heading — the tiles sit directly under
   * the section title.
   */
  label: string;
  projects: Project[];
  /**
   * "grid" (default) is the two-up image-on-top tile. "row" is a
   * full-width horizontal card — thumbnail on the left, title/blurb/
   * tags on the right — used to set an older/differently-scoped batch
   * of work apart from the main grid.
   */
  layout?: "grid" | "row";
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

/**
 * A plain bullet, a bolded lead-in followed by its description, or a
 * bullet paired with a small icon tile (e.g. `**Label.** rest of the
 * sentence` — inline bold same as the plain-string case, just with an
 * icon alongside).
 */
export type CaseStudyListItem = string | { label: string; text: string } | { text: string; icon: string };

/** One metric card — e.g. "Adoption · 4 weeks post-launch" → "53.6%". */
export interface CaseStudyStat {
  label: string;
  value: string;
  description?: string;
  /** Optional comparison rows under the description, e.g. with/without a variant. */
  details?: { label: string; value: string }[];
}

/** One dated step in a `split` block's Timeline column, e.g. "Jun–Jul 2026" → "Concept → internal release". */
export interface CaseStudySplitStep {
  date: string;
  label: string;
}

/** One collaborator entry in a `split` block's sidebar. `tag` is an optional roster line under the name. */
export interface CaseStudySplitCollaborator {
  name: string;
  tag?: string;
  text: string;
}

/** The right-hand "at a glance" facts column of a `split` block. */
export interface CaseStudySplitSidebar {
  role: { title: string; items: string[] };
  collaborators: CaseStudySplitCollaborator[];
}

/**
 * One step in a `beats` block's numbered argument. `cite` is an
 * optional nested citation/evidence line, demoted below the beat's own
 * claim. `conclusion` marks the beat as the argument's payoff — it
 * renders with a tinted, accent-bordered treatment and no label,
 * rather than as another peer premise.
 */
export interface CaseStudyBeat {
  label?: string;
  text: string;
  cite?: string;
  conclusion?: boolean;
}

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
  /**
   * `emphasis` renders as a bolder lead-in sentence, e.g. right under
   * a subheading. `continuation` pulls this paragraph closer to the
   * one directly above it — for a claim immediately followed by the
   * evidence/detail for it, read as one unit rather than two separate
   * ideas.
   */
  | { kind: "paragraph"; text: string; emphasis?: boolean; continuation?: boolean }
  | { kind: "list"; ordered?: boolean; items: CaseStudyListItem[] }
  /**
   * An editorial two-column opener: `content` paragraphs and `timeline`
   * read as the narrative on the left, while `sidebar` holds Role and
   * Collaborators as glanceable facts on the right. Stacks to one
   * column on narrow screens.
   */
  | { kind: "split"; content: string[]; timeline: CaseStudySplitStep[]; sidebar: CaseStudySplitSidebar }
  /** A short numbered argument — e.g. two premises building to a conclusion. */
  | { kind: "beats"; items: CaseStudyBeat[] }
  /** `src` omitted renders a labelled placeholder panel until real art lands. */
  | { kind: "image"; src?: string; alt: string }
  /** A flow demo clip. `src` omitted renders the same placeholder panel as `image`. */
  | { kind: "video"; src?: string; alt: string }
  /**
   * A single card holding one or more metrics side by side, divided by
   * a rule (vertical on wide screens, horizontal once stacked). `period`
   * is a shared timeframe shown once above every metric, instead of
   * repeating it in each `CaseStudyStat.label`. `note` is a footnote
   * spanning the full card width, below every metric.
   */
  | { kind: "stats"; items: CaseStudyStat[]; period?: string; note?: string };

export interface CaseStudyContent {
  /** Matches a `Project.id` from `WorkContent`. */
  id: string;
  blocks: CaseStudyBlock[];
}

// ---- Playground -------------------------------------------
// Content for the standalone /playground page — three modules under
// one thesis ("same system, three lenses"): the design tokens, the
// interaction layer, and the AI workflow that builds both.

export interface PlaygroundNavItem {
  /** Also the target section's `id`, for the anchor-scroll tabs. */
  id: string;
  label: string;
}

/** One live control in the design explorer — a range input bound to a `--pg-*` custom property. */
export interface DesignExplorerControl {
  id: "hue" | "radius" | "scale";
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
  /** Appended to the displayed value, e.g. "px" or "°". */
  unit: string;
}

export interface DesignExplorerContent {
  caption: string;
  controls: DesignExplorerControl[];
}

export interface MotionSwatch {
  id: string;
  name: string;
  /** One-line technique tag, e.g. "IntersectionObserver + CSS transition". */
  technique: string;
  description: string;
}

export interface MotionSandboxContent {
  caption: string;
  swatches: MotionSwatch[];
}

/** One step in the AI build-process replay — a real prompt/output/edit from this repo's own history. */
export interface BuildStep {
  id: string;
  title: string;
  prompt: string;
  outputLabel: string;
  output: string;
  edit: string;
  rationale: string;
}

export interface BuildProcessContent {
  caption: string;
  steps: BuildStep[];
}

export interface PlaygroundClosing {
  heading: string;
  body: string;
  workLink: SocialLink;
  contactLink: SocialLink;
}

export interface PlaygroundContent {
  eyebrow: string;
  lede: string;
  nav: PlaygroundNavItem[];
  designExplorer: DesignExplorerContent;
  motionSandbox: MotionSandboxContent;
  buildProcess: BuildProcessContent;
  closing: PlaygroundClosing;
}

// ---- Theme ------------------------------------------------
export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";
