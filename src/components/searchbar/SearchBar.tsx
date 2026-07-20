import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import { CircularProgress, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import type { FormEvent } from "react";

const SEARCH_ICON_SRC = "/assets/search.png";

type Props = {
  placeholder: string;
  onSearch: (text: string) => void;
  searchValue: string;
  minWidth?: string;
  showToolTip?: boolean;
  maxWidth?: string;
  m?: {
    xs: string;
    sm: string;
  };
  p?: string;
  showSearchIcon?: boolean;
  type?: string;
  getOnChange?: boolean;
  onChangeFunction?: (text: string) => void | undefined;
  isLoading?: boolean;
  height?: string;
  submitButtonVariant?: "default" | "orange-circle";
  borderRadius?: string;
  backgroundColor?: string;
  boxShadow?: string;
  inputFontSize?: string;
};

export type SearchBarHandle = {
  resetSearch: () => void;
};

const SearchBar = React.forwardRef<SearchBarHandle, Props>(
  (
    {
      placeholder,
      onSearch,
      searchValue,
      minWidth,
      maxWidth,
      m,
      p,
      showSearchIcon = true,
      showToolTip = false,
      type,
      getOnChange = false,
      onChangeFunction = undefined,
      isLoading = false,
      height = "32px",
      submitButtonVariant = "default",
      borderRadius = "25px",
      backgroundColor = "rgba(111, 105, 105, 0.07)",
      boxShadow = "none",
      inputFontSize = "12px",
    },
    ref,
  ) => {
    const [search, setSearch] = useState(searchValue);

    function onSubmit(event: FormEvent) {
      event.preventDefault();
      event.stopPropagation();
      onSearch(search);
    }
    React.useImperativeHandle(ref, () => ({
      resetSearch() {
        setSearch("");
        onSearch("");
      },
    }));
    useEffect(() => {
      setSearch(searchValue);
    }, [searchValue]);
    const getToolTip = () => {
      if (showToolTip && search.length > 2) {
        return search;
      }
      return null;
    };
    const handleInputBaseChange = (event: any) => {
      setSearch(event.target.value);
      if (getOnChange && onChangeFunction) {
        onChangeFunction(event.target.value);
      }
      if (event.target.value === "") {
        onSearch("");
      }
    };
    return (
      <Tooltip
        title={getToolTip()}
        leaveTouchDelay={7000}
        enterTouchDelay={0}
        arrow
        placement="top"
        followCursor
      >
        <Paper
          component="form"
          sx={{
            m: m || {
              xs: "0.75rem 0",
              sm: "0 1rem",
            },
            p:
              p ||
              (submitButtonVariant === "orange-circle"
                ? height === "56px"
                  ? "6px 8px 6px 20px"
                  : "4px 6px 4px 16px"
                : "5px 12px"),
            paddingRight: "6px",
            display: "flex",
            alignItems: "center",
            borderRadius: borderRadius,
            backgroundColor: backgroundColor,
            boxShadow: boxShadow,
            maxWidth: maxWidth || "500px",
            minWidth: minWidth || {
              xs: "200px",
              sm: "200px",
              md: "250px",
              lg: "400px",
            },
            height: height,
          }}
          onSubmit={onSubmit}
        >
          {showSearchIcon && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                alt="search icon"
                src={SEARCH_ICON_SRC}
                width={height === "56px" ? "18px" : "14px"}
                style={{ opacity: "0.5" }}
              />
            </Box>
          )}

          <InputBase
            ref={ref}
            value={search}
            type={type || "text"}
            onChange={handleInputBaseChange}
            sx={{
              ml: 0,
              flex: 1,
              fontSize: inputFontSize,
              fontWeight: "500",
              pl: "10px",
              "&::-webkit-search-clear-button": {
                display: "none",
              },
              "&::-webkit-search-cancel-button": {
                display: "none",
              },
            }}
            placeholder={placeholder}
            inputProps={{ "aria-label": "Search bar" }}
          />
          {search && (
            <IconButton
              sx={{
                padding: "2px",
              }}
              onClick={() => {
                setSearch("");
                onSearch("");
              }}
            >
              <CloseIcon
                sx={{
                  fontSize: "18px",
                }}
              />
            </IconButton>
          )}
          {isLoading ? (
            <CircularProgress size={20} color="primary" sx={{ mr: 1 }} />
          ) : submitButtonVariant === "orange-circle" ? (
            <IconButton
              sx={{
                padding: height === "56px" ? "10px" : "8px",
                backgroundColor: "#ec9324",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#d8811d",
                },
                width: height === "56px" ? "40px" : "32px",
                height: height === "56px" ? "40px" : "32px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              type="submit"
            >
              <SendIcon
                sx={{
                  fontSize: height === "56px" ? "20px" : "16px",
                  color: "#ffffff",
                }}
              />
            </IconButton>
          ) : (
            <IconButton
              sx={{
                padding: "5px",
              }}
              type="submit"
            >
              <SendIcon
                sx={{
                  fontSize: "18px",
                  color: "rgba(0,0,0,0.5)",
                }}
              />
            </IconButton>
          )}
        </Paper>
      </Tooltip>
    );
  },
);

export default SearchBar;
