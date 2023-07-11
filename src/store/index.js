import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./cart";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {cart: cartReducer, ui: uiSlice.reducer},
});
export default store;
