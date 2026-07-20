import type { CartItem } from "../cart/types";

const BUY_NOW_KEY = "buyNowItem";

// A "Buy Now" purchase must never touch the shared cart, but it also has to
// survive the auth redirect (RequireAuth -> sign-in -> back to /checkout),
// which drops React Router's in-memory `location.state`. sessionStorage
// survives that redirect chain regardless of login state, and clears itself
// when the tab closes.
export const setBuyNowItem = (item: CartItem): void => {
  sessionStorage.setItem(BUY_NOW_KEY, JSON.stringify(item));
};

export const getBuyNowItem = (): CartItem | null => {
  const raw = sessionStorage.getItem(BUY_NOW_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CartItem;
  } catch {
    return null;
  }
};

export const clearBuyNowItem = (): void => {
  sessionStorage.removeItem(BUY_NOW_KEY);
};
