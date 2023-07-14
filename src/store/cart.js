import {createSlice} from "@reduxjs/toolkit";
import {uiAction} from "./ui-slice";

const initialCartState = {items: [], totalQuantity: 0, totalAmount: 0};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    add(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
        state.totalAmount = state.totalAmount + newItem.price;
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
        state.totalAmount = state.totalAmount + existingItem.price;
      }
      state.totalQuantity++;
    },
    remove(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const sendCartData = (cartData) => {
  return async (dispatch) => {
    dispatch(
      uiAction.showNotification({
        status: "pending",
        title: "Sending",
        message: "sending cart data ...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch("address firebase ", {
        method: "PUT",
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        throw new Error("sending cart data failed!");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success",
          message: "sending cart data successfully.",
        })
      );
    } catch (error) {
      sendRequest().catch((error) => {
        dispatch(
          uiAction.showNotification({
            status: "error",
            title: "Error",
            message: "sending cart data failed.",
          })
        );
      });
    }
  };
};

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
