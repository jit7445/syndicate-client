import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import { RequestServer } from "../../utils/services";
import type {
  AuthResponse,
  RegisterFormValues,
  SignInFormValues,
} from "./types";

export const signIn = async (data: SignInFormValues): Promise<AuthResponse> =>
  RequestServer(API_ENDPOINTS.login, "POST", {
    email: data.workEmail,
    password: data.password,
  });

// The backend's register endpoint only takes {name, email, password} — it
// has no concept of companyName, so that's kept client-side only, same as
// before.
export const register = async (
  data: RegisterFormValues,
): Promise<AuthResponse> => {
  if (data.companyName) {
    localStorage.setItem("companyName", data.companyName);
  }
  return RequestServer(API_ENDPOINTS.register, "POST", {
    name: data.fullName,
    email: data.workEmail,
    password: data.password,
  });
};

export const sendForgotPasswordLink = async (email: string): Promise<void> =>
  RequestServer(API_ENDPOINTS.forgotPassword, "POST", { email });

export const sendRegisterOtp = async (email: string): Promise<void> =>
  RequestServer(API_ENDPOINTS.registerOtpSend, "POST", { email });

export const verifyRegisterOtp = async (
  email: string,
  otp: string,
): Promise<boolean> =>
  RequestServer<{ verified: boolean }>(
    API_ENDPOINTS.registerOtpVerify,
    "POST",
    { email, otp },
  ).then((res) => res.verified);
