import { MOCK_TRANSCRIPTS } from "./mockData";
import { DEFAULT_SIDEBAR_FILTERS } from "./components/filter-sidebar/constants";
import type {
  SidebarFilterPayload,
  Transcript,
  TranscriptsFilterPayload,
} from "./types";

// Builds the request body for the future POST /api/transcripts call — see
// TranscriptsFilterPayload for the schema. Only non-default filters are
// included, matching Infollion's getProfileDetails payload-building style.
export const buildTranscriptsFilterPayload = (
  search: string,
  filters: SidebarFilterPayload,
  page: number,
  pageSize: number,
): TranscriptsFilterPayload => {
  const payload: TranscriptsFilterPayload = { page, pageSize, sort_by: "-date" };
  if (search) payload.search = search;
  if (filters.domains.length) payload.in___domain = filters.domains.join(",");
  if (filters.price !== DEFAULT_SIDEBAR_FILTERS.price) payload.price = filters.price;
  if (filters.publishedDate !== DEFAULT_SIDEBAR_FILTERS.publishedDate) {
    payload.publishedDate = filters.publishedDate;
  }
  return payload;
};

// TODO: replace with a real API call once the backend exists. All
// filtering/search/sort/pagination currently happens client-side in
// TranscriptsList.tsx over the full mock array — that logic (see
// utils/filterMatchers.ts for the exact price/date bucket rules) needs to
// move server-side, driven by the payload below. To activate: uncomment the
// block below (and its imports), delete the mock implementation beneath it.
//
// import { API_ENDPOINTS } from "../../constants/apiEndpoints";
// import { RequestServer } from "../../utils/services";
// import type { TranscriptsApiResponse } from "./types";
//
// export const fetchTranscripts = async (
//   payload: TranscriptsFilterPayload,
// ): Promise<TranscriptsApiResponse> =>
//   RequestServer(API_ENDPOINTS.transcripts, "POST", payload);
export const fetchTranscripts = async (
  _payload?: TranscriptsFilterPayload,
): Promise<Transcript[]> => {
  return Promise.resolve(MOCK_TRANSCRIPTS);
};

// TODO: replace with a real API call once the backend exists.
// GET /api/transcripts/:id -> Transcript (preview/teaser text only — never
// the full paid content; see usePurchaseActions.ts for where the full
// content must be served from a separate, purchase-gated endpoint instead).
// To activate: uncomment the block below (and its imports), delete the mock
// implementation beneath it.
//
// import { API_ENDPOINTS } from "../../constants/apiEndpoints";
// import { RequestServer } from "../../utils/services";
//
// export const fetchTranscriptById = async (id: string): Promise<Transcript> =>
//   RequestServer(API_ENDPOINTS.transcriptDetail.replace(":id", id), "GET");
export const fetchTranscriptById = async (id: string): Promise<Transcript> => {
  const found = MOCK_TRANSCRIPTS.find((t) => t.id === id);
  if (!found) throw new Error("Transcript not found");
  return Promise.resolve(found);
};
