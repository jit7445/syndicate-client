import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { defaultFormTheme } from "../../../../common/defaultFormTheme";
import {
  signIn,
  register as registerUser,
  sendForgotPasswordLink,
  sendRegisterOtp,
  verifyRegisterOtp,
} from "../../authService";
import { processToken } from "../../../../utils/authUtils";
import { useCart } from "../../../cart/hooks/useCart";
import SignInFields from "./sign-in-fields";
import RegisterFields from "./register-fields";
import RegisterOtpFields from "./register-otp-fields";
import ForgotPasswordFields from "./forgot-password-fields";
import type {
  AuthDialogMode,
  ForgotPasswordFormValues,
  RegisterFormValues,
  RegisterOtpFormValues,
  SignInFormValues,
} from "../../types";

type AuthFormProps = {
  mode: AuthDialogMode;
  setMode: (mode: AuthDialogMode) => void;
  handleSubmitClose: () => void;
};

const signInDefaultValues: SignInFormValues = { workEmail: "", password: "" };
const registerDefaultValues: RegisterFormValues = {
  fullName: "",
  workEmail: "",
  companyName: "",
  password: "",
};
const forgotPasswordDefaultValues: ForgotPasswordFormValues = { email: "" };
const registerOtpDefaultValues: RegisterOtpFormValues = { otp: "" };

export default function AuthForm({
  mode,
  setMode,
  handleSubmitClose,
}: AuthFormProps) {
  const signInMethods = useForm<SignInFormValues>({
    defaultValues: signInDefaultValues,
  });
  const registerMethods = useForm<RegisterFormValues>({
    defaultValues: registerDefaultValues,
  });
  const forgotPasswordMethods = useForm<ForgotPasswordFormValues>({
    defaultValues: forgotPasswordDefaultValues,
  });
  const registerOtpMethods = useForm<RegisterOtpFormValues>({
    defaultValues: registerOtpDefaultValues,
  });
  const defaultTheme = createTheme(defaultFormTheme);
  const { mergeGuestCartAfterAuth } = useCart();

  // Sign-up is a two-step flow: collect details, send an OTP to the given
  // email, then only actually create the account once that OTP is verified.
  const [registerStep, setRegisterStep] = useState<"details" | "otp">(
    "details",
  );
  const [pendingRegisterData, setPendingRegisterData] =
    useState<RegisterFormValues | null>(null);
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);

  // Reset multi-step state whenever the dialog switches away from that mode,
  // so re-opening register/forgot-password always starts from the beginning.
  useEffect(() => {
    if (mode !== "register") {
      setRegisterStep("details");
      setPendingRegisterData(null);
      registerOtpMethods.reset(registerOtpDefaultValues);
    }
    if (mode !== "forgot-password") {
      setIsResetLinkSent(false);
      forgotPasswordMethods.reset(forgotPasswordDefaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const onSignIn = async (data: SignInFormValues) => {
    const response = await signIn(data);
    processToken(response.token);
    await mergeGuestCartAfterAuth();
    handleSubmitClose();
  };

  const onRegisterDetailsSubmit = async (data: RegisterFormValues) => {
    await sendRegisterOtp(data.workEmail);
    setPendingRegisterData(data);
    setRegisterStep("otp");
  };

  const onVerifyRegisterOtp = async ({ otp }: RegisterOtpFormValues) => {
    if (!pendingRegisterData) return;

    const verified = await verifyRegisterOtp(
      pendingRegisterData.workEmail,
      otp,
    );
    if (!verified) {
      registerOtpMethods.setError("otp", {
        message: "Incorrect OTP, please try again",
      });
      return;
    }

    const response = await registerUser(pendingRegisterData);
    processToken(response.token);
    await mergeGuestCartAfterAuth();
    handleSubmitClose();
  };

  const onForgotPasswordSubmit = async ({
    email,
  }: ForgotPasswordFormValues) => {
    await sendForgotPasswordLink(email);
    setIsResetLinkSent(true);
  };

  if (mode === "signin") {
    return (
      <ThemeProvider theme={defaultTheme}>
        <FormProvider {...signInMethods}>
          <form onSubmit={signInMethods.handleSubmit(onSignIn)} noValidate>
            <SignInFields
              onSwitchToRegister={() => setMode("register")}
              onForgotPassword={() => setMode("forgot-password")}
            />
          </form>
        </FormProvider>
      </ThemeProvider>
    );
  }

  if (mode === "forgot-password") {
    return (
      <ThemeProvider theme={defaultTheme}>
        <FormProvider {...forgotPasswordMethods}>
          <form
            onSubmit={forgotPasswordMethods.handleSubmit(
              onForgotPasswordSubmit,
            )}
            noValidate
          >
            <ForgotPasswordFields
              isLinkSent={isResetLinkSent}
              onBackToSignIn={() => setMode("signin")}
            />
          </form>
        </FormProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      {registerStep === "details" ? (
        <FormProvider {...registerMethods}>
          <form
            onSubmit={registerMethods.handleSubmit(onRegisterDetailsSubmit)}
            noValidate
          >
            <RegisterFields
              onSwitchToSignIn={() => setMode("signin")}
            />
          </form>
        </FormProvider>
      ) : (
        <FormProvider {...registerOtpMethods}>
          <form
            onSubmit={registerOtpMethods.handleSubmit(onVerifyRegisterOtp)}
            noValidate
          >
            <RegisterOtpFields
              email={pendingRegisterData?.workEmail ?? ""}
              onResend={() =>
                sendRegisterOtp(pendingRegisterData?.workEmail ?? "")
              }
              onBack={() => setRegisterStep("details")}
            />
          </form>
        </FormProvider>
      )}
    </ThemeProvider>
  );
}
