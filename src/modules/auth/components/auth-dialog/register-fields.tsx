import Grid from "@mui/material/Grid";
import { HookTextField } from "../../../../components/form-fields/SLFieldTextField";
import FormCancelSubmitBtns from "../../../../components/form-cancel-submit-btns/FormCancelSubmitBtns";
import { useHookFormContext } from "../../../../utils/hooks/useHookFormContext";
import { validRegex } from "../../../../utils/isValidType";
import { commonInputStyles } from "../../../../common/input-styles";
import type { RegisterFormValues } from "../../types";

type RegisterFieldsProps = {
  handleClose: () => void;
  onSwitchToSignIn: () => void;
};

export default function RegisterFields({
  handleClose,
  onSwitchToSignIn,
}: RegisterFieldsProps) {
  const { registerState } = useHookFormContext<RegisterFormValues>();

  return (
    <Grid container spacing={2} mt="1px">
      <HookTextField
        {...registerState("fullName")}
        rules={{ required: { value: true, message: "This field is required" } }}
        textFieldProps={{
          ...commonInputStyles,
          label: "Full name",
          required: true,
        }}
        gridProps={{ xs: 12 }}
      />
      <HookTextField
        {...registerState("workEmail")}
        rules={{
          required: { value: true, message: "This field is required" },
          pattern: {
            value: validRegex("email"),
            message: "Please enter a correct email",
          },
        }}
        textFieldProps={{
          ...commonInputStyles,
          label: "Email",
          required: true,
        }}
        gridProps={{ xs: 12 }}
      />
      <HookTextField
        {...registerState("companyName")}
        textFieldProps={{ ...commonInputStyles, label: "Company name" }}
        gridProps={{ xs: 12 }}
      />
      <HookTextField
        {...registerState("password")}
        rules={{
          required: { value: true, message: "This field is required" },
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters",
          },
        }}
        textFieldProps={{
          ...commonInputStyles,
          label: "Password",
          required: true,
          type: "password",
        }}
        gridProps={{ xs: 12 }}
      />

      <Grid item xs={12}>
        <span className="text-sm text-gray-700">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-accent-2 underline font-medium cursor-pointer"
          >
            Sign in
          </button>
        </span>
      </Grid>

      <FormCancelSubmitBtns handleClose={handleClose} submitLabel="Sign up" />
    </Grid>
  );
}
