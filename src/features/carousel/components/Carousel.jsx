// utils
import { useState } from "react";
import { carouselItemsSmall } from "../data/carouselItemsData";

// components
import CarouselItem from "./CarouselItem";
import { FaAngleLeft, FaAngleRight, FaRegCircle, FaCircle } from "react-icons/fa6";

// styles
import styles from "./Carousel.module.css";

function Carousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleMoveLeft() {
    if (activeIndex === 0) {
      setActiveIndex(carouselItemsSmall.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  }

  function handleMoveRight() {
    if (activeIndex === carouselItemsSmall.length - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  }

  function updateIndex(newIndex) {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= carouselItemsSmall.length) {
      newIndex = carouselItemsSmall.length - 1;
    }

    setActiveIndex(newIndex);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles["carousel-container"]}>
        <div
          className={styles.inner}
          style={{ transform: `translate(-${activeIndex * 100}%)` }}
        >
          {carouselItemsSmall.map((item) => (
            <CarouselItem
              key={item.id}
              item={item}
            />
          ))}
        </div>
        <div className={styles.indicators}>
          {carouselItemsSmall.map((item, index) => (
            <button
              key={index}
              onClick={() => updateIndex(index)}
              className={styles["indicator-button"]}
            >
              {index === activeIndex && <FaCircle className={index === activeIndex ? styles.active : undefined} />}
              {index !== activeIndex && <FaRegCircle />}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={handleMoveLeft}
        className={styles["button-arrow-left"]}
      >
        <FaAngleLeft />
      </button>
      <button
        onClick={handleMoveRight}
        className={styles["button-arrow-right"]}
      >
        <FaAngleRight />
      </button>
    </div>
  );
}

export default Carousel;
