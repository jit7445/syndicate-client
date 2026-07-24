import { API_ENDPOINTS } from "../../../constants/apiEndpoints";
import { getStorageItem } from "../../../utils/storageUtils";
import type { Transcript } from "../types";

const sanitizeFileName = (title: string): string =>
  title.replace(/[^a-z0-9]+/gi, "-").toLowerCase();

const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
};

export const usePurchaseActions = (
  transcript: Pick<Transcript, "id" | "title" | "domain" | "preview">,
) => {
  const handleDownload = async () => {
    const token = getStorageItem<string>("token");
    const url = `${API_ENDPOINTS.transcriptDownload.replace(":id", transcript.id)}?format=pdf`;
    const response = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!response.ok) throw new Error(`Download failed: ${response.status}`);
    const blob = await response.blob();
    downloadBlob(blob, `${sanitizeFileName(transcript.title)}.pdf`);
  };

  return { handleDownload };
};
