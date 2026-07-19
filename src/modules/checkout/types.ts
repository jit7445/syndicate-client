import type { CartItem } from '../cart/types'

export type CheckoutPayload = {
  items: CartItem[]
  total: number
  email: string
}

export type PaymentFormValues = {
  cardholderName: string
  cardNumber: string
  expiry: string
  cvc: string
}
