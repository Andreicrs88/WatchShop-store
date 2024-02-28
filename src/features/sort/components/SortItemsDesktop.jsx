// components
import SortItemsList from "./SortItemsList";

// styles
import styles from "./SortItemsDesktop.module.css";

function SortItemsDesktop() {
  return (
    <div className={styles["sort-wrapper-desktop"]}>
      <span>Sort items:</span>
      <SortItemsList />
    </div>
  );
}

export default SortItemsDesktop;
