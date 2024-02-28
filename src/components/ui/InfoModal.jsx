// utils
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

// components
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { IoCartOutline, IoAlertCircleOutline } from "react-icons/io5";

// styles
import styles from "./InfoModal.module.css";

function InfoModal({ text, modalType, ...props }) {
  let icon = <IoIosHeartEmpty />;

  if (modalType === "info") {
    icon = <IoAlertCircleOutline />;
  } else if (modalType === "cart") {
    icon = <IoCartOutline />;
  } else if (modalType === "favorites" && props.isFavorite) {
    icon = <IoIosHeart />;
  }

  return createPortal(
    <motion.div
      className={styles["confirm-modal"]}
      initial={{ x: 500 }}
      animate={{
        x: -10,
      }}
      exit={{ x: 500 }}
      transition={{ duration: 0.2, type: "spring", stiffness: 100 }}
    >
      {icon}
      {text}
    </motion.div>,
    document.getElementById("side-modal"),
  );
}

export default InfoModal;
