import { clearStorage, getStorageItem, setStorageItem } from "./storageUtils";
import { APP_ROUTES } from "../constants/appRoutes";

type JWTPayload = {
  user_id: string;
  user_name: string;
  email: string;
  [key: string]: unknown;
};

export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    if (!token || typeof token !== "string") return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export const processToken = (
  token: string,
  user?: { id?: string; name?: string; email?: string },
): void => {
  setStorageItem("token", token);
  setStorageItem("authToken", token);

  // The backend's JWT only carries {id, email} — not a display name — so the
  // `user` object from the login/register response (when given) takes
  // priority; JWT claims are just the fallback for the SSO handoff below,
  // whose tokens carry the older user_id/user_name shape.
  const payload = decodeJWT(token);
  const userId = user?.id ?? payload?.user_id;
  const userName = user?.name ?? payload?.user_name;
  const email = user?.email ?? payload?.email;

  if (userId) setStorageItem("userId", userId);
  if (userName) setStorageItem("userName", userName);
  if (email) setStorageItem("email", email);
};

export const isLoggedIn = (): boolean => {
  return !!getStorageItem<string>("token");
};

// TODO: uncomment once the backend exists (fire-and-forget — don't block the
// redirect on it), delete this comment once wired up.
// import { API_ENDPOINTS } from "../constants/apiEndpoints";
// import { RequestServer } from "./services";
export const logout = (): void => {
  // void RequestServer(API_ENDPOINTS.logout, "POST");
  clearStorage();
  window.location.href = APP_ROUTES.home;
};

// Handles SSO handoff from the main Infollion site, e.g. https://.../transcripts?auth_token=...
export const consumeAuthTokenFromUrl = (): void => {
  const params = new URLSearchParams(window.location.search);
  const authToken = params.get("auth_token");
  if (!authToken) return;

  processToken(authToken);

  params.delete("auth_token");
  const newSearch = params.toString();
  const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ""}${window.location.hash}`;
  window.history.replaceState({}, "", newUrl);
};
