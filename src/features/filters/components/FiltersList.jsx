// utils
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { filteredItemsActions } from "store/filtered-items-slice";
import getFilterCategoryItems from "../utils/getFilterCategoryItems";
import filterPriceRangeItems from "../utils/filterPriceRange";

// components
import FilterDropdownItem from "./FilterDropdownItem";
import { IoClose } from "react-icons/io5";

// styles
import styles from "./FiltersList.module.css";

function FiltersList({ fetchedItems }) {
  const dispatchFn = useDispatch();
  const params = useParams();
  const itemsCategory = params.itemsType;
  const [searchParmas, setSearchParams] = useSearchParams();
  const searchTerm = searchParmas.get("search");
  const itemsData = Object.values(fetchedItems);
  const selectedFilters = useSelector((state) => state.filtered.selectedFilters);

  const filterBrandItems = getFilterCategoryItems(itemsData, itemsCategory, "brand", searchTerm).numOfAppearancesItems;
  const filterPriceItems = getFilterCategoryItems(itemsData, itemsCategory, "price", searchTerm).numOfAppearancesItems;
  const filterMaterialItems = getFilterCategoryItems(
    itemsData,
    itemsCategory,
    "material",
    searchTerm,
  ).numOfAppearancesItems;
  const filterColorItems = getFilterCategoryItems(itemsData, itemsCategory, "color", searchTerm).numOfAppearancesItems;

  // price filter values
  const filterPriceData = filterPriceRangeItems(filterPriceItems);

  function handleResetFilters() {
    dispatchFn(filteredItemsActions.resetSelectedFilters());
  }

  function removeSingleFilter(singleFilter) {
    dispatchFn(filteredItemsActions.removeSingleFilter(singleFilter));
  }

  return (
    <aside className={styles["filters-wrapper"]}>
      <h3>Filters</h3>
      {selectedFilters.length !== 0 && (
        <button
          onClick={handleResetFilters}
          className={styles["reset-filters-btn"]}
        >
          Remove all filters
        </button>
      )}
      <div className={styles["selected-filters-container"]}>
        {selectedFilters.length !== 0 &&
          selectedFilters.map((filter) => (
            <div
              key={filter.value}
              className={styles["selected-filter"]}
            >
              <div>
                <span>{filter.category}: </span>
                <span>{filter.value}</span>
              </div>
              <button onClick={() => removeSingleFilter(filter.value)}>
                <IoClose />
              </button>
            </div>
          ))}
      </div>
      <div className={styles["filters-container"]}>
        {filterBrandItems.length !== 0 && (
          <FilterDropdownItem
            filterCategoryItems={filterBrandItems}
            filterCategory="brand"
          />
        )}
        <FilterDropdownItem
          filterCategoryItems={filterPriceData}
          filterCategory="price"
        />
        {filterMaterialItems.length !== 0 && (
          <FilterDropdownItem
            filterCategoryItems={filterMaterialItems}
            filterCategory="material"
          />
        )}
        {filterColorItems.length !== 0 && (
          <FilterDropdownItem
            filterCategoryItems={filterColorItems}
            filterCategory="color"
          />
        )}
      </div>
    </aside>
  );
}

export default FiltersList;
