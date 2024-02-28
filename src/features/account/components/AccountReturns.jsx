// styles
import styles from "./AccountReturns.module.css";

function AccountReturns() {
  return (
    <>
      <h2 className={styles["returns-title"]}>Returns</h2>
      <p className={styles["fallback-text"]}>You currently have no returns.</p>
    </>
  );
}

export default AccountReturns;
