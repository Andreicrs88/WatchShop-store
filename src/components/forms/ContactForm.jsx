// utils
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// components
import FormInputElement from "./FormInputElement";
import MainButton from "components/ui/MainButton";
import ConfirmModal from "components/ui/ConfirmModal";
import LoadingSpinner from "components/ui/LoadingSpinner";

// styles
import styles from "./ContactForm.module.css";

function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);
  const modalRef = useRef();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    orderID: "",
    message: "",
  });

  const inputs = [
    {
      id: "name",
      name: "name",
      type: "text",
      label: "Your name",
      placeholder: "Your name",
      errorMessage: "Name should include at least 2 letters",
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
      id: "orderID",
      name: "orderID",
      type: "text",
      label: "Order ID (optional)",
      placeholder: "Order ID",
      required: false,
    },
    {
      id: "message",
      name: "message",
      type: "textarea",
      label: "Your Message",
      placeholder: "Your Message",
      errorMessage: "Message field should not be empty",
      required: true,
    },
  ];

  function handleShowModal() {
    modalRef.current.showModal(); // showModal() function is defined in ConfirmModal component
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch(
        "https://watchstoredb-default-rtdb.europe-west1.firebasedatabase.app/contactMessages.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        },
      );

      if (!response.ok) {
        throw Error("Something went wrong. Could not send message!");
      }

      // display the confirmation modal
      handleShowModal();

      // navigate to the home page after the form was submitted
      setTimeout(() => {
        navigateToHomePage();
      }, 2500);
    } catch (error) {
      setIsError(error.message);
    }

    setIsLoading(false);
  }

  function handleInputChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
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
        className={styles["contact-form"]}
        onSubmit={handleSubmit}
      >
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
        {isLoading ? (
          <LoadingSpinner text="Sending your message..." />
        ) : (
          <MainButton
            type="submit"
            className={styles["submit-btn"]}
          >
            Send
          </MainButton>
        )}
        {error && <p className={styles["error-text"]}>{error}</p>}
      </form>
    </>
  );
}

export default ContactForm;
