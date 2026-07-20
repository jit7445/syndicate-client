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

// TODO: replace with a real API call.
// POST /api/auth/login
// Request body:  { workEmail: string, password: string }
// Response body: { token: string, user: { id: string, name: string, email: string } }
// The backend must actually verify the password (bcrypt/argon2 hash compare) —
// today this mock accepts any email/password and always "succeeds".
// RequestServer(API_ENDPOINTS.login, 'POST', data) once the backend exists.
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

// TODO: replace with a real API call.
// POST /api/auth/register
// Request body:  { fullName: string, workEmail: string, companyName: string, password: string }
// Response body: { token: string, user: { id: string, name: string, email: string } }
// The backend must hash the password before storing it and enforce email uniqueness.
// RequestServer(API_ENDPOINTS.register, 'POST', data) once the backend exists.
export const register = async (
  data: RegisterFormValues,
): Promise<AuthResponse> => {
  const user = { id: "1", name: data.fullName, email: data.workEmail };
  return Promise.resolve({
    token: createMockToken({
      user_id: user.id,
      user_name: user.name,
      email: user.email,
    }),
    user,
  });
};
