import { Link } from "react-router-dom";
import Button from "../../../../components/button/Button";
import { APP_ROUTES } from "../../../../constants/appRoutes";
import { clearBuyNowItem } from "../../../checkout/buyNowStorage";

type CartSummaryProps = {
  itemCount: number;
  total: number;
};

export default function CartSummary({ itemCount, total }: CartSummaryProps) {
  return (
    <div className="sticky top-6 rounded-lg border border-gray-200 bg-main-background p-6">
      <h2 className="text-lg font-bold text-text-primary">Summary</h2>

      <div className="mt-4 flex items-center justify-between text-sm text-text-secondary">
        <span>
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
        <span>${total}</span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="font-semibold text-text-primary">Total</span>
        <span className="text-lg font-bold text-text-primary">
          USD ${total}
        </span>
      </div>

      <Link to={APP_ROUTES.checkout} onClick={clearBuyNowItem}>
        <Button
          variant="contained"
          label="Proceed to Checkout"
          className="mt-6 w-full"
        />
      </Link>
    </div>
  );
}
