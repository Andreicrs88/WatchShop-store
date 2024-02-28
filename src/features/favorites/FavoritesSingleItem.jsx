// utils
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import useItemInfoModal from "hooks/useItemInfoModal";
import { cartActions } from "store/cart-slice";
import priceFormatter from "utils/formatCurrency";
import { deleteDoc, doc } from "firebase/firestore";
import firestoreDB from "utils/firebaseConfig";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

// components
import InfoModal from "components/ui/InfoModal";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";

// styles
import styles from "./FavoritesSingleItem.module.css";

function FavoriteSingleItem({ favoritesItemData }) {
  const { showModal, modalType, addToCart } = useItemInfoModal();
  const dispatchFn = useDispatch();
  const price = priceFormatter.format(favoritesItemData.price);

  // get the current logged in user ID
  const authState = localStorage.getItem("persist:root") ? JSON.parse(localStorage.getItem("persist:root")).auth : null;
  const currentUserId = authState ? JSON.parse(authState).userId : null;

  function handleAddToCart() {
    dispatchFn(cartActions.addItemToCart(favoritesItemData));
    addToCart();
  }

  async function handleRemoveFromFavorites() {
    if (!currentUserId) {
      return;
    } else {
      const docRef = doc(firestoreDB, "users", currentUserId, "userFavorites", favoritesItemData.id);
      await deleteDoc(docRef);
    }
  }

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <InfoModal
            text="Item added to cart"
            modalType={modalType}
          />
        )}
      </AnimatePresence>
      <li className={styles["favorites-item"]}>
        <motion.div
          whileHover={{
            scale: 1.09,
            transition: { duration: 0.15, type: "spring", stiffness: 800 },
          }}
          className={styles["remove-btn"]}
          onClick={handleRemoveFromFavorites}
        >
          <RiDeleteBinLine />
          <span>Delete</span>
        </motion.div>
        <div className={styles["item-content"]}>
          <Link to={`/${favoritesItemData.id}`}>
            <div className={styles["item-info"]}>
              <div className={styles["image-container"]}>
                <LazyLoadImage
                  src={require(
                    `assets/images/${favoritesItemData.category}/small_resolution/${favoritesItemData.imageSrc}`,
                  )}
                  alt={favoritesItemData.title}
                />
              </div>
              <div className={styles.info}>
                <div className={styles.title}>{favoritesItemData.title}</div>
                <div className={styles.model}>{favoritesItemData.modelCode}</div>
              </div>
            </div>
          </Link>
          <div className={styles.actions}>
            <div className={styles.price}>
              <span>Price:</span> {price}
            </div>
            <motion.button
              whileHover={{
                scale: 1.08,
                transition: { duration: 0.15, type: "spring", stiffness: 800 },
              }}
              className={styles["cart-btn"]}
              onClick={handleAddToCart}
            >
              <IoCartOutline />
              <span>Add to cart</span>
            </motion.button>
          </div>
        </div>
      </li>
    </>
  );
}

export default FavoriteSingleItem;
