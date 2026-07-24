import type { SxProps, Theme } from "@mui/material";

export const domainLabelSx: SxProps<Theme> = {
  fontSize: "14px",
  fontWeight: 600,
  color: "text.secondary",
  flexShrink: 0,
};

export const domainChipSx: SxProps<Theme> = {
  maxWidth: "140px",
  "& .MuiChip-label": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};

export const cartTooltipSx: SxProps<Theme> = {
  fontSize: "12px",
  borderRadius: "8px",
  px: 1.5,
  py: 0.75,
  maxWidth: "none",
  whiteSpace: "nowrap",
};
