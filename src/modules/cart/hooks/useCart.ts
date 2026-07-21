import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import {
  addToCart,
  clearCart,
  removeFromCart,
  setCartItems,
} from "../../../redux/cartSlice";
import {
  mergeGuestCartIntoAccount,
  syncAddCartItem,
  syncClearCart,
  syncRemoveCartItem,
} from "../cartService";
import type { CartItem } from "../types";

// Cart items are persisted to localStorage (see cartSlice.ts) so they
// survive refreshes — the guest-cart-cookie equivalent. Cross-device sync
// and the account-cart merge are wired below via cartService.ts, but that
// service is still a local no-op until its /api/cart endpoints are
// uncommented on the backend.
export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return {
    items,
    total,
    addToCart: (item: CartItem) => {
      dispatch(addToCart(item));
      void syncAddCartItem(item);
    },
    removeFromCart: (id: string) => {
      dispatch(removeFromCart(id));
      void syncRemoveCartItem(id);
    },
    clearCart: () => {
      dispatch(clearCart());
      void syncClearCart();
    },
    // Call once right after a successful sign-in OR sign-up (see form.tsx —
    // both onSignIn and onVerifyRegisterOtp call this) to fold the local
    // guest cart into the account's cart, mirroring how Amazon merges a
    // guest cart the moment you authenticate, regardless of which flow.
    mergeGuestCartAfterAuth: async () => {
      const merged = await mergeGuestCartIntoAccount(items);
      dispatch(setCartItems(merged));
    },
  };
};
