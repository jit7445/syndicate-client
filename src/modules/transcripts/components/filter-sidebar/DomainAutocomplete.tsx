import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Checkbox from "../../../../components/checkbox/Checkbox"
import { DOMAIN_FILTER_OPTIONS } from "../../mockData"

type DomainAutocompleteProps = {
  selectedDomains: string[]
  setSelectedDomains: (domains: string[]) => void
}

export default function DomainAutocomplete({ selectedDomains, setSelectedDomains }: DomainAutocompleteProps) {
  const selectedOptions = DOMAIN_FILTER_OPTIONS.filter((option) => selectedDomains.includes(option.value))

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      size="small"
      limitTags={2}
      getLimitTagsText={(more) => `+${more} more`}
      options={DOMAIN_FILTER_OPTIONS}
      value={selectedOptions}
      onChange={(_event, value) => setSelectedDomains(value.map((option) => option.value))}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      filterOptions={(options, { inputValue }) => {
        const inputValueLowercased = inputValue.toLowerCase()
        return options.filter((option) => option.label.toLowerCase().includes(inputValueLowercased))
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.value}>
          <Checkbox checked={selected} sx={{ "&.Mui-checked": { color: "#EC9324" } }} />
          <span className="flex-1">{option.label}</span>
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search domains"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#EC9324",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#EC9324",
              },
            },
          }}
        />
      )}
    />
  )
}
