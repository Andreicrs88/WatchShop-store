// components
import FiltersList from "./FiltersList";
import { IoClose } from "react-icons/io5";

// styles
import styles from "./FiltersItemsMobile.module.css";

function FiltersItemsMobile({ fetchedItems, onClose, className }) {
  return (
    <div className={`${styles["filter-items-list-wrapper"]} ${className}`}>
      <h3>Filter items:</h3>
      <button className={styles["close-btn"]}>
        <IoClose onClick={() => onClose()} />
      </button>
      <div className={styles["filters-list"]}>
        <FiltersList fetchedItems={fetchedItems} />
      </div>
      <button
        className={styles["apply-btn"]}
        onClick={() => onClose()}
      >
        Apply filters
      </button>
    </div>
  );
}

export default FiltersItemsMobile;
