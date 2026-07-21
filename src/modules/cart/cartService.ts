import { getStorageItem, setStorageItem } from "../../utils/storageUtils";
import type { CartItem } from "./types";

const GUEST_CART_ID_KEY = "guestCartId";

// Amazon-style anonymous cart identifier: a random id generated once per
// browser and persisted (like Amazon's long-lived session-id cookie), so a
// guest's cart can be located and later merged server-side even though
// they've never signed in. Every sync call below sends this id.
export const getOrCreateGuestCartId = (): string => {
  const existing = getStorageItem<string>(GUEST_CART_ID_KEY);
  if (existing) return existing;

  const id = crypto.randomUUID();
  setStorageItem(GUEST_CART_ID_KEY, id);
  return id;
};

// TODO: real backend integration for the cart. Each function below is a
// no-op/passthrough today; uncomment the block inside it (and the two
// imports below) once the matching endpoint exists — nothing else needs
// to change at the call sites in useCart.ts.
//
// import { RequestServer } from "../../utils/services";
// import { API_ENDPOINTS } from "../../constants/apiEndpoints";

export const fetchCart = async (): Promise<CartItem[] | null> => {
  const guestCartId = getOrCreateGuestCartId();
  console.log("fetchCart (pending backend) for guestCartId:", guestCartId);
  // const { items } = await RequestServer<{ items: CartItem[] }>(
  //   `${API_ENDPOINTS.cart}?guestCartId=${guestCartId}`,
  //   "GET",
  // );
  // return items;
  return null;
};

export const syncAddCartItem = async (item: CartItem): Promise<void> => {
  const guestCartId = getOrCreateGuestCartId();
  console.log("syncAddCartItem (pending backend):", {
    guestCartId,
    transcriptId: item.id,
  });
  // await RequestServer(`${API_ENDPOINTS.cart}/items`, "POST", {
  //   guestCartId,
  //   transcriptId: item.id,
  // });
};

export const syncRemoveCartItem = async (id: string): Promise<void> => {
  const guestCartId = getOrCreateGuestCartId();
  console.log("syncRemoveCartItem (pending backend):", {
    guestCartId,
    transcriptId: id,
  });
  // await RequestServer(
  //   `${API_ENDPOINTS.cart}/items/${id}?guestCartId=${guestCartId}`,
  //   "DELETE",
  // );
};

export const syncClearCart = async (): Promise<void> => {
  const guestCartId = getOrCreateGuestCartId();
  console.log("syncClearCart (pending backend) for guestCartId:", guestCartId);
  // await RequestServer(`${API_ENDPOINTS.cart}?guestCartId=${guestCartId}`, "DELETE");
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
  console.log("mergeGuestCartIntoAccount (pending backend):", {
    guestCartId,
    itemCount: guestItems.length,
  });
  // const { items } = await RequestServer<{ items: CartItem[] }>(
  //   `${API_ENDPOINTS.cart}/merge`,
  //   "POST",
  //   { guestCartId, items: guestItems.map((item) => item.id) },
  // );
  // return items;
  return guestItems;
};
