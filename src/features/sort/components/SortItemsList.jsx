// utils
import { useDispatch, useSelector } from "react-redux";
import { filteredItemsActions } from "store/filtered-items-slice";
import { activePageActions } from "store/active-page-slice";
import { scrollToTopFn } from "utils/ScrollToTop";

// components
import SortItem from "./SortItem";
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";

// styles
import styles from "./SortItemsList.module.css";

function SortItemsList() {
  const dispatchFn = useDispatch();
  const selectedSort = useSelector((state) => state.filtered.selectedSort);

  function handleResetActivePage() {
    dispatchFn(activePageActions.jumpToFirstPage());
  }

  function handleSetSortCategory(sortCategory) {
    dispatchFn(filteredItemsActions.setSortCategory(sortCategory));
  }

  return (
    <div className={styles["sort-items-container"]}>
      <SortItem
        text="A - Z"
        icon={<FaArrowUpLong />}
        selected={selectedSort === "AZ"}
        onSort={() => {
          handleSetSortCategory("AZ");
          handleResetActivePage();
          scrollToTopFn();
        }}
      />
      <SortItem
        text="Z - A"
        icon={<FaArrowDownLong />}
        selected={selectedSort === "ZA"}
        onSort={() => {
          handleSetSortCategory("ZA");
          handleResetActivePage();
          scrollToTopFn();
        }}
      />
      <SortItem
        text="Lowest Price"
        icon={<FaArrowUpLong />}
        selected={selectedSort === "priceUp"}
        onSort={() => {
          handleSetSortCategory("priceUp");
          handleResetActivePage();
          scrollToTopFn();
        }}
      />
      <SortItem
        text="Highest Price"
        icon={<FaArrowDownLong />}
        selected={selectedSort === "priceDown"}
        onSort={() => {
          handleSetSortCategory("priceDown");
          handleResetActivePage();
          scrollToTopFn();
        }}
      />
    </div>
  );
}

export default SortItemsList;
