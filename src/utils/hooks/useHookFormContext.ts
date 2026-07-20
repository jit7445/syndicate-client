import React from "react";
import { useFormContext } from "react-hook-form";
import type { FieldPath, FieldValues } from "react-hook-form";

export const useHookFormContext = <TFieldValues extends FieldValues>() => {
  const form = useFormContext<TFieldValues>();

  const { control, formState, setValue, trigger } = form;

  const registerState = React.useCallback(
    (name: FieldPath<TFieldValues>) => {
      return {
        control,
        formState,
        name,
        setValue,
        trigger,
      };
    },
    [control, formState, setValue, trigger],
  );

  return { registerState, ...form };
};
