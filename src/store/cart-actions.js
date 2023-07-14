import {cartActions} from "./cart-slice";
import {uiAction} from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("address firebase");
      if (!response.ok) {
        throw new Error("could not fetch cart data");
      }
      const data = await response.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          totalQuantity: cartData.totalQuantity,
          items: cartData.items || [],
        })
      );
    } catch (error) {
      dispatch(
        uiAction.showNotification({
          status: "error",
          title: "Error",
          message: "fetching cart data failed.",
        })
      );
    }
  };
};

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
        body: JSON.stringify({
          totalQuantity: cartData.totalQuantity,
          items: cartData.items,
        }),
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
