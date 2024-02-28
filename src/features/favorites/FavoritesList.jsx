// components
import FavoriteSingleItem from "./FavoritesSingleItem";

// styles
import styles from "./FavoritesList.module.css";

function FavoritesList({ favoritesItems }) {
  return (
    <ul className={styles["favorites-list"]}>
      {favoritesItems.length === 0 ? (
        <p className={styles["fallback-text"]}>You currently have no items in favorites.</p>
      ) : (
        favoritesItems.map((item) => (
          <FavoriteSingleItem
            key={item.id}
            favoritesItemData={item}
          />
        ))
      )}
    </ul>
  );
}

export default FavoritesList;
