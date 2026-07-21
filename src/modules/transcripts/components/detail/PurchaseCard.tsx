import Button from "../../../../components/button/Button";
import CheckIcon from "../../../../icons/Check/Check";

type PurchaseCardProps = {
  price: number;
  isInCart: boolean;
  onAddToCart: () => void;
  onBuyNow: () => void;
};

export default function PurchaseCard({
  price,
  isInCart,
  onAddToCart,
  onBuyNow,
}: PurchaseCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-main-background p-6">
      <span className="text-2xl font-bold text-text-primary">USD ${price}</span>

      <div className="mt-4 flex flex-col gap-3">
        <Button variant="contained" label="Buy Transcript" onClick={onBuyNow} />
        <Button
          variant="outlined"
          label={isInCart ? "In Cart" : "Add to Cart"}
          startIcon={isInCart ? <CheckIcon fontSize="small" /> : undefined}
          onClick={onAddToCart}
        />
      </div>
    </div>
  );
}
