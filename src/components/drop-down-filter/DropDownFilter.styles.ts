import type { SxProps, Theme } from "@mui/material";

const MUTED_TEXT_RGB = "37, 43, 59";
const MUTED_TEXT_COLOR = "#252B3B";

export function getFormControlSx(noMinWidth: boolean): SxProps<Theme> {
  return {
    mx: 1,
    minWidth: noMinWidth ? 0 : 70,
  };
}

export const selectBaseSx: SxProps<Theme> = {
  fontSize: "0.75rem",
  fontFamily: "inherit",
  fontWeight: "400",
  color: `rgba(${MUTED_TEXT_RGB}, 0.73)`,
  padding: "4px 0",
  paddingTop: "6px",
};

export const menuItemSx: SxProps<Theme> = {
  fontSize: "0.75rem",
  fontFamily: "inherit",
  fontWeight: "400",
  color: MUTED_TEXT_COLOR,
};
