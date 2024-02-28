// utils
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import useItemInfoModal from "hooks/useItemInfoModal";
import { setDoc, doc, deleteDoc, onSnapshot, collection } from "firebase/firestore";
import firestoreDB from "utils/firebaseConfig";
import { motion } from "framer-motion";

// components
import InfoModal from "components/ui/InfoModal";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

// styles
import styles from "./FavoritesButton.module.css";

function FavoritesButton({ itemData, className, addText, removeText }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { showModal, modalType, toggleFavorites } = useItemInfoModal();

  // get the current logged in user ID
  const authState = localStorage.getItem("persist:root") ? JSON.parse(localStorage.getItem("persist:root")).auth : null;
  const currentUserId = authState ? JSON.parse(authState).userId : null;

  useEffect(() => {
    if (!currentUserId) {
      return;
    } else {
      const unsubscribe = onSnapshot(collection(firestoreDB, "users", currentUserId, "userFavorites"), (snapshot) => {
        const snapshotDataArray = snapshot.docs.map((document) => document.data());
        const existingItem = snapshotDataArray.find((item) => item.id === itemData.id);

        if (!existingItem) {
          setIsFavorite(false);
        } else {
          setIsFavorite(true);
        }
      });

      return unsubscribe;
    }
  }, [itemData, currentUserId]);

  async function handleAddToFavorites() {
    const docRef = doc(firestoreDB, "users", currentUserId, "userFavorites", itemData.id);
    const payload = itemData;
    await setDoc(docRef, payload); // if the item already exists in the 'favorites' array, setDoc() doesn't add the item again, it overwrites it
    toggleFavorites();
  }

  async function handleRemoveFromFavorites() {
    const docRef = doc(firestoreDB, "users", currentUserId, "userFavorites", itemData.id);
    await deleteDoc(docRef);
    toggleFavorites();
  }

  return (
    <>
      <AnimatePresence key="confirm-modal">
        {showModal && (
          <InfoModal
            isFavorite={isFavorite}
            text={modalType === "favorites" && !isFavorite ? "Item removed from favorites" : "Item added to favorites"}
            modalType={modalType}
          />
        )}
      </AnimatePresence>
      {!isFavorite ? (
        <motion.button
          whileHover={{
            scale: 0.93,
            transition: { duration: 0.15, type: "spring", stiffness: 800 },
          }}
          className={`${styles["fav-btn"]} ${className}`}
          onClick={handleAddToFavorites}
        >
          <IoIosHeartEmpty />
          {addText}
        </motion.button>
      ) : (
        <motion.button
          whileHover={{
            scale: 0.93,
            transition: { duration: 0.15, type: "spring", stiffness: 800 },
          }}
          className={`${styles["fav-btn"]} ${styles["fav-btn-full"]} ${className}`}
          onClick={handleRemoveFromFavorites}
        >
          <IoIosHeart />
          {removeText}
        </motion.button>
      )}
    </>
  );
}

export default FavoritesButton;
