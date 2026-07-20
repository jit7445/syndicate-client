import { MOCK_TRANSCRIPTS } from "./mockData";
import type { Transcript } from "./types";

// TODO: replace with a real API call.
// GET /api/transcripts?q=&domains[]=&price=&publishedDate=&sort=&page=&pageSize=
// Response body: { items: Transcript[], total: number, page: number, pageSize: number }
// All filtering/search/sort/pagination currently happens client-side in
// TranscriptsList.tsx over the full mock array — that logic (see
// utils/filterMatchers.ts for the exact price/date bucket rules) needs to move
// server-side and be driven by these query params instead.
// RequestServer(API_ENDPOINTS.transcripts, 'GET', { params }) once the backend exists.
export const fetchTranscripts = async (): Promise<Transcript[]> => {
  return Promise.resolve(MOCK_TRANSCRIPTS);
};

// TODO: replace with a real API call.
// GET /api/transcripts/:id
// Response body: Transcript (preview/teaser text only — never the full paid
// content; see usePurchaseActions.ts for where the full content must be
// served from a separate, purchase-gated endpoint instead).
// RequestServer(API_ENDPOINTS.transcriptDetail.replace(':id', id), 'GET') once the backend exists.
export const fetchTranscriptById = async (id: string): Promise<Transcript> => {
  const found = MOCK_TRANSCRIPTS.find((t) => t.id === id);
  if (!found) throw new Error("Transcript not found");
  return Promise.resolve(found);
};
