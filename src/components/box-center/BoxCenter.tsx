import type { SxProps, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import type { ReactNode } from "react";

const totalBoxStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

type props = {
  children: ReactNode;
  sx?: SxProps<Theme> | undefined;
};

const BoxCenter = ({ children, sx }: props) => {
  return <Box sx={{ ...totalBoxStyles, ...sx }}>{children}</Box>;
};

export default BoxCenter;
