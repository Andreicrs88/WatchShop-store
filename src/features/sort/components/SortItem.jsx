// utils
import { motion } from "framer-motion";

// styles
import styles from "./SortItem.module.css";

function SortItem({ text, icon, selected, onSort }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.15, type: "spring", stiffness: 1000 },
      }}
      className={`${styles["sort-item"]} ${selected ? styles.active : ""}`}
      onClick={onSort}
    >
      <div className={styles["sort-text"]}>{text}</div>
      {icon}
    </motion.button>
  );
}

export default SortItem;
