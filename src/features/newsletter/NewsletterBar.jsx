// utils
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useInput from "hooks/useInput";
import validEmail from "utils/emailRegexValidation";
import { motion } from "framer-motion";

// components
import ConfirmModal from "components/ui/ConfirmModal";

// styles
import styles from "./NewsletterBar.module.css";

function NewsletterBar() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef();

  // add validation to the newsletter input

  const {
    value: enteredEmail,
    hasError: emailHasError,
    handleChangeInputValue: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    handleInputReset: clearEmail,
  } = useInput((value) => validEmail.test(value));

  function handleShowModal() {
    modalRef.current.showModal();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (emailHasError) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://watchstoredb-default-rtdb.europe-west1.firebasedatabase.app/subscriptionEmails.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enteredEmail),
        },
      );

      if (!response.ok) {
        throw new Error("Something went wrong! Could not subscribe.");
      }

      // clear the input
      clearEmail();

      // display the modal
      handleShowModal();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }

  const emailClass = emailHasError ? `${styles.input} ${styles.invalid}` : styles.input;

  return (
    <>
      <ConfirmModal
        ref={modalRef}
        title="Success"
        text="Your subscription to our Newsletter has been successful."
      />
      <section className={styles["newsletter-wrapper"]}>
        <div className={styles.newsletter}>
          <div className={styles["newsletter-left"]}>
            <h2>
              <b>watch</b>SHOP
            </h2>
            <p>Since 2008</p>
            <p>Your Online Shop for Watches and Accesories.</p>
          </div>
          <div className={styles["newsletter-right"]}>
            <h3>Subscribe to our newsletter</h3>
            <p>Discover how to find the best watch and enjoy exclusive products and offers via email.</p>
            <form
              className={styles["newsletter-form"]}
              onSubmit={handleSubmit}
            >
              <div className={styles["input-container"]}>
                <input
                  className={emailClass}
                  type="email"
                  id="newsletter-email"
                  name="newsletter-email"
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  value={enteredEmail}
                  placeholder="Enter your email"
                />
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.15, type: "spring", stiffness: 800 },
                  }}
                  type="submit"
                  disabled={emailHasError}
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </motion.button>
              </div>
              {
                <p
                  className={styles["warning-text"]}
                  style={{ display: emailHasError && "inline" }}
                >
                  Please enter a valid email address
                </p>
              }
              {error && <p className={styles["status-text"]}>{`Error: ${error}`}</p>}
            </form>
            <p className={styles["info-text"]}>
              By subscribing you agree with our &nbsp;
              <Link>
                Privacy Policy<span className={styles.star}>*</span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewsletterBar;
