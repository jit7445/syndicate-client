import jsPDF from 'jspdf'
import { APP_ROUTES } from '../../../constants/appRoutes'
import type { Transcript } from '../types'

export type DownloadFormat = 'txt' | 'pdf' | 'docx'

const sanitizeFileName = (title: string): string => title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()

const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  anchor.click()
  URL.revokeObjectURL(url)
}

export const usePurchaseActions = (transcript: Pick<Transcript, 'id' | 'title' | 'domain' | 'preview'>) => {
  const shareUrl = `${window.location.origin}${APP_ROUTES.transcriptDetail.replace(':id', transcript.id)}`

  const handleDownload = (format: DownloadFormat) => {
    const content = `${transcript.title}\n${transcript.domain}\n\n${transcript.preview}`
    const fileName = sanitizeFileName(transcript.title)

    if (format === 'txt') {
      downloadBlob(new Blob([content], { type: 'text/plain' }), `${fileName}.txt`)
      return
    }

    if (format === 'pdf') {
      const doc = new jsPDF()
      const lines = doc.splitTextToSize(content, 180)
      doc.text(lines, 15, 20)
      doc.save(`${fileName}.pdf`)
      return
    }

    // Word-compatible HTML document — a lightweight way to produce a file Word/Docs
    // opens without pulling in a full .docx-writing library for a mock demo.
    const html = `<html><head><meta charset="utf-8"></head><body><h2>${transcript.title}</h2><p>${transcript.domain}</p><p>${transcript.preview}</p></body></html>`
    downloadBlob(new Blob([html], { type: 'application/msword' }), `${fileName}.doc`)
  }

  const handleShare = async (): Promise<'shared' | 'copied'> => {
    if (navigator.share) {
      await navigator.share({ title: transcript.title, url: shareUrl })
      return 'shared'
    }

    await navigator.clipboard.writeText(shareUrl)
    return 'copied'
  }

  return { shareUrl, handleDownload, handleShare }
}
