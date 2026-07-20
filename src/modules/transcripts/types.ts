export type Author = {
  name: string;
  title: string;
  company: string;
  yearsOfExperience: number;
  email: string;
  linkedinUrl: string;
};

export type Transcript = {
  id: string;
  title: string;
  domain: string;
  tags: string[];
  preview: string;
  price: number;
  readMinutes: number;
  date: string;
  author: Author;
};

export type PriceFilterValue =
  "all" | "free" | "under-100" | "100-250" | "over-250";

export type PublishedDateFilterValue =
  "anytime" | "last-week" | "last-month" | "last-3-months" | "last-year";

export type SidebarFilterPayload = {
  domains: string[];
  price: PriceFilterValue;
  publishedDate: PublishedDateFilterValue;
};
