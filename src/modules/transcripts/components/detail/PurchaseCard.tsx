import Button from "../../../../components/button/Button";
import CheckCircleIcon from "../../../../icons/CheckCircle/CheckCircle";
import { INCLUDED_FEATURES } from "../../pages/transcriptDetailConstants";

type PurchaseCardProps = {
  price: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
};

export default function PurchaseCard({
  price,
  onAddToCart,
  onBuyNow,
}: PurchaseCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-main-background p-6">
      <span className="text-2xl font-bold text-text-primary">USD ${price}</span>

      <div className="mt-4 flex flex-col gap-3">
        <Button variant="contained" label="Buy Transcript" onClick={onBuyNow} />
        <Button variant="outlined" label="Add to Cart" onClick={onAddToCart} />
      </div>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <p className="text-sm font-semibold text-text-primary">
          This transcript includes:
        </p>
        <ul className="mt-3 flex flex-col gap-2">
          {INCLUDED_FEATURES.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-text-secondary"
            >
              <CheckCircleIcon fontSize="small" sx={{ color: "#EC9324" }} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
