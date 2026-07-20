import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { addToCart, clearCart, removeFromCart } from "../../../redux/cartSlice";
import type { CartItem } from "../types";

// TODO: cart is pure in-memory Redux — lost on every page refresh, no cross-
// device persistence. Either add redux-persist (localStorage, simplest) or
// go server-side:
//   GET    /api/cart                         -> { items: CartItem[] }
//   POST   /api/cart/items   { transcriptId } -> { items }
//   DELETE /api/cart/items/:transcriptId      -> { items }
export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return {
    items,
    total,
    addToCart: (item: CartItem) => dispatch(addToCart(item)),
    removeFromCart: (id: string) => dispatch(removeFromCart(id)),
    clearCart: () => dispatch(clearCart()),
  };
};
