import type { Theme } from "@mui/material";
import type { SystemStyleObject } from "@mui/system";

const DIALOG_PAPER_BACKGROUND = "#f5f5f5";
const DIALOG_SECTION_BACKGROUND = "#fafafa";

export const dialogPaperSx: SystemStyleObject<Theme> = {
  "& .MuiDialog-paper": {
    borderRadius: "10px",
    backgroundColor: DIALOG_PAPER_BACKGROUND,
  },
};

export const dialogTitleSx: SystemStyleObject<Theme> = {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "2px solid rgba(112, 112, 112, 0.2)",
  backgroundColor: DIALOG_SECTION_BACKGROUND,
  paddingLeft: "16px !important",
  paddingRight: "16px",
  paddingTop: "10px",
  paddingBottom: "9px",
  "@media print": {
    display: "none",
  },
};

export const dialogTitleHeadSx: SystemStyleObject<Theme> = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minWidth: 0,
  fontSize: "16px",
  fontWeight: 500,
  paddingTop: "5px",
};

export const dialogCloseGridSx: SystemStyleObject<Theme> = {
  flexShrink: 0,
  pl: 1,
  display: "flex",
  justifyContent: "flex-end",
  paddingTop: "5px",
};

export const dialogContentSx: SystemStyleObject<Theme> = {
  backgroundColor: DIALOG_SECTION_BACKGROUND,
  padding: "0.75rem 1rem",
};
