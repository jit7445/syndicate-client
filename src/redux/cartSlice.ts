import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getStorageItem, setStorageItem } from "../utils/storageUtils";
import type { CartItem } from "../modules/cart/types";

const CART_STORAGE_KEY = "cart";

type CartState = {
  items: CartItem[];
};

// Hydrate from localStorage on load — this is the guest-cart persistence
// itself (the client-side equivalent of Amazon's cookie+db combo): items
// survive refreshes and even days of inactivity until explicitly changed.
const initialState: CartState = {
  items: getStorageItem<CartItem[]>(CART_STORAGE_KEY) ?? [],
};

const persist = (items: CartItem[]) => {
  setStorageItem(CART_STORAGE_KEY, items);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) state.items.push(action.payload);
      persist(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      persist(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      persist(state.items);
    },
    // Replaces the whole cart in one shot — used after a server round trip
    // (fetchCart on load, or mergeGuestCartIntoAccount after login) once
    // those endpoints in cartService.ts are wired up.
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      persist(state.items);
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setCartItems } =
  cartSlice.actions;
export default cartSlice.reducer;
