// utils
import { Link } from "react-router-dom";
import { database } from "utils/firebaseConfig";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import firestoreDB from "utils/firebaseConfig";

// components
import { IoClose } from "react-icons/io5";

// styles
import styles from "./AccountDropdown.module.css";
import { useEffect, useState } from "react";

function AccountDropdown({ isLoggedIn, onClick, ...props }) {
  const [userName, setUserName] = useState("");

  function handleUserLogout() {
    signOut(database);
  }

  useEffect(() => {
    async function getUserName() {
      // // get the current logged in user ID
      const authState = localStorage.getItem("persist:root")
        ? JSON.parse(localStorage.getItem("persist:root")).auth
        : null;
      const currentUserId = authState ? JSON.parse(authState).userId : null;

      if (!currentUserId) {
        setUserName("");
      } else {
        const colRef = collection(firestoreDB, "users", currentUserId, "userData");
        const docSnapshot = await getDocs(colRef);

        if (!docSnapshot.size) {
          setUserName("");
        }

        const userData = docSnapshot.docs.map((doc) => doc.data())[0];
        setUserName(userData.firstName);
      }
    }

    getUserName();
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div
          className={styles["logged-in-container"]}
          {...props}
        >
          <div className={styles["user-info"]}>
            <span>
              Hello <b>{userName}</b>
            </span>

            <button
              className={styles["close-btn"]}
              onClick={onClick}
            >
              <IoClose />
            </button>
          </div>
          <ul className={styles["account-list"]}>
            <li>
              <Link to="/my-account/data">My data</Link>
            </li>
            <li>
              <Link to="/my-account/address">Delivery address</Link>
            </li>
            <li>
              <Link to="/my-account/orders">Orders</Link>
            </li>
            <li>
              <Link to="/my-account/favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/my-account/returns">Returns</Link>
            </li>
          </ul>
          <Link
            to="/"
            className={styles["link-btn"]}
            onClick={handleUserLogout}
          >
            Log Out
          </Link>
        </div>
      ) : (
        <div
          className={styles["logged-out-container"]}
          {...props}
        >
          <button
            className={styles["close-btn"]}
            onClick={onClick}
          >
            <IoClose />
          </button>
          <Link
            to="/login"
            className={styles["link-btn"]}
          >
            Log In
          </Link>
          <div className={styles["register-link"]}>
            <span>Don't have an account yet? </span>
            <Link to="/register-user">Create one here</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default AccountDropdown;

export async function loader() {}
