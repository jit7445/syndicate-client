import { useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormProvider, useForm } from "react-hook-form";
import HeadsetIcon from "../../icons/Headset/Headset";
import Button from "../button/Button";
import { HookTextField } from "../form-fields/SLFieldTextField";
import { defaultFormTheme } from "../../common/defaultFormTheme";
import { commonInputStyles } from "../../common/input-styles";
import { validRegex } from "../../utils/isValidType";
import { useHookFormContext } from "../../utils/hooks/useHookFormContext";

type SupportFormValues = {
  message: string;
  email: string;
};

function SupportFields() {
  const { registerState } = useHookFormContext<SupportFormValues>();

  return (
    <Grid container spacing={2}>
      <HookTextField
        {...registerState("message")}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
        textFieldProps={{
          ...commonInputStyles,
          label: "What are you trying to find",
          required: true,
          multiline: true,
          rows: 3,
        }}
        gridProps={{ xs: 12 }}
      />
      <HookTextField
        {...registerState("email")}
        rules={{
          required: {
            value: true,
            message: "This field is required",
          },
          pattern: {
            value: validRegex("email"),
            message: "Please enter a correct email",
          },
        }}
        textFieldProps={{
          ...commonInputStyles,
          label: "Work email",
          required: true,
        }}
        gridProps={{ xs: 12 }}
      />
      <Grid item xs={12}>
        <Button
          variant="contained"
          label="Send request"
          buttonType="submit"
          styles={{
            width: "100%",
            height: "44px",
            fontSize: "14px",
            fontWeight: 600,
            marginTop: "4px",
          }}
        />
      </Grid>
    </Grid>
  );
}

export default function FloatingSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const methods = useForm<SupportFormValues>({
    defaultValues: { message: "", email: "" },
  });
  const defaultTheme = createTheme(defaultFormTheme);

  const onSubmit = (data: SupportFormValues) => {
    console.log("Support request:", data);
    methods.reset();
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (isOpen) {
      methods.reset();
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {isOpen && (
          <div className="mb-3 w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-text-primary">
                  Can't find what you're looking for
                </h3>
                <p className="mt-1 text-xs text-text-secondary">
                  We'll get back within one business day
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <CloseIcon fontSize="small" />
              </button>
            </div>

            <div className="mt-4">
              <FormProvider {...methods}>
                <ThemeProvider theme={defaultTheme}>
                  <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                    <SupportFields />
                  </form>
                </ThemeProvider>
              </FormProvider>
            </div>
          </div>
        )}

        <button
          type="button"
          aria-label="Support"
          onClick={handleToggle}
          className="flex h-13 w-13 items-center justify-center rounded-full bg-accent-2 text-white shadow-xl transition-all hover:scale-105 active:scale-95 focus:outline-none"
          style={{ backgroundColor: "#EC9324" }}
        >
          {isOpen ? (
            <CloseIcon sx={{ fontSize: 26, color: "#ffffff" }} />
          ) : (
            <HeadsetIcon sx={{ fontSize: 26, color: "#ffffff" }} />
          )}
        </button>
      </div>
    </ClickAwayListener>
  );
}
