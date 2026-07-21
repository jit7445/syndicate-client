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
  geography: string;
  coverageHighlights: string[];
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

// Wire-payload schema for the future POST /api/transcripts call. Follows the
// same request convention as Infollion's `experts/filters` endpoint
// (infollionfefork/src/organisms/expert-cards/helper.ts:getProfileDetails):
// one combined payload per request, non-default filters only, list-type
// filters sent as a comma-joined `in___<field>` key.
export type TranscriptsFilterPayload = {
  page: number;
  pageSize: number;
  sort_by: "-date";
  search?: string;
  in___domain?: string;
  price?: PriceFilterValue;
  publishedDate?: PublishedDateFilterValue;
};

export type TranscriptsApiResponse = {
  items: Transcript[];
  total: number;
  page: number;
  pageSize: number;
};
