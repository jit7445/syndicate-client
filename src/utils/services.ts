import { getStorageItem } from "./storageUtils";
import { logout } from "./authUtils";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

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
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (response.status === 401) {
    logout();
    throw new Error("Session expired");
  }

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json?.message || `Request failed: ${response.status}`);
  }

  return (json as ApiEnvelope<T>).data;
};
