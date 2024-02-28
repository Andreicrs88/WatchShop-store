// utils
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import firestoreDB from "utils/firebaseConfig";

// components
import LoadingSpinner from "components/ui/LoadingSpinner";
import UniversalButton from "components/ui/UniversalButton";

// styles
import styles from "./AccountDataForm_v1.module.css";

function AccountDataForm({ onSetIsEditing, onShowModal }) {
  const userData = useLoaderData();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // get the current logged in user ID
  const authState = localStorage.getItem("persist:root") ? JSON.parse(localStorage.getItem("persist:root")).auth : null;
  const currentUserId = authState ? JSON.parse(authState).userId : null;

  let loggedInUserData;

  if (!userData) {
    loggedInUserData = undefined;
  } else {
    loggedInUserData = userData;
  }

  // values for the inputs
  const [title, setTitle] = useState(loggedInUserData?.title || "");

  const [firstName, setFirstName] = useState(loggedInUserData?.firstName || "");
  const [firstNameHasError, setFirstNameHasError] = useState(false);

  const [lastName, setLastName] = useState(loggedInUserData?.lastName || "");
  const [lastNameHasError, setLastNameHasError] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState(loggedInUserData?.phoneNumber || "");
  const [phoneNumberHasError, setPhoneNumberHasError] = useState(false);

  const [dateOfBirth, setDateOfBirth] = useState(loggedInUserData?.dateOfBirth || "");

  // handle input changes
  // title input
  function titleChange(event) {
    setTitle(event.target.value);
  }

  // first name input
  function handleFirstNameChange(event) {
    setFirstName(event.target.value);

    if (event.target.value.trim() === "") {
      setFirstNameHasError(true);
      console.log(firstNameHasError);
    } else {
      setFirstNameHasError(false);
    }
  }

  // last name input
  function handleLastNameChange(event) {
    setLastName(event.target.value);

    if (event.target.value.trim() === "") {
      setLastNameHasError(true);
    } else {
      setLastNameHasError(false);
    }
  }

  // phone number input
  function handlePhoneNumberChange(event) {
    setPhoneNumber(event.target.value);

    if (event.target.value.trim().length !== 10) {
      setPhoneNumberHasError(true);
    } else {
      setPhoneNumberHasError(false);
    }
  }

  // date of birth input
  function handleDateOfBirthChange(event) {
    setDateOfBirth(event.target.value);
  }

  let formIsValid;

  if (!firstNameHasError && !lastNameHasError && !phoneNumberHasError) {
    formIsValid = true;
  }

  const modifiedUserData = {
    ...loggedInUserData,
    title: title,
    firstName: firstName,
    lastName: lastName,
    dateOfBirth: dateOfBirth,
    phoneNumber: phoneNumber,
  };

  async function handleEditDataSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const docRef = doc(firestoreDB, "users", currentUserId, "userData", "data");
      const payload = modifiedUserData;
      await setDoc(docRef, payload);

      onSetIsEditing(false);
      navigate("/my-account/data");
      onShowModal();
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  // classes for invalid inputs
  const firstNameClass = firstNameHasError ? `${styles.input} ${styles.invalid}` : styles.input;
  const lastNameClass = lastNameHasError ? `${styles.input} ${styles.invalid}` : styles.input;
  const phoneNumberClass = phoneNumberHasError ? `${styles.input} ${styles.invalid}` : styles.input;

  return (
    <form
      className={styles["edit-form"]}
      onSubmit={handleEditDataSubmit}
    >
      <div className={styles.inputs}>
        <div className={styles["form-field"]}>
          <label htmlFor="title">
            Title <span>*</span>
          </label>
          <select
            id="title"
            onChange={titleChange}
            defaultValue={title}
          >
            <option
              id="mr"
              value="Mr"
            >
              Mr
            </option>
            <option
              id="ms"
              value="Ms"
            >
              Ms
            </option>
          </select>
        </div>
        <div className={styles["form-field"]}>
          <label htmlFor="account-data-first-name">
            First Name <span>*</span>
          </label>
          <input
            className={firstNameClass}
            type="text"
            id="account-data-first-name"
            onChange={handleFirstNameChange}
            value={firstName}
            required
          />
          {firstNameHasError && <p className={styles["warning-text"]}>Please enter your first name</p>}
        </div>
        <div className={styles["form-field"]}>
          <label htmlFor="account-data-last-name">
            Last Name <span>*</span>
          </label>
          <input
            className={lastNameClass}
            type="text"
            id="account-data-last-name"
            onChange={handleLastNameChange}
            value={lastName}
            required
          />
          {lastNameHasError && <p className={styles["warning-text"]}>Please enter your last name</p>}
        </div>
        <div className={styles["form-field"]}>
          <label htmlFor="account-data-phone-number">
            Phone number <span>*</span> (exactly 10 characters)
          </label>
          <input
            className={phoneNumberClass}
            type="number"
            id="account-data-phone-number"
            onChange={handlePhoneNumberChange}
            value={phoneNumber}
            required
          />
          {phoneNumberHasError && <p className={styles["warning-text"]}>Please enter a valid phone number</p>}
        </div>
        <div className={styles["form-field"]}>
          <label htmlFor="account-data-date-of-birth">Date of Birth</label>
          <input
            type="date"
            id="account-data-date-of-birth"
            onChange={handleDateOfBirthChange}
            value={dateOfBirth}
          />
        </div>
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.actions}>
          <UniversalButton
            type="submit"
            disabled={!formIsValid}
          >
            Apply changes
          </UniversalButton>
          <UniversalButton
            type="button"
            onClick={() => {
              window.location.reload();
              onSetIsEditing(false);
            }}
          >
            Cancel editing
          </UniversalButton>
        </div>
      )}
      {error && <p className={styles["warning-text"]}>{error.message}</p>}
    </form>
  );
}

export default AccountDataForm;
