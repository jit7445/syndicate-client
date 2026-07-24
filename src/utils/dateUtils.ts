// Formats an ISO/UTC date string (e.g. "2026-07-20T18:30:00.000Z") into a
// short display date (e.g. "Jul 20, 2026") in the viewer's local timezone.
export const formatDate = (date: string | undefined | null): string => {
  if (!date) return "";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
