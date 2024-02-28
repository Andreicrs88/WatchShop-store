// styles
import styles from "./CarouselItem.module.css";

function CarouselItem({ item }) {
  return (
    <div
      className={styles["carousel-item"]}
      style={{ backgroundColor: item.backgroundColor }}
    >
      <img
        src={item.image}
        alt=""
        className={styles["carousel-image"]}
      />
      <div className={styles["offer-text"]}>
        <div className={styles["offer-title"]}>{item.title}</div>
        <div className={styles["offer-description"]}>{item.description}</div>
      </div>
    </div>
  );
}

export default CarouselItem;
