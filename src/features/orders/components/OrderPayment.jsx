// utils
import { useState } from "react";
import { motion } from "framer-motion";

// components
import { IoCardOutline } from "react-icons/io5";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { CiMoneyCheck1 } from "react-icons/ci";

// styles
import styles from "./OrderPayment.module.css";

function OrderPayment({ onSelectPaymentMethod }) {
  const [selectedPayment, setSelectedPayment] = useState("");

  function handleInputChange(event) {
    onSelectPaymentMethod(event.target.value);
    setSelectedPayment(event.target.value);
  }

  return (
    <section className={styles["order-payment-container"]}>
      <h2>
        <span>2</span>
        Payment
      </h2>
      <p>Select payment method</p>
      <div className={styles["payment-inputs"]}>
        <motion.div
          className={`${styles["payment-row"]} ${selectedPayment === "card" ? styles.selected : ""}`}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.15, type: "spring", stiffness: 800 },
          }}
        >
          <IoCardOutline />
          <label htmlFor="online-card">Online-card</label>
          <input
            type="radio"
            id="online-card"
            value="card"
            name="payment"
            onChange={handleInputChange}
          />
        </motion.div>
        <motion.div
          className={`${styles["payment-row"]} ${selectedPayment === "cash" ? styles.selected : ""}`}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.15, type: "spring", stiffness: 800 },
          }}
        >
          <LiaMoneyBillWaveSolid />
          <label htmlFor="cash">Cash on delivery</label>
          <input
            type="radio"
            id="cash"
            value="cash"
            name="payment"
            onChange={handleInputChange}
          />
        </motion.div>
        <motion.div
          className={`${styles["payment-row"]} ${selectedPayment === "payment-order" ? styles.selected : ""}`}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.15, type: "spring", stiffness: 800 },
          }}
        >
          <CiMoneyCheck1 />
          <label htmlFor="payment-order">Payment order</label>
          <input
            type="radio"
            id="payment-order"
            value="payment-order"
            name="payment"
            onChange={handleInputChange}
          />
        </motion.div>
      </div>
    </section>
  );
}

export default OrderPayment;
