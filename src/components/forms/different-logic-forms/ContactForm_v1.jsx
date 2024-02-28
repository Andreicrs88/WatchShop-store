// utils
import { useState, useRef } from "react";
import useInput from "hooks/useInput";
import validEmail from "utils/emailRegexValidation";

// components
import MainButton from "components/ui/MainButton";
import LoadingSpinner from "components/ui/LoadingSpinner";
import ConfirmModal from "components/ui/ConfirmModal";

// styles
import styles from "./ContactForm_v1.module.css";

function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef();
  let formIsValid = false;

  // inputs values and functions
  const {
    value: enteredFullName,
    valueIsValid: enteredFullNameIsValid,
    hasError: fullNameHasError,
    handleChangeInputValue: handleFullNameChange,
    handleInputBlur: handleFullNameBlur,
    handleInputReset: clearFullName,
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
    value: enteredMessage,
    valueIsValid: enteredMessageIsValid,
    hasError: messageHasError,
    handleChangeInputValue: handleMessageChange,
    handleInputBlur: handleMessageBlur,
    handleInputReset: clearMessage,
  } = useInput((value) => value.trim() !== "");

  const orderIdRef = useRef();

  if (enteredFullNameIsValid && enteredEmailIsValid && enteredNumberIsValid && enteredMessageIsValid) {
    formIsValid = true;
  }

  function handleShowModal() {
    modalRef.current.showModal(); // function defined in ConfirmModal component
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    if (fullNameHasError || emailHasError || numberHasError || messageHasError) {
      return;
    }

    const contactData = {
      name: enteredFullName,
      email: enteredEmail,
      phoneNumber: enteredNumber,
      orderID: orderIdRef.current.value,
      message: enteredMessage,
    };

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://watchstoredb-default-rtdb.europe-west1.firebasedatabase.app/contactMessages.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData),
        },
      );

      if (!response.ok) {
        throw Error("Something went wrong. Could not send message!");
      }

      // clear the inputs
      clearFullName();
      clearEmail();
      clearNumber();
      clearMessage();
      orderIdRef.current.value = "";

      // display the modal
      handleShowModal();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }

  // classes for invalid inputs
  const fullNameClass = fullNameHasError ? `${styles.input} ${styles.invalid}` : styles.input;
  const emailClass = emailHasError ? `${styles.input} ${styles.invalid}` : styles.input;
  const numberClass = numberHasError ? `${styles.input} ${styles.invalid}` : styles.input;
  const messageClass = messageHasError ? `${styles.input} ${styles.invalid}` : styles.input;

  return (
    <>
      <ConfirmModal
        ref={modalRef}
        title="Success"
        text="Your message was sent successfully."
      />
      <form
        className={styles["contact-form"]}
        onSubmit={handleFormSubmit}
      >
        <div className={styles.inputs}>
          <div className={styles["form-field"]}>
            <label htmlFor="fullName">
              Full name <span>*</span>
            </label>
            <input
              className={fullNameClass}
              type="text"
              id="fullName"
              name="full-name"
              onChange={handleFullNameChange}
              onBlur={handleFullNameBlur}
              value={enteredFullName}
              placeholder="Full name"
              required
            />
            {
              <p
                className={styles["warning-text"]}
                style={{ visibility: fullNameHasError && "visible" }}
              >
                Please enter your full name
              </p>
            }
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              className={emailClass}
              type="email"
              id="email"
              name="e-mail"
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              value={enteredEmail}
              placeholder="Email"
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
            <label htmlFor="phone">
              Phone Number <span>*</span> (exactly 10 characters)
            </label>
            <input
              className={numberClass}
              type="number"
              id="phone"
              name="phone-number"
              onChange={handleNumberChange}
              onBlur={handleNumberBlur}
              value={enteredNumber}
              placeholder="Phone number"
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
          <div className={styles["form-field"]}>
            <label htmlFor="order">Order ID (optional)</label>
            <input
              ref={orderIdRef}
              type="text"
              name="order-id"
              id="order"
              placeholder="Order ID"
            />
          </div>
          <div className={styles["form-field"]}>
            <label htmlFor="message">
              Your message <span>*</span>
            </label>
            <textarea
              className={messageClass}
              id="message"
              name="message"
              onChange={handleMessageChange}
              onBlur={handleMessageBlur}
              value={enteredMessage}
              placeholder="Your message"
              required
            />
            {
              <p
                className={styles["warning-text"]}
                style={{ visibility: messageHasError && "visible" }}
              >
                Please write your message
              </p>
            }
          </div>
          <div className={styles.actions}>
            {isLoading ? (
              <LoadingSpinner text="Sending your message..." />
            ) : (
              <MainButton
                type="submit"
                disabled={!formIsValid}
              >
                Send
              </MainButton>
            )}
            {error && <p className={styles["status-text"]}>{error}</p>}
          </div>
        </div>
      </form>
    </>
  );
}

export default ContactForm;
