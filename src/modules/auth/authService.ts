import type {
  AuthResponse,
  RegisterFormValues,
  SignInFormValues,
} from "./types";

const createMockToken = (payload: {
  user_id: string;
  user_name: string;
  email: string;
}): string => {
  const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
  const body = btoa(JSON.stringify(payload));
  return `${header}.${body}.`;
};

// TODO: replace with a real API call once the backend exists. Request body
// is SignInFormValues (see ./types), response is AuthResponse. The backend
// must actually verify the password (bcrypt/argon2 hash compare) — today
// this mock accepts any email/password and always "succeeds". To activate:
// uncomment the block below (and its imports), delete the mock beneath it.
//
// import { API_ENDPOINTS } from "../../constants/apiEndpoints";
// import { RequestServer } from "../../utils/services";
//
// export const signIn = async (data: SignInFormValues): Promise<AuthResponse> =>
//   RequestServer(API_ENDPOINTS.login, "POST", data);
export const signIn = async (data: SignInFormValues): Promise<AuthResponse> => {
  const user = {
    id: "1",
    name: data.workEmail.split("@")[0],
    email: data.workEmail,
  };
  return Promise.resolve({
    token: createMockToken({
      user_id: user.id,
      user_name: user.name,
      email: user.email,
    }),
    user,
  });
};

// TODO: replace with a real API call once the backend exists. Request body
// is RegisterFormValues (see ./types), response is AuthResponse. The backend
// must hash the password before storing it and enforce email uniqueness. To
// activate: uncomment the block below (and its imports), delete the mock
// beneath it.
//
// import { API_ENDPOINTS } from "../../constants/apiEndpoints";
// import { RequestServer } from "../../utils/services";
//
// export const register = async (data: RegisterFormValues): Promise<AuthResponse> =>
//   RequestServer(API_ENDPOINTS.register, "POST", data);
export const register = async (
  data: RegisterFormValues,
): Promise<AuthResponse> => {
  const user = { id: "1", name: data.fullName, email: data.workEmail };
  if (data.companyName) {
    localStorage.setItem("companyName", data.companyName);
  }
  localStorage.setItem("userName", data.fullName);
  localStorage.setItem("email", data.workEmail);
  return Promise.resolve({
    token: createMockToken({
      user_id: user.id,
      user_name: user.name,
      email: user.email,
    }),
    user,
  });
};

// TODO: replace with a real API call once the backend exists. Request body
// is ForgotPasswordFormValues (see ./types) -> 202 Accepted. Always respond
// generically regardless of whether the email is registered, so this
// endpoint can't be used to enumerate accounts — the real reset-link email
// is sent server-side. To activate: uncomment the block below (and its
// imports), delete the mock beneath it.
//
// import { API_ENDPOINTS } from "../../constants/apiEndpoints";
// import { RequestServer } from "../../utils/services";
//
// export const sendForgotPasswordLink = async (email: string): Promise<void> =>
//   RequestServer(API_ENDPOINTS.forgotPassword, "POST", { email });
export const sendForgotPasswordLink = async (email: string): Promise<void> => {
  console.log("Forgot-password link requested for:", email);
  return Promise.resolve();
};

// TODO: replace with real API calls once the backend exists.
// send:   { email: string } -> 202 Accepted
// verify: { email: string, otp: string } -> { verified: boolean }
// Today both mocks always succeed regardless of the email/otp given. To
// activate: uncomment the block below (and its imports), delete the mocks
// beneath it.
//
// import { API_ENDPOINTS } from "../../constants/apiEndpoints";
// import { RequestServer } from "../../utils/services";
//
// export const sendRegisterOtp = async (email: string): Promise<void> =>
//   RequestServer(API_ENDPOINTS.registerOtpSend, "POST", { email });
//
// export const verifyRegisterOtp = async (
//   email: string,
//   otp: string,
// ): Promise<boolean> =>
//   RequestServer<{ verified: boolean }>(
//     API_ENDPOINTS.registerOtpVerify,
//     "POST",
//     { email, otp },
//   ).then((res) => res.verified);
export const sendRegisterOtp = async (email: string): Promise<void> => {
  console.log("Register OTP sent to:", email);
  return Promise.resolve();
};

export const verifyRegisterOtp = async (
  email: string,
  otp: string,
): Promise<boolean> => {
  console.log("Verifying register OTP for:", email, otp);
  return Promise.resolve(true);
};
