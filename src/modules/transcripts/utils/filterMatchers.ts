import type { PriceFilterValue, PublishedDateFilterValue } from "../types";

export const matchesPrice = (
  price: number,
  filter: PriceFilterValue,
): boolean => {
  switch (filter) {
    case "free":
      return price === 0;
    case "under-100":
      return price < 100;
    case "100-250":
      return price >= 100 && price <= 250;
    case "over-250":
      return price > 250;
    default:
      return true;
  }
};

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const matchesPublishedDate = (
  dateString: string,
  filter: PublishedDateFilterValue,
): boolean => {
  if (filter === "anytime") return true;

  const publishedDate = new Date(dateString);
  const daysSincePublished = (Date.now() - publishedDate.getTime()) / DAY_IN_MS;

  switch (filter) {
    case "last-week":
      return daysSincePublished <= 7;
    case "last-month":
      return daysSincePublished <= 30;
    case "last-3-months":
      return daysSincePublished <= 90;
    case "last-year":
      return daysSincePublished <= 365;
    default:
      return true;
  }
};
