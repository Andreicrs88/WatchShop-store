// utils
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import firestoreDB from "utils/firebaseConfig";

// components
import LoadingSpinner from "components/ui/LoadingSpinner";
import FormInputElement from "./FormInputElement";
import UniversalButton from "components/ui/UniversalButton";

// styles
import styles from "./AccountEditDataForm.module.css";

function AccountEditDataForm({ onSetIsEditing, onShowModal }) {
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

  const [values, setValues] = useState({
    title: loggedInUserData?.title || "",
    firstName: loggedInUserData?.firstName || "",
    lastName: loggedInUserData?.lastName || "",
    email: loggedInUserData?.email || "",
    phoneNumber: loggedInUserData?.phoneNumber || "",
    dateOfBirth: loggedInUserData?.dateOfBirth || "",
  });

  const inputs = [
    {
      id: "firstName",
      name: "firstName",
      type: "text",
      label: "First Name",
      placeholder: "ex: James",
      errorMessage: "First name should include at least 2 letters",
      pattern: "^[A-Za-z ]{2,}$",
      required: true,
    },
    {
      id: "lastName",
      name: "lastName",
      type: "text",
      label: "Last Name",
      placeholder: "ex: Smith",
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
      id: "dateOfBirth",
      name: "dateOfBirth",
      type: "date",
      label: "Date Of Birth",
      required: true,
    },
  ];

  function handleInputChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const docRef = doc(firestoreDB, "users", currentUserId, "userData", "data");
      const payload = values;
      await setDoc(docRef, payload);

      onSetIsEditing(false);
      navigate("/my-account/data");
      onShowModal();
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }

  return (
    <form
      className={styles["account-data-form"]}
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
          <LoadingSpinner />
        ) : (
          <div className={styles.actions}>
            <UniversalButton type="submit">Apply changes</UniversalButton>
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
        {error && <p className={styles["error-text"]}>{error.message}</p>}
      </div>
    </form>
  );
}

export default AccountEditDataForm;
