import * as React from "react";
import { Controller } from "react-hook-form";
import type {
  FieldValues,
  FormState,
  Path,
  PathValue,
  UseControllerProps,
} from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import type {
  FormControlProps,
  GridProps,
  InputLabelProps,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";

import { callAll } from "./util";

export interface HookSelectProps<
  T extends FieldValues = FieldValues,
> extends UseControllerProps<T> {
  selectProps?: SelectProps & {
    clearable?: boolean;
  };
  gridProps?: GridProps;
  formControlProps?: FormControlProps;
  inputLabelProps?: Omit<InputLabelProps, "size" | "id">;
  formHelperText?: string;
  formState: FormState<T>;
  label?: React.ReactNode;
  items?: { label: string; value: string }[];
  renderItem?: (item: { label: string; value: string }) => React.ReactNode;
  defaultValue?: PathValue<T, Path<T>>;
}

export const HookSelect = <T extends FieldValues>({
  gridProps,
  ...props
}: HookSelectProps<T>): React.ReactElement => {
  if (gridProps) {
    return (
      <Grid item {...gridProps}>
        <Component {...props} />
      </Grid>
    );
  }

  return <Component {...props} />;
};

const Component = <T extends FieldValues>({
  formState: { errors: _errors },
  selectProps = {},
  formControlProps = {},
  items,
  label,
  renderItem,
  formHelperText,
  inputLabelProps,
  ...restC
}: HookSelectProps<T>) => {
  const { onChange, clearable, multiple, ...restSelect } = selectProps;

  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const { error } = restC?.control?.getFieldState(restC.name) ?? {};

  const { current: labelId } = React.useRef(Date.now().toString());

  if (clearable && multiple) {
    console.warn(
      "HookSelect: can't use `multiple` and `clearable` together as it will cause bugs",
    );
  }

  return (
    <Controller
      {...restC}
      render={({
        field: {
          onChange: onChangeI,
          name,
          value = restC?.defaultValue ?? items?.[0].value ?? "",
          ref,
        },
      }) => (
        <FormControl fullWidth error={!!error} {...formControlProps}>
          {label && (
            <InputLabel
              size={selectProps.size === "small" ? "small" : "normal"}
              id={labelId}
              {...inputLabelProps}
            >
              {label}
            </InputLabel>
          )}
          <Select
            label={label}
            labelId={labelId}
            aria-label={name}
            value={value}
            name={name}
            inputRef={ref}
            multiple={multiple}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                background: "grey",
              },
            }}
            onChange={callAll((e: SelectChangeEvent) => {
              if (multiple) {
                const {
                  target: { value },
                } = e;

                onChangeI({
                  target: {
                    value: typeof value === "string" ? value.split(",") : value,
                  },
                });
                return;
              }

              onChangeI(e);
            }, onChangeRef.current)}
            {...restSelect}
          >
            {clearable && !multiple && (
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
            )}
            {items?.map((item, index) => (
              <MenuItem value={item.value} key={item.value + "-" + index}>
                {!!renderItem
                  ? renderItem({ label: item.label, value: item.value })
                  : item.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error?.message || formHelperText}</FormHelperText>
        </FormControl>
      )}
    />
  );
};
