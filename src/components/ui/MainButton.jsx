// utils
import { motion } from "framer-motion";

// styles
import styles from "./MainButton.module.css";

function MainButton({ children, className, ...props }) {
  return (
    <motion.button
      whileHover={{
        scale: 0.93,
        transition: { duration: 0.15, type: "spring", stiffness: 800 },
      }}
      className={`${styles.btn} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default MainButton;
