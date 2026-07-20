import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material";
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

const FlexCenter = (props: props) => {
  return <Box sx={{ ...totalBoxStyles, ...props.sx }}>{props.children}</Box>;
};

export default FlexCenter;
