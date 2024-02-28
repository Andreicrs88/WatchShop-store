// utils
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// components
import { IoIosArrowUp } from "react-icons/io";

// styles
import styles from "./ToggleDropdownItem.module.css";

function ToggleDropdownItem({ title, iconClass, titleClass, children, isItemExpanded }) {
  const [isExpanded, setIsExpanded] = useState(isItemExpanded);

  function handleExpand() {
    setIsExpanded((expanded) => !expanded);
  }

  return (
    <>
      <button
        onClick={handleExpand}
        className={styles["dropdown-btn"]}
      >
        <div className={titleClass}>{title}</div>
        <motion.div
          className={iconClass}
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          <IoIosArrowUp />
        </motion.div>
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className={styles["expand-content"]}
            initial={{ height: 0 }}
            animate={{ height: "auto", y: 10 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ToggleDropdownItem;
