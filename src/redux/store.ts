import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import savedReducer from './savedSlice'
import ordersReducer from './ordersSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    saved: savedReducer,
    orders: ordersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
