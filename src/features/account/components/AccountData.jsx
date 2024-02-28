// utils
import { useState, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import firestoreDB from "utils/firebaseConfig";
import formatPhoneNumber from "utils/formatPhoneNumber";

// components
import ConfirmModal from "components/ui/ConfirmModal";
import UniversalButton from "components/ui/UniversalButton";

// styles
import styles from "./AccountData.module.css";
import AccountEditDataForm from "components/forms/AccountEditDataForm";

function AccountData() {
  const loggedInUserData = useLoaderData();
  const modalRef = useRef();
  const [isEditing, setIsEditing] = useState(false);

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
        text="Your data was successfully updated."
      />
      <>
        <h2 className={styles["data-title"]}>My data</h2>

        {!loggedInUserData ? (
          <p className={styles["fallback-text"]}>There is currently no saved address.</p>
        ) : (
          <div className={styles.data}>
            <div className={styles.row}>
              <div>Title</div>
              <div>{loggedInUserData.title}</div>
            </div>
            <div className={styles.row}>
              <div>First name</div>
              <div>{loggedInUserData.firstName}</div>
            </div>
            <div className={styles.row}>
              <div>Last name</div>
              <div>{loggedInUserData.lastName}</div>
            </div>
            <div className={styles.row}>
              <div>Email address</div>
              <div>{loggedInUserData.email}</div>
            </div>
            <div className={styles.row}>
              <div>Phone number</div>
              <div>{formatPhoneNumber(loggedInUserData.phoneNumber)}</div>
            </div>
            <div className={styles.row}>
              <div>Date of birth (y/m/d)</div>
              <div>{loggedInUserData.dateOfBirth}</div>
            </div>
          </div>
        )}
      </>

      {!isEditing && (
        <div className={styles.actions}>
          <UniversalButton onClick={() => setIsEditing(true)}>Edit data</UniversalButton>
        </div>
      )}

      {isEditing && (
        <>
          <h3 className={styles["edit-title"]}>Edit account details</h3>
          <AccountEditDataForm
            onSetIsEditing={getIsEditing}
            onShowModal={handleShowModal}
          />
        </>
      )}
    </>
  );
}

export default AccountData;

export async function loader() {
  // get the current logged in user ID
  const authState = localStorage.getItem("persist:root") ? JSON.parse(localStorage.getItem("persist:root")).auth : null;
  const currentUserId = authState ? JSON.parse(authState).userId : null;

  if (!currentUserId) {
    return null;
  }

  const colRef = collection(firestoreDB, "users", currentUserId, "userData");
  const docSnapshot = await getDocs(colRef);

  if (!docSnapshot) {
    throw Error("Could not load data.");
  }

  const userData = docSnapshot.docs.map((doc) => doc.data())[0];

  if (!docSnapshot.size) {
    return null;
  } else {
    return userData;
  }
}
