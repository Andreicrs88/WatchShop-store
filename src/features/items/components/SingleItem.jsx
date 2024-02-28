// utils
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useItemInfoModal from "hooks/useItemInfoModal";
import { cartActions } from "store/cart-slice";
import priceFormatter from "utils/formatCurrency";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AnimatePresence } from "framer-motion";

// components
import MainButton from "components/ui/MainButton";
import InfoModal from "components/ui/InfoModal";
import FavoritesButton from "features/favorites/FavoritesButton";
import { IoIosHeartEmpty } from "react-icons/io";

// styles
import styles from "./SingleItem.module.css";

function SingleItem({ folderName, itemData }) {
  const dispatchFn = useDispatch();
  const price = priceFormatter.format(itemData.price);
  const { showModal, modalType, addToCart, warningFavorites } = useItemInfoModal();

  // get the current logged in user ID
  const authState = localStorage.getItem("persist:root") ? JSON.parse(localStorage.getItem("persist:root")).auth : null;
  const currentUserId = authState ? JSON.parse(authState).userId : null;

  function handleAddToCart() {
    dispatchFn(cartActions.addItemToCart(itemData));
    addToCart();
  }

  function displayFavoritesWarning() {
    warningFavorites();
  }

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <InfoModal
            text={`${
              modalType === "cart" ? "Item added to cart" : modalType === "info" && "Log In to save item to favorites"
            }`}
            modalType={modalType}
          />
        )}
      </AnimatePresence>
      <li className={styles["watch-item"]}>
        {currentUserId && <FavoritesButton itemData={itemData} />}
        {!currentUserId && (
          <div
            className={styles["fav-btn-disabled"]}
            onClick={displayFavoritesWarning}
          >
            <IoIosHeartEmpty />
          </div>
        )}
        <Link to={`/${itemData.id}`}>
          <div className={styles["item-image"]}>
            <LazyLoadImage
              src={require(`assets/images/${folderName}/small_resolution/${itemData.imageSrc}`)}
              alt={itemData.title}
            />
          </div>
          <div className={styles.about}>
            <h2 className={styles.title}>{itemData.title}</h2>
            <p className={styles.model}>{itemData.modelCode}</p>
          </div>
        </Link>
        <div className={styles.actions}>
          <p className={styles.price}>{price}</p>
          <MainButton onClick={handleAddToCart}>Add to cart</MainButton>
        </div>
      </li>
    </>
  );
}

export default SingleItem;
