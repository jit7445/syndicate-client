import { useNavigate } from "react-router-dom"
import DialogModal from "../../../../components/dialog/DialogModal"
import Button from "../../../../components/button/Button"
import PurchaseActions from "../../../transcripts/components/purchase-actions/PurchaseActions"
import { APP_ROUTES } from "../../../../constants/appRoutes"
import type { CartItem } from "../../../cart/types"

type OrderConfirmationDialogProps = {
  isOpen: boolean
  handleClose: () => void
  items: CartItem[]
}

export default function OrderConfirmationDialog({ isOpen, handleClose, items }: OrderConfirmationDialogProps) {
  const navigate = useNavigate()

  const handleViewOrders = () => {
    handleClose()
    navigate(APP_ROUTES.profile)
  }

  return (
    <DialogModal isOpen={isOpen} handleClose={handleClose} title="Order confirmed">
      <div className="flex flex-col items-center gap-4 py-2 text-center">
        <p className="text-text-secondary">Your transcripts are ready to download.</p>

        <div className="flex w-full flex-col gap-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-3">
              <span className="text-left text-sm font-medium text-text-primary">{item.title}</span>
              <PurchaseActions transcript={item} />
            </div>
          ))}
        </div>

        <Button variant="contained" label="View My Orders" onClick={handleViewOrders} />
      </div>
    </DialogModal>
  )
}
