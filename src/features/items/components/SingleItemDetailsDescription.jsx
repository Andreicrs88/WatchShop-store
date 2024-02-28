// styles
import styles from "./SingleItemDetailsDescription.module.css";

function SingleItemDetailsDescription({ itemData }) {
  return (
    <div className={styles.expandable}>
      <div className={styles.field}>
        <div>Brand</div>
        <div>{itemData.brand}</div>
      </div>
      {itemData.modelCollection && (
        <div className={styles.field}>
          <div>Collection</div>
          <div>{itemData.modelCollection}</div>
        </div>
      )}
      <div className={styles.field}>
        <div>Model code</div>
        <div>{itemData.modelCode}</div>
      </div>
      {itemData.gender && (
        <div className={styles.field}>
          <div>Gender</div>
          <div>{itemData.gender}</div>
        </div>
      )}
      {itemData.mechanism && (
        <div className={styles.field}>
          <div>Mechanism</div>
          <div>{itemData.mechanism}</div>
        </div>
      )}
      {itemData.dimensions && (
        <div className={styles.field}>
          <div>Dimensions</div>
          <div>{itemData.dimensions}</div>
        </div>
      )}
      {itemData.caseDepth && (
        <div className={styles.field}>
          <div>Case thickness</div>
          <div>{itemData.caseDepth}</div>
        </div>
      )}
      {itemData.shape && (
        <div className={styles.field}>
          <div>Shape</div>
          <div>{itemData.shape}</div>
        </div>
      )}
      {itemData.material && (
        <div className={styles.field}>
          <div>Material</div>
          <div>{itemData.material}</div>
        </div>
      )}
      {itemData.color && (
        <div className={styles.field}>
          <div>Color</div>
          <div>{itemData.color}</div>
        </div>
      )}
      {itemData.glass && (
        <div className={styles.field}>
          <div>Glass material</div>
          <div>{itemData.glass}</div>
        </div>
      )}
      {itemData.strap && (
        <div className={styles.field}>
          <div>Strap material</div>
          <div>{itemData.strap}</div>
        </div>
      )}
    </div>
  );
}

export default SingleItemDetailsDescription;
