// utils
import { LazyLoadImage } from "react-lazy-load-image-component";

// styles
import styles from "./PaymentMethodsBar.module.css";

// svg
import ApplePayLogo from "assets/icons/apple-pay.svg";
import GooglePayLogo from "assets/icons/google-pay.svg";
import MastercardLogo from "assets/icons/mastercard.svg";
import MoneyLogo from "assets/icons/money.svg";
import PayPalLogo from "assets/icons/paypal.svg";
import RevolutLogo from "assets/icons/revolut.svg";
import VisaLogo from "assets/icons/visa.svg";

const PAYMENT_LOGO_ICONS = [PayPalLogo, VisaLogo, MastercardLogo, ApplePayLogo, GooglePayLogo, RevolutLogo, MoneyLogo];

function PaymentMethodsBar() {
  return (
    <ul className={styles["payment-icons-list"]}>
      {PAYMENT_LOGO_ICONS.map((icon) => (
        <li
          key={icon}
          className={styles["payment-icon"]}
        >
          <LazyLoadImage
            src={icon}
            alt={icon}
          />
        </li>
      ))}
    </ul>
  );
}

export default PaymentMethodsBar;
