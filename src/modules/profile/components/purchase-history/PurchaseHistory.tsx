import { Link } from "react-router-dom";
import Button from "../../../../components/button/Button";
import OrderCard from "./OrderCard";
import { APP_ROUTES } from "../../../../constants/appRoutes";
import type { Order } from "../../../orders/types";

type PurchaseHistoryProps = {
  orders: Order[];
};

export default function PurchaseHistory({ orders }: PurchaseHistoryProps) {
  if (orders.length === 0) {
    return (
      <div className="mt-6 rounded-lg border border-gray-200 bg-main-background p-6 text-center">
        <p className="text-text-secondary">
          You haven't purchased any transcripts yet.
        </p>
        <Link to={APP_ROUTES.transcripts}>
          <Button
            variant="contained"
            label="Browse Transcripts"
            className="mt-4"
          />
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
