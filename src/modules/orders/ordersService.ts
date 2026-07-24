import { API_ENDPOINTS } from "../../constants/apiEndpoints";
import { RequestServer } from "../../utils/services";
import { getStorageItem } from "../../utils/storageUtils";
import { fetchTranscriptById } from "../transcripts/transcriptsService";
import type {
  CreateRazorpayOrderPayload,
  CreateRazorpayOrderResponse,
  Order,
  VerifyPaymentPayload,
  VerifyPaymentResponse,
} from "./types";

type BackendOrderSummary = {
  id: string;
  transcripts?: string[];
  amount: number;
  status: "created" | "paid" | "failed";
  createdAt: string;
};

// Real order history for the Profile page — GET /api/orders only returns
// transcript ids, not full transcript objects, so each paid order's items
// are hydrated via the public GET /api/transcripts/:id endpoint. Some
// pre-existing orders (from before transcripts were a real backend resource)
// have missing/stale transcript ids, so each order is resolved independently
// — one bad/deleted transcript reference shouldn't hide every other order.
export const fetchOrders = async (): Promise<Order[]> => {
  const backendOrders = await RequestServer<BackendOrderSummary[]>(
    API_ENDPOINTS.orders,
    "GET",
  );
  const paidOrders = backendOrders.filter((order) => order.status === "paid");

  const results = await Promise.allSettled(
    paidOrders.map(async (order) => {
      const itemResults = await Promise.allSettled(
        (order.transcripts ?? []).map((id) => fetchTranscriptById(id)),
      );
      const items = itemResults
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      return {
        id: order.id,
        items,
        total: order.amount,
        createdAt: order.createdAt,
      };
    }),
  );

  return results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value)
    .filter((order) => order.items.length > 0);
};

export const createRazorpayOrder = async (
  payload: CreateRazorpayOrderPayload,
): Promise<CreateRazorpayOrderResponse> =>
  RequestServer(API_ENDPOINTS.orders, "POST", payload);

export const verifyRazorpayPayment = async (
  payload: VerifyPaymentPayload,
): Promise<VerifyPaymentResponse> =>
  RequestServer(API_ENDPOINTS.orderVerify, "POST", payload);

// Authoritative "has this user paid for transcript X" check, straight from
// the backend — unlike the `orders`/CartItem shape above, GET /api/orders
// only returns transcript ids, not full transcript objects, so this is kept
// separate rather than reshaping Order to fit.
export const fetchPurchasedTranscriptIds = async (): Promise<string[]> => {
  const orders = await RequestServer<BackendOrderSummary[]>(
    API_ENDPOINTS.orders,
    "GET",
  );
  return orders
    .filter((order) => order.status === "paid")
    .flatMap((order) => order.transcripts ?? []);
};

export const viewOrderReceipt = async (orderId: string): Promise<void> => {
  const token = getStorageItem<string>("token");
  const response = await fetch(
    API_ENDPOINTS.orderReceipt.replace(":id", orderId),
    { headers: token ? { Authorization: `Bearer ${token}` } : {} },
  );
  if (!response.ok) throw new Error(`Failed to load receipt: ${response.status}`);
  const blob = await response.blob();
  window.open(URL.createObjectURL(blob), "_blank");
};
