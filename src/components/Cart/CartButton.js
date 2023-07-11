import classes from "./CartButton.module.css";
import {useSelector, useDispatch} from "react-redux";
import {uiAction} from "../../store/ui-slice";

const CartButton = (props) => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const clickedHandler = () => {
    dispatch(uiAction.toggle());
  };

  return (
    <button onClick={clickedHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
