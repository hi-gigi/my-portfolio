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
      cropTopPx: 2,
      alt: "An admin managing distributed permissions, sharing controls, and license limits across Organizational Groups",
      caption: "Remove a custom permission at the organizational group level so it inherits again",
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
          { name: "Product Marketing & Help Center", text: "Go-to-market, release announcement, and admin-facing documentation" },
        ],
      },
    },

    { kind: "heading", id: "problem-space", text: "Problem Space", navLabel: "Problem space" },
    {
      kind: "paragraph",
      text: "Lucid's legacy group model was originally built for document distribution, then later leveraged for group-based license allotment. As customer needs grew, the model started to show its limits:",
    },
    {
      kind: "icon-columns",
      items: [
        {
          icon: `${import.meta.env.BASE_URL}case-studies/distributed-admin-controls/icon-tangled-mental-model.webp`,
          content: [
            { kind: "subsubheading", text: "Tangled mental model" },
            {
              kind: "paragraph",
              text: "Sharing and license membership were mixed together in one construct, leaving admins confused about how to set up and manage their groups",
            },
          ],
        },
        {
          icon: `${import.meta.env.BASE_URL}case-studies/distributed-admin-controls/icon-performance-at-scale.webp`,
          content: [
            { kind: "subsubheading", text: "Performance at scale" },
            {
              kind: "paragraph",
              text: "For accounts with multi-level group structures, the license allotment modal took an unreasonable amount of time to load, making it effectively unusable",
            },
          ],
        },
        {
          icon: `${import.meta.env.BASE_URL}case-studies/distributed-admin-controls/icon-lack-of-granular-controls.webp`,
          content: [
            { kind: "subsubheading", text: "Lack of granular controls" },
            {
              kind: "paragraph",
              text: "Growing enterprise accounts were increasingly asking for controls at the group level rather than single settings that applied to all users across the entire account",
            },
          ],
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
      kind: "paragraph",
      text: "**Group-first** — Admins navigate to a group, then modify settings from within the group detail view",
    },
    {
      kind: "carousel",
      items: [
        { src: "/case-studies/distributed-admin-controls/group-first-members.webp", alt: "Group-first concept: the group details page, members tab", caption: "Group details — members" },
        { src: "/case-studies/distributed-admin-controls/group-first-license-requests.webp", alt: "Group-first concept: the group details page, license requests tab", caption: "Group details — license requests" },
        { src: "/case-studies/distributed-admin-controls/group-first-group-settings.webp", alt: "Group-first concept: the group details page, group-specific settings tab", caption: "Group details — group-specific settings" },
      ],
    },
    {
      kind: "paragraph",
      spaced: true,
      text: "**Setting-first** — Admins navigate to a settings page as usual, with a group panel added to let them view and override settings per org group",
    },
    {
      kind: "image",
      src: "/case-studies/distributed-admin-controls/setting-first-groups-panel.webp",
      alt: "Setting-first concept: a groups panel added to the settings page, with no net-new group-specific settings page",
      caption: "Groups panel on the settings page",
    },
    {
      kind: "paragraph",
      spaced: true,
      text: "**We went with the setting-first model for two reasons.**",
    },
    {
      kind: "list",
      items: [
        "First, it keeps each settings page as the single source of truth — admins don't have to wonder whether a setting lives on the group page or the settings page.",
        "Second, the group panel lets admins compare and manage settings across multiple org groups in one place, rather than navigating in and out of individual group pages.",
      ],
    },
    {
      kind: "carousel",
      aspectRatio: "2.05 / 1",
      spaced: true,
      items: [
        { src: "/case-studies/distributed-admin-controls/group-details-panel-read-only.webp", alt: "The group details panel, showing an org group's settings read-only", caption: "Group details panel — read-only" },
        { src: "/case-studies/distributed-admin-controls/group-details-panel-redirect.webp", alt: "A direct link from the group details panel redirecting the admin to the relevant settings page to make changes", caption: "Redirect to the relevant settings page to make changes" },
      ],
    },
    {
      kind: "paragraph",
      text: "Rather than abandoning the group-first path entirely, we **designed the group details panel as a read surface** — admins can view all settings for a specific org group in one place, **with direct links that take them to the relevant settings page to make changes**. This preserved discoverability for admins who naturally start from the group, without creating a second place to edit settings.",
    },
    {
      kind: "media-split",
      spaced: true,
      content: [
        {
          kind: "paragraph",
          text: "**Validation research supported this direction:** most admins navigated to the settings page first and completed the task without friction. Admins who started from the org groups page were still able to figure out the flow through the group details panel.",
        },
      ],
      media: {
        kind: "image",
        src: "/case-studies/distributed-admin-controls/validation-research-readout.webp",
        alt: "Validation research readout, summarizing the research goals and key findings from testing the setting-first design",
        caption: "Validation research readout — goals and key findings",
      },
    },

    { kind: "subheading", text: "Org Groups Panel: From Toggle to Hierarchy" },
    {
      kind: "image",
      src: "/case-studies/distributed-admin-controls/org-group-panel-iterations.webp",
      alt: "Iterations of the org groups panel, from a toggle between account settings and org group settings to a single hierarchical tree",
      caption: "Org groups panel iterations",
    },
    {
      kind: "paragraph",
      text: "**Early iterations (Options 1–3.2) kept \"Account settings\" and \"org group settings\" as two separate modes that admins toggled between** — first with radio buttons, then segmented tabs, then a nav-style list, with the last pass adding inline copy explaining that groups without custom settings inherit from the account. Each iteration polished the styling, but the underlying model stayed the same: account-level and group-level settings as two parallel, separate places.",
    },
    {
      kind: "paragraph",
      text: "We ultimately moved away from that toggle. **The final design renders org groups as a single hierarchical tree** — the account-level default appears as the top-level group (e.g., \"BigComplexCo (Default)\"), with nested org groups indented beneath it. **Rather than explaining inheritance with copy, the hierarchy shows it directly** — it's visually clear which settings are the default and which groups branch off with their own overrides.",
    },

    { kind: "subheading", text: "Visual Indicator for Custom Group Settings" },
    {
      kind: "paragraph",
      text: "Validation research surfaced a clear ask: **admins wanted a holistic view of which org groups had settings that differed from the account-level default**, without opening each group individually.",
    },
    {
      kind: "image",
      src: "/case-studies/distributed-admin-controls/visual-indicator-custom-settings.webp",
      alt: "Icon concepts tested for marking org groups with custom settings, and the final plain gray dot with a tooltip",
      caption: "Visual indicator for custom group settings",
    },
    {
      kind: "paragraph",
      text: "I tested several icon concepts — a pencil-and-sparkle mark, a flag, a filled dot, an outlined circle — looking for one that would intuitively read as \"this group has custom settings.\" None did; in testing with a handful of users, no icon communicated that meaning without explanation.",
    },
    {
      kind: "paragraph",
      text: "The final design kept it simple: a plain gray dot, paired with a tooltip (\"This group has custom settings that differ from its parent\"). Rather than keep chasing a self-explanatory icon, **I treated this as a one-time education problem — once an admin learns what the dot means, they recognize it on sight from then on**.",
    },

    { kind: "heading", id: "solution", text: "Solution", navLabel: "Solution" },
    {
      kind: "paragraph",
      text: "At launch, Organizational Groups gave enterprise admins three new capabilities:",
    },
    {
      kind: "list",
      items: [
        {
          text: "**Group-based access and licensing.** For roles or departments where Lucid is a must-have, admins designate groups as licensing groups. Members get a license automatically and lose it when they're removed from the group.",
          children: [
            "Contrast: request-for-access groups, where members request a license with a valid use case and an admin approves.",
          ],
        },
        "**Org-group-based sharing permissions.** Granular control over who can share externally. For example, sales and marketing can share with external clients, while legal, finance, and HR cannot.",
        "**Distributed administration.** Admin responsibilities are delegated to group leads and managers, who help central IT manage users on their team, department, or group.",
      ],
    },
    {
      kind: "carousel",
      aspectRatio: "2880 / 1463",
      items: [
        { src: "/case-studies/distributed-admin-controls/group-based-licensing.webp", alt: "Group-based access and licensing: a group pre-approved for Lucid, where members get a license automatically", caption: "Group-based access and licensing" },
        { src: "/case-studies/distributed-admin-controls/group-based-sharing-permissions.webp", alt: "Org-group-based sharing permissions: a group permitted to share documents with external users as needed for their work", caption: "Org-group-based sharing permissions" },
        { src: "/case-studies/distributed-admin-controls/delegated-admin-roles.webp", alt: "Distributed administration: assigning an org group admin to a group, and the org group admin's view", caption: "Distributed administration" },
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
      text: "To validate impact, we interviewed power users of legacy groups — whose feedback confirmed the new experience resolved major pain points from the legacy model and effectively supports their budget-driven license allocation needs.",
    },
  ],
};
