// utils
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import priceFormatter from "utils/formatCurrency";

// components
import OrderSingleItem from "./OrderSingleItem";
import UniversalButton from "components/ui/UniversalButton";

// styles
import styles from "./SingleOrder.module.css";

function SingleOrder({ orderData }) {
  const [showDetails, setShowDetails] = useState(false);
  const orderItems = orderData.cartItems;

  function handleShowDetails() {
    setShowDetails((currentValue) => !currentValue);
  }

  return (
    <li className={styles["order-container"]}>
      <div className={styles.order}>
        <div className={styles.row}>
          <div>Order number</div>
          <div>{orderData.orderId}</div>
        </div>
        <div className={styles.row}>
          <div>Date</div>
          <div>{orderData.date}</div>
        </div>
        <div className={styles.row}>
          <div>Total price</div>
          <div>{priceFormatter.format(+orderData.totalOrderAmount)}</div>
        </div>
      </div>
      <div className={styles.actions}>
        <UniversalButton onClick={handleShowDetails}>{showDetails ? "Hide details" : "Show details"}</UniversalButton>
      </div>
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className={styles["order-details"]}
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul exit={{ opacity: 0 }}>
              {orderItems.map((item) => (
                <OrderSingleItem
                  key={item.id}
                  itemData={item}
                />
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default SingleOrder;
