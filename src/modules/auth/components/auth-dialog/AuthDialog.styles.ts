import type { SxProps, Theme } from "@mui/material";

export const authDialogPaperSx: SxProps<Theme> = {
  "& .MuiDialog-paper": {
    borderRadius: "16px",
    overflow: "hidden",
    height: "540px",
    maxHeight: "90vh",
  },
};
