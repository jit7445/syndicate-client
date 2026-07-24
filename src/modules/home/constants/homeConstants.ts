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

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is a session transcript?",
    answer:
      "It's the written record of an expert conversation on a specific topic, already recorded, so you get the insight without waiting to schedule and pay for a fresh call.",
  },
  {
    question: "Who creates these transcripts, and can I trust the content?",
    answer:
      "Every transcript comes from an industry expert who's been checked and approved before their content goes live. Each listing also shows the expert's background, a summary, topic tags, geography, and the recording date, so you know exactly what you're getting and how current it is before you buy.",
  },
  {
    question: "Can I preview a transcript before buying, and what do I get after I purchase?",
    answer:
      "Yes, you can check the summary, topics, geography, and date upfront. Once you buy, you get full access to the transcript along with any supporting material the expert shared, like a document.",
  },
  {
    question: "Can I buy multiple transcripts at once, and what payment methods do you accept?",
    answer:
      "Yes, you can add as many as you need to your cart and check out together instead of buying one at a time. Accepted payment methods are shown at checkout, and you'll get a receipt automatically after every purchase.",
  },
  {
    question: "How do I access my transcripts after buying, and for how long?",
    answer:
      "Your transcript shows up in your dashboard right after purchase, and stays there for good — no time limit, and no need to buy it again to view it later.",
  },
  {
    question: "Can I use a transcript however I want?",
    answer:
      "Transcripts are for your own research, whether you're buying as an individual or on behalf of a team. We'd just ask that you don't post it publicly or pass it on to others who haven't purchased it.",
  },
  {
    question: "Who do I contact if I run into an issue?",
    answer:
      "Just reach out through support in your account, our team will sort out any issue with your order or access.",
  },
];
