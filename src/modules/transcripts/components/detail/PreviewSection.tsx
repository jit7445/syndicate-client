import LockOutlinedIcon from "../../../../icons/LockOutlined/LockOutlined";
import CalendarTodayIcon from "../../../../icons/CalendarToday/CalendarToday";
import PublicIcon from "../../../../icons/Public/Public";
import CheckCircleIcon from "../../../../icons/CheckCircle/CheckCircle";
import Button from "../../../../components/button/Button";
import { LOCKED_PREVIEW_PARAGRAPHS } from "../../pages/transcriptDetailConstants";

type PreviewSectionProps = {
  preview: string;
  date: string;
  geography: string;
  coverageHighlights: string[];
  onBuyClick: () => void;
};

export default function PreviewSection({
  preview,
  date,
  geography,
  coverageHighlights,
  onBuyClick,
}: PreviewSectionProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-main-background p-6">
      <h2 className="text-lg font-bold text-text-primary">Preview</h2>
      <p className="mt-3 text-text-secondary">{preview}</p>

      {coverageHighlights.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-text-primary">
            What this topic covers:
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {coverageHighlights.map((highlight, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <CheckCircleIcon fontSize="small" sx={{ color: "#EC9324" }} />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 border-t border-gray-200 pt-4 text-sm text-text-secondary">
        <CalendarTodayIcon fontSize="small" />
        <span>{date}</span>
        <span>·</span>
        <PublicIcon fontSize="small" />
        <span>{geography}</span>
      </div>

      <div className="relative mt-4">
        <div aria-hidden className="select-none space-y-3 blur-[4px]">
          {LOCKED_PREVIEW_PARAGRAPHS.map((paragraph, index) => (
            <p key={index} className="text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-main-background via-main-background/90 to-transparent">
          <LockOutlinedIcon sx={{ color: "#EC9324" }} />
          <Button
            variant="contained"
            label="Buy Transcript"
            onClick={onBuyClick}
          />
        </div>
      </div>
    </div>
  );
}
