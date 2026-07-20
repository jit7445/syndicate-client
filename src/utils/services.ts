import { getStorageItem } from "./storageUtils";
import { logout } from "./authUtils";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export const RequestServer = async <T>(
  url: string,
  method: RequestMethod,
  body?: object,
): Promise<T> => {
  const token = getStorageItem<string>("token");

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: token } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    logout();
    throw new Error("Session expired");
  }

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
};
