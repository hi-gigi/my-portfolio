// ============================================================
//  CASE STUDY — Distributed admin controls for Enterprise accounts
//  (Organizational Groups)
//  Body copy for the /work/distributed-admin-controls page. Header
//  (title/blurb/labels) comes from the matching Project in content.ts.
//
//  Drafted from the source doc (Sept 2026). Content only — no art yet,
//  so every image/carousel/image-row block below omits `src` and
//  renders the placeholder panel until real screenshots land.
//
//  The doc left two admin quotes and a Dec 2023 adoption count as
//  [PLACEHOLDER] — omitted here rather than invented. Fill in once
//  the real numbers/quotes are available.
// ============================================================

import type { CaseStudyContent } from "../types";

export const distributedAdminControls: CaseStudyContent = {
  id: "distributed-admin-controls",
  blocks: [
    {
      kind: "video",
      src: `${import.meta.env.BASE_URL}case-studies/distributed-admin-controls/overview-video.mp4`,
      playbackRate: 1.2,
      startPauseMs: 2000,
      alt: "An admin managing distributed permissions, sharing controls, and license limits across Organizational Groups",
      caption: "Organizational Groups overview",
    },
    { kind: "heading", id: "overview", text: "Project Overview", navLabel: "Overview" },
    {
      kind: "split",
      content: [
        "Lucid's legacy group model was originally built for document sharing — then stretched to handle license allocation as enterprise accounts scaled. As needs and complexity grew, **the model started to show cracks, slowing admins down.**",
        "With the goal of untangling the legacy model, I led the end-to-end design of Organizational Groups — a brand new entity that replaced its admin-governed half, offering distributed administration, group-level security controls, and per-group license caps.",
        "Rolled out across thousands of enterprise accounts between 2023 and 2025, **the new experience resolved major pain points from the legacy model**, confirmed through feedback from power admin users, and unblocked finer-grained permission and access control use cases.",
      ],
      timeline: [
        {
          date: "2023 (~3 quarters)",
          label: "Discovery through initial release — shipped to all new enterprise accounts in December 2023",
        },
        {
          date: "2024–2025",
          label: "Phased migration — existing accounts moved in waves, tiered by complexity and risk",
        },
      ],
      sidebar: {
        role: {
          title: "Lead and sole UX designer",
          items: [
            "Owned the full design process for Organizational Groups — a brand new group entity — from initial discovery through phased release and migration",
            "Led discovery research, concept development, validation research, information architecture, interaction design, release strategy, and cross-functional alignment",
          ],
        },
        collaborators: [
          { name: "Scrum team", text: "A PM, five engineers, and a QA specialist" },
          { name: "Analytics", text: "Existing account analysis and migration risk tiering" },
          { name: "Customer Success", text: "Customer recruitment for discovery and validation research" },
          { name: "Implementation Team", text: "SCIM account migration" },
          { name: "Product Marketing", text: "Go-to-market and release announcement" },
          { name: "Help Center", text: "Admin-facing documentation" },
        ],
      },
    },

    { kind: "heading", id: "problem-space", text: "Problem Space", navLabel: "Problem space" },
    {
      kind: "paragraph",
      text: "Lucid's legacy group model was originally built for document distribution, then later leveraged for group-based license allotment. As customer needs grew, the model started to show its limits:",
    },
    {
      kind: "list",
      items: [
        {
          label: "Tangled mental model",
          text: "Sharing and license membership were mixed together in one construct, leaving admins confused about how to set up and manage their groups",
        },
        {
          label: "Performance at scale",
          text: "For accounts with multi-level group structures, the license allotment modal took an unreasonable amount of time to load, making it effectively unusable",
        },
        {
          label: "Lack of granular controls",
          text: "Growing enterprise accounts were increasingly asking for controls at the group level rather than single settings that applied to all users across the entire account",
        },
      ],
    },

    { kind: "heading", id: "research", text: "Research", navLabel: "Research" },
    {
      kind: "paragraph",
      text: "To understand how enterprise accounts were actually using groups — and what they needed that the legacy model couldn't support — I conducted discovery interviews with 10 enterprise admins. Four common use cases emerged:",
    },
    {
      kind: "list",
      items: [
        {
          label: "Distributed administration",
          text: "In large organizations, a single IT admin can't manage everything. Department or group leads wanted the ability to manage their own teams — deciding who gets access to Lucid and who needs a paid license — without routing every change through central IT",
        },
        {
          label: "Granular permission controls",
          text: "One-size-fits-all account settings don't work for complex organizations. A legal or finance team may need strict data boundaries so sensitive content is never shared outside the company, while an HR team needs the flexibility to collaborate with external candidates in Lucid documents. Admins needed the ability to set different rules for different groups",
        },
        {
          label: "Internal bill back",
          text: "Many enterprise organizations allocate software licenses by department budget. Admins needed a clear view of how many licenses each group was using — and an easy way to charge costs back to the right department at the end of the billing cycle",
        },
        {
          label: "Document sharing & day-1 access",
          text: "Onboarding a new hire means getting them access to the right documents and tools immediately. Admins wanted a simple way to share a set of documents with a group, or automatically provision access to team repositories the moment someone joins",
        },
      ],
    },
    {
      kind: "image",
      alt: "Synthesis from discovery interviews with 10 enterprise admins, organized into the four recurring use cases",
      caption: "Discovery interview synthesis",
    },
    {
      kind: "paragraph",
      text: "The first three use cases became the foundation for Organizational Groups at launch. The fourth — document sharing and day-1 access — was already partially served by the legacy model and became the foundation for the collaboration-native half of the initiative (Teams and Projects), developed simultaneously by a separate product area.",
    },

    { kind: "heading", id: "key-decisions", text: "Key Design Decisions", navLabel: "Key decisions" },
    { kind: "subheading", text: "Setting-first navigation model" },
    {
      kind: "paragraph",
      text: "When designing how admins modify org group-level settings, we considered two approaches:",
    },
    {
      kind: "list",
      items: [
        {
          label: "Group-first",
          text: "Admins navigate to a group, then modify settings from within the group detail view",
        },
        {
          label: "Setting-first",
          text: "Admins navigate to a settings page as usual, with a group panel added to let them view and override settings per org group",
        },
      ],
    },
    {
      kind: "image-row",
      items: [
        {
          alt: "Group-first concept: admins navigate to a group, then modify settings from within the group detail view",
          caption: "Option A — group-first",
        },
        {
          alt: "Setting-first concept: admins navigate to the settings page, with a group panel to view and override settings per org group",
          caption: "Option B — setting-first",
        },
      ],
    },
    {
      kind: "paragraph",
      text: "We went with the setting-first model for two reasons. First, it keeps each settings page as the single source of truth — admins don't have to wonder whether a setting lives on the group page or the settings page. Second, the group panel lets admins compare and manage settings across multiple org groups in one place, rather than navigating in and out of individual group pages.",
    },
    {
      kind: "paragraph",
      text: "Rather than abandoning the group-first path entirely, we designed the group details panel as a read surface — admins can view all settings for a specific org group in one place, with direct links that take them to the relevant settings page to make changes. This preserved discoverability for admins who naturally start from the group, without creating a second place to edit settings.",
    },
    {
      kind: "media-split",
      content: [
        {
          kind: "paragraph",
          text: "Validation research supported this direction: most admins navigated to the settings page first and completed the task without friction. Admins who started from the org groups page were still able to figure out the flow through the group details panel.",
        },
      ],
      media: {
        kind: "image",
        alt: "The group details panel, showing settings read-only with direct links out to the relevant settings page to make changes",
        caption: "Group details panel — a read surface with links out to edit",
      },
    },

    { kind: "heading", id: "solution", text: "Solution", navLabel: "Solution" },
    {
      kind: "paragraph",
      text: "At launch, Organizational Groups gave enterprise admins three new capabilities:",
    },
    {
      kind: "list",
      items: [
        "Delegated admin responsibilities across the org",
        "Group-level sharing permission controls",
        "License limits per group for budget management and internal bill back",
      ],
    },
    {
      kind: "carousel",
      items: [
        { alt: "Delegated admin responsibilities for an org group", caption: "Delegated admin roles" },
        { alt: "Group-level sharing permission controls", caption: "Sharing permission controls" },
        { alt: "Per-group license limits for budget management and internal bill back", caption: "License limits per group" },
      ],
    },
    {
      kind: "paragraph",
      text: "The collaboration-native half of the initiative (Lucid team hubs) was developed simultaneously by a separate product area.",
    },

    { kind: "heading", id: "impact", text: "Impact", navLabel: "Impact" },
    {
      kind: "list",
      ordered: true,
      items: [
        { label: "December 2023", text: "Launched Organizational Groups to new enterprise accounts" },
        {
          label: "September 2024",
          text: "Provided a migration path for accounts using SCIM to move to the new org groups experience; 65 accounts migrated within the first week of release",
        },
        {
          label: "December 2024",
          text: "Released license limits for Organizational Groups; 62 customers adopted org group-based license limits within the first month",
        },
        {
          label: "July 2025",
          text: "Migrated 9 true-up accounts to the new org groups and license limits experience, unblocking a parallel billing initiative",
        },
        {
          label: "November 2025",
          text: "Migrated all non-SCIM accounts (1,700+) to the new org groups experience",
        },
      ],
    },
    {
      kind: "paragraph",
      text: "To validate impact, we interviewed power users of license allotments — whose feedback confirmed the new experience resolved major pain points from the legacy model and effectively supports their budget-driven license allocation needs.",
    },
  ],
};
