// components
import ToggleDropdownItem from "components/ui/ToggleDropdownItem";
import FilterCheckboxRow from "./FilterCheckboxRow";

// styles
import styles from "./FilterDropdownItem.module.css";

function FilterDropdownItem({ filterCategory, filterCategoryItems }) {
  return (
    <div className={styles["filter-box"]}>
      <ToggleDropdownItem
        isItemExpanded={true}
        title={filterCategory}
        titleClass={styles["filter-title"]}
        iconClass={styles["filter-icon"]}
      >
        {filterCategoryItems.map((filterItem) => (
          <FilterCheckboxRow
            key={filterItem[filterCategory]}
            filterRowData={filterItem}
            filterCategory={filterCategory}
            priceMinValue={filterCategory === "price" && filterItem.minValue}
            priceMaxValue={filterCategory === "price" && filterItem.maxValue}
          />
        ))}
      </ToggleDropdownItem>
    </div>
  );
}

export default FilterDropdownItem;
