import type { CartItem } from "../cart/types";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: string;
};

export type CreateRazorpayOrderPayload = {
  amount: number;
  currency: string;
  transcriptIds: string[];
};

export type CreateRazorpayOrderResponse = {
  orderId: string;
  razorpayOrderId: string;
  transcriptIds: string[];
  amount: number;
  currency: string;
  keyId: string;
};

export type VerifyPaymentPayload = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type VerifyPaymentResponse = {
  orderId: string;
  status: "created" | "paid" | "failed";
};
