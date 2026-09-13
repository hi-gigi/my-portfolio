// ============================================================
//  CASE STUDY — Justification on the license request flow
//  Body copy for the /work/license-request-justification page.
//  Header (title/blurb/labels) comes from the matching Project in
//  content.ts.
//
//  Migrated from the Webflow version at jiaqizhuo.com/user-justification.
//  Content only, following the same block vocabulary as ai-search.ts
//  and document-discovery.ts — no image blocks; real art can land later.
// ============================================================

import type { CaseStudyContent } from "../types";

export const licenseRequestJustification: CaseStudyContent = {
  id: "license-request-justification",
  blocks: [
    { kind: "heading", id: "overview", text: "Project Overview", navLabel: "Overview" },
    {
      kind: "paragraph",
      text: "With the macro economy shifting in 2022, we'd spent months identifying and resolving frictions across the admin licensing and purchasing flows. License grants improved — but a large pool of pending requests still sat unactioned. The flow wasn't the problem anymore. The question was: why weren't admins acting?",
    },
    {
      kind: "paragraph",
      text: "By giving end users a voice in the process, we helped admins feel more confident and make more informed decisions when approving or denying license requests.",
    },
    { kind: "subheading", text: "Timeline" },
    {
      kind: "list",
      items: [
        {
          label: "January 2023 – May 2023",
          text: "Justification appears directly in the license request, giving admins the context to decide.",
        },
      ],
    },
    { kind: "subheading", text: "My Role & Contribution" },
    { kind: "paragraph", text: "Lead and sole UX designer", emphasis: true },
    {
      kind: "list",
      items: [
        "Owned the end-to-end experience across both user types: the end-user request flow and the admin review experience",
        "Led the project from ideation through release — research, iterative design, and defining success metrics",
      ],
    },
    { kind: "subheading", text: "Teams & Collaborators" },
    {
      kind: "list",
      items: [
        { label: "Enterprise scrum team", text: "1 PM, 5 engineers, 1 QA" },
        {
          label: "Engagement & Virality team",
          text: "Aligned on changes to the request flow (a flow they owned) and coordinated on A/B testing",
        },
        { label: "Analytics team", text: "Co-defined what to track and designed the measurement plan" },
      ],
    },

    { kind: "heading", id: "problem-space", text: "Problem Space", navLabel: "Problem space" },
    {
      kind: "paragraph",
      text: "Unlike tools like Google Workspace or Slack — where everyone gets access by default — Lucid is project-based. Licenses are requested based on actual need, which means admins are actively reviewing and deciding on every request.",
    },
    {
      kind: "paragraph",
      text: "But requests arrived with only basic information: a user's name, email, request date, frequency, and license type. That's enough to see who is asking — but not why. Admins had no way to evaluate urgency or legitimacy without leaving the product to investigate on their own. The gap wasn't in the flow. It was in the information.",
    },

    { kind: "heading", id: "research", text: "Research", navLabel: "Research" },
    {
      kind: "paragraph",
      text: "We spoke with 10 admin users and 6 end users to understand both sides of the request flow. The findings converged on the same gap.",
    },
    { kind: "subheading", text: "What we learned from admin interviews" },
    {
      kind: "list",
      items: [
        {
          label: "(10 of 10)",
          text: "Admins only approve when there's a valid use case — business need is the primary signal, especially for users from departments that aren't pre-approved",
        },
        {
          label: "(9 of 10)",
          text: "Attaching a user justification to the request would be helpful and time-saving — many were already collecting this context manually through forms, emails, or Slack",
        },
        {
          label: "(7 of 10)",
          text: "Admins want to guide what information users provide — pre-defined options were preferred over a free text box, which felt too vague",
        },
      ],
    },
    { kind: "subheading", text: "What we learned from end user calls" },
    {
      kind: "paragraph",
      text: "We spoke with 6 end users to gauge their willingness to add a note alongside their license request and understand what information they'd naturally share.",
    },
    {
      kind: "list",
      items: [
        {
          label: "(4 of 6)",
          text: "If they genuinely need a license, they're motivated to make a case for it — explaining what they're working on and why they need access",
        },
        {
          label: "(4 of 6)",
          text: "End users prefer to trial the product before committing to a request — they want to validate their own need first",
        },
      ],
    },
    {
      kind: "paragraph",
      text: "Both sides wanted the same thing: a way to connect the reason behind the request to the moment of decision.",
    },

    { kind: "heading", id: "key-decisions", text: "Key Design Decisions", navLabel: "Key decisions" },
    {
      kind: "paragraph",
      text: "This solution touches two sides of the same flow: the end user submitting a request, and the admin reviewing it. The design decisions below focus on the end-user side — how we captured justifications without hurting request volume or adding unnecessary friction.",
    },

    { kind: "subheading", text: "Key decision #1: Placement — the confirmation step, not the request modal" },
    {
      kind: "paragraph",
      text: "License request volume is a metric we actively protect — it's a direct input to growth. Placing the justification field in the request modal risked suppressing that number and muddying our ability to measure impact.",
    },
    { kind: "subsubheading", text: "V1" },
    {
      kind: "paragraph",
      text: "We aligned with the Engagement & Virality team — who owned the request modal — and placed the field in the confirmation step instead. This kept the request flow untouched and gave us a clean baseline to isolate the justification's effect on approval rates.",
    },
    {
      kind: "paragraph",
      text: "The approach was a deliberate de-risk: start where we can learn safely, let the data build the case.",
    },
    { kind: "subsubheading", text: "V2" },
    {
      kind: "paragraph",
      text: "After seeing that requests with justifications had a significantly higher approval rate, we ran a follow-up A/B test moving the field into the request modal — surfacing it earlier in the flow. It didn't hurt overall request volume, confirming the concept was strong enough to survive more friction and validating the move to a more prominent placement.",
    },

    { kind: "subheading", text: "Key decision #2: Optional, not required" },
    {
      kind: "paragraph",
      text: "End users can only trial Lucid after requesting a license. A required field here would gate the exact moment we want users to get started. We kept it optional — capturing context from motivated users without adding friction for everyone else.",
    },
    {
      kind: "paragraph",
      text: "This also enabled a follow-on capability: letting users add or edit their justification while a request is still pending, or when re-requesting.",
    },

    { kind: "subheading", text: "Key decision #3: Free text over pre-defined options" },
    {
      kind: "paragraph",
      text: "Admins preferred structured options in research. But for V1, free text let us ship faster and learn first. Admins could already add custom instructions guiding what requesters should include — enough structure without over-building. Pre-defined options stayed on the table for future iteration.",
    },

    { kind: "heading", id: "solution", text: "Solution", navLabel: "Solution" },
    {
      kind: "paragraph",
      text: "Once justifications were flowing in, the next question was: where do admins actually need to see them?",
    },
    {
      kind: "paragraph",
      text: "The design principle was straightforward: put the justification wherever the decision is happening. Admins review requests in different contexts — inside the product and in their inbox — so the justification needed to show up across all of them, not just one.",
    },
    { kind: "subsubheading", text: "In product" },
    {
      kind: "paragraph",
      text: "User justification was surfaced across the user table, user details panel, and pending requests page — anywhere an admin might be evaluating a request.",
    },
    { kind: "subsubheading", text: "In email notifications" },
    {
      kind: "paragraph",
      text: "User justification was included directly in the email body so admins could act without even opening Lucid admin panel.",
    },
    { kind: "subsubheading", text: "In product education" },
    {
      kind: "paragraph",
      text: "We also added a lightweight in-product education moment to let existing admins know the feature was available and how to configure it.",
    },

    { kind: "heading", id: "impact", text: "Impact", navLabel: "Impact" },
    { kind: "subheading", text: "Quantitative metrics" },
    {
      kind: "stats",
      period: "4 weeks post-launch",
      items: [
        {
          label: "Adoption",
          value: "53.6%",
          description: "of license requests from eligible accounts included a justification.",
        },
        {
          label: "7-day approval rate",
          value: "+14.5%",
          details: [
            { label: "With justification", value: "52.7%" },
            { label: "Without justification", value: "38.2%" },
          ],
        },
      ],
      note: "Eligible accounts = those that manage license requests directly within the Lucid admin panel. Accounts that redirect end users to external service desks (such as ServiceNow, Jira, or other ticketing systems) were out of scope for this feature.",
    },
    {
      kind: "paragraph",
      text: "This data informed a follow-up A/B test: moving the justification field from the confirmation step into the request modal itself, surfacing it earlier in the flow. The test won — overall request volume was unaffected, validating the move to a more prominent placement.",
    },
    { kind: "subheading", text: "What we learned" },
    {
      kind: "paragraph",
      text: "When admins had context, they acted — and faster. The approval rate lift confirmed that the blocker wasn't admin intent. It was the information gap.",
    },
    {
      kind: "paragraph",
      text: "This project shifted how the team thought about the request funnel. We'd been focused on volume — getting more requests into the pipeline. But the data showed that quality was just as important as quantity, and sometimes quality is the bottleneck. A request with context moved faster than ten without it.",
    },
  ],
};
