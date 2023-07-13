import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCT = [
  {id: "p1", title: "book", price: 6, description: "this is a first book"},
  {id: "p2", title: "pen", price: 2, description: "this is a first pen"},
  {id: "p3", title: "carpet", price: 7, description: "this is a first carpet"},
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      {DUMMY_PRODUCT.map((p) => (
        <ul key={p.id}>
          <ProductItem
            key={p.id}
            id={p.id}
            title={p.title}
            price={p.price}
            description={p.description}
          />
        </ul>
      ))}
    </section>
  );
};

export default Products;
