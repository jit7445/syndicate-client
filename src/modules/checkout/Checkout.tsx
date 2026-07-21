import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/hooks/useCart";
import { useOrders } from "../orders/hooks/useOrders";
import { useCurrentUser } from "../profile/hooks/useCurrentUser";
import { useBoolean } from "../../utils/hooks/useBoolean";
import { submitCheckout } from "./checkoutService";
import { getBuyNowItem, clearBuyNowItem } from "./buyNowStorage";
import PaymentForm from "./components/payment-form/form";
import OrderSummary from "./components/order-summary/OrderSummary";
import Button from "../../components/button/Button";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CreditCardIcon from "../../icons/CreditCard/CreditCard";
import CalendarTodayIcon from "../../icons/CalendarToday/CalendarToday";
import CheckIcon from "../../icons/Check/Check";
import DescriptionIcon from "../../icons/Description/Description";
import DownloadIcon from "../../icons/Download/Download";
import EmailOutlinedIcon from "../../icons/EmailOutlined/EmailOutlined";
import { APP_ROUTES } from "../../constants/appRoutes";
import type { CartItem } from "../cart/types";
import type { Order } from "../orders/types";
import type { PaymentFormValues } from "./types";

export default function Checkout() {
  const [buyNowItem] = useState<CartItem | null>(() => getBuyNowItem());
  const { items: cartItems, total: cartTotal, clearCart, removeFromCart } = useCart();
  const { addOrder } = useOrders();
  const { email } = useCurrentUser();
  const { value: isOrderConfirmed, setTrue: confirmOrder } = useBoolean();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const items = buyNowItem ? [buyNowItem] : cartItems;
  const total = buyNowItem ? buyNowItem.price : cartTotal;

  if (isOrderConfirmed && confirmedOrder) {
    const orderDate = new Date(confirmedOrder.createdAt).toLocaleDateString(
      "en-US",
      { month: "short", day: "numeric", year: "numeric" },
    );

    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">
          <div className="mx-auto max-w-[800px] px-6 py-16 text-center">
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-accent-2/30 blur-xl" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-accent-2 bg-main-background">
                <CheckIcon sx={{ fontSize: 40, color: "#EC9324" }} />
              </div>
            </div>

            <h1 className="mt-4 text-3xl font-bold text-text-primary">
              Purchase Confirmed
            </h1>
            <p className="mt-2 text-text-secondary">
              Order #{confirmedOrder.id} · {orderDate}
            </p>

            <div className="mt-8 flex flex-col gap-6 text-left">
              {confirmedOrder.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-gray-200 border-t-4 border-t-accent-2 bg-main-background p-6"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent-2">
                      <DescriptionIcon fontSize="small" />
                    </div>
                    <div>
                      <p className="font-semibold text-text-primary">
                        {item.title}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-text-secondary">
                        <CalendarTodayIcon fontSize="inherit" />
                        <span className="font-medium">Date</span>
                        <span>{item.date}</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                    <span className="font-semibold text-text-primary">
                      Amount Paid
                    </span>
                    <span className="text-lg font-bold text-text-primary">
                      USD ${item.price}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3 rounded-lg p-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-2 text-white">
                      <EmailOutlinedIcon fontSize="small" />
                    </div>
                    <p className="text-sm text-text-primary">
                      A receipt has been sent to your email.
                    </p>
                  </div>

                  <div className="mt-4 flex gap-3 border-t border-gray-200 pt-4">
                    <Button
                      variant="outlined"
                      label="View Receipt"
                      startIcon={<DownloadIcon fontSize="small" />}
                      className="flex-1"
                      onClick={() =>
                        // TODO: no receipt/invoice generation endpoint exists yet
                        console.log("View receipt:", item.id)
                      }
                    />
                    <Link
                      to={APP_ROUTES.transcriptDetail.replace(":id", item.id)}
                      className="flex-1"
                    >
                      <Button
                        variant="outlined"
                        label="View Transcript"
                        startIcon={<DescriptionIcon fontSize="small" />}
                        className="w-full"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link to={APP_ROUTES.profile}>
                <Button variant="contained" label="View My Purchase" />
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1">
          <div className="mx-auto max-w-[1400px] px-6 py-10 text-center">
            <p className="text-text-secondary">Your cart is empty.</p>
            <Link to={APP_ROUTES.transcripts}>
              <Button
                variant="contained"
                label="Browse Transcripts"
                className="mt-4"
              />
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (_payment: PaymentFormValues) => {
    setIsSubmitting(true);
    try {
      // TODO: this whole payment-form/fields.tsx (raw cardholderName/cardNumber/
      // expiry/cvc) must be replaced with Stripe's <PaymentElement /> — never
      // send raw card data to our own backend (PCI scope). Real flow:
      //   1. POST /api/checkout/intent  { items, total } -> { clientSecret }
      //   2. stripe.confirmPayment({ clientSecret }) client-side (handles 3DS)
      //   3. POST /api/checkout  { items, paymentMethodId, email } -> Order
      //      (order is only marked paid once our backend's Stripe webhook
      //      receives payment_intent.succeeded — see checkoutService.ts)
      const order = await submitCheckout({ items, total, email: email ?? "" });
      addOrder(order);
      setConfirmedOrder(order);
      if (buyNowItem) {
        clearBuyNowItem();
        // Avoid a double-purchase later if this same item was also sitting
        // in the cart independently of this buy-now flow.
        removeFromCart(buyNowItem.id);
      } else {
        clearCart();
      }
      confirmOrder();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1">
        <div className="mx-auto max-w-[1400px] px-6 py-10">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Link
              to={APP_ROUTES.transcripts}
              className="underline hover:no-underline text-text-primary font-medium"
            >
              All transcripts
            </Link>
            <span>/</span>
            <Link
              to={APP_ROUTES.cart}
              className="underline hover:no-underline text-text-primary font-medium"
            >
              Cart
            </Link>
            <span>/</span>
            <span>Checkout</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold text-text-primary">
            Checkout
          </h1>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-lg border border-gray-200 bg-main-background p-6">
                <div className="flex items-center gap-2">
                  <CreditCardIcon sx={{ color: "#EC9324" }} />
                  <h2 className="text-lg font-bold text-text-primary">
                    Payment details
                  </h2>
                </div>
                <p className="mt-1 text-sm text-text-secondary">
                  This is a demo checkout — no real payment is processed.
                </p>

                <div className="mt-4">
                  <PaymentForm
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-4">
              <OrderSummary items={items} total={total} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
