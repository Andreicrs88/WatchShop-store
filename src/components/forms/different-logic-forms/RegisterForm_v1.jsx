// utils
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "utils/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import firestoreDB from "utils/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import useInput from "hooks/useInput";
import validEmail from "utils/emailRegexValidation";

// components
import MainButton from "components/ui/MainButton";
import LoadingSpinner from "components/ui/LoadingSpinner";
import ConfirmModal from "components/ui/ConfirmModal";

// styles
import styles from "./RegisterForm_v1.module.css";

function RegisterForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef();
  let formIsValid = false;

  function handleShowModal() {
    modalRef.current.showModal();
  }

  // values for the text/number/email inputs
  const {
    value: enteredFirstName,
    valueIsValid: enteredFirstNameIsValid,
    hasError: firstNameHasError,
    handleChangeInputValue: handleFirstNameChange,
    handleInputBlur: handleFirstNameBlur,
    handleInputReset: clearFirstName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLastName,
    valueIsValid: enteredLastNameIsValid,
    hasError: lastNameHasError,
    handleChangeInputValue: handleLastNameChange,
    handleInputBlur: handleLastNameBlur,
    handleInputReset: clearLastName,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    hasError: emailHasError,
    handleChangeInputValue: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    handleInputReset: clearEmail,
  } = useInput((value) => validEmail.test(value));

  const {
    value: enteredNumber,
    valueIsValid: enteredNumberIsValid,
    hasError: numberHasError,
    handleChangeInputValue: handleNumberChange,
    handleInputBlur: handleNumberBlur,
    handleInputReset: clearNumber,
  } = useInput((value) => value.trim().length === 10);

  const {
    value: enteredPassword,
    valueIsValid: enteredPasswordIsValid,
    hasError: passwordHasError,
    handleChangeInputValue: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    handleInputReset: clearPassword,
  } = useInput((value) => value.trim().length > 5);

  const {
    value: enteredConfirmPassword,
    valueIsValid: enteredConfirmPasswordIsValid,
    hasError: confirmPasswordHasError,
    handleChangeInputValue: handleConfirmPasswordChange,
    handleInputBlur: handleConfirmPasswordBlur,
    handleInputReset: clearConfirmPassword,
  } = useInput((value) => value.trim().length > 5);

  // values for the select inputs
  const titleRef = useRef();
  const dateOfBirthRef = useRef();

  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid &&
    enteredNumberIsValid &&
    enteredPasswordIsValid &&
    enteredConfirmPasswordIsValid &&
    enteredPassword === enteredConfirmPassword
  ) {
    formIsValid = true;
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    if (
      firstNameHasError ||
      lastNameHasError ||
      emailHasError ||
      numberHasError ||
      passwordHasError ||
      confirmPasswordHasError
    ) {
      return;
    }

    const registerUserData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    const enteredUserExtraData = {
      title: titleRef.current.value,
      dateOfBirth: dateOfBirthRef.current.value,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      phoneNumber: enteredNumber,
    };

    setIsLoading(true);
    setError(null);

    // send email and password data to Firebase auth to create a user
    try {
      const createUserResponse = await createUserWithEmailAndPassword(
        database,
        registerUserData.email,
        registerUserData.password,
      );
      const user = createUserResponse.user;

      if (!user) {
        throw new Error("Could not register new user!");
      }

      // send data to Firestore database to store extra information about user
      const docRef = doc(firestoreDB, "users", user.uid, "userData", "data");
      const payload = { ...enteredUserExtraData, loginId: user.uid };
      await setDoc(docRef, payload);

      // reset uncontrolled inputs (ref)
      event.target.reset();

      // reset controlled inputs (state)
      clearFirstName();
      clearLastName();
      clearEmail();
      clearNumber();
      clearPassword();
      clearConfirmPassword();

      // display the confirmation modal
      handleShowModal();

      setTimeout(() => {
        navigate("/my-account/data");
      }, 2500);
    } catch (error) {
      let errorMessage = error.message;

      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        errorMessage = "Email address already exists! Please choose a different one.";
      }

      setError(errorMessage);
    }

    setIsLoading(false);
  }

  // classes for invalid inputs
  const firstNameClass = firstNameHasError ? `${styles.input} ${styles.invalid}` : styles.input;
  const lastNameClass = lastNameHasError ? `${styles.input} ${styles.invalid}` : styles.input;
  const emailClass = emailHasError ? `${styles.input} ${styles.invalid}` : styles.input;
  const numberClass = numberHasError ? `${styles.input} ${styles.invalid}` : styles.input;
  const passwordClass = passwordHasError ? `${styles.input} ${styles.invalid}` : styles.input;
  const confirmPasswordClass = confirmPasswordHasError ? `${styles.input} ${styles.invalid}` : styles.input;

  return (
    <>
      <ConfirmModal
        ref={modalRef}
        title="Registration successful"
        text="You have succesfully created your account."
      />
      <form
        className={styles["register-form"]}
        onSubmit={handleFormSubmit}
      >
        <div className={styles.inputs}>
          <div className={styles.row}>
            <div className={styles["form-field"]}>
              <label htmlFor="register-title">Title</label>
              <select
                ref={titleRef}
                id="register-title"
                name="register-title"
                required
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
              <label htmlFor="register-date-of-birth">Date of birth</label>
              <input
                ref={dateOfBirthRef}
                type="date"
                id="register-date-of-birth"
                name="date-of-birth"
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles["form-field"]}>
              <label htmlFor="register-first-name">First Name</label>
              <input
                className={firstNameClass}
                type="text"
                id="register-first-name"
                name="register-first-name"
                placeholder="James"
                onChange={handleFirstNameChange}
                onBlur={handleFirstNameBlur}
                value={enteredFirstName}
                required
              />
              {
                <p
                  className={styles["warning-text"]}
                  style={{ visibility: firstNameHasError && "visible" }}
                >
                  Please enter yout first name
                </p>
              }
            </div>
            <div className={styles["form-field"]}>
              <label htmlFor="register-last-name">Last Name</label>
              <input
                className={lastNameClass}
                type="text"
                id="register-last-name"
                name="register-last-name"
                placeholder="Smith"
                onChange={handleLastNameChange}
                onBlur={handleLastNameBlur}
                value={enteredLastName}
                required
              />
              {
                <p
                  className={styles["warning-text"]}
                  style={{ visibility: lastNameHasError && "visible" }}
                >
                  Please enter your last name
                </p>
              }
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles["form-field"]}>
              <label htmlFor="register-email">Email</label>
              <input
                className={emailClass}
                type="email"
                id="register-email"
                name="register-email"
                placeholder="user@provider.com"
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                value={enteredEmail}
                required
              />
              {
                <p
                  className={styles["warning-text"]}
                  style={{ visibility: emailHasError && "visible" }}
                >
                  Please enter a valid email
                </p>
              }
            </div>
            <div className={styles["form-field"]}>
              <label htmlFor="register-number">Phone Number (exactly 10 characters)</label>
              <input
                className={numberClass}
                type="number"
                id="register-number"
                name="register-number"
                placeholder="0740123456"
                onChange={handleNumberChange}
                onBlur={handleNumberBlur}
                value={enteredNumber}
                required
              />
              {
                <p
                  className={styles["warning-text"]}
                  style={{ visibility: numberHasError && "visible" }}
                >
                  Please enter a valid phone number
                </p>
              }
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles["form-field"]}>
              <label htmlFor="register-password">Password (min. 6 characters)</label>
              <input
                className={passwordClass}
                type="password"
                id="register-password"
                name="register-password"
                placeholder="Password"
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                value={enteredPassword}
                required
              />
              {
                <p
                  className={styles["warning-text"]}
                  style={{ visibility: passwordHasError && "visible" }}
                >
                  Please choose a password
                </p>
              }
            </div>
            <div className={styles["form-field"]}>
              <label htmlFor="register-confirm-password">Confirm Password</label>
              <input
                className={confirmPasswordClass}
                type="password"
                id="register-confirm-password"
                name="register-confirm-password"
                placeholder="Password"
                onChange={handleConfirmPasswordChange}
                onBlur={handleConfirmPasswordBlur}
                value={enteredConfirmPassword}
                required
              />
              {
                <p
                  className={styles["warning-text"]}
                  style={{
                    visibility: (confirmPasswordHasError || enteredPassword !== enteredConfirmPassword) && "visible",
                  }}
                >
                  Please enter the chosen password
                </p>
              }
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          {isLoading ? (
            <LoadingSpinner text="Registering user..." />
          ) : (
            <MainButton
              type="submit"
              disabled={!formIsValid}
            >
              Register
            </MainButton>
          )}
          {error && <p className={styles["status-text"]}>{error}</p>}
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
