// ============================================================
//  MODEL — /playground page content
//  Three modules under one thesis: the design tokens, the motion
//  layer, and the AI workflow behind both. The build-process steps
//  are drawn from this repo's own commit history (see NOTES.md and
//  the commits named in each step's rationale) — not generic
//  "AI helped here" statements.
// ============================================================

import type { PlaygroundContent } from "./types";

export const playgroundContent: PlaygroundContent = {
  eyebrow: "Playground",
  lede: "A closer look at how this site gets built — the design system, the motion layer, and the AI workflow behind both, viewed as one thing from three angles.",

  nav: [
    { id: "design", label: "Design" },
    { id: "motion", label: "Motion & Code" },
    { id: "process", label: "Process" },
  ],

  designExplorer: {
    caption: "CSS custom properties — no rebuild needed.",
    controls: [
      {
        id: "hue",
        label: "Accent hue",
        min: 0,
        max: 360,
        step: 1,
        default: 9,
        unit: "°",
      },
      {
        id: "radius",
        label: "Corner radius",
        min: 0,
        max: 24,
        step: 1,
        default: 8,
        unit: "px",
      },
      {
        id: "scale",
        label: "Type scale",
        min: 85,
        max: 130,
        step: 1,
        default: 100,
        unit: "%",
      },
    ],
  },

  motionSandbox: {
    caption: "Four techniques already load-bearing on this site, isolated here.",
    swatches: [
      {
        id: "magnetic",
        name: "Magnetic hover",
        technique: "pointer tracking + CSS transform",
        description: "Drifts toward the cursor within a radius, springs back on leave.",
      },
      {
        id: "reveal",
        name: "Scroll reveal",
        technique: "IntersectionObserver + CSS transition",
        description: "Fades and lifts in the first time it crosses into view.",
      },
      {
        id: "press",
        name: "Button press",
        technique: ":active transform, gated on prefers-reduced-motion",
        description: "The exact squash-and-release every button on this site uses.",
      },
      {
        id: "ring",
        name: "Spinning ring",
        technique: "@property angle + conic-gradient",
        description: "The project-tile hover effect, isolated on its own.",
      },
    ],
  },

  buildProcess: {
    caption:
      "Four real steps from this repo — the prompt, the AI's first pass, and the edit that shipped instead.",
    steps: [
      {
        id: "palette",
        title: "A palette that doesn't scream \"AI-built\"",
        prompt:
          "Give this portfolio a warm, editorial color system — considered, not templated.",
        outputLabel: "First pass",
        output:
          "--bg: #f5f0e8;      /* cream */\n--accent: #c77b5c;   /* terracotta */\n--text: #211c1a;     /* near-black */",
        edit:
          "Rejected the combo outright — cream + terracotta + near-black is the single most recognizable \"AI portfolio\" palette right now. Rebuilt every neutral on the accent's own ~14° hue at low saturation instead, so bg/text/muted/tonal read as one warm family, not three separate picks.",
        rationale:
          "A palette should look like a decision, not a default. Locking every neutral to one hue makes the coral accent feel native to the system instead of pasted on top of it.",
      },
      {
        id: "tells",
        title: "Cutting the AI tells",
        prompt: "Apply the new design system across the homepage.",
        outputLabel: "First pass",
        output:
          '<p class="eyebrow">SELECTED&nbsp;WORK</p>\n<div class="card">\n  <span class="card-number">01</span>\n  …\n</div>\n\n.card:hover {\n  transform: translateY(-6px);\n  box-shadow: 0 12px 24px rgba(0,0,0,.15);\n}',
        edit:
          "Dropped the all-caps eyebrow, removed the 01/02/03 markers on a non-sequential project list, and swapped the lift-and-shadow hover for a restrained border-colour shift.",
        rationale:
          "None of those three were wrong exactly — just recognizable. They show up in almost every AI-generated portfolio, which reads as templated even when the system underneath isn't.",
      },
      {
        id: "nav-collapse",
        title: "Section nav: breakpoint vs. measurement",
        prompt:
          "Make the case-study section links collapse into a hamburger on small screens.",
        outputLabel: "First pass",
        output:
          "@media (max-width: 720px) {\n  .case-study-nav-toggle { display: inline-flex; }\n  .case-study-header-sections { display: none; }\n}",
        edit:
          "Replaced the fixed breakpoint with useOverflowNav — it measures the nav's real rendered width against a hidden clone and only collapses once the labels actually stop fitting.",
        rationale:
          "Case studies carry 4–6 sections with different label lengths. One width breakpoint either collapsed pages with room to spare, or let a 6-section page overflow into a scrollbar above that same width.",
      },
      {
        id: "sticky-bug",
        title: "Diagnosing the sticky-header bug",
        prompt:
          "The case study header disappears when I scroll — but only sometimes, the screenshots keep changing.",
        outputLabel: "First read",
        output:
          "// hypothesis: browser-automation screenshots are flaky —\n// re-run and compare, no code change needed",
        edit:
          "Didn't accept that answer. Checked computed styles directly and found the title block and the nav bar both used the class .case-study-header in two separate stylesheets that bundle together — the title block was silently inheriting position: sticky and painting over the real header. Renamed it to .case-study-intro.",
        rationale:
          "Two wrong screenshots in a row is a real bug until proven otherwise, not tool flakiness. The DOM checks from the first pass were correct answers to the wrong question.",
      },
    ],
  },

  closing: {
    heading: "That's the system, three ways.",
    body: "Same tokens, same restraint, same eye for the AI-generated look — applied to a control panel, a motion sandbox, and the actual commits behind this site.",
    workLink: { label: "See the case studies", href: "/#work" },
    contactLink: { label: "Get in touch", href: "mailto:hizhuojiaqi@gmail.com" },
  },
};
