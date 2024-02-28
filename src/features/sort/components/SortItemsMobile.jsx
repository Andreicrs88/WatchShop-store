// components
import { IoClose } from "react-icons/io5";

// styles
import styles from "./SortItemsMobile.module.css";
import SortItemsList from "./SortItemsList";

function SortItemsMobile({ onClose, className }) {
  return (
    <div className={`${styles["sort-wrapper-mobile"]} ${className}`}>
      <h3>Sort items:</h3>
      <button className={styles["close-btn"]}>
        <IoClose onClick={() => onClose()} />
      </button>
      <SortItemsList />
      <button
        className={styles["apply-btn"]}
        onClick={() => onClose()}
      >
        Apply sorting
      </button>
    </div>
  );
}

export default SortItemsMobile;
