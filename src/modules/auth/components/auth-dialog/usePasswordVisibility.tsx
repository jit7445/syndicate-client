import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Tooltip from "@mui/material/Tooltip";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export function usePasswordVisibility() {
  const [isVisible, setIsVisible] = useState(false);
  const label = isVisible ? "Hide password" : "Show password";

  return {
    type: isVisible ? "text" : "password",
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <Tooltip title={label} arrow placement="bottom">
            <IconButton
              onClick={() => setIsVisible((prev) => !prev)}
              edge="end"
              size="small"
              aria-label={label}
            >
              {isVisible ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </InputAdornment>
      ),
    },
  } as const;
}
