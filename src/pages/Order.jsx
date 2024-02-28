// utils
import { useState, useRef } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "store/cart-slice";
import formatDate from "utils/formatDate";
import { collection, getDocs, addDoc } from "firebase/firestore";
import firestoreDB from "utils/firebaseConfig";

// components
import OrderShipping from "features/orders/components/OrderShipping";
import OrderPayment from "features/orders/components/OrderPayment";
import OrderSummary from "features/orders/components/OrderSummary";
import MainButton from "components/ui/MainButton";
import LoadingSpinner from "components/ui/LoadingSpinner";
import ConfirmModal from "components/ui/ConfirmModal";

// styles
import styles from "./Order.module.css";

function Order() {
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const modalRef = useRef();
  const dispatchFn = useDispatch();

  const userData = !loaderData ? null : loaderData.userData[0];
  const userAddressData = !loaderData ? null : loaderData.userAddressData[0];

  const [shippingService, setShippingService] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // get the current logged in user ID
  const authState = localStorage.getItem("persist:root") ? JSON.parse(localStorage.getItem("persist:root")).auth : null;
  const currentUserId = authState ? JSON.parse(authState).userId : null;

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  let shippingCost = 0;

  if (!shippingService) {
    shippingCost = 0;
  } else if (shippingService === "ups-courier") {
    shippingCost = 15.99;
  } else {
    shippingCost = 9.99;
  }

  const orderTotal = cartTotalAmount + shippingCost;

  function getShippingService(value) {
    setShippingService(value);
  }

  function getPaymentMethod(value) {
    setPaymentMethod(value);
  }

  function handleShowModal() {
    modalRef.current.showModal();
  }

  let userAddress;
  let orderContent;

  if (userData && userAddressData) {
    userAddress = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      address: userAddressData.address,
      county: userAddressData.county,
      city: userAddressData.city,
      zipCode: userAddressData.zipCode,
      phonenUmber: userData.phoneNumber,
    };

    orderContent = {
      shippingService: shippingService,
      shippingCost: shippingCost,
      address: userAddress,
      paymentMethod: paymentMethod,
      cartItems: cartItems,
      totalItemsAmount: cartTotalAmount.toFixed(3),
      totalOrderAmount: orderTotal.toFixed(3),
      date: formattedDate,
    };
  }

  let formIsValid = false;

  if (shippingService && paymentMethod && userAddress && orderContent) {
    formIsValid = true;
  }

  async function handleSendOrder(event) {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const collectionRef = collection(firestoreDB, "users", currentUserId, "userOrders");
      const payload = orderContent;
      await addDoc(collectionRef, payload);

      // clear the cart
      dispatchFn(cartActions.emptyCart());

      // display the confirmation modal
      handleShowModal();

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }

  return (
    <>
      <ConfirmModal
        ref={modalRef}
        title="Success"
        text="Thank you for your order. Your order has been received and is being processed."
      />
      <h1 className={styles["order-title"]}>Order details</h1>
      <form
        className={styles["order-wrapper"]}
        onSubmit={handleSendOrder}
      >
        <OrderShipping
          onSelectShippingService={getShippingService}
          userData={userData}
          userAddressData={userAddressData}
        />
        <OrderPayment onSelectPaymentMethod={getPaymentMethod} />
        <OrderSummary shippingCost={shippingCost} />
        <div className={styles["order-actions"]}>
          <p>
            By sending the order, you agree with our <Link to="">Terms & conditions</Link>.
          </p>
          {isLoading ? (
            <LoadingSpinner text="Sending order..." />
          ) : (
            <MainButton
              type="submit"
              disabled={!formIsValid}
            >
              Send order
            </MainButton>
          )}
        </div>
      </form>
      {error && <p className={styles["status-text"]}>{error}</p>}
    </>
  );
}

export default Order;

export async function loader() {
  // get the current logged in user ID
  const authState = localStorage.getItem("persist:root") ? JSON.parse(localStorage.getItem("persist:root")).auth : null;
  const currentUserId = authState ? JSON.parse(authState).userId : null;

  // if the user is not logged in
  if (!currentUserId) {
    return null;
  }

  const colDataRef = collection(firestoreDB, "users", currentUserId, "userData");
  if (!colDataRef) {
    throw Error("Could not load user data.");
  }

  const colDataSnapshot = await getDocs(colDataRef);

  if (!colDataSnapshot.size) {
    return null;
  }

  // userData contains email, firstName, lastName, phoneNumber
  const userData = colDataSnapshot.docs.map((doc) => doc.data());

  const colAddressRef = collection(firestoreDB, "users", currentUserId, "userAddress");
  if (!colAddressRef) {
    throw Error("Could not load address data.");
  }

  const colAddressSnapshot = await getDocs(colAddressRef);

  // if the user is logged in, but doesn't have a saved address (userAddress item doesn't exist)
  if (!colAddressSnapshot.size) {
    return null;
  }

  // userAddressData contains the address, county, city, zip code
  const userAddressData = colAddressSnapshot.docs.map((doc) => doc.data());

  if (!userData || !userAddressData) {
    return null;
  } else {
    return {
      userData,
      userAddressData,
    };
  }
}
