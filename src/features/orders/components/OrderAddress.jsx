// utils
import formatPhoneNumber from "utils/formatPhoneNumber";

// styles
import styles from "./OrderAddress.module.css";

function OrderAddress({ userData, userAddressData }) {
  return (
    <div className={styles["shipping-address"]}>
      <div className={styles["address-row"]}>
        <span>Full name</span>
        <span>{`${userData.firstName} ${userData.lastName}`}</span>
      </div>
      <div className={styles["address-row"]}>
        <span>Address</span>
        <span>{userAddressData.address}</span>
      </div>
      <div className={styles["address-row"]}>
        <span>County</span>
        <span>{userAddressData.county}</span>
      </div>
      <div className={styles["address-row"]}>
        <span>City</span>
        <span>{userAddressData.city}</span>
      </div>
      <div className={styles["address-row"]}>
        <span>ZIP/Postal Code</span>
        <span>{userAddressData.zipCode}</span>
      </div>
      <div className={styles["address-row"]}>
        <span>Phone number</span>
        <span>{formatPhoneNumber(userData.phoneNumber)}</span>
      </div>
    </div>
  );
}

export default OrderAddress;
