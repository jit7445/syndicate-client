export const TRUST_BADGES = [
  { label: "Verified authors" },
  { label: "Full transcripts, not summaries" },
];

export const FEATURE_CARDS = [
  {
    icon: "VerifiedUser",
    title: "100% Verified Authors",
    description:
      "Every expert is vetted for their real-world experience and domain expertise.",
  },
  {
    icon: "Description",
    title: "Full Transcripts, Not Summaries",
    description:
      "Read every word. No summaries, no shortcuts, just complete context.",
  },
  {
    icon: "Bolt",
    title: "Instant Access",
    description:
      "Skip the wait. Get immediate access to transcripts and insights that matter.",
  },
  {
    icon: "Headset",
    title: "Go Deeper with Live Experts",
    description:
      "Need more clarity? Connect with the expert live and get your questions answered.",
  },
] as const;

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSection = {
  title: string;
  items: FaqItem[];
};

export const FAQ_SECTIONS: FaqSection[] = [
  {
    title: "About the transcripts",
    items: [
      {
        question: "What is a session transcript?",
        answer:
          "It's the transcript of an expert-initiated call, made available for purchase to multiple buyers rather than commissioned by a single client. Instead of scheduling and paying for a fresh call every time expert insight is needed, you can buy access to a transcript of a session an expert has already recorded on a topic relevant to your research. If a topic you're looking for isn't available yet, you can also request it.",
      },
      {
        question: "How is this different from a live expert call?",
        answer:
          "A live call offers a real-time, one on one conversation tailored to specific questions, and that depth and interactivity remains unmatched for bespoke research needs. Session transcripts are a complementary way to access expert insight: useful for quickly scanning existing perspectives on a topic, validating a hypothesis, or exploring an area before committing to a live engagement. Many researchers use both — transcripts to orient quickly, and live calls to go deep once the right questions are clear.",
      },
      {
        question: "Does this replace the option to book a live expert call?",
        answer: "Not sure about this question",
      },
      {
        question: "Who creates these sessions and are they vetted experts?",
        answer:
          "Yes, every session is recorded by an industry expert who has been vetted through a compliance and onboarding process before their content is made available on the platform. To help you assess relevance before purchasing, each transcript clearly displays the expert's professional background and area of expertise.",
      },
      {
        question:
          "How current is the content and when was each session recorded?",
        answer:
          "Every transcript listing shows the recording date clearly, so you always know how current the discussion is. Sessions are typically recorded and published on a rolling basis to reflect current trends and quarterly shifts in the topic area.",
      },
    ],
  },
  {
    title: "Browsing & buying",
    items: [
      {
        question: "Can I preview a transcript before purchasing?",
        answer:
          "Yes. Each listing includes a summary, topic tags, geography it is relevant to, and recording date so you can check the relevance before buying. Full transcript content is unlocked only after purchase.",
      },
      {
        question: "What's included when I buy a transcript?",
        answer:
          "You get full access to the session transcript, along with session metadata (topic tags, geography, date, domain focus) and any additional material shared by the expert, such as a supporting document.",
      },
      {
        question: "Can I buy multiple transcripts at once?",
        answer:
          "Yes, you can add multiple transcripts to your cart and complete a single checkout, rather than purchasing one at a time.",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "Payments are processed securely at checkout. Accepted methods will be shown at the payment step; receipts are issued automatically after every purchase.",
      },
    ],
  },
  {
    title: "After purchase",
    items: [
      {
        question: "How do I access my transcript after buying?",
        answer:
          "Once your purchase is confirmed, the transcript becomes available immediately in your dashboard. You'll also see the listing update to a \"View transcript\" option instead of \"Buy,\" so you can find it again anytime without searching.",
      },
      {
        question: "Can I download the transcript, or only view it online?",
        answer:
          "You can view the transcript directly on the platform. Where available, download options are indicated on the transcript page itself.",
      },
      {
        question: "Will I get a receipt for my purchase?",
        answer:
          "Yes, a receipt is generated automatically and sent to your registered email as soon as your purchase is confirmed. You can also view it anytime from your order history.",
      },
      {
        question: "Can I access my purchased transcripts later, anytime?",
        answer:
          "Yes, once purchased, a transcript is permanently accessible in your account. There's no time limit or re-purchase required to view it again.",
      },
    ],
  },
  {
    title: "Account & compliance",
    items: [
      {
        question: "Do I need an account to browse, or only to buy?",
        answer:
          "You can browse and preview session listings without an account. An account is required to add items to your cart and complete a purchase.",
      },
      {
        question: "Is there a usage restriction on the content I purchase?",
        answer:
          "Purchased transcripts are licensed for internal research use by your organization. Redistribution or resharing outside your organization isn't permitted. Specific terms are outlined at checkout.",
      },
      {
        question:
          "Who do I contact if I have an issue with a transcript I purchased?",
        answer:
          "Reach out through the support option in your account, and our team will help resolve any issue with your order or transcript access.",
      },
    ],
  },
  {
    title: "Pricing",
    items: [
      {
        question: "How is pricing determined per session?",
        answer: "Not sure about the answer",
      },
      {
        question: "Do you offer bulk or subscription pricing for teams?",
        answer:
          "Teams purchasing at volume can reach out to our team directly to discuss tailored pricing options.",
      },
    ],
  },
];
