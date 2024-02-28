// styles
import styles from "./LoadingSpinner.module.css";

function LoadingSpinner({ text }) {
  return (
    <div className={styles["spinner-container"]}>
      <span className={styles.loader}></span>
      {text && <span className={styles["spinner-text"]}>{text}</span>}
    </div>
  );
}

export default LoadingSpinner;
