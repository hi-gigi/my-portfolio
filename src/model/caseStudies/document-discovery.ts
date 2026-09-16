// ============================================================
//  CASE STUDY — Document discovery: search and audit across an org
//  Body copy for the /work/document-discovery page. Header
//  (title/blurb/labels) comes from the matching Project in content.ts.
//
//  Migrated from the Webflow version at jiaqizhuo.com/document-discovery.
//  Content only — layout is being iterated on separately from what
//  Webflow had, so this reuses the same block vocabulary as
//  ai-search.ts rather than reproducing the old page's structure
//  (callout boxes, quote carousel, etc.). Real art (personas, ranking
//  chart, screenshots, testimonials) still needs to land — every
//  image block below is a placeholder.
// ============================================================

import type { CaseStudyContent } from "../types";

export const documentDiscovery: CaseStudyContent = {
  id: "document-discovery",
  blocks: [
    { kind: "heading", id: "overview", text: "Project Overview", navLabel: "Overview" },
    {
      kind: "split",
      content: [
        "As enterprise customers stored more sensitive IP in Lucid, they needed stronger data governance and compliance tooling to adopt and expand with confidence. But admins had no visibility into the documents their users created or the content across their workspace.",
        "I led this 0-to-1 initiative from research through delivery, defining and shipping a V1 document discovery experience for a new Document Admin role. The solution enabled admins to search account-owned content by user, date, and keyword — providing the visibility needed for security and legal workflows.",
        "Launched to a beta group, the feature received strong customer feedback and established the foundation for Lucid's Enterprise Shield add-on, which has since surpassed $xxM in iARR.",
      ],
      timeline: [{ date: "March 2022 – July 2022", label: "Document discovery (Beta version)" }],
      sidebar: {
        role: {
          title: "Sole UX designer on a 0-to-1 initiative",
          items: [
            "Owned design end to end — from ideation through Alpha and Beta delivery",
            "Drove discovery and synthesis, reframing document discovery from a single feature into a problem space spanning access control, retention, and legal hold",
            "Scoped and sequenced V1 under tight constraints — deciding what to build first and why",
          ],
        },
        collaborators: [
          { name: "PM", text: "Co-led discovery research, scoping, and prioritization." },
          {
            name: "Customer Success",
            text: "Recruited admins with documented document management or retention needs for research.",
          },
          {
            name: "Internal IT, Security & Legal",
            text: "Consulted as subject matter experts during discovery, and partnered with Security and Legal throughout development to ensure the feature met data privacy and compliance requirements.",
          },
          {
            name: "Engineering",
            text: "Collaborated throughout design and delivery to assess technical effort and scope tradeoffs.",
          },
        ],
      },
    },

    { kind: "heading", id: "problem-space", text: "Problem Space", navLabel: "Problem space" },
    {
      kind: "paragraph",
      text: 'The same requests kept coming from enterprise customers: "I need visibility into what my users are creating," "I need to spot-check documents for PII before it turns into a liability." Neither was easy to do in Lucid.',
    },
    {
      kind: "paragraph",
      text: "By early 2022, the volume and urgency had grown — especially among customers in highly regulated industries, where governance wasn't optional. We treated it as a signal, not a series of one-offs, and stood up a second enterprise team dedicated to the problem.",
    },
    {
      kind: "paragraph",
      text: "The bet: data governance capabilities were essential to making Lucid enterprise-ready, and worth building for every customer with these needs, not just the one asking.",
    },

    { kind: "heading", id: "research", text: "Research", navLabel: "Research" },
    {
      kind: "paragraph",
      text: 'Before any design could happen, the problem space had to be defined from scratch. There was no existing feature and no shared understanding of what "document discovery" even meant in the context of Lucid\'s product. We ran a multi-method discovery effort across three streams.',
    },
    { kind: "subheading", text: "Competitive & market research" },
    {
      kind: "paragraph",
      text: "Benchmarked in two directions: the industry leaders in document governance and compliance (Google Vault, Microsoft 365, Slack, Box) to learn from the mature standard, and canvas-based competitors to understand what document management and governance mean in a visual-collaboration product like Lucid.",
    },
    { kind: "subheading", text: "External admin interviews" },
    {
      kind: "paragraph",
      text: "Talked to 7 admins across pharma, financial services, healthcare, aerospace & defense, enterprise tech, and media & entertainment.",
    },
    {
      kind: "paragraph",
      text: "The goal was to deeply understand their needs and use cases around document discovery, management, and retention — and to help define what those concepts meant specifically in the context of Lucid.",
    },
    { kind: "subheading", text: "Internal subject matter expert interviews" },
    {
      kind: "paragraph",
      text: "Consulted internal IT, Security, and Legal teams to deepen our understanding of these roles and the tools they already use to accomplish similar goals.",
    },

    { kind: "subheading", text: "Key personas" },
    {
      kind: "paragraph",
      text: 'From the synthesis, we identified three distinct admin personas with meaningfully different needs. The personas made clear that "document discovery" wasn\'t a single feature — it was a problem space spanning access control, retention, and legal hold.',
    },
    { kind: "image", alt: "Three admin personas surfaced from research synthesis" },

    { kind: "subheading", text: "Key needs identified from discovery research" },
    { kind: "paragraph", text: "Across the three personas, the needs converged into four capability areas." },
    { kind: "subsubheading", text: "Document Visibility" },
    {
      kind: "paragraph",
      text: "Before admins can do anything else, they need to see what's in their account and who owns it.",
    },
    {
      kind: "list",
      items: [
        "Pull account-owned documents by user, content, or other criteria",
        "Open and audit what's inside a document",
      ],
    },
    { kind: "subsubheading", text: "Document Controls" },
    { kind: "paragraph", text: "Once admins find what they're looking for, they need to act on it." },
    {
      kind: "list",
      items: [
        "Revoke external access to protect company assets",
        "Reassign ownership or adjust access to handle day-to-day requests",
        "Redact PII and other sensitive content within a document",
        "Bulk-export documents for legal and audit review",
      ],
    },
    { kind: "subsubheading", text: "Legal Hold" },
    {
      kind: "paragraph",
      text: "During an active investigation, admins need to secure the relevant records before anything is lost.",
    },
    {
      kind: "list",
      items: [
        "Quickly pull documents tied to a specific user or project under investigation",
        "Prevent those documents from being deleted until the investigation closes",
      ],
    },
    { kind: "subsubheading", text: "Retention Compliance" },
    {
      kind: "paragraph",
      text: "Retention isn't one-size-fits-all: each company sets its own policies by data classification, and they classify Lucid content in different ways.",
    },
    {
      kind: "list",
      items: [
        "Set retention periods for Lucid content, compliant with company policy",
        "Maintain a central holding account for documents that must be preserved",
      ],
    },

    { kind: "heading", id: "key-decisions", text: "Key Decisions", navLabel: "Key decisions" },
    {
      kind: "paragraph",
      text: "Research surfaced four distinct capability areas. Given the constraints — one scrum team, three engineers, and a deadline to deliver to the customer by end of quarter — we prioritized ruthlessly.",
    },
    { kind: "paragraph", text: "We ranked capabilities in order of admin impact and urgency:" },
    { kind: "image", alt: "Capability areas ranked by admin impact and urgency" },
    {
      kind: "paragraph",
      text: "We scoped V1 entirely to Document Visibility, with a clear goal: get a solid, tested foundation in front of customers quickly and use their feedback to sequence what came next.",
    },

    { kind: "heading", id: "solution", text: "Solution", navLabel: "Solution" },
    {
      kind: "paragraph",
      text: "We added a Document Discovery page to the admin panel, allowing document admins to search across the account by users, creation date, and keywords.",
    },
    { kind: "image", alt: "Document Discovery page in the admin panel" },
    { kind: "subsubheading", text: "Callout #1 — A new admin role" },
    {
      kind: "paragraph",
      text: "Viewing document content is a highly sensitive permission — only a few people in an organization should have it, and their actions need to be auditable. Rather than granting it to all existing admins, we introduced a dedicated Document Admin role to enforce that boundary.",
    },
    { kind: "subsubheading", text: "Callout #2 — Keyword search scope" },
    {
      kind: "paragraph",
      text: "We deliberately extended keyword search beyond document titles to include document content. Admins need to cast as wide a net as possible — naming conventions vary across users, and sensitive information is often buried inside a document, not surfaced in its title. Additional criteria let admins narrow from there.",
    },
    { kind: "image", alt: "Keyword search scope extended to document content" },

    { kind: "heading", id: "impact", text: "Impact", navLabel: "Impact" },
    {
      kind: "paragraph",
      text: "The feature shipped within the quarter. Early beta feedback validated the direction.",
    },
    { kind: "image", alt: "Direct feedback from beta customers" },
    { kind: "subheading", text: "A foundation that kept growing" },
    {
      kind: "paragraph",
      text: "Following V1, we deepened search so admins could pull exactly the documents they needed — filtering by multiple users, team folders, ownership type (owned vs. accessible), and whether a document had external shares.",
    },
    {
      kind: "paragraph",
      text: "Later releases went beyond discovery into action: document ownership transfer, external link revocation, external user removal, relocation to team folders, and bulk classification labeling — giving admins progressively more control over account content.",
    },
    {
      kind: "paragraph",
      text: "Document Discovery was Lucid's first real step into compliance — and it changed how the company thought about the space. The foundation it laid was reused for content inspection and beyond, and it made the case that advanced security and compliance were worth monetizing. That thinking became the Lucid Enterprise Shield add-on, launched in Q3 2024 and past $xxM+ iARR.",
    },
  ],
};
