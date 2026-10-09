// ============================================================
//  CASE STUDY — Hasbro Pulse Mobile Experience
//  Body copy for the /work/hasbro-pulse page. Header (title/blurb/
//  labels) comes from the matching Project in content.ts.
//
//  Migrated from the Webflow version at jiaqizhuo.com/hasbro-intern-project.
//  Copy is verbatim from the live site, reorganized into the same
//  block vocabulary and section layout as ai-search.ts and
//  document-discovery.ts — no image blocks; real art can land later.
// ============================================================

import type { CaseStudyContent } from "../types";

export const hasbroPulse: CaseStudyContent = {
  id: "hasbro-pulse",
  blocks: [
    { kind: "heading", id: "overview", text: "Project Overview", navLabel: "Overview" },
    { kind: "paragraph", text: "“ Where Fans Come First ”", emphasis: true },
    { kind: "subheading", text: "What do we currently have?" },
    {
      kind: "list",
      items: [
        "Hasbro Pulse Website was relaunched in Feb 2019.",
        "The new site consolidates Hasbro Toy Shop, HasLab and Hasbro Pulse.",
        "Company's positioning of Hasbro Pulse Website is the ultimate fan destination for Hasbro’s portfolio of fan brands.",
        "People will find some of the best product offerings and experiences from the brands they love, a glimpse at more behind-the-scenes material and insider details that they can’t get anywhere else.",
      ],
    },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/current-pulse-website.webp`,
      alt: "The current Hasbro Pulse website, showing a Marvel Legends product page",
      caption: "Click to view the current Pulse website",
    },
    { kind: "subheading", text: "Timeline" },
    {
      kind: "list",
      items: [
        { label: "May 2019 – August 2019", text: "11 weeks as a UX Design Intern on Hasbro's Digital Operations Team" },
      ],
    },
    {
      kind: "media-split",
      content: [
        { kind: "subheading", text: "My Team" },
        {
          kind: "paragraph",
          text: "I worked on Digital Operations Team at Hasbro for 11 weeks (From May 2019 to August 2019) as a UX Design Intern.",
        },
        {
          kind: "paragraph",
          text: "As the only UX designer on the team, I was responsible for both user research and product design. I also collaborated very closely with a product manager, a scrum master, a visual designer (Icon + Motion Design), the development team, and other Brand Teams.",
        },
        {
          kind: "paragraph",
          text: "We followed an agile development approach to plan, develop, and ship our product.",
        },
      ],
      media: {
        kind: "image",
        src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/hero-team-photo.jpeg`,
        alt: "The Digital Operations Team at Hasbro, posing together in the office",
        caption: "Digital Operations Team @ Hasbro",
      },
    },
    { kind: "subheading", text: "My Contribution" },
    {
      kind: "paragraph",
      text: "I designed the end-to-end Hasbro Mobile Pulse experience from scratch and delivered the MVP version of the product to the development team by the end of my internship. The deliverables include key user flows, hi-fi interfaces, design spec documents, and interaction design samples.",
    },
    {
      kind: "paragraph",
      text: "The app will be ready for the Toy Fair in February 2020 for its initial release.",
    },

    { kind: "heading", id: "problem-space", text: "Problem Space", navLabel: "Problem space" },
    { kind: "subheading", text: "Current Situation" },
    {
      kind: "paragraph",
      text: "Hasbro Pulse was viewed as an Online Toy Shop where fans only visit occasionally to get the products they want.",
    },
    {
      kind: "columns",
      items: [
        [
          {
            kind: "image",
            src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/quote-icon-marvel.webp`,
            alt: "Illustration of a fan following a brand's social media feed",
          },
          {
            kind: "quote-list",
            items: [
              {
                text: "I get most of the toy information from social media, and Hasbro Pulse is usually just the place for me to make the purchase.",
                attribution: "Voice from a Marvel fan",
              },
            ],
          },
        ],
        [
          {
            kind: "image",
            src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/quote-icon-transformers.webp`,
            alt: "Illustration of a fan seeking out exclusive products on the Pulse website",
          },
          {
            kind: "quote-list",
            items: [
              {
                text: "I only visit Pulse 3-4 times a year, usually after fan events like Comic-Con, Toy Fair… for exclusive products I cannot get elsewhere.",
                attribution: "Voice from a Transformers fan",
              },
            ],
          },
        ],
      ],
    },
    { kind: "subheading", text: "Problem Statement" },
    {
      kind: "paragraph",
      text: "How might we make Hasbro Pulse a real fan destination to increase fan engagement and deepen the direct relationship with global customers?",
      emphasis: true,
    },

    { kind: "subheading", text: "What strategies were applied in the design of Pulse Mobile App?" },
    {
      kind: "paragraph",
      text: "By participating in stakeholder meetings and conducting benchmarking and user interviews, I got to know more about the vision of the product, best practices on the market, and our fan’s expectations. Based on these insights from research activities, we defined the following three main strategies to guide the design of Pulse Mobile App.",
    },
    { kind: "subsubheading", text: "Vision Statement" },
    {
      kind: "paragraph",
      text: "Creating an engaging and delightful experience for Hasbro fans by ...",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        'Enriching the content type - deliver "Content to Commerce"',
        "Curating the content presented to each individual",
        "Notifying fans for the latest updates from the brands they like",
      ],
    },
    {
      kind: "image-row",
      items: [
        {
          src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/strategy-icon-enrich.webp`,
          alt: "Icon representing enriching the content type",
          caption: 'Enriching the content type - deliver "Content to Commerce"',
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/strategy-icon-curate.webp`,
          alt: "Icon representing curating content for each individual",
          caption: "Curating the content presented to each individual",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/strategy-icon-notify.webp`,
          alt: "Icon representing notifying fans of the latest updates",
          caption: "Notifying fans for the latest updates from the brands they like",
        },
      ],
    },

    { kind: "subheading", text: "What solution we came up with?" },
    {
      kind: "paragraph",
      text: "I accommodated the existing content and features from Pulse Website to the mobile app by following mobile interaction design principles.",
    },
    {
      kind: "paragraph",
      text: "And also, by applying the three strategies we defined above, we complemented the Pulse Mobile with more enriching and engaging content types (like live stream videos, product-related stories...) to satisfy fan’s expectations.",
    },
    {
      kind: "paragraph",
      text: "And since some of the new features were very content-driven, I communicated with different brand teams to see the content types that were currently available (on Pulse Website and on social medias) and their future plans for the content generation. Besides, I also generated templates for different content types to ensure consistency of the layouts on the platform.",
    },
    {
      kind: "image-row",
      items: [
        {
          src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/solution-onboarding-preview.webp`,
          alt: "Onboarding screens for setting brand preferences and viewing a personalized news feed",
          caption: "Brand preferences & personalized news feed",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/solution-features-preview.webp`,
          alt: "Preview of the Upcoming Calendar, My List, Notification Hub, and Live Stream features",
          caption: "Highlighted features on the app",
        },
      ],
    },

    { kind: "subheading", text: "What impacts the solution would bring?" },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/strategy-diagram.webp`,
      alt: "Diagram mapping how brand teams' content flows through Hasbro Pulse Mobile to reach fans",
      caption: "How the three strategies connect brand teams to fans",
    },
    {
      kind: "icon-split",
      icon: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/impact-icon-exclusive-content.webp`,
      content: [
        { kind: "subsubheading", text: "Provide exclusive content fans cannot get anywhere else." },
        {
          kind: "paragraph",
          text: "Enrich the content types on Pulse Mobile App by providing upcoming calendar, live stream feature, and behind-the-scene stories. Fans can get exclusive content they crave.",
        },
      ],
    },
    {
      kind: "icon-split",
      icon: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/impact-icon-efficiency.webp`,
      content: [
        { kind: "subsubheading", text: "Improve the efficiency of getting relevant information." },
        {
          kind: "paragraph",
          text: "Curate the information presented to different users according to their own preferences and providing them with the freedom to customize their notification settings.",
        },
      ],
    },
    {
      kind: "icon-split",
      icon: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/impact-icon-engagement.webp`,
      content: [
        { kind: "subsubheading", text: "Adopt new channel to increase fan engagement." },
        {
          kind: "paragraph",
          text: "By taking the advantages of the mobile platform, fans could stay informed and keep track of the products/brands they are interested in by enabling in-app notification.",
        },
      ],
    },

    { kind: "heading", id: "research", text: "Research", navLabel: "Research" },
    { kind: "subheading", text: "Process Overview" },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/design-process-overview.webp`,
      alt: "Five-step design process: Problem Space Exploration, Opportunities Discovery, Design Scope Definition, Concept Generation and Evaluation, Design Finalization and Delivery",
      caption: "Process overview",
    },
    { kind: "subheading", text: "Project Prompt" },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/project-prompt-keywords.webp`,
      alt: "Keywords extracted from the project prompt: Fan Community, Mobile Commerce for Shopify, Curated View of Content, Slick UI",
      caption: "Extracted keywords from the prompt",
    },
    { kind: "subheading", text: "Questions I asked" },
    {
      kind: "paragraph",
      text: "After I got the prompt of the project from my manager, I asked the following questions to guide my design process.",
    },
    {
      kind: "list",
      items: [
        "What does a good fan community entail?",
        "What is missing from the current Pulse experience?",
        "How can we satisfy fans' expectation on Pulse community?",
      ],
    },

    { kind: "subheading", text: "Methods I applied" },
    {
      kind: "icon-split",
      icon: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/method-icon-stakeholder-meetings.webp`,
      content: [
        { kind: "subsubheading", text: "Stakeholder Meetings" },
        {
          kind: "paragraph",
          text: "I expected to have a better understanding on the company’s vision of Pulse Mobile App by talking to product management team and other brand teams.",
        },
        { kind: "paragraph", text: "And I was also trying to figure out the following questions:" },
        {
          kind: "list",
          items: [
            "What are the metrics we will use to measure the success of a fan community?",
            "What are the resources we could utilize in order to build a better fan community?",
          ],
        },
      ],
    },
    {
      kind: "icon-split",
      icon: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/method-icon-benchmarking.webp`,
      content: [
        { kind: "subsubheading", text: "Benchmarking" },
        {
          kind: "paragraph",
          text: "I conducted competitive research by analyzing 7 other brands’ mobile applications, with the aim to...",
        },
        {
          kind: "list",
          items: [
            "Figure out how other brands define their own fan communities",
            "Explore other brands’ strategies of crafting an engaging fan community experience for their loyal customers",
            "Get some inspirations for the design of Pulse Mobile App",
          ],
        },
      ],
    },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/benchmarking-competitor-apps.webp`,
      alt: "Competitive analysis of sneaker and streetwear apps, annotated with notes on their upcoming-release and notification features",
      caption: "Competitors",
    },
    {
      kind: "icon-split",
      icon: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/method-icon-internal-interview.webp`,
      content: [
        { kind: "subsubheading", text: "Internal Fan Interview" },
        {
          kind: "paragraph",
          text: "In order to get familiar with fan’s behavior and mental model, I conducted 1-on-1 semi-structured interviews with 7 members from the internal fan community. The questions were mainly focus on these two aspects:",
        },
        {
          kind: "list",
          items: [
            "Fan’s current sources of information – where do they get the latest news from the brand they like?",
            "Fan’s impression on Pulse website – how do they think about the Pulse website?",
          ],
        },
      ],
    },

    { kind: "subheading", text: "Key Insights from Research" },
    { kind: "subsubheading", text: "What does a good fan community entail?" },
    {
      kind: "paragraph",
      text: "Based on the discussion with stakeholders in the internal meeting, we all believed that a successful fan community would be a place where fans are willing to spend more time.",
    },
    {
      kind: "paragraph",
      text: "And also, by analyzing the features and contents of other brand apps on the market, I discovered a general pattern of constituting a good fan community – it should...",
    },
    {
      kind: "list",
      items: [
        "Provide users with appealing content - Attracting",
        "Enable users to find the information they need and get the tasks done with no extra efforts - Retaining",
        "Utilize the social interaction to connect people with same interests together - Sharing",
      ],
    },

    { kind: "subsubheading", text: "What is missing from the current Pulse experience?" },
    {
      kind: "paragraph",
      text: "Current Situation: Hasbro Pulse was viewed as an Online Toy Shop where fans only visit occasionally to get the products they want.",
    },
    {
      kind: "paragraph",
      text: "So, where do fans currently get the latest information from the brand they like? From the user interviews, I found there were 3 main sources of information: Social Media, Brand Website, and Google Search.",
    },
    {
      kind: "image-row",
      items: [
        {
          src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/current-sources-of-information.webp`,
          alt: "Diagram of the three main sources fans use to find information: social media, official websites, and Google search",
          caption: "Current sources of information",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/current-content-mostly-toyshop.webp`,
          alt: "Sketch showing that 80% of the current Pulse website's content is about the Toy Shop, versus 20% other information",
          caption: "Problems with current fan experience",
        },
      ],
    },
    { kind: "subsubheading", text: "Information is now scattered everywhere" },
    {
      kind: "paragraph",
      text: "From the interviews, I found that currently the main source of information for fans was social media. They followed influencers and brand teams on Twitter, Instagram, Facebook, YouTube, or Twitch. Useful information from the brands they like is now scattered everywhere.",
    },
    { kind: "subsubheading", text: "Passive information acquisition is not efficient" },
    {
      kind: "paragraph",
      text: "Although fans could passively receive the updates from the brands they like by browsing the posts on social media, they still might lose track of or miss some important news. It’s not efficient for them to get brand-related information among all other news feeds.",
    },
    { kind: "subsubheading", text: "The promotion and the sales are seperate" },
    {
      kind: "paragraph",
      text: "Once fans get the information about the upcoming releases, they still need to navigate around to find the way of the purchase – offline toy stations or stores, or online toy shops. Currently, the promotion of the new product and the sales of it are separate.",
    },

    { kind: "subsubheading", text: "How can we satisfy fans' expectations on Pulse community?" },
    {
      kind: "paragraph",
      text: "By talking to Hasbro fans from internal fan community, I defined two main types of users based on how passionate they are about the brand they follow. And I also discovered some differences between the behavioral patterns and the goals of these two types of people.",
    },
    {
      kind: "columns",
      items: [
        [
          {
            kind: "image",
            src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/persona-hardcore-fan.webp`,
            alt: "Illustration representing the Hardcore Fan persona",
          },
          { kind: "subsubheading", text: "Hardcore Fan" },
          {
            kind: "paragraph",
            text: "“When there is a new product release from the brand I like, I want to be informed immediately so that I could buy it to enrich my collectibles before it’s gone.”",
            emphasis: true,
          },
          {
            kind: "list",
            items: [
              "Keep Updated with the latest news",
              "Keep track of the collectibles he wants",
              "Get exclusives before they are gone",
              "Research collectibles",
            ],
          },
        ],
        [
          {
            kind: "image",
            src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/persona-casual-fan.webp`,
            alt: "Illustration representing the Casual Fan persona",
          },
          { kind: "subsubheading", text: "Casual Fan" },
          {
            kind: "paragraph",
            text: "“When I read a new Marvel comics, I want to search for peripheral products and read reviews so that I could get high-quality character-inspired action figures.”",
            emphasis: true,
          },
          {
            kind: "list",
            items: [
              "Research collectibles",
              "Keep track of the collectibles she wants",
              "Keep Updated with the latest news",
            ],
          },
        ],
      ],
    },

    { kind: "heading", id: "key-decisions", text: "Key Design Decisions", navLabel: "Key decisions" },
    {
      kind: "paragraph",
      text: "By being aware of fan’s current pain points and expectations, taking the resources that are available into consideration, and taking the advantages of the mobile platform, we defined the following three main strategies to guide the design of Pulse Mobile App.",
    },
    {
      kind: "list",
      ordered: true,
      items: [
        'Enriching the content type - deliver "Content to Commerce"',
        "Curating the content presented to each individual",
        "Notifying fans for the latest updates from the brands they like",
      ],
    },

    { kind: "subheading", text: "Explore the card formats for different content types on the feed page" },
    { kind: "subsubheading", text: "Design Considerations & Principles" },
    {
      kind: "paragraph",
      text: "Based on the strategy of “enriching the content type”, there are going to be 6 different types of content on the home feed page – In-Stock Products, Pre-Order Products, Upcoming Products, Product Collection, Story, and Event Post.",
    },
    {
      kind: "paragraph",
      text: "We want our fans to distinguish different content types at the first glance, and also, be able to take some quick actions without clicking into the detail page.",
    },
    { kind: "paragraph", text: "Keywords: Distinguishable, Shareable" },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/card-format-options.webp`,
      alt: "Five card format options explored for the product card, labeled A through E with pros and cons noted",
      caption: "Different options & iterations",
    },
    { kind: "subsubheading", text: "Final Decision" },
    {
      kind: "paragraph",
      text: "The above five options of the Product Card were presented to other members on the internal meeting. Based on the readability of the product availability status and the consistency among cards for different content types, we decided to choose option C. And the final design of cards for different content types are shown as below.",
    },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/card-format-final.webp`,
      alt: "Final card designs for the Product Card and the Story, Product Collection, and Activity Post cards",
      caption: "Final card design",
    },

    { kind: "subheading", text: "Explore the location of Upcoming Calendar" },
    { kind: "subsubheading", text: "Design Considerations & Principles" },
    {
      kind: "paragraph",
      text: "The Upcoming Calendar is a newly-added feature on the Pulse Mobile App. Fans will be able to know when the latest Products or Product Collections are dropping so that they could be both mentally and financially prepared.",
    },
    {
      kind: "paragraph",
      text: "We view Upcoming Calendar as an important feature that could attract fans to come back constantly, so we want to put it at a visible location in the app.",
    },
    { kind: "paragraph", text: "Keywords: Discoverability" },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/upcoming-calendar-iterations.webp`,
      alt: "Two iterations of the Upcoming Calendar's location — first on the Product Catalog page, then moved to the home page after usability testing",
      caption: "Iterations",
    },

    { kind: "subheading", text: "Explore the entrance of Live Stream Feature" },
    { kind: "subsubheading", text: "Design Consideration & Principle" },
    {
      kind: "paragraph",
      text: "Live Stream is also a new feature we added in Pulse Mobile App to enrich the content type and increase fan engagement.",
    },
    {
      kind: "paragraph",
      text: "However, since there aren't many live stream events happening currently, this is more like a feature designed for the near future. From the stakeholder meeting, I learned that the company would increase the number and frequency of the Live Steam events gradually. So, I needed to design based on the current situation but also take the future needs into consideration.",
    },
    {
      kind: "paragraph",
      text: "I explored the ways how users can access the live stream feature and narrowed to the following two options. I tested both of the options in the usability testing.",
    },
    { kind: "paragraph", text: "Keywords: Discoverability, Intuitiveness" },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/live-stream-entrance-options.webp`,
      alt: "Two options tested for the Live Stream entrance — a swipe-down gesture on the feed versus a dedicated entrance icon",
      caption: "Different options & iterations",
    },
    { kind: "subsubheading", text: "Final Decision" },
    {
      kind: "paragraph",
      text: "From usability testing, I found most of the participants were unaware of the hidden trigger to open the Live Steam page through swiping down.",
    },
    {
      kind: "paragraph",
      text: "By considering the discoverability and the intuitiveness of the Live Stream feature, we decided to set a specific entrance for it. And I also designed the Live Stream page by considering the large volume of archived videos in the future.",
    },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/live-stream-entrance-final.webp`,
      alt: "Final Live Stream entrance and page, organized into Live Now, Upcoming Live Streams, and Archived Live Streams",
      caption: "Final entrance & Live Stream page",
    },

    { kind: "subheading", text: "Process Documentations and Photos" },
    {
      kind: "carousel",
      items: [
        {
          src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/process-inspiration.webp`,
          alt: "Annotated screenshots of competitor apps used for inspiration",
          caption: "Finding inspiration from exemplars on the market",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/process-lofi-wireframes.webp`,
          alt: "Low-fidelity wireframes prepared for user testing",
          caption: "Low-fi wireframes for user testing",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/process-feature-exploration.webp`,
          alt: "Sketches exploring new feature ideas for the app",
          caption: "New feature exploration",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/process-interview-scripts.webp`,
          alt: "Scripts written for fan interviews and usability testing sessions",
          caption: "Scripts for fan interview and testing",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/process-testing-session-1.webp`,
          alt: "Photo from the first user testing session with an internal fan",
          caption: "User testing session #1",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/process-testing-session-2.webp`,
          alt: "Photo from the second user testing session with an internal fan",
          caption: "User testing session #2",
        },
        {
          src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/process-affinity-diagram.webp`,
          alt: "Affinity diagram synthesizing interview data on sticky notes",
          caption: "Interview data synthesis - Affinity Diagram",
        },
      ],
    },

    { kind: "heading", id: "solution", text: "Final Design", navLabel: "Solution" },
    { kind: "subsubheading", text: "Onboarding" },
    {
      kind: "list",
      items: [
        { label: "Tasks", text: "Create Account / Log In / Continue as a guest, Set Preferences" },
        { label: "Design Strategies", text: "Curate/Personalize the content presented to each individual" },
      ],
    },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/final-onboarding.webp`,
      alt: "Onboarding flow: welcome screen, account creation, brand preference selection, and the personalized feed",
    },
    { kind: "subsubheading", text: "Upcoming Calendar" },
    {
      kind: "list",
      items: [
        {
          label: "Tasks",
          text: 'Explore what is upcoming, Mark product(s) you are interested in, Set notification preferences, Check "My Upcoming" list',
        },
        { label: "Design Strategies", text: "Enrich the content type, Stay in the know with notification" },
      ],
    },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/final-upcoming-calendar.webp`,
      alt: "Upcoming Calendar flow: browsing upcoming products, marking interest, setting notification preferences, and checking My Upcoming list",
    },
    { kind: "subsubheading", text: "Notification" },
    {
      kind: "list",
      items: [
        { label: "Tasks", text: "Check notification messages, Customize notification preferences" },
        {
          label: "Design Strategies",
          text: "Stay in the know with notification, Best utilize the advantage of mobile platform",
        },
      ],
    },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/final-notification.webp`,
      alt: "Notification flow: the inbox showing read and unread messages, and the notification preference settings",
    },
    { kind: "subsubheading", text: "Live Stream" },
    {
      kind: "list",
      items: [
        {
          label: "Tasks",
          text: "Access the Live Stream feature, Enter the live video room, Find out the video-related products",
        },
        {
          label: "Design Strategies",
          text: "Enrich the content type, Boost sales, Increase fan engagement and interaction",
        },
      ],
    },
    {
      kind: "image",
      src: `${import.meta.env.BASE_URL}case-studies/hasbro-pulse/final-live-stream.webp`,
      alt: "Live Stream flow: accessing the feature, browsing live and upcoming streams, and finding video-related products",
    },
    { kind: "subsubheading", text: "Other Flows and Features" },

    { kind: "heading", id: "reflection", text: "About What I've Learned", navLabel: "Lessons" },
    {
      kind: "subheading",
      text: "1. Understanding the strategic planning of the product helps to determine the right direction to go in design.",
    },
    {
      kind: "paragraph",
      text: "During the internship, I was constantly getting requirements or feedback from senior management team about how they wanted Pulse Mobile App to be. And as the only UX designer on the team, I needed to figure out how to transfer the vision of the product into actionable design decisions. By looking at competitive products and talking to potential users, I felt I was able to see through the mist and came up with ideas about how the product could be.",
    },
    {
      kind: "paragraph",
      text: "But as I was getting more information from the research, I felt the necessity to take a step back and see the problem I was tackling with from a holistic view before diving into the detail. I tried to learn more about the strategic planning for the Pulse Mobile from the meetings with stakeholders and the discussions with my manager. This further understanding helped me to be more confident while prioritizing the information I got from research and narrowing down the design scope at the current stage.",
    },
    {
      kind: "subheading",
      text: "2. Design is not just about taking actions for the moment, but also about envisioning the future and paving the way in between.",
    },
    {
      kind: "paragraph",
      text: "As we were envisioning the future by discussing about how this mobile platform could be utilized to further expand the e-commerce capabilities and talking about some big goals we wanted to achieve in the near future, we also saw the big gap between the ideal and reality.",
    },
    {
      kind: "paragraph",
      text: "Since the whole app was very content-driven, I looked at the types of the information on the current Pulse website and talked to different brand teams about their existing resources – it’s of vital importance for me to learn about what we currently have while designing for the MVP version of the product. However, the future of the product shouldn’t be restricted by the reality. Instead, the design should also reflect the envisioning of how we want this product to be and how we can get there progressively by following a sequence of actions. Along the way, we will be building, testing, and revising, but we will always be moving towards the goal of making Pulse a better fan community.",
    },
  ],
};
