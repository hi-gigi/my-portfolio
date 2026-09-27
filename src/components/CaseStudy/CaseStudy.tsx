import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { CaseStudyBlock, CaseStudyListItem, CaseStudyStat, Project } from "@/model/types";
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";
import { ProjectCard } from "../ProjectCard";
import "./CaseStudy.less";

type LightboxItem = { src: string; alt: string };

/** The lightbox's full slide set and which one is showing, or `null` when closed — supports prev/next across the set it was opened from. */
type LightboxState = { items: LightboxItem[]; index: number };

/**
 * Splits on `**bold**` and `[text](url)` markers and returns plain
 * strings interleaved with `<strong>`/`<a>` nodes — the only inline
 * markup case-study copy supports, for calling out a phrase or linking
 * out mid-paragraph without breaking it into a separate block.
 */
function renderInlineText(text: string): ReactNode {
  const pattern = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      nodes.push(<strong key={match.index}>{match[1]}</strong>);
    } else {
      nodes.push(
        <a key={match.index} href={match[3]} target="_blank" rel="noopener noreferrer">
          {match[2]}
        </a>,
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (nodes.length === 0) return text;
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

interface CaseStudyProps {
  project: Project;
  blocks: CaseStudyBlock[];
  /** Curated picks shown as "More work" at the bottom of the page. */
  otherProjects: Project[];
}

/**
 * One case study, rendered as a single reading column: header (from
 * the matching Project) then every block in order. Layout is
 * deliberately plain for now — text and images, one column; a real
 * layout pass comes later.
 */
export function CaseStudy({ project, blocks, otherProjects }: CaseStudyProps) {
  const leadsWithMedia = blocks[0]?.kind === "image" || blocks[0]?.kind === "video" || blocks[0]?.kind === "carousel";
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const lightboxOpen = lightbox !== null;

  // Escape closes the lightbox; arrow keys step through its slide set
  // when it was opened from more than one image (a carousel or row).
  // The click-outside/close-button/nav-button paths are handled
  // directly on the overlay's own elements below.
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowLeft") {
        setLightbox((s) => (s ? { ...s, index: (s.index - 1 + s.items.length) % s.items.length } : s));
      }
      if (event.key === "ArrowRight") {
        setLightbox((s) => (s ? { ...s, index: (s.index + 1) % s.items.length } : s));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen]);

  return (
    <article className="case-study">
      <header className={leadsWithMedia ? "case-study-intro case-study-intro--tight" : "case-study-intro"}>

        {project.labels.length > 0 && (
          <p className="case-study-eyebrow">{project.labels.join(" · ")}</p>
        )}
        <h1>{project.title}</h1>
        <p className="case-study-lede">{project.blurb}</p>
      </header>

      <div className="case-study-body">
        {blocks.map((block, index) => (
          <CaseStudyBlockView
            key={index}
            block={block}
            lead={index === 0}
            onImageClick={(items, i) => setLightbox({ items, index: i })}
          />
        ))}
      </div>

      {otherProjects.length > 0 && (
        <section className="case-study-more">
          <div className="case-study-more-head">
            <h2 className="section-title">Explore more work</h2>
            <Link to="/#work" className="btn btn-secondary">
              ← View all work
            </Link>
          </div>
          <div className="case-study-more-grid">
            {otherProjects.map((otherProject) => (
              <ProjectCard key={otherProject.id} project={otherProject} />
            ))}
          </div>
        </section>
      )}

      {lightbox && (
        <div
          className="case-study-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.items[lightbox.index].alt}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="case-study-lightbox-close"
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
          {lightbox.items.length > 1 && (
            <>
              <button
                type="button"
                className="case-study-lightbox-nav case-study-lightbox-nav--prev"
                aria-label="Previous image"
                onClick={(event) => {
                  event.stopPropagation();
                  setLightbox((s) => (s ? { ...s, index: (s.index - 1 + s.items.length) % s.items.length } : s));
                }}
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                className="case-study-lightbox-nav case-study-lightbox-nav--next"
                aria-label="Next image"
                onClick={(event) => {
                  event.stopPropagation();
                  setLightbox((s) => (s ? { ...s, index: (s.index + 1) % s.items.length } : s));
                }}
              >
                <ChevronRightIcon />
              </button>
            </>
          )}
          <img
            src={lightbox.items[lightbox.index].src}
            alt={lightbox.items[lightbox.index].alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </article>
  );
}

/**
 * `lead` marks the page's first block — an overview video gets the
 * roomy media frame; every other image/video gets the compact one.
 * `onImageClick` opens an image full-size in the lightbox — given the
 * full slide set it can navigate (e.g. every image in the same row or
 * carousel) and which one was clicked.
 */
function CaseStudyBlockView({
  block,
  lead = false,
  onImageClick,
}: {
  block: CaseStudyBlock;
  lead?: boolean;
  onImageClick?: (items: LightboxItem[], index: number) => void;
}) {
  const frameClass = lead ? "case-study-media-frame" : "case-study-media-frame case-study-media-frame--compact";

  switch (block.kind) {
    case "heading":
      return <h2 id={block.id}>{block.text}</h2>;

    case "subheading":
      return <h3>{block.text}</h3>;

    case "subsubheading":
      return <h4>{block.text}</h4>;

    case "paragraph": {
      const classes = [
        block.emphasis && "case-study-emphasis",
        block.continuation && "case-study-continuation",
      ].filter(Boolean).join(" ");
      return <p className={classes || undefined}>{renderInlineText(block.text)}</p>;
    }

    case "list": {
      const ListTag = block.ordered ? "ol" : "ul";
      const hasIcons = block.items.some((item) => typeof item === "object" && "icon" in item);
      return (
        <ListTag className={hasIcons ? "case-study-list-icon" : undefined}>
          {block.items.map((item, index) => (
            <ListItem key={index} item={item} />
          ))}
        </ListTag>
      );
    }

    case "split":
      return (
        <div className="case-study-split">
          <div className="case-study-split-main">
            {block.content.map((text, index) => (
              <p key={index}>{renderInlineText(text)}</p>
            ))}
            <div className="case-study-split-timeline">
              <h3 className="case-study-split-label">Timeline</h3>
              <div className="case-study-stepper">
                {block.timeline.map((step, index) => (
                  <p className="case-study-step" key={index}>
                    <span className="case-study-step-date">{step.date}</span>
                    {step.label}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <aside className="case-study-split-sidebar">
            <div className="case-study-split-block">
              <h3 className="case-study-split-label">My role</h3>
              <p className="case-study-split-role-title">
                <strong>{block.sidebar.role.title}</strong>
              </p>
              <ul className="case-study-split-role-list">
                {block.sidebar.role.items.map((item, index) => (
                  <li key={index}>{renderInlineText(item)}</li>
                ))}
              </ul>
            </div>
            <div className="case-study-split-block">
              <h3 className="case-study-split-label">Collaborators</h3>
              <div className="case-study-split-team-list">
                {block.sidebar.collaborators.map((collaborator, index) => (
                  <div className="case-study-split-team" key={index}>
                    <p className="case-study-split-team-name">
                      <strong>{collaborator.name}</strong>
                    </p>
                    {collaborator.tag && (
                      <p className="case-study-split-team-tag">{collaborator.tag}</p>
                    )}
                    <p className="case-study-split-team-text">{renderInlineText(collaborator.text)}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      );

    case "beats":
      return (
        <div className="case-study-beats">
          {block.items.map((beat, index) =>
            beat.conclusion ? (
              <div className="case-study-beat-conclusion" key={index}>
                <p className="case-study-beat-body">
                  <strong>{renderInlineText(beat.text)}</strong>
                </p>
              </div>
            ) : (
              <div className="case-study-beat" key={index}>
                <span className="case-study-beat-num">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  {beat.label && (
                    <p className="case-study-beat-label">
                      <strong>{beat.label}</strong>
                    </p>
                  )}
                  <p className="case-study-beat-body">{renderInlineText(beat.text)}</p>
                  {beat.cite && <div className="case-study-beat-cite">{renderInlineText(beat.cite)}</div>}
                </div>
              </div>
            ),
          )}
        </div>
      );

    case "media-split":
      return (
        <div
          className={`case-study-media-split${block.alignBottom ? " case-study-media-split--align-end" : ""}${
            block.stacked ? " case-study-media-split--stacked" : ""
          }`}
        >
          <div className="case-study-media-split-text">
            {block.content.map((item, index) => (
              <CaseStudyBlockView key={index} block={item} />
            ))}
          </div>
          <div className="case-study-media-split-media">
            <CaseStudyBlockView block={block.media} onImageClick={onImageClick} />
          </div>
        </div>
      );

    case "icon-split":
      return (
        <div className="case-study-icon-split">
          <span className="case-study-icon-split-icon">
            <img src={block.icon} alt="" />
          </span>
          <div className="case-study-icon-split-content">
            {block.content.map((item, index) => (
              <CaseStudyBlockView key={index} block={item} />
            ))}
          </div>
        </div>
      );

    case "image":
      if (!block.src) {
        return (
          <div className="case-study-media-placeholder" role="img" aria-label={block.alt}>
            <span>{block.alt}</span>
          </div>
        );
      }
      return (
        <div className={frameClass}>
          <button
            type="button"
            className="case-study-media-frame-button"
            data-cursor-icon="zoom"
            onClick={() => onImageClick?.([{ src: block.src!, alt: block.alt }], 0)}
          >
            <img src={block.src} alt={block.alt} loading="lazy" decoding="async" />
          </button>
          {block.caption && <p className="case-study-caption">{block.caption}</p>}
        </div>
      );

    case "image-row": {
      // One shared media-frame panel behind the whole row (rather than
      // one per image, like a standalone `image` block gets) — the set
      // reads as a single grouped artifact instead of separate tiles.
      const clickable: LightboxItem[] = block.items.filter(
        (item): item is LightboxItem => Boolean(item.src),
      );
      return (
        <div className={frameClass}>
          <div className="case-study-image-row">
            {block.items.map((item, index) =>
              item.src ? (
                <div className="case-study-image-row-item" key={index}>
                  <button
                    type="button"
                    className="case-study-image-row-item-button"
                    data-cursor-icon="zoom"
                    onClick={() => onImageClick?.(clickable, clickable.findIndex((i) => i === item))}
                  >
                    <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                  </button>
                  {item.caption && <p className="case-study-caption">{item.caption}</p>}
                </div>
              ) : (
                <div key={index} className="case-study-media-placeholder" role="img" aria-label={item.alt}>
                  <span>{item.alt}</span>
                </div>
              ),
            )}
          </div>
          {block.caption && <p className="case-study-caption">{block.caption}</p>}
        </div>
      );
    }

    case "carousel":
      return <CaseStudyCarousel items={block.items} frameClass={frameClass} onImageClick={onImageClick} />;

    case "columns":
      return (
        <div className="case-study-columns">
          {block.items.map((column, index) => (
            <div className="case-study-columns-item" key={index}>
              {column.map((item, i) => (
                <CaseStudyBlockView key={i} block={item} />
              ))}
            </div>
          ))}
        </div>
      );

    case "video":
      return block.src ? (
        <div className={frameClass}>
          <video
            src={block.src}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-label={block.alt}
          />
          {block.caption && <p className="case-study-caption">{block.caption}</p>}
        </div>
      ) : (
        <div className="case-study-media-placeholder" role="img" aria-label={block.alt}>
          <span>{block.alt}</span>
        </div>
      );

    case "stats":
      return (
        <div className="case-study-stats">
          {block.period && <p className="case-study-stats-period">{block.period}</p>}
          <div className="case-study-stats-grid">
            {block.items.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
          {block.note && <p className="case-study-stats-note">{block.note}</p>}
        </div>
      );

    case "quote-list":
      return (
        <div className="case-study-quotes">
          {block.items.map((item, index) => (
            <blockquote className="case-study-quote" key={index}>
              <p className="case-study-quote-text">{renderInlineText(item.text)}</p>
              <cite className="case-study-quote-attribution">{item.attribution}</cite>
            </blockquote>
          ))}
        </div>
      );
  }
}

/** How long each slide holds before advancing. */
const CAROUSEL_INTERVAL_MS = 4000;

/**
 * One image at a time, auto-advancing on a timer and looping. Owns its
 * own state (current slide) rather than living inline in the big
 * switch, since a hook needs a component that always renders it, not
 * one call among many in a conditional branch.
 */
function CaseStudyCarousel({
  items,
  frameClass,
  onImageClick,
}: {
  items: { src?: string; alt: string; caption?: string }[];
  frameClass: string;
  onImageClick?: (items: LightboxItem[], index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const clickable: LightboxItem[] = items.filter((item): item is LightboxItem => Boolean(item.src));

  // Re-armed on every index change (including its own tick) so a
  // manual prev/next or dot click always buys a full interval before
  // the next auto-advance, instead of competing with it.
  useEffect(() => {
    if (items.length <= 1 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), CAROUSEL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [items.length, paused, index]);

  const activeItem = items[index];

  return (
    <div className={frameClass}>
      <div
        className="case-study-carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {items.map((item, i) =>
          item.src ? (
            <img
              key={i}
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              className={i === index ? "is-active" : undefined}
            />
          ) : (
            <div
              key={i}
              className={`case-study-media-placeholder${i === index ? " is-active" : ""}`}
              role="img"
              aria-label={item.alt}
            >
              <span>{item.alt}</span>
            </div>
          ),
        )}
        {/*
          A separate hit layer, not the label/click on the carousel div
          itself — the nav buttons are its siblings, positioned above it
          (z-index), so hovering/clicking them hits the button instead of
          this layer rather than bubbling through an ancestor's
          data-cursor-label and onClick.
        */}
        {activeItem?.src && (
          <div
            className="case-study-carousel-hit"
            data-cursor-icon="zoom"
            onClick={() => onImageClick?.(clickable, clickable.findIndex((i) => i === activeItem))}
          />
        )}
        {items.length > 1 && (
          <>
            <button
              type="button"
              className="case-study-carousel-nav case-study-carousel-nav--prev"
              aria-label="Previous slide"
              onClick={(event) => {
                event.stopPropagation();
                setIndex((i) => (i - 1 + items.length) % items.length);
              }}
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              className="case-study-carousel-nav case-study-carousel-nav--next"
              aria-label="Next slide"
              onClick={(event) => {
                event.stopPropagation();
                setIndex((i) => (i + 1) % items.length);
              }}
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>
      {items.length > 1 && (
        <div className="case-study-carousel-dots">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show slide ${i + 1} of ${items.length}`}
              aria-current={i === index}
              className={i === index ? "is-active" : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
      {activeItem?.caption && <p className="case-study-caption">{activeItem.caption}</p>}
    </div>
  );
}

function StatCard({ stat }: { stat: CaseStudyStat }) {
  return (
    <div className="case-study-stat">
      <p className="case-study-stat-label">{stat.label}</p>
      <p className="case-study-stat-value">{stat.value}</p>
      {stat.description && <p className="case-study-stat-description">{stat.description}</p>}
      {stat.details && stat.details.length > 0 && (
        <dl className="case-study-stat-details">
          {stat.details.map((detail, index) => (
            <div className="case-study-stat-detail-row" key={index}>
              <dt>{detail.label}</dt>
              <dd>{detail.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

function ListItem({ item }: { item: CaseStudyListItem }) {
  if (typeof item === "string") {
    return <li>{renderInlineText(item)}</li>;
  }
  if ("icon" in item) {
    return (
      <li className="case-study-list-icon-item">
        <span className="case-study-list-icon-tile">
          <img src={item.icon} alt="" loading="lazy" decoding="async" />
        </span>
        <span className="case-study-list-icon-text">{renderInlineText(item.text)}</span>
      </li>
    );
  }
  return (
    <li>
      <strong>{item.label}</strong> — {item.text}
    </li>
  );
}
