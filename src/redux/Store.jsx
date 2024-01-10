import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slice/UserSlice"
import cartReducer from "./slice/CartSlice"
export const store = configureStore({
  reducer: {
    user:userReducer,
    cart_items: cartReducer
  },
})

