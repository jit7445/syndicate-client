import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../../redux/store'
import { addOrder } from '../../../redux/ordersSlice'
import type { Order } from '../types'

export const useOrders = () => {
  const dispatch = useDispatch<AppDispatch>()
  const orders = useSelector((state: RootState) => state.orders.orders)

  return {
    orders,
    addOrder: (order: Order) => dispatch(addOrder(order)),
  }
}
