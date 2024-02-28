// utils
import { useDispatch, useSelector } from "react-redux";
import { filteredItemsActions } from "store/filtered-items-slice";
import { activePageActions } from "store/active-page-slice";

// styles
import styles from "./FilterCheckboxRow.module.css";

function FilterCheckboxRow({ filterRowData, filterCategory, priceMinValue, priceMaxValue }) {
  const dispatchFn = useDispatch();
  const filterValue = filterRowData[filterCategory];
  const selectedFilters = useSelector((state) => state.filtered.selectedFilters);

  let checked;
  const existingFilter = selectedFilters.find((filter) => filter.value === filterValue);
  if (existingFilter) {
    checked = true;
  }

  function handleClickButton(event) {
    if (filterCategory === "price") {
      dispatchFn(
        filteredItemsActions.setSelectedFilters({
          category: filterCategory,
          value: event.target.innerText,
          minValue: priceMinValue,
          maxValue: priceMaxValue,
        }),
      );
    } else {
      dispatchFn(
        filteredItemsActions.setSelectedFilters({
          category: filterCategory,
          value: event.target.innerText,
        }),
      );
    }
    dispatchFn(activePageActions.jumpToFirstPage());
  }

  return (
    <div className={styles.expandable}>
      <div className={styles["filter-values"]}>
        <div className={styles["filter-value"]}>
          <button
            className={`${styles["filter-item"]} ${checked && styles.checked}`}
            onClick={handleClickButton}
          >
            {filterValue}
          </button>
        </div>
        <div className={styles.quantity}>({filterRowData.numOfAppearances})</div>
      </div>
    </div>
  );
}

export default FilterCheckboxRow;
