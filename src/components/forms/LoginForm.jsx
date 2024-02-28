// utils
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "utils/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

// components
import FormInputElement from "./FormInputElement";
import ConfirmModal from "components/ui/ConfirmModal";
import LoadingSpinner from "components/ui/LoadingSpinner";
import MainButton from "components/ui/MainButton";
import ForgotPassword from "features/auth/components/ForgotPassword";

// styles
import styles from "./LoginForm.module.css";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      errorMessage: "Please enter your email address",
      required: true,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
      errorMessage: "Please enter your password",
      required: true,
    },
  ];

  function handleInputChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  function handleShowModal() {
    modalRef.current.showModal(); // showModal() function is defined in ConfirmModal component
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    // send data
    try {
      const userCredential = await signInWithEmailAndPassword(database, values.email, values.password);
      const user = userCredential.user;

      if (!user) {
        throw new Error("Could not sign in!");
      }

      // display the confirmation modal
      handleShowModal();

      // navigate to home page after the login
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

  return (
    <>
      <ConfirmModal
        ref={modalRef}
        title="Login successful"
        text="You have succesfully signed into your account. You can view your account details in the My Account page."
      />
      <form
        className={styles["login-form"]}
        onSubmit={handleSubmit}
      >
        <div className={styles.inputs}>
          {inputs.map((input) => (
            <FormInputElement
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={handleInputChange}
              errorMessage={input.errorMessage}
              required={input.required}
            />
          ))}
        </div>
        <div className={styles.actions}>
          {isLoading ? (
            <LoadingSpinner text="Logging..." />
          ) : (
            <MainButton
              type="submit"
              className={styles["login-btn"]}
            >
              Log In
            </MainButton>
          )}
          <ForgotPassword email={values.email} />
          {error && <p className={styles["error-text"]}>{error}</p>}
        </div>
      </form>
    </>
  );
}

export default LoginForm;
