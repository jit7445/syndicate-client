import Btn from "@mui/material/Button";
import type { ReactNode, CSSProperties } from "react";

type InputProps = {
  label: string;
  variant: string;
  onClick?: any;
  children?: ReactNode;
  type?: any;
  disabled?: boolean;
  buttonType?: "submit" | "button";
  formId?: string;
  styles?: CSSProperties;
  startIcon?: ReactNode;
  sx?: any;
  className?: string;
  [key: string]: any;
};

export default function Button({
  label,
  variant,
  onClick,
  children,
  type,
  disabled,
  buttonType = "button",
  formId,
  styles = {},
  startIcon,
  sx,
  className,
  ...rest
}: InputProps) {
  const isOutlinedAccent = variant === "outlined-accent";
  const isOutlined = variant === "outlined" || isOutlinedAccent;

  return (
    <Btn
      onClick={onClick}
      className={className}
      style={{
        border: isOutlinedAccent
          ? "1px solid #EC9324"
          : variant === "outlined"
            ? "1px solid #9ca3af"
            : "none",
        color: isOutlinedAccent
          ? "#EC9324"
          : variant === "outlined"
            ? "#1f2937"
            : "white",
        fontSize: "13px",
        borderRadius: "9999px",
        textTransform: "capitalize",
        height: "36px",
        padding: "0 20px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: isOutlined ? "transparent" : "#EC9324",
        boxShadow: "none",
        fontFamily: "inherit",
        opacity: disabled ? "0.4" : "initial",
        fontWeight: 500,
        ...styles,
      }}
      size="small"
      type={buttonType}
      form={formId || undefined}
      variant={variant === "contained" ? "contained" : "outlined"}
      disabled={disabled}
      startIcon={startIcon}
      {...(type && { type })}
      sx={sx}
      {...rest}
    >
      {children} {label}
    </Btn>
  );
}
