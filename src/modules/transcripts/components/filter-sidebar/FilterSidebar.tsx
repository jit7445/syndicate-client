import RadioGroup from "@mui/material/RadioGroup"
import CustomRadio from "../../../../components/radio/CustomRadio"
import FilterSection from "./FilterSection"
import DomainAutocomplete from "./DomainAutocomplete"
import { DEFAULT_SIDEBAR_FILTERS, PRICE_OPTIONS, PUBLISHED_DATE_OPTIONS } from "./constants"
import type { PriceFilterValue, PublishedDateFilterValue, SidebarFilterPayload } from "../../types"

type FilterSidebarProps = {
  filters: SidebarFilterPayload
  setFilters: (filters: SidebarFilterPayload) => void
}

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  return (
    <div className="w-80 shrink-0 rounded-lg border border-gray-200 bg-main-background p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-text-primary">Filters</h2>
        <button
          type="button"
          className="text-sm text-accent-2 hover:underline"
          onClick={() => setFilters(DEFAULT_SIDEBAR_FILTERS)}
        >
          Clear all
        </button>
      </div>

      <FilterSection title="Domain">
        <DomainAutocomplete
          selectedDomains={filters.domains}
          setSelectedDomains={(domains) => setFilters({ ...filters, domains })}
        />
      </FilterSection>

      <FilterSection title="Price">
        <RadioGroup value={filters.price} onChange={(e) => setFilters({ ...filters, price: e.target.value as PriceFilterValue })}>
          {PRICE_OPTIONS.map((option) => (
            <CustomRadio key={option.value} label={option.label} value={option.value} />
          ))}
        </RadioGroup>
      </FilterSection>

      <FilterSection title="Published date">
        <RadioGroup
          value={filters.publishedDate}
          onChange={(e) => setFilters({ ...filters, publishedDate: e.target.value as PublishedDateFilterValue })}
        >
          {PUBLISHED_DATE_OPTIONS.map((option) => (
            <CustomRadio key={option.value} label={option.label} value={option.value} />
          ))}
        </RadioGroup>
      </FilterSection>
    </div>
  )
}
