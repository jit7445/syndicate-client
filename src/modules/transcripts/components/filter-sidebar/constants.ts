import type { PriceFilterValue, PublishedDateFilterValue, SidebarFilterPayload } from "../../types"

export const PRICE_OPTIONS: { label: string; value: PriceFilterValue }[] = [
  { label: "All prices", value: "all" },
  { label: "Free", value: "free" },
  { label: "Under $100", value: "under-100" },
  { label: "$100 - $250", value: "100-250" },
  { label: "Over $250", value: "over-250" },
]

export const PUBLISHED_DATE_OPTIONS: { label: string; value: PublishedDateFilterValue }[] = [
  { label: "Anytime", value: "anytime" },
  { label: "Past week", value: "last-week" },
  { label: "Past month", value: "last-month" },
  { label: "Past 3 months", value: "last-3-months" },
  { label: "Past year", value: "last-year" },
]

export const DEFAULT_SIDEBAR_FILTERS: SidebarFilterPayload = {
  domains: [],
  price: "all",
  publishedDate: "anytime",
}
