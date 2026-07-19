import { useState } from "react"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import DownloadIcon from "../../../../icons/Download/Download"
import ShareIcon from "../../../../icons/Share/Share"
import { usePurchaseActions } from "../../hooks/usePurchaseActions"
import type { DownloadFormat } from "../../hooks/usePurchaseActions"
import type { Transcript } from "../../types"

const DOWNLOAD_FORMATS: { label: string; value: DownloadFormat }[] = [
  { label: "Download as TXT", value: "txt" },
  { label: "Download as PDF", value: "pdf" },
  { label: "Download as DOCX", value: "docx" },
]

type PurchaseActionsProps = {
  transcript: Pick<Transcript, "id" | "title" | "domain" | "preview">
}

export default function PurchaseActions({ transcript }: PurchaseActionsProps) {
  const { handleDownload, handleShare } = usePurchaseActions(transcript)
  const [copied, setCopied] = useState(false)
  const [downloadAnchorEl, setDownloadAnchorEl] = useState<HTMLElement | null>(null)

  const onShareClick = async () => {
    const result = await handleShare()
    if (result === "copied") {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const onFormatSelect = (format: DownloadFormat) => {
    handleDownload(format)
    setDownloadAnchorEl(null)
  }

  return (
    <div className="flex items-center gap-1">
      <Tooltip title="Download transcript">
        <IconButton
          aria-label="Download"
          onClick={(e) => setDownloadAnchorEl(e.currentTarget)}
          sx={{ color: "#4b5563" }}
        >
          <DownloadIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={downloadAnchorEl} open={Boolean(downloadAnchorEl)} onClose={() => setDownloadAnchorEl(null)}>
        {DOWNLOAD_FORMATS.map((format) => (
          <MenuItem key={format.value} onClick={() => onFormatSelect(format.value)}>
            {format.label}
          </MenuItem>
        ))}
      </Menu>

      <Tooltip title={copied ? "Link copied!" : "Share"} open={copied || undefined}>
        <IconButton aria-label="Share" onClick={onShareClick} sx={{ color: "#4b5563" }}>
          <ShareIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  )
}
