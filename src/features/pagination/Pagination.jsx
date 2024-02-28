// utils
import { useDispatch, useSelector } from "react-redux";
import { activePageActions } from "store/active-page-slice";
import { scrollToTopFn } from "utils/ScrollToTop";

// components
import { FaAngleRight, FaAngleLeft, FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

// styles
import styles from "./Pagination.module.css";

function Pagination({ totalItems, itemsPerPage, activePage }) {
  const dispatchFn = useDispatch();

  const maxPageNumberLimit = useSelector((state) => state.activePage.maxPageNumberLimit);
  const minPageNumberLimit = useSelector((state) => state.activePage.minPageNumberLimit);

  let pages = [];
  const totalPages = Math.ceil(totalItems.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pages.push(Number(i));
  }

  const isLastPageActive = activePage === pages[pages.length - 1];
  const isFirstPageActive = activePage === 1;

  function handleSetCurrentPage(activePage) {
    dispatchFn(activePageActions.setActivePage(activePage));
  }

  function handleJumpToFirstPage() {
    dispatchFn(activePageActions.jumpToFirstPage());
    scrollToTopFn();
  }

  function handlePreviousPage() {
    dispatchFn(activePageActions.moveToPreviousPages());
    scrollToTopFn();
  }

  function handleNextPage() {
    dispatchFn(activePageActions.moveToNextPage());
    scrollToTopFn();
  }

  function handleJumpToLastPage() {
    dispatchFn(activePageActions.jumpToLastPage(pages.length));
    scrollToTopFn();
  }

  return (
    <div className={styles.pages}>
      <button
        className={`${styles["navigate-btn"]} ${isFirstPageActive && styles.disabled}`}
        onClick={handleJumpToFirstPage}
      >
        <FaAnglesLeft />
      </button>
      <button
        className={`${styles["navigate-btn"]} ${isFirstPageActive && styles.disabled}`}
        onClick={handlePreviousPage}
      >
        <FaAngleLeft />
      </button>

      {minPageNumberLimit >= 1 && (
        <div className={`${styles["navigate-btn"]} ${styles.dots}`}>
          <HiOutlineDotsHorizontal />
        </div>
      )}

      {pages.map((page) => {
        if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
          return (
            <button
              key={page}
              className={`${styles["page-btn"]} ${page === activePage ? styles.active : ""}`}
              onClick={() => {
                handleSetCurrentPage(page);
                scrollToTopFn();
              }}
            >
              {page}
            </button>
          );
        } else {
          return null;
        }
      })}

      {pages.length > maxPageNumberLimit && (
        <div className={`${styles["navigate-btn"]} ${styles.dots}`}>
          <HiOutlineDotsHorizontal />
        </div>
      )}

      <button
        className={`${styles["navigate-btn"]} ${isLastPageActive && styles.disabled}`}
        onClick={handleNextPage}
      >
        <FaAngleRight />
      </button>
      <button
        className={`${styles["navigate-btn"]} ${isLastPageActive && styles.disabled}`}
        onClick={handleJumpToLastPage}
      >
        <FaAnglesRight />
      </button>
    </div>
  );
}

export default Pagination;
