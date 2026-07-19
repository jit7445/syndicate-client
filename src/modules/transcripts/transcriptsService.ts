import { MOCK_TRANSCRIPTS } from './mockData'
import type { Transcript } from './types'

// TODO: swap for RequestServer(API_ENDPOINTS.transcripts, 'GET') once the backend exists
export const fetchTranscripts = async (): Promise<Transcript[]> => {
  return Promise.resolve(MOCK_TRANSCRIPTS)
}

export const fetchTranscriptById = async (id: string): Promise<Transcript> => {
  const found = MOCK_TRANSCRIPTS.find((t) => t.id === id)
  if (!found) throw new Error('Transcript not found')
  return Promise.resolve(found)
}
