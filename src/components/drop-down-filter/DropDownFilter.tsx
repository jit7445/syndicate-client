import type { SxProps, Theme } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  getFormControlSx,
  selectBaseSx,
  menuItemSx,
} from "./DropDownFilter.styles";

type props = {
  setFilterPayload: (filter: string) => void;
  link?: string | null;
  filterValue: string;
  dropDownItems: { label: React.ReactNode; value: string }[];
  noMinWidth?: boolean;
  selectSx?: SxProps<Theme>;
};

export default function DropDownFilter({
  link,
  setFilterPayload,
  filterValue,
  dropDownItems,
  noMinWidth = false,
  selectSx = {},
}: props) {
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    const type = event.target.value;
    setFilterPayload(type);
    if (link) {
      void navigate(link);
    }
  };

  return (
    <FormControl variant="standard" sx={getFormControlSx(noMinWidth)}>
      <Select
        labelId="expert-types"
        id="demo-simple-select-standard"
        value={filterValue}
        onChange={handleChange}
        disableUnderline
        sx={{
          ...selectBaseSx,
          ...selectSx,
        }}
        displayEmpty
      >
        {dropDownItems.map(
          (item: { label: React.ReactNode; value: string }) => (
            <MenuItem
              sx={menuItemSx}
              key={item.value}
              value={item.value}
            >
              {item.label}
            </MenuItem>
          ),
        )}
      </Select>
    </FormControl>
  );
}
