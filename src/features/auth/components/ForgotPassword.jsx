// utils
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { database } from "utils/firebaseConfig";

// styles
import styles from "./ForgotPassword.module.css";

function ForgotPassword({ email, formIsValid }) {
  const [message, setMessage] = useState("");

  async function handleResetPassword() {
    try {
      await sendPasswordResetEmail(database, email);
      setMessage("A reset link was sent. Check your email.");
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  }

  return (
    <>
      <button
        onClick={handleResetPassword}
        className={styles.link}
      >
        Forgot your password?
      </button>
      {!formIsValid && message && (
        <span
          className={styles["warning-text"]}
          style={{ visibility: message && "visible" }}
        >
          {message}
        </span>
      )}
    </>
  );
}

export default ForgotPassword;
