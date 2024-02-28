// utils
import { motion } from "framer-motion";

// styles
import styles from "./UniversalButton.module.css";

function UniversalButton({ children, ...props }) {
  return (
    <motion.button
      whileHover={{
        scale: 1.06,
        transition: { duration: 0.15, type: "spring", stiffness: 800 },
      }}
      {...props}
      className={styles.btn}
    >
      {children}
    </motion.button>
  );
}

export default UniversalButton;
