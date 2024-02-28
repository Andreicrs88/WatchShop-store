// utils
import { useState } from "react";
import { Link } from "react-router-dom";
import priceFormatter from "utils/formatCurrency";

// components
import { RiErrorWarningFill } from "react-icons/ri";

// styles
import styles from "./OrderShipping.module.css";
import OrderAddress from "./OrderAddress";
import OrderShippingSingleItem from "./OrderShippingSingleItem";

// images
import fancourierLogo from "assets/images/courier-logos/fancourier-logo.png";
import dhlLogo from "assets/images/courier-logos/dhl-logo.png";
import dpdLogo from "assets/images/courier-logos/dpd-logo.png";
import upsLogo from "assets/images/courier-logos/ups-logo.png";

function OrderShipping({ onSelectShippingService, userData, userAddressData }) {
  const [selectedCourier, setSelectedCourier] = useState("");
  const firstCourierCost = priceFormatter.format(9.99);
  const secondCourierCost = priceFormatter.format(15.99);

  function handleInputChange(event) {
    setSelectedCourier(event.target.value);
    onSelectShippingService(event.target.value);
  }

  return (
    <section className={styles["order-shippping-container"]}>
      <h2>
        <span>1</span>
        Shipping
      </h2>
      <p>Select shipping service</p>
      <div className={styles["shipping-inputs"]}>
        <OrderShippingSingleItem
          imageSrc={fancourierLogo}
          title={"FanCourier"}
          id={"fan-courier"}
          shippingCost={firstCourierCost}
          selectedCourier={selectedCourier}
          handleInputChange={handleInputChange}
        />
        <OrderShippingSingleItem
          imageSrc={dhlLogo}
          title={"DHL"}
          id={"dhl-courier"}
          shippingCost={firstCourierCost}
          selectedCourier={selectedCourier}
          handleInputChange={handleInputChange}
        />
        <OrderShippingSingleItem
          imageSrc={dpdLogo}
          title={"DPD"}
          id={"dpd-courier"}
          shippingCost={firstCourierCost}
          selectedCourier={selectedCourier}
          handleInputChange={handleInputChange}
        />
        <OrderShippingSingleItem
          imageSrc={upsLogo}
          title={"UPS"}
          id={"ups-courier"}
          shippingCost={secondCourierCost}
          selectedCourier={selectedCourier}
          handleInputChange={handleInputChange}
        />
      </div>
      <p>Shipping address</p>
      {!userData && !userAddressData && (
        <div className={styles["info-text"]}>
          <RiErrorWarningFill />
          <span>
            There is no address saved. Go to &nbsp;
            <Link to="/my-account/address">account</Link>
            &nbsp; section to add an address.
          </span>
        </div>
      )}
      {userData && userAddressData && (
        <OrderAddress
          userData={userData}
          userAddressData={userAddressData}
        />
      )}
    </section>
  );
}

export default OrderShipping;
