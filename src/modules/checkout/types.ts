import type { CartItem } from "../cart/types";

export type CheckoutPayload = {
  items: CartItem[];
  total: number;
  email: string;
  // Stripe PaymentIntent/PaymentMethod id from the client-side tokenization
  // step (see PRODUCTION_BACKEND_GUIDE.md §2) — optional until Stripe
  // Elements replaces the raw card fields in payment-form/fields.tsx.
  paymentMethodId?: string;
};

export type PaymentFormValues = {
  cardholderName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
};
