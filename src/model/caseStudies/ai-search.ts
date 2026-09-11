// ============================================================
//  CASE STUDY — AI-powered answers in document search
//  Body copy for the /work/ai-search page. Header (title/blurb/
//  labels) comes from the matching Project in content.ts.
// ============================================================

import type { CaseStudyContent } from "../types";

export const aiSearch: CaseStudyContent = {
  id: "ai-search",
  blocks: [
    { kind: "heading", id: "overview", text: "Project Overview" },
    {
      kind: "paragraph",
      text: "Lucid's document list is the primary surface people use to find the decisions, workflows, and infrastructure documentation their teams have created and stored — but beyond basic filters, search itself could only match keywords, not understand what someone was actually asking.",
    },
    {
      kind: "paragraph",
      text: "I led this 0-to-1 initiative from concept through delivery, incorporating a generative-AI experience into Lucid's core search. The system reads intent in what someone types and, when there's enough to work with, surfaces a compact AI-generated answer above the traditional results, automatically. Released internally in July and externally in August 2026; adoption metrics are being tracked post-launch.",
    },
    { kind: "subheading", text: "Timeline" },
    {
      kind: "list",
      items: [
        { label: "June–July 2026", text: "Concept to internal release" },
        { label: "July–August 2026", text: "External release" },
      ],
    },
    { kind: "image", alt: "The AI answer, expanded, above Lucid's traditional document search results" },
    { kind: "subheading", text: "My Role & Contribution" },
    { kind: "paragraph", text: "Lead designer on a 0-to-1 AI initiative." },
    {
      kind: "list",
      items: [
        "Owned design end to end, from concept to external release.",
        "Proposed and aligned the team on key decisions — when AI kicks in, and how AI answers are surfaced.",
        "Designed and aligned with the Design System team on new components needed for the AI experience.",
      ],
    },
    { kind: "subheading", text: "Teams & Collaborators" },
    {
      kind: "list",
      items: [
        {
          label: "Search team (PM, engineers, ML engineer)",
          text: "My direct scrum team. Collaborated from design through delivery on how AI shows up in the search experience — the interaction details on the results page.",
        },
        {
          label: "AI Hub team (designer, engineers)",
          text: "Owns Lucid's doclist AI hub experience. Worked closely with them on what counts as a good AI answer — how results are evaluated and how confidence is determined.",
        },
        {
          label: "Design System",
          text: "Partnered to design new components needed for the AI experience (inline button, inline user chip).",
        },
      ],
    },

    { kind: "heading", id: "problem-space", text: "Problem Space" },
    {
      kind: "paragraph",
      text: "Search has always mattered at Lucid. People build technical workflows, cloud infrastructure diagrams, product roadmaps, and org charts inside the product — and finding that knowledge again has long been a priority, one we've kept investing in across accuracy, performance, and usability.",
    },
    {
      kind: "paragraph",
      text: "Prior research reflected this directly: across 35+ calls, users consistently said the thing they searched for lived inside their documents, not in the title. Search could only return a list of vague matches, leaving them to open each one and check.",
    },
    {
      kind: "paragraph",
      text: "At the same time, what people expect from search has been shifting. Search itself has been moving along a spectrum — from retrieval toward answering — and that shift has raised the bar for what people expect a search experience to do.",
    },
    {
      kind: "paragraph",
      text: "At this particular moment, both were true — search still mattered as much as ever, and generative AI had finally made a better version of it possible. That's the opportunity this project set out to act on.",
    },

    { kind: "heading", id: "key-considerations", text: "Key considerations" },
    { kind: "subheading", text: "Initial prototype" },
    {
      kind: "paragraph",
      text: "An engineer on the search team built a coded prototype that layered AI directly into doclist search and demoed it to the team. It proved the potential — AI surfaced accurate matches based on what was asked — but it also surfaced two problems.",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        "Performance, and the perception of it. AI-generated results took meaningfully longer to load than a normal search. And because nothing on screen indicated AI was involved, that delay didn't read as a new capability warming up — it just felt like search had gotten slower.",
        "The traditional results format showed its limits. Reusing the existing layout for AI-generated results caused two distinct issues: no way to tell why a document was surfaced as a match — the format didn't explain its own reasoning — and no way to represent a narrowed, high-confidence set, since a layout built for scanning a long list had no way to hold a precise few.",
      ],
    },
    { kind: "paragraph", text: "These two problems shaped the decisions that followed." },

    { kind: "subheading", text: "Decision #1: When should AI kick in? Opt-in, or intent-aware?" },
    { kind: "subheading", text: "First idea: an AI toggle" },
    {
      kind: "paragraph",
      text: "If users chose to turn AI mode on themselves, they'd likely expect it to take a moment — making the latency easier to accept.",
    },
    { kind: "subheading", text: "The problem" },
    {
      kind: "paragraph",
      text: "AI answer quality depends heavily on what the user gives it to work with. A user who opted in and typed a single keyword would get a slow answer that was no better than traditional search — the toggle put the burden on users to know when AI would actually help, with no protection against turning it on for a query it couldn't do anything with.",
    },
    { kind: "subheading", text: "The decision: make the system decide" },
    {
      kind: "paragraph",
      text: "Intent-aware search evaluates how much information is in the query itself, and only runs the AI answer when there's enough signal to make it worthwhile. Sparse, keyword-style queries stay fast and get traditional results; specific, question-style queries get the richer AI experience — automatically, with no mode for the user to discover or manage.",
    },
    { kind: "image", alt: "Early exploration of an AI mode toggle in the search bar" },

    { kind: "subheading", text: "Decision #2: Where should the AI answer live? A separate tab, or inline above the results?" },
    { kind: "subheading", text: "The alternative" },
    {
      kind: "paragraph",
      text: 'A separate "AI answer" tab next to "All results," appearing only once AI had something to show. Clean separation, but it put a click between the user and the answer — they\'d have to notice the tab and switch views before finding out whether AI found anything.',
    },
    { kind: "image", alt: "A separate AI answer tab, explored and rejected" },
    { kind: "subheading", text: "The decision: inline, above the traditional results, collapsed by default" },
    { kind: "paragraph", text: "This resolved three things at once." },
    {
      kind: "list",
      items: [
        {
          label: "Performance",
          text: 'Traditional results appear immediately; the AI answer shows a loading state above them, so AI\'s presence is felt immediately, even before it has an answer. Once ready, it settles into a collapsed view — just the top match, visible without any extra click. A "Show more" click expands the rest.',
        },
        {
          label: "Rationale",
          text: "Each result shows the document name alongside a summary generated for that query, so a user can tell why it matched without opening the document to check.",
        },
        {
          label: "Format",
          text: "Since AI could often narrow a broad query down to just a few documents, the answer was kept compact rather than sized for a long list — leaving the rest of the page for the full traditional results, for anyone who wanted to browse rather than rely on the narrowed answer.",
        },
      ],
    },
    { kind: "image", alt: "Performance: results appear instantly while the AI answer loads above them" },
    { kind: "image", alt: "Rationale: each AI result shows why it matched" },
    { kind: "image", alt: "Format: a compact, collapsed AI answer above the full results list" },

    { kind: "subheading", text: "Decision #3: Where should follow-up conversation happen? In search, or in the AI hub?" },
    { kind: "subheading", text: "The obvious path" },
    {
      kind: "paragraph",
      text: "Build conversation directly into search — turn the AI answer into the start of a chat thread on the results page.",
    },
    { kind: "subheading", text: "The decision: hand off instead" },
    {
      kind: "paragraph",
      text: "Lucid already has an AI hub built for back-and-forth with Lucid AI. Building a second, parallel conversational experience inside search would have meant maintaining two chat patterns for the same capability, and blurred what each surface was for — search is where people go to find something fast; the hub is where they go to think something through.",
    },
    {
      kind: "paragraph",
      text: 'The AI answer includes a "Chat more with Lucid AI" input. Submitting it carries the original query and the AI\'s answer into the hub, so follow-up picks up in context instead of starting cold. Search stays scoped to what it does best — get people to an answer quickly — while deeper conversation lives where it\'s already built to happen.',
    },
    { kind: "image", alt: "Handing off a follow-up question from search into Lucid's AI hub" },

    { kind: "heading", id: "solution", text: "Solution" },
    { kind: "subheading", text: "The Experience, End to End" },
    {
      kind: "paragraph",
      text: 'Signaling AI-powered search. New sparkle icon and placeholder text — "What are you looking for?" — nudge people to ask, not just type keywords. That shift in input is what intent-aware search depends on.',
    },
    { kind: "image", alt: "New sparkle icon and placeholder text signal AI-powered search" },
    {
      kind: "paragraph",
      text: 'Fast by default, AI layered on top. Traditional results load instantly; the AI answer appears above them in a loading state, so AI\'s presence is felt right away — then settles into a collapsed view once ready, showing just the top match: a bolded clickable title plus a one-line summary generated fresh for that query. "Show more" expands the rest.',
    },
    { kind: "image", alt: "Traditional results load instantly while the AI answer loads above them" },
    {
      kind: "paragraph",
      text: 'Deeper answers, with a seamless hand-off. Expanding reveals every matched document with its own generated summary, plus an embedded "Chat more with Lucid AI..." input. Typing a follow-up there shows a quiet "Prompt sent to Lucid AI" confirmation, then opens the conversation in Lucid\'s AI hub, carrying the original query and answer forward so nothing restarts cold. Search stays fast and scoped; the hub takes over for deeper conversation.',
    },
    { kind: "image", alt: "Expanded AI answer with an embedded hand-off to Lucid's AI hub" },

    { kind: "subheading", text: "New components, built for the AI experience" },
    {
      kind: "paragraph",
      text: 'Resolving ambiguity with a chip. Ambiguous names — "documents Peter shared with me" — surface a dropdown to disambiguate. The selected person renders as a chip in both the search input and the AI answer itself ("Found 3 roadmaps shared by Sarah Chen in the last 7 days"), resolving the ambiguity without a back-and-forth and staying visible as confirmation.',
    },
    { kind: "image", alt: "A person chip resolves an ambiguous name in both the query and the AI answer" },
    {
      kind: "paragraph",
      text: "Compact answers via inline links. Each AI result flows as a single block — a clickable document title followed directly by its summary — rather than a separate row or card. That compactness is what keeps both the collapsed and expanded states tight enough to sit above the full traditional results.",
    },
    { kind: "image", alt: "Compact AI results rendered as inline linked titles with summaries" },
  ],
};
