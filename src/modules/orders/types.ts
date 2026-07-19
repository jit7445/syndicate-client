import type { CartItem } from '../cart/types'

export type Order = {
  id: string
  items: CartItem[]
  total: number
  createdAt: string
}
