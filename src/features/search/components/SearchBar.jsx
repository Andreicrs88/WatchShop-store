// utils
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence } from "framer-motion";
import useDebounce from "hooks/useDebounce";
import { backdropActions } from "store/backdrop-slice";
import { filteredItemsActions } from "store/filtered-items-slice";
import { activePageActions } from "store/active-page-slice";

// components
import BackdropSearch from "components/ui/BackdropSearch";
import { IoSearch, IoClose } from "react-icons/io5";

// styles
import styles from "./SearchBar.module.css";

function SearchBar() {
  const dispatchFn = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isBackdropVisible = useSelector((state) => state.backdrop.backdropIsVisible);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResultItems, setSearchResultItems] = useState([]);

  const debouncedSearch = useDebounce(searchTerm);
  let [searchParams, setSearchParams] = useSearchParams();

  // when the url path changes, the backdrop is closed
  useEffect(() => {
    dispatchFn(backdropActions.hideBackdrop());
  }, [dispatchFn, location.pathname]);

  useEffect(() => {
    async function getSearchedItems() {
      setIsLoading(true);

      const response = await fetch("https://watchstoredb-default-rtdb.europe-west1.firebasedatabase.app/items.json");

      if (!response.ok) {
        setError("Something went wrong. Could not load items.");
        return;
      }

      const responseData = await response.json(); // firebase returns an object
      const transformedResData = Object.values(responseData); // transformed the firebase object into an array

      const searchedItems = transformedResData.filter((item) =>
        item.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );

      setSearchResultItems(searchedItems);

      setIsLoading(false);
      setError(null);
    }

    getSearchedItems();
  }, [debouncedSearch, dispatchFn]);

  function handleShowBackdrop() {
    dispatchFn(backdropActions.showBackdrop());
  }

  function handleHideBackdrop() {
    dispatchFn(backdropActions.hideBackdrop());
  }

  function handleChangeInput(event) {
    setSearchTerm(event.target.value);
  }

  function handleClearForm() {
    setSearchTerm("");
  }

  function handleSubmitSearch(event) {
    if (event.key === "Enter" || event.type === "click") {
      setSearchParams(debouncedSearch);
      navigate(`/items/search?search=${searchTerm}`);
      handleHideBackdrop();
      handleClearForm();
      dispatchFn(filteredItemsActions.resetSelectedFilters());
      dispatchFn(filteredItemsActions.resetSort());
      dispatchFn(activePageActions.jumpToFirstPage());
    }
  }

  return (
    <>
      <AnimatePresence>{isBackdropVisible && <BackdropSearch onClick={handleHideBackdrop} />}</AnimatePresence>
      <div
        className={styles["search-container"]}
        style={{
          boxShadow: isBackdropVisible && "0 0 5px var(--dark-color-1)",
        }}
      >
        <div className={styles["search-bar"]}>
          <input
            id="search"
            type="text"
            value={searchTerm}
            placeholder="Search items"
            onChange={handleChangeInput}
            onFocus={handleShowBackdrop}
            onKeyDown={handleSubmitSearch}
          />
          <button
            onClick={handleClearForm}
            className={styles["reset-btn"]}
          >
            <IoClose />
          </button>
          <div className={styles["search-icon"]}>
            <IoSearch onClick={handleSubmitSearch} />
          </div>
        </div>
        {isBackdropVisible && (
          <div className={styles["search-results"]}>
            <div className={styles["list-container"]}>
              {error ? (
                <p className={styles["fallback-text"]}>{error}</p>
              ) : (
                <ul>
                  {isLoading && <p className={styles["fallback-text"]}>Loading...</p>}
                  {searchResultItems.length === 0 && <p className={styles["fallback-text"]}>No items</p>}
                  {!isLoading &&
                    searchTerm &&
                    searchResultItems.map((item) => (
                      <li key={item.id}>
                        <Link
                          to={`/${item.id}`}
                          onClick={handleHideBackdrop}
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;
