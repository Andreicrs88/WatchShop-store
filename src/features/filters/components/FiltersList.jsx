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
  // const [searchParmas, setSearchParams] = useSearchParams();
  const [searchParmas] = useSearchParams();
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
  let priceDataNumOfAppearances = 0;
  let isFilterDataVisible = false;

  for (const priceItemData of filterPriceData) {
    if (priceItemData.numOfAppearances) {
      priceDataNumOfAppearances++;
    }
  }

  // if we have at least 2 options available in the filter category, we show the filter container
  // if only 1 option is available, we hide the filter container because there is no point to show only 1 option to select
  if (priceDataNumOfAppearances >= 2) {
    isFilterDataVisible = true;
  }

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
        {filterBrandItems.length > 1 && (
          <FilterDropdownItem
            filterCategoryItems={filterBrandItems}
            filterCategory="brand"
          />
        )}
        {isFilterDataVisible && (
          <FilterDropdownItem
            filterCategoryItems={filterPriceData}
            filterCategory="price"
          />
        )}
        {/* <FilterDropdownItem
          filterCategoryItems={filterPriceData}
          filterCategory="price"
        /> */}
        {filterMaterialItems.length > 1 && (
          <FilterDropdownItem
            filterCategoryItems={filterMaterialItems}
            filterCategory="material"
          />
        )}
        {filterColorItems.length > 1 && (
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
