import {Fragment, useEffect} from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import {useSelector, useDispatch} from "react-redux";
import {uiAction} from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import {sendCartData} from "./store/cart";

let isInitial = true;

function App() {
  const cartVisibility = useSelector((state) => state.ui.uiVisibility);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));
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
