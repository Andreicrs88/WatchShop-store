// utils
import { useState, useEffect } from "react";
import firestoreDB from "utils/firebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";

// components
import FavoritesList from "features/favorites/FavoritesList";
import LoadingSpinner from "components/ui/LoadingSpinner";

// styles
import styles from "./AccountFavorites.module.css";

function AccountFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    // get the current logged in user ID
    const authState = localStorage.getItem("persist:root")
      ? JSON.parse(localStorage.getItem("persist:root")).auth
      : null;
    const currentUserId = authState ? JSON.parse(authState).userId : null;

    if (!currentUserId) {
      setFavorites([]);
      setIsLoading(false);
    } else {
      const unsubscribe = onSnapshot(
        collection(firestoreDB, "users", currentUserId, "userFavorites"),
        (snapshot) => {
          if (snapshot.size) {
            // we have data
            setIsLoading(false);
            setFavorites(snapshot.docs.map((document) => document.data()));
          } else {
            // it's empty
            setIsLoading(false);
            setFavorites([]);
          }
        },
        (error) => {
          throw Error(error.message);
        },
      );

      return unsubscribe;
    }
  }, []);

  return (
    <>
      <section>
        <h2 className={styles["favorites-title"]}>My favorites</h2>
        {isLoading && <LoadingSpinner text="Loading..." />}
        {!isLoading && <FavoritesList favoritesItems={favorites} />}
      </section>
    </>
  );
}

export default AccountFavorites;
