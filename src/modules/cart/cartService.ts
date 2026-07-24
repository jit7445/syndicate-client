import { RequestServer } from "../../utils/services";
import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import { getStorageItem, setStorageItem } from "../../utils/storageUtils";
import type { CartItem } from "./types";

const GUEST_CART_ID_KEY = "guestCartId";

// Amazon-style anonymous cart identifier: a random id generated once per
// browser and persisted (like Amazon's long-lived session-id cookie), so a
// guest's cart can be located and later merged server-side even though
// they've never signed in. Every sync call below sends this id — the
// backend prefers the authenticated account's cart when a Bearer token is
// present, so it's harmless to keep sending this after sign-in too.
export const getOrCreateGuestCartId = (): string => {
  const existing = getStorageItem<string>(GUEST_CART_ID_KEY);
  if (existing) return existing;

  const id = crypto.randomUUID();
  setStorageItem(GUEST_CART_ID_KEY, id);
  return id;
};

export const fetchCart = async (): Promise<CartItem[] | null> => {
  const guestCartId = getOrCreateGuestCartId();
  const { items } = await RequestServer<{ items: CartItem[] }>(
    `${API_ENDPOINTS.cart}?guestCartId=${guestCartId}`,
    "GET",
  );
  return items;
};

export const syncAddCartItem = async (item: CartItem): Promise<void> => {
  const guestCartId = getOrCreateGuestCartId();
  await RequestServer(`${API_ENDPOINTS.cart}/items`, "POST", {
    guestCartId,
    transcriptId: item.id,
  });
};

export const syncRemoveCartItem = async (id: string): Promise<void> => {
  const guestCartId = getOrCreateGuestCartId();
  await RequestServer(
    `${API_ENDPOINTS.cart}/items/${id}?guestCartId=${guestCartId}`,
    "DELETE",
  );
};

export const syncClearCart = async (): Promise<void> => {
  const guestCartId = getOrCreateGuestCartId();
  await RequestServer(`${API_ENDPOINTS.cart}?guestCartId=${guestCartId}`, "DELETE");
};

// Called right after a successful sign-in/sign-up (see form.tsx) to fold
// whatever was sitting in the guest's local cart into the now-known
// account's server-side cart — mirrors how Amazon merges a guest cart
// (identified by that same anonymous id) into the account cart the moment
// you sign in/sign up in that browser.
export const mergeGuestCartIntoAccount = async (
  guestItems: CartItem[],
): Promise<CartItem[]> => {
  const guestCartId = getOrCreateGuestCartId();
  const { items } = await RequestServer<{ items: CartItem[] }>(
    `${API_ENDPOINTS.cart}/merge`,
    "POST",
    { guestCartId, items: guestItems.map((item) => item.id) },
  );
  return items;
};
