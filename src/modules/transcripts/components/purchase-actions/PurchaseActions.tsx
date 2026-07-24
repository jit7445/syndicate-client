import DownloadButton from "../../../../components/download-button/DownloadButton";
import { usePurchaseActions } from "../../hooks/usePurchaseActions";
import type { Transcript } from "../../types";

type PurchaseActionsProps = {
  transcript: Pick<Transcript, "id" | "title" | "domain" | "preview">;
};

export default function PurchaseActions({ transcript }: PurchaseActionsProps) {
  const { handleDownload } = usePurchaseActions(transcript);

  return (
    <div className="flex items-center">
      <DownloadButton
        onClick={() =>
          handleDownload().catch((err) =>
            console.error("Download failed:", err),
          )
        }
      />
    </div>
  );
}
