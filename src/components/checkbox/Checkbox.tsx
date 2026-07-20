import { Checkbox as MUICheckbox } from "@mui/material";
import type { CheckboxProps as MUICheckboxProps } from "@mui/material";

export type CheckboxProps = MUICheckboxProps;

const Checkbox = (props: CheckboxProps) => {
  return <MUICheckbox {...props} />;
};

export default Checkbox;
