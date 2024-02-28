// utils
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "utils/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import useInput from "hooks/useInput";
import validEmail from "utils/emailRegexValidation";

// components
import MainButton from "components/ui/MainButton";
import LoadingSpinner from "components/ui/LoadingSpinner";
import ForgotPassword from "../../../features/auth/components/ForgotPassword";
import ConfirmModal from "components/ui/ConfirmModal";

// styles
import styles from "./LogInForm.module.css";

function LogInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef();
  const navigate = useNavigate();
  let formIsValid = false;

  const {
    value: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    hasError: emailHasError,
    handleChangeInputValue: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    handleInputReset: clearEmail,
  } = useInput((value) => validEmail.test(value));

  const {
    value: enteredPassword,
    valueIsValid: enteredPasswordIsValid,
    hasError: passwordHasError,
    handleChangeInputValue: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    handleInputReset: clearPassword,
  } = useInput((value) => value.trim().length > 5);

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  function handleShowModal() {
    modalRef.current.showModal();
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    if (emailHasError || passwordHasError) {
      return;
    }

    const userLoginData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    setIsLoading(true);
    setError(null);

    // send data
    try {
      const userCredential = await signInWithEmailAndPassword(database, userLoginData.email, userLoginData.password);
      const user = userCredential.user;

      if (!user) {
        throw new Error("Could not sign in!");
      }

      // clear the inputs
      clearEmail();
      clearPassword();

      // display the confirmation modal
      handleShowModal();

      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      let errorMessage = error.message;

      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        errorMessage = "The email or password is incorrect. Please try again.";
      }

      setError(errorMessage);
    }

    setIsLoading(false);
  }

  // classes for invalid inputs
  const emailClass = emailHasError ? `${styles.input} ${styles.invalid}` : styles.input;
  const passwordClass = passwordHasError ? `${styles.input} ${styles.invalid}` : styles.input;

  return (
    <>
      <ConfirmModal
        ref={modalRef}
        title="Login successful"
        text="You have succesfully signed into your account. You can view your account details in the My Account page."
      />
      <form
        onSubmit={handleFormSubmit}
        method="post"
        className={styles["login-form"]}
      >
        <div className={styles.inputs}>
          <div className={styles["form-field"]}>
            <label htmlFor="login-email">Email</label>
            <input
              className={emailClass}
              type="email"
              id="login-email"
              name="login-email"
              placeholder="Enter your email"
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
                Please enter your email
              </p>
            }
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="login-password">Password (min. 6 characters)</label>
            <input
              className={passwordClass}
              type="password"
              id="login-password"
              name="login-password"
              placeholder="Enter your password"
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
                Please enter your password
              </p>
            }
          </div>
        </div>
        <div className={styles.actions}>
          {isLoading ? (
            <LoadingSpinner text="Logging..." />
          ) : (
            <MainButton
              type="submit"
              disabled={!formIsValid}
            >
              Log In
            </MainButton>
          )}
          <ForgotPassword
            email={enteredEmail}
            formIsValid={formIsValid}
          />
          {error && <p className={styles["status-text"]}>{error}</p>}
        </div>
      </form>
    </>
  );
}

export default LogInForm;
