import Btn from "@mui/material/Button";
import type { ReactNode, CSSProperties } from "react";
import { getButtonStyle } from "./Button.styles";

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
  return (
    <Btn
      onClick={onClick}
      className={className}
      style={{
        ...getButtonStyle(variant, disabled),
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
