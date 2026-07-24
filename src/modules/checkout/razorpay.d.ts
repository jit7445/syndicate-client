export {};

declare global {
  type RazorpayHandlerResponse = {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  };

  type RazorpayOptions = {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id: string;
    prefill?: { name?: string; email?: string; contact?: string };
    theme?: { color?: string };
    handler: (response: RazorpayHandlerResponse) => void;
    modal?: { ondismiss?: () => void };
  };

  type RazorpayInstance = {
    open: () => void;
  };

  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}
