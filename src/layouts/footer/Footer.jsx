// utils
import { Link } from "react-router-dom";
import getCurrentYear from "utils/getCurrentYear";

// components
import PaymentMethodsBar from "components/ui/PaymentMethodsBar";

// styles
import styles from "./Footer.module.css";

function Footer() {
  const currentYear = getCurrentYear();

  return (
    <footer className={styles.footer}>
      <div className={styles["footer-links-container"]}>
        <div className={styles["footer-section"]}>
          <h3 className={styles["footer-section-title"]}>Orders, shipment & returns</h3>
          <div className={styles["footer-links"]}>
            <Link to="#">
              Payment methods<span className={styles.star}> *</span>
            </Link>
            <Link to="#">
              Shipping orders<span className={styles.star}> *</span>
            </Link>
            <Link to="#">
              Returning products<span className={styles.star}> *</span>
            </Link>
            <Link to="#">
              Products warranty<span className={styles.star}> *</span>
            </Link>
            <Link to="#">
              Pre-owned watches<span className={styles.star}>*</span>
            </Link>
          </div>
        </div>
        <div className={styles["footer-section"]}>
          <h3 className={styles["footer-section-title"]}>Other information</h3>
          <div className={styles["footer-links"]}>
            <Link to="#">
              Blog<span className={styles.star}> *</span>
            </Link>
            <Link to="#">
              Bracelet adjustment<span className={styles.star}> *</span>
            </Link>
            <Link to="#">
              Watches adjustment<span className={styles.star}> *</span>
            </Link>
            <Link to="#">
              Watches maintenance<span className={styles.star}> *</span>
            </Link>
            <Link to="#">
              Watches battery change<span className={styles.star}> *</span>
            </Link>
          </div>
        </div>
        <div className={styles["footer-section"]}>
          <h3 className={styles["footer-section-title"]}>Contact us</h3>
          <div className={styles["footer-links"]}>
            <Link to="/contact">Contact</Link>
            <Link to="#">
              About us<span className={styles.star}> *</span>
            </Link>
            <Link to="#">
              Showrooms<span className={styles.star}> *</span>
            </Link>
            <Link to="#">
              Customer benefits<span className={styles.star}> *</span>
            </Link>
          </div>
        </div>
        <div className={styles["footer-section"]}>
          <h3 className={styles["footer-section-title"]}>Our policies</h3>
          <div className={styles["footer-links"]}>
            <Link to="#">
              Delivery policy<span className={styles.star}> *</span>
            </Link>
            <Link to="#">
              Terms & conditions<span className={styles.star}> *</span>
            </Link>
            <Link to="#">
              Privacy & cookies<span className={styles.star}> *</span>
            </Link>
            <Link to="#">
              Vouchers / discounts<span className={styles.star}> *</span>
            </Link>
            <Link to="#">
              Cookie settings<span className={styles.star}> *</span>
            </Link>
          </div>
        </div>
      </div>
      <p className={styles.info}>
        Links with <span className={styles.star}> *</span> are empty links
      </p>
      <PaymentMethodsBar />
      <div className={styles.rights}>
        <p>Crisan Andrei</p>
        <p> © {currentYear} WatchShop™. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
