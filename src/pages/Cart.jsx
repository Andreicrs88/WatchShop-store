// utils
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import priceFormatter from "utils/formatCurrency";
import { motion } from "framer-motion";

// components
import CartSingleItem from "features/cart/components/CartSingleItem";

// styles
import styles from "./Cart.module.css";

function Cart() {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const totalAmount = priceFormatter.format(cartTotalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const shippingCost = 9.99;
  const formattedShippingCost = priceFormatter.format(shippingCost);
  const orderTotal = priceFormatter.format(cartTotalAmount + shippingCost);

  // get the current logged in user ID
  const authState = localStorage.getItem("persist:root") ? JSON.parse(localStorage.getItem("persist:root")).auth : null;
  const currentUserId = authState ? JSON.parse(authState).userId : null;

  return (
    <>
      <h1 className={styles["page-title"]}>Cart</h1>
      <div className={styles["cart-wrapper"]}>
        <div className={styles["cart-container"]}>
          <div className={styles["cart-products"]}>
            <div className={styles["section-titles"]}>
              <h2 className={styles.item}>Product</h2>
              <h2 className={styles.availability}>Availability</h2>
              <h2 className={styles.price}>Price</h2>
              <h2 className={styles.quantity}>Quantity</h2>
              <h2 className={styles["total-price"]}>Total price</h2>
            </div>
            {cartItems.length === 0 && <p className={styles["info-text"]}>The cart is empty.</p>}
            <div className={styles["items-list"]}>
              {cartItems.map((cartItem) => (
                <CartSingleItem
                  key={cartItem.id}
                  cartItemData={cartItem}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles["cart-summary"]}>
          <h2>Order summary</h2>
          <div>
            <div className={styles["summary-text"]}>
              <p>Products cost:</p>
              <p>{totalAmount}</p>
            </div>
            <div className={styles["summary-text"]}>
              <p>Shipping cost:</p>
              <p>{cartItems.length === 0 ? 0 : formattedShippingCost}</p>
            </div>
          </div>
          <div className={styles["summary-total"]}>
            <h4>Total</h4>
            <div>{cartItems.length === 0 ? "0 €" : orderTotal}</div>
          </div>

          {cartItems.length !== 0 && (
            <motion.div
              className={styles["link-button"]}
              whileHover={{
                scale: 1.08,
                transition: { duration: 0.15, type: "spring", stiffness: 800 },
              }}
            >
              <Link to={!currentUserId ? "/login" : "/cart/checkout"}>Continue</Link>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
