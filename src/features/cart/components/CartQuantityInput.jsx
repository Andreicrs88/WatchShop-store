// utils
import { useDispatch } from "react-redux";
import { cartActions } from "store/cart-slice";

// styles
import styles from "./CartQuantityInput.module.css";

function CartQuantityInput({ cartItem }) {
  const dispatchFn = useDispatch();

  function handleIncrementQty() {
    dispatchFn(cartActions.addItemToCart(cartItem));
  }

  function handleDecrementQty() {
    dispatchFn(cartActions.removeItemFromCart(cartItem.id));
  }

  return (
    <>
      <div className={styles.quantity}>
        <button
          type="button"
          onClick={handleDecrementQty}
        >
          -
        </button>
        <div className={styles.value}>{cartItem.quantity}</div>
        <button
          type="button"
          onClick={handleIncrementQty}
        >
          +
        </button>
      </div>
    </>
  );
}

export default CartQuantityInput;
