// utils
import { Link } from "react-router-dom";
import priceFormatter from "utils/formatCurrency";

// components
import CartQuantityInput from "./CartQuantityInput";

// styles
import styles from "./CartSingleItem.module.css";

function CartSingleItem({ cartItemData }) {
  const itemPrice = priceFormatter.format(cartItemData.price);
  const itemTotalPrice = priceFormatter.format(cartItemData.totalPrice);

  return (
    <div className={styles["cart-item"]}>
      <Link
        to={`/${cartItemData.id}`}
        className={styles.item}
      >
        <div className={styles["image-container"]}>
          <img
            src={require(`assets/images/${cartItemData.category}/small_resolution/${cartItemData.imageSrc}`)}
            alt={cartItemData.title}
          />
        </div>
        <div className={styles.info}>
          <div className={styles.title}>{cartItemData.title}</div>
          <div className={styles.model}>{cartItemData.modelCode}</div>
        </div>
      </Link>
      <div className={styles.availability}>{cartItemData.availability}</div>
      <div className={styles.price}>{itemPrice}</div>
      <div className={styles.quantity}>
        <CartQuantityInput cartItem={cartItemData} />
      </div>
      <div className={styles["total-price"]}>
        <span>Total price: </span>
        {itemTotalPrice}
      </div>
    </div>
  );
}

export default CartSingleItem;
