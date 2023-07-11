import classes from "./CartItem.module.css";
import {cartActions} from "../../store/cart";
import {useDispatch} from "react-redux";

const CartItem = (props) => {
  const {id, title, quantity, total, price} = props.item;
  const dispatch = useDispatch();

  const plusHandler = () => {
    dispatch(cartActions.add({id, title, price}));
  };
  const minusHandler = () => {
    dispatch(cartActions.remove(id));
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={minusHandler}>-</button>
          <button onClick={plusHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
