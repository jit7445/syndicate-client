import type { CheckoutPayload } from "./types";
import type { Order } from "../orders/types";

// TODO: replace with a real API call once the backend exists. Request body
// is CheckoutPayload (see ./types), response is Order. Payment must NOT be
// raw card fields — the client should tokenize the card via Stripe Elements
// first and only send the resulting paymentMethodId here. The order must
// only be marked paid after the Stripe webhook (payment_intent.succeeded)
// confirms it server-side, never just because this call returned 200 — see
// PRODUCTION_BACKEND_GUIDE.md §2 for the full flow. To activate: uncomment
// the block below (and its imports), delete the mock beneath it.
//
// import { API_ENDPOINTS } from "../../constants/apiEndpoints";
// import { RequestServer } from "../../utils/services";
//
// export const submitCheckout = async (payload: CheckoutPayload): Promise<Order> =>
//   RequestServer(API_ENDPOINTS.checkout, "POST", payload);
export const submitCheckout = async (
  payload: CheckoutPayload,
): Promise<Order> => {
  return Promise.resolve({
    id: Math.random().toString(36).slice(2, 10),
    items: payload.items,
    total: payload.total,
    createdAt: new Date().toISOString(),
  });
};
