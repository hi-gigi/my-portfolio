// ============================================================
//  MODEL — portfolio content
//  All copy lives here so views stay presentational. Editing the
//  site is editing this file.
// ============================================================

import type { PortfolioContent } from "./types";

const EMAIL = "mailto:hizhuojiaqi@gmail.com";

// Drop the PDF at `public/jiaqi-zhuo-resume.pdf`; BASE_URL resolves
// to "/my-portfolio/" in the built site and "/" in dev.
const RESUME_URL = `${import.meta.env.BASE_URL}jiaqi-zhuo-resume.pdf`;

export const content: PortfolioContent = {
  wordmark: "jiaqi zhuo",

  resume: { label: "Résumé", href: RESUME_URL, external: true },

  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: EMAIL },
  ],

  hero: {
    eyebrow: "Product Designer & Generalist",
    headline:
      "8+ years in Enterprise B2B. Sharp in ambiguous, technical spaces — move fast, think strategically, and build with AI.",
    lede: [
      "Currently Senior UX Designer II @ Lucid Software",
      "M.S. Human-Computer Interaction, Indiana University Bloomington",
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
    projects: [
      {
        id: "ai-search",
        title: "Bringing AI-powered answers to document search",
        blurb:
          "Natural-language queries in, generative answers out — on Lucid's primary search surface.",
        labels: ["AI", "Search", "0→1"],
      },
      {
        id: "document-discovery",
        title: "Document Discovery: search and audit across an org",
        blurb:
          "A security and compliance foundation that grew into a multi-million dollar add-on.",
        labels: ["Security & Compliance", "Research & Strategy", "0→1"],
      },
      {
        id: "license-request-justification",
        title: "Justification on the license request flow",
        blurb:
          "+14.5% improvement in 7-day license approval rate — by giving admins the context to act.",
        labels: ["Growth", "End-to-End", "A/B Test"],
      },
      {
        id: "distributed-admin-controls",
        title: "(Coming soon) Distributed admin controls for Enterprise accounts",
        blurb:
          "Built to replace a legacy model that couldn't scale. Rolled out across thousands of enterprise accounts.",
        labels: ["Systems Thinking", "Design Strategy", "0→1"],
      },
      {
        id: "hasbro-pulse",
        title: "Hasbro Pulse Mobile Experience",
        blurb:
          "UX Design Intern @ Hasbro — Digital Operations Team, 2019 Summer",
        labels: ["Customer Facing Product", "Mobile Application", "Fan Community"],
      },
      {
        id: "ibm-solution-gateway",
        title: "IBM Solution Gateway",
        blurb:
          "UX Design Intern @ IBM — ISG Team, June 2018 to October 2018",
        labels: ["Enterprise Software", "Web-based Application", "Content Management"],
      },
    ],
  },

  about: {
    title: "About",
    body: "Write a short paragraph here: who you are, how you work, the kinds of problems you like, and what you're looking for next.",
  },

  footer: {
    name: "Jiaqi Zhuo",
    links: [
      { label: "Email", href: EMAIL },
      { label: "GitHub", href: "https://github.com/hi-gigi", external: true },
    ],
  },
};
