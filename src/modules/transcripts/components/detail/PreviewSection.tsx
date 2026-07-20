import LockOutlinedIcon from "../../../../icons/LockOutlined/LockOutlined";
import Button from "../../../../components/button/Button";
import { LOCKED_PREVIEW_PARAGRAPHS } from "../../pages/transcriptDetailConstants";

type PreviewSectionProps = {
  preview: string;
  onBuyClick: () => void;
};

export default function PreviewSection({
  preview,
  onBuyClick,
}: PreviewSectionProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-main-background p-6">
      <h2 className="text-lg font-bold text-text-primary">Preview</h2>
      <p className="mt-3 text-text-secondary">{preview}</p>

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
          <p className="text-sm font-medium text-text-primary">
            Buy the transcript to read the rest
          </p>
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
