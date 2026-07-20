import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../../common/defaultFormTheme";
import { signIn, register as registerUser } from "../../authService";
import { processToken } from "../../../../utils/authUtils";
import SignInFields from "./sign-in-fields";
import RegisterFields from "./register-fields";
import type {
  AuthDialogMode,
  RegisterFormValues,
  SignInFormValues,
} from "../../types";

type AuthFormProps = {
  mode: AuthDialogMode;
  setMode: (mode: AuthDialogMode) => void;
  handleClose: () => void;
  handleSubmitClose: () => void;
};

const signInDefaultValues: SignInFormValues = { workEmail: "", password: "" };
const registerDefaultValues: RegisterFormValues = {
  fullName: "",
  workEmail: "",
  companyName: "",
  password: "",
};

export default function AuthForm({
  mode,
  setMode,
  handleClose,
  handleSubmitClose,
}: AuthFormProps) {
  const signInMethods = useForm<SignInFormValues>({
    defaultValues: signInDefaultValues,
  });
  const registerMethods = useForm<RegisterFormValues>({
    defaultValues: registerDefaultValues,
  });
  const defaultTheme = createTheme(defaultFormTheme);

  const onSignIn = async (data: SignInFormValues) => {
    const response = await signIn(data);
    processToken(response.token);
    handleSubmitClose();
  };

  const onRegister = async (data: RegisterFormValues) => {
    const response = await registerUser(data);
    processToken(response.token);
    handleSubmitClose();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {mode === "signin" ? (
        <FormProvider {...signInMethods}>
          <form onSubmit={signInMethods.handleSubmit(onSignIn)} noValidate>
            <SignInFields
              handleClose={handleClose}
              onSwitchToRegister={() => setMode("register")}
            />
          </form>
        </FormProvider>
      ) : (
        <FormProvider {...registerMethods}>
          <form onSubmit={registerMethods.handleSubmit(onRegister)} noValidate>
            <RegisterFields
              handleClose={handleClose}
              onSwitchToSignIn={() => setMode("signin")}
            />
          </form>
        </FormProvider>
      )}
    </ThemeProvider>
  );
}
