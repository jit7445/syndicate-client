import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../../redux/store'
import { addToCart, clearCart, removeFromCart } from '../../../redux/cartSlice'
import type { CartItem } from '../types'

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>()
  const items = useSelector((state: RootState) => state.cart.items)
  const total = items.reduce((sum, item) => sum + item.price, 0)

  return {
    items,
    total,
    addToCart: (item: CartItem) => dispatch(addToCart(item)),
    removeFromCart: (id: string) => dispatch(removeFromCart(id)),
    clearCart: () => dispatch(clearCart()),
  }
}
