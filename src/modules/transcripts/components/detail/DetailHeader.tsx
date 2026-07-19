import { Link } from "react-router-dom"
import Chip from "../../../../components/chip/Chip"
import BookmarkIcon from "../../../../icons/Bookmark/Bookmark"
import BookmarkBorderIcon from "../../../../icons/BookmarkBorder/BookmarkBorder"
import AccessTimeIcon from "../../../../icons/AccessTime/AccessTime"
import CalendarTodayIcon from "../../../../icons/CalendarToday/CalendarToday"
import { APP_ROUTES } from "../../../../constants/appRoutes"
import { useSaved } from "../../hooks/useSaved"
import type { Transcript } from "../../types"

type DetailHeaderProps = {
  transcript: Transcript
}

export default function DetailHeader({ transcript }: DetailHeaderProps) {
  const { isSaved, toggleSaved } = useSaved(transcript.id)

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <Link to={APP_ROUTES.transcripts} className="underline hover:no-underline text-text-primary font-medium">
          All transcripts
        </Link>
        <span>/</span>
        <span>{transcript.domain}</span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2">
            <Chip label={transcript.domain} variant="outlined" size="small" />
            {transcript.tags
              .filter((tag) => tag !== transcript.domain)
              .map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" size="small" />
              ))}
          </div>
          <h1 className="mt-3 text-3xl font-bold text-text-primary">{transcript.title}</h1>
        </div>

        <button
          type="button"
          aria-label="Bookmark"
          className="shrink-0 text-text-secondary"
          onClick={toggleSaved}
        >
          {isSaved ? <BookmarkIcon sx={{ color: "#EC9324" }} /> : <BookmarkBorderIcon />}
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2 text-sm text-text-secondary">
        <AccessTimeIcon fontSize="inherit" />
        {transcript.readMinutes} min read
        <span>·</span>
        <CalendarTodayIcon fontSize="inherit" />
        {transcript.date}
      </div>
    </div>
  )
}
