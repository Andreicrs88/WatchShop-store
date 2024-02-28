// components
import SingleOrder from "./SingleOrder";

// styles
import styles from "./OrdersList.module.css";

function OrdersList({ orders }) {
  return (
    <ul className={styles["orders-list"]}>
      {orders.map((order) => (
        <SingleOrder
          key={order.orderId}
          orderData={order}
        />
      ))}
    </ul>
  );
}

export default OrdersList;
