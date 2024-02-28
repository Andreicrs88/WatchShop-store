//  utils
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

// styles
import styles from "./BackdropSearch.module.css";

function BackdropSearch({ onClick }) {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={styles.backdrop}
      onClick={onClick}
    />,
    document.getElementById("backdrop-search"),
  );
}

export default BackdropSearch;
