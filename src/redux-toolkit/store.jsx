import { configureStore } from "@reduxjs/toolkit";
import restaurantsReducer from "./restaurantsSlice";
import productsReducer from "./productsSlice"
import accountReducer from "./accountSlice"
import cartItemReducer from "./cartSlice"
import forgetPasswordReducer from "./forgetPasswordSlice"
export const store = configureStore({
  reducer: {
    account: accountReducer,
    products: productsReducer,
    restaurants: restaurantsReducer,
    cart: cartItemReducer,
    forgetPassword: forgetPasswordReducer,
  },
});
