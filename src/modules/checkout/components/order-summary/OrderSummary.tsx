import type { CartItem } from "../../../cart/types";

type OrderSummaryProps = {
  items: CartItem[];
  total: number;
};

export default function OrderSummary({ items, total }: OrderSummaryProps) {
  return (
    <div className="sticky top-6 rounded-lg border border-gray-200 bg-main-background p-6">
      <h2 className="text-lg font-bold text-text-primary">Order summary</h2>

      <div className="mt-4 flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-text-primary">
                {item.title}
              </p>
              <p className="text-xs text-text-secondary">{item.domain}</p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-text-primary">
              ${item.price}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
        <span className="font-semibold text-text-primary">Total</span>
        <span className="text-lg font-bold text-text-primary">
          USD ${total}
        </span>
      </div>
    </div>
  );
}
