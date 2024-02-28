// utils
import { NavLink, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { database } from "utils/firebaseConfig";

// components
import { FaDatabase, FaHouse, FaBook, FaHeart, FaArrowTurnDown } from "react-icons/fa6";

// styles
import styles from "./AccountSectionsNav.module.css";

function AccountSectionsNav() {
  function handleUserLogout() {
    signOut(database);
  }

  return (
    <nav>
      <NavLink
        to="data"
        className={({ isActive }) => (isActive ? `${styles["link"]} ${styles.active}` : styles["link"])}
      >
        <FaDatabase />
        <span>My data</span>
      </NavLink>
      <NavLink
        to="address"
        className={({ isActive }) => (isActive ? `${styles["link"]} ${styles.active}` : styles["link"])}
      >
        <FaHouse />
        <span>Delivery address</span>
      </NavLink>
      <NavLink
        to="orders"
        className={({ isActive }) => (isActive ? `${styles["link"]} ${styles.active}` : styles["link"])}
      >
        <FaBook />
        <span>Orders</span>
      </NavLink>
      <NavLink
        to="favorites"
        className={({ isActive }) => (isActive ? `${styles["link"]} ${styles.active}` : styles["link"])}
      >
        <FaHeart />
        <span>Favorites</span>
      </NavLink>
      <NavLink
        to="returns"
        className={({ isActive }) => (isActive ? `${styles["link"]} ${styles.active}` : styles["link"])}
      >
        <FaArrowTurnDown />
        <span>Returns</span>
      </NavLink>
      <Link
        to="/"
        className={styles["link-btn"]}
        onClick={handleUserLogout}
      >
        Log Out
      </Link>
    </nav>
  );
}

export default AccountSectionsNav;
