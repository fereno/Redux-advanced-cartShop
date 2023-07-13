import {Fragment, useEffect} from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import {useSelector, useDispatch} from "react-redux";
import {uiAction} from "./store/ui-slice";
import Notification from "./components/UI/Notification";

function App() {
  const cartVisibility = useSelector((state) => state.ui.uiVisibility);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    const addCartToServer = async () => {
      console.log("noti", notification);
      dispatch(
        uiAction.showNotification({
          status: "pending",
          title: "Sending",
          message: "sending cart data ...",
        })
      );

      const response = await fetch("address firebase ", {
        method: "PUT",
        body: JSON.stringify(cart),
      });

      if (!response.ok) {
        throw new Error("sending cart data failed!");
      }
      dispatch(
        uiAction.showNotification({
          status: "success",
          title: "Success",
          message: "sending cart data successfully.",
        })
      );

      addCartToServer().catch((error) => {
        dispatch(
          uiAction.showNotification({
            status: "error",
            title: "Error",
            message: "sending cart data failed.",
          })
        );
      });
    };
  }, [cart, dispatch]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartVisibility && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
