// utils
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// components
import SingleItem from "./SingleItem";
import Pagination from "features/pagination/Pagination";
import SortItemsDesktop from "features/sort/components/SortItemsDesktop";

// styles
import styles from "./ItemsList.module.css";

function ItemsList({ items, itemsType, categoryAllItems, searchTerm, sortedItems }) {
  const activePage = useSelector((state) => state.activePage.activePage);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    function handleResize() {
      // change the number of items per page depending on viewport size
      const width = window.innerWidth;
      const itemsPerPage = width < 900 ? 8 : 9;
      setItemsPerPage(itemsPerPage);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const lastItemIndex = activePage * itemsPerPage; // item on the end index is not included in the returned slice of the slice method
  // ex: fourth page -> lastItemIndex = 4(page number) * 6(items per page) = 24
  const firstItemIndex = lastItemIndex - itemsPerPage;
  // ex: fourth page -> firstItemIndex = 24(lastItemIndex) - 6(items per page) = 18
  const currentActivePageItems = sortedItems.slice(firstItemIndex, lastItemIndex);

  return (
    <>
      <SortItemsDesktop />
      {itemsType === "search" && (
        <div className={styles["results-info"]}>
          {categoryAllItems.length} results for "<span>{searchTerm}</span>"
        </div>
      )}
      <ul className={styles.list}>
        {currentActivePageItems.length === 0 && (
          <p className={styles["fallback-text"]}>
            No items to display. Try selecting a different filter or search for a different item.
          </p>
        )}
        {currentActivePageItems.map((item) => (
          <SingleItem
            key={item.id}
            folderName={item.category}
            itemData={item}
            currentItems={currentActivePageItems}
          />
        ))}
      </ul>
      <Pagination
        totalItems={items}
        itemsPerPage={itemsPerPage}
        activePage={activePage}
      />
    </>
  );
}

export default ItemsList;
