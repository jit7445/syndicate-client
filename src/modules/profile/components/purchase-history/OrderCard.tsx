import { Link } from "react-router-dom"
import CalendarTodayIcon from "../../../../icons/CalendarToday/CalendarToday"
import PurchaseActions from "../../../transcripts/components/purchase-actions/PurchaseActions"
import { APP_ROUTES } from "../../../../constants/appRoutes"
import type { Order } from "../../../orders/types"

type OrderCardProps = {
  order: Order
}

export default function OrderCard({ order }: OrderCardProps) {
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="rounded-lg border border-gray-200 bg-main-background p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-text-primary">Order #{order.id}</p>
          <p className="flex items-center gap-1 text-sm text-text-secondary">
            <CalendarTodayIcon fontSize="inherit" />
            {orderDate}
          </p>
        </div>
        <span className="text-lg font-bold text-text-primary">USD ${order.total}</span>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-gray-200 pt-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-4">
            <div>
              <Link to={APP_ROUTES.transcriptDetail.replace(":id", item.id)} className="text-sm font-medium text-text-primary hover:underline">
                {item.title}
              </Link>
              <p className="text-xs text-text-secondary">{item.domain}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="text-sm text-text-secondary">${item.price}</span>
              <PurchaseActions transcript={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
