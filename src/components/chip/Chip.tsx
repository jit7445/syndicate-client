import { Chip as MUIChip } from "@mui/material";
import type { ChipProps as MUIChipProps } from "@mui/material";

export type ChipProps = MUIChipProps;

const Chip = (props: ChipProps) => {
  return <MUIChip {...props} />;
};

export default Chip;
