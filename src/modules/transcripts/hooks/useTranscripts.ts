import { useState } from 'react'
import { fetchTranscripts } from '../transcriptsService'
import type { Transcript } from '../types'

export const useTranscripts = () => {
  const [transcripts, setTranscripts] = useState<Transcript[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadTranscripts = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await fetchTranscripts()
      setTranscripts(data)
    } catch {
      setError('Failed to load transcripts')
    } finally {
      setIsLoading(false)
    }
  }

  return { transcripts, isLoading, error, loadTranscripts }
}
