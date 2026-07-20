import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../redux/store";
import { addOrder } from "../../../redux/ordersSlice";
import type { Order } from "../types";

// TODO: `orders` here is pure in-memory Redux — lost on every page refresh.
// GET /api/orders (Bearer auth) -> Order[] should hydrate this on load (e.g.
// dispatch a thunk from Profile.tsx), and `addOrder` below should become
// unnecessary once checkoutService.ts's POST /api/checkout response is the
// single source of truth for a newly created order.
export const useOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders.orders);

  return {
    orders,
    addOrder: (order: Order) => dispatch(addOrder(order)),
  };
};
