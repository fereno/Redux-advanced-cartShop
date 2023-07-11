import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import {cartActions} from "../../store/cart";
import {useDispatch} from "react-redux";

const ProductItem = ({id, title, price, description}) => {
  const dispatch = useDispatch();
  console.log("price", price);
  const addHandler = () => {
    // item={{title: "Test Item", quantity: 3, total: 18, price: 6}}

    dispatch(cartActions.add({id, title, price}));
  };
  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
