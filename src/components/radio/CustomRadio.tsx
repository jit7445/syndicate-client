import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { COLORS } from "../../constants/colors";

type InputProps = {
  label: string;
  value: string;
};

export default function CustomRadio({ label, value }: InputProps) {
  return (
    <FormControlLabel
      className="mr-8"
      value={value}
      control={
        <Radio sx={{ "&.Mui-checked": { color: COLORS.accent2 } }} />
      }
      label={label}
    />
  );
}
