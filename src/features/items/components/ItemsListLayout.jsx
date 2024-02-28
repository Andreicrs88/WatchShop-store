// utils
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { sortAZ, sortZA, sortPriceUp, sortPriceDown } from "features/sort/utils/sortItems";

// components
import FiltersList from "features/filters/components/FiltersList";
import ItemsList from "./ItemsList";
import FiltersItemsMobile from "features/filters/components/FiltersItemsMobile";
import SortItemsMobile from "features/sort/components/SortItemsMobile";
import { FaFilter, FaSort } from "react-icons/fa";

// styles
import styles from "./ItemsListLayout.module.css";
import { useState } from "react";

// fetchedItems = the data received form the loader (GET request)
function ItemsListLayout({ fetchedItems }) {
  const params = useParams();
  const itemsType = params.itemsType;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search");
  const itemsData = Object.values(fetchedItems);

  const [isSortListVisible, setIsSortListVisible] = useState(false);
  const [isMobileFilterListVisible, setIsMobileFilterListVisible] = useState(false);

  const selectedSort = useSelector((state) => state.filtered.selectedSort);
  const selectedFilters = useSelector((state) => state.filtered.selectedFilters);

  const categoryAllItems =
    itemsType === "search"
      ? itemsData.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
      : itemsData.filter((item) => item.category === params.itemsType);

  // ---- filtering items
  let items;

  if (selectedFilters.length === 0) {
    // if no filters are selected, all items are displayed
    items = categoryAllItems;
  } else {
    let temporaryItems = categoryAllItems;

    const tempArray = selectedFilters.map((filter) => {
      // if minValue and maxValue exist of the filter, the take price as filter category (filter.minValue === 0 is for the 0-500 price range)
      if ((filter.minValue && filter.maxValue) || (filter.minValue === 0 && filter.maxValue)) {
        temporaryItems = temporaryItems.filter(
          (item) => filter.minValue < item[filter.category] && item[filter.category] < filter.maxValue,
        );
        return temporaryItems;
      } else {
        temporaryItems = temporaryItems.filter((item) => item[filter.category] === filter.value);
        return temporaryItems;
      }
    });

    // with each iteration, the returned array is filtered by the next item in the selectedFilters array
    // the last item (last iteration) of the map method is the filtered array
    const filteredItems = tempArray[tempArray.length - 1];

    // removing duplicates from the filtered array
    const uniqueFilteredItems = filteredItems.filter(
      (item, index, array) => index === array.findIndex((i) => i.id === item.id),
    );

    items = uniqueFilteredItems;
  }

  // ---- sorting items
  let sortedItems;

  switch (selectedSort) {
    case "AZ": {
      const sortedItemsAZ = sortAZ(items);
      sortedItems = sortedItemsAZ;
      break;
    }
    case "ZA": {
      const sortedItemsZA = sortZA(items);
      sortedItems = sortedItemsZA;
      break;
    }
    case "priceUp": {
      const sortedItemsPriceUp = sortPriceUp(items);
      sortedItems = sortedItemsPriceUp;
      break;
    }
    case "priceDown": {
      const sortedItemsPriceDown = sortPriceDown(items);
      sortedItems = sortedItemsPriceDown;
      break;
    }
    default: {
      sortedItems = items;
    }
  }

  function handleDisplaySortList() {
    setIsSortListVisible(true);
  }

  function handleCloseSortList() {
    setIsSortListVisible(false);
  }

  function handleDisplayMobileFiltersList() {
    setIsMobileFilterListVisible(true);
  }

  function handleCloseMobileFiltersList() {
    setIsMobileFilterListVisible(false);
  }

  return (
    <>
      <div className={styles["main-wrapper"]}>
        <div className={styles["aside-filters"]}>
          <FiltersList fetchedItems={items} />
        </div>
        <div className={styles["items-selection"]}>
          <div
            className={styles["filters-list-selection"]}
            onClick={handleDisplayMobileFiltersList}
          >
            <FaFilter />
            <span>Filter</span>
          </div>
          <div
            className={styles["sort-list-selection"]}
            onClick={handleDisplaySortList}
          >
            <FaSort />
            <span>Sort</span>
          </div>
        </div>
        {isMobileFilterListVisible && (
          <div className={styles["mobile-filters-container"]}>
            <FiltersItemsMobile
              fetchedItems={items}
              onClose={handleCloseMobileFiltersList}
              className={isMobileFilterListVisible ? "filters-mobile-list-opened" : ""}
            />
          </div>
        )}
        {isSortListVisible && (
          <SortItemsMobile
            onClose={handleCloseSortList}
            className={isSortListVisible ? "sort-list-opened" : ""}
          />
        )}
        <div className={styles["main-list"]}>
          <ItemsList
            categoryAllItems={categoryAllItems}
            items={items}
            sortedItems={sortedItems}
            itemsType={itemsType}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </>
  );
}

export default ItemsListLayout;
