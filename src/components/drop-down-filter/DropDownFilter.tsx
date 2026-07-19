import type { SxProps, Theme } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

type props = {
  setFilterPayload: (filter: string) => void
  link?: string | null
  filterValue: string
  dropDownItems: { label: React.ReactNode; value: string }[]
  noMinWidth?: boolean
  selectSx?: SxProps<Theme>
}

export default function DropDownFilter({
  link,
  setFilterPayload,
  filterValue,
  dropDownItems,
  noMinWidth = false,
  selectSx = {},
}: props) {
  const navigate = useNavigate()

  const handleChange = (event: SelectChangeEvent) => {
    const type = event.target.value
    setFilterPayload(type)
    if (link) {
      void navigate(link)
    }
  }

  return (
    <FormControl
      variant="standard"
      sx={{
        mx: 1,
        minWidth: noMinWidth ? 0 : 70,
      }}
    >
      <Select
        labelId="expert-types"
        id="demo-simple-select-standard"
        value={filterValue}
        onChange={handleChange}
        label="Expert"
        disableUnderline
        sx={{
          fontSize: '0.75rem',
          fontFamily: 'inherit',
          fontWeight: '400',
          color: 'rgba(37, 43, 59, 0.73)',
          padding: '4px 0',
          paddingTop: '6px',
          ...selectSx,
        }}
        displayEmpty
      >
        {dropDownItems.map((item: { label: React.ReactNode; value: string }) => (
          <MenuItem
            sx={{
              fontSize: '0.75rem',
              fontFamily: 'inherit',
              fontWeight: '400',
              color: '#252B3B',
            }}
            key={item.value}
            value={item.value}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
