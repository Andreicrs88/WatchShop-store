// utils
import { useState, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import firestoreDB from "utils/firebaseConfig";

// components
import UniversalButton from "components/ui/UniversalButton";
import ConfirmModal from "components/ui/ConfirmModal";

// styles
import styles from "./AccountAddress.module.css";
import AccountEditAddressForm from "components/forms/AccountEditAddressForm";

function AccountMyAddress() {
  const userData = useLoaderData();
  const modalRef = useRef();
  const [isEditing, setIsEditing] = useState(false);

  let loggedInUserData;

  if (!userData) {
    loggedInUserData = undefined;
  } else {
    loggedInUserData = userData;
  }

  function getIsEditing(value) {
    setIsEditing(value);
  }

  function handleShowModal() {
    modalRef.current.showModal();
  }

  return (
    <>
      <ConfirmModal
        ref={modalRef}
        title="Success"
        text="Your address was successfully updated."
      />
      <h2 className={styles["address-title"]}>My delivery address</h2>

      {!userData ? (
        <p className={styles["fallback-text"]}>There is currently no saved address.</p>
      ) : (
        <>
          <div className={styles.address}>
            <div className={styles.row}>
              <div>Address</div>
              <div>{loggedInUserData.address}</div>
            </div>
            <div className={styles.row}>
              <div>County</div>
              <div>{loggedInUserData.county}</div>
            </div>
            <div className={styles.row}>
              <div>City</div>
              <div>{loggedInUserData.city}</div>
            </div>
            <div className={styles.row}>
              <div>Zip/Postal Code</div>
              <div>{loggedInUserData.zipCode}</div>
            </div>
          </div>
          {!isEditing && (
            <div className={styles.actions}>
              <UniversalButton onClick={() => setIsEditing(true)}>Edit address</UniversalButton>
            </div>
          )}
        </>
      )}

      {isEditing && (
        <>
          <h3 className={styles["edit-title"]}>{!loggedInUserData ? "Add address" : "Edit address"}</h3>
          <AccountEditAddressForm
            onSetIsEditing={getIsEditing}
            onShowModal={handleShowModal}
          />
        </>
      )}

      {!loggedInUserData && !isEditing && (
        <UniversalButton onClick={() => setIsEditing(true)}>Add address</UniversalButton>
      )}
    </>
  );
}

export default AccountMyAddress;

export async function loader() {
  // get the current logged in user ID
  const authState = localStorage.getItem("persist:root") ? JSON.parse(localStorage.getItem("persist:root")).auth : null;
  const currentUserId = authState ? JSON.parse(authState).userId : null;

  if (!currentUserId) {
    return null;
  }

  const colRef = collection(firestoreDB, "users", currentUserId, "userAddress");
  const docSnapshot = await getDocs(colRef);

  if (!docSnapshot) {
    throw Error("Could not load data.");
  }

  const userData = docSnapshot.docs.map((doc) => doc.data())[0];

  if (docSnapshot.size === 0 || !userData) {
    return null;
  } else {
    return userData;
  }
}
