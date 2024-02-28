// utils
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { onSnapshot, collection } from "firebase/firestore";
import firestoreDB from "utils/firebaseConfig";

// components
import QuantityBadge from "components/ui/QuantityBadge";
import AccountDropdown from "./AccountDropdown";
import { IoCartOutline, IoHeartOutline, IoPersonOutline } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";

// styles
import styles from "./UserNav.module.css";

function UserNav() {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartTotalQuantity = useSelector((state) => state.cart.totalQuantity);

  const location = useLocation();

  function handleDropdownMenu() {
    setDisplayDropdown((state) => !state);
  }

  useEffect(() => {
    setDisplayDropdown(false);
  }, [location.pathname]);

  // get the current logged in user id
  const authState = localStorage.getItem("persist:root") ? JSON.parse(localStorage.getItem("persist:root")).auth : null;
  const currentUserId = authState ? JSON.parse(authState).userId : null;

  useEffect(() => {
    if (!currentUserId) {
      setFavorites([]);
      // return;
    } else {
      const snapshot = onSnapshot(
        collection(firestoreDB, "users", currentUserId, "userFavorites"),
        (snapshot) => {
          if (snapshot.size) {
            // we have data
            setFavorites(snapshot.docs.map((document) => document.data()));
          } else {
            // it's empty
            setFavorites([]);
          }
        },
        (error) => {
          throw Error(error.message);
        },
      );
      return snapshot;
    }
  }, [currentUserId]);

  return (
    <>
      <div
        className={styles["navigation-section"]}
        onClick={handleDropdownMenu}
      >
        <div className={styles["account-section"]}>
          <IoPersonOutline className={styles["user-icons"]} />
          <span className={styles["account-section-text"]}>{isLoggedIn ? "My Acccount" : "Log In"}</span>
          <MdKeyboardArrowDown className={styles["dropdown-arrow"]} />
        </div>
      </div>
      {displayDropdown && (
        <AccountDropdown
          isLoggedIn={isLoggedIn}
          onClick={() => setDisplayDropdown(false)}
        />
      )}
      {isLoggedIn && (
        <div className={styles["navigation-section"]}>
          <Link to="/my-account/favorites">
            <IoHeartOutline className={styles["user-icons"]} />
            <span className={styles["account-section-text"]}>Favorites</span>
            {favorites.length !== 0 && (
              <QuantityBadge
                key={favorites.length}
                quantity={favorites.length}
              />
            )}
          </Link>
        </div>
      )}
      <div className={styles["navigation-section"]}>
        <Link to="/cart">
          <IoCartOutline className={styles["user-icons"]} />
          <span className={styles["account-section-text"]}>Cart</span>
          <QuantityBadge
            key={cartTotalQuantity}
            quantity={cartTotalQuantity}
          />
        </Link>
      </div>
    </>
  );
}

export default UserNav;
