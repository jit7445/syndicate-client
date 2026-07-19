import type { CheckoutPayload } from './types'
import type { Order } from '../orders/types'

// TODO: swap for RequestServer(API_ENDPOINTS.checkout, 'POST', payload) once the backend exists
export const submitCheckout = async (payload: CheckoutPayload): Promise<Order> => {
  return Promise.resolve({
    id: Math.random().toString(36).slice(2, 10),
    items: payload.items,
    total: payload.total,
    createdAt: new Date().toISOString(),
  })
}
