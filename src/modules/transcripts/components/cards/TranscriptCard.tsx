import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { APP_ROUTES } from '../../../../constants/appRoutes'
import Button from '../../../../components/button/Button'
import Chip from '../../../../components/chip/Chip'
import AccessTimeIcon from '../../../../icons/AccessTime/AccessTime'
import CalendarTodayIcon from '../../../../icons/CalendarToday/CalendarToday'
import { useCart } from '../../../cart/hooks/useCart'
import { isLoggedIn } from '../../../../utils/authUtils'
import type { Transcript } from '../../types'

type TranscriptCardProps = {
  transcript: Transcript
}

const VISIBLE_TAG_COUNT = 2

export default function TranscriptCard({ transcript }: TranscriptCardProps) {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [isTagsTooltipOpen, setIsTagsTooltipOpen] = useState(false)
  const visibleTags = transcript.tags.slice(0, VISIBLE_TAG_COUNT)
  const remainingTags = transcript.tags.slice(VISIBLE_TAG_COUNT)
  const remainingTagCount = remainingTags.length

  const handleBuyTranscript = () => {
    if (isLoggedIn()) {
      navigate(APP_ROUTES.checkout, { state: { buyNowItem: transcript } })
      return
    }

    // Not logged in — checkout requires auth, so fall back to the cart
    // (RequireAuth will bounce to sign-in) rather than losing the item.
    addToCart(transcript)
    navigate(APP_ROUTES.checkout)
  }

  return (
    <div className="relative rounded-lg border border-gray-200 bg-main-background p-6">
      <div className="flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <Chip key={tag} label={tag} variant="outlined" size="small" />
        ))}
        {remainingTagCount > 0 && (
          <ClickAwayListener onClickAway={() => setIsTagsTooltipOpen(false)}>
            <Tooltip
              title={remainingTags.join(', ')}
              arrow
              open={isTagsTooltipOpen}
              onClose={() => setIsTagsTooltipOpen(false)}
              disableHoverListener
              disableFocusListener
              disableTouchListener
            >
              <span onClick={() => setIsTagsTooltipOpen((prev) => !prev)}>
                <Chip label={`+${remainingTagCount} more`} variant="outlined" size="small" className="cursor-pointer" />
              </span>
            </Tooltip>
          </ClickAwayListener>
        )}
      </div>

      <Link to={APP_ROUTES.transcriptDetail.replace(':id', transcript.id)}>
        <h2 className="mt-4 text-xl font-bold text-text-primary">{transcript.title}</h2>
      </Link>

      <p className="mt-3 text-text-secondary">{transcript.preview}</p>

      <div className="mt-6 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-text-secondary">
          <AccessTimeIcon fontSize="inherit" />
          {transcript.readMinutes} min read
          <span>·</span>
          <CalendarTodayIcon fontSize="inherit" />
          {transcript.date}
        </span>
        <div className="flex items-center gap-4">
          <span className="text-base font-semibold text-text-primary">USD ${transcript.price}</span>
          <Button variant="contained" label="Buy Transcript" onClick={handleBuyTranscript} />
        </div>
      </div>
    </div>
  )
}
