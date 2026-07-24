import type { CSSProperties } from "react";
import { COLORS } from "../../constants/colors";

export function getButtonStyle(
  variant: string,
  disabled?: boolean,
): CSSProperties {
  const isOutlinedAccent = variant === "outlined-accent";
  const isOutlined = variant === "outlined" || isOutlinedAccent;

  return {
    border: isOutlinedAccent
      ? `1px solid ${COLORS.accent2}`
      : variant === "outlined"
        ? "1px solid #9ca3af"
        : "none",
    color: isOutlinedAccent
      ? COLORS.accent2
      : variant === "outlined"
        ? COLORS.textPrimary
        : "white",
    fontSize: "13px",
    borderRadius: "9999px",
    textTransform: "capitalize",
    height: "36px",
    padding: "0 20px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: isOutlined ? "transparent" : COLORS.accent2,
    boxShadow: "none",
    fontFamily: "inherit",
    opacity: disabled ? "0.4" : "initial",
    fontWeight: 500,
  };
}
