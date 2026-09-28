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
    {
      kind: "carousel",
      items: [
        {
          src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/end-user-add-justification.png`,
          alt: "End user adding a justification note when requesting a license",
          caption: "End user adds a justification note",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/admin-review-justification.png`,
          alt: "Admin reviewing a pending license request alongside the user's justification",
          caption: "Admin reviews the justification",
        },
      ],
    },
    { kind: "heading", id: "overview", text: "Project Overview", navLabel: "Overview" },
    {
      kind: "split",
      content: [
        "With the macro economy shifting in 2022, we'd spent months identifying and resolving frictions across the admin licensing and purchasing flows. License grants improved — but a large pool of pending requests still sat unactioned. The flow wasn't the problem anymore. The question was: why weren't admins acting?",
        "By giving end users a voice in the process, we helped admins feel more confident and make more informed decisions when approving or denying license requests.",
      ],
      timeline: [
        {
          date: "January 2023 – May 2023",
          label: "Justification appears directly in the license request, giving admins the context to decide.",
        },
      ],
      sidebar: {
        role: {
          title: "Lead and sole UX designer",
          items: [
            "Owned the end-to-end experience across both user types: the end-user request flow and the admin review experience",
            "Led the project from ideation through release — research, iterative design, and defining success metrics",
          ],
        },
        collaborators: [
          { name: "Enterprise scrum team", text: "1 PM, 5 engineers, 1 QA" },
          {
            name: "Engagement & Virality team",
            text: "Aligned on changes to the request flow (a flow they owned) and coordinated on A/B testing",
          },
          { name: "Analytics team", text: "Co-defined what to track and designed the measurement plan" },
        ],
      },
    },

    { kind: "heading", id: "problem-space", text: "Problem Space", navLabel: "Problem space" },
    {
      kind: "media-split",
      content: [
        {
          kind: "paragraph",
          text: "Unlike tools like Google Workspace or Slack — where everyone gets access by default — Lucid is project-based. Licenses are requested based on actual need, which means admins are actively reviewing and deciding on every request.",
        },
        {
          kind: "paragraph",
          text: "But requests arrived with only basic information: a user's name, email, request date, frequency, and license type. That's enough to see who is asking — but not why. Admins had no way to evaluate urgency or legitimacy without leaving the product to investigate on their own. The gap wasn't in the flow. It was in the information.",
        },
      ],
      media: {
        kind: "image",
        src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/problem-space.png`,
        alt: "A pending license request showing only requester name, email, and request details — license type, date, and count — with no context on why",
        caption: "All the context a pending request gave an admin",
      },
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
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/admin-research-synthesis.png`,
      alt: "Notes and synthesis from 10 admin interviews, organized into top takeaways and other takeaways",
      caption: "Admin interview notes and synthesis",
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
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/end-user-research-synthesis.png`,
      alt: "Notes and synthesis from 6 end user calls, organized into top takeaways and other takeaways",
      caption: "End user call notes and synthesis",
    },
    {
      kind: "paragraph",
      text: "Both sides wanted the same thing: a way to connect the reason behind the request to the moment of decision.",
    },
    { kind: "subheading", text: "Process snapshots" },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/brainstorming-and-prioritization.png`,
      alt: "Brainstormed ideas for surfacing user justification, grouped into a V1/MVP scope and longer-term ideas",
      caption: "Brainstorming solution directions and prioritizing by feasibility and expected impact",
    },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/solution-scope-and-alignment.png`,
      alt: "The full solution mapped out across the end-user request flow, admin review, email notifications, and license settings",
      caption: "Aligning with the Engagement & Virality team — scoping changes without disrupting key business metrics",
    },

    { kind: "heading", id: "key-decisions", text: "Key Design Decisions", navLabel: "Key decisions" },
    {
      kind: "paragraph",
      text: "This solution touches two sides of the same flow: the end user submitting a request, and the admin reviewing it. The design decisions below focus on the end-user side — how we captured justifications without hurting request volume or adding unnecessary friction.",
    },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/current-experience.png`,
      alt: "The existing end-user flow: a view-only user is prompted to request a license, and gets 7 days of full access while their request is pending",
      caption: "The existing end-user request flow, before this project",
    },

    { kind: "subheading", text: "Key decision #1: Placement — the confirmation step, not the request modal" },
    {
      kind: "paragraph",
      text: "License request volume is a metric we actively protect — it's a direct input to growth. Placing the justification field in the request modal risked suppressing that number and muddying our ability to measure impact.",
    },
    { kind: "subsubheading", text: "V1" },
    {
      kind: "image-row",
      items: [
        {
          src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/v1-request-modal-hint.png`,
          alt: "V1 request modal hinting that users can add a message for their admin in the next step",
          caption: "Hints at the option in the request modal",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/v1-confirmation-note.png`,
          alt: "V1 confirmation step with an optional note field for the admin, shown after the request is sent",
          caption: "Optional note field lives in the confirmation step",
        },
      ],
    },
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
      kind: "image-row",
      items: [
        {
          src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/v2-request-modal-note.png`,
          alt: "V2 request modal with the justification field moved directly into it, ahead of submitting the request",
          caption: "Note field moved into the request modal itself",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/v2-confirmation.png`,
          alt: "V2 confirmation step, simplified now that the note is captured earlier in the request modal",
          caption: "Confirmation step simplifies once the note moves earlier",
        },
      ],
    },
    {
      kind: "paragraph",
      text: "After seeing that requests with justifications had a significantly higher approval rate, we ran a follow-up A/B test moving the field into the request modal — surfacing it earlier in the flow. It didn't hurt overall request volume, confirming the concept was strong enough to survive more friction and validating the move to a more prominent placement.",
    },

    { kind: "subheading", text: "Key decision #2: Optional, not required" },
    {
      kind: "media-split",
      content: [
        {
          kind: "paragraph",
          text: "End users can only trial Lucid after requesting a license. A required field here would gate the exact moment we want users to get started. We kept it optional — capturing context from motivated users without adding friction for everyone else.",
        },
      ],
      media: {
        kind: "image",
        src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/justification-optional-field.png`,
        alt: "The request modal noting that justification is an optional field users can skip if they don't have a clear use case yet",
        caption: "Optional, so it never blocks the request",
      },
    },
    {
      kind: "media-split",
      content: [
        {
          kind: "paragraph",
          text: "This also enabled a follow-on capability: letting users add or edit their justification while a request is still pending, or when re-requesting.",
        },
      ],
      media: {
        kind: "image",
        src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/justification-edit-or-reask.png`,
        alt: "A dialog letting a user with a pending request add or edit their note to the admin, or request again",
        caption: "Users can add or edit their note while a request is pending",
      },
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
    {
      kind: "carousel",
      items: [
        {
          src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/pending-requests-page.png`,
          alt: "User justification shown inline on the pending license requests page, with a filter for requests that include one",
          caption: "Surfaced on the pending requests page, with a filter",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/user-table.png`,
          alt: "User justification visible when an admin edits a user's licenses from the user table",
          caption: "Visible when admins edit licenses from the user table",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/user-details-panel.png`,
          alt: "User justification visible in the expanded user details panel",
          caption: "Visible in the user details panel",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/most-recent-requests.png`,
          alt: "User justification shown alongside the most recent pending requests on the Users overview page",
          caption: "Shown alongside the most recent requests",
        },
      ],
    },
    { kind: "subsubheading", text: "In email notifications" },
    {
      kind: "media-split",
      content: [
        {
          kind: "paragraph",
          text: "User justification was included directly in the email body so admins could act without even opening Lucid admin panel.",
        },
      ],
      media: {
        kind: "image",
        src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/email-notification.png`,
        alt: "License request email notification with the user's justification included in the body, alongside grant and deny actions",
        caption: "Justification included in the email notification",
      },
    },
    { kind: "subsubheading", text: "In product education" },
    {
      kind: "paragraph",
      text: "We also added a lightweight in-product education moment to let existing admins know the feature was available and how to configure it.",
    },
    {
      kind: "image-row",
      items: [
        {
          src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/in-product-education-launch.png`,
          alt: "In-product education callout on the admin panel overview announcing that users can now include justifications with license requests",
          caption: "Announced at launch on the admin overview",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/license-request-justification/in-product-education-settings.png`,
          alt: "License request settings page directing admins to where they can add custom instructions for end users",
          caption: "Points admins to where they can customize instructions",
        },
      ],
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
