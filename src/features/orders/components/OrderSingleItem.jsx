// utils
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import priceFormatter from "utils/formatCurrency";

// styles
import styles from "./OrderSingleItem.module.css";

function OrderSingleItem({ itemData }) {
  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.7 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      className={styles["order-items"]}
    >
      <div className={styles["item-title"]}>
        <span className={styles["item-quantity"]}>x{itemData.quantity}</span> &nbsp;{" "}
        <Link to={`/${itemData.id}`}>{itemData.title}</Link>
      </div>
      <div className={styles["item-model"]}>{itemData.modelCode}</div>
      <div className={styles["item-price"]}>
        <span>Price/item:</span> {priceFormatter.format(itemData.price)}
      </div>
    </motion.li>
  );
}

export default OrderSingleItem;
