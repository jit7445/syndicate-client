import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/hooks/useCart";
import { useOrders } from "../orders/hooks/useOrders";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
  viewOrderReceipt,
} from "../orders/ordersService";
import { useCurrentUser } from "../profile/hooks/useCurrentUser";
import { useBoolean } from "../../utils/hooks/useBoolean";
import { getBuyNowItem, clearBuyNowItem } from "./buyNowStorage";
import OrderDetails from "./components/order-summary/OrderDetails";
import OrderSummary from "./components/order-summary/OrderSummary";
import Button from "../../components/button/Button";
import DownloadButton from "../../components/download-button/DownloadButton";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import CalendarTodayIcon from "../../icons/CalendarToday/CalendarToday";
import CheckIcon from "../../icons/Check/Check";
import DescriptionIcon from "../../icons/Description/Description";
import EmailOutlinedIcon from "../../icons/EmailOutlined/EmailOutlined";
import { APP_ROUTES } from "../../constants/appRoutes";
import { COLORS } from "../../constants/colors";
import { smallActionButtonStyle } from "./Checkout.styles";
import type { CartItem } from "../cart/types";
import type { Order } from "../orders/types";

export default function Checkout() {
  const [buyNowItem] = useState<CartItem | null>(() => getBuyNowItem());
  const { items: cartItems, total: cartTotal, clearCart, removeFromCart } = useCart();
  const { addOrder } = useOrders();
  const { email, userName } = useCurrentUser();
  const { value: isOrderConfirmed, setTrue: confirmOrder } = useBoolean();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const items = buyNowItem ? [buyNowItem] : cartItems;
  const subtotal = buyNowItem ? buyNowItem.price : cartTotal;
  const total = subtotal;

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
                <CheckIcon sx={{ fontSize: 40, color: COLORS.accent2 }} />
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

                  <div className="mt-4 flex justify-center gap-3 border-t border-gray-200 pt-4">
                    <DownloadButton
                      label="View Receipt"
                      styles={smallActionButtonStyle}
                      onClick={() =>
                        viewOrderReceipt(confirmedOrder.id).catch((err) =>
                          console.error("Failed to load receipt:", err),
                        )
                      }
                    />
                    <Link
                      to={APP_ROUTES.transcriptDetail.replace(":id", item.id)}
                    >
                      <Button
                        variant="outlined"
                        label="View Transcript"
                        startIcon={<DescriptionIcon fontSize="small" />}
                        styles={smallActionButtonStyle}
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link to={`${APP_ROUTES.profile}?section=purchases`}>
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

  const finishOrder = (orderId: string) => {
    const confirmed: Order = {
      id: orderId,
      items,
      total,
      createdAt: new Date().toISOString(),
    };
    addOrder(confirmed);
    setConfirmedOrder(confirmed);
    if (buyNowItem) {
      clearBuyNowItem();
      // Avoid a double-purchase later if this same item was also sitting
      // in the cart independently of this buy-now flow.
      removeFromCart(buyNowItem.id);
    } else {
      clearCart();
    }
    confirmOrder();
  };

  const handlePay = async () => {
    setIsSubmitting(true);
    try {
      const order = await createRazorpayOrder({
        amount: total,
        currency: "USD",
        transcriptIds: items.map((item) => item.id),
      });

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: Math.round(order.amount * 100),
        currency: order.currency,
        order_id: order.razorpayOrderId,
        name: "Infollion",
        description: "Transcript purchase",
        prefill: {
          name: userName ?? undefined,
          email: email ?? undefined,
        },
        handler: async (response) => {
          try {
            await verifyRazorpayPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            finishOrder(order.orderId);
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => setIsSubmitting(false),
        },
      });

      razorpay.open();
    } catch {
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

          <div className="mt-6 flex flex-col gap-8 lg:flex-row">
            <div className="flex-1">
              <OrderDetails items={items} />
            </div>
            <div className="lg:w-100 lg:shrink-0">
              <OrderSummary
                itemCount={items.length}
                subtotal={subtotal}
                total={total}
                isSubmitting={isSubmitting}
                onPay={handlePay}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
