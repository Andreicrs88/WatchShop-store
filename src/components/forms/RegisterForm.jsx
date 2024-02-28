// utils
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "utils/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import firestoreDB from "utils/firebaseConfig";

// components
import ConfirmModal from "components/ui/ConfirmModal";
import FormInputElement from "./FormInputElement";
import MainButton from "components/ui/MainButton";
import LoadingSpinner from "components/ui/LoadingSpinner";

// styles
import styles from "./RegisterForm.module.css";

function RegisterForm() {
  const [values, setValues] = useState({
    title: "",
    dateOfBirth: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef();
  const navigate = useNavigate();

  const inputs = [
    {
      id: "title",
      name: "title",
      type: "select",
      options: [
        { id: "mr", value: "Mr" },
        { id: "ms", value: "Ms" },
      ],
      label: "Title",
      required: false,
    },
    {
      id: "dateOfBirth",
      name: "dateOfBirth",
      type: "date",
      label: "Date Of Birth",
      required: false,
    },
    {
      id: "firstName",
      name: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "James",
      errorMessage: "First name should include at least 2 letters",
      pattern: "^[A-Za-z ]{2,}$",
      required: true,
    },
    {
      id: "lastName",
      name: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: "Smith",
      errorMessage: "Last name should include at least 2 letters",
      pattern: "^[A-Za-z ]{2,}$",
      required: true,
    },
    {
      id: "email",
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      errorMessage: "Please enter a valid email address",
      pattern: "^[a-zA-Z0-9._\\-]+@[a-zA-Z0-9.\\-]+.[a-zA-Z]{2,4}$",
      required: true,
    },
    {
      id: "phoneNumber",
      name: "phoneNumber",
      type: "text",
      label: "Phone Number",
      placeholder: "Phone Number",
      errorMessage: "Phone number must have exactly 10 digits",
      pattern: "^[0-9]{10}$",
      required: true,
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Password",
      errorMessage:
        "Password should be 6-20 characters and include at least 1 letter, 1 number and 1 special character",
      pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$",
      required: true,
    },
    {
      id: "confirmPassword",
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match",
      pattern: values.password,
      required: true,
    },
  ];

  function handleShowModal() {
    modalRef.current.showModal(); // showModal() function is defined in ConfirmModal component
  }

  function handleInputChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    const registerUserData = {
      email: values.email,
      password: values.password,
    };

    const enteredUserExtraData = {
      title: values.title,
      dateOfBirth: values.dateOfBirth,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phoneNumber: values.phoneNumber,
    };

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

      // display the confirmation modal
      handleShowModal();

      // navigate to the home page after the form was submitted
      setTimeout(() => {
        navigateToHomePage();
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

  function navigateToHomePage() {
    navigate("/");
  }

  return (
    <>
      <ConfirmModal
        ref={modalRef}
        title="Success"
        text="Your message was sent successfully."
        onButtonClick={navigateToHomePage}
      />
      <form
        className={styles["register-form"]}
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
        <div className={styles.actions}></div>
        {isLoading ? (
          <LoadingSpinner text="Registering user..." />
        ) : (
          <MainButton
            type="submit"
            className={styles["submit-btn"]}
          >
            Create account
          </MainButton>
        )}
        {error && <p className={styles["error-text"]}>{error}</p>}
      </form>
    </>
  );
}

export default RegisterForm;
