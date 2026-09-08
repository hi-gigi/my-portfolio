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
    actions: [
      { label: "See selected work", href: "#work", variant: "primary" },
      { label: "Email me", href: EMAIL, variant: "secondary" },
    ],
  },

  work: {
    title: "Selected work",
    projects: [
      {
        id: "project-one",
        title: "Project One",
        blurb:
          "One or two sentences on the problem, what you did, and the outcome. Keep it short and specific.",
        labels: ["Lead designer", "2025"],
      },
      {
        id: "project-two",
        title: "Project Two",
        blurb:
          "One or two sentences on the problem, what you did, and the outcome. Keep it short and specific.",
        labels: ["UX", "2024"],
      },
      {
        id: "project-three",
        title: "Project Three",
        blurb:
          "One or two sentences on the problem, what you did, and the outcome. Keep it short and specific.",
        labels: ["Product design", "2024"],
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
