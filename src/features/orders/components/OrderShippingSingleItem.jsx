// utils
import { motion } from "framer-motion";

// styles
import styles from "./OrderShippingSingleItem.module.css";

function OrderShippingSingleItem({ imageSrc, title, id, shippingCost, selectedCourier, handleInputChange }) {
  return (
    <motion.div
      className={`${styles["shipping-row"]} ${selectedCourier === id ? styles.selected : ""}`}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.15, type: "spring", stiffness: 800 },
      }}
    >
      <div>
        <div className={styles["shipping-image"]}>
          <img
            src={imageSrc}
            alt={title}
          />
          <label htmlFor={id}>{title}</label>
        </div>
        <p>Shipping cost: {shippingCost}</p>
      </div>
      <input
        type="radio"
        id={id}
        value={id}
        name="courier"
        onChange={handleInputChange}
      />
    </motion.div>
  );
}

export default OrderShippingSingleItem;
