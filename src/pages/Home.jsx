// components
import Carousel from "features/carousel/components/Carousel";

// styles
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles["home-container"]}>
      <div className={styles["home-banner"]}>
        <div className={styles.summary}>
          <h1>Times are changing</h1>
          <p>
            On our store you can find one of the largest collections of the most popular japanese and swiss watch
            brands, as well as other manufacturers. The collection we have on offer is truly vast and we have put
            together this diverse collection of wristwatches to ensure we have the perfect item to suit you.
          </p>
          <p>
            We ensure that our clients feel proud of their purchase by providing them with the best quality watches to
            buy online.
          </p>
          <p>
            If you want a watch for a reduced price or are a collector of vintage models, take a look at our online
            collection of pre-owned watches. Our pre-owned watches are all fully assessed and authenticated and come
            with a two-year guarantee to give you peace of mind.
          </p>
        </div>
      </div>
      <h2 className={styles["offers-title"]}>Discover our latest offers</h2>
      <Carousel />
    </div>
  );
}

export default Home;
