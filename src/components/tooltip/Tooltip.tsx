import { styled } from "@mui/material/styles";
import MUITooltip, {
  tooltipClasses,
  type TooltipProps,
} from "@mui/material/Tooltip";

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MUITooltip
    {...props}
    leaveTouchDelay={5000}
    enterTouchDelay={0}
    classes={{ popper: className }}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(97, 97, 97, 0.92)",
    maxWidth: 300,
    fontSize: theme.typography.pxToRem(14),
    padding: "6px 10px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "rgba(97, 97, 97, 0.92)",
  },
}));

export default Tooltip;
