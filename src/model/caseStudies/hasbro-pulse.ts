// ============================================================
//  CASE STUDY — Hasbro Pulse Mobile Experience
//  Body copy for the /work/hasbro-pulse page. Header (title/blurb/
//  labels) comes from the matching Project in content.ts.
//
//  Migrated from the Webflow version at jiaqizhuo.com/hasbro-intern-project.
//  Content only, following the same block vocabulary as ai-search.ts
//  and document-discovery.ts — no image blocks; real art can land later.
// ============================================================

import type { CaseStudyContent } from "../types";

export const hasbroPulse: CaseStudyContent = {
  id: "hasbro-pulse",
  blocks: [
    { kind: "heading", id: "overview", text: "Project Overview", navLabel: "Overview" },
    {
      kind: "paragraph",
      text: '"Where Fans Come First" — Hasbro Pulse, relaunched in February 2019, consolidated the Hasbro Toy Shop, HasLab, and Hasbro Pulse into a single destination positioned as the ultimate hub for Hasbro\'s fan brands. But fans still treated it as an online toy shop: a place to visit occasionally to buy, not a place to spend time.',
    },
    {
      kind: "paragraph",
      text: 'I designed the Hasbro Pulse mobile app end to end — the team\'s first attempt at turning Pulse from a shop fans visited a few times a year into an everyday fan destination. The MVP shipped to the development team by the end of my internship, with an initial release planned for Toy Fair in February 2020.',
    },
    { kind: "subheading", text: "Timeline" },
    {
      kind: "list",
      items: [
        { label: "May 2019 – August 2019", text: "11-week UX Design internship on Hasbro's Digital Operations Team" },
      ],
    },
    { kind: "subheading", text: "My Role & Contribution" },
    { kind: "paragraph", text: "Sole UX designer on the team.", emphasis: true },
    {
      kind: "list",
      items: [
        "Owned both user research and product design for the Pulse mobile app, following an agile development process",
        "Designed the end-to-end experience from scratch — key user flows, hi-fi interfaces, design spec documents, and interaction design samples",
        "Delivered an MVP to the development team by the end of the internship, scoped for an initial release at Toy Fair in February 2020",
      ],
    },
    { kind: "subheading", text: "Teams & Collaborators" },
    {
      kind: "list",
      items: [
        { label: "Product Manager & Scrum Master", text: "Partnered on requirements, prioritization, and sprint planning" },
        { label: "Visual Designer", text: "Icon and motion design for the app" },
        { label: "Development team", text: "Consulted throughout on feasibility, targeting an MVP handoff" },
        { label: "Brand Teams", text: "Aligned on content availability and future content generation plans" },
      ],
    },

    { kind: "heading", id: "problem-space", text: "Problem Space", navLabel: "Problem space" },
    {
      kind: "paragraph",
      text: "Fans described Pulse as a checkout counter, not a community — a place they landed only once they already knew what they wanted.",
    },
    {
      kind: "list",
      items: [
        {
          label: "A Marvel fan",
          text: '"I get most of the toy information from social media, and Hasbro Pulse is usually just the place for me to make the purchase."',
        },
        {
          label: "A Transformers fan",
          text: '"I only visit Pulse 3–4 times a year, usually after fan events like Comic-Con, Toy Fair… for exclusive products I cannot get elsewhere."',
        },
      ],
    },
    {
      kind: "paragraph",
      text: "How might we make Hasbro Pulse a real fan destination, to increase fan engagement and deepen the direct relationship with global customers?",
      emphasis: true,
    },

    { kind: "heading", id: "research", text: "Research", navLabel: "Research" },
    {
      kind: "paragraph",
      text: "I ran a multi-method research effort across three streams to understand what a good fan community looks like, and where Pulse was falling short of it.",
    },
    { kind: "subheading", text: "Stakeholder meetings" },
    {
      kind: "paragraph",
      text: "Met with stakeholders to understand the company's vision and identify available resources — what metrics would measure fan community success, and what resources could help build one.",
    },
    { kind: "subheading", text: "Benchmarking" },
    {
      kind: "paragraph",
      text: "Ran a competitive analysis of 7 brand mobile apps to see how other brands defined fan community, what engagement strategies they used for loyal customers, and to gather design inspiration.",
    },
    { kind: "subheading", text: "Internal fan interviews" },
    {
      kind: "paragraph",
      text: "Conducted 1-on-1 semi-structured interviews with 7 internal fan community members, focused on where they currently got brand news and their impressions of the Pulse website.",
    },

    { kind: "subheading", text: "What makes a good fan community?" },
    {
      kind: "paragraph",
      text: 'Stakeholders converged on one idea: a successful fan community is a place fans are willing to "spend more time." Competitor analysis broke that down into a three-part pattern.',
    },
    {
      kind: "list",
      ordered: true,
      items: [
        { label: "Attracting", text: "Provide appealing content" },
        { label: "Retaining", text: "Enable efficient information discovery and task completion" },
        { label: "Sharing", text: "Use social interaction to connect like-minded people" },
      ],
    },
    { kind: "subheading", text: "What's missing from the current Pulse experience?" },
    {
      kind: "list",
      items: [
        {
          label: "Information is scattered everywhere",
          text: "Fans followed influencers and brand teams across Twitter, Instagram, Facebook, YouTube, and Twitch — useful information was fragmented across every one of them.",
        },
        {
          label: "Passive discovery is inefficient",
          text: "Fans relied on scrolling broad social feeds to catch brand updates, and risked missing important news buried in the noise.",
        },
        {
          label: "Promotion and sales are disconnected",
          text: "After learning about an upcoming release, fans had to navigate elsewhere — offline stores or online shops — to actually buy it.",
        },
      ],
    },
    { kind: "subheading", text: "Key personas" },
    {
      kind: "paragraph",
      text: "Two main user types emerged, split by brand passion level and behavior.",
    },
    {
      kind: "list",
      items: [
        {
          label: "Hardcore Fan",
          text: '"When there is a new product release from the brand I like, I want to be informed immediately so that I could buy it to enrich my collectibles before it\'s gone." Goals: stay updated with the latest news, track desired collectibles, and get exclusives before they sell out.',
        },
        {
          label: "Casual Fan",
          text: '"When I read a new Marvel comic, I want to search for peripheral products and read reviews so that I could get high-quality character-inspired action figures." Goals: research collectibles, track desired items, and stay updated with the latest news.',
        },
      ],
    },

    { kind: "heading", id: "key-decisions", text: "Key Design Decisions", navLabel: "Key decisions" },
    {
      kind: "paragraph",
      text: "Weighing fan pain points against Hasbro's available resources and what a mobile platform could uniquely offer, three strategies shaped the design.",
    },
    {
      kind: "list",
      items: [
        { label: "Strategy 1", text: 'Enrich the content type — deliver "content to commerce."' },
        { label: "Strategy 2", text: "Curate the content presented to each individual." },
        { label: "Strategy 3", text: "Notify fans of the latest updates from the brands they like." },
      ],
    },

    { kind: "subheading", text: "Decision #1: Card format for the home feed" },
    {
      kind: "paragraph",
      text: "Six content types were planned for the home feed — in-stock products, pre-order products, upcoming products, product collections, stories, and event posts. Fans needed to tell them apart at a glance and take quick actions without opening a detail page.",
    },
    {
      kind: "paragraph",
      text: "After testing several card layouts, I chose the option that made product availability status most readable, and stayed visually consistent across every content type.",
    },

    { kind: "subheading", text: "Decision #2: Upcoming calendar placement" },
    {
      kind: "paragraph",
      text: "The Upcoming Calendar was a new feature letting fans know when the latest products or collections were dropping, so they could prepare mentally and financially. I treated it as critical to repeat visits, which meant it needed a visible, easy-to-find place in the app rather than being buried in a menu.",
    },

    { kind: "subheading", text: "Decision #3: Live Stream feature entrance" },
    {
      kind: "paragraph",
      text: "Live Stream was a new feature meant to enrich content and boost engagement — but usability testing on an early version, entered by swiping down, showed most participants never discovered the gesture existed.",
    },
    {
      kind: "paragraph",
      text: "I replaced it with a dedicated, visible entrance, prioritizing discoverability over a more novel interaction. I also designed the Live Stream page to hold a much larger archive of past videos, anticipating that Hasbro's live stream volume would grow well beyond what existed at the time.",
    },

    { kind: "heading", id: "solution", text: "Solution", navLabel: "Solution" },
    {
      kind: "paragraph",
      text: "The MVP brought the three strategies together across four core flows.",
    },
    { kind: "subsubheading", text: "Onboarding" },
    {
      kind: "paragraph",
      text: "Create an account, log in, or continue as a guest, then set content preferences — curating what each fan sees from the first session.",
    },
    { kind: "subsubheading", text: "Upcoming Calendar" },
    {
      kind: "paragraph",
      text: 'Browse what\'s upcoming, mark products of interest, set notification preferences, and check a personal "My Upcoming" list — enriching content and keeping fans in the know.',
    },
    { kind: "subsubheading", text: "Notification" },
    {
      kind: "paragraph",
      text: "Review notifications and customize preferences — putting mobile's always-on advantage to work for staying current.",
    },
    { kind: "subsubheading", text: "Live Stream" },
    {
      kind: "paragraph",
      text: "Find and enter a live video room, then discover the products featured in it — enriching content while connecting it directly to a purchase.",
    },

    { kind: "heading", id: "reflection", text: "Reflection", navLabel: "Reflection" },
    { kind: "subheading", text: "Strategic planning guides design direction" },
    {
      kind: "paragraph",
      text: "Turning senior management's vision for Pulse into concrete design decisions took stepping back before diving into details. Competitive research and user interviews cut through the ambiguity, and understanding the strategic planning behind the product gave me the confidence to prioritize information and narrow scope.",
    },
    { kind: "subheading", text: "Design for present reality and future vision" },
    {
      kind: "paragraph",
      text: "There was a real gap between the ambitious future I was designing toward and Hasbro's current content and resources. Since the app lived and died on content, understanding what the Pulse website and brand teams could actually supply was essential to a workable MVP — while still designing in a way that could grow progressively toward the larger vision, one shipped iteration at a time.",
    },
  ],
};
