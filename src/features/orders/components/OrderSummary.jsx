// utils
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import priceFormatter from "utils/formatCurrency";

// styles
import styles from "./OrderSummary.module.css";

function OrderSummary({ shippingCost }) {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const orderTotal = priceFormatter.format(cartTotalAmount + shippingCost);

  return (
    <section className={styles["order-summary-container"]}>
      <h2>
        <span>3</span>
        Summary
      </h2>
      <div className={styles["order-products"]}>
        <ul className={styles["items-list"]}>
          {cartItems.map((cartItem) => (
            <li key={cartItem.id}>
              <div>
                <span className={styles.quantity}>
                  <b>{cartItem.quantity}</b> x{" "}
                </span>
                <Link to={`/${cartItem.id}`}>{cartItem.title}</Link>
              </div>
              <div className={styles["item-price"]}>{priceFormatter.format(cartItem.totalPrice)}</div>
            </li>
          ))}
        </ul>
        <div className={styles["order-shipping"]}>
          <p>Shipping cost</p>
          <p>{priceFormatter.format(shippingCost)}</p>
        </div>
        <div className={styles["order-total"]}>
          <p>Total cost</p>
          <p>{orderTotal}</p>
        </div>
      </div>
    </section>
  );
}

export default OrderSummary;
