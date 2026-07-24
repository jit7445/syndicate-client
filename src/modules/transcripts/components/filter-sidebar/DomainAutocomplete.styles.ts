import type { SxProps, Theme } from "@mui/material";
import { COLORS } from "../../../../constants/colors";

export const domainCheckboxSx: SxProps<Theme> = {
  "&.Mui-checked": { color: COLORS.accent2 },
};

export const domainTextFieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: COLORS.accent2,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: COLORS.accent2,
    },
  },
};
