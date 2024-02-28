// utils
import { motion } from "framer-motion";

// styles
import styles from "./QuantityBadge.module.css";

function QuantityBadge({ quantity }) {
  return (
    <motion.div
      className={styles.badge}
      initial={{ y: 10, scale: 1.3 }}
      animate={{ y: 0, scale: 1 }}
    >
      {quantity}
    </motion.div>
  );
}

export default QuantityBadge;
