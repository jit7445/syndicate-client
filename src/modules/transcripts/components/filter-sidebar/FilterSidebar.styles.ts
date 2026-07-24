import type { SxProps, Theme } from "@mui/material";
import { COLORS } from "../../../../constants/colors";

export const purchasedOnlySwitchSx: SxProps<Theme> = {
  "& .MuiSwitch-switchBase.Mui-checked": { color: COLORS.accent2 },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: COLORS.accent2,
  },
};
