// ============================================================
//  MODEL — portfolio content
//  All copy lives here so views stay presentational. Editing the
//  site is editing this file.
// ============================================================

import { getCaseStudy } from "./caseStudies";
import type { PortfolioContent, Project } from "./types";

const EMAIL = "mailto:hizhuojiaqi@gmail.com";

// BASE_URL resolves to "/my-portfolio/" in the built site and "/" in
// dev. The PDF lives at `public/jiaqi-zhuo-resume.pdf`; project
// thumbnails at `public/thumbs/<id>.{png,jpg}`.
const RESUME_URL = `${import.meta.env.BASE_URL}jiaqi-zhuo-resume.pdf`;
const PHOTO_URL = `${import.meta.env.BASE_URL}jiaqi.webp`;
const ABOUT_PHOTO_URL = `${import.meta.env.BASE_URL}about/photo.webp`;
const aboutMarqueePhoto = (file: string) =>
  `${import.meta.env.BASE_URL}about/marquee/${file}`;
const thumb = (file: string) => `${import.meta.env.BASE_URL}thumbs/${file}`;

export const content: PortfolioContent = {
  wordmark: "jiaqi zhuo",

  resume: { label: "Résumé", href: RESUME_URL, external: true },

  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    // Playground still under active iteration — route stays live at
    // /playground for direct preview, just not linked from nav yet.
    // { label: "Playground", href: "/playground" },
  ],

  hero: {
    eyebrow: {
      prefix: "Senior Product Designer &",
      words: ["builder", "systems thinker", "strategist"],
    },
    headline:
      "I turn ambiguity into direction—\nand direction into intuitive,\nscalable products.",
    photo: {
      src: PHOTO_URL,
      alt: "Portrait of Jiaqi Zhuo",
      width: 800,
      height: 829,
      hint: "Psst… my portrait is a sliding puzzle 😄",
    },
    lede: [
      "I shape what's worth building in ",
      { mark: "complex, technical spaces" },
      "—and design with and for ",
      { mark: "AI" },
      ".",
    ],
    actions: [{ label: "View work", href: "#work", variant: "primary" }],
    socials: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/jiaqizhuo/",
        icon: "linkedin",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/hi-gigi",
        icon: "github",
        external: true,
      },
      { label: "Email", href: EMAIL, icon: "email" },
    ],
  },

  work: {
    title: "Selected work",
    groups: [
      {
        label: "Enterprise B2B and end-user products · 2020–present",
        projects: [
          {
            id: "ai-search",
            title: "Bringing AI-powered answers to document search",
            blurb:
              "Natural-language queries in, generative answers out — on Lucid's primary search surface.",
            labels: ["AI", "Search", "0→1"],
            image: thumb("ai-search.png"),
          },
          {
            id: "document-discovery",
            title: "Document Discovery: search and audit across an org",
            blurb:
              "A security and compliance foundation that grew into a multi-million dollar add-on.",
            labels: ["Security & Compliance", "Research & Strategy", "0→1"],
            image: thumb("document-discovery.png"),
          },
          {
            id: "license-request-justification",
            title: "Justification on the license request flow",
            blurb:
              "+14.5% improvement in 7-day license approval rate — by giving admins the context to act.",
            labels: ["Growth", "End-to-End", "A/B Test"],
            image: thumb("license-request-justification.jpg"),
          },
          {
            id: "distributed-admin-controls",
            title: "Distributed admin controls for Enterprise accounts",
            blurb:
              "Built to replace a legacy model that couldn't scale. Rolled out across thousands of enterprise accounts.",
            labels: ["Systems Thinking", "Design Strategy", "0→1"],
            image: thumb("distributed-admin-controls.png"),
            wip: true,
          },
        ],
      },
      {
        label: "Internships · 2018–2019",
        layout: "row",
        projects: [
          {
            id: "hasbro-pulse",
            title: "Hasbro Pulse Mobile Experience",
            blurb:
              "UX Design Intern @ Hasbro — Digital Operations Team, 2019 Summer",
            labels: [
              "Customer Facing Product",
              "Mobile Application",
              "Fan Community",
            ],
            image: thumb("hasbro-pulse.jpg"),
          },
          {
            id: "ibm-solution-gateway",
            title: "IBM Solution Gateway",
            blurb:
              "UX Design Intern @ IBM — ISG Team, June 2018 to October 2018",
            labels: [
              "Enterprise Software",
              "Web-based Application",
              "Content Management",
            ],
            image: thumb("ibm-solution-gateway.png"),
          },
        ],
      },
    ],
  },

  about: {
    title: "About",
    name: "Jiaqi",
    pronunciation: "/JYAH-chee/",
    photo: {
      src: ABOUT_PHOTO_URL,
      alt: "Jiaqi Zhuo standing in a red-rock slot canyon",
      width: 760,
      height: 1140,
    },
    intro: [
      "Currently a Senior UX Designer II at Lucid Software, with 8+ years of experience turning complex, technical problems into scalable B2B enterprise solutions spanning AI-powered workflows, enterprise platforms, developer and internal tools, and growth. Previously interned at IBM and Hasbro, and hold a Master's in Human-Computer Interaction from Indiana University Bloomington.",
    ],
    sections: [
      {
        heading: "How I Work",
        body: [
          "I specialize in high-ambiguity spaces where business constraints and user needs carry equal weight.",
          "What energizes me most is design that shifts how people work — turning complexity into clarity, and making powerful tools feel accessible to everyone. I'm especially drawn to problems at the frontier of AI and enterprise software, where the right design isn't obvious yet.",
        ],
      },
      {
        heading: "Outside of Work",
        body: [
          "I'm happiest outdoors — hiking, skiing, or on the tennis court — and often behind a lens, capturing the beauty of nature and the small moments of everyday life.",
        ],
      },
    ],
    // 20 shots (Antelope Canyon is used above as the portrait photo,
    // so it's excluded here to avoid repeating it). Landscape and
    // portrait shots are shuffled independently, then interleaved
    // landscape/portrait/landscape/portrait — a strict alternation
    // (10 of each) so the strip never runs two of the same
    // orientation back to back as it loops.
    photos: [
      {
        src: aboutMarqueePhoto("guilin-river.webp"),
        alt: "A cormorant fishing bird perched on a bamboo raft, with a stone arch bridge over the river behind it",
        width: 1050,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("yosemite-half-dome.webp"),
        alt: "Standing on a forest road in Yosemite with Half Dome rising in the distance",
        width: 525,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("wildflower-ridge.webp"),
        alt: "Yellow wildflowers on a mountainside overlooking a green alpine valley",
        width: 1050,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("lake-aerial.webp"),
        alt: "Aerial view of a mountain lake shoreline lined with pine trees",
        width: 525,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("tahoe-ebike.webp"),
        alt: "Standing with an e-bike at a scenic overlook above Lake Tahoe",
        width: 1050,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("sunset-seagull.webp"),
        alt: "A seagull flying past the sun setting over the ocean",
        width: 525,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("ski-run.webp"),
        alt: "A snowboarder and skiers descending a run beneath jagged snow-capped peaks",
        width: 933,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("kalalau-cliffs.webp"),
        alt: "The jagged green cliffs of Kauai's Kalalau Valley meeting the ocean",
        width: 525,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("aerial-coastline.webp"),
        alt: "Aerial view of waves breaking along a rocky, black-sand coastline",
        width: 1050,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("sea-turtles-beach.webp"),
        alt: "Two sea turtles resting on a sandy beach",
        width: 525,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("burney-falls.webp"),
        alt: "Burney Falls cascading over a wide rock face into a blue pool",
        width: 1050,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("aspen-canopy.webp"),
        alt: "Looking up through golden aspen trees to a clear blue sky",
        width: 525,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("aspen-road.webp"),
        alt: "Motorcyclists riding a winding road through golden aspen trees",
        width: 1050,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("zion-narrows.webp"),
        alt: "Standing in the river through Zion's Narrows, framed by towering canyon walls",
        width: 525,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("redwood-light.webp"),
        alt: "Sunlight filtering through a redwood forest",
        width: 1050,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("crater-lake.webp"),
        alt: "Crater Lake's deep blue water beneath rugged mountain ridgelines",
        width: 467,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("horseshoe-bend.webp"),
        alt: "Sitting at the edge of Horseshoe Bend, overlooking the Colorado River",
        width: 1050,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("frosted-trees.webp"),
        alt: "Frost-covered branches in a foggy forest",
        width: 467,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("smoky-sunset.webp"),
        alt: "A hazy red sun setting over silhouetted mountain ridgelines",
        width: 933,
        height: 700,
      },
      {
        src: aboutMarqueePhoto("tulip-garden.webp"),
        alt: "Rows of orange tulips leading up a lawn toward a mansion",
        width: 466,
        height: 700,
      },
    ],
  },

  footer: {
    credit: "Designed and built by Jiaqi Zhuo",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/jiaqizhuo/",
        external: true,
      },
      { label: "GitHub", href: "https://github.com/hi-gigi", external: true },
      { label: "Email", href: EMAIL },
    ],
  },
};

/** Looks up a project by id across every work group. Used by case study pages. */
export function findProject(id: string): Project | undefined {
  for (const group of content.work.groups) {
    const project = group.projects.find((p) => p.id === id);
    if (project) return project;
  }
  return undefined;
}

/**
 * Up to `limit` other projects to surface as "More work" on a case
 * study page — in `content.ts` order (already the curated priority
 * order), skipping anything without a case study of its own so the
 * picks are always clickable.
 */
export function getOtherProjects(excludeId: string, limit = 3): Project[] {
  return content.work.groups
    .flatMap((group) => group.projects)
    .filter((project) => project.id !== excludeId && getCaseStudy(project.id))
    .slice(0, limit);
}
